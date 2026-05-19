# Agent Guide

Use `CLAUDE.md` as the source of truth for this project.

It contains the stack, editing rules, scenario-based reading map, and the latest course-generation rules.

## Course Page Agent

When the task is to create, modify, review, or generalize a maths course page, act as the **Course Page Agent**.

Before editing, read:

1. `CLAUDE.md`
2. `docs/regles-creation-cours-maths.md`
3. `docs/techniques-apprentissage-maths.md`
4. `docs/pipeline-cours-ia.md`
5. `docs/generation-image-cours.md`
6. The existing prototype page and shared course CSS/JS for the relevant subject.

The goal is not to make a prettier PDF. The goal is to make a web course that forces the student to understand, answer, retry, choose a method, and write a proper solution.

## Non-Negotiable Course Rules

- Lower the entry difficulty, never the final standard.
- Do not promise `20/20` as a guaranteed visible commercial claim. Treat it as a training target.
- Every important notion must make the student produce something: immediate question, missing step, near-transfer exercise, method choice, or clean written answer.
- Every method needs a solved example, then progressively less help.
- Include at least one "choose the method" block in a chapter.
- Include clean exam-style writing with mistakes that cost points.
- The `20/20` level must be gated by earlier control-level practice, not presented as a shortcut.
- The paywall, if present, must come after proof of value.

## Visuals And Maths

- Never draw curves, parabolas, tangents, axes, graphs, or mathematical diagrams by hand with SVG, Canvas, CSS, Bezier, or decorative HTML.
- For exact or interactive maths, use deterministic tools: KaTeX, JSXGraph, Desmos, GeoGebra, or points calculated from a real function.
- For non-exact intuition, use imagegen with a clear prompt and no axes, graduations, formulas, or critical mathematical labels.
- If no exact visual tool is needed, prefer mathematical language plus KaTeX over an approximate drawing.

## KaTeX And Formula Layout

- Never compress a KaTeX formula to make it fit.
- Never use horizontal scrolling for KaTeX formulas.
- A long formula must use the full available width, then move vertically with `aligned`, multiple `\[...\]` blocks, or explanatory text between steps.
- Do not reduce formula font size aggressively on mobile.
- Do not put important formulas inside narrow cards or multi-column layouts.
- Avoid styling generic tags such as `span`, `div`, or `em` inside any area that may contain KaTeX.

## Course Page Layout Defaults

- A course prototype may live in `prototypes/cours/` before integration into the public site.
- Shared subject assets should remain simple vanilla HTML/CSS/JS.
- Prefer a classic left sidebar for the plan:
  - open on first page load;
  - fixed to the far-left edge;
  - full height when open or collapsed;
  - collapsed by width, not by translating it off-screen;
  - no internal sidebar scrolling for a short chapter plan;
  - button circle fully visible in the collapsed state;
  - hover/focus can temporarily reveal the plan.
- The content area must be wide enough for text and formulas, then responsive on mobile without horizontal overflow.

## Required Verification For Course Pages

Before calling a course page done, verify:

- KaTeX renders without console errors.
- No KaTeX formula has `scrollWidth > clientWidth`.
- No formula block uses horizontal scroll.
- Reveal/correction buttons work.
- Sidebar open, collapsed, hover/focus, desktop, and mobile states work.
- No incoherent text overlap or horizontal page overflow.
- `git diff --check` passes.
- Run the project verification command when available.

Document any layout issue and its cause in the chapter notes when the fix teaches a reusable rule.
