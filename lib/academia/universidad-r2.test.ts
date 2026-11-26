// Pasada r2 del PR #14: respuestas de Prof. X, chrome bilingüe y contenido limpio.
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import {
  type Catalogo,
  etiquetaLegado,
  leccionesDePrograma,
  numeroUnidadSlug,
  rutaGlosario,
  sinPrefijoUnidad,
} from './universidad.ts'
import { listaEnIdioma, tipoDePieza } from './ui.ts'

const RAIZ = join(process.cwd(), 'content', 'academia')
const cat = JSON.parse(readFileSync(join(RAIZ, 'catalogo-academia.json'), 'utf8')) as Catalogo

function todos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? todos(p) : [p]
  })
}

describe('contenido limpio de Prof. X', () => {
  it('sin marcas [INFERENCIA]/[INFERENCE] ni rutas internas en S0 (ES y EN)', () => {
    for (const f of [...todos(join(RAIZ, 'semestre-0')), ...todos(join(RAIZ, 'semestre-0-en'))]) {
      if (!f.endsWith('.md')) continue
      const t = readFileSync(f, 'utf8')
      assert.ok(!/\[INFEREN/.test(t), f)
      assert.ok(!/rework\/|_tools\/|plan-revision/.test(t), f)
    }
  })
  it('el registro interno de marcas retiradas no está en el repo', () => {
    assert.ok(!todos(join(process.cwd(), 'content')).some((f) => f.includes('marcas-internas')))
    assert.ok(!todos(join(process.cwd(), 'docs')).some((f) => f.includes('marcas-internas')))
  })
  it('las 87 lecciones EN de la Biblioteca están cargadas y cada una apunta a una lección real', () => {
    const md = todos(join(RAIZ, 'biblioteca-en')).filter((f) => f.endsWith('.md'))
    assert.equal(md.length, 87)
    const claves = new Set(cat.legacy_lessons.map((l) => l.legacy_key))
    for (const f of md) {
      const url = readFileSync(f, 'utf8').split('\n').slice(0, 6).find((l) => l.startsWith('url: '))
      const m = url && /\/en\/academia\/(.+)$/.exec(url.trim())
      assert.ok(m && claves.has(m[1]), `${f} → ${url}`)
    }
    assert.equal(cat.legacy_lessons.filter((l) => l.idioma_disponible.includes('en')).length, 87)
  })
  it('s0-c1-u1 existe en inglés (respuesta 4)', () => {
    assert.ok(existsSync(join(RAIZ, 'semestre-0-en', '01-trabajo-con-ia', 'u1-como-funciona-un-llm', 'guia.md')))
  })
})

describe('respuestas de Prof. X', () => {
  it('etiquetas EN del catálogo (respuesta 1)', () => {
    const l = cat.legacy_lessons.find((x) => x.decision === 'reescribir')!
    assert.equal(etiquetaLegado(l, 'en'), 'Previous version · being rewritten')
    assert.equal(etiquetaLegado(l, 'es'), 'Versión anterior · en reescritura')
  })
  it('uiux-exam cuelga de la carrera DP, no de un curso (respuesta 2)', () => {
    const dp = leccionesDePrograma(cat, 'DP')
    assert.deepEqual(dp.map((l) => l.legacy_key), ['diseno/uiux-8/uiux-exam'])
    assert.equal(dp[0].etiqueta_ui, 'Versión anterior · en reescritura')
  })
  it('glosario como recurso de S0 (respuesta 5)', () => {
    assert.equal(rutaGlosario('es'), '/academia/semestre-0/glosario-es-en')
    assert.equal(rutaGlosario('en'), '/en/academia/semestre-0/glosario-es-en')
  })
})

describe('helpers r2', () => {
  it('número y título de unidad', () => {
    assert.equal(numeroUnidadSlug('u2-causas-hipotesis-evidencia'), 2)
    assert.equal(numeroUnidadSlug('checkpoint'), null)
    assert.equal(sinPrefijoUnidad('Unidad 1 — Cómo funciona un modelo de lenguaje'), 'Cómo funciona un modelo de lenguaje')
    assert.equal(sinPrefijoUnidad('Unit 2 — Root Causes'), 'Root Causes')
  })
  it('tipos de pieza y listas en inglés', () => {
    assert.equal(tipoDePieza('exam', 'en').label, 'Quiz')
    assert.equal(tipoDePieza('exam').label, 'Cuestionario')
    assert.equal(listaEnIdioma(['1', '2', '3'], 'en'), '1, 2, and 3')
    assert.equal(listaEnIdioma(['1', '2', '3'], 'es'), '1, 2 y 3')
  })
})
