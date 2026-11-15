'use client'

// Renderizador de contenido de lección — markdown simplificado (misma sintaxis).
// Visual Academia v3: V-01 código, V-02 avisos, G-05 anclas en h2.

import CodeBlock from './CodeBlock'
import HeadingAnchor from './HeadingAnchor'
import AcadIcon from './AcadIcon'
import { ACAD_COPY } from '../copy'
import { extraerH2 } from '@/lib/academia/ui'

interface Props {
  content?: string
  tasks?: string[]
  tip?: string
}

const INLINE_CODE_CLASS = 'acad-inline-code'

function parseCodeSpans(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
      <code key={`${keyPrefix}-c${i}`} className={INLINE_CODE_CLASS}>
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  )
}

export function parseInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`b${i}`} style={{ fontWeight: 600 }}>
          {parseCodeSpans(part.slice(2, -2), `b${i}`)}
        </strong>
      )
    }
    return <span key={`t${i}`}>{parseCodeSpans(part, `t${i}`)}</span>
  })
}

const ORDERED = /^(\d+)\.\s+/
const FILA = /^\|.*\|$/
const SEPARADORA = /^\|[\s:|-]+\|$/

function celdas(linea: string): string[] {
  return linea
    .slice(1, -1)
    .split('|')
    .map((c) => c.trim())
}

function Tabla({ lineas, clave }: { lineas: string[]; clave: string }) {
  const cabecera = celdas(lineas[0])
  const cuerpo = lineas.slice(2).map(celdas)

  return (
    <div key={clave} className="acad-tabla-wrap">
      <table className="acad-tabla">
        <thead>
          <tr>
            {cabecera.map((c, i) => (
              <th key={i}>{parseInline(c)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cuerpo.map((fila, i) => (
            <tr key={i}>
              {fila.map((c, j) => (
                <td key={j}>{parseInline(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function parseContent(content: string, slugByTitle: Map<string, string[]>): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const segments = content.split(/```/)
  if (segments.length > 1) {
    segments.forEach((seg, i) => {
      if (i % 2 === 1) {
        const nl = seg.indexOf('\n')
        const first = nl === -1 ? '' : seg.slice(0, nl).trim()
        const hasLang = nl !== -1 && /^[a-z0-9+#._-]{1,40}$/i.test(first)
        const code = (hasLang ? seg.slice(nl + 1) : seg).replace(/^\n/, '').replace(/\n\s*$/, '')
        nodes.push(<CodeBlock key={`code-${i}`} lang={hasLang ? first : ''} code={code} />)
      } else if (seg.trim()) {
        nodes.push(...parseProse(seg, i, slugByTitle))
      }
    })
    return nodes
  }
  return parseProse(content, 0, slugByTitle)
}

function nextSlug(title: string, slugByTitle: Map<string, string[]>): string {
  const queue = slugByTitle.get(title)
  if (queue && queue.length > 0) return queue.shift()!
  return title
}

function parseProse(
  content: string,
  offset: number,
  slugByTitle: Map<string, string[]>,
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const blocks = content.split(/\n\n+/)

  blocks.forEach((block, blockIdx) => {
    const lines = block.split('\n').filter((l) => l.trim().length > 0)
    const isListBlock = lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))
    const isOrderedBlock = lines.length > 0 && lines.every((l) => ORDERED.test(l.trim()))
    const isTableBlock =
      lines.length >= 3 &&
      lines.every((l) => FILA.test(l.trim())) &&
      SEPARADORA.test(lines[1].trim())

    if (isTableBlock) {
      nodes.push(
        <Tabla
          key={`tabla-${offset}-${blockIdx}`}
          clave={`tabla-${offset}-${blockIdx}`}
          lineas={lines.map((l) => l.trim())}
        />,
      )
    } else if (isOrderedBlock) {
      nodes.push(
        <ol key={`olist-${offset}-${blockIdx}`} className="acad-list">
          {lines.map((line, lineIdx) => {
            const trimmed = line.trim()
            const numero = trimmed.match(ORDERED)![1]
            return (
              <li key={lineIdx}>
                <span className="acad-list__mark">{numero}.</span>
                <span>{parseInline(trimmed.replace(ORDERED, ''))}</span>
              </li>
            )
          })}
        </ol>,
      )
    } else if (isListBlock) {
      nodes.push(
        <ul key={`list-${offset}-${blockIdx}`} className="acad-list">
          {lines.map((line, lineIdx) => (
            <li key={lineIdx}>
              <span className="acad-list__mark" aria-hidden="true">
                ▸
              </span>
              <span>{parseInline(line.trim().slice(2))}</span>
            </li>
          ))}
        </ul>,
      )
    } else {
      lines.forEach((line, lineIdx) => {
        const trimmed = line.trim()
        if (trimmed.startsWith('### ')) {
          nodes.push(
            <h3
              key={`h3-${offset}-${blockIdx}-${lineIdx}`}
              className="acad-h3 acad-lesson__h3"
            >
              {trimmed.slice(4)}
            </h3>,
          )
        } else if (trimmed.startsWith('## ')) {
          const title = trimmed.slice(3)
          const id = nextSlug(title, slugByTitle)
          nodes.push(
            <HeadingAnchor key={`h-${offset}-${blockIdx}-${lineIdx}`} id={id}>
              {title}
            </HeadingAnchor>,
          )
        } else if (trimmed.startsWith('- ')) {
          nodes.push(
            <ul key={`li-${offset}-${blockIdx}-${lineIdx}`} className="acad-list">
              <li>
                <span className="acad-list__mark" aria-hidden="true">
                  ▸
                </span>
                <span>{parseInline(trimmed.slice(2))}</span>
              </li>
            </ul>,
          )
        } else if (ORDERED.test(trimmed)) {
          const numero = trimmed.match(ORDERED)![1]
          nodes.push(
            <ol
              key={`oli-${offset}-${blockIdx}-${lineIdx}`}
              start={Number(numero)}
              className="acad-list"
            >
              <li>
                <span className="acad-list__mark">{numero}.</span>
                <span>{parseInline(trimmed.replace(ORDERED, ''))}</span>
              </li>
            </ol>,
          )
        } else {
          nodes.push(
            <p key={`p-${offset}-${blockIdx}-${lineIdx}`} className="acad-p">
              {parseInline(trimmed)}
            </p>,
          )
        }
      })
    }
  })

  return nodes
}

export default function LessonContent({ content, tasks, tip }: Props) {
  if (!content && !tasks?.length && !tip) return null

  const secciones = extraerH2(content)
  const slugByTitle = new Map<string, string[]>()
  for (const s of secciones) {
    const list = slugByTitle.get(s.title) ?? []
    list.push(s.slug)
    slugByTitle.set(s.title, list)
  }

  return (
    <div className="lesson-content acad-lesson__body">
      {content && (
        <div style={{ marginBottom: tasks?.length || tip ? '1.25rem' : 0 }}>
          {parseContent(content, slugByTitle)}
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div className="acad-callout acad-callout--info">
          <span className="acad-callout__icon">
            <AcadIcon name="info" size={20} />
          </span>
          <div>
            <p className="acad-callout__label">{ACAD_COPY.tareas}</p>
            <ol className="acad-list">
              {tasks.map((task, idx) => (
                <li key={idx}>
                  <span className="acad-list__mark">{idx + 1}.</span>
                  <span>{task}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {tip && (
        <div className="acad-callout acad-callout--aviso">
          <span className="acad-callout__icon">
            <AcadIcon name="triangle-alert" size={20} />
          </span>
          <div>
            <p className="acad-callout__label">{ACAD_COPY.tipProfesional}</p>
            <p className="acad-callout__text">{tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}
