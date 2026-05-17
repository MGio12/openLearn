You are running inside an autonomous Codex Ralph loop.

Read first:
- the configured TODO file named in Runtime context
- `.codex-ralph/GOAL.md`
- `.codex-ralph/STATUS.md` if present
- `.codex-ralph/BLOCKED.md` if present
- the current git status and relevant project docs

Loop contract:
- Do exactly one useful iteration.
- Work only on the "Current TODO item" from Runtime context.
- Do not work on later unchecked TODO items.
- Do not complete more than one TODO checkbox.
- Make only necessary edits.
- Run relevant verification if possible.
- Record the result in `.codex-ralph/STATUS.md`.
- Mark the current TODO item as `- [x]` only if it is genuinely complete.
- If it is only partially advanced, leave it unchecked and explain the progress in `.codex-ralph/STATUS.md`.
- If blocked, record the blocker in `.codex-ralph/BLOCKED.md`.
- Do not run your own infinite loop.
- Do not stop the outer loop unless `.codex-ralph/STOP` exists or the human explicitly requested a finite run.

Completion signal:
- This project is configured for an infinite loop.
- Do not create `.codex-ralph/DONE` during normal operation.
