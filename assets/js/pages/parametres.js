/*
 * AGENT HEADER
 * Role: page de modification et reset du compte local deja cree.
 * Loaded by: parametres.html apres model.js, store.js, scripts/dom.js
 * et scripts/user-context-ui.js.
 * Reads/writes: lit/ecrit window.OutilPrepa via saveLocalAccount et
 * resetLocalAccount; redirige vers onboarding.html sans compte local.
 * Public contract: data-account-form, data-account-status,
 * data-account-summary-*, data-account-reset, champs name displayName,
 * classLevel, objectiveLabel, rhythm, tracks, prioritySubjectIds,
 * tone, detailLevel, allowDeepening -> profile.aiPreferences.
 * Verify: npm run verify:local-account.
 * Read next: `docs/agent-codebase-map.md` Zone 1 et Zone 5.
 */
(function () {
  'use strict';

  var store = window.OutilPrepa;
  var form = document.querySelector('[data-account-form]');
  var status = document.querySelector('[data-account-status]');
  var summaryName = document.querySelector('[data-account-summary-name]');
  var summaryMeta = document.querySelector('[data-account-summary-meta]');
  var summaryState = document.querySelector('[data-account-summary-state]');

  if (!store || !form) return;
  if (typeof store.hasLocalAccount === 'function' && !store.hasLocalAccount()) {
    window.location.replace('onboarding.html');
    return;
  }

  var CLASS_LABELS = {
    seconde: 'Seconde',
    premiere: 'Première',
    terminale: 'Terminale',
    autre: 'Autre',
  };

  var SUBJECT_LABELS = {
    maths: 'Maths',
    'physique-chimie': 'Physique-chimie',
    svt: 'SVT',
    ses: 'SES',
    hggsp: 'HGGSP',
    'francais-philo': 'Français/philo',
    anglais: 'Anglais',
    'grand-oral': 'Grand oral',
  };

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.dataset.statusKind = kind || 'info';
  }

  function checkedValues(name) {
    return Array.from(form.querySelectorAll('[name="' + name + '"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function setCheckedValues(name, values) {
    var set = new Set(Array.isArray(values) ? values : []);
    form.querySelectorAll('[name="' + name + '"]').forEach(function (input) {
      input.checked = set.has(input.value);
    });
  }

  function setValue(name, value) {
    var field = form.elements[name];
    if (field) field.value = value || '';
  }

  function firstName(profile) {
    return profile.displayName || profile.fullName || 'Profil local';
  }

  function renderSummary() {
    var profile = store.profile || {};
    var objective = store.objective || {};
    var tracks = Array.isArray(profile.tracks) ? profile.tracks : [];
    var subjects = tracks.map(function (subject) { return SUBJECT_LABELS[subject] || subject; }).join(' · ');

    if (summaryName) summaryName.textContent = firstName(profile);
    if (summaryMeta) {
      summaryMeta.textContent = [
        CLASS_LABELS[profile.classLevel] || profile.classLevel || 'Lycée',
        subjects || 'matières à préciser',
        objective.targetLabel || 'objectif à préciser',
      ].filter(Boolean).join(' · ');
    }
    if (summaryState) {
      summaryState.textContent = store.hasLocalAccount && store.hasLocalAccount()
        ? 'Compte local sauvegardé sur cet appareil.'
        : 'Profil démo actif. Enregistre pour créer ton compte local.';
    }
  }

  function fillForm() {
    var profile = store.profile || {};
    var objective = store.objective || {};
    var preferences = profile.aiPreferences || {};

    setValue('displayName', profile.displayName || '');
    setValue('classLevel', profile.classLevel || 'premiere');
    setValue('objectiveLabel', profile.localAccount?.objectiveLabel || objective.targetLabel || '');
    setValue('rhythm', profile.rhythm || 'moyen');
    setValue('tone', preferences.tone || 'direct');
    setValue('detailLevel', preferences.detailLevel || 'progressif');
    form.elements.allowDeepening.checked = preferences.allowDeepening !== false;
    setCheckedValues('tracks', profile.tracks || ['maths']);
    setCheckedValues('prioritySubjectIds', profile.prioritySubjectIds || ['maths']);
    renderSummary();
  }

  function gatherAccount() {
    var tracks = checkedValues('tracks');
    var prioritySubjectIds = checkedValues('prioritySubjectIds');
    if (!tracks.length) tracks = ['maths'];
    if (!prioritySubjectIds.length) prioritySubjectIds = tracks.slice(0, 1);

    return {
      displayName: form.elements.displayName.value.trim(),
      classLevel: form.elements.classLevel.value,
      objectiveLabel: form.elements.objectiveLabel.value.trim(),
      rhythm: form.elements.rhythm.value,
      tracks: tracks,
      prioritySubjectIds: prioritySubjectIds,
      aiPreferences: {
        tone: form.elements.tone.value,
        detailLevel: form.elements.detailLevel.value,
        allowDeepening: form.elements.allowDeepening.checked,
      },
      source: 'settings',
    };
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var account = gatherAccount();
    if (!account.displayName) {
      setStatus('Ajoute au moins un prénom ou un pseudo.', 'error');
      form.elements.displayName.focus();
      return;
    }

    store.saveLocalAccount(account);
    fillForm();
    setStatus('Compte local sauvegardé sur cet appareil.', 'success');
  });

  document.querySelector('[data-account-reset]')?.addEventListener('click', function () {
    if (!window.confirm('Réinitialiser le compte local et le diagnostic sur cet appareil ?')) return;
    store.resetLocalAccount();
    setStatus('Compte local réinitialisé. Reprends le diagnostic pour recréer un profil.', 'info');
    window.location.href = 'onboarding.html';
  });

  if (typeof store.subscribe === 'function') {
    store.subscribe(function () {
      renderSummary();
    });
  }

  fillForm();
})();
