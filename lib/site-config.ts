// Fuente única de la información de marca y contacto que se repetía
// hardcodeada en layout.tsx, Footer, ContactoPageContent, global-error y la
// página de privacidad. Cambiar un número de teléfono significaba tocar 5
// archivos sin ninguna garantía de no olvidar alguno.
//
// app/tarjeta/cards.ts queda aparte a propósito: modela varias tarjetas
// digitales (no solo AlphaDev) con campos propios (whatsapp en formato E.164
// sin '+', vcard, qr) — pero reusa estas mismas constantes donde coinciden.

export const SITE_URL = 'https://www.alphadev.studio';

export const CONTACT_EMAIL = 'zavarsegabriel@gmail.com';

export const PHONE_US = {
  display: '+1 (407) 686-7561',
  e164: '+14076867561',
  href: 'tel:+14076867561',
};

export const PHONE_MX = {
  display: '+52 56 3711 3563',
  e164: '+525637113563',
  href: 'tel:+525637113563',
};

export const INSTAGRAM_HANDLE = 'alphadev.studio';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
