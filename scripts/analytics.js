(function () {
  "use strict";

  var WEB_ANALYTICS_SRC = "/_vercel/insights/script.js";
  var SPEED_INSIGHTS_SRC = "/_vercel/speed-insights/script.js";
  var MAX_STRING_LENGTH = 80;

  var ALLOWED_EVENTS = {
    onboarding_started: true,
    onboarding_step_completed: true,
    onboarding_completed: true,
    mission_opened: true,
    mission_step_toggled: true,
    mission_started: true,
    focus_started: true,
    focus_paused: true,
    focus_resumed: true,
    focus_completed: true,
    checkout_viewed: true,
    billing_selected: true,
    checkout_clicked: true,
    course_opened: true,
    course_reveal_clicked: true,
    course_exercise_answered: true,
    course_method_choice: true,
  };

  var ALLOWED_PROPS = {
    page: true,
    source: true,
    step: true,
    goal: true,
    classe: true,
    specialite: true,
    subject: true,
    plan: true,
    billing: true,
    duration_minutes: true,
    completed: true,
    priority_count: true,
  };

  var DATASET_TO_PROP = {
    analyticsPage: "page",
    analyticsSource: "source",
    analyticsStep: "step",
    analyticsGoal: "goal",
    analyticsClasse: "classe",
    analyticsSpecialite: "specialite",
    analyticsSubject: "subject",
    analyticsPlan: "plan",
    analyticsBilling: "billing",
    analyticsDurationMinutes: "duration_minutes",
    analyticsCompleted: "completed",
    analyticsPriorityCount: "priority_count",
  };

  var SENSITIVE_KEY_RE = /(email|mail|name|nom|prenom|first|last|student|eleve|answer|response|reponse|texte|text|stripe|checkout_?url|url|token|secret|password|query|phone|tel)/i;
  var EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  var STRIPE_URL_RE = /https:\/\/(?:buy|checkout)\.stripe\.com\//i;
  var SENSITIVE_QUERY_RE = /(?:[?&]|%3F|%26)(?:email|mail|token|secret|session|checkout|stripe|password)=/i;

  function isLocalEnvironment() {
    var location = window.location || {};
    var hostname = location.hostname || "";
    return location.protocol === "file:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1";
  }

  function canTrack() {
    return typeof window !== "undefined" && !isLocalEnvironment();
  }

  function initQueue(name, queueName) {
    if (typeof window[name] === "function") return;

    window[name] = function () {
      window[queueName] = window[queueName] || [];
      window[queueName].push(arguments);
    };
  }

  function injectScript(src, dataset) {
    if (!document.head || document.head.querySelector('script[src="' + src + '"]')) return;

    var script = document.createElement("script");
    script.src = src;
    script.defer = true;

    Object.keys(dataset || {}).forEach(function (key) {
      script.dataset[key] = dataset[key];
    });

    document.head.appendChild(script);
  }

  function isAllowedEvent(name) {
    return typeof name === "string" && ALLOWED_EVENTS[name] === true;
  }

  function isPrimitive(value) {
    return value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean";
  }

  function normalizePrimitive(value) {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : undefined;
    }

    if (typeof value === "string") {
      var trimmed = value.trim();
      if (!trimmed || trimmed.length > MAX_STRING_LENGTH) return undefined;
      if (EMAIL_RE.test(trimmed) || STRIPE_URL_RE.test(trimmed) || SENSITIVE_QUERY_RE.test(trimmed)) return undefined;
      if (trimmed.indexOf("?") !== -1 || trimmed.indexOf("&") !== -1) return undefined;
      return trimmed;
    }

    return value;
  }

  function sanitizeProps(props) {
    var safe = {};
    if (!props || typeof props !== "object") return safe;

    Object.keys(props).forEach(function (key) {
      if (!ALLOWED_PROPS[key] || SENSITIVE_KEY_RE.test(key)) return;
      var value = props[key];
      if (!isPrimitive(value)) return;

      var normalized = normalizePrimitive(value);
      if (typeof normalized === "undefined") return;
      safe[key] = normalized;
    });

    return safe;
  }

  function cleanEventUrl(event) {
    if (!event || !event.url) return event;

    try {
      var url = new URL(event.url);
      url.search = "";
      url.hash = "";
      event.url = url.toString();
    } catch (error) {
      return null;
    }

    return event;
  }

  function track(name, props) {
    if (!isAllowedEvent(name) || !canTrack()) return false;

    initQueue("va", "vaq");
    window.va("event", {
      name: name,
      data: sanitizeProps(props),
    });
    return true;
  }

  function coerceDatasetValue(value) {
    if (value === "true") return true;
    if (value === "false") return false;
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    return value;
  }

  function propsFromDataset(element) {
    var props = {};
    Object.keys(DATASET_TO_PROP).forEach(function (dataKey) {
      if (!Object.prototype.hasOwnProperty.call(element.dataset, dataKey)) return;
      props[DATASET_TO_PROP[dataKey]] = coerceDatasetValue(element.dataset[dataKey]);
    });
    return props;
  }

  function currentPageName() {
    var pathname = (window.location && window.location.pathname) || "";
    var filename = pathname.split("/").pop() || "index.html";
    return filename.replace(/\.html$/, "") || "index";
  }

  function missionAnalyticsProps(page) {
    var mission = window.OutilPrepa && window.OutilPrepa.mission;
    return {
      page: page,
      subject: mission && (mission.subjectId || mission.subjectLabel),
      duration_minutes: mission && mission.focusDurationMinutes,
    };
  }

  function trackPageOpened() {
    var page = currentPageName();

    if (page === "onboarding") {
      track("onboarding_started", { page: "onboarding" });
    } else if (page === "mission") {
      track("mission_opened", missionAnalyticsProps("mission"));
    } else if (page === "checkout") {
      track("checkout_viewed", { page: "checkout" });
    }
  }

  function installDelegatedTracking() {
    if (!document.addEventListener) return;

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== "function") return;

      var tracked = target.closest("[data-analytics-event]");
      if (!tracked) return;

      track(tracked.getAttribute("data-analytics-event"), propsFromDataset(tracked));
    });
  }

  function injectVercelScripts() {
    if (!canTrack()) return;

    initQueue("va", "vaq");
    window.va("beforeSend", cleanEventUrl);
    injectScript(WEB_ANALYTICS_SRC, {
      sdkn: "objectif-lycee/vanilla",
      sdkv: "1",
    });
    injectScript(SPEED_INSIGHTS_SRC, {
      sdkn: "objectif-lycee/vanilla",
      sdkv: "1",
    });
  }

  window.OLAnalytics = {
    track: track,
  };

  injectVercelScripts();
  installDelegatedTracking();

  if (document.readyState === "interactive" || document.readyState === "complete") {
    trackPageOpened();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", trackPageOpened);
  }
}());
