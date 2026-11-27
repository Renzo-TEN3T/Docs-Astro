// ============================================================
//  CONFIGURACIÓN CENTRAL DEL SITIO  (edita solo este archivo)
//  Después de cambiar algo ejecuta:  npm run build
// ============================================================
export default {
  // Dominio final (sin "/" al final). Se usa en canonical, sitemap y datos estructurados.
  siteUrl: 'https://www.alivtelecom.pe',

  name: 'Aliv Telecom',
  legalName: 'Aliv Telecom',
  locale: 'es_PE',

  phoneDisplay: '954 043 491', // igual que en Google Business Profile
  phoneHref: '+51954043491',
  whatsapp: '51954043491', // WhatsApp de ventas (formato 51 + número). Confirmar que este número tenga WhatsApp.
  // Horario de atención (igual que en Google Business Profile)
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '09:00', closes: '22:00' },
    { days: ['Sunday'], opens: '09:00', closes: '20:00' },
  ],
  hoursText: ['Lun a sáb: 9 a. m. – 10 p. m.', 'Dom: 9 a. m. – 8 p. m.'],
  mapsUrl: 'https://maps.app.goo.gl/b3F48X7H13bFgZm69', // Perfil de Google Business Profile
  email: 'informes@alivtelecom.pe',

  address: {
    street: 'C. Burgos 178',
    district: 'San Isidro',
    city: 'Lima',
    region: 'Lima',
    postalCode: '15076',
    country: 'PE',
  },

  // Deja vacío ('') lo que no tengas; no se mostrará.
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
  },

  // ----------------------------------------------------------
  //  GOOGLE ANALYTICS 4 + GOOGLE ADS
  //  Mientras estén vacíos NO se carga ningún script de Google
  //  (el sitio igual registra eventos en dataLayer).
  // ----------------------------------------------------------
  analytics: {
    gaId: '',            // GA4:        G-XXXXXXXXXX
    adsId: '',           // Google Ads: AW-XXXXXXXXXX
    adsLabels: {         // Etiquetas de conversión de Google Ads (AW-XXXXXXXXXX/ETIQUETA)
      lead: '',          //   Solicitud de contratación / postulación (página /gracias/)
      whatsapp: '',      //   Clic en WhatsApp
      call: '',          //   Clic en llamar
    },
    gscVerification: '', // Código de verificación de Google Search Console (meta tag)
    consentBanner: true, // Banner de cookies (Consent Mode v2). Solo aparece si hay gaId o adsId.
  },

  // URL del puente que guarda las ventas web en SQL Server (carpeta /server).
  // Local: 'http://localhost:3000'. Al publicar, pon aqui la URL publica del puente. Vacio = no se guarda en BD (solo WhatsApp).
  leadsApi: 'http://localhost:3000',

  themeColor: '#07070A',
  ogImage: '/assets/og-image.png',
};
