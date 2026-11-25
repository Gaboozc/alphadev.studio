'use client'

import { useEffect, useRef, useState } from 'react'
import type { Question } from '../types'
import { parseInline } from './LessonContent'
import AcadIcon from './AcadIcon'
import { ACAD_COPY } from '../copy'
import { listaEnEspanol } from '@/lib/academia/ui'

export default function ExamQuestions({
  questions,
  siguienteHref,
  siguienteNombre,
}: {
  questions: Question[]
  siguienteHref?: string | null
  siguienteNombre?: string | null
}) {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [corregido, setCorregido] = useState(false)
  const [actual, setActual] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)

  const contestadas = Object.keys(respuestas).length
  const aciertos = questions.reduce(
    (acc, q, i) => acc + (respuestas[i] === q.correct ? 1 : 0),
    0,
  )

  useEffect(() => {
    if (corregido) resultRef.current?.focus()
  }, [corregido])

  function elegir(preguntaIdx: number, opcionIdx: number) {
    if (corregido) return
    setRespuestas((prev) => ({ ...prev, [preguntaIdx]: opcionIdx }))
    setActual(preguntaIdx)
  }

  const incorrectas = questions
    .map((_, i) => i)
    .filter((i) => respuestas[i] !== questions[i].correct)

  return (
    <div className="acad-examen">
      {corregido && (
        <div
          className="acad-exam__result"
          ref={resultRef}
          tabIndex={-1}
        >
          <p className="acad-exam__score">
            {ACAD_COPY.correctasDe(aciertos, questions.length)}
          </p>
          <p className="acad-exam__note">{ACAD_COPY.autoevaluacion}</p>
          {incorrectas.length > 0 ? (
            <p className="acad-exam__note">
              {ACAD_COPY.nParaRepasar(
                incorrectas.length,
                listaEnEspanol(incorrectas.map((i) => String(i + 1))),
              )}
            </p>
          ) : null}

          <p className="acad-callout__label">{ACAD_COPY.irAPregunta}</p>
          <div className="acad-exam__map" role="navigation" aria-label={ACAD_COPY.irAPregunta}>
            {questions.map((_, i) => {
              const ok = respuestas[i] === questions[i].correct
              return (
                <button
                  key={i}
                  type="button"
                  className={`acad-exam__map-btn ${ok ? 'is-ok' : 'is-err'}${
                    actual === i ? ' is-current' : ''
                  }`}
                  aria-label={ACAD_COPY.preguntaEstado(
                    i + 1,
                    ok ? 'correcta' : 'incorrecta',
                  )}
                  onClick={() => {
                    setActual(i)
                    document.getElementById(`pregunta-${i}`)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <ol className="acad-examen-lista" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {questions.map((pregunta, qi) => {
          const elegida = respuestas[qi]

          return (
            <li
              key={qi}
              id={`pregunta-${qi}`}
              className="acad-examen-pregunta"
              style={{ marginBottom: '2rem' }}
            >
              <p className="acad-examen-enunciado" style={{ fontWeight: 600, marginBottom: '0.75rem' }}>
                <span>{qi + 1}. </span>
                {parseInline(pregunta.q)}
              </p>

              <div>
                {pregunta.options.map((opcion, oi) => {
                  const esElegida = elegida === oi
                  const esCorrecta = corregido && oi === pregunta.correct
                  const esFallada =
                    corregido && esElegida && oi !== pregunta.correct

                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => elegir(qi, oi)}
                      disabled={corregido}
                      className={
                        'acad-exam__opcion' +
                        (esElegida && !corregido ? ' is-elegida' : '') +
                        (esCorrecta ? ' is-correcta' : '') +
                        (esFallada ? ' is-fallada' : '')
                      }
                    >
                      <span className="acad-exam__opcion-texto">{parseInline(opcion)}</span>
                      {esFallada ? (
                        <span className="acad-exam__badge is-err">
                          <AcadIcon name="circle-x" size={16} />
                          {ACAD_COPY.tuRespuestaIncorrecta}
                        </span>
                      ) : null}
                      {esCorrecta ? (
                        <span className="acad-exam__badge is-ok">
                          <AcadIcon name="circle-check-big" size={16} />
                          {esElegida
                            ? ACAD_COPY.tuRespuestaCorrecta
                            : ACAD_COPY.correcta}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              {corregido ? (
                <p className="acad-exam__why">
                  <strong>{ACAD_COPY.porQue}</strong> {parseInline(pregunta.explanation)}
                </p>
              ) : null}
            </li>
          )
        })}
      </ol>

      {!corregido ? (
        <button
          type="button"
          className="acad-v3-btn acad-v3-btn--primary"
          disabled={contestadas < questions.length}
          onClick={() => setCorregido(true)}
        >
          {ACAD_COPY.revisaRespuestas}
        </button>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            type="button"
            className="acad-v3-btn acad-v3-btn--secondary"
            onClick={() => {
              setRespuestas({})
              setCorregido(false)
            }}
          >
            {ACAD_COPY.repetirCuestionario}
          </button>
          {siguienteHref && siguienteNombre && (
            <a href={siguienteHref} className="acad-v3-btn acad-v3-btn--primary">
              {ACAD_COPY.siguienteCon(siguienteNombre)}
            </a>
          )}
        </div>
      )}
    </div>
  )
}

