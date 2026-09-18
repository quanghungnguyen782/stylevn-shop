import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ITEM_CATEGORIES, UNASSIGNED_CATEGORY_SLUG } from "@/lib/bag-post-parser";

// Render's free-tier logs API only surfaces build/deploy logs, not runtime
// console output — this is the only way to actually see what went wrong.
async function logAiError(context: string, detail: unknown): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("webhook_errors").insert({
      event_name: `ai-extract:${context}`,
      error_message: detail instanceof Error ? detail.message : String(detail),
      error_stack: detail instanceof Error ? (detail.stack ?? null) : null,
      payload: typeof detail === "object" ? (detail as Record<string, unknown>) : { detail: String(detail) },
    });
  } catch {
    // best-effort — never let logging itself break the caller
  }
}

export interface AiExtractedFields {
  name: string | null;
  category: string | null;
  brand: string | null;
  condition: "new" | "used" | null;
  price: number | null;
  size: string | null;
  accessories: string | null;
}

interface FewShotExample {
  rawText: string;
  name: string | null;
  category: string | null;
  brand: string | null;
  condition: "new" | "used" | null;
  price: number | null;
}

const GEMINI_MODEL = "gemini-3.6-flash";
const MAX_IMAGES = 4;
const MAX_RETRIES = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** The free tier occasionally returns 503 "high demand" — worth one or two quick retries before giving up. */
async function callGeminiWithRetry(url: string, body: unknown): Promise<Response | null> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return res;
    if (res.status !== 503 || attempt === MAX_RETRIES - 1) {
      const bodyText = await res.text();
      console.error("Gemini API error", res.status, bodyText);
      await logAiError("http-error", { status: res.status, body: bodyText });
      return null;
    }
    await sleep(1500 * (attempt + 1));
  }
  return null;
}

async function fetchImageAsBase64(url: string): Promise<{ mimeType: string; data: string } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const mimeType = res.headers.get("content-type") ?? "image/jpeg";
    return { mimeType, data: buffer.toString("base64") };
  } catch {
    return null;
  }
}

/**
 * A handful of real past posts (raw caption + the fields that ended up
 * being correct) — given directly to the model as few-shot examples rather
 * than fine-tuning anything, which would be far more infrastructure for no
 * real benefit at this volume.
 */
async function getFewShotExamples(limit = 5): Promise<FewShotExample[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("bag_submissions")
    .select("raw_text, name, item_category, brand, condition, price")
    .eq("status", "published")
    .not("raw_text", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((r) => ({
    rawText: r.raw_text ?? "",
    name: r.name,
    category: r.item_category,
    brand: r.brand,
    condition: r.condition,
    price: r.price,
  }));
}

/**
 * Fills in fields the deterministic parser (lib/bag-post-parser.ts) couldn't
 * — most importantly, category/brand inferred from the PHOTOS when the
 * caption never states them in words at all. Returns null on any failure
 * (missing key, network error, malformed response) so callers can fall back
 * to the existing "⚠️ Chưa xác định" behavior — this is a best-effort
 * enhancement, never a hard dependency of the posting flow.
 */
export async function getAiFieldSuggestions(
  photoUrls: string[],
  captionText: string
): Promise<AiExtractedFields | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const [images, examples] = await Promise.all([
      Promise.all(photoUrls.slice(0, MAX_IMAGES).map(fetchImageAsBase64)),
      getFewShotExamples(),
    ]);
    const validImages = images.filter((img): img is { mimeType: string; data: string } => img !== null);

    // "Chưa xác định" is a fallback assigned only when even the AI can't tell
    // — never a real guess, so it's not offered to the model as an option.
    const categorySlugs = ITEM_CATEGORIES.map((c) => c.slug).filter((s) => s !== UNASSIGNED_CATEGORY_SLUG);
    const exampleText = examples
      .map(
        (e) =>
          `Mô tả: "${e.rawText.replace(/\n/g, " / ")}"\nKết quả đúng: ${JSON.stringify({
            name: e.name,
            category: e.category,
            brand: e.brand,
            condition: e.condition,
            price: e.price,
          })}`
      )
      .join("\n\n");

    const prompt = `Bạn giúp phân loại tin đăng bán hàng hiệu (túi xách, quần áo, phụ kiện...) đã qua sử dụng hoặc mới, cho một cửa hàng online tại Việt Nam.

Danh sách loại hàng hợp lệ (chỉ chọn đúng 1 giá trị sau, hoặc "unknown" nếu không chắc): ${categorySlugs.join(", ")}

${examples.length > 0 ? `Một vài tin đăng thật đã đăng trước đây, để bạn hiểu văn phong và cách phân loại:\n\n${exampleText}\n` : ""}
Mô tả của tin đăng mới cần phân tích:
"${captionText || "(không có mô tả, chỉ có ảnh)"}"

Hãy nhìn kỹ ảnh đính kèm (nếu có) để xác định loại hàng và thương hiệu khi mô tả không nói rõ — đây là mục đích chính. Chỉ điền "price" nếu mô tả có nêu rõ giá bằng số hoặc chữ (vd "21tr", "4.500.000") — TUYỆT ĐỐI không tự đoán giá chỉ từ hình ảnh. Trường nào không chắc chắn thì để null, đừng đoán bừa.`;

    const parts: Record<string, unknown>[] = [{ text: prompt }];
    for (const img of validImages) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });
    }

    const body = {
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            name: { type: "string", nullable: true },
            category: { type: "string", enum: [...categorySlugs, "unknown"] },
            brand: { type: "string", nullable: true },
            condition: { type: "string", enum: ["new", "used", "unknown"] },
            price: { type: "integer", nullable: true },
            size: { type: "string", nullable: true },
            accessories: { type: "string", nullable: true },
          },
        },
      },
    };

    const res = await callGeminiWithRetry(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      body
    );
    if (!res) return null;

    const json = await res.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      await logAiError("no-text-in-response", { response: json });
      return null;
    }

    const parsed = JSON.parse(text);
    return {
      name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : null,
      category: categorySlugs.includes(parsed.category) ? parsed.category : null,
      brand: typeof parsed.brand === "string" && parsed.brand.trim() ? parsed.brand.trim() : null,
      condition: parsed.condition === "used" ? "used" : parsed.condition === "new" ? "new" : null,
      price: typeof parsed.price === "number" && parsed.price > 0 ? parsed.price : null,
      size: typeof parsed.size === "string" && parsed.size.trim() ? parsed.size.trim() : null,
      accessories:
        typeof parsed.accessories === "string" && parsed.accessories.trim() ? parsed.accessories.trim() : null,
    };
  } catch (err) {
    console.error("AI field extraction failed", err);
    await logAiError("exception", err);
    return null;
  }
}
