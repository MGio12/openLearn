import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { readFileSync } from 'fs';

const pdfPath = process.argv[2];
const buf = readFileSync(pdfPath);
const data = await pdfParse(buf);
console.log(data.text);