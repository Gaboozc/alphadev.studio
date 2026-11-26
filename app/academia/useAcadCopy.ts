'use client'

// Copy del chrome de la Academia en el idioma de la URL (P1-01). El idioma
// sale de LanguageContext (/en/academia/... → inglés).
import { useLang } from '@/lib/i18n/LanguageContext'
import { ACAD_COPIES, type AcadCopy } from './copy'

export function useAcadCopy(): AcadCopy {
  const { lang } = useLang()
  return ACAD_COPIES[lang] ?? ACAD_COPIES.es
}

/** Idioma activo + función para localizar un href interno de la Academia. */
export function useAcadLang() {
  const { lang, href } = useLang()
  return { lang, href }
}
