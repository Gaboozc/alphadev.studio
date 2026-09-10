import type { Module } from '../../types'
import { MOD_PROD_ARQUITECTURA } from './produccion/arquitectura'
import { MOD_PROD_SEGURIDAD } from './produccion/seguridad'
import { MOD_PROD_ENTREGA } from './produccion/entrega'

// Rama Ingenieria de IA — un archivo por modulo dentro de la carpeta del area.
// El orden de este array es el orden en que se muestran.
export const MODULES_IAENG_PRODUCCION: Module[] = [
  MOD_PROD_ARQUITECTURA,
  MOD_PROD_SEGURIDAD,
  MOD_PROD_ENTREGA,
]
