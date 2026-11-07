// Identificador de medición GA4. Vacío o inválido = no hay medición operativa.
// No se inventa un ID: solo se acepta el formato G- más 6–14 caracteres
// alfanuméricos. Placeholders (G-XXXXXXXXXX, GTM-, UA-) no pasan.

const GA4 = /^G-[A-Z0-9]{6,14}$/

const RECHAZADOS = new Set([
  'G-XXXXXXXXXX',
  'G-XXXXXXXX',
  'G-0000000000',
  'G-TEST',
])

export function measurementIdValido(bruto: string | undefined | null): string | null {
  if (!bruto) return null
  const id = bruto.trim().toUpperCase()
  if (RECHAZADOS.has(id)) return null
  if (!GA4.test(id)) return null
  return id
}

export function measurementIdDesdeEnv(env: {
  NEXT_PUBLIC_ANALYTICS_ID?: string | undefined
}): string | null {
  return measurementIdValido(env.NEXT_PUBLIC_ANALYTICS_ID)
}
