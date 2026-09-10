import type { Module } from '../../types'
import { MOD_AGENTES_FUNDAMENTOS } from './agentes/fundamentos'
import { MOD_AGENTES_LANGGRAPH } from './agentes/langgraph'
import { MOD_AGENTES_MULTIAGENTE } from './agentes/multiagente'
import { MOD_AGENTES_MCP } from './agentes/mcp'

// Rama Ingenieria de IA — un archivo por modulo dentro de la carpeta del area.
// El orden de este array es el orden en que se muestran.
export const MODULES_IAENG_AGENTES: Module[] = [
  MOD_AGENTES_FUNDAMENTOS,
  MOD_AGENTES_LANGGRAPH,
  MOD_AGENTES_MULTIAGENTE,
  MOD_AGENTES_MCP,
]
