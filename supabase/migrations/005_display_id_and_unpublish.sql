-- Short, human-typeable IDs for published listings, assigned in PUBLISH
-- order (not row-creation order) so test/draft noise doesn't skew the
-- numbers sellers actually see and reference in Zalo commands like
-- "Xoá #3" or "Mã: 3 / Sửa giá: 25tr".
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create sequence if not exists bag_display_id_seq;

alter table bag_submissions add column if not exists display_id integer;

create or replace function next_bag_display_id()
returns integer
language sql
as $$
  select nextval('bag_display_id_seq')::integer;
$$;

-- Backfill already-published rows in publish order.
with ordered as (
  select id, row_number() over (order by published_at) as rn
  from bag_submissions
  where status = 'published' and display_id is null
)
update bag_submissions b set display_id = ordered.rn
from ordered where b.id = ordered.id;

select setval('bag_display_id_seq', coalesce((select max(display_id) from bag_submissions), 0));

create unique index if not exists bag_submissions_display_id_idx
  on bag_submissions (display_id) where display_id is not null;

-- Allow an explicit "unpublished" status (seller pulled the listing via a
-- Zalo "Xoá" command) distinct from "cancelled" (a draft that never made
-- it to publish).
alter table bag_submissions drop constraint if exists bag_submissions_status_check;
alter table bag_submissions add constraint bag_submissions_status_check
  check (status in (
    'collecting', 'awaiting_confirmation', 'queued_confirmation',
    'publishing', 'published', 'expired', 'cancelled', 'unpublished'
  ));
