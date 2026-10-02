import type { Metadata } from 'next'
import Link from 'next/link'
import AdminNav from '../AdminNav'
import { listarVentasServicios } from '@/lib/ventasServicios'
import { eliminarVentaServicioAction } from './actions'

export const metadata: Metadata = {
  title: 'Servicios · Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

const ETIQUETA_ESTADO: Record<string, string> = {
  pendiente: 'Pendiente',
  pagado: 'Pagado',
  cancelado: 'Cancelado',
}

function dinero(cents: number, moneda: string): string {
  const simbolo = moneda === 'USD' ? 'US$' : moneda === 'MXN' ? 'MX$' : `${moneda} `
  return `${simbolo}${(cents / 100).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`
}

function fecha(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00`),
  )
}

export default async function ServiciosAdminPage() {
  const ventas = await listarVentasServicios()

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Servicios</h1>
          <p>Ventas de sitios, paquetes y demás, registradas a mano — no pasan por PayPal.</p>
        </header>

        <AdminNav />

        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/admin/servicios/nueva" className="adm-btn adm-btn-primario">
            + Registrar venta
          </Link>
        </div>

        {ventas.length === 0 ? (
          <p className="adm-vacio">Todavía no hay ventas de servicios registradas.</p>
        ) : (
          <div className="acad-tabla-wrap">
            <table className="acad-tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Vendedor</th>
                  <th>Importe</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td>{fecha(v.fecha_venta)}</td>
                    <td>{v.cliente}</td>
                    <td>{v.servicio}</td>
                    <td>{v.vendedor}</td>
                    <td>{dinero(v.importe_cents, v.moneda)}</td>
                    <td>{ETIQUETA_ESTADO[v.estado] ?? v.estado}</td>
                    <td>
                      <div className="adm-acciones" style={{ border: 'none', paddingTop: 0 }}>
                        <Link href={`/admin/servicios/${v.id}/editar`} className="adm-btn">
                          Editar
                        </Link>
                        <form action={eliminarVentaServicioAction}>
                          <input type="hidden" name="id" value={v.id} />
                          <button type="submit" className="adm-btn">
                            Borrar
                          </button>
                        </form>
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
