import { readFileSync } from 'fs';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
GlobalWorkerOptions.workerSrc = '';
const data = new Uint8Array(readFileSync('C:\\Users\\Administrateur\\.claude\\projects\\C--Users-Administrateur-Documents-projetPrepaV2\\907ecfe3-d86b-4963-9d2a-256fba9b8eea\\tool-results\\webfetch-1778768946877-stavvh.pdf'));
const pdf = await getDocument({ data, disableWorker: true, verbosity: 0 }).promise;
console.log('Pages:', pdf.numPages);
let allText = '';
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  const pageText = content.items.map(item => item.str).join(' ');
  allText += pageText + '\n--- PAGE ' + i + ' END ---\n';
}
console.log(allText);