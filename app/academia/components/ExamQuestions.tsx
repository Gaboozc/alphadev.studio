'use client'

import { useState } from 'react'
import type { Question } from '../types'
import { parseInline } from './LessonContent'

// Cuerpo de una lección `type: 'exam'`.
//
// Como ProjectDetails: el tipo `questions` existe en Lesson desde siempre,
// pero ningún componente lo leía. LessonPage solo pasaba `content`/`tasks`/
// `tip`, y un examen no tiene ninguno de los tres — tiene `questions`. El
// resultado eran las 30 lecciones de examen de la Academia mostrando el
// título y nada debajo.
//
// Cliente porque necesita estado: qué opción marcó cada pregunta, y si ya
// se corrigió. Nada de esto se guarda — es autoevaluación, no una nota.
export default function ExamQuestions({ questions }: { questions: Question[] }) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [corregido, setCorregido] = useState(false)

  const contestadas = Object.keys(respuestas).length
  const aciertos = questions.reduce(
    (acc, q, i) => acc + (respuestas[i] === q.correct ? 1 : 0),
    0,
  )

  function elegir(preguntaIdx: number, opcionIdx: number) {
    if (corregido) return // no se puede cambiar la respuesta tras corregir
    setRespuestas((prev) => ({ ...prev, [preguntaIdx]: opcionIdx }))
  }

  return (
    <div className="acad-examen">
      {corregido && (
        <div className="acad-examen-resultado">
          <span className="acad-examen-resultado-num">
            {aciertos}/{questions.length}
          </span>
          <span>respuestas correctas</span>
        </div>
      )}

      <ol className="acad-examen-lista">
        {questions.map((pregunta, qi) => {
          const elegida = respuestas[qi]
          const acerto = corregido && elegida === pregunta.correct
          const fallo = corregido && elegida !== undefined && elegida !== pregunta.correct

          return (
            <li key={qi} className="acad-examen-pregunta">
              <p className="acad-examen-enunciado">
                <span className="acad-examen-num">{qi + 1}.</span> {parseInline(pregunta.q)}
              </p>

              <div className="acad-examen-opciones">
                {pregunta.options.map((opcion, oi) => {
                  const esElegida = elegida === oi
                  const esCorrecta = corregido && oi === pregunta.correct
                  const esFallada = corregido && esElegida && oi !== pregunta.correct

                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => elegir(qi, oi)}
                      disabled={corregido}
                      className={
                        'acad-examen-opcion' +
                        (esElegida && !corregido ? ' is-elegida' : '') +
                        (esCorrecta ? ' is-correcta' : '') +
                        (esFallada ? ' is-fallada' : '')
                      }
                    >
                      <span className="acad-examen-opcion-marca">
                        {esCorrecta ? '✓' : esFallada ? '✕' : ''}
                      </span>
                      <span>{parseInline(opcion)}</span>
                    </button>
                  )
                })}
              </div>

              {(acerto || fallo) && (
                <p className={`acad-examen-explicacion${acerto ? ' is-correcta' : ' is-fallada'}`}>
                  {parseInline(pregunta.explanation)}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {!corregido ? (
        <button
          type="button"
          className="acad-examen-corregir"
          disabled={contestadas < questions.length}
          onClick={() => setCorregido(true)}
        >
          {contestadas < questions.length
            ? `Responde las ${questions.length - contestadas} que faltan`
            : 'Corregir respuestas'}
        </button>
      ) : (
        <button
          type="button"
          className="acad-examen-corregir acad-examen-corregir--secundario"
          onClick={() => {
            setRespuestas({})
            setCorregido(false)
          }}
        >
          Volver a intentar
        </button>
      )}
    </div>
  )
}
