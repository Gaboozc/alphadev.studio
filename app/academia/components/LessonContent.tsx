'use client'

// Renderizador de contenido de lección — soporta markdown simplificado:
//   ## Texto        → etiqueta de sección en dorado uppercase
//   **texto**       → negrita
//   `código`        → código en línea
//   ```lang ... ``` → bloque de código con scroll horizontal propio
//   - ítem          → ítem de lista con bullet dorado
//   1. ítem         → ítem de lista numerada, con el número en dorado
//   párrafo\n\n     → separador de párrafo

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'

interface Props {
  content?: string
  tasks?: string[]
  tip?: string
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: '0.625rem',
        margin: '0.875rem 0',
        overflow: 'hidden',
      }}
    >
      {lang && (
        <span
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.75rem',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-subtle)',
          }}
        >
          {lang}
        </span>
      )}
      {/* El scroll vive en este contenedor: la página nunca se desplaza en horizontal */}
      <pre
        style={{
          margin: 0,
          padding: lang ? '1.5rem 1.125rem 1.125rem' : '1.125rem',
          overflowX: 'auto',
          fontFamily: MONO,
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--text)',
          tabSize: 2,
        }}
      >
        <code style={{ fontFamily: MONO }}>{code}</code>
      </pre>
    </div>
  )
}

const INLINE_CODE_STYLE: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '0.85em',
  color: 'var(--gold-dark)',
  background: 'var(--gold-bg)',
  border: '1px solid var(--gold-border)',
  borderRadius: '0.25rem',
  padding: '0.1em 0.35em',
  whiteSpace: 'nowrap',
}

// `texto` → código en línea
function parseCodeSpans(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
      <code key={`${keyPrefix}-c${i}`} style={INLINE_CODE_STYLE}>
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  )
}

// **texto** → negrita. El código en línea se resuelve dentro de cada tramo,
// para que `código` funcione también anidado dentro de una negrita.
function parseInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`b${i}`} style={{ fontWeight: 600, color: 'var(--text)' }}>
          {parseCodeSpans(part.slice(2, -2), `b${i}`)}
        </strong>
      )
    }
    return <span key={`t${i}`}>{parseCodeSpans(part, `t${i}`)}</span>
  })
}

function parseContent(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []

  // Los bloques ``` se extraen ANTES de dividir por párrafos: contienen líneas
  // en blanco y el split por \n\n los partiría en pedazos.
  const segments = content.split(/```/)
  if (segments.length > 1) {
    segments.forEach((seg, i) => {
      if (i % 2 === 1) {
        // Segmento impar = dentro de un par de fences. La primera línea puede
        // ser el lenguaje (```bash), no parte del código.
        const nl = seg.indexOf('\n')
        const first = nl === -1 ? '' : seg.slice(0, nl).trim()
        const hasLang = nl !== -1 && /^[a-z0-9+#-]{1,15}$/i.test(first)
        const code = (hasLang ? seg.slice(nl + 1) : seg).replace(/^\n/, '').replace(/\n\s*$/, '')
        nodes.push(<CodeBlock key={`code-${i}`} lang={hasLang ? first : ''} code={code} />)
      } else if (seg.trim()) {
        nodes.push(...parseProse(seg, i))
      }
    })
    return nodes
  }

  return parseProse(content, 0)
}

// «1. » al principio de una línea. El número se conserva tal como se escribió
// en vez de generarlo con CSS: así una lista que empieza en 3 sigue diciendo 3.
const ORDERED = /^(\d+)\.\s+/

// Estilos compartidos por los ítems de las dos clases de lista.
const ITEM_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: 1.65,
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
}

const MARKER_STYLE: React.CSSProperties = {
  color: 'var(--gold)',
  fontSize: '0.75rem',
  fontWeight: 700,
  marginTop: '0.3rem',
  flexShrink: 0,
}

// El número ocupa un ancho fijo para que el texto de todos los ítems arranque
// en la misma columna, también al pasar de 9 a 10.
const NUMBER_STYLE: React.CSSProperties = {
  ...MARKER_STYLE,
  minWidth: '1.1rem',
  textAlign: 'right',
}

const LIST_STYLE: React.CSSProperties = {
  margin: '0.75rem 0',
  paddingLeft: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
}

// Para ítems sueltos en un bloque mixto: cada uno lleva su propia lista, así
// que el margen va apretado para que varios seguidos se lean como uno solo.
const LOOSE_LIST_STYLE: React.CSSProperties = { ...LIST_STYLE, margin: '0.1875rem 0' }

function parseProse(content: string, offset: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Dividimos por doble salto de línea primero (párrafos)
  const blocks = content.split(/\n\n+/)

  blocks.forEach((block, blockIdx) => {
    const lines = block.split('\n').filter((l) => l.trim().length > 0)

    // Verificar si el bloque es una lista
    const isListBlock = lines.length > 0 && lines.every((l) => l.trim().startsWith('- '))
    const isOrderedBlock = lines.length > 0 && lines.every((l) => ORDERED.test(l.trim()))

    if (isOrderedBlock) {
      nodes.push(
        <ol key={`olist-${offset}-${blockIdx}`} style={LIST_STYLE}>
          {lines.map((line, lineIdx) => {
            const trimmed = line.trim()
            const numero = trimmed.match(ORDERED)![1]
            return (
              <li key={lineIdx} style={ITEM_STYLE}>
                <span style={NUMBER_STYLE}>{numero}.</span>
                <span>{parseInline(trimmed.replace(ORDERED, ''))}</span>
              </li>
            )
          })}
        </ol>
      )
    } else if (isListBlock) {
      nodes.push(
        <ul key={`list-${offset}-${blockIdx}`} style={LIST_STYLE}>
          {lines.map((line, lineIdx) => (
            <li key={lineIdx} style={ITEM_STYLE}>
              <span style={MARKER_STYLE}>▸</span>
              <span>{parseInline(line.trim().slice(2))}</span>
            </li>
          ))}
        </ul>
      )
    } else {
      // Procesar línea por línea dentro del bloque (puede mezclar ## con texto)
      lines.forEach((line, lineIdx) => {
        const trimmed = line.trim()

        if (trimmed.startsWith('### ')) {
          // Subtítulo dentro de una sección
          nodes.push(
            <p
              key={`h3-${offset}-${blockIdx}-${lineIdx}`}
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: 'var(--text)',
                margin: '1.5rem 0 0.5rem',
              }}
            >
              {trimmed.slice(4)}
            </p>
          )
        } else if (trimmed.startsWith('## ')) {
          nodes.push(
            <p
              key={`h-${offset}-${blockIdx}-${lineIdx}`}
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
          // Ítem suelto dentro de un bloque mixto (una lista junto a un ##, por
          // ejemplo). Va envuelto en su <ul>: un <li> sin lista alrededor es
          // HTML inválido y un lector de pantalla lo anuncia como lista rota.
          nodes.push(
            <ul key={`li-${offset}-${blockIdx}-${lineIdx}`} style={LOOSE_LIST_STYLE}>
              <li style={ITEM_STYLE}>
                <span style={MARKER_STYLE}>▸</span>
                <span>{parseInline(trimmed.slice(2))}</span>
              </li>
            </ul>
          )
        } else if (ORDERED.test(trimmed)) {
          const numero = trimmed.match(ORDERED)![1]
          nodes.push(
            <ol
              key={`oli-${offset}-${blockIdx}-${lineIdx}`}
              start={Number(numero)}
              style={LOOSE_LIST_STYLE}
            >
              <li style={ITEM_STYLE}>
                <span style={NUMBER_STYLE}>{numero}.</span>
                <span>{parseInline(trimmed.replace(ORDERED, ''))}</span>
              </li>
            </ol>
          )
        } else {
          nodes.push(
            <p
              key={`p-${offset}-${blockIdx}-${lineIdx}`}
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
    <div className="lesson-content">
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
