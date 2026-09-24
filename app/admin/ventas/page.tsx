import type { Metadata } from 'next'
import AdminNav from '../AdminNav'
import { listarVentas, totalesPorGuia } from '@/lib/ventas'
import { reenviarVenta, revocarVentaAction } from './actions'

export const metadata: Metadata = {
  title: 'Ventas · Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function precio(cents: number): string {
  return `US$${(cents / 100).toFixed(2)}`
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

export default async function VentasAdminPage() {
  const [ventas, totales] = await Promise.all([listarVentas(), totalesPorGuia()])

  const totalVendido = ventas
    .filter((v) => v.estado === 'pagada')
    .reduce((acc, v) => acc + v.importe_cents, 0)

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Ventas</h1>
          <p>
            {ventas.length} {ventas.length === 1 ? 'venta registrada' : 'ventas registradas'} ·{' '}
            {precio(totalVendido)} en total
          </p>
        </header>

        <AdminNav />

        {totales.length > 0 && (
          <div className="acad-tabla-wrap" style={{ marginBottom: '2rem' }}>
            <table className="acad-tabla">
              <thead>
                <tr>
                  <th>Guía</th>
                  <th>Ventas</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {totales.map((t) => {
                  const venta = ventas.find((v) => v.guia_id === t.guia_id)
                  return (
                    <tr key={t.guia_id}>
                      <td>{venta?.guia_titulo ?? t.guia_id}</td>
                      <td>{t.ventas}</td>
                      <td>{precio(t.importe_cents)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {ventas.length === 0 ? (
          <p className="adm-vacio">Todavía no hay ventas.</p>
        ) : (
          <div className="acad-tabla-wrap">
            <table className="acad-tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Guía</th>
                  <th>Correo</th>
                  <th>Importe</th>
                  <th>Estado</th>
                  <th>Descargas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td>{fecha(v.creado_el)}</td>
                    <td>{v.guia_titulo}</td>
                    <td>{v.email}</td>
                    <td>{precio(v.importe_cents)}</td>
                    <td>{v.estado === 'pagada' ? 'Pagada' : 'Reembolsada'}</td>
                    <td>{v.descargas} / 5</td>
                    <td>
                      <div className="adm-acciones" style={{ border: 'none', paddingTop: 0 }}>
                        <form action={reenviarVenta}>
                          <input type="hidden" name="id" value={v.id} />
                          <input type="hidden" name="email" value={v.email} />
                          <input type="hidden" name="guia_id" value={v.guia_id} />
                          <button type="submit" className="adm-btn" disabled={v.estado !== 'pagada'}>
                            Reenviar
                          </button>
                        </form>
                        {v.estado === 'pagada' && (
                          <form action={revocarVentaAction}>
                            <input type="hidden" name="id" value={v.id} />
                            <button type="submit" className="adm-btn">
                              Revocar
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
