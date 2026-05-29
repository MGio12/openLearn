import http from 'http';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SERVER_PATH = join(ROOT, 'scripts', '_server.cjs');

function fail(message) {
  throw new Error(message);
}

function request(port, pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: pathname,
      method: 'GET',
      timeout: 2500,
    }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, body, headers: res.headers });
      });
    });

    req.on('timeout', () => {
      req.destroy(new Error(`request timed out for ${pathname}`));
    });
    req.on('error', reject);
    req.end();
  });
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
      if (stderr.includes(`Server ready on ${expectedPort}`) || stderr.includes(`Server ready at http://127.0.0.1:${expectedPort}`)) {
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

const fixtureRoot = mkdtempSync(join(tmpdir(), 'objectif-lycee-server-'));
const port = await freePort();
let child;

try {
  writeFileSync(join(fixtureRoot, 'index.html'), '<!doctype html><title>Fixture</title>', 'utf8');
  writeFileSync(join(fixtureRoot, 'public.txt'), 'public file', 'utf8');

  child = spawn(process.execPath, [SERVER_PATH], {
    cwd: ROOT,
    env: {
      ...process.env,
      SITE_ROOT: fixtureRoot,
      PORT: String(port),
    },
    stdio: ['ignore', 'ignore', 'pipe'],
  });

  await waitForReady(child, port);

  const index = await request(port, '/');
  if (index.status !== 200 || !index.body.includes('Fixture')) {
    fail(`GET / must serve index.html from SITE_ROOT. Got ${index.status}: ${index.body}`);
  }

  const publicFile = await request(port, '/public.txt');
  if (publicFile.status !== 200 || publicFile.body !== 'public file') {
    fail(`GET /public.txt must serve files inside SITE_ROOT. Got ${publicFile.status}: ${publicFile.body}`);
  }

  const traversal = await request(port, '/../CLAUDE.md');
  if (![403, 404].includes(traversal.status)) {
    fail(`GET /../CLAUDE.md must be rejected. Got ${traversal.status}: ${traversal.body.slice(0, 80)}`);
  }
  if (/prepaSiteV2|Users\\|\/home\/|CLAUDE\.md/.test(traversal.body)) {
    fail(`Traversal response must not leak local paths or target file names. Body: ${traversal.body}`);
  }

  const encodedTraversal = await request(port, '/%2e%2e/CLAUDE.md');
  if (![403, 404].includes(encodedTraversal.status)) {
    fail(`GET /%2e%2e/CLAUDE.md must be rejected. Got ${encodedTraversal.status}: ${encodedTraversal.body.slice(0, 80)}`);
  }
  if (/prepaSiteV2|Users\\|\/home\/|CLAUDE\.md/.test(encodedTraversal.body)) {
    fail(`Encoded traversal response must not leak local paths or target file names. Body: ${encodedTraversal.body}`);
  }

  const doubleEncodedTraversal = await request(port, '/%252e%252e/%252e%252e/etc/passwd');
  if (![403, 404].includes(doubleEncodedTraversal.status)) {
    fail(`GET /%252e%252e/%252e%252e/etc/passwd must be rejected. Got ${doubleEncodedTraversal.status}: ${doubleEncodedTraversal.body.slice(0, 80)}`);
  }
  if (/prepaSiteV2|Users\\|\/home\/|\/etc\/passwd|etc\/passwd|root:/.test(doubleEncodedTraversal.body)) {
    fail(`Double-encoded traversal response must not leak local paths or target file names. Body: ${doubleEncodedTraversal.body}`);
  }

  const missing = await request(port, '/missing.html');
  if (missing.status !== 404) {
    fail(`missing files must return 404. Got ${missing.status}: ${missing.body}`);
  }
  if (missing.body !== 'Not found') {
    fail(`missing files must return a safe Not found body. Got: ${missing.body}`);
  }

  console.log('PASS server security verification: SITE_ROOT, traversal rejection, and safe errors are valid.');
} finally {
  if (child && !child.killed) child.kill();
  rmSync(fixtureRoot, { recursive: true, force: true });
}
