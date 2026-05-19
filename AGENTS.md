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
6. `lien/premiere/math.md` when working on Première maths sources or choosing PDFs.
7. The existing prototype page and shared course CSS/JS for the relevant subject.

The goal is not to make a prettier PDF. The goal is to make a web course that forces the student to understand, answer, retry, choose a method, and write a proper solution.

## Subagent Contract For Course Pages

If you are a subagent working on a course page, do not treat the page as a layout task only. Your job is to preserve the math, the source coverage, and the learning sequence.

Before writing HTML, produce a short internal source map:

- notions from the main course PDF;
- methods and solved examples to keep;
- exercises or TD items to adapt;
- common traps and edge cases;
- exact graphs or diagrams that are needed.

Maths91 is the default backbone for programme coverage and exercises. Maths-et-tiques is a complement for intuition, alternate explanations, and useful examples. Use the links listed in `lien/premiere/math.md`; do not invent a chapter from memory when validated PDFs exist.

## Non-Negotiable Course Rules

- Lower the entry difficulty, never the final standard.
- Do not promise `20/20` as a guaranteed visible commercial claim. Treat it as a training target.
- Every important notion must make the student produce something: immediate question, missing step, near-transfer exercise, method choice, or clean written answer.
- Every method needs a solved example, then progressively less help.
- Keep mathematical consistency across the chapter: same notation, same variable names when possible, coherent order of definitions, methods, examples, exercises, and corrections.
- Include more actual mathematics than marketing copy: definitions, hypotheses, formulas, cases, examples, proofs or justifications when useful, and exam-style exercises.
- Do not replace source material with generic explanations. Adapt the PDFs into an interactive course, but keep their mathematical substance.
- Include at least one "choose the method" block in a chapter.
- Include clean exam-style writing with mistakes that cost points.
- The `20/20` level must be gated by earlier control-level practice, not presented as a shortcut.
- The paywall, if present, must come after proof of value.

## Visuals And Maths

- Never draw curves, parabolas, tangents, axes, graphs, or mathematical diagrams by hand with SVG, Canvas, CSS, Bezier, or decorative HTML.
- For exact or interactive maths, use deterministic tools: KaTeX, JSXGraph, Desmos, GeoGebra, or points calculated from a real function.
- When a notion depends on reading a curve, add an exact graph if it helps: function shape, roots, sign, extremum, tangent, relative position of two curves, or geometric construction.
- For non-exact intuition, use imagegen with a clear prompt and no axes, graduations, formulas, or critical mathematical labels.
- If no exact visual tool is needed, prefer mathematical language plus KaTeX over an approximate drawing.

## KaTeX And Formula Layout

- Never compress a KaTeX formula to make it fit.
- Never use horizontal scrolling for KaTeX formulas.
- A long formula must use the full available width, then move vertically with `aligned`, multiple `\[...\]` blocks, or explanatory text between steps.
- Do not reduce formula font size aggressively on mobile.
- Do not put important formulas inside narrow cards or multi-column layouts.
- Write equations in the appropriate mathematical language: use KaTeX for real mathematical expressions, define symbols before using them, and keep the notation stable inside the example and correction.
- When a correction contains several answers or cases, separate them clearly with numbered parts, short labels, or distinct display blocks. Do not stack three unrelated answers in one equation block with no explanation.
- Match correction structure to the exercise structure: if the exercise has questions 1, 2, 3, the answer must visibly keep parts 1, 2, 3.
- Do not rely on accidental browser line wrapping inside equations. If an equation would wrap or overflow, rewrite it as intentional vertical steps with `aligned`, separate `\[...\]` blocks, or explanatory text between lines.
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
  - closed rail fully visible;
  - closed rail arrow centered and decorative, not clickable;
  - the real toggle button closes the open sidebar only;
  - hover/focus can temporarily reveal the plan.
- The content area must be wide enough for text and formulas, then responsive on mobile without horizontal overflow.

## Required Verification For Course Pages

Before calling a course page done, verify:

- KaTeX renders without console errors.
- No KaTeX formula has `scrollWidth > clientWidth`.
- No formula block uses horizontal scroll.
- Exact graph boards render when the chapter uses curves or diagrams.
- Reveal/correction buttons work.
- Sidebar open, collapsed, hover/focus, desktop, and mobile states work.
- In the collapsed sidebar, the visible arrow is centered and non-clickable.
- No incoherent text overlap or horizontal page overflow.
- `git diff --check` passes.
- Run the project verification command when available.

Document any layout issue and its cause in the chapter notes when the fix teaches a reusable rule.
