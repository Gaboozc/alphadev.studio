'use client'

import { useState, useEffect, type FormEvent } from 'react'

// Cambiá esta contraseña cuando quieras
const PASSWORD = 'windshare28'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  function submit(e: FormEvent) {
    e.preventDefault()
    if (input.trim() === PASSWORD) {
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  if (!hydrated) return null
  if (unlocked) return <>{children}</>

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          animation: shake ? 'academia-shake 0.45s ease' : 'none',
        }}
      >
        <style>{`
          @keyframes academia-shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-5px); }
            80%      { transform: translateX(5px); }
          }
        `}</style>

        {/* Logo / title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--gold)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            AlphaDev Studios
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.5rem',
            }}
          >
            Academia
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
            }}
          >
            Área privada — ingresá la contraseña para continuar.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              placeholder="Contraseña"
              autoFocus
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9375rem',
                color: 'var(--text)',
                background: 'var(--bg-card)',
                border: `1px solid ${error ? '#c0392b' : 'var(--border)'}`,
                borderRadius: '0.75rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 200ms ease',
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderColor = 'var(--gold-border)'
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderColor = 'var(--border)'
              }}
            />
            {error && (
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.8125rem',
                  color: '#c0392b',
                  marginTop: '0.5rem',
                }}
              >
                Contraseña incorrecta.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.875rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#fff',
              background: 'var(--gold)',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold-dark)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gold)' }}
          >
            Entrar →
          </button>
        </form>
      </div>
    </div>
  )
}
