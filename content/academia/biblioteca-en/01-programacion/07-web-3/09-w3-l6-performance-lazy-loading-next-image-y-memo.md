# Performance: Lazy Loading, next/image, and memo
area: Programming | module: web-3 — React and Next.js App Router | lesson 9
id: w3-l6 | type: reading | difficulty: 
url: https://www.alphadev.studio/en/academia/programacion/web-3/w3-l6

## Content

## Why performance isn't optional

A site that takes more than 2.5 seconds to show content loses users measurably — and Google penalizes those times in ranking (Core Web Vitals). Next.js comes with several tools built in for this; the job is knowing when to use each one.

### next/image: the optimization you almost never have to think about

An unoptimized image is, on most sites, the heaviest part of the page. Next.js's `Image` component solves several problems at once: it serves the right format (AVIF/WebP) for the browser, generates the sizes needed for each breakpoint, and defers loading off-screen images.

```tsx
import Image from 'next/image';

// With known dimensions (recommended: prevents layout shift)
<Image
  src="/proyecto-hero.jpg"
  alt="Project screenshot"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// The most important image on the page (LCP) gets priority:
// so the browser doesn't treat it as deferrable
<Image src="/hero.jpg" alt="Hero" fill priority sizes="100vw" />
```

The `sizes` attribute isn't cosmetic: it tells the browser what actual width the image will occupy at each breakpoint, so it doesn't download a 1200px version on a phone that only displays it at 375px.

### Lazy loading components with next/dynamic

A dashboard with a heavy chart (Chart.js, a rich-text editor) shouldn't block the initial load of the entire page if that component lives lower down, off-screen.

```tsx
import dynamic from 'next/dynamic';

// This component and its dependencies DO NOT enter the initial bundle
const GraficoVentas = dynamic(() => import('./GraficoVentas'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // if the library depends on window/document
});
```

The initial bundle shrinks, the interactive page arrives sooner, and the heavy component downloads in parallel while the user can already use the rest of the interface.

### memo and useMemo: avoiding repeated work

React re-renders a component every time its parent re-renders, even if its props didn't change. For cheap components this is invisible; for a 500-row table or a heavy calculation, it's not.

```tsx
import { memo, useMemo } from 'react';

// memo: the component DOES NOT re-render if its props are equal
// (shallow comparison) to last time
const FilaTabla = memo(function FilaTabla({ item }: { item: Item }) {
  return <tr><td>{item.nombre}</td><td>{item.precio}</td></tr>;
});

function TablaProductos({ items, filtro }: { items: Item[]; filtro: string }) {
  // useMemo: the heavy calculation only runs again if items or filtro changed,
  // not on every render of TablaProductos for another reason (e.g., an unrelated input)
  const filtrados = useMemo(
    () => items.filter((i) => i.nombre.includes(filtro)),
    [items, filtro]
  );

  return (
    <table>
      <tbody>
        {filtrados.map((item) => <FilaTabla key={item.id} item={item} />)}
      </tbody>
    </table>
  );
}
```

### The trap: optimizing before measuring

`memo` and `useMemo` have their own cost (storing and comparing values) — wrapping EVERYTHING in memo out of habit usually makes code slower and harder to read, not faster. The right sequence is: measure with Chrome DevTools' Performance panel or the Next.js Bundle Analyzer, find the component that actually re-renders too much or the bundle that's actually heavy, and optimize THAT. Optimizing blindly is the number one reason these tools have a bad reputation for "complicating code for nothing."
