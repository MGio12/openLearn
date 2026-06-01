/* ============================================================
   AGENT HEADER
   Role: hydrate le contexte utilisateur visible sur les pages app.
   Loaded by: pages racine apres model.js, store.js et scripts/dom.js.
   Reads/writes: lit window.OutilPrepa, window.OutilPrepaModel et
   window.OutilPrepaDom.setText; ecrit les libelles profil, dates,
   semaine, objectif et etat compte local.
   Public contract: data-user-*, data-current-day-*,
   data-today-subtitle, data-week-label, data-planning-subtitle,
   data-objective-*, data-weekday-offset, data-local-account-prompt,
   body[data-local-account-state].
   Verify: npm run verify:local-account ; npm run verify:s01.
   Read next: `docs/agent-codebase-map.md` Zone 1 et Zone 5.

   OUTIL PREPA - Contexte utilisateur visible
   ------------------------------------------------------------
   Hydrate les noms, roles et libelles de date depuis l'etat
   partage. Les valeurs par defaut viennent du profile demo du
   modele, pas des pages HTML.
   ============================================================ */
(function (root) {
  'use strict';

  var CLASS_LABELS = {
    premiere: 'Première',
    terminale: 'Terminale',
  };

  var SUBJECT_LABELS = {
    maths: 'maths',
    'physique-chimie': 'physique',
    svt: 'SVT',
    ses: 'SES',
    hggsp: 'HGGSP',
    'francais-philo': 'français/philo',
    anglais: 'anglais',
    lv2: 'LV2',
    'grand-oral': 'grand oral',
  };

  var TARGET_LABELS = {
    'ecole-ingenieur': 'École d\'ingénieur',
    'ecole-commerce': 'École de commerce',
    'sante-sciences': 'Santé ou sciences',
    'droit-sciencespo': 'Droit / IEP',
    'dossier-solide': 'Dossier lycée solide',
  };

  var WEEKDAYS_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  function getState() {
    return root.OutilPrepa && root.OutilPrepa.state ? root.OutilPrepa.state : {};
  }

  function getProfile() {
    var state = getState();
    if (state.profile) return state.profile;
    if (root.OutilPrepaModel && root.OutilPrepaModel.DEFAULT_PROFILE) {
      return root.OutilPrepaModel.DEFAULT_PROFILE;
    }
    return {};
  }

  function getObjective() {
    var state = getState();
    if (state.objective) return state.objective;
    if (root.OutilPrepaModel && root.OutilPrepaModel.DEFAULT_OBJECTIVE) {
      return root.OutilPrepaModel.DEFAULT_OBJECTIVE;
    }
    return {};
  }

  var todayISO = root.OutilPrepaModel.todayISO;

  function parseISODate(iso) {
    if (!iso) return new Date();
    return new Date(iso + 'T12:00:00');
  }

  function capitalize(value) {
    value = String(value || '');
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  function formatDate(date, options) {
    return capitalize(date.toLocaleDateString('fr-FR', options));
  }

  function addDays(date, amount) {
    var next = new Date(date);
    next.setDate(next.getDate() + amount);
    return next;
  }

  function weekStart(date) {
    var day = date.getDay();
    var diff = day === 0 ? -6 : 1 - day;
    return addDays(date, diff);
  }

  function initialsFromName(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return 'OP';
    return parts.slice(0, 2).map(function (part) {
      return part.charAt(0).toUpperCase();
    }).join('');
  }

  function firstName(profile) {
    if (profile.displayName) return profile.displayName;
    if (profile.fullName) return String(profile.fullName).split(/\s+/)[0];
    return 'élève';
  }

  function fullName(profile) {
    return profile.fullName || profile.displayName || 'Profil démo';
  }

  function roleLabel(profile) {
    var classLabel = CLASS_LABELS[profile.classLevel] || profile.classLevel || 'Lycée';
    var tracks = Array.isArray(profile.tracks) ? profile.tracks : [];
    var trackLabels = tracks.map(function (track) {
      return SUBJECT_LABELS[track] || track;
    }).filter(Boolean);
    return trackLabels.length
      ? classLabel + ' · spé ' + trackLabels.join('/')
      : classLabel;
  }

  function targetLabel(objective) {
    return TARGET_LABELS[objective.targetType]
      || objective.targetLabel
      || 'Objectif lycee';
  }

  var setText = root.OutilPrepaDom.setText;

  function hasLocalAccount(profile) {
    if (root.OutilPrepa && typeof root.OutilPrepa.hasLocalAccount === 'function') {
      return root.OutilPrepa.hasLocalAccount();
    }
    return !!(profile && profile.localAccountId);
  }

  function renderWeekHeaders(date) {
    var start = weekStart(date);
    document.querySelectorAll('[data-weekday-offset]').forEach(function (element) {
      var offset = Number(element.getAttribute('data-weekday-offset')) || 0;
      var current = addDays(start, offset);
      element.textContent = WEEKDAYS_SHORT[current.getDay()] + ' ' + current.getDate();
    });
  }

  function renderAccountPrompts(profile) {
    var isLocalAccount = hasLocalAccount(profile);
    document.body.setAttribute('data-local-account-state', isLocalAccount ? 'ready' : 'missing');
    document.querySelectorAll('[data-local-account-prompt]').forEach(function (element) {
      element.hidden = isLocalAccount;
      element.setAttribute('aria-hidden', String(isLocalAccount));
    });
  }

  function render() {
    var profile = getProfile();
    var objective = getObjective();
    var date = parseISODate(todayISO());
    var start = weekStart(date);
    var profileName = fullName(profile);
    var shortName = firstName(profile);
    var dayLabel = formatDate(date, { weekday: 'long', day: 'numeric', month: 'long' });
    var dayName = formatDate(date, { weekday: 'long' });
    var weekLabel = 'Semaine du ' + formatDate(start, { weekday: 'long', day: 'numeric', month: 'long' }).toLowerCase();
    var objectiveDisplay = targetLabel(objective);
    var trackText = roleLabel(profile).replace(/^.*? · /, '');

    setText('[data-user-initials]', profile.initials || initialsFromName(profileName));
    setText('[data-user-full-name]', profileName);
    setText('[data-user-first-name]', shortName);
    setText('[data-user-role]', roleLabel(profile));
    setText('[data-user-greeting]', 'Bonjour, ' + shortName + '.');
    setText('[data-current-day-label]', dayLabel);
    setText('[data-current-day-name]', dayName);
    setText('[data-today-subtitle]', dayLabel + ' · travaille 5 minutes pour te lancer.');
    setText('[data-week-label]', weekLabel);
    setText('[data-planning-subtitle]', weekLabel + ' · ajustée à ta progression');
    setText('[data-objective-heading]', 'Objectif · ' + objectiveDisplay);
    setText('[data-objective-sub]', 'Impact dossier · ' + trackText + ' · ' + (objective.horizonLabel || 'Parcoursup') + ' · mise à jour aujourd\'hui');
    renderWeekHeaders(date);
    renderAccountPrompts(profile);
  }

  root.OutilPrepaUserUI = {
    render: render,
    roleLabel: roleLabel,
  };

  render();
  if (root.OutilPrepa && typeof root.OutilPrepa.subscribe === 'function') {
    root.OutilPrepa.subscribe(render);
  }
})(typeof window !== 'undefined' ? window : globalThis);
