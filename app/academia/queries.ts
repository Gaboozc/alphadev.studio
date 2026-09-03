// Consultas sobre el contenido de la Academia.
//
// Separado de `ramas.ts` porque acá SÍ se importa el contenido completo de los
// módulos. En la Fase 2 (permisos) estas funciones son el único lugar que hay
// que tocar para filtrar por lo que cada usuario tiene permitido ver.

import type { Audience, Module, Track } from './types'
import { MODULES } from './modules'
import { RAMAS, type Rama, audienceOf, sortModules } from './ramas'

export function modulesOfTrack(track: Track): Module[] {
  return sortModules(MODULES.filter((m) => m.track === track))
}

export function modulesOfRama(rama: Rama): Module[] {
  const meta = RAMAS.find((r) => r.id === rama)
  if (!meta) return []
  return meta.tracks.flatMap((t) => modulesOfTrack(t))
}

export function moduleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id)
}

// Filtra por audiencia. 'ambos' entra siempre; el resto solo si coincide.
export function modulesForAudience(mods: Module[], audience: Audience): Module[] {
  if (audience === 'ambos') return mods
  return mods.filter((m) => {
    const a = audienceOf(m)
    return a === 'ambos' || a === audience
  })
}

export interface RamaStats {
  modules: number
  lessons: number
  tracks: number
}

export function statsOfRama(rama: Rama): RamaStats {
  const mods = modulesOfRama(rama)
  const meta = RAMAS.find((r) => r.id === rama)
  return {
    modules: mods.length,
    lessons: mods.reduce((acc, m) => acc + m.lessons.length, 0),
    tracks: meta?.tracks.length ?? 0,
  }
}
