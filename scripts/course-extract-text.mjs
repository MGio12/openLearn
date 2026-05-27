#!/usr/bin/env node
import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const HELP = `Usage:
  node scripts/course-extract-text.mjs [--force] [--concurrency 2-4] <input-dir> <output-dir>

Extracts text from every PDF in <input-dir> and writes:
  - one text file per PDF
  - combined.txt
  - manifest.json

The script is deterministic and does not call an AI model.
`;

function parseArgs(argv) {
  const options = {
    force: false,
    concurrency: 3,
    positional: [],
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '--concurrency') {
      const raw = argv[index + 1];
      if (!raw) throw new Error('--concurrency expects a number from 2 to 4');
      options.concurrency = Number(raw);
      index++;
      continue;
    }
    if (arg.startsWith('--concurrency=')) {
      options.concurrency = Number(arg.slice('--concurrency='.length));
      continue;
    }
    options.positional.push(arg);
  }

  if (!Number.isInteger(options.concurrency)) {
    throw new Error(`--concurrency must be an integer, got ${options.concurrency}`);
  }
  options.concurrency = Math.max(2, Math.min(4, options.concurrency));
  return options;
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeText(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

async function readJsonIfExists(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeIfChanged(filePath, content) {
  try {
    const current = await fs.readFile(filePath, 'utf8');
    if (current === content) return false;
  } catch {}

  await fs.writeFile(filePath, content, 'utf8');
  return true;
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runNext() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => runNext()),
  );

  return results;
}

async function extractPdfText(sourcePath) {
  const buffer = await fs.readFile(sourcePath);
  let parser = null;

  try {
    parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    return {
      text: normalizeText(parsed.text || ''),
      pages: parsed.total ?? null,
    };
  } finally {
    if (parser) await parser.destroy().catch(() => {});
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [inputDir, outputDir] = args.positional;

  if (inputDir === '--help' || inputDir === '-h') {
    process.stdout.write(HELP);
    process.exit(0);
  }

  if (!inputDir || !outputDir) {
    process.stdout.write(HELP);
    process.exit(1);
  }

  const absoluteInput = path.resolve(inputDir);
  const absoluteOutput = path.resolve(outputDir);
  const entries = await fs.readdir(absoluteInput, { withFileTypes: true });
  const pdfs = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.pdf'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'fr'));

  if (pdfs.length === 0) {
    throw new Error(`No PDF files found in ${absoluteInput}`);
  }

  await fs.mkdir(absoluteOutput, { recursive: true });
  const previousManifest = await readJsonIfExists(path.join(absoluteOutput, 'manifest.json'));
  const previousSources = new Map(
    (previousManifest?.sources || []).map((source) => [source.filename, source]),
  );

  const manifest = {
    inputDir: absoluteInput,
    outputDir: absoluteOutput,
    extractedAt: new Date().toISOString(),
    expectedCorpusSize: '2-5 PDFs for the prototype',
    force: args.force,
    concurrency: args.concurrency,
    warnings: [],
    sources: [],
  };

  if (pdfs.length < 2 || pdfs.length > 5) {
    manifest.warnings.push(`Prototype expects 2-5 PDFs; found ${pdfs.length}.`);
  }

  const results = await mapLimit(pdfs, args.concurrency, async (filename, index) => {
    const sourcePath = path.join(absoluteInput, filename);
    const stat = await fs.stat(sourcePath);
    const sourceId = `source-${String(index + 1).padStart(2, '0')}-${slugify(path.basename(filename, '.pdf'))}`;
    const textFilename = `${sourceId}.txt`;
    const textPath = path.join(absoluteOutput, textFilename);
    const previous = previousSources.get(filename);
    const canReuse = !args.force
      && previous
      && previous.size === stat.size
      && previous.mtimeMs === stat.mtimeMs
      && previous.textFile === textFilename
      && await fileExists(textPath);

    let text;
    let pages;
    let cached = false;

    if (canReuse) {
      text = normalizeText(await fs.readFile(textPath, 'utf8'));
      pages = previous.pages ?? null;
      cached = true;
    } else {
      const parsed = await extractPdfText(sourcePath);
      text = parsed.text;
      pages = parsed.pages;
      await writeIfChanged(textPath, `${text}\n`);
    }

    return {
      id: sourceId,
      filename,
      textFile: textFilename,
      pages,
      characters: text.length,
      size: stat.size,
      mtimeMs: stat.mtimeMs,
      cached,
      text,
    };
  });

  const combined = [];
  for (const result of results) {
    const { text, ...source } = result;
    manifest.sources.push(source);
    combined.push([
      `# ${source.id}`,
      `Original file: ${source.filename}`,
      '',
      text,
      '',
    ].join('\n'));
  }

  await writeIfChanged(path.join(absoluteOutput, 'combined.txt'), combined.join('\n---\n\n'));
  await writeIfChanged(path.join(absoluteOutput, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  const cachedCount = manifest.sources.filter((source) => source.cached).length;
  process.stdout.write(`Extracted ${pdfs.length - cachedCount} PDF(s), reused ${cachedCount}, to ${absoluteOutput}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
