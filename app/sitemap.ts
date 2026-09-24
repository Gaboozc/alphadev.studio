import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { PUBLIC_PATHS, absoluteUrl, type PublicPath } from '@/lib/i18n/routes'

// Sitemap generado, no un XML a mano.
//
// El anterior vivía en public/sitemap.xml con `lastmod` escrito a dedo, y
// llevaba cuatro meses congelado. Esto se regenera en cada despliegue.
//
// Cada ruta pública sale DOS VECES —una por idioma— con `alternates.languages`
// apuntando a la otra. Sin eso, Google trataría /servicios y /en/servicios
// como contenido duplicado en vez de como la misma página en dos idiomas.
//
// Fuera del array quedan /academia y /acceso (privadas) y /tarjeta/* (tarjetas
// personales, marcadas noindex en su propio metadata): un sitemap que anuncia
// lo que luego pides no indexar es una contradicción que Search Console
// reporta como error.

type Peso = { prioridad: number; frecuencia: MetadataRoute.Sitemap[number]['changeFrequency'] }

const PESO: Record<PublicPath, Peso> = {
  '/': { prioridad: 1.0, frecuencia: 'weekly' },
  '/servicios': { prioridad: 0.9, frecuencia: 'monthly' },
  '/portafolio': { prioridad: 0.8, frecuencia: 'monthly' },
  '/proceso': { prioridad: 0.8, frecuencia: 'monthly' },
  '/contacto': { prioridad: 0.7, frecuencia: 'monthly' },
  '/privacidad': { prioridad: 0.3, frecuencia: 'yearly' },
  '/terminos': { prioridad: 0.3, frecuencia: 'yearly' },
}

// No forma parte del refactor es/en: es la política de otro producto (Leer
// con Monstruos), solo en español.
const OTRAS: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/privacy/leer-con-monstruos`, priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // La fecha del despliegue. Es honesta —el contenido se publica al
  // desplegar— y evita el `lastmod` fijo que un rastreador aprende a ignorar.
  const lastModified = new Date()

  const paginas = PUBLIC_PATHS.flatMap((ruta): MetadataRoute.Sitemap => {
    const { prioridad, frecuencia } = PESO[ruta]
    const idiomas = { es: absoluteUrl(ruta, 'es'), en: absoluteUrl(ruta, 'en') }

    return (['es', 'en'] as const).map((lang) => ({
      url: idiomas[lang],
      lastModified,
      changeFrequency: frecuencia,
      // La versión en inglés no compite por el ranking en español: prioridad
      // ligeramente menor, nunca cero (cero se lee como "no indexar").
      // Redondeado a 1 decimal: 0.8 - 0.1 en punto flotante da
      // 0.7000000000000001, y ese ruido termina literal en el XML.
      priority: lang === 'es' ? prioridad : Math.round(Math.max(0.1, prioridad - 0.1) * 10) / 10,
      alternates: { languages: idiomas },
    }))
  })

  return [...paginas, ...OTRAS]
}
