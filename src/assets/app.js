/**
 * Aliv Telecom - JavaScript del sitio (vanilla, sin dependencias)
 * Secciones: tracking · modo claro/oscuro · menús · tabs · reveal · partículas · simulador · formularios · gracias · consentimiento
 */
(function () {
  'use strict';
  const CFG = window.ALIV || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     1. TRACKING (Google Analytics 4 + Google Ads)
     ====================================================================== */
  function track(event, params) {
    params = params || {};
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
    else window.dataLayer.push({ event, ...params });
  }

  function adsConversion(labelKey, extra) {
    if (!CFG.ads || !CFG.labels || !CFG.labels[labelKey] || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', Object.assign({ send_to: `${CFG.ads}/${CFG.labels[labelKey]}` }, extra || {}));
  }

  // Clics declarativos: <a data-track="evento" data-track-location="..." data-track-item="..." data-track-price="...">
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    const ev = el.dataset.track;
    const p = { location: el.dataset.trackLocation || 'unknown' };
    if (ev === 'select_item') {
      p.items = [{ item_id: el.dataset.trackItem, item_name: el.dataset.trackItem, price: Number(el.dataset.trackPrice) || undefined, currency: 'PEN' }];
    }
    track(ev, p);
    if (ev === 'whatsapp_click') adsConversion('whatsapp');
    if (ev === 'click_to_call') adsConversion('call');
  });

  // Atribución: guarda UTMs / gclid de la primera visita de la sesión
  try {
    const q = new URLSearchParams(location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'];
    if (keys.some(k => q.get(k)) && !sessionStorage.getItem('aliv_attr')) {
      const a = {}; keys.forEach(k => { if (q.get(k)) a[k] = q.get(k); });
      sessionStorage.setItem('aliv_attr', JSON.stringify(a));
    }
  } catch (e) { /* storage bloqueado */ }

  /* ======================================================================
     2. MODO CLARO / OSCURO
     ====================================================================== */
  (function theme() {
    const btn = $('#theme-toggle'); if (!btn) return;
    const root = document.documentElement;
    const meta = $('meta[name="theme-color"]');
    const COLORS = { dark: '#07070A', light: '#FDFCFA' };
    function apply(mode) {
      if (mode === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed', String(mode === 'light'));
      btn.setAttribute('aria-label', mode === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
      if (meta) meta.setAttribute('content', COLORS[mode]);
    }
    apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('aliv_theme', next); } catch (e) { /* sin storage */ }
      track('theme_toggle', { mode: next });
    });
  })();

  /* ======================================================================
     3. HEADER, MEGA MENÚS Y DRAWER MÓVIL
     ====================================================================== */
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const menuItems = $$('.has-menu');
  function closeMenus(except) {
    menuItems.forEach(li => {
      if (li === except) return;
      li.classList.remove('open');
      li.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    });
  }
  menuItems.forEach(li => {
    const btn = li.querySelector('.menu-toggle');
    btn.addEventListener('click', () => {
      const open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      closeMenus(li);
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.has-menu')) closeMenus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenus(); closeDrawer(); } });

  const drawer = $('#drawer'), overlay = $('.drawer-overlay'), burger = $('.mobile-nav-toggle');
  function openDrawer() {
    drawer.classList.add('open'); overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add('open'));
    drawer.setAttribute('aria-hidden', 'false'); burger.setAttribute('aria-expanded', 'true'); document.body.classList.add('no-scroll');
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open'); overlay.classList.remove('open'); setTimeout(() => { overlay.hidden = true; }, 250);
    drawer.setAttribute('aria-hidden', 'true'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('no-scroll');
  }
  if (drawer) {
    burger.addEventListener('click', openDrawer);
    $('.drawer-close').addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    $$('a', drawer).forEach(a => a.addEventListener('click', closeDrawer));
  }

  /* ======================================================================
     4. TABS DE PLANES
     ====================================================================== */
  $$('[data-tabs]').forEach(root => {
    const tabs = $$('[role="tab"]', root), panels = $$('[role="tabpanel"]', root);
    function select(tab) {
      tabs.forEach(t => { const on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
      panels.forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
      $$('.reveal', root).forEach(r => r.classList.add('in'));
    }
    tabs.forEach(t => t.addEventListener('click', () => select(t)));
    select(tabs[0]);
  });

  /* ======================================================================
     5. REVEAL AL HACER SCROLL + CONTADORES
     ====================================================================== */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  const counters = $$('[data-count]');
  function runCounter(el) {
    const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || '0', 10), suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 1400;
    (function frame(t) {
      const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (end * eased).toFixed(dec) + suf;
      if (k < 1) requestAnimationFrame(frame);
    })(t0);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  }

  /* ======================================================================
     6. FONDO DE PARTÍCULAS (solo escritorio, respeta reduce-motion)
     ====================================================================== */
  (function fibers() {
    const canvas = $('#fiber-canvas');
    if (!canvas || reduceMotion || window.innerWidth < 1024) { if (canvas) canvas.remove(); return; }
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight, running = true;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const colors = isLight
      ? ['rgba(216,79,14,.4)', 'rgba(185,121,10,.35)', 'rgba(23,22,27,.12)']
      : ['rgba(230,95,27,.45)', 'rgba(247,163,0,.4)', 'rgba(255,255,255,.15)'];
    const mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });
    const P = Array.from({ length: 45 }, () => ({
      x: Math.random() * w, y: Math.random() * h, s: Math.random() * 2 + 1, vx: Math.random() * 1.2 + 0.4,
      vy: (Math.random() - 0.5) * 0.3, c: colors[Math.floor(Math.random() * colors.length)], f: Math.random() * 0.005 + 0.002, ph: Math.random() * 6.28,
    }));
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        a.x += a.vx; a.y += a.vy + Math.sin(a.x * a.f + a.ph) * 0.08;
        if (mouse.x !== null) { const dx = mouse.x - a.x, dy = mouse.y - a.y, d = Math.hypot(dx, dy); if (d < 150) a.y -= dy * ((150 - d) / 150) * 0.05; }
        if (a.x > w + 10 || a.y < -10 || a.y > h + 10) { a.x = -10; a.y = Math.random() * h; }
        for (let j = i + 1; j < P.length; j++) {
          const b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) { ctx.strokeStyle = `rgba(230,95,27,${0.08 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(a.x, a.y, a.s, 0, 6.283); ctx.fillStyle = a.c; ctx.fill();
      }
      requestAnimationFrame(loop);
    }
    loop();
  })();

  /* ======================================================================
     7. SIMULADOR DE VELOCIDAD
     ====================================================================== */
  (function speedSim() {
    const run = $('#btn-run-sim'); if (!run) return;
    const bHfc = $('#btn-select-hfc'), bAliv = $('#btn-select-aliv'), gauge = $('#gauge-progress');
    const spd = $('#gauge-speed-val'), dl = $('#widget-download'), ul = $('#widget-upload'), ping = $('#widget-ping'), msg = $('#sim-message');
    const C = 534; let tech = 'aliv', busy = false;
    const setMsg = (html) => { msg.innerHTML = html; };
    const setGauge = (pct) => { gauge.style.strokeDashoffset = C - C * 0.75 * (pct / 100); };
    function reset() { setGauge(0); spd.textContent = '0'; dl.textContent = '0.0'; ul.textContent = '0.0'; ping.textContent = '--'; ping.className = 'w-value'; }
    reset();
    bHfc.addEventListener('click', () => { if (busy) return; tech = 'hfc'; bHfc.classList.add('active'); bAliv.classList.remove('active'); reset(); setMsg('Seleccionaste <strong>Cobre / Coaxial HFC</strong>: red compartida con velocidades asimétricas.'); });
    bAliv.addEventListener('click', () => { if (busy) return; tech = 'aliv'; bAliv.classList.add('active'); bHfc.classList.remove('active'); reset(); setMsg('Seleccionaste <strong>Fibra Óptica Aliv (FTTH)</strong>: fibra dedicada con velocidades simétricas.'); });

    function ramp(target, onTick, done) {
      let i = 0;
      const id = setInterval(() => {
        i++; const v = Math.min((target / 20) * i + (Math.random() - 0.5) * target * 0.05, target);
        onTick(i >= 20 ? target : Math.max(v, 0));
        if (i >= 20) { clearInterval(id); done(); }
      }, 90);
    }
    run.addEventListener('click', () => {
      if (busy) return; busy = true; run.disabled = bHfc.disabled = bAliv.disabled = true; run.textContent = 'Ejecutando test…';
      reset();
      const T = tech === 'aliv' ? { ping: 2, dl: 952.4, ul: 948.8 } : { ping: 26, dl: 112.5, ul: 12.1 };
      setMsg(tech === 'aliv' ? 'Estableciendo conexión de fibra dedicada…' : 'Conectando al nodo coaxial compartido del vecindario…');
      let n = 0;
      const pi = setInterval(() => {
        ping.textContent = Math.floor(Math.random() * 10) + (tech === 'aliv' ? 1 : 22);
        if (++n >= 10) { clearInterval(pi); ping.textContent = T.ping; ping.classList.add(tech === 'aliv' ? 'text-green' : 'text-yellow'); download(); }
      }, 110);
      function download() {
        setMsg('Midiendo <strong>descarga</strong>…');
        ramp(T.dl, v => { spd.textContent = Math.round(v); dl.textContent = v.toFixed(1); setGauge(v / 10); }, () => setTimeout(upload, 500));
      }
      function upload() {
        setMsg('Midiendo <strong>subida</strong>…');
        ramp(T.ul, v => { spd.textContent = Math.round(v); ul.textContent = v.toFixed(1); setGauge(v / 10); }, finish);
      }
      function finish() {
        busy = false; run.disabled = bHfc.disabled = bAliv.disabled = false; run.textContent = 'Volver a probar';
        setMsg(tech === 'aliv'
          ? `Latencia de <strong class="text-green">${T.ping} ms</strong> y velocidad simétrica de <strong class="text-orange">${Math.round(T.dl)} Mbps</strong>. Ideal para streaming 4K, descargas instantáneas y gaming.`
          : `Descarga de ${Math.round(T.dl)} Mbps pero subida de apenas <strong class="text-orange">${Math.round(T.ul)} Mbps</strong> y latencia de ${T.ping} ms. Sufrirá cuando varios hagan videollamadas.`);
        track('speed_sim_complete', { technology: tech });
      }
    });
  })();

  /* ======================================================================
     8. FORMULARIOS (contratar / postular) → /gracias/
     ====================================================================== */
  const waLink = (text) => `https://wa.me/${CFG.wa}?text=${encodeURIComponent(text)}`;
  const attribution = () => { try { return JSON.parse(sessionStorage.getItem('aliv_attr') || '{}'); } catch (e) { return {}; } };
  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

  function goThanks(pending) {
    try { sessionStorage.setItem('aliv_pending', JSON.stringify(pending)); } catch (e) { /* sin storage */ }
    location.href = '/gracias/';
  }

  const contract = $('#contract-form');
  if (contract) {
    const planSel = $('#ct-plan', contract);
    const addonSel = $('#ct-addon', contract);
    const addonGroup = $('#ct-addon-group', contract);
    const totalEl = $('#ct-total', contract);

    // Deep link desde una tarjeta de precio (?plan=dgo-full-1000): esas tarjetas siguen mostrando
    // el plan "combo" de siempre, así que se resuelve al par Plan + Servicio Adicional de este
    // formulario usando el mapa que build.mjs ya horneó en la página (ver blocks.mjs).
    try {
      const map = JSON.parse($('#bundle-resolve-map').textContent || '{}');
      const wanted = new URLSearchParams(location.search).get('plan');
      const resolved = wanted && map[wanted];
      if (resolved) {
        if ($$('option', planSel).some((o) => o.value === resolved.baseId)) planSel.value = resolved.baseId;
        if ($$('option', addonSel).some((o) => o.value === resolved.addon)) addonSel.value = resolved.addon;
      }
    } catch (e) { /* sin mapa: se queda con la selección por defecto */ }

    function actualizarTotal() {
      const esEdificio = planSel.value === 'edificio-cotizar';
      addonGroup.style.display = esEdificio ? 'none' : '';
      if (esEdificio) { totalEl.textContent = ''; return; }
      const po = planSel.options[planSel.selectedIndex];
      const ao = addonSel.options[addonSel.selectedIndex];
      const totalPromo = (Number(po.dataset.promo) || 0) + (Number(ao.dataset.promo) || 0);
      const totalRegular = (Number(po.dataset.regular) || 0) + (Number(ao.dataset.regular) || 0);
      totalEl.textContent = `Total: S/ ${fmt(totalPromo)} el 1er mes (luego S/ ${fmt(totalRegular)} al mes)`;
    }
    planSel.addEventListener('change', actualizarTotal);
    addonSel.addEventListener('change', actualizarTotal);
    actualizarTotal();

    let started = false;
    contract.addEventListener('focusin', () => { if (!started) { started = true; track('form_start', { form: 'contratacion', location: contract.dataset.location }); } });

    // Guarda la venta en SQL Server a través del puente (/server). Si falla, se sigue por WhatsApp.
    async function saveLead(d, hp) {
      if (!CFG.api) return false;
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 8000);
      try {
        const r = await fetch(CFG.api.replace(/\/$/, '') + '/api/lead', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
          body: JSON.stringify({ plan: d.plan, addon: d.addon, planText: d.planText, name: d.name, phone: d.phone, district: d.district, address: d.address, website: hp, page: location.pathname, attribution: attribution() }),
        });
        const j = await r.json().catch(() => ({}));
        return !!(r.ok && j.ok);
      } catch (e) { return false; } finally { clearTimeout(t); }
    }

    contract.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!contract.reportValidity()) return;
      const f = new FormData(contract);
      const btn = $('button[type="submit"]', contract);
      if (btn.disabled) return;
      const esEdificio = planSel.value === 'edificio-cotizar';
      const po = planSel.options[planSel.selectedIndex];
      const ao = addonSel.options[addonSel.selectedIndex];
      const addon = esEdificio ? '' : addonSel.value;
      const addonNombre = ao.textContent.split(' (')[0];
      const planText = esEdificio ? po.textContent : `${po.textContent.split(' — ')[0]}${addon ? ' + ' + addonNombre : ''}`;
      const cat = esEdificio ? 'Edificio/condominio' : (addon ? `Internet + ${addonNombre}` : 'Solo Internet');
      const price = esEdificio ? 0 : (Number(po.dataset.regular) || 0) + (Number(ao.dataset.regular) || 0);
      const d = { plan: planSel.value, addon, planText, cat, price,
        name: f.get('name').trim(), phone: f.get('phone').trim(), district: f.get('district'), address: f.get('address').trim() };
      const label = btn.innerHTML; btn.disabled = true; btn.textContent = 'Enviando…';
      const saved = await saveLead(d, f.get('website') || '');
      btn.disabled = false; btn.innerHTML = label;
      const first = d.name.split(' ')[0];
      const text = `Hola Aliv Telecom, quiero contratar el servicio.\nServicio: ${d.cat}\nPlan: ${d.planText}\nNombre: ${d.name}\nCelular: ${d.phone}\nDistrito: ${d.district}\nDirección: ${d.address}`;
      const zona = d.district === 'Otro' ? ' Si aún no llegamos a tu zona, te registraremos con prioridad.' : '';
      goThanks({
        kind: 'contratacion', saved,
        title: saved ? 'Listo, ' + first + ': registramos tu solicitud' : 'Casi listo, ' + first + ': falta enviar tu solicitud',
        msg: saved
          ? 'Un asesor te contactará para confirmar tu cobertura y agendar tu instalación.' + zona
          : 'Tu solicitud todavía no ha llegado a un asesor. Envíala por WhatsApp para que confirme tu cobertura y agende tu instalación.' + zona,
        summary: [['Servicio', d.cat], ['Plan', d.planText], ['Distrito', d.district], ['Dirección', d.address]],
        wa: text,
        analytics: { lead_type: 'contratacion', plan_id: d.plan + (d.addon ? '+' + d.addon : ''), district: d.district, value: d.price, currency: 'PEN', form_location: contract.dataset.location, ...attribution() },
      });
    });
  }

  const work = $('#work-form');
  if (work) {
    work.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!work.reportValidity()) return;
      const f = new FormData(work);
      const d = { name: f.get('name').trim(), phone: f.get('phone').trim(), city: f.get('city').trim(), type: f.get('type'), exp: f.get('exp') };
      const text = `Hola Aliv Telecom, quiero trabajar con ustedes.\nModalidad: ${d.type}\nNombre: ${d.name}\nCelular: ${d.phone}\nCiudad: ${d.city}\nExperiencia en ventas: ${d.exp}`;
      goThanks({
        kind: 'postulacion',
        title: 'Casi listo, ' + d.name.split(' ')[0] + ': falta enviar tu postulación',
        msg: 'Tu postulación todavía no ha llegado a nuestro equipo comercial. Envíala por WhatsApp para que te expliquen la comisión y los siguientes pasos.',
        summary: [['Modalidad', d.type], ['Ciudad', d.city], ['Experiencia', d.exp]],
        wa: text,
        analytics: { lead_type: 'postulacion', modalidad: d.type, ...attribution() },
      });
    });
  }

  /* ======================================================================
     9. PÁGINA DE GRACIAS  (la conversión (lead) se dispara al tocar el botón de WhatsApp, una sola vez)
     ====================================================================== */
  if (document.body.classList.contains('thanks') && $('#th-title')) {
    let pending = null;
    try { pending = JSON.parse(sessionStorage.getItem('aliv_pending') || 'null'); sessionStorage.removeItem('aliv_pending'); } catch (e) { /* noop */ }
    if (pending) {
      try { sessionStorage.setItem('aliv_last', JSON.stringify(pending)); } catch (e) { /* noop */ }
      // El formulario completo aún NO es un lead: se cuenta cuando toca "Enviar por WhatsApp".
      track('form_complete', { lead_type: pending.analytics.lead_type, form_location: pending.analytics.form_location, saved: !!pending.saved });
      // Si la venta ya quedó guardada en la base, el lead es real: se cuenta ahora.
      if (pending.saved) { track('generate_lead', pending.analytics); adsConversion('lead', { value: pending.analytics.value || undefined, currency: 'PEN' }); }
    } else {
      try { pending = JSON.parse(sessionStorage.getItem('aliv_last') || 'null'); } catch (e) { /* noop */ }
    }
    if (pending) {
      $('#th-title').textContent = pending.title;
      $('#th-msg').textContent = pending.msg;
      const box = $('#th-summary');
      box.innerHTML = '<dl>' + pending.summary.map(([k, v]) => `<div><dt></dt><dd></dd></div>`).join('') + '</dl>';
      $$('div', box).forEach((row, i) => { row.children[0].textContent = pending.summary[i][0]; row.children[1].textContent = pending.summary[i][1]; });
      box.hidden = false;
      const wa = $('#th-wa');
      wa.href = waLink(pending.wa);
      if (pending.saved) {
        // Solicitud ya registrada: WhatsApp pasa a ser opcional
        const steps = $$('#th-steps li');
        const okSvg = steps[0].querySelector('span').innerHTML;
        if (steps.length === 3) {
          steps[1].className = 'done'; steps[1].innerHTML = '<span>' + okSvg + '</span> Solicitud registrada';
          steps[2].className = 'now';
        }
        const ic = $('#th-icon'); ic.classList.remove('thanks-icon-pending'); ic.innerHTML = okSvg;
        const tel = document.querySelector('.topbar a[href^="tel:"]');
        $('#th-hint').innerHTML = 'Si quieres atención más rápida, también puedes escribirnos por WhatsApp' + (tel ? ' o llamar al <a class="text-link" href="' + tel.getAttribute('href') + '">' + tel.textContent.trim() + '</a>' : '') + '.';
        wa.lastChild.textContent = ' Escribir por WhatsApp (opcional)';
        wa.classList.remove('btn-wa'); wa.classList.remove('btn-primary'); wa.classList.add('btn-secondary');
        wa.addEventListener('click', () => track('whatsapp_click', { location: 'thanks' }));
      } else {
        let counted = false;
        wa.addEventListener('click', () => {
          if (counted) return; counted = true;
          track('generate_lead', pending.analytics);
          adsConversion('lead', { value: pending.analytics.value || undefined, currency: 'PEN' });
        });
      }
    }
  }

  /* ======================================================================
     10. CONSENTIMIENTO DE COOKIES (Google Consent Mode v2)
     ====================================================================== */
  const banner = $('#cookie-banner');
  if (banner && CFG.consent) {
    let saved = null; try { saved = localStorage.getItem('aliv_consent'); } catch (e) { /* noop */ }
    if (!saved) banner.hidden = false;
    $$('[data-consent]', banner).forEach(btn => btn.addEventListener('click', () => {
      const v = btn.dataset.consent;
      try { localStorage.setItem('aliv_consent', v); } catch (e) { /* noop */ }
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
      }
      banner.hidden = true;
    }));
  }
})();
