import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'screenshots');
mkdirSync(OUT_DIR, { recursive: true });

const url = process.argv[2] || 'http://127.0.0.1:8080/ats.html';
const name = process.argv[3] || 'ats';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });

const fullPath = join(OUT_DIR, `${name}-full.png`);
const foldPath = join(OUT_DIR, `${name}-fold.png`);

await page.screenshot({ path: fullPath, fullPage: true, type: 'png' });
await page.screenshot({ path: foldPath, fullPage: false, type: 'png' });

await browser.close();
console.log(`Screenshots sauvegardes:\n  ${fullPath}\n  ${foldPath}`);