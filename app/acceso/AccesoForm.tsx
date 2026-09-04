'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { entrar } from './actions'

function Boton() {
  // useFormStatus lee el estado del formulario que lo contiene.
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="acceso-btn" disabled={pending}>
      {pending ? 'Entrando…' : 'Entrar'}
    </button>
  )
}

export default function AccesoForm() {
  const params = useSearchParams()
  const destino = params.get('destino') ?? '/academia'
  const [error, accion] = useActionState(entrar, null)

  return (
    <main className="acceso-page">
      {/* La acción corre en el servidor: la contraseña no pasa por el
          JavaScript de la página y es el servidor quien pone la cookie. */}
      <form className="acceso-card" action={accion}>
        <p className="eyebrow">AlphaDev Studios</p>
        <h1>Academia</h1>
        <p className="acceso-sub">Área privada. Entra con tu cuenta para continuar.</p>

        <input type="hidden" name="destino" value={destino} />

        <label className="acceso-label" htmlFor="email">Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          className="acceso-input"
          autoComplete="email"
          required
          autoFocus
        />

        <label className="acceso-label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          className="acceso-input"
          autoComplete="current-password"
          required
        />

        {error && <p className="acceso-error" role="alert">{error}</p>}

        <Boton />

        <p className="acceso-nota">
          ¿No tienes acceso? Escríbenos a{' '}
          <a href="mailto:hola@alphadev.studio">hola@alphadev.studio</a>.
        </p>
      </form>
    </main>
  )
}
