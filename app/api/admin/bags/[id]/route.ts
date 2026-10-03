import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ITEM_CATEGORIES, parseSingleBrand } from "@/lib/bag-post-parser";

const ITEM_CATEGORY_SLUGS = ITEM_CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const BagEditSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  brand: z.string().nullable(),
  itemCategory: z.enum(ITEM_CATEGORY_SLUGS).nullable(),
  condition: z.enum(["new", "used"]).nullable(),
  price: z.coerce.number().int().min(0).nullable(),
  size: z.string().nullable(),
  accessories: z.string().nullable(),
});

const DeleteSchema = z.object({ action: z.literal("delete") });

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/admin/bags/[id]">) {
  const { id } = await ctx.params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("bag_submissions").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });
  }
  return NextResponse.json(data);
}

async function revalidateBagPaths(slug: string | null) {
  try {
    revalidatePath("/hang-hieu");
    if (slug) revalidatePath(`/hang-hieu/${slug}`);
  } catch (err) {
    console.error("revalidatePath failed after admin bag edit", err);
  }
}

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/admin/bags/[id]">) {
  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // "Delete" is really a status change, never a real DELETE — matches the
  // Zalo bot's own delete path (lib/bag-submission-service.ts) so photos and
  // storage stay intact for a possible un-delete later.
  const deleteParsed = DeleteSchema.safeParse(body);
  if (deleteParsed.success) {
    const { data: target } = await supabase.from("bag_submissions").select("slug").eq("id", id).maybeSingle();
    if (!target) return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });

    await supabase
      .from("bag_submissions")
      .update({ status: "unpublished", updated_at: new Date().toISOString() })
      .eq("id", id);
    await revalidateBagPaths(target.slug);
    return NextResponse.json({ ok: true, message: "Đã gỡ sản phẩm khỏi website." });
  }

  const parsed = BagEditSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ.", details: parsed.error.flatten() }, { status: 400 });
  }

  const { data: target, error: findError } = await supabase
    .from("bag_submissions")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  if (findError || !target) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });
  }

  const itemCategoryName = parsed.data.itemCategory
    ? (ITEM_CATEGORIES.find((c) => c.slug === parsed.data.itemCategory)?.name ?? null)
    : null;

  // `brand` is a slug used for grouping (lib/bag-product-service.ts's
  // getDistinctBagBrands() keys on it) while `brand_raw` is the display
  // name — resolve free-text input through the same brand resolver the
  // Zalo bot's own edit-command flow uses, instead of writing the raw
  // typed text into the slug column (which would fragment grouping, e.g.
  // "Gucci" vs the existing "gucci" becoming two different filter buckets).
  const resolvedBrand = parsed.data.brand?.trim() ? parseSingleBrand(parsed.data.brand.trim()) : null;

  const { error: updateError } = await supabase
    .from("bag_submissions")
    .update({
      name: parsed.data.name,
      brand: resolvedBrand?.slug ?? null,
      brand_raw: resolvedBrand?.name ?? null,
      item_category: parsed.data.itemCategory,
      item_category_raw: itemCategoryName,
      condition: parsed.data.condition,
      price: parsed.data.price,
      size: parsed.data.size,
      accessories: parsed.data.accessories,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    console.error("admin bag PATCH failed", updateError);
    return NextResponse.json({ error: "Có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
  }

  await revalidateBagPaths(target.slug);
  return NextResponse.json({ ok: true, message: "Đã lưu — trang cập nhật trong giây lát." });
}
