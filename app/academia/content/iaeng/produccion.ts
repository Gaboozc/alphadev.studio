import type { Module } from '../../types'
import { MOD_PROD_EVALS } from './produccion/evals'
import { MOD_PROD_ARQUITECTURA } from './produccion/arquitectura'
import { MOD_PROD_ASYNC } from './produccion/async'
import { MOD_PROD_REALTIME } from './produccion/realtime'
import { MOD_PROD_SEGURIDAD } from './produccion/seguridad'
import { MOD_PROD_ENTREGA } from './produccion/entrega'

// Rama Ingenieria de IA — un archivo por modulo dentro de la carpeta del area.
// El orden de este array es el orden en que se muestran.
//
// Arquitectura va ANTES que async y realtime a propósito: los dos citan sus
// conceptos (estado sin servidor, backoff con jitter) como ya vistos. Con
// arquitectura después, esas citas apuntaban hacia adelante en el temario.
export const MODULES_IAENG_PRODUCCION: Module[] = [
  MOD_PROD_EVALS,
  MOD_PROD_ARQUITECTURA,
  MOD_PROD_ASYNC,
  MOD_PROD_REALTIME,
  MOD_PROD_SEGURIDAD,
  MOD_PROD_ENTREGA,
]
