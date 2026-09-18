import type { Lang } from '@/lib/i18n';

/**
 * Plantillas de sitio por rubro — el "aquí puede ir tu marca".
 *
 * No son trabajo entregado: son ejemplos navegables de lo que el cliente
 * recibe. Viven separadas de `cases.ts` justo por eso — mezclarlas con los
 * clientes reales haría que la prueba social deje de serlo.
 *
 * Las capturas salen del proyecto real de cada plantilla (build + screenshot
 * a 1440x900 @2x, reescalado a 1200x750 WebP), no de un mockup: lo que se ve
 * es lo que se entrega. Cada plantilla deja los textos entre llaves dobles
 * ({{Tu Logo}}, {{+2,000}}) a propósito — son los huecos que se rellenan con
 * la marca del cliente, y refuerzan el mensaje en vez de contradecirlo.
 */

export type SiteTemplate = {
  /** Estable, no cambia con el idioma. */
  slug: string;
  /** Ruta explícita bajo /public. El hero, para la tarjeta de la galería. */
  image: string;
  /** La página entera, para el visor expandido. Alto variable por plantilla,
      así que viaja con sus medidas: next/image las necesita y sin ellas el
      visor salta al cargar. */
  full: { src: string; width: number; height: number };
  /** Cuando estén desplegadas, el link al demo navegable. */
  demoUrl?: string;
  i18n: Record<Lang, { industry: string; pitch: string }>;
};

/** Todas las capturas son de escritorio a 1200×750. */
export const TEMPLATE_IMAGE_WIDTH = 1200;
export const TEMPLATE_IMAGE_HEIGHT = 750;

export const TEMPLATES: SiteTemplate[] = [
  {
    slug: 'dental',
    image: '/assets/templates/dental.webp',
    full: { src: '/assets/templates/dental-full.webp', width: 1200, height: 4096 },
    i18n: {
      es: { industry: 'Clínica dental', pitch: 'Agenda de citas al frente y confianza clínica desde el primer scroll.' },
      en: { industry: 'Dental clinic', pitch: 'Appointment booking up front and clinical trust from the first scroll.' },
    },
  },
  {
    slug: 'barberia',
    image: '/assets/templates/barberia.webp',
    full: { src: '/assets/templates/barberia-full.webp', width: 1200, height: 4468 },
    i18n: {
      es: { industry: 'Barbería', pitch: 'Reserva directa y galería del trabajo, en oscuro elegante.' },
      en: { industry: 'Barbershop', pitch: 'Direct booking and a work gallery, in elegant dark.' },
    },
  },
  {
    slug: 'constructora',
    image: '/assets/templates/constructora.webp',
    full: { src: '/assets/templates/constructora-full.webp', width: 1200, height: 2704 },
    i18n: {
      es: { industry: 'Constructora', pitch: 'Obra terminada como protagonista y cotización en un clic.' },
      en: { industry: 'Construction', pitch: 'Finished work as the hero and a one-click quote request.' },
    },
  },
  {
    slug: 'cafeteria',
    image: '/assets/templates/cafeteria.webp',
    full: { src: '/assets/templates/cafeteria-full.webp', width: 1200, height: 4908 },
    i18n: {
      es: { industry: 'Cafetería y brunch', pitch: 'Menú, horarios y reserva de mesa sin hacer scroll de más.' },
      en: { industry: 'Coffee & brunch', pitch: 'Menu, hours and table booking without extra scrolling.' },
    },
  },
  {
    slug: 'optica',
    image: '/assets/templates/optica.webp',
    full: { src: '/assets/templates/optica-full.webp', width: 1200, height: 3676 },
    i18n: {
      es: { industry: 'Óptica y optometría', pitch: 'Examen de la vista y catálogo de armazones, claros y ordenados.' },
      en: { industry: 'Optical & optometry', pitch: 'Eye exams and frame catalog, clear and orderly.' },
    },
  },
  {
    slug: 'muebles',
    image: '/assets/templates/muebles.webp',
    full: { src: '/assets/templates/muebles-full.webp', width: 1200, height: 3940 },
    i18n: {
      es: { industry: 'Mueblería', pitch: 'Catálogo por ambiente y cotización de piezas a medida.' },
      en: { industry: 'Furniture store', pitch: 'Catalog by room and quotes for custom pieces.' },
    },
  },
  {
    slug: 'floreria',
    image: '/assets/templates/floreria.webp',
    full: { src: '/assets/templates/floreria-full.webp', width: 1200, height: 3250 },
    i18n: {
      es: { industry: 'Florería', pitch: 'Pedidos por WhatsApp y entrega el mismo día, al frente.' },
      en: { industry: 'Florist', pitch: 'WhatsApp orders and same-day delivery, front and center.' },
    },
  },
  {
    slug: 'acuario',
    image: '/assets/templates/acuario.webp',
    full: { src: '/assets/templates/acuario-full.webp', width: 1200, height: 5458 },
    i18n: {
      es: { industry: 'Acuarios y mascotas', pitch: 'Catálogo con carrito y asesoría, para tienda con inventario real.' },
      en: { industry: 'Aquarium & pet shop', pitch: 'Catalog with cart and advice, for a store with real inventory.' },
    },
  },
  {
    slug: 'modelo',
    image: '/assets/templates/modelo.webp',
    full: { src: '/assets/templates/modelo-full.webp', width: 1200, height: 3816 },
    i18n: {
      es: { industry: 'Portafolio personal', pitch: 'Para marca personal: galería de trabajo y contacto directo.' },
      en: { industry: 'Personal portfolio', pitch: 'For personal brands: work gallery and direct contact.' },
    },
  },
];

export function templateBySlug(slug: string): SiteTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
