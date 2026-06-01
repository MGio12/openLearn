# How to Add a New Math Chapter — Step-by-Step Guide

> **Intended audience**: first-time contributors, including students.
> If you are an AI agent, read `AGENTS.md` → `CLAUDE.md` before starting.

This guide walks you through adding a new mathematics chapter to the openLearn course library. Each step is concrete and verifiable. Follow them in order.

---

## Prerequisites

- Node.js 18+ and npm installed
- Git installed and configured
- You have forked the repository and created a working branch
- Basic familiarity with HTML, KaTeX, and the command line

---

## Step 1: Find the PDF Sources

Every math chapter starts from publicly available French high-school math PDFs. The approved sources are catalogued in a single file:

**File to open:** `lien/premiere/math.md`

This file lists every chapter of Premiere specialite mathematiques with its approved PDF sources:

- **Maths91** = primary source (cours + TD/exercises for every chapter)
- **Maths-et-tiques** = supplementary source (selected chapters)
- **Additional teacher/lycee sources** (up to 2 per chapter, listed in complements)

**What to do:**
1. Open `lien/premiere/math.md`
2. Find your target chapter row
3. Note the primary PDF filenames from the "Cours PDF" and "TD / exercices PDF" columns
4. Cross-check the PDF actually exists in `prototypes/cours/_sources/`

**Acceptance criteria:** You can name at least one approved PDF source for your chapter.

> Do not use unlisted PDFs. If you believe a source should be added, open a separate issue.

---

## Step 2: Read the Non-Negotiable Course Rules

Before writing a single line of HTML, you must internalize the pedagogical rules.

**File to read:** `docs/regles-creation-cours-maths.md`

Key rules:

- **The mother rule:** lower the entry difficulty, never the final expectation.
- **Combat the illusion of understanding:** every important notion must force the student to produce something.
- **Teach method choice:** not just "how to solve" but "when to use which method."
- **Teach graded writing:** show rough work to clean copy to point-by-point rubric.
- **No compressed KaTeX formulas:** use full width, vertical splitting with `aligned`.
- **More substance than motivation:** more actual mathematics than explanatory prose.
- **Use the source PDFs as the backbone:** produce a coverage map before writing.

**What to do:**
1. Read the full `docs/regles-creation-cours-maths.md`
2. Read `docs/techniques-apprentissage-maths.md`
3. Read `docs/pipeline-cours-ia.md`

**Acceptance criteria:** You understand the 10 pedagogical rules and can list at least 5 without re-reading.

---

## Step 3: Extract Text from PDFs and Produce a Source Map

### 3a — Place PDFs in sources directory

Copy your approved PDFs:
```
prototypes/cours/_sources/maths-specialite/<chapter-name>/
```

### 3b — Extract text

```bash
node scripts/course-extract-text.mjs
```

Output goes to:
```
prototypes/cours/_extracted/maths-specialite/<chapter-name>/
```

### 3c — Create the source map

Create `prototypes/cours/maths-specialite/<chapter-name>/source-map.md` following the template at `prototypes/cours/_templates/source-map.md`.

Your source map must cover:

| Section | What to capture |
|---------|----------------|
| Notions | Every mathematical concept covered |
| Methods | Solution procedures and techniques |
| Exercises | Worked examples and exercises from PDFs |
| Traps | Common mistakes, edge cases |
| Graphs | Every needed visualization |
| Exclusions | Topics left out and why |

**Acceptance criteria:** A completed `source-map.md` with all 6 sections filled.

---

## Step 4: Build the HTML Page from the Shared Template

Each chapter follows the shared skeleton:

```
prototypes/cours/maths-specialite/<chapter-name>/
  index.html           # Main course page
  td.html              # Exercises and problem set
  sources.md           # Attribution of each source
  source-map.md        # Coverage map (from step 3)
  generation-notes.md  # AI generation notes
  verification-notes.md # Verification results (from step 7)
```

Reference existing examples:
- `prototypes/cours/maths-specialite/second-degre/`
- `prototypes/cours/maths-specialite/derivation/`
- `prototypes/cours/maths-specialite/suites/`

### Course page structure (index.html)

Use shared CSS and JS:
- `prototypes/cours/maths-specialite/cours.css`
- `prototypes/cours/maths-specialite/cours.js`

Follow the learning progression:
1. Intuition — a quick "see the idea" section
2. Definitions and Properties — KaTeX-rendered formulas
3. Worked examples — step-by-step solved problems
4. Method choice questions
5. Common traps — annotated mistakes
6. Exercises — progressive difficulty
7. Graded writing model — rough work, clean copy, rubric

### TD page (td.html)

Generate the problem set:
```bash
node scripts/generate-maths-specialite-td.mjs
```

This produces approximately 40 exercises per chapter.

**Acceptance criteria:** Both `index.html` and `td.html` are created, use shared CSS/JS, render without console errors.

---

## Step 5: Add KaTeX Formulas and JSXGraph Visualizations

### KaTeX
- Inline: `$...$` | Displayed: `$$...$$`
- Use `aligned` for multi-line equations
- No `overflow-x: auto`

### JSXGraph
- Use for: function curves, geometric figures, statistical plots
- Refer to: `src/courses/components/ExactGraph.astro`

**Acceptance criteria:** At least 3 JSXGraph visualizations; all math in KaTeX.

---

## Step 6: Add an AI Feynman Block

The AI Feynman block uses an AI tutor for simple explanations. Place at least one where students commonly get stuck.

If you do not have API access, open a follow-up issue titled `[AI Feynman] Chapter Name` and link it in your PR.

Use the existing prototype as reference:
```
prototypes/cours/maths-specialite/second-degre/
```

**Acceptance criteria:** Feynman block present in HTML, even if marked "requires API configuration."

---

## Step 7: Run Verification Scripts

```bash
# Course-specific checks
npm run verify:course-sidebar
npm run verify:course-agent

# Full project check
npm run verify
git diff --check
```

Save output to:
```
prototypes/cours/maths-specialite/<chapter-name>/verification-notes.md
```

Include date, commands run with exit codes, and any warnings resolved.

**Acceptance criteria:** Both verify scripts pass. Full verify passes with no unexpected failures.

---

## Step 8: Open a Pull Request

```bash
git add .
git commit -m "feat: add <chapter-name> course page"
git push origin <your-branch>
```

### PR requirements
- **Title**: `Add <Chapter Name> course page`
- **Description**: Include the source map from step 3 as a checklist or table
- **Body includes**:
  - Links to source PDFs used
  - Any deviations from course rules (justified)
  - Feynman block status (included or deferred)
  - Verification script output summaries

### After opening
- Comment `/claim #2` in the PR to register the bounty via Opire
- Respond to reviewer comments within 48 hours

**Acceptance criteria:** A PR is open, includes the source map, links back to the bounty issue.

---

## Quick Reference

| Purpose | Path / Command |
|---------|---------------|
| Approved PDF sources | `lien/premiere/math.md` |
| Course creation rules | `docs/regles-creation-cours-maths.md` |
| Learning techniques | `docs/techniques-apprentissage-maths.md` |
| Course pipeline | `docs/pipeline-cours-ia.md` |
| AI agent guidance | `AGENTS.md` > `CLAUDE.md` |
| Source map template | `prototypes/cours/_templates/source-map.md` |
| Existing example | `prototypes/cours/maths-specialite/second-degre/` |
| Generate TD | `node scripts/generate-maths-specialite-td.mjs` |
| Extract PDF text | `node scripts/course-extract-text.mjs` |
| Verify sidebar | `npm run verify:course-sidebar` |
| Verify course agent | `npm run verify:course-agent` |
| Full verification | `npm run verify` |

---

## Checklist

- [ ] Step 1: PDF source identified in `lien/premiere/math.md`
- [ ] Step 2: Course rules read and understood
- [ ] Step 3: PDFs extracted, `source-map.md` created
- [ ] Step 4: `index.html` + `td.html` built from shared template
- [ ] Step 5: KaTeX formulas + JSXGraph visualizations added
- [ ] Step 6: AI Feynman block placed (or follow-up issue opened)
- [ ] Step 7: Verification scripts pass, `verification-notes.md` created
- [ ] Step 8: PR opened with source map in description
