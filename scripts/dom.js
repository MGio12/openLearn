/* ============================================================
   OUTIL PREPA - Helpers DOM partages
   ------------------------------------------------------------
   Doit etre charge AVANT mission-ui.js et user-context-ui.js,
   qui consomment setText().
   ============================================================ */
(function (root) {
  'use strict';

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  root.OutilPrepaDom = { setText: setText };
})(typeof window !== 'undefined' ? window : globalThis);
