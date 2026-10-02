-- ═══════════════════════════════════════════════════════════════════════════
-- 03 — Ventas de servicios (registro manual)
--
-- Pegar entero en Supabase → SQL Editor → Run. Idempotente.
--
-- Distinta de `ventas` (supabase/sql/02-guias.sql), que son compras
-- automáticas de guías por PayPal. Esta tabla es para lo otro: sitios web,
-- paquetes, lo que sea que alguien del equipo cierra a mano con un cliente y
-- registra aquí — no hay comprador anónimo, no hay webhook, no hay token de
-- descarga. Por eso no necesita el cliente de servicio: todo corre con la
-- sesión del admin, igual que `guias`.
--
-- Multi-moneda a propósito: los segmentos de cliente no cotizan en la misma
-- divisa (PyME LATAM en MXN, founders de EE. UU. en USD). Sumar cents de
-- monedas distintas como si fueran lo mismo sería un número mentiroso — el
-- código de lectura (lib/kpis.ts) separa los totales por moneda, nunca los
-- mezcla.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists public.ventas_servicios (
  id            uuid primary key default gen_random_uuid(),
  cliente       text not null check (length(cliente) between 1 and 160),
  servicio      text not null check (length(servicio) between 1 and 200),
  -- Texto libre, no una tabla de usuarios: hoy es un nombre que el admin
  -- escribe, no una cuenta con login. Si el equipo crece y hace falta
  -- permisos por vendedor, se convierte en una FK a una tabla propia.
  vendedor      text not null check (length(vendedor) between 1 and 120),
  importe_cents integer not null check (importe_cents > 0),
  moneda        text not null default 'USD' check (moneda in ('USD', 'MXN')),
  metodo_pago   text not null check (metodo_pago in ('transferencia', 'paypal', 'mercadopago', 'efectivo', 'otro')),
  estado        text not null default 'pendiente' check (estado in ('pendiente', 'pagado', 'cancelado')),
  notas         text check (length(notas) <= 2000),
  -- Fecha del cierre/cobro, no de cuando se cargó el registro — pueden
  -- diferir si alguien anota la venta unos días después.
  fecha_venta   date not null default current_date,
  creado_el     timestamptz not null default now()
);

alter table public.ventas_servicios enable row level security;

create index if not exists ventas_servicios_fecha_idx on public.ventas_servicios (fecha_venta);
create index if not exists ventas_servicios_vendedor_idx on public.ventas_servicios (vendedor);

-- Solo admin, en las cuatro operaciones: esto no tiene contraparte pública,
-- a diferencia de `guias` (que sí necesita un SELECT abierto para el
-- catálogo). Nadie más que el admin necesita ver, cargar, editar o borrar
-- un registro de esta tabla.
drop policy if exists "solo admin ve ventas_servicios" on public.ventas_servicios;
create policy "solo admin ve ventas_servicios" on public.ventas_servicios
  for select to authenticated
  using (public.es_admin());

drop policy if exists "solo admin crea ventas_servicios" on public.ventas_servicios;
create policy "solo admin crea ventas_servicios" on public.ventas_servicios
  for insert to authenticated
  with check (public.es_admin());

drop policy if exists "solo admin edita ventas_servicios" on public.ventas_servicios;
create policy "solo admin edita ventas_servicios" on public.ventas_servicios
  for update to authenticated
  using (public.es_admin())
  with check (public.es_admin());

drop policy if exists "solo admin borra ventas_servicios" on public.ventas_servicios;
create policy "solo admin borra ventas_servicios" on public.ventas_servicios
  for delete to authenticated
  using (public.es_admin());
