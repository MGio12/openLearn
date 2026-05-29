import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ONBOARDING_PATH = join(ROOT, 'onboarding.html');
const ONBOARDING_CSS_PATH = join(ROOT, 'onboarding', 'onboarding.css');
const ONBOARDING_APP_PATH = join(ROOT, 'onboarding', 'app.jsx');
const ONBOARDING_BUNDLE_PATH = join(ROOT, 'onboarding', 'onboarding.bundle.js');
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

function readProjectFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

function assertRequiredFilesExist() {
  for (const filePath of [ONBOARDING_PATH, ONBOARDING_CSS_PATH, ONBOARDING_APP_PATH, ONBOARDING_BUNDLE_PATH]) {
    assert(existsSync(filePath), `Required onboarding file does not exist: ${filePath}`);
  }
}

function assertStaticWiring() {
  const html = readProjectFile(ONBOARDING_PATH);
  const appSource = readProjectFile(ONBOARDING_APP_PATH);
  const bundle = readProjectFile(ONBOARDING_BUNDLE_PATH);

  assert(/<link\s+rel="stylesheet"\s+href="colors_and_type\.css"\s*\/?>/.test(html), 'onboarding.html: must load colors_and_type.css');
  assert(/<link\s+rel="stylesheet"\s+href="onboarding\/onboarding\.css"\s*\/?>/.test(html), 'onboarding.html: must load onboarding/onboarding.css');
  assert(/react@18\.3\.1\/umd\/react\.production\.min\.js/.test(html), 'onboarding.html: must load React production runtime');
  assert(/react-dom@18\.3\.1\/umd\/react-dom\.production\.min\.js/.test(html), 'onboarding.html: must load ReactDOM production runtime');
  assert(/<script\s+src="onboarding\/onboarding\.bundle\.js"><\/script>/.test(html), 'onboarding.html: must load the compiled onboarding bundle');
  assert(/<link\s+rel="preload"\s+href="assets\/js\/lib\/qrcode-generator-2\.0\.4\/qrcode\.js"\s+as="script"\s*\/?>/.test(html), 'onboarding.html: must preload the local QR code script');

  assert(!/text\/babel|babel\.min\.js|react\.development|react-dom\.development/i.test(html), 'onboarding.html: must not load Babel or React development runtime');
  assert(!/<script[^>]+src="onboarding\/(?:state|profile|screens-early|screens-mid|screens-late|app)\.jsx"/.test(html), 'onboarding.html: must not load JSX sources directly');
  assert(!/showCommitmentRecap/i.test(html), 'onboarding.html: production tweaks must not expose showCommitmentRecap');
  assert(!/showCommitmentRecap|goNext\(\);\s*return\s+null/.test(appSource), 'onboarding/app.jsx: recap screen must not be skippable by tweak');
  assert(!/FileReader|readAsDataURL|scheduleImg|data:image/i.test(bundle), 'onboarding bundle: upload preview must not persist base64 image data');
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

async function clickButton(page, name) {
  await page.getByRole('button', { name }).first().click();
}

async function continueFlow(page) {
  await clickButton(page, /Continuer/);
}

async function assertViewportHealth(browser, viewport) {
  const page = await browser.newPage();
  const label = `${viewport.label} onboarding health`;
  const failures = await collectPageFailures(page, label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoOnboarding(page);
    assert(await page.locator('.ob-shell').isVisible(), `${label}: React onboarding shell must render`);
    assert(await page.getByRole('button', { name: /Trouver ma mission/ }).first().isVisible(), `${label}: intro CTA must be visible`);
    await assertNoHorizontalOverflow(page, label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

async function assertUploadStoresMetadataOnly(browser) {
  const page = await browser.newPage();
  const label = 'desktop onboarding upload';
  const failures = await collectPageFailures(page, label);

  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoOnboarding(page);
    await page.evaluate(() => localStorage.removeItem('objectif-lycee-onboarding-v3'));
    await page.reload({ waitUntil: 'networkidle' });

    await clickButton(page, /Trouver ma mission/);
    await clickButton(page, /^Première/);
    await clickButton(page, /Remonter une matière/);
    await continueFlow(page);
    await continueFlow(page);
    await clickButton(page, /Contrôle cette semaine/);
    await continueFlow(page);
    await clickButton(page, /Mathématiques/);
    await continueFlow(page);
    await clickButton(page, /Je comprends le cours, je rate les exercices/);
    await clickButton(page, /^Correct/);

    const fileInput = page.locator('input[type="file"][accept="image/*"]').first();
    await fileInput.waitFor({ state: 'attached', timeout: 3000 });
    assert(await fileInput.count(), `${label}: optional image upload input must exist`);
    await fileInput.setInputFiles({
      name: 'emploi-du-temps.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/l8s6WQAAAABJRU5ErkJggg==',
        'base64',
      ),
    });

    await page.waitForFunction(() => {
      const image = document.querySelector('.ob-upload img');
      return image && image.getAttribute('src')?.startsWith('blob:');
    });

    await continueFlow(page);
    await page.waitForFunction(() => {
      const raw = localStorage.getItem('objectif-lycee-onboarding-v3');
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return parsed.profile?.effortHebdo?.scheduleUpload?.previewOnly === true;
    });

    const stored = await page.evaluate(() => localStorage.getItem('objectif-lycee-onboarding-v3'));
    assert(!/data:image|base64/i.test(stored), `${label}: localStorage must not contain base64 image data`);

    const parsed = JSON.parse(stored);
    const upload = parsed.profile.effortHebdo.scheduleUpload;
    assert(upload.fileName === 'emploi-du-temps.png', `${label}: persisted upload metadata must keep fileName`);
    assert(upload.type === 'image/png', `${label}: persisted upload metadata must keep MIME type`);
    assert(typeof upload.size === 'number' && upload.size > 0, `${label}: persisted upload metadata must keep file size`);
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
  }
  await assertUploadStoresMetadataOnly(browser);
  console.log('PASS onboarding verification: compiled React runtime, no Babel, responsive smoke checks, and metadata-only upload persistence are valid.');
} finally {
  await browser.close();
}
