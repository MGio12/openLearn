const pdfParse = require('pdf-parse');
const fs = require('fs');
const pdfPath = process.argv[2];
const buf = fs.readFileSync(pdfPath);
pdfParse(buf).then(data => {
  console.log(data.text);
}).catch(e => console.error(e));