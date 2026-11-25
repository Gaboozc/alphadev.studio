import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { register } from 'node:module'
import { dirname, join, relative } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  type Catalogo,
  PROGRAMAS,
  carpetaCursoS0,
  claveDePieza,
  etiquetaLegado,
  leccionesQueAlimentan,
  mismaPaginaEn,
  parseCsv,
  prerrequisitos,
  rutaCurso,
  tieneContenidoNuevo,
} from './universidad.ts'

const AQUI = dirname(fileURLToPath(import.meta.url))
const RAIZ = join(AQUI, '..', '..')
const CONTENIDO = join(RAIZ, 'content', 'academia')
register(pathToFileURL(join(AQUI, 'fixtures', 'ts-resolve.mjs')).href)
const rutas = (await import(pathToFileURL(join(RAIZ, 'lib/i18n/routes.ts')).href)) as typeof import('../i18n/routes')

const cat = JSON.parse(readFileSync(join(CONTENIDO, 'catalogo-academia.json'), 'utf8')) as Catalogo

function archivos(dir: string): string[] {
  const out: string[] = []
  const walk = (d: string) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n)
      if (statSync(p).isDirectory()) walk(p)
      else out.push(relative(dir, p).split('\\').join('/'))
    }
  }
  walk(dir)
  return out.sort()
}

const ids = (texto: string) => Array.from(texto.matchAll(/\*\*Id:\*\* `([^`]+)`/g), (m) => m[1])

describe('S0 en español e inglés', () => {
  const es = archivos(join(CONTENIDO, 'semestre-0'))
  const en = archivos(join(CONTENIDO, 'semestre-0-en'))

  it('tiene los mismos archivos (el glosario es solo EN)', () => {
    assert.ok(es.length > 100)
    assert.deepEqual(
      en.filter((f) => f !== 'glosario-es-en.md'),
      es,
    )
  })

  it('cada pieza conserva sus ids en los dos idiomas', () => {
    let total = 0
    for (const f of es.filter((x) => x.endsWith('.md'))) {
      const a = ids(readFileSync(join(CONTENIDO, 'semestre-0', f), 'utf8'))
      const b = ids(readFileSync(join(CONTENIDO, 'semestre-0-en', f), 'utf8'))
      assert.deepEqual(b, a, f)
      total += a.length
    }
    assert.ok(total > 0)
  })

  it('cada pieza con clave tiene su archivo de clave', () => {
    for (const c of cat.courses.filter((x) => x.program === 'S0')) {
      const carpeta = carpetaCursoS0(c)
      assert.ok(carpeta, c.code)
      const dir = join(CONTENIDO, 'semestre-0', carpeta!)
      const unidades = readdirSync(dir).filter((d) => /^u\d+-/.test(d) && !d.endsWith('-enriquecida'))
      assert.ok(unidades.length >= 4, c.code)
      for (const u of unidades) {
        for (const p of ['comprobaciones-rapidas', 'cuestionario', 'ejercicios']) {
          const clave = claveDePieza(u, p)!
          assert.ok(existsSync(join(dir, clave)), `${c.code} ${u} ${clave}`)
        }
      }
    }
  })

  it('el CSV de tarjetas se lee completo', () => {
    const f = join(CONTENIDO, 'semestre-0/02-pensamiento-critico/u2-causas-hipotesis-evidencia-enriquecida/03-tarjetas.csv')
    const filas = parseCsv(readFileSync(f, 'utf8'))
    assert.deepEqual(filas[0], ['id', 'tipo', 'frente', 'reverso', 'etiquetas'])
    assert.ok(filas.slice(1).every((r) => r.length === 5))
  })
})

describe('catálogo tipo universidad', () => {
  it('tiene 62 cursos en S0, tres carreras y optativas', () => {
    assert.equal(cat.courses.length, 62)
    assert.deepEqual(
      PROGRAMAS.map((p) => p.id),
      ['S0', 'IS', 'DP', 'MK', 'OPT'],
    )
    for (const c of cat.courses) assert.ok(PROGRAMAS.some((p) => p.id === c.program), c.code)
  })

  it('cada curso vive en la ruta del JSON, con el mismo slug en /en', () => {
    for (const c of cat.courses) {
      assert.equal(rutaCurso(c, 'es'), c.route_es, c.code)
      assert.equal(rutaCurso(c, 'en'), c.route_en, c.code)
    }
  })

  it('solo S0 está escrito; el resto se muestra «En preparación»', () => {
    for (const c of cat.courses) assert.equal(tieneContenidoNuevo(c), c.program === 'S0', c.code)
  })

  it('los cursos con lecciones legado las listan (nada queda escondido)', () => {
    const conLegado = cat.courses.filter((c) => c.status === 'en_preparacion_con_lecciones_legado')
    assert.ok(conLegado.length > 0)
    for (const c of conLegado) assert.ok(leccionesQueAlimentan(cat, c.code).length > 0, c.code)
  })

  it('las 549 lecciones tienen etiqueta en ES y EN; las retiradas lo dicen', () => {
    assert.equal(cat.legacy_lessons.length, 549)
    for (const l of cat.legacy_lessons) {
      assert.ok(etiquetaLegado(l, 'es'))
      assert.ok(etiquetaLegado(l, 'en'))
    }
    const retiradas = cat.legacy_lessons.filter((l) => l.decision === 'retirar')
    assert.equal(retiradas.length, 37)
    for (const l of retiradas) {
      assert.match(etiquetaLegado(l, 'es'), /^Retirada · reemplazada por/)
      assert.match(etiquetaLegado(l, 'en'), /^Retired · replaced by/)
    }
  })

  it('los prerrequisitos son una lista de recomendación, no un bloqueo', () => {
    const is303 = cat.courses.find((c) => c.code === 'IS-303')!
    assert.deepEqual(prerrequisitos(is303), ['IS-102', 'IS-203'])
    const s0c1 = cat.courses.find((c) => c.code === 'S0-C1')!
    assert.deepEqual(prerrequisitos(s0c1), [])
  })
})

describe('selector de idioma en la Academia', () => {
  const casos = [
    '/academia',
    '/academia/semestre-0/s0-c2',
    '/academia/semestre-0/s0-c2/u2-causas-hipotesis-evidencia',
    '/academia/ingenieria-software-ia/is-303',
    '/academia/biblioteca',
    '/academia/programacion/fund-1/f1-l1',
  ]

  it('lleva a la misma página en el otro idioma y vuelve', () => {
    for (const es of casos) {
      const en = mismaPaginaEn(es, 'en')
      assert.equal(en, `/en${es}`)
      assert.equal(mismaPaginaEn(en, 'es'), es)
      assert.equal(mismaPaginaEn(es, 'es'), es)
    }
  })

  it('routes.ts declara la Academia como ruta privada bilingüe', () => {
    for (const es of casos) {
      assert.ok(rutas.esRutaPrivadaBilingue(es), es)
      assert.ok(rutas.tieneVersionEnOtroIdioma(es), es)
      assert.equal(rutas.esRutaPublica(es), false, `${es} no debe entrar al sitemap`)
      assert.deepEqual(rutas.stripLocale(`/en${es}`), { lang: 'en', path: es })
      assert.equal(rutas.localizedPath(es, 'en'), `/en${es}`)
    }
    assert.equal(rutas.tieneVersionEnOtroIdioma('/admin'), false)
    assert.equal(rutas.esRutaPrivadaBilingue('/academiax'), false)
  })
})
