import type { Lang } from '@/lib/i18n';

/**
 * Fuente única del trabajo de clientes.
 *
 * Antes esto vivía partido en dos sitios que se tenían que mantener en paralelo
 * por índice de array: `CASES`/`CASE_URLS`/`CASE_SLUGS` en CaseStudiesSection y
 * `PROJECT_SLUGS`/`PROJECT_URLS`/`PROJECT_TAGS` en PortafolioContent. Cualquier
 * cliente nuevo había que añadirlo en seis arrays distintos sin desalinear el orden.
 *
 * Las fotos se declaran explícitas. La versión anterior las descubría en runtime
 * cargando seis candidatos por cliente con `new Image()` y quedándose con los que
 * no daban 404 — dieciocho peticiones, nueve de ellas fallidas, más un parpadeo de
 * "Galería próximamente" antes de que respondieran.
 */

export type CaseStudy = {
  slug: string;
  /** Nombre de marca: no se traduce. */
  name: string;
  /** Sitio real del cliente, en producción. */
  url: string;
  /** Rutas bajo /public, en orden. La primera es la portada. */
  photos: string[];
  /** Textos que cambian con el idioma. */
  i18n: Record<Lang, {
    industry: string;
    /** Una línea, para tarjetas y carrusel. */
    result: string;
    /** Versión larga para /portafolio, donde hay espacio para contar. */
    detail: string;
    scope: string;
    tags: string[];
  }>;
};

/** Todas las capturas son capturas de escritorio a 1200×750. */
export const CASE_PHOTO_WIDTH = 1200;
export const CASE_PHOTO_HEIGHT = 750;

const photosOf = (slug: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/assets/cases/${slug}-${i + 1}.png`);

export const CASES: CaseStudy[] = [
  {
    slug: 'bfs-karate',
    name: 'BFS Karate',
    url: 'https://www.bfsmartialart.com/',
    photos: photosOf('bfs-karate', 3),
    i18n: {
      es: {
        industry: 'Cliente · Artes marciales',
        result: 'Presencia digital completa desde cero.',
        detail: 'Presencia digital completa desde cero: sitio web, manejo de redes y perfil de Google optimizado, para que aparezca cuando alguien busca dónde entrenar.',
        scope: 'Sitio + Redes + Google Business',
        tags: ['Sitio web', 'Redes', 'Google + SEO'],
      },
      en: {
        industry: 'Client · Martial arts',
        result: 'A complete digital presence from scratch.',
        detail: 'A complete digital presence from scratch: website, social media management and an optimized Google profile, so they show up when someone searches for a place to train.',
        scope: 'Site + Social + Google Business',
        tags: ['Website', 'Social', 'Google + SEO'],
      },
    },
  },
  {
    slug: 'imperial-barbershop',
    name: 'Imperial Barbershop',
    url: 'https://imperialbarbercoacalco.com/',
    photos: photosOf('imperial-barbershop', 3),
    i18n: {
      es: {
        industry: 'Cliente · Barbería',
        result: 'Visible cuando buscan dónde cortarse el pelo.',
        detail: 'Sitio web y perfil de Google optimizado para que aparezca cuando alguien busca dónde cortarse el pelo.',
        scope: 'Sitio + Google Business',
        tags: ['Sitio web', 'Google + SEO'],
      },
      en: {
        industry: 'Client · Barbershop',
        result: 'Visible when people search for a haircut.',
        detail: 'Website and optimized Google profile so they show up when someone searches for a place to get a haircut.',
        scope: 'Site + Google Business',
        tags: ['Website', 'Google + SEO'],
      },
    },
  },
  {
    slug: 'fenix-group',
    name: 'Fenix Group',
    url: 'https://fenixgroup.us/',
    // Una sola foto y explícita, no photosOf(): ese helper asume .png y tres
    // capturas. Hoy el sitio publica una landing de lanzamiento mientras se
    // construye el resto, así que hay una sola pantalla real que mostrar.
    photos: ['/assets/cases/fenix-group-1.webp'],
    i18n: {
      es: {
        industry: 'Cliente · Agencia de publicidad',
        result: 'Redes y campañas ya corriendo; el sitio completo, en desarrollo.',
        detail: 'Manejo de redes y campañas de publicidad ya en marcha. El sitio completo está en construcción: hoy publica una landing de lanzamiento.',
        scope: 'Sitio + Redes + Ads',
        tags: ['Sitio web', 'Redes', 'Ads', 'En desarrollo'],
      },
      en: {
        industry: 'Client · Advertising agency',
        result: 'Social and ad campaigns already running; full site in development.',
        detail: 'Social media management and ad campaigns already running. The full site is under construction: today it ships a launch landing page.',
        scope: 'Site + Social + Ads',
        tags: ['Website', 'Social', 'Ads', 'In development'],
      },
    },
  },
  {
    slug: 'the-latin-grill',
    name: 'The Latin Grill',
    url: 'https://www.thelatingrillfl.com/',
    photos: photosOf('the-latin-grill', 3),
    i18n: {
      es: {
        industry: 'Cliente · Restaurante',
        result: 'Sitio rediseñado por completo, de escritorio a celular.',
        detail: 'Rediseñamos su sitio por completo, de escritorio a celular —menú e información claros— para que se vea tan bueno como su comida.',
        scope: 'Rediseño web',
        tags: ['Rediseño web', 'Diseño'],
      },
      en: {
        industry: 'Client · Restaurant',
        result: 'Site fully redesigned, from desktop to mobile.',
        detail: 'We fully redesigned their site, from desktop to mobile —clear menu and information— so it looks as good as their food.',
        scope: 'Web redesign',
        tags: ['Web redesign', 'Design'],
      },
    },
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
