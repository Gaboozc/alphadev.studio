import type { Metadata } from 'next'
import AdminNav from '../../AdminNav'
import GuiaForm from '../GuiaForm'

export const metadata: Metadata = {
  title: 'Nueva guía · Panel',
  robots: { index: false, follow: false },
}

export default function NuevaGuiaPage() {
  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Nueva guía</h1>
          <p>Se crea como borrador. Publícala desde la lista cuando esté lista.</p>
        </header>

        <AdminNav />

        <GuiaForm />
      </div>
    </div>
  )
}
