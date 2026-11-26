'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import AcadIcon from './AcadIcon'
import { useAcadCopy } from '../useAcadCopy'

export default function LessonToolbar({
  indiceOpen,
  onToggleIndice,
  temarioHref,
  salirHref,
}: {
  indiceOpen: boolean
  onToggleIndice: () => void
  temarioHref: string
  salirHref: string
}) {
  const ACAD_COPY = useAcadCopy()
  const ref = useRef<HTMLDivElement>(null)
  // compact = icono + nombre debajo (móvil o desktop cuando no caben en una línea)
  const [compact, setCompact] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function medir() {
      if (!el) return
      const ancho = el.clientWidth
      // Por debajo de 768 siempre compacto. Encima, probar layout de fila:
      // si la suma de anchos mínimos de las tres etiquetas desktop no cabe → compacto.
      if (ancho < 768) {
        setCompact(true)
        return
      }
      // Anchos aproximados Inter 500 14px + icono 20 + gaps (medidos por text)
      const labels = [
        ACAD_COPY.indiceUnidad,
        ACAD_COPY.temarioCurso,
        ACAD_COPY.salir,
      ]
      // ~7.2px/carácter + 20 icono + 8 gap + 28 padding ≈ conservador
      const needed = labels.reduce((acc, t) => acc + t.length * 7.2 + 56, 0) + 24
      setCompact(needed > ancho)
    }

    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [ACAD_COPY.indiceUnidad, ACAD_COPY.temarioCurso, ACAD_COPY.salir])

  return (
    <div
      ref={ref}
      className={`acad-tools${compact ? ' is-compact' : ' is-wide'}`}
      role="toolbar"
      aria-label={ACAD_COPY.herramientasGrupo}
    >
      <button
        type="button"
        className={`acad-tools__btn${indiceOpen ? ' is-active' : ''}`}
        aria-pressed={indiceOpen}
        onClick={onToggleIndice}
      >
        <AcadIcon name="list" size={20} />
        <span className="acad-tools__name">
          {compact ? ACAD_COPY.indiceMovil : ACAD_COPY.indiceUnidad}
        </span>
      </button>

      <Link href={temarioHref} className="acad-tools__btn">
        <AcadIcon name="layout-list" size={20} />
        <span className="acad-tools__name">
          {compact ? ACAD_COPY.temarioMovil : ACAD_COPY.temarioCurso}
        </span>
      </Link>

      <Link
        href={salirHref}
        className="acad-tools__btn"
        aria-label={ACAD_COPY.salirAria}
        title={compact ? undefined : ACAD_COPY.salirHint}
      >
        <AcadIcon name="log-out" size={20} />
        <span className="acad-tools__name">{ACAD_COPY.salir}</span>
      </Link>
    </div>
  )
}
