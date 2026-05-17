# Prompt Claude Code — Director de Arte: Auditoría Visual + Generación de Prompts

> Copia el bloque y pegalo en Claude Code dentro del proyecto `/web`.
> Claude Code va a leer CLAUDE.md, inspeccionar cada componente, y generar todos los prompts 
> de imagen que necesitás para nanobanana/GPT.

---

```
# CONTEXTO

Soy Gabriel Zavarse, founder de AlphaDev Studios. Estoy rehaciendo 
todo el aspecto visual del sitio alphadev.studio para que comunique 
"tecnología deseable" — premium, sofisticado, que la gente lo vea y 
quiera trabajar con nosotros.

Lee CLAUDE.md PRIMERO — ahí están todas las reglas visuales, paleta, 
mood, referencias, y el pipeline de generación de assets.

Tu rol en esta sesión es **Director de Arte**:
1. Inspeccionar cada componente/sección del sitio
2. Identificar qué assets visuales necesita cada uno
3. Generar prompts optimizados para nanobanana (Gemini) y/o GPT
4. Organizar todo en un plan priorizado

NO vas a modificar código todavía. Solo lectura + generación de prompts.

---

# MODO DE OPERACIÓN

- **Plan Mode primero** — muéstrame qué vas a inspeccionar
- **NO modifiques ningún archivo**
- **NO instales dependencias**
- Lee CLAUDE.md antes de hacer cualquier otra cosa
- Todos los prompts de imagen van en INGLÉS (mejor resultado en los modelos)
- Respeta estrictamente la paleta, mood, y reglas de coherencia del CLAUDE.md

---

# ALCANCE

## Fase 1: Inspección completa del sitio

Lee TODOS estos archivos y analiza visualmente qué tiene cada uno:

### Componentes (web/components/)
- Hero.tsx
- Navbar.tsx
- Footer.tsx
- ServicesSection.tsx
- CapabilitiesSection.tsx
- ProcessSection.tsx
- CaseStudiesSection.tsx
- StackSection.tsx
- CTASection.tsx
- ValueProposition.tsx
- TestimonialsSection.tsx
- TrustSection.tsx

### Páginas (web/app/)
- page.tsx (home)
- servicios/page.tsx
- portafolio/page.tsx
- proceso/page.tsx
- contacto/page.tsx
- contacto/startup/page.tsx
- contacto/enterprise/page.tsx

### Estilos
- globals.css (animaciones, clases custom, tokens)

### Assets actuales
- web/public/assets/img/ (listar todo lo que hay)
- web/app/favicon.ico

Para cada componente, documenta:
- Qué elementos visuales tiene actualmente (imágenes, SVGs, emojis, colores)
- Qué se ve genérico/placeholder/mejorable
- Qué asset nuevo necesitaría para alcanzar el nivel "tecnología deseable"

---

## Fase 2: Evaluación del logo actual

Inspecciona los logos existentes:
- web/public/assets/img/alphadev-logo.png
- web/public/assets/img/alphadev-script-logo.png

Evalúa honestamente:
- ¿El logo actual encaja con el nuevo sistema visual (3D premium, obsidiana, plasma azul)?
- ¿Se ve profesional a diferentes tamaños (favicon, navbar, hero, OG image)?
- ¿Necesita un refresh completo o solo ajustes?
- Si necesita refresh: genera prompt para nanobanana/GPT con las specs exactas

---

## Fase 3: Generación de prompts de imagen

Para CADA asset identificado en Fase 1, genera un prompt listo para 
copiar y pegar en Gemini (nanobanana) o GPT-4o.

### Formato obligatorio de cada prompt:

```
═══════════════════════════════════════
ASSET: [nombre del asset]
SECCIÓN: [qué componente/página lo usa]
PRIORIDAD: 🔴 ALTA / 🟠 MEDIA / 🟡 BAJA
MODELO RECOMENDADO: Nanobanana (Gemini) / GPT-4o
DIMENSIONES: [width × height px]
FORMATO FINAL: [WebP/PNG/SVG]
PESO MÁXIMO: [KB]
───────────────────────────────────────

PROMPT:
[El prompt completo en inglés, listo para copiar y pegar]

───────────────────────────────────────

NOTAS DE ITERACIÓN:
[Instrucciones de cómo iterar si el resultado no es exacto. 
 Ej: "Si la esfera sale muy grande, pedir 'make the sphere 
 50% smaller'. Si el glow es muy intenso, pedir 'reduce 
 blue glow intensity by 40%'"]

INTEGRACIÓN:
[Dónde va este asset en el código. Ej: 
 "web/public/assets/img/hero-bg.webp → usado como background 
 en Hero.tsx con position absolute + z-index -1"]
═══════════════════════════════════════
```

### Categorías de assets a cubrir:

1. **Hero background** — ya generado, pero verificar si se necesita 
   variante mobile (portrait) o si el wide funciona con CSS
   
2. **Logo** — evaluar si necesita refresh. Si sí, generar prompt completo.
   Considerar variantes: favicon, navbar, hero, OG image

3. **OG Image** — para social sharing (1200×630px). Debe verse bien 
   como thumbnail en Twitter, LinkedIn, WhatsApp, iMessage

4. **Favicon SVG** — versión simplificada del logo que funcione a 
   32×32px y 180×180px

5. **Iconos de servicios** (×6) — reemplazar emojis actuales 
   (🌐 ⚡ 🏢 🔗 🗄️ 🔒). Deben ser coherentes entre sí y con 
   el mood del sitio. Opciones:
   - Iconos 3D mini-renders (consistente con el hero)
   - Line art con glow azul (más sutil, pesa menos)
   - Abstract geometric shapes (minimalista)
   Recomendar cuál es mejor y por qué

6. **Backgrounds de secciones** — patterns sutiles para separar 
   visualmente las secciones del home. Opciones:
   - Grid lines tipo Linear
   - Dot matrix tipo Vercel
   - Subtle gradient meshes
   - Geometric wireframe patterns
   Recomendar cuál es mejor y por qué. Puede ser CSS puro 
   (mejor performance) o imagen tileable (más control visual)

7. **Ilustraciones de proceso** (×5) — para los 5 pasos del 
   timeline en ProcessSection. Deben contar una historia visual 
   de "idea → consulta → desarrollo → testing → deploy"

8. **Mockups de case studies** — dispositivos (laptop + mobile) 
   mostrando screenshots del trabajo real. Si no hay screenshots 
   reales, generar mockups con placeholders elegantes

9. **404 page illustration** — algo creativo, memorable, on-brand. 
   Opciones:
   - Esfera 3D rota/fragmentada
   - Portal dimensional vacío
   - Glitch visual elegante
   Recomendar la mejor

10. **Assets para Instagram** — templates de post y reel que 
    mantengan coherencia con el sitio:
    - Template de carrusel educativo
    - Template de reel con overlay
    - Template de post estático

---

## Fase 4: Plan de ejecución

Organiza todos los prompts en orden de ejecución:

### Batch 1 — Identidad (hacer primero)
Logo + Favicon + OG Image
(Estos definen la base, todo lo demás se construye encima)

### Batch 2 — Hero + Backgrounds
Hero integration + backgrounds de secciones
(Define la atmósfera del sitio)

### Batch 3 — Iconografía
Iconos de servicios + ilustraciones de proceso
(Reemplaza los emojis y placeholders)

### Batch 4 — Case studies + Polish
Mockups + 404 + templates IG
(Refinamiento final)

Para cada batch, estimar:
- Cuántos prompts/generaciones necesita
- Tiempo aproximado de iteración
- Qué depende de qué (orden estricto vs paralelo)

---

# OUTPUT ESPERADO

Genera un archivo `/docs/visual-art-direction.md` con:

1. **Resumen de auditoría visual** — qué hay hoy, qué falta, qué sobra
2. **Evaluación del logo** — keep / refresh / redesign completo
3. **Todos los prompts organizados por batch** (formato del template arriba)
4. **Plan de ejecución** con batches y dependencias
5. **Recomendaciones de CSS vs imagen** — qué efectos conviene hacer 
   con código puro (gradients, grids, dots) vs generar imagen

---

# VERIFICACIÓN FINAL

- [ ] CLAUDE.md leído y respetado
- [ ] Todos los componentes inspeccionados
- [ ] Logo evaluado honestamente
- [ ] Prompts generados para TODOS los assets identificados
- [ ] Cada prompt incluye: dimensiones, formato, peso máximo, notas de iteración
- [ ] Paleta (#0080ff, #0f172a) presente en TODOS los prompts
- [ ] Estilo "Apple keynote / premium 3D render" consistente
- [ ] Plan de ejecución con batches y orden
- [ ] Archivo `/docs/visual-art-direction.md` creado
- [ ] CERO archivos del proyecto modificados

Procede con Plan Mode.
```

---

## Cómo usar este prompt

1. **Primero**: asegurate de que `CLAUDE.md` actualizado esté en la raíz de `/web/`
2. **Abrí Claude Code** en el directorio `/web`
3. **Pegá el bloque de arriba**
4. Claude Code entrará a Plan Mode → confirmás → ejecuta
5. Te genera `/docs/visual-art-direction.md` con TODOS los prompts listos
6. Abrís Gemini, copiás prompt por prompt, generás, iterás, descargás
7. Cuando tengas los assets, volvés a Claude Code para integrarlos al código

## Nota sobre el logo

El prompt le pide a Claude Code que **evalúe honestamente** si el logo actual 
encaja con el nuevo sistema visual (3D premium). Si recomienda redesign, te 
genera el prompt para nanobanana. Si dice que el actual sirve, no se toca.

Vos tenés la última palabra. Si Claude Code dice "keep" y vos sentís que 
necesita cambio, le decís y genera el prompt. Y viceversa.
