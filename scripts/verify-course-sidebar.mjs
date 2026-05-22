import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEFAULT_COURSE_RELATIVE_PATH = 'prototypes/cours/maths-specialite/second-degre/index.html';
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const targetArg = args.find((arg) => !arg.startsWith('--')) || DEFAULT_COURSE_RELATIVE_PATH;

function resolveTargetPath(target) {
  const resolved = isAbsolute(target) ? resolve(target) : resolve(ROOT, target);
  const relativePath = relative(ROOT, resolved);
  if (relativePath.startsWith('..') || relativePath === '' || relativePath.includes(`..${sep}`)) {
    fail(`course target must stay inside the project root: ${target}`);
  }
  return resolved;
}

const COURSE_PATH = resolveTargetPath(targetArg);
const COURSE_RELATIVE_PATH = relative(ROOT, COURSE_PATH).split(sep).join('/');
const COURSE_URL = pathToFileURL(COURSE_PATH).href;
const COURSE_DIR = dirname(COURSE_PATH);
const GENERATION_NOTES_PATH = join(COURSE_DIR, 'generation-notes.md');
const STRICT_SECOND_DEGRE = flags.has('--strict-second-degre') || COURSE_RELATIVE_PATH === DEFAULT_COURSE_RELATIVE_PATH;
const SKIP_NOTES = flags.has('--skip-notes');

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

async function collectPageErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  return errors;
}

async function getSidebarMetrics(page) {
  return page.evaluate(() => {
    const sidebar = document.querySelector('[data-course-sidebar]');
    const toggle = document.querySelector('[data-sidebar-toggle]');
    if (!sidebar || !toggle) return null;

    const sidebarBox = sidebar.getBoundingClientRect();
    const toggleBox = toggle.getBoundingClientRect();
    const toggleStyle = getComputedStyle(toggle);
    const railArrowStyle = getComputedStyle(sidebar, '::before');
    const railArrowTransform = new DOMMatrixReadOnly(railArrowStyle.transform);
    const railArrowLeft = parseFloat(railArrowStyle.left);
    const railArrowWidth = parseFloat(railArrowStyle.width);

    return {
      isCollapsed: document.body.classList.contains('is-course-sidebar-collapsed'),
      isExpanded: document.body.classList.contains('is-course-sidebar-expanded'),
      sidebar: {
        width: sidebarBox.width,
        centerX: sidebarBox.left + sidebarBox.width / 2,
      },
      toggle: {
        disabled: toggle.disabled,
        display: toggleStyle.display,
        opacity: Number(toggleStyle.opacity),
        pointerEvents: toggleStyle.pointerEvents,
        visible: toggleBox.width > 0 && toggleBox.height > 0 && toggleStyle.visibility !== 'hidden',
        centerX: toggleBox.left + toggleBox.width / 2,
      },
      railArrow: {
        content: railArrowStyle.content,
        centerX: sidebarBox.left + railArrowLeft + railArrowWidth / 2 + railArrowTransform.m41,
        opacity: Number(railArrowStyle.opacity),
      },
    };
  });
}

async function assertNoFormulaOverflow(page) {
  const overflow = await page.evaluate(() => {
    const pageOverflow = document.documentElement.scrollWidth - window.innerWidth;
    const formulaBlocks = Array.from(document.querySelectorAll('.katex-display, .formula-card'));
    const overflowingFormula = formulaBlocks.find((element) => element.scrollWidth > element.clientWidth + 1);
    const scrollableFormula = formulaBlocks.find((element) => getComputedStyle(element).overflowX === 'auto');

    return {
      pageOverflow,
      formula: overflowingFormula
        ? {
          className: overflowingFormula.className,
          scrollWidth: overflowingFormula.scrollWidth,
          clientWidth: overflowingFormula.clientWidth,
        }
        : null,
      scrollableFormulaClass: scrollableFormula?.className || null,
    };
  });

  assert(
    overflow.pageOverflow <= 1,
    `course page must not overflow horizontally: ${overflow.pageOverflow}px overflow`,
  );
  assert(
    !overflow.formula,
    `KaTeX/formula block must not overflow: ${JSON.stringify(overflow.formula)}`,
  );
  assert(
    !overflow.scrollableFormulaClass,
    `formula block must not use horizontal scroll: ${overflow.scrollableFormulaClass}`,
  );
}

async function assertRevealButtons(page) {
  const firstRevealButton = page.locator('[data-reveal]').first();
  const targetId = await firstRevealButton.getAttribute('data-reveal');
  assert(targetId, 'first reveal button must target an answer');

  const answer = page.locator(`#${targetId}`);
  assert(await answer.count(), `answer #${targetId} must exist`);
  assert(await answer.evaluate((element) => element.hasAttribute('hidden')), 'answer must start hidden');

  await firstRevealButton.click();
  assert(
    !(await answer.evaluate((element) => element.hasAttribute('hidden'))),
    'answer must be visible after reveal click',
  );

  await firstRevealButton.click();
  assert(
    await answer.evaluate((element) => element.hasAttribute('hidden')),
    'answer must be hidden after second reveal click',
  );
}

async function assertCourseContentContract(page) {
  const contract = await page.evaluate(() => {
    const requiredSectionGroups = [
      { label: 'diagnostic', ids: ['diagnostic'] },
      { label: 'formes', ids: ['formes'] },
      { label: 'canonique/sommet', ids: ['canonique', 'sommet'] },
      { label: 'discriminant', ids: ['discriminant'] },
      { label: 'signe', ids: ['signe'] },
      { label: 'somme-produit', ids: ['somme-produit'] },
      { label: 'choix de methode', ids: ['choix', 'choix-methode'] },
      { label: 'redaction', ids: ['redaction'] },
      { label: 'exercices guides', ids: ['exercices-guides', 'guides'] },
      { label: 'controle', ids: ['controle'] },
      { label: 'vingt', ids: ['vingt', 'vingt-sur-vingt'] },
      { label: 'revision', ids: ['revision'] },
    ];

    const bodyText = document.body.textContent || '';
    return {
      missingSections: requiredSectionGroups
        .filter((group) => !group.ids.some((id) => document.getElementById(id)))
        .map((group) => group.label),
      navTargets: Array.from(document.querySelectorAll('[data-section-link]')).map((link) => link.getAttribute('href')),
      revealCount: document.querySelectorAll('[data-reveal]').length,
      paywallCount: document.querySelectorAll('.paywall-card').length,
      hasDevelopedForm: /forme développée/i.test(bodyText),
      hasFactorizedForm: /forme factorisée/i.test(bodyText),
      hasSimpleEquations: /équations? simples?|produit nul|facteur commun|avant le discriminant/i.test(bodyText),
      hasRootSumProduct: /somme et produit des racines/i.test(bodyText),
      hasAxis: /axe de symétrie/i.test(bodyText),
      hasMethodChoice: /choisir la méthode/i.test(bodyText),
    };
  });

  assert(contract.missingSections.length === 0, `course is missing required sections: ${contract.missingSections.join(', ')}`);
  assert(contract.navTargets.includes('#formes'), 'sidebar must link to the forms section');
  assert(contract.navTargets.includes('#sommet') || contract.navTargets.includes('#canonique'), 'sidebar must link to the canonical form/summit section');
  assert(contract.navTargets.includes('#somme-produit'), 'sidebar must link to the root sum/product section');
  assert(contract.navTargets.includes('#choix-methode') || contract.navTargets.includes('#choix'), 'sidebar must link to the choose-the-method section');
  assert(contract.navTargets.includes('#guides') || contract.navTargets.includes('#exercices-guides'), 'sidebar must link to guided exercises');
  assert(contract.navTargets.includes('#vingt-sur-vingt') || contract.navTargets.includes('#vingt'), 'sidebar must link to the 20/20 section');
  assert(contract.revealCount >= 18, `course must include at least 18 active reveal/correction buttons, got ${contract.revealCount}`);
  assert(contract.paywallCount === 0, 'course student page must not contain the prototype paywall card');
  assert(contract.hasDevelopedForm, 'course must explicitly teach the developed form');
  assert(contract.hasFactorizedForm, 'course must explicitly teach the factorized form');
  assert(contract.hasSimpleEquations, 'course must include simple equations before the discriminant');
  assert(contract.hasRootSumProduct, 'course must include sum and product of roots');
  assert(contract.hasAxis, 'course must include the axis of symmetry');
  assert(contract.hasMethodChoice, 'course must keep a choose-the-method block');
}

async function assertGenericCourseContentContract(page) {
  const contract = await page.evaluate(() => ({
    hasBodyClass: document.body.classList.contains('has-course-sidebar'),
    hasLayout: Boolean(document.querySelector('[data-course-layout]')),
    hasSidebar: Boolean(document.querySelector('[data-course-sidebar]')),
    navTargets: Array.from(document.querySelectorAll('[data-section-link]')).map((link) => link.getAttribute('href')),
    revealCount: document.querySelectorAll('[data-reveal]').length,
    paywallCount: document.querySelectorAll('.paywall-card').length,
    hasKatex: Boolean(document.querySelector('.katex, .katex-display')),
  }));

  assert(contract.hasBodyClass, 'course page must keep body.has-course-sidebar');
  assert(contract.hasLayout, 'course page must expose [data-course-layout]');
  assert(contract.hasSidebar, 'course page must expose [data-course-sidebar]');
  assert(contract.navTargets.length >= 3, `course sidebar must expose at least 3 section links, got ${contract.navTargets.length}`);
  assert(contract.navTargets.every((target) => target && target.startsWith('#')), 'course sidebar links must target local section ids');
  assert(contract.revealCount >= 1, `course must include active reveal/correction buttons, got ${contract.revealCount}`);
  assert(contract.paywallCount === 0, 'course student page must not contain the prototype paywall card');
  assert(contract.hasKatex, 'course must render mathematical expressions with KaTeX');
}

function assertGenerationNotesContract() {
  if (SKIP_NOTES) return;
  assert(existsSync(GENERATION_NOTES_PATH), `generation notes must exist at ${GENERATION_NOTES_PATH}`);
  const notes = readFileSync(GENERATION_NOTES_PATH, 'utf8');

  if (!STRICT_SECOND_DEGRE) {
    assert(/sources?|carte|couverture|génération|generation/i.test(notes), 'generation notes must document source coverage or generation decisions');
    return;
  }

  assert(/Carte de couverture V2/i.test(notes), 'generation notes must include the V2 source coverage map');
  assert(/Éléments volontairement exclus/i.test(notes), 'generation notes must document intentionally excluded source elements');
  assert(/Maths91/i.test(notes) && /Maths-et-tiques/i.test(notes), 'generation notes must document source roles');
}

async function assertExactCourseCurves(page, options = {}) {
  const minCount = Number(options.minCount) || 0;
  const curveLocator = page.locator('[data-course-curve], [data-chapter-curve]');
  const locatedCount = await curveLocator.count();

  for (let index = 0; index < locatedCount; index += 1) {
    await curveLocator.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }

  if (locatedCount) {
    await page.waitForFunction(() => {
      const boards = Array.from(document.querySelectorAll('[data-course-curve], [data-chapter-curve]'));
      return boards.every((board) => (
        board.dataset.courseGraphReady === 'true' ||
        Boolean(board.querySelector('svg')) ||
        /Graphe indisponible/i.test(board.textContent || '')
      ));
    }, { timeout: 10000 }).catch(() => {});
  }

  const curveHealth = await page.evaluate(() => {
    const boards = Array.from(document.querySelectorAll('[data-course-curve], [data-chapter-curve]'));
    return {
      hasJXG: Boolean(window.JXG),
      count: boards.length,
      minBoardWidth: window.innerWidth < 560 ? 220 : 250,
      boards: boards.map((board) => {
        const box = board.getBoundingClientRect();
        return {
          id: board.id,
          type: board.getAttribute('data-course-curve') || board.getAttribute('data-chapter-curve'),
          hasSvg: Boolean(board.querySelector('svg')),
          hasFallback: /Graphe indisponible/i.test(board.textContent || ''),
          width: box.width,
          height: box.height,
        };
      }),
    };
  });

  assert(curveHealth.count >= minCount, `course must include at least ${minCount} exact curve boards, got ${curveHealth.count}`);
  if (!curveHealth.count) return;
  assert(curveHealth.hasJXG, 'course must load JSXGraph when exact mathematical curves are present');

  for (const board of curveHealth.boards) {
    assert(board.id, `course curve board ${board.type} must have a stable id`);
    assert(board.hasSvg, `course curve board ${board.id} must render deterministic SVG output`);
    assert(!board.hasFallback, `course curve board ${board.id} must not show the fallback message`);
    assert(
      board.width >= curveHealth.minBoardWidth,
      `course curve board ${board.id} is too narrow: ${board.width}px`,
    );
    assert(board.height >= 260, `course curve board ${board.id} is too short: ${board.height}px`);
  }
}

async function assertSidebarDesktop(page) {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(COURSE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-course-sidebar]');

  let metrics = await getSidebarMetrics(page);
  assert(metrics, 'course sidebar and toggle must exist');
  assert(metrics.isExpanded, 'sidebar must be open on first desktop load');
  assert(!metrics.toggle.disabled, 'open sidebar toggle must be enabled so the student can collapse it');

  await page.locator('[data-sidebar-toggle]').click();
  await page.waitForTimeout(220);

  metrics = await getSidebarMetrics(page);
  assert(metrics?.isCollapsed, 'sidebar must collapse after clicking the open-state toggle');
  assert(metrics.toggle.disabled, 'collapsed rail arrow must not be an actionable button');
  assert(metrics.toggle.pointerEvents === 'none', 'collapsed rail arrow must not receive pointer clicks');
  assert(metrics.railArrow.content !== 'none', 'collapsed rail must expose a decorative centered arrow');
  assert(metrics.railArrow.opacity > 0.9, 'collapsed rail decorative arrow must be visible');

  const centerDelta = Math.abs(metrics.railArrow.centerX - metrics.sidebar.centerX);
  assert(centerDelta <= 1.5, `collapsed arrow must be horizontally centered in the rail, got ${centerDelta}px delta`);

  await page.mouse.click(metrics.sidebar.centerX, 30);
  await page.waitForTimeout(220);

  metrics = await getSidebarMetrics(page);
  assert(metrics?.isCollapsed, 'clicking the collapsed rail arrow area must not reopen the sidebar');

  await page.mouse.move(800, 30);
  await page.locator('[data-course-sidebar]').evaluate((element) => {
    element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  });
  await page.waitForTimeout(80);
  await page.mouse.move(28, 80);
  await page.waitForTimeout(220);

  metrics = await getSidebarMetrics(page);
  assert(metrics?.isCollapsed, 'hover reveal must keep the persistent state collapsed');
  assert(metrics.sidebar.width > 220, `hovering the collapsed rail must reveal the plan width, got ${metrics.sidebar.width}px`);

  await page.mouse.move(800, 80);
  await page.waitForTimeout(220);
  metrics = await getSidebarMetrics(page);
  assert(metrics?.sidebar.width < 80, `leaving hover must return to rail width, got ${metrics?.sidebar.width}px`);

  await page.locator('[data-course-sidebar]').focus();
  await page.waitForTimeout(220);
  metrics = await getSidebarMetrics(page);
  assert(metrics?.sidebar.width > 220, `focusing the collapsed rail must reveal the plan width, got ${metrics?.sidebar.width}px`);
}

async function assertSidebarMobile(page) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(COURSE_URL, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-course-sidebar]');

  await page.locator('[data-section-link]').nth(2).click();
  await page.waitForTimeout(220);

  const metrics = await getSidebarMetrics(page);
  assert(metrics?.isCollapsed, 'mobile sidebar must collapse after section navigation');
  assert(metrics.sidebar.width <= 52, `mobile collapsed rail must stay compact, got ${metrics.sidebar.width}px`);
  assert(metrics.toggle.disabled, 'mobile collapsed rail arrow must not be an actionable button');
}

if (!existsSync(COURSE_PATH)) {
  fail(`course target does not exist at ${COURSE_PATH}`);
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = await collectPageErrors(page);

  await assertSidebarDesktop(page);
  if (STRICT_SECOND_DEGRE) {
    await assertCourseContentContract(page);
  } else {
    await assertGenericCourseContentContract(page);
  }
  assertGenerationNotesContract();
  await assertExactCourseCurves(page, { minCount: STRICT_SECOND_DEGRE ? 5 : 0 });
  await assertRevealButtons(page);
  await assertNoFormulaOverflow(page);
  await assertSidebarMobile(page);
  await assertExactCourseCurves(page, { minCount: STRICT_SECOND_DEGRE ? 5 : 0 });
  await assertNoFormulaOverflow(page);

  assert(errors.length === 0, `course page must not emit console/page errors: ${errors.join(' | ')}`);
  console.log(`PASS course page verification for ${COURSE_RELATIVE_PATH}: sidebar states, reveal buttons, formula overflow, notes contract, and exact curve checks are valid.`);
} finally {
  await browser.close();
}
