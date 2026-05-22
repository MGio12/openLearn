/* ============================================================
   OUTIL PREPA - Rendu mission du jour
   ------------------------------------------------------------
   Lit la mission depuis scripts/model.js / scripts/state.js et
   hydrate les fragments HTML qui affichent la mission courante.
   ============================================================ */
(function (root) {
  'use strict';

  function getMission() {
    if (root.OutilPrepa && root.OutilPrepa.mission) return root.OutilPrepa.mission;
    if (root.OutilPrepaModel && root.OutilPrepaModel.DEFAULT_MISSION) {
      return root.OutilPrepaModel.DEFAULT_MISSION;
    }
    return null;
  }

  function getProgress() {
    return root.OutilPrepa && root.OutilPrepa.missionProgress
      ? root.OutilPrepa.missionProgress
      : null;
  }

  function durationLabel(minutes) {
    return String(minutes || 0) + ' min';
  }

  function plural(count, singular, pluralLabel) {
    return String(count) + ' ' + (count > 1 ? (pluralLabel || singular + 's') : singular);
  }

  function difficultyLabel(level) {
    var max = 3;
    var safeLevel = Math.max(0, Math.min(max, Number(level) || 0));
    return safeLevel + '/' + max;
  }

  function setPhosphorIcon(element, iconName) {
    if (!element) return;
    element.textContent = '';
    var icon = document.createElement('i');
    icon.className = 'ph-bold ' + iconName;
    icon.setAttribute('aria-hidden', 'true');
    element.appendChild(icon);
  }

  function setCheckIcon(element, isDone) {
    if (!element) return;
    element.textContent = '';
    if (isDone) setPhosphorIcon(element, 'ph-check');
  }

  function doneStepCount() {
    var progress = getProgress();
    if (!progress || !Array.isArray(progress.stepStates)) return 0;
    return progress.stepStates.filter(function (step) { return !!step.done; }).length;
  }

  function isStepDone(index) {
    var progress = getProgress();
    if (!progress || !Array.isArray(progress.stepStates)) return false;
    return !!(progress.stepStates[index] && progress.stepStates[index].done);
  }

  var setText = root.OutilPrepaDom.setText;

  function setDocumentTitle(mission) {
    var titleTarget = document.querySelector('[data-daily-mission-document-title]');
    if (titleTarget) document.title = 'Objectif Lycée — Mission · ' + mission.title;
  }

  function renderTextTargets(mission) {
    var steps = Array.isArray(mission.steps) ? mission.steps : [];
    var resources = Array.isArray(mission.resources) ? mission.resources : [];
    var duration = durationLabel(mission.durationMinutes);
    var focusDuration = durationLabel(mission.focusDurationMinutes);
    var label = 'Mission du jour · ' + mission.subjectLabel + ' · ' + mission.scheduledLabel;
    var stepCount = steps.length;
    var completed = doneStepCount();

    setText('[data-daily-mission-label]', label);
    setText('[data-daily-mission-title]', mission.title);
    setText('[data-daily-mission-task-title]', mission.taskTitle || mission.title);
    setText('[data-daily-mission-review-title]', mission.reviewTitle || mission.title);
    setText('[data-daily-mission-reason]', mission.reason);
    setText('[data-daily-mission-page-reason]', mission.missionPageReason || mission.reason);
    setText('[data-daily-mission-duration]', duration);
    setText('[data-daily-mission-focus-duration]', focusDuration);
    setText('[data-daily-mission-duration-cta]', 'Commencer la mission · ' + duration);
    setText('[data-daily-mission-focus-cta]', 'Commencer le focus · ' + focusDuration);
    setText('[data-daily-mission-focus-lede]', mission.focusIntro || mission.reason);
    setText('[data-daily-mission-done-summary]', mission.completionSummary || '');
    setText('[data-daily-mission-mastery]', String(mission.masteryPercent || 0) + '%');
    setText('[data-daily-mission-mastery-chip]', 'Maîtrise ' + (mission.masteryPercent || 0) + '%');
    setText('[data-daily-mission-proof-label]', mission.proof && mission.proof.label ? mission.proof.label : '');
    setText('[data-daily-mission-proof-summary]', mission.proof && mission.proof.summary ? mission.proof.summary : '');
    setText('[data-daily-mission-subject]', mission.subjectLabel || mission.subjectId || '');
    setText('[data-daily-mission-subject-topic]', (mission.subjectLabel || '') + ' · ' + (mission.topicLabel || mission.topicId || ''));
    setText('[data-daily-mission-deadline]', mission.deadlineLabel || '');
    setText('[data-daily-mission-priority]', mission.priorityLabel || '');
    setText('[data-daily-mission-scheduled]', mission.scheduledDisplay || mission.scheduledLabel || '');
    setText('[data-daily-mission-difficulty]', difficultyLabel(mission.difficultyLevel));
    setText('[data-daily-mission-step-count]', plural(stepCount, 'étape'));
    setText('[data-daily-mission-step-done-count]', plural(completed, 'terminée'));
    setText('[data-daily-mission-reminder-title]', mission.title + ' — ' + duration);
    setText('[data-daily-mission-recommendation]', mission.recommendation || '');

    document.querySelectorAll('[data-daily-mission-step-title]').forEach(function (element) {
      var index = Number(element.getAttribute('data-daily-mission-step-title'));
      if (steps[index]) element.textContent = steps[index].title;
    });
    document.querySelectorAll('[data-daily-mission-step-duration]').forEach(function (element) {
      var index = Number(element.getAttribute('data-daily-mission-step-duration'));
      if (steps[index]) element.textContent = durationLabel(steps[index].durationMinutes);
    });
    document.querySelectorAll('[data-daily-mission-resource-count]').forEach(function (element) {
      element.textContent = plural(resources.length, 'ressource');
    });
  }

  function renderChecklist(mission) {
    var container = document.querySelector('[data-daily-mission-checklist]');
    if (!container) return;
    if (container.getAttribute('data-daily-mission-rendered') === 'true') return;

    container.innerHTML = '';
    (mission.steps || []).forEach(function (step, index) {
      var done = isStepDone(index);
      var item = document.createElement('div');
      item.className = 'item' + (done ? ' done' : '');
      item.setAttribute('role', 'checkbox');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-checked', String(done));
      item.setAttribute('data-mission-step', step.id || String(index + 1));

      var box = document.createElement('div');
      box.className = 'box';
      box.setAttribute('aria-hidden', 'true');
      setCheckIcon(box, done);

      var label = document.createElement('div');
      label.className = 'label';
      label.textContent = step.title;

      var duration = document.createElement('div');
      duration.className = 'dur';
      duration.textContent = durationLabel(step.durationMinutes);

      item.appendChild(box);
      item.appendChild(label);
      item.appendChild(duration);
      container.appendChild(item);
    });
    container.setAttribute('data-daily-mission-rendered', 'true');
  }

  function renderFocusSubtasks(mission) {
    var container = document.querySelector('[data-daily-mission-focus-steps]');
    if (!container) return;
    if (container.getAttribute('data-daily-mission-rendered') === 'true') return;

    container.innerHTML = '';
    (mission.steps || []).forEach(function (step, index) {
      var done = isStepDone(index);
      var subtask = document.createElement('div');
      subtask.className = 'subtask' + (done ? ' done' : '');
      subtask.setAttribute('data-mission-step', step.id || String(index + 1));

      var box = document.createElement('span');
      box.className = 'box';
      setCheckIcon(box, done);

      var label = document.createElement('span');
      label.className = 'label';
      label.textContent = step.title;

      subtask.appendChild(box);
      subtask.appendChild(label);
      container.appendChild(subtask);
    });
    container.setAttribute('data-daily-mission-rendered', 'true');
  }

  function resourceIcon(resource) {
    if (resource.type === 'objective-proof') return 'ph-target';
    if (resource.type === 'fiche') return 'ph-notebook';
    if (resource.type === 'cours') return 'ph-book-open-text';
    if (resource.type === 'document') return 'ph-file-text';
    return 'ph-file-text';
  }

  function resourceColor(resource) {
    if (resource.type === 'objective-proof') return 'var(--green)';
    if (resource.type === 'fiche') return 'var(--blue)';
    return 'var(--beige)';
  }

  function renderResources(mission) {
    var container = document.querySelector('[data-daily-mission-resources]');
    if (!container) return;
    if (container.getAttribute('data-daily-mission-rendered') === 'true') return;

    container.innerHTML = '';
    (mission.resources || []).forEach(function (resource) {
      var item = document.createElement('div');
      item.className = 'resource resource--static';
      item.setAttribute('aria-label', resource.label);

      var icon = document.createElement('div');
      icon.className = 'ic';
      icon.style.background = resourceColor(resource);
      setPhosphorIcon(icon, resourceIcon(resource));

      var copy = document.createElement('div');
      copy.className = 'copy';

      var name = document.createElement('span');
      name.className = 'name';
      name.textContent = resource.label;

      var meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = resource.meta || resource.type || '';

      var arrow = document.createElement('span');
      arrow.className = 'arrow';
      setPhosphorIcon(arrow, 'ph-arrow-right');

      copy.appendChild(name);
      copy.appendChild(meta);
      item.appendChild(icon);
      item.appendChild(copy);
      item.appendChild(arrow);
      container.appendChild(item);
    });
    container.setAttribute('data-daily-mission-rendered', 'true');
  }

  function toObjectiveTopic(mission) {
    var source = mission.objectiveTopic || {};
    return {
      id: mission.topicId || mission.id,
      nom: mission.title,
      totalOccurrences: source.totalOccurrences || 1,
      score: source.score || 1,
      years: Array.isArray(source.years) ? source.years.slice() : [],
    };
  }

  function render() {
    var mission = getMission();
    if (!mission) return;
    setDocumentTitle(mission);
    renderTextTargets(mission);
    renderChecklist(mission);
    renderFocusSubtasks(mission);
    renderResources(mission);
  }

  root.OutilPrepaMissionUI = {
    getMission: getMission,
    render: render,
    toObjectiveTopic: toObjectiveTopic,
  };

  render();

  if (root.OutilPrepa && typeof root.OutilPrepa.subscribe === 'function') {
    root.OutilPrepa.subscribe(render);
  }
})(typeof window !== 'undefined' ? window : globalThis);
