'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import LanguageToggle from './LanguageToggle';
import navbarLogo from '../assets/footer-logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dict } = useLang();
  const pathname = usePathname();

  // El home tiene hero de video a pantalla completa: el navbar se revela al
  // hacer scroll. En el resto de las rutas debe verse desde que entrás.
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visible = isHome ? isScrolled : true;
  const solid = isScrolled || !isHome;

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/servicios', label: dict.nav.services },
    { href: '/portafolio', label: dict.nav.portfolio },
    { href: '/proceso', label: dict.nav.process },
    { href: '/contacto', label: dict.nav.contact },
  ];

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}
    >

      {/* Main pill */}
      <nav className={`rounded-2xl px-5 py-2 flex items-center justify-between gap-4 transition-all duration-300 ${
        solid ? 'nav-pill--scrolled' : 'nav-pill'
      }`}>

        {/* Wordmark */}
        <Link href="/" onClick={closeMenu} className="flex-shrink-0">
          <Image
            src={navbarLogo}
            alt="AlphaDev Studios"
            height={64}
            priority
            style={{ width: 'auto', height: '30px' }}
            className="md:!h-[40px]"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm flex-1 justify-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <LanguageToggle />
          <Link href="/contacto" className="btn-glow text-sm py-2 px-4">
            {dict.nav.cta}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span className="text-base leading-none select-none">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden mt-2 rounded-2xl px-5 py-4 flex flex-col gap-1"
          style={{
            background: 'rgba(250,250,247,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 32px rgba(26,21,18,0.1)',
          }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="py-2.5 text-sm font-medium transition-colors border-b last:border-0"
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-3 mt-1">
            <LanguageToggle />
            <Link href="/contacto" className="btn-glow text-sm py-2 px-4" onClick={closeMenu}>
              {dict.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
