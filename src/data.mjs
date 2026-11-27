// Datos de contenido: planes, distritos, preguntas frecuentes, valores.

// Planes y precios: fuente oficial https://win.pe/ (Lima Metropolitana y Callao).
// Promo: 50% de descuento el 1er mes; luego precio regular. ACTUALIZAR al cambiar la campaña.
export const promo = {
  until: '2026-11-30',
  untilText: '30/11/2026',
  note: 'Promoción: 50% de descuento en el primer mes; luego se cobra el precio regular del plan. Válida hasta el 30/11/2026 o hasta agotar stock, solo para Lima Metropolitana y Callao, altas nuevas, sujeta a evaluación crediticia, cobertura y factibilidad técnica. Precios en soles con IGV. Se garantiza el 70% de la velocidad contratada. Mesh en comodato sujeto a evaluación crediticia.',
};

const net = (speed, promoP, reg, mesh) => ({
  id: `internet-${speed}`, speed, promo: promoP, regular: reg, name: 'Solo Internet',
  for: 'Solo internet de fibra óptica',
  features: ['Fibra óptica 100%', '50% de descuento el primer mes', 'Garantía del 70% de la velocidad contratada', ...(mesh ? [`Mesh en comodato: hasta ${mesh} (a solicitud)`] : [])],
});
const l1 = (speed, promoP, reg, mesh) => ({
  id: `l1max-${speed}`, speed, promo: promoP, regular: reg, name: 'Internet + WINTV L1MAX Premium',
  for: 'Internet con TV y fútbol local',
  features: ['Más de 90 canales en vivo', 'L1MAX con fútbol local', 'WINTV en hasta 4 dispositivos y L1MAX en 2', '50% de descuento el primer mes', ...(mesh ? [`Mesh en comodato: hasta ${mesh}`] : [])],
});
const dgo = (id, speed, promoP, reg, mesh, name, feats) => ({
  id, speed, promo: promoP, regular: reg, name, for: 'Internet con DGO, L1Max y Amazon Prime',
  features: [...feats, 'Incluye L1Max y Amazon Prime', '50% de descuento el primer mes', `Mesh en comodato: hasta ${mesh}`],
});

export const plans = {
  internet: {
    label: 'Solo Internet', tabLabel: 'Solo Internet', icon: 'wifi',
    items: [net(750, 54.5, 109), net(850, 59.5, 119), { ...net(1000, 69.5, 139, 2), popular: true }],
  },
  l1max: {
    label: 'Internet + WINTV L1MAX', tabLabel: 'Con WINTV L1MAX', icon: 'tv',
    items: [l1(750, 59.95, 119.9), l1(850, 64.95, 129.9, 1), l1(1000, 74.95, 149.9, 2)],
  },
  dgo: {
    label: 'Internet + DGO', tabLabel: 'Con DGO', icon: 'monitor-play',
    items: [
      dgo('dgo-hogar-850', 850, 69.95, 139.9, 1, 'Internet + DGO Hogar', ['Más de 30 canales y DSports', 'DGO en hasta 2 dispositivos']),
      dgo('dgo-hogar-1000', 1000, 79.95, 159.9, 2, 'Internet + DGO Hogar', ['Más de 30 canales y DSports', 'DGO en hasta 2 dispositivos']),
      dgo('dgo-full-1000', 1000, 89.95, 179.9, 2, 'Internet + DGO Full', ['Más de 100 canales, DSports y ESPN', 'DGO en hasta 4 dispositivos']),
    ],
  },
};

export const allPlans = Object.entries(plans).flatMap(([cat, g]) => g.items.map(p => ({ ...p, cat })));
export const minPromo = Math.min(...allPlans.map(p => p.promo));
export const fmt = n => (Number.isInteger(n) ? String(n) : n.toFixed(2));

// Servicios adicionales como línea aparte del plan de internet (igual que el catálogo de
// Sistema Aliv: Paquete = internet base, Servicio Adicional = TV/DGO con su propio precio).
// Delta fijo verificado contra los planes combo de arriba: es el mismo sin importar la
// velocidad base (ej. DGO Hogar siempre suma 20.9, sea sobre el plan de 850 o de 1000).
export const addons = {
  '': { id: '', name: 'Sin servicio adicional', promo: 0, regular: 0 },
  l1max: { id: 'l1max', name: 'WINTV L1MAX Premium', promo: 5.45, regular: 10.9 },
  'dgo-hogar': { id: 'dgo-hogar', name: 'DGO Hogar', promo: 10.45, regular: 20.9 },
  'dgo-full': { id: 'dgo-full', name: 'DGO Full', promo: 20.45, regular: 40.9 },
};

// Resuelve un id de plan "combo" (los que usan las tarjetas de precio y la tabla comparativa,
// ej. 'dgo-full-1000') al par { baseId, addon } que usa el formulario de contratación, donde
// el internet base y el servicio adicional se eligen por separado.
export function resolveBundle(id) {
  if (!id || id === 'edificio-cotizar') return { baseId: 'edificio-cotizar', addon: '' };
  const p = allPlans.find(x => x.id === id);
  if (!p) return { baseId: '', addon: '' };
  if (p.cat === 'internet') return { baseId: p.id, addon: '' };
  if (p.cat === 'l1max') return { baseId: `internet-${p.speed}`, addon: 'l1max' };
  return { baseId: `internet-${p.speed}`, addon: p.id.includes('hogar') ? 'dgo-hogar' : 'dgo-full' };
}

export const districts = [
  { slug: 'miraflores', name: 'Miraflores', kind: 'edificios',
    intro: 'Miraflores concentra muchos edificios residenciales y oficinas donde una conexión estable no es negociable. Aliv lleva fibra óptica simétrica con instalación ordenada y coordinada con la administración.' },
  { slug: 'san-isidro', name: 'San Isidro', kind: 'edificios',
    intro: 'En San Isidro, entre edificios de departamentos y trabajo remoto, la subida y la latencia importan tanto como la bajada. Con fibra simétrica de Aliv tus videollamadas y nubes de trabajo van fluidas.' },
  { slug: 'santiago-de-surco', name: 'Santiago de Surco', kind: 'mixto',
    intro: 'Surco combina casas, condominios y edificios. Contrata Win Hogar para tu casa o conecta todo tu condominio con una troncal de fibra dedicada.' },
  { slug: 'san-borja', name: 'San Borja', kind: 'mixto',
    intro: 'Para familias y profesionales de San Borja: fibra óptica simétrica, sin límite de consumo y con soporte técnico 24/7 para que nada interrumpa tu día.' },
  { slug: 'la-molina', name: 'La Molina', kind: 'hogar',
    intro: 'En La Molina, con casas y condominios donde varias personas se conectan a la vez, la fibra simétrica de Aliv mantiene estudio, trabajo y entretenimiento sin cortes.' },
  { slug: 'jesus-maria', name: 'Jesús María', kind: 'edificios',
    intro: 'Jesús María tiene alta densidad de departamentos. Instalamos fibra canalizada en edificios completos para que cada vecino tenga internet simétrico y estable.' },
  { slug: 'magdalena-del-mar', name: 'Magdalena del Mar', kind: 'mixto',
    intro: 'Internet de fibra óptica para casas y edificios de Magdalena del Mar, con instalación en 24 a 48 horas hábiles una vez confirmada la cobertura.' },
];

export const faqs = [
  { q: '¿Qué es el internet simétrico de fibra óptica?',
    a: 'Significa que tienes la misma velocidad para descargar que para subir. Muchos operadores con cable coaxial ofrecen, por ejemplo, 100 Mbps de bajada pero solo 10 Mbps de subida. Con fibra simétrica, si contratas 500 Mbps, tienes 500 Mbps en ambos sentidos: videollamadas, nube y streaming sin cuellos de botella.' },
  { q: '¿Cuánto tarda la instalación del servicio?',
    a: 'Una vez confirmada la cobertura y aprobada tu solicitud, el tiempo promedio de instalación es de 24 a 48 horas hábiles, según la disponibilidad de la agenda técnica.' },
  { q: '¿La instalación tiene costo?',
    a: 'Nuestros planes incluyen instalación de fibra óptica sin costo adicional, sujeta a evaluación de cobertura. Tu asesor te confirma las condiciones exactas antes de firmar.' },
  { q: '¿Tienen límite de consumo de datos?',
    a: 'No. Todos nuestros planes son ilimitados: descarga, juega, haz streaming y sube contenido pesado sin límites ni cobros sorpresa a fin de mes.' },
  { q: '¿Cómo es la instalación en edificios o condominios?',
    a: 'Instalamos una troncal de fibra canalizada que conecta cada departamento de forma ordenada y sin cables expuestos. Coordinamos previamente con la administración para cumplir las normas de seguridad y arquitectura del edificio.' },
  { q: '¿Cómo puedo saber si tienen cobertura en mi zona?',
    a: 'Completa el formulario de contratación con tu distrito y dirección. Un asesor valida la factibilidad técnica y te responde por WhatsApp. Si aún no llegamos, te registramos con prioridad para avisarte cuando haya cobertura.' },
  { q: '¿Qué soporte técnico ofrecen?',
    a: 'Soporte técnico especializado 24/7 por teléfono y WhatsApp, con atención prioritaria en los planes superiores.' },
];

export const faqsWork = [
  { q: '¿Cómo me pagan si trabajo con Aliv?',
    a: 'Como asesor independiente, se paga por comisión por cada alta instalada y activa. La liquidación es mensual y la comisión se consolida cuando el cliente paga sus primeras facturas. Los montos y la escala por volumen se confirman con el área comercial al postular.' },
  { q: '¿Necesito experiencia en ventas?',
    a: 'No es indispensable. Te capacitamos en el producto, el proceso de alta y cómo atender objeciones, y te damos material de venta.' },
  { q: '¿Cuál es la diferencia entre asesor independiente y socio estratégico?',
    a: 'El asesor independiente vende por su cuenta y cobra por comisión. El socio estratégico arma y lidera un equipo de ventas, entra en planilla de Aliv desde el día 1 y recibe comisión por las altas de toda su red, con condiciones preferenciales.' },
  { q: '¿Qué beneficios de planilla tiene el socio estratégico?',
    a: 'Desde el primer día: salario básico de acuerdo a ley, gratificación y CTS, aporte a AFP u ONP, seguro EsSalud, vacaciones pagadas y asignación familiar. A eso se suma un bono variable según el cumplimiento de meta de tu equipo. Son condiciones generales; el detalle exacto queda establecido en tu contrato.' },
  { q: '¿Tengo horario o sueldo fijo?',
    a: 'Como asesor independiente trabajas con horario libre y tus ingresos dependen solo de tus resultados. Como socio estratégico tienes salario básico fijo en planilla más un bono variable según la meta de tu equipo.' },
];

export const values = [
  { icon: 'handshake', title: 'Compromiso', text: 'Cumplimos lo que prometemos: plazos de instalación, velocidad y soporte.' },
  { icon: 'eye', title: 'Transparencia', text: 'Precios claros y contratos explicados sin letra chica, para clientes y aliados.' },
  { icon: 'rocket', title: 'Innovación', text: 'Invertimos en tecnología FTTH para ofrecer siempre la mejor experiencia.' },
  { icon: 'heart-handshake', title: 'Cercanía', text: 'Atención humana y directa. Detrás de cada conexión hay una persona.' },
  { icon: 'trending-up', title: 'Crecimiento compartido', text: 'Crecemos junto a nuestros asesores y socios estratégicos con comisiones justas.' },
];

export const benefits = [
  { icon: 'arrow-up-down', color: 'orange', title: '100% simetría real', text: 'Sube archivos, haz videollamadas en 4K y transmite en vivo con la misma velocidad con la que descargas.' },
  { icon: 'shield-check', color: 'yellow', title: 'Estabilidad sin caídas', text: 'La fibra FTTH es inmune al ruido electromagnético y al clima. Tu conexión siempre firme.' },
  { icon: 'gamepad-2', color: 'green', title: 'Ultra baja latencia', text: 'Rutas optimizadas a servidores de juegos, streaming y nube. Juega y trabaja sin lag.' },
  { icon: 'infinity', color: 'orange', title: 'Sin límites de consumo', text: 'Navega y descarga todo lo que quieras. No reducimos tu velocidad por gigas consumidos.' },
];
