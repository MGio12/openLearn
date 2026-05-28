/* ============================================================
   OBJECTIF LYCEE - Page planning
   ------------------------------------------------------------
   Rend l'emploi du temps depuis window.OutilPrepa.schedule.
   Le futur assistant devra proposer des mutations sur item.id.
   ============================================================ */
(function () {
  'use strict';

  var START_HOUR = 8;
  var END_HOUR = 20;
  var START_MINUTES = START_HOUR * 60;
  var END_MINUTES = END_HOUR * 60;
  var TOTAL_MINUTES = END_MINUTES - START_MINUTES;

  var DAYS = [
    { id: 'mon', short: 'Lun.', label: 'Lundi' },
    { id: 'tue', short: 'Mar.', label: 'Mardi' },
    { id: 'wed', short: 'Mer.', label: 'Mercredi' },
    { id: 'thu', short: 'Jeu.', label: 'Jeudi' },
    { id: 'fri', short: 'Ven.', label: 'Vendredi' },
    { id: 'sat', short: 'Sam.', label: 'Samedi' },
    { id: 'sun', short: 'Dim.', label: 'Dimanche' },
  ];

  var KIND_LABELS = {
    course: 'Cours',
    activity: 'Activite',
    recommended_work: 'Travail conseille',
    break: 'Pause',
  };

  var ACTIVITY_SUBJECT = {
    label: 'Activites',
    color: '#E7DECF',
    icon: 'ph-person-simple-run',
  };

  var board = document.querySelector('[data-planning-board]');
  var mobileAgenda = document.querySelector('[data-mobile-agenda]');
  var legend = document.querySelector('[data-subject-legend]');
  var assistant = document.querySelector('[data-planning-assistant]');
  var scheduleMeta = document.querySelector('[data-schedule-meta]');

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (typeof text === 'string') element.textContent = text;
    return element;
  }

  function getStore() {
    return window.OutilPrepa || null;
  }

  function getSchedule() {
    var store = getStore();
    if (store && store.schedule) return store.schedule;
    if (window.OutilPrepaModel && window.OutilPrepaModel.DEFAULT_SCHEDULE) {
      return window.OutilPrepaModel.DEFAULT_SCHEDULE;
    }
    return { subjects: {}, items: [], timezone: 'Europe/Paris', version: 1 };
  }

  function subjectFor(schedule, item) {
    if (item.subjectId && schedule.subjects && schedule.subjects[item.subjectId]) {
      return schedule.subjects[item.subjectId];
    }
    return ACTIVITY_SUBJECT;
  }

  function kindLabel(kind) {
    return KIND_LABELS[kind] || 'Creneau';
  }

  function parseTime(value) {
    var parts = String(value || '00:00').split(':');
    var hours = Number(parts[0]);
    var minutes = Number(parts[1]);
    if (!Number.isFinite(hours)) hours = 0;
    if (!Number.isFinite(minutes)) minutes = 0;
    return hours * 60 + minutes;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function eventBounds(item) {
    var start = parseTime(item.start);
    var end = parseTime(item.end);
    var clampedStart = clamp(start, START_MINUTES, END_MINUTES);
    var clampedEnd = clamp(Math.max(end, start + 15), START_MINUTES, END_MINUTES);
    if (clampedEnd <= clampedStart) {
      clampedEnd = clamp(clampedStart + 15, START_MINUTES, END_MINUTES);
    }

    return {
      startPercent: ((clampedStart - START_MINUTES) / TOTAL_MINUTES) * 100,
      durationPercent: ((clampedEnd - clampedStart) / TOTAL_MINUTES) * 100,
      durationMinutes: Math.max(0, clampedEnd - clampedStart),
    };
  }

  function formatRange(item) {
    return (item.start || '') + '-' + (item.end || '');
  }

  function itemsForDay(schedule, dayId) {
    return (schedule.items || [])
      .filter(function (item) { return item && item.day === dayId; })
      .slice()
      .sort(function (a, b) { return parseTime(a.start) - parseTime(b.start); });
  }

  function eventMeta(schedule, item) {
    var subject = subjectFor(schedule, item);
    var bits = [];
    if (item.kind === 'activity') {
      bits.push('Activite');
    } else if (subject.label) {
      bits.push(subject.label);
    }
    if (item.location) bits.push(item.location);
    return bits.join(' - ');
  }

  function desktopEventTitle(schedule, item) {
    var subject = subjectFor(schedule, item);
    if (item.kind === 'course') return subject.label || item.title || 'Cours';
    if (item.kind === 'recommended_work') return 'Travail · ' + (subject.label || item.title || 'matiere');
    if (item.kind === 'activity') return item.title || 'Activite';
    if (item.kind === 'break') return 'Pause';
    return item.title || kindLabel(item.kind);
  }

  function eventAriaLabel(schedule, item) {
    return [
      formatRange(item),
      kindLabel(item.kind),
      item.title,
      eventMeta(schedule, item),
    ].filter(Boolean).join(' - ');
  }

  function renderLegend(schedule) {
    if (!legend) return;
    legend.textContent = '';

    Object.keys(schedule.subjects || {}).forEach(function (subjectId) {
      var subject = schedule.subjects[subjectId];
      var item = createElement('span', 'legend-item');
      var swatch = createElement('span', 'legend-item__swatch');
      swatch.style.setProperty('--subject-color', subject.color || ACTIVITY_SUBJECT.color);
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(subject.label || subjectId));
      legend.appendChild(item);
    });

    var activity = createElement('span', 'legend-item');
    var swatch = createElement('span', 'legend-item__swatch');
    swatch.style.setProperty('--subject-color', ACTIVITY_SUBJECT.color);
    activity.appendChild(swatch);
    activity.appendChild(document.createTextNode(ACTIVITY_SUBJECT.label));
    legend.appendChild(activity);
  }

  function makeDesktopEvent(schedule, item) {
    var subject = subjectFor(schedule, item);
    var bounds = eventBounds(item);
    var event = createElement('article', 'schedule-event schedule-event--' + item.kind);

    event.dataset.scheduleItemId = item.id;
    event.dataset.scheduleSource = item.source || 'student';
    event.style.top = bounds.startPercent.toFixed(4) + '%';
    event.style.height = 'max(24px, calc(' + bounds.durationPercent.toFixed(4) + '% - 4px))';
    event.style.setProperty('--subject-color', subject.color || ACTIVITY_SUBJECT.color);
    event.setAttribute('aria-label', eventAriaLabel(schedule, item));

    event.appendChild(createElement('strong', 'schedule-event__title', desktopEventTitle(schedule, item)));
    return event;
  }

  function renderBoard(schedule) {
    if (!board) return;
    board.textContent = '';

    var head = createElement('div', 'planning-board__head');
    head.appendChild(createElement('div', 'planning-board__corner'));
    DAYS.forEach(function (day) {
      var heading = createElement('div', 'planning-day-heading');
      heading.appendChild(createElement('strong', '', day.short));
      heading.appendChild(createElement('span', '', day.label));
      head.appendChild(heading);
    });
    board.appendChild(head);

    var body = createElement('div', 'planning-board__body');
    var timeRail = createElement('div', 'planning-time-rail');
    for (var hour = START_HOUR; hour <= END_HOUR; hour++) {
      var labelClass = 'planning-time-label';
      if (hour === START_HOUR) labelClass += ' planning-time-label--start';
      if (hour === END_HOUR) labelClass += ' planning-time-label--end';
      var label = createElement('span', labelClass, String(hour).padStart(2, '0') + ':00');
      label.style.top = (((hour * 60 - START_MINUTES) / TOTAL_MINUTES) * 100).toFixed(4) + '%';
      timeRail.appendChild(label);
    }
    body.appendChild(timeRail);

    DAYS.forEach(function (day) {
      var track = createElement('section', 'planning-day-track');
      track.setAttribute('aria-label', day.label);
      itemsForDay(schedule, day.id).forEach(function (item) {
        track.appendChild(makeDesktopEvent(schedule, item));
      });
      body.appendChild(track);
    });

    board.appendChild(body);
  }

  function makeMobileEvent(schedule, item) {
    var subject = subjectFor(schedule, item);
    var event = createElement('article', 'mobile-event mobile-event--' + item.kind);
    var time = createElement('div', 'mobile-event__time', formatRange(item));
    var body = createElement('div', 'mobile-event__body');

    event.dataset.scheduleItemId = item.id;
    event.dataset.scheduleSource = item.source || 'student';
    event.style.setProperty('--subject-color', subject.color || ACTIVITY_SUBJECT.color);

    body.appendChild(createElement('strong', '', item.title));
    body.appendChild(createElement('span', '', kindLabel(item.kind) + ' - ' + eventMeta(schedule, item)));
    event.appendChild(time);
    event.appendChild(body);
    return event;
  }

  function renderMobileAgenda(schedule) {
    if (!mobileAgenda) return;
    mobileAgenda.textContent = '';

    DAYS.forEach(function (day) {
      var items = itemsForDay(schedule, day.id);
      var section = createElement('section', 'mobile-day');
      var head = createElement('div', 'mobile-day__head');
      var list = createElement('div', 'mobile-day__items');

      head.appendChild(createElement('strong', '', day.label));
      head.appendChild(createElement('span', '', items.length + ' creneaux'));
      items.forEach(function (item) {
        list.appendChild(makeMobileEvent(schedule, item));
      });

      section.appendChild(head);
      section.appendChild(list);
      mobileAgenda.appendChild(section);
    });
  }

  function recommendedWorkItems(schedule) {
    return (schedule.items || [])
      .filter(function (item) { return item && item.kind === 'recommended_work'; })
      .slice()
      .sort(function (a, b) {
        var dayA = DAYS.findIndex(function (day) { return day.id === a.day; });
        var dayB = DAYS.findIndex(function (day) { return day.id === b.day; });
        if (dayA !== dayB) return dayA - dayB;
        return parseTime(a.start) - parseTime(b.start);
      });
  }

  function formatDuration(minutes) {
    var hours = Math.floor(minutes / 60);
    var rest = minutes % 60;
    if (!hours) return rest + ' min';
    if (!rest) return hours + ' h';
    return hours + ' h ' + String(rest).padStart(2, '0');
  }

  function nextRecommendedLabel(schedule, item) {
    if (!item) return 'Aucun ajout conseille';
    var subject = subjectFor(schedule, item);
    var day = DAYS.find(function (candidate) { return candidate.id === item.day; });
    return (day ? day.short : 'Jour') + ' ' + (item.start || '') + ' · ' + (subject.label || item.title || 'matiere');
  }

  function renderAssistant(schedule) {
    if (!assistant) return;
    assistant.textContent = '';

    var recommendedItems = recommendedWorkItems(schedule);
    var totalMinutes = recommendedItems.reduce(function (sum, item) {
      return sum + eventBounds(item).durationMinutes;
    }, 0);
    var nextItem = recommendedItems[0] || null;

    var head = createElement('div', 'planning-assistant__head');
    var icon = createElement('span', 'planning-assistant__icon');
    var iconGlyph = createElement('i', 'ph-bold ph-calendar-blank');
    var titleWrap = createElement('div');
    var title = createElement('h2', '', 'Assistant planning');
    var tag = createElement('span', 'planning-assistant__tag', 'repere utile');
    var summary = createElement(
      'p',
      'assistant-summary',
      'Objectif Lycee ajoute les creneaux utiles, sans recopier Pronote.'
    );
    var stats = createElement('div', 'assistant-stats');
    var countStat = createElement('div', 'assistant-stat');
    var durationStat = createElement('div', 'assistant-stat');
    var next = createElement('div', 'assistant-next');
    var footnote = createElement(
      'p',
      'assistant-footnote',
      'Les details restent dans chaque creneau mobile et dans les libelles accessibles.'
    );

    title.id = 'planning-assistant-title';
    iconGlyph.setAttribute('aria-hidden', 'true');
    icon.appendChild(iconGlyph);
    titleWrap.appendChild(tag);
    titleWrap.appendChild(title);
    head.appendChild(icon);
    head.appendChild(titleWrap);

    countStat.appendChild(createElement('strong', '', String(recommendedItems.length)));
    countStat.appendChild(createElement('span', '', recommendedItems.length > 1 ? 'creneaux utiles' : 'creneau utile'));
    durationStat.appendChild(createElement('strong', '', formatDuration(totalMinutes)));
    durationStat.appendChild(createElement('span', '', 'travail ajoute'));
    stats.appendChild(countStat);
    stats.appendChild(durationStat);
    next.appendChild(createElement('span', '', 'Prochain ajout'));
    next.appendChild(createElement('strong', '', nextRecommendedLabel(schedule, nextItem)));

    assistant.appendChild(head);
    assistant.appendChild(summary);
    assistant.appendChild(stats);
    assistant.appendChild(next);
    assistant.appendChild(footnote);
  }

  function render() {
    var schedule = getSchedule();
    if (scheduleMeta) {
      scheduleMeta.textContent = (schedule.timezone || 'Europe/Paris') + ' - v' + (schedule.version || 1);
    }
    renderLegend(schedule);
    renderBoard(schedule);
    renderMobileAgenda(schedule);
    renderAssistant(schedule);
  }

  render();

  if (getStore() && typeof getStore().subscribe === 'function') {
    getStore().subscribe(render);
  }
})();
