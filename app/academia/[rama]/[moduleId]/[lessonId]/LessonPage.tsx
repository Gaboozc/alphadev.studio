'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { Lesson, LessonMeta, ModuleMeta } from '../../../types'
import { moduleHref, lessonHref, ramaOfModule } from '../../../ramas'
import { useProgress } from '../../../hooks/useProgress'
import LessonContent from '../../../components/LessonContent'
import ProjectDetails from '../../../components/ProjectDetails'
import ExamQuestions from '../../../components/ExamQuestions'
import MediaEmbed from '../../../components/MediaEmbed'
import SegmentProgress from '../../../components/SegmentProgress'
import LessonToolbar from '../../../components/LessonToolbar'
import { LessonIndexPanel, LessonIndexSheet } from '../../../components/LessonIndex'
import AcadIcon, { type AcadIconName } from '../../../components/AcadIcon'
import { ACAD_COPY } from '../../../copy'
import { acentoDeRama, debeMostrarSegmentos, extraerH2, tipoDePieza } from '@/lib/academia/ui'

function getEmbedType(lesson: Lesson): 'youtube' | 'audio' | 'link' | null {
  if (!lesson.embedUrl) return null
  if (lesson.embedUrl.includes('youtube.com') || lesson.embedUrl.includes('youtu.be'))
    return 'youtube'
  if (lesson.type === 'audio') return 'audio'
  return 'link'
}

interface Props {
  module: ModuleMeta
  lesson: Lesson
  lessonIndex: number
  /** Orden 1…N en la rama (misma regla que el temario). */
  unidadNumero: number
  prevLesson: LessonMeta | null
  nextLesson: LessonMeta | null
}

export default function LessonPage({
  module: mod,
  lesson,
  lessonIndex,
  unidadNumero,
  prevLesson,
  nextLesson,
}: Props) {
  const { isCompleted, toggleLesson, hydrated } = useProgress()
  const done = isCompleted(mod.id, lesson.id)
  const embedType = getEmbedType(lesson)
  const secciones = extraerH2(lesson.content)
  const tipo = tipoDePieza(lesson.type)
  const rama = ramaOfModule(mod)
  const accent = acentoDeRama(rama.id)

  const [indiceOpen, setIndiceOpen] = useState(false)
  const indiceBtnWrap = useRef<HTMLDivElement>(null)

  const temarioHref = moduleHref(mod)
  const salirHref = `${moduleHref(mod)}#pieza-${lesson.id}`

  return (
    <div data-academia data-accent={accent} className="acad-lesson">
      <div ref={indiceBtnWrap}>
        <LessonToolbar
          indiceOpen={indiceOpen}
          onToggleIndice={() => setIndiceOpen((v) => !v)}
          temarioHref={temarioHref}
          salirHref={salirHref}
        />
      </div>

      {/* Segmentos en el primer viewport (≥2 h2); sin barra vacía si no aplica */}
      {debeMostrarSegmentos(secciones) ? (
        <div className="acad-lesson__segs-bar">
          <SegmentProgress secciones={secciones} />
        </div>
      ) : null}

      <div className="acad-lesson__grid">
        <aside className="acad-lesson__index-desktop">
          <LessonIndexPanel
            mod={mod}
            currentId={lesson.id}
            isCompleted={isCompleted}
            unidadNumero={unidadNumero}
            titleId="acad-indice-desktop"
          />
        </aside>

        <main className="acad-lesson__main">
          <div className="acad-lesson__meta" style={{ marginTop: '0.5rem' }}>
            <span>
              Pieza {lessonIndex + 1} de {mod.lessons.length}
            </span>
            <span className="acad-lesson__type">
              <AcadIcon name={tipo.icon as AcadIconName} size={16} />
              {tipo.label}
            </span>
          </div>

          <h1 className="acad-lesson__title">{lesson.title}</h1>

          {lesson.embedUrl && embedType && (
            <div style={{ marginBottom: '1.5rem' }}>
              <MediaEmbed type={embedType} url={lesson.embedUrl} title={lesson.title} />
            </div>
          )}

          <div className="lesson-card" style={{ background: 'var(--acad-card)', borderRadius: 12, padding: '0.25rem 0' }}>
            {lesson.type === 'exam' && lesson.questions ? (
              <ExamQuestions
                questions={lesson.questions}
                siguienteHref={nextLesson ? lessonHref(mod, nextLesson.id) : null}
                siguienteNombre={nextLesson?.title ?? null}
              />
            ) : lesson.type === 'project' ? (
              <ProjectDetails lesson={lesson} />
            ) : (
              <LessonContent
                content={lesson.content}
                tasks={lesson.tasks}
                tip={lesson.tip}
              />
            )}
          </div>

          {hydrated && (
            <div className="acad-lesson__nav">
              {prevLesson ? (
                <Link
                  href={lessonHref(mod, prevLesson.id)}
                  className="acad-v3-btn acad-v3-btn--secondary"
                >
                  {ACAD_COPY.seccionAnterior}
                </Link>
              ) : (
                <span />
              )}

              <button
                type="button"
                className="acad-v3-btn acad-v3-btn--secondary"
                onClick={() => toggleLesson(mod.id, lesson.id)}
              >
                {done ? ACAD_COPY.completada : ACAD_COPY.marcarComoLeida}
              </button>

              {nextLesson ? (
                <Link
                  href={lessonHref(mod, nextLesson.id)}
                  className="acad-v3-btn acad-v3-btn--primary"
                >
                  {ACAD_COPY.siguienteSeccion}
                </Link>
              ) : (
                <Link href={temarioHref} className="acad-v3-btn acad-v3-btn--primary">
                  {ACAD_COPY.temario}
                </Link>
              )}
            </div>
          )}
        </main>
      </div>

      {indiceOpen ? (
        <LessonIndexSheet
          open
          onClose={() => setIndiceOpen(false)}
          mod={mod}
          currentId={lesson.id}
          isCompleted={isCompleted}
          unidadNumero={unidadNumero}
          returnFocusRef={indiceBtnWrap}
        />
      ) : null}
    </div>
  )
}
