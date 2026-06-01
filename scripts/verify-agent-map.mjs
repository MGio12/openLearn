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
  'src/',
];

const ROOT_FILES = new Set([
  'CLAUDE.md',
  'README.md',
  'TODO.md',
  'abonnement.html',
  'astro.config.mjs',
  'checkout.html',
  'contenu.html',
  'index.html',
  'objectif.html',
  'onboarding.md',
  'onboarding.html',
  'package.json',
  'parent.html',
  'parametres.html',
  'merci.html',
  'planning.html',
  'progression.html',
]);

const REQUIRED_MAP_SECTIONS = [
  {
    label: 'Se reperer en 90 secondes',
    pattern: /^## Se rep[ée]rer en 90 secondes$/m,
  },
  {
    label: 'Fonctionnalites implementees et proprietaires',
    pattern: /^## Fonctionnalit[ée]s impl[ée]ment[ée]es et propri[ée]taires$/m,
  },
];

const AGENT_HEADER_FILES = [
  'assets/js/domain/model.js',
  'assets/js/state/store.js',
  'scripts/user-context-ui.js',
  'onboarding.html',
  'onboarding/state.jsx',
  'onboarding/app.jsx',
  'parametres.html',
  'assets/js/pages/parametres.js',
  'scripts/_server.cjs',
  'prototypes/cours/maths-specialite/cours.js',
  'prototypes/cours/_templates/generation-notes.md',
  'prototypes/cours/_templates/source-map.md',
  'prototypes/cours/_templates/sources.md',
  'prototypes/cours/_templates/verification-notes.md',
  'assets/js/pages/checkout.js',
  'assets/js/shared/parent-share.js',
  'parent.html',
  'assets/js/pages/parent.js',
];

const REQUIRED_AGENT_HEADER_FIELDS = [
  'Role',
  'Loaded by',
  'Reads/writes',
  'Public contract',
  'Verify',
  'Read next',
];

const REQUIRED_ZONE_SECTIONS = [
  'Fichiers proprietaires',
  'Contrat DOM/data principal',
  'Commandes de verification',
  'Pieges connus',
  'Ne pas refactorer sans raison',
];

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

function zoneHeadings(text) {
  return Array.from(text.matchAll(/^## Zone (\d+) - .+$/gm));
}

function checkZones(text, issues) {
  const headings = zoneHeadings(text);

  if (headings.length === 0) {
    issues.push('docs/agent-codebase-map.md must contain at least one "## Zone N -" entry');
  }
  if (headings.length > 5) {
    issues.push(`docs/agent-codebase-map.md must keep 5 zone entries maximum, found ${headings.length}`);
  }

  const seen = new Set();
  headings.forEach((heading, index) => {
    const zoneNumber = Number(heading[1]);
    const expectedNumber = index + 1;
    const title = heading[0];
    const start = heading.index || 0;
    const end = headings[index + 1] ? headings[index + 1].index : text.length;
    const body = text.slice(start, end);

    if (seen.has(zoneNumber)) {
      issues.push(`docs/agent-codebase-map.md has duplicate zone number ${zoneNumber}`);
    }
    seen.add(zoneNumber);

    if (zoneNumber !== expectedNumber) {
      issues.push(`docs/agent-codebase-map.md zones must be sequential: expected Zone ${expectedNumber}, found Zone ${zoneNumber}`);
    }

    for (const section of REQUIRED_ZONE_SECTIONS) {
      if (!body.includes(`${section} :`)) {
        issues.push(`${title} must include subsection "${section} :"`);
      }
    }
  });
}

function checkDocumentedCommands(text, packageJson, issues, sourceLabel) {
  const scripts = packageJson.scripts || {};

  for (const command of documentedNpmCommands(text)) {
    if (!Object.prototype.hasOwnProperty.call(scripts, command)) {
      issues.push(`${sourceLabel} command "npm run ${command}" is missing from package.json`);
    }
  }
}

function checkCommands(text, packageJson, issues) {
  const scripts = packageJson.scripts || {};
  checkDocumentedCommands(text, packageJson, issues, 'documented');

  if (!scripts['verify:agent-map']) {
    issues.push('package.json must define "verify:agent-map"');
  }
  if (!/\bnpm run verify:agent-map\b/.test(scripts.verify || '')) {
    issues.push('package.json script "verify" must include "npm run verify:agent-map"');
  }

  const documented = new Set(documentedNpmCommands(text));
  for (const command of Object.keys(scripts).filter((name) => name === 'verify' || name.startsWith('verify:'))) {
    if (!documented.has(command)) {
      issues.push(`package.json script "npm run ${command}" must be documented in docs/agent-codebase-map.md`);
    }
  }
}

function checkPaths(text, issues, sourceLabel = 'documented') {
  for (const repoPath of documentedPaths(text)) {
    const resolved = resolveRepoPath(repoPath);
    if (!resolved || !existsSync(resolved)) {
      issues.push(`${sourceLabel} path "${repoPath}" does not exist`);
      continue;
    }

    if (repoPath.endsWith('/') && !statSync(resolved).isDirectory()) {
      issues.push(`${sourceLabel} path "${repoPath}" must be a directory`);
    }
  }
}

function checkClaudePointer(text, issues) {
  if (!/docs\/agent-codebase-map\.md/.test(text)) {
    issues.push('CLAUDE.md must point scenario readers to docs/agent-codebase-map.md');
  }
}

function checkRequiredMapSections(text, issues) {
  for (const section of REQUIRED_MAP_SECTIONS) {
    if (!section.pattern.test(text)) {
      issues.push(`docs/agent-codebase-map.md must contain section "${section.label}"`);
    }
  }
}

function extractAgentHeader(text) {
  let source = text.replace(/^\uFEFF/, '').trimStart();

  if (/^<!doctype html>/i.test(source)) {
    source = source.replace(/^<!doctype html>\s*/i, '').trimStart();
  }

  if (source.startsWith('<!--')) {
    const end = source.indexOf('-->');
    return end === -1 ? '' : source.slice(0, end + 3);
  }

  if (source.startsWith('/*')) {
    const end = source.indexOf('*/');
    return end === -1 ? '' : source.slice(0, end + 2);
  }

  return '';
}

function headerFieldPattern(field) {
  return new RegExp(`^\\s*(?:\\*\\s*)?${field}:\\s+\\S`, 'm');
}

function checkAgentHeaders(packageJson, issues) {
  for (const repoPath of AGENT_HEADER_FILES) {
    const filePath = join(ROOT, repoPath);
    const text = readText(filePath, issues);
    if (!text) continue;

    const header = extractAgentHeader(text);
    if (!header || !header.includes('AGENT HEADER')) {
      issues.push(`${repoPath} must start with a leading AGENT HEADER comment block`);
      continue;
    }

    for (const field of REQUIRED_AGENT_HEADER_FIELDS) {
      if (!headerFieldPattern(field).test(header)) {
        issues.push(`${repoPath} AGENT HEADER must include a non-empty "${field}:" line`);
      }
    }

    if (documentedNpmCommands(header).length === 0) {
      issues.push(`${repoPath} AGENT HEADER must document at least one "npm run ..." verification command`);
    }
    if (documentedPaths(header).length === 0) {
      issues.push(`${repoPath} AGENT HEADER must include at least one backticked repo path in "Read next:"`);
    }

    checkDocumentedCommands(header, packageJson, issues, `${repoPath} AGENT HEADER`);
    checkPaths(header, issues, `${repoPath} AGENT HEADER`);
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
  checkRequiredMapSections(mapText, issues);
  checkZones(mapText, issues);
  checkCommands(mapText, packageJson, issues);
  checkPaths(mapText, issues);
}

if (claudeText) {
  checkClaudePointer(claudeText, issues);
}

checkAgentHeaders(packageJson, issues);

if (issues.length > 0) {
  console.error(`FAIL agent map verification: ${issues.length} probleme(s) detecte(s).`);
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log('PASS agent map verification: documented commands, critical paths and agent headers are valid.');
