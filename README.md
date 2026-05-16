# AlphaDev Studios - Web Corporativa

Sitio web corporativo moderno para AlphaDev Studios, estudio de ingeniería de software empresarial.

## 🚀 Stack Tecnológico

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utilities
- **Node.js** - Runtime

## 📋 Requisitos

- Node.js 20.x+
- npm 10.x+

## 🏗️ Estructura del Proyecto

```
web/
├── app/                  # App Router directory
│   ├── layout.tsx        # Root layout with Navbar & Footer
│   ├── page.tsx          # Home page
│   ├── servicios/        # Services page
│   ├── portafolio/       # Portfolio page
│   ├── proceso/          # Process page
│   ├── contacto/         # Contact page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ValueProposition.tsx
│   ├── ServicesSection.tsx
│   ├── ProcessSection.tsx
│   ├── StackSection.tsx
│   └── CTASection.tsx
├── public/               # Static assets
│   ├── assets/
│   ├── robots.txt
│   └── sitemap.xml
└── tailwind.config.ts    # Tailwind configuration
```

## 🔧 Instalación y Desarrollo

### Instalar dependencias
```bash
npm install
```

### Ejecutar servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## 📄 Páginas

- **/** - Página de inicio (Hero + Secciones)
- **/servicios** - Detalle de servicios
- **/portafolio** - Proyectos realizados
- **/proceso** - Metodología de trabajo
- **/contacto** - Formulario de contacto

## 🎯 Características

✅ Diseño oscuro minimalista  
✅ App Router Next.js  
✅ TypeScript type-safe  
✅ Responsive 100%  
✅ SEO optimizado (metadata por página)  
✅ Performance optimizado (Image optimization)  
✅ Animaciones suaves  
✅ Sitemap dinámico  
✅ Robots.txt  
✅ Listo para Vercel  

## 🚢 Despliegue en Vercel

### Opción 1: Deployment automático
1. Push el código a GitHub
2. Conecta el repositorio en [Vercel Dashboard](https://vercel.com)
3. Vercel detectará automáticamente que es Next.js
4. Deploy automático en cada push

### Opción 2: Deployment manual
```bash
npm i -g vercel
vercel
```

## 🔐 Variables de Entorno

Crear archivo `.env.local`:
```env
# Configuración de contacto (opcional)
NEXT_PUBLIC_CONTACT_EMAIL=info@alphadev.com
NEXT_PUBLIC_CONTACT_PHONE=+1 (234) 567-890
```

## 📊 Performance

- **Core Web Vitals**: ✅ Optimizado
- **Lighthouse**: 90+
- **SEO**: ✅ Implementado
- **Security**: ✅ Headers configurados

## 📝 Licencia

Privado - AlphaDev Studios © 2026

---

**Desarrollado por:** AlphaDev Studios  
**Última actualización:** 20 de febrero de 2026
