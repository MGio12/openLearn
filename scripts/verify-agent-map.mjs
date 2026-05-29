import { existsSync, readFileSync, statSync } from 'fs';
import { dirname, join, normalize, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MAP_PATH = join(ROOT, 'docs', 'agent-codebase-map.md');
const CLAUDE_PATH = join(ROOT, 'CLAUDE.md');
const PACKAGE_PATH = join(ROOT, 'package.json');

const PATH_PREFIXES = [
  'assets/',
  'data/',
  'docs/',
  'lien/',
  'onboarding/',
  'prototypes/',
  'scripts/',
];

const ROOT_FILES = new Set([
  'abonnement.html',
  'checkout.html',
  'contenu.html',
  'index.html',
  'objectif.html',
  'onboarding.html',
  'package.json',
  'parent.html',
  'planning.html',
  'progression.html',
]);

function rel(filePath) {
  return relative(ROOT, filePath).split(sep).join('/');
}

function readText(filePath, issues) {
  if (!existsSync(filePath)) {
    issues.push(`${rel(filePath)} is missing`);
    return '';
  }
  return readFileSync(filePath, 'utf8');
}

function readPackage(issues) {
  const text = readText(PACKAGE_PATH, issues);
  if (!text) return { scripts: {} };

  try {
    return JSON.parse(text);
  } catch (error) {
    issues.push(`package.json is invalid JSON: ${error.message}`);
    return { scripts: {} };
  }
}

function codeSpans(text) {
  const spans = [];
  const pattern = /`([^`\n]+)`/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    spans.push(match[1].trim());
  }

  return spans;
}

function documentedNpmCommands(text) {
  const commands = new Set();
  const pattern = /\bnpm run ([a-z0-9:_-]+)/gi;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    commands.add(match[1]);
  }

  return Array.from(commands).sort();
}

function documentedNodeScriptPaths(text) {
  const scriptPaths = new Set();
  const pattern = /`node\s+([^\s`]+)[^`]*`/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match[1].startsWith('scripts/')) scriptPaths.add(match[1]);
  }

  return Array.from(scriptPaths).sort();
}

function isCheckablePath(value) {
  if (!value || /\s/.test(value)) return false;
  if (/[<>{}*?=]/.test(value)) return false;
  if (value.includes('...')) return false;
  if (value.startsWith('#')) return false;
  if (value.startsWith('data-')) return false;
  if (value.startsWith('window.')) return false;
  if (value.startsWith('body.')) return false;
  if (value.startsWith('process.')) return false;
  if (value === 'localStorage') return false;

  return PATH_PREFIXES.some((prefix) => value.startsWith(prefix)) || ROOT_FILES.has(value);
}

function resolveRepoPath(value) {
  const clean = value.replace(/\/+$/, '');
  const resolved = normalize(join(ROOT, clean));
  const relativePath = relative(ROOT, resolved);

  if (relativePath.startsWith('..') || relativePath === '') return null;
  return resolved;
}

function documentedPaths(text) {
  const paths = new Set();

  for (const span of codeSpans(text)) {
    if (span.startsWith('npm run ')) continue;
    if (span.startsWith('node ')) continue;
    if (!isCheckablePath(span)) continue;
    paths.add(span);
  }

  for (const scriptPath of documentedNodeScriptPaths(text)) {
    paths.add(scriptPath);
  }

  return Array.from(paths).sort();
}

function checkZoneCount(text, issues) {
  const headings = text.match(/^## Zone \d+ - .+$/gm) || [];

  if (headings.length === 0) {
    issues.push('docs/agent-codebase-map.md must contain at least one "## Zone N -" entry');
  }
  if (headings.length > 5) {
    issues.push(`docs/agent-codebase-map.md must keep 5 zone entries maximum, found ${headings.length}`);
  }
}

function checkCommands(text, packageJson, issues) {
  const scripts = packageJson.scripts || {};

  for (const command of documentedNpmCommands(text)) {
    if (!Object.prototype.hasOwnProperty.call(scripts, command)) {
      issues.push(`documented command "npm run ${command}" is missing from package.json`);
    }
  }

  if (!scripts['verify:agent-map']) {
    issues.push('package.json must define "verify:agent-map"');
  }
}

function checkPaths(text, issues) {
  for (const repoPath of documentedPaths(text)) {
    const resolved = resolveRepoPath(repoPath);
    if (!resolved || !existsSync(resolved)) {
      issues.push(`documented path "${repoPath}" does not exist`);
      continue;
    }

    if (repoPath.endsWith('/') && !statSync(resolved).isDirectory()) {
      issues.push(`documented path "${repoPath}" must be a directory`);
    }
  }
}

function checkClaudePointer(text, issues) {
  if (!/docs\/agent-codebase-map\.md/.test(text)) {
    issues.push('CLAUDE.md must point scenario readers to docs/agent-codebase-map.md');
  }
}

const issues = [];
const mapText = readText(MAP_PATH, issues);
const claudeText = readText(CLAUDE_PATH, issues);
const packageJson = readPackage(issues);

if (mapText) {
  if (!/## Convention contrat de zone/.test(mapText)) {
    issues.push('docs/agent-codebase-map.md must document the zone-contract convention');
  }
  checkZoneCount(mapText, issues);
  checkCommands(mapText, packageJson, issues);
  checkPaths(mapText, issues);
}

if (claudeText) {
  checkClaudePointer(claudeText, issues);
}

if (issues.length > 0) {
  console.error(`FAIL agent map verification: ${issues.length} probleme(s) detecte(s).`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('PASS agent map verification: documented commands and critical paths are valid.');
