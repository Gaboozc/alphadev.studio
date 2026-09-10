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
Cada elemento visual debe venir del **mismo universo**: crema cálida, dorado como único acento, trazo fino tipo grabado, espacio negativo generoso. Papel de alta gama y prensa tipográfica, no producto tecnológico. Un asset que rompa esta coherencia NO entra al sitio, por bonito que sea por separado.

**Lo que NO va, nunca**: fondos oscuros, azul, glows, glassmorphism, renders 3D de material brillante, neón. Todo eso pertenece al sitio anterior.

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
4. Materiales: `"thin engraved gold linework, delicate arcs, sparse geometric lattice"`
5. Zona reservada: `"the left two thirds must stay clean and empty"`
6. Mood: `"calm, warm, confident, expensive, generous negative space"`
7. Restricciones: `"no dark backgrounds, no blue, no glow, no glassmorphism, no 3D render, no text, no logos, no watermarks, no people"`
8. Aspecto y tamaño: `"1200x630"`, `"1:1"`, etc.

**Coherencia obligatoria**:
- SIEMPRE crema `#FAFAF7` / `#F2EEE7` como fondo
- SIEMPRE dorado `#9A7235` o `#C9A465` como único acento
- SIEMPRE trazo fino: grabado, filigrana, línea delicada — nunca relleno ni volumen
- SIEMPRE dejar explícita la zona vacía si el asset va a llevar texto encima
- NUNCA pedir colores fuera de paleta sin discusión previa
- NUNCA mezclar estilos (flat illustration junto a render 3D)

**Para iterar en Gemini**:
- Iterar en la MISMA conversación: mantiene el contexto visual
- Pedir cambios concretos: *"move the linework further right"*, *"make the lines thinner"*
- Si está al 80%, iterar. Si está al 30%, prompt nuevo desde cero.

### Inventario de assets

**Hecho**:
- OG Image (1200×630) — `app/opengraph-image.tsx` + `app/_og/background.jpg`
- Favicon SVG y apple-icon — `app/icon.svg`, `app/apple-icon.tsx`
- Iconografía de servicios — resuelta con `components/Icon.tsx` (line art propio, sin emojis ni assets generados)

**Pendiente, si alguna vez hace falta**:
- Foto de Gabriel Muria para `/tarjeta/gabriel-muria` (la de Zavarse ya está)
- Mockups de case studies — dispositivo mostrando el trabajo real
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
- ✅ Multi-idioma es/en planeado (no implementado aún)
- ✅ Imperial Barbershop = case study real, el resto placeholder hasta tener más
- ✅ Logo animado SVG inline en Hero (mantener, no reemplazar)
- ❌ NO usar libraries pesadas (Framer Motion sí, GSAP no a menos que necesidad real)
- ❌ NO usar componentes de shadcn por ahora (mantener todo custom)
- ❌ NO Tailwind v3 downgrade

---

## 📐 Arquitectura del sitio

### Rutas actuales
```
/                       → Home (8 secciones)
/servicios              → Servicios (6 cards)
/portafolio             → Portfolio (placeholder por reemplazar)
/proceso                → Proceso (5 fases)
/contacto               → Form general
/contacto/startup       → Form Startup
/contacto/enterprise    → Form Enterprise
```

### Componentes existentes (`web/components/`)
- `Navbar.tsx` (Client, sticky con scroll detection)
- `Footer.tsx` (Server)
- `Hero.tsx` (Server, logo animado SVG inline) ⚠️ **En proceso de evolución: agregar background 3D premium**
- `TrustSection.tsx` (placeholder logos — pendiente contenido real)
- `ServicesSection.tsx` (6 servicios con emojis 🌐 ⚡ — **pendiente cambiar a iconos custom**)
- `CapabilitiesSection.tsx`
- `ProcessSection.tsx`
- `CaseStudiesSection.tsx` (placeholder — pendiente Imperial real)
- `StackSection.tsx`
- `CTASection.tsx`
- `ValueProposition.tsx`
- `TestimonialsSection.tsx` (placeholder — pendiente testimonios reales)

---

## 🚧 Estado actual y pendientes

### 🔴 Bloqueantes críticos (prioridad MÁXIMA)

1. **Backend de formularios** — Resend pendiente integrar. Hoy los 3 forms hacen `console.log + alert()`. NO se envía nada.
2. **Bug metadata en Client Components** — `contacto/startup/page.tsx` y `contacto/enterprise/page.tsx` exportan `metadata` con `'use client'`. Next.js lo ignora. Refactor a Server Component wrapper requerido.
3. **Contenido placeholder visible** — TrustSection, CaseStudiesSection, TestimonialsSection muestran "Client A-H" y similares. Cualquier visitante lo nota.

### 🟠 Mejoras visuales en curso (evolución hacia "tecnología deseable")

4. **Hero background 3D premium** — generado con nanobanana, esfera obsidiana con plasma azul + grid geométrico. Imagen lista, falta integrar al Hero sin romper logo animado SVG.
5. **Iconografía custom** — reemplazar emojis (🌐 ⚡ 🏢 🔗 🗄️ 🔒) por iconos 3D o line art coherentes con el mood.
6. **Card design upgrade** — cards actuales son funcionales pero genéricas. Agregar:
   - Bordes con gradient sutil al hacer hover
   - Glow blue muy controlado en focus state
   - Materiales (sensación de profundidad, no flat)
   - Micro-animations on enter
7. **Backgrounds de sección** — patterns sutiles, no fondos planos. Grid lines tipo Linear, dots tipo Vercel, o waves sutiles tipo Stripe.

### 🟡 Mejoras estructurales

8. **OG Image** — generar 1200×630px con la estética definida (sphere + glow + logo discreto)
9. **Favicon SVG** moderno (complementa .ico)
10. **Loading states** (`loading.tsx`) y **Error boundaries** (`error.tsx`)
11. **Not Found page** (`not-found.tsx`) — oportunidad para algo creativo (404 cinematográfico)
12. **Schema.org / JSON-LD** para SEO de agencia
13. **Twitter Cards** metadata
14. **Multi-idioma es/en** (cuando contenido base esté pulido)

### 🟢 Limpieza técnica

15. Remover 5 SVGs default de Next.js sin usar en `web/public/`
16. Remover `/frontend/` (proyecto Vite obsoleto) si ya no se referencia
17. Componentizar SVG del logo animado (está duplicado 4 veces entre startup y enterprise)
18. Remover `console.log` y `alert()` en los 3 formularios (cuando se integre Resend)
19. Datos de contacto a variables de entorno (hoy hardcodeados)

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

- `main` = producción
- `dev` = integración
- `feature/[nombre]` = trabajo en curso
- Nunca commits directos a `main`

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
- **Email**: zavarsegabriel@gmail.com (pendiente migrar a hello@alphadev.studio)
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
| **Construir** | Programación (Fundamentos del oficio → Desarrollo Web → Back-end y datos → Producto IA), Diseño, IA Aplicada, Ingeniería de IA |
| **Crecer** | Marketing, Contenido & SEO, Negocio & Datos |

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
  y dejar pasar el resto. Su matcher está limitado a `['/academia', '/academia/:path*', '/acceso']`;
  cubrir todo el sitio tumbó producción entera una vez.
- **Siempre `getUser()`, nunca `getSession()`** en el servidor: getSession lee la cookie sin
  verificarla contra Supabase, así que un valor manipulado pasaría.
- Variables: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. En local en `.env.local`,
  en Vercel en Project Settings → Environment Variables. La clave `sb_secret_` no se usa ni hace falta.

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
