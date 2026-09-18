-- Post-publish "Sửa"/"Xoá" commands used to apply immediately with no way
-- to catch a mistake before it went live. This table holds one pending
-- edit/delete per chat awaiting an explicit "OK" (or "Huỷ" to cancel) —
-- same confirm-before-commit shape as the original post-a-new-listing flow.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create table if not exists pending_bag_edits (
  id             uuid primary key default gen_random_uuid(),
  chat_id        text not null,
  submission_id  uuid not null references bag_submissions(id) on delete cascade,
  action         text not null check (action in ('edit', 'delete')),
  patch          jsonb not null default '{}'::jsonb,
  change_lines   jsonb not null default '[]'::jsonb,
  warnings       jsonb not null default '[]'::jsonb,
  created_at     timestamptz not null default now()
);

create unique index if not exists one_pending_bag_edit_per_chat
  on pending_bag_edits (chat_id);

alter table pending_bag_edits enable row level security;
-- No public policies -> anon gets zero access, by default-deny. Service role
-- (used exclusively by the webhook route) bypasses RLS as usual.
