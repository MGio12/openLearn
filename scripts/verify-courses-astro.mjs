import { createReadStream, existsSync, readFileSync, statSync } from 'fs';
import { createServer } from 'http';
import { extname, join, normalize, relative, resolve, sep } from 'path';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const DIST = join(ROOT, 'dist-courses');
const OVERFLOW_TOLERANCE = 1;

const REQUIRED_FILES = [
  'astro.config.mjs',
  'src/pages/cours/second-degre/index.mdx',
  'src/pages/cours/second-degre/td.mdx',
  'src/courses/data/second-degre.js',
  'src/courses/components/CourseShell.astro',
  'src/courses/components/CourseSidebar.astro',
  'src/courses/components/KaTeXBlock.astro',
  'src/courses/components/Reveal.astro',
  'src/courses/components/MethodChoice.astro',
  'src/courses/components/WorkedExample.astro',
  'src/courses/components/ExamWriting.astro',
  'src/courses/components/ExactGraph.astro',
  'src/courses/components/TDExerciseGroup.astro',
];

const REQUIRED_COMPONENTS = [
  'CourseShell',
  'CourseSidebar',
  'KaTeXBlock',
  'Reveal',
  'MethodChoice',
  'WorkedExample',
  'ExamWriting',
  'ExactGraph',
  'TDExerciseGroup',
];

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ttf': 'font/ttf',
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
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  assert(pkg.devDependencies?.astro, 'package.json must include astro as a dev dependency');
  assert(pkg.devDependencies?.['@astrojs/mdx'], 'package.json must include @astrojs/mdx as a dev dependency');
  assert(pkg.scripts?.['dev:courses'] === 'astro dev --host 127.0.0.1 --port 4321', 'package.json must expose npm run dev:courses');
  assert(pkg.scripts?.['build:courses'] === 'astro build', 'package.json must expose npm run build:courses');
  assert(pkg.scripts?.['verify:courses-astro'] === 'node scripts/verify-courses-astro.mjs', 'package.json must expose npm run verify:courses-astro');

  for (const file of REQUIRED_FILES) {
    assert(existsSync(join(ROOT, file)), `${file} must exist`);
  }

  const todo = readFileSync(join(ROOT, 'TODO.md'), 'utf8');
  assert(/npm run build:courses/.test(todo), 'TODO.md must mention npm run build:courses');
  assert(/npm run verify:courses-astro/.test(todo), 'TODO.md must mention npm run verify:courses-astro');

  const stackDoc = readFileSync(join(ROOT, 'docs', 'stack-cours-td-web.md'), 'utf8');
  for (const component of REQUIRED_COMPONENTS) {
    assert(stackDoc.includes(component), `docs/stack-cours-td-web.md must document ${component}`);
  }
}

function startServer(root) {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent((request.url || '/').split('?')[0]);
    const requestPath = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
    const filePath = normalize(join(root, requestPath));
    const rel = relative(root, filePath);

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
  const overflow = await page.evaluate(() => {
    const scrollingElement = document.scrollingElement || document.documentElement;
    const visualOverflow = Array.from(document.querySelectorAll('body *'))
      .filter((element) => {
        if (element.closest('.katex-mathml')) return false;
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.right > window.innerWidth + 1 && rect.left < window.innerWidth;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ''}${element.className && typeof element.className === 'string' ? `.${element.className.split(/\s+/).filter(Boolean).join('.')}` : ''}`,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      });
    return {
      scrollWidth: scrollingElement.scrollWidth,
      innerWidth: window.innerWidth,
      visualOverflow,
    };
  });
  assert(
    overflow.scrollWidth <= overflow.innerWidth + OVERFLOW_TOLERANCE,
    `${label}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.innerWidth}px`,
  );
  assert(
    overflow.visualOverflow.length === 0,
    `${label}: visible elements overflow viewport ${JSON.stringify(overflow.visualOverflow.slice(0, 5))}`,
  );
}

async function assertNoFormulaOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll('.katex-display, .formula-card'));
    const overflowing = blocks.find((element) => element.scrollWidth > element.clientWidth + 1);
    const scrollable = blocks.find((element) => getComputedStyle(element).overflowX === 'auto');
    return {
      overflowing: overflowing
        ? { className: overflowing.className, scrollWidth: overflowing.scrollWidth, clientWidth: overflowing.clientWidth }
        : null,
      scrollable: scrollable?.className || null,
    };
  });
  assert(!overflow.overflowing, `${label}: formula overflow ${JSON.stringify(overflow.overflowing)}`);
  assert(!overflow.scrollable, `${label}: formula block must not use horizontal scroll: ${overflow.scrollable}`);
}

async function assertRevealWorks(page, label) {
  const revealCount = await page.locator('[data-reveal]').count();
  assert(revealCount >= 1, `${label}: page must expose reveal buttons`);

  const button = page.locator('[data-reveal]').first();
  const targetId = await button.getAttribute('data-reveal');
  const answer = page.locator(`#${targetId}`);
  assert(await answer.count(), `${label}: reveal target #${targetId} must exist`);
  assert(await answer.evaluate((element) => element.hasAttribute('hidden')), `${label}: answer must start hidden`);
  await button.click();
  assert(!(await answer.evaluate((element) => element.hasAttribute('hidden'))), `${label}: answer must show after click`);
  await button.click();
  assert(await answer.evaluate((element) => element.hasAttribute('hidden')), `${label}: answer must hide after second click`);
}

async function assertSidebar(page, label) {
  const sidebar = page.locator('[data-course-sidebar]');
  const toggle = page.locator('[data-sidebar-toggle]');
  assert(await sidebar.count(), `${label}: sidebar must exist`);
  assert(await toggle.count(), `${label}: sidebar toggle must exist`);

  const before = await sidebar.boundingBox();
  assert(before && before.width > 200, `${label}: sidebar must start open on desktop`);
  await toggle.click();
  await page.waitForFunction(() => document.body.classList.contains('is-course-sidebar-collapsed'));
  const collapsed = await sidebar.boundingBox();
  assert(collapsed && collapsed.width <= 70, `${label}: collapsed sidebar must keep a narrow visible rail`);
  const arrow = await sidebar.evaluate((element) => {
    const style = getComputedStyle(element, '::before');
    const box = element.getBoundingClientRect();
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      opacity: Number(style.opacity),
      centerX: box.left + parseFloat(style.left) + parseFloat(style.width) / 2 + matrix.m41,
      sidebarCenterX: box.left + box.width / 2,
      pointerEvents: style.pointerEvents,
    };
  });
  assert(arrow.opacity > 0.8, `${label}: collapsed rail arrow must be visible`);
  assert(Math.abs(arrow.centerX - arrow.sidebarCenterX) <= 2, `${label}: collapsed rail arrow must be centered`);
  assert(arrow.pointerEvents === 'none', `${label}: collapsed rail arrow must be non-clickable`);
  await sidebar.hover();
  await page.waitForFunction(() => document.querySelector('[data-course-sidebar]')?.getBoundingClientRect().width > 200);
}

async function assertCourseContent(page, label) {
  const contract = await page.evaluate(() => {
    const text = document.body.textContent || '';
    const requiredIds = [
      'diagnostic',
      'formes',
      'discriminant',
      'sommet',
      'signe',
      'somme-produit',
      'position-relative',
      'choix-methode',
      'redaction',
      'controle',
      'vingt-sur-vingt',
      'revision',
    ];
    return {
      missingIds: requiredIds.filter((id) => !document.getElementById(id)),
      revealCount: document.querySelectorAll('[data-reveal]').length,
      graphCount: document.querySelectorAll('[data-exact-graph]').length,
      agentCount: document.querySelectorAll('[data-course-agent-open]').length,
      hasMaths91: /Maths91/.test(text),
      hasMathsEtTiques: /Maths-et-tiques/.test(text),
      hasMethodChoice: /Choisir la méthode/.test(text),
      hasExamWriting: /Rédiger comme en contrôle/.test(text),
      hasGate: /Deux contrôles sans corrigé/.test(text),
    };
  });
  assert(contract.missingIds.length === 0, `${label}: missing course sections ${contract.missingIds.join(', ')}`);
  assert(contract.revealCount >= 18, `${label}: course must include at least 18 reveal buttons, got ${contract.revealCount}`);
  assert(contract.graphCount >= 5, `${label}: course must include exact graph boards`);
  assert(contract.agentCount >= 3, `${label}: course must include three IA feedback triggers`);
  assert(contract.hasMaths91 && contract.hasMathsEtTiques, `${label}: course must cite validated sources`);
  assert(contract.hasMethodChoice, `${label}: course must include choose-the-method content`);
  assert(contract.hasExamWriting, `${label}: course must include exam-writing content`);
  assert(contract.hasGate, `${label}: course must gate 20/20 practice`);
}

async function assertTdContent(page, label) {
  const contract = await page.evaluate(() => {
    const text = document.body.textContent || '';
    return {
      exerciseCount: document.querySelectorAll('.exercise').length,
      revealCount: document.querySelectorAll('[data-reveal]').length,
      hasGate: /cap 20\/20 n’est pas un raccourci/i.test(text),
      hasSources: /Maths91/.test(text) && /Maths-et-tiques/.test(text),
    };
  });
  assert(contract.exerciseCount === 40, `${label}: TD must expose 40 exercises, got ${contract.exerciseCount}`);
  assert(contract.revealCount === 40, `${label}: TD must expose one reveal per exercise, got ${contract.revealCount}`);
  assert(contract.hasGate, `${label}: TD must gate 20/20 exercises`);
  assert(contract.hasSources, `${label}: TD must cite validated sources`);
}

async function assertGraphsReady(page, label) {
  const graphs = page.locator('[data-exact-graph]');
  const graphCount = await graphs.count();
  if (graphCount === 0) return;

  for (let index = 0; index < graphCount; index += 1) {
    const graph = graphs.nth(index);
    await graph.scrollIntoViewIfNeeded();
    await graph.evaluate((element) => {
      return new Promise((resolve, reject) => {
        const deadline = window.setTimeout(() => reject(new Error(`${element.id || 'graph'} did not render`)), 12000);
        const check = () => {
          if (element.dataset.graphReady === 'true' && element.querySelector('svg, canvas')) {
            window.clearTimeout(deadline);
            resolve();
            return;
          }
          window.requestAnimationFrame(check);
        };
        check();
      });
    });
  }

  const empty = await page.locator('[data-exact-graph]').evaluateAll((graphs) => graphs
    .filter((graph) => !graph.querySelector('svg, canvas'))
    .map((graph) => graph.id));
  assert(empty.length === 0, `${label}: exact graphs must be non-empty: ${empty.join(', ')}`);
}

async function inspectPage(browser, baseUrl, path, viewport, kind) {
  const label = `${path} ${viewport.label}`;
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.body.classList.contains('is-course-ready'), null, { timeout: 6000 });

  assert(errors.length === 0, `${label}: console/page errors: ${errors.join(' | ')}`);
  assert(await page.locator('h1', { hasText: 'Second degré' }).count(), `${label}: h1 must exist`);
  await assertNoHorizontalOverflow(page, label);
  await assertNoFormulaOverflow(page, label);
  await assertRevealWorks(page, label);
  if (viewport.label === 'desktop') {
    await assertSidebar(page, label);
  }
  if (kind === 'course') {
    await assertCourseContent(page, label);
    await assertGraphsReady(page, label);
  } else {
    await assertTdContent(page, label);
  }
  await page.close();
}

async function main() {
  assertStaticContract();
  assert(existsSync(join(DIST, 'cours', 'second-degre', 'index.html')), 'dist-courses course page must exist; run npm run build:courses first');
  assert(existsSync(join(DIST, 'cours', 'second-degre', 'td', 'index.html')), 'dist-courses TD page must exist; run npm run build:courses first');

  const server = await startServer(DIST);
  const browser = await chromium.launch({ headless: true });
  try {
    const viewports = [
      { label: 'desktop', width: 1440, height: 900 },
      { label: 'mobile', width: 390, height: 844 },
    ];
    for (const viewport of viewports) {
      await inspectPage(browser, server.baseUrl, '/cours/second-degre/', viewport, 'course');
      await inspectPage(browser, server.baseUrl, '/cours/second-degre/td/', viewport, 'td');
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log('verify:courses-astro OK');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
