// Generador del sitio estático:  node build.mjs   (o  npm run build)
// Lee site.config.mjs + src/*  y escribe todo en /dist
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from './site.config.mjs';
import pages from './src/pages.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// 1) Páginas  (/ruta/ -> dist/ruta/index.html)
for (const p of pages) {
  const file = p.path.endsWith('.html')
    ? path.join(DIST, p.path)
    : path.join(DIST, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, p.html);
}

// 2) Assets estáticos
fs.cpSync(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'), { recursive: true });

// 3) sitemap.xml  (solo páginas indexables)
const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : ['/contratar/', '/planes/'].includes(p) ? '0.9' : p.startsWith('/internet-fibra-optica/') ? '0.7' : '0.6');
const urls = pages.filter(p => !p.noindex).map(p => `  <url>
    <loc>${cfg.siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(p.path)}</priority>
  </url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

// 4) robots.txt
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /gracias/\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

// 5) Aviso de configuración pendiente
const warn = [];
if (cfg.siteUrl.includes('alivtelecom.pe')) warn.push('siteUrl: confirma que sea tu dominio real');
if (cfg.whatsapp === '51999999999') warn.push('whatsapp: sigue el número de ejemplo');
if (!cfg.analytics.gaId) warn.push('analytics.gaId vacío → Google Analytics NO se carga');
if (!cfg.analytics.adsId) warn.push('analytics.adsId vacío → Google Ads NO se carga');
console.log(`✔ ${pages.length} páginas generadas en /dist (${pages.filter(p => !p.noindex).length} en sitemap)`);
if (warn.length) console.log('\nPendientes en site.config.mjs:\n  - ' + warn.join('\n  - '));
