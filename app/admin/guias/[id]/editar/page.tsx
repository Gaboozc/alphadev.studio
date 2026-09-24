import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AdminNav from '../../../AdminNav'
import GuiaForm from '../../GuiaForm'
import { guiaPorId } from '@/lib/guias'

export const metadata: Metadata = {
  title: 'Editar guía · Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function EditarGuiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const guia = await guiaPorId(id)
  if (!guia) notFound()

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Editar guía</h1>
          <p>{guia.titulo}</p>
        </header>

        <AdminNav />

        <GuiaForm guia={guia} />
      </div>
    </div>
  )
}
