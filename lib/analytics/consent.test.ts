import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  CLAVE_CONSENTIMIENTO,
  consentimientoEfectivo,
  debeCargarGa4,
  guardarConsentimiento,
  leerConsentimiento,
  parseConsent,
  revocarConsentimiento,
  type AlmacenConsentimiento,
} from './consent.ts'

function memoria(inicial: Record<string, string> = {}): AlmacenConsentimiento {
  const datos = { ...inicial }
  return {
    getItem: (clave) => (clave in datos ? datos[clave] : null),
    setItem: (clave, valor) => {
      datos[clave] = valor
    },
    removeItem: (clave) => {
      delete datos[clave]
    },
  }
}

describe('consentimiento analítica', () => {
  it('sin elección no carga GA4 aunque haya ID', () => {
    assert.equal(parseConsent(null), 'unknown')
    assert.equal(consentimientoEfectivo('unknown'), 'denied')
    assert.equal(
      debeCargarGa4({ measurementId: 'G-ABC123XYZ', consent: 'unknown' }),
      false,
    )
  })

  it('deny y revoke impiden cargar el script', () => {
    assert.equal(
      debeCargarGa4({ measurementId: 'G-ABC123XYZ', consent: 'denied' }),
      false,
    )
    const almacen = memoria({ [CLAVE_CONSENTIMIENTO]: 'granted' })
    assert.equal(revocarConsentimiento(almacen), 'denied')
    assert.equal(leerConsentimiento(almacen), 'denied')
    assert.equal(
      debeCargarGa4({
        measurementId: 'G-ABC123XYZ',
        consent: leerConsentimiento(almacen),
      }),
      false,
    )
  })

  it('sin ID válido nunca carga, aunque el consentimiento sea granted', () => {
    assert.equal(debeCargarGa4({ measurementId: null, consent: 'granted' }), false)
  })

  it('granted + ID válido sí permite cargar', () => {
    const almacen = memoria()
    guardarConsentimiento(almacen, 'granted')
    assert.equal(
      debeCargarGa4({
        measurementId: 'G-ABC123XYZ',
        consent: leerConsentimiento(almacen),
      }),
      true,
    )
  })
})
