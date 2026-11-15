'use client'

import { useState } from 'react'
import { ACAD_COPY } from '../copy'

export default function CodeBlock({
  lang,
  code,
}: {
  lang: string
  code: string
}) {
  const [copied, setCopied] = useState(false)
  const lines = code.split('\n')
  const label = lang || null

  async function copiar() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* ignore */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="acad-code">
      <div className="acad-code__head">
        <span>{label ?? '\u00A0'}</span>
        <button
          type="button"
          className="acad-code__copy"
          onClick={copiar}
          aria-label={ACAD_COPY.copiarCodigoAria}
        >
          {copied ? ACAD_COPY.enlaceCopiado : ACAD_COPY.copiar}
        </button>
      </div>
      <pre className="acad-code__pre">
        <code className="acad-code__lines">
          <span className="acad-code__gutter" aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>
                {i + 1}
                {'\n'}
              </span>
            ))}
          </span>
          <span>{code}</span>
        </code>
      </pre>
    </div>
  )
}
