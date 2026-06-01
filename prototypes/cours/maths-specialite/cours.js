/*
 * AGENT HEADER
 * Role: runtime partage des prototypes de cours et TD maths specialite.
 * Loaded by: chaque chapitre HTML dans prototypes/cours/maths-specialite/.
 * Reads/writes: rend KaTeX, initialise sidebar, revelations, graphes,
 * tiroir IA et bloc Feynman; persiste outilPrepa:feynman:v1.
 * Public contract: runtime lit data-course-layout/sidebar/toggle,
 * data-section-link, data-reveal, data-chapter-curve, data-feynman*,
 * data-course-id, data-feynman-endpoint; genere data-course-agent-drawer.
 * Discoverability verified only: data-course-agent-entry/jump, .toc-agent-badge.
 * Globals: window.__courseGraphInitializers, window.__OUTIL_PREPA_FEYNMAN_ENDPOINT.
 * Verify: npm run verify:course-sidebar ; npm run verify:course-agent.
 * Read next: `docs/agent-codebase-map.md` Zone 3, `docs/regles-creation-cours-maths.md`.
 */
window.__courseGraphInitializers = window.__courseGraphInitializers || [];

window.addEventListener('DOMContentLoaded', async () => {
  await renderCourseMath();

  for (const button of document.querySelectorAll('[data-reveal]')) {
    button.dataset.closedLabel = button.textContent;

    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.reveal);
      if (!target) return;

      const isHidden = target.hasAttribute('hidden');
      target.toggleAttribute('hidden', !isHidden);

      if (isHidden) {
        button.textContent = button.dataset.closedLabel.includes('corrigé')
          ? 'Masquer le corrigé'
          : 'Masquer la réponse';
      } else {
        button.textContent = button.dataset.closedLabel;
      }
    });
  }

  initCourseSidebar();
  initReadingProgress();
  initLazyCourseGraphs();
  initCourseAgent();
  initFeynmanMethod();
  revealCourseWhenFontsAreReady();
});

const KATEX_RENDER_OPTIONS = {
  delimiters: [
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
  ],
  throwOnError: false,
};

async function renderCourseMath() {
  if (!window.renderMathInElement) return;

  const roots = Array.from(document.querySelectorAll('.course-hero, .course-overview, .chapter-section'));
  const mathRoots = roots.length ? roots : [document.body];

  for (const root of mathRoots) {
    window.renderMathInElement(root, KATEX_RENDER_OPTIONS);
    await yieldToMainThread();
  }
}

function yieldToMainThread() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 0);
  });
}

function revealCourseWhenFontsAreReady() {
  const reveal = () => {
    window.requestAnimationFrame(() => {
      document.body.classList.add('is-course-ready');
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reveal, reveal);
    return;
  }

  reveal();
}

function initCourseSidebar() {
  const layout = document.querySelector('[data-course-layout]');
  const sidebar = document.querySelector('[data-course-sidebar]');
  const toggle = document.querySelector('[data-sidebar-toggle]');
  const links = Array.from(document.querySelectorAll('[data-section-link]'));
  const compactQuery = window.matchMedia('(max-width: 900px)');

  if (!layout || !toggle) return;

  document.body.classList.add('has-course-sidebar');

  const setCollapsed = (isCollapsed, options = {}) => {
    if (isCollapsed && document.activeElement === toggle) {
      toggle.blur();
    }

    layout.classList.toggle('is-sidebar-collapsed', isCollapsed);
    layout.classList.toggle('is-sidebar-expanded', !isCollapsed);
    document.body.classList.toggle('is-course-sidebar-collapsed', isCollapsed);
    document.body.classList.toggle('is-course-sidebar-expanded', !isCollapsed);
    document.body.classList.toggle('is-sidebar-hover-locked', Boolean(options.lockHover && isCollapsed));
    if (isCollapsed) {
      sidebar?.setAttribute('tabindex', '0');
    } else {
      sidebar?.removeAttribute('tabindex');
    }
    toggle.disabled = isCollapsed;
    toggle.setAttribute('aria-hidden', String(isCollapsed));
    toggle.setAttribute('aria-expanded', String(!isCollapsed));
    toggle.setAttribute('aria-label', isCollapsed ? 'Déplier le plan' : 'Replier le plan');
  };

  setCollapsed(compactQuery.matches);

  const handleCompactChange = (event) => {
    if (event.matches) {
      setCollapsed(true);
    }
  };

  if (typeof compactQuery.addEventListener === 'function') {
    compactQuery.addEventListener('change', handleCompactChange);
  } else if (typeof compactQuery.addListener === 'function') {
    compactQuery.addListener(handleCompactChange);
  }

  toggle.addEventListener('click', () => {
    if (layout.classList.contains('is-sidebar-collapsed')) return;
    setCollapsed(true, { lockHover: true });
  });

  sidebar?.addEventListener('pointerdown', (event) => {
    if (layout.classList.contains('is-sidebar-collapsed') && !event.target.closest('[data-section-link]')) {
      event.preventDefault();
    }
  });

  sidebar?.addEventListener('mousedown', (event) => {
    if (layout.classList.contains('is-sidebar-collapsed') && !event.target.closest('[data-section-link]')) {
      event.preventDefault();
    }
  });

  sidebar?.addEventListener('mouseleave', () => {
    document.body.classList.remove('is-sidebar-hover-locked');
  });

  for (const link of links) {
    link.addEventListener('click', () => {
      if (compactQuery.matches) {
        setCollapsed(true, { lockHover: true });
      }
    });
  }

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const setActiveLink = (id) => {
    for (const link of links) {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    let visible = null;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!visible || entry.intersectionRatio > visible.intersectionRatio) {
        visible = entry;
      }
    }
    if (visible) {
      setActiveLink(visible.target.id);
    }
  }, {
    rootMargin: '-20% 0px -58% 0px',
    threshold: [0.08, 0.18, 0.32],
  });

  for (const section of sections) {
    observer.observe(section);
  }

  if (sections[0]) {
    setActiveLink(sections[0].id);
  }
}

function initReadingProgress() {
  const fill = document.querySelector('[data-progress-fill]');
  const bar = document.querySelector('[data-section-bar]');
  const chip = document.querySelector('[data-section-bar-chip]');
  const titleEl = document.querySelector('[data-section-bar-title]');
  const totalEl = document.querySelector('[data-section-bar-total]');
  const hero = document.querySelector('.course-hero');
  const sections = Array.from(document.querySelectorAll('.chapter-section'));
  const total = sections.length;
  let activeId = '';
  let raf = 0;

  if (!fill && !bar && !sections.length) return;
  if (totalEl && total) totalEl.textContent = `1/${total}`;

  const setActiveSection = (section) => {
    if (!section || section.id === activeId) return;
    activeId = section.id;
    const index = sections.indexOf(section);
    const num = section.querySelector('.section-marker__num')?.textContent?.trim() || '';
    const title = section.querySelector('h2')?.textContent?.trim() || '';

    if (chip) chip.textContent = num;
    if (titleEl) titleEl.textContent = title;
    if (totalEl && index !== -1) totalEl.textContent = `${index + 1}/${total}`;
  };

  const updateScrollProgress = () => {
    raf = 0;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
    if (fill) fill.style.transform = `scaleX(${ratio})`;

    const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
    if (bar) bar.classList.toggle('is-visible', heroBottom < 0);
  };

  const scheduleProgressUpdate = () => {
    if (!raf) raf = window.requestAnimationFrame(updateScrollProgress);
  };

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      let visible = null;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!visible || entry.intersectionRatio > visible.intersectionRatio) {
          visible = entry;
        }
      }
      if (visible) setActiveSection(visible.target);
    }, {
      rootMargin: '-18% 0px -58% 0px',
      threshold: [0.08, 0.18, 0.32],
    });

    for (const section of sections) {
      sectionObserver.observe(section);
    }
  }

  if (sections[0]) setActiveSection(sections[0]);
  window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
  window.addEventListener('resize', scheduleProgressUpdate);
  updateScrollProgress();
}

const COURSE_AGENT_INPUT_MAX_LENGTH = 800;
const FEYNMAN_STORAGE_KEY = 'outilPrepa:feynman:v1';
const FEYNMAN_INPUT_MAX_LENGTH = 2500;
const FEYNMAN_DEFAULT_ENDPOINT = '/api/ai/feynman';

function readCourseAgentManifest() {
  const manifestScript = document.querySelector('script[type="application/json"][data-course-agent-contexts]');
  if (!manifestScript) return null;

  try {
    return JSON.parse(manifestScript.textContent || '{}');
  } catch (error) {
    console.warn('Manifeste du tiroir IA illisible.');
    return null;
  }
}

function initCourseAgent() {
  const triggers = Array.from(document.querySelectorAll('[data-course-agent-open]'));
  const manifest = readCourseAgentManifest();

  if (!manifest || !triggers.length) return;

  const contexts = new Map((manifest.contexts || []).map((context) => [context.id, context]));
  if (!contexts.size) return;

  const drawer = createCourseAgentDrawer();
  document.body.appendChild(drawer.root);

  let activeContext = null;
  let activeTrigger = null;

  const closeDrawer = () => {
    if (drawer.root.dataset.open !== 'true') return;

    drawer.root.dataset.open = 'false';
    drawer.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-course-agent-open');

    const triggerToFocus = activeTrigger;
    activeContext = null;
    activeTrigger = null;

    if (triggerToFocus && document.contains(triggerToFocus)) {
      window.requestAnimationFrame(() => {
        triggerToFocus.focus({ preventScroll: true });
      });
    }
  };

  const updateCount = () => {
    if (drawer.input.value.length > COURSE_AGENT_INPUT_MAX_LENGTH) {
      drawer.input.value = drawer.input.value.slice(0, COURSE_AGENT_INPUT_MAX_LENGTH);
    }
    drawer.count.textContent = `${drawer.input.value.length}/${COURSE_AGENT_INPUT_MAX_LENGTH}`;
  };

  const openDrawer = (context, trigger) => {
    activeContext = context;
    activeTrigger = trigger;

    const section = document.getElementById(context.sectionId);
    const sectionTitle = section?.querySelector('h2')?.textContent?.trim() || context.sectionId;

    drawer.title.textContent = manifest.courseTitle || 'Cours';
    drawer.section.textContent = `${sectionTitle} · ${context.entryLabel}`;
    drawer.task.textContent = context.studentTask;
    drawer.context.textContent = context.minimalContext;
    drawer.goal.textContent = context.feedbackGoal;
    drawer.input.value = '';
    drawer.feedback.textContent = 'Écris une réponse, puis prépare le retour contextualisé.';
    updateCount();

    drawer.root.dataset.open = 'true';
    drawer.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-course-agent-open');

    window.requestAnimationFrame(() => {
      drawer.input.focus({ preventScroll: true });
    });
  };

  const submitAnswer = () => {
    if (!activeContext) return;

    const answer = drawer.input.value.trim();
    if (!answer) {
      drawer.feedback.textContent = 'Écris une réponse avant de demander un retour.';
      drawer.input.focus({ preventScroll: true });
      return;
    }

    drawer.feedback.textContent = [
      `Mode préparation : ta réponse sera envoyée avec le contexte "${activeContext.id}".`,
      `Objectif du retour : ${activeContext.feedbackGoal}`,
      'Aucun appel IA réel n’est effectué dans cette tranche.',
    ].join(' ');
  };

  for (const trigger of triggers) {
    const context = contexts.get(trigger.dataset.courseAgentOpen);
    if (!context) continue;

    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', drawer.root.id);
    trigger.addEventListener('click', () => openDrawer(context, trigger));
  }

  drawer.input.addEventListener('input', updateCount);
  drawer.submit.addEventListener('click', submitAnswer);
  drawer.closeButtons.forEach((button) => button.addEventListener('click', closeDrawer));
  drawer.backdrop.addEventListener('click', closeDrawer);
  drawer.root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key === 'Tab') {
      trapCourseAgentFocus(event, drawer.root);
    }
  });
}

function initFeynmanMethod() {
  const root = document.querySelector('[data-feynman]');
  if (!root) return;

  const input = root.querySelector('[data-feynman-input]');
  const submit = root.querySelector('[data-feynman-submit]');
  const reset = root.querySelector('[data-feynman-reset]');
  const feedback = root.querySelector('[data-feynman-feedback]');
  const count = root.querySelector('[data-feynman-count]');

  if (!input || !submit || !reset || !feedback) return;

  const manifest = readCourseAgentManifest();
  const contexts = Array.isArray(manifest?.contexts) ? manifest.contexts : [];
  const context = contexts.find((item) => item.id === root.dataset.feynmanContextId) || null;
  const courseId = manifest?.courseId || root.dataset.courseId || window.location.pathname;

  input.maxLength = FEYNMAN_INPUT_MAX_LENGTH;

  const updateCount = () => {
    if (input.value.length > FEYNMAN_INPUT_MAX_LENGTH) {
      input.value = input.value.slice(0, FEYNMAN_INPUT_MAX_LENGTH);
    }
    if (count) count.textContent = `${input.value.length}/${FEYNMAN_INPUT_MAX_LENGTH}`;
  };

  const setFeedback = (message) => {
    feedback.textContent = message;
  };

  const setLoading = (isLoading) => {
    root.dataset.feynmanLoading = String(isLoading);
    feedback.setAttribute('aria-busy', String(isLoading));
    submit.disabled = isLoading;
    submit.textContent = isLoading ? 'Analyse en cours...' : 'Méthode Feynman : analyser mon explication';
  };

  const savedAttempt = readFeynmanStorage().courses?.[courseId];
  if (savedAttempt?.studentText) {
    input.value = savedAttempt.studentText;
    setFeedback(savedAttempt.feedback || 'Dernière tentative restaurée. Corrige ton texte, puis relance le retour.');
  } else {
    setFeedback('Écris ton explication avec tes mots, puis demande un retour. Le corrigé du cours reste la référence.');
  }
  updateCount();

  const submitAnswer = async () => {
    const studentText = input.value.trim();

    if (!studentText) {
      setFeedback('Écris quelques lignes avec tes mots avant de demander un retour.');
      input.focus({ preventScroll: true });
      return;
    }

    setLoading(true);
    saveFeynmanAttempt(courseId, {
      studentText,
      feedback: '',
      mode: 'pending',
    });

    try {
      const endpoint = getFeynmanEndpoint(root);
      if (!endpoint) {
        const localFeedback = buildFeynmanFallbackFeedback(context);
        saveFeynmanAttempt(courseId, {
          studentText,
          feedback: localFeedback,
          mode: 'local',
        });
        setFeedback(localFeedback);
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentText,
          courseContext: buildFeynmanCourseContext(manifest, context),
          profile: {
            classLevel: 'premiere',
            aiPreferences: {
              tone: 'normal',
              detailLevel: 'progressif',
              allowDeepening: true,
            },
          },
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || 'Le retour IA est indisponible pour le moment.');
      }

      const apiFeedback = typeof data.feedback === 'string' && data.feedback.trim()
        ? data.feedback.trim()
        : buildFeynmanFallbackFeedback(context);

      saveFeynmanAttempt(courseId, {
        studentText,
        feedback: apiFeedback,
        mode: data.mode || 'api',
      });
      setFeedback(apiFeedback);
    } catch (error) {
      const localFeedback = [
        'Mode local sans IA : ton texte est sauvegardé sur cet appareil.',
        'Le service de feedback n’a pas répondu. Relis ta version avec cette consigne : chaque phrase doit dire une idée, une condition, ou une méthode précise.',
        context?.expectedAnswer ? `Compare ensuite avec l’attendu : ${context.expectedAnswer}` : 'Ajoute une phrase sur le moment où tu choisis la méthode, puis une phrase de conclusion.',
      ].join('\n');

      saveFeynmanAttempt(courseId, {
        studentText,
        feedback: localFeedback,
        mode: 'local',
      });
      setFeedback(localFeedback);
    } finally {
      setLoading(false);
    }
  };

  const resetAttempt = () => {
    input.value = '';
    updateCount();
    removeFeynmanAttempt(courseId);
    setFeedback('Nouvelle tentative prête. Écris une explication complète avant de relancer la méthode Feynman.');
    input.focus({ preventScroll: true });
  };

  input.addEventListener('input', updateCount);
  submit.addEventListener('click', submitAnswer);
  reset.addEventListener('click', resetAttempt);
}

function getFeynmanEndpoint(root) {
  const configuredEndpoint = root.dataset.feynmanEndpoint || window.__OUTIL_PREPA_FEYNMAN_ENDPOINT;
  if (configuredEndpoint) return configuredEndpoint;
  if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return '';
  return FEYNMAN_DEFAULT_ENDPOINT;
}

function buildFeynmanCourseContext(manifest, context) {
  const section = context?.sectionId ? document.getElementById(context.sectionId) : null;
  const sectionTitle = section?.querySelector('h2')?.textContent?.trim() || context?.entryLabel || 'Méthode Feynman';

  return {
    courseId: manifest?.courseId || '',
    courseTitle: manifest?.courseTitle || '',
    sectionTitle,
    minimalContext: context?.minimalContext || '',
    expectedAnswer: context?.expectedAnswer || '',
    commonMistakes: Array.isArray(context?.commonMistakes) ? context.commonMistakes : [],
    feedbackGoal: context?.feedbackGoal || '',
  };
}

function buildFeynmanFallbackFeedback(context) {
  const expected = context?.expectedAnswer
    ? `Compare ensuite avec l’attendu : ${context.expectedAnswer}`
    : 'Vérifie que ton texte dit quoi faire, quand le faire, et comment conclure.';
  const trap = Array.isArray(context?.commonMistakes) && context.commonMistakes[0]
    ? `Piège à surveiller : ${context.commonMistakes[0]}`
    : 'Piège à surveiller : ne récite pas une formule sans expliquer son rôle.';

  return [
    'Mode local sans IA : ton texte est sauvegardé sur cet appareil.',
    'Consigne de relecture : surligne une phrase qui explique la méthode, une phrase qui donne une condition, et une phrase qui annonce la conclusion.',
    expected,
    trap,
    'Prochaine tentative : corrige une phrase vague, ajoute un exemple court si nécessaire, puis relance.',
  ].join('\n');
}

function readFeynmanStorage() {
  try {
    const raw = window.localStorage.getItem(FEYNMAN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object' && parsed.courses && typeof parsed.courses === 'object') {
      return parsed;
    }
  } catch (error) {}

  return { version: 1, courses: {} };
}

function writeFeynmanStorage(storage) {
  try {
    window.localStorage.setItem(FEYNMAN_STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {}
}

function saveFeynmanAttempt(courseId, attempt) {
  const storage = readFeynmanStorage();
  storage.version = 1;
  storage.courses = storage.courses || {};
  storage.courses[courseId] = {
    studentText: attempt.studentText,
    feedback: attempt.feedback,
    mode: attempt.mode,
    updatedAt: new Date().toISOString(),
  };
  writeFeynmanStorage(storage);
}

function removeFeynmanAttempt(courseId) {
  const storage = readFeynmanStorage();
  if (storage.courses && Object.prototype.hasOwnProperty.call(storage.courses, courseId)) {
    delete storage.courses[courseId];
    writeFeynmanStorage(storage);
  }
}

function createCourseAgentDrawer() {
  const root = document.createElement('div');
  root.className = 'course-agent';
  root.id = 'course-agent-drawer';
  root.dataset.courseAgentDrawer = '';
  root.dataset.open = 'false';
  root.setAttribute('aria-hidden', 'true');

  const backdrop = document.createElement('button');
  backdrop.className = 'course-agent__backdrop';
  backdrop.type = 'button';
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', 'Fermer le tiroir IA');
  root.appendChild(backdrop);

  const panel = document.createElement('section');
  panel.className = 'course-agent__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'course-agent-title');
  panel.setAttribute('aria-describedby', 'course-agent-task');
  root.appendChild(panel);

  const header = document.createElement('div');
  header.className = 'course-agent__header';
  panel.appendChild(header);

  const headerText = document.createElement('div');
  headerText.className = 'course-agent__header-text';
  header.appendChild(headerText);

  const section = document.createElement('p');
  section.className = 'course-agent__section';
  section.dataset.courseAgentSection = '';
  headerText.appendChild(section);

  const title = document.createElement('h2');
  title.id = 'course-agent-title';
  headerText.appendChild(title);

  const close = document.createElement('button');
  close.className = 'course-agent__icon-button';
  close.type = 'button';
  close.dataset.courseAgentClose = '';
  close.setAttribute('aria-label', 'Fermer le tiroir IA');
  close.textContent = '×';
  header.appendChild(close);

  const task = document.createElement('p');
  task.className = 'course-agent__task';
  task.id = 'course-agent-task';
  task.dataset.courseAgentTask = '';
  panel.appendChild(task);

  const contextGrid = document.createElement('div');
  contextGrid.className = 'course-agent__context-grid';
  panel.appendChild(contextGrid);

  const contextBlock = createCourseAgentInfoBlock('Contexte envoyé');
  contextBlock.value.dataset.courseAgentContext = '';
  contextGrid.appendChild(contextBlock.root);

  const goalBlock = createCourseAgentInfoBlock('But du retour');
  goalBlock.value.dataset.courseAgentGoal = '';
  contextGrid.appendChild(goalBlock.root);

  const label = document.createElement('label');
  label.className = 'course-agent__label';
  label.setAttribute('for', 'course-agent-input');
  label.textContent = 'Ta réponse';
  panel.appendChild(label);

  const input = document.createElement('textarea');
  input.id = 'course-agent-input';
  input.className = 'course-agent__input';
  input.dataset.courseAgentInput = '';
  input.maxLength = COURSE_AGENT_INPUT_MAX_LENGTH;
  input.rows = 5;
  input.placeholder = 'Écris ton raisonnement, pas seulement le résultat.';
  panel.appendChild(input);

  const meta = document.createElement('div');
  meta.className = 'course-agent__meta';
  panel.appendChild(meta);

  const count = document.createElement('span');
  count.className = 'course-agent__count';
  count.textContent = `0/${COURSE_AGENT_INPUT_MAX_LENGTH}`;
  meta.appendChild(count);

  const feedback = document.createElement('p');
  feedback.className = 'course-agent__feedback';
  feedback.dataset.courseAgentFeedback = '';
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  panel.appendChild(feedback);

  const actions = document.createElement('div');
  actions.className = 'course-agent__actions';
  panel.appendChild(actions);

  const closeSecondary = document.createElement('button');
  closeSecondary.className = 'course-agent__button course-agent__button--secondary';
  closeSecondary.type = 'button';
  closeSecondary.dataset.courseAgentClose = '';
  closeSecondary.textContent = 'Fermer';
  actions.appendChild(closeSecondary);

  const submit = document.createElement('button');
  submit.className = 'course-agent__button course-agent__button--primary';
  submit.type = 'button';
  submit.dataset.courseAgentSubmit = '';
  submit.textContent = 'Préparer le retour';
  actions.appendChild(submit);

  return {
    root,
    backdrop,
    title,
    section,
    task,
    context: contextBlock.value,
    goal: goalBlock.value,
    input,
    count,
    feedback,
    submit,
    closeButtons: [close, closeSecondary],
  };
}

function createCourseAgentInfoBlock(labelText) {
  const root = document.createElement('div');
  root.className = 'course-agent__info';

  const label = document.createElement('p');
  label.className = 'course-agent__info-label';
  label.textContent = labelText;
  root.appendChild(label);

  const value = document.createElement('p');
  value.className = 'course-agent__info-value';
  root.appendChild(value);

  return { root, value };
}

function trapCourseAgentFocus(event, drawer) {
  const focusable = Array.from(drawer.querySelectorAll('button:not([disabled]), textarea:not([disabled])'))
    .filter((element) => element.tabIndex >= 0 && (element.offsetWidth > 0 || element.offsetHeight > 0));

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const JSXGRAPH_CSS_URL = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.12.2/distrib/jsxgraph.css';
const JSXGRAPH_JS_URL = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.12.2/distrib/jsxgraphcore.js';
const JSXGRAPH_LOAD_TIMEOUT_MS = 8000;
let jsxGraphLoadPromise = null;

function loadJsxGraph() {
  if (window.JXG) return Promise.resolve(window.JXG);
  if (jsxGraphLoadPromise) return jsxGraphLoadPromise;

  jsxGraphLoadPromise = new Promise((resolve, reject) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      settle(reject, new Error('JSXGraph load timed out'));
    }, JSXGRAPH_LOAD_TIMEOUT_MS);

    const settle = (fn, value) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      fn(value);
    };

    if (!document.querySelector(`link[href="${JSXGRAPH_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = JSXGRAPH_CSS_URL;
      link.dataset.courseJsxgraph = 'true';
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector(`script[src="${JSXGRAPH_JS_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => settle(resolve, window.JXG), { once: true });
      existingScript.addEventListener('error', () => settle(reject, new Error('JSXGraph failed to load')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = JSXGRAPH_JS_URL;
    script.async = true;
    script.dataset.courseJsxgraph = 'true';
    script.addEventListener('load', () => settle(resolve, window.JXG), { once: true });
    script.addEventListener('error', () => settle(reject, new Error('JSXGraph failed to load')), { once: true });
    document.head.appendChild(script);
  });

  return jsxGraphLoadPromise;
}

function initLazyCourseGraphs() {
  const boards = Array.from(document.querySelectorAll('[data-chapter-curve]'));

  if (!boards.length) return;

  const initWhenReady = (element) => {
    if (element.dataset.courseGraphReady === 'true' || element.dataset.courseGraphLoading === 'true') return;
    element.dataset.courseGraphLoading = 'true';

    loadJsxGraph()
      .then(() => {
        window.requestAnimationFrame(() => {
          try {
            runGraphInitializer(element);
            if (element.dataset.courseGraphReady !== 'true') {
              element.dataset.courseGraphReady = 'true';
            }
          } catch (error) {
            setGraphFallback(element);
          } finally {
            delete element.dataset.courseGraphLoading;
          }
        });
      })
      .catch(() => {
        delete element.dataset.courseGraphLoading;
        setGraphFallback(element);
      });
  };

  if (!('IntersectionObserver' in window)) {
    boards.forEach(initWhenReady);
    return;
  }

  const graphObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      graphObserver.unobserve(entry.target);
      initWhenReady(entry.target);
    }
  }, {
    rootMargin: '700px 0px',
    threshold: 0.01,
  });

  for (const board of boards) {
    graphObserver.observe(board);
  }
}

function runGraphInitializer(element) {
  const initializers = window.__courseGraphInitializers || [];
  for (const initializer of initializers) {
    initializer(element);
    if (element.dataset.courseGraphReady === 'true') {
      return;
    }
  }
  setGraphFallback(element);
}

function setGraphFallback(element) {
  element.textContent = 'Le graphe interactif ne peut pas se charger pour le moment.';
}
