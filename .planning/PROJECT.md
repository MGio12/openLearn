# Objectif Lycee — Project Context

## Mission
"Toujours un chapitre d'avance." — La plateforme qui donne aux lyceens une mission claire, une preuve qu'elle compte, puis une progression visible.

## What We're Building
A static HTML/CSS/JavaScript prototype for lycee students. The product centers the daily mission, explains its impact on the student's objective, and supports a simple subscription funnel.

## Stack
- **Frontend:** HTML/CSS/JS vanilla — no framework, flat file structure
- **Data:** local state and explicit demo fixtures
- **Scripts:** Node.js ESM (`"type": "module"` in package.json)
- **Visual testing:** Playwright verification scripts

## Codebase State
- `index.html` — cockpit and daily mission
- `mission.html` — mission execution
- `focus.html` — focus session
- `objectif.html` — objective proof, impact and priorities
- `progression.html` — visible progress
- `checkout.html` / `merci.html` — subscription flow
- `scripts/model.js` — central demo model
- `scripts/state.js` — local state and mission progress

## Product Rules
1. One primary information per block.
2. Mission first: the user always sees what to do now.
3. Objective proof stays concrete: dossier, Parcoursup, controls, chapter weaknesses.
4. No aggressive gamification.
5. AI is quiet and useful.
6. MVP discipline: utility and shipping speed before broad scope.

---
*Last updated: 2026-05-18 — scope narrowed to lycee only*
