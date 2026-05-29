import { readdirSync, readFileSync } from 'fs';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SCANNED_EXTENSIONS = new Set(['.html', '.js', '.jsx', '.mjs', '.cjs']);
const IGNORED_DIRS = new Set(['.git', '.codex-ralph', '.playwright-mcp', 'node_modules']);
const IGNORED_FILES = new Set([
  'onboarding/onboarding.bundle.js',
  'scripts/verify-unsafe-html.mjs',
]);
const ALLOW_COMMENT = 'unsafe-html-allow';

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
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) files.push(...listSourceFiles(fullPath));
      continue;
    }

    if (entry.isFile() && SCANNED_EXTENSIONS.has(extension(entry.name)) && !IGNORED_FILES.has(rel(fullPath))) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function hasAllowComment(lines, index) {
  const start = Math.max(0, index - 3);
  for (let i = start; i <= index; i++) {
    if (lines[i].includes(ALLOW_COMMENT)) return true;
  }
  return false;
}

function rhsIsEmptyString(line) {
  return /\binnerHTML\s*=\s*(?:''|""|``)\s*;?\s*(?:(?:\/\/|\/\*).*)?$/.test(line);
}

function runSelfTests() {
  const emptyAssignments = [
    'element.innerHTML = "";',
    "element.innerHTML='';",
    'element.innerHTML = ``',
    'node.innerHTML = "" // clear safely',
  ];
  const nonEmptyAssignments = [
    'element.innerHTML = "<p>unsafe</p>";',
    "element.innerHTML='unsafe';",
    'element.innerHTML = `<p>${value}</p>`;',
    'element.innerHTML = trustedSvg;',
  ];

  for (const line of emptyAssignments) {
    if (!rhsIsEmptyString(line)) {
      throw new Error(`verify-unsafe-html self-test failed: empty assignment was rejected: ${line}`);
    }
  }

  for (const line of nonEmptyAssignments) {
    if (rhsIsEmptyString(line)) {
      throw new Error(`verify-unsafe-html self-test failed: non-empty assignment was allowed: ${line}`);
    }
  }
}

function scanFile(filePath) {
  const issues = [];
  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  lines.forEach((line, index) => {
    if (/\binnerHTML\s*=/.test(line) && !rhsIsEmptyString(line) && !hasAllowComment(lines, index)) {
      issues.push(`${rel(filePath)}:${index + 1}: innerHTML assignment must clear with an empty string or carry ${ALLOW_COMMENT}.`);
    }

    if (/\binsertAdjacentHTML\s*\(/.test(line) && !hasAllowComment(lines, index)) {
      issues.push(`${rel(filePath)}:${index + 1}: insertAdjacentHTML requires a nearby ${ALLOW_COMMENT} comment.`);
    }

    if (/\bdangerouslySetInnerHTML\b/.test(line) && !hasAllowComment(lines, index)) {
      issues.push(`${rel(filePath)}:${index + 1}: dangerouslySetInnerHTML requires a nearby ${ALLOW_COMMENT} comment explaining the trusted source.`);
    }
  });

  return issues;
}

runSelfTests();

const sourceFiles = listSourceFiles(ROOT);
const issues = sourceFiles.flatMap(scanFile);

if (issues.length > 0) {
  console.error(`FAIL unsafe HTML verification: ${issues.length} issue(s) detected.`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`PASS unsafe HTML verification: ${sourceFiles.length} source files checked.`);
