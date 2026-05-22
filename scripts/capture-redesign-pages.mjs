import { createReadStream, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
import { createServer } from 'http';
import { dirname, extname, join, normalize, relative, resolve, sep } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const ROOT = resolve(join(fileURLToPath(import.meta.url), '..', '..'));
const OUT_ROOT = join(ROOT, 'output', 'playwright', 'redesign');

const VIEWPORTS = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 390, height: 844 },
];

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function rootPages() {
  return readdirSync(ROOT)
    .filter((name) => name.endsWith('.html'))
    .sort();
}

function pageSlug(path) {
  return path.replace(/\.html$/i, '') || 'index';
}

function pageUrl(baseUrl, path) {
  return `${baseUrl}/${path.split(sep).join('/')}`;
}

function startServer() {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent((request.url || '/').split('?')[0]);
    const requestPath = pathname === '/' ? '/index.html' : pathname;
    const filePath = normalize(join(ROOT, requestPath));
    const rel = relative(ROOT, filePath);

    if (rel.startsWith('..') || rel === '' || rel.includes(`..${sep}`) || !existsSync(filePath) || !statSync(filePath).isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'Content-Type': MIME[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolveServer({
        baseUrl: `http://127.0.0.1:${address.port}`,
        close: () => new Promise((resolveClose) => server.close(resolveClose)),
      });
    });
  });
}

async function capturePage(browser, baseUrl, pagePath, viewport) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  const slug = pageSlug(pagePath);
  const dir = join(OUT_ROOT, slug);
  mkdirSync(dir, { recursive: true });

  try {
    await page.goto(pageUrl(baseUrl, pagePath), { waitUntil: 'networkidle' });
    await page.screenshot({
      path: join(dir, `${viewport.label}.png`),
      fullPage: true,
    });

    const snapshot = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim() || '',
      links: Array.from(document.querySelectorAll('a[href]')).map((link) => ({
        text: link.textContent?.replace(/\s+/g, ' ').trim() || '',
        href: link.getAttribute('href') || '',
      })),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    writeFileSync(join(dir, `${viewport.label}.snapshot.json`), `${JSON.stringify(snapshot, null, 2)}\n`);
  } finally {
    await page.close();
  }
}

mkdirSync(dirname(OUT_ROOT), { recursive: true });
const pages = rootPages();
const server = await startServer();
const browser = await chromium.launch();

try {
  for (const pagePath of pages) {
    for (const viewport of VIEWPORTS) {
      await capturePage(browser, server.baseUrl, pagePath, viewport);
    }
  }
} finally {
  await browser.close();
  await server.close();
}

console.log(`Captured ${pages.length} root pages x ${VIEWPORTS.length} viewports in ${relative(ROOT, OUT_ROOT)}.`);

