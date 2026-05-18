/* ============================================================
   OUTIL PREPA - Helpers DOM partages
   ------------------------------------------------------------
   Doit etre charge AVANT mission-ui.js, user-context-ui.js et
   demo-fixtures.js qui consomment setText().
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
