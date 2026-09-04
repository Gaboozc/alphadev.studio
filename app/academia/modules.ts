// Barril de contenido de la Academia.
//
// El contenido real vive en `content/<rama>.ts` — un archivo por rama, para que
// varias personas puedan escribir módulos a la vez sin pisarse. Este archivo
// solo los junta y re-exporta, así los imports existentes siguen funcionando.
//
// Para agregar un módulo: abre el archivo de su rama y suma el objeto al array.

import type { Module } from './types'
import { MODULES_PROGRAMACION } from './content/programacion'
import { MODULES_DISENO } from './content/diseno'
import { MODULES_IA } from './content/ia'
import { MODULES_IAENG_A, MODULES_IAENG_B } from './content/iaeng'
import { MODULES_MARKETING } from './content/marketing'
import { MODULES_CONTENIDO } from './content/contenido'
import { MODULES_NEGOCIO } from './content/negocio'

export * from './types'
export { LEARNING_PATHS, RETOS } from './content/paths'

export const MODULES: Module[] = [
  ...MODULES_PROGRAMACION,
  ...MODULES_DISENO,
  ...MODULES_IA,
  ...MODULES_IAENG_A,
  ...MODULES_IAENG_B,
  ...MODULES_MARKETING,
  ...MODULES_CONTENIDO,
  ...MODULES_NEGOCIO,
]
