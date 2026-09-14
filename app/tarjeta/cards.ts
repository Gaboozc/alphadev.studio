// Datos de las tarjetas de presentación digitales (rutas /tarjeta/<slug>).
// Rutas "secretas": no linkeadas en el sitio y con noindex.

import { SITE_URL, CONTACT_EMAIL, PHONE_US, PHONE_MX, INSTAGRAM_HANDLE } from '@/lib/site-config';

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
    email: CONTACT_EMAIL,
    phones: [
      { label: 'US', display: PHONE_US.display, e164: PHONE_US.e164 },
      { label: 'MX', display: PHONE_MX.display, e164: PHONE_MX.e164 },
    ],
    whatsapp: PHONE_US.e164.replace('+', ''),
    instagram: INSTAGRAM_HANDLE,
    website: SITE_URL,
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
      { label: 'US', display: PHONE_US.display, e164: PHONE_US.e164 },
      { label: 'MX', display: PHONE_MX.display, e164: PHONE_MX.e164 },
    ],
    whatsapp: PHONE_US.e164.replace('+', ''),
    instagram: INSTAGRAM_HANDLE,
    website: SITE_URL,
    initials: 'GM',
    photo: '/assets/tarjeta/gabriel-muria.jpg',
    qr: '/assets/tarjeta/gabriel-muria-qr.png',
    vcard: '/tarjeta/gabriel-muria.vcf',
  },
};
