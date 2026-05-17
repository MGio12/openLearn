# Codex Ralph Loop

This directory contains the durable state for an autonomous Codex loop.

Useful commands:

```bash
npm run ralph:start
npm run ralph:status
npm run ralph:tail
npm run ralph:stop
```

The loop is infinite by default. Stop it with:

```bash
touch .codex-ralph/STOP
```

Tune runtime behavior with environment variables:

```bash
RALPH_SLEEP_SECONDS=30 RALPH_VERIFY_CMD="npm run verify:s01" npm run ralph:start
```

The loop reads `TODO.md` by default and only works on the first unchecked item:

```md
- [ ] First task
- [ ] Second task
```

Use another TODO file with:

```bash
RALPH_TODO_FILE=".planning/TODO.md" npm run ralph:start
```

Important files:

- `../TODO.md`: default ordered task list
- `GOAL.md`: long-lived objective and operating rules
- `PROMPT.md`: per-iteration prompt wrapper
- `STATUS.md`: human-readable progress notes
- `events.jsonl`: structured event log
- `status.json`: current health/status surface
- `last-error.json`: most recent persisted failure
