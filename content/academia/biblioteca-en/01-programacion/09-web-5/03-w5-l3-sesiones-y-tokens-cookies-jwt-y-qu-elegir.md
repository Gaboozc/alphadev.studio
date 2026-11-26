# Sessions and Tokens: Cookies, JWT, and What to Choose
area: Programming | module: web-5 — Authentication in Web Applications | lesson 3
id: w5-l3 | type: reading | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/web-5/w5-l3

## Content

## The problem

HTTP remembers nothing: every request arrives without knowing who you are. After signing in, you have to give the browser something that proves, on every following request, that you already authenticated.

There are two ways to do it.

### Server-side sessions

The server generates a random identifier, stores it alongside the user, and hands it to the browser in a cookie. On each request, it looks up that identifier and knows who you are.

- **Pro**: you can log out a session instantly by deleting it from the server.
- **Con**: the server has to store and query state.

### Tokens (JWT)

The server signs a token containing the user's data. It stores nothing: it verifies the signature on every request.

```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJyb2wiOiJhZG1pbiJ9.4f3a...
   header               payload                            signature
```

**The important part: a JWT's payload isn't encrypted, only signed.** Anyone can read it by pasting it into jwt.io. The signature prevents tampering, not reading. Never put sensitive data inside.

- **Pro**: the server stores no state.
- **Con**: you can't invalidate it before it expires. If someone steals it, it works until it expires.

### How it's solved in practice

A short-lived access token (15 minutes) plus a long-lived refresh token stored in a way that can be revoked. If the access token is stolen, the window of damage is small.

### Where it's stored: the decision people get wrong most often

```
localStorage        ❌  any script on your page can read it
sessionStorage      ❌  same problem
regular cookie      ❌  readable by JavaScript
httpOnly cookie     ✅  the page's JavaScript can't touch it
```

Storing a token in `localStorage` means any scripting vulnerability — a compromised dependency, a comment injecting HTML — lets an attacker steal the session. An `httpOnly` cookie isn't accessible from JavaScript, so that theft becomes impossible.

```ts
// Next.js — properly configured session cookie
cookies().set('session', token, {
  httpOnly: true,                              // JS cannot read it
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'lax',                             // mitigates CSRF
  maxAge: 60 * 60 * 24 * 7,                    // 7 days
  path: '/',
})
```

Each option closes a specific hole: `httpOnly` against script theft, `secure` against reading on open networks, `sameSite` against requests from other sites.

### Supabase Auth

In the stack you're using, Supabase handles almost all of this: sign-up, sign-in, email verification, password recovery, and external providers. It issues JWTs and, with `@supabase/ssr`, stores them in `httpOnly` cookies.

What Supabase does **not** decide for you is authorization: what each user can see. You define that with Row Level Security policies in the database and server-side checks. The next lesson covers that.

## Tasks
- Paste a sample JWT into jwt.io and verify you can read its payload with no key
- Check one of your projects to see if any token is stored in localStorage and note what a theft would mean
- Configure a session cookie with all four options and explain what each protects
- Compare server sessions and JWT for a concrete case of yours: do you need to log out sessions immediately?

## Tip

If a token goes into localStorage, assume any script that enters your page can steal it, including dependencies you install without reading. The httpOnly cookie turns that risk into something the browser blocks by design.
