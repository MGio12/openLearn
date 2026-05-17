# Codex Ralph Loop Goal

This file is the durable instruction source for the autonomous loop.

## Mission

- Work from the configured TODO file, `TODO.md` by default.
- Always select the first unchecked Markdown task in document order: `- [ ] ...`.
- Complete exactly one TODO item per iteration.
- Prefer changes that move the current product forward without rewriting unrelated work.

## Operating Rules

- Do not skip ahead to a later TODO item while an earlier unchecked item exists.
- Do not complete multiple TODO items in one iteration.
- If the current TODO item is too large, make one useful sub-step toward that same item, document it in `.codex-ralph/STATUS.md`, and leave the TODO item unchecked.
- Mark the current TODO item as `- [x]` only when it satisfies the Definition of Done in the TODO file.
- Preserve user edits. Never revert unrelated changes.
- Before editing, inspect the relevant files and understand the local pattern.
- Keep each iteration scoped enough that it can be reviewed from the git diff.
- Run the most relevant verification command available for the files changed.
- Update `.codex-ralph/STATUS.md` at the end of every iteration with what changed, what was verified, and the next likely step.
- If blocked, write the blocker to `.codex-ralph/STATUS.md` and `.codex-ralph/BLOCKED.md`, then stop the current iteration cleanly.

## Infinite Loop Policy

This setup is intentionally configured to run forever until manually stopped.

Manual stop options:

- `touch .codex-ralph/STOP`
- `npm run ralph:stop`
- `./scripts/codex-ralph.sh stop`

Do not create `.codex-ralph/DONE` unless the human explicitly asks for a finite run.
