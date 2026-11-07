import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  debeEmitirConversion,
  eventoConversion,
  eventoCta,
  eventoPageView,
  marcarConversionEmitida,
  paramsSeguros,
  urlSinQuery,
} from './eventos.ts'

describe('eventos de medición', () => {
  it('strips query y hash para no filtrar tokens de checkout', () => {
    assert.equal(
      urlSinQuery('https://www.alphadev.studio/recursos/gracias?token=ORDER-SECRET'),
      'https://www.alphadev.studio/recursos/gracias',
    )
    assert.equal(urlSinQuery('/contacto?email=a@b.com#x'), 'https://www.alphadev.studio/contacto')
  })

  it('paramsSeguros descarta PII, textos de pedido y page_location', () => {
    const limpio = paramsSeguros({
      slot: 'hero_primary',
      email: 'ada@example.com',
      phone: '+14076867561',
      message: 'hola',
      token: 'abc',
      order_id: 'PAYPAL-1',
      page_location: 'https://www.alphadev.studio/recursos/gracias?token=x',
      nombre: 'Ada',
    })
    assert.deepEqual(limpio, { slot: 'hero_primary' })
  })

  it('page_view no lleva query en page_path', () => {
    const ev = eventoPageView('/recursos/gracias?token=SECRET')
    assert.equal(ev.conversion, false)
    assert.equal(ev.params.page_path, '/recursos/gracias')
  })

  it('generate_lead y purchase son conversiones; cta_click no', () => {
    assert.equal(eventoConversion('generate_lead').conversion, true)
    assert.equal(eventoConversion('purchase').conversion, true)
    assert.equal(eventoCta('hero_primary').conversion, false)
  })

  it('no marca conversión sin consentimiento, sin ID, ni duplicada', () => {
    const store: Record<string, string> = {}
    const almacen = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v
      },
    }
    assert.equal(
      debeEmitirConversion(almacen, 'generate_lead', {
        consentGranted: true,
        measurementId: null,
      }),
      false,
    )
    assert.equal(
      debeEmitirConversion(almacen, 'generate_lead', {
        consentGranted: false,
        measurementId: 'G-ABC123XYZ',
      }),
      false,
    )
    assert.equal(
      debeEmitirConversion(almacen, 'generate_lead', {
        consentGranted: true,
        measurementId: 'G-ABC123XYZ',
      }),
      true,
    )
    marcarConversionEmitida(almacen, 'generate_lead')
    assert.equal(
      debeEmitirConversion(almacen, 'generate_lead', {
        consentGranted: true,
        measurementId: 'G-ABC123XYZ',
      }),
      false,
    )
  })
})
