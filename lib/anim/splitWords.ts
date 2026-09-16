/**
 * splitWords — divide el texto de un elemento en palabras enmascaradas
 * para el efecto editorial de "headline reveal" (estilo Fantasy/Huge).
 *
 * Cada línea (separada por \n) se vuelve un bloque con `overflow: hidden`,
 * y cada palabra queda dentro de un <span> inline-block que GSAP puede
 * animar con translateY (solo transform → GPU-accelerated).
 *
 * Devuelve los spans internos (las "palabras móviles") para que el caller
 * los anime. Si no hay texto, devuelve [] y no toca el DOM.
 *
 * Nota: muta el DOM del elemento. Pensado para correr una sola vez en
 * cliente, después de la hidratación. Bajo prefers-reduced-motion NO debe
 * llamarse (el texto se muestra plano).
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  // Ya partido: devolver los spans existentes en vez de re-partir.
  // Sin esto, una segunda llamada (navegación de cliente, refresh de
  // ScrollTrigger) leería el textContent ya sin saltos de línea y volvería a
  // envolver spans dentro de spans.
  if (el.dataset.split === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
  }

  const text = el.textContent ?? '';
  if (!text.trim()) return [];

  // Limpiar el contenido original.
  el.textContent = '';
  el.setAttribute('data-split', 'true');

  const words: HTMLElement[] = [];
  const lines = text.split('\n');

  lines.forEach((line) => {
    const lineEl = document.createElement('span');
    lineEl.style.display = 'block';
    // Máscara: clipea las palabras que entran desde abajo.
    lineEl.style.overflow = 'hidden';
    // Padding/margin compensados para no recortar ni los descendentes (g, p, y)
    // ni los ascendentes/mayúsculas (line-height:1 en un display gigante como
    // .brand-row-name corta la parte de arriba de las letras sin este margen
    // — bug real visto en producción, no solo cosmético). Simétrico arriba y
    // abajo para no alterar el flujo del layout.
    lineEl.style.paddingTop = '0.18em';
    lineEl.style.marginTop = '-0.18em';
    lineEl.style.paddingBottom = '0.18em';
    lineEl.style.marginBottom = '-0.18em';

    // Mantener los espacios como tokens para preservar el espaciado.
    const tokens = line.split(/(\s+)/);

    tokens.forEach((token) => {
      if (token === '') return;
      if (/^\s+$/.test(token)) {
        // Espacio en blanco → nodo de texto (mantiene separación natural).
        lineEl.appendChild(document.createTextNode(token));
        return;
      }
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.dataset.word = '';
      inner.textContent = token;

      outer.appendChild(inner);
      lineEl.appendChild(outer);
      words.push(inner);
    });

    el.appendChild(lineEl);
  });

  return words;
}
