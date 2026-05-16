'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/90 backdrop-blur-xl border-b border-blue-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/img/alphadev-script-logo.png"
            alt="AlphaDev Studios"
            width={160}
            height={40}
            priority
            className="h-11 w-auto md:h-12 translate-x-[30px]"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Inicio
          </Link>
          <Link href="/servicios" className="text-gray-300 hover:text-white transition">
            Servicios
          </Link>
          <Link href="/portafolio" className="text-gray-300 hover:text-white transition">
            Portafolio
          </Link>
          <Link href="/proceso" className="text-gray-300 hover:text-white transition">
            Proceso
          </Link>
          <Link href="/contacto" className="text-gray-300 hover:text-white transition">
            Contacto
          </Link>
        </div>

        <div className="hidden md:flex items-center -translate-x-[40px]">
          <Link href="/contacto" className="btn-glow">
            Agendar Reunion
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-blue-500/30 text-blue-200 hover:text-white hover:border-blue-400/60 transition"
        >
          <span className="text-lg">{menuOpen ? '×' : '≡'}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-gray-950/95 backdrop-blur-xl border-b border-blue-500/10">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-200 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="/servicios" className="text-gray-200 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              Servicios
            </Link>
            <Link href="/portafolio" className="text-gray-200 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              Portafolio
            </Link>
            <Link href="/proceso" className="text-gray-200 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              Proceso
            </Link>
            <Link href="/contacto" className="text-gray-200 hover:text-white transition" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
            <Link href="/contacto" className="btn-glow w-fit" onClick={() => setMenuOpen(false)}>
              Agendar Reunion
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
