import { existsSync, readFileSync } from 'fs';
import vm from 'vm';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FILES = {
  onboardingHtml: join(ROOT, 'onboarding.html'),
  parentHtml: join(ROOT, 'parent.html'),
  parentCss: join(ROOT, 'assets', 'css', 'pages', 'parent.css'),
  parentJs: join(ROOT, 'assets', 'js', 'pages', 'parent.js'),
  parentShare: join(ROOT, 'assets', 'js', 'shared', 'parent-share.js'),
  qrVendor: join(ROOT, 'assets', 'js', 'lib', 'qrcode-generator-2.0.4', 'qrcode.js'),
};

const ONBOARDING_URL = pathToFileURL(FILES.onboardingHtml).href;
const PARENT_URL = pathToFileURL(FILES.parentHtml).href;
const OVERFLOW_TOLERANCE_PX = 1;

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

function readProjectFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

function assertRequiredFilesExist() {
  Object.entries(FILES).forEach(([label, filePath]) => {
    assert(existsSync(filePath), `${label}: expected file to exist at ${filePath}`);
  });
}

function assertStaticWiring() {
  const onboarding = readProjectFile(FILES.onboardingHtml);
  const parent = readProjectFile(FILES.parentHtml);

  assert(onboarding.includes('assets/js/shared/parent-share.js'), 'onboarding.html: must load shared parent-share helper');
  assert(
    onboarding.indexOf('scripts/analytics.js') < onboarding.indexOf('onboarding/onboarding.bundle.js'),
    'onboarding.html: analytics must load before the React bundle',
  );
  assert(
    onboarding.indexOf('assets/js/shared/parent-share.js') < onboarding.indexOf('onboarding/onboarding.bundle.js'),
    'onboarding.html: parent-share helper must load before the React bundle',
  );

  assert(parent.includes('assets/css/pages/parent.css'), 'parent.html: must load parent.css');
  assert(parent.includes('assets/js/shared/parent-share.js'), 'parent.html: must load shared parent-share helper');
  assert(parent.includes('assets/js/pages/parent.js'), 'parent.html: must load parent.js');
  assert(parent.includes('scripts/analytics.js'), 'parent.html: must load analytics');
}

function runParentShare() {
  const sandbox = {
    console,
    Date,
    TextEncoder,
    TextDecoder,
    URL,
    btoa(value) {
      return Buffer.from(value, 'binary').toString('base64');
    },
    atob(value) {
      return Buffer.from(value, 'base64').toString('binary');
    },
    window: {},
  };
  sandbox.window.window = sandbox.window;
  sandbox.window.TextEncoder = TextEncoder;
  sandbox.window.TextDecoder = TextDecoder;
  sandbox.window.URL = URL;
  sandbox.window.Date = Date;
  sandbox.window.btoa = sandbox.btoa;
  sandbox.window.atob = sandbox.atob;

  vm.runInNewContext(readProjectFile(FILES.parentShare), sandbox, {
    filename: FILES.parentShare,
  });

  assert(sandbox.window.OLParentShare, 'parent-share.js: must expose window.OLParentShare');
  return sandbox.window.OLParentShare;
}

function assertNoSensitivePayloadData(payload, label) {
  const json = JSON.stringify(payload);
  const forbidden = [
    'Lina',
    'eleve@example.com',
    '8.5',
    '14',
    'scheduleUpload',
    'emploi-du-temps.png',
    'https://buy.stripe.com',
    'photo',
    'token',
  ];

  forbidden.forEach((needle) => {
    assert(!json.includes(needle), `${label}: payload must not include sensitive value "${needle}"`);
  });
}

function assertWhitelistedPayloadKeys(payload, label) {
  const rootKeys = new Set([
    'version',
    'date',
    'classe',
    'objectif',
    'matiere',
    'blocage',
    'niveau',
    'mission',
    'offre',
    'heuresParSemaine',
    'premiereEcheance',
  ]);
  const missionKeys = new Set(['action', 'duree', 'why', 'trace']);
  const offerKeys = new Set(['trialDays', 'pricePerMonth']);

  const unknownRoot = Object.keys(payload || {}).filter((key) => !rootKeys.has(key));
  const unknownMission = Object.keys(payload?.mission || {}).filter((key) => !missionKeys.has(key));
  const unknownOffer = Object.keys(payload?.offre || {}).filter((key) => !offerKeys.has(key));

  assert(unknownRoot.length === 0, `${label}: payload contains non-whitelisted root keys: ${unknownRoot.join(', ')}`);
  assert(unknownMission.length === 0, `${label}: mission contains non-whitelisted keys: ${unknownMission.join(', ')}`);
  assert(unknownOffer.length === 0, `${label}: offre contains non-whitelisted keys: ${unknownOffer.join(', ')}`);
}

function assertParentPageUsesTextOnly() {
  const parentJs = readProjectFile(FILES.parentJs);
  assert(!/\binnerHTML\b/.test(parentJs), 'parent.js: parent payload must be displayed with textContent, not innerHTML');
}

function assertParentShareHelper() {
  const helper = runParentShare();
  const profile = {
    nom: 'Lina',
    email: 'eleve@example.com',
    classe: 'Première',
    objectif: ['remonter', 'dossier'],
    moyenne: { current: 8.5, target: 14 },
    matieres: ['Mathématiques', 'Physique-chimie'],
    blocage: 'method-gap',
    niveau: 'Correct',
    effortHebdo: {
      hours: 5,
      scheduleUpload: {
        fileName: 'emploi-du-temps.png',
        type: 'image/png',
        previewOnly: true,
      },
    },
    echeances: ['controle-7', 'parcoursup'],
    checkout_url: 'https://buy.stripe.com/test_private',
    token: 'secret',
  };
  const mission = {
    action: 'Refaire un exercice type contrôle en écrivant la méthode AVANT chaque calcul.',
    duree: 25,
    why: 'Elle attaque ton blocage : nommer la méthode avant le calcul change la qualité de la réponse.',
    trace: 'Une solution propre avec les étapes nommées : données, méthode, calcul, vérification.',
  };

  const payload = helper.createPayload(profile, mission, { trialDays: 3, pricePerMonth: 19.99 }, new Date('2026-05-27T12:00:00Z'));
  assertWhitelistedPayloadKeys(payload, 'parent-share.js createPayload');
  assert(payload.version === 1, 'parent-share.js: payload version must be 1');
  assert(payload.date === '2026-05-27', 'parent-share.js: payload date must be YYYY-MM-DD');
  assert(payload.classe === 'Première', 'parent-share.js: classe must be preserved');
  assert(payload.objectif === 'Remonter une matière', 'parent-share.js: main objectif must be human readable');
  assert(payload.matiere === 'Mathématiques', 'parent-share.js: first subject must be preserved');
  assert(payload.blocage === 'Je comprends le cours, je rate les exercices', 'parent-share.js: blocage must be human readable');
  assert(payload.niveau === 'Correct', 'parent-share.js: niveau must be preserved');
  assert(payload.heuresParSemaine === 5, 'parent-share.js: weekly hours must be preserved');
  assert(payload.premiereEcheance === 'Contrôle cette semaine', 'parent-share.js: first deadline must be human readable');
  assert(payload.mission.action.includes('Refaire un exercice'), 'parent-share.js: mission action must be preserved');
  assert(payload.offre.trialDays === 3, 'parent-share.js: trial days must be preserved');
  assert(payload.offre.pricePerMonth === 19.99, 'parent-share.js: monthly price must be preserved');
  assert(!/[<>]/.test(helper.createPayload({ classe: '<img>' }, { action: '<script>alert(1)</script>' }).mission.action), 'parent-share.js: cleanString must strip angle brackets');
  assertNoSensitivePayloadData(payload, 'parent-share.js');

  const token = helper.encodePayload(payload);
  assert(/^[A-Za-z0-9_-]+$/.test(token), 'parent-share.js: encoded payload must be base64url');
  const decodedPayload = helper.decodePayload(token);
  assertWhitelistedPayloadKeys(decodedPayload, 'parent-share.js decoded payload');
  assert(JSON.stringify(decodedPayload) === JSON.stringify(payload), 'parent-share.js: decode must round-trip payload');
  assert(helper.decodePayload('not-a-valid-token') === null, 'parent-share.js: invalid token must return null');

  const injected = Object.assign({}, payload, {
    nom: 'Lina',
    email: 'eleve@example.com',
    token: 'secret',
    checkout_url: 'https://buy.stripe.com/test_private',
    moyenne: { current: 8.5, target: 14 },
    effortHebdo: {
      scheduleUpload: {
        fileName: 'emploi-du-temps.png',
        type: 'image/png',
      },
    },
  });
  const cleanedInjected = helper.decodePayload(helper.encodePayload(injected));
  assertWhitelistedPayloadKeys(cleanedInjected, 'parent-share.js encoded/decoded payload');
  assertNoSensitivePayloadData(cleanedInjected, 'parent-share.js encoded/decoded payload');

  const longMission = {
    action: 'Action longue. '.repeat(80),
    duree: 60,
    why: 'Justification longue. '.repeat(80),
    trace: 'Trace longue. '.repeat(80),
  };
  const longPayload = helper.createPayload(profile, longMission, { trialDays: 3, pricePerMonth: 19.99 }, new Date('2026-05-27T12:00:00Z'));
  const longParentUrl = helper.createParentUrl(longPayload, 'https://objectiflycee.fr/onboarding.html');
  assert(longParentUrl.length < 1800, `parent-share.js: long mission parent URL must stay under 1800 chars, got ${longParentUrl.length}`);

  const parentUrl = helper.createParentUrl(payload, 'https://objectiflycee.fr/onboarding.html');
  assert(parentUrl.startsWith('https://objectiflycee.fr/parent.html#p='), 'parent-share.js: parent URL must target parent.html#p=');
  assert(parentUrl.length < 1800, `parent-share.js: parent URL must stay under 1800 chars, got ${parentUrl.length}`);
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

async function completeOnboardingToRecap(page) {
  await page.goto(ONBOARDING_URL, { waitUntil: 'networkidle' });
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
  await continueFlow(page);
  await page.locator('#ob-nom').fill('Lina');
  await continueFlow(page);

  await page.getByText(/Ta première mission est prête/).waitFor({ timeout: 10000 });
  await clickButton(page, /Voir ce que je gagne/);
  await clickButton(page, /Voir mon plan complet/);
  await page.locator('[data-parent-share-card]').waitFor({ state: 'visible', timeout: 5000 });
}

async function assertParentShareFlow(browser, viewport, helper) {
  const page = await browser.newPage();
  const label = `${viewport.label} parent share`;
  const failures = await collectPageFailures(page, label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await completeOnboardingToRecap(page);
    await assertNoHorizontalOverflow(page, `${label} recap`);

    const parentUrl = await page.locator('[data-parent-share-url]').inputValue();
    assert(parentUrl.includes('parent.html#p='), `${label}: generated parent URL must target parent.html`);
    assert(parentUrl.length < 1800, `${label}: generated parent URL must stay under 1800 chars`);

    const token = parentUrl.split('#p=')[1];
    const payload = helper.decodePayload(token);
    assert(payload, `${label}: generated parent payload must decode`);
    assert(payload.classe === 'Première', `${label}: decoded payload must preserve classe`);
    assert(payload.mission?.action, `${label}: decoded payload must include mission action`);
    assertNoSensitivePayloadData(payload, `${label} decoded payload`);

    await clickButton(page, /Afficher le QR code/);
    await page.locator('[data-parent-share-qr] svg').waitFor({ state: 'visible', timeout: 3000 });

    await clickButton(page, /Activer mon plan/);
    await page.locator('[data-parent-share-card]').waitFor({ state: 'visible', timeout: 5000 });

    await page.goto(parentUrl, { waitUntil: 'networkidle' });
    await page.locator('[data-parent-recap]').first().waitFor({ state: 'visible', timeout: 5000 });
    await assertNoHorizontalOverflow(page, `${label} parent recap`);
    assert(await page.getByText(/Mission proposée/).first().isVisible(), `${label}: parent recap must show mission`);
    assert(await page.getByText(/Paiement Stripe/).first().isVisible(), `${label}: parent recap must explain Stripe frame`);

    const checkoutHref = await page.locator('[data-parent-checkout]').first().getAttribute('href');
    assert(checkoutHref === 'checkout.html?source=parent-share#offre', `${label}: parent checkout CTA must target checkout parent source`);

    await page.goto(`${PARENT_URL}#p=invalid`, { waitUntil: 'networkidle' });
    await page.locator('[data-parent-fallback]').waitFor({ state: 'visible', timeout: 5000 });
    assert(await page.getByText(/Le lien n'est plus lisible/).isVisible(), `${label}: invalid payload must show fallback`);
    await assertNoHorizontalOverflow(page, `${label} parent fallback`);

    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

assertRequiredFilesExist();
assertStaticWiring();
assertParentPageUsesTextOnly();
assertParentShareHelper();

const helper = runParentShare();
let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const viewport of VIEWPORTS) {
    await assertParentShareFlow(browser, viewport, helper);
  }
  console.log('PASS parent-share verification: payload, onboarding share card, QR code, parent recap, fallback, and overflow checks are valid.');
} finally {
  await browser.close();
}
