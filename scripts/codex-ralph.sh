#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$ROOT/.codex-ralph"
LOG_DIR="$STATE_DIR/logs"
RUN_DIR="$STATE_DIR/run"
EVENTS_FILE="$STATE_DIR/events.jsonl"
STATUS_FILE="$STATE_DIR/status.json"
ERROR_FILE="$STATE_DIR/last-error.json"
PID_FILE="$RUN_DIR/codex-ralph.pid"
OUT_FILE="$LOG_DIR/runner.out"
STOP_FILE="$STATE_DIR/STOP"
GOAL_FILE="$STATE_DIR/GOAL.md"
PROMPT_FILE="$STATE_DIR/PROMPT.md"
TODO_FILE="${RALPH_TODO_FILE:-TODO.md}"

SLEEP_SECONDS="${RALPH_SLEEP_SECONDS:-15}"
FAIL_SLEEP_SECONDS="${RALPH_FAIL_SLEEP_SECONDS:-60}"
MODEL_OPT=()
SANDBOX_MODE="${RALPH_SANDBOX:-danger-full-access}"
APPROVAL_POLICY="${RALPH_APPROVAL:-never}"
VERIFY_CMD="${RALPH_VERIFY_CMD:-npm run verify}"
MAX_ITERS="${RALPH_MAX_ITERS:-0}"

if [[ -n "${RALPH_MODEL:-}" ]]; then
  MODEL_OPT=(-m "$RALPH_MODEL")
fi

mkdir -p "$LOG_DIR" "$RUN_DIR"

if [[ "$TODO_FILE" = /* ]]; then
  TODO_PATH="$TODO_FILE"
else
  TODO_PATH="$ROOT/$TODO_FILE"
fi

json_escape() {
  local input="${1:-}"
  input="${input//\\/\\\\}"
  input="${input//\"/\\\"}"
  input="${input//$'\n'/\\n}"
  input="${input//$'\r'/\\r}"
  input="${input//$'\t'/\\t}"
  printf '%s' "$input"
}

now_iso() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

require_uint() {
  local name="$1"
  local value="$2"

  if [[ ! "$value" =~ ^[0-9]+$ ]]; then
    write_error "startup" 0 2 "$name must be a non-negative integer, got: $value"
    echo "$name must be a non-negative integer, got: $value" >&2
    exit 2
  fi
}

validate_config() {
  require_uint "RALPH_SLEEP_SECONDS" "$SLEEP_SECONDS"
  require_uint "RALPH_FAIL_SLEEP_SECONDS" "$FAIL_SLEEP_SECONDS"
  require_uint "RALPH_MAX_ITERS" "$MAX_ITERS"
}

event() {
  local name="$1"
  local data="${2:-}"
  if [[ -z "$data" ]]; then
    data="{}"
  fi
  printf '{"ts":"%s","event":"%s","pid":%s,"data":%s}\n' \
    "$(now_iso)" \
    "$(json_escape "$name")" \
    "$$" \
    "$data" >> "$EVENTS_FILE"
}

write_status() {
  local state="$1"
  local iteration="${2:-0}"
  local detail="${3:-}"
  cat > "$STATUS_FILE.tmp" <<EOF
{
  "updated_at": "$(now_iso)",
  "state": "$(json_escape "$state")",
  "pid": $$,
  "iteration": $iteration,
  "sleep_seconds": $SLEEP_SECONDS,
  "fail_sleep_seconds": $FAIL_SLEEP_SECONDS,
  "sandbox": "$(json_escape "$SANDBOX_MODE")",
  "approval": "$(json_escape "$APPROVAL_POLICY")",
  "verify_cmd": "$(json_escape "$VERIFY_CMD")",
  "todo_file": "$(json_escape "$TODO_FILE")",
  "detail": "$(json_escape "$detail")"
}
EOF
  mv "$STATUS_FILE.tmp" "$STATUS_FILE"
}

write_error() {
  local phase="$1"
  local iteration="$2"
  local exit_code="$3"
  local detail="$4"
  cat > "$ERROR_FILE.tmp" <<EOF
{
  "ts": "$(now_iso)",
  "phase": "$(json_escape "$phase")",
  "pid": $$,
  "iteration": $iteration,
  "exit_code": $exit_code,
  "detail": "$(json_escape "$detail")"
}
EOF
  mv "$ERROR_FILE.tmp" "$ERROR_FILE"
}

is_running() {
  [[ -f "$PID_FILE" ]] || return 1
  local pid
  pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  [[ -n "$pid" ]] || return 1
  kill -0 "$pid" 2>/dev/null
}

require_codex() {
  if ! command -v codex >/dev/null 2>&1; then
    write_error "startup" 0 127 "codex command not found"
    event "startup-failed" '{"reason":"codex-not-found"}'
    echo "codex command not found" >&2
    exit 127
  fi
}

next_todo_item() {
  [[ -f "$TODO_PATH" ]] || return 1
  awk '/^[[:space:]]*- \[ \] / { print; exit }' "$TODO_PATH"
}

build_prompt() {
  local iteration="$1"
  local todo_item="$2"

  cat <<EOF
$(cat "$PROMPT_FILE")

Runtime context:
- Repository root: $ROOT
- Iteration: $iteration
- TODO file: $TODO_FILE
- Current TODO item: $todo_item
- This outer process will continue after you exit.
- If you need to stop future iterations, explain why and create .codex-ralph/STOP.
EOF
}

run_verify() {
  local iteration="$1"
  local verify_log="$LOG_DIR/verify-$iteration.log"

  if [[ -z "$VERIFY_CMD" ]]; then
    event "verify-skipped" "{\"iteration\":$iteration,\"reason\":\"no-command\"}"
    return 0
  fi

  event "verify-started" "{\"iteration\":$iteration,\"command\":\"$(json_escape "$VERIFY_CMD")\"}"
  set +e
  bash -lc "$VERIFY_CMD" > "$verify_log" 2>&1
  local exit_code=$?
  set -e

  printf '%s\n' "$exit_code" > "$LOG_DIR/verify-$iteration.exit"

  if [[ "$exit_code" -eq 0 ]]; then
    event "verify-succeeded" "{\"iteration\":$iteration}"
  else
    event "verify-failed" "{\"iteration\":$iteration,\"exit_code\":$exit_code,\"log\":\"$(json_escape "$verify_log")\"}"
    write_error "verify" "$iteration" "$exit_code" "Verification failed. See $verify_log"
  fi

  return "$exit_code"
}

run_loop() {
  validate_config
  require_codex

  if [[ ! -f "$GOAL_FILE" || ! -f "$PROMPT_FILE" ]]; then
    write_error "startup" 0 2 "Missing GOAL.md or PROMPT.md"
    echo "Missing $GOAL_FILE or $PROMPT_FILE" >&2
    exit 2
  fi

  if is_running && [[ "$(cat "$PID_FILE")" != "$$" ]]; then
    echo "Codex Ralph already running with pid $(cat "$PID_FILE")."
    exit 0
  fi

  rm -f "$STOP_FILE"
  printf '%s\n' "$$" > "$PID_FILE"
  trap 'event "runner-stopped" "{\"reason\":\"signal\"}"; write_status "stopped" "${iteration:-0}" "Stopped by signal"; rm -f "$PID_FILE"; exit 0' INT TERM
  trap 'rm -f "$PID_FILE"' EXIT

  local iteration=0
  event "runner-started" "{\"root\":\"$(json_escape "$ROOT")\",\"todo_file\":\"$(json_escape "$TODO_FILE")\",\"max_iters\":$MAX_ITERS,\"sleep_seconds\":$SLEEP_SECONDS}"
  write_status "running" 0 "Runner started"

  while true; do
    if [[ -f "$STOP_FILE" ]]; then
      event "runner-stopped" '{"reason":"stop-file"}'
      write_status "stopped" "$iteration" "STOP file found"
      exit 0
    fi

    if [[ "$MAX_ITERS" -gt 0 && "$iteration" -ge "$MAX_ITERS" ]]; then
      event "runner-stopped" "{\"reason\":\"max-iters\",\"max_iters\":$MAX_ITERS}"
      write_status "stopped" "$iteration" "Reached RALPH_MAX_ITERS=$MAX_ITERS"
      exit 0
    fi

    iteration=$((iteration + 1))
    local codex_log="$LOG_DIR/codex-$iteration.log"
    local last_message="$LOG_DIR/last-message-$iteration.txt"
    local todo_item=""

    if [[ ! -f "$TODO_PATH" ]]; then
      event "todo-missing" "{\"iteration\":$iteration,\"todo_file\":\"$(json_escape "$TODO_FILE")\"}"
      write_status "waiting" "$iteration" "TODO file not found: $TODO_FILE"
      sleep "$SLEEP_SECONDS"
      continue
    fi

    todo_item="$(next_todo_item || true)"
    if [[ -z "$todo_item" ]]; then
      event "todo-empty" "{\"iteration\":$iteration,\"todo_file\":\"$(json_escape "$TODO_FILE")\"}"
      write_status "waiting" "$iteration" "No unchecked TODO item found in $TODO_FILE"
      sleep "$SLEEP_SECONDS"
      continue
    fi

    event "iteration-started" "{\"iteration\":$iteration,\"todo_file\":\"$(json_escape "$TODO_FILE")\",\"todo_item\":\"$(json_escape "$todo_item")\"}"
    write_status "running" "$iteration" "Codex iteration started for: $todo_item"

    set +e
    build_prompt "$iteration" "$todo_item" | codex \
      -a "$APPROVAL_POLICY" \
      exec \
      -C "$ROOT" \
      -s "$SANDBOX_MODE" \
      "${MODEL_OPT[@]}" \
      -o "$last_message" \
      - > "$codex_log" 2>&1
    local codex_exit=$?
    set -e

    if [[ "$codex_exit" -ne 0 ]]; then
      event "iteration-failed" "{\"iteration\":$iteration,\"exit_code\":$codex_exit,\"log\":\"$(json_escape "$codex_log")\"}"
      write_error "codex" "$iteration" "$codex_exit" "Codex failed. See $codex_log"
      write_status "degraded" "$iteration" "Codex failed; sleeping before retry"
      sleep "$FAIL_SLEEP_SECONDS"
      continue
    fi

    event "iteration-succeeded" "{\"iteration\":$iteration,\"log\":\"$(json_escape "$codex_log")\"}"
    write_status "verifying" "$iteration" "Codex iteration completed"

    if ! run_verify "$iteration"; then
      write_status "degraded" "$iteration" "Verification failed; sleeping before retry"
      sleep "$FAIL_SLEEP_SECONDS"
      continue
    fi

    rm -f "$ERROR_FILE"
    write_status "sleeping" "$iteration" "Waiting before next iteration"
    event "iteration-complete" "{\"iteration\":$iteration}"
    sleep "$SLEEP_SECONDS"
  done
}

start_runner() {
  if is_running; then
    echo "Codex Ralph already running with pid $(cat "$PID_FILE")."
    exit 0
  fi

  rm -f "$STOP_FILE"
  if command -v setsid >/dev/null 2>&1; then
    setsid "$0" run > "$OUT_FILE" 2>&1 < /dev/null &
  else
    nohup "$0" run > "$OUT_FILE" 2>&1 < /dev/null &
  fi
  local pid=$!
  printf '%s\n' "$pid" > "$PID_FILE"
  echo "Started Codex Ralph with pid $pid."
  echo "Logs: $OUT_FILE"
}

stop_runner() {
  touch "$STOP_FILE"
  if is_running; then
    local pid
    pid="$(cat "$PID_FILE")"
    if command -v pkill >/dev/null 2>&1; then
      pkill -TERM -P "$pid" 2>/dev/null || true
    fi
    kill "$pid" 2>/dev/null || true
    echo "Stop requested for pid $pid."
  else
    echo "Stop file created. No running pid found."
  fi
}

status_runner() {
  if is_running; then
    echo "Process: running pid $(cat "$PID_FILE")"
  else
    echo "Process: not running"
  fi

  if [[ -f "$STATUS_FILE" ]]; then
    echo
    cat "$STATUS_FILE"
  else
    echo
    echo "No status file yet."
  fi
}

tail_runner() {
  touch "$EVENTS_FILE" "$OUT_FILE"
  tail -n 80 -f "$OUT_FILE" "$EVENTS_FILE"
}

case "${1:-run}" in
  run)
    run_loop
    ;;
  start)
    start_runner
    ;;
  stop)
    stop_runner
    ;;
  status)
    status_runner
    ;;
  tail)
    tail_runner
    ;;
  once)
    RALPH_MAX_ITERS=1 MAX_ITERS=1 run_loop
    ;;
  *)
    echo "Usage: $0 [run|start|stop|status|tail|once]" >&2
    exit 2
    ;;
esac
