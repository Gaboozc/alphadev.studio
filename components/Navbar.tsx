'use client';

import { useState, useEffect } from 'react';
import SiteLink from '@/components/SiteLink';
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/i18n/LanguageContext';
import { stripLocale } from '@/lib/i18n/routes';
import Image from 'next/image';
import LanguageToggle from './LanguageToggle';
import navbarLogo from '../assets/footer-logo.png';

const LINK_NUMBERS = ['01', '02', '03', '04', '05', '06'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dict } = useLang();
  const rawPathname = usePathname();
  // Rutas canónicas (sin el prefijo /en): es lo que navLinks usa para
  // comparar, así que /en/servicios sigue reconociéndose como "/servicios".
  const { path: pathname } = stripLocale(rawPathname ?? '/');

  // El home tiene hero de video a pantalla completa: el navbar se revela al
  // hacer scroll. En el resto de las rutas debe verse desde que entrás.
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // El overlay reemplaza al scroll de la página mientras está abierto —
  // sin esto, el fondo se desliza detrás y rompe la sensación de pantalla
  // completa (estilo Huge/Fantasy).
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const visible = isHome ? isScrolled || menuOpen : true;
  const solid = isScrolled || !isHome || menuOpen;

  const navLinks = [
    { href: '/', label: dict.nav.home },
    { href: '/servicios', label: dict.nav.services },
    { href: '/portafolio', label: dict.nav.portfolio },
    { href: '/recursos', label: dict.nav.resources },
    { href: '/proceso', label: dict.nav.process },
    { href: '/contacto', label: dict.nav.contact },
  ];

  return (
    <>
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-[60]"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <nav className={`rounded-2xl px-5 py-2 flex items-center justify-between gap-4 transition-all duration-300 ${
          solid ? 'nav-pill--scrolled' : 'nav-pill'
        }`}>
          {/* Wordmark */}
          <SiteLink href="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src={navbarLogo}
              alt="AlphaDev Studios"
              height={64}
              priority
              style={{ width: 'auto', height: '30px' }}
              className="md:!h-[40px]"
            />
          </SiteLink>

          {/* Sparso a propósito: nada de lista de links en la pastilla — un
              solo trigger abre el overlay a pantalla completa (estilo
              Huge/Fantasy en vez del pill "genérico SaaS" con 5 links +
              toggle + CTA apretados). */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <button
              type="button"
              aria-label={menuOpen ? dict.nav.menu_close : dict.nav.menu_open}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="nav-menu-trigger"
            >
              <span className="nav-menu-trigger-label">
                {menuOpen ? dict.nav.menu_close : dict.nav.menu_open}
              </span>
              <span className={`nav-menu-trigger-icon${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay a pantalla completa — huge tipografía Playfair, un link
          por línea, CTA + tagline abajo. */}
      <div className={`nav-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="nav-overlay-links">
          {navLinks.map(({ href, label }, i) => (
            <SiteLink
              key={href}
              href={href}
              className={`nav-overlay-link${pathname === href ? ' is-active' : ''}`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-overlay-link-num">{LINK_NUMBERS[i]}</span>
              <span className="nav-overlay-link-label">{label}</span>
            </SiteLink>
          ))}
        </nav>

        <div className="nav-overlay-footer">
          <SiteLink
            href="/contacto"
            className="btn-glow"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            {dict.nav.cta}
          </SiteLink>
          <p className="nav-overlay-tagline">{dict.nav.menu_tagline}</p>
          <div className="sm:hidden">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </>
  );
}
