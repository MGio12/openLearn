# Outil Prepa — Project Context

## Mission
"Toujours un chapitre d'avance." — La plateforme d'apprentissage qui donne aux étudiants ATS et lycéens un coup d'avance permanent sur leur programme.

## What We're Building
A web-based study platform that generates personalized daily study missions from real concours data. Phase 1 targets ATS students (800-1000/year) as proof-of-concept + content creation. Phase 2+ expands to lycéens with objective-driven personalized paths.

## Stack
- **Frontend:** HTML/CSS/JS vanilla — no framework, flat file structure
- **Data:** JSON files in `data/ats/` — scored topics from real ATS concours PDFs (2018→2024)
- **Scripts:** Node.js ESM (`"type": "module"` in package.json)
- **Scoring:** `score = frequency × recencyWeight(0.9^age) + juryBonus(0.2)`
- **Visual testing:** Playwright screenshots + Claude review loop
- **Shell:** PowerShell 5.1 on Windows 11 — all JSON writes use `[System.IO.File]::WriteAllText` with no-BOM UTF-8

## Codebase State (Phase 1 Delivered)
- `index.html` — Landing page
- `ats.html` — ATS deep-dive: static heatmap + frequency data (needs to become dynamic)
- `focus.html` — Focus/planning page
- `data/ats/sujets/{2018-2024}/mathematiques.json` — Tagged topic data
- `data/ats/poids/weighted-topics.json` — Generated weighted scores (4 math topics)
- `scripts/compute-weights.js` — Recomputes weighted-topics.json from all sujets
- `scripts/screenshot.js` — Playwright visual review
- `scripts/_server.cjs` — Static HTTP server for Playwright

## Critical Constraints
- **No BOM on JSON files**: PowerShell 5.1 adds BOM with `-Encoding utf8`; use `[System.IO.File]::WriteAllText` with `[System.Text.UTF8Encoding]::new($false)`
- **No template literals in scripts written via PowerShell**: backticks get eaten; use string concatenation
- **gsd-workflow-guard.js hook**: blocks Write/Edit tools → all file creation via PowerShell WriteAllText
- **PostToolUse hooks fail on Windows**: non-blocking noise, ignore

## Product Rules (permanent)
1. One primary information per block — never 20 metrics visible at once
2. "Coup d'avance" always visible — user sees their position vs. program immediately
3. Zero aggressive gamification — discrete streaks, real progression, never "LEVEL UP"
4. AI is silent — suggests, doesn't shout. Calm strategic assistant.
5. Human-first branding — photos, videos, blog — all organic, sourced
6. MVP discipline — utility + shipping speed before visual perfection