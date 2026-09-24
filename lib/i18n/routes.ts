// Rutas públicas del sitio y su metadata en los dos idiomas.
//
// Por qué existe este archivo:
//
// El idioma vivía solo en el cliente (localStorage + contexto de React). Eso
// dejaba tres agujeros que ningún parche de componente podía tapar, porque
// ocurren antes de que corra JavaScript:
//
//   1. El <title>, la descripción y la tarjeta de OpenGraph se resuelven en el
//      servidor. Salían siempre en español, incluso con la página en inglés.
//   2. No había URL que compartir en inglés. Mandar el sitio a un founder de
//      EE.UU. le abría el español, y Google solo podía indexar una versión.
//   3. El HTML que llega al navegador venía en español y se traducía al
//      hidratar: un parpadeo visible para quien lee en inglés.
//
// La solución es que la URL sea la fuente de verdad. El español se queda sin
// prefijo (no rompe enlaces ya publicados ni lo indexado) y el inglés vive bajo
// /en. Este módulo es el único sitio donde se declara esa correspondencia.
//
// Para agregar una página pública: una entrada aquí, un page.tsx en su ruta y
// otro bajo app/en/. Los títulos NO se duplican en el page.tsx.

import type { Metadata } from 'next';
import type { Lang } from './index';
import { SITE_URL } from '@/lib/site-config';

export const LOCALE_PREFIX = '/en';

/** Rutas públicas que existen en los dos idiomas. Las privadas no entran. */
export const PUBLIC_PATHS = [
  '/',
  '/servicios',
  '/portafolio',
  '/proceso',
  '/contacto',
  '/privacidad',
  '/terminos',
] as const;

export type PublicPath = (typeof PUBLIC_PATHS)[number];

export function esRutaPublica(path: string): path is PublicPath {
  return (PUBLIC_PATHS as readonly string[]).includes(path);
}

/**
 * La URL de `path` en `lang`. El español se devuelve tal cual; el inglés con
 * prefijo. La home en inglés es `/en`, no `/en/`.
 */
export function localizedPath(path: string, lang: Lang): string {
  if (lang === 'es') return path;
  return path === '/' ? LOCALE_PREFIX : `${LOCALE_PREFIX}${path}`;
}

/**
 * Parte un pathname en idioma y ruta sin prefijo. Es la operación inversa de
 * `localizedPath` y la usa el contexto de idioma para leer la URL.
 *
 * Una ruta que no existe en inglés (la Academia, por ejemplo) devuelve 'es':
 * no hay traducción que ofrecer.
 */
export function stripLocale(pathname: string): { lang: Lang; path: string } {
  if (pathname === LOCALE_PREFIX) return { lang: 'en', path: '/' };
  if (pathname.startsWith(`${LOCALE_PREFIX}/`)) {
    return { lang: 'en', path: pathname.slice(LOCALE_PREFIX.length) };
  }
  return { lang: 'es', path: pathname };
}

type PageMeta = { title: string; description: string };

/**
 * Título y descripción por página e idioma.
 *
 * El título de la home se escribe completo porque el template de
 * `app/layout.tsx` (`%s | AlphaDev Studios`) no se le aplica: es `title.default`.
 */
const PAGE_META: Record<PublicPath, Record<Lang, PageMeta>> = {
  '/': {
    es: {
      title: 'AlphaDev Studios | Te hacemos existir en internet',
      description:
        'Creamos tu presencia digital desde cero: sitio web, redes sociales y publicidad online. Para que tus clientes te encuentren, te elijan y vuelvan.',
    },
    en: {
      title: 'AlphaDev Studios | We put your business on the internet',
      description:
        'We build your digital presence from scratch: website, social media, and online advertising. So customers find you, pick you, and come back.',
    },
  },
  '/servicios': {
    es: {
      title: 'Servicios',
      description:
        'Sitio web profesional, manejo de redes sociales, publicidad online y presencia en Google. Todo lo que tu negocio necesita para existir en internet.',
    },
    en: {
      title: 'Services',
      description:
        'A professional website, social media management, online advertising, and a presence on Google. Everything your business needs to exist online.',
    },
  },
  '/portafolio': {
    es: {
      title: 'Resultados',
      description:
        'Los sitios de BFS Karate, Imperial Barbershop, Fenix Group y The Latin Grill, en línea. El trabajo real que hicimos para cada negocio.',
    },
    en: {
      title: 'Results',
      description:
        'The live sites of BFS Karate, Imperial Barbershop, Fenix Group, and The Latin Grill. The real work we did for each business.',
    },
  },
  '/proceso': {
    es: {
      title: 'Cómo trabajamos',
      description:
        'De invisible a imparable en 5 pasos simples: conversamos, diseñamos tu estrategia, construimos, lanzamos y medimos, y crecemos juntos.',
    },
    en: {
      title: 'How we work',
      description:
        'From invisible to unstoppable in 5 simple steps: we talk, we design your strategy, we build, we launch and measure, and we grow together.',
    },
  },
  '/contacto': {
    es: {
      title: 'Contacto',
      description:
        'Cuéntanos sobre tu proyecto. Sin compromiso, analizamos la mejor solución técnica para tu empresa.',
    },
    en: {
      title: 'Contact',
      description:
        'Tell us about your project. No strings attached — we work out the best technical solution for your business.',
    },
  },
  '/privacidad': {
    es: {
      title: 'Privacidad',
      description:
        'Qué datos recoge alphadev.studio, para qué se usan y cómo pedir que se borren. Sin analítica ni rastreo de terceros.',
    },
    en: {
      title: 'Privacy',
      description:
        'What data alphadev.studio collects, what it is used for, and how to ask for it to be deleted. No analytics, no third-party tracking.',
    },
  },
  '/terminos': {
    es: {
      title: 'Términos',
      description:
        'Condiciones de uso de alphadev.studio: qué es este sitio, qué son las plantillas que se muestran y qué se acuerda por separado.',
    },
    en: {
      title: 'Terms',
      description:
        'The terms for using alphadev.studio: what this site is, what the templates on it are, and what gets agreed separately.',
    },
  },
};

/**
 * La metadata completa de una página, incluido el `hreflang` recíproco.
 *
 * `languages` es lo que de verdad le dice a Google que /servicios y
 * /en/servicios son la misma página en dos idiomas; sin eso las trataría como
 * contenido duplicado. `x-default` apunta al español, que es el idioma del
 * dominio.
 */
export function metadataFor(path: PublicPath, lang: Lang): Metadata {
  const meta = PAGE_META[path][lang];
  const url = localizedPath(path, lang);

  return {
    // La home lleva el nombre de la marca dentro del propio título, así que se
    // marca `absolute` para que el template de layout.tsx no lo repita
    // ("… | AlphaDev Studios | AlphaDev Studios").
    title: path === '/' ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        es: localizedPath(path, 'es'),
        en: localizedPath(path, 'en'),
        'x-default': localizedPath(path, 'es'),
      },
    },
    openGraph: {
      url,
      title: meta.title,
      description: meta.description,
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

/** URL absoluta, para el sitemap. */
export function absoluteUrl(path: PublicPath, lang: Lang): string {
  const relativa = localizedPath(path, lang);
  return `${SITE_URL}${relativa === '/' ? '' : relativa}`;
}
