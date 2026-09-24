-- ═══════════════════════════════════════════════════════════════════════════
-- 02 — Tienda de guías
--
-- Pegar entero en Supabase → SQL Editor → Run. Idempotente.
--
-- Crea dos tablas:
--   guias  → el catálogo (título, precio, dónde vive el PDF, publicada o no)
--   ventas → una fila por compra de PayPal
--
-- Decisión de producto (Gabriel, sept. 2026): pago único, una sola moneda
-- (USD), sin cuentas de comprador. Nadie se registra para comprar una guía:
-- el enlace de descarga ES el acceso, no una sesión. Por eso `ventas` no
-- tiene `user_id` — no hay a quién apuntarlo.
--
-- Antes de correr esto: crear en Storage → New bucket un bucket llamado
-- `guias` con "Public" DESACTIVADO. Sin eso, la política de más abajo no
-- tiene bucket sobre el que aplicar.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;


-- ─── guias ─────────────────────────────────────────────────────────────────
-- El catálogo. `archivo` es la ruta dentro del bucket privado `guias`
-- (convención: `<slug>/<nombre>.pdf`), nunca una URL pública.

create table if not exists public.guias (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique check (slug ~ '^[a-z0-9-]+$'),
  titulo          text not null check (length(titulo) between 1 and 160),
  titulo_en       text check (length(titulo_en) <= 160),
  descripcion     text not null check (length(descripcion) between 1 and 2000),
  descripcion_en  text check (length(descripcion_en) <= 2000),
  precio_cents    integer not null check (precio_cents > 0),
  moneda          text not null default 'USD' check (moneda = 'USD'),
  archivo         text not null,
  portada         text,
  publicada       boolean not null default false,
  creado_el       timestamptz not null default now(),
  actualizado_el  timestamptz not null default now()
);

alter table public.guias enable row level security;

create index if not exists guias_publicada_idx on public.guias (publicada);

-- Cualquiera ve el catálogo publicado — es el escaparate de la tienda. Un
-- admin ve además los borradores, para poder revisarlos antes de publicar.
drop policy if exists "guias publicadas visibles" on public.guias;
create policy "guias publicadas visibles" on public.guias
  for select to anon, authenticated
  using (publicada = true or public.es_admin());

drop policy if exists "solo admin crea guias" on public.guias;
create policy "solo admin crea guias" on public.guias
  for insert to authenticated
  with check (public.es_admin());

drop policy if exists "solo admin edita guias" on public.guias;
create policy "solo admin edita guias" on public.guias
  for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());

drop policy if exists "solo admin borra guias" on public.guias;
create policy "solo admin borra guias" on public.guias
  for delete to authenticated
  using (public.es_admin());


-- ─── ventas ────────────────────────────────────────────────────────────────
-- Una fila por compra. `token` es el enlace de descarga: no hay cuenta que
-- lo respalde, así que perderlo significa pedirle al admin que lo reenvíe.
--
-- `on delete restrict` en `guia_id`: no se puede borrar una guía que ya
-- vendió algo. Se despublica, no se borra — borrarla rompería el historial
-- de ventas y el enlace de quien ya pagó.

create table if not exists public.ventas (
  id             uuid primary key default gen_random_uuid(),
  guia_id        uuid not null references public.guias(id) on delete restrict,
  paypal_order_id text not null unique,
  email          text not null check (length(email) between 3 and 200),
  importe_cents  integer not null check (importe_cents > 0),
  moneda         text not null default 'USD',
  estado         text not null default 'pagada' check (estado in ('pagada', 'reembolsada')),
  token          text not null unique,
  token_vence_el timestamptz not null,
  descargas      integer not null default 0,
  creado_el      timestamptz not null default now()
);

alter table public.ventas enable row level security;

create index if not exists ventas_guia_id_idx on public.ventas (guia_id);
create index if not exists ventas_token_idx   on public.ventas (token);

-- Sin cuentas de comprador, nadie tiene una sesión propia que mostrar aquí:
-- las únicas lecturas legítimas por sesión son las del admin, para el panel
-- de ventas.
drop policy if exists "solo admin ve ventas" on public.ventas;
create policy "solo admin ve ventas" on public.ventas
  for select to authenticated
  using (public.es_admin());

-- El admin puede reenviar un enlace (renueva token y vencimiento) o revocar
-- una venta a mano. La escritura normal — registrar una compra real, marcar
-- una descarga — NO pasa por aquí: pasa por el cliente de servicio en
-- lib/ventas.ts, que bypassa RLS porque quien compra no tiene sesión con la
-- que esta política pueda razonar. Ver lib/supabase/admin.ts.
drop policy if exists "solo admin actualiza ventas" on public.ventas;
create policy "solo admin actualiza ventas" on public.ventas
  for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());

-- Sin política de INSERT para nadie con sesión: si alguna vez se necesita
-- registrar una venta desde una sesión de admin (alta manual, por ejemplo),
-- se agrega esa política explícitamente en ese momento. Hoy no hace falta.


-- ─── consumir_descarga() ───────────────────────────────────────────────────
-- Valida el token y cuenta la descarga en una sola sentencia, para que dos
-- clics simultáneos en el mismo enlace no se salten el límite de 5.
--
-- SECURITY DEFINER por costumbre del archivo 01 y como defensa en
-- profundidad, aunque hoy solo la llama el cliente de servicio (que ya
-- bypassa RLS): si el día de mañana se relaja esa regla, la función sigue
-- siendo segura por sí misma.

create or replace function public.consumir_descarga(p_token text)
returns table (archivo text, titulo text, titulo_en text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_guia_id uuid;
begin
  update public.ventas v
     set descargas = v.descargas + 1
   where v.token = p_token
     and v.estado = 'pagada'
     and v.token_vence_el > now()
     and v.descargas < 5
  returning v.guia_id into v_guia_id;

  if v_guia_id is null then
    return;
  end if;

  return query
    select g.archivo, g.titulo, g.titulo_en
      from public.guias g
     where g.id = v_guia_id;
end;
$$;

-- `revoke ... from anon, authenticated` NO alcanza: Postgres le da EXECUTE a
-- PUBLIC por defecto al crear una función, y PUBLIC no es lo mismo que "cada
-- rol nombrado" — revocarlo de anon/authenticated deja intacto lo que
-- heredan de PUBLIC. Verificado en este proyecto el 25 de septiembre de
-- 2026: con la sola `revoke ... from anon`, la clave anon pública seguía
-- pudiendo invocar la función por la API REST. Hay que revocar de PUBLIC
-- explícitamente, y devolver el permiso solo a quien de verdad la llama.
revoke execute on function public.consumir_descarga(text) from public;
grant execute on function public.consumir_descarga(text) to service_role;


-- ─── Storage: bucket privado `guias` ───────────────────────────────────────
-- El admin sube y gestiona los PDF con su propia sesión (por eso INSERT y
-- UPDATE están abiertos a `authenticated` + es_admin()). Nadie puede LEER un
-- objeto de este bucket con su propia sesión ni con la clave anon —
-- deliberado: la única lectura posible es la que hace el cliente de servicio
-- al firmar una URL de 60 segundos en la ruta de descarga. Sin política de
-- SELECT aquí, ese es el único camino que existe.

drop policy if exists "admin sube guias" on storage.objects;
create policy "admin sube guias" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'guias' and public.es_admin());

drop policy if exists "admin reemplaza guias" on storage.objects;
create policy "admin reemplaza guias" on storage.objects
  for update to authenticated
  using (bucket_id = 'guias' and public.es_admin())
  with check (bucket_id = 'guias' and public.es_admin());

drop policy if exists "admin borra guias" on storage.objects;
create policy "admin borra guias" on storage.objects
  for delete to authenticated
  using (bucket_id = 'guias' and public.es_admin());
