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
