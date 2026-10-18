'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useLang } from '@/lib/i18n/LanguageContext';
import { CLAVE_TEMA, EVENTO_TEMA, type Tema } from '@/lib/tema';

// Toggle sol/luna. Diseño base aportado por Gabriel, adaptado a la paleta
// (crema y dorado de día, café cálido de noche — sin azul). Usa clases y no
// ids: el componente aparece más de una vez en la misma página.

function temaActual(): Tema {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function suscribir(avisar: () => void): () => void {
  window.addEventListener(EVENTO_TEMA, avisar);
  return () => window.removeEventListener(EVENTO_TEMA, avisar);
}

function aplicar(tema: Tema, recordar: boolean) {
  document.documentElement.setAttribute('data-theme', tema);
  if (recordar) {
    try {
      localStorage.setItem(CLAVE_TEMA, tema);
    } catch {
      // Sin almacenamiento el cambio vale para esta visita.
    }
  }
  window.dispatchEvent(new Event(EVENTO_TEMA));
}

function hayEleccionGuardada(): boolean {
  try {
    const t = localStorage.getItem(CLAVE_TEMA);
    return t === 'light' || t === 'dark';
  } catch {
    return false;
  }
}

export default function ThemeToggle({ className }: { className?: string }) {
  const { lang } = useLang();
  const tema = useSyncExternalStore(suscribir, temaActual, () => 'light' as Tema);
  const oscuro = tema === 'dark';

  // Mientras el visitante no elija, el sitio sigue al dispositivo también en
  // vivo (si su sistema cambia a modo oscuro al anochecer, el sitio también).
  useEffect(() => {
    const consulta = window.matchMedia('(prefers-color-scheme: dark)');
    const alCambiar = () => {
      if (!hayEleccionGuardada()) aplicar(consulta.matches ? 'dark' : 'light', false);
    };
    consulta.addEventListener('change', alCambiar);
    return () => consulta.removeEventListener('change', alCambiar);
  }, []);

  const etiqueta =
    lang === 'en'
      ? oscuro ? 'Switch to light mode' : 'Switch to dark mode'
      : oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo nocturno';

  return (
    <label className={`tema-toggle${className ? ` ${className}` : ''}`} title={etiqueta}>
      <input
        type="checkbox"
        role="switch"
        checked={oscuro}
        onChange={(e) => aplicar(e.target.checked ? 'dark' : 'light', true)}
        aria-label={etiqueta}
      />
      <svg viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <g transform="translate(3.5 3.5)">
          <rect className="tt-fondo" rx="17.5" height="35" width="60.667" />
          <g className="tt-boton" transform="translate(2.333 2.333)">
            <g className="tt-sol">
              <circle className="tt-sol-exterior" r="15.167" cy="15.167" cx="15.167" />
              <path
                className="tt-sol-halo"
                transform="translate(3.5 3.5)"
                d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z"
              />
              <circle className="tt-sol-interior" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" />
            </g>
            <g className="tt-luna">
              <circle className="tt-luna-disco" r="15.167" cy="15.167" cx="15.167" />
              <g className="tt-crateres" transform="translate(-24.415 -1.009)">
                <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2" />
                <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" />
                <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" />
                <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" />
                <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" />
                <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" />
              </g>
            </g>
          </g>
          <path
            className="tt-nube"
            transform="translate(-3469.97 -164.44)"
            d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z"
          />
          <g className="tt-estrellas" transform="translate(3.585 1.325)">
            <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z" />
            <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" />
            <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" />
            <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" />
            <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" />
            <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" />
            <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" />
            <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" />
          </g>
        </g>
      </svg>
    </label>
  );
}
