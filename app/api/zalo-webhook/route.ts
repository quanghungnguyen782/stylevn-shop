import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { handleImageEvent, handleTextEvent, nudgeStaleCollectingSubmissions } from "@/lib/bag-submission-service";
import type { ZaloImageMessage, ZaloTextMessage, ZaloWebhookEvent } from "@/types/zalo-webhook";

export async function POST(req: NextRequest) {
  const secretHeader = req.headers.get("x-bot-api-secret-token");
  if (secretHeader !== process.env.ZALO_WEBHOOK_SECRET_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let event: ZaloWebhookEvent;
  try {
    event = await req.json();
  } catch {
    return NextResponse.json({ ok: true }); // malformed body — ack so Zalo doesn't retry forever
  }

  const messageId = event.message?.message_id;
  if (messageId) {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("processed_zalo_events")
      .insert({ message_id: messageId, event_name: event.event_name });
    if (error) {
      // Unique violation -> we've already processed this exact message (webhook retry). Ack and stop.
      return NextResponse.json({ ok: true });
    }
  }

  try {
    switch (event.event_name) {
      case "message.image.received":
        await handleImageEvent(event.message as unknown as ZaloImageMessage);
        break;
      case "message.text.received":
        await handleTextEvent(event.message as unknown as ZaloTextMessage);
        break;
      default:
        break; // webhook.test and any other event types are acknowledged with no action.
    }
  } catch (err) {
    console.error("zalo-webhook handler error", event.event_name, err);
  }

  try {
    await nudgeStaleCollectingSubmissions();
  } catch (err) {
    console.error("nudgeStaleCollectingSubmissions failed", err);
  }

  return NextResponse.json({ ok: true });
}
