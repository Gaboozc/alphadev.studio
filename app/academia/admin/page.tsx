import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { ESTADOS, conteoPorEstado, listarMensajes, type Estado } from '@/lib/mensajes'
import { marcarEstado } from './actions'

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

// El panel muestra lo que hay ahora, no una copia cacheada.
export const dynamic = 'force-dynamic'

const ETIQUETA: Record<Estado, string> = {
  nuevo: 'Nuevos',
  leido: 'Leídos',
  respondido: 'Respondidos',
  archivado: 'Archivados',
}

const CATEGORIA: Record<string, string> = {
  consultation: 'Consultoría',
  app: 'Aplicación',
  internal: 'Interno',
  api: 'API / Integración',
  other: 'Otro',
}

// Los botones que se ofrecen según dónde está el mensaje. Un mensaje nuevo no
// necesita un botón "marcar como nuevo".
const SIGUIENTES: Record<Estado, Estado[]> = {
  nuevo: ['leido', 'respondido', 'archivado'],
  leido: ['respondido', 'archivado'],
  respondido: ['archivado'],
  archivado: ['nuevo'],
}

const ACCION: Record<Estado, string> = {
  nuevo: 'Reabrir',
  leido: 'Marcar leído',
  respondido: 'Respondido',
  archivado: 'Archivar',
}

function fecha(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>
}) {
  const { estado: pedido } = await searchParams
  const filtro = (ESTADOS as readonly string[]).includes(pedido ?? '')
    ? (pedido as Estado)
    : 'nuevo'

  const [mensajes, conteo] = await Promise.all([listarMensajes(filtro), conteoPorEstado()])

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <Link href="/academia" className="acad-crumb">
          <span style={{ display: 'flex', transform: 'rotate(180deg)' }}>
            <Icon name="arrowRight" size={14} />
          </span>
          Volver a la Academia
        </Link>

        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Inbox</h1>
          <p>Mensajes recibidos por el formulario de contacto del sitio.</p>
        </header>

        {/* ── Filtros por estado ── */}
        <nav className="adm-tabs" aria-label="Filtrar por estado">
          {ESTADOS.map((e) => (
            <Link
              key={e}
              href={`/academia/admin?estado=${e}`}
              className={`adm-tab${e === filtro ? ' is-active' : ''}`}
              aria-current={e === filtro ? 'page' : undefined}
            >
              {ETIQUETA[e]}
              <span className="adm-tab-count">{conteo[e]}</span>
            </Link>
          ))}
        </nav>

        {/* ── Lista ── */}
        {mensajes.length === 0 ? (
          <p className="adm-vacio">No hay mensajes en {ETIQUETA[filtro].toLowerCase()}.</p>
        ) : (
          <ul className="adm-lista">
            {mensajes.map((m) => (
              <li key={m.id} className="adm-mensaje">
                <div className="adm-mensaje-head">
                  <div style={{ minWidth: 0 }}>
                    <p className="adm-nombre">{m.nombre}</p>
                    <a href={`mailto:${m.email}`} className="adm-email">
                      {m.email}
                    </a>
                    {m.empresa && <span className="adm-empresa"> · {m.empresa}</span>}
                  </div>
                  <time className="adm-fecha" dateTime={m.creado_el}>
                    {fecha(m.creado_el)}
                  </time>
                </div>

                <div className="adm-chips">
                  <span className="adm-chip">{CATEGORIA[m.categoria] ?? m.categoria}</span>
                  {m.extra &&
                    Object.entries(m.extra).map(([k, v]) => (
                      <span key={k} className="adm-chip">
                        {k}: {v}
                      </span>
                    ))}
                </div>

                <p className="adm-cuerpo">{m.mensaje}</p>

                <div className="adm-acciones">
                  {SIGUIENTES[m.estado].map((destino) => (
                    <form key={destino} action={marcarEstado}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="estado" value={destino} />
                      <button type="submit" className="adm-btn">
                        {ACCION[destino]}
                      </button>
                    </form>
                  ))}
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent('Re: tu mensaje en AlphaDev Studios')}`}
                    className="adm-btn adm-btn-primario"
                  >
                    Responder
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
