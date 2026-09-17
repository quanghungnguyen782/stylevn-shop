import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { parseBagPost } from "@/lib/bag-post-parser";
import { sendZaloMessage } from "@/lib/zalo-bot";
import { removeDiacritics } from "@/lib/text-utils";
import { formatPrice } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";
import type { BagSubmissionRow } from "@/types/bag-submission";
import type { ZaloFrom, ZaloImageMessage, ZaloTextMessage } from "@/types/zalo-webhook";

const COLLECTING_WINDOW_MS = 30_000;
const CONFIRMATION_EXPIRY_MS = 48 * 60 * 60 * 1000;
const OK_PATTERN = /^(ok|oke|okay)[.!\s]*$/i;

function slugify(str: string): string {
  return removeDiacritics(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============================================================
// Image events
// ============================================================

export async function handleImageEvent(message: ZaloImageMessage): Promise<void> {
  const supabase = getSupabaseAdmin();
  const chatId = message.chat.id;

  const submission = await getOrCreateCollecting(chatId, message.from);

  const { data: lastPhoto } = await supabase
    .from("bag_submission_photos")
    .select("position")
    .eq("submission_id", submission.id)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = lastPhoto ? lastPhoto.position + 1 : 0;

  await supabase.from("bag_submission_photos").upsert(
    {
      submission_id: submission.id,
      photo_url: message.photo_url,
      position,
      zalo_message_id: message.message_id,
    },
    { onConflict: "submission_id,zalo_message_id", ignoreDuplicates: true }
  );

  await supabase
    .from("bag_submissions")
    .update({ last_event_at: new Date().toISOString() })
    .eq("id", submission.id);
}

async function getOrCreateCollecting(chatId: string, from: ZaloFrom): Promise<BagSubmissionRow> {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "collecting")
    .maybeSingle();

  if (existing) {
    const age = Date.now() - new Date(existing.last_event_at).getTime();
    if (age <= COLLECTING_WINDOW_MS) return existing;
    // Stale — never got a caption. Retire it so a fresh submission can start
    // (the partial unique index only allows one 'collecting' row per chat).
    await supabase.from("bag_submissions").update({ status: "expired" }).eq("id", existing.id);
  }

  return insertCollecting(chatId, from);
}

async function insertCollecting(
  chatId: string,
  from: ZaloFrom | undefined,
  rawText: string | null = null
): Promise<BagSubmissionRow> {
  const supabase = getSupabaseAdmin();

  const { data: created, error } = await supabase
    .from("bag_submissions")
    .insert({
      chat_id: chatId,
      status: "collecting",
      from_user_id: from?.id ?? null,
      from_display_name: from?.display_name ?? null,
      raw_text: rawText,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // Race: another request created the collecting row first — reuse it.
      const { data: raced } = await supabase
        .from("bag_submissions")
        .select("*")
        .eq("chat_id", chatId)
        .eq("status", "collecting")
        .single();
      if (raced) return raced;
    }
    throw error;
  }

  return created;
}

// ============================================================
// Text events
// ============================================================

export async function handleTextEvent(message: ZaloTextMessage): Promise<void> {
  const supabase = getSupabaseAdmin();
  const chatId = message.chat.id;
  const text = message.text;

  const { data: awaiting } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "awaiting_confirmation")
    .maybeSingle();

  if (awaiting) {
    if (OK_PATTERN.test(text.trim())) {
      await publishSubmission(awaiting);
    } else {
      await applyCorrection(awaiting, text);
    }
    return;
  }

  const { data: collecting } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "collecting")
    .maybeSingle();

  if (collecting && !collecting.raw_text) {
    await supabase
      .from("bag_submissions")
      .update({ raw_text: text, last_event_at: new Date().toISOString() })
      .eq("id", collecting.id);
    const { data: refreshed } = await supabase
      .from("bag_submissions")
      .select("*")
      .eq("id", collecting.id)
      .single();
    if (refreshed) await finalizeSubmission(refreshed);
    return;
  }

  if (collecting && collecting.raw_text) {
    // A second caption for a chat already mid-collecting — finalize what's
    // there and start a fresh submission for this new text.
    await finalizeSubmission(collecting);
    const created = await insertCollecting(chatId, message.from, text);
    await finalizeSubmission(created);
    return;
  }

  const created = await insertCollecting(chatId, message.from, text);
  await finalizeSubmission(created);
}

async function finalizeSubmission(submission: BagSubmissionRow): Promise<void> {
  const supabase = getSupabaseAdmin();
  const parsed = parseBagPost(submission.raw_text ?? "");

  const { data: existingAwaiting } = await supabase
    .from("bag_submissions")
    .select("id")
    .eq("chat_id", submission.chat_id)
    .eq("status", "awaiting_confirmation")
    .maybeSingle();

  const nextStatus = existingAwaiting ? "queued_confirmation" : "awaiting_confirmation";

  const { data: updated } = await supabase
    .from("bag_submissions")
    .update({
      name: parsed.name,
      brand: parsed.brand,
      brand_raw: parsed.brandRaw,
      condition: parsed.condition,
      price: parsed.price,
      price_raw: parsed.priceRaw,
      parse_warnings: parsed.warnings,
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", submission.id)
    .select()
    .single();

  if (nextStatus === "awaiting_confirmation" && updated) {
    await sendConfirmationMessage(updated);
  }
}

async function applyCorrection(submission: BagSubmissionRow, text: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const parsed = parseBagPost(text);

  const { data: updated } = await supabase
    .from("bag_submissions")
    .update({
      raw_text: text,
      name: parsed.name,
      brand: parsed.brand,
      brand_raw: parsed.brandRaw,
      condition: parsed.condition,
      price: parsed.price,
      price_raw: parsed.priceRaw,
      parse_warnings: parsed.warnings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", submission.id)
    .select()
    .single();

  if (updated) await sendConfirmationMessage(updated);
}

async function sendConfirmationMessage(submission: BagSubmissionRow): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from("bag_submission_photos")
    .select("id", { count: "exact", head: true })
    .eq("submission_id", submission.id);

  const lines = [
    "📦 Đã nhận tin đăng mới:",
    "",
    `Tên: ${submission.name ?? "-"}`,
    `Thương hiệu: ${submission.brand_raw ?? "⚠️ Chưa xác định"}`,
    `Tình trạng: ${submission.condition === "used" ? "Đã qua sử dụng (pass)" : "Mới"}`,
    `Giá: ${submission.price ? formatPrice(submission.price) : "⚠️ Không nhận diện được"}`,
    `Số ảnh: ${count ?? 0}`,
  ];

  if (submission.parse_warnings.length > 0) {
    lines.push("", `⚠️ ${submission.parse_warnings.join("; ")}`);
  }

  lines.push("", `Trả lời "OK" để đăng lên website, hoặc nhắn lại nội dung đúng để mình cập nhật.`);

  await sendZaloMessage(submission.chat_id, lines.join("\n"));
}

// ============================================================
// Publish flow
// ============================================================

async function publishSubmission(submission: BagSubmissionRow): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { data: claimed } = await supabase
    .from("bag_submissions")
    .update({ status: "publishing", updated_at: new Date().toISOString() })
    .eq("id", submission.id)
    .eq("status", "awaiting_confirmation")
    .select()
    .maybeSingle();

  if (!claimed) return; // already claimed/handled by a concurrent request

  const awaitingSince = new Date(submission.updated_at).getTime();
  if (Date.now() - awaitingSince > CONFIRMATION_EXPIRY_MS) {
    await supabase.from("bag_submissions").update({ status: "expired" }).eq("id", claimed.id);
    await sendZaloMessage(
      claimed.chat_id,
      "Tin đăng này đã hết hạn xác nhận (quá 48 giờ), vui lòng gửi lại ảnh + mô tả để đăng lại."
    );
    await promoteQueuedIfAny(claimed.chat_id);
    return;
  }

  const { data: photos } = await supabase
    .from("bag_submission_photos")
    .select("*")
    .eq("submission_id", claimed.id)
    .order("position");

  let uploadedCount = 0;
  for (const photo of photos ?? []) {
    if (photo.storage_path) {
      uploadedCount++;
      continue;
    }
    try {
      const res = await fetch(photo.photo_url);
      if (!res.ok) continue;
      const buffer = Buffer.from(await res.arrayBuffer());
      const extMatch = photo.photo_url.split("?")[0].match(/\.(\w{2,5})$/);
      const ext = (extMatch?.[1] ?? "jpg").toLowerCase();
      const path = `${claimed.id}/${photo.position}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("bag-photos").upload(path, buffer, {
        contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
        upsert: true,
      });

      if (!uploadError) {
        await supabase.from("bag_submission_photos").update({ storage_path: path }).eq("id", photo.id);
        uploadedCount++;
      }
    } catch (err) {
      console.error("bag photo upload failed", photo.photo_url, err);
    }
  }

  if (uploadedCount === 0) {
    await supabase.from("bag_submissions").update({ status: "awaiting_confirmation" }).eq("id", claimed.id);
    await sendZaloMessage(claimed.chat_id, "⚠️ Không tải được ảnh, vui lòng gửi lại ảnh sản phẩm.");
    return;
  }

  const baseSlug = slugify(claimed.name || "tui-xach") || "tui-xach";
  const slug = `${baseSlug}-${claimed.id.slice(0, 8)}`;
  const now = new Date().toISOString();

  await supabase
    .from("bag_submissions")
    .update({ status: "published", slug, confirmed_at: now, published_at: now })
    .eq("id", claimed.id);

  await sendZaloMessage(claimed.chat_id, `✅ Đã đăng thành công! Xem tại: ${SITE_URL}/tui-xach/${slug}`);

  await promoteQueuedIfAny(claimed.chat_id);
}

async function promoteQueuedIfAny(chatId: string): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { data: next } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "queued_confirmation")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!next) return;

  const { data: promoted } = await supabase
    .from("bag_submissions")
    .update({ status: "awaiting_confirmation", updated_at: new Date().toISOString() })
    .eq("id", next.id)
    .select()
    .single();

  if (promoted) await sendConfirmationMessage(promoted);
}
