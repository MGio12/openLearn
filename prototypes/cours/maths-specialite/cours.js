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

  for (const element of document.querySelectorAll('[data-course-curve]')) {
    initCourseCurveBoard(element);
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

  setCollapsed(false);

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

function initCourseCurveBoard(element) {
  if (!window.JXG) {
    setGraphFallback(element);
    return;
  }

  const curveType = element.dataset.courseCurve;

  if (curveType === 'orientation') {
    initQuadraticOrientationBoard(element);
    return;
  }

  if (curveType === 'canonical') {
    initQuadraticCanonicalBoard(element);
    return;
  }

  if (curveType === 'discriminant') {
    initQuadraticDiscriminantBoard(element);
    return;
  }

  if (curveType === 'sign') {
    initQuadraticSignBoard(element);
    return;
  }

  if (curveType === 'profit') {
    initQuadraticProfitBoard(element);
    return;
  }

  if (curveType === 'position') {
    initQuadraticPositionBoard(element);
  }
}

function initQuadraticOrientationBoard(element) {
  const board = createCurveBoard(element, [-4.5, 4, 4.5, -3.5]);
  const minimum = (x) => 0.42 * (x + 1.4) * (x + 1.4) - 2.2;
  const maximum = (x) => -0.42 * (x - 1.5) * (x - 1.5) + 2.4;

  addFunctionCurve(board, minimum, -4.2, 1.8, GRAPH_COLORS.teal);
  addFunctionCurve(board, maximum, -1.4, 4.2, GRAPH_COLORS.coral);
  addPoint(board, [-1.4, -2.2], 'min', GRAPH_COLORS.yellow, [-30, -24]);
  addPoint(board, [1.5, 2.4], 'max', GRAPH_COLORS.yellow, [12, 14]);
  addGraphText(board, -4.05, 3.35, 'a > 0 : minimum', GRAPH_COLORS.teal);
  addGraphText(board, 1.05, -2.65, 'a < 0 : maximum', GRAPH_COLORS.coral);
}

function initQuadraticCanonicalBoard(element) {
  const board = createCurveBoard(element, [-2, 2, 6, -6.2]);
  const f = (x) => 2 * (x - 2) * (x - 2) - 5;

  addFunctionCurve(board, f, -0.2, 4.2, GRAPH_COLORS.teal);
  board.create('line', [[2, -6], [2, 2]], {
    dash: 2,
    straightFirst: false,
    straightLast: false,
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 2,
    highlight: false,
  });
  addPoint(board, [2, -5], 'S(2 ; -5)', GRAPH_COLORS.yellow, [12, -24]);
  addGraphText(board, 2.12, 1.35, 'axe x = 2', GRAPH_COLORS.ink);
}

function initQuadraticDiscriminantBoard(element) {
  const board = createCurveBoard(element, [-4.6, 3.4, 4.6, -2.4]);
  const noRoot = (x) => 0.55 * (x + 2.8) * (x + 2.8) + 0.6;
  const doubleRoot = (x) => 0.55 * x * x;
  const twoRoots = (x) => 0.55 * (x - 2.4) * (x - 2.4) - 1.05;

  addFunctionCurve(board, noRoot, -4.4, -1.15, GRAPH_COLORS.coral);
  addFunctionCurve(board, doubleRoot, -1.65, 1.65, GRAPH_COLORS.yellow);
  addFunctionCurve(board, twoRoots, 0.65, 4.25, GRAPH_COLORS.teal);
  addPoint(board, [0, 0], 'racine double', GRAPH_COLORS.yellow, [-42, -25]);
  addPoint(board, [2.4 - Math.sqrt(1.05 / 0.55), 0], '', GRAPH_COLORS.teal, [0, 0]);
  addPoint(board, [2.4 + Math.sqrt(1.05 / 0.55), 0], '', GRAPH_COLORS.teal, [0, 0]);
  addGraphText(board, -4.35, 2.7, 'Delta < 0', GRAPH_COLORS.coral);
  addGraphText(board, -0.9, 2.7, 'Delta = 0', GRAPH_COLORS.ink);
  addGraphText(board, 1.75, 2.7, 'Delta > 0', GRAPH_COLORS.teal);
}

function initQuadraticSignBoard(element) {
  const board = createCurveBoard(element, [-5.2, 12, 6.2, -18]);
  const f = (x) => x * x - 2 * x - 15;

  addFunctionCurve(board, f, -4.6, 5.8, GRAPH_COLORS.teal);
  addPoint(board, [-3, 0], '-3', GRAPH_COLORS.yellow, [-18, 16]);
  addPoint(board, [5, 0], '5', GRAPH_COLORS.yellow, [12, 16]);
  addPoint(board, [1, -16], 'sous l\'axe', GRAPH_COLORS.coral, [12, -12]);
  board.create('segment', [[-3, -0.7], [5, -0.7]], {
    strokeColor: GRAPH_COLORS.coral,
    strokeWidth: 5,
    highlight: false,
  });
  addGraphText(board, -1.2, -3.4, 'zone negative', GRAPH_COLORS.coral);
}

function initQuadraticProfitBoard(element) {
  const board = createCurveBoard(element, [0, 15000, 800, -2500]);
  const b = (x) => -0.1 * x * x + 77 * x - 1500;

  addFunctionCurve(board, b, 0, 770, GRAPH_COLORS.teal);
  addPoint(board, [20, 0], '20', GRAPH_COLORS.yellow, [12, 18]);
  addPoint(board, [750, 0], '750', GRAPH_COLORS.yellow, [-34, 18]);
  addPoint(board, [385, 13322.5], 'maximum', GRAPH_COLORS.yellow, [12, -18]);
  addGraphText(board, 300, 14300, 'sommet : x = 385', GRAPH_COLORS.ink);
}

function initQuadraticPositionBoard(element) {
  const board = createCurveBoard(element, [0, 7, 7, -5]);
  const f = (x) => -x * x + 8 * x - 11;
  const g = (x) => x - 1;

  addFunctionCurve(board, f, 0.35, 6.7, GRAPH_COLORS.teal);
  addFunctionCurve(board, g, 0, 7, GRAPH_COLORS.coral);
  addPoint(board, [2, 1], '2', GRAPH_COLORS.yellow, [-24, 16]);
  addPoint(board, [5, 4], '5', GRAPH_COLORS.yellow, [12, 16]);
  board.create('segment', [[2, 0.35], [5, 0.35]], {
    strokeColor: GRAPH_COLORS.green,
    strokeWidth: 5,
    highlight: false,
  });
  addGraphText(board, 2.55, 5.9, 'Cf au-dessus', GRAPH_COLORS.green);
  addGraphText(board, 5.45, 5.1, 'Cg', GRAPH_COLORS.coral);
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

function addFunctionCurve(board, fn, start, end, color) {
  return board.create('functiongraph', [fn, start, end], {
    strokeColor: color,
    strokeWidth: 4,
    highlight: false,
  });
}

function addPoint(board, coordinates, name, color, offset) {
  return board.create('point', coordinates, {
    name,
    fixed: true,
    size: 5,
    face: 'o',
    fillColor: color,
    strokeColor: GRAPH_COLORS.ink,
    strokeWidth: 3,
    highlight: false,
    label: {
      fontSize: 16,
      fontWeight: 900,
      offset,
    },
  });
}

function addGraphText(board, x, y, label, color) {
  return board.create('text', [x, y, label], {
    fixed: true,
    highlight: false,
    fontSize: 15,
    strokeColor: color,
    cssStyle: `font-weight: 900; color: ${color};`,
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
