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
    // Padding/margin compensados para no recortar descendentes (g, p, y)
    // ni alterar el flujo del layout.
    lineEl.style.paddingBottom = '0.12em';
    lineEl.style.marginBottom = '-0.12em';

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
      inner.style.willChange = 'transform';
      inner.textContent = token;

      outer.appendChild(inner);
      lineEl.appendChild(outer);
      words.push(inner);
    });

    el.appendChild(lineEl);
  });

  return words;
}
