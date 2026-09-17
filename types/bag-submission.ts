export type BagSubmissionStatus =
  | "collecting"
  | "awaiting_confirmation"
  | "queued_confirmation"
  | "publishing"
  | "published"
  | "expired"
  | "cancelled";

export interface BagSubmissionRow {
  id: string;
  chat_id: string;
  status: BagSubmissionStatus;
  category: string;
  raw_text: string | null;
  name: string | null;
  brand: string | null;
  brand_raw: string | null;
  item_category: string | null;
  item_category_raw: string | null;
  condition: "new" | "used" | null;
  price: number | null;
  price_raw: string | null;
  size: string | null;
  accessories: string | null;
  parse_warnings: string[];
  slug: string | null;
  from_user_id: string | null;
  from_display_name: string | null;
  first_event_at: string;
  last_event_at: string;
  nudged_at: string | null;
  confirmed_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BagSubmissionPhotoRow {
  id: string;
  submission_id: string;
  photo_url: string;
  storage_path: string | null;
  position: number;
  zalo_message_id: string;
  received_at: string;
}
