# Codex Ralph Status

## Iteration 1 - 2026-05-17

Current TODO item completed:

- Definir un modele de donnees central pour `profile`, `objective`, `mission`, `missionProgress`, `focusSession`, `subscriptionState`.

Changes made:

- Added `scripts/model.js` as the central browser-safe data model for `profile`, `objective`, `mission`, `missionProgress`, `focusSession`, and `subscriptionState`.
- Updated `scripts/state.js` to initialize from the central model, expose the model entities through `window.OutilPrepa`, and keep `missionProgress` plus `subscriptionState` synchronized with the existing localStorage mission-step flow.
- Loaded `scripts/model.js` before `scripts/state.js` in `progression.html`; `index.html` already referenced the model script.
- Marked the TODO checkbox complete.

Working tree note:

- Unrelated local edits are present in `objectif.html`, `onboarding.html`, `package.json`, and other Ralph scaffolding files; they were left untouched.

Verification:

- `node --check scripts/model.js` passed.
- `node --check scripts/state.js` passed.
- Model smoke check passed: default app state contains all six central entities and aligned mission step progress.
- State/model smoke check passed: checking the three current mission actions completes today's mission, updates `missionProgress`, and increments `subscriptionState.freeMissionsUsed`.
- `git diff --check` passed for tracked changes.
- `npm run verify:s01` could not complete because Chromium fails to launch in this sandbox with `sandbox_host_linux.cc:41 shutdown: Operation not permitted` before any page assertions run.

Next likely TODO item:

- Creer une source unique pour la mission du jour au lieu de la dupliquer dans `index.html`, `mission.html`, `focus.html`, `progression.html` et `objectif.html`.

## Iteration 2 - 2026-05-17

Current TODO item completed:

- Creer une source unique pour la mission du jour au lieu de la dupliquer dans `index.html`, `mission.html`, `focus.html`, `progression.html` et `objectif.html`.

Changes made:

- Extended `scripts/model.js` so the daily mission owns the visible mission copy, display title, task title, subject/topic labels, duration, focus duration, proof labels, recommendation, review title, resources, and objectif-topic metadata.
- Updated model normalization so a stale persisted copy of the default mission is refreshed from the central fixture.
- Added `scripts/mission-ui.js` to hydrate daily-mission fragments from the shared model/state across `index.html`, `mission.html`, `focus.html`, `progression.html`, and `objectif.html`.
- Replaced duplicated daily-mission strings in those five pages with `data-daily-mission-*` hooks, generated mission checklist/resources/focus subtasks from the shared source, and derived the objectif heatmap's current mission topic from the model.
- Updated `scripts/state.js` to size mission action progress from the current mission steps instead of a hardcoded action count.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing unrelated local edits remain present in `focus.css`, `package.json`, Ralph scaffolding, and other untracked project files; they were left untouched.

Verification:

- `node --check scripts/model.js` passed.
- `node --check scripts/state.js` passed.
- `node --check scripts/mission-ui.js` passed.
- Model normalization smoke check passed: a stale stored default mission is refreshed to `Exponentielle & dérivation` with 3 central steps.
- Shared-source smoke check passed: all five target pages load `scripts/model.js` and `scripts/mission-ui.js`, and the checked daily-mission phrases no longer appear duplicated in page source.
- `git diff --check` passed.
- `npm run verify:s01` could not complete because Chromium fails to launch in this sandbox with `sandbox_host_linux.cc:41 shutdown: Operation not permitted`.
- A custom Playwright launch with extra no-sandbox flags failed with the same Chromium sandbox error.

Next likely TODO item:

- Brancher onboarding -> premiere mission -> focus -> mission terminee -> progression.

## Iteration 3 - 2026-05-17

Current TODO item completed:

- Brancher onboarding -> premiere mission -> focus -> mission terminee -> progression.

Changes made:

- Added onboarding-to-state APIs in `scripts/model.js` and `scripts/state.js` so onboarding answers can create the first mission, update the shared profile/objective, reset today for that mission, start a focus session, and complete today's mission in shared state.
- Wired `onboarding.html` so the first-win CTA persists answers and opens `mission.html`; the fallback done CTA now also opens the first mission instead of the dashboard.
- Wired `focus.html` so entering focus starts the shared focus session, the focus screen has a "Marquer la mission terminée" action, focus completion marks today's mission complete, and the completion CTA goes to `progression.html`.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were built on where necessary.

Verification:

- `node --check scripts/model.js` passed.
- `node --check scripts/state.js` passed.
- `node --check scripts/mission-ui.js` passed.
- State smoke check passed: onboarding answers created an SVT first mission, focus started, mission completion set `missionProgress.status` to `completed`, progression counters saw one completed mission, and the free mission counter advanced.
- Static funnel check passed: onboarding routes to `mission.html`, mission routes to `focus.html`, focus starts/completes shared state, focus completion routes to `progression.html`, and progression reads mission completion state.
- Inline script syntax check passed for `onboarding.html` and `focus.html`.
- `git diff --check` passed.
- `npm run verify:s02` could not complete because Chromium fails to launch in this sandbox with `sandbox_host_linux.cc:41 shutdown: Operation not permitted`.

Next likely TODO item:

- Faire en sorte que terminer une mission dans `mission.html` ou `focus.html` mette a jour `scripts/state.js`.

## Iteration 4 - 2026-05-17

Current TODO item completed:

- Faire en sorte que terminer une mission dans `mission.html` ou `focus.html` mette a jour `scripts/state.js`.

Changes made:

- Extended `scripts/state.js` so the generated mission checklist in `mission.html` is wired as shared mission state: stored step completion is restored, class changes are observed, checklist ARIA/checkbox UI is synced, and the existing `setActionChecked` path marks the mission completed when all steps are done.
- Kept the existing `focus.html` completion path through `window.OutilPrepa.completeMissionToday()`, which marks all mission steps complete, updates `missionProgress`, completes the focus session, increments the mission counter once, and persists shared state.
- Updated the `mission.html` checklist comment so it reflects that `scripts/state.js` persists the visual toggle changes.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `node --check scripts/state.js` passed.
- `node --check scripts/model.js` passed.
- `node --check scripts/mission-ui.js` passed.
- Inline script syntax check passed for `mission.html` and `focus.html`.
- State smoke check passed: mission checklist completion and focus completion both update `missionProgress.status` to `completed`, set today's mission as completed, persist checked steps, complete the focus session for the focus path, and increment `totalMissionsCompleted` only once.
- `git diff --check` passed.
- `npm run verify:s02` could not complete because Chromium fails to launch in this sandbox with `sandbox_host_linux.cc:41 shutdown: Operation not permitted` before page assertions run.

Next likely TODO item:

- Supprimer les contradictions de navigation: choisir entre la progression integree dans `index.html` et la page `progression.html`, puis nettoyer les liens.

## Iteration 5 - 2026-05-17

Current TODO item completed:

- Supprimer les contradictions de navigation: choisir entre la progression integree dans `index.html` et la page `progression.html`, puis nettoyer les liens.

Decision:

- Kept `progression.html` as the canonical progression surface because it already owns the jardin d'avance and post-focus route.
- Kept `index.html` as the cockpit for Today and Planning only.

Changes made:

- Made the `index.html` Today and Planning sidebar entries real hash links (`#today`, `#planning`) and added hash-aware view activation on page load plus back/forward navigation.
- Updated `objectif.html` and `progression.html` sidebar links so Today points to `index.html#today`, Planning points to `index.html#planning`, and Progression points to `progression.html`.
- Confirmed no remaining obsolete `index.html#progression` link or dashboard `view-progress` route is present.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static navigation check passed: `progression.html` is canonical, dashboard hashes open Today/Planning, and `index.html` inline script syntax is valid.
- `node --check scripts/model.js` passed.
- `node --check scripts/state.js` passed.
- `node --check scripts/mission-ui.js` passed.
- `npm run verify:s01` passed: dashboard mission structure, responsive visibility, console health, and CTA navigation are valid.
- Browser navigation check passed: `index.html#planning` activates Planning, `index.html#today` activates Today, sidebar Planning updates the hash, `objectif.html` routes Planning to `index.html#planning`, and `progression.html` keeps the garden active.
- `git diff --check` passed.

Next likely TODO item:

- Remplacer les dates/personas hardcodes visibles par un etat utilisateur ou des fixtures explicites.

## Iteration 6 - 2026-05-17

Current TODO item completed:

- Remplacer les dates/personas hardcodes visibles par un etat utilisateur ou des fixtures explicites.

Changes made:

- Added `scripts/user-context-ui.js` to hydrate visible profile names, initials, roles, greeting text, current-day labels, planning week headers, and objective context from `window.OutilPrepa` state.
- Added `scripts/demo-fixtures.js` so the checkout demo cockpit date and testimonial persona are explicit fixtures instead of inline hardcoded page copy.
- Wired `index.html`, `mission.html`, `progression.html`, `objectif.html`, and `onboarding.html` to the shared user/date context renderer.
- Replaced the checkout demo date/testimonial literals with fixture-backed `data-*` hooks.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `node --check scripts/user-context-ui.js` passed.
- `node --check scripts/demo-fixtures.js` passed.
- `node --check scripts/model.js` passed.
- `node --check scripts/state.js` passed.
- `node --check scripts/mission-ui.js` passed.
- `node --check scripts/checkout.js` passed.
- Static literal scan over HTML found no remaining visible fixed `Maïe` / `MD` / `Camille` / `Lundi 13` / `Lundi 12` style strings.
- `npm run verify` passed S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely TODO item:

- Ajouter un script unique `npm run verify` qui lance toutes les verifications existantes.

## Iteration 3 - 2026-05-17 (runtime)

Current TODO item completed:

- Ajouter un script unique `npm run verify` qui lance toutes les verifications existantes.

Changes made:

- Confirmed `package.json` already defines the central `verify` script and that it chains the existing verification scripts `verify:s01`, `verify:s02`, `verify:s03`, `verify:s04`, and `verify:s05`.
- Marked only the current TODO checkbox complete in `TODO.md`.
- Left later unchecked TODO items untouched.

Working tree note:

- `package.json` already contained the `verify` script before this iteration and was left unchanged.
- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `npm run verify` passed S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely TODO item:

- Ajouter une validation JSON qui detecte les fichiers vides, les BOM UTF-8, les champs manquants et les topics invalides.

## Iteration 4 - 2026-05-17 (runtime)

Current TODO item completed:

- Ajouter une validation JSON qui detecte les fichiers vides, les BOM UTF-8, les champs manquants et les topics invalides.

Changes made:

- Added `scripts/validate-json.mjs`, which scans project JSON files for empty files, UTF-8 BOMs, invalid JSON, missing required ATS fields, and invalid ATS topic IDs.
- Wired the validator into `package.json` as `npm run validate:json` and made `npm run verify` run it before the existing S01-S05 verifications.
- Removed UTF-8 BOM bytes from the seven existing `data/ats/sujets/{2018..2024}/mathematiques.json` files so the stricter validator can pass.
- Marked only the current TODO checkbox complete.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `npm run validate:json` first failed on the seven existing math JSON BOMs, proving the new BOM detection path.
- After BOM cleanup, `npm run validate:json` passed: 99 JSON files verified, ATS schema and topics valid.
- `node --check scripts/validate-json.mjs` passed.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.

Next likely TODO item:

- Extraire les styles inline page par page vers `assets/css/pages/`.

## Iteration 5 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Migrated the focus page stylesheet from root `focus.css` to `assets/css/pages/focus.css`.
- Updated `focus.html` to load `assets/css/pages/focus.css`.
- Removed the focus page's embedded `<style>` block.
- Replaced the remaining focus-specific `style="..."` attributes with CSS classes in the page stylesheet.
- Deleted the obsolete root-level `focus.css`.
- Left the TODO checkbox unchecked because other pages still have inline styles to extract.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static focus extraction check passed: `focus.html` contains no `<style>` block or `style="..."` attributes, links `assets/css/pages/focus.css`, and the moved CSS has no UTF-8 BOM.
- Focus browser check passed on desktop and mobile: moved CSS loads, responsive overflow is clean, and the finish-mission overlay still opens.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from the next page into `assets/css/pages/`.

## Iteration 6 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded `merci.html` payment-return page stylesheet into `assets/css/pages/merci.css`.
- Updated `merci.html` to load `assets/css/pages/merci.css` after the shared `styles.css`.
- Replaced the remaining `merci.html` inline paragraph `style="..."` attribute with the `.success-commitment` class.
- Left the TODO checkbox unchecked because other pages still contain inline `<style>` blocks and inline `style="..."` attributes.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static merci extraction check passed: `merci.html` contains no `<style>` block or `style="..."` attributes.
- Merci browser render check passed: `assets/css/pages/merci.css` loaded, body display remained `grid`, `.success-commitment` computed to `15px` font size and `6px` top margin, and mobile layout collapsed to one column.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from another remaining page into `assets/css/pages/`.

## Iteration 7 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded `mission.html` page stylesheet into `assets/css/pages/mission.css`.
- Updated `mission.html` to load `assets/css/pages/mission.css` after the shared `styles.css`.
- Replaced the remaining static `mission.html` `style="..."` attributes with page-scoped CSS classes for sidebar links, mission tags, columns, chips, resource/performance lists, progress fills, and support copy.
- Left the TODO checkbox unchecked because other pages still contain inline `<style>` blocks and inline `style="..."` attributes.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static mission extraction check passed: `mission.html` contains no `<style>` block or `style="..."` attributes, links `assets/css/pages/mission.css`, and the new CSS has no UTF-8 BOM.
- `node --check scripts/mission-ui.js` passed.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from another remaining page into `assets/css/pages/`.

## Iteration 8 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded `objectif.html` page styles into `assets/css/pages/objectif.css`.
- Updated `objectif.html` to load `assets/css/pages/objectif.css` after the shared `styles.css`.
- Replaced the remaining static `objectif.html` `style="..."` attributes with page-scoped classes for sidebar links, hero stat suffixes, the objective split layout, the priority column, and CTA links.
- Moved the objective heatmap tooltip styles from the lower inline `<style>` block into the page stylesheet.
- Left the TODO checkbox unchecked because `progression.html`, `onboarding.html`, `index.html`, and `checkout.html` still contain inline styles or embedded style blocks.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static objectif extraction check passed: `objectif.html` contains no `<style>` block or static `style="..."` attributes, links `assets/css/pages/objectif.css`, and the new CSS has no UTF-8 BOM.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from another remaining page into `assets/css/pages/`.

## Iteration 9 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded dashboard page stylesheet from `index.html` into `assets/css/pages/dashboard.css`.
- Updated `index.html` to load `assets/css/pages/dashboard.css` after `styles.css`.
- Replaced the remaining static `index.html` `style="..."` attributes with page-scoped classes for sidebar links, mission chips, support-signal colors, dashboard stacks, weekly bars, objective rows, the streak card, planning controls, weekend headers, and the focus-entry panel.
- Replaced the dashboard step-counter runtime background mutation with class toggles backed by the page stylesheet.
- Left the TODO checkbox unchecked because `progression.html`, `onboarding.html`, and `checkout.html` still contain inline `<style>` blocks or `style="..."` attributes.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static dashboard extraction check passed: `index.html` contains no `<style>` block, no `style="..."` attributes, no direct `.style` mutation, links `assets/css/pages/dashboard.css`, and the new CSS has no UTF-8 BOM.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from `progression.html`, `onboarding.html`, or `checkout.html` into `assets/css/pages/`.

## Iteration 10 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded `progression.html` garden/slideover stylesheet into `assets/css/pages/progression.css`.
- Updated `progression.html` to load `assets/css/pages/progression.css` after the shared `styles.css`.
- Replaced the remaining static `progression.html` `style="..."` attributes with page-scoped classes for sidebar links, garden copy, stats, slideover layout, progress fills, recommendation copy, and the objectif CTA.
- Replaced progression page runtime `.style` mutations with class toggles for the streak chip and slideover body lock.
- Left the TODO checkbox unchecked because `onboarding.html` and `checkout.html` still contain inline `<style>` blocks or `style="..."` attributes.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static progression extraction check passed: `progression.html` contains no `<style>` block, no `style="..."` attributes, no direct `.style` mutation, links `assets/css/pages/progression.css`, and the new CSS has no UTF-8 BOM.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed.

Next likely step:

- Continue the same TODO item by extracting inline styles from `onboarding.html` or `checkout.html` into `assets/css/pages/`.

## Iteration 11 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Extracted the embedded checkout stylesheet from `checkout.html` into `assets/css/pages/checkout.css`.
- Updated `checkout.html` to load `assets/css/pages/checkout.css` after `colors_and_type.css`.
- Replaced the remaining static `checkout.html` `style="..."` attributes with page-scoped classes for heat legend swatches, cockpit tab/pill/stat text, Stripe trust copy, final CTA highlight/link spacing, and the hidden Stripe setup anchor.
- Replaced the checkout setup reveal runtime `.style.display` mutation with an `is-visible` CSS state class in `scripts/checkout.js`.
- Updated `scripts/verify-s04-craft.mjs` so the craft contract still verifies checkout reduced-motion and CTA craft rules after those styles move to `assets/css/pages/checkout.css`.
- Left the TODO checkbox unchecked because `onboarding.html` still contains inline `style="..."` attributes under the same architecture item.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Static checkout extraction check passed: `checkout.html` contains no `<style>` block or static `style="..."` attributes, `scripts/checkout.js` contains no `.style` mutation, and checkout links `assets/css/pages/checkout.css`.
- `node --check scripts/checkout.js` passed.
- `node --check scripts/verify-s04-craft.mjs` passed.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.
- `git diff --check` passed for the edited checkout/verifier files.

Next likely step:

- Continue the same TODO item by extracting the remaining inline styles from `onboarding.html` into `assets/css/pages/`.

## Iteration 12 - 2026-05-17 (runtime)

Current TODO item completed:

- Extraire les styles inline page par page vers `assets/css/pages/`.

Changes made:

- Moved the onboarding page stylesheet from root `onboarding.css` to `assets/css/pages/onboarding.css` and updated its design-token import path.
- Updated `onboarding.html` to load `assets/css/pages/onboarding.css`.
- Replaced the remaining onboarding static `style="..."` attributes with page-scoped classes for two-column option grids, preview headers, CTA notes, email copy, done recap, done mission card, and the final mission link.
- Replaced the JS-generated inline recap chip markup with DOM-created `.done-recap-chip` elements.
- Normalized the moved preview title letter spacing to `0`.
- Marked only the current TODO checkbox complete because all HTML pages now have their inline `<style>` blocks and `style="..."` attributes extracted to page stylesheets under `assets/css/pages/`.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- Onboarding inline script syntax check passed: 1 inline script block parsed successfully.
- Onboarding HTML/CSS BOM check passed.
- Static extraction check passed: 9 HTML pages scanned, no `<style>` blocks or `style="..."` attributes remain, and all 8 page CSS files exist in `assets/css/pages/`.
- `git diff --check` passed.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.

Next likely TODO item:

- Extraire les scripts inline page par page vers `assets/js/pages/`.

## Iteration 13 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les scripts inline page par page vers `assets/js/pages/`.

Changes made:

- Created `assets/js/pages/mission.js` for mission-page interactions.
- Moved the `mission.html` checklist toggle inline script into that page script.
- Updated `mission.html` to load `assets/js/pages/mission.js` after the shared mission/state renderers.
- Left the TODO checkbox unchecked because `index.html`, `onboarding.html`, `focus.html`, `objectif.html`, and `progression.html` still contain inline scripts.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `node --check assets/js/pages/mission.js` passed.
- Static mission extraction check passed: `mission.html` has no inline `<script>` block and loads `assets/js/pages/mission.js`.
- `assets/js/pages/mission.js` is ASCII-only.
- `git diff --check -- mission.html assets/js/pages/mission.js` passed.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.

Next likely step:

- Continue the same TODO item by extracting the next inline page script into `assets/js/pages/`.

## Iteration 14 - 2026-05-17 (runtime)

Current TODO item partially advanced:

- Extraire les scripts inline page par page vers `assets/js/pages/`.

Changes made:

- Created `assets/js/pages/focus.js` for focus-page interactions.
- Moved the `focus.html` ambient picker, generated subtask toggle, play/pause state, countdown timer, completion overlay, break button, keyboard shortcuts, and shared mission-completion wiring into that page script.
- Updated `focus.html` to load `assets/js/pages/focus.js` after the shared model/state/mission renderers.
- Replaced the moved play/pause icon display mutations with the existing `.fx-icon-hidden` class toggle in the external page script.
- Left the TODO checkbox unchecked because `index.html`, `progression.html`, `onboarding.html`, and `objectif.html` still contain inline page scripts.

Working tree note:

- Existing uncommitted edits from earlier Ralph iterations remain present and were preserved.

Verification:

- `node --check assets/js/pages/focus.js` passed.
- Static focus extraction check passed: `focus.html` contains no inline `<script>` block and loads `assets/js/pages/focus.js`.
- `assets/js/pages/focus.js` is ASCII-only.
- `git diff --check -- focus.html assets/js/pages/focus.js` passed.
- Focus browser smoke passed: external script preserves ambience selection, subtask toggling, play/pause icon state, completion overlay, and shared mission state completion.
- `npm run verify` passed JSON validation plus S01, S02, S03, S04, and S05.

Next likely step:

- Continue the same TODO item by extracting the next inline page script into `assets/js/pages/`.

## How to Read This

- Runtime status: `.codex-ralph/status.json`
- Structured events: `.codex-ralph/events.jsonl`
- Last failure: `.codex-ralph/last-error.json`
- Per-iteration logs: `.codex-ralph/logs/`
