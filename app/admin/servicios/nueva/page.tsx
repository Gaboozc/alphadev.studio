import type { Metadata } from 'next'
import AdminNav from '../../AdminNav'
import VentaServicioForm from '../VentaServicioForm'

export const metadata: Metadata = {
  title: 'Registrar venta · Panel',
  robots: { index: false, follow: false },
}

export default function NuevaVentaServicioPage() {
  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Registrar venta</h1>
          <p>Una venta de servicio cerrada a mano, no una compra de guía por PayPal.</p>
        </header>

        <AdminNav />

        <VentaServicioForm />
      </div>
    </div>
  )
}
