---
phase: 02-heatmap-ats-dynamique
status: issues_found
depth: standard
files_reviewed: 1
findings:
  critical: 3
  warning: 6
  info: 6
  total: 15
reviewed: 2026-05-14
---

# Code Review — Phase 02: Heatmap ATS Dynamique

## Summary

1 file reviewed (`ats.html`) at standard depth. 3 critical issues found and auto-fixed before verification. 6 warnings noted (2 advisory, 4 latent). 6 info items for future phases.

---

## Critical (3) — all fixed inline

### CR-01: `res.ok` never checked before `res.json()`

**File:** `ats.html` — `loadData()`
**Risk:** 404 or server error body parsed as JSON, silent corrupt render.
**Fix applied:** `if (!res.ok) { throw new Error("HTTP " + res.status); }` added after fetch.

---

### CR-02: `Math.max.apply(null, [])` returns `-Infinity` when all topics empty

**File:** `ats.html` — `loadData()`
**Risk:** All bar widths render as `NaN%` (zero-width) when data is empty.
**Fix applied:** `maxScore = allScores.length > 0 ? Math.max.apply(null, allScores) : 1;`

---

### CR-03: `data["mathematiques"]` accessed without existence guard

**File:** `ats.html` — `loadData()`
**Risk:** `TypeError` crash if JSON key renamed or absent; partial DOM mutation before catch.
**Fix applied:** `var mathTopics = data["mathematiques"] || [];` + render functions use `mathTopics`.

---

## Warnings (6)

### WR-01: `innerHTML = ""` used to clear heatmap grid

**File:** `ats.html` — `buildYearHeader`, filter click handler
**Severity:** Low — no XSS risk (no user data). Breaks project convention of createElement-only DOM.
**Recommendation:** Replace with `while (el.firstChild) { el.removeChild(el.firstChild); }`

---

### WR-02: `allYears` is a global union across all matieres

**File:** `ats.html` — `loadData()`
**Severity:** Latent — harmless now (4 empty matieres). When physique-chimie data added, maths heatmap gains spurious columns.
**Recommendation:** Compute years per active matiere at render time.

---

### WR-03: Priority badge assignment assumed sorted input — FIXED

**File:** `ats.html` — `renderPriorityList()`
**Fix applied:** `topics.slice().sort(function(a, b) { return b.score - a.score; })` added at top of function.

---

### WR-04: `hmClass` encodes row total, not per-cell count — legend misleading

**File:** `ats.html` — heatmap legend
**Severity:** UX — legend says "1x/2x/3x/4x+" implying per-year, but color actually encodes total occurrences across all years.
**Recommendation:** Update legend to clarify "frequence totale du chapitre" or rework to per-year counts.

---

### WR-05: `var k2` rename is a workaround for `var` hoisting collision

**File:** `ats.html` — `loadData()`
**Severity:** Low — works correctly but fragile. Second `var k` → `var k2` to avoid same-scope redeclaration.
**Recommendation:** Replace `var` with `let`/`const` throughout the module script (valid in `type="module"`).

---

### WR-06: Year type inconsistency — `indexOf` silently fails if years stored as strings

**File:** `ats.html` — `renderHeatmapRows()`
**Severity:** Latent — JSON currently emits integers. If year ever emitted as string, all cells show `"--"`.
**Recommendation:** Normalize: `var present = topic.years.map(Number).indexOf(years[y]) !== -1;`

---

## Info (6)

| ID | Location | Note |
|----|----------|------|
| IN-01 | Hero stats | "73%", "3 chapitres critiques", "8 sem." are static HTML — will become stale |
| IN-02 | Page subtitle | "134 chapitres analyses" is hardcoded and factually wrong (4 topics) |
| IN-03 | Priority list | Mastery bar hardcoded 50% and pct "--" looks like live data — show explicit placeholder |
| IN-04 | Sidebar nav | "Aujourd'hui", "Planning", "Progression" all link to index.html |
| IN-05 | Priority list freq | "14x / 7 ans" mixes totalOccurrences with years.length — clarify semantics |
| IN-06 | loadData | No loading state shown during fetch — blank heatmap on slow connections |

---

## Self-Check: PASSED

All critical findings resolved before verification. Remaining warnings are latent (safe for current data) or UX improvements for future phases.