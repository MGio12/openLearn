import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import vm from 'vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INDEX_PATH = join(ROOT, 'index.html');
const INDEX_URL = pathToFileURL(INDEX_PATH).href;
const STATE_PATH = join(ROOT, 'assets', 'js', 'state', 'store.js');

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

async function findMissionBlock(page) {
  const today = page.locator('#view-today');
  await expectVisible(today, 'today view must be present and visible');

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

  fail('daily mission block must exist in the Today view and include the text “Mission du jour”');
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

async function assertStaticContract(page) {
  const today = page.locator('#view-today');
  const missionBlock = await findMissionBlock(page);
  const stats = today.locator('.stats').first();
  assert(await stats.count(), 'stats block must exist so mission-first ordering can be verified');

  const order = await today.evaluate((root) => {
    const mission = root.querySelector('[data-testid="daily-mission"], [data-daily-mission-container], .daily-mission, .mission-du-jour')
      || Array.from(root.querySelectorAll('section, article, .card, div')).find((element) => /Mission du jour/i.test(element.textContent || ''));
    const statsElement = root.querySelector('.stats');
    if (!mission || !statsElement) return null;
    return Boolean(mission.compareDocumentPosition(statsElement) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  assert(order === true, 'daily mission block must appear before stats');

  const heading = missionBlock.getByText(/Mission du jour/i).first();
  await expectVisible(heading, 'daily mission block must display the heading “Mission du jour”');

  const actionCount = await missionBlock.evaluate((block) => {
    const explicitActions = block.querySelectorAll('[data-mission-action], .mission-action').length;
    if (explicitActions) return explicitActions;
    const listItems = block.querySelectorAll('li').length;
    if (listItems) return listItems;
    return block.querySelectorAll('input[type="checkbox"], [role="checkbox"]').length;
  });
  assert(actionCount >= 2 && actionCount <= 3, 'daily mission block must list 2–3 action items');

  const missingMissionIndexes = await missionBlock.evaluate((block) => Array.from(block.querySelectorAll('[data-mission-action]'))
    .filter((element) => !element.hasAttribute('data-mission-step') && !element.hasAttribute('data-mission-index'))
    .length);
  assert(missingMissionIndexes === 0, 'each [data-mission-action] must declare data-mission-step or data-mission-index');

  const blockText = normalizeText(await missionBlock.textContent());
  assert(/(dur[ée]e\s+totale|total\s*:|total\s+\d|\d+\s*(min|mn|h))|\d+h\d{0,2}/i.test(blockText), 'daily mission block must show total duration');

  const primaryLink = missionBlock.locator('a[href="objectif.html"]').first();
  await expectVisible(primaryLink, 'daily mission block must include a primary link with href="objectif.html"');

  const supportLink = missionBlock.locator('a[href="planning.html"]').first();
  await expectVisible(supportLink, 'daily mission block must include a support link with href="planning.html"');

  return { missionBlock, heading, primaryLink, supportLink };
}

async function assertLockableMissionCta(page) {
  const cta = page.locator('[data-lockable-mission-cta]').first();
  await expectVisible(cta, 'daily mission block must expose [data-lockable-mission-cta]');
  assert(await cta.getAttribute('href') === 'objectif.html', 'unlocked mission CTA must target objectif.html');
  assert(await cta.getAttribute('data-lock-state') === 'unlocked', 'unlocked mission CTA must declare data-lock-state="unlocked"');

  await page.evaluate(() => {
    window.OutilPrepa.state.totalMissionsCompleted = 999;
    window.OutilPrepaMissionUI.render();
  });

  assert(await cta.getAttribute('href') === 'checkout.html', 'locked mission CTA must target data-locked-href checkout.html');
  assert(await cta.getAttribute('data-lock-state') === 'locked', 'locked mission CTA must declare data-lock-state="locked"');
  const label = normalizeText(await cta.locator('[data-gated-label]').textContent());
  assert(/Activer le plan/i.test(label), `locked mission CTA label must be updated with textContent, got "${label}"`);
}

async function assertDesktop(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  const consoleErrors = await collectConsoleErrors(page);
  await gotoIndex(page);
  const { heading, primaryLink } = await assertStaticContract(page);
  await assertInViewport(page, heading, 'desktop mission heading must be visible above the fold');
  await assertInViewport(page, primaryLink, 'desktop primary mission CTA must be visible above the fold');
  await assertLockableMissionCta(page);
  assert(consoleErrors.length === 0, `dashboard must not emit page console errors: ${consoleErrors.join(' | ')}`);
}

async function assertMobile(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  const consoleErrors = await collectConsoleErrors(page);
  await gotoIndex(page);
  const { missionBlock, heading, primaryLink } = await assertStaticContract(page);
  await assertInViewport(page, heading, 'mobile mission heading must be visible/readable');

  const actionLocator = missionBlock.locator('li, [data-mission-action], .mission-action, input[type="checkbox"], [role="checkbox"]').first();
  await assertInViewport(page, actionLocator, 'mobile mission action list must be visible/readable');

  const durationLocator = missionBlock.getByText(/(dur[ée]e\s+totale|total\s*:|total\s+\d|\d+\s*(min|mn|h))|\d+h\d{0,2}/i).first();
  await assertInViewport(page, durationLocator, 'mobile mission duration must be visible/readable');
  await assertInViewport(page, primaryLink, 'mobile primary mission CTA must be visible/readable');

  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
  assert(
    overflow.scrollWidth <= overflow.innerWidth + 1,
    `mobile dashboard must not have horizontal overflow: scrollWidth ${overflow.scrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
  assert(consoleErrors.length === 0, `mobile dashboard must not emit page console errors: ${consoleErrors.join(' | ')}`);
}

async function assertNavigation(page) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoIndex(page);
  let { primaryLink } = await assertStaticContract(page);
  await primaryLink.click();
  await page.waitForLoadState('networkidle');
  assert(page.url().endsWith('/objectif.html'), `primary mission CTA must navigate to /objectif.html, got ${page.url()}`);

  await gotoIndex(page);
  const contract = await assertStaticContract(page);
  await contract.supportLink.click();
  await page.waitForLoadState('networkidle');
  assert(page.url().endsWith('/planning.html'), `support planning link must navigate to /planning.html, got ${page.url()}`);
}

if (!existsSync(INDEX_PATH)) {
  fail(`index.html target does not exist at ${INDEX_PATH}`);
}

function assertStateModelGuard() {
  assert(existsSync(STATE_PATH), `store.js target does not exist at ${STATE_PATH}`);

  try {
    vm.runInNewContext(readFileSync(STATE_PATH, 'utf8'), {
      window: {},
      localStorage: {
        getItem() { return null; },
        setItem() {},
      },
      Set,
      Date,
      JSON,
    }, { filename: STATE_PATH });
  } catch (error) {
    assert(
      /OutilPrepaModel/.test(error.message) && /todayISO/.test(error.message),
      `assets/js/state/store.js: missing model guard must mention OutilPrepaModel.todayISO, got "${error.message}"`,
    );
    return;
  }

  fail('assets/js/state/store.js must throw a clear OutilPrepaModel.todayISO error when the model is missing');
}

assertStateModelGuard();

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await assertDesktop(page);
  await assertMobile(page);
  await assertNavigation(page);
  console.log('PASS S01 dashboard mission verification: mission-first structure, responsive visibility, console health, and Objectif/Planning CTA navigation are valid.');
} finally {
  await browser.close();
}
