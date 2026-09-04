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
- **Vercel.com** — typography-first, dark mode premium, gradients sutiles
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
**Oscuro técnico + futurista cyber controlado + 3D premium Apple-style.**

Pensemos: Linear × Vercel × Apple keynote × ligeros toques de sci-fi. NO cyberpunk neón total, NO glassmorphism orgánico fluido. Sobriedad con momentos de impacto visual.

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

### Filosofía
Cada elemento visual del sitio debe sentirse como si viniera del **mismo universo**: obsidiana translúcida, plasma azul controlado, materiales premium, profundidad cinematográfica. Un asset que rompa esta coherencia NO entra al sitio, sin importar qué tan bonito sea individualmente.

### Modelos disponibles para generación
- **Nanobanana (Gemini Advanced)** — PRINCIPAL. Iteración conversacional, excelente para 3D renders, materiales, paisajes abstractos. Prompts en inglés producen mejores resultados.
- **GPT-4o / DALL-E** — ALTERNATIVO. Composiciones más controladas, bueno para iconografía y ilustraciones flat/semi-flat.
- **Ideogram** — Para assets que necesiten tipografía integrada (posters, banners).

### Workflow estándar
```
1. Claude Code inspecciona el componente/sección del sitio
2. Claude Code genera prompt optimizado para nanobanana/GPT
   (en inglés, con hex codes, aspect ratio, composición, estilo)
3. Gabriel copia el prompt → lo pega en Gemini/GPT → genera
4. Gabriel itera conversacionalmente en Gemini hasta estar satisfecho
5. Gabriel descarga en máxima calidad (PNG full size)
6. Quitar watermarks si hay (Photopea, recorte, o pedirle al modelo)
7. Optimizar en squoosh.app → WebP o AVIF, calidad ~80, target <500KB
8. Subir a web/public/assets/img/ con nombre descriptivo
9. Claude Code integra al componente con Next.js <Image>
```

### Reglas para generación de prompts (obligatorio para Claude Code)

**Estructura del prompt** (en este orden):
1. Estilo dominante: "Premium 3D render in Apple keynote aesthetic"
2. Sujeto/composición: qué hay en la imagen y dónde
3. Materiales: "glossy obsidian, translucent, polished dark chrome"
4. Iluminación: "volumetric blue (#0080ff) from below, subtle rim light"
5. Background: "deep slate gradient (#0f172a to #000000)"
6. Composición: dónde va el sujeto, dónde el negative space
7. Mood: "cinematic, sophisticated, minimal, premium tech"
8. Restricciones: "no text, no logos, no watermarks, no humans"
9. Aspect ratio y resolución: "16:9 / 21:9 / 1:1, 2560px minimum"

**Coherencia obligatoria**:
- SIEMPRE incluir `#0080ff` como color de acento/glow
- SIEMPRE incluir `#0f172a` como background base
- SIEMPRE referencia a materiales tipo "obsidian, dark chrome, translucent glass"
- SIEMPRE pedir "Apple keynote / premium tech product photography" como estilo
- NUNCA pedir colores fuera de paleta sin discusión previa
- NUNCA mezclar estilos (no combinar flat illustration con 3D render)

**Para iteración en Gemini (nanobanana)**:
- Iterar en la MISMA conversación (mantiene contexto visual)
- Pedir cambios específicos: "move sphere to the right", "make glow more subtle"
- NO empezar conversación nueva para cada variación
- Si la imagen está al 80%, iterar. Si está al 30%, nuevo prompt desde cero.

### Inventario de assets necesarios (por prioridad)

**🔴 Prioridad ALTA (definen la identidad visual)**:
1. Hero background — esfera 3D obsidiana con plasma azul ✅ GENERADO (pendiente integrar)
2. Logo — evaluar si el actual es suficiente o necesita upgrade al nuevo estilo 3D
3. OG Image (1200×630px) — para social sharing
4. Favicon SVG — versión simplificada del logo

**🟠 Prioridad MEDIA (mejoran la experiencia significativamente)**:
5. Iconos de servicios (×6) — reemplazar emojis 🌐 ⚡ 🏢 por iconos 3D o line art coherentes
6. Backgrounds de secciones — patterns sutiles (grids, dots, waves) para separar visualmente
7. Ilustraciones de capabilities (×3) — Engineering, Product, Strategy
8. Ilustraciones de proceso (×5) — para los 5 pasos del timeline

**🟡 Prioridad BAJA (polish final)**:
9. Mockups de case studies — dispositivos mostrando el trabajo (laptop + mobile)
10. 404 page illustration — oportunidad creativa (esfera rota, glitch, portal)
11. Loading skeleton — coherente con el tema
12. Texturas/patterns reutilizables — para backgrounds de cards, secciones

### Especificaciones técnicas por tipo de asset

| Tipo | Dimensiones | Formato | Peso máximo | Notas |
|------|------------|---------|-------------|-------|
| Hero bg | 2560×1080+ | WebP/AVIF | 500KB | 21:9 wide |
| Section bg | 1920×800+ | WebP/AVIF | 300KB | Sutil, no dominar |
| OG Image | 1200×630 | PNG | 500KB | Fondo oscuro + logo + tagline |
| Service icon | 512×512 | PNG/SVG | 50KB | Fondo transparente |
| Process icon | 256×256 | PNG/SVG | 30KB | Estilo consistente entre los 5 |
| Case study mockup | 1200×800 | WebP | 400KB | Dispositivo + screenshot |
| Favicon | 32×32 + 180×180 | SVG + PNG | 10KB | Simplificado |
| Pattern/texture | 400×400 tileable | SVG/PNG | 20KB | Repetible sin costuras |

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
   `minimum-release-age=7` espera 7 días antes de permitir instalar nuevos releases (tiempo para que ataques se detecten antes de llegar a tu máquina). `save-exact` evita rangos (`^`, `~`) que actualizan automáticamente.

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
pnpm tiene ventajas reales sobre npm (velocidad, disco, resolución estricta), pero **NO es una mitigación de seguridad contra supply chain attacks**. Si se migra, es por rendimiento y organización, no por seguridad. La decisión de migrar se toma cuando haya tiempo y justificación, no en pánico.

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
| `app/academia/content/<rama>.ts` | El contenido real, un archivo por rama |
| `app/academia/modules.ts` | Barril que junta y re-exporta. No editar contenido acá |

### Reglas

- **Para agregar un módulo**: editar `content/<rama>.ts`. La rama se deriva del `track` vía `RAMA_OF_TRACK` — no se declara a mano.
- **Los links se arman con** `ramaHref()` / `moduleHref()` / `lessonHref()`, nunca a mano.
- **Metadata de áreas**: fuente única en `TRACK_META`. No duplicar la tabla en componentes.
- **`audience`** en cada módulo separa contenido vendible (`'aprendizaje'`) de formación interna (`'capacitacion'`). Ausente = `'aprendizaje'`.
- **Markdown de las lecciones** (`components/LessonContent.tsx`): soporta `## sección`, `### subtítulo`, `**negrita**`, `` `código` `` (también dentro de negritas), bloques ` ``` ` con lenguaje opcional y listas con `- `. No hay más sintaxis: cualquier otra cosa se renderiza como texto plano.
- URLs: `/academia/<rama>/<módulo>/<lección>`. Un módulo vive en una sola rama; pedirlo bajo otra da 404.
- Estilos nuevos usan clases `.acad-*` en `globals.css`, no estilos inline.

### Pendiente — Fases 2 y 3

- **Fase 2 (auth)**: `PasswordGate` es una contraseña en texto plano dentro de un componente de cliente. No protege nada: la contraseña se lee en el bundle y el contenido de los cursos viaja al navegador sin autenticarse. Reemplazar por Supabase Auth con validación en servidor antes de vender acceso. El progreso también debe migrar de `localStorage` a la base.
- **Fase 3 (permisos)**: tabla de permisos por usuario (acceso total / por rama / por módulo, con vencimiento) + panel `/academia/admin`.
- El middleware de la Fase 2 es también el lugar para mapear las URLs viejas `/academia/<módulo>`.

---

## 📚 Documentos relacionados

- `docs/site-analysis-report.md` — análisis completo del estado actual (mayo 2026)
- `README.md` — guía de setup técnico
- `.env.example` — variables de entorno requeridas

---

*Fin de CLAUDE.md — AlphaDev Studios*
