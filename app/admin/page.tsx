import type { Metadata } from 'next'
import AdminNav from './AdminNav'
import { calcularKpisMensajes, calcularKpisVentas } from '@/lib/kpis'

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function dinero(cents: number): string {
  return `US$${(cents / 100).toFixed(2)}`
}

const PERIODOS = [
  { clave: 'hoy', etiqueta: 'Hoy' },
  { clave: 'semana', etiqueta: 'Últimos 7 días' },
  { clave: 'mes', etiqueta: 'Últimos 30 días' },
  { clave: 'total', etiqueta: 'Desde siempre' },
] as const

export default async function ResumenAdminPage() {
  const [kpisVentas, kpisMensajes] = await Promise.all([calcularKpisVentas(), calcularKpisMensajes()])

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Resumen</h1>
          <p>Cómo se está moviendo la tienda y el inbox, de un vistazo.</p>
        </header>

        <AdminNav />

        <h2 className="kpi-section-title">Ventas</h2>
        <div className="kpi-grid">
          {PERIODOS.map(({ clave, etiqueta }) => {
            const r = kpisVentas[clave]
            return (
              <div className="kpi-card" key={clave}>
                <p className="kpi-card-periodo">{etiqueta}</p>
                <span className="kpi-card-num">{dinero(r.importeCents)}</span>
                <p className="kpi-card-sub">
                  {r.ventas} {r.ventas === 1 ? 'venta' : 'ventas'}
                  <br />
                  {r.nuevas} {r.nuevas === 1 ? 'nueva' : 'nuevas'} · {r.recurrentes}{' '}
                  {r.recurrentes === 1 ? 'recurrente' : 'recurrentes'}
                </p>
              </div>
            )
          })}
        </div>

        <h2 className="kpi-section-title">Mensajes recibidos</h2>
        <div className="kpi-grid">
          {PERIODOS.map(({ clave, etiqueta }) => (
            <div className="kpi-card" key={clave}>
              <p className="kpi-card-periodo">{etiqueta}</p>
              <span className="kpi-card-num">{kpisMensajes[clave]}</span>
            </div>
          ))}
        </div>

        <p className="adm-field-hint">
          &quot;Nueva&quot; es la primera compra de ese correo en la vida del negocio, no la primera
          del período. &quot;Recurrente&quot; es alguien que ya había comprado algo antes de esa venta.
        </p>
      </div>
    </div>
  )
}
