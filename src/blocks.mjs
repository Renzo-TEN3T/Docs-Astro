// Bloques reutilizables de contenido (HTML como strings)
import cfg from '../site.config.mjs';
import { plans, allPlans, promo, minPromo, fmt, districts, faqs, values, benefits, addons, resolveBundle } from './data.mjs';
import { icon, esc, abs, winLogo } from './layout.mjs';

export const sectionHead = ({ tag, title, desc, level = 2, center = true }) => `
<div class="section-header${center ? ' text-center' : ''} reveal">
  ${tag ? `<span class="section-tagline">${tag}</span>` : ''}
  <h${level} class="section-title">${title}</h${level}>
  ${desc ? `<p class="section-description">${desc}</p>` : ''}
</div>`;

export const breadcrumbs = (crumbs) => `
<nav class="breadcrumbs" aria-label="Migas de pan">
  <ol>
    <li><a href="/">Inicio</a></li>
    ${crumbs.map((c, i) => i === crumbs.length - 1
      ? `<li aria-current="page">${c.name}</li>`
      : `<li><a href="${c.path}">${c.name}</a></li>`).join('')}
  </ol>
</nav>`;

export const pageHero = ({ crumbs, tag, h1, lead, actions = '' }) => `
<section class="page-hero">
  <div class="container">
    ${breadcrumbs(crumbs)}
    ${tag ? `<span class="section-tagline">${tag}</span>` : ''}
    <h1 class="page-title">${h1}</h1>
    <p class="page-lead">${lead}</p>
    ${actions ? `<div class="hero-actions">${actions}</div>` : ''}
  </div>
</section>`;

/* ---------- Planes ---------- */
export const planCard = (p, cat, loc = 'plans') => `
<article class="plan-card glass-panel reveal${p.popular ? ' popular' : ''}">
  ${p.popular ? '<div class="popular-badge">RECOMENDADO</div>' : ''}
  <header class="plan-head">
    <h3 class="plan-speed"><span>${p.speed}</span> Mbps</h3>
    <p class="plan-type">${p.name} · Fibra óptica</p>
  </header>
  <p class="plan-price"><span class="cur">S/</span><span class="val">${fmt(p.promo)}</span><span class="per">el 1er mes</span></p>
  <p class="plan-then">Luego S/ ${fmt(p.regular)} al mes</p>
  <ul class="plan-features">
    ${p.features.map(f => `<li>${icon('check', 'text-orange')}<span>${f}</span></li>`).join('')}
  </ul>
  <a href="/contratar/?plan=${p.id}" class="btn ${p.popular ? 'btn-primary' : 'btn-secondary'} btn-block"
     data-track="select_item" data-track-item="${p.id}" data-track-price="${p.regular}" data-track-location="${loc}">
    Contratar este plan ${icon('arrow-right', 'btn-icon-right')}
  </a>
</article>`;

export const planGrid = (cat, loc) => `<div class="plans-grid">${plans[cat].items.map(p => planCard(p, cat, loc)).join('')}</div>`;

export const partnerStrip = () => `<div class="partner-strip reveal"><span>Planes de internet de</span>${winLogo(34)}<span>contrata con Aliv Telecom</span></div>`;

export const promoNote = () => `<p class="plans-note reveal">${icon('info', 'text-orange')} <span><strong>50% de descuento el primer mes</strong>, válido hasta el ${promo.untilText}. Solo Lima y Callao, altas nuevas. <a class="text-link" href="/planes/#condiciones">Ver condiciones</a></span></p>`;

export const plansTabs = () => {
  const cats = Object.keys(plans);
  return `
${partnerStrip()}
<div class="tabs" data-tabs>
  <div class="plan-toggle" role="tablist" aria-label="Tipo de plan">
    ${cats.map((c, i) => `<button type="button" role="tab" id="tab-${c}" aria-controls="panel-${c}" aria-selected="${i === 0}" class="plan-toggle-btn${i === 0 ? ' active' : ''}">${icon(plans[c].icon, 'btn-icon')} ${plans[c].tabLabel}</button>`).join('')}
  </div>
  ${cats.map(c => `<div role="tabpanel" id="panel-${c}" aria-labelledby="tab-${c}" class="tabpanel">${planGrid(c, 'home_tabs')}</div>`).join('')}
</div>
${promoNote()}`;
};

export const comparisonTable = () => `
<div class="table-wrap reveal" id="comparar">
  <table class="compare">
    <caption class="sr-only">Comparación de planes de internet fibra óptica Aliv Telecom</caption>
    <thead><tr><th scope="col">Plan</th><th scope="col">Velocidad</th><th scope="col">1er mes</th><th scope="col">Luego</th><th scope="col"><span class="sr-only">Acción</span></th></tr></thead>
    <tbody>
      ${allPlans.map(p => `<tr${p.popular ? ' class="hl"' : ''}>
        <th scope="row">${p.name}${p.popular ? ' <em>Recomendado</em>' : ''}</th>
        <td>${p.speed} Mbps</td><td><strong>S/ ${fmt(p.promo)}</strong></td><td>S/ ${fmt(p.regular)} / mes</td>
        <td><a class="btn btn-sm ${p.popular ? 'btn-primary' : 'btn-secondary'}" href="/contratar/?plan=${p.id}" data-track="select_item" data-track-item="${p.id}" data-track-price="${p.regular}" data-track-location="compare_table">Contratar</a></td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>`;

export const productSchema = (cats) => cats.flatMap(cat => plans[cat].items.map(p => ({
  '@type': 'Product',
  name: `${p.name} ${p.speed} Mbps`,
  description: `${p.name} de ${p.speed} Mbps por fibra óptica en Lima. ${p.features.slice(0, 2).join('. ')}. 50% de descuento el primer mes.`,
  brand: { '@type': 'Brand', name: cfg.name },
  image: abs(cfg.ogImage),
  category: 'Internet de fibra óptica',
  offers: {
    '@type': 'Offer', price: p.promo, priceCurrency: 'PEN', priceValidUntil: promo.until, availability: 'https://schema.org/InStock',
    url: abs(`/contratar/?plan=${p.id}`), seller: { '@id': abs('/#organization') },
  },
})));

/* ---------- Formulario de contratación ---------- */
export const contractForm = ({ title = 'Solicita tu instalación', sub = 'Un asesor te contacta por WhatsApp en minutos.', preDistrict = '', location = 'form' } = {}) => `
<div class="contract-card glass-panel" id="contratar-form">
  <div class="contract-head">
    <span class="section-tagline">CONTRATAR SERVICIO</span>
    <h2 class="contract-title">${title}</h2>
    <p>${sub}</p>
  </div>
  <form id="contract-form" class="form" data-location="${location}" autocomplete="on">
    <div class="hp" aria-hidden="true"><label>No llenar este campo<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="form-group">
      <label for="ct-plan">Plan</label>
      <select id="ct-plan" name="plan" required>
        ${plans.internet.items.map(p => `<option value="${p.id}" data-promo="${p.promo}" data-regular="${p.regular}"${p.popular ? ' selected' : ''}>${p.speed} Mbps — S/ ${fmt(p.promo)} el 1er mes (luego S/ ${fmt(p.regular)})${p.popular ? ' (Recomendado)' : ''}</option>`).join('')}
        <option value="edificio-cotizar" data-promo="0" data-regular="0">Cotizar para mi edificio o condominio</option>
      </select>
    </div>
    <div class="form-group" id="ct-addon-group">
      <label for="ct-addon">Servicio adicional</label>
      <select id="ct-addon" name="addon">
        ${Object.values(addons).map(a => `<option value="${a.id}" data-promo="${a.promo}" data-regular="${a.regular}">${a.id ? `${a.name} (+S/ ${fmt(a.promo)} el 1er mes, luego +S/ ${fmt(a.regular)})` : a.name}</option>`).join('')}
      </select>
    </div>
    <p class="form-total" id="ct-total" aria-live="polite"></p>
    <script type="application/json" id="bundle-resolve-map">${JSON.stringify(Object.fromEntries(allPlans.map(p => [p.id, resolveBundle(p.id)])))}</script>
    <div class="form-group">
      <label for="ct-name">Nombre completo</label>
      <input type="text" id="ct-name" name="name" placeholder="Ej. Juan Pérez" autocomplete="name" required minlength="3">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ct-phone">Celular</label>
        <input type="tel" id="ct-phone" name="phone" placeholder="999 999 999" autocomplete="tel-national" inputmode="numeric" pattern="[0-9 +]{9,15}" title="Ingresa un celular de 9 dígitos" required>
      </div>
      <div class="form-group">
        <label for="ct-district">Distrito</label>
        <select id="ct-district" name="district" required>
          <option value="" disabled${preDistrict ? '' : ' selected'}>Selecciona</option>
          ${districts.map(d => `<option${d.name === preDistrict ? ' selected' : ''}>${d.name}</option>`).join('')}
          <option value="Otro">Otro distrito</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="ct-address">Dirección exacta</label>
      <input type="text" id="ct-address" name="address" placeholder="Ej. Av. Larco 123, Dpto 402" autocomplete="street-address" required minlength="5">
    </div>
    <button type="submit" class="btn btn-primary btn-block btn-lg">${icon('send', 'btn-icon')} Contratar ahora</button>
    <p class="form-fineprint">Al enviar aceptas ser contactado por Aliv y nuestros <a href="/terminos-y-condiciones/">Términos y condiciones</a> y <a href="/privacidad/">Política de privacidad</a>. Promo 50% dcto. 1er mes válida hasta el ${promo.untilText}, solo Lima y Callao, altas nuevas, sujeta a evaluación crediticia y cobertura.</p>
  </form>
</div>`;

/* ---------- Pasos, beneficios, stats ---------- */
export const steps = () => `
<div class="steps-grid">
  ${[
    ['Solicitas', 'Llenas el formulario con tu plan y dirección. Toma menos de un minuto.'],
    ['Validamos cobertura', 'Un asesor confirma la factibilidad técnica y te explica el contrato sin letra chica.'],
    ['Instalamos', 'Nuestro técnico instala la fibra y deja tu router configurado en 24–48 horas hábiles.'],
  ].map(([t, d], i) => `<div class="step-card glass-panel reveal"><span class="step-num">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>`;

export const benefitsGrid = () => `
<div class="bento">
  ${benefits.map((b, i) => `
  <article class="benefit-card glass-panel reveal b${i + 1}">
    <div class="benefit-icon ${b.color}">${icon(b.icon)}</div>
    <h3>${b.title}</h3>
    <p>${b.text}</p>
  </article>`).join('')}
</div>`;

export const statsStrip = () => `
<div class="stats-strip">
  <div class="container stats-grid">
    <div class="stat"><span class="stat-number" data-count="100" data-suffix="%">100%</span><span class="stat-label">Simetría de subida y bajada</span></div>
    <div class="stat"><span class="stat-number">&lt; 3 ms</span><span class="stat-label">Latencia local promedio</span></div>
    <div class="stat"><span class="stat-number" data-count="99.9" data-decimals="1" data-suffix="%">99.9%</span><span class="stat-label">Disponibilidad de red</span></div>
    <div class="stat"><span class="stat-number" data-count="1000" data-suffix=" Mbps">1000 Mbps</span><span class="stat-label">Velocidad máxima (hogar)</span></div>
  </div>
</div>`;

/* ---------- FAQ ---------- */
export const faqBlock = (items) => `
<div class="faq-list">
  ${items.map(f => `
  <details class="faq-item glass-panel reveal">
    <summary><span>${f.q}</span>${icon('chevron-down')}</summary>
    <div class="faq-answer"><p>${f.a}</p></div>
  </details>`).join('')}
</div>`;

export const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

/* ---------- Distritos ---------- */
export const districtGrid = (exclude) => `
<div class="district-grid">
  ${districts.filter(d => d.slug !== exclude).map(d => `
  <a class="district-card glass-panel reveal" href="/internet-fibra-optica/${d.slug}/">
    ${icon('map-pin')}<span><strong>${d.name}</strong><small>Internet fibra óptica en ${d.name}</small></span>${icon('arrow-right', 'go')}
  </a>`).join('')}
</div>`;

/* ---------- Valores ---------- */
export const valuesGrid = () => `
<div class="values-grid">
  ${values.map(v => `<article class="value-card glass-panel reveal">${icon(v.icon)}<h3>${v.title}</h3><p>${v.text}</p></article>`).join('')}
</div>`;

/* ---------- Simulador ---------- */
export const speedSim = () => `
<div class="speed-widget glass-panel reveal" id="speed-sim">
  <div class="widget-header">
    <div><span class="widget-subtitle">TEST DE VELOCIDAD SIMULADO</span><h3 class="widget-title">Prueba el poder Aliv</h3></div>
    <span class="widget-badge">${icon('zap', 'icon-sm')} FTTH</span>
  </div>
  <div class="gauge-wrap">
    <div class="gauge-ring">
      <svg class="gauge-svg" viewBox="0 0 200 200" aria-hidden="true"><circle class="gauge-bg" cx="100" cy="100" r="85"/><circle id="gauge-progress" class="gauge-progress-bar" cx="100" cy="100" r="85"/></svg>
      <div class="gauge-center"><span id="gauge-speed-val" class="speed-number">0</span><span class="speed-unit">Mbps</span><span class="speed-type">SIMÉTRICOS</span></div>
    </div>
  </div>
  <div class="widget-stats">
    <div class="widget-stat"><div class="w-label">${icon('arrow-down', 'icon-sm text-orange')} Descarga</div><div class="w-value"><span id="widget-download">0.0</span> <small>Mbps</small></div></div>
    <div class="widget-stat"><div class="w-label">${icon('arrow-up', 'icon-sm text-yellow')} Subida</div><div class="w-value"><span id="widget-upload">0.0</span> <small>Mbps</small></div></div>
    <div class="widget-stat"><div class="w-label">${icon('activity', 'icon-sm text-green')} Ping</div><div class="w-value" id="widget-ping">--</div></div>
  </div>
  <div class="comparison-selector" role="group" aria-label="Tecnología">
    <button type="button" id="btn-select-hfc" class="comp-btn">Cobre / Coaxial HFC</button>
    <button type="button" id="btn-select-aliv" class="comp-btn active">Fibra Óptica Aliv</button>
  </div>
  <button type="button" id="btn-run-sim" class="btn btn-primary btn-block">${icon('play', 'btn-icon')} Iniciar simulación</button>
  <p id="sim-message" class="sim-message" aria-live="polite">Selecciona una tecnología y haz clic en Iniciar. Es una simulación ilustrativa.</p>
</div>`;

export const ctaBand = ({ title = '¿Listo para volar con Aliv Telecom?', text = 'Contrata hoy tu fibra óptica simétrica y olvídate de las caídas.' } = {}) => `
<section class="cta-section">
  <div class="container text-center reveal">
    <h2 class="cta-title">${title}</h2>
    <p class="cta-subtitle">${text}</p>
    <div class="cta-buttons">
      <a href="/contratar/" class="btn btn-primary btn-lg" data-track="cta_click" data-track-location="cta_band">${icon('zap', 'btn-icon')} Contratar servicio</a>
      <a href="tel:${cfg.phoneHref}" class="btn btn-secondary btn-lg" data-track="click_to_call" data-track-location="cta_band">${icon('phone', 'btn-icon')} Llamar ${cfg.phoneDisplay}</a>
    </div>
  </div>
</section>`;
