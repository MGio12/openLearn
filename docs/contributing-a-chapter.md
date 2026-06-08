# How to add a new math chapter

This guide walks a first-time contributor (student or AI agent) through creating a complete math chapter for ObjectifLycée. Each step links to a detailed reference doc.

**Time estimate for a first chapter:** 2–4 hours of focused work.

---

## Before you start

### Prerequisites

- Node.js 18+ installed
- Git installed
- The repo cloned and `npm install` run

```bash
git clone https://github.com/MGio12/openLearn.git
cd openLearn
npm install
```

### Required reading

These documents define the project's pedagogical standards and must be read **before** writing anything:

| Document | What it covers |
|---|---|
| [`AGENTS.md`](../AGENTS.md) | Project overview, entry point for contributors |
| [`docs/regles-creation-cours-maths.md`](regles-creation-cours-maths.md) | Non-negotiable course creation rules (French) |
| [`docs/techniques-apprentissage-maths.md`](techniques-apprentissage-maths.md) | Learning techniques: cognitive load, retrieval practice, etc. |
| [`docs/pipeline-cours-ia.md`](pipeline-cours-ia.md) | End-to-end AI agent pipeline for course creation |
| [`lien/premiere/math.md`](../lien/premiere/math.md) | Validated PDF sources for every chapter |

---

## Step 1 — Choose a topic and gather sources

### Pick a chapter

Première spécialité chapters use validated PDF sources. The full list with download links is in [`lien/premiere/math.md`](../lien/premiere/math.md):

| # | Chapter |
|---|---|
| 1 | Polynômes du second degré |
| 2 | Trigonométrie : angles et cercle |
| 3 | Produit scalaire dans le plan |
| 4 | Dérivation : nombre dérivé et tangente |
| 5 | Probabilités conditionnelles |
| 6 | Fonctions trigonométriques |
| 7 | Suites numériques |
| 8 | Fonction exponentielle |
| 9 | Variables aléatoires |
| 10 | Géométrie repérée |

### Download the PDFs

Place the validated PDFs in a source directory:

```bash
mkdir -p prototypes/cours/_sources/maths-specialite/<chapter-name>/
```

Add the course PDF and any TD/exercise PDFs from the table in `lien/premiere/math.md`.

### Extract text from PDFs

```bash
node scripts/course-extract-text.mjs \
  prototypes/cours/_sources/maths-specialite/<chapter-name> \
  prototypes/cours/_extracted/maths-specialite/<chapter-name>
```

---

## Step 2 — Create a coverage map (before writing)

Read the extracted texts and produce a short coverage map. This prevents a generic AI-generated chapter and anchors your work in expert material.

Your coverage map must list:

1. **Notions** to cover (from the PDF table of contents)
2. **Definitions and properties** to preserve
3. **Methods and solved examples** to include
4. **Exercises** to adapt (direct PDF exercises → interactive versions)
5. **Traps** — common mistakes students make
6. **Graphs needed** — exact curves, axes, or visualisations
7. **PDF content excluded** and the reason why

**Sources policy (from `docs/pipeline-cours-ia.md`):**
- Maths91 is the default backbone for programme coverage and exercises.
- Maths-et-tiques is a complement for intuition and alternative explanations.
- The goal is to preserve the mathematical substance of the PDF, then improve clarity, interactivity and progression.
- Do not replace source material with generic AI explanations.

Save your coverage map as `prototypes/cours/_sources/maths-specialite/<chapter-name>/coverage-map.md`.

---

## Step 3 — Create the chapter content

### Directory structure

```
prototypes/cours/maths-specialite/<chapter-name>/
├── index.html          # course page
├── td.html             # exercise page (separate, for chapters with >3 exercises)
├── images/             # generated intuition images only
├── sources.md          # source PDF attribution
├── source-map.md       # mapping between PDF and web content
├── generation-notes.md # generation metadata and excluded content
└── verification-notes.md # verification results
```

### Write the course page (`index.html`)

Follow the pipeline in [`docs/pipeline-cours-ia.md`](pipeline-cours-ia.md):

1. Use HTML/CSS/JS vanilla (no framework, no build step) for the current prototype
2. KaTeX for formulas: inline `\\(f'(a)\\)`, block `\\[ f'(a)=\\lim... \\]`
3. JSXGraph for exact mathematical graphs (not hand-drawn SVG/Canvas)
4. Share course CSS and JS from the subject folder (`prototypes/cours/maths-specialite/cours.css`)

**Pedagogical progression** (from `docs/techniques-apprentissage-maths.md`):

| Step | Technique | What to do |
|---|---|---|
| 1 | Reduce cognitive load | Split into small blocks: intuition, definition, method, exercise |
| 2 | Worked example | Show one complete solved example per method |
| 3 | Retrieval practice | Ask a question immediately after each notion |
| 4 | Faded guidance | Remove one step from the next example |
| 5 | Independent practice | Full exercise without help |
| 6 | Desirable difficulty | Add a trap or twist |
| 7 | Method selection | Mix with similar exercises from other chapters |
| 8 | Clean writing | Show the draft vs. the exam-ready answer |

### Write the exercise page (`td.html`)

For chapters needing more than 3 exercises, create a separate `td.html`:

```bash
node scripts/generate-maths-specialite-td.mjs
```

The generator produces ~40 exercises per chapter.

### Add a TD link

Add a "TD corrigé" link in `index.html` and make the "Exos" button in `contenu.html` point to the TD page.

---

## Step 4 — Add visualisations

### Rules (from `docs/generation-image-cours.md`)

- **Exact mathematical graphs** → JSXGraph (default), Desmos, or GeoGebra
- **Non-exact intuition images** → `imagegen` (no axes, formulas, or critical labels)
- **Forbidden:** hand-drawn curves in SVG/Canvas/CSS/Bézier

### When to add a graph

Only add a visualisation when it clarifies an idea. Each graph must:
- Correspond to a real function from the course
- Have visible roots, sign, extremum, or tangent points
- Be consistent with the solved example's coordinates

---

## Step 5 — Verify everything

### Automated checks

Run the full verification suite:

```bash
npm run verify
npm run verify:course-sidebar
npm run verify:redesign
npm run verify:cwv
git diff --check
```

### Manual checks

| Check | What to look for |
|---|---|
| KaTeX rendering | No console errors, no formula overflows |
| Formula width | `scrollWidth <= clientWidth` for all formulas |
| Horizontal scroll | No page overflow |
| Graph boards | Render correctly (JSXGraph / Desmos) |
| Reveal buttons | Show/hide corrections without glitches |
| Sidebar | Open, collapsed, hover/focus, desktop and mobile states work |
| Closed sidebar arrow | Centred and non-clickable |
| Text overlap | None |
| Mobile viewport | Content fits without zoom |

### Documentation verification

Update the following if your change affects:
- Behaviour → `docs/agent-codebase-map.md`
- Architecture → `docs/architecture.md`
- Commands or setup → `README.md`
- Course rules → `docs/regles-creation-cours-maths.md`

---

## Step 6 — Open a pull request

```bash
git checkout -b chapter/<chapter-name>
git add .
git commit -m "feat: add <chapter-name> chapter"
git push origin chapter/<chapter-name>
```

Then open a PR on GitHub from your fork to `MGio12/openLearn`.

### PR checklist

- [ ] Coverage map created before writing
- [ ] All PDF sources attributed in `sources.md`
- [ ] KaTeX renders without errors
- [ ] No horizontal scroll on formulas
- [ ] Graphs are exact (JSXGraph/Desmos), not hand-drawn
- [ ] `npm run verify` passes
- [ ] `git diff --check` passes
- [ ] Sidebar works in all states (open, collapsed, hover, mobile)

---

## Quick reference

### Key commands

```bash
# Extract text from PDFs
node scripts/course-extract-text.mjs <src> <dst>

# Generate TD exercises
node scripts/generate-maths-specialite-td.mjs

# Verification
npm run verify
npm run verify:course-sidebar
npm run verify:redesign
git diff --check
```

### Key docs

| Doc | Path |
|---|---|
| Project entry point | `AGENTS.md` |
| Project rules | `CLAUDE.md` |
| Course creation rules | `docs/regles-creation-cours-maths.md` |
| Learning techniques | `docs/techniques-apprentissage-maths.md` |
| AI pipeline | `docs/pipeline-cours-ia.md` |
| Validated sources | `lien/premiere/math.md` |
| Codebase map | `docs/agent-codebase-map.md` |
| Image generation rules | `docs/generation-image-cours.md` |
| Stack decisions | `docs/stack-cours-td-web.md` |

### Useful files

| File | Location |
|---|---|
| Prototype chapters | `prototypes/cours/maths-specialite/` |
| PDF sources | `prototypes/cours/_sources/` |
| Extracted text | `prototypes/cours/_extracted/` |
| Course templates | `prototypes/cours/_templates/` |
| Shared course CSS | `prototypes/cours/maths-specialite/cours.css` |
| Shared course JS | `prototypes/cours/maths-specialite/cours.js` |
