# Website UI Kit — AlphaDev Studios

A faithful recreation of the AlphaDev Studios **bilingual marketing website** (the studio's flagship product / public touchpoint). Built from the live Next.js codebase (`AlphaWEB/`), not screenshots.

## What it demonstrates
- **Floating frosted-glass nav pill** with gold underline links, ES·EN toggle, and CTA button.
- **Hero** — Playfair headline ("Si no estás en internet, no existes."), ambient gold orbs, dot-grid wash, dual CTAs.
- **Problem → Services → Process → Results → Why ADS → Closing CTA** — the full benefit-driven section rhythm.
- **Process folder cards** — the signature 3D folder-stack hover, recolored to gold.
- **Closing CTA** on the dark warm-charcoal surface (the one inverted panel on the site).
- **Contact view** — category chips, two-column form, gold focus rings, success state.
- **Live ES ⇄ EN switching** across every string via `copy.js`.

## Routes (separate pages, like the real site)
The nav routes between five distinct pages — Inicio, Servicios, Resultados, Cómo trabajamos and Contacto are **their own pages**, not just anchors on home:

- **Inicio** — hero + problem + services/process/cases previews + why + closing CTA. Section CTAs deep-link to the full pages.
- **Servicios** — page hero + 5 detailed service cards with ✓ deliverable lists + closing CTA.
- **Resultados** — page hero + 3 project cards (icon, title, meta, tags) + closing CTA.
- **Cómo trabajamos** — page hero + 5 horizontal phase cards (gold number sidebar + 2-col ✓ details) + closing CTA.
- **Contacto** — page hero + category picker → contextual form (extra field per category) → success state + direct email.

## Files
| File | Role |
|------|------|
| `index.html` | Self-contained kit — page CSS (grain, nav, process folders, phase/category cards) plus all section, page and router components inlined in one in-page Babel block. Loads `_ds_bundle.js` for the primitives and `copy.js` for content, then mounts the app. |
| `copy.js` | Bilingual ES/EN content dictionary incl. per-page detail (`window.ADS_COPY`). |

> **Why inlined?** The DS compiler bundles every `.jsx`/`.tsx` in the project into `_ds_bundle.js`. Keeping the kit's view components inside `index.html` (rather than as external `.jsx` files) keeps the shipped bundle limited to the real design-system primitives and avoids a module-scope `ReactDOM.render` running inside the bundle. The router (`App`), all home sections (`HeroSection`, `ProblemSection`, `ServicesSection`, `ProcessSection`, `CasesSection`, `WhySection`, `ClosingCTA`), the dedicated pages (`ServiciosPage`, `ResultadosPage`, `ProcesoPage`, `ContactoPage`) and the chrome (`SiteNav`, `SiteFooter`) all live in that block.

## Components used
Composes the design-system primitives: `Button`, `Eyebrow`, `SectionHeader`, `Card`, `Badge`, `Input`, `LanguageToggle` — read from `window.AlphaDevStudiosDesignSystem_3c302f`.

## Interactions
- **Navigate** via the nav links / footer — each lands on its own page (active link turns gold).
- Toggle **ES / EN** — all copy swaps live, on every page.
- On **Contacto**, pick a category → fill the contextual form → success confirmation.
- Hover the process cards (home) to open the folders; hover phase/service cards on the detail pages.
