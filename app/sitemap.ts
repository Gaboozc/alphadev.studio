import type { MetadataRoute } from 'next'

// Sitemap generado, no un XML a mano.
//
// El anterior vivía en public/sitemap.xml con `lastmod` escrito a dedo, y
// llevaba cuatro meses congelado. Esto se regenera en cada despliegue.
//
// Solo van las páginas que queremos en resultados de búsqueda. Fuera quedan
// /academia y /acceso (privadas) y /tarjeta/* (tarjetas personales, marcadas
// noindex en su propio metadata): un sitemap que anuncia lo que luego pides no
// indexar es una contradicción que Search Console reporta como error.

const BASE = 'https://alphadev.studio'

type Pagina = { ruta: string; prioridad: number; frecuencia: MetadataRoute.Sitemap[number]['changeFrequency'] }

const PAGINAS: Pagina[] = [
  { ruta: '', prioridad: 1.0, frecuencia: 'weekly' },
  { ruta: '/servicios', prioridad: 0.9, frecuencia: 'monthly' },
  { ruta: '/portafolio', prioridad: 0.8, frecuencia: 'monthly' },
  { ruta: '/proceso', prioridad: 0.8, frecuencia: 'monthly' },
  { ruta: '/contacto', prioridad: 0.7, frecuencia: 'monthly' },
  { ruta: '/privacy/leer-con-monstruos', prioridad: 0.2, frecuencia: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // La fecha del despliegue. Es honesta —el contenido se publica al desplegar—
  // y evita el `lastmod` fijo que un rastreador aprende a ignorar.
  const lastModified = new Date()

  return PAGINAS.map(({ ruta, prioridad, frecuencia }) => ({
    url: `${BASE}${ruta}`,
    lastModified,
    changeFrequency: frecuencia,
    priority: prioridad,
  }))
}
