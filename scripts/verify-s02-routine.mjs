import { chromium } from 'playwright';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INDEX_PATH = join(ROOT, 'index.html');
const MISSION_PATH = join(ROOT, 'mission.html');
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
    today.locator('[data-contract="daily-mission"]'),
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
  const missionLink = missionBlock.locator('a[href="mission.html"]').first();
  await expectVisible(missionLink, `${viewportLabel} index.html: daily mission block must include a visible href="mission.html" CTA`);
  await assertInViewport(page, missionLink, `${viewportLabel} index.html: daily mission CTA must be visible before navigation`);

  await missionLink.click();
  await page.waitForLoadState('networkidle');
  assert(page.url().endsWith('/mission.html'), `${viewportLabel} index.html: mission CTA must navigate to /mission.html, got ${page.url()}`);
}

async function assertMissionContract(page, viewportLabel) {
  const bodyText = normalizeText(await page.locator('body').textContent());
  const heading = page.locator('h1, h2, h3').filter({ hasText: /(Exponentielle|mission)/i }).first();
  await assertInViewport(page, heading, `${viewportLabel} mission.html: page must expose a visible heading mentioning the mission`);

  assert(/45\s*(min|mn|minutes?)/i.test(bodyText), `${viewportLabel} mission.html: mission contract must show an estimated duration around 45 min`);
  assert(
    /(prioritaire|priorit[ée]|pourquoi|why|bon pari|signal|dossier|objectif|Parcoursup)/i.test(bodyText),
    `${viewportLabel} mission.html: mission contract must explain why this work is priority/rationalized`,
  );

  const checklistItems = page.locator('.checklist .item, [data-mission-step], [data-contract="mission-step"], li').filter({ hasText: /\S/ });
  const stepCount = await checklistItems.count();
  assert(stepCount >= 2 && stepCount <= 4, `${viewportLabel} mission.html: mission must expose 2–4 concrete step/checklist items, found ${stepCount}`);
  await assertInViewport(page, checklistItems.first(), `${viewportLabel} mission.html: first concrete mission step must be visible`);
}

async function assertVisibleRoute(page, href, viewportLabel) {
  const route = page.locator(`.routine-continuation a[href="${href}"]`).filter({ hasText: /\S/ }).first();
  await expectVisible(route, `${viewportLabel} mission.html: routine continuation must include a visible anchor to ${href}`);
}

function isLocalHtmlHref(href) {
  return /^[^:/?#]+\.html(?:[#?].*)?$/.test(href);
}

function localHtmlPath(href) {
  return join(ROOT, href.split('#')[0].split('?')[0]);
}

async function assertRoutineRoutes(page, viewportLabel) {
  await assertVisibleRoute(page, 'index.html', viewportLabel);
  await assertVisibleRoute(page, 'objectif.html', viewportLabel);
  await assertVisibleRoute(page, 'checkout.html', viewportLabel);
}

async function assertLocalCtaTargets(page, viewportLabel) {
  const visibleCtas = await page.locator('a.btn, a.start-btn, .start-block a, .daily-brief__actions a, a.resource[href]').evaluateAll((anchors) => anchors
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
    assert(cta.href && cta.href !== '#', `${viewportLabel} mission.html: visible CTA “${cta.text || '(sans texte)'}” must not be an inert # link`);
    if (isLocalHtmlHref(cta.href)) {
      assert(existsSync(localHtmlPath(cta.href)), `${viewportLabel} mission.html: visible CTA “${cta.text || cta.href}” points to missing local file ${cta.href}`);
    }
  }

  const inertPrimaryButtons = await page.locator('.start-block button, button.btn, [role="button"].btn').evaluateAll((buttons) => buttons
    .filter((button) => {
      const style = window.getComputedStyle(button);
      const rect = button.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    })
    .map((button) => (button.textContent || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean));

  assert(
    inertPrimaryButtons.length === 0,
    `${viewportLabel} mission.html: routine continuation must not use inert CTA-like buttons without navigation (${inertPrimaryButtons.join(' | ')})`,
  );
}

async function assertNoHorizontalOverflow(page, viewportLabel) {
  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  assert(
    overflow.scrollWidth <= overflow.innerWidth + 1,
    `${viewportLabel} mission.html: page must not have horizontal overflow: scrollWidth ${overflow.scrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function assertViewport(viewport) {
  const page = await browser.newPage();
  const consoleErrors = await collectConsoleErrors(page);
  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await assertDashboardNavigation(page, viewport.label);
    await assertMissionContract(page, viewport.label);
    await assertRoutineRoutes(page, viewport.label);
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

if (!existsSync(MISSION_PATH)) {
  fail(`mission.html target does not exist at ${MISSION_PATH}`);
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
  console.log('PASS S02 routine tunnel verification: mission navigation, routine contract, continuation routes, local CTA targets, responsive overflow, and console health are valid.');
} finally {
  await browser.close();
}
