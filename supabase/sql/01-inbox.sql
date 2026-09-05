-- ═══════════════════════════════════════════════════════════════════════════
-- 01 — Perfiles e Inbox
--
-- Pegar entero en Supabase → SQL Editor → Run. Es idempotente: se puede
-- volver a correr sin romper nada.
--
-- Crea dos tablas:
--   perfiles → quién es quién, y quién es admin
--   mensajes → lo que llega por el formulario de contacto
--
-- La tabla `permisos` NO está aquí. Va en 02, cuando toque la Fase 3.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─── perfiles ──────────────────────────────────────────────────────────────
-- auth.users es de Supabase y no se puede extender ni consultar con comodidad
-- desde la app. Esta tabla es el espejo propio: una fila por usuario.

create table if not exists public.perfiles (
  user_id  uuid primary key references auth.users(id) on delete cascade,
  email    text not null,
  nombre   text,
  es_admin boolean not null default false,
  creado_el timestamptz not null default now()
);

alter table public.perfiles enable row level security;


-- ¿Es admin quien está pidiendo?
--
-- SECURITY DEFINER a propósito: la función se salta RLS, así que puede leer
-- `perfiles` sin disparar la política que a su vez la llamaría — que sería una
-- recursión infinita. `search_path` fijo para que nadie pueda secuestrarla
-- creando un esquema con una tabla `perfiles` propia.
create or replace function public.es_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select p.es_admin from public.perfiles p where p.user_id = auth.uid()), false)
$$;

revoke execute on function public.es_admin() from anon;


-- Cada quien ve su propia fila. Los admin ven todas.
drop policy if exists "perfil propio visible" on public.perfiles;
create policy "perfil propio visible" on public.perfiles
  for select to authenticated
  using (user_id = auth.uid() or public.es_admin());

-- Nadie cambia `es_admin` desde la app. Se toca a mano desde este editor.
drop policy if exists "solo admin edita perfiles" on public.perfiles;
create policy "solo admin edita perfiles" on public.perfiles
  for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());


-- Alta automática: cada usuario nuevo de auth.users recibe su perfil.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Los que ya existían antes del trigger.
insert into public.perfiles (user_id, email)
select id, email from auth.users
on conflict (user_id) do nothing;


-- ─── mensajes ──────────────────────────────────────────────────────────────
-- El formulario de contacto es público, así que esta tabla acepta INSERT de
-- cualquiera. Los límites de longitud no son cosmética: son lo que impide que
-- alguien con la clave anon —que es pública por diseño— llene la base.

create table if not exists public.mensajes (
  id        uuid primary key default gen_random_uuid(),
  categoria text not null check (categoria in ('consultation','app','internal','api','other')),
  nombre    text not null check (length(nombre) between 1 and 120),
  email     text not null check (length(email) between 3 and 200 and email like '%_@_%'),
  empresa   text check (length(empresa) <= 160),
  mensaje   text not null check (length(mensaje) between 1 and 5000),
  extra     jsonb,
  estado    text not null default 'nuevo' check (estado in ('nuevo','leido','respondido','archivado')),
  creado_el timestamptz not null default now()
);

alter table public.mensajes enable row level security;

create index if not exists mensajes_creado_el_idx on public.mensajes (creado_el desc);
create index if not exists mensajes_estado_idx    on public.mensajes (estado);

-- Escribir: cualquiera. Es un formulario de contacto.
drop policy if exists "cualquiera envia" on public.mensajes;
create policy "cualquiera envia" on public.mensajes
  for insert to anon, authenticated
  with check (true);

-- Leer y cambiar de estado: solo admin. Sin esto, la clave anon —que viaja en
-- el bundle del navegador— serviría para leer todos los mensajes recibidos.
drop policy if exists "solo admin lee" on public.mensajes;
create policy "solo admin lee" on public.mensajes
  for select to authenticated
  using (public.es_admin());

drop policy if exists "solo admin actualiza" on public.mensajes;
create policy "solo admin actualiza" on public.mensajes
  for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());


-- ─── Último paso, a mano ───────────────────────────────────────────────────
-- Marcarte como admin. Cambia el correo si usaste otro para registrarte:
--
--   update public.perfiles set es_admin = true
--   where email = 'zavarsegabriel@gmail.com';
--
-- Comprobar que quedó:
--   select email, es_admin from public.perfiles;
