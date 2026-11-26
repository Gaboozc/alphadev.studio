# Global State: Context, Zustand, and When to Use Each
area: Programming | module: web-3 — React and Next.js App Router | lesson 7
id: w3-l4 | type: reading | difficulty: 
url: https://www.alphadev.studio/en/academia/programacion/web-3/w3-l4

## Content

## The problem global state solves

useState solves state for ONE component. But what happens when five different components need to know whether the user is logged in, or what's in the cart? Passing props manually through every intermediate level ("prop drilling") becomes unmaintainable fast.

### Context API — React's native solution

Context avoids prop drilling by sharing a value across any component in the tree, without passing it manually level by level.

```tsx
// contexts/AuthContext.tsx
'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';

type Usuario = { id: string; nombre: string; email: string };
type AuthContextValue = {
  usuario: Usuario | null;
  login: (u: Usuario) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (u: Usuario) => setUsuario(u);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook: fails loudly if used outside the provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
```

Any child component of `<AuthProvider>` can read `usuario` with `const { usuario } = useAuth()`, without any intermediate component knowing it exists.

### The real limit of Context: re-renders

Context has a problem you don't notice until the app grows: **any change to the value re-renders ALL consumers**, even if they only care about one part of the state. A counter changing every second inside the same context as the logged-in user also re-renders components that only read the user.

For state that changes rarely (theme, language, session), Context is great. For state that changes often and in many places (cart, filters, complex UI), you need finer control over what re-renders.

### Zustand — global state without the ceremony

Zustand solves that exact problem: each component subscribes only to the slice of state it uses, via a selector.

```tsx
// store/carrito.ts
import { create } from 'zustand';

type Item = { id: string; nombre: string; precio: number; cantidad: number };

type CarritoStore = {
  items: Item[];
  agregar: (item: Item) => void;
  quitar: (id: string) => void;
  total: () => number;
};

export const useCarrito = create<CarritoStore>((set, get) => ({
  items: [],
  agregar: (item) =>
    set((state) => ({ items: [...state.items, item] })),
  quitar: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  total: () => get().items.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
}));
```

```tsx
// In any component, no Provider, no wrapping:
function ContadorCarrito() {
  // Subscribes ONLY to items.length — if total changes, this component won't re-render
  const cantidad = useCarrito((state) => state.items.length);
  return <span>{cantidad} items</span>;
}

function BotonAgregar({ producto }: { producto: Item }) {
  const agregar = useCarrito((state) => state.agregar);
  return <button onClick={() => agregar(producto)}>Add</button>;
}
```

No `<Provider>` wrapping the app, no reducers, no action types. The store lives outside the React tree and any component connects to it directly.

### Zustand vs. Redux Toolkit

Redux Toolkit is still the standard on large teams for its ecosystem (time-travel DevTools, mature middleware, heavily documented patterns) and because it enforces a predictable structure in apps with dozens of developers touching the same state. The cost is boilerplate: slices, reducers, an explicit dispatch for every change.

Zustand aims at the same goal with a minimal API — it's the default choice for small-to-medium team products, which is 90% of the projects you'll build early in your career.

| | Context API | Zustand | Redux Toolkit |
|---|---|---|---|
| Setup | Zero deps | 1 dependency | 2 dependencies |
| Boilerplate | Low | Very low | Medium |
| Fine-grained re-renders | No | Yes (by selector) | Yes (by selector) |
| DevTools | No | With plugin | Native, very mature |
| When to use it | Theme, language, session | Cart, filters, global UI | Large teams, very complex state |

### The practical rule

Not everything is global state. Before pulling something out of local `useState`, ask yourself: do two components that aren't direct parent-child actually need it? If the answer is no, local state is still the right choice — it's simpler to reason about and doesn't pay the cost of a global subscription.
