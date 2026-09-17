-- Adds item-type detection (quần/áo/giày/dép/nước hoa/...) alongside brand.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.

alter table bag_submissions
  add column if not exists item_category text,
  add column if not exists item_category_raw text;
