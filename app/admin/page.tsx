import type { Metadata } from 'next'
import AdminNav from './AdminNav'
import { calcularResumen, type TotalPorMoneda } from '@/lib/kpis'

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function dinero(cents: number, moneda: string): string {
  const simbolo = moneda === 'USD' ? 'US$' : moneda === 'MXN' ? 'MX$' : `${moneda} `
  return `${simbolo}${(cents / 100).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
}

/** "US$450.00 · MX$12,000.00" — nunca se suman monedas distintas en un solo número. */
function listaPorMoneda(porMoneda: TotalPorMoneda[]): string {
  if (porMoneda.length === 0) return '—'
  return porMoneda.map((m) => dinero(m.cents, m.moneda)).join(' · ')
}

function fechaLarga(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

export default async function ResumenAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ desde?: string; hasta?: string }>
}) {
  const { desde: desdeRaw, hasta: hastaRaw } = await searchParams
  const r = await calcularResumen(desdeRaw, hastaRaw)

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Resumen</h1>
          <p>
            Del {fechaLarga(r.desde)} al {fechaLarga(r.hasta)}.
          </p>
        </header>

        <AdminNav />

        {/* Formulario GET puro, sin JS: cambiar las fechas navega a la misma
            página con ?desde=&hasta=, que calcularResumen() ya sabe leer. */}
        <form method="get" className="kpi-rango-form">
          <div className="adm-field">
            <label htmlFor="desde">Desde</label>
            <input id="desde" name="desde" type="date" className="contact-input" defaultValue={r.desde} />
          </div>
          <div className="adm-field">
            <label htmlFor="hasta">Hasta</label>
            <input id="hasta" name="hasta" type="date" className="contact-input" defaultValue={r.hasta} />
          </div>
          <button type="submit" className="adm-btn adm-btn-primario">
            Aplicar
          </button>
        </form>

        <h2 className="kpi-section-title">Guías (PayPal)</h2>
        <div className="kpi-grid">
          <div className="kpi-card">
            <p className="kpi-card-periodo">Ventas</p>
            <span className="kpi-card-num">{r.guias.ventas}</span>
            <p className="kpi-card-sub">
              {r.guias.nuevas} {r.guias.nuevas === 1 ? 'nueva' : 'nuevas'} · {r.guias.recurrentes}{' '}
              {r.guias.recurrentes === 1 ? 'recurrente' : 'recurrentes'}
            </p>
          </div>
          <div className="kpi-card">
            <p className="kpi-card-periodo">Ingresos</p>
            <span className="kpi-card-num">{dinero(r.guias.importeCents, 'USD')}</span>
            <p className="kpi-card-sub">Siempre USD — es la única moneda que acepta la tienda</p>
          </div>
        </div>

        <h2 className="kpi-section-title">Servicios (registro manual)</h2>
        <div className="kpi-grid">
          <div className="kpi-card">
            <p className="kpi-card-periodo">Cerradas</p>
            <span className="kpi-card-num">{r.servicios.cerradas}</span>
            <p className="kpi-card-sub">{listaPorMoneda(r.servicios.porMoneda)}</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-card-periodo">Pendientes de cobro</p>
            <span className="kpi-card-num">{r.servicios.pendientes}</span>
          </div>
          <div className="kpi-card">
            <p className="kpi-card-periodo">Canceladas</p>
            <span className="kpi-card-num">{r.servicios.canceladas}</span>
          </div>
        </div>

        {r.porVendedor.length > 0 && (
          <>
            <h2 className="kpi-section-title">Por vendedor</h2>
            <div className="acad-tabla-wrap" style={{ marginBottom: '2.5rem' }}>
              <table className="acad-tabla">
                <thead>
                  <tr>
                    <th>Vendedor</th>
                    <th>Ventas cerradas</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {r.porVendedor.map((v) => (
                    <tr key={v.vendedor}>
                      <td>{v.vendedor}</td>
                      <td>{v.ventas}</td>
                      <td>{listaPorMoneda(v.porMoneda)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h2 className="kpi-section-title">Mensajes recibidos</h2>
        <div className="kpi-grid">
          <div className="kpi-card">
            <p className="kpi-card-periodo">En el rango</p>
            <span className="kpi-card-num">{r.mensajes}</span>
          </div>
        </div>

        <p className="adm-field-hint">
          &quot;Nueva&quot; (guías) es la primera compra de ese correo en la vida del negocio, no la
          primera del rango. Los totales de servicios nunca mezclan monedas: si vendiste en USD y en
          MXN, se muestran por separado.
        </p>
      </div>
    </div>
  )
}
