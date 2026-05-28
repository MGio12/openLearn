#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: git_add_commit_push.sh [--dry-run] [--no-verify] <commit message>

Stages all repository changes with git add -A, creates one commit, and pushes
to the configured upstream. If no upstream exists, pushes to origin/<branch>.
USAGE
}

dry_run=0
no_verify=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      dry_run=1
      shift
      ;;
    --no-verify)
      no_verify=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      break
      ;;
    -*)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
    *)
      break
      ;;
  esac
done

if [[ $# -eq 0 ]]; then
  echo "Commit message is required." >&2
  usage >&2
  exit 2
fi

message="$*"
repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Not inside a Git repository." >&2
  exit 1
}
cd "$repo_root"

branch="$(git symbolic-ref --quiet --short HEAD)" || {
  echo "Cannot commit from a detached HEAD." >&2
  exit 1
}

status="$(git status --short)"
if [[ -z "$status" ]]; then
  echo "No changes to commit."
  exit 0
fi

echo "Repository: $repo_root"
echo "Branch: $branch"
echo "Changes:"
printf '%s\n' "$status"

if [[ "$dry_run" -eq 1 ]]; then
  echo
  echo "Dry run: would run git add -A, git commit, then git push."
  echo "Commit message: $message"
  if upstream="$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)"; then
    echo "Push target: $upstream"
  elif git remote get-url origin >/dev/null 2>&1; then
    echo "Push target: origin/$branch (new upstream)"
  else
    echo "Push target: missing origin remote"
  fi
  exit 0
fi

git add -A

if git diff --cached --quiet; then
  echo "No staged changes after git add -A."
  exit 0
fi

commit_args=()
if [[ "$no_verify" -eq 1 ]]; then
  commit_args+=(--no-verify)
fi
commit_args+=(-m "$message")

git commit "${commit_args[@]}"

if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  git push
elif git remote get-url origin >/dev/null 2>&1; then
  git push -u origin "$branch"
else
  echo "Commit created, but no upstream or origin remote exists. Push manually." >&2
  exit 1
fi

echo "Pushed commit $(git rev-parse --short HEAD) on $branch."
