import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ONBOARDING_PATH = join(ROOT, 'onboarding.html');
const ONBOARDING_CSS_PATH = join(ROOT, 'assets', 'css', 'pages', 'onboarding.css');
const ONBOARDING_JS_PATH = join(ROOT, 'assets', 'js', 'pages', 'onboarding.js');
const ONBOARDING_URL = pathToFileURL(ONBOARDING_PATH).href;

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const OVERFLOW_TOLERANCE_PX = 1;

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function normalizeText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function readProjectFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

function assertRequiredFilesExist() {
  for (const filePath of [ONBOARDING_PATH, ONBOARDING_CSS_PATH, ONBOARDING_JS_PATH]) {
    assert(existsSync(filePath), `Required onboarding file does not exist: ${filePath}`);
  }
}

function assertStaticWiring() {
  const html = readProjectFile(ONBOARDING_PATH);
  const js = readProjectFile(ONBOARDING_JS_PATH);

  assert(/<link\s+rel="stylesheet"\s+href="colors_and_type\.css"\s*\/?>/.test(html), 'onboarding.html: must load colors_and_type.css');
  assert(/<link\s+rel="stylesheet"\s+href="assets\/css\/pages\/onboarding\.css"\s*\/?>/.test(html), 'onboarding.html: must load assets/css/pages/onboarding.css');

  for (const script of [
    'scripts/model.js',
    'scripts/state.js',
    'scripts/analytics.js',
    'assets/js/pages/onboarding.js',
  ]) {
    assert(
      new RegExp(`<script\\s+src="${script.replace(/\//g, '\\/')}"(?:\\s+defer)?><\\/script>`).test(html),
      `onboarding.html: must load ${script}`,
    );
  }

  assert(!/react|babel|unpkg\.com|esm\.sh|cdn\.jsdelivr\.net/i.test(html), 'onboarding.html: must not import React, Babel, or prototype/CDN scripts');
  assert(!/onboarding_v2/i.test(html + js), 'onboarding: canonical flow must stay on onboarding.html, not onboarding_v2.html');
  assert(!/3\s+missions?\s+offertes?/i.test(html), 'onboarding.html: old "3 missions offertes" copy must be removed');
  assert(/essai gratuit\s+3\s+jours/i.test(html), 'onboarding.html: must mention the 3-day free trial');
  assert(/applyOnboarding/.test(js), 'assets/js/pages/onboarding.js: paywall CTA must persist via window.OutilPrepa.applyOnboarding()');
  assert(/checkout\.html/.test(js), 'assets/js/pages/onboarding.js: paywall CTA must route to checkout.html');
}

async function collectPageFailures(page, label) {
  const failures = [];
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`${label}: console error: ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    failures.push(`${label}: page error: ${error.message}`);
  });
  return failures;
}

async function gotoOnboarding(page) {
  await page.goto(ONBOARDING_URL, { waitUntil: 'networkidle' });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    innerWidth: window.innerWidth,
  }));
  const maxScrollWidth = Math.max(overflow.scrollWidth, overflow.bodyScrollWidth);
  assert(
    maxScrollWidth <= overflow.innerWidth + OVERFLOW_TOLERANCE_PX,
    `${label}: page must not have horizontal overflow: scrollWidth ${maxScrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function activeStep(page) {
  return page.locator('[data-onboarding-step].is-active').first();
}

async function activeStepId(page) {
  return (await activeStep(page)).getAttribute('data-step-id');
}

async function expectStep(page, stepId, label) {
  await page.waitForFunction((expected) => {
    const active = document.querySelector('[data-onboarding-step].is-active');
    return active && active.getAttribute('data-step-id') === expected;
  }, stepId, { timeout: 2500 });
  assert(await page.locator(`[data-onboarding-step="${stepId}"].is-active`).isVisible(), `${label}: ${stepId} must be the visible active step`);
}

async function clickOption(page, stepId, value) {
  await page.locator(`[data-onboarding-step="${stepId}"] [data-option-value="${value}"]`).first().click();
}

async function assertSingleChoiceAutoAdvances(page, stepId, value, expectedNext, label) {
  await expectStep(page, stepId, label);
  const before = await activeStepId(page);
  await clickOption(page, stepId, value);
  await expectStep(page, expectedNext, label);
  const after = await activeStepId(page);
  assert(before !== after, `${label}: single choice ${stepId} must auto-advance`);
}

async function assertMultiChoiceRequiresContinue(page, label) {
  await expectStep(page, 'priorites', label);
  const continueButton = page.locator('[data-continue-step="priorites"]').first();
  await assertNoSelectionCounter(page, label);
  assert(await continueButton.isVisible(), `${label}: multi-select priorities must show a Continue button`);
  assert(await continueButton.isDisabled(), `${label}: priorities Continue button must start disabled`);

  const maths = page.locator('[data-onboarding-step="priorites"] [data-option-value="maths"]').first();
  await maths.click();
  await page.waitForFunction(() => document.querySelector('[data-onboarding-step="priorites"] [data-option-value="maths"]')?.getAttribute('aria-pressed') === 'true');
  const checkmark = maths.locator('[data-checkmark]').first();
  assert(await checkmark.isVisible(), `${label}: selected multi-choice options must expose a visible checkmark`);
  assert(!(await continueButton.isDisabled()), `${label}: priorities Continue button must enable after one selection`);
  assert(await activeStepId(page) === 'priorites', `${label}: multi-select must not auto-advance before Continue`);
  await continueButton.click();
  await expectStep(page, 'echeance', label);
}

async function assertNoSelectionCounter(page, label) {
  const bodyText = normalizeText(await page.locator('body').textContent());
  assert(!/\d+\s*(?:s[eé]lection|choix)\b/i.test(bodyText), `${label}: multi-select must not show a selection counter`);
}

async function assertDeadlineFiltering(browser) {
  const cases = [
    { classe: 'premiere', forbidden: /Parcoursup|Grand oral/i, required: /Contr[oô]le|Bac blanc/i },
    { classe: 'terminale', forbidden: /Epreuves anticip[eé]es/i, required: /Parcoursup|Grand oral|Bac blanc/i },
  ];

  for (const testCase of cases) {
    const page = await browser.newPage();
    const failures = await collectPageFailures(page, `deadline ${testCase.classe}`);
    try {
      await page.setViewportSize({ width: 1440, height: 900 });
      await gotoOnboarding(page);
      await page.locator('[data-start-onboarding]').click();
      await assertSingleChoiceAutoAdvances(page, 'classe', testCase.classe, 'goal', `deadline ${testCase.classe}`);
      await assertSingleChoiceAutoAdvances(page, 'goal', 'ingenieur', 'specialite', `deadline ${testCase.classe}`);
      await assertSingleChoiceAutoAdvances(page, 'specialite', 'maths-pc', 'rythme', `deadline ${testCase.classe}`);
      await assertSingleChoiceAutoAdvances(page, 'rythme', 'moyen', 'priorites', `deadline ${testCase.classe}`);
      await assertMultiChoiceRequiresContinue(page, `deadline ${testCase.classe}`);

      const deadlineText = normalizeText(await (await activeStep(page)).textContent());
      assert(testCase.required.test(deadlineText), `deadline ${testCase.classe}: expected class-specific échéance in “${deadlineText}”`);
      assert(!testCase.forbidden.test(deadlineText), `deadline ${testCase.classe}: échéances must be filtered, got “${deadlineText}”`);
      assert(failures.length === 0, failures.join(' | '));
    } finally {
      await page.close();
    }
  }
}

async function assertUploadPreviewAndPaywall(browser, viewport) {
  const page = await browser.newPage();
  const label = `${viewport.label} onboarding`;
  const failures = await collectPageFailures(page, label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoOnboarding(page);
    await expectStep(page, 'intro', label);

    if (viewport.label === 'desktop') {
      assert(await page.locator('[data-profile-panel]').isVisible(), `${label}: desktop profile panel must be visible`);
    } else {
      assert(await page.locator('[data-mobile-profile-summary]').isVisible(), `${label}: mobile profile summary must be visible`);
      await page.locator('[data-profile-toggle]').click();
      assert(await page.locator('[data-profile-panel]').isVisible(), `${label}: mobile profile panel must open from summary`);
      await page.keyboard.press('Escape');
    }

    await page.locator('[data-start-onboarding]').click();
    await assertSingleChoiceAutoAdvances(page, 'classe', 'terminale', 'goal', label);

    await page.locator('[data-back-onboarding]').click();
    await expectStep(page, 'classe', label);
    await assertSingleChoiceAutoAdvances(page, 'classe', 'terminale', 'goal', label);

    await assertSingleChoiceAutoAdvances(page, 'goal', 'ingenieur', 'specialite', label);
    await assertSingleChoiceAutoAdvances(page, 'specialite', 'maths-pc', 'rythme', label);
    await assertSingleChoiceAutoAdvances(page, 'rythme', 'moyen', 'priorites', label);
    await assertMultiChoiceRequiresContinue(page, label);
    await assertSingleChoiceAutoAdvances(page, 'echeance', 'parcoursup', 'blocage', label);
    await assertSingleChoiceAutoAdvances(page, 'blocage', 'exercices', 'niveau', label);
    await assertSingleChoiceAutoAdvances(page, 'niveau', 'fragile', 'planning', label);

    await expectStep(page, 'planning', label);
    const fileInput = page.locator('input[type="file"][data-schedule-upload]').first();
    assert(await fileInput.count(), `${label}: optional schedule upload input must exist`);
    await fileInput.setInputFiles({
      name: 'emploi-du-temps-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('lundi 8h maths\nmardi 10h physique'),
    });
    await page.waitForFunction(() => /emploi-du-temps-test\.txt/.test(document.body.textContent || ''));
    assert(await page.locator('[data-schedule-preview]').isVisible(), `${label}: schedule upload must show a local preview`);
    await page.locator('[data-continue-step="planning"]').click();

    await expectStep(page, 'generation', label);
    await expectStep(page, 'mission', label);
    await page.locator('[data-continue-step="mission"]').click();
    await expectStep(page, 'social-proof', label);
    const proofText = normalizeText(await (await activeStep(page)).textContent());
    assert(/placeholder/i.test(proofText), `${label}: social proof placeholders must be explicitly labelled`);
    await page.locator('[data-continue-step="social-proof"]').click();
    await expectStep(page, 'recap', label);
    await page.locator('[data-continue-step="recap"]').click();
    await expectStep(page, 'paywall', label);

    const paywallText = normalizeText(await (await activeStep(page)).textContent());
    assert(/essai gratuit\s+3\s+jours/i.test(paywallText), `${label}: paywall must state the 3-day free trial`);
    assert(/aucun pr[eé]l[eèé]vement pendant 3 jours/i.test(paywallText), `${label}: paywall must make the no-charge window visible`);
    assert(/annulation en 1 clic/i.test(paywallText), `${label}: paywall must make cancellation visible`);
    assert(/automatiquement apr[eèé]s l'essai/i.test(paywallText), `${label}: paywall must state automatic billing after trial`);

    await page.locator('[data-start-trial]').click();
    await page.waitForLoadState('networkidle');
    assert(page.url().endsWith('/checkout.html'), `${label}: trial CTA must navigate to checkout.html, got ${page.url()}`);

    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('outilPrepa:v1') || '{}'));
    assert(stored.onboarding, `${label}: trial CTA must persist onboarding payload`);
    assert(stored.onboarding.classe === 'terminale', `${label}: persisted payload must include classe`);
    assert(stored.onboarding.goal === 'ingenieur', `${label}: persisted payload must include compatible goal`);
    assert(stored.onboarding.specialite === 'maths-pc', `${label}: persisted payload must include compatible specialite`);
    assert(stored.onboarding.rythme === 'moyen', `${label}: persisted payload must include compatible rythme`);
    assert(Array.isArray(stored.onboarding.priorites) && stored.onboarding.priorites.includes('maths'), `${label}: persisted payload must include compatible priorites`);
    assert(stored.onboarding.onboarding && stored.onboarding.onboarding.trialChargeDate, `${label}: persisted payload must include enriched onboarding.trialChargeDate`);
    assert(stored.onboarding.onboarding.scheduleUpload && stored.onboarding.onboarding.scheduleUpload.previewOnly === true, `${label}: uploaded schedule must be marked preview-only`);

    await assertNoHorizontalOverflow(page, label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

async function assertViewportHealth(browser, viewport) {
  const page = await browser.newPage();
  const label = `${viewport.label} onboarding health`;
  const failures = await collectPageFailures(page, label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoOnboarding(page);
    assert(await page.locator('[data-onboarding-root]').isVisible(), `${label}: onboarding root must be visible`);
    await assertNoHorizontalOverflow(page, label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

assertRequiredFilesExist();
assertStaticWiring();

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const viewport of VIEWPORTS) {
    await assertViewportHealth(browser, viewport);
    await assertUploadPreviewAndPaywall(browser, viewport);
  }
  await assertDeadlineFiltering(browser);
  console.log('PASS onboarding verification: canonical flow, imports, desktop/mobile health, answer behavior, class-filtered échéances, upload preview, profile states, paywall persistence, and checkout route are valid.');
} finally {
  await browser.close();
}
