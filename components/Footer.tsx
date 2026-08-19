'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageContext';

import Image from 'next/image';
import footerLogo from '../assets/footer-logo.png';

const COMPANY_HREFS = ['/portafolio', '/proceso', '/contacto'];
const SERVICE_HREF = '/servicios';

export default function Footer() {
  const { dict } = useLang();
  const f = dict.footer;

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
      }}
    >
      <div className="section-container pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">

              <Image
                src={footerLogo}
                alt="AlphaDev Studios"
                width={320}
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />

            </Link>

            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-subtle)' }}
            >
              {f.tagline}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {f.services_title}
            </h4>

            <ul className="space-y-2 text-sm">
              {f.services_links.map((label: string) => (
                <li key={label}>
                  <Link
                    href={SERVICE_HREF}
                    className="transition-colors hover:text-[--gold]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {f.company_title}
            </h4>

            <ul className="space-y-2 text-sm">
              {f.company_links.map((label: string, i: number) => (
                <li key={label}>
                  <Link
                    href={COMPANY_HREFS[i]}
                    className="transition-colors hover:text-[--gold]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {f.contact_title}
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:zavarsegabriel@gmail.com"
                  className="transition-colors hover:text-[--gold]"
                >
                  zavarsegabriel@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14076867561"
                  className="transition-colors hover:text-[--gold]"
                >
                  +1 (407) 686-7561 · US
                </a>
              </li>
              <li>
                <a
                  href="tel:+525637113563"
                  className="transition-colors hover:text-[--gold]"
                >
                  +52 56 3711 3563 · MX
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/alphadev.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[--gold]"
                >
                  @alphadev.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ color: 'var(--text-subtle)' }}>
            {f.rights}
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors hover:text-[--gold]"
            >
              {f.privacy}
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[--gold]"
            >
              {f.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}