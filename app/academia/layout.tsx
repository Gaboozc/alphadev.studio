import type { Metadata } from 'next'
import PasswordGate from './components/PasswordGate'

// Prevent search engines from indexing /academia and its subroutes
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
  return <PasswordGate>{children}</PasswordGate>
}
