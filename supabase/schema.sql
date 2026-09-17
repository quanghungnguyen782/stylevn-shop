-- LyleAuthentic: Zalo bot -> luxury bag listings schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create extension if not exists pgcrypto;

-- ============================================================
-- bag_submissions: one row per in-flight or published listing
-- ============================================================
create table if not exists bag_submissions (
  id                 uuid primary key default gen_random_uuid(),
  chat_id            text not null,
  status             text not null default 'collecting'
                     check (status in (
                       'collecting', 'awaiting_confirmation', 'queued_confirmation',
                       'publishing', 'published', 'expired', 'cancelled'
                     )),
  category           text not null default 'tui-xach',
  raw_text           text,
  name               text,
  brand              text,
  brand_raw          text,
  condition          text check (condition in ('new', 'used')),
  price              bigint,
  price_raw          text,
  parse_warnings     jsonb not null default '[]'::jsonb,
  slug               text unique,
  from_user_id       text,
  from_display_name  text,
  first_event_at     timestamptz not null default now(),
  last_event_at      timestamptz not null default now(),
  nudged_at          timestamptz,
  confirmed_at       timestamptz,
  published_at       timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create unique index if not exists one_collecting_per_chat
  on bag_submissions (chat_id) where status = 'collecting';

create unique index if not exists one_awaiting_per_chat
  on bag_submissions (chat_id) where status = 'awaiting_confirmation';

create index if not exists bag_submissions_chat_id_idx on bag_submissions (chat_id);
create index if not exists bag_submissions_status_idx on bag_submissions (status);

-- ============================================================
-- bag_submission_photos: one row per photo, arrives incrementally
-- ============================================================
create table if not exists bag_submission_photos (
  id               uuid primary key default gen_random_uuid(),
  submission_id    uuid not null references bag_submissions(id) on delete cascade,
  photo_url        text not null,
  storage_path     text,
  position         int not null,
  zalo_message_id  text not null,
  received_at      timestamptz not null default now(),
  unique (submission_id, zalo_message_id)
);

create index if not exists bag_submission_photos_submission_id_idx
  on bag_submission_photos (submission_id);

-- ============================================================
-- processed_zalo_events: idempotency guard for webhook retries
-- ============================================================
create table if not exists processed_zalo_events (
  message_id    text primary key,
  event_name    text not null,
  processed_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security: public site can only ever read published rows.
-- All writes go through the service_role key from the webhook route,
-- which bypasses RLS entirely -- these policies only govern the anon key.
-- ============================================================
alter table bag_submissions enable row level security;
alter table bag_submission_photos enable row level security;
alter table processed_zalo_events enable row level security;

drop policy if exists "public read published bags" on bag_submissions;
create policy "public read published bags"
  on bag_submissions for select
  to anon
  using (status = 'published');

drop policy if exists "public read photos of published bags" on bag_submission_photos;
create policy "public read photos of published bags"
  on bag_submission_photos for select
  to anon
  using (
    exists (
      select 1 from bag_submissions s
      where s.id = bag_submission_photos.submission_id
      and s.status = 'published'
    )
  );

-- processed_zalo_events has no public policies at all -> anon gets zero access, by default-deny.

-- ============================================================
-- Storage: public bucket for re-hosted product photos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('bag-photos', 'bag-photos', true)
on conflict (id) do nothing;

drop policy if exists "public read bag photos" on storage.objects;
create policy "public read bag photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'bag-photos');
