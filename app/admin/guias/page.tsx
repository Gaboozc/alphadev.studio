import type { Metadata } from 'next'
import Link from 'next/link'
import AdminNav from '../AdminNav'
import { listarGuias } from '@/lib/guias'
import { cambiarPublicacion, eliminarGuia } from './actions'

export const metadata: Metadata = {
  title: 'Guías · Panel',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function precio(cents: number): string {
  return `US$${(cents / 100).toFixed(2)}`
}

function fecha(iso: string): string {
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(iso),
  )
}

export default async function GuiasAdminPage() {
  const guias = await listarGuias()

  return (
    <div className="acad-page">
      <div className="acad-wrap">
        <header className="acad-head">
          <p className="eyebrow">Panel</p>
          <h1>Guías</h1>
          <p>El catálogo de la tienda. Solo lo publicado aparece en /recursos.</p>
        </header>

        <AdminNav />

        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/admin/guias/nueva" className="adm-btn adm-btn-primario">
            + Nueva guía
          </Link>
        </div>

        {guias.length === 0 ? (
          <p className="adm-vacio">Todavía no hay guías cargadas.</p>
        ) : (
          <div className="acad-tabla-wrap">
            <table className="acad-tabla">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Creada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {guias.map((g) => (
                  <tr key={g.id}>
                    <td>
                      {g.titulo}
                      <br />
                      <span style={{ color: 'var(--text-subtle)', fontSize: '0.75rem' }}>/{g.slug}</span>
                    </td>
                    <td>{precio(g.precio_cents)}</td>
                    <td>{g.publicada ? 'Publicada' : 'Borrador'}</td>
                    <td>{fecha(g.creado_el)}</td>
                    <td>
                      <div className="adm-acciones" style={{ border: 'none', paddingTop: 0 }}>
                        <Link href={`/admin/guias/${g.id}/editar`} className="adm-btn">
                          Editar
                        </Link>
                        <form action={cambiarPublicacion}>
                          <input type="hidden" name="id" value={g.id} />
                          <input type="hidden" name="publicada" value={String(!g.publicada)} />
                          <button type="submit" className="adm-btn">
                            {g.publicada ? 'Despublicar' : 'Publicar'}
                          </button>
                        </form>
                        <form action={eliminarGuia}>
                          <input type="hidden" name="id" value={g.id} />
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
