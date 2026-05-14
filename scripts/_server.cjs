const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = 'C:\\Users\\Administrateur\\Documents\\projetPrepaV2';
const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.ttf':'font/ttf','.woff':'font/woff','.woff2':'font/woff2'};
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(ROOT, url === '/' ? 'index.html' : url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + file); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'text/plain'});
    res.end(data);
  });
}).listen(8080, () => process.stderr.write('Server ready on 8080\n'));
