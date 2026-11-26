# Protecting Routes for Real: The Server Decides
area: Programming | module: web-5 — Authentication in Web Applications | lesson 4
id: w5-l4 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/web-5/w5-l4

## Content

## Three layers, and only one protects

1. **Hiding the UI** — user experience. Doesn't protect.
2. **Redirecting on the client** — user experience. Doesn't protect.
3. **Checking on the server before responding** — this actually protects.

The first two make the application feel good. The third is what stops someone from getting the data with a direct request.

### Middleware: the front gate

In Next.js, middleware runs before the request reaches the page. It's the natural place to cut off access:

```ts
// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')

  if (!session) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/academia/:path*', '/admin/:path*'],
}
```

Saving the requested path in `redirect` is a small detail with a big effect: after signing in, the user goes back to where they were instead of being dropped on the home page.

### Middleware isn't enough

Middleware checks that a session exists, not what that user is allowed to see. The fine-grained check belongs in the Server Component, right next to the data:

```tsx
// app/academia/[rama]/page.tsx
import { redirect, notFound } from 'next/navigation'

export default async function RamaPage({ params }) {
  const { rama } = await params
  const usuario = await getUsuario()          // reads the session on the server
  if (!usuario) redirect('/login')

  const permitido = await puedeVer(usuario.id, rama)
  if (!permitido) notFound()

  const modulos = await getModulos(rama)      // data is read AFTER checking
  return <RamaContent modulos={modulos} />
}
```

Order matters and isn't cosmetic: **first check, then read.** If you load the data first, it will travel to the browser even if you decide not to render it afterward.

### The mistake this Academy made

This is the exact real bug AlphaDev Academy had: course content was imported in a client component, so Next bundled it into the page's JavaScript bundle. The check decided what to **render**, when it was already too late: the data had left the server.

The fix has a simple rule behind it: **paid content is read on the server, inside the function that already checked permission, and only what that person is allowed to see gets sent.**

### Protect endpoints too

Every Route Handler and every Server Action needs its own check. They don't inherit middleware if they're outside `matcher`, and even if they are inside, middleware only knows there's a session:

```ts
export async function POST(request: Request) {
  const usuario = await getUsuario()
  if (!usuario) return new Response('Unauthorized', { status: 401 })
  if (usuario.rol !== 'admin') return new Response('Forbidden', { status: 403 })

  // only here does the logic run
}
```

**401** means "I don't know who you are"; **403** means "I know who you are and you can't."

### Row Level Security

With Supabase you can put the final defense in the database: rules that filter rows based on who is querying, even if the query is poorly written.

```sql
create policy "each person sees their own progress"
on lesson_progress for select
using (auth.uid() = user_id);
```

It's the safety net that saves you on the day someone forgets a check in code.

## Tasks
- Write middleware that protects a route and preserves the original destination to return after signing in
- Take a private page of yours and reorder the code: check permission first, read data after
- Test your endpoints with curl without a session and confirm they return 401 and no data
- Write a Row Level Security policy for a table where each user only sees their own rows

## Tip

The definitive test is trying to access without a session using curl or from a private window. If your app shows the login screen, but a direct request to the endpoint returns data, it isn't protected: it's disguised.
