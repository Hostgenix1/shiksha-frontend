-- ============================================================================
-- Shiksha Admin ERP & CRM - initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Staff profiles (linked to Supabase Auth users)
-- ---------------------------------------------------------------------------
create sequence if not exists public.profiles_id_seq start 1;

create table if not exists public.profiles (
  id            text primary key default ('USR-' || nextval('public.profiles_id_seq')),
  auth_user_id  uuid unique references auth.users (id) on delete set null,
  name          text not null,
  email         text unique not null,
  role          text not null default 'Counsellor',
  status        text not null default 'Active',
  last_active   text default 'Invite pending',
  phone         text default '',
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- CRM
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id              text primary key,
  name            text not null,
  email           text,
  phone           text,
  city            text default '',
  source          text default 'Website',
  interest        text default '',
  college         text default '',
  stage           text not null default 'New',
  temperature     text not null default 'Warm',
  owner           text not null default 'Aarav Mehta',
  score           integer not null default 60,
  value           numeric not null default 0,
  created_at      timestamptz not null default now(),
  next_follow_up  date,
  last_contact    text default '',
  notes           jsonb not null default '[]'::jsonb
);

create table if not exists public.tasks (
  id         text primary key,
  title      text not null,
  lead_id    text default '',
  lead_name  text default 'General task',
  due        date,
  priority   text not null default 'Medium',
  type       text not null default 'Call',
  owner      text not null default 'Aarav Mehta',
  done       boolean not null default false
);

-- ---------------------------------------------------------------------------
-- Admissions
-- ---------------------------------------------------------------------------
create table if not exists public.students (
  id              text primary key,
  name            text not null,
  email           text,
  phone           text,
  course          text,
  college         text,
  year            text default '2026',
  status          text not null default 'Onboarding',
  fee_status      text not null default 'Pending',
  admission_date  date
);

create table if not exists public.applications (
  id            text primary key,
  lead_id       text default '',
  student_name  text not null,
  course        text,
  college       text,
  stage         text not null default 'Draft',
  submitted     text default '',
  counsellor    text default 'Aarav Mehta',
  docs_verified boolean not null default false,
  amount        numeric not null default 0
);

-- ---------------------------------------------------------------------------
-- Finance
-- ---------------------------------------------------------------------------
create table if not exists public.invoices (
  id            text primary key,
  student_id    text,
  student_name  text not null,
  course        text,
  amount        numeric not null default 0,
  paid          numeric not null default 0,
  due_date      date,
  status        text not null default 'Pending'
);

create table if not exists public.payments (
  id            text primary key,
  invoice_id    text not null references public.invoices (id) on delete cascade,
  student_name  text,
  course        text,
  amount        numeric not null default 0,
  method        text not null default 'UPI',
  reference     text default '',
  date          date not null default current_date,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Content
-- ---------------------------------------------------------------------------
create table if not exists public.content (
  id          text primary key,
  title       text not null,
  type        text not null default 'Article',
  category    text default 'General',
  author      text default 'Aarav Mehta',
  status      text not null default 'Draft',
  updated_at  date not null default current_date
);

-- ---------------------------------------------------------------------------
-- Public catalog
-- ---------------------------------------------------------------------------
create table if not exists public.colleges (
  id              text primary key,
  name            text not null,
  short_name      text,
  location        text,
  type            text default 'Government',
  rating          numeric default 4.2,
  reviews         integer default 0,
  courses         jsonb not null default '[]'::jsonb,
  nirf_rank       integer,
  fees            text,
  established     integer,
  exams_accepted  jsonb not null default '[]'::jsonb,
  image           text,
  description     text,
  status          text not null default 'Published',
  updated_at      date not null default current_date
);

create table if not exists public.courses (
  id            text primary key,
  title         text not null,
  category      text default 'Engineering',
  level         text default 'Undergraduate',
  duration      text,
  fee           text,
  rating        numeric default 4.5,
  students      text,
  image         text,
  description   text,
  eligibility   text,
  status        text not null default 'Published',
  updated_at    date not null default current_date
);

create table if not exists public.exams (
  id               text primary key,
  slug             text unique,
  name             text not null,
  full_name        text,
  conducting_body  text,
  category         text default 'Engineering',
  exam_date        text,
  apply_start      text,
  apply_end        text,
  level            text default 'Undergraduate',
  application_fee  text,
  image            text,
  status           text not null default 'Published',
  updated_at       date not null default current_date
);

-- ---------------------------------------------------------------------------
-- Workspace settings (single row) + audit trail
-- ---------------------------------------------------------------------------
create table if not exists public.org_settings (
  id                integer primary key default 1 check (id = 1),
  organisation      text not null default 'Shiksha',
  support_email     text default 'support@shiksha.com',
  support_phone     text default '1800 123 4567',
  academic_session  text default '2026-27',
  lead_sla_hours    text default '2',
  auto_assign_leads boolean not null default true,
  duplicate_check   boolean not null default true,
  email_alerts      boolean not null default true,
  daily_digest      boolean not null default false,
  updated_at        timestamptz not null default now()
);

create table if not exists public.activity_log (
  id          bigserial primary key,
  actor       text,
  action      text not null,
  entity      text,
  entity_id   text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists leads_stage_idx on public.leads (stage);
create index if not exists leads_owner_idx on public.leads (owner);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists tasks_done_idx on public.tasks (done, due);
create index if not exists applications_stage_idx on public.applications (stage);
create index if not exists payments_invoice_idx on public.payments (invoice_id);
create index if not exists invoices_student_idx on public.invoices (student_id);
create index if not exists content_status_idx on public.content (status);
create index if not exists colleges_status_idx on public.colleges (status);
create index if not exists courses_status_idx on public.courses (status);
create index if not exists exams_status_idx on public.exams (status);

-- ---------------------------------------------------------------------------
-- Auth helper: is the current user an active staff member?
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.status = 'Active'
  );
$$;

-- Automatically provision / link a profile when an auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (auth_user_id, name, email, role, status, last_active)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'Counsellor'),
    'Active',
    'Just joined'
  )
  on conflict (email) do update
    set auth_user_id = excluded.auth_user_id,
        name = coalesce(public.profiles.name, excluded.name),
        status = 'Active';
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.leads         enable row level security;
alter table public.tasks         enable row level security;
alter table public.students      enable row level security;
alter table public.applications  enable row level security;
alter table public.invoices      enable row level security;
alter table public.payments      enable row level security;
alter table public.content       enable row level security;
alter table public.colleges      enable row level security;
alter table public.courses       enable row level security;
alter table public.exams         enable row level security;
alter table public.org_settings  enable row level security;
alter table public.activity_log  enable row level security;

-- Staff-only tables: full access for active staff.
do $$
declare
  t text;
begin
  foreach t in array array[
    'leads', 'tasks', 'students', 'applications', 'invoices', 'payments',
    'content', 'org_settings', 'activity_log'
  ]
  loop
    execute format('drop policy if exists "staff_full_access" on public.%I', t);
    execute format(
      'create policy "staff_full_access" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())',
      t
    );
  end loop;
end;
$$;

-- Catalog: staff manage everything, anonymous visitors read published rows.
do $$
declare
  t text;
begin
  foreach t in array array['colleges', 'courses', 'exams']
  loop
    execute format('drop policy if exists "staff_manage_catalog" on public.%I', t);
    execute format(
      'create policy "staff_manage_catalog" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())',
      t
    );
    execute format('drop policy if exists "public_read_published" on public.%I', t);
    execute format(
      'create policy "public_read_published" on public.%I for select to anon, authenticated using (status = ''Published'')',
      t
    );
  end loop;
end;
$$;

-- Profiles: staff can read the directory; a user can update their own row.
drop policy if exists "staff_read_profiles" on public.profiles;
create policy "staff_read_profiles" on public.profiles
  for select to authenticated using (public.is_staff());

-- Staff can invite teammates (directory rows) and manage roles/status.
drop policy if exists "staff_insert_profiles" on public.profiles;
create policy "staff_insert_profiles" on public.profiles
  for insert to authenticated with check (public.is_staff());

drop policy if exists "staff_update_profiles" on public.profiles;
create policy "staff_update_profiles" on public.profiles
  for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Any signed-in user may update their own profile row.
drop policy if exists "self_update_profile" on public.profiles;
create policy "self_update_profile" on public.profiles
  for update to authenticated
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- Seed a default settings row
-- ---------------------------------------------------------------------------
insert into public.org_settings (id)
values (1)
on conflict (id) do nothing;
