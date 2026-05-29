/* ============================================================
   OUTIL PREPA — État partagé (localStorage)
   ------------------------------------------------------------
   Persiste les missions terminées, les jours actifs, le compteur
   de missions offertes restantes. Exposé via window.OutilPrepa.

   Shape stockee (localStorage key: outilPrepa:v1, schemaVersion: 1) :
   {
     profile: {},
     objective: {},
     mission: {},
     missionProgress: {},
     focusSession: {},
     subscriptionState: {},
     schedule: {},
     totalMissionsCompleted: 0,
     activeDays: ["2026-05-13", ...],
     byDate: {
       "2026-05-13": {
         missionId,
         missionTitle,
         actionsChecked: [b, b, b],
         missionCompleted: bool,
         completedAt,
         mood
       }
     }
   }
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'outilPrepa:v1';
  var MAX_STORAGE_BYTES = 512 * 1024;
  var storageWarningShown = false;
  var Model = window.OutilPrepaModel || null;

  if (!Model || typeof Model.todayISO !== 'function') {
    throw new Error('assets/js/state/store.js requires window.OutilPrepaModel.todayISO before loading.');
  }

  var FREE_LIMIT = Model && Model.DEFAULT_SUBSCRIPTION_STATE
    ? Model.DEFAULT_SUBSCRIPTION_STATE.freeMissionLimit
    : 3;
  var FALLBACK_NUM_ACTIONS = 3;

  var todayISO = Model.todayISO;

  function defaultState(date) {
    if (Model && typeof Model.createDefaultAppState === 'function') {
      return Model.createDefaultAppState({ date: date || todayISO() });
    }

    return {
      schemaVersion: 1,
      profile: null,
      objective: null,
      mission: null,
      missionProgress: null,
      focusSession: null,
      subscriptionState: {
        plan: 'free',
        status: 'trial',
        freeMissionLimit: FREE_LIMIT,
        freeMissionsUsed: 0,
        locked: false,
        checkoutUrl: null,
      },
      schedule: null,
      totalMissionsCompleted: 0,
      activeDays: [],
      byDate: {},
    };
  }

  function missionActionCount(currentState) {
    var mission = currentState && currentState.mission;
    return mission && Array.isArray(mission.steps) && mission.steps.length
      ? mission.steps.length
      : FALLBACK_NUM_ACTIONS;
  }

  function ensureDay(state, date) {
    var actionCount = missionActionCount(state);
    if (!state.byDate[date]) {
      state.byDate[date] = {
        missionId: state.mission ? state.mission.id : null,
        missionTitle: null,
        actionsChecked: new Array(actionCount).fill(false),
        missionCompleted: false,
        completedAt: null,
        mood: null,
      };
    }
    if (!Array.isArray(state.byDate[date].actionsChecked)) {
      state.byDate[date].actionsChecked = new Array(actionCount).fill(false);
    }
    while (state.byDate[date].actionsChecked.length < actionCount) {
      state.byDate[date].actionsChecked.push(false);
    }
    if (typeof state.byDate[date].missionCompleted !== 'boolean') {
      state.byDate[date].missionCompleted = false;
    }
    if (!state.byDate[date].missionId && state.mission) {
      state.byDate[date].missionId = state.mission.id;
    }
    if (typeof state.byDate[date].missionTitle === 'undefined') {
      state.byDate[date].missionTitle = null;
    }
    if (typeof state.byDate[date].mood === 'undefined') {
      state.byDate[date].mood = null;
    }
    return state.byDate[date];
  }

  function syncSubscriptionState() {
    if (Model && typeof Model.deriveSubscriptionState === 'function') {
      state.subscriptionState = Model.deriveSubscriptionState(
        state.subscriptionState,
        state.totalMissionsCompleted
      );
      FREE_LIMIT = state.subscriptionState.freeMissionLimit;
      return;
    }

    if (!state.subscriptionState) state.subscriptionState = {};
    state.subscriptionState.freeMissionLimit = FREE_LIMIT;
    state.subscriptionState.freeMissionsUsed = Math.min(
      FREE_LIMIT,
      Math.max(0, state.totalMissionsCompleted)
    );
    state.subscriptionState.locked = state.totalMissionsCompleted >= FREE_LIMIT;
  }

  function syncMissionProgressFromDay(day, date) {
    if (!state.missionProgress && Model && typeof Model.createMissionProgress === 'function') {
      state.missionProgress = Model.createMissionProgress(state.mission, { date: date });
    }
    if (!state.missionProgress) return;

    var existingSteps = Array.isArray(state.missionProgress.stepStates)
      ? state.missionProgress.stepStates
      : [];
    var missionSteps = state.mission && Array.isArray(state.mission.steps)
      ? state.mission.steps
      : [];
    var doneCount = 0;

    state.missionProgress.missionId = day.missionId || state.missionProgress.missionId;
    state.missionProgress.date = date;
    state.missionProgress.stepStates = day.actionsChecked.slice(0, missionActionCount(state)).map(function (isDone, index) {
      var existing = existingSteps[index] || {};
      var missionStep = missionSteps[index] || {};
      if (isDone) doneCount++;
      return {
        stepId: existing.stepId || missionStep.id || 'step-' + (index + 1),
        done: !!isDone,
        completedAt: isDone ? (existing.completedAt || day.completedAt || null) : null,
      };
    });
    state.missionProgress.status = day.missionCompleted
      ? 'completed'
      : doneCount > 0
        ? 'in_progress'
        : 'not_started';
    state.missionProgress.completedAt = day.missionCompleted ? (day.completedAt || state.missionProgress.completedAt) : null;
  }

  function resetTodayForMission(date) {
    date = date || todayISO();
    var actionCount = missionActionCount(state);
    state.byDate[date] = {
      missionId: state.mission ? state.mission.id : null,
      missionTitle: null,
      actionsChecked: new Array(actionCount).fill(false),
      missionCompleted: false,
      completedAt: null,
      mood: null,
    };
    syncMissionProgressFromDay(state.byDate[date], date);
  }

  function normalizeState(rawState) {
    var date = todayISO();
    var next;

    if (Model && typeof Model.normalizeAppState === 'function') {
      next = Model.normalizeAppState(rawState || {}, { date: date });
    } else {
      next = Object.assign(defaultState(date), rawState || {});
    }

    if (!next.byDate) next.byDate = {};
    if (!Array.isArray(next.activeDays)) next.activeDays = [];
    return next;
  }

  function isoOffset(baseIso, offset) {
    var d = new Date(baseIso + 'T00:00:00');
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  }

  var state;
  try {
    var raw = localStorage.getItem(KEY);
    state = normalizeState(raw ? JSON.parse(raw) : null);
  } catch (e) {
    state = normalizeState(null);
  }
  var activeDaySet = new Set(state.activeDays);
  state.activeDays = Array.from(activeDaySet);

  function markActiveDay(date) {
    if (activeDaySet.has(date)) return;
    activeDaySet.add(date);
    state.activeDays.push(date);
  }

  ensureDay(state, todayISO());
  syncMissionProgressFromDay(state.byDate[todayISO()], todayISO());
  syncSubscriptionState();

  function persist() {
    syncSubscriptionState();
    try {
      var serialized = JSON.stringify(state);
      if (serialized.length > MAX_STORAGE_BYTES) {
        if (!storageWarningShown && window.console && typeof window.console.warn === 'function') {
          storageWarningShown = true;
          window.console.warn('OutilPrepa localStorage write skipped: state payload is too large.');
        }
        return;
      }
      localStorage.setItem(KEY, serialized);
    } catch (e) {
      if (!storageWarningShown && window.console && typeof window.console.warn === 'function') {
        storageWarningShown = true;
        window.console.warn('OutilPrepa localStorage write failed', e);
      }
    }
  }

  var listeners = [];
  function emit() {
    listeners.slice().forEach(function (fn) { try { fn(state); } catch (e) {} });
  }

  function streakDays() {
    if (!activeDaySet.size) return 0;
    var latest = null;
    activeDaySet.forEach(function (day) {
      if (!latest || day > latest) latest = day;
    });
    if (!latest) return 0;

    var streak = 1;
    var cursor = latest;
    while (true) {
      cursor = isoOffset(cursor, -1);
      if (!activeDaySet.has(cursor)) break;
      streak++;
    }
    return streak;
  }

  function weekMissionCount() {
    var count = 0;
    var today = todayISO();
    for (var offset = 0; offset >= -6; offset--) {
      var date = isoOffset(today, offset);
      if (state.byDate[date] && state.byDate[date].missionCompleted) count++;
    }
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
    get profile() { return state.profile; },
    get objective() { return state.objective; },
    get mission() { return state.mission; },
    get missionProgress() { return state.missionProgress; },
    get focusSession() { return state.focusSession; },
    get subscriptionState() { return state.subscriptionState; },
    get schedule() { return state.schedule; },
    today: todayISO,
    get freeLimit() {
      syncSubscriptionState();
      return state.subscriptionState.freeMissionLimit;
    },
    freeRemaining: function () {
      syncSubscriptionState();
      return Math.max(0, state.subscriptionState.freeMissionLimit - state.totalMissionsCompleted);
    },
    freeUsed: function () {
      syncSubscriptionState();
      return state.subscriptionState.freeMissionsUsed;
    },
    isLocked: function () {
      syncSubscriptionState();
      return !!state.subscriptionState.locked;
    },
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

      if (next) markActiveDay(todayISO());

      var allDone = day.actionsChecked.slice(0, missionActionCount(state)).every(Boolean);
      if (allDone && !day.missionCompleted) {
        day.completedAt = new Date().toISOString();
        day.missionCompleted = true;
        if (state.mission && state.mission.title) {
          day.missionTitle = state.mission.title;
        }
        state.totalMissionsCompleted++;
      } else if (!allDone && day.missionCompleted) {
        day.missionCompleted = false;
        day.completedAt = null;
        state.totalMissionsCompleted = Math.max(0, state.totalMissionsCompleted - 1);
      }

      syncMissionProgressFromDay(day, todayISO());
      persist();
      emit();
    },
    applyOnboarding: function (answers) {
      answers = answers || {};
      var date = todayISO();
      var completedAt = answers.completedAt || new Date().toISOString();
      var payload = Object.assign({}, answers, { completedAt: completedAt });

      state.onboarding = payload;

      if (Model && typeof Model.createProfileFromOnboarding === 'function') {
        state.profile = Model.createProfileFromOnboarding(payload, state.profile);
      } else if (state.profile) {
        state.profile.email = payload.email || state.profile.email || null;
      }

      if (Model && typeof Model.createObjectiveFromOnboarding === 'function') {
        state.objective = Model.createObjectiveFromOnboarding(payload, state.objective);
      }

      if (Model && typeof Model.createMissionFromOnboarding === 'function') {
        state.mission = Model.createMissionFromOnboarding(payload);
        state.missionProgress = Model.createMissionProgress(state.mission, { date: date });
        state.focusSession = Model.createFocusSession(state.mission);
      }

      resetTodayForMission(date);
      persist();
      emit();
      return state;
    },
    startFocusSession: function () {
      var stamp = new Date().toISOString();
      if (Model && typeof Model.createFocusSession === 'function') {
        if (!state.focusSession || state.focusSession.missionId !== state.mission.id) {
          state.focusSession = Model.createFocusSession(state.mission);
        }
      }
      if (!state.focusSession) return null;

      state.focusSession.status = 'running';
      state.focusSession.startedAt = state.focusSession.startedAt || stamp;
      state.focusSession.pausedAt = null;

      if (state.missionProgress && Array.isArray(state.missionProgress.focusSessionIds)) {
        if (state.missionProgress.focusSessionIds.indexOf(state.focusSession.id) === -1) {
          state.missionProgress.focusSessionIds.push(state.focusSession.id);
        }
      }

      persist();
      emit();
      return state.focusSession;
    },
    completeMissionToday: function () {
      var date = todayISO();
      var day = ensureDay(state, date);
      var wasCompleted = !!day.missionCompleted;
      var stamp = new Date().toISOString();
      var actionCount = missionActionCount(state);

      day.actionsChecked = new Array(actionCount).fill(true);
      day.missionId = state.mission ? state.mission.id : day.missionId;
      day.missionTitle = state.mission && state.mission.title ? state.mission.title : day.missionTitle;
      day.missionCompleted = true;
      day.completedAt = day.completedAt || stamp;

      markActiveDay(date);
      if (!wasCompleted) {
        state.totalMissionsCompleted++;
      }

      syncMissionProgressFromDay(day, date);

      if (state.focusSession) {
        state.focusSession.status = 'completed';
        state.focusSession.endedAt = state.focusSession.endedAt || stamp;
        state.focusSession.completedAt = state.focusSession.completedAt || stamp;
        state.focusSession.completedStepIds = state.missionProgress && Array.isArray(state.missionProgress.stepStates)
          ? state.missionProgress.stepStates.map(function (step) { return step.stepId; })
          : [];
      }

      persist();
      emit();
      return state.missionProgress;
    },
    missionCompletedToday: function () {
      var day = state.byDate[todayISO()];
      return day ? !!day.missionCompleted : false;
    },
    setMood: function (mood) {
      var validMoods = ['calm', 'tense', 'tired'];
      if (mood !== null && validMoods.indexOf(mood) === -1) return;
      var day = ensureDay(state, todayISO());
      if (day.mood === mood) return;
      day.mood = mood;
      persist();
      emit();
    },
    getMood: function (date) {
      var iso = date || todayISO();
      var day = state.byDate[iso];
      return day && day.mood ? day.mood : null;
    },
    yesterdayEntry: function () {
      var d = new Date();
      d.setDate(d.getDate() - 1);
      var iso = d.toISOString().slice(0, 10);
      var day = state.byDate[iso];
      if (!day) return null;
      return {
        date: iso,
        missionTitle: day.missionTitle || null,
        missionCompleted: !!day.missionCompleted,
      };
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
          active: activeDaySet.has(iso),
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
      state = defaultState(todayISO());
      activeDaySet = new Set(state.activeDays);
      ensureDay(state, todayISO());
      syncMissionProgressFromDay(state.byDate[todayISO()], todayISO());
      syncSubscriptionState();
      persist();
      emit();
    },
  };

  window.OutilPrepa = api;
})();
