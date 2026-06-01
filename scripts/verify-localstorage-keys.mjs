import { readdirSync, readFileSync } from 'fs';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SCANNED_EXTENSIONS = new Set(['.html', '.js', '.jsx', '.mjs', '.cjs']);
const IGNORED_DIRS = new Set(['.git', '.codex-ralph', '.playwright-mcp', 'node_modules']);
const IGNORED_FILES = new Set([
  'onboarding/onboarding.bundle.js',
]);
const IGNORED_PREFIXES = [
  'assets/js/lib/',
];

const ALLOWED_KEYS = new Set([
  'outilPrepa:v1',
  'objectif-lycee-onboarding-v3',
  'outilPrepa:onboarding',
  'outilPrepa:stripe.checkoutUrl',
  'outilPrepa:feynman:v1',
]);

const LEGACY_READ_ONLY_KEYS = new Set([
  'op.stripe.checkoutUrl',
]);

const KNOWN_KEY_IDENTIFIERS = {
  LS_KEY: 'objectif-lycee-onboarding-v3',
  STATE_KEY: 'outilPrepa:v1',
  STORAGE_KEY: 'outilPrepa:stripe.checkoutUrl',
  CHECKOUT_STORAGE_KEY: 'outilPrepa:stripe.checkoutUrl',
  LEGACY_CHECKOUT_STORAGE_KEY: 'op.stripe.checkoutUrl',
  FEYNMAN_STORAGE_KEY: 'outilPrepa:feynman:v1',
};

function rel(filePath) {
  return relative(ROOT, filePath).split(sep).join('/');
}

function extension(fileName) {
  const index = fileName.lastIndexOf('.');
  return index === -1 ? '' : fileName.slice(index);
}

function listSourceFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    const relativePath = rel(fullPath);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name) && !IGNORED_PREFIXES.some((prefix) => relativePath.startsWith(prefix))) {
        files.push(...listSourceFiles(fullPath));
      }
      continue;
    }

    if (
      entry.isFile() &&
      SCANNED_EXTENSIONS.has(extension(entry.name)) &&
      !IGNORED_FILES.has(relativePath) &&
      !IGNORED_PREFIXES.some((prefix) => relativePath.startsWith(prefix))
    ) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function collectLiteralConstants(source) {
  const constants = { ...KNOWN_KEY_IDENTIFIERS };
  const pattern = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(['"])(.*?)\2\s*;?/g;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    constants[match[1]] = match[3];
  }

  return constants;
}

function resolveKeyExpression(expression, constants) {
  const trimmed = expression.trim();
  const literal = /^(['"])(.*?)\1$/.exec(trimmed);
  if (literal) return literal[2];

  const identifier = /^([A-Za-z_$][\w$]*)$/.exec(trimmed);
  if (identifier && Object.prototype.hasOwnProperty.call(constants, identifier[1])) {
    return constants[identifier[1]];
  }

  return null;
}

function lineNumber(source, offset) {
  return source.slice(0, offset).split(/\r?\n/).length;
}

function scanFile(filePath) {
  const source = readFileSync(filePath, 'utf8');
  const constants = collectLiteralConstants(source);
  const issues = [];
  const pattern = /\b(?:window\.)?localStorage\.(getItem|setItem|removeItem)\s*\(\s*([^,\n)]+)/g;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    const method = match[1];
    const expression = match[2];
    const key = resolveKeyExpression(expression, constants);
    const location = `${rel(filePath)}:${lineNumber(source, match.index)}`;

    if (!key) {
      issues.push(`${location}: localStorage.${method} uses a dynamic key (${expression.trim()}); document and whitelist it first.`);
      continue;
    }

    if (ALLOWED_KEYS.has(key)) continue;

    if (LEGACY_READ_ONLY_KEYS.has(key) && method !== 'setItem') continue;

    issues.push(`${location}: localStorage.${method} uses undocumented key "${key}".`);
  }

  return issues;
}

const sourceFiles = listSourceFiles(ROOT);
const issues = sourceFiles.flatMap(scanFile);

if (issues.length > 0) {
  console.error(`FAIL localStorage key verification: ${issues.length} issue(s) detected.`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS localStorage key verification: ${sourceFiles.length} source files checked.`);
