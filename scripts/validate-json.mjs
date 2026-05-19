import { readdirSync, readFileSync } from 'fs';
import { dirname, join, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const IGNORED_DIRS = new Set(['.git', '.codex-ralph', '.playwright-mcp', 'node_modules']);

function rel(filePath) {
  return relative(ROOT, filePath).split(sep).join('/');
}

function issue(issues, filePath, message) {
  issues.push(`${rel(filePath)}: ${message}`);
}

function listJsonFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        files.push(...listJsonFiles(join(directory, entry.name)));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(join(directory, entry.name));
    }
  }

  return files.sort();
}

function validateJsonFile(filePath, issues) {
  const buffer = readFileSync(filePath);
  const hasBom = buffer.length >= 3 && buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;
  const text = buffer.toString('utf8');

  if (buffer.length === 0 || text.trim().length === 0) {
    issue(issues, filePath, 'fichier JSON vide');
    return;
  }

  if (hasBom) {
    issue(issues, filePath, 'BOM UTF-8 interdit au debut du fichier');
  }

  try {
    JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (error) {
    issue(issues, filePath, `JSON invalide: ${error.message}`);
  }
}

const issues = [];
const jsonFiles = listJsonFiles(ROOT);

for (const filePath of jsonFiles) {
  validateJsonFile(filePath, issues);
}

if (issues.length > 0) {
  console.error(`FAIL JSON validation: ${issues.length} probleme(s) detecte(s).`);
  for (const message of issues) {
    console.error(`- ${message}`);
  }
  process.exit(1);
}

console.log(`PASS JSON validation: ${jsonFiles.length} fichiers JSON verifies.`);
