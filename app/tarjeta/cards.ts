// Datos de las tarjetas de presentación digitales (rutas /tarjeta/<slug>).
// Rutas "secretas": no linkeadas en el sitio y con noindex.

export type CardPhone = {
  label: string; // 'US' | 'MX' | 'Cel'
  display: string; // formato legible
  e164: string; // sin espacios, con + (para tel:)
};

export type CardData = {
  slug: string;
  name: string;
  role: { es: string; en: string };
  tagline: { es: string; en: string };
  email: string;
  phones: CardPhone[];
  whatsapp?: string; // e164 sin el + (para wa.me)
  instagram?: string; // handle sin @
  website?: string; // url completa
  initials: string;
  photo?: string; // /assets/tarjeta/<slug>.jpg — si está, reemplaza el monograma
  // Archivos estáticos generados (public/…)
  qr: string; // /assets/tarjeta/<slug>-qr.png
  vcard: string; // /tarjeta/<slug>.vcf
};

export const CARDS: Record<string, CardData> = {
  'gabriel-zavarse': {
    slug: 'gabriel-zavarse',
    name: 'Gabriel Zavarse',
    role: { es: 'Founder', en: 'Founder' },
    tagline: {
      es: 'Construimos tu presencia digital. Hablemos.',
      en: "We build your digital presence. Let's talk.",
    },
    email: 'zavarsegabriel@gmail.com',
    phones: [
      { label: 'US', display: '+1 (407) 686-7561', e164: '+14076867561' },
      { label: 'MX', display: '+52 56 3711 3563', e164: '+525637113563' },
    ],
    whatsapp: '14076867561',
    instagram: 'alphadev.studio',
    website: 'https://alphadev.studio',
    initials: 'GZ',
    photo: '/assets/tarjeta/gabriel-zavarse.jpg',
    qr: '/assets/tarjeta/gabriel-zavarse-qr.png',
    vcard: '/tarjeta/gabriel-zavarse.vcf',
  },
  'gabriel-muria': {
    slug: 'gabriel-muria',
    name: 'Gabriel Muria',
    role: { es: 'Co-fundador', en: 'Co-founder' },
    tagline: {
      es: 'Construimos tu presencia digital. Hablemos.',
      en: "We build your digital presence. Let's talk.",
    },
    // Números compartidos del estudio (MX + US). Email personal pendiente.
    email: '',
    phones: [
      { label: 'US', display: '+1 (407) 686-7561', e164: '+14076867561' },
      { label: 'MX', display: '+52 56 3711 3563', e164: '+525637113563' },
    ],
    whatsapp: '14076867561',
    instagram: 'alphadev.studio',
    website: 'https://alphadev.studio',
    initials: 'GM',
    qr: '/assets/tarjeta/gabriel-muria-qr.png',
    vcard: '/tarjeta/gabriel-muria.vcf',
  },
};
