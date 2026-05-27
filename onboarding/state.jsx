/* ============================================================
   Onboarding — state, screen definitions, mission engine
   · 9 étapes calibrage (au lieu de 10)
   · Échéances multi-select + filtrées par classe
   · Matières multi-select
   · Niveau simplifié (Fragile / Correct / Ambitieux / Autre)
   · Emojis associés aux choix → apparaissent dans le profil
   · Source de découverte supprimée
   · Temps aujourd'hui supprimé (dérivé de effortHebdo)
   · Nom : "Comment l'IA doit-elle s'adresser à toi ?"
   · Photo upload optionnelle pour emploi du temps
   ============================================================ */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ----------------------------------------------------------------
// SCREEN MANIFEST — 14 écrans au total
// Calibrage = 9 questions diagnostiques numérotées
// ----------------------------------------------------------------
const SCREENS = [
  { id: "intro",       type: "intro" },                            // 0  — pas numéroté
  { id: "classe",      type: "question", key: "classe",      step: 1 },
  { id: "objectif",    type: "question", key: "objectif",    step: 2 },
  { id: "moyenne",     type: "moyenne",  key: "moyenne",     step: 3 },
  { id: "echeance",    type: "echeance", key: "echeances",   step: 4 },  // MULTI
  { id: "matiere",     type: "question", key: "matieres",    step: 5 },  // MULTI
  { id: "blocage",     type: "question", key: "blocage",     step: 6 },
  { id: "niveau",      type: "question", key: "niveau",      step: 7 },
  { id: "effort",      type: "effort",   key: "effortHebdo", step: 8 },
  { id: "nom",         type: "nom",      key: "nom",         step: 9 },
  { id: "generation",  type: "generation" },
  { id: "mission",     type: "mission" },
  { id: "social",      type: "social" },
  { id: "recap",       type: "recap" },
  { id: "paywall",     type: "paywall" },
];

const TOTAL_STEPS = SCREENS.filter(s => s.step).length; // 9

// ----------------------------------------------------------------
// CHOICES — chaque choix porte un emoji qui apparaît dans le profil
// ----------------------------------------------------------------
const CLASSE_CHOICES = [
  { v: "Seconde",   label: "Seconde",   sub: "Je veux prendre de bonnes habitudes tôt.",        emoji: "🎒" },
  { v: "Première",  label: "Première",  sub: "Je construis mon dossier et mes spécialités.",    emoji: "📓" },
  { v: "Terminale", label: "Terminale", sub: "Bac, Parcoursup, ça approche.",                   emoji: "🎓" },
  { v: "Autre",     label: "Autre",     sub: "Je précise ma situation.",                        emoji: "✍️", other: true },
];

const OBJECTIF_CHOICES = [
  { v: "remonter",    label: "Remonter une matière",         sub: "Une matière tire mon dossier vers le bas.", emoji: "📈" },
  { v: "controle",    label: "Préparer un contrôle",         sub: "J'ai une échéance proche.",                 emoji: "📝" },
  { v: "stop-hasard", label: "Arrêter de travailler au hasard", sub: "Je fais des efforts, mais à l'aveugle.", emoji: "🎯" },
  { v: "dossier",     label: "Construire un meilleur dossier", sub: "Bulletins, spécialités, Parcoursup.",     emoji: "📂" },
  { v: "routine",     label: "Tenir une routine",            sub: "Un peu, mais régulièrement.",                emoji: "🔁" },
  { v: "confiance",   label: "Reprendre confiance",          sub: "Une première action que je peux finir.",     emoji: "✨" },
  { v: "Autre",       label: "Autre",                        sub: "Je précise mon objectif.",                    emoji: "✍️", other: true },
];

const MATIERE_CHOICES = [
  { v: "Mathématiques",    label: "Mathématiques",    emoji: "∑" },
  { v: "Physique-chimie",  label: "Physique-chimie",  emoji: "⚗︎" },
  { v: "SVT",              label: "SVT",              emoji: "🌿" },
  { v: "SES",              label: "SES",              emoji: "📊" },
  { v: "HGGSP",            label: "HGGSP",            emoji: "🗺︎" },
  { v: "Histoire-géo",     label: "Histoire-géo",     emoji: "🏛︎" },
  { v: "Français",         label: "Français",         emoji: "✒︎" },
  { v: "Philosophie",      label: "Philosophie",      emoji: "💭" },
  { v: "Anglais",          label: "Anglais",          emoji: "🇬🇧" },
  { v: "Autre",            label: "Autre",            emoji: "✍️", other: true },
];

const BLOCAGE_CHOICES = [
  { v: "go",           label: "Je veux juste commencer",            sub: "Lance-moi une mission rentable, on précisera plus tard.",   emoji: "▶" },
  { v: "method-gap",   label: "Je comprends le cours, je rate les exercices", sub: "La méthode ne sort pas au bon moment.",          emoji: "🧩" },
  { v: "late",         label: "Je suis en retard",                  sub: "J'ai trop de chapitres à reprendre.",                        emoji: "🕰" },
  { v: "combo",        label: "C'est un combo de plusieurs trucs",  sub: "On en cible un en priorité, le plus rentable.",              emoji: "🪢" },
  { v: "Autre",        label: "Autre",                              sub: "Je précise mon blocage.",                                    emoji: "✍️", other: true },
];

const NIVEAU_CHOICES = [
  { v: "Fragile",    label: "Fragile",    sub: "Je comprends parfois, mais ça casse vite.",    emoji: "🌱" },
  { v: "Correct",    label: "Correct",    sub: "Je peux avancer avec une méthode claire.",     emoji: "⚖︎" },
  { v: "Ambitieux",  label: "Ambitieux",  sub: "Je veux des exercices plus exigeants.",        emoji: "🚀" },
  { v: "Autre",      label: "Autre",      sub: "Je précise mon niveau.",                       emoji: "✍️", other: true },
];

// ÉCHÉANCES — déclinées par classe, contexte psy adapté
const ECHEANCES_ALL = [
  // Universal
  { v: "controle-7",   label: "Contrôle cette semaine",   emoji: "⏰", days: 7,  classes: ["Seconde","Première","Terminale"], psy: "imminent" },
  { v: "controle-14",  label: "Contrôle dans 2 semaines", emoji: "📝", days: 14, classes: ["Seconde","Première","Terminale"], psy: "near" },
  { v: "ds-trimestre", label: "DS de fin de trimestre",   emoji: "📓", days: 45, classes: ["Seconde","Première","Terminale"], psy: "medium" },

  // Seconde
  { v: "speobjectif",  label: "Choix des spécialités",    emoji: "🧭", days: 90, classes: ["Seconde"], psy: "spe" },
  { v: "orientation-seconde", label: "Mon passage en Première", emoji: "🛤", days: 180, classes: ["Seconde"], psy: "passage" },

  // Première
  { v: "bac-fr",       label: "Bac de français (EAF)",    emoji: "✒︎", days: 120, classes: ["Première"], psy: "eaf" },
  { v: "bac-blanc-1",  label: "Bac blanc",                emoji: "📋", days: 60, classes: ["Première"], psy: "blanc" },
  { v: "specialite-fin", label: "Épreuve anticipée de spé", emoji: "🧪", days: 90, classes: ["Première"], psy: "spec-anticipee" },

  // Terminale
  { v: "bac-blanc-t",  label: "Bac blanc",                emoji: "📋", days: 60, classes: ["Terminale"], psy: "blanc-T" },
  { v: "grand-oral",   label: "Grand oral",               emoji: "🎤", days: 150, classes: ["Terminale"], psy: "grand-oral" },
  { v: "bac",          label: "Bac",                      emoji: "🎓", days: 180, classes: ["Terminale"], psy: "bac" },

  // Première + Terminale
  { v: "parcoursup",   label: "Parcoursup",               emoji: "📤", days: 90, classes: ["Première","Terminale"], psy: "parcoursup" },
];

// Encouragement psy contextuel par échéance (clé = psy)
const ECHEANCE_PSY = {
  imminent:        "C'est imminent. À partir de maintenant, chaque mission compte double.",
  near:            "On a juste le temps de poser un plan. Une mission par jour fait l'écart.",
  medium:          "Tu prends de l'avance — c'est exactement le bon timing.",
  spe:             "Le bon choix de spé maintenant te suit jusqu'au bac. On t'aide à y voir clair.",
  passage:         "Le bon dossier de Seconde, c'est ce qui ouvre les portes en Première. On le construit ensemble.",
  blanc:           "Le bac blanc est ton meilleur indicateur. Mieux vaut le préparer que le subir.",
  "blanc-T":       "Le bac blanc, c'est ton dernier vrai signal avant juin. On le prend au sérieux.",
  eaf:             "Le bac de français se joue maintenant — pas en juin. Anticiper, c'est gagner.",
  "spec-anticipee":"Cette épreuve compte déjà dans ton dossier Parcoursup. Elle mérite un vrai plan.",
  "grand-oral":    "20 minutes qui pèsent 10 % du bac. Avec de la méthode, c'est jouable.",
  bac:             "Six mois, c'est court. Mais c'est largement suffisant si on cible bien.",
  parcoursup:      "Un dossier construit tôt est un dossier qui passe.",
};

function echeancesForClasse(classe) {
  if (!classe) return ECHEANCES_ALL.filter(e => e.classes.includes("Première"));
  return ECHEANCES_ALL.filter(e => e.classes.includes(classe));
}

function echeancePsyMessage(v) {
  const c = ECHEANCES_ALL.find(c => c.v === v);
  return c ? ECHEANCE_PSY[c.psy] : null;
}

const CHOICES_BY_KEY = {
  classe:    CLASSE_CHOICES,
  objectif:  OBJECTIF_CHOICES,
  matieres:  MATIERE_CHOICES,
  blocage:   BLOCAGE_CHOICES,
  niveau:    NIVEAU_CHOICES,
};

// ----------------------------------------------------------------
// PROFILE LINES — what the side panel shows.
// emoji is computed from the answer's choice.
// ----------------------------------------------------------------
const PROFILE_LINES = [
  { key: "classe",     label: "Classe" },
  { key: "objectif",   label: "Objectif",       formatter: (v) => Array.isArray(v) ? (v.length ? (humanizeChoice("objectif", v[0]) + (v.length > 1 ? ` +${v.length-1}` : "")) : null) : humanizeChoice("objectif", v) },
  { key: "moyenne",    label: "Moyenne visée",  formatter: (v) => v ? `${v.current.toFixed(1)} → ${v.target.toFixed(1)}/20` : null, emoji: () => "📈" },
  { key: "echeances",  label: "Échéances",      formatter: (v) => Array.isArray(v) && v.length ? echeancesShortLabel(v) : null, emoji: () => "📅" },
  { key: "matieres",   label: "Matières",       formatter: (v) => Array.isArray(v) && v.length ? v.slice(0,2).join(" · ") + (v.length > 2 ? ` +${v.length-2}` : "") : null },
  { key: "blocage",    label: "Blocage",        formatter: (v) => blocageLabel(v), keyForMission: true },
  { key: "niveau",     label: "Profil",         keyForMission: true },
  { key: "effortHebdo",label: "Engagement",     formatter: (v) => v != null ? `${typeof v === "object" ? v.hours : v} h / semaine` : null, emoji: () => "⏳" },
  { key: "nom",        label: "Nom",            emoji: () => "👤" },
];

function humanizeChoice(key, raw) {
  const list = CHOICES_BY_KEY[key];
  if (!list) return raw;
  const c = list.find(c => c.v === raw);
  return c ? c.label : raw;
}

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function echeanceLabel(v) {
  const c = ECHEANCES_ALL.find(c => c.v === v);
  return c ? c.label : v;
}
function echeancesShortLabel(arr) {
  if (!arr || !arr.length) return null;
  const labels = arr.map(echeanceLabel);
  if (labels.length === 1) return labels[0];
  return `${labels[0]} +${labels.length - 1}`;
}
function blocageLabel(v) {
  const c = BLOCAGE_CHOICES.find(c => c.v === v);
  return c ? c.label : v;
}
function choiceEmoji(key, value) {
  if (key === "moyenne") return "📈";
  if (key === "echeances") return "📅";
  if (key === "effortHebdo") return "⏳";
  if (key === "nom") return "👤";

  const list = CHOICES_BY_KEY[key];
  if (!list) return "·";
  if (Array.isArray(value)) {
    const first = list.find(c => c.v === value[0]);
    return first?.emoji || "·";
  }
  const c = list.find(c => c.v === value);
  return c?.emoji || "✍️";
}

// ----------------------------------------------------------------
// MISSION ENGINE — duration derived from effortHebdo
// ----------------------------------------------------------------
function computeMission(profile) {
  const matieres = Array.isArray(profile.matieres) ? profile.matieres : [];
  const m   = matieres[0] || "Mathématiques";
  const b   = profile.blocage || "method-gap";
  const niv = profile.niveau || "Correct";

  // duration : effortHebdo / 7, clamped 15..60
  const weekly = profile.effortHebdo ?? 4;
  let duree = Math.round((weekly * 60) / 7 / 5) * 5; // round to nearest 5
  duree = Math.max(15, Math.min(60, duree || 30));

  const TEMPLATES = {
    "Mathématiques": {
      "method-gap":   { a: "Refaire un exercice type contrôle en écrivant la méthode AVANT chaque calcul.", t: "Une solution propre avec les étapes nommées : données, méthode, calcul, vérification." },
      "start":        { a: "Choisir UN chapitre et lister 3 exercices clés, dans l'ordre de difficulté.", t: "Une liste écrite : chapitre, exercices choisis, point bloquant attendu." },
      "small-errors": { a: "Refaire 2 exercices ratés en notant à voix haute chaque étape, puis relire pour traquer les erreurs.", t: "Une grille de relecture : étape, vérification, correction." },
      "method":       { a: "Reconstituer la méthode type d'un exercice du chapitre actuel, sans les calculs.", t: "Une fiche méthode : 4 à 6 étapes nommées, dans l'ordre." },
      "late":         { a: "Reprendre la première page du chapitre en retard et refaire UN exercice de base.", t: "Un exercice résolu, propre, avec la définition réécrite en haut." },
      "focus":        { a: "Faire UN seul exercice court en 25 min, téléphone hors de portée.", t: "L'exercice résolu, et 1 ligne sur ce que tu as appris." },
      "combo":        { a: "On attaque la méthode d'abord : refaire UN exercice en nommant chaque étape avant de calculer.", t: "Méthode nommée + calculs + vérification, en 1 page." },
    },
    "Physique-chimie": {
      "method-gap":   { a: "Classer 3 exercices par situation physique, puis choisir la formule adaptée.", t: "Pour chaque exo : grandeur cherchée, données, formule, unité vérifiée." },
      "start":        { a: "Faire la fiche \"grandeurs et unités\" du chapitre en cours.", t: "Tableau : grandeur, symbole, unité, formule de référence." },
      "small-errors": { a: "Refaire un exercice en vérifiant l'homogénéité à chaque ligne.", t: "Les calculs avec unités à chaque étape, encadrées." },
      "method":       { a: "Écrire le mode opératoire type d'un exercice de mécanique.", t: "Schéma, référentiel, bilan des forces, équation, conclusion." },
      "late":         { a: "Reprendre la définition clé du chapitre en retard et faire l'exercice 1.", t: "Définition réécrite + exercice de base résolu." },
      "focus":        { a: "Un seul exercice de chimie, 25 min, en notant les étapes au fur et à mesure.", t: "Exercice résolu + 1 difficulté rencontrée notée." },
      "combo":        { a: "On attaque le plus rentable : refaire UN exercice et nommer la méthode avant le calcul.", t: "Méthode nommée + résolution + vérification d'unités." },
    },
    "SVT": {
      "method-gap":   { a: "Construire une réponse type sur un document : analyse → interprétation → conclusion.", t: "Une réponse en 3 paragraphes, chaque partie annoncée." },
      "start":        { a: "Choisir UN document du chapitre en cours et écrire ce qu'il montre, en 3 lignes.", t: "Description / interprétation / conclusion, 3 lignes." },
      "small-errors": { a: "Reprendre une réponse de DS et corriger ce qui manque selon le barème.", t: "La réponse complétée + ce qui avait été oublié, en marge." },
      "method":       { a: "Écrire la méthode \"étude d'un document\" en 5 étapes maximum.", t: "Une fiche méthode SVT, 5 étapes nommées." },
      "late":         { a: "Reprendre la première page du chapitre en retard et faire UNE question d'analyse.", t: "1 question d'analyse traitée." },
      "focus":        { a: "Lire UN document et y répondre en 20 min, sans interruption.", t: "Réponse écrite, 1 difficulté rencontrée." },
      "combo":        { a: "On attaque la méthode d'analyse : appliquer le triptyque sur UN document.", t: "Analyse / interprétation / conclusion, structurée." },
    },
    "SES": {
      "method-gap":   { a: "Écrire l'introduction d'une EC1 sur une notion vue cette semaine.", t: "Définition de la notion + question + plan." },
      "start":        { a: "Choisir une notion du chapitre et écrire sa définition + un mécanisme.", t: "Notion · définition · mécanisme · 1 exemple." },
      "small-errors": { a: "Reprendre une réponse notée et la réécrire en utilisant le vocabulaire exact.", t: "Réponse v2 + liste des mots-clés ajoutés." },
      "method":       { a: "Construire le plan détaillé d'un EC3 sur un sujet déjà vu.", t: "Intro · 2 axes · 2 sous-parties · exemple par sous-partie." },
      "late":         { a: "Reprendre les 3 notions clés du chapitre en retard et les définir en une ligne.", t: "3 définitions précises, écrites de mémoire." },
      "focus":        { a: "Rédiger UNE question EC1 en 25 min, sans regarder le cours d'abord.", t: "Réponse rédigée + correction avec le cours après coup." },
      "combo":        { a: "On attaque la méthode d'argumentation : structurer une EC1 propre.", t: "Définition + mécanisme + exemple, en 1 paragraphe construit." },
    },
    "HGGSP": {
      "method-gap":   { a: "Écrire l'introduction et le plan d'une composition sur un thème vu.", t: "Problématique + 2 ou 3 axes + 1 exemple par axe." },
      "start":        { a: "Choisir UN thème du programme et noter 5 dates clés avec un repère par date.", t: "5 dates + 1 phrase de contexte par date." },
      "small-errors": { a: "Reprendre une composition et y ajouter 2 références précises (auteurs, dates).", t: "Composition v2 + références injectées en marge." },
      "method":       { a: "Rédiger la fiche méthode \"composition HGGSP\" en 6 étapes.", t: "Méthode écrite, 6 étapes nommées dans l'ordre." },
      "late":         { a: "Lire la fiche de synthèse du chapitre en retard et faire 3 cartes mémoire.", t: "3 cartes mémoire : recto / verso." },
      "focus":        { a: "Travailler UN seul axe d'une composition, 25 min.", t: "1 axe complet : annonce + 2 sous-parties + 1 référence par sous-partie." },
      "combo":        { a: "On attaque la méthode de composition : intro + plan + 1 exemple par axe.", t: "Intro structurée + plan détaillé + références." },
    },
    "Histoire-géo": {
      "method-gap":   { a: "Construire le plan d'une composition + intro en partant d'un sujet déjà vu.", t: "Problématique + 2 ou 3 axes + 1 exemple par axe." },
      "start":        { a: "Noter 5 dates clés d'un chapitre avec un repère par date.", t: "5 dates + 1 phrase de contexte par date." },
      "small-errors": { a: "Reprendre une copie et ajouter 2 références précises.", t: "Copie v2 + références en marge." },
      "method":       { a: "Rédiger la fiche méthode \"composition\" en 5 étapes.", t: "Méthode écrite, 5 étapes nommées." },
      "late":         { a: "Reprendre la synthèse du chapitre en retard + faire 3 cartes mémoire.", t: "3 cartes recto/verso." },
      "focus":        { a: "Travailler UN seul axe d'une composition, 25 min.", t: "1 axe complet : annonce + 2 sous-parties + 1 référence par sous-partie." },
      "combo":        { a: "On attaque la composition : intro + plan détaillé + références.", t: "Intro + plan + 1 référence par axe." },
    },
    "Français": {
      "method-gap":   { a: "Construire une introduction et un plan détaillé sur un sujet déjà vu.", t: "Problématique, 2 ou 3 axes, 1 exemple précis par axe." },
      "start":        { a: "Choisir UN texte étudié et en écrire 3 lignes : thèse, mouvement, procédé clé.", t: "3 lignes sur 1 texte, structurées." },
      "small-errors": { a: "Reprendre un commentaire et remplacer les paraphrases par des analyses.", t: "Le commentaire v2, paraphrases barrées et analyses ajoutées." },
      "method":       { a: "Rédiger la méthode \"commentaire\" en 5 étapes maximum.", t: "Méthode commentaire, 5 étapes nommées." },
      "late":         { a: "Lire UN texte de l'œuvre et faire une fiche de mouvement.", t: "Fiche : mouvement, idée, 2 procédés, citation." },
      "focus":        { a: "Écrire UN paragraphe d'analyse littéraire en 25 min.", t: "1 paragraphe : argument, citation, procédé, interprétation." },
      "combo":        { a: "On attaque le commentaire : appliquer la méthode sur UN court extrait.", t: "Analyse structurée + 2 procédés + citation." },
    },
    "Philosophie": {
      "method-gap":   { a: "Construire l'introduction + le plan d'une dissertation sur un sujet vu.", t: "Problème + thèse + 2 ou 3 mouvements." },
      "start":        { a: "Choisir UNE notion du programme et écrire sa définition + un mouvement de pensée.", t: "Notion · définition · 1 thèse · 1 contre-thèse." },
      "small-errors": { a: "Reprendre une dissert et ajouter 2 références philosophiques précises.", t: "Dissert v2 + auteurs et concepts injectés." },
      "method":       { a: "Rédiger la fiche méthode \"dissertation philo\" en 5 étapes.", t: "Méthode dissertation, 5 étapes nommées." },
      "late":         { a: "Lire UNE fiche de synthèse d'une notion et noter 3 thèses-clés.", t: "3 thèses + auteur + 1 argument par thèse." },
      "focus":        { a: "Écrire UN seul mouvement de dissertation en 25 min.", t: "1 mouvement : thèse + argument + référence + transition." },
      "combo":        { a: "On attaque la dissertation : intro + 1 mouvement structuré.", t: "Intro + thèse + 1 référence." },
    },
    "Anglais": {
      "method-gap":   { a: "Faire UN exercice de compréhension écrite en suivant la méthode AREL (Annoncer, Rechercher, Expliquer, Lier).", t: "Réponses structurées + citations + analyse." },
      "start":        { a: "Choisir UN texte du chapitre et faire la liste des 10 mots-clés.", t: "Liste de vocabulaire ciblé + traduction." },
      "small-errors": { a: "Refaire une expression écrite en corrigeant les erreurs grammaticales.", t: "Texte v2 + erreurs annotées en marge." },
      "method":       { a: "Rédiger la méthode \"essay\" en 4 étapes : intro, body, examples, conclusion.", t: "Fiche méthode essay, étapes nommées." },
      "late":         { a: "Reprendre la fiche du chapitre en retard et faire 5 phrases-modèles.", t: "5 phrases utilisables en expression." },
      "focus":        { a: "Faire UN exercice de listening ou reading en 25 min.", t: "Exercice complet + 1 difficulté notée." },
      "combo":        { a: "On attaque l'expression écrite : 1 paragraphe structuré, vocabulaire ciblé.", t: "Paragraphe + 5 expressions enrichies." },
    },
  };

  const fallback = { a: "Travailler un exercice ciblé sur ton blocage en écrivant la méthode avant de produire.", t: "Une trace écrite : méthode nommée, production, vérification." };
  const matiereBank = TEMPLATES[m] || TEMPLATES["Mathématiques"];
  // "go" = friction-reducer : on prend la mission "method-gap" qui est la plus universelle.
  let tpl = matiereBank[b];
  if (!tpl && b === "go") tpl = matiereBank["method-gap"];
  if (!tpl) tpl = fallback;

  let action = tpl.a;
  if (duree <= 15) {
    action = `[Version courte ${duree} min] ${action}`;
  } else if (duree >= 50) {
    action = `${action} Puis vérifier la solution à voix haute en relisant chaque étape.`;
  }

  const WHY = {
    "go":           "Pas de diagnostic figé : on lance une mission rentable maintenant et on affinera dès demain.",
    "method-gap":   "Elle attaque ton blocage : nommer la méthode AVANT le calcul change la qualité de la réponse.",
    "start":        "Elle réduit l'angoisse de la page blanche : une première action minuscule mais finie.",
    "small-errors": "Elle force la relecture explicite — les erreurs bêtes ne tiennent pas face à une vérification ciblée.",
    "method":       "Elle te fait écrire la méthode AVANT le résultat. C'est ce qui distingue une bonne copie d'une copie ratée.",
    "late":         "Elle ne demande pas de tout rattraper. Elle reprend la première zone rentable proprement.",
    "focus":        "Elle est calibrée pour ton temps réel : un périmètre court, une fin claire, rien à débordant.",
    "combo":        "On cible le plus rentable d'abord — pas tout en même temps. Une mission claire, pas un menu.",
  };
  const why = WHY[b] || "Elle attaque ton blocage sans te demander de refaire tout le chapitre.";

  return {
    action,
    duree,
    why,
    trace: tpl.t,
    matiere: m,
  };
}

// ----------------------------------------------------------------
// SOCIAL PROOF — focus on normalisation de la continuation
// ----------------------------------------------------------------
function getSocialStats(profile) {
  const classe = profile.classe || "Première";
  const matieres = Array.isArray(profile.matieres) ? profile.matieres : [];
  const matiere = matieres[0] || "Mathématiques";
  const blocage = profile.blocage || "method-gap";

  return [
    {
      num: "78 %",
      label: `des élèves de ${classe} dans ton cas finissent leur première mission.`,
      source: "Données internes",
      tone: "stabilo",
    },
    {
      num: "84 %",
      label: `continuent au moins une semaine après le début de l'essai.`,
      source: "Données internes",
      tone: "default",
    },
    {
      num: "9 / 10",
      label: `parents notent une régularité installée après 1 mois d'usage.`,
      source: "Enquête parents, n=312",
      tone: "green",
    },
  ];
}

// ----------------------------------------------------------------
// TESTIMONIALS — mix élèves + parents, adapté au blocage
// (placeholders honnêtes, à remplacer par vrais retours utilisateurs)
// ----------------------------------------------------------------
function getTestimonials(profile) {
  const blocage = profile.blocage || "method-gap";
  const matieres = Array.isArray(profile.matieres) ? profile.matieres : [];
  const matiere = matieres[0] || "Mathématiques";

  const STUDENT_BY_BLOCAGE = {
    "go":          { quote: "J'ai cliqué « je veux juste commencer ». La première mission m'a pris 25 min, j'ai fini. Le lendemain, le plan était déjà mieux calibré.", name: "Lina K.", meta: "Première · sciences", stars: 5, initials: "LK", color: "is-stabilo" },
    "method-gap":  { quote: "Ce que je n'arrivais pas à faire : nommer la méthode AVANT de calculer. Maintenant j'écris idée, formule, vérif. Mes profs voient la différence.", name: "Tom B.", meta: "Terminale · physique-chimie", stars: 5, initials: "TB", color: "is-blue" },
    "late":        { quote: "Quand t'es en retard tu veux tout ouvrir d'un coup. La mission m'a dit non, juste cette page, juste cet exo. Et ça a marché.", name: "Maïa T.", meta: "Première · HGGSP", stars: 5, initials: "MT", color: "is-green" },
    "combo":       { quote: "Je voulais tout traiter en même temps. La mission a dit non, on commence par la méthode. Tout le reste s'est débloqué après.", name: "Sacha P.", meta: "Terminale · SES", stars: 5, initials: "SP", color: "is-stabilo" },
  };
  const studentMain = STUDENT_BY_BLOCAGE[blocage] || STUDENT_BY_BLOCAGE["method-gap"];

  const studentSecondary = {
    quote: "Le plus utile, c'est la limite de temps. En 25 minutes, je sais exactement ce que je dois rendre. Pas de débordement, pas de culpabilité après.",
    name: "Inès B.", meta: "Terminale · maths spé",
    stars: 5, initials: "IB", color: "is-blue",
  };

  const parentSophie = {
    quote: "Ma fille s'y met sans qu'on ait à le lui demander. Pour nous, c'est ça la vraie différence — la fin du conflit du soir, pas juste une note qui monte.",
    name: "Sophie L.", meta: "Maman de Léa, Première",
    stars: 5, initials: "SL", color: "is-green", parent: true,
  };
  const parentMarc = {
    quote: "Le rapport qualité-prix est sans comparaison avec les cours particuliers qu'on avait pris l'an dernier. Ça coûte 8× moins cher et il s'y met plus volontiers.",
    name: "Marc D.", meta: "Papa de Tom, Terminale",
    stars: 4, initials: "MD", color: "is-stabilo", parent: true,
  };

  return [studentMain, studentSecondary, parentSophie, parentMarc];
}

const TESTIMONIAL_BANK = {
  "go":           { quote: "J'ai cliqué « je veux juste commencer ». La première mission m'a pris 25 min. Le lendemain, le plan était déjà mieux calibré.", who: "Élève de Première" },
  "method-gap":   { quote: "Ce qui m'a aidé, c'est que la mission ne disait pas juste « revois le chapitre ». Elle me disait quoi produire à la fin.", who: "Élève de Première, matière scientifique" },
  "start":        { quote: "J'ouvrais mes cours et je tournais en rond. La première mission a juste dit « fais ça, en 20 min ». J'ai fini.", who: "Élève de Terminale" },
  "small-errors": { quote: "La vérification écrite, c'est bête, mais c'est ce qui m'a fait gagner 2 points de moyenne sur 3 contrôles.", who: "Élève de Première, sciences" },
  "method":       { quote: "Je savais répondre, mais je ne savais pas le montrer. Les missions m'ont forcé à écrire la méthode, pas juste le résultat.", who: "Élève de Terminale, philo" },
  "late":         { quote: "Quand on est en retard on veut tout ouvrir d'un coup. La mission m'a dit non, juste cette page, juste cet exo.", who: "Élève de Première" },
  "focus":        { quote: "Le plus utile était la limite de temps. En 25 minutes, je savais exactement ce que je devais rendre.", who: "Élève de Terminale" },
  "combo":        { quote: "Je voulais tout traiter en même temps. La mission a dit « non, on commence par la méthode ». Tout le reste s'est débloqué après.", who: "Élève de Première" },
};

const ADVICE_BY_BLOCAGE = {
  "go":           "Pas de pression sur le diagnostic parfait. Une première mission menée à terme te dit déjà beaucoup sur la suite.",
  "start":        "Commence par une trace minuscule : une définition, un exercice, une erreur corrigée. Le premier objectif est de sortir du flou.",
  "method-gap":   "Avant de calculer, écris la méthode en une phrase. Si tu ne peux pas la nommer, tu risques de faire au hasard.",
  "small-errors": "Les erreurs bêtes coûtent souvent des points parce qu'elles ne sont pas relues au bon moment. Ta mission doit inclure une vérification explicite.",
  "method":       "Une bonne réponse ne montre pas seulement le résultat. Elle montre pourquoi tu as choisi cette étape.",
  "late":         "En retard, tu n'as pas besoin de tout ouvrir. Tu as besoin d'une première zone rentable à reprendre proprement.",
  "focus":        "Une session courte avec une trace précise vaut mieux qu'une heure ouverte sans fin claire.",
  "combo":        "Plusieurs blocages à la fois, c'est normal. On en cible UN à la fois — celui qui débloque le plus d'autres.",
};

// ----------------------------------------------------------------
// DATE HELPERS
// ----------------------------------------------------------------
function formatDateFr(d) {
  const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

// ----------------------------------------------------------------
// PERSIST
// ----------------------------------------------------------------
const LS_KEY = "objectif-lycee-onboarding-v3";
let storageWarningShown = false;

function reportStorageIssue(action, error) {
  if (storageWarningShown) return;
  storageWarningShown = true;
  if (window.console && typeof window.console.warn === "function") {
    window.console.warn(`Onboarding localStorage ${action} failed`, error);
  }

  const show = () => {
    if (!document.body || document.querySelector("[data-ob-storage-warning]")) return;
    const warning = document.createElement("div");
    warning.className = "ob-storage-warning";
    warning.dataset.obStorageWarning = "true";
    warning.setAttribute("role", "status");
    warning.textContent = "Sauvegarde locale indisponible : ton diagnostic reste utilisable, mais il ne sera peut-être pas conservé après fermeture.";
    document.body.appendChild(warning);
  };

  if (document.body) {
    show();
  } else {
    window.addEventListener("DOMContentLoaded", show, { once: true });
  }
}

function loadState() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); }
  catch (error) {
    reportStorageIssue("read", error);
    return {};
  }
}
function saveState(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); }
  catch (error) { reportStorageIssue("write", error); }
}

// ----------------------------------------------------------------
// EXPORTS
// ----------------------------------------------------------------
Object.assign(window, {
  SCREENS, TOTAL_STEPS,
  CLASSE_CHOICES, OBJECTIF_CHOICES, MATIERE_CHOICES, BLOCAGE_CHOICES,
  NIVEAU_CHOICES, ECHEANCES_ALL,
  CHOICES_BY_KEY,
  PROFILE_LINES,
  echeanceLabel, echeancesShortLabel, blocageLabel, echeancesForClasse, echeancePsyMessage, choiceEmoji,
  computeMission, getSocialStats, getTestimonials, TESTIMONIAL_BANK, ADVICE_BY_BLOCAGE,
  formatDateFr, addDays,
  loadState, saveState, reportStorageIssue,
});
