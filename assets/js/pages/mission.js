/* ============================================================
   OBJECTIF LYCEE - Page mission
   ------------------------------------------------------------
   Interactions propres a mission.html: progression locale de la
   mission et tracking du CTA focus.
   ============================================================ */
(function () {
  'use strict';

  var steps = Array.from(document.querySelectorAll('[data-mission-step]'));
  var counter = document.querySelector('[data-mission-step-counter]');
  var startLink = document.querySelector('[data-mission-start], .mp-cta');

  function missionProps(extra) {
    var mission = window.OutilPrepa && window.OutilPrepa.mission;
    return Object.assign({
      page: 'mission',
      subject: mission && (mission.subjectId || mission.subjectLabel),
      duration_minutes: mission && mission.focusDurationMinutes,
    }, extra || {});
  }

  function trackMission(name, props) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track(name, missionProps(props));
  }

  function trackMissionStep(index, done) {
    trackMission('mission_step_toggled', {
      step: index + 1,
      completed: done,
    });
  }

  function applyStepState(step, done, shouldPersist) {
    var index = Number(step.getAttribute('data-mission-step')) || 0;
    step.classList.toggle('done', done);
    step.setAttribute('aria-checked', String(done));
    if (shouldPersist && window.OutilPrepa && typeof window.OutilPrepa.setActionChecked === 'function') {
      window.OutilPrepa.setActionChecked(index, done);
    }
  }

  function updateCounter() {
    if (!counter) return;
    var done = steps.filter(function (step) { return step.classList.contains('done'); }).length;
    counter.textContent = done + ' / ' + steps.length + ' cochées';
  }

  steps.forEach(function (step) {
    var index = Number(step.getAttribute('data-mission-step')) || 0;
    var initial = window.OutilPrepa && typeof window.OutilPrepa.isActionChecked === 'function'
      ? window.OutilPrepa.isActionChecked(index)
      : false;

    applyStepState(step, initial, false);
    step.addEventListener('click', function () {
      var done = !step.classList.contains('done');
      applyStepState(step, done, true);
      trackMissionStep(index, done);
      updateCounter();
    });
    step.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        step.click();
      }
    });
  });
  updateCounter();

  if (startLink) {
    startLink.addEventListener('click', function () {
      trackMission('mission_started', { source: 'mission_cta' });
    });
  }
})();
