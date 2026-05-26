/* ============================================================
   OUTIL PREPA — État partagé (localStorage)
   ------------------------------------------------------------
   Persiste les missions terminées, les jours actifs, le compteur
   de missions offertes restantes. Exposé via window.OutilPrepa.

   Shape stockee (key: outilPrepa:v1) :
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
  var Model = window.OutilPrepaModel || null;
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

  var state;
  try {
    var raw = localStorage.getItem(KEY);
    state = normalizeState(raw ? JSON.parse(raw) : null);
  } catch (e) {
    state = normalizeState(null);
  }
  ensureDay(state, todayISO());
  syncMissionProgressFromDay(state.byDate[todayISO()], todayISO());
  syncSubscriptionState();

  function persist() {
    syncSubscriptionState();
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

      if (next && state.activeDays.indexOf(todayISO()) === -1) {
        state.activeDays.push(todayISO());
      }

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

      if (state.activeDays.indexOf(date) === -1) {
        state.activeDays.push(date);
      }
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
      state = defaultState(todayISO());
      ensureDay(state, todayISO());
      syncMissionProgressFromDay(state.byDate[todayISO()], todayISO());
      syncSubscriptionState();
      persist();
      emit();
    },
  };

  window.OutilPrepa = api;
})();
