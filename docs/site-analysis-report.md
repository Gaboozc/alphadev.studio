# AlphaDev Studios — Análisis del Sitio Web

**Fecha**: 2026-05-07  
**Generado por**: Claude Code (claude-sonnet-4-6)  
**Propósito**: Análisis exhaustivo previo a decisión de retomar / refactorizar / partir limpio.  
**Directorio analizado**: `c:\Users\gazav\OneDrive\Desktop\AlphaWEB`

---

## 📊 Resumen Ejecutivo

El proyecto es un quasi-monorepo con tres carpetas: `/web` (Next.js 16, App Router, TypeScript — la aplicación principal), `/frontend` (Vite + React, prototipo anterior) y `/ai-specs-main` (documentación de specs para un proyecto ATS/LTI diferente, no relacionado con el sitio). La documentación interna (`MIGRATION_COMPLETE.md` del 20 Feb 2026) confirma que `/web` fue construido como una migración deliberada desde `/frontend`, alcanzando un estado "producción lista" según sus propios registros. Sin embargo, hoy hay **4 bloqueantes críticos** para un deploy real: los formularios de contacto no envían nada, hay un bug de metadata en Client Components, todo el contenido social (testimonios, casos de estudio, logos de clientes) es placeholder, y los datos de contacto y dominio en sitemap son ficticios.

**Veredicto preliminar**: **Retomar** — el proyecto `/web` está al ~70% funcional. La arquitectura está bien planteada, el diseño es profesional y el código es limpio. No vale la pena partir limpio.

**Tiempo estimado para tener sitio funcional y deployable**:
- Contenido real (si ya tienes el material): **4–8 horas**
- Backend de formularios (API route + email): **4–6 horas**  
- Fixes de bugs + limpieza: **2–3 horas**
- **Total: 2–3 días de trabajo** (asumiendo que el contenido real existe o puede crearse rápido)

---

## 1. Estructura del Proyecto

### Árbol de directorios (hasta 4 niveles)

```
AlphaWEB/                              ← Raíz (sin package.json propio válido)
├── ai-specs-main/                     ← Specs de un proyecto ATS/LTI (NO relacionado al sitio)
│   ├── .cursor/
│   │   ├── commands/                  ← 7 comandos Cursor IDE
│   │   └── rules/
│   ├── ai-specs/
│   │   ├── .agents/                   ← Prompts de agentes (backend/frontend)
│   │   ├── .commands/                 ← Comandos de desarrollo
│   │   ├── changes/                   ← Changelog (SCRUM-10_backend.md)
│   │   └── specs/
│   │       ├── api-spec.yml           ← Spec OpenAPI de ATS (no del sitio web)
│   │       ├── backend-standards.mdc
│   │       ├── base-standards.mdc
│   │       ├── data-model.md          ← Modelo de datos ATS (Candidatos, Entrevistas...)
│   │       ├── development_guide.md
│   │       ├── documentation-standards.mdc
│   │       └── frontend-standards.mdc
│   ├── AGENTS.md
│   ├── CLAUDE.md                      ← Solo contiene "ai-specs/specs/base-standards.mdc"
│   ├── GEMINI.md
│   ├── README.md
│   └── codex.md
│
├── frontend/                          ← Prototipo Vite anterior (OBSOLETO)
│   ├── src/
│   │   ├── components/AnimatedLogo/   ← Origen del componente logo animado
│   │   ├── pages/Home/
│   │   ├── css/globals/
│   │   ├── assets/img/
│   │   ├── App.jsx                    ← Obsoleto (usa BrowserRouter, patrón viejo)
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── vercel.json
│   └── index.html
│
├── web/                               ← APLICACIÓN PRINCIPAL (Next.js 16 App Router)
│   ├── app/
│   │   ├── contacto/
│   │   │   ├── enterprise/page.tsx
│   │   │   ├── startup/page.tsx
│   │   │   └── page.tsx
│   │   ├── portafolio/page.tsx
│   │   ├── proceso/page.tsx
│   │   ├── servicios/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/
│   │   ├── CTASection.tsx
│   │   ├── CapabilitiesSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── StackSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── TrustSection.tsx
│   │   └── ValueProposition.tsx
│   ├── public/
│   │   ├── assets/img/
│   │   │   ├── alphadev-logo.png
│   │   │   └── alphadev-script-logo.png
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── [SVGs placeholder de Next.js por defecto]
│   ├── .next/                         ← Build output (no commitear)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── vercel.json
│   ├── .env.example
│   ├── next-env.d.ts
│   ├── README.md
│   └── MIGRATION_COMPLETE.md
│
├── package-lock.json                  ← Lock file huérfano en raíz (sin package.json raíz)
└── remanente.md                       ← Documento de Feb 19, 2026: intención de partir limpio
```

### Identificación del framework

- **Framework principal**: Next.js 16.1.6 con **App Router** (directorio `app/`, layouts, Server Components)
- **Estructura**: Quasi-monorepo sin gestor de workspace formal (no hay `pnpm-workspace.yaml`, ni `workspaces` en `package.json` raíz — de hecho, no hay `package.json` raíz válido)
- **Sub-aplicaciones**: `/web` (activa) y `/frontend` (obsoleta)

---

## 2. Stack y Dependencias

### `/web/package.json` — Aplicación principal

**Producción:**
| Dependencia | Versión |
|-------------|---------|
| next | 16.1.6 |
| react | 19.2.3 |
| react-dom | 19.2.3 |

**Dev Dependencies:**
| Dependencia | Versión |
|-------------|---------|
| @tailwindcss/postcss | ^4 |
| @types/node | ^20 |
| @types/react | ^19 |
| @types/react-dom | ^19 |
| eslint | ^9 |
| eslint-config-next | 16.1.6 |
| tailwindcss | ^4 |
| typescript | ^5 |

**Scripts disponibles:**
```json
"dev":   "next dev"
"build": "next build"
"start": "next start"
"lint":  "eslint"
```

### `/frontend/package.json` — Prototipo obsoleto

**Producción:**
| Dependencia | Versión |
|-------------|---------|
| react | ^19.2.0 |
| react-dom | ^19.2.0 |
| react-router-dom | ^7.2.1 |

**Dev Dependencies:**
| Dependencia | Versión |
|-------------|---------|
| vite | ^7.3.1 |
| @vitejs/plugin-react | ^5.1.1 |
| eslint | ^9.39.1 |

### Análisis de dependencias

- **Dependencias deprecadas o abandonadas**: Ninguna detectada. El stack está en versiones muy recientes.
- **Vulnerabilidades conocidas**: No se puede determinar sin ejecutar `npm audit`, pero el stack es nuevo y las versiones son recientes.
- **Inconsistencias detectadas**: Ninguna. Tailwind v4 es consistente en todo el proyecto `/web`.
- **Nota sobre versiones**: Next.js 16.1.6 y React 19.2.3 son versiones de 2026 (posteriores al conocimiento del analista). Se asume que son estables basándose en la documentación interna que confirma builds exitosos.
- **Versión de Node requerida**: 20.x (especificado en `vercel.json`)

---

## 3. Configuración

### `web/next.config.ts`
```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**.vercel.app' }],
  },
};
```
Configuración mínima. Optimización de imágenes habilitada. Sin rewrites, sin redirects, sin headers custom de seguridad.

### `web/tsconfig.json`
- **Strict mode**: ✅ habilitado (`"strict": true`)
- **Target**: ES2017
- **Module resolution**: bundler
- **Path alias**: `@/*` → raíz del proyecto
- **noEmit**: true (correcto para Next.js)
- Sin paths adicionales personalizados

### `web/.env.example`
```
NEXT_PUBLIC_CONTACT_EMAIL=info@alphadev.com     # placeholder
NEXT_PUBLIC_CONTACT_PHONE=+1 (234) 567-890      # placeholder
# SENDGRID_API_KEY=...                           # comentado, no implementado
# NEXT_PUBLIC_ANALYTICS_ID=...                   # comentado, no implementado
# DATABASE_URL=...                               # comentado, no implementado
```
**No existe `.env.local` en el repositorio** — las variables de entorno reales no están configuradas.

### `web/eslint.config.mjs`
ESLint con `next/core-web-vitals` + `next/typescript`. Configuración estándar de Next.js, no personalizada.

### `web/postcss.config.mjs`
Solo `@tailwindcss/postcss` — correcto para Tailwind v4.

### `web/vercel.json`
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "nodeVersion": "20.x"
}
```
Configuración completa y correcta para Vercel.

### Variables de entorno referenciadas en código
- `info@alphadev.com` y `+1 (234) 567-890` están **hardcodeadas** en `Footer.tsx` y `contacto/page.tsx` (no se usan las variables de `.env.example`).
- No se encontraron referencias a `process.env.NEXT_PUBLIC_*` en el código fuente activo.

### CI/CD
- **No existe** carpeta `.github/workflows/`.
- No hay Husky, no hay pre-commit hooks.

---

## 4. Código Fuente

### Componentes — `/web/components/`

| Archivo | `use client` | Líneas | Propósito |
|---------|:---:|:-----:|-----------|
| `Navbar.tsx` | ✅ | 102 | Barra de navegación sticky con detección de scroll, menú móvil, links a todas las páginas |
| `Footer.tsx` | ❌ | 97 | Footer con links, info de empresa, email/teléfono hardcodeados |
| `Hero.tsx` | ❌ | 56 | Sección hero: logo animado SVG con halos giratorios (inline, no componentizado) |
| `TrustSection.tsx` | ❌ | 40 | Marquee de logos de clientes — **todo placeholder** ("Client A"–"Client H") |
| `ServicesSection.tsx` | ❌ | 84 | Grid de 6 servicios con íconos emoji y descripciones |
| `CapabilitiesSection.tsx` | ❌ | 49 | Grid 3 columnas: Engineering, Product, Strategy |
| `ProcessSection.tsx` | ❌ | 87 | Timeline de 5 pasos con líneas de conexión |
| `CaseStudiesSection.tsx` | ❌ | 48 | 3 tarjetas de casos de estudio — **todo placeholder/mock** |
| `StackSection.tsx` | ❌ | 61 | Grid de 12 tecnologías con hover animations |
| `CTASection.tsx` | ❌ | 41 | Call-to-action final con botón "Iniciar Proyecto" |
| `ValueProposition.tsx` | ❌ | 68 | 3 pilares de propuesta de valor (¿Qué hacemos? / ¿Para quién? / ¿Qué problema?) |
| `TestimonialsSection.tsx` | ❌ | 41 | 3 testimonios — **todo placeholder** con nota explícita de sustitución |

**Total componentes**: 12  
**Server Components**: 11 | **Client Components**: 1 (Navbar)

### Páginas — `/web/app/`

| Ruta | Archivo | `use client` | Estado |
|------|---------|:---:|--------|
| `/` | `app/page.tsx` | ❌ | Funcional — compone 8 secciones |
| `/servicios` | `app/servicios/page.tsx` | ❌ | Funcional — 6 servicios con detalle |
| `/portafolio` | `app/portafolio/page.tsx` | ❌ | Funcional — 6 proyectos mock |
| `/proceso` | `app/proceso/page.tsx` | ❌ | Funcional — 5 fases |
| `/contacto` | `app/contacto/page.tsx` | ✅ | Frontend funcional — sin backend |
| `/contacto/startup` | `app/contacto/startup/page.tsx` | ✅ | Frontend funcional — sin backend |
| `/contacto/enterprise` | `app/contacto/enterprise/page.tsx` | ✅ | Frontend funcional — sin backend |

### Patrones Server vs Client Components
- **Correcto**: La mayoría del contenido estático usa Server Components.
- **Correcto**: Navbar usa `use client` (necesita estado para scroll y menú móvil).
- **Bug**: Las páginas `/contacto/startup` y `/contacto/enterprise` declaran `use client` pero también exportan `metadata` — esto es inválido en Next.js App Router. Los metadatos de estas páginas **no se aplicarán**.

### Hooks personalizados
**Ninguno.** El estado local se maneja directamente con `useState` dentro de los componentes.

### Utilidades / lib / helpers
**Ninguno.** No existen carpetas `lib/`, `utils/`, `helpers/` ni `services/`.

### Tipos compartidos
**Ninguno.** No hay archivos `.d.ts` ni carpeta `types/`. TypeScript se usa inline en cada componente. Dado que el proyecto es simple y estático, esto no es problemático actualmente.

### Archivos vacíos o stubs
**Ninguno.** Todos los archivos tienen contenido sustancial.

### Code smells y deuda técnica

**1. Duplicación masiva del SVG del logo animado:**  
El mismo bloque SVG (42 líneas) aparece **4 veces** en los archivos de contacto:
- `contacto/startup/page.tsx`: 2 veces (header + form section)
- `contacto/enterprise/page.tsx`: 2 veces (header + form section)
Este SVG debería ser un componente reutilizable.

**2. `console.log` sin limpiar en producción:**
```typescript
// contacto/page.tsx:20
console.log('Form submitted:', formData);

// contacto/startup/page.tsx:27
console.log('Startup form submitted:', formData);

// contacto/enterprise/page.tsx:28
console.log('Enterprise form submitted:', formData);
```

**3. `alert()` en formularios:**  
Los tres formularios de contacto usan `alert()` del navegador como feedback de éxito — inaceptable en producción.

**4. Datos de contacto hardcodeados:**
- `info@alphadev.com` en Footer y contacto/page.tsx
- `+1 (234) 567-890` en Footer y contacto/page.tsx
- Estos deberían leerse de variables de entorno o configuración.

**5. Bug `metadata` en Client Component:**
- `contacto/startup/page.tsx` y `contacto/enterprise/page.tsx` exportan `metadata` con `use client` — esto es ignorado por Next.js.

**6. `App.jsx` obsoleto en `/frontend`:**
- `frontend/src/App.jsx` usa `BrowserRouter` (patrón viejo) mientras que `main.jsx` ya usa `createBrowserRouter`. Hay código muerto.

---

## 5. Routing y Páginas

### Mapa completo de rutas (Next.js App Router)

```
/                              → app/page.tsx            (Home — 8 secciones)
/servicios                     → app/servicios/page.tsx  (Servicios — 6 cards)
/portafolio                    → app/portafolio/page.tsx (Portfolio — 6 proyectos)
/proceso                       → app/proceso/page.tsx    (Proceso — 5 fases)
/contacto                      → app/contacto/page.tsx   (Formulario general)
/contacto/startup              → app/contacto/startup/   (Formulario Startup)
/contacto/enterprise           → app/contacto/enterprise/(Formulario Enterprise)
```

**Total rutas**: 7

### Layout compartido
`app/layout.tsx` — envuelve todo con Navbar + Footer, configura fuentes Geist, idioma `es`, fondo `bg-gray-950`.

### Estados especiales
- **Loading states**: No implementados (no existe `loading.tsx`)
- **Error boundaries**: No implementados (no existe `error.tsx`)
- **Not Found**: No implementado (no existe `not-found.tsx`)
- **Middleware**: No existe `middleware.ts`

### Nota sobre los links del Navbar
El Navbar incluye links a todas las rutas. También referencia "Agendar Reunión" y "Explorar Todos los Servicios" que llevan a `/contacto`.

---

## 6. API Routes / Backend

**No existe ninguna API route.**

Los formularios de contacto son enteramente client-side:
1. El usuario llena el formulario
2. Se presiona "Enviar"
3. Se ejecuta `console.log(formData)` 
4. Se espera 1 segundo (setTimeout simulado)
5. Se muestra un `alert()` de "éxito"
6. Se resetea el formulario

**No se envía ningún email. No se guarda nada. Los datos se pierden.**

No hay integración con:
- Servicios de email (SendGrid, Resend, Nodemailer)
- Base de datos
- CRM
- Servicios de notificación
- Webhooks

---

## 7. Base de Datos / Servicios Externos

**Ninguno integrado en `/web`.**

- No hay cliente de Supabase
- No hay Prisma
- No hay Stripe
- No hay Resend / SendGrid activo
- No hay Cal.com
- No hay Analytics (Google Analytics, Vercel Analytics, Plausible)
- No hay cron jobs

El `.env.example` menciona SendGrid comentado y Analytics comentado — nunca implementados.

**Sobre `ai-specs-main/`**: Contiene un modelo de datos detallado (`data-model.md`) para un sistema ATS/LTI (Candidatos, Empleados, Posiciones, Entrevistas). Este es un **proyecto completamente diferente** — no tiene relación con el sitio web de AlphaDev Studios. Probablemente sean specs de un proyecto de cliente o ejercicio académico.

---

## 8. Diseño y Estilos

### Sistema de diseño
**Tailwind CSS v4** con estilos personalizados en `app/globals.css`.

### Paleta de colores
| Token | Valor |
|-------|-------|
| Background | `#0f172a` (slate-950 / `bg-gray-950` en Tailwind) |
| Foreground | `#f1f5f9` |
| Primary | `#0080ff` (azul corporativo) |
| Dark (alternativo) | `#0d0d0d` |

### Tipografías
- **Primaria**: Geist Sans (Google Fonts / `next/font/google`)
- **Monoespaciada**: Geist Mono (Google Fonts / `next/font/google`)
- Variables CSS: `--font-geist-sans`, `--font-geist-mono`

### Tema
**Solo dark mode** — no hay soporte para light mode.

### Animaciones CSS definidas en `globals.css`
Más de 20 keyframes: `rotate`, `rotate-reverse`, `fade-in`, `fade-in-up`, `fade-in-left`, `fade-in-right`, `glow`, `pulse-glow`, `lineShine`, `linePulse`, `float`, `shimmer`, `gridMove`, `slideHorizontal`, `slideVertical`, `cornerPulse`, `pulseRing`, `rotateClockwise`, `rotateCounterClockwise`, `rotatePulse`.

### Clases utilitarias personalizadas
- `.btn-glow` — botón con efecto glow + animación shine
- `.process-card` — tarjeta 3D con transform en hover
- `.service-card` — tarjeta con fondo circular expandible
- `.glass-card` — efecto glassmorphism
- `.section-container`, `.section-header`, `.section-content` — layout utilities
- `.animated-logo-container`, `.animated-logo__halo`, `.animated-logo__svg`, etc. — logo animado

### Componentes UI
**Ningunos de librerías externas.** Todo es custom con Tailwind + CSS puro. No se usa shadcn/ui, Radix, Headless UI, Mantine, etc.

### Iconos
**Emojis** en ServicesSection (🌐, ⚡, 🏢, 🔗, 🗄️, 🔒) y ProcessSection. No se usa Lucide, Heroicons, ni SVG library.

### Breakpoints
Mobile-first con clases Tailwind: `sm:`, `md:`, `lg:`, `xl:`.

---

## 9. Contenido / Copy

### Idioma
**Español** como idioma principal. Los nombres de tecnologías y algunos términos técnicos están en inglés (React, Next.js, TypeScript, etc.).

### Estado del contenido por página

| Página | Contenido Real | Placeholder | Notas |
|--------|:--------------:|:-----------:|-------|
| Home / Hero | ✅ Logo | — | Solo logo, sin texto hero |
| Home / TrustSection | ❌ | ✅ | "Client A"–"H", nota explícita |
| Home / ServicesSection | ✅ | — | 6 servicios reales |
| Home / CapabilitiesSection | ✅ | — | Contenido genérico pero aceptable |
| Home / ProcessSection | ✅ | — | 5 fases de trabajo |
| Home / CaseStudiesSection | ❌ | ✅ | Nota: "Cambiaremos estos ejemplos por los tuyos" |
| Home / StackSection | ✅ | — | 12 tecnologías reales |
| Home / CTASection | ✅ | — | Copy aceptable |
| Home / ValueProposition | ✅ | — | 3 pilares |
| Home / TestimonialsSection | ❌ | ✅ | Nota: "Sustituiremos por testimonios reales" |
| /servicios | ✅ | — | Contenido detallado por servicio |
| /portafolio | ❌ | ✅ | 6 proyectos ficticios (fintech, retail, logistics) |
| /proceso | ✅ | — | Proceso de trabajo detallado |
| /contacto | ✅ | — | Formulario funcional (UI) |
| /contacto/startup | ✅ | — | Formulario con campos de startup |
| /contacto/enterprise | ✅ | — | Formulario con campos enterprise |

### Datos de contacto hardcodeados (ficticios)
- Email: `info@alphadev.com`
- Teléfono: `+1 (234) 567-890`
- Estos aparecen en: `Footer.tsx`, `contacto/page.tsx`, `.env.example`

### Menciones de marca
"AlphaDev Studios" y "AlphaDev" se usan consistentemente en todo el proyecto. El tagline principal es "Ingeniería de Software Empresarial".

---

## 10. Assets

### Inventario completo de assets

#### `/web/public/` — Assets principales

| Path | Formato | Propósito | Estado |
|------|---------|-----------|--------|
| `assets/img/alphadev-logo.png` | PNG | Logo cuadrado de AlphaDev (imagen principal) | ✅ Real |
| `assets/img/alphadev-script-logo.png` | PNG | Logo script/tipografía para Navbar | ✅ Real |
| `robots.txt` | TXT | SEO — permite crawling | ✅ Correcto |
| `sitemap.xml` | XML | SEO — 5 URLs indexadas | ⚠️ Dominio placeholder |
| `file.svg` | SVG | Ícono default de Next.js | ❌ No se usa |
| `globe.svg` | SVG | Ícono default de Next.js | ❌ No se usa |
| `next.svg` | SVG | Ícono default de Next.js | ❌ No se usa |
| `vercel.svg` | SVG | Ícono default de Next.js | ❌ No se usa |
| `window.svg` | SVG | Ícono default de Next.js | ❌ No se usa |
| `assets/react.svg` | SVG | Ícono React (no se usa) | ❌ No se usa |

#### `/web/app/` — Assets de la app

| Path | Formato | Propósito |
|------|---------|-----------|
| `app/favicon.ico` | ICO | Favicon del sitio |

#### `/frontend/public/` — Prototipo obsoleto

| Path | Formato | Propósito |
|------|---------|-----------|
| `vite.svg` | SVG | Logo de Vite (default, no se usa) |

#### `/frontend/src/assets/` — Prototipo obsoleto

| Path | Formato | Propósito |
|------|---------|-----------|
| `img/alphadev-logo.png` | PNG | Copia del logo (origen) |
| `img/alphadev-script-logo.png` | PNG | Copia del logo script |
| `react.svg` | SVG | Default de Vite (no se usa) |

### Notas sobre assets
- **No hay OG Image** (Open Graph image) configurada — el metadata tiene `openGraph` pero sin `images`.
- **No hay favicon SVG** — solo el `.ico` básico.
- **No hay videos, GIFs, PDFs.**
- Los 5 SVGs default de Next.js en `/web/public/` son basura que debería limpiarse.
- Las dos imágenes PNG del logo son los únicos assets de marca reales.

---

## 11. SEO y Meta

### Metadata global (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  title: 'AlphaDev Studios | Ingeniería de Software Empresarial',
  description: 'Soluciones de software a medida: desarrollo web, APIs escalables, CRM, seguridad.',
  keywords: 'desarrollo web, APIs backend, CRM, sistemas internos, ingeniería de software',
  authors: [{ name: 'AlphaDev Studios' }],
  openGraph: {
    title: 'AlphaDev Studios',
    description: 'Ingeniería de Software Empresarial',
    type: 'website',
  },
};
```

**Faltante en OG**: No hay `images` en openGraph — cuando alguien comparte el link en redes sociales, no habrá preview visual.

### Metadata por página
- `/servicios`: Tiene `metadata` propio (inferido por estructura, título propio)
- `/portafolio`: Tiene `metadata` propio
- `/proceso`: Tiene `metadata` propio
- `/contacto`: No tiene `metadata` — hereda del layout
- `/contacto/startup`: **Bug** — declara `metadata` en Client Component (se ignora)
- `/contacto/enterprise`: **Bug** — declara `metadata` en Client Component (se ignora)

### Sitemap (`/web/public/sitemap.xml`)
5 URLs indexadas: `/`, `/servicios`, `/portafolio`, `/proceso`, `/contacto`  
**Dominio**: `https://alphadev.com` — **PLACEHOLDER** (probablemente no es el dominio real)  
**Última modificación**: 2026-02-20  
**Changefreq**: weekly (servicios/portafolio), monthly (proceso/contacto)  
**Prioridades**: 1.0 (home), 0.8 (servicios/portafolio), 0.7 (proceso/contacto)

Las URLs de startup y enterprise NO están en el sitemap.

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /_next/
```
Correcto y estándar.

### Schema.org / JSON-LD
**No implementado.**

### Twitter Cards
**No configurado.**

---

## 12. Build y Deploy

### Estado del build
- Existe una carpeta `.next/` en el repositorio — evidencia de que el proyecto compiló exitosamente en el pasado.
- `MIGRATION_COMPLETE.md` confirma: "✅ Build exitoso sin errores" (Feb 20, 2026).
- **No se ejecutó un build nuevo** durante este análisis (cumpliendo restricciones).

### Warnings / Errores conocidos (sin ejecutar build)
**Bug crítico detectado en análisis estático:**
- `contacto/startup/page.tsx` y `contacto/enterprise/page.tsx` exportan `metadata` en componentes con `'use client'`. Next.js emitirá un warning y la metadata será ignorada.

### Configuración de deploy
- **Vercel**: Configurado en `web/vercel.json` con `framework: "nextjs"`, Node 20.x.
- **GitHub Actions**: No configurado.
- El repo tiene su propio `.git/` dentro de `/web/` — lo cual es inusual (el directorio raíz no es un repo Git, pero `/web/` sí lo es).

---

## 13. Documentación Existente

### Archivos de documentación

| Archivo | Ubicación | Contenido |
|---------|-----------|-----------|
| `README.md` | `/web/` | Guía completa en español: stack, estructura, deploy. Actualizado Feb 20, 2026 |
| `MIGRATION_COMPLETE.md` | `/web/` | Historial de migración Vite → Next.js. Estado "producción lista" |
| `remanente.md` | Raíz | **Crítico**: Intención de Feb 19, 2026 de partir limpio. Código del AnimatedLogo para reutilizar |
| `README.md` | `/frontend/` | Guía del prototipo Vite en inglés |
| `README.md` | `/ai-specs-main/` | Docs del proyecto ATS/LTI |
| `CLAUDE.md` | `/ai-specs-main/` | Solo referencia `ai-specs/specs/base-standards.mdc` |

### TODO / FIXME en código
**No se encontraron comentarios TODO o FIXME.**

### Comentarios significativos en código
Tres notas explícitas de placeholder en componentes:
```
// TrustSection.tsx: "Placeholder de logos. Reemplazaremos con los logos reales cuando los compartas."
// TestimonialsSection.tsx: "Confianza social real. Sustituiremos estos textos por testimonios reales."
// CaseStudiesSection.tsx: "Resultados medibles en contextos reales. Cambiaremos estos ejemplos por los tuyos."
```

---

## 14. Estado de Completitud

### ¿Qué FUNCIONA hoy si lo deployamos?

- ✅ La página de inicio renderiza con todas sus secciones (con contenido placeholder en algunas)
- ✅ Navbar y Footer funcionan en todas las páginas
- ✅ Navegación entre las 7 rutas
- ✅ Animación del logo (SVG inline)
- ✅ Página /servicios con 6 servicios detallados
- ✅ Página /proceso con 5 fases
- ✅ Formularios de contacto (UI funcional — los campos, validación HTML5, estado de envío)
- ✅ Diseño responsive (mobile → desktop)
- ✅ Dark theme consistente
- ✅ robots.txt y sitemap.xml servidos correctamente
- ✅ Fuentes Geist cargando desde Google Fonts

### ¿Qué está EMPEZADO pero incompleto?

- 🚧 **Formularios de contacto**: UI lista, pero sin backend — no envían nada real
- 🚧 **Analytics**: Mencionado en `.env.example` pero no integrado
- 🚧 **Sitemap**: Generado pero con dominio placeholder (`alphadev.com`)
- 🚧 **OG Image**: Metadata de Open Graph sin imagen configurada
- 🚧 **Metadata de páginas /contacto/startup y /contacto/enterprise**: Declaradas pero no funcionan (bug)

### ¿Qué está ROTO?

- ❌ **Formularios no envían emails**: El `handleSubmit` hace `console.log` + `setTimeout` + `alert()` — ningún dato llega a ningún lado
- ❌ **Metadata de `/contacto/startup` y `/contacto/enterprise`**: `metadata` export en Client Component es ignorado por Next.js App Router
- ❌ **`alert()` como UX**: Completamente inadecuado para producción (bloquea el thread, interfaz nativa del browser)

### ¿Qué falta COMPLETAMENTE?

- ❓ **OG Image / Twitter Card image**: Sin imagen para previews en redes sociales
- ❓ **API route de contacto**: `app/api/contact/route.ts` no existe
- ❓ **Servicio de email**: SendGrid, Resend, o cualquier alternativa
- ❓ **Analytics**: Google Analytics, Vercel Analytics, Plausible
- ❓ **Loading states** (`loading.tsx`): Sin feedback visual durante navegación
- ❓ **Error boundaries** (`error.tsx`): Sin manejo de errores en producción
- ❓ **Not Found page** (`not-found.tsx`): Sin página 404 personalizada
- ❓ **Contenido real**: Testimonios reales, casos de estudio reales, logos de clientes reales, proyectos reales de portafolio
- ❓ **Dominio real**: Actualizar sitemap.xml con el dominio definitivo
- ❓ **Datos de contacto reales**: Email y teléfono reales en Footer y formulario
- ❓ **Schema.org / JSON-LD**: Para mejor SEO como empresa local/agencia
- ❓ **Twitter Cards metadata**
- ❓ **Favicon SVG** (solo existe `.ico`)
- ❓ **Variables de entorno en Vercel**: `.env.local` no configurado

---

## 15. Calidad y Deuda Técnica

### Fortalezas
- TypeScript strict mode activado — sin tipos `any` detectados
- Server Components usado correctamente en la mayoría de componentes
- Separación clara layout / páginas / componentes
- Tailwind v4 con sistema de tokens coherente
- 0 dependencias de terceros en producción (solo Next.js + React)
- 0 archivos vacíos o stubs

### Deuda técnica identificada

| Severidad | Issue | Archivos afectados |
|-----------|-------|-------------------|
| 🔴 Crítico | Formularios no envían emails — datos se pierden | contacto/page.tsx, startup/page.tsx, enterprise/page.tsx |
| 🔴 Crítico | `metadata` en Client Component (bug Next.js) | startup/page.tsx, enterprise/page.tsx |
| 🟠 Alto | SVG del logo duplicado 4 veces sin componentizar | startup/page.tsx, enterprise/page.tsx |
| 🟠 Alto | `console.log()` en 3 páginas de producción | contacto/page.tsx, startup/page.tsx, enterprise/page.tsx |
| 🟠 Alto | `alert()` como feedback de formulario | contacto/page.tsx, startup/page.tsx, enterprise/page.tsx |
| 🟡 Medio | Datos de contacto hardcodeados (no env vars) | Footer.tsx, contacto/page.tsx |
| 🟡 Medio | 5 SVGs default de Next.js sin usar en public/ | /web/public/ |
| 🟡 Medio | `/frontend/src/App.jsx` obsoleto (código muerto) | frontend/src/App.jsx |
| 🟡 Medio | package-lock.json huérfano en raíz | / |
| 🟢 Bajo | No hay página 404 personalizada | — |
| 🟢 Bajo | No hay loading.tsx ni error.tsx | — |
| 🟢 Bajo | Sin Schema.org/JSON-LD | — |
| 🟢 Bajo | Sin OG Image para social sharing | — |

### Imports no usados / archivos sin usar
- 5 SVGs en `web/public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — son el boilerplate de `create-next-app` y no se usan en ningún componente.
- `frontend/src/App.jsx` — obsoleto, el proyecto Vite ya no lo necesita.
- `frontend/src/assets/react.svg` — sin uso.

---

## ✅ Lo Que YA Está Hecho

- Estructura completa de Next.js App Router con 7 rutas
- 12 componentes TypeScript sin tipos `any`
- Layout global con Navbar, Footer, fuentes y tema dark
- Página de inicio con 8 secciones (Hero, Trust, Services, Capabilities, Process, CaseStudies, Stack, CTA)
- Páginas de Servicios y Proceso con contenido real y detallado
- 3 variantes de formulario de contacto (general, startup, enterprise) con UI completa
- Sistema de animaciones CSS extenso y personalizado (20+ keyframes)
- Tailwind v4 configurado correctamente
- robots.txt y sitemap.xml presentes
- Configuración de Vercel lista
- TypeScript strict mode sin errores (al momento de la última build)
- Diseño responsive mobile-first
- Metadata SEO básica configurada en layout
- Imagen del logo (PNG) y logo script disponibles
- Favicon configurado
- Build `.next/` existente (evidencia de compilación exitosa previa)

---

## 🚧 Lo Que Está EMPEZADO Pero Incompleto

- **Backend de formularios**: La lógica del submit existe pero termina en console.log. Falta crear `app/api/contact/route.ts` e integrar un servicio de email.
- **Metadata por página**: Configurada en algunas páginas, bugueada en startup/enterprise, ausente en contacto general.
- **Open Graph**: Metadata presente pero sin imagen — solo texto, sin preview visual.
- **Analytics**: Mencionado en env.example, no implementado.
- **Sitemap**: Generado pero con dominio placeholder.

---

## ❌ Lo Que Está ROTO

- **Los formularios de contacto no funcionan**: Ninguno de los 3 envía datos a ningún lugar. En producción, los usuarios creerán que enviaron su mensaje pero no llegará nada.
- **Metadata de /contacto/startup y /contacto/enterprise**: El bug de `metadata` en Client Component hace que Google no indexe títulos y descripciones correctas para esas páginas.
- **UX de formularios**: El `alert()` del browser es una experiencia de usuario inaceptable para una agencia de software profesional.

---

## ❓ Lo Que FALTA Completamente

- Contenido real: testimonios de clientes reales, casos de estudio reales con métricas reales, proyectos reales en portafolio, logos de clientes reales
- Datos de contacto reales: email funcional, teléfono real
- Dominio real en sitemap y metadata
- API route de contacto con integración de email
- Variables de entorno configuradas en Vercel
- Página 404 personalizada
- Loading states y Error boundaries
- Open Graph image para social sharing
- Schema.org markup para agencia de software
- Twitter Cards configuration
- CI/CD (GitHub Actions)
- Analytics y monitoring

---

## 💡 Recomendaciones

### Si decides RETOMAR:

**Orden de prioridad recomendado:**

1. **Fix crítico inmediato** (1h): Separar `metadata` de los Client Components en startup y enterprise. Crear un `page.tsx` Server Component que renderice los formularios como subcomponentes client.

2. **Backend de formularios** (4-6h): Crear `app/api/contact/route.ts` con integración a Resend (recomendado — simple, gratis hasta 3k emails/mes) o SendGrid. Reemplazar el `alert()` con un estado de éxito in-page.

3. **Componentizar el SVG duplicado** (1h): Extraer el SVG del logo animado de startup/page.tsx y enterprise/page.tsx a un componente `<AnimatedLogoBackground />`.

4. **Limpiar console.logs y alerts** (30min): Remover los 3 `console.log()` y los 3 `alert()`.

5. **Contenido real** (variable — depende de ti): Reemplazar testimonios, casos de estudio, logos de clientes y proyectos de portafolio con material real.

6. **Configuración de deploy** (2h): Actualizar sitemap con dominio real, configurar .env.local en Vercel, actualizar email y teléfono reales, agregar OG Image.

7. **Quick wins de SEO** (2h): Agregar `not-found.tsx`, `error.tsx`, configurar Twitter Cards y OG Image.

### Si decides PARTIR LIMPIO:

**Lo que vale la pena rescatar del proyecto actual:**

- ✅ **Los componentes de layout**: `Navbar.tsx` y `Footer.tsx` son sólidos — reutilizar directamente
- ✅ **`globals.css`**: El sistema de animaciones CSS y tokens es valioso — copiar íntegro
- ✅ **El diseño y estructura de páginas**: La jerarquía de secciones y el sistema de clases CSS funciona bien
- ✅ **Las 2 imágenes PNG de logo**: Son los únicos assets de marca únicos
- ✅ **`vercel.json`** y configuración de TypeScript
- ✅ **La idea de 3 variantes de formulario** (general/startup/enterprise): Es un diferenciador inteligente, replicar la estructura

**Lo que NO vale la pena rescatar:**

- ❌ `/frontend/` completo — obsoleto
- ❌ `/ai-specs-main/` — es de un proyecto diferente (ATS/LTI)
- ❌ Los SVGs default de Next.js en public/
- ❌ El código de formularios tal como está — reescribir con backend desde el inicio

### Decisiones que tienes que tomar antes de continuar:

1. **¿Cuál es el dominio real?** — Para actualizar sitemap, metadata, og:url, etc.
2. **¿Cuál es el email y teléfono de contacto real?** — Para reemplazar los placeholders
3. **¿Qué servicio de email usarás para los formularios?** — Resend, SendGrid, Nodemailer con SMTP, o Vercel Functions con provider propio
4. **¿Tienes testimonios y casos de estudio reales?** — Son los bloqueantes de contenido más visibles
5. **¿Qué proyectos van en el portafolio?** — ¿Proyectos reales de clientes o proteger privacidad con proyectos internos?
6. **¿Necesitas multilenguaje (es/en)?** — Mejor decidirlo antes de agregar más contenido
7. **¿Analytics?** — Vercel Analytics (gratis, nativo) vs Google Analytics vs Plausible
8. **¿La carpeta `/ai-specs-main/` es para este proyecto o para otro?** — Si es para otro, removerla del monorepo

---

## 🔐 Notas de Seguridad

### Sin issues críticos de seguridad detectados

- ✅ No hay secretos o API keys hardcodeados en código fuente
- ✅ No hay archivos `.env.local` con secretos en el repositorio
- ✅ El `.env.example` solo contiene valores placeholder y comentarios
- ✅ No hay eval(), dangerouslySetInnerHTML, ni patrones de XSS detectados
- ✅ TypeScript strict mode reduce vulnerabilidades de tipo

### Issues de seguridad menores

| Severidad | Issue |
|-----------|-------|
| 🟡 Medio | Los formularios de contacto no tienen CSRF protection — una vez que se agregue el API route, implementar protección |
| 🟡 Medio | `next.config.ts` no configura security headers (X-Frame-Options, CSP, etc.) |
| 🟡 Medio | Sin rate limiting en formularios (una vez que exista el API route, agregar limitación de envíos) |
| 🟢 Bajo | Email y teléfono hardcodeados son datos públicos — no es un riesgo de seguridad, pero sí de mantenimiento |
| 🟢 Bajo | `.next/` con build output está en el repositorio — añadir a `.gitignore` del subrepositorio |

### Recomendaciones de seguridad para producción

1. Agregar security headers en `next.config.ts`:
```typescript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }];
}
```
2. Implementar rate limiting en el API route de contacto (e.g., Upstash Redis + `@upstash/ratelimit`)
3. Agregar validación server-side de los datos del formulario (Zod recomendado)
4. Verificar que el build output `.next/` esté en `.gitignore`

---

## 📦 Apéndice: Inventario Completo de Assets

### Imágenes en uso activo

| Path | Formato | Propósito | Notas |
|------|---------|-----------|-------|
| `web/public/assets/img/alphadev-logo.png` | PNG | Logo cuadrado — usado en Hero y formularios de contacto | Asset principal de marca |
| `web/public/assets/img/alphadev-script-logo.png` | PNG | Logo tipográfico — usado en Navbar | Barra de navegación |
| `web/app/favicon.ico` | ICO | Favicon del navegador | Básico, sin SVG alternativo |

### Imágenes sin usar (candidatas a eliminar)

| Path | Formato | Origen | Estado |
|------|---------|--------|--------|
| `web/public/file.svg` | SVG | Boilerplate create-next-app | ❌ Sin uso |
| `web/public/globe.svg` | SVG | Boilerplate create-next-app | ❌ Sin uso |
| `web/public/next.svg` | SVG | Boilerplate create-next-app | ❌ Sin uso |
| `web/public/vercel.svg` | SVG | Boilerplate create-next-app | ❌ Sin uso |
| `web/public/window.svg` | SVG | Boilerplate create-next-app | ❌ Sin uso |
| `web/public/assets/react.svg` | SVG | Residual de migración | ❌ Sin uso |
| `frontend/public/vite.svg` | SVG | Boilerplate Vite | ❌ Sin uso |
| `frontend/src/assets/react.svg` | SVG | Boilerplate Vite | ❌ Sin uso |
| `frontend/src/assets/img/alphadev-logo.png` | PNG | Copia en proyecto obsoleto | 🗑️ Proyecto obsoleto |
| `frontend/src/assets/img/alphadev-script-logo.png` | PNG | Copia en proyecto obsoleto | 🗑️ Proyecto obsoleto |

### Assets faltantes recomendados

| Asset | Formato recomendado | Propósito |
|-------|-------------------|-----------|
| `/web/public/og-image.png` | PNG, 1200×630px | Open Graph / Twitter Card |
| `/web/public/favicon.svg` | SVG | Favicon moderno (complementa .ico) |
| `/web/public/apple-touch-icon.png` | PNG, 180×180px | iOS bookmark icon |
| Logos de clientes | SVG o PNG con fondo transparente | TrustSection (reemplazar placeholders) |

---

*Fin del análisis — generado el 2026-05-07 por Claude Code (claude-sonnet-4-6)*
