'use client'

import ErrorScreen from '@/components/ErrorScreen'
import { useLang } from '@/lib/i18n/LanguageContext'

export default function NotFoundContent() {
  const { dict } = useLang()
  const e = dict.errors

  return (
    <ErrorScreen
      label={e.not_found_label}
      title={e.not_found_title}
      body={e.not_found_body}
      acciones={[
        { label: e.home, href: '/', primary: true },
        { label: e.contact, href: '/contacto' },
      ]}
    />
  )
}
