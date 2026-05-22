/* ============================================================
   OBJECTIF LYCEE - UI island: checklist mission
   ------------------------------------------------------------
   Monte les checklists via data-mission-action ou
   [data-daily-mission-checklist] [data-mission-step].
   Depend de window.OutilPrepa pour persister les etapes.
   ============================================================ */
(function (root) {
  'use strict';

  var WIRED_ATTR = 'data-mission-checklist-wired';

  function getStore() {
    return root.OutilPrepa || null;
  }

  function setCheckIcon(box, isDone) {
    if (!box) return;
    box.textContent = '';
    if (!isDone) return;

    var icon = document.createElement('i');
    icon.className = 'ph-bold ph-check';
    icon.setAttribute('aria-hidden', 'true');
    box.appendChild(icon);
  }

  function syncItem(item, isDone) {
    item.classList.toggle('done', !!isDone);
    item.setAttribute('aria-checked', String(!!isDone));
    setCheckIcon(item.querySelector('.box'), !!isDone);
  }

  function itemIndex(item, fallbackIndex) {
    var explicit = item.getAttribute('data-mission-index');
    if (explicit !== null && explicit !== '') return Number(explicit) || 0;

    var step = item.getAttribute('data-mission-step');
    if (step !== null && /^\d+$/.test(step)) return Number(step);

    return fallbackIndex;
  }

  function toggleItem(item, index) {
    var api = getStore();
    var isDone = !item.classList.contains('done');
    syncItem(item, isDone);

    if (api && typeof api.setActionChecked === 'function') {
      api.setActionChecked(index, isDone);
    }
    if (typeof root.updateStepCounter === 'function') root.updateStepCounter();
  }

  function wireItems(selector) {
    var api = getStore();
    var items = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!items.length) return;

    items.forEach(function (item, fallbackIndex) {
      if (item.getAttribute(WIRED_ATTR) === 'true') return;

      var index = itemIndex(item, fallbackIndex);
      item.setAttribute(WIRED_ATTR, 'true');
      item.setAttribute('role', item.getAttribute('role') || 'checkbox');
      item.setAttribute('tabindex', item.getAttribute('tabindex') || '0');

      var isStoredDone = api && typeof api.isActionChecked === 'function'
        ? api.isActionChecked(index)
        : item.classList.contains('done');
      syncItem(item, isStoredDone);

      item.addEventListener('click', function () {
        toggleItem(item, index);
      });

      item.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleItem(item, index);
      });
    });

    if (typeof root.updateStepCounter === 'function') root.updateStepCounter();
  }

  function init() {
    wireItems('[data-mission-action]');
    wireItems('[data-daily-mission-checklist] [data-mission-step]');
  }

  root.OPMissionChecklist = {
    init: init,
    syncItem: syncItem,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : globalThis);
