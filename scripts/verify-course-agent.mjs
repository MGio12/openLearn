import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DEFAULT_TARGET = 'prototypes/cours/maths-specialite/second-degre/index.html';
const FEYNMAN_STORAGE_KEY = 'outilPrepa:feynman:v1';
const REQUIRED_CONTEXT_FIELDS = [
  'id',
  'sectionId',
  'entryLabel',
  'studentTask',
  'minimalContext',
  'expectedAnswer',
  'commonMistakes',
  'feedbackGoal',
];
const EXPECTED_AGENT_SECTIONS = ['diagnostic', 'choix-methode', 'redaction'];
const EXPECTED_FEYNMAN_SECTION = 'feynman';

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function resolveTargetPath(target) {
  const resolved = isAbsolute(target) ? resolve(target) : resolve(ROOT, target);
  const relativePath = relative(ROOT, resolved);
  if (relativePath.startsWith('..') || relativePath === '' || relativePath.includes(`..${sep}`)) {
    fail(`course target must stay inside the project root: ${target}`);
  }
  return resolved;
}

function extractAgentManifest(html) {
  const scriptMatch = html.match(/<script\b[^>]*data-course-agent-contexts[^>]*>([\s\S]*?)<\/script>/i);
  assert(scriptMatch, 'course must include script[type="application/json"][data-course-agent-contexts]');

  try {
    return JSON.parse(scriptMatch[1].trim());
  } catch (error) {
    fail(`course agent manifest must be valid JSON: ${error.message}`);
  }
}

function extractAgentTriggerIds(html) {
  return Array.from(html.matchAll(/<button\b[^>]*data-course-agent-open="([^"]+)"[^>]*>/gi))
    .map((match) => match[1]);
}

function extractAgentJumpLinks(html) {
  return Array.from(html.matchAll(/<a\b[^>]*\bdata-course-agent-jump="([^"]+)"[^>]*>/gi))
    .map((match) => {
      const href = match[0].match(/\bhref="#([^"]+)"/i)?.[1] || '';
      return { sectionId: match[1], href };
    });
}

function assertStaticManifestContract(html) {
  const manifest = extractAgentManifest(html);
  assert(typeof manifest.courseId === 'string' && manifest.courseId.trim(), 'manifest must include courseId');
  assert(typeof manifest.courseTitle === 'string' && manifest.courseTitle.trim(), 'manifest must include courseTitle');
  assert(Array.isArray(manifest.contexts), 'manifest contexts must be an array');
  assert(manifest.contexts.length >= 3, `manifest must include at least 3 contexts, got ${manifest.contexts.length}`);

  const contextIds = new Set();
  for (const context of manifest.contexts) {
    assert(context && typeof context === 'object', 'each manifest context must be an object');
    for (const field of REQUIRED_CONTEXT_FIELDS) {
      assert(context[field] !== undefined, `context ${context.id || '(missing id)'} must include ${field}`);
    }
    assert(typeof context.id === 'string' && context.id.trim(), 'context id must be a non-empty string');
    assert(!contextIds.has(context.id), `context id must be unique: ${context.id}`);
    contextIds.add(context.id);
    assert(typeof context.sectionId === 'string' && context.sectionId.trim(), `context ${context.id} must include sectionId`);
    assert(typeof context.entryLabel === 'string' && context.entryLabel.trim(), `context ${context.id} must include entryLabel`);
    assert(typeof context.studentTask === 'string' && context.studentTask.trim(), `context ${context.id} must include studentTask`);
    assert(typeof context.minimalContext === 'string' && context.minimalContext.trim(), `context ${context.id} must include minimalContext`);
    assert(typeof context.expectedAnswer === 'string' && context.expectedAnswer.trim(), `context ${context.id} must include expectedAnswer`);
    assert(
      Array.isArray(context.commonMistakes) && context.commonMistakes.length > 0,
      `context ${context.id} must include at least one common mistake`,
    );
    assert(typeof context.feedbackGoal === 'string' && context.feedbackGoal.trim(), `context ${context.id} must include feedbackGoal`);
  }

  const triggerIds = extractAgentTriggerIds(html);
  assert(triggerIds.length >= 3, `course must include at least 3 course agent triggers, got ${triggerIds.length}`);

  for (const id of triggerIds) {
    assert(contextIds.has(id), `button[data-course-agent-open="${id}"] must point to an existing context`);
  }

  for (const expectedSection of EXPECTED_AGENT_SECTIONS) {
    assert(
      manifest.contexts.some((context) => context.sectionId === expectedSection),
      `manifest must include a context for #${expectedSection}`,
    );
  }

  const jumpLinks = extractAgentJumpLinks(html);
  for (const expectedSection of EXPECTED_AGENT_SECTIONS) {
    assert(
      jumpLinks.some((link) => link.sectionId === expectedSection && link.href === expectedSection),
      `course overview must include a direct IA jump link to #${expectedSection}`,
    );
  }

  return { manifest, triggerIds };
}

function assertStaticFeynmanContract(html, manifest) {
  assert(/\bdata-feynman\b/i.test(html), 'course must include a reusable [data-feynman] block');
  assert(/\bdata-feynman-input\b/i.test(html), 'Feynman block must include textarea[data-feynman-input]');
  assert(/\bdata-feynman-submit\b/i.test(html), 'Feynman block must include button[data-feynman-submit]');
  assert(/\bdata-feynman-reset\b/i.test(html), 'Feynman block must include button[data-feynman-reset]');
  assert(/\bdata-feynman-feedback\b/i.test(html), 'Feynman block must include [data-feynman-feedback]');
  assert(
    /M[ée]thode Feynman|Expliquer le cours avec mes mots/i.test(html),
    'Feynman block must expose a clear visible title or button label',
  );

  const sectionMatch = html.match(/<section\b[^>]*\bid="feynman"[^>]*>/i);
  assert(sectionMatch, 'Feynman block must be a course section with id="feynman"');

  const contextMatch = sectionMatch[0].match(/\bdata-feynman-context-id="([^"]+)"/i);
  assert(contextMatch, 'Feynman section must declare data-feynman-context-id');

  const context = manifest.contexts.find((item) => item.id === contextMatch[1]);
  assert(context, `Feynman context ${contextMatch[1]} must exist in the course agent manifest`);
  assert(context.sectionId === EXPECTED_FEYNMAN_SECTION, 'Feynman manifest context must target #feynman');
  assert(
    /second degr[ée]|trin[oô]me|discriminant|signe/i.test(context.minimalContext),
    'Feynman context must summarize the real course notions, not a generic prompt',
  );
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

  assert(overflow.pageOverflow <= 1, `course agent page must not overflow horizontally: ${overflow.pageOverflow}px overflow`);
  assert(!overflow.formula, `KaTeX/formula block must not overflow: ${JSON.stringify(overflow.formula)}`);
  assert(!overflow.scrollableFormulaClass, `formula block must not use horizontal scroll: ${overflow.scrollableFormulaClass}`);
}

async function assertAgentDiscoverability(page) {
  const metrics = await page.evaluate((expectedSections) => {
    const entry = document.querySelector('[data-course-agent-entry]');
    const entryBox = entry?.getBoundingClientRect();
    const links = expectedSections.map((sectionId) => {
      const link = document.querySelector(`[data-course-agent-jump="${sectionId}"]`);
      const linkBox = link?.getBoundingClientRect();
      const sidebarBadge = document.querySelector(`.toc-links a[href="#${sectionId}"] .toc-agent-badge`);

      return {
        sectionId,
        linkFound: Boolean(link),
        href: link?.getAttribute('href') || '',
        linkText: link?.textContent?.trim() || '',
        linkWidth: linkBox?.width || 0,
        linkOverflow: link ? link.scrollWidth - link.clientWidth : null,
        sectionFound: Boolean(document.getElementById(sectionId)),
        sidebarBadgeFound: Boolean(sidebarBadge),
      };
    });

    return {
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
      entryFound: Boolean(entry),
      entryWidth: entryBox?.width || 0,
      entryOverflow: entry ? entry.scrollWidth - entry.clientWidth : null,
      links,
    };
  }, EXPECTED_AGENT_SECTIONS);

  assert(metrics.entryFound, 'course overview must include [data-course-agent-entry]');
  assert(metrics.entryWidth > 0, 'course agent entry block must be visible');
  assert(metrics.entryOverflow <= 1, `course agent entry block must not overflow horizontally: ${metrics.entryOverflow}px`);
  assert(metrics.pageOverflow <= 1, `course agent quick entry must not create page overflow: ${metrics.pageOverflow}px`);

  for (const link of metrics.links) {
    assert(link.linkFound, `course agent quick link must exist for #${link.sectionId}`);
    assert(link.href === `#${link.sectionId}`, `course agent quick link for ${link.sectionId} must target #${link.sectionId}`);
    assert(link.sectionFound, `course agent quick link target #${link.sectionId} must exist`);
    assert(link.linkText.length > 0, `course agent quick link for #${link.sectionId} must have visible text`);
    assert(link.linkWidth > 0, `course agent quick link for #${link.sectionId} must be visible`);
    assert(link.linkOverflow <= 1, `course agent quick link for #${link.sectionId} must not overflow: ${link.linkOverflow}px`);
    assert(link.sidebarBadgeFound, `sidebar link for #${link.sectionId} must show an IA marker`);
  }
}

async function assertDrawerInteraction(page, triggerId) {
  const trigger = page.locator(`[data-course-agent-open="${triggerId}"]`).first();
  assert(await trigger.count(), `course agent trigger must exist for ${triggerId}`);

  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  await waitForDrawerState(page, 'true');

  const drawer = page.locator('[data-course-agent-drawer]');
  const input = page.locator('[data-course-agent-input]');
  const submit = page.locator('[data-course-agent-submit]');
  const feedback = page.locator('[data-course-agent-feedback]');

  assert(await input.count(), 'course agent drawer must include textarea[data-course-agent-input]');
  assert(await submit.count(), 'course agent drawer must include button[data-course-agent-submit]');

  const isFocused = await input.evaluate((element) => document.activeElement === element);
  assert(isFocused, 'course agent textarea must receive focus when drawer opens');

  await submit.click();
  let feedbackText = (await feedback.textContent())?.trim() || '';
  assert(/écris|reponse|réponse|avant/i.test(feedbackText), 'empty course agent submit must be refused with a visible message');

  const userProbe = '<strong data-course-agent-user-probe>mauvais HTML</strong>';
  await input.fill(userProbe);
  await submit.click();
  feedbackText = (await feedback.textContent())?.trim() || '';

  assert(/Mode préparation/i.test(feedbackText), 'non-empty course agent submit must display preparation feedback');
  assert(feedbackText.includes(triggerId), 'mock feedback must mention the active context id');

  const htmlProbeCount = await page.locator('[data-course-agent-user-probe]').count();
  assert(htmlProbeCount === 0, 'student answer must not be inserted as HTML');

  const richEcho = await feedback.evaluate((element) => element.innerHTML.includes('<strong'));
  assert(!richEcho, 'course agent feedback must not render the student answer as HTML');

  await page.keyboard.press('Escape');
  await waitForDrawerState(page, 'false');

  const triggerRefocused = await trigger.evaluate((element) => document.activeElement === element);
  assert(triggerRefocused, 'closing the course agent with Escape must return focus to the opening trigger');
}

async function assertCloseButton(page, triggerId) {
  const trigger = page.locator(`[data-course-agent-open="${triggerId}"]`).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  await waitForDrawerState(page, 'true');
  await page.locator('[data-course-agent-close]').first().click();
  await waitForDrawerState(page, 'false');
}

async function assertDrawerViewport(page, triggerId, viewport) {
  await page.setViewportSize(viewport);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-course-agent-open]');

  const trigger = page.locator(`[data-course-agent-open="${triggerId}"]`).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  await waitForDrawerState(page, 'true');
  await page.waitForFunction(() => {
    const input = document.querySelector('[data-course-agent-input]');
    return document.activeElement === input;
  }, null, { timeout: 3000 });

  const metrics = await page.evaluate(() => {
    const drawer = document.querySelector('[data-course-agent-drawer]');
    const panel = document.querySelector('.course-agent__panel');
    const input = document.querySelector('[data-course-agent-input]');
    const panelBox = panel?.getBoundingClientRect();

    return {
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
      drawerOpen: drawer?.getAttribute('data-open'),
      inputFocused: document.activeElement === input,
      panelWidth: panelBox?.width || 0,
      panelHeight: panelBox?.height || 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  });

  assert(metrics.drawerOpen === 'true', 'course agent drawer must open in viewport test');
  assert(metrics.inputFocused, 'course agent textarea must focus in viewport test');
  assert(metrics.pageOverflow <= 1, `course agent drawer must not create horizontal overflow: ${metrics.pageOverflow}px`);
  assert(metrics.panelWidth <= metrics.windowWidth, `course agent panel must fit viewport width: ${metrics.panelWidth}px`);
  assert(metrics.panelHeight <= metrics.windowHeight * 0.74, `course agent panel must stay near the 70vh cap: ${metrics.panelHeight}px`);
}

async function assertFeynmanInteraction(page) {
  await page.evaluate(() => {
    localStorage.removeItem('outilPrepa:feynman:v1');
  });

  const section = page.locator('[data-feynman]').first();
  const input = page.locator('[data-feynman-input]').first();
  const submit = page.locator('[data-feynman-submit]').first();
  const reset = page.locator('[data-feynman-reset]').first();
  const feedback = page.locator('[data-feynman-feedback]').first();

  assert(await section.count(), 'Feynman section must be present in the rendered course');
  assert(await input.count(), 'Feynman textarea must be present');
  assert(await submit.count(), 'Feynman submit button must be present');
  assert(await reset.count(), 'Feynman reset button must be present');
  assert(await feedback.count(), 'Feynman feedback region must be present');

  await section.scrollIntoViewIfNeeded();
  await submit.click();
  let feedbackText = (await feedback.textContent())?.trim() || '';
  assert(/écris|ecris|quelques lignes/i.test(feedbackText), 'empty Feynman submit must be refused with a visible message');

  const htmlProbe = '<strong data-feynman-user-probe>Delta negatif donne deux racines</strong>';
  await input.fill(htmlProbe);
  await submit.click();
  await page.waitForFunction(() => {
    const region = document.querySelector('[data-feynman-feedback]');
    return /Mode local sans IA|Mode mock|Point solide|relecture/i.test(region?.textContent || '');
  }, null, { timeout: 3000 });

  feedbackText = (await feedback.textContent())?.trim() || '';
  assert(/Mode local sans IA|Mode mock/i.test(feedbackText), 'Feynman submit without a hosted API must show an explicit fallback or mock message');
  assert(/relecture|prochaine tentative|corriger/i.test(feedbackText), 'Feynman fallback must give a concrete rereading instruction');

  const htmlProbeCount = await page.locator('[data-feynman-user-probe]').count();
  assert(htmlProbeCount === 0, 'Feynman answer must not be inserted as HTML');

  const richEcho = await feedback.evaluate((element) => element.innerHTML.includes('<strong'));
  assert(!richEcho, 'Feynman feedback must render as text, not student HTML');

  const saved = await page.evaluate(() => {
    const raw = localStorage.getItem('outilPrepa:feynman:v1');
    return raw ? JSON.parse(raw) : null;
  });
  assert(saved && saved.courses, 'Feynman submission must create course-scoped local storage');
  assert(
    saved.courses['maths-specialite-premiere-second-degre']?.studentText?.includes('Delta negatif'),
    'Feynman local storage must keep the latest attempt for this course',
  );

  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-feynman-input]');
  const restoredValue = await page.locator('[data-feynman-input]').first().inputValue();
  assert(restoredValue.includes('Delta negatif'), 'Feynman textarea must restore the last local attempt after reload');

  await page.locator('[data-feynman-reset]').first().click();
  const clearedValue = await page.locator('[data-feynman-input]').first().inputValue();
  assert(clearedValue === '', 'Feynman reset must clear the textarea');
  const afterReset = await page.evaluate(() => {
    const raw = localStorage.getItem('outilPrepa:feynman:v1');
    return raw ? JSON.parse(raw) : null;
  });
  assert(
    !afterReset?.courses?.['maths-specialite-premiere-second-degre'],
    'Feynman reset must clear the saved attempt for this course',
  );

  const longText = Array.from({ length: 90 }, (_, index) => `Phrase ${index + 1} sur le discriminant et le signe.`).join(' ');
  await page.locator('[data-feynman-input]').first().fill(longText);
  await page.locator('[data-feynman-submit]').first().click();
  await page.waitForFunction(() => {
    const region = document.querySelector('[data-feynman-feedback]');
    return /Mode local sans IA|Mode mock|Point solide|relecture/i.test(region?.textContent || '');
  }, null, { timeout: 3000 });
  assert(
    ((await page.locator('[data-feynman-feedback]').first().textContent()) || '').length > 40,
    'Feynman long accepted text must produce visible feedback',
  );
}

async function assertFeynmanViewport(page, viewport) {
  await page.setViewportSize(viewport);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('[data-feynman-input]');

  const metrics = await page.evaluate(() => {
    const section = document.querySelector('[data-feynman]');
    const input = document.querySelector('[data-feynman-input]');
    const actions = document.querySelector('.feynman-method__actions');
    const sectionBox = section?.getBoundingClientRect();
    const inputBox = input?.getBoundingClientRect();
    const actionsBox = actions?.getBoundingClientRect();

    return {
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
      sectionWidth: sectionBox?.width || 0,
      inputWidth: inputBox?.width || 0,
      actionsWidth: actionsBox?.width || 0,
      windowWidth: window.innerWidth,
    };
  });

  assert(metrics.pageOverflow <= 1, `Feynman block must not create horizontal overflow: ${metrics.pageOverflow}px`);
  assert(metrics.sectionWidth <= metrics.windowWidth, `Feynman section must fit viewport width: ${metrics.sectionWidth}px`);
  assert(metrics.inputWidth <= metrics.windowWidth, `Feynman textarea must fit viewport width: ${metrics.inputWidth}px`);
  assert(metrics.actionsWidth <= metrics.windowWidth, `Feynman actions must fit viewport width: ${metrics.actionsWidth}px`);
}

async function waitForDrawerState(page, state) {
  await page.waitForFunction((expectedState) => {
    const drawer = document.querySelector('[data-course-agent-drawer]');
    return drawer?.getAttribute('data-open') === expectedState;
  }, state, { timeout: 3000 });
}

const target = process.argv[2] || DEFAULT_TARGET;
const coursePath = resolveTargetPath(target);
assert(existsSync(coursePath), `course target does not exist at ${coursePath}`);

const html = readFileSync(coursePath, 'utf8');
const { manifest, triggerIds } = assertStaticManifestContract(html);
assertStaticFeynmanContract(html, manifest);
const courseUrl = pathToFileURL(coursePath).href;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  const errors = await collectPageErrors(page);

  try {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto(courseUrl, { waitUntil: 'networkidle' });
    await page.waitForSelector('[data-course-agent-open]');
    await assertAgentDiscoverability(page);
    await assertDrawerInteraction(page, triggerIds[0]);
    await assertCloseButton(page, triggerIds[1]);
    await assertFeynmanInteraction(page);
    await assertNoFormulaOverflow(page);

    await assertDrawerViewport(page, triggerIds[2], { width: 390, height: 844 });
    await assertFeynmanViewport(page, { width: 390, height: 844 });
    await assertAgentDiscoverability(page);
    await assertNoFormulaOverflow(page);

    assert(errors.length === 0, `course agent page must not emit console/page errors: ${errors.join(' | ')}`);
  } finally {
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`PASS course agent verification for ${relative(ROOT, coursePath).split(sep).join('/')}: manifest, triggers, quick links, sidebar markers, drawer interactions, Feynman method persistence/fallback, text-only feedback, and overflow checks are valid.`);
