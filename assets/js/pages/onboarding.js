/* ============================================================
   OBJECTIF LYCEE - Onboarding canonique
   ------------------------------------------------------------
   Diagnostic vanilla: profil lateral, mission personnalisee,
   preuve de valeur, puis paywall essai gratuit 3 jours.
   ============================================================ */
(function () {
  'use strict';

  var STEP_IDS = [
    'intro',
    'classe',
    'goal',
    'specialite',
    'rythme',
    'priorites',
    'echeance',
    'blocage',
    'niveau',
    'planning',
    'generation',
    'mission',
    'social-proof',
    'recap',
    'paywall',
  ];

  var AUTO_ADVANCE_MS = 190;
  var GENERATION_MS = 1050;

  var state = {
    classe: null,
    goal: null,
    specialite: null,
    rythme: null,
    priorites: [],
    echeance: null,
    blocage: null,
    niveau: null,
    scheduleUpload: null,
    mission: null,
    socialProofVariant: 'placeholders-v1',
    trialChargeDate: null,
  };

  var currentIndex = 0;
  var generationTimer = null;
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var labels = {
    classe: {
      seconde: 'Seconde',
      premiere: 'Première',
      terminale: 'Terminale',
      autre: 'Autre situation',
    },
    goal: {
      ingenieur: 'École d\'ingénieur',
      commerce: 'École de commerce',
      sante: 'Santé ou sciences',
      'droit-sciencespo': 'Droit / IEP',
      indecis: 'Dossier solide',
    },
    specialite: {
      'maths-pc': 'Maths · physique-chimie',
      'maths-svt': 'Maths · SVT',
      'ses-hggsp': 'SES · HGGSP',
      autre: 'Autre combinaison',
    },
    rythme: {
      leger: '2-3 h / semaine',
      moyen: '4-6 h / semaine',
      intense: '7 h+ / semaine',
      indecis: 'À calibrer',
    },
    priorites: {
      maths: 'Mathématiques',
      physique: 'Physique-chimie',
      svt: 'SVT',
      ses: 'SES',
      hggsp: 'HGGSP',
      francais: 'Français · Philo',
      anglais: 'Anglais',
      'grand-oral': 'Grand oral',
    },
    echeance: {
      controle: 'Contrôle proche',
      'bac-blanc': 'Bac blanc',
      'epreuves-anticipees': 'Épreuves anticipées',
      parcoursup: 'Parcoursup',
      'grand-oral': 'Grand oral',
      habitudes: 'Prendre de bonnes habitudes',
      orientation: 'Clarifier l\'orientation',
    },
    blocage: {
      depart: 'Je ne sais pas par où commencer',
      exercices: 'Je comprends le cours, mais je rate les exercices',
      erreurs: 'Je fais des erreurs bêtes',
      methode: 'Je manque de méthode',
      retard: 'Je suis en retard',
      concentration: 'Je perds vite ma concentration',
    },
    niveau: {
      perdu: 'Perdu',
      fragile: 'Fragile',
      correct: 'Correct',
      solide: 'Solide',
      ambitieux: 'Ambitieux',
      irregulier: 'Irrégulier',
    },
  };

  var deadlineOptionsByClass = {
    seconde: [
      { value: 'controle', title: 'Contrôle proche', text: 'Une note à sécuriser maintenant.' },
      { value: 'habitudes', title: 'Prendre de bonnes habitudes', text: 'Installer une routine avant que ça s\'accumule.' },
      { value: 'orientation', title: 'Clarifier l\'orientation', text: 'Comprendre quelles matières comptent.' },
    ],
    premiere: [
      { value: 'controle', title: 'Contrôle proche', text: 'Une note à sécuriser maintenant.' },
      { value: 'bac-blanc', title: 'Bac blanc', text: 'Travailler une copie complète sans se disperser.' },
      { value: 'epreuves-anticipees', title: 'Épreuves anticipées', text: 'Français, oral ou écrit à préparer proprement.' },
    ],
    terminale: [
      { value: 'controle', title: 'Contrôle proche', text: 'Une note à sécuriser maintenant.' },
      { value: 'bac-blanc', title: 'Bac blanc', text: 'Tenir une épreuve complète.' },
      { value: 'parcoursup', title: 'Parcoursup', text: 'Construire des preuves utiles pour le dossier.' },
      { value: 'grand-oral', title: 'Grand oral', text: 'Avancer sans tout ouvrir à la fois.' },
    ],
    autre: [
      { value: 'controle', title: 'Contrôle proche', text: 'Une échéance scolaire à sécuriser.' },
      { value: 'habitudes', title: 'Prendre de bonnes habitudes', text: 'Créer une première routine tenable.' },
      { value: 'orientation', title: 'Clarifier l\'orientation', text: 'Comprendre la prochaine priorité.' },
    ],
  };

  var subjectDefaults = {
    'maths-pc': 'maths',
    'maths-svt': 'maths',
    'ses-hggsp': 'ses',
    autre: 'maths',
  };

  var durationByRythme = {
    leger: 20,
    moyen: 30,
    intense: 45,
    indecis: 25,
  };

  var adviceByBlock = {
    depart: 'Commence par une trace minuscule : une définition, un exercice, une erreur corrigée. Le premier objectif est de sortir du flou.',
    exercices: 'Avant de calculer, écris la méthode en une phrase. Si tu ne peux pas nommer la méthode, tu risques de faire au hasard.',
    erreurs: 'Les erreurs bêtes coûtent souvent des points parce qu\'elles ne sont pas relues au bon moment. Ta mission inclut donc une vérification explicite.',
    methode: 'Une bonne réponse ne montre pas seulement le résultat. Elle montre pourquoi tu as choisi cette étape.',
    retard: 'En retard, tu n\'as pas besoin de tout ouvrir. Tu as besoin d\'une première zone rentable à reprendre proprement.',
    concentration: 'Une session courte avec une trace précise vaut mieux qu\'une heure ouverte sans fin claire.',
  };

  var steps = STEP_IDS.map(function (id) {
    return document.querySelector('[data-onboarding-step="' + id + '"]');
  });
  var backButton = document.querySelector('[data-back-onboarding]');
  var profileToggle = document.querySelector('[data-profile-toggle]');
  var deadlineContainer = document.querySelector('[data-deadline-options]');
  var prioritiesContinue = document.querySelector('[data-continue-step="priorites"]');
  var scheduleInput = document.querySelector('[data-schedule-upload]');
  var schedulePreview = document.querySelector('[data-schedule-preview]');

  function currentStepId() {
    return STEP_IDS[currentIndex];
  }

  function nextStep() {
    goTo(currentIndex + 1);
  }

  function goTo(index) {
    if (index < 0 || index >= STEP_IDS.length) return;
    window.clearTimeout(generationTimer);
    currentIndex = index;

    steps.forEach(function (step, stepIndex) {
      if (!step) return;
      var active = stepIndex === currentIndex;
      step.classList.toggle('is-active', active);
      step.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) step.setAttribute('tabindex', '-1');
    });

    if (backButton) {
      backButton.hidden = currentIndex === 0 || currentStepId() === 'paywall';
    }

    document.body.classList.remove('profile-open');
    if (profileToggle) profileToggle.setAttribute('aria-expanded', 'false');

    if (currentStepId() === 'echeance') {
      renderDeadlineOptions();
    }
    if (currentStepId() === 'generation') {
      startGeneration();
    }
    if (currentStepId() === 'mission') {
      updateMissionView();
    }
    if (currentStepId() === 'social-proof') {
      updateAdviceView();
    }
    if (currentStepId() === 'recap') {
      updateRecapView();
    }
    if (currentStepId() === 'paywall') {
      updatePaywallView();
    }

    updateProfile();
    trackStepCompleted();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  function selectSingle(groupKey, value, button) {
    state[groupKey] = value;

    var group = button.closest('[data-choice-group]');
    if (group) {
      group.querySelectorAll('[data-option-value]').forEach(function (option) {
        option.classList.toggle('is-selected', option === button);
        option.setAttribute('aria-pressed', option === button ? 'true' : 'false');
      });
    }

    if (groupKey === 'classe') {
      state.echeance = null;
      renderDeadlineOptions();
    }

    updateProfile();
    window.setTimeout(nextStep, AUTO_ADVANCE_MS);
  }

  function togglePriority(button) {
    var value = button.getAttribute('data-option-value');
    var selected = state.priorites.indexOf(value) !== -1;
    if (selected) {
      state.priorites = state.priorites.filter(function (item) { return item !== value; });
    } else {
      state.priorites.push(value);
    }

    button.classList.toggle('is-selected', !selected);
    button.setAttribute('aria-pressed', !selected ? 'true' : 'false');

    if (prioritiesContinue) {
      prioritiesContinue.disabled = state.priorites.length === 0;
    }
    updateProfile();
  }

  function renderDeadlineOptions() {
    if (!deadlineContainer) return;

    var options = deadlineOptionsByClass[state.classe || 'autre'] || deadlineOptionsByClass.autre;
    if (state.echeance && !options.some(function (option) { return option.value === state.echeance; })) {
      state.echeance = null;
    }

    deadlineContainer.textContent = '';
    options.forEach(function (option) {
      var button = document.createElement('button');
      button.className = 'ob-choice';
      button.type = 'button';
      button.setAttribute('data-option-value', option.value);
      button.setAttribute('aria-pressed', state.echeance === option.value ? 'true' : 'false');
      if (state.echeance === option.value) button.classList.add('is-selected');

      var title = document.createElement('strong');
      title.textContent = option.title;
      var text = document.createElement('span');
      text.textContent = option.text;
      button.appendChild(title);
      button.appendChild(text);
      deadlineContainer.appendChild(button);
    });
  }

  function updateProfile() {
    setProfileValue('classe', labels.classe[state.classe]);
    setProfileValue('goal', labels.goal[state.goal]);
    setProfileValue('specialite', labels.specialite[state.specialite]);
    setProfileValue('rythme', labels.rythme[state.rythme]);
    setProfileValue('priorites', state.priorites.map(function (key) {
      return labels.priorites[key] || key;
    }).join(' · '));
    setProfileValue('echeance', labels.echeance[state.echeance]);
    setProfileValue('blocage', labels.blocage[state.blocage]);
    setProfileValue('niveau', labels.niveau[state.niveau]);
    setProfileValue('planning', state.scheduleUpload ? state.scheduleUpload.fileName : 'Optionnel');

    if (state.mission) {
      setProfileValue('mission', state.mission.shortTitle);
      setProfileStatus('mission', 'prête');
      setProfileUsed('mission', true);
    }

    ['classe', 'goal', 'specialite', 'rythme', 'priorites', 'echeance', 'blocage', 'niveau'].forEach(function (key) {
      setProfileUsed(key, !!state[key] || (key === 'priorites' && state.priorites.length > 0));
    });
    setProfileUsed('planning', !!state.scheduleUpload);

    updateMobileSummary();
  }

  function setProfileValue(key, value) {
    var valueNode = document.querySelector('[data-profile-value="' + key + '"]');
    var row = document.querySelector('[data-profile-row="' + key + '"]');
    if (!valueNode || !row) return;

    var hasValue = !!value;
    valueNode.textContent = hasValue ? value : 'À préciser';
    row.classList.toggle('is-filled', hasValue);
  }

  function setProfileStatus(key, value) {
    var statusNode = document.querySelector('[data-profile-status="' + key + '"]');
    if (statusNode) statusNode.textContent = value;
  }

  function setProfileUsed(key, isUsed) {
    var row = document.querySelector('[data-profile-row="' + key + '"]');
    if (row) row.classList.toggle('is-used', !!isUsed);
  }

  function updateMobileSummary() {
    var summary = document.querySelector('[data-mobile-summary-main]');
    if (!summary) return;

    var pieces = [
      labels.classe[state.classe],
      state.priorites.length ? (labels.priorites[state.priorites[0]] || state.priorites[0]) : null,
      state.mission ? 'Mission prête' : null,
    ].filter(Boolean);
    summary.textContent = pieces.length ? pieces.join(' · ') : 'À préciser';
  }

  function startGeneration() {
    state.mission = buildMission();
    updateProfile();

    var items = Array.from(document.querySelectorAll('[data-generation-item]'));
    items.forEach(function (item) {
      item.classList.remove('is-active');
    });

    items.forEach(function (item, index) {
      window.setTimeout(function () {
        item.classList.add('is-active');
      }, prefersReducedMotion ? 1 : index * 170);
    });

    generationTimer = window.setTimeout(function () {
      goTo(STEP_IDS.indexOf('mission'));
    }, prefersReducedMotion ? 80 : GENERATION_MS);
  }

  function buildMission() {
    var subjectKey = state.priorites[0] || subjectDefaults[state.specialite] || 'maths';
    var subjectLabel = labels.priorites[subjectKey] || 'Matière prioritaire';
    var minutes = durationByRythme[state.rythme] || 25;
    var level = labels.niveau[state.niveau] || 'calibré';
    var block = state.blocage || 'exercices';
    var title = missionTitle(subjectKey, block, minutes);
    var trace = missionTrace(subjectKey, block, state.niveau);
    var why = 'Tu as signalé ' + subjectLabel + ' et "' + (labels.blocage[block] || 'un blocage précis') + '". Avec ' +
      (labels.rythme[state.rythme] || 'un temps réaliste') + ', on garde une action ' + level.toLowerCase() + ' et vérifiable.';

    return {
      subjectKey: subjectKey,
      subjectLabel: subjectLabel,
      shortTitle: subjectLabel + ' · ' + shortAction(block),
      title: title,
      durationMinutes: minutes,
      durationLabel: minutes + ' minutes',
      why: why,
      trace: trace,
      type: subjectKey + '-' + block,
    };
  }

  function missionTitle(subjectKey, block, minutes) {
    if (subjectKey === 'physique') {
      if (block === 'methode') return 'Classer 3 exercices par situation physique, puis choisir la formule adaptée.';
      if (block === 'erreurs') return 'Refaire un bilan d\'énergie en vérifiant les unités à chaque ligne.';
      return 'Reprendre un exercice type contrôle en écrivant système, données, formule, unité.';
    }
    if (subjectKey === 'francais') {
      return minutes >= 45
        ? 'Construire une introduction et un plan détaillé sur un sujet déjà vu.'
        : 'Écrire une problématique et deux axes pour un sujet déjà vu.';
    }
    if (subjectKey === 'ses' || subjectKey === 'hggsp') {
      return 'Rédiger une réponse courte avec une notion, un exemple, puis une phrase de conclusion.';
    }
    if (subjectKey === 'svt') {
      return 'Faire un schéma bilan, puis répondre à trois questions sans regarder le cours.';
    }
    if (subjectKey === 'anglais') {
      return 'Reformuler cinq arguments, puis écrire un paragraphe court avec connecteurs.';
    }
    if (subjectKey === 'grand-oral') {
      return 'Écrire trois preuves concrètes pour défendre ton sujet à l\'oral.';
    }
    if (block === 'depart') return 'Relire une correction, isoler la méthode, puis refaire seulement la première question.';
    if (block === 'erreurs') return 'Refaire un exercice court en ajoutant une ligne de vérification après chaque calcul.';
    if (block === 'methode') return 'Refaire un exercice type contrôle en nommant la méthode avant chaque calcul.';
    if (block === 'retard') return 'Choisir un chapitre rentable et produire une fiche erreurs en 3 lignes.';
    if (block === 'concentration') return 'Faire une question unique, chronométrée, puis écrire ce qui bloque encore.';
    return 'Refaire un exercice type contrôle en écrivant la méthode avant chaque calcul.';
  }

  function shortAction(block) {
    var map = {
      depart: 'sortir du flou',
      exercices: 'exercice type contrôle',
      erreurs: 'vérification explicite',
      methode: 'méthode écrite',
      retard: 'zone rentable',
      concentration: 'trace courte',
    };
    return map[block] || 'mission ciblée';
  }

  function missionTrace(subjectKey, block, niveau) {
    if (subjectKey === 'physique') {
      return 'Pour chaque exercice : grandeur cherchée, grandeurs données, formule choisie, unité vérifiée.';
    }
    if (subjectKey === 'francais') {
      return 'Une problématique, deux ou trois axes, et un exemple précis par axe.';
    }
    if (subjectKey === 'svt') {
      return 'Un schéma propre, trois mots-clés définis, puis une réponse relue.';
    }
    if (subjectKey === 'ses' || subjectKey === 'hggsp') {
      return 'Une réponse structurée : notion, mécanisme, exemple, conclusion.';
    }
    if (niveau === 'ambitieux' || niveau === 'solide') {
      return 'Une solution propre avec méthode nommée, calculs justifiés et vérification finale.';
    }
    if (block === 'erreurs') {
      return 'Une solution courte avec les erreurs relues et notées dans une mini-liste.';
    }
    return 'Une solution propre avec les étapes nommées : données, méthode choisie, calcul, vérification.';
  }

  function updateMissionView() {
    if (!state.mission) state.mission = buildMission();
    setText('[data-mission-title]', state.mission.title);
    setText('[data-mission-why]', state.mission.why);
    setText('[data-mission-duration]', state.mission.durationLabel);
    setText('[data-mission-trace]', state.mission.trace);
    setText('[data-mission-diagnostic]', 'On part de ' + state.mission.subjectLabel + ', de ton blocage et de ton temps réel pour éviter une mission vague.');
    updateProfile();
  }

  function updateAdviceView() {
    var advice = adviceByBlock[state.blocage] || adviceByBlock.exercices;
    setText('[data-advice-text]', advice);
  }

  function updateRecapView() {
    if (!state.mission) state.mission = buildMission();
    var recap = document.querySelector('[data-recap-list]');
    if (!recap) return;

    var items = [
      labels.classe[state.classe],
      labels.goal[state.goal],
      labels.specialite[state.specialite],
      labels.rythme[state.rythme],
      state.priorites.length ? state.priorites.map(function (key) { return labels.priorites[key] || key; }).join(' · ') : null,
      labels.echeance[state.echeance],
      labels.blocage[state.blocage],
      labels.niveau[state.niveau],
      state.mission.shortTitle,
    ].filter(Boolean);

    recap.textContent = '';
    items.forEach(function (item) {
      var chip = document.createElement('span');
      chip.textContent = item;
      recap.appendChild(chip);
    });
  }

  function updatePaywallView() {
    if (!state.mission) state.mission = buildMission();
    state.trialChargeDate = trialChargeDate();
    setText('[data-paywall-mission]', state.mission.title);
    setText('[data-paywall-duration]', state.mission.durationLabel);
    setText('[data-paywall-priority]', state.mission.subjectLabel + ' - ' + (labels.blocage[state.blocage] || 'blocage ciblé'));
    setText('[data-trial-charge-date]', formatDateLong(state.trialChargeDate));
    updateProfile();
  }

  function setText(selector, text) {
    var node = document.querySelector(selector);
    if (node) node.textContent = text;
  }

  function trialChargeDate() {
    var date = new Date();
    date.setDate(date.getDate() + 3);
    date.setHours(12, 0, 0, 0);
    return date;
  }

  function dateISO(date) {
    return date.toISOString().slice(0, 10);
  }

  function formatDateLong(date) {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  function onboardingPayload(extra) {
    if (!state.mission) state.mission = buildMission();
    var chargeDate = state.trialChargeDate || trialChargeDate();
    var enriched = {
      version: 'trial-3-days-v1',
      classe: state.classe,
      goal: state.goal,
      specialite: state.specialite,
      rythme: state.rythme,
      priorites: state.priorites.slice(),
      echeance: state.echeance,
      blocagePrincipal: state.blocage,
      niveauRessenti: state.niveau,
      scheduleUpload: state.scheduleUpload,
      missionRecommandee: state.mission.title,
      missionType: state.mission.type,
      justificationMission: state.mission.why,
      traceAttendue: state.mission.trace,
      variantePreuveSociale: state.socialProofVariant,
      trialChargeDate: dateISO(chargeDate),
      trialChargeDateLabel: formatDateLong(chargeDate),
      trialLengthDays: 3,
      trialPriceAfter: '10 euros par mois',
      paywallModel: 'hard-paywall-after-proof',
    };

    return Object.assign({
      classe: state.classe,
      goal: state.goal,
      specialite: state.specialite,
      rythme: state.rythme,
      priorites: state.priorites.slice(),
      onboarding: enriched,
      completedAt: new Date().toISOString(),
    }, extra || {});
  }

  function persistOnboarding(extra) {
    var payload = onboardingPayload(extra);
    if (window.OutilPrepa && typeof window.OutilPrepa.applyOnboarding === 'function') {
      return window.OutilPrepa.applyOnboarding(payload);
    }

    try {
      localStorage.setItem('outilPrepa:onboarding', JSON.stringify(payload));
    } catch (error) {}
    return payload;
  }

  function trackStepCompleted() {
    if (currentIndex === 0) return;
    trackOnboarding('onboarding_step_completed', { step: currentIndex });
  }

  function trackOnboarding(name, props) {
    if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
    window.OLAnalytics.track(name, Object.assign({
      page: 'onboarding',
      step: currentIndex,
      goal: state.goal,
      classe: state.classe,
      specialite: state.specialite,
      priority_count: state.priorites.length,
    }, props || {}));
  }

  function startTrial() {
    state.trialChargeDate = trialChargeDate();
    persistOnboarding({ trialStartedAt: new Date().toISOString() });
    trackOnboarding('onboarding_completed', { completed: true });
    window.location.href = 'checkout.html';
  }

  function onScheduleSelected(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;

    state.scheduleUpload = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'unknown',
      previewOnly: true,
    };

    if (schedulePreview) {
      schedulePreview.hidden = false;
      schedulePreview.textContent = 'Aperçu local : ' + file.name + ' (' + formatFileSize(file.size) + '). Rien n\'est envoyé.';
    }
    updateProfile();
  }

  function formatFileSize(bytes) {
    if (!bytes) return 'taille inconnue';
    if (bytes < 1024) return bytes + ' o';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' Mo';
  }

  function installEvents() {
    var start = document.querySelector('[data-start-onboarding]');
    if (start) {
      start.addEventListener('click', function () {
        trackOnboarding('onboarding_started', { step: 0 });
        goTo(1);
      });
    }

    if (backButton) {
      backButton.addEventListener('click', function () {
        goTo(currentIndex - 1);
      });
    }

    if (profileToggle) {
      profileToggle.addEventListener('click', function () {
        var isOpen = !document.body.classList.contains('profile-open');
        document.body.classList.toggle('profile-open', isOpen);
        profileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        document.body.classList.remove('profile-open');
        if (profileToggle) profileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (event) {
      var option = event.target.closest('[data-option-value]');
      if (!option) return;

      var group = option.closest('[data-choice-group]');
      if (!group) return;

      var key = group.getAttribute('data-choice-group');
      var value = option.getAttribute('data-option-value');
      if (group.getAttribute('data-choice-mode') === 'multiple') {
        togglePriority(option);
      } else {
        selectSingle(key, value, option);
      }
    });

    document.querySelectorAll('[data-continue-step]').forEach(function (button) {
      button.addEventListener('click', function () {
        var step = button.getAttribute('data-continue-step');
        if (step === 'priorites' && state.priorites.length === 0) return;
        nextStep();
      });
    });

    if (scheduleInput) {
      scheduleInput.addEventListener('change', onScheduleSelected);
    }

    var trialButton = document.querySelector('[data-start-trial]');
    if (trialButton) trialButton.addEventListener('click', startTrial);

    var paywallSecondary = document.querySelector('[data-paywall-secondary]');
    if (paywallSecondary) {
      paywallSecondary.addEventListener('click', function () {
        goTo(STEP_IDS.indexOf('mission'));
      });
    }
  }

  function initializeAccessibility() {
    steps.forEach(function (step, index) {
      if (!step) return;
      step.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
      step.setAttribute('tabindex', '-1');
    });
    document.querySelectorAll('[data-option-value]').forEach(function (button) {
      button.setAttribute('aria-pressed', 'false');
    });
  }

  initializeAccessibility();
  renderDeadlineOptions();
  updateProfile();
  installEvents();
}());
