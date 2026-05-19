const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const pdfPath = process.argv[2];
const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: buf });
parser.getText()
  .then(async (data) => {
    await parser.destroy();
    console.log(data.text);
  })
  .catch(async (e) => {
    await parser.destroy();
    console.error(e);
  });
