import type { Metadata } from 'next'
import AcademiaContent from './AcademiaContent'

export const metadata: Metadata = {
  title: 'Academia',
  robots: { index: false, follow: false },
}

export default function AcademiaPage() {
  return <AcademiaContent />
}
