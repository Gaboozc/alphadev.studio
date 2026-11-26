# Server Actions: Mutations Without API Routes
area: Programming | module: web-3 — React and Next.js App Router | lesson 8
id: w3-l5 | type: reading | difficulty: 
url: https://www.alphadev.studio/en/academia/programacion/web-3/w3-l5

## Content

## The problem they solve

Until now, getting a form to save data required: an API route to receive the POST, a client-side `fetch` calling it, manual loading/error handling, and sometimes a separate endpoint just for that. Next.js **Server Actions** eliminate that redundant round-trip: a function that runs on the server, callable directly from a form or client event, without writing an endpoint.

### Your first Server Action

```tsx
// app/proyectos/actions.ts
'use server'; // marks EVERYTHING exported from this file as a Server Action

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ProyectoSchema = z.object({
  titulo: z.string().min(3).max(80),
  descripcion: z.string().min(10).max(500),
});

export async function crearProyecto(formData: FormData) {
  const datos = ProyectoSchema.safeParse({
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
  });

  if (!datos.success) {
    return { error: 'Check the fields: ' + datos.error.issues[0].message };
  }

  // This runs on the server: direct database access,
  // without exposing any URL or credential to the browser.
  await db.proyecto.create({ data: datos.data });

  // Tells Next.js that the /proyectos route has new data
  revalidatePath('/proyectos');
  return { error: null };
}
```

```tsx
// app/proyectos/FormularioProyecto.tsx
'use client';
import { useActionState } from 'react';
import { crearProyecto } from './actions';

export function FormularioProyecto() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error: string | null }, formData: FormData) => crearProyecto(formData),
    { error: null }
  );

  return (
    <form action={formAction}>
      <input name="titulo" placeholder="Title" required />
      <textarea name="descripcion" placeholder="Description" required />
      <button disabled={pending}>{pending ? 'Saving...' : 'Create project'}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
```

No `fetch`, no `/api/proyectos/route.ts`, no manual response serialization. The form invokes the server function as if it were local, React handles loading state with `useActionState`, and `pending` replaces the `isLoading` you used to wire up with a separate `useState`.

### When SHOULD you use an API route instead of a Server Action?

Server Actions are built for mutations invoked from your own React UI. An API route is still needed when:

- An external service (a Stripe webhook, a third party) needs to hit a public HTTP URL.
- You need to expose data to a client that isn't your React app (a mobile app, another service).
- The endpoint has to support arbitrary HTTP methods with specific headers/status codes required by the consumer.

### Revalidation: the other half of the pattern

A Server Action that mutates data almost always needs to tell Next.js which pages went stale:

```tsx
import { revalidatePath, revalidateTag } from 'next/cache';

// Invalidates the cache for a specific route
revalidatePath('/proyectos');

// Invalidates everything cached under a tag,
// useful when the same data appears on several pages
revalidateTag('proyectos');
```

Without this, the user creates a project and doesn't see it appear until refreshing manually — the most common mistake when adopting Server Actions for the first time.

### Security: a Server Action is a public endpoint

It's easy to forget this because it feels like calling a local function, but **anyone can invoke a Server Action directly**, bypassing your form — inspecting the bundle shows the action's name, and it can be called with any payload. Every Server Action must:

1. Validate its input (Zod, as above) — never trust what arrives.
2. Check authentication/authorization explicitly, just as you would in an API route.
3. Never assume the `formData` came from the form you wrote — it can come from anywhere.
