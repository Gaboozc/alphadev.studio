'use client'

import { useEffect, useState } from 'react'
import { useAcadCopy } from '../useAcadCopy'
import type { SeccionH2 } from '@/lib/academia/ui'
import { debeMostrarSegmentos } from '@/lib/academia/ui'

export default function SegmentProgress({ secciones }: { secciones: SeccionH2[] }) {
  const ACAD_COPY = useAcadCopy()
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (!debeMostrarSegmentos(secciones)) return

    const els = secciones
      .map((s) => document.getElementById(s.slug))
      .filter((el): el is HTMLElement => el !== null)

    if (els.length === 0) return

    const visible = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        }
        let bestIdx = 0
        let bestRatio = -1
        secciones.forEach((s, i) => {
          const r = visible.get(s.slug) ?? 0
          if (r > bestRatio) {
            bestRatio = r
            bestIdx = i
          }
        })
        if (bestRatio > 0) setActual(bestIdx)
        else {
          // Si nada intersecta, inferir por scrollY
          const y = window.scrollY + 120
          let idx = 0
          for (let i = 0; i < els.length; i++) {
            if (els[i].offsetTop <= y) idx = i
          }
          setActual(idx)
        }
      },
      { rootMargin: '-10% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [secciones])

  if (!debeMostrarSegmentos(secciones)) return null

  const m = secciones.length
  const n = Math.min(actual + 1, m)

  return (
    <div className="acad-segs">
      <div className="acad-segs__track" aria-hidden="true">
        {secciones.map((s, i) => {
          const cls =
            i < actual ? 'is-done' : i === actual ? 'is-current' : ''
          return <div key={s.slug} className={`acad-segs__seg ${cls}`} />
        })}
      </div>
      <p className="acad-segs__caption">{ACAD_COPY.seccionDe(n, m)}</p>
    </div>
  )
}
