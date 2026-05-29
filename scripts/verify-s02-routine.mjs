import { chromium } from 'playwright';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INDEX_PATH = join(ROOT, 'index.html');
const OBJECTIF_PATH = join(ROOT, 'objectif.html');
const INDEX_URL = pathToFileURL(INDEX_PATH).href;

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function normalizeText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

async function expectVisible(locator, message) {
  assert(await locator.count(), message);
  assert(await locator.first().isVisible(), message);
}

async function assertInViewport(page, locator, message) {
  await expectVisible(locator, message);
  const box = await locator.first().boundingBox();
  const viewport = page.viewportSize();
  assert(box, message);
  assert(viewport, `${message}: viewport is unavailable`);
  assert(
    box.y + box.height > 0 && box.y < viewport.height && box.x + box.width > 0 && box.x < viewport.width,
    message,
  );
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

async function gotoIndex(page) {
  await page.goto(INDEX_URL, { waitUntil: 'networkidle' });
}

async function findMissionBlock(page) {
  const today = page.locator('#view-today');
  await expectVisible(today, 'index.html: today view must be present and visible');

  const candidates = [
    today.locator('[data-testid="daily-mission"]'),
    today.locator('[data-daily-mission-container]'),
    today.locator('.daily-mission'),
    today.locator('.mission-du-jour'),
    today.locator('section, article, .card, div').filter({ hasText: /Mission du jour/i }),
  ];

  for (const candidate of candidates) {
    if (await candidate.count()) return candidate.first();
  }

  fail('index.html: daily mission block must exist in the Today view and include the text “Mission du jour”');
}

async function assertDashboardNavigation(page, viewportLabel) {
  await gotoIndex(page);
  const missionBlock = await findMissionBlock(page);
  const objectifLink = missionBlock.locator('a[href="objectif.html"]').first();
  await expectVisible(objectifLink, `${viewportLabel} index.html: daily mission block must include a visible href="objectif.html" CTA`);
  await assertInViewport(page, objectifLink, `${viewportLabel} index.html: Objectif CTA must be visible before navigation`);

  await objectifLink.click();
  await page.waitForLoadState('networkidle');
  assert(page.url().endsWith('/objectif.html'), `${viewportLabel} index.html: Objectif CTA must navigate to /objectif.html, got ${page.url()}`);
}

async function assertObjectifContract(page, viewportLabel) {
  const bodyText = normalizeText(await page.locator('body').textContent());
  const heading = page.locator('h1').filter({ hasText: /Objectif/i }).first();
  await assertInViewport(page, heading, `${viewportLabel} objectif.html: page must expose a visible Objectif heading`);

  const decision = page.locator('.op-decision').first();
  await assertInViewport(page, decision, `${viewportLabel} objectif.html: priority decision panel must be visible`);

  assert(/mission recommand[ée]e maintenant|mission du jour/i.test(bodyText), `${viewportLabel} objectif.html: page must preserve the daily mission concept`);
  assert(/\d+\s*(min|mn|minutes?)/i.test(bodyText), `${viewportLabel} objectif.html: decision must show a visible estimated duration`);
  assert(
    /(impact|prioritaire|priorit[ée]|pourquoi|preuve|objectif|Parcoursup|dossier)/i.test(bodyText),
    `${viewportLabel} objectif.html: decision must explain why this work is priority/rationalized`,
  );

  const reasons = decision.locator('.op-reason').filter({ hasText: /\S/ });
  const reasonCount = await reasons.count();
  assert(reasonCount >= 2 && reasonCount <= 4, `${viewportLabel} objectif.html: decision must expose 2–4 concrete reasons, found ${reasonCount}`);
  await assertInViewport(page, reasons.first(), `${viewportLabel} objectif.html: first objective reason must be visible`);
}

async function assertVisibleMainRoute(page, href, viewportLabel) {
  const route = page.locator(`.op-decision a[href="${href}"], .op-strategy a[href="${href}"], .op-prio-list a[href="${href}"]`).filter({ hasText: /\S/ }).first();
  await expectVisible(route, `${viewportLabel} objectif.html: main content must include a visible anchor to ${href}`);
}

function isLocalHtmlHref(href) {
  return /^[^:/?#]+\.html(?:[#?].*)?$/.test(href);
}

function localHtmlPath(href) {
  return join(ROOT, href.split('#')[0].split('?')[0]);
}

async function assertObjectifRoutes(page, viewportLabel) {
  await assertVisibleMainRoute(page, 'planning.html', viewportLabel);
  await assertVisibleMainRoute(page, 'checkout.html', viewportLabel);
}

async function assertLocalCtaTargets(page, viewportLabel) {
  const visibleCtas = await page.locator('.op-decision a[href], .op-prio-list a[href], .op-strategy__actions a[href]').evaluateAll((anchors) => anchors
    .filter((anchor) => {
      const style = window.getComputedStyle(anchor);
      const rect = anchor.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    })
    .map((anchor) => ({
      href: anchor.getAttribute('href') || '',
      text: (anchor.textContent || '').replace(/\s+/g, ' ').trim(),
    })));

  for (const cta of visibleCtas) {
    assert(cta.href && cta.href !== '#', `${viewportLabel} objectif.html: visible CTA “${cta.text || '(sans texte)'}” must not be an inert # link`);
    if (isLocalHtmlHref(cta.href)) {
      assert(existsSync(localHtmlPath(cta.href)), `${viewportLabel} objectif.html: visible CTA “${cta.text || cta.href}” points to missing local file ${cta.href}`);
    }
  }
}

async function assertNoHorizontalOverflow(page, viewportLabel) {
  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  assert(
    overflow.scrollWidth <= overflow.innerWidth + 1,
    `${viewportLabel} objectif.html: page must not have horizontal overflow: scrollWidth ${overflow.scrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function assertViewport(viewport) {
  const page = await browser.newPage();
  const consoleErrors = await collectConsoleErrors(page);
  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await assertDashboardNavigation(page, viewport.label);
    await assertObjectifContract(page, viewport.label);
    await assertObjectifRoutes(page, viewport.label);
    await assertLocalCtaTargets(page, viewport.label);
    await assertNoHorizontalOverflow(page, viewport.label);
    assert(consoleErrors.length === 0, `${viewport.label}: page must not emit console/page errors: ${consoleErrors.join(' | ')}`);
  } finally {
    await page.close();
  }
}

if (!existsSync(INDEX_PATH)) {
  fail(`index.html target does not exist at ${INDEX_PATH}`);
}

if (!existsSync(OBJECTIF_PATH)) {
  fail(`objectif.html target does not exist at ${OBJECTIF_PATH}`);
}

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const viewport of VIEWPORTS) {
    await assertViewport(viewport);
  }
  console.log('PASS S02 routine tunnel verification: dashboard-to-Objectif route, objective proof contract, planning/checkout continuations, local CTA targets, responsive overflow, and console health are valid.');
} finally {
  await browser.close();
}
