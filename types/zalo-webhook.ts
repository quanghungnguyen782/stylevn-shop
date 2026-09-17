/** Shapes confirmed live against real webhook deliveries — see supabase/schema.sql header comment for context. */

export interface ZaloChat {
  chat_type: string;
  id: string;
}

export interface ZaloFrom {
  id: string;
  is_bot: boolean;
  display_name: string;
}

export interface ZaloImageMessage {
  date: number;
  chat: ZaloChat;
  caption: string;
  message_id: string;
  message_type: string;
  from: ZaloFrom;
  photo_url: string;
}

export interface ZaloTextMessage {
  date: number;
  chat: ZaloChat;
  message_id: string;
  from: ZaloFrom;
  text: string;
}

/** Loose shape for the initial parse — narrowed to the specific message
 * types above via an explicit cast at the point each event_name is
 * dispatched (the payload is untrusted webhook input either way). */
export interface ZaloWebhookEvent {
  event_name: string;
  message: Record<string, unknown> & { message_id?: string };
}
