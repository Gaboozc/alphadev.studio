import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { measurementIdDesdeEnv, measurementIdValido } from './id.ts'

describe('measurementIdValido', () => {
  it('acepta un ID GA4 con forma real', () => {
    assert.equal(measurementIdValido('g-abc123xyz'), 'G-ABC123XYZ')
  })

  it('rechaza vacío, placeholders y formatos que no son GA4', () => {
    assert.equal(measurementIdValido(undefined), null)
    assert.equal(measurementIdValido(''), null)
    assert.equal(measurementIdValido('   '), null)
    assert.equal(measurementIdValido('G-XXXXXXXXXX'), null)
    assert.equal(measurementIdValido('GTM-ABCDEF'), null)
    assert.equal(measurementIdValido('UA-123456-1'), null)
    assert.equal(measurementIdValido('not-an-id'), null)
  })

  it('desde env ausente o comentado-equivalente no inventa medición', () => {
    assert.equal(measurementIdDesdeEnv({}), null)
    assert.equal(measurementIdDesdeEnv({ NEXT_PUBLIC_ANALYTICS_ID: '' }), null)
    assert.equal(measurementIdDesdeEnv({ NEXT_PUBLIC_ANALYTICS_ID: 'G-XXXXXXXXXX' }), null)
  })
})
