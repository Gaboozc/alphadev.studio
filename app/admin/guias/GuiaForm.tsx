'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { clienteDeSubida } from '@/lib/supabase/browser'
import { guardarGuia, prepararSubida, type ResultadoGuardar } from './actions'
import type { Guia } from '@/lib/guias'

function BotonGuardar() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="adm-btn adm-btn-primario" disabled={pending}>
      {pending ? 'Guardando…' : 'Guardar'}
    </button>
  )
}

/**
 * Alta y edición de una guía. La subida del PDF pasa DIRECTO del navegador a
 * Storage con una signed upload URL (`prepararSubida`, Server Action) —
 * nunca por una función de Vercel, que tiene un límite de payload que una
 * guía con imágenes supera fácil.
 */
export default function GuiaForm({ guia }: { guia?: Guia }) {
  const [estado, accion] = useActionState<ResultadoGuardar | null, FormData>(guardarGuia, null)

  const [slug, setSlug] = useState(guia?.slug ?? '')
  const [archivo, setArchivo] = useState(guia?.archivo ?? '')
  const [subiendo, setSubiendo] = useState(false)
  const [errorSubida, setErrorSubida] = useState<string | null>(null)

  async function alElegirArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // permite volver a elegir el mismo archivo si falla
    if (!file) return

    setErrorSubida(null)

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      setErrorSubida('Escribe primero un slug válido (minúsculas y guiones).')
      return
    }

    setSubiendo(true)
    try {
      const prep = await prepararSubida(slug, file.name)
      if (!prep.ok) {
        setErrorSubida(prep.motivo)
        return
      }

      const supabase = clienteDeSubida()
      const { error } = await supabase.storage.from('guias').uploadToSignedUrl(prep.ruta, prep.token, file)
      if (error) {
        setErrorSubida(error.message)
        return
      }

      setArchivo(prep.ruta)
    } catch {
      setErrorSubida('No se pudo subir el archivo. Inténtalo de nuevo.')
    } finally {
      setSubiendo(false)
    }
  }

  return (
    <form action={accion} className="adm-form">
      {guia && <input type="hidden" name="id" value={guia.id} />}
      <input type="hidden" name="archivo" value={archivo} />

      {estado && !estado.ok && <p className="contact-error">{estado.motivo}</p>}

      <div className="adm-field">
        <label htmlFor="slug">Slug (parte de la URL, no se puede cambiar después de vender)</label>
        <input
          id="slug"
          name="slug"
          className="contact-input"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
          placeholder="seo-local-2026"
          required
          // readOnly, NO disabled: un <input disabled> no manda su valor con
          // el formulario (lo excluye el propio navegador), así que editar
          // con disabled aquí hacía llegar el slug vacío al servidor y
          // fallaba siempre con "slug inválido". readOnly bloquea la edición
          // y sí viaja en el FormData.
          readOnly={Boolean(guia)}
          aria-readonly={Boolean(guia)}
        />
      </div>

      <div className="adm-field-row">
        <div className="adm-field">
          <label htmlFor="titulo">Título (español)</label>
          <input
            id="titulo"
            name="titulo"
            className="contact-input"
            defaultValue={guia?.titulo}
            required
          />
        </div>
        <div className="adm-field">
          <label htmlFor="titulo_en">Título (inglés, opcional)</label>
          <input id="titulo_en" name="titulo_en" className="contact-input" defaultValue={guia?.titulo_en ?? ''} />
        </div>
      </div>

      <div className="adm-field-row">
        <div className="adm-field">
          <label htmlFor="descripcion">Descripción (español)</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="contact-input"
            rows={4}
            defaultValue={guia?.descripcion}
            required
          />
        </div>
        <div className="adm-field">
          <label htmlFor="descripcion_en">Descripción (inglés, opcional)</label>
          <textarea
            id="descripcion_en"
            name="descripcion_en"
            className="contact-input"
            rows={4}
            defaultValue={guia?.descripcion_en ?? ''}
          />
        </div>
      </div>

      <div className="adm-field">
        <label htmlFor="precio_usd">Precio en USD</label>
        <input
          id="precio_usd"
          name="precio_usd"
          className="contact-input"
          type="number"
          min="1"
          step="0.01"
          defaultValue={guia ? (guia.precio_cents / 100).toFixed(2) : ''}
          required
        />
      </div>

      <div className="adm-field">
        <label htmlFor="portada">Portada (URL de una imagen ya alojada, opcional)</label>
        <input id="portada" name="portada" className="contact-input" defaultValue={guia?.portada ?? ''} />
      </div>

      <div className="adm-field">
        <span>PDF de la guía</span>
        <div className="adm-upload">
          {/* El <input type="file"> nativo sin estilo se ve como un control
              roto al lado del resto del formulario ("Choose File" gris del
              navegador) — se oculta y un <label> con pinta de botón hace de
              disparador. Clickear un <label htmlFor> de un input disabled no
              hace nada, así que no hace falta más lógica para el estado
              "subiendo". */}
          <label htmlFor="pdf" className={`adm-btn${subiendo ? ' adm-upload-trigger-disabled' : ''}`}>
            {archivo ? 'Cambiar PDF' : 'Elegir PDF'}
          </label>
          <input
            id="pdf"
            type="file"
            accept="application/pdf"
            onChange={alElegirArchivo}
            disabled={subiendo}
            className="adm-upload-input"
          />
          {subiendo && <span className="adm-upload-status">Subiendo…</span>}
          {!subiendo && archivo && <span className="adm-upload-status is-ok">✓ {archivo}</span>}
        </div>
        {errorSubida && <p className="contact-error">{errorSubida}</p>}
        <p className="adm-field-hint">
          Sube directo a Storage, sin pasar por el servidor: los PDF con imágenes pueden pesar varios MB.
        </p>
      </div>

      <div>
        <BotonGuardar />
      </div>
    </form>
  )
}
