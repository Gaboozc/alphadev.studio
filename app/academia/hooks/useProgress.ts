'use client'

// Wrapper del contexto de progreso. Sin ProgresoProvider lanza un error claro.
// No importa contenido de módulos: el índice y el catálogo viven en el servidor.

import { useContext } from 'react'
import { ProgresoContext } from '../components/ProgresoProvider'

export function useProgress() {
  const ctx = useContext(ProgresoContext)
  if (!ctx) {
    throw new Error(
      'useProgress debe usarse dentro de <ProgresoProvider> (layout de /academia).',
    )
  }
  return ctx
}
