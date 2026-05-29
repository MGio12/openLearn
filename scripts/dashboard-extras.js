/* ============================================================
   OBJECTIF LYCÉE — Dashboard extras
   ------------------------------------------------------------
   Hydrate le rituel d'entrée du dashboard :
   - Bandeau "Hier" : lit OutilPrepa.yesterdayEntry(), fallback démo
     si aucune donnée stockée (cohérent avec la maquette statique).
   ============================================================ */
(function () {
  'use strict';

  var DEMO_FALLBACK_TITLE = 'DM polynômes';
  var STATE_KEY = 'outilPrepa:v1';

  function isFreshState() {
    try {
      return localStorage.getItem(STATE_KEY) === null;
    } catch (e) {
      return true;
    }
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function renderYesterday() {
    var banner = document.querySelector('[data-yesterday-banner]');
    if (!banner) return;
    var textEl = banner.querySelector('[data-yesterday-text]');
    if (!textEl) return;

    var entry = window.OutilPrepa && typeof window.OutilPrepa.yesterdayEntry === 'function'
      ? window.OutilPrepa.yesterdayEntry()
      : null;

    if (!entry || !entry.missionTitle) {
      // No real yesterday data. Show demo fallback only for a brand-new state
      // (matches the maquette). Otherwise hide to avoid lying to returning users.
      if (!isFreshState()) {
        banner.setAttribute('hidden', '');
        return;
      }
      textEl.textContent = 'Hier · ' + DEMO_FALLBACK_TITLE + ' terminé';
      banner.setAttribute('data-completed', 'true');
      banner.removeAttribute('hidden');
      return;
    }

    var done = !!entry.missionCompleted;
    textEl.textContent = done
      ? 'Hier · ' + entry.missionTitle + ' terminé'
      : 'Hier · ' + entry.missionTitle + ' — étapes en cours';
    banner.setAttribute('data-completed', String(done));
    banner.removeAttribute('hidden');
  }

  function wireWhyPanel() {
    var toggle = document.querySelector('[data-why-toggle]');
    var mission = document.querySelector('[data-daily-mission-container], [data-testid="daily-mission"]');
    var panel = document.getElementById('ap-why-panel');
    var overlay = document.querySelector('[data-why-overlay]');
    var svg = document.querySelector('[data-why-lines]');
    if (!toggle || !mission || !panel || !svg) return;

    var cards = Array.prototype.slice.call(panel.querySelectorAll('[data-why-card]'));
    if (!cards.length) return;

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var FADE_SEL = '.ap-head, .ap-ritual, .ap-section, .sidebar';
    var mobileQuery = window.matchMedia('(max-width: 900px)');
    var open = false;
    var resizeRaf = 0;
    var drawTimer = 0;

    function rectIn(el, originRect) {
      var r = el.getBoundingClientRect();
      return {
        left:   r.left   - originRect.left,
        top:    r.top    - originRect.top,
        right:  r.right  - originRect.left,
        bottom: r.bottom - originRect.top
      };
    }

    function clearSvg() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    }

    function drawConnectors() {
      if (mobileQuery.matches) { clearSvg(); return; }
      var panelRect = panel.getBoundingClientRect();
      if (panelRect.width === 0 || panelRect.height === 0) return;
      var m = rectIn(mission, panelRect);
      var lines = cards.map(function (card) {
        var c = rectIn(card, panelRect);
        var slot = card.getAttribute('data-why-card');

        if (slot === 'tr') {
          return { sx: c.left, sy: c.bottom, ex: m.right, ey: m.top };
        }
        if (slot === 'bl') {
          return { sx: c.right, sy: c.top, ex: m.left, ey: m.bottom };
        }
        if (slot === 'br') {
          return { sx: c.left, sy: c.top, ex: m.right, ey: m.bottom };
        }
        return { sx: c.right, sy: c.bottom, ex: m.left, ey: m.top };
      });
      svg.setAttribute('viewBox', '0 0 ' + Math.ceil(panelRect.width) + ' ' + Math.ceil(panelRect.height));
      svg.setAttribute('preserveAspectRatio', 'none');
      clearSvg();
      lines.forEach(function (p) {
        var line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', String(p.sx));
        line.setAttribute('y1', String(p.sy));
        line.setAttribute('x2', String(p.ex));
        line.setAttribute('y2', String(p.ey));
        line.setAttribute('stroke', '#5F5B57');
        line.setAttribute('stroke-opacity', '0.75');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-dasharray', '4 5');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('vector-effect', 'non-scaling-stroke');
        svg.appendChild(line);
      });
    }

    function setFade(on) {
      var nodes = document.querySelectorAll(FADE_SEL);
      Array.prototype.forEach.call(nodes, function (el) {
        el.classList.toggle('is-faded', !!on);
      });
    }

    function scheduleConnectorDraw(delay) {
      if (drawTimer) clearTimeout(drawTimer);
      drawTimer = setTimeout(function () {
        drawTimer = 0;
        requestAnimationFrame(drawConnectors);
      }, delay || 0);
    }

    function onResize() {
      if (!open || resizeRaf) return;
      resizeRaf = requestAnimationFrame(function () {
        resizeRaf = 0;
        drawConnectors();
      });
    }

    function onKey(e) {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    }

    function setOpen(isOpen) {
      if (isOpen === open) return;
      open = isOpen;
      mission.setAttribute('data-why-open', String(isOpen));
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (overlay) overlay.setAttribute('data-active', String(isOpen));
      setFade(isOpen);
      if (isOpen) {
        try { panel.focus({ preventScroll: true }); } catch (e) { panel.focus(); }
        if (mobileQuery.matches && typeof panel.scrollIntoView === 'function') {
          window.setTimeout(function () {
            panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 0);
        }
        window.addEventListener('resize', onResize);
        document.addEventListener('keydown', onKey);
        scheduleConnectorDraw(240);
      } else {
        if (drawTimer) {
          clearTimeout(drawTimer);
          drawTimer = 0;
        }
        if (resizeRaf) {
          cancelAnimationFrame(resizeRaf);
          resizeRaf = 0;
        }
        clearSvg();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('keydown', onKey);
        try { toggle.focus({ preventScroll: true }); } catch (e) { toggle.focus(); }
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!open);
    });

    if (overlay) {
      overlay.addEventListener('click', function () { setOpen(false); });
    }

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', function () {
        if (open) scheduleConnectorDraw();
      });
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(function () { if (open) scheduleConnectorDraw(); });
    }
  }

  ready(function () {
    renderYesterday();
    wireWhyPanel();
  });
})();
