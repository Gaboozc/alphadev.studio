import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

type FilaGuia = {
  rama: string
  modulo: string
  pregunta_guia: string
}

/** Parser CSV mínimo (comillas, comas, UTF-8). Suficiente para el fixture. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
          continue
        }
        inQ = false
        continue
      }
      field += c
      continue
    }
    if (c === '"') {
      inQ = true
      continue
    }
    if (c === ',') {
      row.push(field)
      field = ''
      continue
    }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
      continue
    }
    field += c
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

function leerPreguntasGuia(): FilaGuia[] {
  const here = dirname(fileURLToPath(import.meta.url))
  const raw = readFileSync(join(here, 'fixtures/preguntas-guia.csv'), 'utf8')
  const rows = parseCsv(raw)
  const header = rows[0]
  const idx = Object.fromEntries(header.map((h, i) => [h, i]))
  return rows.slice(1).map((r) => ({
    rama: r[idx.rama] ?? '',
    modulo: r[idx.modulo] ?? '',
    pregunta_guia: r[idx.pregunta_guia] ?? '',
  }))
}

function walkTs(dir: string): string[] {
  const out: string[] = []
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name)
    if (ent.isDirectory()) out.push(...walkTs(p))
    else if (ent.name.endsWith('.ts')) out.push(p)
  }
  return out
}

/**
 * Extrae `guidingQuestion` de cada módulo en content/**.
 * Busca el bloque entre `id: '<modulo>'` y `lessons:` (sin cruzar otro id de módulo).
 */
function guidingQuestionsFromContent(repoRoot: string): Map<string, string> {
  const files = walkTs(join(repoRoot, 'app/academia/content'))
  const map = new Map<string, string>()
  const idRe = /\bid: '([^']+)',/g

  for (const file of files) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    while ((m = idRe.exec(src))) {
      const id = m[1]
      const from = m.index
      // Ventana hasta el siguiente id: o lessons: cercano
      const slice = src.slice(from, from + 1200)
      if (!/\blessons:\s*\[/.test(slice)) continue
      // Solo módulos: tienen number: cerca del id
      if (!/\bnumber:\s*\d+/.test(slice.slice(0, 200))) continue
      const gq = /guidingQuestion:\s*'((?:\\'|[^'])*)'/.exec(slice)
      if (gq) {
        map.set(id, gq[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\'))
      }
    }
  }
  return map
}

/** Rama URL del CSV ↔ archivo de content (aproximación por carpeta / id conocido). */
function ramaEsperadaPorArchivo(rutaArchivo: string): string | null {
  // En Windows las rutas traen `\`; se normalizan para que el test sea portable.
  const filePath = rutaArchivo.replaceAll('\\', '/')
  if (filePath.includes('/programacion.ts')) return 'programacion'
  if (filePath.includes('/diseno.ts')) return 'diseno'
  if (filePath.includes('/ia.ts')) return 'inteligencia-artificial'
  if (filePath.includes('/iaeng/')) return 'ingenieria-ia'
  if (filePath.includes('/marketing.ts')) return 'marketing'
  if (filePath.includes('/contenido.ts')) return 'contenido-seo'
  if (filePath.includes('/negocio.ts')) return 'negocio-datos'
  return null
}

function moduleRamaFromContent(repoRoot: string): Map<string, string> {
  const files = walkTs(join(repoRoot, 'app/academia/content'))
  const map = new Map<string, string>()
  const idRe = /\bid: '([^']+)',/g
  for (const file of files) {
    const rama = ramaEsperadaPorArchivo(file)
    if (!rama) continue
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    while ((m = idRe.exec(src))) {
      const id = m[1]
      const slice = src.slice(m.index, m.index + 400)
      if (!/\bnumber:\s*\d+/.test(slice.slice(0, 200))) continue
      if (!/\blessons:\s*\[/.test(src.slice(m.index, m.index + 1200))) continue
      map.set(id, rama)
    }
  }
  return map
}

describe('preguntas guía (Prof. X)', () => {
  const here = dirname(fileURLToPath(import.meta.url))
  const repoRoot = join(here, '../..')
  const filas = leerPreguntasGuia()
  const enContent = guidingQuestionsFromContent(repoRoot)
  const ramaOf = moduleRamaFromContent(repoRoot)

  it('el CSV tiene 90 filas con pregunta no vacía y sin módulos duplicados', () => {
    assert.equal(filas.length, 90)
    assert.ok(filas.every((f) => f.pregunta_guia.trim().length > 0))
    const ids = filas.map((f) => f.modulo)
    assert.equal(new Set(ids).size, 90)
  })

  it('cada (rama, modulo) del CSV existe en el contenido con guidingQuestion idéntica', () => {
    const noEncontrados: string[] = []
    const ramaMismatch: string[] = []
    const preguntaMismatch: Array<{ id: string; got?: string }> = []

    for (const fila of filas) {
      if (!enContent.has(fila.modulo)) {
        noEncontrados.push(`${fila.rama}/${fila.modulo}`)
        continue
      }
      const ramaContent = ramaOf.get(fila.modulo)
      if (ramaContent !== fila.rama) {
        ramaMismatch.push(
          `${fila.modulo}: csv=${fila.rama} content=${ramaContent ?? 'null'}`,
        )
      }
      const got = enContent.get(fila.modulo)
      if (got !== fila.pregunta_guia) {
        preguntaMismatch.push({ id: fila.modulo, got })
      }
    }

    assert.deepEqual(
      noEncontrados,
      [],
      `slugs no encontrados: ${noEncontrados.join(', ')}`,
    )
    assert.deepEqual(
      ramaMismatch,
      [],
      `rama CSV ≠ content: ${ramaMismatch.join('; ')}`,
    )
    assert.deepEqual(
      preguntaMismatch.map((p) => p.id),
      [],
      `guidingQuestion ≠ CSV (${preguntaMismatch.length})`,
    )
  })
})
