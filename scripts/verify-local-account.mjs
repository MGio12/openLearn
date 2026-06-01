import { createReadStream, existsSync, readFileSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, normalize, relative, resolve, sep } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const PAGE = 'parametres.html';
const MAIN_ACCOUNT_PAGES = ['index.html', 'objectif.html', 'planning.html', 'progression.html', 'contenu.html'];
const OVERFLOW_TOLERANCE = 1;

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function assertStaticContract() {
  const html = readFileSync(join(ROOT, PAGE), 'utf8');
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

  assert(pkg.scripts?.['verify:local-account'] === 'node scripts/verify-local-account.mjs', 'package.json must expose verify:local-account');
  assert(/assets\/js\/domain\/model\.js/.test(html), 'parametres.html must load the shared model');
  assert(/assets\/js\/state\/store\.js/.test(html), 'parametres.html must load the shared store');
  assert(/assets\/js\/pages\/parametres\.js/.test(html), 'parametres.html must load the settings account script');
  assert(/data-account-form/.test(html), 'parametres.html must expose a local account form');
  assert(/data-account-save/.test(html), 'parametres.html must expose a save button');
  assert(/data-account-reset/.test(html), 'parametres.html must expose a reset button');
  assert(!/En préparation|class="placeholder|Paramètres \(placeholder\)/.test(html), 'parametres.html must no longer be a placeholder page');

  const store = readFileSync(join(ROOT, 'assets/js/state/store.js'), 'utf8');
  assert(/saveLocalAccount/.test(store), 'store must expose saveLocalAccount');
  assert(/resetLocalAccount/.test(store), 'store must expose resetLocalAccount');

  const onboarding = readFileSync(join(ROOT, 'onboarding.html'), 'utf8');
  assert(/assets\/js\/domain\/model\.js/.test(onboarding), 'onboarding.html must load the shared model before the bundle');
  assert(/assets\/js\/state\/store\.js/.test(onboarding), 'onboarding.html must load the shared store before the bundle');
  assert(/hasLocalAccount/.test(onboarding), 'onboarding.html must detect existing local accounts before showing the diagnostic');

  const onboardingApp = readFileSync(join(ROOT, 'onboarding/app.jsx'), 'utf8');
  assert(/applyOnboarding/.test(onboardingApp), 'onboarding app must write the completed diagnostic into the shared store');

  MAIN_ACCOUNT_PAGES.forEach((pageName) => {
    const pageHtml = readFileSync(join(ROOT, pageName), 'utf8');
    assert(/assets\/js\/domain\/model\.js/.test(pageHtml), `${pageName} must load the shared model`);
    assert(/assets\/js\/state\/store\.js/.test(pageHtml), `${pageName} must load the shared store`);
    assert(/scripts\/dom\.js/.test(pageHtml), `${pageName} must load shared DOM helpers`);
    assert(/scripts\/user-context-ui\.js/.test(pageHtml), `${pageName} must load user-context-ui`);
    assert(/data-user-initials/.test(pageHtml), `${pageName} must expose dynamic user initials`);
    assert(/data-user-full-name/.test(pageHtml), `${pageName} must expose dynamic user name`);
    assert(/data-user-role/.test(pageHtml), `${pageName} must expose dynamic user role`);
    assert(/data-local-account-prompt/.test(pageHtml), `${pageName} must expose the no-account fallback prompt`);
  });
}

function startServer() {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent((request.url || '/').split('?')[0]);
    const requestPath = pathname === '/' ? '/index.html' : pathname;
    const filePath = normalize(join(ROOT, requestPath));
    const rel = relative(ROOT, filePath);

    if (rel.startsWith('..') || rel === '' || rel.includes(`..${sep}`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    pipeline(createReadStream(filePath), response).catch(() => {
      if (!response.headersSent) response.writeHead(500);
      response.destroy();
    });
  });

  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolveServer({
        baseUrl: `http://127.0.0.1:${address.port}`,
        close: () => new Promise((resolveClose) => server.close(resolveClose)),
      });
    });
  });
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body?.scrollWidth || 0,
    innerWidth: window.innerWidth,
  }));
  const maxScrollWidth = Math.max(overflow.scrollWidth, overflow.bodyScrollWidth);
  assert(
    maxScrollWidth <= overflow.innerWidth + OVERFLOW_TOLERANCE,
    `${label}: horizontal overflow ${maxScrollWidth}px > ${overflow.innerWidth}px`,
  );
}

async function isHidden(locator) {
  return locator.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return element.hidden
      || element.getAttribute('aria-hidden') === 'true'
      || style.display === 'none'
      || style.visibility === 'hidden';
  });
}

async function assertMainPagesWithAccount(page, baseUrl, viewport, errors) {
  for (const pageName of MAIN_ACCOUNT_PAGES) {
    const label = `${pageName} ${viewport.label} local account`;
    const previousErrorCount = errors.length;
    await page.goto(`${baseUrl}/${pageName}`, { waitUntil: 'networkidle' });

    await assertNoHorizontalOverflow(page, label);
    assert(errors.length === previousErrorCount, `${label}: console/page errors: ${errors.slice(previousErrorCount).join(' | ')}`);

    const names = await page.locator('[data-user-full-name]').allTextContents();
    const roles = await page.locator('[data-user-role]').allTextContents();
    assert(names.some((text) => text.includes('Lina')), `${label}: user name must come from the local account`);
    assert(roles.some((text) => /Première/.test(text) && /maths/.test(text)), `${label}: role must reflect local class and subjects`);

    const prompt = page.locator('[data-local-account-prompt]').first();
    assert(await prompt.count() === 1, `${label}: missing account fallback prompt`);
    assert(await isHidden(prompt), `${label}: fallback prompt must be hidden when a local account exists`);
  }
}

async function assertMainPagesWithoutAccount(page, baseUrl, viewport, errors) {
  for (const pageName of MAIN_ACCOUNT_PAGES) {
    const label = `${pageName} ${viewport.label} no local account`;
    const previousErrorCount = errors.length;
    await page.goto(`${baseUrl}/${pageName}`, { waitUntil: 'networkidle' });

    await assertNoHorizontalOverflow(page, label);
    assert(errors.length === previousErrorCount, `${label}: console/page errors: ${errors.slice(previousErrorCount).join(' | ')}`);

    const prompt = page.locator('[data-local-account-prompt]').first();
    assert(await prompt.count() === 1, `${label}: missing account fallback prompt`);
    assert(!(await isHidden(prompt)), `${label}: fallback prompt must be visible without a local account`);

    const links = await prompt.locator('a').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href') || ''));
    assert(
      links.some((href) => href.includes('onboarding.html')),
      `${label}: fallback prompt must link to onboarding`,
    );
    assert(
      !links.some((href) => href.includes('parametres.html')),
      `${label}: fallback prompt must not use settings as the creation entry`,
    );
  }
}

async function seedLocalAccount(page, baseUrl) {
  await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('outilPrepa:v1');
    localStorage.removeItem('objectif-lycee-onboarding-v3');
    window.OutilPrepa.saveLocalAccount({
      displayName: 'Lina',
      classLevel: 'premiere',
      objectiveLabel: 'Ecole d ingenieur post-bac',
      rhythm: 'moyen',
      tracks: ['maths', 'physique-chimie'],
      prioritySubjectIds: ['maths'],
      aiPreferences: {
        tone: 'direct',
        detailLevel: 'progressif',
        allowDeepening: true,
      },
      source: 'test-onboarding-seed',
    });
  });
  await page.waitForFunction(() => {
    const raw = localStorage.getItem('outilPrepa:v1');
    if (!raw) return false;
    const state = JSON.parse(raw);
    return state.profile?.displayName === 'Lina' && state.profile?.localAccountId;
  }, null, { timeout: 5000 }).catch(() => fail('seeded local account must be persisted before opening settings'));
}

async function assertSettingsRedirectsWithoutAccount(page, baseUrl, viewport) {
  await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('outilPrepa:v1');
    localStorage.removeItem('objectif-lycee-onboarding-v3');
  });
  await page.goto(`${baseUrl}/${PAGE}`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(/\/onboarding\.html$/, { timeout: 3000 });
  assert(
    page.url().endsWith('/onboarding.html'),
    `${PAGE} ${viewport.label}: settings must redirect to onboarding without a local account`,
  );
}

async function assertOnboardingRedirectsWithAccount(page, baseUrl, viewport) {
  await page.goto(`${baseUrl}/onboarding.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(/\/index\.html$/, { timeout: 3000 });
  assert(
    page.url().endsWith('/index.html'),
    `onboarding.html ${viewport.label}: existing local account must redirect to index.html`,
  );
}

async function inspectAccountPage(browser, baseUrl, viewport) {
  const label = `${PAGE} ${viewport.label}`;
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  try {
    await page.goto(`${baseUrl}/index.html`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      localStorage.removeItem('outilPrepa:v1');
      localStorage.setItem('objectif-lycee-onboarding-v3', JSON.stringify({ profile: { nom: 'Ancien' } }));
    });

    await assertMainPagesWithoutAccount(page, baseUrl, viewport, errors);
    await assertSettingsRedirectsWithoutAccount(page, baseUrl, viewport);
    await seedLocalAccount(page, baseUrl);
    await assertOnboardingRedirectsWithAccount(page, baseUrl, viewport);

    await page.goto(`${baseUrl}/${PAGE}`, { waitUntil: 'networkidle' });
    await assertNoHorizontalOverflow(page, label);
    assert(errors.length === 0, `${label}: console/page errors: ${errors.join(' | ')}`);
    await page.locator('[data-account-form]').waitFor({ state: 'visible' });

    await page.locator('[name="displayName"]').fill('Lina');
    await page.locator('[name="classLevel"]').selectOption('premiere');
    await page.locator('[name="objectiveLabel"]').fill('Ecole d ingenieur post-bac');
    await page.locator('[name="rhythm"]').selectOption('moyen');
    await page.locator('[name="tone"]').selectOption('direct');
    await page.locator('[name="detailLevel"]').selectOption('progressif');
    await page.locator('[name="allowDeepening"]').setChecked(true);
    await page.locator('[name="tracks"][value="maths"]').setChecked(true);
    await page.locator('[name="tracks"][value="physique-chimie"]').setChecked(true);
    await page.locator('[name="prioritySubjectIds"][value="maths"]').setChecked(true);
    await page.locator('[data-account-save]').click();

    await page.waitForFunction(() => {
      const raw = localStorage.getItem('outilPrepa:v1');
      if (!raw) return false;
      const state = JSON.parse(raw);
      return state.profile?.displayName === 'Lina' && state.profile?.localAccountId;
    }, null, { timeout: 5000 }).catch(() => fail(`${label}: saved local account must persist`));

    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('outilPrepa:v1')));
    assert(saved.profile.fullName === 'Lina', `${label}: fullName must be saved`);
    assert(saved.profile.classLevel === 'premiere', `${label}: classLevel must be saved`);
    assert(saved.profile.tracks.includes('maths') && saved.profile.tracks.includes('physique-chimie'), `${label}: tracks must be saved`);
    assert(saved.profile.prioritySubjectIds.includes('maths'), `${label}: priority subjects must be saved`);
    assert(saved.profile.aiPreferences.tone === 'direct', `${label}: AI tone must be saved`);
    assert(saved.profile.aiPreferences.detailLevel === 'progressif', `${label}: AI detail level must be saved`);
    assert(saved.profile.aiPreferences.allowDeepening === true, `${label}: AI deepening flag must be saved`);
    assert(saved.objective.targetLabel === 'Ecole d ingenieur post-bac', `${label}: objective must be saved`);

    await page.reload({ waitUntil: 'networkidle' });
    await page.locator('[data-account-form]').waitFor({ state: 'visible' });
    assert(await page.locator('[name="displayName"]').inputValue() === 'Lina', `${label}: display name must reload from storage`);
    assert(await page.locator('[name="classLevel"]').inputValue() === 'premiere', `${label}: class must reload from storage`);

    await assertMainPagesWithAccount(page, baseUrl, viewport, errors);
    await page.goto(`${baseUrl}/${PAGE}`, { waitUntil: 'networkidle' });

    page.once('dialog', (dialog) => dialog.accept());
    await page.locator('[data-account-reset]').click();
    await page.waitForURL(/\/onboarding\.html$/, { timeout: 3000 });
    await page.waitForFunction(() => {
      const raw = localStorage.getItem('outilPrepa:v1');
      const state = raw ? JSON.parse(raw) : {};
      const onboarding = localStorage.getItem('objectif-lycee-onboarding-v3') || '';
      return !state.profile?.localAccountId && !onboarding.includes('Ancien');
    }, null, { timeout: 5000 }).catch(async () => {
      const snapshot = await page.evaluate(() => ({
        url: location.href,
        appState: localStorage.getItem('outilPrepa:v1'),
        onboardingState: localStorage.getItem('objectif-lycee-onboarding-v3'),
      }));
      fail(`${label}: reset must clear local account and previous onboarding state. Snapshot: ${JSON.stringify(snapshot).slice(0, 600)}`);
    });

    await assertMainPagesWithoutAccount(page, baseUrl, viewport, errors);
  } finally {
    await page.close();
  }
}

async function main() {
  assertStaticContract();

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  try {
    const viewports = [
      { label: 'desktop', width: 1440, height: 900 },
      { label: 'mobile', width: 390, height: 844 },
    ];
    for (const viewport of viewports) {
      await inspectAccountPage(browser, server.baseUrl, viewport);
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log('verify:local-account OK');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
