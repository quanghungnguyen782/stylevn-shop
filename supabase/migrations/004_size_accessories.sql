-- Adds two optional free-text fields sellers can supply via the "Size:" and
-- "Phụ kiện kèm theo:" labeled lines. Unlike brand/category, these have no
-- fixed keyword list (values are too varied), so they're stored as-is.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.

alter table bag_submissions
  add column if not exists size text,
  add column if not exists accessories text;
