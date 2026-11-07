import type { MetadataRoute } from 'next'
import { DISALLOW_ROBOTS } from '@/lib/seo/privadas'
import { SITE_URL } from '@/lib/site-config'

// robots.txt generado. El de public/ apuntaba el sitemap al apex
// (alphadev.studio) mientras el resto del sitio canónico usa www, y
// bloqueaba /_next/ (CSS/JS que el rastreador necesita para renderizar).
// Disallow de admin/auth/academia NO sustituye las guardas de sesión.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOW_ROBOTS],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
