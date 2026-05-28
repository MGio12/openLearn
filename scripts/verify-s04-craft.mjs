import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FILES = {
  'index.html': join(ROOT, 'index.html'),
  'objectif.html': join(ROOT, 'objectif.html'),
  'checkout.html': join(ROOT, 'checkout.html'),
  'merci.html': join(ROOT, 'merci.html'),
  'styles.css': join(ROOT, 'styles.css'),
  'checkout.css': join(ROOT, 'assets', 'css', 'pages', 'checkout.css'),
};

const PAGES = [
  {
    file: 'index.html',
    label: 'cockpit',
    requiredVisibleSelectors: ['.ap-mission', '.ap-signal', '.ap-steps'],
    ctaSelectors: ['.ap-mission__cta'],
  },
  {
    file: 'objectif.html',
    label: 'objectif',
    requiredVisibleSelectors: ['.op-decision', '.op-heatmap', '.op-strategy'],
    ctaSelectors: ['.op-cta', '.op-prio', '.op-strategy__cta'],
  },
  {
    file: 'checkout.html',
    label: 'checkout',
    requiredVisibleSelectors: ['.offers', '.offer-toggle', '.trust-band'],
    ctaSelectors: ['[data-checkout-button]', '.cta', '.cancel-proof-link'],
    mobileMustShowSelectors: ['.offers', '[data-checkout-button]'],
  },
  {
    file: 'merci.html',
    label: 'merci',
    requiredVisibleSelectors: ['.success-wrap', '.study-note'],
    ctaSelectors: ['.success-actions a', 'a.op-btn'],
  },
];

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

function normalizeText(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function pagePath(pageSpec) {
  return FILES[pageSpec.file];
}

function pageUrl(pageSpec) {
  return pathToFileURL(pagePath(pageSpec)).href;
}

function isLocalHref(href) {
  return href
    && !href.startsWith('mailto:')
    && !href.startsWith('tel:')
    && !href.startsWith('javascript:')
    && !/^[a-z][a-z0-9+.-]*:\/\//i.test(href);
}

function splitHref(href) {
  const [withoutHash, fragment = ''] = href.split('#');
  const filePart = withoutHash.split('?')[0];
  return { filePart, fragment };
}

function localTargetPath(currentFile, href) {
  const { filePart } = splitHref(href);
  return join(ROOT, filePart || currentFile);
}

function relativeTargetLabel(currentFile, href) {
  const { filePart, fragment } = splitHref(href);
  return `${filePart || currentFile}${fragment ? `#${fragment}` : ''}`;
}

function assertRequiredFilesExist() {
  for (const [label, filePath] of Object.entries(FILES)) {
    assert(existsSync(filePath), `${label}: required S04 verifier input does not exist at ${filePath}`);
  }
}

function assertReducedMotionSource() {
  const styleSource = readProjectFile(FILES['styles.css']);
  const checkoutStyleSource = readProjectFile(FILES['checkout.css']);

  assert(
    /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/i.test(styleSource),
    'styles.css: S04 craft contract requires @media (prefers-reduced-motion: reduce) to disable decorative motion safely',
  );
  assert(
    /prefers-reduced-motion\s*:\s*reduce/i.test(checkoutStyleSource),
    'assets/css/pages/checkout.css: S04 craft contract requires prefers-reduced-motion handling for checkout dossier/marquee motion',
  );
}

function assertFocusAndPressedSource() {
  const styleSource = readProjectFile(FILES['styles.css']);
  const checkoutStyleSource = readProjectFile(FILES['checkout.css']);
  const combined = `${styleSource}\n${checkoutStyleSource}`;

  const rules = [
    {
      label: 'focus-visible style proxy',
      pattern: /:focus-visible\s*[,\{][\s\S]{0,260}(outline|box-shadow|border-color)\s*:/i,
    },
    {
      label: 'pressed/active CTA style proxy',
      pattern: /(?:\.btn|\.start-btn|\.cta|\.op-btn)[^{]*:active\s*\{[\s\S]{0,260}(transform|box-shadow)\s*:/i,
    },
    {
      label: 'hover/touch-safe transition proxy',
      pattern: /transition\s*:\s*[^;]*(transform|box-shadow|background)/i,
    },
  ];

  for (const rule of rules) {
    assert(rule.pattern.test(combined), `S04 CTA craft contract missing ${rule.label} in styles.css or assets/css/pages/checkout.css`);
  }
}

function assertStaticSourceContract() {
  assertRequiredFilesExist();
  assertReducedMotionSource();
  assertFocusAndPressedSource();
}

async function collectPageFailures(page, pageLabel, viewportLabel) {
  const failures = [];
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`${viewportLabel} ${pageLabel}: console error: ${message.text()}`);
  });
  page.on('pageerror', (error) => {
    failures.push(`${viewportLabel} ${pageLabel}: page error: ${error.message}`);
  });
  return failures;
}

async function expectVisible(page, selector, message) {
  const locator = page.locator(selector).first();
  assert(await locator.count(), message);
  assert(await locator.isVisible(), message);
  return locator;
}

async function assertNoHorizontalOverflow(page, pageSpec, viewportLabel) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : 0,
    innerWidth: window.innerWidth,
  }));
  const maxScrollWidth = Math.max(overflow.scrollWidth, overflow.bodyScrollWidth);
  assert(
    maxScrollWidth <= overflow.innerWidth + 1,
    `${viewportLabel} ${pageSpec.file}: page must not have horizontal overflow: scrollWidth ${maxScrollWidth} > innerWidth ${overflow.innerWidth}`,
  );
}

async function assertCraftMarkers(page, pageSpec, viewportLabel) {
  for (const selector of pageSpec.requiredVisibleSelectors) {
    await expectVisible(
      page,
      selector,
      `${viewportLabel} ${pageSpec.file}: missing visible S04 craft marker ${selector}`,
    );
  }
}

async function assertMobileTouchSafety(page, pageSpec, viewportLabel) {
  if (viewportLabel !== 'mobile') return;

  for (const selector of pageSpec.mobileMustShowSelectors || []) {
    const locator = await expectVisible(
      page,
      selector,
      `${viewportLabel} ${pageSpec.file}: checkout dossier/CTA content must remain visible and touch-safe (${selector})`,
    );
    const box = await locator.boundingBox();
    const viewport = page.viewportSize();
    assert(box, `${viewportLabel} ${pageSpec.file}: ${selector} must have a measurable box`);
    assert(viewport, `${viewportLabel} ${pageSpec.file}: viewport unavailable while checking ${selector}`);
    assert(
      box.width >= 44 && box.height >= 44,
      `${viewportLabel} ${pageSpec.file}: ${selector} must be touch-safe (at least 44px in both dimensions), got ${Math.round(box.width)}x${Math.round(box.height)}`,
    );
    assert(
      box.x < viewport.width && box.x + box.width > 0 && box.y + box.height > 0,
      `${viewportLabel} ${pageSpec.file}: ${selector} must be inside the mobile viewport horizontally/vertically`,
    );
  }
}

async function assertCtaVisibilityAndStyle(page, pageSpec, viewportLabel) {
  const selector = pageSpec.ctaSelectors.join(', ');
  const ctas = page.locator(selector);
  const count = await ctas.count();
  assert(count > 0, `${viewportLabel} ${pageSpec.file}: expected at least one CTA matching ${selector}`);

  let visibleCount = 0;
  for (let index = 0; index < count; index += 1) {
    const cta = ctas.nth(index);
    if (!(await cta.isVisible())) continue;
    visibleCount += 1;

    const details = await cta.evaluate((element) => {
      const style = window.getComputedStyle(element);
      const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
      const rect = element.getBoundingClientRect();
      return {
        text,
        tag: element.tagName.toLowerCase(),
        href: element.getAttribute('href') || '',
        width: rect.width,
        height: rect.height,
        cursor: style.cursor,
        transition: style.transitionProperty,
        boxShadow: style.boxShadow,
        borderTopWidth: style.borderTopWidth,
        outlineStyle: style.outlineStyle,
      };
    });

    assert(
      details.width >= 44 && details.height >= 36,
      `${viewportLabel} ${pageSpec.file}: visible CTA “${details.text || selector}” must be touch/click-safe, got ${Math.round(details.width)}x${Math.round(details.height)}`,
    );

    const hasCraftProxy = details.cursor === 'pointer'
      || details.transition.includes('transform')
      || details.transition.includes('box-shadow')
      || details.boxShadow !== 'none'
      || parseFloat(details.borderTopWidth) >= 2;
    assert(
      hasCraftProxy,
      `${viewportLabel} ${pageSpec.file}: visible CTA “${details.text || selector}” needs an implementation-visible craft proxy (cursor, transition, shadow, or strong border)`,
    );

    if (details.tag === 'a') {
      assert(details.href && details.href !== '#', `${viewportLabel} ${pageSpec.file}: visible CTA “${details.text || '(sans texte)'}” must not use inert href="#"`);
    }
  }

  assert(visibleCount > 0, `${viewportLabel} ${pageSpec.file}: at least one CTA must be visible for selectors ${selector}`);
}

async function assertLocalHrefTargets(page, pageSpec, viewportLabel) {
  const localHrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors
    .map((anchor) => ({
      href: anchor.getAttribute('href') || '',
      text: (anchor.textContent || '').replace(/\s+/g, ' ').trim(),
      visible: (() => {
        const style = window.getComputedStyle(anchor);
        const rect = anchor.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      })(),
    }))
    .filter((anchor) => anchor.visible));

  for (const anchor of localHrefs) {
    if (!isLocalHref(anchor.href)) continue;

    const targetPath = localTargetPath(pageSpec.file, anchor.href);
    assert(
      existsSync(targetPath),
      `${viewportLabel} ${pageSpec.file}: visible local href “${anchor.text || anchor.href}” points to missing target ${relativeTargetLabel(pageSpec.file, anchor.href)}`,
    );

    const { fragment } = splitHref(anchor.href);
    if (fragment) {
      const hasFragment = await page.evaluate(({ href, currentFile }) => {
        const [withoutHash, rawFragment = ''] = href.split('#');
        const filePart = withoutHash.split('?')[0] || currentFile;
        if (!rawFragment) return true;
        if (filePart !== currentFile) {
          return null;
        }
        const id = decodeURIComponent(rawFragment);
        return Boolean(document.getElementById(id) || document.querySelector(`[name="${CSS.escape(id)}"]`));
      }, { href: anchor.href, currentFile: pageSpec.file });

      if (hasFragment === true) continue;

      if (hasFragment === null) {
        const targetSource = readProjectFile(targetPath);
        const fragmentPattern = new RegExp(`(?:id|name)=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i');
        assert(
          fragmentPattern.test(targetSource),
          `${viewportLabel} ${pageSpec.file}: visible local href “${anchor.text || anchor.href}” points to missing fragment ${relativeTargetLabel(pageSpec.file, anchor.href)}`,
        );
      } else {
        assert(false, `${viewportLabel} ${pageSpec.file}: visible local href “${anchor.text || anchor.href}” points to missing fragment ${relativeTargetLabel(pageSpec.file, anchor.href)}`);
      }
    }
  }
}

async function assertPageViewport(browser, pageSpec, viewport) {
  const page = await browser.newPage();
  const failures = await collectPageFailures(page, pageSpec.file, viewport.label);

  try {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(pageUrl(pageSpec), { waitUntil: 'networkidle' });
    await assertCraftMarkers(page, pageSpec, viewport.label);
    await assertCtaVisibilityAndStyle(page, pageSpec, viewport.label);
    await assertMobileTouchSafety(page, pageSpec, viewport.label);
    await assertLocalHrefTargets(page, pageSpec, viewport.label);
    await assertNoHorizontalOverflow(page, pageSpec, viewport.label);
    assert(failures.length === 0, failures.join(' | '));
  } finally {
    await page.close();
  }
}

assertStaticSourceContract();

let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  fail(`Playwright Chromium failed to launch. Run npm install / npx playwright install if needed. Original error: ${error.message}`);
}

try {
  for (const pageSpec of PAGES) {
    for (const viewport of VIEWPORTS) {
      await assertPageViewport(browser, pageSpec, viewport);
    }
  }
  console.log('PASS S04 craft verification: reduced-motion source guards, visible notebook/folder craft markers, CTA craft proxies, checkout mobile touch safety, local href integrity, responsive overflow, and console health are valid.');
} finally {
  await browser.close();
}
