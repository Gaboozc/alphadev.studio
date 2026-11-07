import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { DISALLOW_ROBOTS, rutaAnunciableEnSitemap, rutaEsPrivadaOSensibles } from './privadas.ts'

describe('rutas privadas y sensibles', () => {
  it('marca admin, auth, academia, tarjetas, api y checkout de guías', () => {
    for (const path of [
      '/admin',
      '/admin/mensajes',
      '/acceso',
      '/academia',
      '/academia/programacion',
      '/tarjeta/gabriel-zavarse',
      '/api/pagos/paypal',
      '/recursos/gracias',
      '/recursos/gracias?token=abc',
      '/en/recursos/gracias',
      '/recursos/descargar/tok',
    ]) {
      assert.equal(rutaEsPrivadaOSensibles(path), true, path)
      assert.equal(rutaAnunciableEnSitemap(path), false, path)
    }
  })

  it('deja públicas las rutas de marketing reales', () => {
    for (const path of ['/', '/servicios', '/en/servicios', '/contacto', '/demos/ambar-grill']) {
      assert.equal(rutaEsPrivadaOSensibles(path), false, path)
      assert.equal(rutaAnunciableEnSitemap(path), true, path)
    }
  })

  it('robots disallow cubre privadas y no sustituye / como allow general', () => {
    assert.ok(DISALLOW_ROBOTS.includes('/admin/'))
    assert.ok(DISALLOW_ROBOTS.includes('/acceso'))
    assert.ok(DISALLOW_ROBOTS.includes('/academia/'))
    assert.ok(!DISALLOW_ROBOTS.includes('/'))
    assert.ok(!DISALLOW_ROBOTS.includes('/_next/'))
  })
})
