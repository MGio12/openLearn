import { createServer } from 'http';
import { createReadStream, existsSync, readdirSync, statSync } from 'fs';
import { extname, join, normalize, relative, resolve, sep } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(join(fileURLToPath(import.meta.url), '..', '..'));
const COURSE_ROOT = join(ROOT, 'prototypes/cours/maths-specialite');

const VIEWPORTS = [
  { name: 'desktop', width: 1365, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const BUDGETS = {
  lcp: 2500,
  cls: 0.1,
  interaction: 200,
  longTask: 200,
};

const COURSE_BUDGETS = {
  ...BUDGETS,
  // Course pages cold-load KaTeX and sometimes JSXGraph for exact maths.
  // Keep the strict 200 ms budgets for app/marketing pages; allow slightly
  // higher cold math-library and reveal/correction interaction tasks while
  // still checking LCP, CLS, overflow, formulas, and graph rendering.
  interaction: 320,
  longTask: 320,
};

const PAGE_BUDGETS = {
  'checkout.html': {
    ...BUDGETS,
    // The checkout page is the densest public pricing surface and cold-loads
    // the full offer/proof/FAQ layout. Keep interaction strict while allowing
    // a slightly higher first render task than app workflow pages.
    longTask: 260,
  },
};

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

function activeRootPages() {
  return readdirSync(ROOT)
    .filter((name) => name.endsWith('.html'))
    .sort();
}

function activeCoursePages() {
  return readdirSync(COURSE_ROOT)
    .filter((name) => {
      if (name.endsWith('.bak')) return false;
      const path = join(COURSE_ROOT, name);
      return statSync(path).isDirectory() && existsSync(join(path, 'index.html'));
    })
    .sort()
    .map((name) => `prototypes/cours/maths-specialite/${name}/index.html`);
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

async function installMetrics(page) {
  await page.addInitScript(() => {
    window.__cwvMetrics = {
      cls: 0,
      lcp: 0,
      longTasks: [],
    };

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__cwvMetrics.lcp = entry.startTime;
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {}

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__cwvMetrics.cls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (error) {}

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__cwvMetrics.longTasks.push(entry.duration);
        }
      }).observe({ type: 'longtask', buffered: true });
    } catch (error) {}
  });
}

async function representativeInteraction(page) {
  return page.evaluate(async () => {
    const selectors = [
      '[data-reveal]',
      '[data-why-toggle]',
      '[data-mood-value]',
      '[data-sidebar-toggle]:not(:disabled)',
      '[data-mission-action]',
      'button:not(:disabled)',
      '[role="checkbox"]',
      '[role="radio"]',
    ];

    function isVisible(element) {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.visibility !== 'hidden'
        && style.display !== 'none'
        && box.width > 0
        && box.height > 0
        && box.bottom > 0
        && box.right > 0
        && box.top < window.innerHeight
        && box.left < window.innerWidth;
    }

    let target = null;
    for (const selector of selectors) {
      target = Array.from(document.querySelectorAll(selector)).find(isVisible);
      if (target) break;
    }
    if (!target) return 0;

    const start = performance.now();
    target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse' }));
    target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'mouse' }));
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return performance.now() - start;
  });
}

async function collectPageHealth(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const formulaBlocks = Array.from(document.querySelectorAll('.katex-display, .formula-card'));
    const formulaOverflow = formulaBlocks.find((element) => element.scrollWidth > element.clientWidth + 1);
    const formulaScroll = formulaBlocks.find((element) => getComputedStyle(element).overflowX === 'auto');

    return {
      scrollWidth: doc.scrollWidth,
      innerWidth: window.innerWidth,
      formulaOverflow: formulaOverflow
        ? {
          className: formulaOverflow.className,
          scrollWidth: formulaOverflow.scrollWidth,
          clientWidth: formulaOverflow.clientWidth,
        }
        : null,
      formulaScrollClass: formulaScroll ? formulaScroll.className : null,
      metrics: window.__cwvMetrics || { cls: 0, lcp: 0, longTasks: [] },
    };
  });
}

async function assertLazyCourseGraphs(page, label, path) {
  if (!path.startsWith('prototypes/cours/')) return;

  const boards = page.locator('[data-chapter-curve], [data-course-curve], [data-derivative-board], [data-rate-board], [data-sign-board]');
  const count = await boards.count();
  if (!count) return;

  for (let index = 0; index < count; index++) {
    const board = boards.nth(index);
    await board.scrollIntoViewIfNeeded();
    const handle = await board.elementHandle();
    assert(handle, `${label}: graph board ${index + 1} must exist`);

    await page.waitForFunction((element) => {
      return element.dataset.courseGraphReady === 'true'
        || Boolean(element.querySelector('svg'))
        || /indisponible|ne peut pas se charger/i.test(element.textContent || '');
    }, handle, { timeout: 8000 });

    const status = await board.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return {
        id: element.id,
        hasSvg: Boolean(element.querySelector('svg')),
        hasFallback: /indisponible|ne peut pas se charger/i.test(element.textContent || ''),
        width: box.width,
        height: box.height,
      };
    });

    assert(status.hasSvg, `${label}: lazy graph ${status.id || index + 1} did not render SVG`);
    assert(!status.hasFallback, `${label}: lazy graph ${status.id || index + 1} fell back instead of rendering`);
    assert(status.width >= 220, `${label}: lazy graph ${status.id || index + 1} is too narrow: ${status.width}px`);
    assert(status.height >= 240, `${label}: lazy graph ${status.id || index + 1} is too short: ${status.height}px`);
  }
}

async function checkPage(browser, baseUrl, path, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  const budgets = path.startsWith('prototypes/cours/') ? COURSE_BUDGETS : (PAGE_BUDGETS[path] || BUDGETS);
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  try {
    await installMetrics(page);
    await page.goto(pageUrl(baseUrl, path), { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    const loadHealth = await collectPageHealth(page);
    const interaction = await representativeInteraction(page);
    await page.waitForTimeout(100);
    const health = await collectPageHealth(page);
    const lcp = loadHealth.metrics.lcp || Math.round(await page.evaluate(() => performance.now()));
    const cls = loadHealth.metrics.cls || 0;
    const maxLongTask = loadHealth.metrics.longTasks.length ? Math.max(...loadHealth.metrics.longTasks) : 0;
    const label = `${path} [${viewport.name}]`;

    assert(errors.length === 0, `${label}: console/page errors: ${errors.join(' | ')}`);
    assert(lcp <= budgets.lcp, `${label}: LCP ${Math.round(lcp)}ms > ${budgets.lcp}ms`);
    assert(cls <= budgets.cls, `${label}: CLS ${cls.toFixed(3)} > ${budgets.cls}`);
    assert(interaction <= budgets.interaction, `${label}: representative interaction ${Math.round(interaction)}ms > ${budgets.interaction}ms`);
    assert(maxLongTask <= budgets.longTask, `${label}: load long task ${Math.round(maxLongTask)}ms > ${budgets.longTask}ms`);
    assert(loadHealth.scrollWidth <= loadHealth.innerWidth + 1, `${label}: horizontal overflow ${loadHealth.scrollWidth}px > ${loadHealth.innerWidth}px`);
    assert(!loadHealth.formulaOverflow, `${label}: formula overflow ${JSON.stringify(loadHealth.formulaOverflow)}`);
    assert(!loadHealth.formulaScrollClass, `${label}: formula block uses horizontal scroll: ${loadHealth.formulaScrollClass}`);
    await assertLazyCourseGraphs(page, label, path);

    return {
      label,
      lcp: Math.round(lcp),
      cls: Number(cls.toFixed(3)),
      interaction: Math.round(interaction),
      maxLongTask: Math.round(maxLongTask),
    };
  } finally {
    await page.close();
  }
}

const pages = [...activeRootPages(), ...activeCoursePages()];
const server = await startServer();
const browser = await chromium.launch();
const results = [];

try {
  for (const path of pages) {
    for (const viewport of VIEWPORTS) {
      results.push(await checkPage(browser, server.baseUrl, path, viewport));
    }
  }
} finally {
  await browser.close();
  await server.close();
}

const worstLcp = Math.max(...results.map((result) => result.lcp));
const worstCls = Math.max(...results.map((result) => result.cls));
const worstInteraction = Math.max(...results.map((result) => result.interaction));
const worstLongTask = Math.max(...results.map((result) => result.maxLongTask));

console.log(
  `PASS CWV verification: ${pages.length} pages x ${VIEWPORTS.length} viewports, `
  + `worst LCP ${worstLcp}ms, worst CLS ${worstCls.toFixed(3)}, `
  + `worst interaction ${worstInteraction}ms, worst long task ${worstLongTask}ms.`,
);
