import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  clave,
  construirIndice,
  leerV1,
  leerV2,
  migrarV1aV2,
  resolver,
} from './progreso.ts'

const FIXTURE = [
  {
    id: 'back-1',
    lessons: [
      { id: 'b1-l1' },
      { id: 'b1-l1b' },
      { id: 'b1-l2' },
      { id: 'b1-l3' },
      { id: 'b1-l4' },
      { id: 'b1-l4b' },
      { id: 'b1-l5' },
      { id: 'b1-l5b' },
      { id: 'b1-l6' },
      { id: 'b1-l7' },
    ],
  },
  {
    id: 'branding-1',
    lessons: [
      { id: 'b1-l1' },
      { id: 'b1-l1b' },
      { id: 'b1-l2' },
      { id: 'b1-l2b' },
      { id: 'b1-l3' },
      { id: 'b1-l3b' },
      { id: 'branding-1-proj-basico' },
      { id: 'branding-1-proj-inter' },
    ],
  },
  {
    id: 'back-2',
    lessons: [
      { id: 'b2-l0' },
      { id: 'b2-l1' },
      { id: 'b2-l1b' },
      { id: 'b2-l2' },
      { id: 'b2-l3' },
      { id: 'b2-l4' },
      { id: 'b2-l5' },
      { id: 'b2-l6' },
      { id: 'b2-l7' },
    ],
  },
  {
    id: 'branding-2',
    lessons: [
      { id: 'b2-l1' },
      { id: 'b2-l1b' },
      { id: 'b2-l2' },
      { id: 'b2-l2b' },
      { id: 'b2-l3' },
      { id: 'b2-l3b' },
      { id: 'branding-2-proj-pro' },
    ],
  },
  {
    id: 'back-3',
    lessons: [
      { id: 'b3-l1' },
      { id: 'b3-l2' },
      { id: 'b3-l3' },
      { id: 'b3-l4' },
      { id: 'b3-l5' },
    ],
  },
  {
    id: 'branding-3',
    lessons: [
      { id: 'b3-l1' },
      { id: 'b3-l1b' },
      { id: 'b3-l2' },
      { id: 'b3-l2b' },
      { id: 'branding-exam' },
      { id: 'branding-3-p1' },
    ],
  },
  {
    id: 'copy-1',
    lessons: [{ id: 'c1-l1' }, { id: 'c1-l2' }],
  },
]

const DUPLICADOS = [
  'b1-l1',
  'b1-l1b',
  'b1-l2',
  'b1-l3',
  'b2-l1',
  'b2-l1b',
  'b2-l2',
  'b2-l3',
  'b3-l1',
  'b3-l2',
]

const AHORA = '2026-11-14T12:00:00.000Z'
const indice = construirIndice(FIXTURE)

describe('construirIndice', () => {
  it('marca exactamente los 10 ids duplicados con 2 módulos; el resto con 1', () => {
    const duplicados = Object.entries(indice).filter(([, mods]) => mods.length === 2)
    assert.equal(duplicados.length, 10)
    for (const id of DUPLICADOS) {
      assert.equal(indice[id]?.length, 2, id)
    }
    for (const [id, mods] of Object.entries(indice)) {
      if (!DUPLICADOS.includes(id)) {
        assert.equal(mods.length, 1, id)
      }
    }
  })
})

describe('leerV1', () => {
  it('null, JSON inválido y array → {}', () => {
    assert.deepEqual(leerV1(null), {})
    assert.deepEqual(leerV1('{'), {})
    assert.deepEqual(leerV1('[]'), {})
  })
})

describe('migrarV1aV2', () => {
  it('{c1-l1:true} → copy-1:c1-l1', () => {
    const e = migrarV1aV2({ 'c1-l1': true }, indice, AHORA)
    assert.deepEqual(e.done, { 'copy-1:c1-l1': true })
    assert.equal(e.migratedFromV1, true)
    assert.equal(e.migratedAt, AHORA)
    assert.equal(e.version, 2)
  })

  it('{c1-l1:false} → done vacío', () => {
    const e = migrarV1aV2({ 'c1-l1': false }, indice, AHORA)
    assert.deepEqual(e.done, {})
    assert.equal(e.migratedFromV1, true)
  })

  it('b1-l1 + b1-l4 → solo back-1', () => {
    const e = migrarV1aV2({ 'b1-l1': true, 'b1-l4': true }, indice, AHORA)
    assert.equal(e.done['back-1:b1-l1'], true)
    assert.equal(e.done['back-1:b1-l4'], true)
    assert.equal(e.done['branding-1:b1-l1'], undefined)
  })

  it('b2-l2 + branding-2-proj-pro → solo branding-2', () => {
    const e = migrarV1aV2(
      { 'b2-l2': true, 'branding-2-proj-pro': true },
      indice,
      AHORA,
    )
    assert.equal(e.done['branding-2:b2-l2'], true)
    assert.equal(e.done['branding-2:branding-2-proj-pro'], true)
    assert.equal(e.done['back-2:b2-l2'], undefined)
  })

  it('b3-l1 con evidencia en ambos → ambos módulos', () => {
    const e = migrarV1aV2(
      { 'b3-l1': true, 'b3-l3': true, 'b3-l1b': true },
      indice,
      AHORA,
    )
    assert.equal(e.done['back-3:b3-l1'], true)
    assert.equal(e.done['branding-3:b3-l1'], true)
    assert.equal(e.done['back-3:b3-l3'], true)
    assert.equal(e.done['branding-3:b3-l1b'], true)
  })

  it('b1-l2 solo → ambos módulos (sin evidencia)', () => {
    const e = migrarV1aV2({ 'b1-l2': true }, indice, AHORA)
    assert.equal(e.done['back-1:b1-l2'], true)
    assert.equal(e.done['branding-1:b1-l2'], true)
  })

  it('b1-l1 + b1-l2 sin uniques → ambos ids en ambos módulos', () => {
    const e = migrarV1aV2({ 'b1-l1': true, 'b1-l2': true }, indice, AHORA)
    assert.equal(e.done['back-1:b1-l1'], true)
    assert.equal(e.done['branding-1:b1-l1'], true)
    assert.equal(e.done['back-1:b1-l2'], true)
    assert.equal(e.done['branding-1:b1-l2'], true)
  })

  it('id fuera del catálogo → legacy:', () => {
    const e = migrarV1aV2({ 'viejo-x': true }, indice, AHORA)
    assert.deepEqual(e.done, { 'legacy:viejo-x': true })
  })

  it('sin v1 → done vacío y migratedFromV1 false', () => {
    const e = migrarV1aV2({}, indice, AHORA)
    assert.deepEqual(e.done, {})
    assert.equal(e.migratedFromV1, false)
  })
})

describe('resolver e idempotencia', () => {
  it('v2 válida → mismo estado y escribir:false', () => {
    const v1 = JSON.stringify({ 'b1-l2': true })
    const primera = resolver(v1, null, indice, AHORA)
    assert.equal(primera.escribir, true)
    const segunda = resolver(v1, JSON.stringify(primera.estado), indice, AHORA)
    assert.equal(segunda.escribir, false)
    assert.deepEqual(segunda.estado, primera.estado)
  })

  it('migrar dos veces con el mismo ahora → deepEqual', () => {
    const v1 = { 'b1-l2': true }
    const a = migrarV1aV2(v1, indice, AHORA)
    const b = migrarV1aV2(v1, indice, AHORA)
    assert.deepEqual(a, b)
  })

  it('v2 corrupta o version:1 → remigra (escribir:true)', () => {
    const v1 = JSON.stringify({ 'c1-l1': true })
    const corrupta = resolver(v1, '{', indice, AHORA)
    assert.equal(corrupta.escribir, true)
    assert.equal(corrupta.estado.done['copy-1:c1-l1'], true)

    const v1format = resolver(
      v1,
      JSON.stringify({ version: 1, done: {} }),
      indice,
      AHORA,
    )
    assert.equal(v1format.escribir, true)
    assert.equal(v1format.estado.done['copy-1:c1-l1'], true)
  })

  it('sin v1 → done vacío y migratedFromV1 false', () => {
    const r = resolver(null, null, indice, AHORA)
    assert.equal(r.escribir, true)
    assert.deepEqual(r.estado.done, {})
    assert.equal(r.estado.migratedFromV1, false)
  })
})

describe('clave', () => {
  it("clave('back-1','b1-l1') === 'back-1:b1-l1'", () => {
    assert.equal(clave('back-1', 'b1-l1'), 'back-1:b1-l1')
  })
})

describe('leerV2', () => {
  it('rechaza version distinta de 2', () => {
    assert.equal(leerV2(JSON.stringify({ version: 1, done: {} })), null)
  })
})
