import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { SITE_URL } from '../site-config.ts'
import { rutaAnunciableEnSitemap, rutaEsPrivadaOSensibles } from './privadas.ts'

// No se importa app/sitemap ni lib/i18n/routes: esas piezas tiran de `next`
// y del alias `@/`, que node:test no resuelve. La lista de URLs esperadas
// espeja PUBLIC_PATHS + demos + la política de Leer con Monstruos.

const PUBLICAS = [
  '/',
  '/servicios',
  '/portafolio',
  '/proceso',
  '/demos',
  '/contacto',
  '/privacidad',
  '/terminos',
  '/recursos',
] as const

const DEMOS = ['ambar-grill', 'cometa-cargo', 'celeste-clinic', 'mentora-talent'] as const

function abs(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

describe('sitemap estático', () => {
  it('usa el host canónico www, no el apex', () => {
    assert.equal(SITE_URL, 'https://www.alphadev.studio')
  })

  it('las públicas y demos son anunciables; checkout y auth no', () => {
    for (const path of PUBLICAS) {
      assert.equal(rutaAnunciableEnSitemap(path), true, path)
      assert.equal(rutaAnunciableEnSitemap(`/en${path === '/' ? '' : path}`), true, path)
    }
    for (const slug of DEMOS) {
      assert.equal(rutaAnunciableEnSitemap(`/demos/${slug}`), true)
      assert.equal(rutaAnunciableEnSitemap(`/en/demos/${slug}`), true)
    }
    assert.equal(rutaAnunciableEnSitemap('/privacy/leer-con-monstruos'), true)

    for (const path of [
      '/admin',
      '/acceso',
      '/academia',
      '/tarjeta/gabriel',
      '/recursos/gracias',
      '/en/recursos/gracias',
      '/recursos/descargar/tok',
    ]) {
      assert.equal(rutaEsPrivadaOSensibles(path), true, path)
    }
  })

  it('el loc canónico de cada pública vive en www', () => {
    assert.equal(abs('/'), 'https://www.alphadev.studio')
    assert.equal(abs('/en'), 'https://www.alphadev.studio/en')
    assert.equal(abs('/servicios'), 'https://www.alphadev.studio/servicios')
    assert.ok(!abs('/servicios').includes('https://alphadev.studio/servicios'))
  })
})
