// Las rutas de las lecciones actuales NO cambian con el catálogo universidad
// (pedido de Gabe vía locust, 25 nov 2026; spec §3.2).
//
// Tres comprobaciones:
//   1. Las rutas que genera HOY el código (lessonHref sobre MODULES) son
//      exactamente las 549 de la foto tomada de master antes del cambio
//      (fixtures/rutas-lecciones.json).
//   2. Coinciden con la `ruta_actual` del catálogo de Prof. X, y su espejo en
//      inglés es `/en` + la misma ruta.
//   3. Los segmentos fijos nuevos (semestre-0, carreras, biblioteca) no tapan
//      ninguna rama: /academia/<rama>/… sigue resolviendo a la rama.
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { register } from 'node:module'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..', '..')
register(pathToFileURL(join(AQUI, 'fixtures', 'ts-resolve.mjs')).href)

type Mod = { id: string; track: string; lessons: { id: string }[] }

const { MODULES } = (await import(pathToFileURL(join(RAIZ, 'app/academia/modules.ts')).href)) as { MODULES: Mod[] }
const { lessonHref, RAMAS } = (await import(pathToFileURL(join(RAIZ, 'app/academia/ramas.ts')).href)) as {
  lessonHref: (m: Mod, id: string) => string
  RAMAS: { slug: string }[]
}
const { PROGRAMAS, rutaLeccionLegado } = await import('./universidad.ts')

const foto: string[] = JSON.parse(readFileSync(join(AQUI, 'fixtures', 'rutas-lecciones.json'), 'utf8'))
const catalogo = JSON.parse(readFileSync(join(RAIZ, 'content/academia/catalogo-academia.json'), 'utf8')) as {
  legacy_lessons: { ruta_actual: string; ruta_en: string }[]
}
const actuales = MODULES.flatMap((m) => m.lessons.map((l) => lessonHref(m, l.id))).sort()

describe('rutas de las lecciones actuales', () => {
  it('son las mismas 549 que en master antes del cambio', () => {
    assert.equal(foto.length, 549)
    assert.deepEqual(actuales, foto)
  })

  it('coinciden con la ruta_actual del catálogo de Prof. X', () => {
    const delCatalogo = catalogo.legacy_lessons.map((l) => l.ruta_actual).sort()
    assert.deepEqual(delCatalogo, foto)
  })

  it('tienen espejo en inglés con el mismo slug bajo /en', () => {
    for (const l of catalogo.legacy_lessons) {
      assert.equal(l.ruta_en, `/en${l.ruta_actual}`)
      assert.equal(rutaLeccionLegado(l, 'en'), l.ruta_en)
      assert.equal(rutaLeccionLegado(l, 'es'), l.ruta_actual)
    }
  })

  it('las páginas de lección existen en los dos idiomas', () => {
    assert.ok(existsSync(join(RAIZ, 'app/academia/[rama]/[moduleId]/[lessonId]/page.tsx')))
    assert.ok(existsSync(join(RAIZ, 'app/en/academia/[rama]/[moduleId]/[lessonId]/page.tsx')))
  })

  it('ningún segmento fijo nuevo coincide con el slug de una rama', () => {
    const fijos = [...PROGRAMAS.map((p) => p.slug), 'biblioteca', 'rutas']
    for (const r of RAMAS) assert.ok(!fijos.includes(r.slug), `colisión con la rama ${r.slug}`)
  })
})
