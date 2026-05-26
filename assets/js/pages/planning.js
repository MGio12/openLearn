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
  var BOARD_HEIGHT = 900;
  var MINUTE_HEIGHT = BOARD_HEIGHT / (END_MINUTES - START_MINUTES);

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

  var assistantExamples = [
    'Ajoute 30 min de maths avant le controle de vendredi.',
    'Deplace le travail de physique mardi si je finis a 18h.',
    'Garde le mercredi leger, j ai deja atelier code.',
  ];

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
    return {
      startOffset: clampedStart - START_MINUTES,
      duration: Math.max(15, clampedEnd - clampedStart),
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
    event.style.top = (bounds.startOffset * MINUTE_HEIGHT) + 'px';
    event.style.height = Math.max(40, (bounds.duration * MINUTE_HEIGHT) - 5) + 'px';
    event.style.setProperty('--subject-color', subject.color || ACTIVITY_SUBJECT.color);
    event.setAttribute('aria-label', formatRange(item) + ' ' + item.title);

    event.appendChild(createElement('span', 'schedule-event__time', formatRange(item)));
    event.appendChild(createElement('span', 'schedule-event__kind', kindLabel(item.kind)));
    event.appendChild(createElement('strong', 'schedule-event__title', item.title));
    event.appendChild(createElement('span', 'schedule-event__meta', eventMeta(schedule, item)));
    return event;
  }

  function renderBoard(schedule) {
    if (!board) return;
    board.textContent = '';
    board.style.setProperty('--board-height', BOARD_HEIGHT + 'px');
    board.style.setProperty('--hour-height', (60 * MINUTE_HEIGHT) + 'px');

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
      var label = createElement('span', 'planning-time-label', String(hour).padStart(2, '0') + ':00');
      label.style.top = ((hour * 60 - START_MINUTES) * MINUTE_HEIGHT) + 'px';
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

  function renderAssistant() {
    if (!assistant || assistant.dataset.rendered === 'true') return;
    assistant.dataset.rendered = 'true';

    var head = createElement('div', 'planning-assistant__head');
    var icon = createElement('span', 'planning-assistant__icon');
    var iconGlyph = createElement('i', 'ph-bold ph-calendar-blank');
    var titleWrap = createElement('div');
    var title = createElement('h2', '', 'Assistant planning');
    var tag = createElement('span', 'planning-assistant__tag', 'pret pour agent IA');
    var form = createElement('div', 'assistant-input');
    var label = createElement('label', '', 'Demande');
    var textarea = createElement('textarea');
    var button = createElement('button', '', 'Analyser bientot');
    var examples = createElement('div', 'assistant-examples');
    var footnote = createElement(
      'p',
      'assistant-footnote',
      'Dans cette version, la zone prepare les demandes. Aucune sauvegarde distante ni generation IA n est lancee.'
    );

    title.id = 'planning-assistant-title';
    iconGlyph.setAttribute('aria-hidden', 'true');
    icon.appendChild(iconGlyph);
    titleWrap.appendChild(tag);
    titleWrap.appendChild(title);
    head.appendChild(icon);
    head.appendChild(titleWrap);

    textarea.id = 'planning-assistant-request';
    textarea.placeholder = assistantExamples[0];
    textarea.setAttribute('spellcheck', 'true');
    label.setAttribute('for', textarea.id);
    button.type = 'button';
    button.disabled = true;

    form.appendChild(label);
    form.appendChild(textarea);
    form.appendChild(button);

    assistantExamples.forEach(function (example) {
      examples.appendChild(createElement('div', 'assistant-example', example));
    });

    assistant.appendChild(head);
    assistant.appendChild(form);
    assistant.appendChild(examples);
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
    renderAssistant();
  }

  render();

  if (getStore() && typeof getStore().subscribe === 'function') {
    getStore().subscribe(render);
  }
})();
