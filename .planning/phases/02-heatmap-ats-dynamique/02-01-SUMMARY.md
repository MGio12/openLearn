---
plan: 02-01
phase: 02-heatmap-ats-dynamique
status: complete
completed: 2026-05-14
requirements_delivered:
  - ATS-05
  - ATS-06
  - ATS-07
  - ATS-08
  - ATS-09
  - ATS-10
key-files:
  modified:
    - ats.html
  created: []
self-check: PASSED
---

# Summary — 02-01: Heatmap ATS Dynamique

## What Was Built

Replaced all static hardcoded data in `ats.html` with JavaScript that fetches
`weighted-topics.json` at page load and renders the full heatmap dynamically.

## Requirements Delivered

| ID | Description | Status |
|----|-------------|--------|
| ATS-05 | Heatmap rows generated from JSON — zero static topic HTML | Done |
| ATS-06 | Year columns derived from union of all topic.years arrays | Done |
| ATS-07 | Cell states hm-0→hm-4 from totalOccurrences + years presence | Done |
| ATS-08 | Total column: Nx count + stabilo bar proportional to score/maxScore | Done |
| ATS-09 | Matiere chips generated from JSON keys; click re-renders without reload | Done |
| ATS-10 | Priority list sorted by score desc with Critique/Haute/Moyen badges | Done |

## Key Implementation Details

- `buildYearHeader(el, years)` — sets `gridTemplateColumns` dynamically, creates col-head divs
- `renderHeatmapRows(el, topics, years, maxSc, slug)` — wrapper divs with `display:contents` for grid flow
- `renderPriorityList(topics)` — rank badges on first 3 rows, mastery placeholder at 50%
- `buildFilterTabs(data)` — event delegation on `#filter-bar`, re-renders both heatmap and list on click
- `loadData()` — async fetch, computes `allYears` (union+sort) and `maxScore` (global max across all matieres)

## Verified Outputs (Playwright screenshot)

- 4 heatmap rows for mathematiques: Analyse (14x, 100% bar), Algèbre linéaire (10x, ~71%), Géométrie (3x), Calcul différentiel (1x)
- 7 year columns 2018–2024 derived from data
- 5 filter chips rendered (Maths, Physique-Chimie, Francais, Anglais, SI) — Maths active
- Priority list: Analyse (Critique), Algèbre linéaire (Haute), Géométrie (Moyen), Calcul différentiel (no badge)
- Empty-matiere guard: "Aucun sujet tague pour cette matiere." for Physique-Chimie etc.

## Deviations

- None. All 3 tasks implemented in a single rewrite pass (pragmatic — all modify the same file).
- `playwright` added as devDependency to enable `npm run screenshot` verification.
- No backtick characters used anywhere in JS (PowerShell constraint respected).