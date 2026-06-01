/*
 * AGENT HEADER
 * Role: serveur local de verification pour le site statique et endpoint IA.
 * Loaded by: scripts Playwright, commandes de verification et execution directe node.
 * Reads/writes: lit SITE_ROOT/HOST/PORT et variables DEEPSEEK_*; ne persiste rien.
 * Public contract: createServer(), safeRequestPath(), fichiers sous SITE_ROOT,
 * POST /api/ai/feynman, mock sans DEEPSEEK_API_KEY.
 * Verify: npm run verify:server-security ; npm run verify:ai-endpoint.
 * Read next: `docs/agent-codebase-map.md` Zone 4, `docs/architecture.md`.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.env.SITE_ROOT || path.resolve(__dirname, '..'));
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8080);
const AI_ENDPOINT = '/api/ai/feynman';
const AI_MAX_BODY_BYTES = 32 * 1024;
const AI_MAX_STUDENT_TEXT_CHARS = 2500;
const AI_MAX_CONTEXT_CHARS = 5000;
const AI_TIMEOUT_MS = Number(process.env.DEEPSEEK_TIMEOUT_MS || 15000);
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || `${DEEPSEEK_BASE_URL}/chat/completions`;
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const FEYNMAN_FEEDBACK_HEADINGS = [
  'Ce que tu as compris',
  'Erreurs ou confusions',
  'Notions manquees',
  'Explication claire',
  'Question de verification',
  'Prochaine micro-action',
];
const FEYNMAN_TONE_INSTRUCTIONS = {
  simple: 'Mode simple : phrases courtes, mots directs, une action a la fois.',
  normal: 'Mode normal : feedback clair, precis et progressif.',
  exigeant: 'Mode exigeant : demande une justification propre et refuse les formulations floues.',
  'coach-calme': 'Mode coach calme : ton rassurant, correction ferme, prochaine action tres concrete.',
};
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendText(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

function sendJson(res, status, payload, extraHeaders) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...(extraHeaders || {}),
  });
  res.end(JSON.stringify(payload));
}

function isInsideRoot(filePath) {
  const relativePath = path.relative(ROOT, filePath);
  return relativePath === '' || (!!relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function requestPathname(reqUrl) {
  try {
    return new URL(String(reqUrl || '/'), 'http://local.test').pathname;
  } catch (error) {
    return null;
  }
}

function readJsonBody(req, options) {
  const limit = options && options.limit ? options.limit : AI_MAX_BODY_BYTES;

  return new Promise((resolve, reject) => {
    let size = 0;
    let body = '';

    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      size += Buffer.byteLength(chunk, 'utf8');
      if (size > limit) {
        reject(Object.assign(new Error('request_body_too_large'), { code: 'request_body_too_large' }));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(Object.assign(new Error('invalid_json'), { code: 'invalid_json' }));
      }
    });
    req.on('error', reject);
  });
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizedText(value) {
  return cleanString(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function flattenContextValue(value) {
  if (Array.isArray(value)) {
    return value.map(flattenContextValue).filter(Boolean).join('\n');
  }
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .map((key) => flattenContextValue(value[key]))
      .filter(Boolean)
      .join('\n');
  }
  return cleanString(value);
}

function normalizeFeynmanTone(value) {
  const tone = normalizedText(value).replace(/[_\s]+/g, '-');
  if (tone === 'simple' || tone === 'court' || tone === 'facile') return 'simple';
  if (tone === 'exigeant' || tone === 'strict' || tone === 'examinateur') return 'exigeant';
  if (tone === 'coach-calme' || tone === 'calme' || tone === 'coach') return 'coach-calme';
  return 'normal';
}

function feynmanToneInstruction(tone) {
  return FEYNMAN_TONE_INSTRUCTIONS[tone] || FEYNMAN_TONE_INSTRUCTIONS.normal;
}

function normalizedAiPayload(raw) {
  const source = raw && typeof raw === 'object' ? raw : {};
  const context = source.courseContext && typeof source.courseContext === 'object'
    ? source.courseContext
    : {};
  const profile = source.profile && typeof source.profile === 'object'
    ? source.profile
    : {};
  const preferences = profile.aiPreferences && typeof profile.aiPreferences === 'object'
    ? profile.aiPreferences
    : {};
  const studentText = cleanString(source.studentText);
  const contextText = flattenContextValue(context);

  return {
    studentText,
    contextText,
    courseId: cleanString(context.courseId),
    courseTitle: cleanString(context.courseTitle),
    sectionTitle: cleanString(context.sectionTitle),
    minimalContext: cleanString(context.minimalContext),
    expectedAnswer: cleanString(context.expectedAnswer),
    commonMistakes: Array.isArray(context.commonMistakes)
      ? context.commonMistakes.map(cleanString).filter(Boolean).slice(0, 8)
      : [],
    classLevel: cleanString(profile.classLevel) || 'lycee',
    tone: normalizeFeynmanTone(preferences.tone),
    detailLevel: cleanString(preferences.detailLevel) || 'progressif',
    allowDeepening: preferences.allowDeepening !== false,
  };
}

function validateAiPayload(payload) {
  if (!payload.studentText) {
    return {
      status: 422,
      code: 'empty_student_text',
      message: 'Ecris quelques lignes avec tes mots avant de demander un retour.',
    };
  }
  if (payload.studentText.length > AI_MAX_STUDENT_TEXT_CHARS) {
    return {
      status: 413,
      code: 'student_text_too_long',
      message: `Ton texte est trop long pour ce feedback. Raccourcis-le a ${AI_MAX_STUDENT_TEXT_CHARS} caracteres maximum.`,
    };
  }
  if (payload.contextText.length > AI_MAX_CONTEXT_CHARS) {
    return {
      status: 413,
      code: 'course_context_too_long',
      message: `Le contexte du cours est trop long pour cet appel IA local. Limite actuelle : ${AI_MAX_CONTEXT_CHARS} caracteres.`,
    };
  }
  return null;
}

function buildFeynmanPrompt(payload) {
  return [
    `Cours: ${payload.courseTitle || payload.courseId || 'cours'}`,
    `Section: ${payload.sectionTitle || 'non precisee'}`,
    `Niveau: ${payload.classLevel}`,
    `Ton souhaite: ${payload.tone}`,
    `Consigne de ton: ${feynmanToneInstruction(payload.tone)}`,
    `Detail souhaite: ${payload.detailLevel}`,
    `Approfondissement autorise: ${payload.allowDeepening ? 'oui' : 'non'}`,
    '',
    'Contexte minimal du cours:',
    payload.minimalContext || payload.contextText || 'Aucun contexte fourni.',
    '',
    'Reponse attendue:',
    payload.expectedAnswer || 'Evaluer la comprehension avec bienveillance et precision.',
    '',
    'Erreurs frequentes:',
    payload.commonMistakes.length ? payload.commonMistakes.map((item) => `- ${item}`).join('\n') : '- Aucune liste fournie.',
    '',
    'Texte de l eleve:',
    payload.studentText,
  ].join('\n');
}

function buildFeynmanSystemPrompt(payload) {
  return [
    'Tu es un tuteur de mathematiques pour lyceen.',
    'Tu corriges une explication methode Feynman : l eleve ecrit ce qu il pense avoir compris, tu diagnostiques et tu aides a reecrire.',
    feynmanToneInstruction(payload.tone),
    '',
    'Tu dois rendre exactement ces six blocs, dans cet ordre, avec ces titres:',
    FEYNMAN_FEEDBACK_HEADINGS.map((heading) => `- ${heading}`).join('\n'),
    '',
    'Contraintes non negociables:',
    '- Ne rends jamais de HTML.',
    '- Ne donne jamais de note, de jugement humiliant, ni de promesse de resultat garanti.',
    '- Ne valide jamais une erreur mathematique par politesse.',
    '- Si une notion n est pas dans le contexte fourni, signale qu elle est hors contexte avant d approfondir.',
    '- En mathematiques, garde les notations du cours, explicite les hypotheses, et separe methode, calcul et conclusion.',
    '- Chaque bloc doit rester actionnable : une observation, une correction, ou une consigne concrete.',
  ].join('\n');
}

function mockFeynmanFeedback(payload) {
  const answer = normalizedText(payload.studentText);
  const context = normalizedText(payload.contextText || payload.minimalContext);
  const toneLine = feynmanToneInstruction(payload.tone);
  const understood = [];
  const errors = [];
  const missing = [];

  if (answer.length < 70) {
    missing.push('Ta reponse est trop courte : ajoute au moins une phrase sur la methode et une phrase sur la conclusion.');
  }

  if (/discriminant|delta/.test(answer)) {
    understood.push('Tu as repere le role du discriminant dans le chapitre.');
  } else {
    missing.push('Il manque le role du discriminant Delta pour decider le nombre de racines.');
  }

  if (/racine/.test(answer)) {
    understood.push('Tu relies deja le chapitre a la recherche des racines.');
  }

  if (/delta.*negatif.*(deux|2).*racine|negatif.*(deux|2).*racine/.test(answer)) {
    errors.push('Erreur a corriger : Delta negatif ne donne pas deux racines reelles ; dans R, il n y a alors aucune solution.');
  }

  if (/signe de a ne sert pas|a ne sert pas au signe|a ne sert pas/.test(answer)) {
    errors.push('Confusion a corriger : le signe de a sert a orienter la parabole et a choisir le signe du trinome hors/entre les racines.');
  }

  if (/derive|derivation|tableau de variation/.test(answer) && !/derive|derivation|variation/.test(context)) {
    errors.push('Point hors contexte : tu introduis la derivation, mais le contexte fourni porte sur le discriminant et les racines.');
  }

  if (!/signe|positif|negatif|entre|hors/.test(answer)) {
    missing.push('Il manque la regle de signe : le trinome est du signe de a sauf entre les racines quand elles existent.');
  }

  if (!/forme|canonique|factorisee|developpee|sommet/.test(answer)) {
    missing.push('Il manque le choix des formes : developpee pour les coefficients, canonique pour le sommet, factorisee pour les racines.');
  }

  if (!/conclu|conclusion|solution|ensemble/.test(answer)) {
    missing.push('Il manque une phrase de conclusion avec l ensemble des solutions ou l information demandee.');
  }

  if (!understood.length) {
    understood.push('Tu as commence a formuler une idee, mais elle doit encore etre reliee aux mots precis du cours.');
  }

  if (!errors.length) {
    errors.push('Pas d erreur certaine detectee dans ce mock local, mais verifie que chaque formule est reliee a une condition d utilisation.');
  }

  const expected = payload.expectedAnswer
    ? `Version de reference a viser : ${payload.expectedAnswer}`
    : 'Version de reference a viser : dire quand utiliser la methode, quelle condition verifier, puis comment conclure.';
  const trap = payload.commonMistakes[0]
    ? `Piege prioritaire : ${payload.commonMistakes[0]}`
    : 'Piege prioritaire : ne recite pas une formule sans expliquer ce qu elle decide.';

  return [
    FEYNMAN_FEEDBACK_HEADINGS[0],
    `- Mode mock local. ${toneLine}`,
    `- ${understood.slice(0, 2).join(' ')}`,
    '',
    FEYNMAN_FEEDBACK_HEADINGS[1],
    `- ${errors.slice(0, 2).join(' ')}`,
    '',
    FEYNMAN_FEEDBACK_HEADINGS[2],
    `- ${missing.slice(0, 3).join(' ') || 'Aucune notion majeure manquante dans cette version courte.'}`,
    `- ${trap}`,
    '',
    FEYNMAN_FEEDBACK_HEADINGS[3],
    `- ${expected}`,
    '- Une bonne explication distingue toujours la notion, le choix de methode, puis la conclusion ecrite.',
    '',
    FEYNMAN_FEEDBACK_HEADINGS[4],
    '- Si tu changes seulement le signe de Delta, combien de racines reelles obtiens-tu et pourquoi ?',
    '',
    FEYNMAN_FEEDBACK_HEADINGS[5],
    '- Reecris ta version en trois phrases : forme utile, condition ou calcul, conclusion finale.',
  ].join('\n');
}

function friendlyDeepSeekError(status) {
  if (status === 401) return 'La cle DeepSeek configuree cote serveur est refusee.';
  if (status === 402) return 'Le compte DeepSeek cote serveur n a plus de credit disponible.';
  if (status === 429) return 'Trop de demandes IA arrivent en meme temps. Reessaie dans un instant.';
  if (status >= 500) return 'DeepSeek est indisponible pour le moment. Reessaie dans un instant.';
  return 'Le service IA a refuse la demande. Reessaie avec une reponse plus courte.';
}

async function callDeepSeek(payload) {
  if (typeof fetch !== 'function') {
    throw Object.assign(new Error('fetch_unavailable'), { code: 'fetch_unavailable' });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: 'system',
            content: buildFeynmanSystemPrompt(payload),
          },
          {
            role: 'user',
            content: buildFeynmanPrompt(payload),
          },
        ],
        stream: false,
        max_tokens: 900,
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw Object.assign(new Error('deepseek_upstream_error'), {
        code: 'deepseek_upstream_error',
        status: response.status,
        body: data,
      });
    }

    const feedback = cleanString(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content);
    if (!feedback) {
      throw Object.assign(new Error('deepseek_empty_response'), { code: 'deepseek_empty_response' });
    }

    return feedback;
  } finally {
    clearTimeout(timer);
  }
}

async function handleAiFeynman(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, {
      ok: false,
      code: 'method_not_allowed',
      message: 'Utilise POST pour demander un feedback IA.',
    }, { Allow: 'POST' });
    return;
  }

  let rawBody;
  try {
    rawBody = await readJsonBody(req, { limit: AI_MAX_BODY_BYTES });
  } catch (error) {
    if (error.code === 'request_body_too_large') {
      sendJson(res, 413, {
        ok: false,
        code: 'request_body_too_large',
        message: 'La demande est trop longue pour cet endpoint IA local.',
      });
      return;
    }
    sendJson(res, 400, {
      ok: false,
      code: 'invalid_json',
      message: 'La demande IA doit etre un JSON valide.',
    });
    return;
  }

  const payload = normalizedAiPayload(rawBody);
  const validationError = validateAiPayload(payload);
  if (validationError) {
    sendJson(res, validationError.status, {
      ok: false,
      code: validationError.code,
      message: validationError.message,
    });
    return;
  }

  if (!process.env.DEEPSEEK_API_KEY) {
    sendJson(res, 200, {
      ok: true,
      mode: 'mock',
      model: null,
      feedback: mockFeynmanFeedback(payload),
      limits: {
        studentTextMaxChars: AI_MAX_STUDENT_TEXT_CHARS,
        courseContextMaxChars: AI_MAX_CONTEXT_CHARS,
      },
    });
    return;
  }

  try {
    const feedback = await callDeepSeek(payload);
    sendJson(res, 200, {
      ok: true,
      mode: 'deepseek',
      model: DEEPSEEK_MODEL,
      feedback,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      sendJson(res, 504, {
        ok: false,
        code: 'ai_timeout',
        message: 'Le feedback IA met trop longtemps a repondre. Reessaie dans un instant.',
      });
      return;
    }

    sendJson(res, error.status === 429 ? 429 : 502, {
      ok: false,
      code: error.code || 'ai_upstream_error',
      message: friendlyDeepSeekError(error.status || 500),
    });
  }
}

function safeRequestPath(reqUrl) {
  const rawPath = String(reqUrl || '/').split('?')[0];
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch (error) {
    return { status: 400 };
  }

  if (decodedPath.includes('\0')) return { status: 400 };

  const normalizedPath = decodedPath.replace(/\\/g, '/');
  const relativeUrlPath = normalizedPath === '/'
    ? 'index.html'
    : normalizedPath.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relativeUrlPath);

  if (!isInsideRoot(filePath)) return { status: 403 };
  return { filePath };
}

function createServer() {
  return http.createServer((req, res) => {
    if (requestPathname(req.url) === AI_ENDPOINT) {
      handleAiFeynman(req, res).catch(() => {
        if (!res.headersSent) {
          sendJson(res, 500, {
            ok: false,
            code: 'ai_internal_error',
            message: 'Le feedback IA local a rencontre une erreur.',
          });
        }
      });
      return;
    }

    const resolved = safeRequestPath(req.url);

    if (resolved.status === 400) {
      sendText(res, 400, 'Bad request');
      return;
    }

    if (resolved.status === 403) {
      sendText(res, 403, 'Forbidden');
      return;
    }

    fs.readFile(resolved.filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT' || err.code === 'EISDIR') {
          sendText(res, 404, 'Not found');
          return;
        }
        sendText(res, 500, 'Internal server error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': MIME[path.extname(resolved.filePath)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(data);
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, HOST, () => {
    process.stderr.write(`Server ready at http://${HOST}:${PORT}\n`);
  });
}

module.exports = {
  createServer,
  safeRequestPath,
};
