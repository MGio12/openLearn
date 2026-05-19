import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
import { readFileSync } from 'fs';

const pdfPath = process.argv[2];
const buf = readFileSync(pdfPath);
const parser = new PDFParse({ data: buf });
const data = await parser.getText();
await parser.destroy();
console.log(data.text);
