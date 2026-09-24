# CLAUDE.md — AlphaDev Studios

> **Propósito de este archivo**: Contexto persistente del proyecto. Cualquier agente Claude (Claude Code, Claude.ai, VS Code extension) que entre a este repo lee este archivo PRIMERO antes de actuar. Define quiénes somos, qué construimos, cómo se ve, y qué NO se debe replantear.

> **Última actualización**: Mayo 2026  
> **Owner**: Gabriel Zavarse — Founder, AlphaDev Studios

---

## 🎯 La promesa central

**AlphaDev Studios construye software con IA dentro, no encima — productos digitales en producción en semanas, no meses.**

Este sitio web no es un portfolio. Es la primera demostración de lo que vendemos: tecnología deseable, sofisticada, premium. La gente debe llegar y pensar *"quiero trabajar con ellos"* antes de leer una sola palabra.

---

## 🌟 La visión del sitio

> **No vendemos servicios. Vendemos una sensación de futuro.**

Cuando alguien aterriza en alphadev.studio, la experiencia debe ser equivalente a entrar al keynote de Apple para un producto nuevo: sobriedad técnica, materiales de alta gama, luz controlada, espacio que respira, micro-interacciones que sorprenden, performance que se siente instantánea.

### Referencias canónicas (lo que queremos lograr)

- **Linear.app** — sobriedad técnica, micro-interactions impecables
- **Vercel.com** — typography-first, gradients sutiles (su *dark mode* ya no aplica)
- **Stripe.com** — claridad B2B con sofisticación visual
- **Apple.com/m4** (o cualquier keynote) — 3D premium, depth, materiales
- **Rauno.me** — animations que dejan sin palabras
- **Brittany Chiang's portfolio** — minimal, technical, personal

### Anti-referencias (lo que NO queremos)

- ❌ Templates genéricos de "agency" con stock photos
- ❌ Carruseles de logos de clientes random
- ❌ "Soluciones digitales innovadoras para tu negocio" (genérico)
- ❌ Excesos de glassmorphism / neon / cyberpunk caricaturesco
- ❌ Diseños sobrecargados, animations sin propósito
- ❌ Mobile-first mediocre (mobile debe ser tan premium como desktop)

---

## 🎨 Sistema visual

### Mood
**Editorial claro + lujo sobrio + tipografía como protagonista.**

Pensemos: Stripe × consultoría de alto nivel × papel de alta gama. Crema cálida, dorado puntual, espacio que respira. NO oscuro, NO neón, NO glassmorphism, NO 3D brillante.

> El *mood* anterior era «oscuro técnico + cyber + 3D premium». Cayó con el rediseño de mayo de 2026 junto con la paleta. Si algún texto de este archivo todavía sugiere fondos oscuros o azul, está desactualizado: manda la paleta Light Luxury de abajo.

### Paleta — Light Luxury (actualizada mayo 2026)

> Decisión tomada: paleta crema cálida + dorado. NO volver al dark. El objetivo es parecer una empresa seria a la que un founder quiere contratar, no una página de hacker.

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--bg` | `#FAFAF7` | Fondo principal — crema cálida |
| `--bg-alt` | `#F2EEE7` | Secciones alternas, fondo de cards en páginas |
| `--bg-deep` | `#E8E2D9` | Bordes de sección, separadores |
| `--bg-card` | `#FFFFFF` | Fondo de cards individuales |
| `--text` | `#1A1512` | Texto principal — negro cálido |
| `--text-muted` | `#6B5F52` | Texto secundario, descripciones |
| `--text-subtle` | `#9A8E84` | Captions, metadata |
| `--gold` | `#9A7235` | Acento principal — CTAs, links, acentos |
| `--gold-light` | `#C9A465` | Hover states, dividers, ilustraciones |
| `--gold-dark` | `#7A5828` | Hover de botón, variante oscura |
| `--gold-bg` | `rgba(154,114,53,0.08)` | Background de hover en cards |
| `--gold-border` | `rgba(154,114,53,0.2)` | Borde dorado sutil |
| `--border` | `#E8E2D9` | Bordes neutros |
| `--border-hover` | `rgba(154,114,53,0.35)` | Borde en hover de cards |

**Reglas de uso**:
- Dorado `#9A7235` solo para acentos puntuales — CTAs, links, iconos, underlines. NO fondos grandes.
- Fondo crema `#FAFAF7` y `#F2EEE7` alternan secciones. Nunca blanco puro.
- Espacio negativo es protagonista. Si dudás, agregá padding.
- Zero glows, zero glassmorphism oscuro. La elegancia viene de la tipografía y el espacio.

### Tipografía (actualizada mayo 2026)

| Familia | Variable CSS | Uso | Pesos clave |
|---------|-------------|-----|-------------|
| **Playfair Display** | `--font-playfair` | Headlines (h1–h3), sección titles, wordmark | 700 |
| **Inter** | `--font-inter` | Body, UI, nav links, botones, captions | 400, 500, 600 |

**Reglas tipográficas**:
- H1/H2: Playfair Display 700, `clamp(2.8rem, 6vw, 5.5rem)`, tracking tight
- Body: Inter 400, line-height 1.65-1.7
- Botones: Inter 600, font-size 0.875rem
- NO Geist, NO monospace en body. Geist fue eliminado en el rediseño de mayo 2026.

### Estilo visual dominante (actualizado mayo 2026)

**Light luxury editorial.** Crema cálida, tipografía serif de alto contraste, dorado como único acento, espacio negativo generoso. Referencia: Stripe × consultoría de alto nivel.

**Animaciones**:
- Fade-in-up en entrada del hero (CSS, sin libraries)
- Hover en cards: translateY(-3px) + gold border + sutil box-shadow
- Marquee automático en TrustSection
- NO parallax oscuro, NO glow azul, NO animated SVG logo en hero
- Transitions: 200-250ms ease en colores/borders, 250ms ease en transforms

---

## 🖼️ Pipeline de generación de assets visuales

> **Reescrita en septiembre de 2026.** La versión anterior describía la paleta oscura (obsidiana, plasma azul `#0080ff`, fondo `#0f172a`) que quedó obsoleta con el rediseño *light luxury* de mayo. Seguir aquellas reglas producía imágenes que no se parecían al sitio.

### Filosofía

> **Corregida en septiembre de 2026 (rediseño visual).** La versión anterior exigía "trazo fino tipo grabado, nunca relleno ni volumen". Se probó y **no funcionó**: por más que se variara la composición, una línea plana dorada siempre se lee como un ícono, no como una imagen — y una sección con un ícono grande no le explica nada a quien entra. La regla de línea plana queda derogada para las imágenes de sección.

Cada elemento visual debe venir del **mismo universo**: crema cálida, dorado como acento, luz de estudio suave, sombras reales. El estilo es **render 3D tangible** — objetos con volumen y materiales creíbles (dorado cepillado, cerámica crema, papel), fotografiados como si estuvieran sobre una mesa. Un asset que rompa esta coherencia NO entra al sitio, por bonito que sea por separado.

**La prueba que tiene que pasar toda imagen**: alguien que entra y la mira *sin leer el texto de al lado*, ¿entiende de qué va la sección? Si no, la imagen es decoración y no sirve, por más bien renderizada que esté.

**Lo que NO va, nunca**: fondos oscuros, azul, glows de neón, glassmorphism, plateado/gris frío, fotos de stock genéricas de gente en oficina.

**Logos de plataformas reales (Instagram, WhatsApp, Google, Meta, TikTok…) SÍ se usan** cuando la sección habla de esas plataformas — es lo que hace que la imagen se entienda de un vistazo. Van como tiles 3D pequeños con sus colores oficiales; el resto de la escena se mantiene crema/dorado.

### Modelos disponibles
- **Nanobanana (Gemini Advanced)** — PRINCIPAL. Iteración conversacional, buena para fondos abstractos, texturas y filigrana. Prompts en inglés.
- **Ideogram** — el único que renderiza tipografía de forma medio fiable. Aun así, ver la advertencia de abajo.
- **GPT-4o / DALL-E** — alternativo, para composiciones más controladas e iconografía.

### El texto NO se genera con IA

Lección aprendida generando la OG image: **si el asset lleva texto de marca, se genera solo el fondo y el texto se compone en código.** Ninguno de los tres modelos renderiza tipografía de forma consistente, y el resultado no puede usar Playfair e Inter de verdad.

El patrón que funcionó, y que hay que repetir:

1. Prompt que pide **solo el fondo**, dejando explícitamente vacía la zona donde irá el texto.
2. Composición con `next/og` (`ImageResponse`), con las fuentes reales en `app/_og/`.

Ventaja añadida: si mañana cambia el titular, la imagen se regenera sola. Ver `app/opengraph-image.tsx` como referencia viva.

### Workflow estándar
```
1. Claude Code inspecciona el componente/sección de destino
2. Claude Code escribe el prompt (en inglés, con los hex de la paleta actual)
3. Gabriel lo pega en Gemini/Ideogram y genera
4. Gabriel itera EN LA MISMA conversación hasta estar satisfecho
5. Gabriel descarga a máxima calidad
6. Optimizar en squoosh.app (~80 de calidad)
7. Claude Code integra: si lleva texto, componiéndolo con next/og
```

### Reglas para generación de prompts (obligatorio para Claude Code)

**Estructura del prompt**, en este orden:
1. Estilo dominante: `"Ultra-premium editorial, luxury print, letterpress feeling"`
2. Fondo: `"warm cream (#FAFAF7 to #F2EEE7), subtle paper grain"`
3. Sujeto: qué hay y **dónde** — normalmente confinado a un tercio
4. Materiales: `"brushed gold metal, matte cream ceramic, soft studio lighting, real shadows"`
5. Composición: asimétrica, llenando el cuadro, sangrando por algún borde — **nunca un objeto centrado con vacío alrededor** (eso produce un ícono)
6. Mood: `"calm, warm, confident, expensive"`
7. Restricciones: `"no dark backgrounds, no blue, no neon glow, no glassmorphism, no flat 2D line-art icon look, no frames or borders, no blueprint dimension lines, no text, no watermarks, no people"`
8. Aspecto y tamaño: `"1200x630"`, `"1:1"`, etc.

**Coherencia obligatoria**:
- SIEMPRE crema `#FAFAF7` / `#F2EEE7` como fondo
- SIEMPRE dorado `#9A7235` o `#C9A465` como único acento
- SIEMPRE volumen real: objetos 3D con luz de estudio y sombra, no línea plana
- SIEMPRE una sola escena coherente: si hay dos objetos, tienen que tener una razón física para estar juntos. Unir dos props sueltos con un cable dorado se ve absurdo — probado y descartado
- SIEMPRE dejar explícita la zona vacía si el asset va a llevar texto encima
- NUNCA pedir colores fuera de paleta, salvo los colores oficiales de un logo de plataforma real

**Para iterar en Gemini**:
- Iterar en la MISMA conversación: mantiene el contexto visual
- Pedir cambios concretos: *"move the linework further right"*, *"make the lines thinner"*
- Si está al 80%, iterar. Si está al 30%, prompt nuevo desde cero.

### Inventario de assets

**Hecho**:
- OG Image (1200×630) — `app/opengraph-image.tsx` + `app/_og/background.jpg`
- Favicon SVG y apple-icon — `app/icon.svg`, `app/apple-icon.tsx`
- **Imágenes de sección** — `public/assets/secciones/*.webp`. Una por pilar, servicio, fase del proceso y argumento de "por qué ADS", más la del problema. Los fuentes sin optimizar viven en `OneDrive/Pictures/ADS`; se convierten con `ffmpeg -vf scale=<ancho>:-2 -quality 82` a WebP (de ~2.3 MB a ~40 KB cada una)
- Foto del founder — `public/assets/secciones/gabriel-founder.webp`, en el CTA oscuro. Es la foto real de Gabriel relightada a crema; cierra el CTA porque ahí es donde alguien decide si escribir
- Foto de Gabriel Muria para `/tarjeta/gabriel-muria`
- Favicon SVG y apple-icon — `app/icon.svg`, `app/apple-icon.tsx`

**`components/Icon.tsx` sigue existiendo** para UI chica (tarjetas digitales, Academia, flechas). Lo que ya NO hace es representar una sección completa del sitio público.

**Pendiente, si alguna vez hace falta**:
- Grabaciones de pantalla de los sitios de clientes scrolleando
- Texturas o patrones sutiles para fondos de sección

**Ya no aplica**: el hero background 3D con esfera de obsidiana. Era del diseño oscuro; el hero actual no lleva imagen de fondo.

### Especificaciones técnicas

| Tipo | Dimensiones | Formato | Peso máximo | Notas |
|------|------------|---------|-------------|-------|
| OG Image | 1200×630 | PNG | 500KB | Fondo generado + texto en `next/og` |
| Fondo de sección | 1920×800+ | WebP/AVIF | 300KB | Sutil, nunca protagonista |
| Mockup de case study | 1200×800 | WebP | 400KB | Dispositivo + captura real |
| Foto de tarjeta | 800×800 | JPG | 200KB | Cuadrada, recorte de retrato |
| Favicon | SVG + 180×180 | SVG + PNG | 10KB | Marca simplificada |
| Patrón / textura | 400×400 repetible | SVG/PNG | 20KB | Sin costuras |

---

## 👥 Audiencia

### Primaria (peso 70%)
**Founders globales** — fundadores de startups, SaaS, productos digitales. Pagan en USD. Hablan inglés o español. Buscan rapidez de entrega y diferenciación técnica. Están en Twitter/X, LinkedIn, comunidades indie hacker.

### Secundaria (peso 30%)
**PyMEs LATAM informales** — dueños de negocios que necesitan digitalización pero NO requieren factura formal. Pagan vía Wise, transferencia, o cash. Están en Instagram.

### Quién NO es nuestro cliente
- ❌ PyMEs MX grandes que exigen CFDI (no podemos facturar formal)
- ❌ Corporativos que requieren licitaciones
- ❌ Clientes que pelean precio agresivamente (no aportan margen ni reputación)
- ❌ Proyectos que no encajen con stack moderno (WordPress, legacy PHP, etc.)

---

## 🛠️ Stack técnico

### Frontend
- **Next.js 16.1.6** (App Router, NO Pages Router)
- **React 19.2.3**
- **TypeScript 5+** (strict mode obligatorio, cero `any`)
- **Tailwind CSS v4** (sin downgrade a v3)
- **Server Components** por default, `'use client'` solo cuando absolutamente necesario

### Backend
- **API Routes** de Next.js (no servidor separado)
- **Supabase** (Postgres + Auth + Storage) para clientes con BD
- **Resend** para email transaccional (pendiente integrar)
- **Zod** para validación de schemas

### Hosting / Infraestructura
- **Vercel** (Hobby plan inicialmente, Pro cuando tráfico lo requiera)
- **Dominio**: `alphadev.studio` comprado vía Vercel
- **DNS**: Vercel maneja todo
- **Email del dominio**: Cloudflare Email Routing free (cuando se configure)

### Decisiones tomadas (no replantear)
- ✅ Next.js 16 App Router — definitivo
- ✅ Tailwind v4 — definitivo
- ✅ TypeScript strict — definitivo
- ✅ Sin display de precios en el sitio
- ✅ **Multi-idioma es/en: la URL es la fuente de verdad.** Español sin prefijo (`/servicios`), inglés bajo `/en` (`/en/servicios`). La correspondencia y la metadata de las dos versiones viven en `lib/i18n/routes.ts`, y ahí se agregan las páginas nuevas. El idioma NO vuelve a `localStorage`: ahí estaba antes y dejaba el `<title>`, la descripción y la tarjeta de OpenGraph siempre en español, porque esa metadata se resuelve en el servidor
- ✅ Cuatro clientes reales: BFS Karate, Imperial Barbershop, The Latin Grill y Fenix Group. Viven en `lib/content/cases.ts`; ya no hay placeholders en el sitio público
- ✅ **Tienda de guías (`/recursos`): pago único en USD vía PayPal, sin cuentas de comprador.** Nada de membresías ni de permisos por usuario — esa complejidad se evaluó y se descartó a propósito porque el problema no la pedía. Ver la sección "🛒 Tienda de guías" más abajo antes de tocar `lib/ventas.ts`, `lib/paypal.ts` o `lib/compra.ts`
- ✅ Logo animado SVG inline en Hero (mantener, no reemplazar)
- ✅ **GSAP 3.15 + ScrollTrigger + Lenis** es el motor de scroll del sitio (`components/ScrollAnimations.tsx`, `components/SmoothScroll.tsx`). La regla anterior decía "Framer Motion sí, GSAP no" — se invirtió con el rediseño visual, y Framer Motion salió del `package.json`
- ❌ NO usar componentes de shadcn por ahora (mantener todo custom)
- ❌ NO Tailwind v3 downgrade

---

## 📐 Arquitectura del sitio

### Rutas actuales

```
Públicas (existen en los dos idiomas: la misma ruta y su espejo bajo /en)
/                       → Home
/servicios              → Servicios (5 filas alternadas + galería de plantillas)
/portafolio             → Resultados (los 4 clientes reales)
/recursos               → Tienda de guías (catálogo)
/recursos/[slug]        → Ficha de una guía + botón de compra
/proceso                → Cómo trabajamos (5 fases)
/contacto               → Formulario único con selector de categoría
/privacidad             → Política de privacidad
/terminos               → Términos de uso

Solo en español (no llevan espejo /en)
/recursos/gracias       → Vuelta de PayPal: confirma el pago y da el enlace
/recursos/descargar/[token] → Entrega el PDF (Route Handler, no una página)

Privadas
/acceso                 → Login (Server Action, sesión httpOnly)
/academia/*             → Academia, detrás de sesión
/admin                  → Panel: mensajes, guías, ventas (ver más abajo)

Otras
/tarjeta/[slug]         → Tarjetas digitales (noindex)
/privacy/leer-con-monstruos → Política de otro producto
```

`/contacto/startup` y `/contacto/enterprise` **ya no existen**: se consolidaron
en un solo formulario con selector. Si un texto viejo los menciona, está
desactualizado.

### Componentes (`components/`)

Los de sección los compone `components/HomeSections.tsx`, que es lo que
renderizan **las dos** homes (`/` y `/en`). Agregar una sección ahí, no en las
páginas: si cada home listara sus secciónes, la inglésa se quedaría atrás sin
que nada avise.

- Estructura: `Navbar` (overlay a pantalla completa estilo Huge), `Footer`,
  `ConditionalLayout` (oculta nav/footer en academia, acceso y tarjetas)
- Home: `Hero`, `HeroContent`, `BrandProofStrip`, `WorkShowcase`,
  `ProblemSection`, `CapabilitiesSection`, `ServicesSection`,
  `TemplatesSection`, `ProcessSection`, `WhyUsSection`, `CTASection`
- Transversales: `SiteLink` (**el enlace interno que se usa en páginas
  públicas** - un `next/link` crudo devuelve al español a mitad de navegación),
  `LanguageToggle`, `TemplateViewer`, `ScrollAnimations`, `SmoothScroll`,
  `MagneticButtons`, `Icon`, `Flag`, `AlphaDevWordmark`, `ErrorScreen`
- `CaseStudiesSection.tsx` está **huérfano** desde que `WorkShowcase` lo
  reemplazó. No invertir tiempo ahí

---

## 🛒 Tienda de guías (`/recursos`) — hecho, septiembre 2026

Contenido propio (gratis o de pago) que se vende desde el sitio. Decisión de
Gabriel, deliberadamente simple: **pago único en USD vía PayPal, sin cuentas
de comprador.** Nadie se registra para comprar una guía — el enlace de
descarga ES el acceso, no una sesión.

### Por qué no hay cuentas de comprador

Se evaluó primero un diseño con permisos por usuario (compartido con una
eventual Fase 3 de la Academia). Gabriel lo descartó: sin membresías ni
Academia "como se veía antes", construir un sistema de cuentas para vender
PDFs sueltos era una complejidad que el problema no pedía. El diseño actual
es una tienda, no una plataforma.

### Cómo se paga y se entrega

```
1. /recursos/[slug] → botón "Comprar" → Server Action (app/recursos/actions.ts)
   crea la orden en PayPal con el PRECIO LEÍDO DE LA BASE (nunca del
   formulario) y redirige al checkout de PayPal
2. El comprador paga y PayPal lo manda de vuelta a
   /recursos/gracias?token=<order_id>
3. Esa página captura la orden contra la API de PayPal, registra la venta,
   manda el correo (Resend) y muestra el botón de descarga
4. /recursos/descargar/[token] valida el token, firma una URL de Storage de
   60 segundos y redirige — el token vale 7 días y hasta 5 descargas
```

**Red de seguridad:** si el comprador cierra la pestaña entre pagar y volver,
pagó y el paso 3 nunca corre. `app/api/pagos/paypal/route.ts` escucha el
webhook de PayPal (`CHECKOUT.ORDER.APPROVED`) y hace lo mismo por su cuenta.
`lib/compra.ts` es la única función que ambos caminos llaman — evita que se
desincronicen. Los reembolsos **no** se automatizan (extraer el id de la
orden del payload de reembolso de PayPal exige una llamada extra a su API);
se revocan a mano con el botón "Revocar" en `/admin/ventas`.

### La clave de servicio de Supabase — por qué existe ahora

Quien compra no tiene sesión, así que registrar su compra o firmar su
descarga necesita un privilegio que ninguna sesión tiene. Por eso
`SUPABASE_SERVICE_ROLE_KEY` entra al proyecto — **corrige lo que decía antes
este archivo**, que no hacía falta. Acotada a un único archivo,
`lib/ventas.ts`, y `eslint.config.mjs` tiene una regla `no-restricted-imports`
que rompe el build si algún otro archivo importa `lib/supabase/admin`.

### Archivos clave

| Archivo | Rol |
|---|---|
| `supabase/sql/02-guias.sql` | Tablas `guias` y `ventas`, RLS, función `consumir_descarga()`. Idempotente, se pega en el SQL Editor — falta correrlo |
| `lib/guias.ts` | Catálogo: validación, alta/edición (sesión del admin), lectura pública |
| `lib/ventas.ts` | **Único importador permitido de `lib/supabase/admin`.** Separa lo que corre con sesión de admin (panel) de lo que corre con la clave de servicio (comprador sin sesión) |
| `lib/paypal.ts` | Orders API v2 por `fetch` — crear orden, capturar, verificar firma de webhook. Sin SDK ni script de PayPal en la página |
| `lib/compra.ts` | Orquesta captura + registro + correo. La llaman `/recursos/gracias` y el webhook — nunca duplicar esta lógica |
| `lib/correo.ts` | Resend por `fetch`, sin su SDK |
| `app/admin/` | Panel: `/admin` (mensajes, movido desde `/academia/admin`), `/admin/guias`, `/admin/ventas` |

### Antes de que esto pueda vender de verdad (pendiente de Gabriel)

1. Correr `supabase/sql/02-guias.sql` en el SQL Editor
2. Storage → New bucket → `guias`, con **Public desactivado**
3. Cuenta PayPal **Business** (gratis convertir) + app en developer.paypal.com
   → `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
4. En esa app, Webhooks → agregar `https://www.alphadev.studio/api/pagos/paypal`
   con los eventos `CHECKOUT.ORDER.APPROVED` y `PAYMENT.CAPTURE.COMPLETED` →
   `PAYPAL_WEBHOOK_ID`
5. Verificar el dominio `alphadev.studio` en Resend (registros DNS en Vercel)
   → `RESEND_API_KEY`
6. Las cinco variables anteriores + `SUPABASE_SERVICE_ROLE_KEY`, en Vercel
   → Environment Variables, y **redesplegar** (son variables de servidor, no
   `NEXT_PUBLIC_`, pero el redespliegue sigue haciendo falta)
7. Probar todo contra `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com`
   antes de pasar a la URL de producción de PayPal

---

## 🚧 Estado actual y pendientes

> Reescrito en septiembre de 2026. Antes decía que faltaban las variables de
> Supabase en Vercel y que el i18n en inglés estaba a medias — las dos cosas
> ya se resolvieron y se confirmaron en producción.

### 🔴 Bloqueante

1. **Altas abiertas en Supabase.** La clave anon es pública por diseño, así que
   si Supabase permite registro por correo, cualquiera puede crearse una cuenta
   por API aunque no exista página de registro - y como `app/academia/layout.tsx`
   solo comprueba que haya sesión, entra al catálogo completo. Cerrar en
   Authentication → Sign In / Providers → Email → desmarcar *Allow new users
   to sign up*. Los accesos se crean a mano en Authentication → Users → Add
   user, marcando *Auto Confirm User*; el trigger `on_auth_user_created` arma
   sola la fila en `perfiles`, y `es_admin` se pone a mano por SQL. (No afecta
   a la tienda de guías: comprar no requiere cuenta ni pasa por esta puerta.)

2. **La tienda de guías está escrita pero no configurada.** El código pasa
   build/lint/tsc y se verificó que degrada con gracia sin la infraestructura
   detrás (catálogo vacío, mensajes de error en vez de un 500 en blanco), pero
   no puede vender nada real hasta que se corran los 7 pasos de la sección
   "🛒 Tienda de guías" de más arriba: la migración SQL, el bucket de Storage,
   las credenciales de PayPal y de Resend, y el redespliegue con las variables
   nuevas en Vercel.

### 🟠 En curso

3. **Resultados de clientes sin números.** `/portafolio` y `WorkShowcase`
   cuentan qué se hizo, no qué logró. Pendiente de que Gabriel dé las cifras.

4. **Copy de `/servicios`** - las viñetas prometen cosas que en 2026 se dan por
   sentadas ("carga rápida", "formulario de contacto") en vez de diferenciales,
   y no hay plazos de entrega en ninguna parte.

5. **Precios de paquetes (`/precios`).** Decidido publicarlos en los dos
   idiomas, con alcance distinto por idioma (no solo un multiplicador de
   precio) para que la comparación entre `/servicios` y `/en/servicios` no
   regale el margen. Pendiente de costear cada paquete antes de escribir la
   página — ver `docs/paquetes-y-precios.md` si ya existe, o empezarlo.

### 🟡 Estructural

6. **Aviso por correo cuando llega un mensaje del formulario de contacto**
   (hoy hay que entrar al panel a mirar). Resend ya está integrado —para el
   correo de descarga de una guía, `lib/correo.ts`— así que esto es reusar esa
   pieza, no instalar nada nuevo.
7. Fase 3 de la Academia: permisos por usuario. Hoy cualquier autenticado ve
   todo. `app/academia/queries.ts` es el único punto donde filtrar. Sin
   relación con la tienda de guías, que resolvió su propio problema de acceso
   sin tocar la Academia.
8. Progreso de lecciones: migrar de `localStorage` a la base.
9. Versiones en inglés de la metadata de las rutas privadas.
10. Marca de agua en el PDF de las guías con el correo del comprador —
    deliberadamente fuera de la v1 para no sumar una dependencia (`pdf-lib`)
    antes de la primera venta real.

### 🟢 Limpieza

11. `Notion.docx` en la raíz del repo, sin revisar y sin commitear. Va al
    `.gitignore` o fuera.
12. `NEXT_PUBLIC_CONTACT_EMAIL` y `NEXT_PUBLIC_CONTACT_PHONE` están en
    `.env.local` y `.env.example` pero **nadie las lee**: `lib/site-config.ts`
    tiene los valores fijos. Son residuo.
13. `components/CaseStudiesSection.tsx` huérfano.
14. Remover `/frontend/` (proyecto Vite obsoleto) si ya no se referencia.

---

## ✍️ Copy y tono

### Voz de la marca

- **Confiada pero no arrogante**. Sabemos hacer las cosas; lo demostramos, no lo gritamos.
- **Técnica pero accesible**. Un founder no-técnico entiende qué vendemos sin sentirse perdido.
- **Específica, no genérica**. Nada de "soluciones innovadoras". Decimos qué construimos, cuánto tarda, qué entregamos.
- **Directa sin ser fría**. Hay calidez, pero no exceso de "tu socio amigable que te entiende".

### Palabras y frases que SÍ usamos
- "En producción en semanas"
- "Stack moderno"
- "IA integrada desde el día uno"
- "Módulos reusables"
- "Mentalidad de producto"

### Palabras y frases que NO usamos
- ❌ "Soluciones digitales"
- ❌ "Transformación digital"
- ❌ "Sinergia"
- ❌ "Innovador" (mostrá innovación, no la nombres)
- ❌ "Pasión por la tecnología"
- ❌ "Equipo dedicado" (somos uno solo por ahora, sin mentir)
- ❌ "Soluciones a medida" (genérico)

---

## 🔄 Cómo evolucionar el sitio (filosofía de cambios)

### Principios

1. **Mejor que sea ON antes de ser perfecto.** El sitio está LIVE. Cada mejora se deploya cuando esté lista, no se acumula en branches eternos.
2. **Una mejora por vez.** No reescrituras masivas. Cada cambio debe ser revertible y testeable.
3. **Performance es feature.** Si una mejora visual baja el Lighthouse score < 90, no se merge hasta optimizarla.
4. **Mobile premium, no afterthought.** Cada cambio se testea primero en mobile. Si solo se ve bien en desktop, no está listo.
5. **Coherencia > novedad.** Antes de agregar un efecto nuevo, preguntarse: ¿esto vive en el sistema visual ya definido o lo está rompiendo?

### Workflow de cambios

```
1. Decisión tomada en chat con Claude → 
2. Actualizar este CLAUDE.md si la decisión es estructural → 
3. Implementar en branch dedicado → 
4. Test local + mobile → 
5. Deploy preview en Vercel → 
6. Verificar → 
7. Merge a main → 
8. Verificar producción
```

---

## ⚙️ Reglas operativas para agentes (Claude Code, etc.)

### Antes de modificar nada

1. **Plan Mode obligatorio**. Mostrá el plan antes de tocar archivos.
2. **Read first, write later**. Leé los archivos involucrados antes de proponer cambios.
3. **Respeto al scope**. No refactorices fuera de lo pedido. Si encontrás deuda técnica, agregala a una lista, no la "arregles" sin preguntar.
4. **No instalar dependencias sin confirmar**. Listalas en el plan.

### Estándares de código

- TypeScript strict mode siempre
- Cero `any` (preferí `unknown` + narrowing)
- Server Components por default
- `'use client'` solo cuando necesario (estado, eventos, hooks de cliente)
- Comentarios significativos en español, solo donde aclaren intención no obvia
- Imports ordenados: externos → internos absolutos → relativos → tipos
- Conventional Commits en inglés (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`)

### Branching

La rama de producción es **`master`** (no `main`), y hoy se commitea directo a
ella: Gabriel trabaja solo y cada cambio se verifica en local antes de subir.
El esquema `dev` + `feature/*` que describía este archivo nunca se usó; queda
anotado por si algún día entra otra persona al repo.

### Verificación obligatoria al terminar

- [ ] Build pasa (`npm run build`)
- [ ] Lint pasa (`npm run lint`)
- [ ] TypeScript sin errores
- [ ] Mobile responsive verificado
- [ ] Lighthouse score >= 90 en Performance
- [ ] Decisiones nuevas reflejadas en este CLAUDE.md

---

## 📋 Información de marca y contacto

- **Founder**: Gabriel Zavarse
- **Email**: zavarsegabriel@gmail.com — **no aparece en el sitio público.** Se
  quitó en septiembre de 2026 de `/contacto`, la página de error, el JSON-LD y
  los mensajes de fallo del formulario; en su lugar van los dos teléfonos. Sigue
  en la tarjeta digital de Gabriel y en la política de Leer con Monstruos, que
  son suyas. Pendiente migrar a hello@alphadev.studio
- **Teléfono USA**: +1 (407) 686-7561
- **Teléfono México**: 56 3711 3563
- **Ubicación**: Remote (LATAM-based)
- **Instagram**: [@alphadev.studio](https://instagram.com/alphadev.studio)
- **Dominio**: alphadev.studio

---

## 🎯 La pregunta filtro

Antes de cualquier decisión de diseño, copy, o estructura, hacer esta pregunta:

> *"¿Esto hace que un founder serio diga 'quiero trabajar con ellos' antes de leer el headline?"*

Si la respuesta es no, no entra al sitio. Si la respuesta es sí pero genera fricción técnica o de performance, se optimiza hasta que entre.

**La meta no es un sitio bonito. Es un sitio que la gente desee. Tecnología deseable.**

---

## 🔐 Seguridad de Supply Chain

### Contexto (Mayo 2026)
El ecosistema npm sufrió un ataque masivo de supply chain ("Mini Shai-Hulud") que comprometió 170+ paquetes incluyendo `@tanstack/router*`, Mistral AI, UiPath, entre otros. El vector fue GitHub Actions, NO el registry de npm en sí. Cambiar de package manager (npm → pnpm → yarn) **NO protege** contra paquetes comprometidos — todos usan el mismo registry.

### Reglas de seguridad obligatorias

1. **`.npmrc` de proyecto** — configurar siempre:
   ```
   minimum-release-age=7
   save-exact=true
   ```
   `save-exact` **sí funciona**: evita rangos (`^`, `~`) que actualizan automáticamente.

   > ⚠️ **`minimum-release-age` NO se está aplicando.** Es una opción de **pnpm**. npm la lee del `.npmrc`, no la entiende y la ignora — lo dice en cada comando: `npm warn Unknown project config "minimum-release-age"`. Comprobado con npm 11.12.1 en septiembre de 2026.
   >
   > O sea que **la espera de 7 días es un procedimiento manual, no una barrera técnica**. Nada impide instalar un paquete publicado hace una hora.
   >
   > **Antes de instalar o subir cualquier paquete, comprobar la fecha a mano:**
   > ```bash
   > npm view <paquete> time --json
   > ```
   > Si el release tiene menos de 7 días, esperar. Si hay una razón para no esperar, decirlo explícitamente en el commit.
   >
   > La alternativa real es migrar a pnpm, que sí implementa la opción. Es una decisión aparte (ver el final de esta sección): mientras no se tome, **no confiar en el `.npmrc` para esto**.

2. **Lockfile siempre commiteado** — `package-lock.json` (o `pnpm-lock.yaml` si se migra) SIEMPRE en git. Nunca `.gitignore`-ar el lockfile.

3. **Auditoría antes de instalar** — antes de agregar cualquier dependencia nueva:
   - Verificar en [GitHub Security Advisories](https://github.com/advisories)
   - Verificar en [Snyk Vulnerability Database](https://security.snyk.io/)
   - `npm audit` después de cada install

4. **Mínimas dependencias de producción** — el sitio actual tiene SOLO Next.js + React + React-DOM en producción. ESO ES EXCELENTE. No agregar dependencias sin justificación clara. Cada dependencia es superficie de ataque.

5. **Antes de instalar un paquete nuevo**, verificar:
   - ¿Tiene >1,000 descargas semanales?
   - ¿Último release fue hace <6 meses?
   - ¿Tiene maintainers conocidos/verificados?
   - ¿Puedo lograr lo mismo sin la dependencia (con código propio)?

6. **No ejecutar `npm install` en proyectos ajenos** sin revisar `package.json` primero. Si un cliente te pasa un repo, lee las dependencias antes de instalar.

### Paquetes de alto riesgo a evitar temporalmente (post-incidente Mayo 2026)
- `@tanstack/router*` — verificar que la versión sea posterior al 12 de mayo 2026
- `@tanstack/start*` (excluyendo meta-package) — misma regla
- Cualquier paquete recién publicado sin historial verificado

### Paquetes confirmados limpios (post-incidente)
- `@tanstack/query*` ✅
- `@tanstack/table*` ✅
- `@tanstack/form*` ✅
- `@tanstack/virtual*` ✅
- `@tanstack/store` ✅

### Sobre migración a pnpm
pnpm tiene ventajas reales sobre npm (velocidad, disco, resolución estricta). Cambiar de gestor **no protege** contra un paquete comprometido: todos tiran del mismo registry, y esa sigue siendo la razón por la que no se migra en pánico.

Con un matiz que sí cuenta: **pnpm implementa `minimum-release-age` y npm no** (ver la regla 1). Hoy esa espera depende de que alguien mire la fecha a mano antes de instalar. Es el único argumento de seguridad concreto a favor de migrar, y es modesto —automatiza una comprobación, no añade una defensa nueva—. La decisión sigue siendo cuándo haya tiempo y justificación.

---

## 🎓 Academia — estructura (rediseñada septiembre 2026)

Área privada en `/academia`. Jerarquía: **Familia → Rama → Área → Módulo → Lección**.

| Familia | Ramas |
|---------|-------|
| **Construir** | Programación (Fundamentos del oficio → Desarrollo Web → Back-end y datos → Producto IA), Diseño, IA Aplicada, Ingeniería de IA (Modelos y datos → Agentes → IA en producción) |
| **Crecer** | Marketing, Contenido & SEO, Negocio & Datos |

### Ingeniería de IA — reescrita septiembre 2026 (70 lecciones, partió de 27)

La rama se sentía hueca frente al bootcamp de 4Geeks en el que se basa el temario: 5 módulos delgados contra ~12 segmentos reales de ingeniería de IA. Se reescribió en tres áreas:

| Área (track) | Módulos |
|---|---|
| `iaeng-modelos` | `iaeng-1` Modelos, embeddings y RAG |
| `iaeng-agentes` | `iaeng-2` Ingeniería agéntica · `iaeng-langgraph` · `iaeng-3` Flujos agénticos y multiagente · `iaeng-mcp` |
| `iaeng-produccion` | `iaeng-evals` · `iaeng-async` · `iaeng-realtime` · `iaeng-arquitectura` · `iaeng-4` Seguridad · `iaeng-capstone` |

- **El contenido vive en `content/iaeng/<área>/<módulo>.ts`**, un archivo por módulo — es la excepción a "un archivo por rama" de la tabla de arriba. Con 13 módulos, un solo archivo por área ya pasaba de las 900 líneas.
- **Huecos que tenía la rama y que ya no tiene**: MCP, procesamiento asíncrono (colas, workers, cron), tiempo real (SSE, streaming de tokens), evaluación y observabilidad con OpenTelemetry GenAI, y el OWASP Top 10 general más allá de lo específico de modelos.
- **La fuente de 4Geeks estaba mal diagnosticada** — ver `[[fuente-4geeks-incompleta]]` en memoria. El temario de las cohortes "perdidas" vivía en `tasks/ai-engineering-4/*.json`, no solo en `markdown/`.
- **`iaeng-evals` es la única fuente de contenido de evaluación/coste/observabilidad** en la rama — `iaeng-3` remite ahí en vez de duplicar, con nota explícita en el brief de su proyecto.

### Archivos clave

| Archivo | Rol |
|---------|-----|
| `app/academia/types.ts` | Interfaces (Module, Lesson, LearningPath, Reto, Audience) |
| `app/academia/ramas.ts` | Metadata de familias/ramas/áreas + helpers de URL. **No importa contenido** |
| `app/academia/queries.ts` | Consultas que sí cargan el contenido. Único punto a tocar para filtrar por permisos |
| `app/academia/content/<rama>.ts` | El contenido real, un archivo por rama. **Excepción: Ingeniería de IA** está partida en `content/iaeng/<área>/<módulo>.ts` porque va camino de 13 módulos |
| `app/academia/modules.ts` | Barril que junta y re-exporta. No editar contenido acá |

### Reglas

- **Para agregar un módulo**: editar `content/<rama>.ts`. La rama se deriva del `track` vía `RAMA_OF_TRACK` — no se declara a mano.
- **Los links se arman con** `ramaHref()` / `moduleHref()` / `lessonHref()`, nunca a mano.
- **Metadata de áreas**: fuente única en `TRACK_META`. No duplicar la tabla en componentes.
- **`audience`** en cada módulo separa contenido vendible (`'aprendizaje'`) de formación interna (`'capacitacion'`). Ausente = `'aprendizaje'`.
- **Nunca importes `Module` ni `MODULES` desde un componente `'use client'`.** Eso mete el texto de las 433 lecciones en el paquete de JavaScript del navegador. Los componentes de cliente reciben `ModuleMeta` (sin `content`, `tasks`, `tip`, `questions`) construido en el servidor con `toModuleMeta()`. Comprobación: `grep -rl "<frase de una lección>" .next/static/` debe dar cero.
- **Markdown de las lecciones** (`components/LessonContent.tsx`): soporta `## sección`, `### subtítulo`, `**negrita**`, `` `código` `` (también dentro de negritas), bloques ` ``` ` con lenguaje opcional, listas con `- ` y con `1. `, y tablas markdown (exigen la línea separadora `|---|---|`). No hay más sintaxis: cualquier otra cosa se renderiza como texto plano.
- URLs: `/academia/<rama>/<módulo>/<lección>`. Un módulo vive en una sola rama; pedirlo bajo otra da 404.
- Estilos nuevos usan clases `.acad-*` en `globals.css`, no estilos inline.

### Fase 2 (auth) — hecha, septiembre 2026

El `PasswordGate` ya no existe. La Academia va detrás de una sesión real de Supabase Auth.

- **El login corre en el servidor** (`app/acceso/actions.ts`, Server Action), no en el navegador.
  Es a propósito: `@supabase/ssr` en cliente guarda la sesión con `document.cookie`, y una cookie
  escrita por JavaScript nunca puede ser `httpOnly`. Haciéndolo en el servidor sí lo es.
- **La puerta de verdad es `app/academia/layout.tsx`** (`getUsuario()` → `redirect('/acceso')`).
  El middleware es una segunda capa, no la única: Next 16.1.6 tiene avisos publicados de bypass.
- **El middleware nunca lanza.** Falta de configuración o caída de Supabase = denegar lo privado
  y dejar pasar el resto. Su matcher está limitado a rutas privadas concretas
  (`/academia`, `/academia/:path*`, `/admin`, `/admin/:path*`, `/acceso`); cubrir todo el sitio
  tumbó producción entera una vez.
- **Siempre `getUser()`, nunca `getSession()`** en el servidor: getSession lee la cookie sin
  verificarla contra Supabase, así que un valor manipulado pasaría.
- Variables: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. En local en `.env.local`,
  en Vercel en Project Settings → Environment Variables.
  > **Corregido en septiembre de 2026.** Esta línea decía "la clave `sb_secret_` no se usa ni hace
  > falta". Dejó de ser cierto con la tienda de guías: `SUPABASE_SERVICE_ROLE_KEY` sí se usa,
  > acotada a `lib/ventas.ts`. Ver la sección "🛒 Tienda de guías" más arriba.

### Inbox y panel de admin — hecho, septiembre 2026

El formulario de contacto guarda en Supabase y `/academia/admin` lo lista.

| Archivo | Rol |
|---------|-----|
| `supabase/sql/01-inbox.sql` | Tablas `perfiles` y `mensajes` con RLS. Idempotente, se pega en el SQL Editor |
| `lib/mensajes.ts` | Validación, alta y consultas de la tabla `mensajes` |
| `lib/perfil.ts` | `getPerfil()` / `esAdmin()`. Nunca lanzan |
| `app/contacto/actions.ts` | Server Action del formulario: honeypot, límite por IP, validación |
| `app/academia/admin/` | Panel. `layout.tsx` es la guarda, `actions.ts` re-comprueba admin |

- **Las políticas RLS son el candado, no el código.** La clave anon viaja en el bundle:
  cualquiera puede hablarle a la base directo. `mensajes` permite INSERT a todos (es un
  formulario público) y SELECT/UPDATE solo a admin. Verificado con la clave anon real.
- **`es_admin()` es SECURITY DEFINER** con `search_path` fijo: si no, la política de
  `perfiles` se llamaría a sí misma y recursaría.
- **Los límites de longitud están duplicados** (validación + CHECK) a propósito: uno da un
  mensaje legible, el otro aguanta cuando alguien se salta la aplicación.
- **El panel devuelve 404, no 403** — un 403 confirma que existe. Y las Server Actions
  vuelven a comprobar `esAdmin()`: son endpoints públicos que no pasan por el layout.
- **El error de envío es un código, no una frase** (`campos` | `ritmo` | `servidor`). El sitio
  es bilingüe y el texto sale del diccionario.
- Falta el aviso por correo: hoy hay que entrar al panel a mirar.

### Pendiente — Fase 3 (permisos)

- Tabla de permisos por usuario (acceso total / por rama / por módulo, con vencimiento) + panel
  `/academia/admin`. Hoy **cualquier usuario autenticado ve el catálogo completo**.
  `app/academia/queries.ts` es el único punto donde hay que filtrar.
- El progreso sigue en `localStorage` y debe migrar a la base.
- Mapear las URLs viejas `/academia/<módulo>` a las nuevas anidadas, en el middleware.

---

## 📚 Documentos relacionados

- `docs/site-analysis-report.md` — análisis completo del estado actual (mayo 2026)
- `README.md` — guía de setup técnico
- `.env.example` — variables de entorno requeridas

---

*Fin de CLAUDE.md — AlphaDev Studios*
