-- Captures exceptions thrown while handling a Zalo webhook event, since
-- Render's free-tier logs API does not surface runtime console output (only
-- build/deploy logs) — this is the only way to see what actually broke.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create table if not exists webhook_errors (
  id             uuid primary key default gen_random_uuid(),
  event_name     text,
  error_message  text,
  error_stack    text,
  payload        jsonb,
  created_at     timestamptz not null default now()
);

alter table webhook_errors enable row level security;
-- No public policies -> anon gets zero access, by default-deny. Service role
-- (used exclusively by the webhook route) bypasses RLS as usual.
