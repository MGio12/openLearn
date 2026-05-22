# Ralph Session TODO

## Loop Rules

- Work top to bottom.
- Complete one checkbox per iteration.
- If verification fails, leave the checkbox unchecked and fix the same item next.
- Mark `[x]` only after targeted verification and `npm run verify` pass.
- Preserve existing user edits.
- Keep `TODO.md` as the product roadmap; use this file only for this Ralph session.
- If a task touches a maths course page, read `CLAUDE.md`, the required course docs from `AGENTS.md`, the source links in `lien/premiere/math.md`, and the existing course prototype/shared course assets before editing.

## Tasks

- [ ] S01 - Extract the remaining root progression page script
  - Scope: Move the inline script in `progression.html` into `assets/js/pages/progression.js` without changing visible behavior.
  - Acceptance: `progression.html` has no inline `<script>` block; the slideover, garden interactions, shared mission/progress hydration, and keyboard behavior still work.
  - Verify: `node --check assets/js/pages/progression.js`, a static scan for root inline scripts, `npm run verify`, `git diff --check`.
  - Notes: Continue the current `TODO.md` item, "Extraire les scripts inline page par page".

- [ ] S02 - Remove remaining root app inline styles
  - Scope: Replace static `style="..."` and root placeholder `<style>` blocks in root HTML pages with page or shared CSS classes, excluding course prototypes.
  - Acceptance: Root `*.html` pages have no `<style>` blocks and no static `style="..."`; simple placeholder pages still render as intended.
  - Verify: static scan over root `*.html`, `npm run verify`, `git diff --check`.
  - Notes: Keep page CSS in `assets/css/pages/` when the page needs more than tiny shared placeholder styling.

- [ ] S03 - Add a static architecture verifier for inline root assets
  - Scope: Add a small script that fails on root HTML inline `<style>`, static `style="..."`, or inline page `<script>` regressions; wire it into `npm run verify`.
  - Acceptance: The script reports clear file/line failures and excludes maths course prototypes unless explicitly requested.
  - Verify: run the new verifier directly, `npm run verify`, `git diff --check`.
  - Notes: Keep it vanilla Node, no new dependency.

- [ ] S04 - Document file and data naming conventions
  - Scope: Add concise project-local documentation for page CSS, page JS, domain modules, fixture data, topic IDs, and `data-*` hooks.
  - Acceptance: A future contributor can tell where to put page scripts/styles, where fixture data lives, and how to name user-facing hooks.
  - Verify: documentation read-through plus `npm run verify`, `git diff --check`.
  - Notes: Prefer a short `docs/` file over expanding `CLAUDE.md`.

- [ ] S05 - Start pure mission domain module extraction
  - Scope: Create a focused `assets/js/domain/missions.js` for mission selection/normalization helpers currently embedded in shared scripts.
  - Acceptance: DOM scripts call the domain helpers instead of duplicating mission calculations; browser globals remain compatible.
  - Verify: `node --check assets/js/domain/missions.js`, relevant static smoke test, `npm run verify`, `git diff --check`.
  - Notes: Keep the module small; do not introduce a generic utility layer.

- [ ] S06 - Extract pure progress calculations
  - Scope: Move progress counters, completion percentages, and "mission done" derived state into a domain module used by progression/dashboard code.
  - Acceptance: Progression updates still react to mission completion and no visible statistic is hardcoded when it should come from state.
  - Verify: `node --check` changed JS, `npm run verify:s02`, `npm run verify`, `git diff --check`.
  - Notes: Preserve existing localStorage behavior.

- [ ] S07 - Extract free-plan and subscription gating logic
  - Scope: Put free mission limits, subscription status checks, and checkout eligibility labels behind a small pure module.
  - Acceptance: Checkout and mission/progression surfaces use the same gating source; copy remains consistent with 3 free missions then 10 euros/month.
  - Verify: `node --check` changed JS, `npm run verify:s03`, `npm run verify`, `git diff --check`.
  - Notes: Do not promise backend, accounts, or payment completion beyond the static prototype.

- [ ] S08 - Extract objective priority scoring helpers
  - Scope: Move objectif priority/heatmap derived values into a pure module or explicit fixture-backed helper.
  - Acceptance: `objectif.html` no longer depends on page-local magic percentages when the value represents priority state.
  - Verify: `node --check` changed JS, `npm run verify:s05`, `npm run verify`, `git diff --check`.
  - Notes: Keep demo fixture values clearly named if they remain placeholders.

- [ ] S09 - Make dashboard first action unambiguous
  - Scope: Tighten dashboard above-the-fold hierarchy so the mission of the day and its proof clearly dominate secondary stats.
  - Acceptance: A first viewport shows what to do now, why it matters, and the primary CTA without metric clutter taking priority.
  - Verify: `npm run verify:s01`, `npm run verify:redesign` if stable locally, `npm run verify`, `git diff --check`.
  - Notes: Follow `PRODUCT.md` and `DESIGN.md`.

- [ ] S10 - Make mission page a true action sheet
  - Scope: Reduce article-like drift on `mission.html`; make steps, proof, resources, and focus CTA read as one executable task.
  - Acceptance: Checklist progress persists, the focus CTA is dominant, and each resource is a real link or clearly marked preview.
  - Verify: `npm run verify:s02`, `npm run verify`, `git diff --check`.
  - Notes: Do not invent unsupported metrics.

- [ ] S11 - Strengthen focus completion
  - Scope: Ensure focus completion shows what was accomplished, lets the user mark completion, and proposes a calm next action.
  - Acceptance: Timer completion and manual mission completion both update shared state and route cleanly to progression.
  - Verify: `npm run verify:s02`, `npm run verify`, `git diff --check`.
  - Notes: Ambiences remain optional, not the product center.

- [ ] S12 - Make progression explain tomorrow's return
  - Scope: Keep the garden as first read and add/clarify the calm reason to return tomorrow based on real progress state.
  - Acceptance: Completed mission state changes the garden/progress copy, and the details panel remains keyboard and mobile accessible.
  - Verify: `npm run verify:s02`, `npm run verify`, `git diff --check`.
  - Notes: No punitive streak language.

- [ ] S13 - Make onboarding answers affect the preview
  - Scope: Ensure every onboarding answer visibly influences the first mission or plan preview before email/payment pressure.
  - Acceptance: Stored answers feed the preview and first mission state; email errors are calm and visible near the field.
  - Verify: `npm run verify:s02`, `npm run verify`, `git diff --check`.
  - Notes: Preserve the short onboarding flow.

- [ ] S14 - Align checkout copy and prototype honesty
  - Scope: Audit checkout/abonnement/merci copy for the same model: 3 missions free, then 10 euros/month, no false backend promises.
  - Acceptance: Pricing and prototype limits are consistent across pages and CTAs.
  - Verify: `npm run verify:s03`, `npm run verify`, `git diff --check`.
  - Notes: Do not add real payment secrets.

- [ ] S15 - Add activation analytics events
  - Scope: Track local events for onboarding started/completed, mission viewed/launched/completed, focus launched/completed, email given, and checkout clicked.
  - Acceptance: Events are persisted locally with clear names and `npm run verify:analytics` validates them.
  - Verify: `npm run verify:analytics`, `npm run verify`, `git diff --check`.
  - Notes: Local prototype analytics only.

- [ ] S16 - Add retention and conversion analytics events
  - Scope: Track local events for return-next-day signals, active days on 7, missions per week, checkout click, and conversion-intent points.
  - Acceptance: Event names are documented and the verifier catches missing required events.
  - Verify: `npm run verify:analytics`, `npm run verify`, `git diff --check`.
  - Notes: Do not invent server-side conversion data.

- [ ] S17 - Clean the probabilites conditionnelles course prototype inline style drift
  - Scope: If working on the touched course prototype, replace repeated inline heading styles with course CSS classes while preserving the mathematical substance.
  - Acceptance: No course content is rewritten generically; headings stay clear, KaTeX remains readable, reveal/correction controls still work.
  - Verify: `node scripts/verify-course-sidebar.mjs`, `npm run verify`, `git diff --check`.
  - Notes: Follow the full Course Page Agent reading map before editing.

- [ ] S18 - Full checkpoint and diff review
  - Scope: Run full verification, review `git diff --stat`, and update `.codex-ralph/STATUS.md` with the current session state.
  - Acceptance: Verification status, known residual risks, and next task are written down.
  - Verify: `npm run verify`, `git diff --check`.
  - Notes: Do not mark this complete unless the checkpoint evidence is fresh.
