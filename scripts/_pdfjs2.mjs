import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { getDocument, GlobalWorkerOptions } = await import('C:/Users/Administrateur/Documents/projetPrepaV2/node_modules/pdfjs-dist/legacy/build/pdf.mjs');

GlobalWorkerOptions.workerSrc = new URL('file:///C:/Users/Administrateur/Documents/projetPrepaV2/node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs').href;

const data = new Uint8Array(readFileSync('C:/Users/Administrateur/.claude/projects/C--Users-Administrateur-Documents-projetPrepaV2/907ecfe3-d86b-4963-9d2a-256fba9b8eea/tool-results/webfetch-1778768946877-stavvh.pdf'));
const loadingTask = getDocument({ data, verbosity: 0 });
const pdf = await loadingTask.promise;
console.error('Pages:', pdf.numPages);
let allText = '';
for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  allText += content.items.map(it => it.str).join('') + '\n===P' + i + '===\n';
}
process.stdout.write(allText);