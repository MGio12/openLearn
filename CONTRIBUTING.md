# Contributing to ObjectifLycée

Thanks for being here. This project exists to give every French high school student access to the same quality of study support that used to cost 30-45 €/hr in private tutoring. Every contribution - a fixed formula, a clearer explanation, a new chapter - helps a real student.

**If you are a high school student contributing for the first time: that is exactly the point.** This codebase is intentionally simple. It should be readable if you have been coding for six months.

---

## Quick start

```bash
git clone https://github.com/MGio12/openLearn.git
cd openLearn
npm install
python3 -m http.server 4173   # or: npx serve . -p 4173
```

Open `http://localhost:4173`.

---

## Your first PR

1. **Fork** the repo on GitHub and clone your fork locally.
2. **Create a branch** with a short descriptive name: `git checkout -b fix/suites-formula` or `feat/derivation-chapter`.
3. **Make your change.** Keep it focused - one fix or one feature per PR.
4. **Run the checks** (see below) before pushing.
5. **Open a PR** against `master`. Fill in the PR template. If you are unsure about something, open a draft PR and ask in the comments.

---

## What to contribute

- **Fix a math error** - incorrect formula, wrong example, missing step, ambiguous notation. Open a PR directly.
- **Add a math chapter** - follow `docs/regles-creation-cours-maths.md` and use the PDF sources in `lien/premiere/math.md`. See [issue #2](https://github.com/MGio12/openLearn/issues/2) for the step-by-step guide (in progress).
- **Improve the UI** - HTML and CSS changes are small and self-contained.
- **Extend AI blocks** - the Feynman-method pilot lives in `prototypes/cours/maths-specialite/second-degre/`. See [issue #1](https://github.com/MGio12/openLearn/issues/1) for the roadmap.
- **Improve documentation** - clearer explanations, better examples, fixed typos.

---

## Before submitting

```bash
npm run verify                  # general site check
npm run verify:course-sidebar   # if you touched a course page
git diff --check                # whitespace
```

All checks must pass. The PR template has the full checklist.

---

## Language

- Code and comments: English.
- Commit messages: English.
- Issues and PR discussions: French is fine, English is fine, mix is fine.

---

## Questions

Open an issue or start a discussion. There are no stupid questions here - if something is confusing about the codebase, that is a bug in the documentation, not a problem with you.
