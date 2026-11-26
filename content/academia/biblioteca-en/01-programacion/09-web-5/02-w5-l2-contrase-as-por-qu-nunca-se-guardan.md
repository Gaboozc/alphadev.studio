# Passwords: Why They Are Never Stored
area: Programming | module: web-5 — Authentication in Web Applications | lesson 2
id: w5-l2 | type: reading | difficulty: intermediate
url: https://www.alphadev.studio/en/academia/programacion/web-5/w5-l2

## Content

## Nobody stores passwords

Not you, not Google, not your bank. What gets stored is a **hash**: the result of passing the password through a one-way function that can't be reversed.

```
"miClave123"  →  hash  →  $2b$12$eImiTXuWVxfM37uY4JANjQ...
```

When you sign in, the system re-computes the hash of what you typed and compares it with the stored hash. It never needs to know the original password. That's why, when you forget your password, a serious service lets you create a new one but never tells you what the old one was: it doesn't have it.

### Why not just any hash will do

MD5 and SHA-1 were designed to be **fast**, and that's the exact property you don't want. A graphics card computes billions of MD5 hashes per second: trying every common password takes minutes.

The right algorithms are **bcrypt, scrypt, or Argon2**, designed to be slow and configurable. If a hash takes 100 milliseconds, the user doesn't notice when signing in, while an attacker drops from a billion guesses per second to ten.

### The salt

Two users with the same password would produce the same hash, which lets attackers target many accounts at once using precomputed tables. A **salt** is a distinct random value for each user that gets mixed in before computing the hash. Bcrypt generates and stores it inside the hash itself: you don't have to manage it yourself.

```ts
import bcrypt from 'bcryptjs'

// on sign-up
const hash = await bcrypt.hash(password, 12)   // 12 = cost factor

// on sign-in
const coincide = await bcrypt.compare(passwordEscrita, hashGuardado)
```

The cost factor is exponential: 12 takes twice as long as 11. Between 10 and 12 is reasonable today.

### Password requirements that actually work

The classic rules — one uppercase letter, one number, one symbol — push people toward `Password1!`, which is predictable. What actually matters is **length** and that it isn't an already-leaked password.

- Minimum 8 characters, ideally 12.
- Allow spaces and long passphrases.
- Don't force changes every 90 days: that produces `Summer2026`, then `Fall2026`.
- Check against leaked-password lists if you can.

### The mistake of a message that says too much

```
Bad:  "That user does not exist"
Bad:  "Incorrect password"
Good: "Incorrect email or password"
```

The first two confirm to an attacker which email addresses are registered, which is the very first step of an attack. The third reveals nothing. The same applies to sign-up and password recovery.

### Rate-limiting attempts

Without a limit, anyone can try passwords indefinitely. The minimum: count failed attempts per account and per IP address, and apply an increasing delay. After five failures, a one-minute lockout stops most automated attacks without bothering someone who genuinely mistyped.

## Tasks
- Install bcryptjs in a project and store a test hash with cost 12
- Generate two hashes of the SAME password and verify they're different: that's the salt at work
- Review the sign-in error messages of one of your projects and unify them so they don't reveal whether the email exists
- Design a failed-attempt policy on paper: how many, for how long, and what you count against

## Tip

If a service emails you your password when you forget it, that means it stores it in plain text or in a reversible form. That's reason enough not to trust it with anything important — and never to do it yourself in what you build.
