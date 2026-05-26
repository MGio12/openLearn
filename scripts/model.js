/* ============================================================
   OUTIL PREPA - Modele de donnees central
   ------------------------------------------------------------
   Source commune pour les entites produit que les pages doivent
   partager progressivement: profile, objective, mission,
   missionProgress, focusSession et subscriptionState.
   ============================================================ */
(function (root) {
  'use strict';

  var SCHEMA_VERSION = 1;

  var DEFAULT_PROFILE = {
    id: 'profile-demo-maie',
    source: 'fixture-demo-profile',
    displayName: 'Maïe',
    fullName: 'Maïe Durand',
    initials: 'MD',
    learnerStage: 'lycee',
    classLevel: 'terminale',
    tracks: ['maths', 'physique-chimie'],
    weeklyWorkloadHours: 4,
    prioritySubjectIds: ['maths', 'physique-chimie'],
    timezone: 'Europe/Paris',
    email: null,
  };

  var DEFAULT_OBJECTIVE = {
    id: 'objective-ingenieur-post-bac',
    profileId: DEFAULT_PROFILE.id,
    targetType: 'ecole-ingenieur',
    targetLabel: 'Ecole d ingenieur post-bac',
    horizonLabel: 'Parcoursup',
    prioritySubjectIds: ['maths', 'physique-chimie'],
    successSignals: [
      'regularite visible',
      'notes de controle solides',
      'preuves concretes pour le dossier',
    ],
    weightedSubjects: [
      {
        subjectId: 'maths',
        weight: 0.46,
        reason: 'Levier principal pour le dossier ingenieur vise.',
      },
      {
        subjectId: 'physique-chimie',
        weight: 0.32,
        reason: 'Deuxieme signal fort pour une filiere scientifique.',
      },
      {
        subjectId: 'projet-motive',
        weight: 0.22,
        reason: 'Preuves a garder pour expliquer la trajectoire.',
      },
    ],
  };

  var DEFAULT_MISSION = {
    id: 'mission-exponentielle-derivation',
    objectiveId: DEFAULT_OBJECTIVE.id,
    title: 'Exponentielle & dérivation',
    taskTitle: 'Exponentielle & dérivation — exercice type contrôle',
    subjectId: 'maths',
    subjectLabel: 'Maths spé',
    topicId: 'expo-derivee',
    topicLabel: 'fonctions',
    reviewTitle: 'Fonctions exponentielles',
    kind: 'daily-mission',
    scheduledFor: 'today',
    scheduledLabel: 'maintenant',
    scheduledDisplay: 'Maintenant',
    deadlineLabel: 'Contrôle vendredi',
    priorityLabel: 'Prioritaire',
    durationMinutes: 45,
    focusDurationMinutes: 25,
    difficultyLevel: 2,
    masteryPercent: 62,
    reason:
      'Aujourd’hui, le bon pari est de reprendre l’exponentielle. Court, utile pour le contrôle de vendredi, ton école d’ingé visée veut du solide en maths.',
    missionPageReason:
      'Pour ton école d’ingé, le bon pari est de sécuriser l’exponentielle maintenant. C’est court, au programme du contrôle de vendredi, et une bonne note en maths fait monter ton dossier.',
    focusIntro:
      '25 min de focus, puis 20 min de correction propre — les 45 min y passent. Commence par les formules et trois dérivées. Note l’erreur que tu ne veux plus refaire.',
    completionSummary:
      'Tu viens de finir 25 min de focus. Ta mission avance, ton dossier s’épaissit.',
    recommendation:
      'Concentre 1 h cette semaine sur l’exponentielle. C’est ton chapitre le plus fragile, et il pèse sur le prochain contrôle de maths.',
    proof: {
      sourceType: 'objective',
      label: 'Contrôle vendredi + dossier ingénieur',
      summary:
        'La mission sert à sécuriser un chapitre prioritaire et à produire une correction propre.',
      refs: [
        { type: 'objective', id: DEFAULT_OBJECTIVE.id },
        { type: 'school-deadline', id: 'controle-vendredi' },
      ],
    },
    objectiveTopic: {
      totalOccurrences: 5,
      score: 9.4,
      years: ['S1', 'S2', 'S3', 'S5', 'S6'],
    },
    steps: [
      {
        id: 'definition-formules',
        title:
          'Relire la définition de l’exponentielle et noter les deux formules à sécuriser.',
        durationMinutes: 10,
      },
      {
        id: 'derivees-composition',
        title:
          'Refaire trois dérivées avec enchaînement de fonctions, sans regarder la correction.',
        durationMinutes: 15,
      },
      {
        id: 'correction-erreur',
        title:
          'Corriger un exercice type contrôle et garder une erreur à revoir demain.',
        durationMinutes: 20,
      },
    ],
    resources: [
      {
        id: 'fiche-exponentielle',
        type: 'fiche',
        label: 'Fiche · Exponentielle, dérivée et variations',
        meta: 'Chapitre fonctions — formules à sécuriser',
      },
      {
        id: 'objectif-ingenieur',
        type: 'objective-proof',
        label: 'Dossier objectif · école d’ingénieur post-bac',
        meta: 'Pourquoi cette mission compte pour ton dossier',
      },
    ],
    nextMissionIds: ['mission-projet-motive-preuves'],
  };

  var DEFAULT_SUBSCRIPTION_STATE = {
    plan: 'free',
    status: 'trial',
    freeMissionLimit: 3,
    freeMissionsUsed: 0,
    locked: false,
    checkoutUrl: null,
    startedAt: null,
    currentPeriodEnd: null,
  };

  var DEFAULT_SCHEDULE = {
    id: 'schedule-demo-lycee',
    version: 1,
    timezone: DEFAULT_PROFILE.timezone,
    ownerProfileId: DEFAULT_PROFILE.id,
    subjects: {
      maths: {
        label: 'Maths spé',
        color: '#F4D35E',
        icon: 'ph-function',
      },
      'physique-chimie': {
        label: 'Physique-chimie',
        color: '#C7D9D7',
        icon: 'ph-flask',
      },
      svt: {
        label: 'SVT',
        color: '#D8E6C3',
        icon: 'ph-leaf',
      },
      'francais-philo': {
        label: 'Français · Philo',
        color: '#E8C7A9',
        icon: 'ph-pen-nib',
      },
      anglais: {
        label: 'Anglais',
        color: '#F4A261',
        icon: 'ph-translate',
      },
      hggsp: {
        label: 'HGGSP',
        color: '#D96C5F',
        icon: 'ph-globe-hemisphere-west',
      },
    },
    items: [
      {
        id: 'mon-0800-maths-suites',
        day: 'mon',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: 'maths',
        title: 'Cours - suites numériques',
        location: 'B214',
        locked: true,
        source: 'demo',
      },
      {
        id: 'mon-0910-pc-energie',
        day: 'mon',
        start: '09:10',
        end: '10:10',
        kind: 'course',
        subjectId: 'physique-chimie',
        title: 'TP énergie mécanique',
        location: 'Labo 2',
        locked: true,
        source: 'demo',
      },
      {
        id: 'mon-1025-anglais-essay',
        day: 'mon',
        start: '10:25',
        end: '11:20',
        kind: 'course',
        subjectId: 'anglais',
        title: 'Essay writing',
        location: 'C103',
        locked: true,
        source: 'demo',
      },
      {
        id: 'mon-1330-fr-philo',
        day: 'mon',
        start: '13:30',
        end: '14:30',
        kind: 'course',
        subjectId: 'francais-philo',
        title: 'Philo - la technique',
        location: 'A108',
        locked: true,
        source: 'demo',
      },
      {
        id: 'mon-1730-basket',
        day: 'mon',
        start: '17:30',
        end: '18:30',
        kind: 'activity',
        subjectId: null,
        title: 'Basket',
        location: 'Gymnase',
        locked: false,
        source: 'student',
      },
      {
        id: 'mon-1845-work-maths',
        day: 'mon',
        start: '18:45',
        end: '19:15',
        kind: 'recommended_work',
        subjectId: 'maths',
        title: 'Refaire 2 questions du DM',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'tue-0800-svt-genetique',
        day: 'tue',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: 'svt',
        title: 'Génétique',
        location: 'B106',
        locked: true,
        source: 'demo',
      },
      {
        id: 'tue-1010-hggsp-puissance',
        day: 'tue',
        start: '10:10',
        end: '11:10',
        kind: 'course',
        subjectId: 'hggsp',
        title: 'Puissance et frontières',
        location: 'A204',
        locked: true,
        source: 'demo',
      },
      {
        id: 'tue-1120-maths-derivees',
        day: 'tue',
        start: '11:20',
        end: '12:20',
        kind: 'course',
        subjectId: 'maths',
        title: 'Dérivation',
        location: 'B214',
        locked: true,
        source: 'demo',
      },
      {
        id: 'tue-1400-anglais-oral',
        day: 'tue',
        start: '14:00',
        end: '15:00',
        kind: 'course',
        subjectId: 'anglais',
        title: 'Oral en binôme',
        location: 'C103',
        locked: true,
        source: 'demo',
      },
      {
        id: 'tue-1800-work-pc',
        day: 'tue',
        start: '18:00',
        end: '18:30',
        kind: 'recommended_work',
        subjectId: 'physique-chimie',
        title: 'Bilan d’énergie propre',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'wed-0800-pc-electricite',
        day: 'wed',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: 'physique-chimie',
        title: 'Circuit RC',
        location: 'Labo 1',
        locked: true,
        source: 'demo',
      },
      {
        id: 'wed-0910-maths-proba',
        day: 'wed',
        start: '09:10',
        end: '10:10',
        kind: 'course',
        subjectId: 'maths',
        title: 'Probabilités',
        location: 'B214',
        locked: true,
        source: 'demo',
      },
      {
        id: 'wed-1025-fr-analyse',
        day: 'wed',
        start: '10:25',
        end: '11:20',
        kind: 'course',
        subjectId: 'francais-philo',
        title: 'Analyse de texte',
        location: 'A108',
        locked: true,
        source: 'demo',
      },
      {
        id: 'wed-1500-atelier-code',
        day: 'wed',
        start: '15:00',
        end: '16:30',
        kind: 'activity',
        subjectId: null,
        title: 'Atelier code',
        location: 'Médiathèque',
        locked: false,
        source: 'student',
      },
      {
        id: 'wed-1800-work-anglais',
        day: 'wed',
        start: '18:00',
        end: '18:30',
        kind: 'recommended_work',
        subjectId: 'anglais',
        title: '5 arguments reformulés',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'thu-0800-maths-expo',
        day: 'thu',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: 'maths',
        title: 'Exponentielle',
        location: 'B214',
        locked: true,
        source: 'demo',
      },
      {
        id: 'thu-0910-hggsp-carte',
        day: 'thu',
        start: '09:10',
        end: '10:10',
        kind: 'course',
        subjectId: 'hggsp',
        title: 'Carte méthode',
        location: 'A204',
        locked: true,
        source: 'demo',
      },
      {
        id: 'thu-1330-svt-schema',
        day: 'thu',
        start: '13:30',
        end: '14:30',
        kind: 'course',
        subjectId: 'svt',
        title: 'Schéma bilan',
        location: 'B106',
        locked: true,
        source: 'demo',
      },
      {
        id: 'thu-1540-anglais-vocab',
        day: 'thu',
        start: '15:40',
        end: '16:40',
        kind: 'course',
        subjectId: 'anglais',
        title: 'Vocabulaire ciblé',
        location: 'C103',
        locked: true,
        source: 'demo',
      },
      {
        id: 'thu-1815-work-maths',
        day: 'thu',
        start: '18:15',
        end: '18:45',
        kind: 'recommended_work',
        subjectId: 'maths',
        title: 'Mini contrôle blanc',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'fri-0800-pc-controle',
        day: 'fri',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: 'physique-chimie',
        title: 'Exercices énergie',
        location: 'Labo 2',
        locked: true,
        source: 'demo',
      },
      {
        id: 'fri-1010-maths-controle',
        day: 'fri',
        start: '10:10',
        end: '11:10',
        kind: 'course',
        subjectId: 'maths',
        title: 'Contrôle type',
        location: 'B214',
        locked: true,
        source: 'demo',
      },
      {
        id: 'fri-1120-fr-redaction',
        day: 'fri',
        start: '11:20',
        end: '12:20',
        kind: 'course',
        subjectId: 'francais-philo',
        title: 'Rédaction',
        location: 'A108',
        locked: true,
        source: 'demo',
      },
      {
        id: 'fri-1400-hggsp-intro',
        day: 'fri',
        start: '14:00',
        end: '15:00',
        kind: 'course',
        subjectId: 'hggsp',
        title: 'Intro dissertation',
        location: 'A204',
        locked: true,
        source: 'demo',
      },
      {
        id: 'fri-1730-work-pc',
        day: 'fri',
        start: '17:30',
        end: '18:00',
        kind: 'recommended_work',
        subjectId: 'physique-chimie',
        title: 'Corriger une erreur',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'sat-1000-running',
        day: 'sat',
        start: '10:00',
        end: '11:30',
        kind: 'activity',
        subjectId: null,
        title: 'Sport',
        location: 'Parc',
        locked: false,
        source: 'student',
      },
      {
        id: 'sat-1400-work-maths',
        day: 'sat',
        start: '14:00',
        end: '14:45',
        kind: 'recommended_work',
        subjectId: 'maths',
        title: 'Reprendre la fiche erreurs',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
      {
        id: 'sun-1030-week-review',
        day: 'sun',
        start: '10:30',
        end: '11:00',
        kind: 'recommended_work',
        subjectId: 'francais-philo',
        title: 'Préparer la semaine',
        location: 'Maison',
        locked: false,
        source: 'objectif-lycee',
      },
    ],
  };

  var GOAL_LABELS = {
    ingenieur: 'Ecole d ingenieur post-bac',
    commerce: 'Ecole de commerce post-bac',
    sante: 'Sante ou sciences',
    'droit-sciencespo': 'Droit, IEP ou sciences po',
    indecis: 'Dossier lycee solide',
  };

  var GOAL_TYPES = {
    ingenieur: 'ecole-ingenieur',
    commerce: 'ecole-commerce',
    sante: 'sante-sciences',
    'droit-sciencespo': 'droit-sciencespo',
    indecis: 'dossier-solide',
  };

  var SPECIALITY_SUBJECTS = {
    'maths-pc': ['maths', 'physique-chimie'],
    'maths-svt': ['maths', 'svt'],
    'ses-hggsp': ['ses', 'hggsp'],
    autre: ['maths'],
  };

  var WEEKLY_HOURS = {
    leger: 3,
    moyen: 5,
    intense: 7,
    indecis: 4,
  };

  var SUBJECT_IDS = {
    physique: 'physique-chimie',
    francais: 'francais-philo',
  };

  var SUBJECT_MISSION_TEMPLATES = {
    physique: {
      id: 'mission-energie-mecanique-controle',
      title: 'Énergie mécanique',
      taskTitle: 'Énergie mécanique — exercice type contrôle',
      subjectId: 'physique-chimie',
      subjectLabel: 'Physique-chimie',
      topicId: 'energie-mecanique',
      topicLabel: 'mécanique',
      reviewTitle: 'Énergie mécanique',
      durationMinutes: 45,
      focusDurationMinutes: 25,
      masteryPercent: 58,
      reason:
        'Aujourd’hui, le bon pari est de refaire un exercice d’énergie mécanique. C’est concret, utile pour le prochain contrôle, et ça sécurise ton dossier scientifique.',
      missionPageReason:
        'Pour ton objectif, une copie propre en physique-chimie compte autant que la bonne formule. Cette mission te fait refaire le raisonnement complet avant le prochain contrôle.',
      focusIntro:
        '25 min de focus sur un exercice complet : système, énergies, conservation, puis rédaction courte. Garde une erreur à revoir demain.',
      completionSummary:
        'Tu viens de finir une session sur l’énergie mécanique. Mission terminée, ta progression suit.',
      recommendation:
        'Reprends un exercice d’énergie mécanique cette semaine. Le gain vient surtout de la rédaction du système et du bilan d’énergie.',
      proof: {
        sourceType: 'objective',
        label: 'Contrôle proche + dossier scientifique',
        summary:
          'La mission sert à sécuriser un chapitre fréquent et une rédaction attendue en physique-chimie.',
        refs: [
          { type: 'objective', id: DEFAULT_OBJECTIVE.id },
          { type: 'school-deadline', id: 'controle-proche' },
        ],
      },
      steps: [
        {
          id: 'identifier-systeme',
          title: 'Identifier le système, les forces et les énergies en jeu.',
          durationMinutes: 10,
        },
        {
          id: 'resoudre-bilan',
          title: 'Résoudre un bilan d’énergie sans regarder la correction.',
          durationMinutes: 20,
        },
        {
          id: 'corriger-redaction',
          title: 'Corriger la rédaction et noter la ligne à ne plus oublier.',
          durationMinutes: 15,
        },
      ],
      resources: [
        {
          id: 'fiche-energie-mecanique',
          type: 'fiche',
          label: 'Fiche · Énergie mécanique et conservation',
          meta: 'Chapitre mécanique — méthode de rédaction',
        },
        {
          id: 'objectif-scientifique',
          type: 'objective-proof',
          label: 'Dossier objectif · filière scientifique',
          meta: 'Pourquoi cette mission compte pour ton dossier',
        },
      ],
    },
    svt: {
      id: 'mission-genetique-schema-bilan',
      title: 'Génétique',
      taskTitle: 'Génétique — schéma bilan et questions flash',
      subjectId: 'svt',
      subjectLabel: 'SVT',
      topicId: 'genetique',
      topicLabel: 'génétique',
      reviewTitle: 'Génétique',
      durationMinutes: 40,
      focusDurationMinutes: 25,
      masteryPercent: 55,
      reason:
        'Aujourd’hui, le plus utile est de transformer le chapitre de génétique en schéma clair. C’est court, vérifiable, et bon pour les contrôles de spécialité.',
      missionPageReason:
        'Pour une filière santé ou sciences, la SVT doit montrer une compréhension solide. Cette mission te force à relier les notions au lieu de relire passivement.',
      focusIntro:
        '25 min : un schéma bilan, cinq questions flash, puis une correction propre. Tu dois pouvoir expliquer le lien sans tes notes.',
      completionSummary:
        'Tu as terminé une mission de SVT exploitable : un schéma, des questions, une erreur à revoir.',
      recommendation:
        'Garde le schéma bilan comme preuve de compréhension, puis refais cinq questions rapides demain.',
      proof: {
        sourceType: 'objective',
        label: 'Spécialité + compréhension vérifiable',
        summary:
          'La mission produit une trace courte qui montre que le chapitre est compris, pas seulement relu.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'schema-bilan',
          title: 'Faire un schéma bilan du mécanisme principal du chapitre.',
          durationMinutes: 15,
        },
        {
          id: 'questions-flash',
          title: 'Répondre à cinq questions flash sans ouvrir le cours.',
          durationMinutes: 15,
        },
        {
          id: 'corriger-notion',
          title: 'Corriger une notion fragile et écrire une phrase modèle.',
          durationMinutes: 10,
        },
      ],
      resources: [
        {
          id: 'fiche-genetique',
          type: 'fiche',
          label: 'Fiche · Génétique, notions et schéma bilan',
          meta: 'Chapitre SVT — compréhension active',
        },
      ],
    },
    ses: {
      id: 'mission-ses-croissance-notions',
      title: 'Croissance économique',
      taskTitle: 'Croissance — relier deux notions au cours',
      subjectId: 'ses',
      subjectLabel: 'SES',
      topicId: 'croissance',
      topicLabel: 'croissance',
      reviewTitle: 'Croissance économique',
      durationMinutes: 35,
      focusDurationMinutes: 25,
      masteryPercent: 60,
      reason:
        'Aujourd’hui, la mission utile est de relier deux notions de croissance à un exemple. C’est le format qui rend une copie plus solide.',
      missionPageReason:
        'Pour commerce, droit ou IEP, tu dois montrer une pensée structurée. Cette mission travaille le lien notion-exemple sans te disperser.',
      focusIntro:
        '25 min : deux notions, deux exemples, une mini-transition. La sortie doit tenir en une demi-page claire.',
      completionSummary:
        'Tu as terminé une mission de SES avec une trace réutilisable dans une copie.',
      recommendation:
        'Reviens demain sur une introduction courte : définition, enjeu, annonce du plan.',
      proof: {
        sourceType: 'objective',
        label: 'Copie structurée + dossier',
        summary:
          'La mission renforce la capacité à relier une notion au cours et à un exemple concret.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'choisir-notions',
          title: 'Choisir deux notions du chapitre et écrire leur définition utile.',
          durationMinutes: 10,
        },
        {
          id: 'ajouter-exemples',
          title: 'Associer un exemple précis à chaque notion.',
          durationMinutes: 15,
        },
        {
          id: 'mini-transition',
          title: 'Rédiger une transition courte entre les deux idées.',
          durationMinutes: 10,
        },
      ],
      resources: [
        {
          id: 'fiche-croissance',
          type: 'fiche',
          label: 'Fiche · Croissance, notions et exemples',
          meta: 'Chapitre SES — copie structurée',
        },
      ],
    },
    hggsp: {
      id: 'mission-hggsp-intro-puissance',
      title: 'Puissance',
      taskTitle: 'Composer une intro sur la puissance',
      subjectId: 'hggsp',
      subjectLabel: 'HGGSP',
      topicId: 'puissance',
      topicLabel: 'géopolitique',
      reviewTitle: 'Puissance',
      durationMinutes: 35,
      focusDurationMinutes: 25,
      masteryPercent: 57,
      reason:
        'Aujourd’hui, le meilleur levier est une introduction claire : définition, tension, problématique. C’est petit, mais ça change la copie.',
      missionPageReason:
        'Pour droit, IEP ou sciences po, la première impression compte. Cette mission te fait produire une introduction complète et corrigeable.',
      focusIntro:
        '25 min : définir, problématiser, annoncer un plan. Pas de grand brouillon, seulement une intro propre.',
      completionSummary:
        'Tu as terminé une introduction réutilisable et corrigible.',
      recommendation:
        'Demain, reprends cette intro et ajoute deux exemples datés.',
      proof: {
        sourceType: 'objective',
        label: 'Méthode dissertation + objectif sélectif',
        summary:
          'La mission travaille une compétence visible dans les copies longues et les dossiers sélectifs.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'definition-tension',
          title: 'Écrire une définition et une tension du sujet.',
          durationMinutes: 10,
        },
        {
          id: 'problematique',
          title: 'Formuler une problématique claire en une phrase.',
          durationMinutes: 10,
        },
        {
          id: 'annonce-plan',
          title: 'Rédiger l’annonce du plan sans phrase creuse.',
          durationMinutes: 15,
        },
      ],
      resources: [
        {
          id: 'fiche-intro-hggsp',
          type: 'fiche',
          label: 'Fiche · Introduction HGGSP',
          meta: 'Méthode — dissertation et problématique',
        },
      ],
    },
    francais: {
      id: 'mission-philo-plan-technique',
      title: 'Technique',
      taskTitle: 'Plan détaillé sur la technique',
      subjectId: 'francais-philo',
      subjectLabel: 'Français · Philo',
      topicId: 'technique',
      topicLabel: 'méthode',
      reviewTitle: 'Plan détaillé',
      durationMinutes: 35,
      focusDurationMinutes: 25,
      masteryPercent: 59,
      reason:
        'Aujourd’hui, fais un plan détaillé court. C’est plus utile qu’une relecture longue, parce que tu vois tout de suite si ton raisonnement tient.',
      missionPageReason:
        'Une bonne copie commence par une structure défendable. Cette mission te fait produire un plan clair, pas une fiche de plus.',
      focusIntro:
        '25 min : thèse, objection, dépassement. Trois parties courtes, une idée par ligne.',
      completionSummary:
        'Tu as terminé un plan détaillé clair et réutilisable.',
      recommendation:
        'Demain, transforme une partie du plan en paragraphe rédigé.',
      proof: {
        sourceType: 'objective',
        label: 'Méthode de copie + clarté du raisonnement',
        summary:
          'La mission produit une trace corrigible et améliore la structure des copies.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'probleme',
          title: 'Écrire le problème central en une phrase simple.',
          durationMinutes: 8,
        },
        {
          id: 'trois-parties',
          title: 'Construire trois parties avec une idée directrice chacune.',
          durationMinutes: 17,
        },
        {
          id: 'test-plan',
          title: 'Tester le plan avec une objection et corriger une faiblesse.',
          durationMinutes: 10,
        },
      ],
      resources: [
        {
          id: 'fiche-plan-detaille',
          type: 'fiche',
          label: 'Fiche · Plan détaillé',
          meta: 'Méthode — structure et argument',
        },
      ],
    },
    anglais: {
      id: 'mission-anglais-arguments',
      title: 'Expression écrite',
      taskTitle: 'Expression écrite — reformuler 5 arguments',
      subjectId: 'anglais',
      subjectLabel: 'Anglais',
      topicId: 'expression-ecrite',
      topicLabel: 'expression',
      reviewTitle: 'Expression écrite',
      durationMinutes: 30,
      focusDurationMinutes: 25,
      masteryPercent: 61,
      reason:
        'Aujourd’hui, le bon geste est de reformuler cinq arguments. Tu gagnes en précision sans te perdre dans une longue fiche.',
      missionPageReason:
        'Une expression plus claire aide les contrôles et les dossiers. Cette mission travaille la formulation active.',
      focusIntro:
        '25 min : cinq idées, cinq reformulations, une correction de vocabulaire.',
      completionSummary:
        'Tu as terminé une courte mission d’expression avec cinq formulations réutilisables.',
      recommendation:
        'Demain, réutilise deux formulations dans un paragraphe complet.',
      proof: {
        sourceType: 'objective',
        label: 'Expression claire + régularité',
        summary:
          'La mission renforce la précision écrite avec une trace courte et réutilisable.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'choisir-arguments',
          title: 'Choisir cinq arguments sur le thème en cours.',
          durationMinutes: 8,
        },
        {
          id: 'reformuler',
          title: 'Reformuler chaque argument avec une structure différente.',
          durationMinutes: 14,
        },
        {
          id: 'corriger-vocabulaire',
          title: 'Corriger cinq mots ou expressions fragiles.',
          durationMinutes: 8,
        },
      ],
      resources: [
        {
          id: 'fiche-expression-anglaise',
          type: 'fiche',
          label: 'Fiche · Expression écrite',
          meta: 'Anglais — reformulation et précision',
        },
      ],
    },
    lv2: {
      id: 'mission-lv2-vocabulaire',
      title: 'Vocabulaire thématique',
      taskTitle: 'Vocabulaire thématique — fiche mémo 20 mots',
      subjectId: 'lv2',
      subjectLabel: 'LV2',
      topicId: 'vocabulaire',
      topicLabel: 'langue',
      reviewTitle: 'Vocabulaire',
      durationMinutes: 25,
      focusDurationMinutes: 20,
      masteryPercent: 54,
      reason:
        'Aujourd’hui, fais une fiche mémo de 20 mots. C’est court, mesurable, et directement utile pour reprendre confiance.',
      missionPageReason:
        'Une langue progresse par petites traces régulières. Cette mission crée une base claire à réviser demain.',
      focusIntro:
        '20 min : 20 mots, 5 phrases, une mini-révision à voix haute.',
      completionSummary:
        'Tu as terminé une mission courte de vocabulaire, avec une trace à revoir.',
      recommendation:
        'Demain, réutilise dix mots dans cinq phrases.',
      proof: {
        sourceType: 'objective',
        label: 'Régularité + trace révisable',
        summary:
          'La mission crée une base courte qui peut être révisée sans friction.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'liste-mots',
          title: 'Lister 20 mots liés au thème du moment.',
          durationMinutes: 10,
        },
        {
          id: 'phrases',
          title: 'Écrire cinq phrases avec les mots les plus utiles.',
          durationMinutes: 10,
        },
        {
          id: 'revision-voix-haute',
          title: 'Relire à voix haute et entourer cinq mots fragiles.',
          durationMinutes: 5,
        },
      ],
      resources: [
        {
          id: 'fiche-vocabulaire-lv2',
          type: 'fiche',
          label: 'Fiche · Vocabulaire thématique',
          meta: 'Langue — mémorisation courte',
        },
      ],
    },
    'grand-oral': {
      id: 'mission-projet-motive-preuves',
      title: 'Projet motivé',
      taskTitle: 'Projet motivé — noter 3 preuves concrètes',
      subjectId: 'grand-oral',
      subjectLabel: 'Objectif',
      topicId: 'preuves-dossier',
      topicLabel: 'dossier',
      reviewTitle: 'Projet motivé',
      durationMinutes: 30,
      focusDurationMinutes: 25,
      masteryPercent: 64,
      reason:
        'Aujourd’hui, le plus rentable est de noter trois preuves concrètes pour ton projet. C’est court et directement utile pour ton dossier.',
      missionPageReason:
        'Ton objectif ne se défend pas avec des phrases vagues. Cette mission transforme ton travail en preuves simples à réutiliser.',
      focusIntro:
        '25 min : trois preuves, une phrase d’explication chacune, puis une preuve à renforcer demain.',
      completionSummary:
        'Tu as terminé une mission utile pour ton dossier : trois preuves concrètes sont prêtes.',
      recommendation:
        'Demain, relie une preuve à une formation précise.',
      proof: {
        sourceType: 'objective',
        label: 'Dossier + projet motivé',
        summary:
          'La mission produit une trace directement réutilisable dans le dossier et les entretiens.',
        refs: [{ type: 'objective', id: DEFAULT_OBJECTIVE.id }],
      },
      steps: [
        {
          id: 'preuve-1',
          title: 'Noter une preuve liée à une matière forte.',
          durationMinutes: 8,
        },
        {
          id: 'preuve-2',
          title: 'Noter une preuve liée à un projet ou une initiative.',
          durationMinutes: 8,
        },
        {
          id: 'preuve-3',
          title: 'Écrire une phrase qui relie ces preuves à l’objectif.',
          durationMinutes: 14,
        },
      ],
      resources: [
        {
          id: 'fiche-projet-motive',
          type: 'objective-proof',
          label: 'Fiche · Projet motivé',
          meta: 'Dossier — preuves concrètes',
        },
      ],
    },
  };

  function todayISO() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    return (
      value !== null &&
      typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Object]'
    );
  }

  function deepMerge(base, override) {
    var out = clone(base);
    if (!isPlainObject(override)) return out;

    Object.keys(override).forEach(function (key) {
      if (Array.isArray(override[key])) {
        out[key] = clone(override[key]);
      } else if (isPlainObject(override[key]) && isPlainObject(out[key])) {
        out[key] = deepMerge(out[key], override[key]);
      } else if (override[key] !== undefined) {
        out[key] = override[key];
      }
    });

    return out;
  }

  function makeStepStates(mission, existingStepStates) {
    var existing = Array.isArray(existingStepStates) ? existingStepStates : [];
    return mission.steps.map(function (step, index) {
      var current = existing[index] || {};
      return {
        stepId: current.stepId || step.id,
        done: !!current.done,
        completedAt: current.completedAt || null,
      };
    });
  }

  function createMissionProgress(mission, options) {
    mission = mission || DEFAULT_MISSION;
    options = options || {};

    var stepStates = makeStepStates(mission, options.stepStates);
    var doneCount = stepStates.filter(function (step) { return step.done; }).length;
    var isComplete = stepStates.length > 0 && doneCount === stepStates.length;

    return {
      missionId: mission.id,
      date: options.date || todayISO(),
      status: options.status || (isComplete ? 'completed' : doneCount ? 'in_progress' : 'not_started'),
      stepStates: stepStates,
      startedAt: options.startedAt || null,
      completedAt: options.completedAt || null,
      focusSessionIds: Array.isArray(options.focusSessionIds)
        ? clone(options.focusSessionIds)
        : [],
    };
  }

  function makeId(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  function createFocusSession(mission, overrides) {
    mission = mission || DEFAULT_MISSION;
    overrides = overrides || {};

    var durationMinutes = overrides.durationMinutes || mission.focusDurationMinutes || 25;

    return deepMerge(
      {
        id: makeId('focus'),
        missionId: mission.id,
        status: 'idle',
        mode: 'focus',
        ambient: 'lofi',
        durationMinutes: durationMinutes,
        remainingSeconds: durationMinutes * 60,
        startedAt: null,
        pausedAt: null,
        endedAt: null,
        completedAt: null,
        completedStepIds: [],
      },
      overrides
    );
  }

  function normalizeSubjectKey(key) {
    return SUBJECT_IDS[key] || key || 'maths';
  }

  function normalizePriorityKeys(priorities) {
    var list = Array.isArray(priorities) ? priorities : [];
    return list.length ? list.slice() : ['maths'];
  }

  function trackSubjectsForSpeciality(speciality) {
    return SPECIALITY_SUBJECTS[speciality]
      ? SPECIALITY_SUBJECTS[speciality].slice()
      : DEFAULT_PROFILE.tracks.slice();
  }

  function createProfileFromOnboarding(onboarding, existingProfile) {
    onboarding = onboarding || {};
    var next = deepMerge(DEFAULT_PROFILE, existingProfile || {});
    var priorityKeys = normalizePriorityKeys(onboarding.priorites);

    next.classLevel = onboarding.classe || next.classLevel;
    next.tracks = trackSubjectsForSpeciality(onboarding.specialite);
    next.weeklyWorkloadHours = WEEKLY_HOURS[onboarding.rythme] || next.weeklyWorkloadHours;
    next.prioritySubjectIds = priorityKeys.map(normalizeSubjectKey);
    next.email = onboarding.email || next.email || null;
    next.onboarding = {
      goal: onboarding.goal || null,
      classe: onboarding.classe || null,
      specialite: onboarding.specialite || null,
      rythme: onboarding.rythme || null,
      priorites: priorityKeys.slice(),
      completedAt: onboarding.completedAt || null,
    };

    return next;
  }

  function createObjectiveFromOnboarding(onboarding, existingObjective) {
    onboarding = onboarding || {};
    var next = deepMerge(DEFAULT_OBJECTIVE, existingObjective || {});
    var goal = onboarding.goal || 'ingenieur';
    var prioritySubjectIds = normalizePriorityKeys(onboarding.priorites).map(normalizeSubjectKey);

    next.targetType = GOAL_TYPES[goal] || DEFAULT_OBJECTIVE.targetType;
    next.targetLabel = GOAL_LABELS[goal] || DEFAULT_OBJECTIVE.targetLabel;
    next.prioritySubjectIds = prioritySubjectIds;
    next.weightedSubjects = prioritySubjectIds.slice(0, 3).map(function (subjectId, index) {
      return {
        subjectId: subjectId,
        weight: [0.5, 0.3, 0.2][index] || 0.2,
        reason: index === 0
          ? 'Premier levier choisi pendant l onboarding.'
          : 'Priorite secondaire choisie pendant l onboarding.',
      };
    });

    return next;
  }

  function firstMissionKeyFromOnboarding(onboarding) {
    onboarding = onboarding || {};
    var priorities = normalizePriorityKeys(onboarding.priorites);
    if (priorities[0]) return priorities[0];
    var tracks = trackSubjectsForSpeciality(onboarding.specialite);
    return tracks[0] === 'physique-chimie' ? 'physique' : tracks[0] || 'maths';
  }

  function createMissionFromOnboarding(onboarding, existingMission) {
    var key = firstMissionKeyFromOnboarding(onboarding);
    var template = SUBJECT_MISSION_TEMPLATES[key];
    var base = key === 'maths' ? clone(DEFAULT_MISSION) : deepMerge(DEFAULT_MISSION, template || {});
    var mission = deepMerge(base, existingMission && existingMission.id === base.id ? existingMission : {});

    mission.kind = 'daily-mission';
    mission.scheduledFor = 'today';
    mission.scheduledLabel = 'maintenant';
    mission.scheduledDisplay = 'Maintenant';
    mission.priorityLabel = 'Prioritaire';

    return mission;
  }

  function deriveSubscriptionState(subscriptionState, totalMissionsCompleted) {
    var next = deepMerge(DEFAULT_SUBSCRIPTION_STATE, subscriptionState || {});
    var used = Math.max(0, Number(totalMissionsCompleted) || 0);
    next.freeMissionsUsed = Math.min(next.freeMissionLimit, used);
    next.locked = next.plan === 'free' && used >= next.freeMissionLimit;
    return next;
  }

  function normalizeScheduleItem(item, index) {
    var fallback = DEFAULT_SCHEDULE.items[index] || {};
    var next = deepMerge(
      {
        id: 'schedule-item-' + (index + 1),
        day: 'mon',
        start: '08:00',
        end: '09:00',
        kind: 'course',
        subjectId: null,
        title: 'Créneau',
        location: null,
        locked: false,
        source: 'student',
      },
      isPlainObject(item) ? item : fallback
    );
    var validDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var validKinds = ['course', 'activity', 'recommended_work', 'break'];

    if (validDays.indexOf(next.day) === -1) next.day = 'mon';
    if (validKinds.indexOf(next.kind) === -1) next.kind = 'course';
    if (!next.id) next.id = 'schedule-item-' + (index + 1);
    if (!next.start) next.start = '08:00';
    if (!next.end) next.end = '09:00';
    if (!next.title) next.title = 'Créneau';
    if (typeof next.locked !== 'boolean') next.locked = false;
    if (!next.source) next.source = 'student';

    return next;
  }

  function normalizeSchedule(rawSchedule, options) {
    options = options || {};
    var next = deepMerge(DEFAULT_SCHEDULE, isPlainObject(rawSchedule) ? rawSchedule : {});
    var rawItems = rawSchedule && Array.isArray(rawSchedule.items) ? rawSchedule.items : next.items;

    if (!isPlainObject(next.subjects)) next.subjects = clone(DEFAULT_SCHEDULE.subjects);
    Object.keys(next.subjects).forEach(function (subjectId) {
      var subject = isPlainObject(next.subjects[subjectId]) ? next.subjects[subjectId] : {};
      next.subjects[subjectId] = {
        label: subject.label || subjectId,
        color: subject.color || '#E7DECF',
        icon: subject.icon || 'ph-book-open-text',
      };
    });

    next.version = Number(next.version) || DEFAULT_SCHEDULE.version;
    next.timezone = next.timezone || DEFAULT_PROFILE.timezone;
    next.ownerProfileId = next.ownerProfileId || options.profileId || DEFAULT_PROFILE.id;
    next.items = rawItems.map(normalizeScheduleItem);

    return next;
  }

  function createDefaultAppState(options) {
    options = options || {};
    var date = options.date || todayISO();
    var mission = clone(DEFAULT_MISSION);
    var missionProgress = createMissionProgress(mission, { date: date });
    var state = {
      schemaVersion: SCHEMA_VERSION,
      profile: clone(DEFAULT_PROFILE),
      objective: clone(DEFAULT_OBJECTIVE),
      mission: mission,
      missionProgress: missionProgress,
      focusSession: createFocusSession(mission),
      subscriptionState: clone(DEFAULT_SUBSCRIPTION_STATE),
      schedule: normalizeSchedule(null, { profileId: DEFAULT_PROFILE.id }),
      totalMissionsCompleted: 0,
      activeDays: [],
      byDate: {},
    };

    state.byDate[date] = {
      missionId: mission.id,
      missionTitle: null,
      actionsChecked: missionProgress.stepStates.map(function (step) { return step.done; }),
      missionCompleted: false,
      completedAt: null,
      mood: null,
    };

    return options.overrides ? deepMerge(state, options.overrides) : state;
  }

  function normalizeAppState(rawState, options) {
    options = options || {};
    var date = options.date || todayISO();
    var state = deepMerge(createDefaultAppState({ date: date }), rawState || {});

    if (!Array.isArray(state.activeDays)) state.activeDays = [];
    if (!isPlainObject(state.byDate)) state.byDate = {};
    if (!isPlainObject(state.mission) || state.mission.id === DEFAULT_MISSION.id) {
      state.mission = clone(DEFAULT_MISSION);
    }
    if (!Array.isArray(state.mission.steps)) state.mission.steps = clone(DEFAULT_MISSION.steps);

    state.missionProgress = createMissionProgress(state.mission, deepMerge({ date: date }, state.missionProgress || {}));
    state.focusSession = createFocusSession(state.mission, state.focusSession || {});
    state.subscriptionState = deriveSubscriptionState(
      state.subscriptionState,
      state.totalMissionsCompleted
    );
    state.schedule = normalizeSchedule(state.schedule, {
      profileId: state.profile && state.profile.id,
    });

    if (!isPlainObject(state.byDate[date])) {
      state.byDate[date] = {
        missionId: state.mission.id,
        missionTitle: null,
        actionsChecked: state.missionProgress.stepStates.map(function (step) { return step.done; }),
        missionCompleted: false,
        completedAt: null,
        mood: null,
      };
    }

    return state;
  }

  var api = {
    schemaVersion: SCHEMA_VERSION,
    DEFAULT_PROFILE: clone(DEFAULT_PROFILE),
    DEFAULT_OBJECTIVE: clone(DEFAULT_OBJECTIVE),
    DEFAULT_MISSION: clone(DEFAULT_MISSION),
    DEFAULT_SUBSCRIPTION_STATE: clone(DEFAULT_SUBSCRIPTION_STATE),
    DEFAULT_SCHEDULE: clone(DEFAULT_SCHEDULE),
    todayISO: todayISO,
    createDefaultAppState: createDefaultAppState,
    normalizeAppState: normalizeAppState,
    normalizeSchedule: normalizeSchedule,
    createProfileFromOnboarding: createProfileFromOnboarding,
    createObjectiveFromOnboarding: createObjectiveFromOnboarding,
    createMissionFromOnboarding: createMissionFromOnboarding,
    createMissionProgress: createMissionProgress,
    createFocusSession: createFocusSession,
    deriveSubscriptionState: deriveSubscriptionState,
  };

  root.OutilPrepaModel = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
