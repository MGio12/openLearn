# Outil Prepa — Dashboard Cockpit Implementation Spec

**Date:** 2026-05-14
**Source design:** `ui_kits/app/index.html` from the Outil Prepa Design System bundle

---

## What we're building

A standalone HTML/CSS/JS implementation of the Outil Prepa dashboard cockpit. Faithfully reproduces the prototype pixel-for-pixel, with all assets co-located and paths resolved.

## Approach

**Option A — Plain HTML/CSS/JS.** Copy and adapt the prototype files into the project root, fixing all relative asset paths.

## File structure

```
projetPrepaV2/
├── index.html               ← cockpit shell (4 views)
├── focus.html               ← immersive dark focus mode
├── ats.html                 ← ATS deep-dive
├── mission.html             ← single mission detail
├── onboarding.html          ← 8-step onboarding
├── styles.css               ← dashboard styles
├── onboarding.css
├── focus.css
├── colors_and_type.css      ← all CSS tokens + fonts
└── fonts/
    ├── ArchivoBlack-Regular.ttf
    ├── PlusJakartaSans-VariableFont_wght.ttf
    ├── PlusJakartaSans-Italic-VariableFont_wght.ttf
    └── Caveat-VariableFont_wght.ttf
```

## Path corrections needed

`styles.css` imports `../../colors_and_type.css` and `../../fonts/` — after copying to project root, these must become `./colors_and_type.css` and `./fonts/`.

## Out of scope

- Data persistence / backend
- Real authentication
- Mobile responsiveness beyond the prototype
