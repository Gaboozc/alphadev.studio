'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Rutas "bare": sin navbar/footer global (academia y tarjetas digitales)
  const bare =
    pathname.startsWith('/academia') ||
    pathname.startsWith('/tarjeta') ||
    pathname.startsWith('/acceso')

  return (
    <>
      {!bare && <Navbar />}
      <main>{children}</main>
      {!bare && <Footer />}
    </>
  )
}
