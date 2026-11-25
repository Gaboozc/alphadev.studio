// Hook de resolución para los tests de `node --test`: permite importar el
// código de la app tal como lo escribe Next (imports sin extensión y alias
// `@/`). Solo para tests; Next no lo usa.
import { existsSync, statSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, resolve as resolvePath } from 'node:path'

const RAIZ = resolvePath(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

function candidato(base) {
  for (const s of ['', '.ts', '/index.ts']) {
    const p = base + s
    if (existsSync(p) && statSync(p).isFile()) return p
  }
  return null
}

export async function resolve(specifier, context, next) {
  let base = null
  if (specifier.startsWith('@/')) base = join(RAIZ, specifier.slice(2))
  else if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
    base = resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)
  }
  if (base) {
    const p = candidato(base)
    if (p) return { url: pathToFileURL(p).href, shortCircuit: true }
  }
  return next(specifier, context)
}
