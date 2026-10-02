import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AdminNav from '../../../AdminNav'
import VentaServicioForm from '../../VentaServicioForm'
import { ventaServicioPorId } from '@/lib/ventasServicios'

export const metadata: Metadata = {
  title: 'Editar venta · Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function EditarVentaServicioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const venta = await ventaServicioPorId(id)
  if (!venta) notFound()

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Editar venta</h1>
          <p>
            {venta.cliente} — {venta.servicio}
          </p>
        </header>

        <AdminNav />

        <VentaServicioForm venta={venta} />
      </div>
    </div>
  )
}
