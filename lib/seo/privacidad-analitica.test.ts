import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { analiticaOperativa, copyPrivacidadAnalitica } from './privacidad-analitica.ts'

describe('privacidad de analítica', () => {
  it('sin ID no afirma medición operativa ni pide datos de persona', () => {
    assert.equal(analiticaOperativa(null), false)
    const es = copyPrivacidadAnalitica('es', false)
    const en = copyPrivacidadAnalitica('en', false)
    assert.match(es.cuerpo, /no tiene un identificador/i)
    assert.match(en.cuerpo, /no analytics identifier/i)
    assert.doesNotMatch(es.cuerpo, /@/)
    assert.doesNotMatch(en.cuerpo, /@/)
  })

  it('con ID describe consentimiento, conversiones reales y exclusión de PII', () => {
    const es = copyPrivacidadAnalitica('es', true)
    assert.match(es.cuerpo, /Si aceptas/)
    assert.match(es.cuerpo, /formulario de contacto que sí se guardó/)
    assert.match(es.cuerpo, /pago está confirmado/)
    assert.match(es.cuerpo, /No enviamos nombres, correos, teléfonos/)
    assert.match(es.cuerpo, /rechazar/)
    assert.doesNotMatch(es.cuerpo, /order id|token/i)
  })
})
