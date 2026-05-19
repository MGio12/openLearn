---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: lycee_only
status: active
last_updated: "2026-05-18T00:00:00.000Z"
progress:
  total_phases: 5
  completed_phases: 2
  percent: 40
---

# State — Objectif Lycee

## Current Phase

**Phase 3 — Paiement Stripe**
Status: code implemented; Stripe dashboard setup required.

## Last Action

The project scope is now lycee only. The active site uses `objectif.html` as the proof page for dossier, Parcoursup and priority impact. Legacy exam-specific data and scripts outside the lycee scope are out of scope.

## Known Issues / Decisions

- Keep the product static until the checkout funnel is validated.
- Keep visible priority proof tied to a clear source: demo fixture, local state or explicit school deadline.
- Do not add backend, account promises or multi-device sync copy before those systems exist.

## Next Step

Configure the Stripe Payment Link for the 10 EUR/month subscription, set the success URL to `merci.html`, test checkout, then verify the active subscription in Stripe Dashboard.
