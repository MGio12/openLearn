/* ============================================================
   OUTIL PREPA — État partagé (localStorage)
   ------------------------------------------------------------
   Persiste les missions terminées, les jours actifs, le compteur
   de missions offertes restantes. Exposé via window.OutilPrepa.

   Shape stockée (key: outilPrepa:v1) :
   {
     totalMissionsCompleted: 0,
     activeDays: ["2026-05-13", ...],
     byDate: {
       "2026-05-13": { actionsChecked: [b, b, b], missionCompleted: bool }
     }
   }
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'outilPrepa:v1';
  var FREE_LIMIT = 3;
  var NUM_ACTIONS = 3;

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function defaultState() {
    return { totalMissionsCompleted: 0, activeDays: [], byDate: {} };
  }

  function ensureDay(state, date) {
    if (!state.byDate[date]) {
      state.byDate[date] = {
        actionsChecked: new Array(NUM_ACTIONS).fill(false),
        missionCompleted: false,
      };
    }
    return state.byDate[date];
  }

  var state;
  try {
    var raw = localStorage.getItem(KEY);
    state = raw ? Object.assign(defaultState(), JSON.parse(raw)) : defaultState();
  } catch (e) {
    state = defaultState();
  }
  ensureDay(state, todayISO());

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var listeners = [];
  function emit() {
    listeners.slice().forEach(function (fn) { try { fn(state); } catch (e) {} });
  }

  function streakDays() {
    if (!state.activeDays.length) return 0;
    var days = state.activeDays.slice().sort();
    var streak = 1;
    var prev = new Date(days[days.length - 1] + 'T00:00:00');
    for (var i = days.length - 2; i >= 0; i--) {
      var cur = new Date(days[i] + 'T00:00:00');
      var diff = Math.round((prev - cur) / 86400000);
      if (diff === 1) { streak++; prev = cur; } else break;
    }
    return streak;
  }

  function weekMissionCount() {
    var now = new Date();
    var count = 0;
    Object.keys(state.byDate).forEach(function (date) {
      if (state.byDate[date].missionCompleted) {
        var d = new Date(date + 'T00:00:00');
        var diff = Math.round((now - d) / 86400000);
        if (diff >= 0 && diff <= 6) count++;
      }
    });
    return count;
  }

  function plantStage() {
    var n = state.activeDays.length;
    if (n < 2) return 'seed';
    if (n < 5) return 'sprout';
    if (n < 10) return 'stem';
    if (n < 20) return 'plant';
    return 'bloom';
  }

  var api = {
    get state() { return state; },
    today: todayISO,
    freeLimit: FREE_LIMIT,
    freeRemaining: function () { return Math.max(0, FREE_LIMIT - state.totalMissionsCompleted); },
    freeUsed: function () { return Math.min(FREE_LIMIT, state.totalMissionsCompleted); },
    isLocked: function () { return state.totalMissionsCompleted >= FREE_LIMIT; },
    activeDaysCount: function () { return state.activeDays.length; },
    streakDays: streakDays,
    weekMissionCount: weekMissionCount,
    plantStage: plantStage,
    totalMissions: function () { return state.totalMissionsCompleted; },
    isActionChecked: function (index) {
      var day = state.byDate[todayISO()];
      return day ? !!day.actionsChecked[index] : false;
    },
    setActionChecked: function (index, isChecked) {
      var day = ensureDay(state, todayISO());
      var prev = !!day.actionsChecked[index];
      var next = !!isChecked;
      if (prev === next) return;
      day.actionsChecked[index] = next;

      if (next && state.activeDays.indexOf(todayISO()) === -1) {
        state.activeDays.push(todayISO());
      }

      var allDone = day.actionsChecked.every(Boolean);
      if (allDone && !day.missionCompleted) {
        day.missionCompleted = true;
        state.totalMissionsCompleted++;
      } else if (!allDone && day.missionCompleted) {
        day.missionCompleted = false;
        state.totalMissionsCompleted = Math.max(0, state.totalMissionsCompleted - 1);
      }

      persist();
      emit();
    },
    missionCompletedToday: function () {
      var day = state.byDate[todayISO()];
      return day ? !!day.missionCompleted : false;
    },
    history: function (days) {
      days = days || 7;
      var out = [];
      var now = new Date();
      for (var i = days - 1; i >= 0; i--) {
        var d = new Date(now);
        d.setDate(now.getDate() - i);
        var iso = d.toISOString().slice(0, 10);
        out.push({
          date: iso,
          active: state.activeDays.indexOf(iso) !== -1,
          missionCompleted: state.byDate[iso] ? !!state.byDate[iso].missionCompleted : false,
        });
      }
      return out;
    },
    subscribe: function (fn) {
      listeners.push(fn);
      return function unsubscribe() {
        var i = listeners.indexOf(fn);
        if (i !== -1) listeners.splice(i, 1);
      };
    },
    reset: function () {
      state = defaultState();
      ensureDay(state, todayISO());
      persist();
      emit();
    },
  };

  window.OutilPrepa = api;

  /* ----- Bandeau "missions offertes" — auto-wiring ----- */
  function updateFreeTrialBanner() {
    var banner = document.querySelector('[data-free-trial-banner]');
    if (!banner) return;

    var countEl = banner.querySelector('[data-free-trial-count]');
    var nounEl = banner.querySelector('[data-free-trial-noun]');
    var hintEl = banner.querySelector('[data-free-trial-hint]');
    var cta = banner.querySelector('[data-free-trial-cta]');

    var remaining = api.freeRemaining();
    var used = api.freeUsed();

    if (api.isLocked()) {
      banner.classList.add('is-locked');
      if (countEl) countEl.textContent = '3';
      if (nounEl) nounEl.textContent = 'missions offertes utilisées';
      if (hintEl) hintEl.textContent = 'Tu as essayé. Garde le plan personnalisé pour continuer.';
      if (cta) cta.removeAttribute('hidden');
    } else {
      banner.classList.remove('is-locked');
      if (countEl) countEl.textContent = remaining;
      if (nounEl) nounEl.textContent = remaining === 1 ? 'mission offerte restante' : 'missions offertes';
      if (hintEl) {
        if (used === 0) {
          hintEl.textContent = 'Pas de carte bancaire — coche tes étapes pour avancer.';
        } else {
          hintEl.textContent = 'Tu as déjà terminé ' + used + ' mission' + (used > 1 ? 's' : '') + '. Continue, c\'est offert.';
        }
      }
      if (cta) cta.setAttribute('hidden', '');
    }
  }

  /* ----- Wiring des mission-action — restore + écoute ----- */
  function wireMissionActions() {
    var actions = document.querySelectorAll('.mission-action[data-mission-action]');
    if (!actions.length) return;

    actions.forEach(function (action, index) {
      // Restore initial state from localStorage
      if (api.isActionChecked(index) && !action.classList.contains('done')) {
        action.classList.add('done');
        action.setAttribute('aria-checked', 'true');
      }
      // Observe class changes to sync with state
      var observer = new MutationObserver(function () {
        var isDone = action.classList.contains('done');
        api.setActionChecked(index, isDone);
      });
      observer.observe(action, { attributes: true, attributeFilter: ['class'] });
    });

    // Trigger step-counter recompute if it exists (existing inline script)
    if (typeof window.updateStepCounter === 'function') window.updateStepCounter();
  }

  function init() {
    wireMissionActions();
    updateFreeTrialBanner();
    api.subscribe(updateFreeTrialBanner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
