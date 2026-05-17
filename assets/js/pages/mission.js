/* ============================================================
   OUTIL PREPA - Page mission
   ------------------------------------------------------------
   Interactions propres a la fiche mission.
   ============================================================ */
(function () {
  'use strict';

  function setChecklistState(item, isDone) {
    item.classList.toggle('done', isDone);
    item.setAttribute('aria-pressed', String(isDone));

    var box = item.querySelector('.box');
    if (box) box.textContent = isDone ? '\u2713' : '';
  }

  document.querySelectorAll('.checklist .item').forEach(function (item) {
    item.addEventListener('click', function () {
      setChecklistState(item, !item.classList.contains('done'));
    });

    item.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      setChecklistState(item, !item.classList.contains('done'));
    });
  });
})();
