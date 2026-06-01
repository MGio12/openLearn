# openLearn

**Free. Open source. Built for every French high school student - not just the ones whose parents can pay for a tutor.**

[![CI](https://github.com/MGio12/openLearn/actions/workflows/verify.yml/badge.svg)](https://github.com/MGio12/openLearn/actions/workflows/verify.yml)
[![Open Source - MIT](https://img.shields.io/badge/open%20source-MIT-blue.svg)](LICENSE)
[![Made for Students](https://img.shields.io/badge/made%20for-lyc%C3%A9ens-yellow.svg)]()
[![No Paywall](https://img.shields.io/badge/paywall-none-green.svg)]()

---

openLearn is a free, open source study cockpit for French high school students (*lycéens*). It gives you one clear mission every day - based on your upcoming tests and what matters most right now - so you stop opening your notebook and staring at it.

**No subscription. No paywall. No credit card. Ever.**

---

## Why open source?

Because a student's shot at a good education shouldn't depend on what their parents earn.

Private tutoring in France runs 30-45 €/hour. Most students who need it can't afford it. openLearn is open source so every student - ZEP school or private lycée - gets the same framework.

But there's a deeper reason. **We want to train the next generation of open source contributors, starting from high school.**

When you use openLearn, you're not just studying. You're using software built by a student, with AI as a coding partner, on a codebase you can read, fork, and improve. The goal is for you to go from user to contributor. Knowing how to use AI well - asking the right questions, reviewing code, understanding an architecture - is a skill that'll matter as much as anything else in your curriculum. Maybe more.

This project is a live example of what you can build with HTML, CSS, vanilla JS, and an AI pair-programmer. No backend. No framework. No build step for most pages. You could fork it tonight.

**Open source from day one. Open source forever.**

---

## What is openLearn?

A static study cockpit that runs entirely in your browser:

- **Daily mission** - the app picks the right chapter to work on today, based on your objectives and test calendar
- **Smart progression** - track your grades and watch them move over time, by subject and by term
- **Interactive math courses** - dense, KaTeX-rendered lessons with exact JSXGraph graphs, hidden corrections, and immediate exercises
- **AI feedback pilot** - try the Feynman-method AI block on the *Second Degré* chapter: write your explanation, get a diagnosis, retry
- **Planning & tracking** - manage your test calendar and upcoming deadlines
- **Onboarding in 2 minutes** - answer 15 questions, get your first mission right away

Everything runs client-side. No server. No account needed to browse. No data sent anywhere without your knowledge.

---

## Who is this for?

- **Students** who open their notebooks at night and don't know where to start
- **Parents** who want a clear view of what their child is working on, without becoming a second teacher every evening
- **Contributors** - especially students - who want to learn by building real software with AI

If you're a *lycéen* and you want to understand how this is built, improve it, or adapt it for your school - you're exactly who this project is for.

---

## Tech stack

Intentionally simple. Readable six months later. No magic.

| Layer | Choice | Why |
|---|---|---|
| Pages | HTML / CSS / JS vanilla | No build step, readable by anyone, forkable in 5 minutes |
| Math rendering | [KaTeX](https://katex.org/) | Fast, exact, accessible LaTeX in the browser |
| Math graphs | [JSXGraph](https://jsxgraph.uni-bayreuth.de/) | Deterministic, interactive, exact - never hand-drawn SVGs |
| Onboarding | React 18 (UMD CDN) | One exception to the vanilla rule - pre-compiled bundle at `onboarding/onboarding.bundle.js` |
| Fonts | Archivo Black + Plus Jakarta Sans | Open source typefaces |
| Icons | Phosphor Icons | Open source icon set |

No framework. No backend. No database. Just files you can read and change.

---

## Getting started

```bash
git clone https://github.com/MGio12/openLearn.git
cd openLearn
npm install
```

Serve locally (Python):

```bash
python3 -m http.server 4173
```

Or with Node:

```bash
npx serve . -p 4173
```

Open `http://localhost:4173`.

Run all checks:

```bash
npm run verify
```

---

## Project structure

```
/
├── index.html              # Daily cockpit (main entry point)
├── objectif.html           # Objective & mission rationale
├── planning.html           # Test calendar
├── progression.html        # Grade tracking & streaks
├── contenu.html            # Content browser
├── checkout.html           # Open access page
├── apropos.html            # About page
├── openSource.html         # Open source page
├── onboarding.html         # 2-minute onboarding (React)
├── onboarding/             # React source (state.jsx, screens, app.jsx)
├── assets/
│   ├── css/pages/          # Per-page styles
│   └── js/                 # Vanilla JS modules
├── prototypes/cours/       # Math course prototypes (KaTeX + JSXGraph)
│   └── maths-specialite/   # Premiere - Second degre, Derivation, Suites...
├── docs/                   # Architecture decisions & creation guides
├── lien/                   # Validated PDF source links (maths Premiere)
└── scripts/                # Verification & build tools
```

---

## Math courses

The `prototypes/cours/maths-specialite/` directory contains interactive HTML math lessons for *Premiere Specialite*:

- **Second Degre** - includes the AI Feynman-method pilot block
- **Derivation**
- **Exponentielle**
- **Suites**
- **Variables aleatoires**
- *more chapters in progress*

Each course is:

- Built from validated PDFs (Maths91, Maths-et-tiques - see `lien/premiere/math.md`)
- Dense with mathematics, not decorative filler
- KaTeX-rendered, no hand-drawn graphs
- Verified with `npm run verify:course-sidebar` and `npm run verify:course-agent`

---

## Verification commands

General site check:

```bash
npm run verify
```

Local account check (onboarding, persistence, profile display):

```bash
npm run verify:local-account
```

AI endpoint check (Feynman pilot, mock + real key):

```bash
npm run verify:ai-endpoint
```

Course checks:

```bash
npm run verify:course-sidebar
npm run verify:course-agent
```

Astro pilot (isolated second-degre chapter):

```bash
npm run dev:courses
npm run build:courses
npm run verify:courses-astro
```

---

## Contributing

Open source means you can contribute. Here's what's most useful:

- **Fix a math error** - if you spot an incorrect formula, wrong example, or missing step, open a PR
- **Add a chapter** - follow the guide in `docs/regles-creation-cours-maths.md` and use the PDF sources in `lien/`
- **Improve the UI** - HTML/CSS changes are small and self-contained
- **Build AI blocks** - the Feynman pilot at `prototypes/cours/maths-specialite/second-degre/` is the reference; extend it to other chapters
- **Translate or adapt** - this project is French-first but the architecture is language-agnostic

**If you're a high school student contributing for the first time: that's exactly the point.**

Open a small PR. Ask questions in issues. Learn how the codebase works. You'll be picking up git, HTML, and how to use AI as a coding partner - skills that matter way beyond the *bac*. The next generation of open source contributors is in lycee right now.

### Run before submitting a PR

```bash
npm run verify
npm run verify:course-sidebar
npm run verify:course-agent
git diff --check
```

---

## Open source commitment

This project is under the **MIT License**. You can:

- Use it for personal or educational purposes
- Fork it and adapt it for your school, region, or subject
- Build on top of it
- Redistribute it as-is or modified

If you improve it in a way that helps other students, consider sending it back as a pull request.

**openLearn is open source because education is a public good. Not a product.**

---

## Agent rules

The agent instructions are versioned in the repository so they stay available from any clone.

1. Read `AGENTS.md` first.
2. Use `CLAUDE.md` as the project source of truth.
3. For a math course, apply the **Course Page Agent** role.
4. Never produce a chapter from memory when validated PDFs exist.

Key rules for math courses:

- the course must make the student produce work, not just read a correction
- notations stay stable between definition, method, example, and correction
- equations must be clean, in KaTeX, separated or numbered when there are multiple answers
- no formula should be compressed, horizontally scrolled, or cut arbitrarily
- math graphs must be exact with JSXGraph, Desmos, GeoGebra, or computed points - never hand-drawn
- the course sidebar stays fixed on the left, open on first load, collapsed by width, with a closed centered non-clickable arrow

---

## About

Built by Max - a student in *classe preparatoire scientifique*, previously at a ZEP school in France.

The project started from a simple observation: private tutoring gives students one thing beyond content - someone who notices when they're stuck, slows down, and gives them the next concrete step. openLearn tries to make that available to everyone, every evening, through open source software and AI.

The code is simple on purpose. It should be readable by someone who has been coding for six months. If you find something confusing, that's a bug - open an issue.

---

## License

MIT - see [LICENSE](LICENSE)

---

*openLearn - free, open source study tools for French high school students.*
*Because the next generation of open source contributors is sitting in lycee right now.*
