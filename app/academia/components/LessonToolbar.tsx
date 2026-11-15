'use client'

import Link from 'next/link'
import AcadIcon from './AcadIcon'
import { ACAD_COPY } from '../copy'

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
  return (
    <div className="acad-tools" role="toolbar" aria-label={ACAD_COPY.herramientasGrupo}>
      <button
        type="button"
        className={`acad-tools__btn${indiceOpen ? ' is-active' : ''}`}
        aria-pressed={indiceOpen}
        onClick={onToggleIndice}
      >
        <AcadIcon name="list" size={20} />
        <span className="acad-tools__name acad-tools__name--desktop">
          {ACAD_COPY.indiceUnidad}
        </span>
        <span className="acad-tools__name acad-tools__name--mobile">
          {ACAD_COPY.indiceMovil}
        </span>
      </button>

      <Link href={temarioHref} className="acad-tools__btn">
        <AcadIcon name="layout-list" size={20} />
        <span className="acad-tools__name">{ACAD_COPY.temarioCurso}</span>
      </Link>

      <Link
        href={salirHref}
        className="acad-tools__btn"
        aria-label={ACAD_COPY.salirAria}
        title={ACAD_COPY.salirHint}
      >
        <AcadIcon name="log-out" size={20} />
        <span className="acad-tools__name">{ACAD_COPY.salir}</span>
      </Link>
    </div>
  )
}
