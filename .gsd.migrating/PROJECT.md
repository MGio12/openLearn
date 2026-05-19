# Project

## What This Is

Objectif Lycee is a static HTML/CSS/JavaScript prototype for a preparation tool aimed first at lycee students. The current product shows a study cockpit, objective analysis, a Stripe Payment Link checkout page, and a post-payment confirmation page.

The immediate project is not a backend product yet. It is a premium static experience that makes the user feel they found the right working environment: focused, intimate, useful, and worth paying for.

## Core Value

The one thing that must survive if scope shrinks: Objectif Lycee tells the student what to work on today, with enough confidence and craft that the user feels less lost and more ready to act.

## Project Shape

- **Complexity:** complex
- **Why:** The code is static, but the work spans product positioning, conversion UX, visual craft, Stripe trust, mobile behavior, and a full page-to-page tunnel.

## Current State

Existing files include:

- `index.html` — current dashboard/cockpit experience.
- `objectif.html` — objective proof surface.
- `checkout.html` — improved subscription page with Stripe Payment Link configured.
- `merci.html` — post-payment confirmation page.
- `mission.html`, `focus.html`, `onboarding.html` — supporting static product surfaces.
- `styles.css`, `colors_and_type.css`, and page-local CSS — visual system based on paper, grid, stabilo, cards, and hand-crafted study artifacts.
- `scripts/checkout.js` — Payment Link validation and redirect logic.

The current Stripe integration uses a Payment Link URL in `checkout.html`; no secret Stripe key is exposed.

## Architecture / Key Patterns

- Static HTML pages with inline/page-local CSS where needed.
- Shared brand primitives in `colors_and_type.css` and `styles.css`.
- No framework, backend, auth, database, or real subscriber gate in M001.
- Stripe checkout remains a hosted Payment Link, not a custom API integration.
- Personalization and schedule-aware missions are simulated honestly in UI copy until a later milestone builds real dynamic behavior.

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- [ ] M001: Prototype statique premium orienté mission du jour — make the static tunnel feel focused, trustworthy, valuable, and sellable.
- [ ] M002: Acquisition SEO lycee — create useful lycee search-entry pages that lead into the product and subscription flow.
- [ ] M003: Accès abonné et personnalisation réelle — add real continuity after payment, accounts/access, and dynamic mission logic when the static UX is validated.
