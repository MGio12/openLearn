import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, normalize, relative, resolve, sep } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(join(fileURLToPath(import.meta.url), '..', '..'));
const OVERFLOW_TOLERANCE = 1;

const APP_SHELL_PAGES = new Set([
  'index.html',
  'planning.html',
  'progression.html',
  'objectif.html',
  'fiches.html',
  'controles.html',
  'abonnement.html',
  'parametres.html',
  'contenu.html',
]);

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
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

function rootPages() {
  return readdirSync(ROOT)
    .filter((name) => name.endsWith('.html'))
    .sort();
}

function assertStaticRedesignContract() {
  const prototypeTargets = ['index.html', 'assets/css/pages/home.css'];
  for (const target of prototypeTargets) {
    const content = readFileSync(join(ROOT, target), 'utf8');
    assert(!/Prototype|Parcourir le prototype|ap-prototype/.test(content), `${target}: prototype navigation block must be removed`);
  }

  const cssTargets = [
    'styles.css',
    ...readdirSync(join(ROOT, 'assets/css/pages'))
      .filter((name) => name.endsWith('.css'))
      .map((name) => `assets/css/pages/${name}`),
  ];

  for (const target of cssTargets) {
    const content = readFileSync(join(ROOT, target), 'utf8');
    assert(!/\.ph-[a-z0-9-]+::before/.test(content), `${target}: fake Phosphor ::before fallback must not be used`);
  }

  assert(existsSync(join(ROOT, 'contenu.html')), 'contenu.html must exist');
}

function pageUrl(baseUrl, path) {
  return `${baseUrl}/${path.split(sep).join('/')}`;
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

function isLocalHtmlHref(rawHref) {
  if (!rawHref) return false;
  if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(rawHref)) return false;
  const clean = rawHref.split('#')[0].split('?')[0];
  return clean.endsWith('.html');
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: Math.max(doc.scrollWidth, document.body?.scrollWidth || 0),
      innerWidth: window.innerWidth,
    };
  });

  assert(
    overflow.scrollWidth <= overflow.innerWidth + OVERFLOW_TOLERANCE,
    `${label}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
  );
}

async function assertH1Visible(page, label) {
  const h1 = page.locator('h1').first();
  assert(await h1.count(), `${label}: expected an h1`);
  assert(await h1.isVisible(), `${label}: h1 must be visible`);
}

async function assertPageHeadingContract(page, pagePath, label) {
  if (pagePath === 'onboarding.html') {
    assert(await page.locator('#root').count(), `${label}: onboarding root must exist`);
    assert(/Diagnostic/i.test(await page.title()), `${label}: onboarding title must describe the diagnostic`);
    return;
  }

  await assertH1Visible(page, label);
}

async function assertLocalLinksExist(page, pagePath, label) {
  const hrefs = await page.locator('a[href]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  const missing = [];

  for (const href of hrefs) {
    if (!isLocalHtmlHref(href)) continue;

    const clean = href.split('#')[0].split('?')[0];
    const target = normalize(join(ROOT, clean));
    const rel = relative(ROOT, target);

    if (rel.startsWith('..') || rel.includes(`..${sep}`) || !existsSync(target) || !statSync(target).isFile()) {
      missing.push(href);
    }
  }

  assert(missing.length === 0, `${label}: missing local html links from ${pagePath}: ${missing.join(', ')}`);
}

async function assertImagesLoaded(page, label) {
  const failures = await page.locator('img').evaluateAll((images) => images
    .filter((image) => image.getAttribute('src'))
    .filter((image) => !image.complete || image.naturalWidth <= 0)
    .map((image) => image.getAttribute('src')));

  assert(failures.length === 0, `${label}: images failed to load: ${failures.join(', ')}`);
}

async function assertAppShellNavigation(page, pagePath, viewport, label) {
  if (!APP_SHELL_PAGES.has(pagePath)) return;

  const sidebarContent = page.locator('.sidebar a[href="contenu.html"]').first();
  assert(await sidebarContent.count(), `${label}: sidebar must expose Contenu`);

  const sidebarText = await page.locator('.sidebar').first().textContent();
  assert(!/Fiches|Contrôles|Controles|Focus/.test(sidebarText || ''), `${label}: sidebar must not expose Fiches, Contrôles, or Focus`);

  if (viewport.label === 'desktop') {
    assert(await sidebarContent.isVisible(), `${label}: desktop sidebar Contenu link must be visible`);
  }

  if (viewport.label === 'mobile') {
    const mobileTabs = page.locator('.mobile-tabs');
    assert(await mobileTabs.count(), `${label}: mobile tabs must exist`);
    const mobileContent = page.locator('.mobile-tabs a[href="contenu.html"]').first();
    assert(await mobileContent.count(), `${label}: mobile nav must expose Contenu`);
    assert(await mobileContent.isVisible(), `${label}: mobile nav Contenu link must be visible`);

    const hrefs = await page.locator('.mobile-tabs a[href]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    const expected = ['index.html', 'planning.html', 'contenu.html', 'progression.html', 'objectif.html'];
    assert(hrefs.length === expected.length, `${label}: mobile nav must expose exactly ${expected.length} tabs`);
    assert(expected.every((href, index) => hrefs[index] === href), `${label}: mobile nav order must be Aujourd'hui, Planning, Contenu, Progression, Objectif`);
  }
}

async function assertContentPageContract(page, pagePath, label) {
  if (pagePath !== 'contenu.html') return;

  const h1 = page.locator('h1', { hasText: /^Contenu$/ }).first();
  assert(await h1.count(), `${label}: Contenu h1 must exist`);
  assert(await h1.isVisible(), `${label}: Contenu h1 must be visible`);

  const activeSubject = page.locator('.subject-pill.is-active', { hasText: 'Maths spé' }).first();
  assert(await activeSubject.count(), `${label}: Maths spé subject must be active`);
  assert(await page.locator('.subject-pill:disabled').count() >= 7, `${label}: non-maths subjects must be disabled as bientôt`);

  const chapters = page.locator('details.content-chapter');
  const chapterCount = await chapters.count();
  assert(chapterCount >= 10, `${label}: expected at least 10 maths chapters, got ${chapterCount}`);
  assert(await chapters.first().evaluate((chapter) => chapter.open), `${label}: first chapter must be open by default`);

  const chapterContracts = await chapters.evaluateAll((nodes) => nodes.map((chapter) => {
    const summary = chapter.querySelector('summary');
    const actions = Array.from(chapter.querySelectorAll('.chapter-actions a'));
    return {
      hasInteractiveSummaryAction: Boolean(summary?.querySelector('a, button')),
      labels: actions.map((link) => link.textContent?.replace(/\s+/g, ' ').trim()),
      hrefs: actions.map((link) => link.getAttribute('href')),
    };
  }));

  for (const [index, contract] of chapterContracts.entries()) {
    assert(!contract.hasInteractiveSummaryAction, `${label}: chapter ${index + 1} actions must stay outside summary`);
    assert(contract.labels.length === 3, `${label}: chapter ${index + 1} must expose 3 actions`);
    assert(contract.labels[0] === 'Cours', `${label}: chapter ${index + 1} first action must be Cours`);
    assert(contract.labels[1] === 'Exos', `${label}: chapter ${index + 1} second action must be Exos`);
    assert(contract.labels[2] === 'Fiches', `${label}: chapter ${index + 1} third action must be Fiches`);
    assert(contract.hrefs[0]?.endsWith('/index.html'), `${label}: chapter ${index + 1} Cours link must target the chapter page`);
    assert(contract.hrefs[1]?.endsWith('/td.html'), `${label}: chapter ${index + 1} Exos link must target the separate TD page`);
    assert(contract.hrefs[2]?.endsWith('/index.html#revision'), `${label}: chapter ${index + 1} Fiches link must target #revision`);
  }
}

async function checkPage(browser, baseUrl, pagePath, viewport) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  const errors = [];
  const label = `${pagePath} [${viewport.label}]`;

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  try {
    if (pagePath === 'parametres.html') {
      await page.addInitScript(() => {
        localStorage.setItem('outilPrepa:v1', JSON.stringify({
          schemaVersion: 1,
          profile: {
            localAccountId: 'local-account-redesign',
            displayName: 'Lina',
            fullName: 'Lina',
            classLevel: 'premiere',
            tracks: ['maths', 'physique-chimie'],
            prioritySubjectIds: ['maths'],
            aiPreferences: {
              tone: 'direct',
              detailLevel: 'progressif',
              allowDeepening: true,
            },
          },
          objective: {
            targetLabel: 'Ecole d ingenieur post-bac',
            prioritySubjectIds: ['maths'],
          },
        }));
      });
    }
    await page.goto(pageUrl(baseUrl, pagePath), { waitUntil: 'networkidle' });
    await assertPageHeadingContract(page, pagePath, label);
    await assertNoHorizontalOverflow(page, label);
    await assertLocalLinksExist(page, pagePath, label);
    await assertImagesLoaded(page, label);
    await assertAppShellNavigation(page, pagePath, viewport, label);
    await assertContentPageContract(page, pagePath, label);
    assert(errors.length === 0, `${label}: console/page errors: ${errors.join(' | ')}`);
  } finally {
    await page.close();
  }
}

assertStaticRedesignContract();

const pages = rootPages();
const server = await startServer();
const browser = await chromium.launch();

try {
  for (const pagePath of pages) {
    for (const viewport of VIEWPORTS) {
      await checkPage(browser, server.baseUrl, pagePath, viewport);
    }
  }
} finally {
  await browser.close();
  await server.close();
}

console.log(`PASS redesign verification: ${pages.length} root pages x ${VIEWPORTS.length} viewports.`);
