/* ============================================================
   OUTIL PREPA - Page focus
   ------------------------------------------------------------
   Interactions propres au mode focus.
   ============================================================ */
(function () {
  'use strict';

  var ambs = document.querySelectorAll('.amb');
  var rain = document.getElementById('rain');

  ambs.forEach(function (amb) {
    amb.addEventListener('click', function () {
      ambs.forEach(function (other) {
        other.classList.remove('active');
        other.setAttribute('aria-checked', 'false');
      });
      amb.classList.add('active');
      amb.setAttribute('aria-checked', 'true');
      if (rain) rain.classList.toggle('on', amb.dataset.amb === 'rain');
    });
  });

  var playPauseBtn = document.getElementById('playPause');
  var playIcon = document.getElementById('play-icon');
  var pauseIcon = document.getElementById('pause-icon');
  var timerEl = document.getElementById('timer');
  var ringEl = document.getElementById('ring');
  var pctEl = document.querySelector('.pct');
  var progressBarEl = document.querySelector('[data-progress-bar]');
  var progressFillEl = document.querySelector('[data-progress-fill]');
  var donePrimaryAction = document.querySelector('[data-completion-primary]');
  var mission = (window.OutilPrepa && window.OutilPrepa.mission)
    || (window.OutilPrepaModel && window.OutilPrepaModel.DEFAULT_MISSION)
    || {};
  var total = (mission.focusDurationMinutes || 25) * 60;
  var remaining = total;
  var running = true;
  var intervalId = null;
  var completionHandled = false;

  function stepIndex(item, fallbackIndex) {
    var explicit = item.getAttribute('data-mission-index');
    if (explicit !== null && explicit !== '') return Number(explicit) || 0;

    var step = item.getAttribute('data-mission-step');
    if (step !== null && /^\d+$/.test(step)) return Number(step);

    return fallbackIndex;
  }

  function setStepIcon(item, isDone) {
    var box = item.querySelector('.box');
    if (!box) return;
    box.textContent = '';
    if (!isDone) return;

    var icon = document.createElement('i');
    icon.className = 'ph-bold ph-check';
    icon.setAttribute('aria-hidden', 'true');
    box.appendChild(icon);
  }

  function syncStepItem(item, isDone) {
    item.classList.toggle('done', !!isDone);
    item.setAttribute('aria-checked', String(!!isDone));
    setStepIcon(item, !!isDone);
  }

  document.querySelectorAll('.subtask').forEach(function (subtask, fallbackIndex) {
    subtask.setAttribute('role', subtask.getAttribute('role') || 'checkbox');
    subtask.setAttribute('tabindex', subtask.getAttribute('tabindex') || '0');
    subtask.setAttribute('aria-checked', String(subtask.classList.contains('done')));

    function toggleSubtask() {
      var next = !subtask.classList.contains('done');
      syncStepItem(subtask, next);
      if (window.OutilPrepa && typeof window.OutilPrepa.setActionChecked === 'function') {
        window.OutilPrepa.setActionChecked(stepIndex(subtask, fallbackIndex), next);
      }
    }

    subtask.addEventListener('click', toggleSubtask);
    subtask.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggleSubtask();
    });
  });

  function trackFocusEvent(name, props) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track(name, Object.assign({
      page: 'focus',
      subject: mission.subjectId || mission.subjectLabel,
      duration_minutes: Math.round(total / 60),
    }, props || {}));
  }

  function setRunningState(nextRunning) {
    running = nextRunning;
    if (playIcon) playIcon.classList.toggle('fx-icon-hidden', running);
    if (pauseIcon) pauseIcon.classList.toggle('fx-icon-hidden', !running);
    if (playPauseBtn) {
      playPauseBtn.setAttribute('aria-pressed', String(!running));
      playPauseBtn.setAttribute(
        'aria-label',
        running ? 'Mettre le timer en pause' : 'Reprendre le timer'
      );
    }
    if (running) startTimer();
    else stopTimer();
  }

  function updateProgress() {
    if (total <= 0) return;
    var circumference = 276;
    var remainingPct = Math.max(0, Math.min(1, remaining / total));
    var elapsedPct = Math.round((1 - remainingPct) * 100);
    if (ringEl) ringEl.setAttribute('stroke-dashoffset', String(circumference * (1 - remainingPct)));
    if (pctEl) pctEl.textContent = remainingPct === 0 ? '0%' : Math.round(remainingPct * 100) + '%';
    if (progressFillEl) progressFillEl.style.transform = 'scaleX(' + (elapsedPct / 100) + ')';
    if (progressBarEl) progressBarEl.setAttribute('aria-valuenow', String(elapsedPct));
  }

  function timeLabel(seconds) {
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
    var chunks = [];
    if (minutes > 0) chunks.push(minutes + ' minute' + (minutes > 1 ? 's' : ''));
    if (rest > 0 || !chunks.length) chunks.push(rest + ' seconde' + (rest > 1 ? 's' : ''));
    return chunks.join(' et ');
  }

  function renderTimer() {
    if (!timerEl) return;
    var minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    var seconds = String(remaining % 60).padStart(2, '0');
    timerEl.textContent = minutes + ':' + seconds;
    timerEl.setAttribute('aria-label', 'Temps restant : ' + timeLabel(remaining));
  }

  function syncCompletedSteps() {
    document.querySelectorAll('[data-mission-action], .subtask').forEach(function (item) {
      syncStepItem(item, true);
    });
  }

  function showDoneOverlay() {
    var fxDoneEl = document.getElementById('fx-done');
    if (!fxDoneEl) return;
    fxDoneEl.removeAttribute('hidden');
    if (donePrimaryAction && typeof donePrimaryAction.focus === 'function') {
      window.setTimeout(function () {
        try { donePrimaryAction.focus({ preventScroll: true }); } catch (e) { donePrimaryAction.focus(); }
      }, 0);
    }
  }

  function finishFocusSession() {
    if (completionHandled) {
      showDoneOverlay();
      return;
    }
    completionHandled = true;
    remaining = 0;
    setRunningState(false);
    renderTimer();
    updateProgress();
    if (window.OutilPrepa && typeof window.OutilPrepa.completeMissionToday === 'function') {
      window.OutilPrepa.completeMissionToday();
    }
    syncCompletedSteps();
    trackFocusEvent('focus_completed', { completed: true });
    showDoneOverlay();
  }

  function tickTimer() {
    if (!running) return;
    remaining--;
    if (remaining <= 0) {
      finishFocusSession();
      return;
    }
    renderTimer();
    updateProgress();
  }

  function startTimer() {
    if (intervalId || !running || remaining <= 0) return;
    intervalId = window.setInterval(tickTimer, 1000);
  }

  function stopTimer() {
    if (!intervalId) return;
    window.clearInterval(intervalId);
    intervalId = null;
  }

  if (window.OutilPrepa && typeof window.OutilPrepa.startFocusSession === 'function') {
    window.OutilPrepa.startFocusSession();
  }
  trackFocusEvent('focus_started');

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function () {
      var nextRunning = !running;
      setRunningState(nextRunning);
      trackFocusEvent(nextRunning ? 'focus_resumed' : 'focus_paused');
    });
  }

  setRunningState(true);
  if (window.OutilPrepa && typeof window.OutilPrepa.missionCompletedToday === 'function' && window.OutilPrepa.missionCompletedToday()) {
    syncCompletedSteps();
  }
  renderTimer();
  updateProgress();

  document.addEventListener('keydown', function (event) {
    var fxDoneEl = document.getElementById('fx-done');
    var doneIsOpen = fxDoneEl && !fxDoneEl.hasAttribute('hidden');

    if (event.key === 'Escape') {
      if (doneIsOpen) return;
      var exitLink = document.querySelector('.fx-exit, .fx2-exit');
      window.location.href = exitLink ? exitLink.href : 'index.html';
    }
    if (event.code === 'Space' && playPauseBtn && !doneIsOpen) {
      event.preventDefault();
      playPauseBtn.click();
    }
  });

  var startBreakBtn = document.getElementById('startBreak');
  if (startBreakBtn) {
    startBreakBtn.addEventListener('click', function () {
      var fxDoneEl = document.getElementById('fx-done');
      if (fxDoneEl) fxDoneEl.setAttribute('hidden', '');
      total = 5 * 60;
      remaining = 5 * 60;
      completionHandled = false;
      var kicker = document.getElementById('fx-kicker');
      if (kicker) kicker.textContent = 'Pause \u00b7 5 minutes';
      setRunningState(true);
      renderTimer();
      updateProgress();
    });
  }

  var finishMissionBtn = document.getElementById('finishMission');
  if (finishMissionBtn) {
    finishMissionBtn.addEventListener('click', function (event) {
      event.preventDefault();
      finishFocusSession();
    });
  }
})();
