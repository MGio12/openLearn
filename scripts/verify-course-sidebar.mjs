import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COURSE_PATH = join(ROOT, 'prototypes/cours/maths-specialite/second-degre/index.html');
const COURSE_URL = pathToFileURL(COURSE_PATH).href;
const GENERATION_NOTES_PATH = join(ROOT, 'prototypes/cours/maths-specialite/second-degre/generation-notes.md');

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
    const requiredSections = [
      'diagnostic',
      'formes',
      'canonique',
      'equations-simples',
      'discriminant',
      'factorisation',
      'somme-produit',
      'signe',
      'choix',
      'redaction',
      'exercices-guides',
      'controle',
      'vingt',
      'revision',
    ];

    const bodyText = document.body.textContent || '';
    return {
      missingSections: requiredSections.filter((id) => !document.getElementById(id)),
      navTargets: Array.from(document.querySelectorAll('[data-section-link]')).map((link) => link.getAttribute('href')),
      revealCount: document.querySelectorAll('[data-reveal]').length,
      paywallCount: document.querySelectorAll('.paywall-card').length,
      hasDevelopedForm: /forme développée/i.test(bodyText),
      hasFactorizedForm: /forme factorisée/i.test(bodyText),
      hasSimpleEquations: /équations? simples?/i.test(bodyText),
      hasRootSumProduct: /somme et produit des racines/i.test(bodyText),
      hasAxis: /axe de symétrie/i.test(bodyText),
      hasMethodChoice: /choisir la méthode/i.test(bodyText),
    };
  });

  assert(contract.missingSections.length === 0, `course is missing required sections: ${contract.missingSections.join(', ')}`);
  assert(contract.navTargets.includes('#formes'), 'sidebar must link to the forms section');
  assert(contract.navTargets.includes('#factorisation'), 'sidebar must link to the factorization section');
  assert(contract.navTargets.includes('#somme-produit'), 'sidebar must link to the root sum/product section');
  assert(contract.revealCount >= 18, `course must include at least 18 active reveal/correction buttons, got ${contract.revealCount}`);
  assert(contract.paywallCount === 0, 'course student page must not contain the prototype paywall card');
  assert(contract.hasDevelopedForm, 'course must explicitly teach the developed form');
  assert(contract.hasFactorizedForm, 'course must explicitly teach the factorized form');
  assert(contract.hasSimpleEquations, 'course must include simple equations before the discriminant');
  assert(contract.hasRootSumProduct, 'course must include sum and product of roots');
  assert(contract.hasAxis, 'course must include the axis of symmetry');
  assert(contract.hasMethodChoice, 'course must keep a choose-the-method block');
}

function assertGenerationNotesContract() {
  assert(existsSync(GENERATION_NOTES_PATH), `generation notes must exist at ${GENERATION_NOTES_PATH}`);
  const notes = readFileSync(GENERATION_NOTES_PATH, 'utf8');

  assert(/Carte de couverture V2/i.test(notes), 'generation notes must include the V2 source coverage map');
  assert(/Éléments volontairement exclus/i.test(notes), 'generation notes must document intentionally excluded source elements');
  assert(/Maths91/i.test(notes) && /Maths-et-tiques/i.test(notes), 'generation notes must document source roles');
}

async function assertExactCourseCurves(page) {
  const curveHealth = await page.evaluate(() => {
    const boards = Array.from(document.querySelectorAll('[data-course-curve]'));
    return {
      hasJXG: Boolean(window.JXG),
      count: boards.length,
      minBoardWidth: window.innerWidth < 560 ? 220 : 250,
      boards: boards.map((board) => {
        const box = board.getBoundingClientRect();
        return {
          id: board.id,
          type: board.getAttribute('data-course-curve'),
          hasSvg: Boolean(board.querySelector('svg')),
          hasFallback: /Graphe indisponible/i.test(board.textContent || ''),
          width: box.width,
          height: box.height,
        };
      }),
    };
  });

  assert(curveHealth.hasJXG, 'second-degree course must load JSXGraph for exact mathematical curves');
  assert(curveHealth.count >= 5, `second-degree course must include at least 5 exact curve boards, got ${curveHealth.count}`);

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
  await assertCourseContentContract(page);
  assertGenerationNotesContract();
  await assertExactCourseCurves(page);
  await assertRevealButtons(page);
  await assertNoFormulaOverflow(page);
  await assertSidebarMobile(page);
  await assertExactCourseCurves(page);
  await assertNoFormulaOverflow(page);

  assert(errors.length === 0, `course page must not emit console/page errors: ${errors.join(' | ')}`);
  console.log('PASS course page verification: exact JSXGraph curves render, collapsed sidebar arrow is centered and non-clickable, hover/focus reveal works, reveal buttons work, and formulas do not overflow.');
} finally {
  await browser.close();
}
