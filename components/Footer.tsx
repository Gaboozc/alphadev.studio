import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-white font-semibold mb-4 inline-block">
              AlphaDev Studios
            </Link>
            <p className="text-sm text-gray-500">
              Ingeniería de software empresarial a medida.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="hover:text-white transition">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white transition">
                  APIs & Backend
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white transition">
                  CRM Sistemas
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/portafolio" className="hover:text-white transition">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="/proceso" className="hover:text-white transition">
                  Proceso
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@alphadev.com" className="hover:text-white transition">
                  info@alphadev.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 AlphaDev Studios. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
