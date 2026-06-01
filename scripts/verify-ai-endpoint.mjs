import http from 'http';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SERVER_PATH = join(ROOT, 'scripts', '_server.cjs');
const FEYNMAN_HEADINGS = [
  'Ce que tu as compris',
  'Erreurs ou confusions',
  'Notions manquees',
  'Explication claire',
  'Question de verification',
  'Prochaine micro-action',
];

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
    server.on('error', reject);
  });
}

function waitForReady(child, expectedPort) {
  return new Promise((resolve, reject) => {
    let stderr = '';
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(`server did not become ready on port ${expectedPort}. stderr: ${stderr.trim()}`));
    }, 3500);

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString('utf8');
      if (stderr.includes(`Server ready at http://127.0.0.1:${expectedPort}`)) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve();
      }
    });

    child.on('exit', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(new Error(`server exited before ready with code ${code}. stderr: ${stderr.trim()}`));
    });
  });
}

function request(port, method, pathname, body) {
  const payload = body === undefined ? null : JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: pathname,
      method,
      timeout: 7000,
      headers: payload
        ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        }
        : {},
    }, (res) => {
      let text = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        text += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch (error) {}
        resolve({ status: res.statusCode, body: text, json, headers: res.headers });
      });
    });

    req.on('timeout', () => {
      req.destroy(new Error(`request timed out for ${method} ${pathname}`));
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function startServer(extraEnv = {}) {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'objectif-lycee-ai-endpoint-'));
  const port = await freePort();

  writeFileSync(join(fixtureRoot, 'index.html'), '<!doctype html><title>Fixture</title>', 'utf8');

  const env = {
    ...process.env,
    SITE_ROOT: fixtureRoot,
    PORT: String(port),
    ...extraEnv,
  };
  if (!extraEnv.DEEPSEEK_API_KEY) delete env.DEEPSEEK_API_KEY;

  const child = spawn(process.execPath, [SERVER_PATH], {
    cwd: ROOT,
    env,
    stdio: ['ignore', 'ignore', 'pipe'],
  });

  await waitForReady(child, port);

  return {
    port,
    close() {
      if (child && !child.killed) child.kill();
      rmSync(fixtureRoot, { recursive: true, force: true });
    },
  };
}

function validPayload(overrides = {}) {
  return {
    studentText: 'J ai compris que le discriminant sert a savoir combien de racines a un trinome.',
    courseContext: {
      courseId: 'second-degre',
      courseTitle: 'Second degre',
      sectionTitle: 'Discriminant',
      minimalContext: 'Un trinome ax^2+bx+c a un discriminant Delta=b^2-4ac.',
      expectedAnswer: 'Dire le role du discriminant et relier son signe au nombre de solutions.',
      commonMistakes: ['oublier le cas Delta = 0'],
    },
    profile: {
      classLevel: 'premiere',
      aiPreferences: {
        tone: 'direct',
        detailLevel: 'progressif',
        allowDeepening: true,
      },
    },
    ...overrides,
  };
}

function assertStructuredFeynmanFeedback(response, label) {
  assert(response.status === 200, `${label} must return 200. Got ${response.status}: ${response.body}`);
  assert(response.json?.ok === true, `${label} response must be ok`);

  const feedback = String(response.json?.feedback || '');
  for (const heading of FEYNMAN_HEADINGS) {
    assert(feedback.includes(heading), `${label} feedback must include heading "${heading}"`);
  }

  assert(
    !/\b\d{1,2}\s*\/\s*20\b|garanti|humili|nul|catastrophique/i.test(feedback),
    `${label} feedback must not grade, promise a result, or humiliate`,
  );
  assert(/\?/.test(feedback), `${label} feedback must include a verification question`);
  assert(/prochaine|micro-action|reecris|réécris|ajoute|corrige/i.test(feedback), `${label} feedback must include a concrete next action`);
}

async function runPromptContractTests(server) {
  const promptCases = [
    {
      label: 'almost empty Feynman answer',
      payload: validPayload({ studentText: 'J ai compris un peu le chapitre.' }),
      expected: /trop court|ajoute|precise|précise/i,
    },
    {
      label: 'partly correct Feynman answer',
      payload: validPayload({ studentText: 'Le discriminant sert a savoir combien de racines a un trinome.' }),
      expected: /discriminant|racines/i,
    },
    {
      label: 'false Feynman answer',
      payload: validPayload({ studentText: 'Delta negatif donne deux racines et le signe de a ne sert pas.' }),
      expected: /erreur|confusion|corriger|negatif|négatif/i,
    },
    {
      label: 'correct but incomplete Feynman answer',
      payload: validPayload({ studentText: 'Un trinome ax^2+bx+c se resout avec Delta. Si Delta est positif il y a deux racines.' }),
      expected: /signe|sommet|forme|manque/i,
    },
    {
      label: 'notion absent from course context',
      payload: validPayload({
        studentText: 'Je pense qu il faut deriver la fonction puis faire un tableau de variations.',
        courseContext: {
          courseId: 'second-degre',
          courseTitle: 'Second degre',
          sectionTitle: 'Discriminant',
          minimalContext: 'Ce contexte parle seulement du discriminant Delta=b^2-4ac et du nombre de racines.',
          expectedAnswer: 'Dire le role du discriminant et relier son signe au nombre de solutions.',
          commonMistakes: ['utiliser une methode hors contexte'],
        },
      }),
      expected: /hors contexte|pas dans le contexte|absent|derive|dérive/i,
    },
  ];

  for (const testCase of promptCases) {
    const response = await request(server.port, 'POST', '/api/ai/feynman', testCase.payload);
    assertStructuredFeynmanFeedback(response, testCase.label);
    assert(testCase.expected.test(response.json.feedback), `${testCase.label} feedback must address the tested situation`);
  }

  const simple = await request(server.port, 'POST', '/api/ai/feynman', validPayload({
    profile: { classLevel: 'premiere', aiPreferences: { tone: 'simple' } },
  }));
  const demanding = await request(server.port, 'POST', '/api/ai/feynman', validPayload({
    profile: { classLevel: 'premiere', aiPreferences: { tone: 'exigeant' } },
  }));
  const calmCoach = await request(server.port, 'POST', '/api/ai/feynman', validPayload({
    profile: { classLevel: 'premiere', aiPreferences: { tone: 'coach calme' } },
  }));

  assertStructuredFeynmanFeedback(simple, 'simple tone Feynman answer');
  assertStructuredFeynmanFeedback(demanding, 'demanding tone Feynman answer');
  assertStructuredFeynmanFeedback(calmCoach, 'calm coach tone Feynman answer');
  assert(simple.json.feedback !== demanding.json.feedback, 'simple and demanding tones must change wording');
  assert(demanding.json.feedback !== calmCoach.json.feedback, 'demanding and calm coach tones must change wording');
  assert(/simple/i.test(simple.json.feedback), 'simple tone feedback must identify the simple tone');
  assert(/exigeant/i.test(demanding.json.feedback), 'demanding tone feedback must identify the demanding tone');
  assert(/coach calme/i.test(calmCoach.json.feedback), 'calm coach tone feedback must identify the calm coach tone');
}

async function runMockAndValidationTests() {
  const server = await startServer({ DEEPSEEK_API_KEY: '' });
  try {
    const mock = await request(server.port, 'POST', '/api/ai/feynman', validPayload());
    assert(mock.status === 200, `valid request without API key must return mock 200. Got ${mock.status}: ${mock.body}`);
    assert(mock.json?.ok === true, 'mock response must be ok');
    assert(mock.json?.mode === 'mock', 'response without API key must be explicit mock mode');
    assert(/mock/i.test(mock.json?.feedback || ''), 'mock feedback must explain that no real API call was made');
    assert(!/deepseek_api_key/i.test(mock.body), 'response must not mention secret variable names in user-facing body');

    const empty = await request(server.port, 'POST', '/api/ai/feynman', validPayload({ studentText: '   ' }));
    assert(empty.status === 422, `empty student text must return 422. Got ${empty.status}: ${empty.body}`);
    assert(/ecris|écris|quelques lignes/i.test(empty.json?.message || ''), 'empty text error must be clear for a student');

    const tooLong = await request(server.port, 'POST', '/api/ai/feynman', validPayload({ studentText: 'a'.repeat(2601) }));
    assert(tooLong.status === 413, `too long student text must return 413. Got ${tooLong.status}: ${tooLong.body}`);
    assert(/trop long/i.test(tooLong.json?.message || ''), 'too long text error must be clear');
    assert(tooLong.body.length < 900, 'too long error must not echo the full student text');

    const contextTooLong = await request(server.port, 'POST', '/api/ai/feynman', validPayload({
      courseContext: {
        minimalContext: 'c'.repeat(5201),
      },
    }));
    assert(contextTooLong.status === 413, `too long context must return 413. Got ${contextTooLong.status}: ${contextTooLong.body}`);

    const invalidJson = await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: '127.0.0.1',
        port: server.port,
        path: '/api/ai/feynman',
        method: 'POST',
        timeout: 3000,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': 1,
        },
      }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => resolve({ status: res.statusCode, body }));
      });
      req.on('timeout', () => req.destroy(new Error('invalid JSON request timed out')));
      req.on('error', reject);
      req.write('{');
      req.end();
    });
    assert(invalidJson.status === 400, `invalid JSON must return 400. Got ${invalidJson.status}: ${invalidJson.body}`);

    const get = await request(server.port, 'GET', '/api/ai/feynman');
    assert(get.status === 405, `GET /api/ai/feynman must return 405. Got ${get.status}: ${get.body}`);

    const index = await request(server.port, 'GET', '/');
    assert(index.status === 200 && index.body.includes('Fixture'), 'static file serving must still work');

    await runPromptContractTests(server);
  } finally {
    server.close();
  }
}

async function runLiveDeepSeekSmokeIfConfigured() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return false;

  const server = await startServer({ DEEPSEEK_API_KEY: apiKey });
  try {
    const response = await request(server.port, 'POST', '/api/ai/feynman', validPayload({
      studentText: 'Le discriminant sert a connaitre le nombre de solutions.',
    }));
    assert(response.status === 200, `live DeepSeek smoke must return 200. Got ${response.status}: ${response.body}`);
    assert(response.json?.ok === true, 'live response must be ok');
    assert(response.json?.mode === 'deepseek', 'live response must identify DeepSeek mode');
    assert(String(response.json?.feedback || '').length > 20, 'live response must include useful feedback');
    return true;
  } finally {
    server.close();
  }
}

await runMockAndValidationTests();
const liveRan = await runLiveDeepSeekSmokeIfConfigured();
console.log(`PASS AI endpoint verification: mock, validation, and ${liveRan ? 'live DeepSeek smoke' : 'live DeepSeek skip without DEEPSEEK_API_KEY'} are valid.`);
