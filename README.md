# ObjectifLycée

**Free. Open source. Built for every French high school student — not just the ones whose parents can afford tutoring.**

[![Open Source — MIT](https://img.shields.io/badge/open%20source-MIT-blue.svg)](LICENSE)
[![Made for Students](https://img.shields.io/badge/made%20for-lyc%C3%A9ens-yellow.svg)]()
[![No Paywall](https://img.shields.io/badge/paywall-none-green.svg)]()

---

ObjectifLycée is a **free, open source** study cockpit for French high school students (*lycéens*). It gives you a clear daily mission based on your objectives, upcoming tests, and the subjects that matter most — so you stop working randomly and start working smart.

**No subscription. No paywall. No credit card. Ever.**

---

## Why open source?

Because quality education shouldn't depend on your parents' income.

Private tutoring in France costs 30–45 €/hour. Most students who need it most can't access it. ObjectifLycée is **open source** precisely so that every student — whether in a ZEP school or a private lycée — gets the same clear, daily framework for study.

But there is a deeper reason: **we want to train the next generation of open source contributors, starting from high school**.

When you use ObjectifLycée, you're not just studying. You're using software built by a student, with AI as a coding partner, on a fully **open source** codebase you can read, fork, and improve. We want you to go from *user* to *contributor*. Learning to use AI tools effectively — to ask better questions, review code, understand an architecture — is itself a skill that will matter as much as any subject in your curriculum.

This project is a living example of what you can build with HTML, CSS, vanilla JavaScript, and an AI pair-programmer. It runs without a backend, without a framework, without a build step for most pages. You could fork it tonight and adapt it for your school or region.

**Open source from day one. Open source forever.**

---

## What is ObjectifLycée?

A static study cockpit that runs entirely in your browser:

- **Daily mission** — the app picks the right chapter to work on today, based on your objectives and test calendar
- **Smart progression** — track your grades and see them move over time, by subject and by term
- **Interactive math courses** — dense, KaTeX-rendered lessons with exact JSXGraph graphs, hidden corrections, and immediate exercises
- **AI feedback pilot** — try the Feynman-method AI block on the *Second Degré* chapter: write your explanation, get a diagnosis, retry
- **Planning & tracking** — manage your test calendar and upcoming deadlines
- **Onboarding in 2 minutes** — answer 15 questions, get your first mission immediately

Everything runs client-side. No server. No account required to browse. No data sent anywhere without your knowledge.

---

## Who is this for?

- **Students** who open their notebooks at night and don't know where to start
- **Parents** who want a clear view of what their child is working on, without becoming a second teacher every evening
- **Open source contributors** — especially students — who want to learn by building real educational software with AI

If you're a *lycéen* and you want to understand how this is built, improve it, or adapt it for your own school — **you are exactly who this project is for**.

---

## Tech stack

Intentionally simple. Readable six months later. No magic.

| Layer | Choice | Why |
|---|---|---|
| Pages | HTML / CSS / JS vanilla | No build step, readable by anyone, forkable in 5 minutes |
| Math rendering | [KaTeX](https://katex.org/) | Fast, exact, accessible LaTeX in the browser |
| Math graphs | [JSXGraph](https://jsxgraph.uni-bayreuth.de/) | Deterministic, interactive, exact — never hand-drawn SVGs |
| Onboarding | React 18 (UMD CDN) | One exception to the vanilla rule — pre-compiled bundle at `onboarding/onboarding.bundle.js` |
| Fonts | Archivo Black + Plus Jakarta Sans | Open source typefaces |
| Icons | Phosphor Icons | Open source icon set |

No framework. No backend. No database. Just open source files you can read and change.

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
├── onboarding.html         # 2-minute onboarding (React)
├── onboarding/             # React source (state.jsx, screens, app.jsx)
├── assets/
│   ├── css/pages/          # Per-page styles
│   └── js/                 # Vanilla JS modules
├── prototypes/cours/       # Math course prototypes (KaTeX + JSXGraph)
│   └── maths-specialite/   # Première — Second degré, Derivation, Suites…
├── docs/                   # Architecture decisions & creation guides
├── lien/                   # Validated PDF source links (maths Première)
└── scripts/                # Verification & build tools
```

---

## Math courses

The `prototypes/cours/maths-specialite/` directory contains interactive HTML math lessons for *Première Spécialité*:

- **Second Degré** — includes the open source AI Feynman-method pilot block
- **Dérivation**
- **Exponentielle**
- **Suites**
- **Variables aléatoires**
- *more chapters in progress*

Each course is:

- Built from validated PDFs (Maths91, Maths-et-tiques — see `lien/premiere/math.md`)
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

Astro pilot (isolated second-degré chapter):

```bash
npm run dev:courses
npm run build:courses
npm run verify:courses-astro
```

---

## Contributing

Open source means you can contribute. Here is what is most useful:

- **Fix a math error** — if you spot an incorrect formula, wrong example, or missing step, open a PR
- **Add a chapter** — follow the guide in `docs/regles-creation-cours-maths.md` and use the PDF sources in `lien/`
- **Improve the UI** — HTML/CSS changes are small and self-contained
- **Build AI blocks** — the Feynman pilot at `prototypes/cours/maths-specialite/second-degre/` is the reference; extend it to other chapters
- **Translate or adapt** — this project is French-first but the architecture is language-agnostic

**If you are a high school student contributing for the first time: that is exactly the point.**

Open a small PR, ask questions in issues, learn how the codebase works. You will be learning git, HTML, and how to use AI as a coding partner — skills that matter far beyond the *bac*. The next generation of open source contributors is in lycée right now.

### Run before submitting a PR

```bash
npm run verify
npm run verify:course-sidebar
npm run verify:course-agent
git diff --check
```

---

## Open source commitment

This project is released under the **MIT License** — which means you can:

- Use it freely for personal or educational purposes
- Fork it and adapt it for your school, region, or subject
- Build on top of it and keep your changes open source
- Redistribute it as-is or modified

The only thing we ask: if you improve it in a way that helps other students, consider sending it back upstream as a pull request.

**ObjectifLycée is open source because education is a public good. Not a product.**

---

## Agent rules

The agent instructions are versioned in the repository so they remain available from any clone.

1. Read `AGENTS.md` first.
2. Use `CLAUDE.md` as the project source of truth.
3. For a math course, apply the **Course Page Agent** role.
4. Never produce a chapter from memory when validated PDFs exist.

Key rules for math courses:

- the course must make the student produce work, not just read a correction
- notations stay stable between definition, method, example, and correction
- equations must be clean, in KaTeX, separated or numbered when there are multiple answers
- no formula should be compressed, horizontally scrolled, or cut arbitrarily
- math graphs must be exact with JSXGraph, Desmos, GeoGebra, or computed points — never hand-drawn
- the course sidebar stays fixed on the left, open on first load, collapsed by width, with a closed centered non-clickable arrow

---

## About

Built by Max — a student in *classe préparatoire scientifique*, previously at a ZEP school in France.

The project started from a simple observation: private tutoring gives students one thing beyond content — a person who notices when they're stuck, slows down, and gives them the next concrete step. ObjectifLycée tries to make that available to everyone, every evening, through **open source software and AI**.

The code is simple on purpose. It should be readable by a student who has been coding for six months. If you find something confusing, that is a bug — open an issue.

---

## License

MIT — see [LICENSE](LICENSE)

---

*ObjectifLycée — free, open source study tools for French high school students.*
*Because the next generation of open source contributors is sitting in lycée right now.*
