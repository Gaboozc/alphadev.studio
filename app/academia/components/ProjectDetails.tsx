import type { Lesson } from '../types'
import LessonContent, { parseInline } from './LessonContent'

// Cuerpo de una lección `type: 'project'`.
//
// Existía desde que se diseñó el tipo de dato, pero LessonPage nunca lo
// renderizaba: solo pasaba `content`/`tasks`/`tip` a LessonContent, y un
// proyecto no tiene `content` — tiene `projectBrief`, `deliverables`,
// `rubrica` y `discussionPrompts`. El resultado era una página con el título
// y nada más, en las 92 lecciones de proyecto de toda la Academia.
export default function ProjectDetails({ lesson }: { lesson: Lesson }) {
  const { projectBrief, deliverables, rubrica, discussionPrompts, tasks, tip } = lesson

  return (
    <div className="acad-proyecto">
      {/* El brief es markdown como cualquier lección: reusa el mismo
          renderizador para que negrita, código y listas funcionen igual. */}
      {projectBrief && (
        <div style={{ marginBottom: deliverables?.length ? '1.5rem' : 0 }}>
          <LessonContent content={projectBrief} />
        </div>
      )}

      {deliverables && deliverables.length > 0 && (
        <section className="acad-proyecto-bloque">
          <p className="acad-proyecto-etiqueta">Entregables</p>
          <ul className="acad-proyecto-lista">
            {deliverables.map((d, i) => (
              <li key={i}>
                <span className="acad-proyecto-marca">▸</span>
                <span>{parseInline(d)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {rubrica && rubrica.length > 0 && (
        <section className="acad-proyecto-bloque">
          <p className="acad-proyecto-etiqueta">Qué se evalúa</p>
          <ul className="acad-proyecto-lista">
            {rubrica.map((r, i) => (
              <li key={i}>
                <span className="acad-proyecto-marca">✓</span>
                <span>{parseInline(r)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tasks && tasks.length > 0 && (
        <section className="acad-proyecto-bloque">
          <p className="acad-proyecto-etiqueta">Cómo abordarlo</p>
          <ol className="acad-proyecto-lista acad-proyecto-lista--numerada">
            {tasks.map((t, i) => (
              <li key={i}>
                <span className="acad-proyecto-numero">{i + 1}</span>
                <span>{parseInline(t)}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {discussionPrompts && discussionPrompts.length > 0 && (
        <section className="acad-proyecto-bloque">
          <p className="acad-proyecto-etiqueta">Para discutir</p>
          <ul className="acad-proyecto-lista">
            {discussionPrompts.map((p, i) => (
              <li key={i}>
                <span className="acad-proyecto-marca">?</span>
                <span>{parseInline(p)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tip && (
        <div className="acad-proyecto-tip">
          <p className="acad-proyecto-tip-etiqueta">Tip profesional</p>
          <p>{tip}</p>
        </div>
      )}
    </div>
  )
}
