'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AccesoForm() {
  const router = useRouter()
  const params = useSearchParams()
  const destino = params.get('destino') || '/academia'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setError('')
    setEnviando(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      // Mensaje único: no revelamos si el correo existe o si falló la
      // contraseña. Ver la lección w5-l2 de la Academia.
      setError('Correo o contraseña incorrectos.')
      setPassword('')
      setEnviando(false)
      return
    }

    // refresh() hace que el servidor vuelva a evaluar la sesión antes de navegar.
    router.replace(destino)
    router.refresh()
  }

  return (
    <main className="acceso-page">
      <form className="acceso-card" onSubmit={entrar}>
        <p className="eyebrow">AlphaDev Studios</p>
        <h1>Academia</h1>
        <p className="acceso-sub">Área privada. Entra con tu cuenta para continuar.</p>

        <label className="acceso-label" htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          className="acceso-input"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          autoComplete="email"
          required
          autoFocus
        />

        <label className="acceso-label" htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          className="acceso-input"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
          autoComplete="current-password"
          required
        />

        {error && <p className="acceso-error" role="alert">{error}</p>}

        <button type="submit" className="acceso-btn" disabled={enviando}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="acceso-nota">
          ¿No tienes acceso? Escríbenos a{' '}
          <a href="mailto:hola@alphadev.studio">hola@alphadev.studio</a>.
        </p>
      </form>
    </main>
  )
}
