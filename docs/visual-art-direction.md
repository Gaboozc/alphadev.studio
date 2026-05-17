# Visual Art Direction — AlphaDev Studios
> Documento generado por Claude Code en rol de Director de Arte.  
> Última actualización: Mayo 2026  
> Referencia: `CLAUDE.md` §Pipeline de generación de assets visuales

---

## 🔍 Diagnóstico del estado actual

### Assets existentes
| Archivo | Tamaño | Estado | Acción |
|---------|--------|--------|--------|
| `alphadev-logo.png` | **1.4 MB** | ⚠️ Crítico — demasiado pesado | Optimizar a <100KB en squoosh.app (WebP) |
| `alphadev-script-logo.png` | 170 KB | ⚠️ Mejorable | Optimizar a <50KB |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | — | ❌ Assets default Next.js sin uso | Eliminar |

**Sin SVG del logo.** Sin OG image. Sin favicon SVG. Sin hero background. Sin iconos custom.

### Inventario de gaps visuales por sección

| Sección | Gap crítico | Impacto |
|---------|------------|---------|
| **Hero** | Sin background 3D — fondo plano gris | 🔴 Máximo — primera impresión |
| **ServicesSection** | 6 emojis (🌐 ⚡ 💼 🔗 🔍 🔐) | 🟠 Alto — rompe el mood premium |
| **StackSection** | Mezcla de emojis + texto plano | 🟠 Alto — incoherente visualmente |
| **CapabilitiesSection** | Sin ilustraciones, solo texto | 🟡 Medio |
| **ProcessSection** | CSS-only, sin iconos reales | 🟡 Medio |
| **TrustSection** | "Client A–H" placeholder visible | 🔴 Máximo — quema credibilidad |
| **CaseStudiesSection** | Sin mockups de dispositivos | 🟡 Medio — esperar contenido real |
| **TestimonialsSection** | Quotes placeholder visibles | 🔴 Alto — quema credibilidad |
| **OG Image** | Inexistente — social sharing roto | 🟠 Alto — SEO y distribución |
| **Favicon SVG** | Solo .ico por defecto | 🟡 Medio |

---

## 🎨 Criterio de coherencia visual (obligatorio para todo asset)

Antes de aprobar cualquier imagen generada, verificar:
- [ ] Background base es `#0f172a` o más oscuro — **nunca blanco, nunca gris claro**
- [ ] Acento de luz/glow es `#0080ff` — sin excepciones
- [ ] Materiales son obsidiana, cromo oscuro, vidrio translúcido — sin plástico brillante genérico
- [ ] Sin texto, sin logos, sin humanos, sin UI visible dentro del render
- [ ] Mood: Apple keynote × Linear × Vercel — **no cyberpunk neon, no glassmorphism fluido**
- [ ] La imagen sirve como fondo o complemento — **nunca compite con el texto del sitio**

---

## 🔴 BATCH 1 — Hero Background (PRIORIDAD MÁXIMA)

**Contexto:** El hero es la primera impresión. Actualmente es un fondo plano oscuro con el logo animado SVG. Necesita una imagen de fondo 3D que eleve el nivel de "tecnología deseable" sin ocultar el logo animado (que es el elemento principal).

**Integración prevista:** `components/Hero.tsx` — como `background-image` en `.hero__background` o como `<Image>` con `position: absolute` detrás del logo.

**Especificación técnica:**
- Dimensiones: 2560×1080px (21:9 ultrawide)
- Formato final: WebP, calidad ~80, target **<400KB**
- Ruta destino: `public/assets/img/hero-bg.webp`

### Prompt para Nanobanana (Gemini) — Hero Background

```
Premium 3D render in Apple keynote aesthetic, ultra-wide cinematic format.

Subject: A large obsidian sphere positioned at the center-left of the composition, slightly below the visual midpoint. The sphere has a luminous internal plasma core in electric blue (#0080ff), glowing from within through a semi-translucent obsidian shell. A precise geometric grid of thin lines — 8% white opacity — extends from the sphere outward across the background plane, receding into depth with perspective. Tiny light particles drift slowly around the sphere like a slow orbit system.

Materials: Highly polished obsidian surface with subtle micro-scratches catching blue light, semi-translucent dark chrome outer shell, the internal plasma core is volumetric and slightly turbulent like a contained nebula.

Lighting: Primary volumetric light source is the blue plasma core (#0080ff) casting soft blue-electric illumination on the floor and nearby grid lines. Secondary cold white rim light from the top-right at 15% intensity. A soft floor glow pool beneath the sphere — blue at 8% opacity. No harsh shadows anywhere.

Background: Deep seamless gradient from #0f172a (center area behind sphere) to pure #000000 at edges and corners. The gradient is radial — darker at edges, slightly less dark at center. Zero grain, zero noise.

Composition: Sphere occupies approximately 30% of frame height, centered at the 35% mark from the left edge. The right 55% of the frame is intentional negative space — completely dark and clean for text and UI overlays. A barely visible circular halo of desaturated blue (4% opacity) radiates 2.5x the sphere diameter.

Mood: Cinematic, sophisticated, restrained, premium tech product photography. The emotional equivalent of walking into a darkened Apple keynote before the product reveal. Desirable, precise, controlled.

Restrictions: Absolutely no text, no logos, no watermarks, no human figures, no UI elements, no lens flares, no star bursts.

Aspect ratio: 21:9 — minimum 2560×1080 pixels. Ultra-wide cinematic.
```

**Iteración sugerida en Gemini (si el primer resultado necesita ajuste):**
- Si la esfera se ve demasiado brillante: "Make the sphere surface darker and more matte, reduce the core glow intensity by 40%"
- Si el grid es muy visible: "Make the geometric grid lines more subtle, reduce opacity to 5%"
- Si el negative space no es suficiente: "Move the sphere further to the left, ensure the right 60% of the image is clean dark background"
- Si el fondo no es suficientemente oscuro: "Darken the background significantly, it should be nearly black (#0a0f1e), not gray"

---

## 🟠 BATCH 2 — Service Icons (6 iconos)

**Contexto:** `ServicesSection.tsx` usa emojis (🌐 ⚡ 💼 🔗 🔍 🔐). Son inconsistentes con el mood premium. Necesitamos un set de 6 iconos con estilo coherente.

**Decisión de estilo:** 3D mini-objects con materiales obsidiana/cromo. Estilo: pequeños objetos flotantes, fondo transparente, iluminación desde arriba-izquierda con acento azul. Alternativa si 3D no rinde bien: line art premium en SVG monocromático.

**Especificación técnica:**
- Dimensiones: 512×512px cada uno
- Formato: PNG con fondo transparente (si 3D) o SVG (si line art)
- Peso máximo: 50KB cada uno
- Ruta destino: `public/assets/icons/service-[nombre].png`

> **Nota:** Generar todos en la MISMA conversación de Gemini para coherencia visual. Empezar con el icono de Web Dev como referencia, luego iterar el resto pidiendo "same style as the previous, but for [service]".

### Prompt base para el set (usar para el primero, Web Dev)

```
Premium 3D icon render in Apple keynote aesthetic. Square format, 1:1.

Subject: A minimalist 3D object representing professional web development — a sleek dark monitor or browser window frame, floating slightly tilted 15 degrees, with a subtle blue glow emanating from its screen surface. The object is small, centered, and occupies 50% of the frame.

Materials: Polished obsidian body with beveled dark chrome edges, the screen or active surface emits a subtle electric blue (#0080ff) light.

Lighting: Soft directional light from top-left in cold white at 20% intensity, blue-electric fill light from below matching the screen glow, zero shadows from the object onto background.

Background: Fully transparent (PNG alpha channel). If transparency is not possible: deep radial gradient from #1a2540 at center to #0f172a at edges.

Mood: Minimal, premium, tech product icon. Not cartoon, not flat — volumetric and three-dimensional but restrained.

Restrictions: No text, no labels, no logos, no humans, no decorative elements, no lens flares. Single centered object only.

Aspect ratio: 1:1 — 512×512 pixels minimum. Transparent background.
```

### Los 6 iconos a generar (usar el prompt base adaptando el sujeto)

| # | Servicio | Sujeto para el prompt |
|---|---------|----------------------|
| 1 | Desarrollo Web | `a sleek dark monitor frame or browser window, floating and tilted slightly, with blue glow from the screen` |
| 2 | APIs & Backend | `an abstract network node — a small dark sphere with thin connection lines radiating outward, like a hub in a constellation, glowing electric blue at connection points` |
| 3 | CRM y Sistemas Internos | `a minimalist dark dashboard or panel with tiny glowing data bars, floating at a slight angle, like a premium analytics interface in miniature` |
| 4 | Integración Frontend–Backend | `two dark connector nodes linked by a luminous electric-blue bridge or cable, slightly curved, floating symmetrically, suggesting data flow and connection` |
| 5 | Optimización de BD | `a polished dark cylinder — representing a database — with concentric ring layers visible on top, a subtle blue pulse emanating from the center downward` |
| 6 | Seguridad y Autenticación | `a sleek dark shield with a minimalist keyhole or lock symbol etched in relief, a blue glow outlining the shield edges, floating at slight tilt` |

---

## 🟠 BATCH 3 — OG Image (SEO crítico)

**Contexto:** Sin OG image, cuando el sitio se comparte en Twitter/LinkedIn/Slack se muestra un preview vacío o el favicon. Esto destruye la primera impresión en redes sociales.

**Integración prevista:** Referenciado en `layout.tsx` metadata openGraph.images.

**Especificación técnica:**
- Dimensiones: **1200×630px exactos** (ratio 1.91:1)
- Formato: PNG o WebP, target **<400KB**
- Ruta destino: `public/assets/img/og-image.png`
- Debe ser legible a tamaño thumbnail (300×157px)

### Prompt para Nanobanana — OG Image

```
Premium dark tech composition for social media preview card, 1200x630 pixels exactly.

Subject: Left half of the image features the obsidian sphere from the hero (same style — dark sphere with electric blue plasma core glowing from within, floating slightly). Right half features a text composition area — leave it completely clean and dark for manual text overlay, OR include the text "AlphaDev Studios" in clean sans-serif white font at 60px and below it "Ingeniería de Software Empresarial" in gray (#94a3b8) at 28px, positioned in the right 45% of the frame. The AlphaDev logo mark (a simple geometric alpha symbol) appears subtly in the bottom-right corner at 20% opacity as a watermark-style brand mark.

Materials and lighting: Same as hero — obsidian sphere, blue plasma core, cold rim light, no harsh shadows.

Background: Horizontal gradient from #0f172a on the left to #0a0a0f on the right. Subtle blue glow pool beneath the sphere. A very thin blue line (1px, 30% opacity) separating the sphere area from the text area — optional.

Composition: Sphere centered in the left 45% of the frame, occupying 60% of the frame height. Right 55% is clean negative space with text. No visual clutter.

Mood: Professional, premium, LinkedIn-ready. Should look premium both at full size and as a small social card thumbnail.

Restrictions: No watermarks, no UI elements.

Format: 1200×630px exactly, 16:9 aspect ratio cropped to this size.
```

---

## 🟡 BATCH 4 — Capabilities Illustrations (3 ilustraciones)

**Contexto:** `CapabilitiesSection.tsx` tiene 3 capabilities (Engineering, Product, Strategy) con solo texto. Una ilustración abstracta por capability elevaría la sección significativamente.

**Especificación técnica:**
- Dimensiones: 800×600px cada una
- Formato: WebP, target <150KB
- Ruta destino: `public/assets/img/capability-engineering.webp`, etc.

### Prompts

**Engineering:**
```
Premium 3D abstract render in Apple keynote aesthetic. Landscape format 4:3.

Subject: An intricate network of connected dark nodes — small obsidian spheres connected by thin luminous lines in electric blue (#0080ff) — forming a complex but ordered architectural pattern. Suggests a system architecture or API topology map. The network is dense in the center and becomes sparser toward the edges.

Materials: Obsidian node spheres, thin crystalline connection lines glowing blue, slight volumetric light emanating from node intersections.

Lighting: Blue glow from node connections, cold white rim light from top, deep darkness at edges creating vignette.

Background: Deep radial gradient #0f172a center to #000000 edges.

Composition: Network centered, 70% of frame, fading into darkness at edges. Clean negative space at top for text overlay.

Mood: Sophisticated, technical, ordered, premium. Linear.app aesthetic.

Restrictions: No text, no humans, no logos. Abstract network only.

Aspect ratio: 4:3 — 800×600px.
```

**Product:**
```
Premium 3D abstract render in Apple keynote aesthetic. Landscape format 4:3.

Subject: A polished dark mobile device (abstract, no brand — just a sleek rectangular form) displaying a glowing dashboard interface in miniature. The device floats at a slight 15-degree angle. The screen emits electric blue (#0080ff) light suggesting active data visualization. Around the device, subtle micro-particles suggest interaction and engagement.

Materials: Dark chrome device body, luminous screen surface with blue interface glow.

Lighting: Screen glow as primary light source in blue, cold rim light from upper right.

Background: Deep gradient #0f172a to #080c14.

Mood: Product-focused, premium mobile aesthetic, user-centered technology.

Restrictions: No real UI, no text on screen, no brand identifiers. Abstract device form only.

Aspect ratio: 4:3 — 800×600px.
```

**Strategy:**
```
Premium 3D abstract render in Apple keynote aesthetic. Landscape format 4:3.

Subject: A minimalist chess-like arrangement of 3-4 dark geometric pieces on a reflective obsidian surface — suggesting strategic positioning and decision-making. The pieces are abstract, not literal chess pieces — think angular dark obelisks or cylinders of varying heights. A single piece is illuminated by a blue spotlight from above, drawing focus.

Materials: Polished obsidian pieces, mirror-smooth surface, subtle blue light reflection on the board.

Lighting: Single volumetric spotlight in electric blue (#0080ff) illuminating one piece, the rest in near darkness. Cinematic.

Background: Near-black gradient, deep and empty, drawing all attention to the lit piece.

Mood: Strategic, focused, decisive, cinematic. The visual equivalent of "intentional decisions."

Restrictions: No text, no humans, no chess iconography. Abstract geometric objects only.

Aspect ratio: 4:3 — 800×600px.
```

---

## 🟡 BATCH 5 — Process Step Icons (5 iconos)

**Contexto:** `ProcessSection.tsx` tiene 5 pasos con CSS-only cards. Pequeños iconos consistentes reforzarían la narrativa visual del proceso.

**Especificación técnica:**
- Dimensiones: 256×256px
- Formato: PNG transparente
- Peso máximo: 30KB
- Ruta destino: `public/assets/icons/process-01.png` ... `process-05.png`

**Generar todos en la misma conversación de Gemini — mismo estilo para coherencia.**

### Prompt base — usar para paso 01, luego iterar

```
Minimal premium 3D icon, Apple keynote aesthetic. Square format 1:1, transparent background.

Subject: [VER TABLA ABAJO — sujeto específico por paso]

Style: Very small, precise 3D object. Same visual language as a premium app icon. Dark materials with electric blue (#0080ff) accent detail. Floating, casting no visible shadow.

Materials: Dark obsidian body, one small electric blue (#0080ff) detail element (glow, line, point).

Lighting: Even, subtle, cold white from top-left. Blue accent from the glowing element.

Background: Transparent PNG. If not possible: very dark #0d1117 to #0f172a radial gradient.

Mood: Technical precision, minimal, premium. NOT cute, NOT cartoon.

Restrictions: No text, no labels, single subject, centered in frame.

Format: 1:1 — 256×256px minimum. Transparent background PNG.
```

| Paso | Título | Sujeto |
|------|--------|--------|
| 01 | Análisis y Arquitectura | `a small dark magnifying glass with a blue glowing circuit element visible inside the lens, suggesting discovery and analysis` |
| 02 | Diseño del Sistema | `a minimal dark blueprint or schematic — thin intersecting lines forming a simple architectural plan, with one node highlighted in blue` |
| 03 | Desarrollo Modular | `stacked dark modular blocks like LEGO-style cubes in obsidian, precisely aligned, with a blue connecting line threading through them` |
| 04 | Testing y Seguridad | `a dark shield with a small checkmark or test-pass indicator in electric blue, suggesting verified security and quality` |
| 05 | Deploy y Soporte | `a small dark rocket form — minimal, geometric, not cartoonish — with a blue flame trail below, suggesting launch and production deployment` |

---

## 🟡 BATCH 6 — Stack Section (tech logos)

**Contexto:** `StackSection.tsx` usa emojis y texto plano (⚛️ ▲ TS ⬡ 🐘 🍃 🐳 ☁️ 📡 ◊ 🔐 📦). Estos **no necesitan generación por IA** — todos tienen logos SVG oficiales gratuitos.

**Acción:** Descargar SVGs oficiales de las siguientes fuentes y colocar en `public/assets/tech/`:

| Tecnología | Fuente del SVG |
|-----------|----------------|
| React | simpleicons.org/react |
| Next.js | simpleicons.org/nextdotjs |
| TypeScript | simpleicons.org/typescript |
| Node.js | simpleicons.org/nodedotjs |
| PostgreSQL | simpleicons.org/postgresql |
| MongoDB | simpleicons.org/mongodb |
| Docker | simpleicons.org/docker |
| AWS | simpleicons.org/amazonaws |
| GraphQL | simpleicons.org/graphql |
| Git | simpleicons.org/git |

**Instrucción para Claude Code cuando se implemente:**
1. Descargar los SVGs
2. Tintarlos en blanco o `#94a3b8` (gris claro) para coherencia sobre fondo oscuro
3. Reemplazar el contenido de `technologies` en `StackSection.tsx` con `<Image>` por cada tech

---

## 🟡 BATCH 7 — Favicon SVG

**Contexto:** El favicon actual es el default de Next.js. Necesitamos un favicon SVG minimalista basado en el logo de AlphaDev.

**Especificación técnica:**
- 32×32px (SVG escala)
- Formato: SVG + PNG fallback 180×180 (apple-touch-icon)
- Peso: <5KB
- Ruta destino: `public/favicon.svg` y `public/apple-icon.png`

**Este NO necesita generación por IA.** Es un trabajo de diseño vectorial manual o con herramienta SVG. La versión simplificada del logo alpha (α) o el símbolo geométrico del logo actual, tintado en `#0080ff` sobre fondo `#0f172a`.

---

## 🔴 Optimizaciones urgentes (hacer ANTES de cualquier generación)

Estas acciones no requieren generación de assets — son optimizaciones del estado actual:

### 1. Optimizar logos existentes (CRÍTICO)
```
alphadev-logo.png (1.4MB → target <80KB):
- Abrir en squoosh.app
- Formato: WebP
- Calidad: 75-80
- Verificar que no se vea degradada visualmente
- Guardar como alphadev-logo.webp

alphadev-script-logo.png (170KB → target <40KB):
- Mismo proceso
- Guardar como alphadev-script-logo.webp
```
Luego actualizar en `Navbar.tsx` y `Hero.tsx` a extensión `.webp`.

### 2. Eliminar assets default de Next.js sin uso
Archivos a eliminar de `public/`:
- `file.svg`
- `globe.svg`
- `next.svg`
- `vercel.svg`
- `window.svg`

---

## 📋 Orden de ejecución recomendado

```
Semana 1 (Visual identity crítica):
  [ ] Optimizar alphadev-logo.png y alphadev-script-logo.png en squoosh.app
  [ ] Eliminar 5 SVGs default de Next.js
  [ ] Generar Hero Background (Batch 1) — nanobanana
  [ ] Integrar Hero Background en Hero.tsx

Semana 2 (Iconografía):
  [ ] Generar Service Icons set (Batch 2) — 6 iconos en misma conversación Gemini
  [ ] Integrar en ServicesSection.tsx reemplazando emojis
  [ ] Descargar tech SVGs de simpleicons.org (Batch 6)
  [ ] Integrar en StackSection.tsx

Semana 3 (SEO + completado):
  [ ] Generar OG Image (Batch 3)
  [ ] Integrar en layout.tsx metadata
  [ ] Generar Capabilities illustrations (Batch 4)
  [ ] Integrar en CapabilitiesSection.tsx
  [ ] Diseñar Favicon SVG

Semana 4+ (Polish):
  [ ] Process Step Icons (Batch 5)
  [ ] Case Study mockups (cuando haya contenido real)
  [ ] 404 page illustration
```

---

## ⚠️ Reglas de no-hacer para este proceso

- **NO** integrar assets sin antes optimizarlos en squoosh.app (target por tipo en CLAUDE.md)
- **NO** usar `<img>` — siempre `<Image>` de Next.js con `width`, `height` y `alt` correctos
- **NO** generar assets en colores fuera de paleta (no magenta, no verde, no gradientes arcoíris)
- **NO** mezclar estilos entre batches — si el Batch 2 usa 3D, todos los iconos deben ser 3D
- **NO** aprobar assets que compitan visualmente con el texto del sitio
- **NO** empezar integración de código antes de tener la imagen optimizada y aprobada visualmente

---

*Documento generado por Claude Code — Rol: Director de Arte*  
*Basado en: `CLAUDE.md` — AlphaDev Studios*
