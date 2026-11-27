import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cfg from '../site.config.mjs';
import { districts } from './data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const BUILD_ID = Date.now().toString(36);

/* ---------- utilidades ---------- */
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (p) => cfg.siteUrl + p;
export const waUrl = (text) => `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(text)}`;

const iconCache = {};
export function icon(name, cls = '') {
  if (!iconCache[name]) {
    const f = path.join(ROOT, 'node_modules/lucide-static/icons', `${name}.svg`);
    if (!fs.existsSync(f)) throw new Error(`Icono lucide no encontrado: ${name}`);
    const raw = fs.readFileSync(f, 'utf8');
    iconCache[name] = raw.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[^>]*>/, '').replace('</svg>', '').trim();
  }
  return `<svg class="icon ${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconCache[name]}</svg>`;
}

// Logo oficial de Aliv. h = alto en px; proporción 1400x822. Incluye ambas versiones
// (clara/oscura) superpuestas; el CSS muestra la que corresponde según [data-theme].
export const logo = (h = 48) => {
  const w = Math.round(h * 1400 / 822);
  return `<span class="logo-swap">
    <img class="logo-img logo-dark" src="/assets/img/aliv-telecom-logo-dark.svg" width="${w}" height="${h}" alt="Aliv Telecom" decoding="async">
    <img class="logo-img logo-light" src="/assets/img/aliv-telecom-logo.svg" width="${w}" height="${h}" alt="Aliv Telecom" decoding="async">
  </span>`;
};
// Logo de WIN. Proporción 1400x707. Misma lógica de swap que logo().
export const winLogo = (h = 40) => {
  const w = Math.round(h * 1400 / 707);
  return `<span class="logo-swap">
    <img class="logo-img logo-dark" src="/assets/img/win-logo-dark.svg" width="${w}" height="${h}" alt="WIN, el internet de los winners" loading="lazy" decoding="async">
    <img class="logo-img logo-light" src="/assets/img/win-logo.svg" width="${w}" height="${h}" alt="WIN, el internet de los winners" loading="lazy" decoding="async">
  </span>`;
};


/* ---------- Analytics / Ads / Consent Mode v2 ---------- */
const A = cfg.analytics;
const trackingIds = [A.gaId, A.adsId].filter(Boolean);
export const needsConsent = trackingIds.length > 0 && A.consentBanner;

function trackingHead() {
  const clientCfg = {
    wa: cfg.whatsapp,
    api: cfg.leadsApi || null,
    ga: A.gaId || null,
    ads: A.adsId || null,
    labels: A.adsLabels,
    consent: needsConsent,
  };
  let s = `<script>document.documentElement.classList.add('js');window.ALIV=${JSON.stringify(clientCfg)};window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}</script>`;
  if (trackingIds.length) {
    const defaultState = needsConsent ? 'denied' : 'granted';
    s += `
<script>(function(){var d='${defaultState}',s={ad_storage:d,ad_user_data:d,ad_personalization:d,analytics_storage:d};try{if(localStorage.getItem('aliv_consent')==='granted'){s={ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'}}}catch(e){}
s.wait_for_update=500;gtag('consent','default',s);gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',true);gtag('js',new Date());
${A.gaId ? `gtag('config','${A.gaId}');` : ''}${A.adsId ? `gtag('config','${A.adsId}');` : ''}})();</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingIds[0]}"></script>`;
  }
  return s;
}

/* ---------- Menús ---------- */
const menus = [
  {
    label: 'Planes', href: '/planes/',
    items: [
      { icon: 'house', title: 'Win Hogar', desc: 'Fibra óptica de 750 a 1000 Mbps, con TV o sin TV', href: '/planes/hogar/' },
      { icon: 'building-2', title: 'Edificios y Condominios', desc: 'Cotización a medida para administraciones', href: '/planes/edificios/' },
      { icon: 'scale', title: 'Comparar planes', desc: 'Velocidades, precios y beneficios lado a lado', href: '/planes/#comparar' },
    ],
    feature: { title: '¿Listo para conectarte?', text: 'Solicita tu instalación y un asesor te contacta hoy.', cta: 'Contratar servicio', href: '/contratar/' },
  },
  {
    label: 'Cobertura', href: '/cobertura/', cols: 2,
    items: districts.map(d => ({ icon: 'map-pin', title: d.name, desc: 'Internet fibra óptica', href: `/internet-fibra-optica/${d.slug}/` })),
    feature: { title: '¿Tu distrito no está?', text: 'Estamos ampliando cobertura. Regístrate con prioridad.', cta: 'Consultar cobertura', href: '/cobertura/' },
  },
  {
    label: 'Empresa', href: '/empresa/',
    items: [
      { icon: 'building', title: 'Quiénes somos', desc: 'Conoce Aliv Telecom', href: '/empresa/' },
      { icon: 'target', title: 'Misión y visión', desc: 'Hacia dónde vamos', href: '/empresa/#mision-vision' },
      { icon: 'gem', title: 'Nuestros valores', desc: 'Lo que nos guía cada día', href: '/empresa/#valores' },
      { icon: 'circle-help', title: 'Preguntas frecuentes', desc: 'Resolvemos tus dudas', href: '/preguntas-frecuentes/' },
    ],
    feature: { title: 'Trabaja con nosotros', text: 'Vende internet y gana comisión por cada alta.', cta: 'Ver oportunidad', href: '/trabaja-con-nosotros/' },
  },
];
const directLinks = [
  { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros/' },
  { label: 'Preguntas', href: '/preguntas-frecuentes/' },
];

const isActive = (cur, href) => {
  const h = href.split('#')[0];
  return h === '/' ? cur === '/' : cur === h || cur.startsWith(h);
};

function header(cur) {
  const nav = menus.map((m, i) => `
        <li class="has-menu${isActive(cur, m.href) ? ' is-current' : ''}">
          <a class="nav-link" href="${m.href}">${m.label}</a>
          <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="menu-${i}" aria-label="Abrir submenú de ${m.label}">${icon('chevron-down')}</button>
          <div class="mega" id="menu-${i}">
            <ul class="mega-list${m.cols === 2 ? ' two-cols' : ''}">
              ${m.items.map(it => `<li><a class="mega-item" href="${it.href}"><span class="mega-icon">${icon(it.icon)}</span><span><strong>${it.title}</strong><small>${it.desc}</small></span></a></li>`).join('')}
            </ul>
            <div class="mega-feature">
              <strong>${m.feature.title}</strong>
              <p>${m.feature.text}</p>
              <a class="btn btn-primary btn-sm" href="${m.feature.href}" data-track="cta_click" data-track-location="mega_${m.label.toLowerCase()}">${m.feature.cta} ${icon('arrow-right', 'btn-icon-right')}</a>
            </div>
          </div>
        </li>`).join('') +
    directLinks.map(l => `<li><a class="nav-link${isActive(cur, l.href) ? ' is-current' : ''}" href="${l.href}">${l.label}</a></li>`).join('');

  const drawer = menus.map(m => `
        <details class="drawer-group">
          <summary>${m.label} ${icon('chevron-down')}</summary>
          <ul>
            <li><a href="${m.href}">Ver todo: ${m.label}</a></li>
            ${m.items.map(it => `<li><a href="${it.href}">${it.title}</a></li>`).join('')}
          </ul>
        </details>`).join('') +
    directLinks.map(l => `<a class="drawer-link" href="${l.href}">${l.label}</a>`).join('');

  return `
<div class="topbar">
  <div class="container topbar-inner">
    <p>${icon('zap', 'icon-sm')} Instalación en 24–48 h hábiles* · Soporte técnico 24/7 · Sin límite de consumo</p>
    <a href="tel:${cfg.phoneHref}" data-track="click_to_call" data-track-location="topbar">${icon('phone', 'icon-sm')} ${cfg.phoneDisplay}</a>
  </div>
</div>
<header class="site-header">
  <div class="container header-container">
    <a href="/" class="logo-link" aria-label="Aliv Telecom, ir al inicio">${logo(56)}</a>
    <nav class="main-nav" aria-label="Navegación principal"><ul class="nav-list">${nav}</ul></nav>
    <div class="header-actions">
      <button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Cambiar a modo claro">${icon('sun', 'theme-icon-sun')}${icon('moon', 'theme-icon-moon')}</button>
      <a href="/contratar/" class="btn btn-primary nav-cta" data-track="cta_click" data-track-location="header">${icon('zap', 'btn-icon')} Contratar servicio</a>
      <button class="mobile-nav-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="drawer">${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="drawer-overlay" hidden></div>
<aside class="mobile-drawer" id="drawer" aria-label="Menú móvil" aria-hidden="true">
  <div class="drawer-header">${logo(40)}<button class="drawer-close" type="button" aria-label="Cerrar menú">${icon('x')}</button></div>
  <div class="drawer-body">${drawer}</div>
  <div class="drawer-actions">
    <a href="/contratar/" class="btn btn-primary btn-block" data-track="cta_click" data-track-location="drawer">${icon('zap', 'btn-icon')} Contratar servicio</a>
    <a href="tel:${cfg.phoneHref}" class="btn btn-secondary btn-block" data-track="click_to_call" data-track-location="drawer">${icon('phone', 'btn-icon')} Llamar ahora</a>
  </div>
</aside>`;
}

/* ---------- Footer ---------- */
function footer() {
  const soc = [
    ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn'], ['youtube', 'YouTube'],
  ].filter(([k]) => cfg.social[k]).map(([k, n]) => `<a href="${cfg.social[k]}" rel="noopener me" target="_blank" aria-label="${n}">${icon(k)}</a>`).join('');
  const a = cfg.address;
  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      ${logo(72)}
      <p>Conexiones ultrarrápidas de fibra óptica simétrica para hogares y edificios en Lima.</p>
      <div class="footer-partner"><span>Comercializamos los servicios de</span>${winLogo(34)}</div>
      ${soc ? `<div class="social-links">${soc}</div>` : ''}
      <address>
        <a href="tel:${cfg.phoneHref}" data-track="click_to_call" data-track-location="footer">${icon('phone', 'icon-sm')} ${cfg.phoneDisplay}</a>
        <a href="mailto:${cfg.email}">${icon('mail', 'icon-sm')} ${cfg.email}</a>
        <span>${icon('clock', 'icon-sm')} ${cfg.hoursText.join(' · ')}</span>
        <a href="${cfg.mapsUrl}" target="_blank" rel="noopener" data-track="directions_click">${icon('map-pin', 'icon-sm')} ${a.street}, ${a.district} 15076, ${a.city} - Perú · Cómo llegar</a>
      </address>
    </div>
    <div>
      <h2 class="footer-title">Servicios</h2>
      <ul class="footer-links">
        <li><a href="/contratar/">Contratar servicio</a></li>
        <li><a href="/planes/hogar/">Planes Win Hogar</a></li>
        <li><a href="/planes/edificios/">Edificios y Condominios</a></li>
        <li><a href="/planes/#comparar">Comparar planes</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-title">Cobertura</h2>
      <ul class="footer-links">
        ${districts.map(d => `<li><a href="/internet-fibra-optica/${d.slug}/">Internet en ${d.name}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h2 class="footer-title">Empresa</h2>
      <ul class="footer-links">
        <li><a href="/empresa/">Quiénes somos</a></li>
        <li><a href="/empresa/#valores">Valores</a></li>
        <li><a href="/trabaja-con-nosotros/">Trabaja con nosotros</a></li>
        <li><a href="/preguntas-frecuentes/">Preguntas frecuentes</a></li>
        <li><a href="/terminos-y-condiciones/">Términos y condiciones</a></li>
        <li><a href="/privacidad/">Privacidad y cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${cfg.legalName}. Todos los derechos reservados.</p>
    <p class="footer-note">*Instalación sin costo sujeta a evaluación de cobertura y condiciones comerciales vigentes.</p>
  </div>
</footer>`;
}

function mobileBar() {
  return `
<div class="mobile-bar" role="navigation" aria-label="Acciones rápidas">
  <a href="tel:${cfg.phoneHref}" data-track="click_to_call" data-track-location="mobile_bar">${icon('phone')}<span>Llamar</span></a>
  <a href="${waUrl('Hola, quiero información sobre el internet de Aliv Telecom')}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="mobile_bar">${icon('message-circle')}<span>WhatsApp</span></a>
  <a href="/contratar/" class="mb-primary" data-track="cta_click" data-track-location="mobile_bar">${icon('zap')}<span>Contratar</span></a>
</div>
<a href="${waUrl('Hola, quiero información sobre el internet de Aliv Telecom')}" target="_blank" rel="noopener" class="wa-float" aria-label="Escribir por WhatsApp" data-track="whatsapp_click" data-track-location="floating">${icon('message-circle')}</a>`;
}

function cookieBanner() {
  if (!needsConsent) return '';
  return `
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Aviso de cookies" hidden>
  <p>Usamos cookies para medir el uso del sitio y mejorar nuestra publicidad. Puedes aceptarlas o rechazarlas. <a href="/privacidad/">Más información</a></p>
  <div class="cookie-actions">
    <button type="button" class="btn btn-secondary btn-sm" data-consent="denied">Rechazar</button>
    <button type="button" class="btn btn-primary btn-sm" data-consent="granted">Aceptar</button>
  </div>
</div>`;
}

/* ---------- Estructura de página ---------- */
export function renderPage({ path: p, title, description, body, crumbs = [], schema = [], noindex = false, ogType = 'website', bodyClass = '' }) {
  const canonical = abs(p);
  const org = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': abs('/#organization'),
    name: cfg.name,
    url: abs('/'),
    logo: abs('/assets/img/aliv-telecom-logo.svg'),
    image: abs(cfg.ogImage),
    telephone: cfg.phoneHref,
    email: cfg.email,
    priceRange: 'S/ 54.50 - S/ 179.90',
    address: {
      '@type': 'PostalAddress',
      streetAddress: cfg.address.street,
      addressLocality: cfg.address.district,
      addressRegion: cfg.address.region,
      postalCode: cfg.address.postalCode,
      addressCountry: cfg.address.country,
    },
    openingHoursSpecification: cfg.hours.map(h => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    areaServed: { '@type': 'City', name: 'Lima' },
    contactPoint: [{ '@type': 'ContactPoint', telephone: cfg.phoneHref, contactType: 'customer service', areaServed: 'PE', availableLanguage: 'es' }],
    sameAs: [...Object.values(cfg.social), cfg.mapsUrl].filter(Boolean),
    ...(cfg.mapsUrl ? { hasMap: cfg.mapsUrl } : {}),
  };
  const crumbItems = [{ name: 'Inicio', path: '/' }, ...crumbs];
  const graph = [
    org,
    { '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: cfg.name, inLanguage: 'es-PE', publisher: { '@id': abs('/#organization') } },
    { '@type': 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, description, inLanguage: 'es-PE', isPartOf: { '@id': abs('/#website') }, about: { '@id': abs('/#organization') }, primaryImageOfPage: abs(cfg.ogImage) },
    ...(p === '/' ? [] : [{
      '@type': 'BreadcrumbList',
      itemListElement: crumbItems.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
    }]),
    ...schema,
  ];
  const jsonld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="es-PE">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>try{if(localStorage.getItem('aliv_theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<link rel="alternate" hreflang="es-pe" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="theme-color" content="${cfg.themeColor}">
<meta name="format-detection" content="telephone=no">
${A.gscVerification ? `<meta name="google-site-verification" content="${A.gscVerification}">` : ''}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${cfg.name}">
<meta property="og:locale" content="${cfg.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(cfg.ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Aliv Telecom - Internet de fibra óptica simétrica en Lima">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(cfg.ogImage)}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/outfit-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts.css?v=${BUILD_ID}">
<link rel="stylesheet" href="/assets/style.css?v=${BUILD_ID}">
${trackingHead()}
<script type="application/ld+json">${jsonld}</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Saltar al contenido</a>

<canvas id="fiber-canvas" aria-hidden="true"></canvas>
${header(p)}
<main id="main">
${body}
</main>
${footer()}
${mobileBar()}
${cookieBanner()}
<script src="/assets/app.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}
