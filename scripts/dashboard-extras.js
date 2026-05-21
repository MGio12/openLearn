/* ============================================================
   OBJECTIF LYCÉE — Dashboard extras
   ------------------------------------------------------------
   Hydrate le rituel d'entrée du dashboard :
   - Bandeau "Hier" : lit OutilPrepa.yesterdayEntry(), fallback démo
     si aucune donnée stockée (cohérent avec la maquette statique).
   - Mood/énergie check : 3 chips persistés via OutilPrepa.setMood().
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

  function wireMoodChips() {
    var container = document.querySelector('[data-mood-check]');
    if (!container) return;
    var chips = Array.prototype.slice.call(container.querySelectorAll('[data-mood-value]'));
    if (!chips.length) return;
    var ack = container.querySelector('[data-mood-feedback]');
    var ackTimer = null;

    function setActive(value) {
      chips.forEach(function (chip) {
        var isActive = chip.getAttribute('data-mood-value') === value;
        chip.setAttribute('aria-checked', String(isActive));
      });
    }

    function flashAck() {
      if (!ack) return;
      ack.removeAttribute('hidden');
      requestAnimationFrame(function () { ack.classList.add('is-visible'); });
      if (ackTimer) clearTimeout(ackTimer);
      ackTimer = setTimeout(function () {
        ack.classList.remove('is-visible');
        setTimeout(function () { ack.setAttribute('hidden', ''); }, 220);
      }, 2200);
    }

    var initial = window.OutilPrepa && typeof window.OutilPrepa.getMood === 'function'
      ? window.OutilPrepa.getMood()
      : null;
    setActive(initial);

    function selectMood(value) {
      setActive(value);
      if (window.OutilPrepa && typeof window.OutilPrepa.setMood === 'function') {
        window.OutilPrepa.setMood(value);
      }
      flashAck();
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        selectMood(chip.getAttribute('data-mood-value'));
      });
      chip.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        var index = chips.indexOf(chip);
        var nextIndex = event.key === 'ArrowRight'
          ? (index + 1) % chips.length
          : (index - 1 + chips.length) % chips.length;
        chips[nextIndex].focus();
        selectMood(chips[nextIndex].getAttribute('data-mood-value'));
      });
    });
  }

  function wireWhyPanel() {
    var toggle = document.querySelector('[data-why-toggle]');
    var mission = document.querySelector('[data-contract="daily-mission"], [data-testid="daily-mission"]');
    var panel = document.getElementById('ap-why-panel');
    var overlay = document.querySelector('[data-why-overlay]');
    var svg = document.querySelector('[data-why-lines]');
    if (!toggle || !mission || !panel || !svg) return;

    var cards = {
      tl: panel.querySelector('[data-why-card="tl"]'),
      tr: panel.querySelector('[data-why-card="tr"]'),
      bl: panel.querySelector('[data-why-card="bl"]'),
      br: panel.querySelector('[data-why-card="br"]')
    };
    if (!cards.tl || !cards.tr || !cards.bl || !cards.br) return;

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var FADE_SEL = '.ap-head, .ap-ritual, .ap-section, .sidebar';
    var mobileQuery = window.matchMedia('(max-width: 900px)');
    var open = false;

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
      var c = {
        tl: rectIn(cards.tl, panelRect),
        tr: rectIn(cards.tr, panelRect),
        bl: rectIn(cards.bl, panelRect),
        br: rectIn(cards.br, panelRect)
      };
      var lines = [
        { sx: c.tl.right, sy: c.tl.bottom, ex: m.left,  ey: m.top    },
        { sx: c.tr.left,  sy: c.tr.bottom, ex: m.right, ey: m.top    },
        { sx: c.bl.right, sy: c.bl.top,    ex: m.left,  ey: m.bottom },
        { sx: c.br.left,  sy: c.br.top,    ex: m.right, ey: m.bottom }
      ];
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

    function onResize() {
      if (open) drawConnectors();
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
        requestAnimationFrame(function () {
          drawConnectors();
          requestAnimationFrame(drawConnectors);
        });
        try { panel.focus({ preventScroll: true }); } catch (e) { panel.focus(); }
        window.addEventListener('resize', onResize);
        document.addEventListener('keydown', onKey);
      } else {
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
        if (open) drawConnectors();
      });
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(function () { if (open) drawConnectors(); });
    }
  }

  ready(function () {
    renderYesterday();
    wireMoodChips();
    wireWhyPanel();
  });
})();
