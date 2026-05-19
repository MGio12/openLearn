#!/usr/bin/env node
import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const HELP = `Usage:
  node scripts/course-extract-text.mjs <input-dir> <output-dir>

Extracts text from every PDF in <input-dir> and writes:
  - one text file per PDF
  - combined.txt
  - manifest.json

The script is deterministic and does not call an AI model.
`;

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

async function main() {
  const [inputDir, outputDir] = process.argv.slice(2);

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

  const manifest = {
    inputDir: absoluteInput,
    outputDir: absoluteOutput,
    extractedAt: new Date().toISOString(),
    expectedCorpusSize: '2-5 PDFs for the prototype',
    warnings: [],
    sources: [],
  };

  if (pdfs.length < 2 || pdfs.length > 5) {
    manifest.warnings.push(`Prototype expects 2-5 PDFs; found ${pdfs.length}.`);
  }

  const combined = [];

  for (const [index, filename] of pdfs.entries()) {
    const sourcePath = path.join(absoluteInput, filename);
    const buffer = await fs.readFile(sourcePath);
    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    await parser.destroy();
    const text = normalizeText(parsed.text || '');
    const sourceId = `source-${String(index + 1).padStart(2, '0')}-${slugify(path.basename(filename, '.pdf'))}`;
    const textFilename = `${sourceId}.txt`;

    await fs.writeFile(path.join(absoluteOutput, textFilename), `${text}\n`, 'utf8');

    manifest.sources.push({
      id: sourceId,
      filename,
      textFile: textFilename,
      pages: parsed.total ?? null,
      characters: text.length,
    });

    combined.push([
      `# ${sourceId}`,
      `Original file: ${filename}`,
      '',
      text,
      '',
    ].join('\n'));
  }

  await fs.writeFile(path.join(absoluteOutput, 'combined.txt'), combined.join('\n---\n\n'), 'utf8');
  await fs.writeFile(path.join(absoluteOutput, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  process.stdout.write(`Extracted ${pdfs.length} PDF(s) to ${absoluteOutput}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exit(1);
});
