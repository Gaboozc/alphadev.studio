import type { Metadata } from 'next'
import PasswordGate from './components/PasswordGate'
import AcademiaNav from './components/AcademiaNav'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordGate>
      <AcademiaNav />
      <div style={{ paddingTop: '3.5rem' }}>
        {children}
      </div>
    </PasswordGate>
  )
}
