# Requirements

This file is the explicit capability and coverage contract for the project.

Use it to track what is actively in scope, what has been validated by completed work, what is intentionally deferred, and what is explicitly out of scope.

## Active

### R001 — Mission du jour centrale
- Class: primary-user-loop
- Status: active
- Description: The dashboard must answer “what should I work on today?” before it shows broad analytics.
- Why it matters: The user wants simplification and action, not another data dashboard that creates more decisions.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S02, M001/S05
- Validation: mapped
- Notes: The mission should include 2-3 concrete actions, a realistic duration, and a short reason why it matters today.

### R002 — Tunnel statique cohérent
- Class: launchability
- Status: active
- Description: The static pages must form a coherent flow from dashboard to mission/objective proof, checkout, Stripe, and post-payment confirmation.
- Why it matters: Conversion depends on the user never feeling lost or dropped between disconnected prototype pages.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S03, M001/S05
- Validation: mapped
- Notes: Core flow: `index.html` → `mission.html` / `objectif.html` → `checkout.html` → Stripe Payment Link → `merci.html`.

### R003 — Page abonnement persuasive et fiable
- Class: core-capability
- Status: active
- Description: `checkout.html` must sell the 10 €/month offer as an investment in oneself, a good deal, and a serious study environment.
- Why it matters: The current business validation depends on a static subscription page that can convert before backend work begins.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S04, M001/S05
- Validation: mapped
- Notes: Avoid generic SaaS copy and keep the intimate “carnet de lycee vivant” feeling.

### R004 — Confiance paiement visible
- Class: compliance/security
- Status: active
- Description: Payment trust must be explicit: Stripe handles the payment, Objectif Lycee stores no banking details, and the subscription terms are clear.
- Why it matters: A student must not feel that the payment page is opaque, risky, or improvised.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S05
- Validation: mapped
- Notes: No Stripe secret or private API key may appear in frontend code.

### R005 — Direction artistique intime, non IA-slop
- Class: differentiator
- Status: active
- Description: The interface must feel crafted, specific, and intimate: paper, stabilo, files, study cards, annotations, and physical-feeling interactions.
- Why it matters: The user believes low-price conversion comes from intimacy and specificity, not generic AI/SaaS aesthetics.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S01, M001/S02, M001/S03
- Validation: mapped
- Notes: Avoid generic gradients, fake badges, corporate language, and gadget animations.

### R006 — Micro-interactions utiles et accessibles
- Class: quality-attribute
- Status: active
- Description: Hover and motion details must reinforce the study environment and remain understandable on touch/mobile devices.
- Why it matters: Interactions should communicate craft and interactivity without hiding important content behind hover-only behavior.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: M001/S05
- Validation: mapped
- Notes: Dossier/card motion, annotations, and pressed CTA states are preferred when they support meaning.

### R007 — Responsive desktop/mobile vérifié
- Class: quality-attribute
- Status: active
- Description: The core static tunnel must be usable and visually coherent on desktop and mobile.
- Why it matters: Students may inspect and purchase from phones; mobile breakage would damage trust quickly.
- Source: inferred
- Primary owning slice: M001/S05
- Supporting slices: M001/S01, M001/S02, M001/S03, M001/S04
- Validation: mapped
- Notes: No horizontal overflow, hidden critical content, or hover-only key interactions.

### R008 — Stripe Payment Link câblé sans secret
- Class: integration
- Status: active
- Description: The checkout CTA must use a Stripe Payment Link URL and never require or expose Stripe API secrets.
- Why it matters: This lets the static prototype validate payment intent safely without backend complexity.
- Source: execution
- Primary owning slice: M001/S03
- Supporting slices: M001/S05
- Validation: mapped
- Notes: `scripts/checkout.js` validates `https://buy.stripe.com/...` or `https://checkout.stripe.com/...` URLs.

### R009 — Expérience post-paiement cohérente
- Class: continuity
- Status: active
- Description: `merci.html` must feel like the start of the user’s routine, not only a receipt page.
- Why it matters: Retention starts immediately after purchase; the user should feel they entered an environment, not just completed a transaction.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S05
- Validation: mapped
- Notes: It may point back to cockpit/mission surfaces while staying honest about static scope.

### R010 — Preuve objectif en support, pas en surcharge
- Class: differentiator
- Status: active
- Description: objective analysis should support why a mission is chosen, without becoming the central experience of the dashboard.
- Why it matters: The user wants focus and simplification; data is useful only when it explains the next action.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S02
- Validation: mapped
- Notes: `objectif.html` remains a proof surface and transparency layer.

## Validated

None yet for the new M001 contract. Existing code demonstrates partial foundations, but validation requires the planned end-to-end review.

## Deferred

### R011 — Accès abonné réel
- Class: core-capability
- Status: deferred
- Description: Gate subscriber-only functionality after payment.
- Why it matters: Required for a real product, but not needed to validate static UX and conversion feel.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Future milestone.

### R012 — Auth et comptes utilisateurs
- Class: integration
- Status: deferred
- Description: Add accounts, login, and user identity.
- Why it matters: Needed for real personalization and subscription continuity later.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Future milestone.

### R013 — Personnalisation dynamique réelle
- Class: core-capability
- Status: deferred
- Description: Generate real missions based on user data and progress.
- Why it matters: The static prototype simulates the feeling; the real product will need actual dynamic logic.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Future milestone after UX direction is validated.

### R014 — Synchronisation calendrier réelle
- Class: integration
- Status: deferred
- Description: Connect to actual schedules/calendars to adapt missions.
- Why it matters: Schedule-aware planning is valuable, but can be represented statically for M001.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Do not imply live calendar sync in M001 copy.

### R015 — Tracking analytics complet
- Class: operability
- Status: deferred
- Description: Capture funnel analytics for clicks, checkout starts, and conversions.
- Why it matters: Needed for business learning, but M001 focuses on the static experience first.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Could be added later with Plausible/GA or custom events.

### R016 — SEO content hub complet
- Class: launchability
- Status: deferred
- Description: Build a broader lycee SEO content hub around priorities, planning, and bac prep.
- Why it matters: Acquisition matters, but the confirmed immediate milestone is static UX/conversion craft.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Future M002.

## Out of Scope

### R017 — Backend ou base de données en M001
- Class: constraint
- Status: out-of-scope
- Description: M001 must not introduce backend services, databases, or server-side state.
- Why it matters: The user explicitly wants static UI/UX polish before serious backend construction.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Keep build simple and design-iteration friendly.

### R018 — Clés Stripe API dans le frontend
- Class: anti-feature
- Status: out-of-scope
- Description: Stripe private or secret API keys must never appear in static frontend code.
- Why it matters: Exposing secrets would create a security risk and break trust.
- Source: security
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Payment Link only in M001.

### R019 — Trois vrais abonnements Stripe complexes
- Class: anti-feature
- Status: out-of-scope
- Description: M001 should not create multiple real Stripe subscription products or complex plan gating.
- Why it matters: It would add complexity and confusion before validating the core 10 €/month value proposition.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Pricing cards may be visual anchors, but only one real paid offer is needed now.

### R020 — Promettre une personnalisation réelle non construite
- Class: anti-feature
- Status: out-of-scope
- Description: The UI must not claim live calendar sync, real account personalization, or actual adaptive algorithms until built.
- Why it matters: Trust depends on an honest static prototype.
- Source: user/inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Use phrasing like “créneau type” or “exemple de mission” when appropriate.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | primary-user-loop | active | M001/S01 | M001/S02, M001/S05 | mapped |
| R002 | launchability | active | M001/S02 | M001/S03, M001/S05 | mapped |
| R003 | core-capability | active | M001/S03 | M001/S04, M001/S05 | mapped |
| R004 | compliance/security | active | M001/S03 | M001/S05 | mapped |
| R005 | differentiator | active | M001/S04 | M001/S01, M001/S02, M001/S03 | mapped |
| R006 | quality-attribute | active | M001/S04 | M001/S05 | mapped |
| R007 | quality-attribute | active | M001/S05 | M001/S01, M001/S02, M001/S03, M001/S04 | mapped |
| R008 | integration | active | M001/S03 | M001/S05 | mapped |
| R009 | continuity | active | M001/S02 | M001/S05 | mapped |
| R010 | differentiator | active | M001/S01 | M001/S02 | mapped |
| R011 | core-capability | deferred | none | none | unmapped |
| R012 | integration | deferred | none | none | unmapped |
| R013 | core-capability | deferred | none | none | unmapped |
| R014 | integration | deferred | none | none | unmapped |
| R015 | operability | deferred | none | none | unmapped |
| R016 | launchability | deferred | none | none | unmapped |
| R017 | constraint | out-of-scope | none | none | n/a |
| R018 | anti-feature | out-of-scope | none | none | n/a |
| R019 | anti-feature | out-of-scope | none | none | n/a |
| R020 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 10
- Mapped to slices: 10
- Validated: 0
- Unmapped active requirements: 0
