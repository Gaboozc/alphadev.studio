# Project: Private Area with Per-User Permissions
area: Programming | module: web-5 — Authentication in Web Applications | lesson 6
id: w5-l6 | type: project | difficulty: professional
url: https://www.alphadev.studio/en/academia/programacion/web-5/w5-l6

## Project brief

You're going to build the complete access system for a real private area, with permissions assigned by an administrator. It's the exact problem AlphaDev Academy has in Phase 2, and the same one that shows up in any product that charges for content.

The scenario: a platform with content divided into sections. There are three kinds of people — administrators with full access, users with access to some sections, and visitors with no access. An administrator decides who sees what, and can give an access grant an expiration date.

The requirement that defines the project: **a section's content cannot reach the browser of someone who doesn't have permission for it.** Hiding it isn't enough.

## Tasks
- Design the schema: users, permissions (user, scope, expiration) and content by section
- Implement authentication with Supabase Auth and httpOnly cookies using @supabase/ssr
- Write the middleware for private routes and the fine-grained check in each Server Component
- Build the admin panel with a server-side role check
- Add Row Level Security policies and verify they work even if code fails
- Attack your own app: no session, another user's session, expired permission and direct curl

## Deliverables
- Next.js app with sign-up, sign-in, sign-out and password recovery
- Middleware that protects private routes and preserves the original destination after signing in
- Per-user permissions table with scope (full, by section) and optional expiration date
- Admin panel to invite people and assign or revoke permissions
- Row Level Security policies in the database as the final defense layer
- A document with the security tests you ran and their results

## Rubric
- Passwords are stored hashed with bcrypt or via Supabase Auth, never in plain text
- The session travels in an httpOnly, secure and sameSite cookie, not in localStorage
- Requesting a private endpoint with curl and no session returns 401, not data
- Requesting a section without permission returns 403 or 404, and the content doesn't appear in the response
- Content is read on the server after checking permission, not before
- Sign-in and recovery messages don't reveal whether an email is registered
- Recovery tokens are random, stored hashed, expire and are single-use
- An expired permission stops granting access without anyone having to revoke it manually
- The admin panel is protected by role, checked on the server

## Discussion questions
- What happens if a user keeps the tab open when you revoke their permission? How soon should it stop working?
- Should an expired permission show "your access expired" or make the section disappear as if it didn't exist?

## Tip

Run the curl test before calling the project done. Open a terminal, request a section endpoint without sending any cookie, and inspect the full response. If content appears there, the job isn't done, no matter how nicely the UI behaves.
