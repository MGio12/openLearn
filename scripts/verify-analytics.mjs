import { existsSync, readFileSync } from 'fs';
import vm from 'vm';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ANALYTICS_PATH = join(ROOT, 'scripts', 'analytics.js');
const CORE_PAGES = ['index.html', 'onboarding.html', 'mission.html', 'focus.html', 'checkout.html', 'parent.html'];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readProjectFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

function makeDocument() {
  const appended = [];

  return {
    appended,
    head: {
      querySelector(selector) {
        return appended.find((node) => selector.includes(node.src)) || null;
      },
      appendChild(node) {
        appended.push(node);
      },
    },
    createElement(tagName) {
      return {
        tagName,
        dataset: {},
        defer: false,
        src: '',
        addEventListener() {},
      };
    },
    addEventListener() {},
    querySelectorAll() {
      return [];
    },
  };
}

function runAnalytics(locationOverrides = {}) {
  assert(existsSync(ANALYTICS_PATH), 'scripts/analytics.js must exist');
  const document = makeDocument();
  const sandbox = {
    console,
    document,
    window: {
      location: {
        protocol: 'https:',
        hostname: 'objectiflycee.fr',
        pathname: '/checkout.html',
        ...locationOverrides,
      },
      addEventListener() {},
      sessionStorage: {
        getItem() { return null; },
        setItem() {},
      },
    },
    URL,
  };
  sandbox.window.window = sandbox.window;
  sandbox.window.document = document;

  vm.runInNewContext(readProjectFile(ANALYTICS_PATH), sandbox, {
    filename: ANALYTICS_PATH,
  });

  return sandbox.window;
}

function assertScriptWiring() {
  for (const page of CORE_PAGES) {
    const source = readProjectFile(join(ROOT, page));
    assert(
      /<script\s+src="scripts\/analytics\.js"(?:\s+defer)?><\/script>/.test(source),
      `${page}: must load scripts/analytics.js`,
    );
  }

  const onboarding = readProjectFile(join(ROOT, 'onboarding.html'));
  assert(
    onboarding.indexOf('scripts/analytics.js') < onboarding.indexOf('onboarding/onboarding.bundle.js'),
    'onboarding.html: scripts/analytics.js must load before the onboarding bundle',
  );
}

function assertProductionScriptsAreInjected() {
  const win = runAnalytics();
  const sources = win.document.appended.map((node) => node.src);
  assert(sources.includes('/_vercel/insights/script.js'), 'production: Web Analytics script must be injected');
  assert(sources.includes('/_vercel/speed-insights/script.js'), 'production: Speed Insights script must be injected');
}

function assertLocalAndFileAreIgnored() {
  const local = runAnalytics({ protocol: 'http:', hostname: 'localhost' });
  assert(local.document.appended.length === 0, 'localhost: must not inject Vercel scripts');
  assert(local.OLAnalytics.track('checkout_clicked', { page: 'checkout' }) === false, 'localhost: track() must return false');
  assert(!local.vaq, 'localhost: must not enqueue Vercel events');

  const file = runAnalytics({ protocol: 'file:', hostname: '', pathname: '/checkout.html' });
  assert(file.document.appended.length === 0, 'file://: must not inject Vercel scripts');
  assert(file.OLAnalytics.track('checkout_clicked', { page: 'checkout' }) === false, 'file://: track() must return false');
  assert(!file.vaq, 'file://: must not enqueue Vercel events');
}

function assertEventAndPropertySanitizing() {
  const win = runAnalytics();
  const tracked = win.OLAnalytics.track('checkout_clicked', {
    page: 'checkout',
    plan: 'ia-plus',
    billing: 'weekly',
    email: 'eleve@example.com',
    checkout_url: 'https://buy.stripe.com/test_123',
    token: 'secret',
    step: { nested: true },
    source: 'hero?email=eleve@example.com',
    completed: true,
  });

  assert(tracked === true, 'production: valid event must be tracked');
  const eventEntry = win.vaq.find((entry) => entry[0] === 'event');
  assert(eventEntry, 'production: track() must enqueue a Vercel event');
  assert(eventEntry[1].name === 'checkout_clicked', 'production: event name must be forwarded');

  const data = eventEntry[1].data;
  assert(data.page === 'checkout', 'production: whitelisted page must be kept');
  assert(data.plan === 'ia-plus', 'production: whitelisted plan must be kept');
  assert(data.billing === 'weekly', 'production: whitelisted billing must be kept');
  assert(data.completed === true, 'production: whitelisted boolean must be kept');
  assert(!('email' in data), 'production: email property must be dropped');
  assert(!('checkout_url' in data), 'production: Stripe URL property must be dropped');
  assert(!('token' in data), 'production: token property must be dropped');
  assert(!('step' in data), 'production: nested property must be dropped');
  assert(!('source' in data), 'production: suspicious query-like string must be dropped');

  const beforeSendEntry = win.vaq.find((entry) => entry[0] === 'beforeSend');
  assert(beforeSendEntry, 'production: beforeSend hook must be registered');
  const cleanEvent = beforeSendEntry[1]({
    type: 'pageview',
    url: 'https://objectiflycee.fr/checkout.html?email=eleve@example.com&token=abc#private',
  });
  assert(cleanEvent.url === 'https://objectiflycee.fr/checkout.html', 'beforeSend: URL query and hash must be stripped');

  const bad = win.OLAnalytics.track('free_text_feedback', { page: 'checkout' });
  assert(bad === false, 'production: unknown event names must be refused');

  const oldCheckout = win.OLAnalytics.track('checkout_selected', {
    page: 'checkout',
    offer: 'ia-plus',
  });
  assert(oldCheckout === false, 'production: old checkout_selected event must stay refused');

  const billing = win.OLAnalytics.track('billing_selected', {
    page: 'checkout',
    plan: 'ia-plus',
    billing: 'trimester',
    offer: 'must-not-pass',
  });
  assert(billing === true, 'production: billing_selected must be accepted');
  const billingEntry = win.vaq.find((entry) => entry[1]?.name === 'billing_selected');
  assert(billingEntry, 'production: billing_selected must enqueue a Vercel event');
  assert(billingEntry[1].data.plan === 'ia-plus', 'production: billing_selected must keep plan');
  assert(!('offer' in billingEntry[1].data), 'production: billing_selected must drop non-whitelisted offer');

  const onboardingScreen = win.OLAnalytics.track('onboarding_screen_viewed', {
    page: 'onboarding',
    screen_id: 'recap',
    screen_idx: 13,
    share_channel: 'copy',
    payload_valid: true,
    nom: 'Lina',
    email: 'eleve@example.com',
  });
  assert(onboardingScreen === true, 'production: onboarding_screen_viewed must be accepted');
  const onboardingEntry = win.vaq.find((entry) => entry[1]?.name === 'onboarding_screen_viewed');
  assert(onboardingEntry, 'production: onboarding_screen_viewed must enqueue a Vercel event');
  assert(onboardingEntry[1].data.screen_id === 'recap', 'production: screen_id must be kept');
  assert(onboardingEntry[1].data.screen_idx === 13, 'production: screen_idx must be kept');
  assert(onboardingEntry[1].data.share_channel === 'copy', 'production: share_channel must be kept');
  assert(onboardingEntry[1].data.payload_valid === true, 'production: payload_valid must be kept');
  assert(!('nom' in onboardingEntry[1].data), 'production: nom must be dropped');
  assert(!('email' in onboardingEntry[1].data), 'production: email must be dropped');

  for (const eventName of [
    'onboarding_screen_completed',
    'parent_share_clicked',
    'parent_recap_viewed',
    'parent_recap_checkout_clicked',
  ]) {
    assert(
      win.OLAnalytics.track(eventName, { page: 'onboarding', screen_id: 'recap', screen_idx: 13, share_channel: 'copy', payload_valid: true }) === true,
      `production: ${eventName} must be accepted`,
    );
  }
}

assertScriptWiring();
assertProductionScriptsAreInjected();
assertLocalAndFileAreIgnored();
assertEventAndPropertySanitizing();

console.log('verify:analytics passed');
