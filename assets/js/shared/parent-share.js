(function (root) {
  "use strict";

  var MAX_URL_LENGTH = 1800;
  var DEFAULT_TRIAL_DAYS = 3;
  var DEFAULT_PRICE_PER_MONTH = 19.99;

  var OBJECTIF_LABELS = {
    "remonter": "Remonter une matière",
    "controle": "Préparer un contrôle",
    "stop-hasard": "Arrêter de travailler au hasard",
    "dossier": "Construire un meilleur dossier",
    "routine": "Tenir une routine",
    "confiance": "Reprendre confiance",
  };

  var BLOCAGE_LABELS = {
    "go": "Je veux juste commencer",
    "method-gap": "Je comprends le cours, je rate les exercices",
    "late": "Je suis en retard",
    "combo": "C'est un combo de plusieurs trucs",
  };

  var ECHEANCE_LABELS = {
    "controle-7": "Contrôle cette semaine",
    "controle-14": "Contrôle dans 2 semaines",
    "ds-trimestre": "DS de fin de trimestre",
    "speobjectif": "Choix des spécialités",
    "orientation-seconde": "Passage en Première",
    "bac-fr": "Bac de français",
    "bac-blanc-1": "Bac blanc",
    "specialite-fin": "Épreuve anticipée de spécialité",
    "bac-blanc-t": "Bac blanc",
    "grand-oral": "Grand oral",
    "bac": "Bac",
    "parcoursup": "Parcoursup",
  };

  var CLASSE_LABELS = {
    "Seconde": "Seconde",
    "Première": "Première",
    "Terminale": "Terminale",
  };

  var NIVEAU_LABELS = {
    "Fragile": "Fragile",
    "Correct": "Correct",
    "Ambitieux": "Ambitieux",
  };

  var MATIERE_LABELS = {
    "Mathématiques": "Mathématiques",
    "Physique-chimie": "Physique-chimie",
    "SVT": "SVT",
    "SES": "SES",
    "HGGSP": "HGGSP",
    "Histoire-géo": "Histoire-géo",
    "Français": "Français",
    "Philosophie": "Philosophie",
    "Anglais": "Anglais",
  };

  function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function cleanString(value, maxLength) {
    if (typeof value !== "string") return undefined;
    var cleaned = value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
    if (!cleaned) return undefined;
    return cleaned.slice(0, maxLength).trim();
  }

  function cleanMappedLabel(map, value, fallback) {
    if (typeof value !== "string" || !hasOwn(map, value)) return fallback;
    return map[value];
  }

  function cleanNumber(value, min, max, fallback) {
    var number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  function firstArrayValue(value) {
    return Array.isArray(value) && value.length ? value[0] : value;
  }

  function dateOnly(now) {
    var date = now instanceof Date ? now : new Date();
    if (!Number.isFinite(date.getTime())) date = new Date();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function effortHours(profile) {
    var effort = profile && profile.effortHebdo;
    if (effort && typeof effort === "object") return cleanNumber(effort.hours, 0, 40);
    return cleanNumber(effort, 0, 40);
  }

  function firstDeadline(profile) {
    var raw = firstArrayValue(profile && profile.echeances);
    if (typeof raw !== "string" || !hasOwn(ECHEANCE_LABELS, raw)) return undefined;
    return ECHEANCE_LABELS[raw];
  }

  function missionPayload(mission, limits) {
    var source = mission && typeof mission === "object" ? mission : {};
    return {
      action: cleanString(source.action, limits.action) || "Faire une mission courte et produire une trace écrite.",
      duree: Math.round(cleanNumber(source.duree, 5, 180, 25)),
      why: cleanString(source.why, limits.why) || "La mission est choisie pour réduire le travail au hasard.",
      trace: cleanString(source.trace, limits.trace) || "Une trace écrite vérifiable à la fin de la session.",
    };
  }

  function offerPayload(tweaks) {
    var source = tweaks && typeof tweaks === "object" ? tweaks : {};
    return {
      trialDays: Math.round(cleanNumber(source.trialDays, 0, 30, DEFAULT_TRIAL_DAYS)),
      pricePerMonth: Math.round(cleanNumber(source.pricePerMonth, 0, 999, DEFAULT_PRICE_PER_MONTH) * 100) / 100,
    };
  }

  function compactPayload(profile, mission, tweaks, now, limits) {
    var matiere = firstArrayValue(profile && profile.matieres);
    var objectif = firstArrayValue(profile && profile.objectif);
    var payload = {
      version: 1,
      date: dateOnly(now),
      classe: cleanMappedLabel(CLASSE_LABELS, profile && profile.classe, "Lycée"),
      objectif: cleanMappedLabel(OBJECTIF_LABELS, objectif, "Objectif personnel"),
      matiere: cleanMappedLabel(MATIERE_LABELS, matiere, "Matière à préciser"),
      blocage: cleanMappedLabel(BLOCAGE_LABELS, profile && profile.blocage, "Blocage à préciser"),
      niveau: cleanMappedLabel(NIVEAU_LABELS, profile && profile.niveau, "À calibrer"),
      mission: missionPayload(mission, limits),
      offre: offerPayload(tweaks),
    };
    var hours = effortHours(profile || {});
    var deadline = firstDeadline(profile || {});
    if (typeof hours === "number") payload.heuresParSemaine = hours;
    if (deadline) payload.premiereEcheance = deadline;
    return payload;
  }

  function createPayload(profile, mission, tweaks, now) {
    return compactPayload(profile || {}, mission || {}, tweaks || {}, now, {
      action: 190,
      why: 190,
      trace: 170,
    });
  }

  function binaryFromUtf8(value) {
    var bytes = new root.TextEncoder().encode(value);
    var chunks = [];
    for (var i = 0; i < bytes.length; i += 0x8000) {
      chunks.push(String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)));
    }
    return chunks.join("");
  }

  function utf8FromBinary(value) {
    var bytes = new Uint8Array(value.length);
    for (var i = 0; i < value.length; i += 1) bytes[i] = value.charCodeAt(i);
    return new root.TextDecoder().decode(bytes);
  }

  function base64UrlEncode(value) {
    if (typeof value !== "string") throw new TypeError("base64UrlEncode expects a string");
    return root.btoa(binaryFromUtf8(value))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  function base64UrlDecode(value) {
    var normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
    while (normalized.length % 4) normalized += "=";
    return utf8FromBinary(root.atob(normalized));
  }

  function normalizePayload(payload) {
    if (!payload || typeof payload !== "object") return null;

    var normalized = {
      version: payload.version === 1 ? 1 : null,
      date: /^\d{4}-\d{2}-\d{2}$/.test(payload.date || "") ? payload.date : dateOnly(),
      classe: cleanString(payload.classe, 40) || "Lycée",
      objectif: cleanString(payload.objectif, 80) || "Objectif personnel",
      matiere: cleanString(payload.matiere, 60) || "Matière à préciser",
      blocage: cleanString(payload.blocage, 90) || "Blocage à préciser",
      niveau: cleanString(payload.niveau, 40) || "À calibrer",
      mission: missionPayload(payload.mission, { action: 190, why: 190, trace: 170 }),
      offre: offerPayload(payload.offre),
    };

    if (payload.heuresParSemaine !== undefined) {
      normalized.heuresParSemaine = cleanNumber(payload.heuresParSemaine, 0, 40);
    }
    if (payload.premiereEcheance !== undefined) {
      normalized.premiereEcheance = cleanString(payload.premiereEcheance, 80);
    }

    if (normalized.version !== 1) return null;
    return normalized;
  }

  function encodePayload(payload) {
    var normalized = normalizePayload(payload);
    if (!normalized) throw new Error("Invalid parent payload");
    return base64UrlEncode(JSON.stringify(normalized));
  }

  function decodePayload(token) {
    try {
      if (typeof token !== "string" || !/^[A-Za-z0-9_-]+$/.test(token)) return null;
      return normalizePayload(JSON.parse(base64UrlDecode(token)));
    } catch (error) {
      return null;
    }
  }

  function shortenedPayload(payload) {
    var normalized = normalizePayload(payload);
    if (!normalized) return null;
    normalized.mission = missionPayload(normalized.mission, {
      action: 130,
      why: 120,
      trace: 110,
    });
    normalized.objectif = cleanString(normalized.objectif, 60);
    normalized.blocage = cleanString(normalized.blocage, 70);
    normalized.premiereEcheance = cleanString(normalized.premiereEcheance, 60);
    return normalizePayload(normalized);
  }

  function createParentUrl(payload, baseUrl) {
    var currentBase = baseUrl || (root.location && root.location.href) || "https://objectiflycee.fr/onboarding.html";
    var target = new root.URL("parent.html", currentBase);
    target.hash = "p=" + encodePayload(payload);
    var url = target.toString();
    if (url.length <= MAX_URL_LENGTH) return url;

    target.hash = "p=" + encodePayload(shortenedPayload(payload));
    return target.toString();
  }

  root.OLParentShare = {
    createPayload: createPayload,
    encodePayload: encodePayload,
    decodePayload: decodePayload,
    createParentUrl: createParentUrl,
  };
}(typeof window !== "undefined" ? window : globalThis));
