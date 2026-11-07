'use client'

import { useEffect } from 'react'
import { registrarConversion } from '@/lib/analytics/runtime'
import type { NombreConversion } from '@/lib/analytics/eventos'

// Se monta solo en pantallas de éxito confirmado. No dispara en clic,
// error, honeypot ni compra sin captura. La deduplicación vive en sessionStorage.

export default function ConversionBeacon({ nombre }: { nombre: NombreConversion }) {
  useEffect(() => {
    registrarConversion(nombre)
  }, [nombre])
  return null
}
