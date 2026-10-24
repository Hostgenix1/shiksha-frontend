# Supabase setup (admin panel)

The admin panel works in two modes:

| Mode | When | Storage |
| --- | --- | --- |
| **Demo** | `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` missing | Browser `localStorage` (seed data from `src/admin/data/seedData.js`) |
| **Cloud** | Both env vars present | Supabase Postgres + Supabase Auth, protected by RLS |

Public pages are unaffected by this setup — they keep reading `src/data/mockData.js`.

## 1. Create a Supabase project

1. Go to <https://supabase.com/dashboard> → **New project** (free tier is fine).
2. Wait for provisioning, then open **Settings → API**.
3. Copy **Project URL** and **anon public** key — you need both in step 5.

## 2. Run the schema

1. Open **SQL Editor → New query**.
2. Paste the full contents of [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) and click **Run**.

This creates: `profiles`, `leads`, `tasks`, `students`, `applications`, `invoices`, `payments`,
`content`, `colleges`, `courses`, `exams`, `org_settings`, `activity_log`,
plus indexes, the `is_staff()` helper, the `handle_new_user` trigger and RLS policies.

## 3. Load the demo data

1. **SQL Editor → New query**.
2. Paste the full contents of [`supabase/seed.sql`](supabase/seed.sql) and click **Run**.

This inserts the same demo workspace you see in the preview: 18 leads, 10 students,
9 applications, 9 tasks, 10 invoices + payment ledger, 8 content items, 6 team profiles,
6 colleges / 8 courses / 5 exams and the workspace settings row.
The script is idempotent — re-running it will not duplicate rows.

## 4. Create the admin login

1. Open **Authentication → Users → Add user → Create new user**.
2. Email `admin@shiksha.com`, choose a password, enable **Auto Confirm User**.
3. Run this once in the SQL editor to make sure the linked profile is a Super Admin:

```sql
update public.profiles
set role = 'Super Admin'
where email = 'admin@shiksha.com';
```

The `handle_new_user` trigger links the auth user to the seeded `USR-1` profile by email,
so the workspace name/role stay consistent. Every additional staff user is created the
same way (Authentication → Users) and can be assigned a role on the **Team & roles** page.

## 5. Configure the environment

Local development — create `.env.local` in `shiksha-frontend/`:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Vercel — **Project → Settings → Environment Variables**, add the same two variables for
Production (and Preview if you want), then **redeploy**.

## 6. Verify

1. Open `/admin/login` — the demo credentials box is replaced with a "Supabase connected" note.
2. Sign in with the auth user from step 4.
3. The dashboard should show the seeded counts (18 leads, 10 students, …).
4. Create a lead, record a payment, toggle a task — refresh the page; changes should persist
   because they are written to Postgres.

## Notes

- The **anon key is public by design** — it only grants what RLS allows. Never commit the
  `service_role` key; it bypasses RLS and is not needed by the frontend.
- Only users with an **Active** profile can read/write workspace tables (`is_staff()`).
- Anonymous visitors can read only `Published` rows of `colleges`, `courses` and `exams`.
- Supabase free-tier projects pause after a week of inactivity; open the dashboard to resume.
- Catalog edits in the admin panel are stored in Postgres. The public site still renders
  `mockData.js` and will be wired to these tables in a follow-up step.
- "Reset demo workspace" becomes **Reload data** in cloud mode — it re-reads Postgres and
  never deletes cloud rows.
