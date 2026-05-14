import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'screenshots');
mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:8080/ats.html', { waitUntil: 'networkidle' });
// Full page at 2x scale via deviceScaleFactor
await page.screenshot({ path: join(OUT_DIR, 'ats-heatmap-zoom.png'), type: 'png',
  clip: { x: 200, y: 240, width: 860, height: 440 } });
await browser.close();
console.log('done');