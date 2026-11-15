import { ACAD_COPY } from './copy'

export default function AcademiaLoading() {
  return (
    <div data-academia className="acad-skel acad-skel--pulse">
      <div className="acad-tools" aria-hidden="true">
        <div className="acad-tools__btn">
          <span className="acad-skel__block acad-skel__line" style={{ width: 80, height: 20 }} />
        </div>
        <div className="acad-tools__btn">
          <span className="acad-skel__block acad-skel__line" style={{ width: 100, height: 20 }} />
        </div>
        <div className="acad-tools__btn">
          <span className="acad-skel__block acad-skel__line" style={{ width: 60, height: 20 }} />
        </div>
      </div>

      <div className="acad-segs" aria-hidden="true" style={{ marginTop: '1.25rem' }}>
        <div className="acad-segs__track">
          <div className="acad-segs__seg" />
          <div className="acad-segs__seg" />
          <div className="acad-segs__seg" />
          <div className="acad-segs__seg" />
        </div>
      </div>

      <p className="acad-skel__msg" aria-live="polite">
        {ACAD_COPY.cargandoGuia}
      </p>

      <div className="acad-skel__block acad-skel__title" aria-hidden="true" />
      <div className="acad-skel__block acad-skel__para" aria-hidden="true" />
      <div className="acad-skel__code" aria-hidden="true" />
      <div className="acad-skel__block acad-skel__para" aria-hidden="true" />
    </div>
  )
}
