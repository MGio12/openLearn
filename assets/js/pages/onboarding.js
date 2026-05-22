/* ============================================================
   OBJECTIF LYCEE - Page onboarding
   ------------------------------------------------------------
   Parcours multi-etapes, apercu de mission et persistance des
   reponses dans le store local.
   ============================================================ */
(function () {
  'use strict';

const totalSteps = 8;
let current = 1;
const state = {
  goal: null,
  classe: null,
  specialite: null,
  rythme: null,
  priorites: [],
};

const stepNodes = document.querySelectorAll(".step");
const dots = document.querySelectorAll("#progress .dot");
const backBtn = document.getElementById("back");

const MISSIONS = {
  maths:       { ic: 'ph-calculator', label: 'Maths spé',        title: 'Exponentielle et dérivation — exercice type contrôle', duration: '25 min' },
  physique:    { ic: 'ph-flask', label: 'Physique-chimie',       title: 'Énergie mécanique — refaire l\'exercice clé',          duration: '35 min' },
  svt:         { ic: 'ph-leaf', label: 'SVT',                   title: 'Génétique — schéma bilan et questions flash',          duration: '30 min' },
  ses:         { ic: 'ph-chart-bar', label: 'SES',              title: 'Croissance — relier deux notions au cours',            duration: '30 min' },
  hggsp:       { ic: 'ph-globe-hemisphere-west', label: 'HGGSP', title: 'Composer une intro sur la puissance',                  duration: '30 min' },
  francais:    { ic: 'ph-notebook', label: 'Français · Philo',  title: 'Plan détaillé sur la technique',                       duration: '30 min' },
  anglais:     { ic: 'ph-chat-text', label: 'Anglais',          title: 'Expression écrite — reformuler 5 arguments',           duration: '25 min' },
  lv2:         { ic: 'ph-translate', label: 'LV2',              title: 'Vocabulaire thématique — fiche mémo 20 mots',          duration: '20 min' },
  'grand-oral':{ ic: 'ph-microphone-stage', label: 'Grand oral', title: 'Projet motivé — noter 3 preuves concrètes',            duration: '25 min' }
};
const SPECIALITE_DEF = { 'maths-pc': 'maths', 'maths-svt': 'svt', 'ses-hggsp': 'ses', autre: 'maths' };
const SUBJECT_ICONS = {
  maths: 'ph-calculator',
  'physique-chimie': 'ph-flask',
  svt: 'ph-leaf',
  ses: 'ph-chart-bar',
  hggsp: 'ph-globe-hemisphere-west',
  'francais-philo': 'ph-notebook',
  anglais: 'ph-chat-text',
  lv2: 'ph-translate',
  'grand-oral': 'ph-microphone-stage',
};

function onboardingPayload(extra) {
  const emailInput = document.getElementById("ob-email");
  return Object.assign({
    goal: state.goal,
    classe: state.classe,
    specialite: state.specialite,
    rythme: state.rythme,
    priorites: state.priorites.slice(),
    email: emailInput ? emailInput.value.trim() : null,
  }, extra || {});
}

function firstMissionFromModel() {
  if (!window.OutilPrepaModel || typeof window.OutilPrepaModel.createMissionFromOnboarding !== 'function') {
    return null;
  }
  return window.OutilPrepaModel.createMissionFromOnboarding(onboardingPayload());
}

function previewFromMission(mission) {
  if (!mission) return null;
  const minutes = mission.focusDurationMinutes || mission.durationMinutes || 25;
  return {
    ic: SUBJECT_ICONS[mission.subjectId] || 'ph-calculator',
    label: mission.subjectLabel || 'Mission',
    title: mission.taskTitle || mission.title,
    duration: minutes + ' min',
  };
}

function persistOnboarding(extra) {
  if (!window.OutilPrepa || typeof window.OutilPrepa.applyOnboarding !== 'function') return;
  window.OutilPrepa.applyOnboarding(onboardingPayload(extra));
}

function trackOnboarding(name, extra) {
  if (!window.OLAnalytics || typeof window.OLAnalytics.track !== 'function') return;
  window.OLAnalytics.track(name, Object.assign({
    page: 'onboarding',
    step: current,
    goal: state.goal,
    classe: state.classe,
    specialite: state.specialite,
    priority_count: state.priorites.length,
  }, extra || {}));
}

function getPreviewMission(idx) {
  if (idx === 0) {
    const missionPreview = previewFromMission(firstMissionFromModel());
    if (missionPreview) return missionPreview;
  }
  const keys = [
    state.priorites[0] || SPECIALITE_DEF[state.specialite] || 'maths',
    state.priorites[1] || 'physique',
    state.priorites[2] || 'grand-oral'
  ];
  if (keys[1] === keys[0]) keys[1] = keys[0] === 'physique' ? 'maths' : 'physique';
  if (keys[2] === keys[0] || keys[2] === keys[1]) keys[2] = 'grand-oral';
  return MISSIONS[keys[idx]] || MISSIONS['maths'];
}

function updatePreview() {
  const suffixes = [' — pour commencer', ' — matinée', ' — après-midi'];
  const card = document.getElementById('preview-week-card');
  const rows = card.querySelectorAll('.preview-row');
  for (let i = 0; i < 3; i++) {
    const m = getPreviewMission(i);
    setPhosphorIcon(rows[i].querySelector('.ic'), m.ic);
    rows[i].querySelector('.top').textContent = m.label + suffixes[i];
    rows[i].querySelector('.title').textContent = m.title;
    rows[i].querySelector('.duration').textContent = m.duration;
  }
}

function setPhosphorIcon(holder, iconName) {
  if (!holder) return;
  holder.textContent = '';
  const icon = document.createElement('i');
  icon.className = 'ph-bold ' + iconName;
  icon.setAttribute('aria-hidden', 'true');
  holder.appendChild(icon);
}

const CLASSE_LABELS = { premiere:'Première', terminale:'Terminale' };
const SPECIALITE_LABELS = { 'maths-pc':'Maths · physique-chimie', 'maths-svt':'Maths · SVT', 'ses-hggsp':'SES · HGGSP', autre:'Spécialités à préciser' };
const RYTHME_LABELS = { leger:'2-3 h/sem.', moyen:'4-6 h/sem.', intense:'7 h+/sem.', indecis:'À calibrer' };
const GOAL_LABELS = { ingenieur:'École d ingénieur', commerce:'École de commerce', sante:'Santé ou sciences', 'droit-sciencespo':'Droit / IEP', indecis:'Objectif à préciser' };

function updateDoneCard() {
  const m = getPreviewMission(0);
  setPhosphorIcon(document.getElementById('done-ic'), m.ic);
  document.getElementById('done-top').textContent = m.label + ' — suggéré pour commencer';
  document.getElementById('done-title').textContent = m.title;
  document.getElementById('done-dur').textContent = m.duration;

  const recap = document.getElementById('done-recap');
  if (!recap) return;
  const chips = [
    state.goal ? GOAL_LABELS[state.goal] : null,
    state.classe ? CLASSE_LABELS[state.classe] : null,
    state.specialite ? SPECIALITE_LABELS[state.specialite] : null,
    state.rythme ? RYTHME_LABELS[state.rythme] : null,
  ].filter(Boolean);
  recap.innerHTML = '';
  chips.forEach((c) => {
    const chip = document.createElement('span');
    chip.className = 'done-recap-chip';
    chip.textContent = c;
    recap.appendChild(chip);
  });
}

function goTo(n) {
  if (n < 1 || n > totalSteps) return;
  current = n;
  stepNodes.forEach((s) =>
    s.classList.toggle("active", Number(s.dataset.step) === n),
  );
  dots.forEach((d, i) => {
    d.classList.remove("current", "done");
    if (i + 1 < n) d.classList.add("done");
    else if (i + 1 === n) d.classList.add("current");
  });
  backBtn.hidden = n === 1 || n === totalSteps;
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (n === 6) updatePreview();
  if (n === 8) updateDoneCard();
}

backBtn.addEventListener("click", () => goTo(current - 1));

document.querySelectorAll("[data-options]").forEach((group) => {
  const key = group.dataset.options;
  group.querySelectorAll(".opt").forEach((opt) => {
    opt.addEventListener("click", () => {
      group
        .querySelectorAll(".opt")
        .forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      state[key] = opt.dataset.value;
      trackOnboarding("onboarding_step_completed", { step: current });
      setTimeout(() => goTo(current + 1), 280);
    });
  });
});

const chipsGroup = document.querySelector('[data-chips="priorites"]');
const continuePriorites = document.getElementById("continue-priorites");
if (chipsGroup) {
  chipsGroup.querySelectorAll(".chip-opt").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("selected");
      const val = chip.dataset.value;
      const idx = state.priorites.indexOf(val);
      if (idx >= 0) state.priorites.splice(idx, 1);
      else state.priorites.push(val);
      continuePriorites.disabled = state.priorites.length === 0;
    });
  });
  continuePriorites.addEventListener("click", () => {
    trackOnboarding("onboarding_step_completed", { step: current });
    goTo(current + 1);
  });
}

document
  .getElementById("continue-preview")
  .addEventListener("click", () => {
    trackOnboarding("onboarding_step_completed", { step: current });
    persistOnboarding();
    window.location.href = "mission.html";
  });

document.getElementById("finish").addEventListener("click", () => {
  const input = document.getElementById("ob-email");
  const error = document.getElementById("ob-email-error");
  const email = input.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    input.setAttribute("aria-invalid", "true");
    input.classList.add("is-invalid");
    if (error) error.hidden = false;
    input.focus();
    return;
  }
  input.removeAttribute("aria-invalid");
  input.classList.remove("is-invalid");
  if (error) error.hidden = true;
  persistOnboarding({ email });
  trackOnboarding("onboarding_completed", { step: current });
  goTo(current + 1);
});

document.getElementById("ob-email").addEventListener("input", (e) => {
  const error = document.getElementById("ob-email-error");
  if (e.target.classList.contains("is-invalid")) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim());
    if (valid) {
      e.target.removeAttribute("aria-invalid");
      e.target.classList.remove("is-invalid");
      if (error) error.hidden = true;
    }
  }
});
})();
