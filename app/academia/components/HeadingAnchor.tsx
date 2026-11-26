'use client'

import { useState } from 'react'
import AcadIcon from './AcadIcon'
import { useAcadCopy } from '../useAcadCopy'

export default function HeadingAnchor({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const ACAD_COPY = useAcadCopy()
  const [copied, setCopied] = useState(false)

  async function copiar() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Fallback silencioso: el anuncio aria sigue siendo útil
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <h2 id={id} className="acad-h2 acad-lesson__h2">
      <span>{children}</span>
      <button
        type="button"
        className="acad-h2__link"
        onClick={copiar}
        aria-label={ACAD_COPY.copiarEnlaceSeccion}
      >
        <AcadIcon name={copied ? 'check' : 'link'} size={16} />
        <span className="acad-h2__tip" aria-hidden="true">
          {ACAD_COPY.copiarEnlaceSeccion}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? ACAD_COPY.enlaceCopiado : ''}
      </span>
    </h2>
  )
}
