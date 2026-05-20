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

  document.querySelectorAll('.subtask').forEach(function (subtask) {
    subtask.addEventListener('click', function () {
      subtask.classList.toggle('done');
      var box = subtask.querySelector('.box');
      if (box) {
        box.textContent = '';
        if (subtask.classList.contains('done')) {
          var icon = document.createElement('i');
          icon.className = 'ph-bold ph-check';
          icon.setAttribute('aria-hidden', 'true');
          box.appendChild(icon);
        }
      }
    });
  });

  var playPauseBtn = document.getElementById('playPause');
  var playIcon = document.getElementById('play-icon');
  var pauseIcon = document.getElementById('pause-icon');
  var timerEl = document.getElementById('timer');
  var ringEl = document.getElementById('ring');
  var pctEl = document.querySelector('.pct');
  var mission = (window.OutilPrepa && window.OutilPrepa.mission)
    || (window.OutilPrepaModel && window.OutilPrepaModel.DEFAULT_MISSION)
    || {};
  var total = (mission.focusDurationMinutes || 25) * 60;
  var remaining = Math.max(0, total - 22);
  var running = true;
  var completionHandled = false;

  function setRunningState(nextRunning) {
    running = nextRunning;
    if (playIcon) playIcon.classList.toggle('fx-icon-hidden', running);
    if (pauseIcon) pauseIcon.classList.toggle('fx-icon-hidden', !running);
  }

  function updateRing() {
    if (!ringEl || !pctEl || total <= 0) return;
    var circumference = 276;
    var pct = remaining / total;
    ringEl.setAttribute('stroke-dashoffset', String(circumference * (1 - pct)));
    pctEl.textContent = Math.round(pct * 100) + '%';
  }

  function renderTimer() {
    if (!timerEl) return;
    var minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    var seconds = String(remaining % 60).padStart(2, '0');
    timerEl.textContent = minutes + ':' + seconds;
  }

  function showDoneOverlay() {
    var fxDoneEl = document.getElementById('fx-done');
    if (fxDoneEl) fxDoneEl.removeAttribute('hidden');
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
    if (ringEl) ringEl.setAttribute('stroke-dashoffset', '276');
    if (pctEl) pctEl.textContent = '0%';
    if (window.OutilPrepa && typeof window.OutilPrepa.completeMissionToday === 'function') {
      window.OutilPrepa.completeMissionToday();
    }
    showDoneOverlay();
  }

  if (window.OutilPrepa && typeof window.OutilPrepa.startFocusSession === 'function') {
    window.OutilPrepa.startFocusSession();
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function () {
      setRunningState(!running);
    });
  }

  setRunningState(true);
  renderTimer();
  updateRing();

  setInterval(function () {
    if (!running) return;
    remaining--;
    if (remaining <= 0) {
      finishFocusSession();
      return;
    }
    renderTimer();
    updateRing();
  }, 1000);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var exitLink = document.querySelector('.fx-exit, .fx2-exit');
      window.location.href = exitLink ? exitLink.href : 'index.html';
    }
    if (event.code === 'Space' && playPauseBtn) {
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
      updateRing();
    });
  }

  var finishMissionBtn = document.getElementById('finishMission');
  if (finishMissionBtn) {
    finishMissionBtn.addEventListener('click', finishFocusSession);
  }
})();
