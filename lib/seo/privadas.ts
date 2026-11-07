// Rutas que no deben indexarse ni anunciarse en el sitemap.
// robots.txt NO sustituye autenticación: admin/academia siguen detrás
// de sesión + layout. Esto solo evita que un rastreador gaste presupuesto
// o que Search Console las trate como públicas.

export const PREFIJOS_PRIVADOS = [
  '/admin',
  '/acceso',
  '/academia',
  '/tarjeta',
  '/api',
] as const

export const RUTAS_SENSIBLES = [
  '/recursos/gracias',
  '/en/recursos/gracias',
  '/recursos/descargar',
  '/en/recursos/descargar',
] as const

export const DISALLOW_ROBOTS: readonly string[] = [
  '/admin/',
  '/acceso',
  '/academia/',
  '/tarjeta/',
  '/api/',
  '/recursos/gracias',
  '/en/recursos/gracias',
  '/recursos/descargar/',
]

function normalizar(path: string): string {
  if (!path) return '/'
  const sinQuery = path.split('?')[0] ?? path
  if (sinQuery.length > 1 && sinQuery.endsWith('/')) return sinQuery.slice(0, -1)
  return sinQuery
}

export function rutaEsPrivadaOSensibles(path: string): boolean {
  const p = normalizar(path)
  if (PREFIJOS_PRIVADOS.some((prefijo) => p === prefijo || p.startsWith(`${prefijo}/`))) {
    return true
  }
  return RUTAS_SENSIBLES.some((ruta) => p === ruta || p.startsWith(`${ruta}/`))
}

export function rutaAnunciableEnSitemap(path: string): boolean {
  return !rutaEsPrivadaOSensibles(path)
}
