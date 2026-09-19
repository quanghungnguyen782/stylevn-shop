import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  ITEM_CATEGORIES,
  isHelpCommand,
  isListCommand,
  parseBagPost,
  parseDeleteCommand,
  parseEditCommands,
  parseEditTargetId,
  parseSingleBrand,
  parseSingleCategory,
  parseSingleCondition,
  parseSinglePrice,
} from "@/lib/bag-post-parser";
import type { FieldEdit } from "@/lib/bag-post-parser";
import { getAiFieldSuggestions } from "@/lib/ai-extract";
import { sendZaloMessage } from "@/lib/zalo-bot";
import { removeDiacritics } from "@/lib/text-utils";
import { formatPrice } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";
import type { BagSubmissionRow } from "@/types/bag-submission";
import type { ZaloFrom, ZaloImageMessage, ZaloTextMessage } from "@/types/zalo-webhook";

const COLLECTING_WINDOW_MS = 30_000;
// A single real album upload has been observed to spread its photos over up
// to ~25-30s — but without this second cap, a "collecting" row's window
// keeps rolling forward on every new photo (via last_event_at), so it can
// stay open indefinitely as long as *something* arrives every <30s. That
// let two genuinely different products get merged into one listing when a
// seller moved on to photographing a new item shortly after leaving the
// first one uncaptioned. Capping total time since the FIRST photo bounds
// this — comfortably above any real single upload, but well short of "the
// seller has clearly moved on to something else."
const MAX_COLLECTING_SPAN_MS = 90_000;
// Zalo can deliver a multi-photo album out of order, with a few images
// trailing well behind the caption (observed ~25s in practice) — if a photo
// arrives after its submission already finalized, attach it there instead
// of starting an orphan submission, as long as it's still fresh enough that
// the client hasn't replied "OK" yet.
const LATE_ATTACH_WINDOW_MS = 5 * 60 * 1000;
const NUDGE_THRESHOLD_MS = 60_000;
const CONFIRMATION_EXPIRY_MS = 48 * 60 * 60 * 1000;
const OK_PATTERN = /^(ok|oke|okay)[.!\s]*$/i;
const CANCEL_PATTERN = /^(huy|bo qua|cancel)[.!\s]*$/i;

interface PendingBagEdit {
  id: string;
  chat_id: string;
  submission_id: string;
  action: "edit" | "delete";
  patch: Record<string, unknown>;
  change_lines: string[];
  warnings: string[];
  created_at: string;
}

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

  const submission = await findTargetForPhoto(chatId, message.from);

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

  if (submission.status === "awaiting_confirmation") {
    // Late-arriving photo attached to an already-finalized submission. Zalo
    // Bot Platform has no message-edit API, so re-sending the FULL
    // confirmation here (as this used to do) reads as a second, duplicate
    // "new post" announcement — confusing when several photos trickle in
    // after the caption. A short incremental notice avoids that.
    const { count } = await supabase
      .from("bag_submission_photos")
      .select("id", { count: "exact", head: true })
      .eq("submission_id", submission.id);
    await sendZaloMessage(
      chatId,
      `📷 Đã nhận thêm ảnh (hiện có ${count ?? 0} ảnh). Trả lời "OK" khi bạn đã gửi đủ ảnh để đăng lên website.`
    );
  }
}

async function findTargetForPhoto(chatId: string, from: ZaloFrom): Promise<BagSubmissionRow> {
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "collecting")
    .maybeSingle();

  if (existing) {
    const idleMs = Date.now() - new Date(existing.last_event_at).getTime();
    const totalSpanMs = Date.now() - new Date(existing.first_event_at).getTime();
    if (idleMs <= COLLECTING_WINDOW_MS && totalSpanMs <= MAX_COLLECTING_SPAN_MS) {
      return existing;
    }
    // Stale (idle too long) or open too long overall (likely a different
    // item started since, never captioned) — retire it so a fresh
    // submission can start (the partial unique index only allows one
    // 'collecting' row per chat).
    await supabase.from("bag_submissions").update({ status: "expired" }).eq("id", existing.id);
  }

  // No active 'collecting' row for this chat — check whether this is a
  // trailing photo for a submission that was *just* finalized rather than
  // the start of a brand new post.
  const { data: recentAwaiting } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "awaiting_confirmation")
    .maybeSingle();

  if (recentAwaiting) {
    const age = Date.now() - new Date(recentAwaiting.updated_at).getTime();
    if (age <= LATE_ATTACH_WINDOW_MS) return recentAwaiting;
  }

  return insertCollecting(chatId, from);
}

/**
 * Best-effort sweep for 'collecting' submissions that received photos but
 * never got a caption — without this, they'd sit invisible forever. Cheap
 * enough to run opportunistically on every webhook invocation (bounded,
 * indexed on status).
 */
export async function nudgeStaleCollectingSubmissions(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const cutoff = new Date(Date.now() - NUDGE_THRESHOLD_MS).toISOString();

  const { data: stale } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("status", "collecting")
    .is("raw_text", null)
    .is("nudged_at", null)
    .lt("last_event_at", cutoff)
    .limit(10);

  for (const submission of stale ?? []) {
    const { count } = await supabase
      .from("bag_submission_photos")
      .select("id", { count: "exact", head: true })
      .eq("submission_id", submission.id);

    if (!count) continue; // nothing collected at all yet — nothing to nudge about

    await supabase
      .from("bag_submissions")
      .update({ nudged_at: new Date().toISOString() })
      .eq("id", submission.id);

    await sendZaloMessage(
      submission.chat_id,
      `Mình đã nhận được ${count} ảnh nhưng chưa thấy mô tả (tên/giá/thương hiệu). Gửi giúp mình dòng mô tả để hoàn tất tin đăng nhé! (Nếu đây không phải sản phẩm bạn định đăng, nhắn "Huỷ" để bỏ nhóm ảnh này.)`
    );
  }
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

  if (isHelpCommand(text)) {
    await sendHelpMessage(chatId);
    return;
  }

  const { data: pendingEdit } = await supabase
    .from("pending_bag_edits")
    .select("*")
    .eq("chat_id", chatId)
    .maybeSingle();

  if (pendingEdit) {
    if (OK_PATTERN.test(text.trim())) {
      await commitPendingEdit(pendingEdit);
      return;
    }
    if (CANCEL_PATTERN.test(removeDiacritics(text.trim()))) {
      await supabase.from("pending_bag_edits").delete().eq("id", pendingEdit.id);
      await sendZaloMessage(chatId, "Đã huỷ, chưa có gì thay đổi.");
      return;
    }
    // Let a fresh command replace the pending one instead of forcing OK/Huỷ first.
    if (isListCommand(text)) {
      await supabase.from("pending_bag_edits").delete().eq("id", pendingEdit.id);
      await handleListCommand(chatId);
      return;
    }
    const freshDelete = parseDeleteCommand(text);
    if (freshDelete) {
      await prepareDeleteConfirmation(chatId, freshDelete.id);
      return;
    }
    const freshEdits = parseEditCommands(text);
    if (freshEdits.length > 0) {
      await prepareEditConfirmation(chatId, freshEdits, parseEditTargetId(text));
      return;
    }
    await sendZaloMessage(
      chatId,
      `Bạn đang có 1 thay đổi chưa xác nhận. Trả lời "OK" để áp dụng, hoặc "Huỷ" để bỏ qua.`
    );
    return;
  }

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
    if (CANCEL_PATTERN.test(removeDiacritics(text.trim()))) {
      const { count } = await supabase
        .from("bag_submission_photos")
        .select("id", { count: "exact", head: true })
        .eq("submission_id", collecting.id);
      await supabase.from("bag_submissions").update({ status: "cancelled" }).eq("id", collecting.id);
      await sendZaloMessage(
        chatId,
        `Đã huỷ nhóm ${count ?? 0} ảnh chưa có mô tả. Gửi ảnh sản phẩm mới bất cứ lúc nào nhé!`
      );
      return;
    }

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

  if (isListCommand(text)) {
    await handleListCommand(chatId);
    return;
  }

  const deleteCommand = parseDeleteCommand(text);
  if (deleteCommand) {
    await prepareDeleteConfirmation(chatId, deleteCommand.id);
    return;
  }

  const edits = parseEditCommands(text);
  if (edits.length > 0) {
    await prepareEditConfirmation(chatId, edits, parseEditTargetId(text));
    return;
  }

  const created = await insertCollecting(chatId, message.from, text);
  await finalizeSubmission(created);
}

/**
 * Runs the deterministic parser, then — only for whatever it couldn't
 * determine (category/brand/price still null) — asks the AI to look at the
 * submission's own photos and fill the gap. This is what makes "loại hàng"
 * detectable from a photo alone when the caption never states it in words.
 * Never overrides a field the deterministic parser already resolved.
 */
async function resolveParsedFields(rawText: string, submissionId: string) {
  const parsed = parseBagPost(rawText);

  const needsHelp = !parsed.category || !parsed.brand || parsed.price == null;
  if (!needsHelp) return parsed;

  const supabase = getSupabaseAdmin();
  const { data: photos } = await supabase
    .from("bag_submission_photos")
    .select("photo_url")
    .eq("submission_id", submissionId)
    .order("position");

  const photoUrls = (photos ?? []).map((p) => p.photo_url);
  if (photoUrls.length === 0) return parsed;

  const ai = await getAiFieldSuggestions(photoUrls, rawText);
  if (!ai) return parsed;

  const result = { ...parsed };
  const aiFilled: string[] = [];
  const supersededWarnings = new Set<string>();

  if (!result.category && ai.category) {
    const category = ITEM_CATEGORIES.find((c) => c.slug === ai.category);
    if (category) {
      result.category = category.slug;
      result.categoryName = category.name;
      result.categoryRaw = category.name;
      aiFilled.push("Loại hàng");
      supersededWarnings.add("Không nhận diện được loại hàng");
    }
  }
  if (!result.brand && ai.brand) {
    const r = parseSingleBrand(ai.brand);
    result.brand = r.slug;
    result.brandName = r.name;
    result.brandRaw = r.raw;
    aiFilled.push("Thương hiệu");
    supersededWarnings.add("Không nhận diện được thương hiệu");
  }
  if (result.price == null && ai.price) {
    result.price = ai.price;
    result.priceRaw = String(ai.price);
    aiFilled.push("Giá");
    supersededWarnings.add("Không tìm thấy giá");
  }
  if (!result.name && ai.name) {
    result.name = ai.name;
    aiFilled.push("Tên");
    supersededWarnings.add("Không xác định được tên sản phẩm");
  }
  if (!result.size && ai.size) result.size = ai.size;
  if (!result.accessories && ai.accessories) result.accessories = ai.accessories;

  if (aiFilled.length > 0) {
    result.warnings = [
      ...result.warnings.filter((w) => !supersededWarnings.has(w)),
      `🤖 AI tự nhận diện từ ảnh: ${aiFilled.join(", ")} — vui lòng kiểm tra lại trước khi xác nhận.`,
    ];
  }

  return result;
}

async function finalizeSubmission(submission: BagSubmissionRow): Promise<void> {
  const supabase = getSupabaseAdmin();
  const parsed = await resolveParsedFields(submission.raw_text ?? "", submission.id);

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
      item_category: parsed.category,
      item_category_raw: parsed.categoryRaw,
      condition: parsed.condition,
      price: parsed.price,
      price_raw: parsed.priceRaw,
      size: parsed.size,
      accessories: parsed.accessories,
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

  // A "Sửa tên: ..." style correction targets just that one field — applying
  // it as a full parseBagPost() re-parse (the fallback below) would discard
  // every other already-confirmed field, since parseBagPost only ever sees
  // the new text in isolation.
  const edits = parseEditCommands(text);
  if (edits.length > 0) {
    const { patch, warnings } = buildFieldPatch(edits);
    patch.parse_warnings = warnings;
    patch.updated_at = new Date().toISOString();

    const { data: updated } = await supabase
      .from("bag_submissions")
      .update(patch)
      .eq("id", submission.id)
      .select()
      .single();

    if (updated) await sendConfirmationMessage(updated);
    return;
  }

  const parsed = await resolveParsedFields(text, submission.id);

  const { data: updated } = await supabase
    .from("bag_submissions")
    .update({
      raw_text: text,
      name: parsed.name,
      brand: parsed.brand,
      brand_raw: parsed.brandRaw,
      item_category: parsed.category,
      item_category_raw: parsed.categoryRaw,
      condition: parsed.condition,
      price: parsed.price,
      price_raw: parsed.priceRaw,
      size: parsed.size,
      accessories: parsed.accessories,
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
    `Loại hàng: ${submission.item_category_raw ?? "⚠️ Chưa xác định"}`,
    `Thương hiệu: ${submission.brand_raw ?? "⚠️ Chưa xác định"}`,
    `Tình trạng: ${submission.condition === "used" ? "Đã qua sử dụng (pass)" : "Mới"}`,
    `Giá: ${submission.price ? formatPrice(submission.price) : "⚠️ Không nhận diện được"}`,
  ];

  if (submission.size) lines.push(`Size: ${submission.size}`);
  if (submission.accessories) lines.push(`Phụ kiện kèm theo: ${submission.accessories}`);

  lines.push(`Số ảnh: ${count ?? 0}`);

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

  const baseSlug = slugify(claimed.name || "hang-hieu") || "hang-hieu";
  const slug = `${baseSlug}-${claimed.id.slice(0, 8)}`;
  const now = new Date().toISOString();

  const { data: displayId } = await supabase.rpc("next_bag_display_id");

  await supabase
    .from("bag_submissions")
    .update({ status: "published", slug, display_id: displayId, confirmed_at: now, published_at: now })
    .eq("id", claimed.id);

  await sendZaloMessage(
    claimed.chat_id,
    `✅ Đã đăng thành công! Mã sản phẩm: #${displayId}\nXem tại: ${SITE_URL}/hang-hieu/${slug}`
  );

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

// ============================================================
// Post-publish corrections ("Sửa giá: ...", "Đổi tên: ...", "Xoá #3")
// ============================================================

/** "/help" — usable at any point in the flow, including mid-correction. */
async function sendHelpMessage(chatId: string): Promise<void> {
  const lines = [
    "📖 Hướng dẫn nhanh:",
    "",
    "Đăng bài mới: gửi ảnh sản phẩm, sau đó gửi mô tả (Tên/Loại/Hãng/Tình trạng/Giá — mỗi dòng có nhãn). Trả lời \"OK\" để đăng lên web.",
    "",
    "Sửa 1 trường (trước hoặc sau khi đăng): \"Sửa tên: ...\", \"Sửa giá: ...\", \"Sửa tình trạng: ...\" — có hay không dấu \":\" đều được.",
    "",
    "Sửa sản phẩm cũ: thêm dòng \"Mã: <số>\" trước dòng Sửa.",
    "",
    "Sửa/Xoá sau khi đã đăng lên web sẽ hỏi lại để xác nhận — trả lời \"OK\" mới thật sự áp dụng, \"Huỷ\" để bỏ qua.",
    "",
    "\"Danh sách\" — xem mã + tên + giá mọi sản phẩm đang đăng.",
    "\"Xoá\" hoặc \"Xoá <mã>\" — gỡ sản phẩm khỏi web.",
    "\"Huỷ\" — bỏ nhóm ảnh chưa có mô tả, hoặc bỏ 1 thay đổi đang chờ xác nhận.",
  ];
  await sendZaloMessage(chatId, lines.join("\n"));
}

/**
 * "Danh sách" — every published listing's Mã/name/price for this chat, so a
 * seller can look up an ID without scrolling back through chat history.
 */
async function handleListCommand(chatId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("bag_submissions")
    .select("display_id, name, price")
    .eq("chat_id", chatId)
    .eq("status", "published")
    .order("display_id", { ascending: true })
    .limit(30);

  if (!data || data.length === 0) {
    await sendZaloMessage(chatId, "Bạn chưa có sản phẩm nào đang hiển thị trên web.");
    return;
  }

  const lines = ["📋 Danh sách sản phẩm đang bán:", ""];
  for (const item of data) {
    lines.push(`#${item.display_id} - ${item.name ?? "-"} - ${item.price ? formatPrice(item.price) : "Liên hệ"}`);
  }
  lines.push("", `Nhắn "Mã: <số>" kèm dòng "Sửa ..." để chỉnh sửa, hoặc "Xoá <số>" để gỡ khỏi web.`);

  await sendZaloMessage(chatId, lines.join("\n"));
}

/**
 * Finds the listing a post-publish command should apply to: a specific
 * "Mã"/display_id if the seller gave one, otherwise the most recently
 * published listing in this chat.
 */
async function findPublishedTarget(chatId: string, targetId: number | null): Promise<BagSubmissionRow | null> {
  const supabase = getSupabaseAdmin();

  if (targetId != null) {
    const { data } = await supabase
      .from("bag_submissions")
      .select("*")
      .eq("chat_id", chatId)
      .eq("status", "published")
      .eq("display_id", targetId)
      .maybeSingle();
    return data ?? null;
  }

  const { data } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("chat_id", chatId)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

async function prepareDeleteConfirmation(chatId: string, targetId: number | null): Promise<void> {
  const supabase = getSupabaseAdmin();
  const target = await findPublishedTarget(chatId, targetId);

  if (!target) {
    await sendZaloMessage(
      chatId,
      targetId != null
        ? `Không tìm thấy sản phẩm có mã #${targetId} đang hiển thị trên web. Nhắn "Danh sách" để xem các mã hiện có.`
        : "Bạn chưa có sản phẩm nào đang hiển thị trên web để gỡ."
    );
    return;
  }

  await supabase.from("pending_bag_edits").delete().eq("chat_id", chatId);
  await supabase.from("pending_bag_edits").insert({
    chat_id: chatId,
    submission_id: target.id,
    action: "delete",
    patch: {},
    change_lines: [],
    warnings: [],
  });

  await sendZaloMessage(
    chatId,
    `🗑️ Xác nhận GỠ tin đăng #${target.display_id} — ${target.name ?? "-"} khỏi website?\n\nTrả lời "OK" để xác nhận, hoặc "Huỷ" để bỏ qua.`
  );
}

/**
 * Turns "Sửa <field>: <value>" commands into a DB patch + human-readable
 * change summary — shared by post-publish edits (applyEditCommands) and
 * pre-publish corrections (applyCorrection), so both understand the same
 * syntax instead of pre-publish corrections only supporting "retype the
 * whole caption".
 */
function buildFieldPatch(edits: FieldEdit[]): {
  patch: Record<string, unknown>;
  changeLines: string[];
  warnings: string[];
} {
  const patch: Record<string, unknown> = {};
  const changeLines: string[] = [];
  const warnings: string[] = [];

  for (const edit of edits) {
    switch (edit.field) {
      case "name":
        patch.name = edit.raw;
        changeLines.push(`Tên → ${edit.raw}`);
        break;
      case "brand": {
        const r = parseSingleBrand(edit.raw);
        if (r.warning || !r.slug) {
          warnings.push(r.warning ?? "Không nhận diện được thương hiệu");
          break;
        }
        patch.brand = r.slug;
        patch.brand_raw = r.raw;
        changeLines.push(`Thương hiệu → ${r.name}`);
        break;
      }
      case "category": {
        const r = parseSingleCategory(edit.raw);
        if (r.warning || !r.slug) {
          warnings.push(r.warning ?? "Không nhận diện được loại hàng");
          break;
        }
        patch.item_category = r.slug;
        patch.item_category_raw = r.raw;
        changeLines.push(`Loại hàng → ${r.name}`);
        break;
      }
      case "condition": {
        const condition = parseSingleCondition(edit.raw);
        patch.condition = condition;
        changeLines.push(`Tình trạng → ${condition === "used" ? "Đã qua sử dụng (pass)" : "Mới"}`);
        break;
      }
      case "price": {
        const r = parseSinglePrice(edit.raw);
        if (r.warning || r.price == null) {
          warnings.push(r.warning ?? "Không nhận diện được giá");
          break;
        }
        patch.price = r.price;
        patch.price_raw = r.raw;
        changeLines.push(`Giá → ${formatPrice(r.price)}`);
        break;
      }
      case "size":
        patch.size = edit.raw;
        changeLines.push(`Size → ${edit.raw}`);
        break;
      case "accessories":
        patch.accessories = edit.raw;
        changeLines.push(`Phụ kiện kèm theo → ${edit.raw}`);
        break;
    }
  }

  return { patch, changeLines, warnings };
}

async function prepareEditConfirmation(chatId: string, edits: FieldEdit[], targetId: number | null): Promise<void> {
  const supabase = getSupabaseAdmin();

  const target = await findPublishedTarget(chatId, targetId);

  if (!target) {
    await sendZaloMessage(
      chatId,
      targetId != null
        ? `Không tìm thấy sản phẩm có mã #${targetId} đang hiển thị trên web. Nhắn "Danh sách" để xem các mã hiện có.`
        : "Bạn chưa có sản phẩm nào đang hiển thị trên web để sửa."
    );
    return;
  }

  const { patch, changeLines, warnings } = buildFieldPatch(edits);

  if (Object.keys(patch).length === 0) {
    const lines = [`Không có trường nào hợp lệ để cập nhật cho tin đăng #${target.display_id} — ${target.name ?? "-"}.`];
    if (warnings.length > 0) lines.push("", `⚠️ ${warnings.join("; ")}`);
    await sendZaloMessage(chatId, lines.join("\n"));
    return;
  }

  await supabase.from("pending_bag_edits").delete().eq("chat_id", chatId);
  await supabase.from("pending_bag_edits").insert({
    chat_id: chatId,
    submission_id: target.id,
    action: "edit",
    patch,
    change_lines: changeLines,
    warnings,
  });

  const lines = [`✏️ Xác nhận cập nhật tin đăng #${target.display_id} — ${target.name ?? "-"}:`, ""];
  lines.push(...changeLines.map((l) => `• ${l}`));
  if (warnings.length > 0) lines.push("", `⚠️ ${warnings.join("; ")}`);
  lines.push("", `Trả lời "OK" để áp dụng, hoặc "Huỷ" để bỏ qua.`);

  await sendZaloMessage(chatId, lines.join("\n"));
}

async function commitPendingEdit(pending: PendingBagEdit): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { data: target } = await supabase
    .from("bag_submissions")
    .select("*")
    .eq("id", pending.submission_id)
    .maybeSingle();

  await supabase.from("pending_bag_edits").delete().eq("id", pending.id);

  if (!target) {
    await sendZaloMessage(pending.chat_id, "Sản phẩm này không còn tồn tại, không thể áp dụng thay đổi.");
    return;
  }

  if (pending.action === "delete") {
    await supabase
      .from("bag_submissions")
      .update({ status: "unpublished", updated_at: new Date().toISOString() })
      .eq("id", target.id);

    if (target.slug) {
      try {
        revalidatePath("/hang-hieu");
        revalidatePath(`/hang-hieu/${target.slug}`);
      } catch (err) {
        console.error("revalidatePath failed after delete command", err);
      }
    }

    await sendZaloMessage(pending.chat_id, `🗑️ Đã gỡ sản phẩm #${target.display_id} ("${target.name ?? "-"}") khỏi website.`);
    return;
  }

  const patch = { ...pending.patch, updated_at: new Date().toISOString() };
  const { data: updated } = await supabase
    .from("bag_submissions")
    .update(patch)
    .eq("id", target.id)
    .select()
    .single();

  if (target.slug) {
    try {
      revalidatePath("/hang-hieu");
      revalidatePath(`/hang-hieu/${target.slug}`);
    } catch (err) {
      console.error("revalidatePath failed after edit command", err);
    }
  }

  const finalName = updated?.name ?? target.name;
  const lines = [`✅ Đã cập nhật tin đăng #${target.display_id} — ${finalName ?? "-"}:`, ""];
  if (target.slug) lines.push(`${SITE_URL}/hang-hieu/${target.slug}`, "");
  lines.push(...pending.change_lines.map((l) => `• ${l}`));
  if (pending.warnings.length > 0) lines.push("", `⚠️ ${pending.warnings.join("; ")}`);

  await sendZaloMessage(pending.chat_id, lines.join("\n"));
}
