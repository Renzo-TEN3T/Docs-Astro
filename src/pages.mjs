// Definición de todas las páginas del sitio
import cfg from '../site.config.mjs';
import { plans, promo, districts, faqs, faqsWork } from './data.mjs';
import { renderPage, icon, abs, waUrl } from './layout.mjs';
import {
  sectionHead, pageHero, plansTabs, planGrid, promoNote, comparisonTable, productSchema, contractForm, steps,
  benefitsGrid, statsStrip, partnerStrip, faqBlock, faqSchema, districtGrid, valuesGrid, speedSim, ctaBand,
} from './blocks.mjs';

const pages = [];
const add = (p) => pages.push({ ...p, html: renderPage(p) });

/* =============================== INICIO =============================== */
add({
  path: '/',
  title: 'Internet Fibra Óptica en Lima hasta 1000 Mbps | Aliv Telecom',
  description: 'Contrata internet de fibra óptica simétrica en Lima: planes desde S/ 54.50 el primer mes, hasta 1000 Mbps e instalación en 24–48 h. Promo 50% dcto. en Lima.',
  bodyClass: 'house',
  schema: [faqSchema(faqs.slice(0, 5))],
  body: `
<section class="hero-section">
  <div class="container hero-container">
    <div class="hero-content">
      <div class="hero-badge"><span class="pulse-dot"></span> Instalación en 24–48 horas hábiles*</div>
      <h1 class="hero-title">Internet de fibra óptica en Lima, <span class="highlight-text">hasta 1000 Mbps simétricos</span></h1>
      <p class="hero-description">Conecta tu hogar o edificio con fibra real de extremo a extremo: sin límite de consumo, sin letras chicas y con soporte técnico 24/7. Deja tus datos y un asesor te contacta hoy.</p>
      <ul class="hero-checks">
        <li>${icon('circle-check', 'text-green')} <strong>50% de descuento el 1er mes</strong>, desde S/ 54.50</li>
        <li>${icon('circle-check', 'text-green')} 100% simétrico: misma velocidad al subir y bajar</li>
        <li>${icon('circle-check', 'text-green')} Para casas, departamentos, edificios y condominios</li>
      </ul>
      <div class="hero-actions">
        <a href="/planes/" class="btn btn-secondary btn-lg">Ver planes y precios</a>
        <a href="tel:${cfg.phoneHref}" class="btn btn-ghost btn-lg" data-track="click_to_call" data-track-location="hero">${icon('phone', 'btn-icon')} ${cfg.phoneDisplay}</a>
      </div>
    </div>
    <div class="hero-form">${contractForm({ location: 'hero' })}</div>
  </div>
</section>

${statsStrip()}

<section class="section" id="como-contratar">
  <div class="container">
    ${sectionHead({ tag: 'CONTRATAR ES FÁCIL', title: 'De la solicitud a la conexión en 3 pasos', desc: 'Sin trámites complicados ni visitas innecesarias.' })}
    ${steps()}
  </div>
</section>

<section class="section section-alt" id="beneficios">
  <div class="container">
    ${sectionHead({ tag: '¿POR QUÉ ALIV TELECOM?', title: 'Más que internet: una conexión que no te falla', desc: 'Nuestra red de fibra óptica está pensada para quienes no toleran interrupciones.' })}
    ${benefitsGrid()}
  </div>
</section>

<section class="section" id="planes">
  <div class="container">
    ${sectionHead({ tag: 'PLANES DE INTERNET', title: 'Elige la velocidad ideal para ti', desc: 'Solo internet, con WINTV L1MAX o con DGO. Cada plan con 50% de descuento el primer mes. Compara y contrata en línea.' })}
    ${plansTabs()}
    <p class="text-center reveal"><a class="text-link" href="/planes/#comparar">Comparar todos los planes ${icon('arrow-right', 'icon-sm')}</a></p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ tag: '¿QUÉ NECESITAS?', title: 'Una solución para cada caso' })}
    <div class="audience-grid">
      <a class="audience-card glass-panel reveal" href="/planes/hogar/"><span class="audience-icon">${icon('house')}</span><h3>Para mi hogar</h3><p>Win Hogar: fibra óptica de 750 a 1000 Mbps, solo internet o con TV y fútbol.</p><span class="go">Ver planes Hogar ${icon('arrow-right', 'icon-sm')}</span></a>
      <a class="audience-card glass-panel reveal" href="/planes/edificios/"><span class="audience-icon">${icon('building-2')}</span><h3>Para mi edificio o condominio</h3><p>Troncal de fibra canalizada, instalación ordenada y gestor de cuenta para la administración.</p><span class="go">Cotizar para mi edificio ${icon('arrow-right', 'icon-sm')}</span></a>
      <a class="audience-card glass-panel reveal" href="/trabaja-con-nosotros/"><span class="audience-icon">${icon('badge-dollar-sign')}</span><h3>Quiero vender y ganar</h3><p>Sé asesor independiente o conviértete en socio estratégico, con planilla desde el día 1, y cobra comisión por cada alta activa.</p><span class="go">Trabaja con nosotros ${icon('arrow-right', 'icon-sm')}</span></a>
    </div>
  </div>
</section>

<section class="section" id="velocidad">
  <div class="container split">
    <div class="split-copy reveal">
      <span class="section-tagline">COMPÁRALO TÚ MISMO</span>
      <h2 class="section-title">Fibra Aliv vs. cable coaxial</h2>
      <p class="section-description">Con fibra simétrica tu velocidad de subida es igual a la de bajada y la latencia se mantiene mínima aunque toda la casa esté conectada. Simula la diferencia.</p>
      <a href="/contratar/" class="btn btn-primary btn-lg" data-track="cta_click" data-track-location="speed_section">Quiero fibra Aliv ${icon('arrow-right', 'btn-icon-right')}</a>
    </div>
    ${speedSim()}
  </div>
</section>

<section class="section section-alt" id="cobertura">
  <div class="container">
    ${sectionHead({ tag: 'COBERTURA EN LIMA', title: 'Internet fibra óptica en tu distrito', desc: 'Elige tu distrito para ver planes y contratar. ¿No aparece? Regístrate y te avisamos apenas lleguemos.' })}
    ${districtGrid()}
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="reveal">
      <span class="section-tagline">LA EMPRESA</span>
      <h2 class="section-title">Somos Aliv Telecom</h2>
      <p class="section-description">Una empresa peruana de telecomunicaciones especializada en fibra óptica simétrica. Combinamos tecnología de punta con atención cercana, y crecemos junto a nuestra red de asesores y socios estratégicos.</p>
      <div class="hero-actions"><a href="/empresa/" class="btn btn-secondary">Conocer la empresa</a><a href="/trabaja-con-nosotros/" class="btn btn-ghost">Trabaja con nosotros ${icon('arrow-right', 'btn-icon-right')}</a></div>
    </div>
    <div class="mini-values reveal">
      <ul>
        <li>${icon('handshake')}<span><strong>Compromiso</strong> con cada plazo y cada promesa</span></li>
        <li>${icon('eye')}<span><strong>Transparencia</strong> en precios y contratos</span></li>
        <li>${icon('heart-handshake')}<span><strong>Cercanía</strong> en la atención</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section-alt" id="faqs">
  <div class="container narrow">
    ${sectionHead({ tag: 'PREGUNTAS FRECUENTES', title: 'Aclaramos todas tus dudas' })}
    ${faqBlock(faqs.slice(0, 5))}
    <p class="text-center reveal"><a class="text-link" href="/preguntas-frecuentes/">Ver todas las preguntas ${icon('arrow-right', 'icon-sm')}</a></p>
  </div>
</section>

${ctaBand()}`,
});

/* ============================== CONTRATAR ============================== */
add({
  path: '/contratar/',
  title: 'Contratar Internet Fibra Óptica en Lima | Aliv Telecom',
  description: 'Solicita tu instalación de internet de fibra óptica simétrica en Lima. Elige tu plan, deja tus datos y un asesor te contacta por WhatsApp. Instalación en 24–48 h.',
  crumbs: [{ name: 'Contratar servicio', path: '/contratar/' }],
  schema: [faqSchema(faqs.slice(0, 4))],
  body: `
${pageHero({ crumbs: [{ name: 'Contratar servicio', path: '/contratar/' }], tag: 'CONTRATAR SERVICIO', h1: 'Contrata tu internet de fibra óptica', lead: 'Elige tu plan, deja tus datos y un asesor te contacta hoy por WhatsApp para confirmar cobertura y agendar tu instalación.' })}
<section class="section tight">
  <div class="container contract-layout">
    <div class="contract-side">
      <div class="side-card glass-panel reveal">
        <h2>¿Qué incluye tu plan?</h2>
        <ul class="check-list">
          <li>${icon('circle-check', 'text-green')} Fibra óptica 100% simétrica</li>
          <li>${icon('circle-check', 'text-green')} Sin límite de consumo de datos</li>
          <li>${icon('circle-check', 'text-green')} Instalación sin costo adicional*</li>
          <li>${icon('circle-check', 'text-green')} Router incluido y configurado</li>
          <li>${icon('circle-check', 'text-green')} Soporte técnico 24/7</li>
        </ul>
      </div>
      <div class="side-card glass-panel reveal">
        <h2>¿Qué pasa después?</h2>
        <ol class="num-list">
          <li><strong>Recibimos tu solicitud</strong> y te escribimos por WhatsApp.</li>
          <li><strong>Validamos cobertura</strong> en tu dirección.</li>
          <li><strong>Instalamos</strong> en 24–48 horas hábiles.</li>
        </ol>
      </div>
      <div class="side-card glass-panel reveal">
        <h2>¿Prefieres hablar con alguien?</h2>
        <p>Llámanos o escríbenos, te asesoramos sin compromiso.</p>
        <div class="side-actions">
          <a class="btn btn-secondary btn-block" href="tel:${cfg.phoneHref}" data-track="click_to_call" data-track-location="contratar_side">${icon('phone', 'btn-icon')} ${cfg.phoneDisplay}</a>
          <a class="btn btn-secondary btn-block" href="${waUrl('Hola, quiero información sobre el internet de Aliv Telecom')}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="contratar_side">${icon('message-circle', 'btn-icon')} WhatsApp</a>
        </div>
      </div>
    </div>
    <div>${contractForm({ title: 'Completa tu solicitud', location: 'contratar_page' })}</div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead({ tag: 'PLANES', title: 'Todos los planes disponibles' })}
    ${plansTabs()}
  </div>
</section>

<section class="section">
  <div class="container narrow">
    ${sectionHead({ title: 'Dudas antes de contratar' })}
    ${faqBlock(faqs.slice(0, 4))}
  </div>
</section>`,
});

/* =============================== PLANES =============================== */
add({
  path: '/planes/',
  title: 'Planes de Internet Fibra Óptica desde S/ 54.50 | Aliv',
  description: 'Compara planes de fibra óptica de 750 a 1000 Mbps: solo internet, con WINTV L1MAX o con DGO. 50% de descuento el primer mes en Lima. Contrata en línea.',
  crumbs: [{ name: 'Planes', path: '/planes/' }],
  schema: productSchema(['internet', 'l1max', 'dgo']),
  body: `
${pageHero({ crumbs: [{ name: 'Planes', path: '/planes/' }], tag: 'PLANES Y PRECIOS', h1: 'Planes de internet fibra óptica desde S/ 54.50 el primer mes', lead: 'Velocidades de 750 a 1000 Mbps con 50% de descuento el primer mes. Elige solo internet, con WINTV L1MAX o con DGO. Para edificios y condominios, cotizamos aparte.' })}
<section class="section tight">
  <div class="container">
    ${partnerStrip()}
    ${sectionHead({ title: 'Solo Internet', desc: 'Fibra óptica para tu casa o departamento.', level: 2 })}
    ${planGrid('internet', 'planes_hub')}
    <div class="spacer"></div>
    ${sectionHead({ title: 'Internet + WINTV L1MAX Premium', desc: 'Más de 90 canales y L1MAX con el fútbol local.', level: 2 })}
    ${planGrid('l1max', 'planes_hub')}
    <div class="spacer"></div>
    ${sectionHead({ title: 'Internet + DGO', desc: 'DGO con DSports, L1Max y Amazon Prime incluidos.', level: 2 })}
    ${planGrid('dgo', 'planes_hub')}
    <div class="spacer"></div>
    ${sectionHead({ title: 'Edificios y Condominios', desc: 'Para administraciones y edificios completos cotizamos a medida.', level: 2 })}
    <p class="text-center reveal"><a class="btn btn-secondary" href="/planes/edificios/">Cotizar para mi edificio ${icon('arrow-right', 'btn-icon-right')}</a></p>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead({ tag: 'COMPARAR', title: 'Compara todos los planes', desc: 'Velocidad y precio del primer mes y el precio regular de cada plan.' })}
    ${comparisonTable()}
    <p class="plans-note reveal">${icon('info', 'text-orange')} <span>Precios en soles (S/) con IGV incluido.</span></p>
    <div class="legal-box reveal" id="condiciones"><h3>Condiciones de la promoción</h3><p>${promo.note}</p></div>
  </div>
</section>
<section class="section">
  <div class="container narrow">
    ${sectionHead({ title: 'Preguntas sobre los planes' })}
    ${faqBlock(faqs.slice(0, 4))}
  </div>
</section>
${ctaBand()}`,
});

add({
  path: '/planes/hogar/',
  title: 'Win Hogar: Internet Fibra Óptica para Casas | Aliv Telecom',
  description: 'Win Hogar: fibra óptica de 750, 850 y 1000 Mbps para tu casa, solo internet o con TV. Desde S/ 54.50 el primer mes con 50% de descuento en Lima.',
  crumbs: [{ name: 'Planes', path: '/planes/' }, { name: 'Win Hogar', path: '/planes/hogar/' }],
  schema: productSchema(['internet', 'l1max', 'dgo']),
  body: `
${pageHero({ crumbs: [{ name: 'Planes', path: '/planes/' }, { name: 'Win Hogar', path: '/planes/hogar/' }], tag: 'WIN HOGAR', h1: 'Internet de fibra óptica para tu hogar', lead: 'Teletrabajo sin cortes, series en 4K, clases virtuales y juegos online al mismo tiempo. Elige solo internet o súmale TV y fútbol, con 50% de descuento el primer mes.' })}
<section class="section tight"><div class="container">
  ${partnerStrip()}
  ${sectionHead({ title: 'Solo Internet', level: 2 })}
  ${planGrid('internet', 'planes_hogar')}
  <div class="spacer"></div>
  ${sectionHead({ title: 'Internet + WINTV L1MAX Premium', level: 2 })}
  ${planGrid('l1max', 'planes_hogar')}
  <div class="spacer"></div>
  ${sectionHead({ title: 'Internet + DGO', level: 2 })}
  ${planGrid('dgo', 'planes_hogar')}
  ${promoNote()}
</div></section>
<section class="section section-alt"><div class="container">
  ${sectionHead({ tag: '¿CUÁL ELEGIR?', title: 'Cómo elegir tu velocidad ideal' })}
  <div class="audience-grid">
    <div class="audience-card glass-panel reveal"><h3>750 Mbps</h3><p>Para hogares con varios dispositivos conectados, trabajo remoto, clases virtuales y series en alta definición.</p></div>
    <div class="audience-card glass-panel reveal"><h3>850 Mbps</h3><p>Para familias con muchos usuarios a la vez, streaming en 4K y videollamadas simultáneas.</p></div>
    <div class="audience-card glass-panel reveal"><h3>1000 Mbps</h3><p>La máxima velocidad: para gamers, streamers y quienes mueven archivos pesados a diario. Admite hasta 2 Mesh en comodato.</p></div>
  </div>
</div></section>
<section class="section"><div class="container narrow">
  ${sectionHead({ title: 'Preguntas sobre Win Hogar' })}
  ${faqBlock(faqs.slice(0, 4))}
</div></section>
${ctaBand({ title: 'Contrata Win Hogar hoy' })}`,
});

add({
  path: '/planes/edificios/',
  title: 'Internet Fibra Óptica para Edificios y Condominios | Aliv',
  description: 'Fibra óptica para edificios y condominios en Lima: instalación ordenada, coordinada con la administración y atención prioritaria. Solicita tu cotización.',
  crumbs: [{ name: 'Planes', path: '/planes/' }, { name: 'Edificios y Condominios', path: '/planes/edificios/' }],
    body: `
${pageHero({ crumbs: [{ name: 'Planes', path: '/planes/' }, { name: 'Edificios y Condominios', path: '/planes/edificios/' }], tag: 'EDIFICIOS Y CONDOMINIOS', h1: 'Fibra óptica para edificios y condominios', lead: 'Instalamos una troncal de fibra canalizada y llevamos conexión dedicada a cada departamento: ordenada, estética y coordinada con la administración.' })}
<section class="section tight"><div class="container">
  <div class="contract-layout"><div class="side-card glass-panel reveal"><h2>Cotización a medida</h2><p>Cada edificio es distinto: número de departamentos, canalización existente y acuerdos con la administración. Cuéntanos tu caso y un asesor te prepara una propuesta.</p><a class="btn btn-primary btn-lg" href="/contratar/?plan=edificio-cotizar" data-track="select_item" data-track-item="edificio-cotizar" data-track-location="planes_edificios">Cotizar para mi edificio ${icon('arrow-right', 'btn-icon-right')}</a></div></div>
</div></section>
<section class="section section-alt"><div class="container">
  ${sectionHead({ tag: 'PARA ADMINISTRADORES', title: 'Lo que valoran las administraciones' })}
  <div class="audience-grid">
    <div class="audience-card glass-panel reveal"><span class="audience-icon">${icon('cable')}</span><h3>Instalación ordenada</h3><p>Canalizamos la fibra sin cables expuestos y respetando la estética y las normas del edificio.</p></div>
    <div class="audience-card glass-panel reveal"><span class="audience-icon">${icon('handshake')}</span><h3>Coordinación previa</h3><p>Planificamos el trabajo con la administración para minimizar molestias a los vecinos.</p></div>
    <div class="audience-card glass-panel reveal"><span class="audience-icon">${icon('user-check')}</span><h3>Gestor de cuenta</h3><p>Un contacto directo para la administración, con atención prioritaria y SLA.</p></div>
  </div>
</div></section>
<section class="section"><div class="container narrow">
  ${sectionHead({ title: 'Preguntas sobre edificios y condominios' })}
  ${faqBlock([faqs[4], faqs[1], faqs[2], faqs[0]])}
</div></section>
${ctaBand({ title: 'Conecta tu edificio con Aliv', text: 'Cuéntanos sobre tu edificio y coordinamos una visita técnica.' })}`,
});

/* ============================== COBERTURA ============================== */
add({
  path: '/cobertura/',
  title: 'Cobertura de Internet Fibra Óptica en Lima | Aliv Telecom',
  description: 'Consulta la cobertura de fibra óptica de Aliv Telecom en Lima: Miraflores, San Isidro, Surco, San Borja, La Molina y más. Regístrate si tu zona aún no figura.',
  crumbs: [{ name: 'Cobertura', path: '/cobertura/' }],
  body: `
${pageHero({ crumbs: [{ name: 'Cobertura', path: '/cobertura/' }], tag: 'COBERTURA', h1: 'Cobertura de internet fibra óptica en Lima', lead: 'Estamos expandiendo nuestra red de fibra simétrica. Elige tu distrito o consulta la factibilidad de tu dirección.' })}
<section class="section tight"><div class="container contract-layout">
  <div>
    ${sectionHead({ title: 'Distritos con servicio', center: false, level: 2 })}
    ${districtGrid()}
    <p class="plans-note reveal">${icon('info', 'text-orange')} <span>¿Tu distrito no aparece? Elige “Otro distrito” en el formulario: te registramos con prioridad y te avisamos apenas haya factibilidad.</span></p>
  </div>
  <div>${contractForm({ title: 'Consulta tu cobertura', sub: 'Un asesor valida tu dirección y te responde por WhatsApp.', location: 'cobertura_page' })}</div>
</div></section>
${ctaBand()}`,
});

for (const d of districts) {
  const path = `/internet-fibra-optica/${d.slug}/`;
  const local = [
    { q: `¿Tienen cobertura de fibra óptica en ${d.name}?`, a: `Atendemos ${d.name} y la cobertura se confirma por dirección. Completa el formulario y un asesor valida la factibilidad técnica de tu casa o edificio en minutos.` },
    { q: `¿Cuánto cuesta el internet de fibra óptica en ${d.name}?`, a: `Los planes de fibra óptica empiezan en S/ 54.50 el primer mes (50% de descuento, luego S/ 109 al mes en 750 Mbps). La promoción aplica a altas nuevas en Lima, sujeta a evaluación crediticia y cobertura. Para edificios y condominios cotizamos a medida.` },
    { q: `¿Cuánto demora la instalación en ${d.name}?`, a: 'Una vez confirmada la cobertura y aprobada la solicitud, la instalación toma en promedio de 24 a 48 horas hábiles.' },
  ];
    add({
    path,
    title: `Internet Fibra Óptica en ${d.name} | Aliv Telecom`,
    description: `Contrata internet de fibra óptica en ${d.name}: hasta 1000 Mbps desde S/ 54.50 el primer mes (50% dcto.). Cobertura por dirección. Cotiza hoy.`,
    crumbs: [{ name: 'Cobertura', path: '/cobertura/' }, { name: d.name, path }],
    schema: [
      faqSchema(local),
      { '@type': 'Service', name: `Internet de fibra óptica en ${d.name}`, serviceType: 'Internet de fibra óptica', provider: { '@id': abs('/#organization') }, areaServed: { '@type': 'AdministrativeArea', name: `${d.name}, Lima, Perú` }, url: abs(path) },
    ],
    body: `
${pageHero({ crumbs: [{ name: 'Cobertura', path: '/cobertura/' }, { name: d.name, path }], tag: `INTERNET EN ${d.name.toUpperCase()}`, h1: `Internet de fibra óptica en ${d.name}`, lead: d.intro })}
<section class="section tight"><div class="container contract-layout">
  <div class="contract-side">
    <div class="side-card glass-panel reveal">
      <h2>Fibra Aliv en ${d.name}</h2>
      <ul class="check-list">
        <li>${icon('circle-check', 'text-green')} Hasta 1000 Mbps en Win Hogar</li>
        <li>${icon('circle-check', 'text-green')} Planes para edificios y condominios</li>
        <li>${icon('circle-check', 'text-green')} Instalación en 24–48 h hábiles*</li>
        <li>${icon('circle-check', 'text-green')} Sin límite de consumo y soporte 24/7</li>
      </ul>
    </div>
    <div class="side-card glass-panel reveal">
      <h2>Desde S/ 54.50 el primer mes</h2>
      <p>Win Hogar: 750, 850 y 1000 Mbps con 50% de descuento el primer mes. Edificios y condominios: cotización a medida. <a class="text-link" href="/planes/">Compara los planes</a>.</p>
    </div>
  </div>
  <div>${contractForm({ title: `Contrata en ${d.name}`, preDistrict: d.name, location: 'district_' + d.slug })}</div>
</div></section>

<section class="section section-alt"><div class="container">
  ${sectionHead({ tag: 'PLANES', title: `Planes de internet para ${d.name}` })}
  ${['internet', 'l1max', 'dgo'].map(c => `<h3 class="sub-title reveal">${plans[c].label}</h3>${planGrid(c, 'district_' + d.slug)}`).join('')}
</div></section>

<section class="section"><div class="container narrow">
  ${sectionHead({ title: `Preguntas sobre internet en ${d.name}` })}
  ${faqBlock(local)}
</div></section>

<section class="section section-alt"><div class="container">
  ${sectionHead({ tag: 'OTRAS ZONAS', title: 'También llegamos a' })}
  ${districtGrid(d.slug)}
</div></section>
${ctaBand({ title: `Tu internet de fibra en ${d.name}, hoy` })}`,
  });
}

/* ============================== EMPRESA ============================== */
add({
  path: '/empresa/',
  title: 'Quiénes Somos: Misión, Visión y Valores | Aliv Telecom',
  description: 'Conoce a Aliv Telecom, empresa peruana de internet de fibra óptica simétrica: quiénes somos, nuestra misión, visión y los valores que nos guían.',
  crumbs: [{ name: 'Empresa', path: '/empresa/' }],
  ogType: 'website',
  body: `
${pageHero({ crumbs: [{ name: 'Empresa', path: '/empresa/' }], tag: 'LA EMPRESA', h1: 'Somos Aliv Telecom: más que un proveedor de internet', lead: 'Conectamos hogares y edificios con fibra óptica y un trato cercano. Creemos que la buena conectividad cambia la forma de vivir, estudiar y trabajar.' })}
<section class="section tight" id="quienes-somos"><div class="container split">
  <div class="reveal">
    <h2 class="section-title">Quiénes somos</h2>
    <p class="body-text">Aliv Telecom es una empresa peruana de telecomunicaciones especializada en internet de fibra óptica simétrica. Llevamos conectividad de alta calidad a familias y edificios, con instalación rápida, atención humana y una red pensada para no fallar.</p>
    <p class="body-text">Además de atender a nuestros clientes directamente, trabajamos con una red de asesores y socios estratégicos que hacen crecer la cobertura y ganan junto con nosotros.</p>
  </div>
  <div class="stats-card glass-panel reveal">
    <div><span class="stat-number">100%</span><span class="stat-label">Fibra óptica simétrica</span></div>
    <div><span class="stat-number">24/7</span><span class="stat-label">Soporte técnico</span></div>
    <div><span class="stat-number">48 h</span><span class="stat-label">Instalación promedio*</span></div>
    <div><span class="stat-number">0</span><span class="stat-label">Límites de consumo</span></div>
  </div>
</div></section>

<section class="section section-alt" id="mision-vision"><div class="container">
  ${sectionHead({ tag: 'HACIA DÓNDE VAMOS', title: 'Misión y visión' })}
  <div class="mv-grid">
    <article class="mv-card glass-panel reveal"><span class="audience-icon">${icon('target')}</span><h3>Misión</h3><p>Brindar conexiones de fibra óptica rápidas, estables y accesibles, con un servicio al cliente que genere confianza.</p></article>
    <article class="mv-card glass-panel reveal"><span class="audience-icon">${icon('eye')}</span><h3>Visión</h3><p>Ser el operador de fibra de referencia en el Perú por la calidad de su red y la cercanía con sus clientes y aliados.</p></article>
  </div>
</div></section>

<section class="section" id="valores"><div class="container">
  ${sectionHead({ tag: 'NUESTROS VALORES', title: 'Lo que nos guía cada día' })}
  ${valuesGrid()}
</div></section>

<section class="section section-alt"><div class="container split">
  <div class="reveal">
    <span class="section-tagline">CRECE CON NOSOTROS</span>
    <h2 class="section-title">Súmate a nuestra red de asesores</h2>
    <p class="section-description">Vende internet de fibra óptica y gana comisión por cada alta instalada y activa. Con horario libre y sin tope de ingresos.</p>
    <a class="btn btn-primary btn-lg" href="/trabaja-con-nosotros/">Trabaja con nosotros ${icon('arrow-right', 'btn-icon-right')}</a>
  </div>
  <div class="reveal"><ul class="check-list big">
    <li>${icon('circle-check', 'text-green')} Pago por comisión por alta activa</li>
    <li>${icon('circle-check', 'text-green')} Capacitación y material de venta</li>
    <li>${icon('circle-check', 'text-green')} Asesor independiente o socio estratégico</li>
  </ul></div>
</div></section>
${ctaBand()}`,
});

/* ========================== TRABAJA CON NOSOTROS ========================== */
add({
  path: '/trabaja-con-nosotros/',
  title: 'Trabaja con Nosotros: Vende Internet y Gana Comisiones | Aliv',
  description: 'Sé asesor independiente o conviértete en socio estratégico de Aliv Telecom, con planilla desde el día 1. Gana comisión por cada alta de fibra óptica instalada y activa.',
  crumbs: [{ name: 'Trabaja con nosotros', path: '/trabaja-con-nosotros/' }],
  schema: [faqSchema(faqsWork)],
  body: `
${pageHero({ crumbs: [{ name: 'Trabaja con nosotros', path: '/trabaja-con-nosotros/' }], tag: 'TRABAJA CON NOSOTROS', h1: 'Vende internet de fibra óptica y gana por cada alta', lead: 'Súmate como asesor comercial independiente, por comisión y sin techo de ingresos, o como socio estratégico: armas tu propio equipo y entras en planilla de Aliv desde el día 1.' })}
<section class="section tight"><div class="container work-layout">
  <div>
    <div class="side-card glass-panel reveal">
      <h2>${icon('wallet', 'text-orange')} Cómo se paga</h2>
      <ul class="pay-list">
        <li>${icon('check', 'text-orange')}<span><strong>Pago por comisión:</strong> ganas por cada alta instalada y activa.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Sin tope:</strong> más ventas, más ingresos. Escala de comisión según el volumen mensual.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Liquidación mensual:</strong> el pago se realiza una vez cerrado y validado el mes.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Cliente al día:</strong> la comisión se consolida cuando el cliente paga sus primeras facturas.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Horario libre:</strong> tú decides cuándo y dónde vender.</span></li>
      </ul>
      <p class="fineprint">Los montos exactos y la escala por volumen se confirman con el área comercial al inscribirte.</p>
    </div>

    <h2 class="sub-title reveal">Elige cómo trabajar</h2>
    <div class="tiers">
      <article class="tier glass-panel reveal"><span class="tier-tag">Asesor independiente</span><h3>Vendes por tu cuenta</h3><p>Referidos, puerta a puerta o redes sociales. Cobras comisión por cada alta que logres.</p></article>
      <article class="tier glass-panel reveal"><span class="tier-tag">Socio estratégico</span><h3>Armas tu equipo</h3><p>Formas y lideras tu equipo de ventas, entras en planilla de Aliv desde el día 1 y recibes comisión por las altas de toda tu red, con condiciones preferenciales.</p></article>
    </div>

    <div class="side-card glass-panel reveal">
      <h2>${icon('shield-check', 'text-orange')} Sistema de pagos del socio estratégico</h2>
      <ul class="pay-list">
        <li>${icon('check', 'text-orange')}<span><strong>Planilla desde el día 1:</strong> ingresas a planilla de Aliv, no como independiente.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Salario básico</strong> de acuerdo a ley, fijo todos los meses.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Bono por meta:</strong> comisión variable según el cumplimiento de meta de tu equipo.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Gratificación y CTS</strong>, los beneficios de ley.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>AFP u ONP:</strong> tú eliges tu sistema pensionario.</span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Seguro EsSalud</strong> y <strong>vacaciones pagadas.</strong></span></li>
        <li>${icon('check', 'text-orange')}<span><strong>Asignación familiar</strong> cuando corresponde según ley.</span></li>
      </ul>
      <p class="fineprint">Estos beneficios son para el socio estratégico que arma su equipo; el asesor independiente sigue bajo el esquema de comisión de arriba. Son condiciones generales referenciales: el monto del salario básico, la escala del bono por meta y el detalle de cada beneficio se confirman por escrito en tu contrato al momento de la contratación.</p>
    </div>

    <h2 class="sub-title reveal">¿Cómo empezar?</h2>
    <ol class="num-list reveal">
      <li><strong>Envía tu postulación</strong> con el formulario.</li>
      <li><strong>Te contactamos</strong> y te explicamos el esquema de comisiones.</li>
      <li><strong>Te capacitamos</strong> y te damos material de venta.</li>
      <li><strong>Registras tus ventas</strong> y cobras cada mes.</li>
    </ol>
  </div>

  <div class="work-form glass-panel reveal" id="postular">
    <h2 class="contract-title">Postula ahora</h2>
    <p>Te respondemos por WhatsApp.</p>
    <form id="work-form" class="form" autocomplete="on">
      <div class="form-group"><label for="wk-name">Nombre completo</label><input type="text" id="wk-name" name="name" autocomplete="name" required minlength="3" placeholder="Tu nombre"></div>
      <div class="form-row">
        <div class="form-group"><label for="wk-phone">Celular</label><input type="tel" id="wk-phone" name="phone" inputmode="numeric" autocomplete="tel-national" pattern="[0-9 +]{9,15}" title="Ingresa un celular de 9 dígitos" required placeholder="999 999 999"></div>
        <div class="form-group"><label for="wk-city">Ciudad / Distrito</label><input type="text" id="wk-city" name="city" required placeholder="Ej. Lima - Surco"></div>
      </div>
      <div class="form-group"><label for="wk-type">Quiero trabajar como</label><select id="wk-type" name="type" required><option>Asesor independiente</option><option>Socio estratégico</option></select></div>
      <div class="form-group"><label for="wk-exp">¿Tienes experiencia en ventas?</label><select id="wk-exp" name="exp" required><option>Sin experiencia</option><option>Menos de 1 año</option><option>1 a 3 años</option><option>Más de 3 años</option></select></div>
      <button type="submit" class="btn btn-primary btn-block btn-lg">${icon('send', 'btn-icon')} Enviar postulación</button>
      <p class="form-fineprint">Al enviar aceptas nuestros <a href="/terminos-y-condiciones/">Términos y condiciones</a> y <a href="/privacidad/">Política de privacidad</a>.</p>
    </form>
  </div>
</div></section>

<section class="section section-alt"><div class="container narrow">
  ${sectionHead({ tag: 'PREGUNTAS', title: 'Dudas frecuentes de nuestros asesores' })}
  ${faqBlock(faqsWork)}
</div></section>
${ctaBand({ title: '¿Listo para empezar a ganar?', text: 'Postula hoy y empieza a vender fibra óptica con respaldo de Aliv.' })}`,
});

/* ======================= PREGUNTAS FRECUENTES ======================= */
add({
  path: '/preguntas-frecuentes/',
  title: 'Preguntas Frecuentes de Internet Fibra Óptica | Aliv Telecom',
  description: 'Resuelve tus dudas sobre internet de fibra óptica simétrica: instalación, costos, cobertura, soporte, edificios y cómo trabajar con Aliv Telecom.',
  crumbs: [{ name: 'Preguntas frecuentes', path: '/preguntas-frecuentes/' }],
  schema: [faqSchema([...faqs, ...faqsWork])],
  body: `
${pageHero({ crumbs: [{ name: 'Preguntas frecuentes', path: '/preguntas-frecuentes/' }], tag: 'CENTRO DE AYUDA', h1: 'Preguntas frecuentes', lead: 'Todo lo que necesitas saber sobre el servicio de fibra óptica de Aliv Telecom y sobre cómo trabajar con nosotros.' })}
<section class="section tight"><div class="container narrow">
  <h2 class="sub-title reveal">Sobre el servicio</h2>
  ${faqBlock(faqs)}
  <h2 class="sub-title reveal">Trabaja con nosotros</h2>
  ${faqBlock(faqsWork)}
  <p class="text-center reveal">¿No encontraste tu respuesta? <a class="text-link" href="${waUrl('Hola, tengo una consulta sobre Aliv Telecom')}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="faq">Escríbenos por WhatsApp</a></p>
</div></section>
${ctaBand()}`,
});

/* ============================== GRACIAS ============================== */
add({
  path: '/gracias/',
  title: 'Solicitud recibida | Aliv Telecom',
  description: 'Hemos recibido tu solicitud. Un asesor de Aliv Telecom te contactará en breve.',
  noindex: true,
  crumbs: [{ name: 'Gracias', path: '/gracias/' }],
  bodyClass: 'thanks',
  body: `
<section class="section thanks-section">
  <div class="container narrow text-center">
    <div class="thanks-icon thanks-icon-pending" id="th-icon">${icon('message-circle')}</div>
    <h1 class="page-title" id="th-title">Casi listo: falta enviar tu solicitud</h1>
    <p class="page-lead" id="th-msg">Tu solicitud todavía no ha llegado a un asesor. Envíala por WhatsApp para que te atendamos.</p>
    <ol class="thanks-steps" id="th-steps" aria-label="Pasos">
      <li class="done"><span>${icon('check')}</span> Datos completados</li>
      <li class="now"><span>2</span> Enviar por WhatsApp</li>
      <li><span>3</span> Un asesor te contacta</li>
    </ol>
    <div class="thanks-card glass-panel" id="th-summary" hidden></div>
    <div class="cta-buttons">
      <a id="th-wa" class="btn btn-primary btn-lg btn-wa" href="${waUrl('Hola, quiero contratar el servicio de internet de Aliv Telecom')}" target="_blank" rel="noopener">${icon('message-circle', 'btn-icon')} Enviar mi solicitud por WhatsApp</a>
    </div>
    <p class="thanks-hint" id="th-hint">Se abrirá WhatsApp con tus datos ya escritos: solo toca <strong>Enviar</strong>. ¿No se abre? Llámanos al <a class="text-link" href="tel:${cfg.phoneHref}" data-track="click_to_call" data-track-location="thanks">${cfg.phoneDisplay}</a>.</p>
    <p class="thanks-back"><a class="text-link" href="/">Volver al inicio</a></p>
  </div>
</section>`,
});

/* ============================== PRIVACIDAD ============================== */
add({
  path: '/privacidad/',
  title: 'Política de Privacidad y Cookies | Aliv Telecom',
  description: 'Cómo Aliv Telecom trata tus datos personales, obtiene tu consentimiento y utiliza cookies de análisis y publicidad, conforme a la Ley N.° 29733 de Protección de Datos Personales.',
  crumbs: [{ name: 'Privacidad y cookies', path: '/privacidad/' }],
  body: `
${pageHero({ crumbs: [{ name: 'Privacidad y cookies', path: '/privacidad/' }], h1: 'Política de privacidad y cookies', lead: 'Última actualización: ' + new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }) + '.' })}
<section class="section tight"><div class="container narrow legal">
  <h2>1. Responsable del tratamiento</h2>
  <p>${cfg.legalName}, con domicilio en ${cfg.address.street}, ${cfg.address.district}, ${cfg.address.city}, Perú. Contacto: <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>
  <h2>2. Datos que recopilamos</h2>
  <p>Cuando solicitas un servicio o postulas para trabajar con nosotros, recopilamos tu nombre, celular, distrito, dirección y datos relacionados con tu solicitud (plan elegido, modalidad de trabajo, experiencia). Si te conviertes en cliente o socio estratégico, también tratamos los datos propios del contrato, la instalación y la facturación del servicio.</p>
  <h2>3. Finalidad del tratamiento</h2>
  <p>Usamos tus datos para contactarte, validar cobertura, gestionar tu contratación o postulación, prestar y facturar el servicio, brindarte soporte técnico y, si lo autorizas, enviarte información comercial.</p>
  <h2>4. Consentimiento</h2>
  <p>Al completar y enviar cualquiera de nuestros formularios (contratación, cobertura o postulación) nos das tu consentimiento expreso para tratar los datos que ingresas con las finalidades descritas en esta política. Puedes retirar tu consentimiento en cualquier momento escribiendo a <a href="mailto:${cfg.email}">${cfg.email}</a>, sin que esto afecte la licitud del tratamiento previo. El consentimiento para cookies de análisis y publicidad se gestiona por separado en el aviso de cookies del sitio y puede cambiarse cuando quieras desde ahí.</p>
  <h2>5. Cookies y herramientas de medición</h2>
  <p>Utilizamos Google Analytics y Google Ads para medir el uso del sitio y la eficacia de nuestra publicidad. Estas cookies solo se activan si las aceptas en el aviso de cookies; puedes rechazarlas y el sitio funcionará igualmente. Puedes cambiar tu elección en cualquier momento borrando las cookies de tu navegador o volviendo a abrir el aviso.</p>
  <h2>6. Registros que conservamos</h2>
  <p>Guardamos un registro de las solicitudes enviadas por este sitio (formulario y datos ingresados, fecha y página de origen) y de las conversaciones que inicias por WhatsApp o llamada, para dar seguimiento a tu solicitud, auditar nuestro proceso comercial y cumplir obligaciones legales o contractuales. No vendemos estos registros a terceros.</p>
  <h2>7. Derechos de imagen</h2>
  <p>Si tomamos fotos o videos tuyos —por ejemplo durante una instalación, en un testimonio o como parte del material de un asesor o socio estratégico— te pedimos autorización previa y expresa antes de publicarlos en nuestro sitio, redes sociales o material comercial. Puedes negarte o retirar tu autorización en cualquier momento escribiendo a <a href="mailto:${cfg.email}">${cfg.email}</a>, y retiraremos el material en un plazo razonable.</p>
  <h2>8. Conservación y seguridad</h2>
  <p>Conservamos tus datos el tiempo necesario para las finalidades indicadas, o el que exija la ley aplicable, y aplicamos medidas de seguridad razonables para protegerlos de accesos no autorizados, pérdida o uso indebido.</p>
  <h2>9. Tus derechos</h2>
  <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO), así como el de revocar tu consentimiento, escribiendo a <a href="mailto:${cfg.email}">${cfg.email}</a>, conforme a la Ley N.° 29733 de Protección de Datos Personales y su reglamento.</p>
  <h2>10. Cambios a esta política</h2>
  <p>Podemos actualizar esta política cuando cambien nuestras prácticas o la normativa aplicable. Publicaremos la versión vigente en esta misma página con su fecha de actualización.</p>
</div></section>`,
});

/* ======================== TÉRMINOS Y CONDICIONES ======================== */
add({
  path: '/terminos-y-condiciones/',
  title: 'Términos y Condiciones | Aliv Telecom',
  description: 'Términos y condiciones de uso del sitio web de Aliv Telecom y de la contratación de nuestros planes de internet de fibra óptica.',
  crumbs: [{ name: 'Términos y condiciones', path: '/terminos-y-condiciones/' }],
  body: `
${pageHero({ crumbs: [{ name: 'Términos y condiciones', path: '/terminos-y-condiciones/' }], h1: 'Términos y condiciones', lead: 'Última actualización: ' + new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }) + '.' })}
<section class="section tight"><div class="container narrow legal">
  <h2>1. Aceptación de los términos</h2>
  <p>Al navegar o usar este sitio, o al enviar cualquiera de sus formularios, aceptas estos Términos y Condiciones y nuestra <a href="/privacidad/">Política de Privacidad y Cookies</a>. Si no estás de acuerdo, te pedimos no utilizar el sitio.</p>
  <h2>2. Quiénes somos</h2>
  <p>${cfg.legalName} es una empresa peruana que distribuye y comercializa el servicio de internet de fibra óptica de WIN en el Perú. Este sitio tiene fines informativos y de generación de solicitudes de contratación; no constituye por sí mismo un contrato de servicio.</p>
  <h2>3. Naturaleza de las solicitudes</h2>
  <p>Completar el formulario de "Contratar servicio" o "Consulta tu cobertura" es una solicitud, no una contratación confirmada. El servicio queda sujeto a la validación de cobertura y factibilidad técnica, y a la evaluación crediticia cuando corresponda. Un asesor te confirmará las condiciones exactas antes de la instalación.</p>
  <h2>4. Precios y promociones</h2>
  <p>Los precios publicados incluyen IGV y están sujetos a cambio sin previo aviso; el precio vigente al momento de tu solicitud es el que se te confirmará. Las promociones (como el descuento del primer mes) tienen las condiciones, vigencia y restricciones indicadas junto a cada oferta y en la sección de condiciones de <a href="/planes/#condiciones">Planes</a>.</p>
  <h2>5. Trabaja con nosotros</h2>
  <p>Postular como asesor independiente o socio estratégico tampoco implica una contratación automática. Las condiciones de comisión, los beneficios de planilla del socio estratégico y los requisitos de ingreso se confirman con el área comercial o de recursos humanos durante el proceso de selección.</p>
  <h2>6. Uso permitido del sitio</h2>
  <p>Te comprometes a usar este sitio de forma lícita y a no enviar información falsa, suplantar a otra persona, ni intentar vulnerar su seguridad. Nos reservamos el derecho de rechazar o cancelar solicitudes que incumplan esto.</p>
  <h2>7. Propiedad intelectual</h2>
  <p>Los textos, marcas, logotipos e imágenes de este sitio pertenecen a ${cfg.legalName} o se usan bajo autorización (incluida la marca WIN). No pueden reproducirse ni usarse comercialmente sin nuestro consentimiento previo por escrito.</p>
  <h2>8. Enlaces y servicios de terceros</h2>
  <p>Este sitio puede usar servicios de terceros (como WhatsApp, Google Analytics o Google Ads) para operar y medir su funcionamiento; su uso también está sujeto a los términos propios de cada proveedor.</p>
  <h2>9. Limitación de responsabilidad</h2>
  <p>Hacemos nuestro mejor esfuerzo para que la información del sitio sea exacta, pero no garantizamos que esté siempre libre de errores o interrupciones. La disponibilidad del servicio de internet depende de la cobertura y factibilidad técnica real de tu dirección.</p>
  <h2>10. Modificaciones</h2>
  <p>Podemos actualizar estos Términos y Condiciones en cualquier momento; la versión vigente es la publicada en esta página con su fecha de actualización.</p>
  <h2>11. Ley aplicable y contacto</h2>
  <p>Estos términos se rigen por las leyes de la República del Perú. Para cualquier consulta, escríbenos a <a href="mailto:${cfg.email}">${cfg.email}</a>.</p>
</div></section>`,
});

/* ============================== 404 ============================== */
add({
  path: '/404.html',
  title: 'Página no encontrada | Aliv Telecom',
  description: 'La página que buscas no existe. Vuelve al inicio o contrata tu internet de fibra óptica.',
  noindex: true,
  crumbs: [{ name: 'Página no encontrada', path: '/404.html' }],
  body: `
<section class="section thanks-section">
  <div class="container narrow text-center">
    <p class="big-404">404</p>
    <h1 class="page-title">No encontramos esa página</h1>
    <p class="page-lead">Puede que el enlace haya cambiado. Te dejamos algunos caminos útiles.</p>
    <div class="cta-buttons">
      <a class="btn btn-primary btn-lg" href="/">Ir al inicio</a>
      <a class="btn btn-secondary btn-lg" href="/planes/">Ver planes</a>
      <a class="btn btn-secondary btn-lg" href="/contratar/">Contratar servicio</a>
    </div>
  </div>
</section>`,
});

export default pages;
