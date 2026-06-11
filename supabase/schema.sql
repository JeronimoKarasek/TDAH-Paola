-- ============================================================
-- Sintonize TDAH — Schema do banco (Supabase / Postgres)
-- ============================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ===== Usuários do app (assinantes) =====
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  plan_id text,
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists app_users_email_idx on public.app_users (lower(email));

-- ===== Configuração do site (singleton) =====
create table if not exists public.site_config (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint site_config_singleton check (id = 1)
);

-- ===== Leads / tentativas de checkout =====
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  ts bigint not null,
  name text,
  email text,
  phone text,
  cpf text,
  plan_id text,
  source text,
  created_at timestamptz not null default now()
);

-- ===== Visitas (tracking) =====
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  ts bigint not null,
  ip text,
  country text,
  city text,
  ua text,
  device text,
  browser text,
  os text,
  referrer text,
  path text,
  created_at timestamptz not null default now()
);

create index if not exists visits_ts_idx on public.visits (ts);

-- As tabelas são acessadas apenas pelo backend (service role),
-- então RLS pode ficar habilitado sem políticas públicas.
alter table public.app_users enable row level security;
alter table public.site_config enable row level security;
alter table public.leads enable row level security;
alter table public.visits enable row level security;
