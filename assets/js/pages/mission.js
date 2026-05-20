/* ============================================================
   OUTIL PREPA - Page mission
   ------------------------------------------------------------
   Interactions propres a la fiche mission.
   ============================================================ */
(function () {
  'use strict';

  function setChecklistState(item, isDone) {
    item.classList.toggle('done', isDone);
    item.setAttribute('aria-checked', String(isDone));

    var box = item.querySelector('.box');
    if (box) {
      box.textContent = '';
      if (isDone) {
        var icon = document.createElement('i');
        icon.className = 'ph-bold ph-check';
        icon.setAttribute('aria-hidden', 'true');
        box.appendChild(icon);
      }
    }
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
