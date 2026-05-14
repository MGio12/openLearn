# M001: Prototype statique premium orienté mission du jour

**Gathered:** 2026-05-14
**Status:** Ready for planning

## Project Description

Outil Prepa is a static prototype for a preparation product aimed first at ATS/prepa students. The immediate milestone is to make the static site feel like a premium, intimate, useful study environment before building backend/auth or real personalization.

The user wants to avoid IA-slop and generic SaaS aesthetics. The experience should feel like a “carnet de prépa vivant”: paper, stabilo, folders, cards, annotations, and creative details that make the user feel they found the environment that will help them evolve in the right conditions.

## Why This Milestone

The existing site has the beginnings of a cockpit, ATS analysis, checkout, Stripe Payment Link, and confirmation page. The current risk is not missing backend functionality; it is that the product may feel like another dashboard with data instead of a clear daily decision surface.

This milestone exists to make the static tunnel sell the core emotional value: “I know what to work on today, this feels serious and personal, and 10 €/month feels like a good investment in myself.”

## User-Visible Outcome

### When this milestone is complete, the user can:

- Open `index.html` and immediately understand the mission of the day: 2-3 concrete actions, a time estimate, and why this is the right work today.
- Move through a coherent static tunnel from daily mission to mission execution/ATS proof, to checkout, to Stripe, to a post-payment confirmation that feels like the beginning of a routine.
- See a subscription page that frames 10 €/month as an investment in themselves and a good deal, while making Stripe/payment trust explicit.

### Entry point / environment

- Entry point: `index.html` in a browser, with supporting pages `mission.html`, `ats.html`, `checkout.html`, and `merci.html`.
- Environment: local/static browser site.
- Live dependencies involved: Stripe hosted Payment Link only.

## Completion Class

- Contract complete means: static files implement the promised page roles, CTA links, Stripe URL wiring, and honest copy boundaries.
- Integration complete means: the static tunnel works across real browser navigation with no broken primary CTA and the Stripe Payment Link remains wired.
- Operational complete means: no long-running service lifecycle requirements beyond local static serving for verification.

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- A user can navigate `index.html` → `mission.html` or `ats.html` → `checkout.html` → Stripe Payment Link, and can see `merci.html` as the coherent post-payment continuation.
- On desktop and mobile, the mission of the day remains visually central and the checkout trust/price message remains understandable.
- The prototype does not imply real backend personalization, live calendar sync, subscriber access control, or Stripe API handling that does not exist.

## Architectural Decisions

### Static-first premium UX

**Decision:** M001 remains a static HTML/CSS/JavaScript prototype focused on visual craft, conversion UX, and coherent user flow.

**Rationale:** The user explicitly wants UI/UX to be very clean before serious construction, and wants to keep iterating with Claude Design. Backend/auth would slow down the craft loop and distract from proving the emotional/conversion value.

**Alternatives Considered:**
- Build backend/auth now — rejected because it is premature for the current goal.
- Only polish `checkout.html` — rejected because conversion depends on the full perceived product environment.

### Mission du jour as center of gravity

**Decision:** Outil Prepa is not first a dashboard of analysis; it is a daily simplification engine. The dashboard must center the “mission du jour.”

**Rationale:** The user explicitly pushed back on a global data dashboard that “sert un peu à rien.” The product should answer “what should I do today with the time I have?”

**Alternatives Considered:**
- Keep coverage/stats as the main dashboard — rejected because it creates more interpretation work for the student.

### Stripe via Payment Link only

**Decision:** M001 uses Stripe hosted Payment Link only; no Stripe secret or API integration is introduced.

**Rationale:** This preserves a safe static prototype while still enabling a real checkout click path.

**Alternatives Considered:**
- Stripe API keys and custom checkout — rejected because that requires backend and creates security risk in a static site.

### Craft feel over generic SaaS design

**Decision:** The visual language should stay in the “carnet de prépa vivant” world: paper, stabilo, folders, cards, annotations, physical-feeling movement.

**Rationale:** The user believes intimacy and specificity will convert better at a low price than a generic polished SaaS page.

**Alternatives Considered:**
- Generic landing-page gradients and SaaS badges — rejected as IA-slop and not aligned with the desired product feeling.

## Error Handling Strategy

For M001, errors are mostly ruptures of trust or clarity rather than backend failures. The site should avoid dead ends, broken CTAs, hover-only critical content, and unsupported promises.

- If Stripe is not configured or the URL is invalid, `scripts/checkout.js` should show the setup panel rather than navigating to a dead page.
- The site must not expose Stripe secret keys or imply it stores banking details.
- Static personalization must be phrased honestly; do not claim live calendar sync or real account personalization.
- Mobile/touch users must see important content without relying on hover.
- Primary CTAs must navigate to real files or the configured Payment Link.

## Risks and Unknowns

- IA-slop visual drift — generic SaaS aesthetics would weaken the intimate conversion angle.
- Dashboard analytic overload — too much data could bury the mission of the day and break the simplification promise.
- Static prototype overclaiming — claiming real personalization before it exists would damage trust.
- Pricing confusion — visual pricing anchors must not obscure the one real 10 €/month offer.
- Mobile interaction gaps — dossier/hover details must remain readable on touch devices.

## Existing Codebase / Prior Art

- `index.html` — existing cockpit/dashboard; must be reoriented around mission du jour.
- `ats.html` — existing ATS proof surface with heatmap/priorities; should support decisions without dominating the main experience.
- `checkout.html` — already improved with Payment Link, trust copy, price framing, and dossier/card interactions; will be refined around the updated value proposition.
- `merci.html` — existing post-payment page; should become a routine continuation surface.
- `mission.html` — existing supporting page; likely becomes central to the routine/execution feeling.
- `colors_and_type.css` / `styles.css` — existing visual foundation.
- `scripts/checkout.js` — existing Stripe Payment Link validation/redirect logic.

## Relevant Requirements

- R001 — Mission du jour centrale.
- R002 — Tunnel statique cohérent.
- R003 — Page abonnement persuasive et fiable.
- R004 — Confiance paiement visible.
- R005 — Direction artistique intime, non IA-slop.
- R006 — Micro-interactions utiles et accessibles.
- R007 — Responsive desktop/mobile vérifié.
- R008 — Stripe Payment Link câblé sans secret.
- R009 — Expérience post-paiement cohérente.
- R010 — Preuve analytique ATS en support, pas en surcharge.

## Scope

### In Scope

- Rework the static dashboard around the mission of the day.
- Make `mission.html` feel like a credible focused execution surface.
- Keep `ats.html` as analytical proof and transparency, not the main routine.
- Refine `checkout.html` for investment-on-self, good-deal framing, trust, and Stripe clarity.
- Refine `merci.html` into a continuity/routine moment.
- Add or improve micro-interactions that feel physical and meaningful.
- Verify desktop/mobile behavior and primary CTA wiring.

### Out of Scope / Non-Goals

- Backend.
- Auth/user accounts.
- Subscriber access control.
- Real dynamic personalization algorithm.
- Real calendar sync.
- Multiple real Stripe subscription products.
- Analytics/tracking implementation unless trivially needed for static UI affordances.
- Full SEO content hub.

## Technical Constraints

- Keep implementation static HTML/CSS/JS.
- No framework introduction.
- No Stripe private keys or API secrets in frontend code.
- Use existing visual foundations where practical.
- Keep pages easy for Claude Design/manual design iteration.
- Do not make critical content depend on hover only.

## Integration Points

- Stripe Payment Link — `checkout.html` meta tag and `scripts/checkout.js` redirect.
- Static navigation — links between `index.html`, `mission.html`, `ats.html`, `checkout.html`, and `merci.html`.
- Existing CSS variables and fonts — shared visual consistency.

## Testing Requirements

- Static inspection that files exist and CTAs point to real targets.
- `node --check scripts/checkout.js`.
- Browser navigation on local static server for `index.html`, `mission.html`, `ats.html`, `checkout.html`, `merci.html`.
- Desktop and mobile viewport checks.
- Browser console/network review for blocking errors.
- Explicit verification that checkout CTA contains the Stripe Payment Link and no secret key is exposed.

## Acceptance Criteria

- `index.html` visually prioritizes a daily mission over global stats.
- Daily mission contains 2-3 actions, a duration, and a reason tied to priority/time.
- `mission.html` can be reached from the dashboard and feels like focused execution, not an orphan page.
- `ats.html` remains useful as proof of prioritization but does not define the main dashboard experience.
- `checkout.html` explains why 10 €/month is a good investment, not just a price.
- Payment trust is visible and plain: Stripe handles payment, no banking data stored by Outil Prepa, subscription terms clear.
- `merci.html` makes the user feel the routine begins now.
- Physical-feeling interactions and craft details exist without relying on hover for critical content.
- Core pages render acceptably on mobile and desktop.
- Primary navigation and CTA links have no dead ends.

## Open Questions

- How far to polish `focus.html` and `onboarding.html` in M001 after the core tunnel is working — current thinking: include only if they materially improve the daily routine story.
- Whether to include a visual three-card pricing anchor on checkout while keeping only one real paid offer — current thinking: allowed if it does not create confusion.
