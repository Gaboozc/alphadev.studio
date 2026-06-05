'use client'

// Renderizador de contenido de lección — soporta markdown simplificado:
//   ## Texto        → etiqueta de sección en dorado uppercase
//   **texto**       → negrita
//   - ítem          → ítem de lista con bullet dorado
//   párrafo\n\n     → separador de párrafo

interface Props {
  content?: string
  tasks?: string[]
  tip?: string
}

function parseInline(text: string): React.ReactNode[] {
  // Convierte **texto** en <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 600, color: 'var(--text)' }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function parseContent(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Dividimos por doble salto de línea primero (párrafos)
  const blocks = content.split(/\n\n+/)

  blocks.forEach((block, blockIdx) => {
    const lines = block.split('\n').filter((l) => l.trim().length > 0)

    // Verificar si el bloque es una lista
    const isListBlock = lines.every((l) => l.trim().startsWith('- '))

    if (isListBlock) {
      nodes.push(
        <ul
          key={`list-${blockIdx}`}
          style={{
            margin: '0.75rem 0',
            paddingLeft: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
          }}
        >
          {lines.map((line, lineIdx) => (
            <li
              key={lineIdx}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  color: 'var(--gold)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginTop: '0.3rem',
                  flexShrink: 0,
                }}
              >
                ▸
              </span>
              <span>{parseInline(line.trim().slice(2))}</span>
            </li>
          ))}
        </ul>
      )
    } else {
      // Procesar línea por línea dentro del bloque (puede mezclar ## con texto)
      lines.forEach((line, lineIdx) => {
        const trimmed = line.trim()

        if (trimmed.startsWith('## ')) {
          nodes.push(
            <p
              key={`h-${blockIdx}-${lineIdx}`}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '1.25rem 0 0.375rem',
              }}
            >
              {trimmed.slice(3)}
            </p>
          )
        } else if (trimmed.startsWith('- ')) {
          // Lista individual dentro de bloque mixto
          nodes.push(
            <li
              key={`li-${blockIdx}-${lineIdx}`}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                listStyle: 'none',
                marginLeft: 0,
                paddingLeft: 0,
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.3rem', flexShrink: 0 }}>▸</span>
              <span>{parseInline(trimmed.slice(2))}</span>
            </li>
          )
        } else {
          nodes.push(
            <p
              key={`p-${blockIdx}-${lineIdx}`}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                margin: '0.625rem 0',
              }}
            >
              {parseInline(trimmed)}
            </p>
          )
        }
      })
    }
  })

  return nodes
}

export default function LessonContent({ content, tasks, tip }: Props) {
  if (!content && !tasks?.length && !tip) return null

  return (
    <div
      style={{
        paddingLeft: '2.625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      {/* Cuerpo principal de la lección */}
      {content && (
        <div style={{ marginBottom: tasks?.length || tip ? '1.25rem' : 0 }}>
          {parseContent(content)}
        </div>
      )}

      {/* Sección de tareas */}
      {tasks && tasks.length > 0 && (
        <div
          style={{
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            marginBottom: tip ? '0.875rem' : 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'var(--text-subtle)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Tareas
          </p>
          <ol
            style={{
              paddingLeft: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {tasks.map((task, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '1.25rem',
                    height: '1.25rem',
                    borderRadius: '50%',
                    border: '1.5px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    marginTop: '1px',
                    flexDirection: 'column',
                  }}
                >
                  {idx + 1}
                </span>
                {task}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Tip profesional */}
      {tip && (
        <div
          style={{
            borderLeft: '3px solid var(--gold)',
            paddingLeft: '1rem',
            paddingTop: '0.625rem',
            paddingBottom: '0.625rem',
            background: 'var(--gold-bg)',
            borderRadius: '0 0.5rem 0.5rem 0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}
          >
            Tip profesional
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {tip}
          </p>
        </div>
      )}
    </div>
  )
}
