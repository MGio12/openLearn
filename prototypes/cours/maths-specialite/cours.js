window.addEventListener('DOMContentLoaded', () => {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
      ],
      throwOnError: false,
    });
  }

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

  for (const element of document.querySelectorAll('[data-derivative-board]')) {
    initDerivativeBoard(element);
  }

  for (const element of document.querySelectorAll('[data-rate-board]')) {
    initRateBoard(element);
  }

  for (const element of document.querySelectorAll('[data-sign-board]')) {
    initSignBoard(element);
  }
});

function initCourseSidebar() {
  const layout = document.querySelector('[data-course-layout]');
  const sidebar = document.querySelector('[data-course-sidebar]');
  const toggle = document.querySelector('[data-sidebar-toggle]');
  const links = Array.from(document.querySelectorAll('[data-section-link]'));
  const compactQuery = window.matchMedia('(max-width: 900px)');

  if (!layout || !toggle) return;

  document.body.classList.add('has-course-sidebar');

  const setCollapsed = (isCollapsed, options = {}) => {
    layout.classList.toggle('is-sidebar-collapsed', isCollapsed);
    layout.classList.toggle('is-sidebar-expanded', !isCollapsed);
    document.body.classList.toggle('is-course-sidebar-collapsed', isCollapsed);
    document.body.classList.toggle('is-course-sidebar-expanded', !isCollapsed);
    document.body.classList.toggle('is-sidebar-hover-locked', Boolean(options.lockHover && isCollapsed));
    toggle.setAttribute('aria-expanded', String(!isCollapsed));
    toggle.setAttribute('aria-label', isCollapsed ? 'Déplier le plan' : 'Replier le plan');
  };

  setCollapsed(false);

  toggle.addEventListener('click', () => {
    const shouldCollapse = !layout.classList.contains('is-sidebar-collapsed');
    setCollapsed(shouldCollapse, { lockHover: shouldCollapse });
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
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

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

const GRAPH_COLORS = {
  coral: '#d96c5f',
  green: '#8bbf5f',
  ink: '#121212',
  teal: '#3f7f8f',
  yellow: '#f4d35e',
};

const derivativeFunction = (x) => 0.28 * x * x + 0.55 * x - 0.8;
const derivativeSlope = (x) => 0.56 * x + 0.55;

function initDerivativeBoard(element) {
  if (!window.JXG) {
    setGraphFallback(element);
    return;
  }

  const readout = element.closest('figure')?.querySelector('[data-derivative-value]');
  const board = createCurveBoard(element, [-4.2, 4.2, 4.2, -3.2]);

  const curve = board.create('functiongraph', [derivativeFunction, -4, 4], {
    strokeColor: GRAPH_COLORS.teal,
    strokeWidth: 4,
    highlight: false,
  });

  const point = board.create('glider', [1, derivativeFunction(1), curve], {
    name: 'A',
    size: 6,
    face: 'o',
    fillColor: GRAPH_COLORS.yellow,
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 3,
    highlightFillColor: '#ffeeb0',
    highlightStrokeColor: GRAPH_COLORS.ink,
    label: {
      fontSize: 18,
      fontWeight: 900,
      offset: [12, 14],
    },
  });

  board.create('tangent', [point], {
    strokeColor: () => slopeState(derivativeSlope(point.X())).color,
    strokeWidth: 3,
    highlight: false,
  });

  board.create('text', [
    -3.8,
    3.65,
    () => `pente de la tangente = ${formatNumber(derivativeSlope(point.X()))}`,
  ], {
    fontSize: 16,
    fixed: true,
    highlight: false,
    cssStyle: 'font-weight: 900;',
  });

  const updateReadout = () => {
    if (!readout) return;
    readout.textContent = `a = ${formatNumber(point.X())} · f'(a) = ${formatNumber(derivativeSlope(point.X()))}`;
  };

  point.on('drag', updateReadout);
  board.on('update', updateReadout);
  updateReadout();
}

function initRateBoard(element) {
  if (!window.JXG) {
    setGraphFallback(element);
    return;
  }

  const readout = element.closest('figure')?.querySelector('[data-rate-value]');
  const board = createCurveBoard(element, [-4.2, 4.2, 4.2, -3.2]);
  const fixedAbscissa = 1;
  const minStep = 0.05;

  const curve = board.create('functiongraph', [derivativeFunction, -4, 4], {
    strokeColor: GRAPH_COLORS.teal,
    strokeWidth: 4,
    highlight: false,
  });

  const pointA = board.create('point', [fixedAbscissa, derivativeFunction(fixedAbscissa)], {
    name: 'A',
    fixed: true,
    size: 5,
    face: 'o',
    fillColor: '#fffdf8',
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 3,
    label: {
      fontSize: 18,
      fontWeight: 900,
      offset: [-24, 14],
    },
  });

  const pointM = board.create('glider', [2.6, derivativeFunction(2.6), curve], {
    name: 'M',
    size: 6,
    face: 'o',
    fillColor: GRAPH_COLORS.yellow,
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 3,
    highlightFillColor: '#ffeeb0',
    highlightStrokeColor: GRAPH_COLORS.ink,
    label: {
      fontSize: 18,
      fontWeight: 900,
      offset: [12, 14],
    },
  });

  board.create('line', [pointA, pointM], {
    strokeColor: GRAPH_COLORS.coral,
    strokeWidth: 3,
    highlight: false,
  });

  const rateText = () => {
    const h = pointM.X() - fixedAbscissa;
    if (Math.abs(h) < minStep) {
      return 'h trop proche de 0';
    }

    return `taux moyen = ${formatNumber(averageRate(fixedAbscissa, h))}`;
  };

  board.create('text', [-3.8, 3.65, rateText], {
    fontSize: 16,
    fixed: true,
    highlight: false,
    cssStyle: 'font-weight: 900;',
  });

  const updateReadout = () => {
    if (!readout) return;

    const h = pointM.X() - fixedAbscissa;
    if (Math.abs(h) < minStep) {
      readout.textContent = `h = ${formatNumber(h)} · h trop proche de 0`;
      return;
    }

    readout.textContent = `h = ${formatNumber(h)} · taux moyen = ${formatNumber(averageRate(fixedAbscissa, h))}`;
  };

  pointM.on('drag', updateReadout);
  board.on('update', updateReadout);
  updateReadout();
}

function initSignBoard(element) {
  if (!window.JXG) {
    setGraphFallback(element);
    return;
  }

  const readout = element.closest('figure')?.querySelector('[data-sign-value]');
  const board = createCurveBoard(element, [-4.2, 4.4, 4.2, -2.5]);
  const f = (x) => 0.3 * (x - 0.2) * (x - 0.2) - 1.6;
  const df = (x) => 0.6 * (x - 0.2);

  const curve = board.create('functiongraph', [f, -4, 4], {
    strokeColor: GRAPH_COLORS.teal,
    strokeWidth: 4,
    highlight: false,
  });

  const point = board.create('glider', [-1.2, f(-1.2), curve], {
    name: 'A',
    size: 6,
    face: 'o',
    fillColor: GRAPH_COLORS.yellow,
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 3,
    highlightFillColor: '#ffeeb0',
    highlightStrokeColor: GRAPH_COLORS.ink,
    label: {
      fontSize: 18,
      fontWeight: 900,
      offset: [12, 14],
    },
  });

  board.create('tangent', [point], {
    strokeColor: () => slopeState(df(point.X())).color,
    strokeWidth: 3,
    highlight: false,
  });

  board.create('text', [-3.8, 3.85, () => slopeState(df(point.X())).label], {
    fontSize: 16,
    fixed: true,
    highlight: false,
    cssStyle: 'font-weight: 900;',
  });

  const updateReadout = () => {
    if (!readout) return;

    readout.textContent = `a = ${formatNumber(point.X())} · ${slopeState(df(point.X())).label}`;
  };

  point.on('drag', updateReadout);
  board.on('update', updateReadout);
  updateReadout();
}

function createCurveBoard(element, boundingbox) {
  return JXG.JSXGraph.initBoard(element.id, {
    boundingbox,
    axis: true,
    grid: true,
    showCopyright: false,
    showNavigation: false,
    pan: { enabled: false },
    zoom: { enabled: false },
  });
}

function averageRate(a, h) {
  return (derivativeFunction(a + h) - derivativeFunction(a)) / h;
}

function slopeState(slope) {
  const epsilon = 0.05;

  if (slope < -epsilon) {
    return {
      color: GRAPH_COLORS.coral,
      label: "f'(a) < 0",
    };
  }

  if (slope > epsilon) {
    return {
      color: GRAPH_COLORS.green,
      label: "f'(a) > 0",
    };
  }

  return {
    color: GRAPH_COLORS.yellow,
    label: "f'(a) = 0",
  };
}

function setGraphFallback(element) {
  element.textContent = 'Le graphe interactif ne peut pas se charger pour le moment.';
}

function formatNumber(value) {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
