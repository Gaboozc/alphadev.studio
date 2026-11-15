// Progreso de la Academia: lógica pura (sin React ni localStorage).
// Las claves v2 son `moduleId:lessonId` para no cruzar ids repetidos entre módulos.

export type Indice = Record<string, string[]>

export type EstadoV2 = {
  version: 2
  done: Record<string, true>
  migratedFromV1: boolean
  migratedAt: string
}

export function construirIndice(
  mods: { id: string; lessons: { id: string }[] }[],
): Indice {
  const indice: Indice = {}
  for (const mod of mods) {
    for (const lesson of mod.lessons) {
      const lista = indice[lesson.id]
      if (lista) {
        if (!lista.includes(mod.id)) lista.push(mod.id)
      } else {
        indice[lesson.id] = [mod.id]
      }
    }
  }
  return indice
}

export function clave(moduleId: string, lessonId: string): string {
  return `${moduleId}:${lessonId}`
}

export function leerV1(raw: string | null): Record<string, boolean> {
  if (raw === null) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {}
    }
    const out: Record<string, boolean> = {}
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'boolean') out[k] = v
    }
    return out
  } catch {
    return {}
  }
}

export function leerV2(raw: string | null): EstadoV2 | null {
  if (raw === null) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null
    }
    const obj = parsed as Record<string, unknown>
    if (obj.version !== 2) return null
    if (typeof obj.done !== 'object' || obj.done === null || Array.isArray(obj.done)) {
      return null
    }
    if (typeof obj.migratedFromV1 !== 'boolean') return null
    if (typeof obj.migratedAt !== 'string') return null

    const done: Record<string, true> = {}
    for (const [k, v] of Object.entries(obj.done as Record<string, unknown>)) {
      if (v === true) done[k] = true
    }
    return {
      version: 2,
      done,
      migratedFromV1: obj.migratedFromV1,
      migratedAt: obj.migratedAt,
    }
  } catch {
    return null
  }
}

function evidencia(
  moduleId: string,
  v1: Record<string, boolean>,
  indice: Indice,
): number {
  let n = 0
  for (const [lessonId, modules] of Object.entries(indice)) {
    if (modules.length === 1 && modules[0] === moduleId && v1[lessonId] === true) {
      n += 1
    }
  }
  return n
}

export function migrarV1aV2(
  v1: Record<string, boolean>,
  indice: Indice,
  ahora: string,
): EstadoV2 {
  const done: Record<string, true> = {}
  const trueIds = Object.entries(v1)
    .filter(([, v]) => v === true)
    .map(([id]) => id)

  for (const lessonId of trueIds) {
    const modules = indice[lessonId]

    if (!modules || modules.length === 0) {
      done[`legacy:${lessonId}`] = true
      continue
    }

    if (modules.length === 1) {
      done[clave(modules[0], lessonId)] = true
      continue
    }

    // 2+ módulos: decidir por evidencia de lecciones no duplicadas
    const conEvidencia = modules.filter((m) => evidencia(m, v1, indice) > 0)
    const destino =
      conEvidencia.length === 1 ? conEvidencia : modules

    for (const m of destino) {
      done[clave(m, lessonId)] = true
    }
  }

  // Flag de procedencia: hubo un objeto v1 con al menos una clave (válido y no vacío).
  const migratedFromV1 = Object.keys(v1).length > 0

  return {
    version: 2,
    done,
    migratedFromV1,
    migratedAt: ahora,
  }
}

export function resolver(
  rawV1: string | null,
  rawV2: string | null,
  indice: Indice,
  ahora: string,
): { estado: EstadoV2; escribir: boolean } {
  const v2 = leerV2(rawV2)
  if (v2) return { estado: v2, escribir: false }

  const v1 = leerV1(rawV1)
  return { estado: migrarV1aV2(v1, indice, ahora), escribir: true }
}
