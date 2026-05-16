# 📦 Código Remanente - AlphaDev Studios Web

**Fecha:** Febrero 19, 2026  
**Eliminar después de usar:** Este repositorio será eliminado. Utiliza este documento para recrear la web en un nuevo proyecto.

---

## 🎯 Objetivo

Crear una **nueva web desde cero** que reutilice los componentes fundamentales del diseño anterior:
- **AnimatedLogo**: Componente con logo animado con líneas diagonales giratorias
- **Home Hero**: Página de inicio minimalista con solo la sección hero
- **Estilos base**: Variables CSS y estilos del hero section

---

## 📁 Estructura de Archivos Recomendada

```
new-project/
├── src/
│   ├── components/
│   │   ├── AnimatedLogo.jsx
│   │   ├── AnimatedLogo.css
│   │   └── (nuevos componentes)
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── css/
│   │   ├── globals/
│   │   │   └── variables.css
│   │   └── (nuevos estilos)
│   ├── assets/
│   │   └── img/
│   │       └── alphadev-logo.png (copiar del proyecto anterior)
│   ├── main.jsx
│   ├── index.css
│   └── routes.jsx
├── vite.config.js
├── package.json
└── ...
```

---

## 💾 CÓDIGO PARA REUTILIZAR

### 1️⃣ **AnimatedLogo.jsx**
**Ubicación:** `src/components/AnimatedLogo.jsx`

Este componente renderiza un logo animado con 3 capas de líneas diagonales giratorias + imagen del logo + efecto de pulso.

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedLogo.css';

export const AnimatedLogo = ({ 
  logo, 
  onClick,
  size = 200,
  clickable = true 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    } else if (clickable) {
      navigate('/');
    }
  };

  return (
    <div className="animated-logo-container" onClick={handleClick} style={{ cursor: clickable ? 'pointer' : 'default' }}>
      {/* Animated diagonal lines halo */}
      <div className="animated-logo__halo">
        <svg viewBox="0 0 400 400" className="animated-logo__svg">
          {/* Layer 1 - Outer diagonal lines */}
          <g className="animated-logo__group animated-logo__group--1">
            <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="400" y1="400" x2="0" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="400" x2="0" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          </g>

          {/* Layer 2 - Diagonal cross lines */}
          <g className="animated-logo__group animated-logo__group--2">
            <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <line x1="400" y1="0" x2="0" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Layer 3 - Inner animated diagonals */}
          <g className="animated-logo__group animated-logo__group--3">
            <line x1="50" y1="50" x2="350" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="350" y1="50" x2="350" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="350" y1="350" x2="50" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="350" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </g>

          {/* Corner accents */}
          <g className="animated-logo__corners">
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="380" cy="20" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="380" cy="380" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="20" cy="380" r="3" fill="currentColor" opacity="0.7" />
          </g>
        </svg>
      </div>

      {/* Logo image */}
      <div className="animated-logo__image">
        <img 
          src={logo} 
          alt="AlphaDev Logo" 
          style={{ width: size, height: 'auto' }}
        />
      </div>

      {/* Click indicator */}
      {clickable && (
        <div className="animated-logo__pulse"></div>
      )}
    </div>
  );
};
```

---

### 2️⃣ **AnimatedLogo.css**
**Ubicación:** `src/components/AnimatedLogo.css`

Estilos para la animación de líneas giratorias y efectos de hover del logo.

```css
.animated-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 320px;
  margin: 3rem auto;
}

.animated-logo__halo {
  position: absolute;
  width: 320px;
  height: 320px;
  color: var(--color-primary);
}

.animated-logo__svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(0, 128, 255, 0.4));
}

/* Animation for group 1 - rotate clockwise */
.animated-logo__group--1 {
  animation: rotateClockwise 20s linear infinite;
  transform-origin: 200px 200px;
}

/* Animation for group 2 - rotate counter-clockwise */
.animated-logo__group--2 {
  animation: rotateCounterClockwise 15s linear infinite;
  transform-origin: 200px 200px;
  opacity: 0.7;
}

/* Animation for group 3 - rotate and scale */
.animated-logo__group--3 {
  animation: rotatePulse 25s ease-in-out infinite;
  transform-origin: 200px 200px;
  opacity: 0.5;
}

/* Corner accents - pulse animation */
.animated-logo__corners {
  animation: cornerPulse 2s ease-in-out infinite;
}

@keyframes rotateClockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotateCounterClockwise {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rotatePulse {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: rotate(360deg) scale(1.05);
    opacity: 0.5;
  }
}

@keyframes cornerPulse {
  0%, 100% {
    opacity: 0.7;
    r: 3px;
  }
  50% {
    opacity: 1;
    r: 4px;
  }
}

.animated-logo__image {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 320px;
  height: 320px;
  border-radius: 8px;
  box-shadow: 
    0 20px 40px rgba(0, 100, 255, 0.3),
    0 8px 16px rgba(0, 150, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 120, 255, 0.2);
  overflow: hidden;
}

.animated-logo__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Hover effects */
.animated-logo-container:hover .animated-logo__image {
  transform: scale(1.05);
  box-shadow: 
    0 32px 64px rgba(0, 100, 255, 0.4),
    0 16px 32px rgba(0, 150, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 150, 255, 0.4);
}

.animated-logo-container:hover .animated-logo__halo {
  filter: drop-shadow(0 0 30px rgba(0, 128, 255, 0.6));
}

/* Pulse indicator for clickable state */
.animated-logo__pulse {
  position: absolute;
  width: 320px;
  height: 320px;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  animation: pulseRing 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulseRing {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.15);
    opacity: 0;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .animated-logo-container {
    width: 320px;
    height: 320px;
  }

  .animated-logo__halo {
    width: 320px;
    height: 320px;
  }

  .animated-logo__image {
    width: 240px;
    height: 240px;
  }

  .animated-logo__pulse {
    width: 320px;
    height: 320px;
  }

  .animated-logo__svg {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 480px) {
  .animated-logo-container {
    width: 220px;
    height: 220px;
  }

  .animated-logo__halo {
    width: 220px;
    height: 220px;
  }

  .animated-logo__image {
    width: 160px;
    height: 160px;
  }

  .animated-logo__pulse {
    width: 220px;
    height: 220px;
  }
}
```

---

### 3️⃣ **Home.jsx**
**Ubicación:** `src/pages/Home.jsx`

Componente principal de la página de inicio con sección hero que contiene el AnimatedLogo.

```jsx
import { AnimatedLogo } from '../components/AnimatedLogo';
import alphadevLogoUrl from '../assets/img/alphadev-logo.png';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__background"></div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
          <div className="hero__content" style={{ width: '100%' }}>
            <AnimatedLogo 
              logo={alphadevLogoUrl}
              size={350}
              clickable={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
```

---

### 4️⃣ **Home.css**
**Ubicación:** `src/css/pages/Home.css`

Estilos para la página de inicio: hero section con fondo degradado oscuro y glow radial.

```css
/* ===== HOME STYLES ===== */

.home {
  background-color: var(--white);
  overflow-x: hidden;
}

/* ===== HERO SECTION ===== */
.hero {
  position: relative;
  padding: var(--space-4xl) 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-dark) 0%, #1a1a2e 100%);
  color: var(--white);
  overflow: hidden;
}

.hero__background {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 128, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: var(--space-3xl) 0;
  }
}
```

---

### 5️⃣ **variables.css** (Esencial)
**Ubicación:** `src/css/globals/variables.css`

Define las variables CSS que utilizan los componentes anteriores.

```css
:root {
  /* ===== COLORS ===== */
  --color-dark: #0d0d0d;
  --color-primary: #0080ff;
  --white: #ffffff;
  --gray-600: #808080;
  --gray-700: #595959;

  /* ===== SPACING ===== */
  --space-lg: 1.5rem;
  --space-3xl: 2rem;
  --space-4xl: 3rem;

  /* ===== TYPOGRAPHY ===== */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  /* ===== DURATION & EASING ===== */
  --duration-base: 0.3s;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🚀 PROMPT PARA EL AGENTE

Usa este prompt cuando crees un nuevo proyecto desde cero:

```
Necesito crear una nueva web para AlphaDev Studios.

REQUISITOS TÉCNICOS:
- React 18 + Vite
- React Router 6
- Solo página Home (por ahora)
- Sin Navbar, sin Footer

COMPONENTES A REUTILIZAR:
1. AnimatedLogo.jsx y AnimatedLogo.css
   - Logo animado con 3 capas de líneas diagonales giratorias
   - Efecto de glow azul (#0080ff) alrededor del logo
   - Animaciones: rotación 20s (capa 1), rotación 15s inversa (capa 2), pulso 25s (capa 3)
   - Pulso de esquinas cada 2s
   - Hover: scale 1.05 + shadow aumentada
   - Responsive: 320px (desktop), 240px (tablet), 160px (mobile)
   - Clickable: navega a / si no tiene onClick custom

2. Home.jsx y Home.css
   - Página con sección hero minimalista
   - Hero section: 100vh min-height, background degradado oscuro (135deg: #0d0d0d → #1a1a2e)
   - AnimatedLogo centrado (tamaño 350px)
   - Glow radial azul 500px en top-right (70% blur)
   - Solo esto en Home, sin otras secciones

3. Variables CSS esenciales en src/css/globals/variables.css
   - --color-dark: #0d0d0d
   - --color-primary: #0080ff
   - --white: #ffffff
   - --space-4xl, --space-3xl, --space-lg
   - --font-primary (Google Fonts fallback)
   - --duration-base, --ease-in-out

ARCHIVOS A COPIAR DEL PROYECTO ANTERIOR:
- src/assets/img/alphadev-logo.png (imagen del logo)

ESTRUCTURA FINAL:
src/
├── components/
│   ├── AnimatedLogo.jsx
│   ├── AnimatedLogo.css
│   └── (nuevos componentes aquí)
├── pages/
│   ├── Home.jsx
│   └── Home.css
├── css/
│   ├── globals/
│   │   └── variables.css
│   ├── components/
│   ├── pages/
│   │   └── Home.css
│   └── ...
├── assets/
│   └── img/
│       └── alphadev-logo.png
├── main.jsx
├── index.css
└── routes.jsx (solo ruta / → Home)

A PARTIR DE AQUÍ:
El usuario puede agregar nuevas secciones, componentes y funcionalidad manteniendo este Hero como base.
El AnimatedLogo es reutilizable en cualquier parte de la web.
```

---

## 📋 Checklist de Implementación

- [ ] Crear nuevo proyecto React + Vite
- [ ] Copiar **AnimatedLogo.jsx** y **AnimatedLogo.css**
- [ ] Copiar **Home.jsx** y **Home.css**
- [ ] Copiar **variables.css** a `src/css/globals/`
- [ ] Copiar **alphadev-logo.png** a `src/assets/img/`
- [ ] Crear `routes.jsx` con solo la ruta `/` → Home
- [ ] Crear `index.css` que importe variables.css
- [ ] Instalar dependencias: `npm install`
- [ ] Ejecutar dev server: `npm run dev`
- [ ] Verificar que Home renderiza correctamente con logo animado
- [ ] ✅ LISTO para agregar nuevas funcionalidad

---

## 🎨 Características Visuales

**Animaciones:**
- ✅ 3 capas de SVG girando a velocidades diferentes
- ✅ Esquinas pulsando cada 2 segundos
- ✅ Efecto hover: zoom + shadow intensificada
- ✅ Pulso exterior indicando que es clickable
- ✅ Glow radial dinámico en el fondo (azul)

**Diseño:**
- ✅ Minimalista y profesional
- ✅ Fondo oscuro degradado (135°)
- ✅ Color primario azul (#0080ff)
- ✅ Totalmente responsive
- ✅ Sin dependencias externas (solo React)

---

## 📞 Notas Importantes

1. **Asset crítico:** El archivo `alphadev-logo.png` debe estar en `src/assets/img/` con ese nombre exacto
2. **Variables CSS:** Si no existen, el logo no se verá correctamente (requiere `--color-primary` y `--color-dark`)
3. **Tamaño del logo:** Actualmente 350px en desktop, pero es configurable via prop `size`
4. **No hay Navbar/Footer:** Esto es deliberado - solo Home sin navegación adicional
5. **React Router:** Se usa `useNavigate` en AnimatedLogo, asegúrate de que Router esté configurado

---

**¡Listo! 🚀 Este documento contiene todo lo necesario para recrear la web con el logo animado especial.**
