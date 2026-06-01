/* ============================================================
   OBJECTIF LYCEE - UI island: bandeau missions offertes
   ------------------------------------------------------------
   Monte uniquement les elements [data-free-trial-banner].
   Depend de window.OutilPrepa pour lire le store local.
   ============================================================ */
(function (root) {
  'use strict';

  function getStore() {
    return root.OutilPrepa || null;
  }

  function updateBanner(banner) {
    var api = getStore();
    if (!api || !banner) return;

    var countEl = banner.querySelector('[data-free-trial-count]');
    var nounEl = banner.querySelector('[data-free-trial-noun]');
    var hintEl = banner.querySelector('[data-free-trial-hint]');
    var cta = banner.querySelector('[data-free-trial-cta]');

    var remaining = api.freeRemaining();
    var used = api.freeUsed();

    if (api.isLocked()) {
      banner.classList.add('is-locked');
      if (countEl) countEl.textContent = String(api.freeLimit);
      if (nounEl) nounEl.textContent = 'missions complétées';
      if (hintEl) hintEl.textContent = 'Continue — tout est gratuit et open source.';
      if (cta) cta.setAttribute('hidden', '');
      return;
    }

    banner.classList.remove('is-locked');
    if (countEl) countEl.textContent = remaining;
    if (nounEl) nounEl.textContent = remaining === 1 ? 'mission offerte restante' : 'missions offertes';
    if (hintEl) {
      if (used === 0) {
        hintEl.textContent = 'Pas de carte bancaire - coche tes étapes pour avancer.';
      } else {
        hintEl.textContent = 'Tu as déjà terminé ' + used + ' mission' + (used > 1 ? 's' : '') + '. Continue, c\'est offert.';
      }
    }
    if (cta) cta.setAttribute('hidden', '');
  }

  function updateAll() {
    document.querySelectorAll('[data-free-trial-banner]').forEach(updateBanner);
  }

  function init() {
    updateAll();

    var api = getStore();
    if (api && typeof api.subscribe === 'function') {
      api.subscribe(updateAll);
    }
  }

  root.OPFreeTrialBanner = {
    init: init,
    updateAll: updateAll,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : globalThis);
