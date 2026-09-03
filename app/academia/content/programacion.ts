import type { Module } from '../types'

// Rama: Programación — 8 módulos.
// Cada módulo declara su `track`; la rama se deriva del track en ramas.ts.
export const MODULES_PROGRAMACION: Module[] = [
  {
    id: 'web-1',
    number: 12,
    title: 'Fundamentos Web: HTML & CSS',
    description: 'Construye la base sólida de todo desarrollo web moderno: estructura semántica, estilos, layouts y responsive design.',
    duration: '3 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w1-l1',
        title: 'HTML semántico: estructura que importa',
        type: 'reading',
        content: `## HTML semántico

HTML semántico no es solo usar las etiquetas correctas — es comunicar la *intención* del contenido tanto a navegadores como a motores de búsqueda y lectores de pantalla.

### Por qué importa

- **SEO**: Google lee el HTML. Un \`<h1>\` correcto vale más que 10 palabras clave.
- **Accesibilidad**: Lectores de pantalla dependen de la semántica para navegar.
- **Mantenimiento**: HTML semántico es más fácil de leer y modificar.

### Las etiquetas que más usarás

\`\`\`html
<header>   — cabecera de página o sección
<nav>      — navegación principal
<main>     — contenido principal (único por página)
<section>  — sección temática con heading propio
<article>  — contenido independiente (post, card)
<aside>    — contenido relacionado pero secundario
<footer>   — pie de página o sección
\`\`\`

### Estructura base de cualquier página

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página</title>
</head>
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <section>
      <h1>Título principal</h1>
      <p>Contenido...</p>
    </section>
  </main>
  <footer>...</footer>
</body>
</html>
\`\`\`

### Jerarquía de headings

Usa **un solo \`<h1>\`** por página. Los headings crean un outline lógico:

\`\`\`
h1 — Título de la página
  h2 — Sección principal
    h3 — Subsección
      h4 — Sub-subsección (úsala con cuidado)
\`\`\`

### Tip: formularios semánticos

\`\`\`html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Enviar</button>
</form>
\`\`\`

El \`label\` con \`for\` conectado al \`id\` del input mejora accesibilidad y UX (click en label activa el input).`,
        completed: false,
      },
      {
        id: 'w1-l1b',
        title: 'Mini-práctica: Escribe el HTML de tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Crea un archivo index.html con estructura semántica completa (header, main, footer)',
          'Incluye nav con 3 links (aunque sean #), main con h1 + 2 secciones, footer con tu nombre',
          'Valida el HTML en validator.w3.org — cero errores antes de continuar',
          'Agrega una sección <article> con una mini-bio de 3 párrafos',
        ],
        tip: 'No uses <div> para nada que tenga una etiqueta semántica equivalente. Si dudas, pregúntate: ¿esta etiqueta describe QUÉ es el contenido?',
        completed: false,
      },
      {
        id: 'w1-l2',
        title: 'CSS moderno: Flexbox, Grid y el box model',
        type: 'reading',
        content: `## CSS moderno

CSS en 2025 es más poderoso que nunca. Dominar el box model, Flexbox y Grid te da el 90% de lo que necesitas para cualquier layout.

### El Box Model

Todo elemento HTML es una caja:

\`\`\`
┌─────────────────────────┐
│         margin          │
│  ┌───────────────────┐  │
│  │      border       │  │
│  │  ┌─────────────┐  │  │
│  │  │   padding   │  │  │
│  │  │  ┌───────┐  │  │  │
│  │  │  │content│  │  │  │
│  │  │  └───────┘  │  │  │
│  │  └─────────────┘  │  │
│  └───────────────────┘  │
└─────────────────────────┘
\`\`\`

**Regla de oro**: usa siempre \`box-sizing: border-box\`:

\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`

Esto hace que padding y border se incluyan en el width, no se sumen.

### Flexbox — para layouts de una dimensión

\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* eje principal (horizontal) */
  align-items: center;            /* eje cruzado (vertical) */
  gap: 1rem;
}
\`\`\`

Casos de uso ideales: navbars, cards en fila, centrar un elemento.

### Grid — para layouts de dos dimensiones

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Layout complejo */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}
\`\`\`

### Responsive con CSS moderno

\`\`\`css
/* Fluid grid sin media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* Fluid typography */
.heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* Media queries cuando sí son necesarias */
@media (max-width: 768px) {
  .nav-links { display: none; }
}
\`\`\`

### Custom Properties (variables CSS)

\`\`\`css
:root {
  --color-primary: #9A7235;
  --spacing-md: 1rem;
  --radius: 0.5rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius);
}
\`\`\`

Variables CSS son la base de cualquier design system.`,
        completed: false,
      },
      {
        id: 'w1-l2b',
        title: 'Mini-práctica: Dale estilos a tu página "Sobre mí"',
        type: 'practice',
        tasks: [
          'Define custom properties en :root para colores, tipografía y espaciado',
          'Usa Flexbox para el navbar (logo a la izquierda, links a la derecha)',
          'Usa Grid para una sección de skills o proyectos (3 columnas en desktop, 1 en mobile)',
          'Implementa al menos 1 media query para adaptar el layout en pantallas pequeñas',
          'Prueba en Chrome DevTools en mobile view — debe verse bien en 375px de ancho',
        ],
        tip: 'Empieza con mobile-first: escribe los estilos base para mobile y usa media queries con min-width para desktop. Es más fácil agregar complejidad que quitarla.',
        completed: false,
      },
      {
        id: 'w1-l3',
        title: 'Tipografía web, colores y accesibilidad visual',
        type: 'reading',
        content: `## Tipografía web y accesibilidad visual

El 95% de la información en la web es texto. Dominar tipografía es dominar diseño web.

### Cargar fuentes correctamente

\`\`\`html
<!-- Google Fonts — en el <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

\`\`\`css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
\`\`\`

### Escala tipográfica

Una escala consistente crea armonía visual:

\`\`\`css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
\`\`\`

### Contraste de color (WCAG)

Para que el texto sea legible y accesible:

- **Normal text**: ratio mínimo 4.5:1
- **Large text** (18px+ o 14px+ bold): ratio mínimo 3:1
- **UI components**: ratio mínimo 3:1

Herramienta gratuita: **coolors.co/contrast-checker**

\`\`\`css
/* ✅ Buen contraste */
color: #1A1512;
background: #FAFAF7;

/* ❌ Mal contraste */
color: #999999;
background: #FFFFFF;
\`\`\`

### Line-height y letter-spacing

\`\`\`css
body {
  line-height: 1.65; /* Cómodo para lectura de párrafos */
}

h1, h2 {
  line-height: 1.2;  /* Headings más apretados */
  letter-spacing: -0.02em; /* Tracking negativo en display */
}

.caption {
  letter-spacing: 0.05em; /* Tracking positivo en texto pequeño */
  text-transform: uppercase;
}
\`\`\`

### Measure (longitud de línea)

La longitud ideal de una línea de texto es **60-75 caracteres**:

\`\`\`css
.content {
  max-width: 65ch; /* ch = ancho del carácter '0' */
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w1-l3b',
        title: 'Mini-práctica: Refinamiento tipográfico y paleta de colores',
        type: 'practice',
        tasks: [
          'Integra Google Fonts a tu proyecto (elige 1-2 fuentes complementarias)',
          'Define una escala tipográfica con custom properties y aplícala consistentemente',
          'Verifica el contraste de todos tus colores de texto en coolors.co/contrast-checker',
          'Limita el ancho de tus párrafos a max 65ch para legibilidad óptima',
          'Documenta tu paleta de colores en un comentario CSS con los hex codes y sus usos',
        ],
        tip: 'Empareja una fuente serif (Playfair Display, Lora) con una sans-serif (Inter, Plus Jakarta Sans) para dar jerarquía visual sin necesitar muchos tamaños distintos.',
        completed: false,
      },
          {
        id: 'web-1-proj-basico',
        title: 'Proyecto Básico: Landing page con HTML y CSS',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una landing page completa con HTML, CSS y mínimo JavaScript. Responsiva y publicada en internet.',
        deliverables: [
          'Landing page con hero, 3 secciones de contenido y footer',
          'Responsive: bien en mobile (375px), tablet (768px) y desktop (1280px)',
          'URL pública en Vercel, Netlify o GitHub Pages',
          'Screenshot de Lighthouse con Performance > 85',
        ],
        tip: 'Empieza por el mobile layout. Escalar a desktop es más fácil que reducir.',
        completed: false,
      },
      {
        id: 'web-1-proj-inter',
        title: 'Proyecto Intermedio: Landing page con Next.js + Tailwind',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye una landing page con el stack moderno: Next.js App Router + TypeScript + Tailwind CSS + formulario funcional.',
        deliverables: [
          'Proyecto Next.js con TypeScript strict y estructura App Router correcta',
          'Cero \'any\' — todo tipado correctamente',
          'Formulario de contacto con validación cliente y servidor (Zod)',
          'Animaciones de entrada en CSS puro (no librerías)',
          'Deploy en Vercel con URL pública',
          'Lighthouse Performance > 90 en mobile',
        ],
        tip: 'Si tardas más de 5 minutos decidiendo Server vs Client Component, aplica la regla: si necesita estado, eventos o hooks del browser → Client. Todo lo demás → Server.',
        completed: false,
      },
],
    resources: [
      {
        title: 'MDN Web Docs — HTML Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'documentation',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Flexbox',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
        type: 'article',
      },
      {
        title: 'CSS Tricks — A Complete Guide to Grid',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid',
        type: 'article',
      },
      {
        title: 'Google Fonts',
        url: 'https://fonts.google.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'web-2',
    number: 13,
    title: 'JavaScript Moderno (ES2024)',
    description: 'De las bases de JS a async/await, fetch y manipulación del DOM — el lenguaje que da vida a cualquier interfaz web.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w2-l1',
        title: 'Variables, funciones y el flujo de JavaScript',
        type: 'reading',
        content: `## JavaScript moderno: las bases

JavaScript es el único lenguaje que corre nativamente en el navegador. Entenderlo bien es no-negociable para cualquier desarrollador web.

### Variables

\`\`\`javascript
// const — valor que no cambia (úsala por default)
const nombre = 'Gabriel';
const API_URL = 'https://api.ejemplo.com';

// let — valor que puede cambiar
let contador = 0;
contador = contador + 1;

// var — NO usar (scope confuso, problemático)
\`\`\`

### Tipos de datos

\`\`\`javascript
const texto = 'Hola mundo';          // string
const numero = 42;                    // number
const decimal = 3.14;                 // number (no hay int separado)
const activo = true;                  // boolean
const vacio = null;                   // null (ausencia intencional)
const indefinido = undefined;         // undefined
const objeto = { nombre: 'Gabriel' }; // object
const lista = [1, 2, 3];             // array (también es object)
\`\`\`

### Funciones

\`\`\`javascript
// Declaración clásica
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}

// Arrow function (moderna, más concisa)
const saludar = (nombre) => \`Hola, \${nombre}!\`;

// Con múltiples líneas
const calcular = (a, b) => {
  const resultado = a + b;
  return resultado;
};

// Parámetros por default
const conectar = (host = 'localhost', puerto = 3000) => {
  return \`\${host}:\${puerto}\`;
};
\`\`\`

### Destructuring (muy usado en React)

\`\`\`javascript
// Objetos
const usuario = { nombre: 'Gabriel', email: 'g@mail.com', rol: 'admin' };
const { nombre, email } = usuario;

// Con renombrado
const { nombre: nombreUsuario } = usuario;

// Arrays
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo] = colores;

// En parámetros de función
const mostrarUsuario = ({ nombre, rol }) => {
  console.log(\`\${nombre} — \${rol}\`);
};
\`\`\`

### Spread y Rest

\`\`\`javascript
// Spread: expandir
const extras = { admin: false };
const usuarioCompleto = { ...usuario, ...extras };

// Rest: agrupar el resto
const [cabeza, ...cola] = [1, 2, 3, 4, 5];
// cabeza = 1, cola = [2, 3, 4, 5]
\`\`\`

### Array methods esenciales

\`\`\`javascript
const productos = [
  { nombre: 'Laptop', precio: 1200 },
  { nombre: 'Mouse', precio: 25 },
  { nombre: 'Teclado', precio: 80 },
];

// map — transforma cada elemento
const nombres = productos.map(p => p.nombre);
// ['Laptop', 'Mouse', 'Teclado']

// filter — filtra según condición
const caros = productos.filter(p => p.precio > 50);

// find — primer elemento que cumple
const laptop = productos.find(p => p.nombre === 'Laptop');

// reduce — acumula en un valor
const total = productos.reduce((acc, p) => acc + p.precio, 0);
// 1305
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l1b',
        title: 'Mini-práctica: Manipula datos con JS puro',
        type: 'practice',
        tasks: [
          'Crea un array de 5 objetos "proyecto" con propiedades: titulo, tecnologia, año, destacado (boolean)',
          'Usa .filter() para obtener solo los proyectos destacados',
          'Usa .map() para crear un array de strings con formato "titulo — tecnologia (año)"',
          'Usa .find() para encontrar el proyecto más reciente',
          'Usa .reduce() para contar cuántos proyectos hay por tecnología (resultado: objeto)',
          'Consola todos los resultados con console.log descriptivos',
        ],
        tip: 'Encadena métodos cuando tenga sentido: productos.filter(...).map(...). Pero si la cadena supera 3 métodos, considera variables intermedias para legibilidad.',
        completed: false,
      },
      {
        id: 'w2-l2',
        title: 'DOM: hacer que la página responda al usuario',
        type: 'reading',
        content: `## Manipulación del DOM

El DOM (Document Object Model) es la representación en JavaScript de tu HTML. Manipularlo es cómo haces que las páginas sean interactivas.

### Seleccionar elementos

\`\`\`javascript
// querySelector — el más versátil (CSS selectors)
const titulo = document.querySelector('h1');
const boton = document.querySelector('.btn-primary');
const form = document.querySelector('#contact-form');

// querySelectorAll — todos los que coincidan (NodeList)
const cards = document.querySelectorAll('.card');
cards.forEach(card => console.log(card));

// getElementById — específico para IDs (más rápido)
const nav = document.getElementById('navbar');
\`\`\`

### Modificar elementos

\`\`\`javascript
// Contenido
titulo.textContent = 'Nuevo título'; // solo texto, seguro
titulo.innerHTML = '<span>Título</span>'; // HTML (cuidado con XSS)

// Estilos
boton.style.backgroundColor = '#9A7235';
boton.style.display = 'none'; // ocultar

// Clases
elemento.classList.add('activo');
elemento.classList.remove('oculto');
elemento.classList.toggle('expandido');
elemento.classList.contains('activo'); // → boolean

// Atributos
input.setAttribute('disabled', true);
input.getAttribute('placeholder');
imagen.src = 'nueva-foto.jpg';
\`\`\`

### Eventos

\`\`\`javascript
// Click
boton.addEventListener('click', (event) => {
  event.preventDefault(); // evita comportamiento default (útil en forms)
  console.log('Botón clickeado');
});

// Input en tiempo real
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
  console.log(e.target.value);
});

// Submit de formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  const email = datos.get('email');
  console.log(email);
});

// Múltiples elementos (event delegation)
document.querySelector('.lista').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    e.target.classList.toggle('completado');
  }
});
\`\`\`

### Crear y remover elementos

\`\`\`javascript
// Crear
const card = document.createElement('div');
card.className = 'card';
card.textContent = 'Nueva card';

// Agregar al DOM
const contenedor = document.querySelector('.grid');
contenedor.appendChild(card);

// O con insertAdjacentHTML (más eficiente para HTML complejo)
contenedor.insertAdjacentHTML('beforeend', \`
  <div class="card">
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
\`);

// Remover
card.remove();
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l2b',
        title: 'Mini-práctica: Lista de proyectos interactiva',
        type: 'practice',
        tasks: [
          'Crea una lista de 5 proyectos en JS (array de objetos) y renderízalos dinámicamente al DOM con insertAdjacentHTML',
          'Agrega un input de búsqueda que filtre proyectos en tiempo real (evento "input")',
          'Agrega un botón "Destacar" en cada card que toggle una clase CSS "destacado"',
          'Agrega un contador que muestre cuántos proyectos están destacados',
          'Implementa un botón "Agregar proyecto" que solicite nombre con prompt() y lo agregue a la lista',
        ],
        tip: 'Para actualizar la lista al filtrar, limpia el contenedor con innerHTML = "" y renderiza de nuevo con el array filtrado. Es menos eficiente que técnicas virtuales, pero correcto para aprender.',
        completed: false,
      },
      {
        id: 'w2-l3',
        title: 'Async JS: Fetch, Promises y async/await',
        type: 'reading',
        content: `## JavaScript asíncrono

El código asíncrono te permite hacer requests HTTP, leer archivos y esperar operaciones lentas sin bloquear la interfaz.

### El problema del código sincrónico

\`\`\`javascript
// ❌ Esto bloquearía el navegador:
const datos = fetchDatos(); // imaginemos que tarda 2 segundos
mostrar(datos); // mientras espera, nada funciona
\`\`\`

### Promises

Una Promise representa un valor futuro — puede estar pendiente, resuelta o rechazada.

\`\`\`javascript
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('Éxito');
    } else {
      reject(new Error('Falló'));
    }
  }, 1000);
});

promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));
\`\`\`

### async/await — la forma moderna

\`\`\`javascript
// async convierte la función en asíncrona
const obtenerUsuario = async (id) => {
  try {
    // await "pausa" hasta que la Promise se resuelva
    const respuesta = await fetch(\`https://api.ejemplo.com/users/\${id}\`);

    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }

    const usuario = await respuesta.json();
    return usuario;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error; // re-throw para que el caller pueda manejarlo
  }
};

// Usar la función async
const mostrarUsuario = async () => {
  const usuario = await obtenerUsuario(1);
  document.querySelector('.nombre').textContent = usuario.name;
};

mostrarUsuario();
\`\`\`

### Fetch API

\`\`\`javascript
// GET
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const posts = await response.json();

// POST
const response = await fetch('https://api.ejemplo.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`,
  },
  body: JSON.stringify({
    title: 'Mi post',
    body: 'Contenido...',
    userId: 1,
  }),
});
const nuevoPost = await response.json();
\`\`\`

### Promise.all — paralelo

\`\`\`javascript
// ❌ Secuencial (lento: 3 segundos total)
const usuarios = await obtenerUsuarios();
const posts = await obtenerPosts();
const comentarios = await obtenerComentarios();

// ✅ Paralelo (rápido: máximo 1 segundo)
const [usuarios, posts, comentarios] = await Promise.all([
  obtenerUsuarios(),
  obtenerPosts(),
  obtenerComentarios(),
]);
\`\`\``,
        completed: false,
      },
      {
        id: 'w2-l3b',
        title: 'Mini-práctica: Conecta tu app con una API real',
        type: 'practice',
        tasks: [
          'Usa la API pública JSONPlaceholder (jsonplaceholder.typicode.com) para obtener 10 posts',
          'Renderiza los posts en el DOM con título y cuerpo, mostrando un loading state mientras carga',
          'Agrega manejo de errores: si el fetch falla, muestra un mensaje de error al usuario',
          'Implementa un botón "Recargar" que vuelva a hacer el fetch',
          'Bonus: agrega un input que filtre posts por contenido del título en tiempo real',
        ],
        tip: 'Siempre muestra feedback al usuario: un spinner mientras carga, un mensaje si hay error, y el contenido cuando llega. Nunca dejes la interfaz en silencio mientras espera.',
        completed: false,
      },
          {
        id: 'web-2-proj-inter',
        title: 'Proyecto Intermedio: Componente React reutilizable',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Diseña e implementa un componente React completamente tipado y reutilizable que funcione en 3 contextos diferentes.',
        deliverables: [
          'Componente React con TypeScript: interfaz Props completa y documentada',
          'Al menos 3 variantes (size, variant o state)',
          'Demo page mostrando todas las variantes',
          'README: cómo usarlo, qué props acepta y ejemplos de código',
        ],
        tip: 'Un componente bien diseñado tiene una sola responsabilidad. Si el nombre tiene un "y" en el medio, probablemente son dos componentes.',
        completed: false,
      },
      {
        id: 'web-2-proj-pro',
        title: 'Proyecto Profesional: App full-stack con autenticación',
        type: 'project',
        difficulty: 'profesional',
        projectBrief: 'Construye una aplicación web completa con Next.js, autenticación de usuarios y persistencia de datos.',
        deliverables: [
          'Next.js App Router con TypeScript strict — cero \'any\'',
          'Autenticación completa: registro, login, sesión (NextAuth.js o Supabase Auth)',
          'Al menos 3 páginas protegidas que requieran login',
          'Base de datos con mínimo 2 tablas relacionadas (Supabase o similar)',
          'API routes tipadas con validación Zod',
          'Deploy en Vercel con .env configurado',
          'README con instrucciones de setup desde cero',
        ],
        rubrica: [
          'Las rutas protegidas son inaccesibles sin auth (no solo hidden en UI)',
          'La validación ocurre en cliente y en servidor',
          'Las variables sensibles están en .env y no committeadas',
          'La app funciona siguiendo solo el README',
        ],
        tip: 'Dibuja el esquema de base de datos antes de codear. Un schema mal pensado al inicio cuesta 10x reescribir al final.',
        completed: false,
      },
],
    resources: [
      {
        title: 'javascript.info — The Modern JavaScript Tutorial',
        url: 'https://javascript.info',
        type: 'course',
      },
      {
        title: 'JSONPlaceholder — Free Fake REST API',
        url: 'https://jsonplaceholder.typicode.com',
        type: 'tool',
      },
      {
        title: 'MDN — Fetch API',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-3',
    number: 14,
    title: 'React y Next.js App Router',
    description: 'Construye interfaces modernas con componentes reutilizables, estado reactivo y el poder del App Router de Next.js.',
    duration: '5 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w3-l1',
        title: 'React: componentes, props y estado',
        type: 'reading',
        content: `## React: el pensamiento en componentes

React es una librería para construir interfaces como árbol de componentes reutilizables. Cada componente es una función que recibe datos (props) y retorna JSX.

### Tu primer componente

\`\`\`tsx
// Un componente es una función que retorna JSX
const Saludo = () => {
  return <h1>Hola desde React</h1>;
};

// Con props (propiedades — datos que recibe el componente)
interface CardProps {
  titulo: string;
  descripcion: string;
  destacado?: boolean; // opcional
}

const Card = ({ titulo, descripcion, destacado = false }: CardProps) => {
  return (
    <div className={\`card \${destacado ? 'card--destacada' : ''}\`}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
};
\`\`\`

### useState — estado local del componente

\`\`\`tsx
import { useState } from 'react';

const Contador = () => {
  // [valor, función para actualizarlo]
  const [count, setCount] = useState(0);
  const [nombre, setNombre] = useState('');

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola, {nombre || 'visitante'}</p>
    </div>
  );
};
\`\`\`

### Renderizado de listas

\`\`\`tsx
interface Proyecto {
  id: number;
  titulo: string;
  tecnologia: string;
}

const proyectos: Proyecto[] = [
  { id: 1, titulo: 'Portfolio', tecnologia: 'Next.js' },
  { id: 2, titulo: 'E-commerce', tecnologia: 'React' },
];

const ListaProyectos = () => {
  return (
    <ul>
      {proyectos.map((proyecto) => (
        // key es obligatorio — ayuda a React a identificar elementos
        <li key={proyecto.id}>
          {proyecto.titulo} — {proyecto.tecnologia}
        </li>
      ))}
    </ul>
  );
};
\`\`\`

### useEffect — efectos secundarios

\`\`\`tsx
import { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se ejecuta después de que el componente se monta
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setPosts(data.slice(0, 10));
      setLoading(false);
    };

    fetchPosts();
  }, []); // [] = solo al montar, sin dependencias

  if (loading) return <p>Cargando...</p>;

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l1b',
        title: 'Mini-práctica: Tu primera app React con estado',
        type: 'practice',
        tasks: [
          'Crea un componente TodoList con useState para manejar una lista de tareas',
          'Implementa agregar tarea (input + botón), marcar como completada (checkbox) y eliminar (botón x)',
          'Agrega un contador que muestre "X de Y tareas completadas"',
          'Filtra la lista para mostrar: todas / pendientes / completadas',
          'Extrae los componentes en archivos separados: TodoList, TodoItem, TodoFilter',
        ],
        tip: 'Cuando el estado se vuelve complejo (múltiples valores relacionados), considera useReducer. Para este ejercicio useState está perfecto — no sobre-ingenierices.',
        completed: false,
      },
      {
        id: 'w3-l2',
        title: 'Next.js App Router: rutas, layouts y Server Components',
        type: 'reading',
        content: `## Next.js App Router

Next.js con App Router es el estándar de la industria para React en producción. La convención de archivos define las rutas automáticamente.

### Estructura de carpetas

\`\`\`
app/
├── layout.tsx          → Layout raíz (siempre presente)
├── page.tsx            → Ruta: /
├── about/
│   └── page.tsx        → Ruta: /about
├── blog/
│   ├── page.tsx        → Ruta: /blog
│   └── [slug]/
│       └── page.tsx    → Ruta: /blog/:slug (dinámica)
└── api/
    └── contact/
        └── route.ts    → Ruta API: /api/contact
\`\`\`

### layout.tsx — el contenedor persistente

\`\`\`tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi sitio',
  description: 'Descripción para SEO',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <nav>Mi navbar</nav>
        {children}  {/* Aquí se renderiza la página activa */}
        <footer>Mi footer</footer>
      </body>
    </html>
  );
}
\`\`\`

### Server Components vs Client Components

**Por default, todos los componentes en App Router son Server Components.**

\`\`\`tsx
// Server Component (sin 'use client')
// ✅ Puede hacer fetch directamente
// ✅ Accede a datos del servidor (DB, variables de entorno)
// ❌ No puede usar useState, useEffect, event handlers
const Pagina = async () => {
  const posts = await fetch('https://api.ejemplo.com/posts').then(r => r.json());

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
};

// Client Component
'use client'; // Necesario cuando usas hooks o eventos

import { useState } from 'react';

const Boton = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? 'Clickeado!' : 'Click me'}
    </button>
  );
};
\`\`\`

### Rutas dinámicas y params

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

const BlogPost = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
};

export default BlogPost;
\`\`\`

### API Routes

\`\`\`typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, mensaje } = body;

  // Validar, guardar en DB, enviar email...

  return NextResponse.json({ success: true });
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l2b',
        title: 'Mini-práctica: Portfolio con Next.js App Router',
        type: 'practice',
        tasks: [
          'Crea un proyecto Next.js nuevo con create-next-app (TypeScript + Tailwind + App Router)',
          'Implementa layout.tsx con navbar y footer que persistan en todas las páginas',
          'Crea app/page.tsx (home) con hero section y lista de proyectos hardcodeada',
          'Crea app/proyectos/[id]/page.tsx para el detalle de cada proyecto',
          'Agrega metadata (title, description) a cada página — verifica en el <title> del HTML',
          'Despliega en Vercel con "vercel" CLI o conectando el repo en vercel.com',
        ],
        tip: 'Cuando veas que un componente necesita estado o eventos, conviértelo en Client Component con "use client". Mantén Server Components para todo lo que pueda ser estático o necesite datos del servidor.',
        completed: false,
      },
      {
        id: 'w3-l3',
        title: 'TypeScript en React: tipos, interfaces y generics',
        type: 'reading',
        content: `## TypeScript en React

TypeScript añade tipos estáticos a JavaScript, catching errores en desarrollo antes de que lleguen a producción. En Next.js es el estándar — aprenderlo bien te ahorra horas de debugging.

### Tipos básicos

\`\`\`typescript
// Primitivos
const nombre: string = 'Gabriel';
const edad: number = 28;
const activo: boolean = true;

// Arrays
const tecnologias: string[] = ['React', 'Next.js', 'TypeScript'];
const precios: number[] = [100, 200, 300];

// Funciones
const saludar = (nombre: string): string => {
  return \`Hola, \${nombre}\`;
};

// Void — función que no retorna valor
const log = (mensaje: string): void => {
  console.log(mensaje);
};
\`\`\`

### Interfaces y Types

\`\`\`typescript
// Interface — para describir la forma de un objeto
interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url?: string; // opcional
  destacado: boolean;
}

// Type — más versátil, puede ser unión, intersección, etc.
type Estado = 'activo' | 'inactivo' | 'pendiente';
type ID = string | number;

// Combinar tipos
type ProyectoConEstado = Proyecto & {
  estado: Estado;
  fechaCreacion: Date;
};
\`\`\`

### TypeScript en componentes React

\`\`\`tsx
// Props con interface
interface CardProps {
  proyecto: Proyecto;
  onSeleccionar: (id: number) => void;
  className?: string;
}

const Card = ({ proyecto, onSeleccionar, className }: CardProps) => {
  return (
    <div
      className={className}
      onClick={() => onSeleccionar(proyecto.id)}
    >
      <h3>{proyecto.titulo}</h3>
    </div>
  );
};

// useState con tipo explícito
const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Proyecto | null>(null);
const [tecnologias, setTecnologias] = useState<string[]>([]);

// Eventos
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\`

### Generics — tipos reutilizables

\`\`\`typescript
// Una función que funciona con cualquier tipo
const primero = <T>(array: T[]): T | undefined => {
  return array[0];
};

const primerNombre = primero(['Gabriel', 'Ana', 'Luis']); // tipo: string
const primerNumero = primero([1, 2, 3]); // tipo: number

// Hook genérico para fetch
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  // ...
  return { data, loading };
};

const { data: usuarios } = useFetch<Usuario[]>('/api/users');
\`\`\``,
        completed: false,
      },
      {
        id: 'w3-l3b',
        title: 'Mini-práctica: Tipea toda tu app de portfolio',
        type: 'practice',
        tasks: [
          'Define interfaces TypeScript para todos los datos de tu app (Proyecto, Habilidad, etc.)',
          'Elimina todos los any del código — usa unknown + narrowing donde sea necesario',
          'Tipa todos los props de componentes con interfaces explícitas',
          'Tipa todos los event handlers (React.MouseEvent, React.ChangeEvent, etc.)',
          'Ejecuta npx tsc --noEmit — debe pasar sin errores antes de continuar',
        ],
        tip: 'Si TypeScript te da un error que no entiendes, pégalo en Claude con el contexto del código. Generalmente hay una solución simple que el error no comunica bien.',
        completed: false,
      },
          {
        id: 'web-3-proj-basico',
        title: 'Proyecto Básico: API REST con 3 endpoints',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Construye una API REST mínima con 3 endpoints usando las API Routes de Next.js.',
        deliverables: [
          'Mínimo 3 API routes: GET (listar), POST (crear), GET by ID',
          'Validación de entrada con Zod en el endpoint POST',
          'Respuestas de error correctas: 400, 404 y 500 con mensajes útiles',
          'Prueba de cada endpoint en Thunder Client o Postman (screenshots)',
        ],
        tip: 'Una API que devuelve errores genéricos es imposible de debuggear. Los mensajes de error deben ser útiles para quien los consume.',
        completed: false,
      },
],
    resources: [
      {
        title: 'Next.js Docs — App Router',
        url: 'https://nextjs.org/docs/app',
        type: 'documentation',
      },
      {
        title: 'React Docs — Learn React',
        url: 'https://react.dev/learn',
        type: 'documentation',
      },
      {
        title: 'TypeScript — The Basics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
        type: 'documentation',
      },
    ],
  },
  {
    id: 'web-4',
    number: 15,
    title: 'Backend con Supabase y Deploy en Vercel',
    description: 'Conecta tu app a una base de datos real con Supabase, implementa autenticación y despliega en producción en Vercel.',
    duration: '4 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'w4-l1',
        title: 'Supabase: base de datos, Auth y Storage en minutos',
        type: 'reading',
        content: `## Supabase: el backend para founders

Supabase es una alternativa open-source a Firebase. Te da Postgres, autenticación, storage de archivos y API en tiempo real — todo listo para usar sin configurar servidores.

### Por qué Supabase

- **Postgres real**: no un NoSQL simplificado — queries complejas, joins, índices
- **Auth incluida**: email/password, magic links, OAuth (Google, GitHub) sin configurar nada
- **API automática**: genera una REST API y cliente TypeScript de tu esquema de DB
- **Dashboard visual**: crea tablas, ve datos, ejecuta SQL en el browser
- **Free tier generoso**: 500MB de DB, 1GB storage, 50,000 MAU

### Setup inicial

\`\`\`bash
# Instalar cliente Supabase
npm install @supabase/supabase-js

# Variables de entorno en .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
\`\`\`

\`\`\`typescript
// lib/supabase.ts — cliente singleton
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
\`\`\`

### CRUD básico

\`\`\`typescript
// SELECT — obtener datos
const { data: proyectos, error } = await supabase
  .from('proyectos')
  .select('*')
  .order('created_at', { ascending: false });

// SELECT con filtros
const { data: destacados } = await supabase
  .from('proyectos')
  .select('id, titulo, url')
  .eq('destacado', true)
  .limit(6);

// INSERT
const { data, error } = await supabase
  .from('proyectos')
  .insert({
    titulo: 'Mi proyecto',
    descripcion: 'Descripción...',
    destacado: false,
  })
  .select()
  .single();

// UPDATE
const { error } = await supabase
  .from('proyectos')
  .update({ destacado: true })
  .eq('id', proyectoId);

// DELETE
const { error } = await supabase
  .from('proyectos')
  .delete()
  .eq('id', proyectoId);
\`\`\`

### Autenticación

\`\`\`typescript
// Registro
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@email.com',
  password: 'contraseña-segura',
});

// Sesión actual
const { data: { user } } = await supabase.auth.getUser();

// Logout
await supabase.auth.signOut();

// OAuth con Google
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
\`\`\`

### Row Level Security (RLS)

RLS es el sistema de permisos de Supabase. Cada fila en la DB puede tener reglas de quién puede leerla/modificarla.

\`\`\`sql
-- Solo el dueño puede ver sus proyectos
CREATE POLICY "Usuarios ven sus proyectos"
ON proyectos FOR SELECT
USING (auth.uid() = user_id);

-- Solo el dueño puede insertar
CREATE POLICY "Usuarios insertan sus proyectos"
ON proyectos FOR INSERT
WITH CHECK (auth.uid() = user_id);
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l1b',
        title: 'Mini-práctica: Conecta tu portfolio a Supabase',
        type: 'practice',
        tasks: [
          'Crea un proyecto en supabase.com y una tabla "proyectos" con: id, titulo, descripcion, tecnologias (text[]), url, destacado, created_at',
          'Instala @supabase/supabase-js y crea el cliente en lib/supabase.ts',
          'Reemplaza los datos hardcodeados de tu portfolio por un fetch a Supabase en el Server Component',
          'Habilita RLS en la tabla y crea una política SELECT pública (para que cualquiera pueda leer)',
          'Agrega 3-5 proyectos reales desde el Dashboard de Supabase y verifica que aparecen en tu app',
        ],
        tip: 'Nunca uses la service_role key en el frontend — solo la anon key. La service_role bypasea RLS y daría acceso total a tu base de datos a cualquiera que inspeccione el código.',
        completed: false,
      },
      {
        id: 'w4-l2',
        title: 'Deploy en Vercel: de localhost a producción',
        type: 'reading',
        content: `## Deploy en Vercel

Vercel es la plataforma de deployment para Next.js — creada por el mismo equipo. Deploy en segundos, CDN global, previews automáticos por branch.

### Vercel CLI

\`\`\`bash
# Instalar globalmente
npm install -g vercel

# Login
vercel login

# Deploy desde tu carpeta del proyecto
vercel

# Deploy a producción
vercel --prod
\`\`\`

### Variables de entorno en Vercel

Las variables de .env.local NO se suben a git. Debes configurarlas en Vercel:

\`\`\`bash
# Via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# O desde el dashboard: vercel.com → Project → Settings → Environment Variables
\`\`\`

### Conectar repositorio de GitHub

1. Ir a vercel.com → "Add New Project"
2. Conectar tu GitHub y seleccionar el repositorio
3. Configurar variables de entorno
4. Click "Deploy"

Ahora **cada push a main despliega automáticamente**. Cada PR crea un preview URL.

### vercel.json — configuración avanzada

\`\`\`json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
\`\`\`

### Optimización antes de deploy

\`\`\`bash
# Build local para detectar errores antes de subir
npm run build

# Check:
# ✅ Sin errores de TypeScript
# ✅ Sin errores de build
# ✅ Bundle sizes razonables (Vercel los muestra)
# ✅ Variables de entorno configuradas en Vercel
\`\`\`

### Dominios custom

\`\`\`bash
# Agregar dominio desde CLI
vercel domains add midominio.com

# O desde el dashboard: Project → Settings → Domains
\`\`\`

Vercel maneja certificados SSL automáticamente. Tu sitio tiene HTTPS desde el primer deploy.

### Analytics y Web Vitals

En Vercel Pro (o con @vercel/analytics en el free tier):

\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\``,
        completed: false,
      },
      {
        id: 'w4-l2b',
        title: 'Mini-práctica: Tu portfolio en producción',
        type: 'practice',
        tasks: [
          'Ejecuta npm run build localmente — debe pasar sin errores antes de continuar',
          'Configura las variables de entorno de Supabase en vercel.com (no en el CLI)',
          'Conecta tu repositorio de GitHub a Vercel y despliega',
          'Verifica que los proyectos de Supabase cargan correctamente en la URL de producción',
          'Agrega @vercel/analytics al proyecto y verifica que aparece en el dashboard de Vercel',
          'Prueba el sitio en mobile desde tu celular real — no solo DevTools',
        ],
        tip: 'Si el build funciona en local pero falla en Vercel, el problema casi siempre son las variables de entorno. Verifica que están configuradas para el entorno correcto (Production, Preview, Development).',
        completed: false,
      },

      {
        id: 'web-exam',
        title: 'Examen final: Desarrollo Web',
        type: 'exam',
        questions: [
          {
            q: '¿Cuál es la diferencia entre un Server Component y un Client Component en Next.js App Router?',
            options: [
              'Los Server Components son más lentos porque se renderizan en el servidor',
              'Los Server Components se renderizan en el servidor (sin JS en el cliente, pueden acceder a datos directamente); los Client Components se renderizan en el browser y pueden usar useState/eventos',
              'Los Client Components son los que usan TypeScript; los Server Components usan JavaScript puro',
              'No hay diferencia real, es solo una convención de nombres',
            ],
            correct: 1,
            explanation: 'Server Components corren en el servidor: acceden a DB/APIs directamente, no envían JS al cliente, no pueden usar hooks ni event handlers. Client Components (marcados con "use client") corren en el browser: pueden usar useState, useEffect, onClick, etc. Por defecto en App Router, todos son Server Components.',
          },
          {
            q: '¿Qué hace el hook useState en React y cuándo se vuelve a renderizar el componente?',
            options: [
              'useState guarda datos en localStorage; el componente se re-renderiza al recargar la página',
              'useState guarda estado local del componente; el componente se re-renderiza cada vez que el estado cambia',
              'useState conecta el componente a la base de datos; se re-renderiza cuando cambian los datos externos',
              'useState es para variables globales; se re-renderiza cuando cualquier componente de la app cambia',
            ],
            correct: 1,
            explanation: 'useState retorna [valor, setter]. Cuando llamas al setter, React re-renderiza el componente con el nuevo valor. El estado es local al componente — no se comparte automáticamente con otros componentes. Para estado global, necesitas Context API, Zustand u otra solución.',
          },
          {
            q: '¿Qué hace el operador spread (...) en este código: const nuevo = { ...usuario, rol: "admin" }?',
            options: [
              'Elimina todas las propiedades de usuario y solo deja rol: "admin"',
              'Crea un nuevo objeto con todas las propiedades de usuario, y agrega/sobreescribe rol con "admin"',
              'Combina usuario con otro objeto llamado admin',
              'Genera un error porque no se puede usar spread con objetos',
            ],
            correct: 1,
            explanation: 'El spread operator (...) copia todas las propiedades enumerables del objeto original al nuevo objeto. Si ya existe la propiedad, se sobreescribe con el valor nuevo. Es el patrón estándar para crear copias inmutables de objetos con modificaciones en React y TypeScript.',
          },
          {
            q: '¿Cuál es la diferencia entre async/await y .then()/.catch() en JavaScript?',
            options: [
              'async/await es más rápido en ejecución porque no usa Promises',
              'async/await es sintaxis más legible que produce el mismo comportamiento asíncrono que .then()/.catch()',
              '.then() es moderno; async/await es la versión legacy',
              'async/await solo funciona en Node.js; .then() funciona en el browser',
            ],
            correct: 1,
            explanation: 'async/await es "syntactic sugar" sobre Promises — internamente hace lo mismo que .then()/.catch() pero con código que se lee de forma secuencial (más fácil de entender y debuggear). Ambos son válidos; async/await es el estándar moderno preferido.',
          },
          {
            q: '¿Qué significa TypeScript strict mode y cuál es su beneficio principal?',
            options: [
              'Hace que el código TypeScript sea más estricto en el formato (indentación, comillas)',
              'Activa verificaciones adicionales como strictNullChecks y noImplicitAny, detectando más errores en tiempo de compilación',
              'Impide usar JavaScript puro dentro de archivos TypeScript',
              'Hace que el build sea más lento para garantizar mayor calidad',
            ],
            correct: 1,
            explanation: 'strict mode activa varias flags: strictNullChecks (null/undefined no son asignables a otros tipos), noImplicitAny (no puedes dejar variables sin tipo implícito), strictFunctionTypes, y más. El beneficio: errores que antes llegarían a producción se detectan en desarrollo.',
          },
          {
            q: '¿Cuándo deberías usar CSS Grid en lugar de Flexbox?',
            options: [
              'Grid para layouts de una dimensión (fila O columna); Flexbox para dos dimensiones',
              'Flexbox para layouts de una dimensión; Grid para layouts de dos dimensiones (filas Y columnas)',
              'Grid es obsoleto — siempre usa Flexbox',
              'Flexbox es para mobile; Grid es solo para desktop',
            ],
            correct: 1,
            explanation: 'Flexbox es ideal para layouts en una dirección (nav, cards en fila, centrar un elemento). Grid brilla en layouts bidimensionales (el layout completo de la página, galería de fotos, dashboard). En la práctica se complementan: Grid para la macro-estructura, Flexbox para componentes internos.',
          },
          {
            q: '¿Qué hace este código de Supabase: .eq("destacado", true).limit(6)?',
            options: [
              'Elimina 6 registros donde destacado sea true',
              'Selecciona todos los registros y filtra los primeros 6 en el frontend',
              'Filtra filas donde destacado = true en la base de datos y retorna máximo 6 resultados',
              'Actualiza 6 registros para que destacado sea true',
            ],
            correct: 2,
            explanation: '.eq() aplica un filtro WHERE en la query SQL (WHERE destacado = true). .limit(6) limita el resultado a 6 filas. Todo esto se ejecuta en el servidor de Supabase/Postgres — no en el cliente. Es equivalente a: SELECT * FROM tabla WHERE destacado = true LIMIT 6.',
          },
          {
            q: '¿Qué problema resuelve box-sizing: border-box y por qué es el estándar actual?',
            options: [
              'Hace que todos los elementos tengan el mismo tamaño sin importar su contenido',
              'Incluye padding y border en el width declarado, evitando que los elementos se hagan más grandes de lo esperado',
              'Elimina los márgenes entre elementos para un layout más limpio',
              'Hace que el box model use unidades relativas (rem) en lugar de píxeles',
            ],
            correct: 1,
            explanation: 'Sin border-box, un div de width:300px con padding:20px termina midiendo 340px (300 + 20×2). Con border-box, el padding se incluye dentro del width declarado: el div sigue midiendo 300px. Es el comportamiento más intuitivo y se aplica universalmente con *, *::before, *::after { box-sizing: border-box }.',
          },
        ],
        completed: false,
      },
    
    {
      id: 'web-4-p1',
      title: 'Proyecto: App full-stack con autenticación',
      type: 'project',
      difficulty: 'profesional',
      projectBrief: 'Construye una aplicación web full-stack con Next.js + Supabase que incluya autenticación, CRUD completo de recursos, y deploy en producción. Elige el dominio: gestor de tareas, blog, o directorio de recursos.',
      deliverables: [
        'Repositorio público en GitHub',
        'URL en producción (Vercel u otro)',
        'Autenticación funcional (email o OAuth)',
        'CRUD completo con validación',
        'README con instrucciones de setup',
      ],
      rubrica: [
        'Autenticación segura, sin exponer claves',
        'UI responsive y funcional',
        'Código organizado por componentes/módulos',
        'Deploy estable en producción',
      ],
      completed: false,
    },],
    resources: [
      {
        title: 'Supabase Docs — Getting Started',
        url: 'https://supabase.com/docs/guides/getting-started',
        type: 'documentation',
      },
      {
        title: 'Vercel Docs — Deploying Next.js',
        url: 'https://vercel.com/docs/frameworks/nextjs',
        type: 'documentation',
      },
      {
        title: 'Supabase + Next.js — Tutorial oficial',
        url: 'https://supabase.com/docs/guides/getting-started/quickstarts/nextjs',
        type: 'course',
      },
    ],
  },
  {
    id: 'web-capstone',
    number: 39,
    title: 'Proyecto Final: SaaS MVP en Producción',
    description: 'Construye y despliega una aplicación full-stack real con Next.js, Supabase y TypeScript. De la idea al producto en producción.',
    duration: '6 semanas',
    status: 'available',
    track: 'web',
    lessons: [
      {
        id: 'web-cap-1',
        title: 'Proyecto Capstone: Tu Primer SaaS en Producción',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: `## De cero a producción: el proyecto que valida todo

Este capstone es la diferencia entre saber programar y ser un developer. Un proyecto en producción con usuarios reales vale más en tu portafolio que 100 tutoriales completados.

### El brief

Construye y despliega una aplicación web funcional con las tecnologías del track. Debe resolver un problema real (aunque pequeño).

### Criterios del proyecto

- **Funcional**: no un tutorial copiado — debe tener lógica propia
- **En producción**: URL pública en Vercel, accesible para cualquiera
- **Con datos reales**: Supabase como base de datos, no JSON hardcodeado
- **Con autenticación**: al menos email/password con Supabase Auth
- **Responsive**: funciona en mobile y desktop

### Ideas de proyectos (elige una o propón la tuya)

- **Task manager con equipos**: tareas, asignación a usuarios, estados, due dates
- **Link shortener con analytics**: crear links cortos, ver cuántos clicks recibió cada uno
- **Portfolio CMS**: panel donde puedes agregar/editar/eliminar proyectos que se muestran en una landing
- **Expense tracker**: registrar gastos por categoría, ver gráficas de resumen
- **Waitlist para tu idea de startup**: landing page + formulario + panel admin para ver los registros

### Stack requerido

Next.js 16+ App Router · TypeScript strict · Tailwind CSS · Supabase (Postgres + Auth) · Deployed en Vercel`,
        deliverables: [
          'Repositorio público en GitHub con código limpio (no commits de "fix" encadenados — squash o rebase si es necesario), README profesional con screenshots y link a producción',
          'URL en producción en Vercel funcional — cualquier persona puede registrarse y usarla',
          'Al menos 3 features implementadas: autenticación, CRUD de la entidad principal, y una feature diferenciadora',
          'TypeScript strict sin ningún "any" — npx tsc --noEmit debe pasar limpio',
          'Responsive design verificado en mobile (375px) y desktop',
          'Video demo de 3-5 minutos mostrando el flujo completo de usuario (loom.com o similar)',
          'Documento de arquitectura (Notion o README): diagrama del schema de la DB, decisiones técnicas tomadas y por qué',
        ],
        tip: 'El error más costoso en este capstone: elegir un proyecto demasiado ambicioso y nunca terminarlo. Un task manager simple y completamente funcional en producción vale infinitamente más que un "Netflix clone" sin terminar. Scope pequeño, calidad alta, enviado.',
        completed: false,
      },
      {
        id: 'web-cap-2',
        title: 'Checklist de entrega y criterios de evaluación',
        type: 'practice',
        tasks: [
          'Código: ¿npx tsc --noEmit pasa sin errores? ¿npm run build completa sin warnings?',
          'Código: ¿hay algún console.log de debugging en el código final? (debe estar limpio)',
          'Código: ¿los nombres de variables y funciones son descriptivos y en inglés?',
          'Auth: ¿el registro, login y logout funcionan correctamente? ¿las rutas protegidas redirigen si no hay sesión?',
          'DB: ¿Row Level Security está activado en Supabase? ¿los usuarios solo pueden ver/modificar sus propios datos?',
          'UI: ¿la app muestra estados de loading mientras carga datos? ¿muestra mensajes de error útiles si algo falla?',
          'Responsive: ¿funciona en iPhone SE (375px)? ¿los elementos no se salen de la pantalla?',
          'README: ¿incluye: descripción, screenshots, stack usado, instrucciones de setup local y link a producción?',
        ],
        tip: 'Antes de considerar el proyecto terminado, pídele a alguien que no lo conoce que lo use sin instrucciones. Si se pierden, confunden, o encuentran un bug, eso es trabajo que falta. Una app que "funciona cuando tú la usas" no es lo mismo que una app que funciona.',
        completed: false,
      },
    ],
    resources: [
      {
        title: 'Supabase — Postgres + Auth + Storage',
        url: 'https://supabase.com',
        type: 'tool',
      },
      {
        title: 'Vercel — Deploy y hosting',
        url: 'https://vercel.com',
        type: 'tool',
      },
      {
        title: 'Loom — Grabar video demos',
        url: 'https://loom.com',
        type: 'tool',
      },
    ],
  },
  {
    id: 'prodai-1',
    number: 57,
    title: 'ChatGPT, Claude y Gemini como herramientas de trabajo',
    description: 'Deja de usar la IA para tareas triviales. Aprende a integrarla en flujos de trabajo reales que multiplican tu productividad como agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-1-1',
        title: 'Prompts avanzados: la diferencia entre una respuesta mediocre y una excelente',
        type: 'practice',
        content: '## Por qué el prompt importa más que el modelo\n\nLa mayoría de las personas usa ChatGPT como si fuera Google: escribe una pregunta corta y espera una respuesta genérica. Los profesionales que sacan 10x más valor de la IA construyen prompts con contexto, rol, formato y restricciones.\n\n## La anatomía de un prompt profesional\n\n**1. Rol**: "Actúa como un copywriter especializado en SaaS B2B con 10 años de experiencia"\n\n**2. Contexto**: "Estoy trabajando con un cliente que ofrece software de gestión de inventario para restaurantes en México"\n\n**3. Tarea específica**: "Escribe el headline y subheadline para su landing page principal"\n\n**4. Audiencia**: "El target es dueño de restaurante, 35-55 años, sin formación técnica, frustrado con el control manual de inventario"\n\n**5. Restricciones**: "Máximo 8 palabras en el headline, 15 en el subheadline. Sin jerga técnica. Enfoque en el resultado (ahorro de tiempo), no en la tecnología"\n\n**6. Formato de salida**: "Dame 5 opciones en formato: Headline | Subheadline"\n\n## Los 5 usos de IA que más tiempo ahorran en una agencia\n\n**Primer borrador de copy**: brief → prompt → 5 opciones → elige y refina. Lo que antes tomaba 2 horas, ahora es 20 minutos.\n\n**Investigación de audiencia**: "¿Cuáles son las 10 objeciones más comunes de [tipo de cliente] cuando considera [tipo de servicio]?"\n\n**Revisión y feedback**: "Revisa este email de ventas como si fueras el CMO de una startup que recibe 50 propuestas por semana. ¿Qué te haría responder y qué te haría ignorarlo?"\n\n**Generación de ideas**: "Dame 20 ideas de contenido para una agencia de diseño en Instagram. La audiencia son founders de startups en LATAM"\n\n**Traducción de técnico a cliente**: "Traduce esta descripción técnica de un sistema de automatización a lenguaje que entienda un dueño de negocio sin background técnico"',
        tasks: [
          'Toma un prompt simple que usas normalmente ("escríbeme un caption de Instagram sobre X") y reescríbelo con los 6 elementos de la anatomía del prompt profesional. Compara la calidad de las dos respuestas',
          'Construye una biblioteca personal de prompts: 5 prompts que uses regularmente en tu trabajo, optimizados con la estructura completa',
          'Usa la IA para investigar la audiencia de un cliente: pídele las 10 objeciones más comunes y 10 preguntas frecuentes del cliente ideal. Evalúa qué tan preciso es el resultado',
        ],
        tip: 'Guarda los prompts que funcionan en un documento de Notion o Google Docs. Una biblioteca de prompts bien construida es un activo de la agencia — no empieces desde cero cada vez.',
        completed: false,
      },
      {
        id: 'prodai-1-2',
        title: 'Flujos de trabajo con IA: casos de uso reales para agencias',
        type: 'reading',
        content: '## El error: usar IA como asistente. El acierto: usarla como sistema\n\nLa diferencia entre alguien que "usa ChatGPT a veces" y una agencia que multiplica su output con IA está en si la IA está integrada en el flujo de trabajo como parte del sistema, no como herramienta de emergencia.\n\n## Flujos de trabajo con IA para los servicios de una agencia\n\n**Propuestas de servicios**:\n1. Cliente llena briefing\n2. Claude/ChatGPT analiza el briefing y genera: resumen del problema, objetivos clave, preguntas de clarificación, estructura de propuesta sugerida\n3. Humano refina y personaliza\n4. Claude redacta el primer borrador de la propuesta\n5. Humano edita y envía\nTiempo ahorrado: 60-70% del tiempo de redacción\n\n**Brief de diseño → conceptos de marca**:\n1. Cliente brief\n2. Claude genera: 3 conceptos de posicionamiento, keywords de personalidad de marca, paletas de color sugeridas por concepto, referencias de estilos\n3. Diseñador usa esto como punto de partida, no punto de llegada\n\n**SEO content en escala**:\n1. Keyword research → lista de artículos a escribir\n2. Para cada artículo: Claude genera outline detallado con H2s, H3s y puntos clave de cada sección\n3. Escritor expande el outline con experiencia real y voz de marca\n4. Claude revisa SEO: densidad de keywords, estructura, meta description\n\n**Reporting de clientes**:\n1. Exporta los datos de las plataformas (Meta Ads, Google Analytics, etc.)\n2. Pega los datos en Claude con el prompt: "Analiza estos resultados como si fueras el account manager. Identifica 3 insights principales, 2 áreas de mejora y 3 recomendaciones para el próximo mes"\n3. Refina y personaliza el análisis con contexto del cliente',
        tasks: [
          'Elige 1 de los 4 flujos de trabajo y documenta cómo lo implementarías para un cliente actual o ficticio: paso a paso, con los prompts específicos que usarías en cada etapa',
          'Ejecuta el flujo completo una vez: toma un proyecto real o simulado y pásalo por el proceso. Documenta cuánto tiempo tardaste vs. tu estimado sin IA',
          'Identifica 3 tareas en tu trabajo semanal que podrían automatizarse parcialmente con IA. Para cada una, escribe el prompt que usarías',
        ],
        tip: 'La IA no reemplaza el juicio — acelera la ejecución. Los mejores resultados llegan cuando usas IA para generar el primer borrador (rápido y amplio) y tu criterio profesional para editar y refinar (lento y preciso).',
        completed: false,
      },
      {
        id: 'prodai-1-3',
        title: 'Notion AI, Perplexity y herramientas de IA especializadas',
        type: 'reading',
        content: '## Más allá de ChatGPT: el ecosistema de IA de una agencia\n\n**Claude (Anthropic)**: el mejor para texto largo, análisis de documentos y razonamiento complejo. Puedes pegarle un contrato completo y pedirle que identifique riesgos. O un brief de 20 páginas y pedirle un resumen ejecutivo. Su ventana de contexto es mucho mayor que ChatGPT.\n\n**Perplexity AI**: la alternativa a Google para investigación. A diferencia de ChatGPT, cita fuentes verificables y hace búsquedas en tiempo real. Ideal para research de mercado, tendencias del sector, y datos actualizados.\n\n**Notion AI**: si ya usas Notion, la IA integrada convierte bases de datos en resúmenes, genera documentos desde templates, y resume reuniones. El valor está en que vive donde ya tienes el trabajo.\n\n**Otter.ai / Fireflies**: transcripción automática de reuniones con resumen y action items. Conecta con Zoom y Google Meet. Después de una call con cliente, tienes en 2 minutos: transcripción completa + resumen ejecutivo + lista de acción. Lo que antes tardaba 30 minutos de notas.\n\n**Midjourney / DALL-E**: generación de imágenes para moodboards, referencias de diseño, y assets de contenido. Para briefings de diseño, generar referencias visuales en minutos en lugar de buscar en Pinterest durante horas.\n\n**Runway / Kling AI**: generación y edición de video con IA. Para agencias de video, puede extender clips, cambiar fondos, o generar b-roll de alta calidad sin cámara.\n\n## Construir el stack de IA de tu agencia\n\nNo necesitas todas las herramientas desde el día 1. El stack mínimo para una agencia en 2025:\n- ChatGPT Pro o Claude Pro: $20/mes. El núcleo de todo.\n- Perplexity Pro: $20/mes. Para research verificado.\n- Otter.ai: $10-17/mes. Para reuniones con clientes.\n- Midjourney: $10/mes. Para referencias visuales y moodboards.',
        tasks: [
          'Configura Otter.ai o Fireflies en tu cuenta de Google Meet o Zoom. En tu próxima reunión (puede ser ficticia), prueba la transcripción automática y evalúa la calidad del resumen generado',
          'Usa Perplexity para investigar el mercado de un cliente: tendencias del sector, principales competidores y oportunidades. Compara la calidad vs. una búsqueda tradicional en Google',
          'Define el stack de IA de tu agencia: cuáles herramientas usarás, para qué uso específico cada una, y cuánto cuesta mensualmente',
        ],
        tip: 'El ROI de las suscripciones de IA se mide en tiempo ahorrado. Si Claude Pro a $20/mes te ahorra 5 horas de trabajo al mes y facturas $50/hora, tu ROI es 12.5x. Haz ese cálculo para cada herramienta antes de suscribirte.',
        completed: false,
      },
          {
        id: 'prodai-1-proj-basico',
        title: 'Proyecto Básico: Optimiza 3 prompts de tu trabajo diario',
        type: 'project',
        difficulty: 'básico',
        projectBrief: 'Identifica 3 tareas que ya haces con IA y optimiza los prompts para obtener mejores resultados.',
        deliverables: [
          'Los 3 prompts originales que usabas (pueden ser simples o incompletos)',
          'Los 3 prompts optimizados con la estructura completa (rol, contexto, tarea, audiencia, restricciones, formato)',
          'Comparativa de outputs: copia el resultado del prompt original y del optimizado para cada caso',
          'Análisis: qué cambio en la estructura del prompt generó el mayor impacto en la calidad del resultado',
        ],
        tip: 'No intentes optimizar los 3 prompts a la vez. Optimiza uno, evalúa, y luego el siguiente.',
        completed: false,
      },
],
    resources: [
      { title: 'Claude — IA de Anthropic, mejor para texto y análisis largo', url: 'https://claude.ai', type: 'tool' },
      { title: 'Perplexity AI — búsqueda con IA y fuentes verificadas', url: 'https://www.perplexity.ai', type: 'tool' },
      { title: 'Otter.ai — transcripción automática de reuniones', url: 'https://otter.ai', type: 'tool' },
    ],
  },
  {
    id: 'prodai-2',
    number: 58,
    title: 'Automatización con n8n',
    description: 'Construye flujos de automatización sin código que conectan tus herramientas y eliminan trabajo manual repetitivo.',
    duration: '3 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-2-1',
        title: 'n8n: el sistema nervioso de tu agencia',
        type: 'reading',
        content: '## Por qué n8n y no Zapier\n\nn8n es la alternativa de código abierto a Zapier con ventajas clave para agencias: puede correr en tu propio servidor (sin límite de ejecuciones), tiene lógica condicional más poderosa, permite integrar código JavaScript cuando los nodos nativos no alcanzan, y tiene una interfaz visual más expresiva para flujos complejos.\n\nZapier sigue siendo válido para automatizaciones simples y equipos no técnicos. n8n es para quien quiere control total y escalar sin pagar por ejecución.\n\n## Conceptos fundamentales de n8n\n\n**Workflow**: el flujo completo de automatización. Puede tener desde 2 nodos hasta 50+.\n\n**Nodo**: cada paso del flujo. Puede ser un trigger, una acción, una transformación de datos, o lógica condicional.\n\n**Trigger**: el evento que dispara el workflow. Puede ser: tiempo (cada hora, cada lunes), webhook (cuando llega una petición HTTP), evento en una app (nuevo email, nuevo formulario, nuevo lead).\n\n**Credentials**: las conexiones autenticadas a tus apps. Configuras una vez, usas en todos los workflows.\n\n## Casos de uso de n8n para una agencia\n\n**Onboarding de clientes**: formulario de briefing → crea carpeta en Google Drive → crea proyecto en Linear/Notion → envía email de bienvenida con accesos → notifica al equipo en Slack.\n\n**Reporte automático de ads**: cada lunes a las 9am → extrae datos de Meta Ads API y Google Ads API → formatea en tablas → genera PDF → envía por email al cliente.\n\n**Gestión de leads**: formulario del sitio web → agrega a CRM → envía secuencia de nurturing en email → notifica al vendedor si el lead abre el email 3 veces.\n\n**Publicación de contenido**: aprueba post en Notion → webhook dispara n8n → publica en Instagram + LinkedIn + Twitter automáticamente.',
        tasks: [
          'Instala n8n en la nube (n8n.cloud tiene plan gratuito) o con Docker en tu máquina local. Configura las credenciales de Gmail y Google Sheets',
          'Construye tu primer workflow: cuando alguien llena un formulario de Google Forms → agrega la respuesta a una hoja de Google Sheets → envía un email de confirmación automático',
          'Identifica 3 procesos repetitivos en tu agencia o práctica actual que podrías automatizar con n8n. Para cada uno, dibuja el flujo: trigger → pasos → resultado',
        ],
        tip: 'El primer workflow de n8n siempre parece complicado. El segundo ya es fácil. Empieza con el más simple posible (formulario → email) y construye complejidad gradualmente.',
        completed: false,
      },
      {
        id: 'prodai-2-2',
        title: 'Workflows avanzados: IA + n8n + APIs',
        type: 'practice',
        content: '## Cuando n8n se conecta con IA, la automatización se vuelve inteligente\n\nn8n tiene nodos nativos para OpenAI, Anthropic (Claude), Google Gemini y otros modelos. Esto permite flujos donde la IA no solo ejecuta pasos mecánicos — toma decisiones, clasifica, resume y genera contenido en el medio del flujo.\n\n## Workflow de agencia con IA integrada\n\n**Lead scoring automático**:\n1. Nuevo lead desde formulario de contacto\n2. n8n pasa los datos del lead a Claude con el prompt: "Basado en estos datos, califica este lead del 1-10 según fit con una agencia digital de LATAM especializada en SaaS. Justifica brevemente"\n3. Si score > 7: notifica al equipo por Slack con prioridad alta\n4. Si score 4-7: agrega a secuencia de nurturing de email\n5. Si score < 4: solo registra en CRM sin acción\n\n**Resumen automático de reuniones**:\n1. Reunión termina en Zoom\n2. Otter.ai genera transcripción automáticamente\n3. n8n recibe el webhook de Otter con la transcripción\n4. Claude recibe la transcripción y genera: resumen ejecutivo, action items con responsable, y 3 puntos clave para el cliente\n5. El resumen se guarda en Notion en la página del cliente\n6. Se envía automáticamente por email al cliente\n\n**Monitoreo de menciones con respuesta asistida**:\n1. Google Alerts detecta mención de la marca del cliente\n2. n8n recibe el alert\n3. Claude clasifica si es positivo/negativo/neutral y sugiere una respuesta apropiada\n4. Notifica al CM con el contexto y la sugerencia de respuesta para revisión humana',
        tasks: [
          'Construye el workflow de resumen de reuniones: toma un archivo de texto como simulación de transcripción → Claude lo resume → el resumen se guarda en Google Docs',
          'Agrega un paso de clasificación de leads a tu formulario de contacto: cuando llega un nuevo envío, Claude lo clasifica y envía la notificación correcta según el score',
          'Documenta el workflow más complejo que construiste con diagrama visual (export desde n8n) y descripción de cada nodo',
        ],
        tip: 'n8n tiene una función de "error workflow" — un flujo separado que se activa cuando otro falla. Configura siempre un workflow de error para flujos críticos (como el onboarding de clientes). Un fallo silencioso es peor que un fallo visible.',
        completed: false,
      },
          {
        id: 'prodai-2-proj-inter',
        title: 'Proyecto Intermedio: Workflow n8n que conecta 3 herramientas',
        type: 'project',
        difficulty: 'intermedio',
        projectBrief: 'Construye un workflow en n8n que conecte al menos 3 herramientas diferentes y resuelva un problema real de tu agencia.',
        deliverables: [
          'Descripción del problema que resuelve: qué proceso manual reemplaza',
          'Workflow funcional en n8n con mínimo 3 herramientas integradas',
          'Diagrama del flujo exportado desde n8n',
          'Video de demostración de 90 segundos mostrando el workflow activándose y completándose (Loom)',
          'Cálculo de tiempo ahorrado: cuántas veces por semana se ejecuta × tiempo manual que reemplaza',
        ],
        tip: 'El workflow más valioso no es el más sofisticado — es el que automatiza la tarea más repetitiva y aburrida que tienes.',
        completed: false,
      },

    {
      id: 'prodai-2-p2',
      title: 'Proyecto: Agente de automatización con n8n',
      type: 'project',
      difficulty: 'intermedio',
      projectBrief: 'Construye un workflow en n8n que tome una solicitud de usuario vía webhook, la procese con un modelo de IA para clasificarla y responda automáticamente con una acción diferente según la categoría.',
      deliverables: [
        'Workflow exportado en JSON',
        'Captura del workflow funcionando',
        'Video de 2 minutos mostrando el flujo end-to-end',
        'Documento explicando la lógica de clasificación',
      ],
      rubrica: [
        'Workflow funciona sin errores',
        'Clasificación correcta en al menos 3 categorías',
        'Manejo de errores implementado',
      ],
      completed: false,
    },],
    resources: [
      { title: 'n8n — plataforma de automatización open source', url: 'https://n8n.io', type: 'tool' },
      { title: 'n8n Templates — flujos preconfigurados para empezar rápido', url: 'https://n8n.io/workflows', type: 'tool' },
    ],
  },
  {
    id: 'prodai-capstone',
    number: 59,
    title: 'Proyecto: Sistema de productividad con IA para tu agencia',
    description: 'Integra IA y automatización en los flujos reales de tu práctica o agencia.',
    duration: '2 semanas',
    status: 'available',
    track: 'prodai',
    lessons: [
      {
        id: 'prodai-capstone-1',
        title: 'Proyecto: Stack de productividad completo',
        type: 'project',
      difficulty: 'profesional',
        projectBrief: 'Diseña e implementa el sistema de productividad con IA de tu agencia o práctica freelance. El objetivo es que al terminar, al menos 3 procesos repetitivos en tu trabajo estén automatizados o acelerados con IA.',
        deliverables: [
          'Stack de IA documentado: herramientas elegidas, para qué uso específico, costo mensual y ROI estimado',
          'Biblioteca de prompts: mínimo 10 prompts optimizados para los casos de uso más frecuentes de tu agencia (propuestas, copy, research, reportes)',
          'Al menos 2 workflows de n8n funcionando: documentados con diagrama + descripción de cada nodo + video de demostración de 2 minutos mostrando el flujo en acción',
          'Caso de uso documentado: un proceso real que tardaba X tiempo y ahora, con IA + automatización, tarda Y. Incluye: descripción del proceso anterior, proceso nuevo, tiempo ahorrado y calidad comparativa',
          'Guía de onboarding de IA para un colaborador nuevo: cómo usarías estas herramientas si incorporaras a alguien al equipo mañana',
        ],
        tasks: [
          'Implementa los 2 workflows en n8n y graba un video de 2 minutos demostrando que funcionan',
          'Comparte el stack documentado en #proyecto-prodai y pide feedback sobre flujos que podrías mejorar o agregar',
          'Calcula el ahorro de tiempo real de los flujos implementados: horas por semana × tu tarifa horaria = valor del sistema',
        ],
        tip: 'Un sistema de IA que funciona para ti no necesariamente funciona para tu cliente. Separa: qué usas internamente para ser más eficiente (nunca lo ve el cliente) vs. qué le entregas al cliente como parte del servicio.',
        completed: false,
      },
    ],
    resources: [],
  },
]
