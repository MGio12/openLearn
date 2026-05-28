import { createReadStream, existsSync, mkdirSync, readdirSync, renameSync, statSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import { dirname, extname, join, normalize, relative, resolve, sep } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(join(dirname(fileURLToPath(import.meta.url)), '..'));
const OUT_ROOT = join(ROOT, 'output', 'playwright', 'aha-video');

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

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

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

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    headed: args.includes('--headed'),
    slugs: args.filter((arg) => !arg.startsWith('--')),
  };
}

function clipUrl(baseUrl, path) {
  return `${baseUrl}/${path.replace(/^\/+/, '')}`;
}

function makeLocatorName(pattern) {
  return pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i');
}

async function pause(ms = 650) {
  await new Promise((resolvePause) => setTimeout(resolvePause, ms));
}

async function goto(page, baseUrl, path) {
  await page.goto(clipUrl(baseUrl, path), { waitUntil: 'networkidle' });
}

async function clickButton(page, pattern, options = {}) {
  const locator = page.getByRole('button', { name: makeLocatorName(pattern) }).first();
  await locator.click({ timeout: options.timeout || 8000 });
  await pause(options.pause || 650);
}

async function clickContinue(page) {
  await clickButton(page, /Continuer/, { pause: 650 });
}

async function waitForCourse(page) {
  await page.waitForFunction(() => document.readyState === 'complete');
  await pause(900);
}

async function revealFirstAnswer(page, scopeSelector) {
  const button = page.locator(`${scopeSelector} .reveal-button`).first();
  if (await button.count()) {
    await button.click();
    await pause(550);
  }
}

async function completeMissionOnPage(page) {
  await page.waitForFunction(() => window.OutilPrepa && typeof window.OutilPrepa.completeMissionToday === 'function');
  await page.evaluate(() => window.OutilPrepa.completeMissionToday());
  await pause(450);
}

const SHOTS = [
  {
    slug: '01-onboarding-diagnostic-mission',
    title: 'Diagnostic -> mission prete',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'onboarding.html');
      await page.evaluate(() => {
        localStorage.removeItem('objectif-lycee-onboarding-v3');
        localStorage.removeItem('outilPrepa:v1');
      });
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByRole('button', { name: /Trouver ma mission/i }).waitFor({ timeout: 12000 });
      await capture('00-intro');

      await clickButton(page, /Trouver ma mission/);
      await clickButton(page, /Premi.re/);
      await page.getByRole('button', { name: /hasard/i }).click();
      await pause(300);
      await page.getByRole('button', { name: /meilleur dossier/i }).click();
      await pause(300);
      await clickContinue(page);
      await capture('01-profil-rempli');

      await clickContinue(page);
      await page.getByRole('button', { name: /Bac blanc/i }).click();
      await pause(300);
      await page.getByRole('button', { name: /Parcoursup/i }).click();
      await pause(300);
      await clickContinue(page);
      await page.getByRole('button', { name: /Math/i }).click();
      await pause(300);
      await page.getByRole('button', { name: /Physique/i }).click();
      await pause(300);
      await clickContinue(page);
      await clickButton(page, /je rate les exercices/i);
      await clickButton(page, /Correct/i);
      await clickContinue(page);
      await page.locator('input').first().fill('Lina');
      await clickContinue(page);

      await page.getByText(/On prepare ta mission|On pr.pare ta mission/i).first().waitFor({ timeout: 12000 });
      await capture('02-generation');
      await page.getByText(/Ta premi.re mission est pr.te/i).first().waitFor({ timeout: 12000 });
      await pause(1000);
      await capture('03-mission-prete');
    },
  },
  {
    slug: '02-dashboard-why-mission',
    title: 'Pourquoi cette mission ?',
    viewport: DESKTOP,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'index.html');
      await page.locator('[data-testid="daily-mission"]').waitFor({ timeout: 8000 });
      await capture('00-mission-du-jour');
      await page.locator('[data-why-toggle]').click();
      await pause(1100);
      await capture('01-preuve-ouverte');
    },
  },
  {
    slug: '03-objectif-progression',
    title: 'Objectif -> progression visible',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'objectif.html');
      await page.locator('.op-decision').waitFor({ timeout: 8000 });
      await capture('00-pourquoi-cette-mission');
      await goto(page, baseUrl, 'progression.html');
      await page.waitForLoadState('networkidle');
      await completeMissionOnPage(page);
      await page.locator('[data-progress-history]').waitFor({ timeout: 8000 });
      await pause(900);
      await capture('02-avance-visible');
    },
  },
  {
    slug: '04-progress-plant',
    title: 'Rythme recent',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'progression.html');
      await completeMissionOnPage(page);
      await page.locator('.pp-streak-panel').waitFor({ timeout: 8000 });
      await capture('00-rythme-apres-mission');
    },
  },
  {
    slug: '05-progress-details',
    title: 'Moyennes par matiere',
    viewport: DESKTOP,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'progression.html');
      await completeMissionOnPage(page);
      await capture('00-avance');
      await page.getByRole('button', { name: /Maths sp/i }).click();
      await pause(800);
      await capture('01-maths-spe');
    },
  },
  {
    slug: '06-objectif-proof',
    title: 'Objectif, preuve du choix',
    viewport: DESKTOP,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'objectif.html');
      await page.locator('.op-decision').waitFor({ timeout: 8000 });
      await capture('00-levier-rentable');
      await page.locator('.op-heatmap').scrollIntoViewIfNeeded();
      await pause(700);
      await capture('01-heatmap');
    },
  },
  {
    slug: '07-course-method-choice',
    title: 'Cours : choisir la methode',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'prototypes/cours/maths-specialite/second-degre/index.html#choix-methode');
      await waitForCourse(page);
      await page.locator('#choix-methode').scrollIntoViewIfNeeded();
      await pause(700);
      await capture('00-choisir-methode');
      await revealFirstAnswer(page, '#choix-methode');
      await capture('01-reponse-ouverte');
    },
  },
  {
    slug: '08-course-copy-writing',
    title: 'Brouillon insuffisant vs copie complete',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'prototypes/cours/maths-specialite/second-degre/index.html#redaction');
      await waitForCourse(page);
      await page.locator('#redaction').scrollIntoViewIfNeeded();
      await pause(700);
      await capture('00-brouillon-copie');
    },
  },
  {
    slug: '09-course-20-20-gate',
    title: 'Porte 20/20',
    viewport: MOBILE,
    run: async ({ page, baseUrl, capture }) => {
      await goto(page, baseUrl, 'prototypes/cours/maths-specialite/second-degre/index.html#vingt-sur-vingt');
      await waitForCourse(page);
      await page.locator('#vingt-sur-vingt').scrollIntoViewIfNeeded();
      await pause(700);
      await capture('00-porte-20-20');
    },
  },
];

async function recordShot(browser, server, shot) {
  const clipDir = join(OUT_ROOT, shot.slug);
  mkdirSync(clipDir, { recursive: true });

  const beforeVideos = new Set(readdirSync(clipDir).filter((name) => name.endsWith('.webm')));
  const context = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: 1,
    isMobile: shot.viewport.width < 700,
    hasTouch: shot.viewport.width < 700,
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    colorScheme: 'light',
    reducedMotion: 'no-preference',
    recordVideo: {
      dir: clipDir,
      size: shot.viewport,
    },
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const screenshots = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => {
    consoleErrors.push(error.message);
  });

  async function capture(name) {
    const filePath = join(clipDir, `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: false, type: 'png' });
    screenshots.push(relative(ROOT, filePath));
  }

  let status = 'pass';
  let errorMessage = null;

  try {
    await shot.run({ page, baseUrl: server.baseUrl, capture });
  } catch (error) {
    status = 'fail';
    errorMessage = error && error.stack ? error.stack : String(error);
  }

  const video = page.video();
  await context.close();

  let videoPath = null;
  if (video) {
    const source = await video.path();
    const target = join(clipDir, `${shot.slug}.webm`);
    if (source !== target) renameSync(source, target);
    videoPath = relative(ROOT, target);
  } else {
    const afterVideos = readdirSync(clipDir).filter((name) => name.endsWith('.webm') && !beforeVideos.has(name));
    if (afterVideos[0]) videoPath = relative(ROOT, join(clipDir, afterVideos[0]));
  }

  return {
    slug: shot.slug,
    title: shot.title,
    status,
    viewport: shot.viewport,
    video: videoPath,
    screenshots,
    consoleErrors,
    error: errorMessage,
  };
}

const args = parseArgs();
const selectedShots = args.slugs.length
  ? SHOTS.filter((shot) => args.slugs.some((slug) => shot.slug === slug || shot.slug.startsWith(slug)))
  : SHOTS;

if (!selectedShots.length) {
  console.error('No matching aha-moment clips.');
  console.error('Available clips:');
  SHOTS.forEach((shot) => console.error(`  ${shot.slug}`));
  process.exit(1);
}

mkdirSync(OUT_ROOT, { recursive: true });

const server = await startServer();
const browser = await chromium.launch({ headless: !args.headed });
const results = [];

try {
  for (const shot of selectedShots) {
    console.log(`Capturing ${shot.slug}...`);
    const result = await recordShot(browser, server, shot);
    results.push(result);
    console.log(`  ${result.status.toUpperCase()} ${result.video || ''}`);
  }
} finally {
  await browser.close();
  await server.close();
}

const manifest = {
  createdAt: new Date().toISOString(),
  outputRoot: relative(ROOT, OUT_ROOT),
  clips: results,
};
writeFileSync(join(OUT_ROOT, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

const failed = results.filter((result) => result.status !== 'pass');
if (failed.length) {
  console.error(`Failed clips: ${failed.map((result) => result.slug).join(', ')}`);
  process.exit(1);
}

console.log(`Aha video captures saved in ${relative(ROOT, OUT_ROOT)}.`);
