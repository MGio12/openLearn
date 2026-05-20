import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CHECKOUT_PATH = join(ROOT, 'checkout.html');
const MERCI_PATH = join(ROOT, 'merci.html');
const CHECKOUT_JS_PATH = join(ROOT, 'scripts', 'checkout.js');
const CHECKOUT_URL = pathToFileURL(CHECKOUT_PATH).href;

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const REQUIRED_FILES = [CHECKOUT_PATH, MERCI_PATH, CHECKOUT_JS_PATH];
const STRIPE_PAYMENT_LINK_PATTERN = /^https:\/\/(buy|checkout)\.stripe\.com\/.+/i;
const SECRET_PATTERNS = [/sk_live/i, /sk_test/i, /rk_live/i, /rk_test/i];

const UNSUPPORTED_BACKEND_COPY = [
  { label: 'accès immédiat', pattern: /acc[eèé]s\s+imm[eé]diat/i },
  { label: 'espace abonné', pattern: /espace\s+abonn[eé]/i },
  { label: 'service élève 24/7', pattern: /service\s+[eé]l[eèé]ve\s+24\s*\/\s*7/i },
  { label: 'cockpit abonné', pattern: /cockpit\s+abonn[eé]/i },
];

const STATIC_CONTEXT_PATTERN = /d[eé]monstration|statique|prototype|backend|plus tard|[aà] venir|quand le backend arrive/i;

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
  for (const filePath of REQUIRED_FILES) {
    assert(existsSync(filePath), `Required file does not exist: ${filePath}`);
  }
}

function assertNoStripeSecrets() {
  for (const filePath of REQUIRED_FILES) {
    const source = readProjectFile(filePath);
    for (const pattern of SECRET_PATTERNS) {
      assert(!pattern.test(source), `${filePath}: secret-looking Stripe key must not appear (${pattern})`);
    }
  }
}

function assertStaticHonestyCopy() {
  for (const filePath of [CHECKOUT_PATH, MERCI_PATH]) {
    const source = normalizeText(readProjectFile(filePath));
    for (const rule of UNSUPPORTED_BACKEND_COPY) {
      const match = rule.pattern.exec(source);
      if (!match) continue;

      const start = Math.max(0, match.index - 180);
      const end = Math.min(source.length, match.index + match[0].length + 180);
      const context = source.slice(start, end);
      assert(
        STATIC_CONTEXT_PATTERN.test(context),
        `${filePath}: unsupported backend-access phrase “${match[0]}” must be rewritten with explicit demonstration/static/backend-later context. Context: “${context}”`,
      );
    }
  }
}

async function collectConsoleErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function gotoCheckout(page) {
  await page.goto(CHECKOUT_URL, { waitUntil: 'networkidle' });
}

async function expectVisible(locator, message) {
  assert(await locator.count(), message);
  assert(await locator.first().isVisible(), message);
}

async function visibleText(page) {
  return normalizeText(await page.locator('body').textContent());
}

async function assertNoHorizontalOverflow(page, viewportLabel) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    innerWidth: window.innerWidth,
  }));
  const maxScrollWidth = Math.max(overflow.scrollWidth, overflow.bodyScrollWidth);
  assert(
    maxScrollWidth <= overflow.innerWidth + 1,
    `${viewportLabel} checkout.html: page must not have horizontal overflow: scrollWidth ${maxScrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function assertPlanOffers(page, viewportLabel) {
  const planCards = page.locator('.plan-card');
  const count = await planCards.count();
  assert(count === 2, `${viewportLabel} checkout.html: expected two visible V2 plan cards, found ${count}`);

  const essential = page.locator('[data-plan-card="essential"]').first();
  const iaPlus = page.locator('[data-plan-card="ia-plus"]').first();
  await expectVisible(essential, `${viewportLabel} checkout.html: essential plan card must be visible`);
  await expectVisible(iaPlus, `${viewportLabel} checkout.html: IA plus plan card must be visible`);

  const pageText = normalizeText(await page.locator('body').textContent());
  assert(/7,62\s*€\s*\/\s*semaine/i.test(pageText), `${viewportLabel} checkout.html: essential trimester price must be visible`);
  assert(/15,31\s*€\s*\/\s*semaine/i.test(pageText), `${viewportLabel} checkout.html: IA plus trimester price must be visible`);
  assert(/99\s*€\s*\/\s*trimestre/i.test(pageText), `${viewportLabel} checkout.html: essential trimester billing must be visible`);
  assert(/199\s*€.*trimestre/i.test(pageText), `${viewportLabel} checkout.html: IA plus trimester billing must be visible`);
}

async function stripeMetaUrl(page, viewportLabel) {
  const metaUrl = await page.locator('meta[name="stripe-checkout-url"]').getAttribute('content');
  assert(metaUrl !== null, `${viewportLabel} checkout.html: meta[name="stripe-checkout-url"] must exist`);
  const trimmed = metaUrl.trim();
  assert(
    STRIPE_PAYMENT_LINK_PATTERN.test(trimmed),
    `${viewportLabel} checkout.html: malformed Stripe Payment Link meta value: “${trimmed}”`,
  );
  return trimmed;
}

async function assertCheckoutButtonsReady(page, expectedUrl, viewportLabel) {
  const buttons = page.locator('[data-checkout-button]');
  const count = await buttons.count();
  assert(count > 0, `${viewportLabel} checkout.html: expected at least one [data-checkout-button]`);

  for (let index = 0; index < count; index += 1) {
    const button = buttons.nth(index);
    if (!(await button.isVisible())) continue;
    const href = await button.getAttribute('href');
    const state = await button.getAttribute('data-checkout-state');
    const text = normalizeText(await button.textContent());
    assert(href === expectedUrl, `${viewportLabel} checkout.html: visible checkout button “${text}” href must resolve to meta Payment Link. Expected ${expectedUrl}, got ${href}`);
    assert(state === 'ready', `${viewportLabel} checkout.html: visible checkout button “${text}” must have data-checkout-state="ready", got “${state}”`);
  }
}

async function assertTrustCopy(page, viewportLabel) {
  const text = await visibleText(page);
  const trustChecks = [
    { label: 'Stripe handles payment', pattern: /(paiement\s+(trait[eé]|g[eé]r[eé])\s+par\s+Stripe|Stripe\s+(g[eèé]re|traite|envoie))/i },
    { label: 'card number not stored/touched by app servers', pattern: /(num[eé]ro\s+de\s+carte|donn[eé]e\s+bancaire).*?(ne\s+.*?(stock|touche)|jamais).*?(serveurs?|Stripe)/i },
    { label: 'monthly subscription', pattern: /(abonnement|mensuel|chaque\s+mois|\/\s*mois)/i },
    { label: 'cancellable subscription', pattern: /(annulable|r[eé]siliable|annuler|r[eé]silier)/i },
    { label: 'transparent price', pattern: /(7,62\s*€\s*\/\s*semaine|15,31\s*€\s*\/\s*semaine|99\s*€\s*\/\s*trimestre|199\s*€.*trimestre|prix\s+transparent)/i },
  ];

  for (const check of trustChecks) {
    assert(check.pattern.test(text), `${viewportLabel} checkout.html: missing trust copy — ${check.label}`);
  }
}

async function assertValidCheckoutViewport(browser, viewport) {
  const page = await browser.newPage();
  const consoleErrors = await collectConsoleErrors(page);
  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoCheckout(page);
    const expectedUrl = await stripeMetaUrl(page, viewport.label);
    await assertPlanOffers(page, viewport.label);
    await assertTrustCopy(page, viewport.label);
    await assertCheckoutButtonsReady(page, expectedUrl, viewport.label);
    await assertNoHorizontalOverflow(page, viewport.label);
    assert(consoleErrors.length === 0, `${viewport.label} checkout.html: page must not emit console/page errors: ${consoleErrors.join(' | ')}`);
  } finally {
    await page.close();
  }
}

async function assertInvalidPaymentLinkFallback(browser) {
  const page = await browser.newPage();
  const consoleErrors = await collectConsoleErrors(page);
  try {
    await page.addInitScript(() => {
      window.OP_STRIPE_CHECKOUT_URL = 'not-a-stripe-payment-link';
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoCheckout(page);

    const buttons = page.locator('[data-checkout-button]');
    const count = await buttons.count();
    assert(count > 0, 'negative path checkout.html: expected at least one [data-checkout-button]');

    for (let index = 0; index < count; index += 1) {
      const button = buttons.nth(index);
      if (!(await button.isVisible())) continue;
      const href = await button.getAttribute('href');
      const state = await button.getAttribute('data-checkout-state');
      const text = normalizeText(await button.textContent());
      assert(href === '#configurer-stripe', `negative path checkout.html: visible checkout button “${text}” must fall back to #configurer-stripe, got ${href}`);
      assert(state === 'needs-config', `negative path checkout.html: visible checkout button “${text}” must have data-checkout-state="needs-config", got “${state}”`);
    }

    const setup = page.locator('#checkout-setup');
    assert(await setup.count(), 'negative path checkout.html: #checkout-setup must exist');
    assert(!(await setup.first().isVisible()), 'negative path checkout.html: setup panel should start hidden before invalid checkout click');
    await buttons.first().click();
    await expectVisible(setup, 'negative path checkout.html: setup panel must become visible when Payment Link is invalid');

    assert(consoleErrors.length === 0, `negative path checkout.html: page must not emit console/page errors: ${consoleErrors.join(' | ')}`);
  } finally {
    await page.close();
  }
}

assertRequiredFilesExist();
assertNoStripeSecrets();
assertStaticHonestyCopy();

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const viewport of VIEWPORTS) {
    await assertValidCheckoutViewport(browser, viewport);
  }
  await assertInvalidPaymentLinkFallback(browser);
  console.log('PASS S03 checkout verification: Payment Link readiness, trust copy, static honesty, secret scanning, responsive overflow, console health, and invalid-checkout fallback are valid.');
} finally {
  await browser.close();
}
