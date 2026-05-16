# Alphadev Studios - Frontend

Modern React + Vite frontend application for Alphadev Studios, optimized for Vercel deployment.

## 🚀 Tech Stack

- **React 19.2.0** - UI library
- **Vite 7.3.1** - Build tool and development server
- **React Router DOM 7.2.1** - Client-side routing
- **Pure JSX** - No TypeScript, following project standards

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── AnimatedLogo/  # Animated logo component
│   ├── pages/             # Page components
│   │   └── Home/          # Home page
│   ├── css/
│   │   └── globals/       # Global CSS (variables, reset)
│   ├── assets/            # Images, fonts, etc.
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## 🎨 Components

### AnimatedLogo
- 3-layer rotating diagonal lines
- Blue glow effect (#0080ff)
- Corner pulse animations
- Responsive sizing (320px desktop, 240px tablet, 160px mobile)
- Clickable with navigation to home

### Home Page
- Minimalista hero section
- Full viewport height
- Dark gradient background (135deg: #0d0d0d → #1a1a2e)
- Centered AnimatedLogo (350px)
- Top-right blue radial glow

## 🎨 Design System

### CSS Variables (variables.css)
- **Colors**: --color-dark, --color-primary, --white
- **Spacing**: --space-xs to --space-4xl
- **Typography**: --font-primary (Inter + fallbacks)
- **Animation**: --duration-base, --ease-in-out
- **Shadows**: Including --shadow-glow-blue

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🚢 Deployment to Vercel

### Automatic Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically detect and deploy

### Manual Deployment
```bash
vercel
```

### Build Command (configured in vercel.json)
```bash
npm run vercel-build
```

## 📝 Development Standards

- **Pure JSX**: No .js, .ts, or .tsx files
- **Component Structure**: Each component in its own folder with CSS
- **Naming**: PascalCase for components, kebab-case for CSS classes
- **CSS**: CSS Modules approach, scoped styles per component
- **Responsive**: Mobile-first approach with media queries

## 🎯 Project Guidelines

- English only for all code and documentation
- Small, incremental changes
- Clear, descriptive naming
- Follow ai-specs-main documentation (read-only)
- Vercel-optimized build configuration

## 📄 License

Private project - Alphadev Studios

---

Built with ❤️ by Alphadev Studios
