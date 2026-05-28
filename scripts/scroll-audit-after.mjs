import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'screenshots', 'scroll-audit-after');
mkdirSync(OUT_DIR, { recursive: true });

const BASE = process.env.BASE || 'http://127.0.0.1:4173';

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1366x768', width: 1366, height: 768 },
  { name: 'mobile-390x844', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

const PAGES = [
  { file: 'index.html', primaryAction: /Voir pourquoi cette mission compte/ },
  { file: 'checkout.html', primaryAction: /Garder le plan/ },
  { file: 'onboarding.html', primaryAction: null },
  { file: 'progression.html', primaryAction: /Détails par matière/ },
  { file: 'objectif.html', primaryAction: /Planifier ces leviers/ },
  { file: 'merci.html', primaryAction: /Ouvrir mon cockpit/ },
];

const browser = await chromium.launch();
const metrics = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor || 1,
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.hasTouch,
  });
  const page = await context.newPage();

  for (const p of PAGES) {
    const url = `${BASE}/${p.file}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    const data = await page.evaluate(({ primaryActionSource, fold }) => {
      const re = primaryActionSource ? new RegExp(primaryActionSource) : null;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollWidth = document.documentElement.scrollWidth;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const horizontalOverflow = scrollWidth > viewportWidth;

      // collect candidate "primary actions": anchors and buttons with visible text
      const candidates = Array.from(document.querySelectorAll('a, button')).map(el => {
        const r = el.getBoundingClientRect();
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        return { text, top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, w: r.width, h: r.height };
      }).filter(x => x.text && x.w > 0 && x.h > 0);

      let primary = null;
      if (re) {
        primary = candidates.find(x => re.test(x.text)) || null;
      }
      // Determine the page's effective top - for layouts using sticky nav (mobile fold),
      // primaryVisible means top < (scrollY=0 + viewportHeight)
      const primaryInFirstScreen = primary ? (primary.top < fold) : null;

      return {
        title: document.title,
        scrollHeight, scrollWidth, viewportHeight, viewportWidth,
        horizontalOverflow,
        pageRatio: +(scrollHeight / viewportHeight).toFixed(2),
        primary,
        primaryInFirstScreen,
      };
    }, { primaryActionSource: p.primaryAction ? p.primaryAction.source : null, fold: vp.height });

    metrics.push({
      page: p.file,
      viewport: vp.name,
      ...data,
    });

    const base = `${p.file.replace('.html', '')}-${vp.name}`;
    await page.screenshot({ path: join(OUT_DIR, `${base}-fold.png`), fullPage: false, type: 'png' });
    if (vp.isMobile || data.pageRatio > 1.5) {
      await page.screenshot({ path: join(OUT_DIR, `${base}-full.png`), fullPage: true, type: 'png' });
    }
  }

  await context.close();
}

await browser.close();
writeFileSync(join(OUT_DIR, 'metrics.json'), JSON.stringify(metrics, null, 2));

// Compact summary
console.log('\n=== SUMMARY ===');
for (const m of metrics) {
  const primaryText = m.primary ? `"${m.primary.text.slice(0, 38)}" top=${Math.round(m.primary.top)}` : 'n/a';
  const primaryVisible = m.primaryInFirstScreen === null ? '-' : (m.primaryInFirstScreen ? 'YES' : 'NO');
  console.log(`${m.page.padEnd(18)} ${m.viewport.padEnd(20)} ratio=${m.pageRatio.toString().padEnd(5)} hOverflow=${m.horizontalOverflow ? 'YES' : 'no '} CTA=${primaryVisible.padEnd(4)} ${primaryText}`);
}
console.log(`\nScreenshots: ${OUT_DIR}`);
console.log(`Metrics: ${join(OUT_DIR, 'metrics.json')}`);
