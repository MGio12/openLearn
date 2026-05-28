---
name: git-add-commit-push
description: Stage all repository changes, create one Git commit, and push it to the remote branch. Use when the user asks to "add commit push", "commit and push everything", "push all changes to remote", "commit tout", or similar Git shipping requests.
---

# Git Add Commit Push

## Overview

Automate the simple Git flow: inspect changes, stage everything, commit once, then push to the configured remote branch. Use the bundled script for the mechanical Git commands, but keep agent judgment for scope and safety.

## Workflow

1. Inspect the worktree:
   - `git status --short`
   - `git branch --show-current`
   - `git remote -v`
2. If the user explicitly asked for everything (`tout`, `all`, `tous les fichiers`), stage all changes. Otherwise, check whether unrelated files are present before committing.
3. Choose or confirm a concise commit message. If the user did not provide one, infer it from the diff and keep it specific.
4. Run any project verification command that is clearly available and cheap enough for the change. At minimum, prefer `git diff --check`.
5. Run the script from the repository root:

```bash
.agents/skills/git-add-commit-push/scripts/git_add_commit_push.sh "commit message"
```

Use `--dry-run` before the real command when the scope is large or surprising:

```bash
.agents/skills/git-add-commit-push/scripts/git_add_commit_push.sh --dry-run "commit message"
```

## Guardrails

- Do not run this from a detached HEAD.
- Do not push secrets, `.env` files, credentials, private keys, build artifacts, or large generated files unless the user explicitly confirms.
- Do not silently include unrelated work unless the user clearly asked to commit everything.
- If the branch has no upstream, the script pushes with `-u origin <branch>`.
- If there is no `origin` remote, stop and explain that the repo has no default remote target.
- Do not use `--no-verify` unless the user asks for it or a known hook is broken for reasons unrelated to the change.

## Script Options

- `--dry-run`: print the planned action without staging, committing, or pushing.
- `--no-verify`: pass `--no-verify` to `git commit`.
- All remaining arguments are joined into the commit message.

## Final Report

After a successful push, report the commit hash, branch, and push target. If nothing changed, say that no commit was created.
