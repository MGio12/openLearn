# AGENTS.md - ObjectifLycée

ObjectifLycée is a free, open source study cockpit for French high school students. It gives every lycéen a clear daily mission based on their objectives and upcoming tests - replacing 30-45 €/hr private tutoring with open source software and AI. MIT license. Built by a student, for students.

This file is the entry point for both human contributors and AI agents (Codex, Claude Code, or any coding assistant). Start here, then read `CLAUDE.md` for the full project rules.

---

## How to contribute

1. Read `README.md` for the project overview and setup instructions.
2. Read `CLAUDE.md` for the full editing rules, stack conventions, and scenario-based reading map.
3. For math courses specifically, read `docs/regles-creation-cours-maths.md` before touching any course page.
4. Run `npm run verify` before submitting a PR. Run `npm run verify:course-sidebar` if you touched a course page.
5. Run `git diff --check` to catch whitespace issues.

**If you are a high school student contributing for the first time: that is exactly the point.** Open a small PR, ask questions in issues, learn how the codebase works.

---

## For AI agents (Codex, Claude Code, and others)

### Source of truth

- `CLAUDE.md` is the project source of truth: stack, editing rules, scenario-based reading map, course rules.
- `docs/agent-codebase-map.md` maps every shared area of the codebase to its owner files, DOM contracts, and verification commands.

### After any file edit

Before the final response, run the project skill `.agents/skills/doc-impact-review`. It reads the current diff, picks candidate docs from the reading map in `CLAUDE.md`, and decides whether any Markdown documentation needs updating. If the change affects behavior, architecture, commands, analytics, pricing, onboarding, funnel, course pages, or project conventions - update the relevant docs. If no update is useful, say so briefly.

### Course Page Agent role

When the task is to create, modify, review, or generalize a math course page, act as the **Course Page Agent**.

Before editing, read in order:

1. `CLAUDE.md`
2. `docs/regles-creation-cours-maths.md`
3. `docs/techniques-apprentissage-maths.md`
4. `docs/pipeline-cours-ia.md`
5. `docs/generation-image-cours.md`
6. `lien/premiere/math.md` when working on Première maths sources or choosing PDFs
7. The existing prototype page and shared course CSS/JS for the subject

The goal is not to make a prettier PDF. The goal is a web course that forces the student to understand, answer, retry, choose a method, and write a proper solution.

Before writing HTML, produce a short internal source map: notions from the main PDF, methods and solved examples to keep, exercises to adapt, common traps, exact graphs needed.

Maths91 is the default backbone for programme coverage and exercises. Maths-et-tiques is a complement for intuition and alternate explanations. Use `lien/premiere/math.md` for validated links. Do not produce a chapter from memory when PDFs exist.

### Non-negotiable course rules

- Lower the entry difficulty, never the final standard.
- Every important notion must make the student produce something: immediate question, missing step, method choice, or clean written answer.
- Keep mathematical consistency: same notation, same variable names, coherent order of definitions, methods, examples, exercises, corrections.
- Include more actual mathematics than explanatory prose.
- Do not replace source material with generic AI explanations.
- The paywall, if present, comes after proof of value.

### KaTeX and formula layout

- Never compress a formula to make it fit. Never use horizontal scrolling.
- A long formula must use the full width, then move vertically with `aligned`, multiple `\[...\]` blocks, or text between steps.
- Do not style generic tags (`span`, `div`, `em`) inside any area that may contain KaTeX.
- When a correction has multiple answers or cases, separate them clearly. Do not stack answers in one equation block with no explanation.

### Graphs and visuals

- Never draw curves, axes, graphs, or mathematical diagrams by hand with SVG, Canvas, CSS, or decorative HTML.
- For exact or interactive math: KaTeX, JSXGraph, Desmos, GeoGebra, or points calculated from a real function.
- For non-exact intuition: imagegen with no axes, graduations, formulas, or critical labels in the image.

### Course sidebar

- Fixed to the far-left edge, full height, open on first load, collapsed by viewport width.
- Closed rail stays visible. Closed arrow is centered, decorative, and not clickable.
- The toggle button closes the open sidebar only.
- Hover/focus can temporarily reveal the plan on the closed rail.

### Verification before marking a course page done

- KaTeX renders without console errors.
- No formula has `scrollWidth > clientWidth`. No horizontal scroll on formulas.
- Exact graph boards render when the chapter uses curves or diagrams.
- Reveal/correction buttons work.
- Sidebar open, collapsed, hover/focus, desktop, and mobile states work.
- Closed sidebar arrow is centered and non-clickable.
- No text overlap or horizontal page overflow.
- `git diff --check` passes.
- `npm run verify:course-sidebar` passes.
- `npm run verify:course-agent` passes if the AI block is present.

---

## Stack at a glance

| Layer | Choice |
|---|---|
| Pages | HTML / CSS / JS vanilla (no framework, no build step) |
| Math rendering | KaTeX |
| Math graphs | JSXGraph (deterministic, exact) |
| Onboarding | React 18 via UMD CDN - pre-compiled at `onboarding/onboarding.bundle.js` |
| Icons | Phosphor Icons |
| AI feedback pilot | Feynman-method block in `prototypes/cours/maths-specialite/second-degre/` |

The codebase is intentionally simple. It should be readable by someone who has been coding for six months. If something is confusing, that is a bug.
