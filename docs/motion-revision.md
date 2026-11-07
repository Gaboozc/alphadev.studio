# Dirección de movimiento — revisión (rama `pruebas`)

Sustituye la dirección anterior de 12 láminas estáticas. Es una **propuesta en preview**, no un comportamiento ya verificado en producción.

Fuente: `MOTION-SPEC.md` + `MOTION-SOURCE-DOSSIER.md` (Arkano / Gabriel). No se copiaron frames, videos ni el script generador al repo: el hero ya usa `/assets/hero.mp4` y `/assets/hero-poster.webp`.

## Qué cambia para el visitante

1. **Hero, desktop ≥900.** El video sigue a pantalla completa (~9.6 s, autoplay sin sonido, póster). Al terminar: blur 14 px + velo cream + logo + replay. Al hacer scroll, **sin pin nuevo**, el video se hace tarjeta (radio 36, escala ≈0.55, origen arriba-derecha) y el titular entra en tinta con reveal palabra por palabra.
2. **Hero, móvil ≤899.** Video → logo. Sin handoff.
3. **Resultados.** Sigue siendo el **único pin** del sitio. Fondo tinta, tarjetas ~69 vw / radio 32 / gap 40, la siguiente asoma, barra dorada + contador 01/04 ligados al mismo scrub, clip-reveal en la primera captura. Scroll vertical nativo; sin snap forzado en desktop. Sale hacia «El problema».
4. **Móvil.** Sin pin: scroll-snap nativo, cards 80 vw en abanico (`--i * 2.25deg - 3.375deg`), 4 puntos, scope y BrandProofStrip ocultos.
5. **Movimiento reducido.** Póster + logo (sin autoplay), sin handoff ni pin ni giro; listado vertical. Foco visible en «Ver sitio».

## Qué no se toca

Auth, SEO, analítica (`c63527e`), Imperial, precios, settings de Vercel. El kill de ScrollTrigger en captura (pin-spacer / `removeChild`), `ignoreMobileResize` y el refresh tras `fonts.ready` / `load` se conservan.
