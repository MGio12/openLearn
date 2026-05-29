const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.env.SITE_ROOT || path.resolve(__dirname, '..'));
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8080);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendText(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

function isInsideRoot(filePath) {
  const relativePath = path.relative(ROOT, filePath);
  return relativePath === '' || (!!relativePath && !relativePath.startsWith('..') && !path.isAbsolute(relativePath));
}

function safeRequestPath(reqUrl) {
  const rawPath = String(reqUrl || '/').split('?')[0];
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch (error) {
    return { status: 400 };
  }

  if (decodedPath.includes('\0')) return { status: 400 };

  const normalizedPath = decodedPath.replace(/\\/g, '/');
  const relativeUrlPath = normalizedPath === '/'
    ? 'index.html'
    : normalizedPath.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relativeUrlPath);

  if (!isInsideRoot(filePath)) return { status: 403 };
  return { filePath };
}

function createServer() {
  return http.createServer((req, res) => {
    const resolved = safeRequestPath(req.url);

    if (resolved.status === 400) {
      sendText(res, 400, 'Bad request');
      return;
    }

    if (resolved.status === 403) {
      sendText(res, 403, 'Forbidden');
      return;
    }

    fs.readFile(resolved.filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT' || err.code === 'EISDIR') {
          sendText(res, 404, 'Not found');
          return;
        }
        sendText(res, 500, 'Internal server error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': MIME[path.extname(resolved.filePath)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(data);
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, HOST, () => {
    process.stderr.write(`Server ready at http://${HOST}:${PORT}\n`);
  });
}

module.exports = {
  createServer,
  safeRequestPath,
};
