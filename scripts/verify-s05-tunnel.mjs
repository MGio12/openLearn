import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FILES = {
  'index.html': join(ROOT, 'index.html'),
  'mission.html': join(ROOT, 'mission.html'),
  'objectif.html': join(ROOT, 'objectif.html'),
  'checkout.html': join(ROOT, 'checkout.html'),
  'merci.html': join(ROOT, 'merci.html'),
  'styles.css': join(ROOT, 'styles.css'),
  'scripts/checkout.js': join(ROOT, 'scripts', 'checkout.js'),
};

const CORE_PAGES = ['index.html', 'mission.html', 'objectif.html', 'checkout.html', 'merci.html'];

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const STRIPE_PAYMENT_LINK_PATTERN = /^https:\/\/(buy|checkout)\.stripe\.com\/.+/i;
const SECRET_PATTERNS = [/sk_live_/i, /sk_test_/i, /rk_live_/i, /rk_test_/i];
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

function pageUrl(fileName) {
  return pathToFileURL(FILES[fileName]).href;
}

function assertRequiredFilesExist() {
  for (const [label, filePath] of Object.entries(FILES)) {
    assert(existsSync(filePath), `${label}: required S05 verifier input does not exist at ${filePath}`);
  }
}

function assertNoStripeSecrets() {
  for (const [label, filePath] of Object.entries(FILES)) {
    const source = readProjectFile(filePath);
    for (const pattern of SECRET_PATTERNS) {
      assert(!pattern.test(source), `${label}: secret-looking Stripe key must not appear in frontend source (${pattern})`);
    }
  }
}

async function collectPageFailures(page, fileName, viewportLabel) {
  const failures = [];
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`${viewportLabel} ${fileName}: console error: ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    failures.push(`${viewportLabel} ${fileName}: page error: ${error.message}`);
  });
  return failures;
}

async function gotoLocalPage(page, fileName) {
  await page.goto(pageUrl(fileName), { waitUntil: 'networkidle' });
}

async function expectVisible(locator, message) {
  assert(await locator.count(), message);
  assert(await locator.first().isVisible(), message);
  return locator.first();
}

async function visibleAnchor(page, selector, message) {
  const locator = page.locator(selector).filter({ hasText: /\S/ });
  const count = await locator.count();
  assert(count > 0, message);

  for (let index = 0; index < count; index += 1) {
    const candidate = locator.nth(index);
    if (await candidate.isVisible()) return candidate;
  }

  fail(message);
}

async function visibleAnchorIn(page, parentSelector, href, message) {
  return visibleAnchor(page, `:is(${parentSelector}) a[href="${href}"]`, message);
}

async function assertNoHorizontalOverflow(page, fileName, viewportLabel) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    innerWidth: window.innerWidth,
  }));
  const maxScrollWidth = Math.max(overflow.scrollWidth, overflow.bodyScrollWidth);
  assert(
    maxScrollWidth <= overflow.innerWidth + OVERFLOW_TOLERANCE_PX,
    `${viewportLabel} ${fileName}: page must not have horizontal overflow: scrollWidth ${maxScrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function assertPageHealth(browser, fileName, viewport) {
  const page = await browser.newPage();
  const failures = await collectPageFailures(page, fileName, viewport.label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoLocalPage(page, fileName);
    await expectVisible(page.locator('body'), `${viewport.label} ${fileName}: body must be visible`);
    await assertNoHorizontalOverflow(page, fileName, viewport.label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

async function clickAndAssertLocalRoute(page, link, expectedFileName, routeLabel) {
  const href = await link.getAttribute('href');
  assert(href && href.split('#')[0].split('?')[0] === expectedFileName, `${routeLabel}: href must target ${expectedFileName}, got ${href}`);

  await link.click();
  await page.waitForLoadState('networkidle');
  assert(page.url().endsWith(`/${expectedFileName}`), `${routeLabel}: click must navigate to /${expectedFileName}, got ${page.url()}`);
}

async function assertDashboardPrimaryMissionRoute(browser, viewport) {
  const page = await browser.newPage();
  const failures = await collectPageFailures(page, 'index.html', viewport.label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoLocalPage(page, 'index.html');
    const missionCta = await visibleAnchorIn(
      page,
      '[data-contract="daily-mission"], [data-testid="daily-mission"], .daily-mission',
      'mission.html',
      `${viewport.label} index.html: dashboard primary mission CTA must be visible in the daily mission block`,
    );
    await clickAndAssertLocalRoute(page, missionCta, 'mission.html', `${viewport.label} index.html primary mission CTA`);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

async function assertMissionVisibleRoutes(browser, viewport) {
  const routes = [
    { href: 'objectif.html', label: 'Objectif continuation' },
    { href: 'checkout.html', label: 'checkout continuation' },
  ];

  for (const route of routes) {
    const page = await browser.newPage();
    const failures = await collectPageFailures(page, 'mission.html', viewport.label);

    try {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLocalPage(page, 'mission.html');
      const link = await visibleAnchorIn(
        page,
        '.routine-continuation',
        route.href,
        `${viewport.label} mission.html: visible main-content route must include ${route.href}`,
      );
      await clickAndAssertLocalRoute(page, link, route.href, `${viewport.label} mission.html ${route.label}`);
      assert(failures.length === 0, failures.join(' | '));
    } finally {
      await page.close();
    }
  }
}

async function assertObjectifCheckoutRoute(browser, viewport) {
  const page = await browser.newPage();
  const failures = await collectPageFailures(page, 'objectif.html', viewport.label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoLocalPage(page, 'objectif.html');
    const checkoutLink = await visibleAnchor(
      page,
      'a[href="checkout.html"]',
      `${viewport.label} objectif.html: visible subscription/checkout route must target checkout.html`,
    );
    const text = normalizeText(await checkoutLink.textContent());
    assert(/abonnement|checkout|s.?abonner|stripe|payer/i.test(text), `${viewport.label} objectif.html: checkout route text must describe subscription/checkout intent, got “${text}”`);
    await clickAndAssertLocalRoute(page, checkoutLink, 'checkout.html', `${viewport.label} objectif.html subscription/checkout route`);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

async function assertMerciContinuationRoutes(browser, viewport) {
  const expectedRoutes = ['index.html', 'mission.html', 'objectif.html'];

  for (const href of expectedRoutes) {
    const page = await browser.newPage();
    const failures = await collectPageFailures(page, 'merci.html', viewport.label);

    try {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLocalPage(page, 'merci.html');
      const link = await visibleAnchorIn(
        page,
        '.success-actions',
        href,
        `${viewport.label} merci.html: visible continuation actions must include ${href}`,
      );
      await clickAndAssertLocalRoute(page, link, href, `${viewport.label} merci.html continuation to ${href}`);
      assert(failures.length === 0, failures.join(' | '));
    } finally {
      await page.close();
    }
  }
}

async function waitForCheckoutButtonsReady(page, viewportLabel) {
  await page.waitForFunction(() => {
    const buttons = Array.from(document.querySelectorAll('[data-checkout-button]'));
    return buttons.length > 0 && buttons.every((button) => button.getAttribute('data-checkout-state') === 'ready');
  }, null, { timeout: 3000 });

  const buttonDetails = await page.locator('[data-checkout-button]').evaluateAll((buttons) => buttons.map((button) => ({
    text: (button.textContent || '').replace(/\s+/g, ' ').trim(),
    href: button.getAttribute('href') || '',
    state: button.getAttribute('data-checkout-state') || '',
    visible: (() => {
      const style = window.getComputedStyle(button);
      const rect = button.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    })(),
  })));

  assert(buttonDetails.length > 0, `${viewportLabel} checkout.html: expected at least one [data-checkout-button]`);

  for (const button of buttonDetails) {
    assert(button.state === 'ready', `${viewportLabel} checkout.html: checkout button “${button.text || '(sans texte)'}” must be ready, got “${button.state}”`);
    assert(
      STRIPE_PAYMENT_LINK_PATTERN.test(button.href),
      `${viewportLabel} checkout.html: checkout button “${button.text || '(sans texte)'}” must target a Stripe Payment Link, got “${button.href}”`,
    );
  }
}

async function assertCheckoutPaymentLinkReadiness(browser, viewport) {
  const page = await browser.newPage();
  const failures = await collectPageFailures(page, 'checkout.html', viewport.label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoLocalPage(page, 'checkout.html');
    await waitForCheckoutButtonsReady(page, viewport.label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

assertRequiredFilesExist();
assertNoStripeSecrets();

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const viewport of VIEWPORTS) {
    for (const fileName of CORE_PAGES) {
      await assertPageHealth(browser, fileName, viewport);
    }

    await assertDashboardPrimaryMissionRoute(browser, viewport);
    await assertMissionVisibleRoutes(browser, viewport);
    await assertObjectifCheckoutRoute(browser, viewport);
    await assertMerciContinuationRoutes(browser, viewport);
    await assertCheckoutPaymentLinkReadiness(browser, viewport);
  }

  console.log('PASS S05 tunnel verification: required files, desktop/mobile page health, visible tunnel navigation, checkout Payment Link readiness, Stripe secret scanning, and merci continuation routes are valid.');
} finally {
  await browser.close();
}
