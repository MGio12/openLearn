---
name: doc-impact-review
description: Use when finishing a task after editing repository files, before the final response, to decide whether Markdown project documentation should also change.
---

# Doc Impact Review

## Purpose

This is a semantic documentation guardrail for this project. Use it after file edits and before the final response so product, architecture, course, command, and convention changes do not land without matching Markdown when documentation would help the next agent or the solo maintainer.

Do not turn this into a blocking hook or script. The useful part is the agent judgment.

## Required Workflow

1. Inspect the current change set:
   - `git status --short`
   - `git diff --name-status`
   - `git diff --cached --name-status` if staged changes exist
   - focused hunks for files whose behavior or conventions may have changed
2. Identify candidate docs from `CLAUDE.md`, especially the "Lecture minimale par scénario" table. Read only the docs relevant to the touched area.
3. Decide explicitly:
   - `docs_needed: yes` with a short reason; or
   - `docs_needed: no` with a short reason.
4. If `docs_needed: yes`, update the relevant Markdown files, then reread the edited doc as a cold reader. It should answer what changed, when to use the new behavior, and what command or convention now matters.
5. Run at least `git diff --check` after documentation edits. If no docs were changed, still prefer running `git diff --check` when feasible before the final response.
6. In the final response, include exactly one documentation line:
   - `Docs mises à jour : onboarding.md, docs/architecture.md`
   - or `Docs vérifiées : pas de mise à jour utile.`

## Changes That Usually Need Docs

- New page, new user flow, new onboarding step, new checkout/paywall behavior.
- New npm script, build step, verification command, deployment step, or agent workflow.
- Analytics, payload, storage, security, privacy, or sensitive-data changes.
- Commercial changes: pricing, trial, paywall, checkout, parent/student promise, funnel.
- Architecture changes: new shared helper, new folder, build convention, data contract.
- Course-page changes that affect pedagogy, sources, math conventions, verification, sidebar, KaTeX, graphs, or reusable layout rules.

## Changes That Often Do Not Need Docs

- Local CSS adjustment with no reusable rule and no product meaning.
- Internal bugfix with no visible behavior, command, data contract, or convention change.
- Refactor that keeps the same public behavior and adds no shared abstraction.
- Typo or copy correction that does not change positioning, promise, pricing, or instructions.

## Documentation Targets

Use the touched area to choose docs:

- Onboarding or React bundle: `CLAUDE.md`, `onboarding.md`, and relevant product docs.
- Product promise, pricing, parent/student funnel: `docs/mission-valeur-monetisation.md`, `docs/version-lycee-priorites.md`, or `onboarding.md`.
- Architecture, folders, helpers, scripts, verification commands: `CLAUDE.md`, `docs/architecture.md`, or the nearest existing technical doc.
- Course pages and generation rules: `docs/regles-creation-cours-maths.md`, `docs/techniques-apprentissage-maths.md`, `docs/pipeline-cours-ia.md`, `docs/generation-image-cours.md`, or chapter notes.
- Known pitfalls: `docs/erreurs-rencontrees.md`.

If no existing Markdown file is a good home, prefer updating `CLAUDE.md` for agent-facing rules or `docs/architecture.md` for durable technical context. Create a new Markdown file only when the information would otherwise make an existing doc incoherent.

## Cold-Reader Check

Before finishing, ask:

- Would a future agent know when this changed behavior applies?
- Would the maintainer know which command to run or which file owns the convention?
- Did the doc avoid restating the diff and instead explain the durable rule?
- Did the final answer include the required docs line?
