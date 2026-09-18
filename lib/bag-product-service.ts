import { getSupabasePublic } from "@/lib/supabase-public";
import { UNASSIGNED_CATEGORY_SLUG } from "@/lib/bag-post-parser";
import type { BagProduct } from "@/types/bag-product";
import type { BagSubmissionRow, BagSubmissionPhotoRow } from "@/types/bag-submission";

const UNASSIGNED_CATEGORY_NAME = "Chưa xác định";

/**
 * Every export here is `async` and reads through Supabase directly (no
 * build-time cache) since listings can appear at any time via the Zalo bot —
 * the routes that call these use ISR (`revalidate = 60`) to keep this cheap.
 */

function photoUrl(storagePath: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/bag-photos/${storagePath}`;
}

type SubmissionWithPhotos = BagSubmissionRow & { bag_submission_photos: BagSubmissionPhotoRow[] };

function toBagProduct(row: SubmissionWithPhotos): BagProduct {
  const images = (row.bag_submission_photos ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((p) => (p.storage_path ? photoUrl(p.storage_path) : p.photo_url));

  return {
    id: row.id,
    displayId: row.display_id,
    slug: row.slug ?? row.id,
    name: row.name ?? "Sản phẩm hàng hiệu",
    brand: row.brand,
    brandName: row.brand_raw,
    // A published listing whose photo/text never let us determine a real
    // category still needs to be findable on-site, not silently orphaned
    // out of every category filter — group it under "Chưa xác định" instead.
    itemCategory: row.item_category ?? UNASSIGNED_CATEGORY_SLUG,
    itemCategoryName: row.item_category_raw ?? UNASSIGNED_CATEGORY_NAME,
    condition: row.condition,
    price: row.price,
    size: row.size,
    accessories: row.accessories,
    images,
    publishedAt: row.published_at ?? row.created_at,
  };
}

export async function getAllBagProducts(): Promise<BagProduct[]> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("bag_submissions")
    .select("*, bag_submission_photos(*)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return (data as SubmissionWithPhotos[]).map(toBagProduct);
}

export async function getBagProductBySlug(slug: string): Promise<BagProduct | undefined> {
  const supabase = getSupabasePublic();
  const { data, error } = await supabase
    .from("bag_submissions")
    .select("*, bag_submission_photos(*)")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return undefined;
  return toBagProduct(data as SubmissionWithPhotos);
}

export interface BagBrandSummary {
  slug: string;
  name: string;
  coverImage: string | null;
}

/** Distinct brands that actually have a published listing right now — never a fixed/fabricated list. */
export async function getDistinctBagBrands(): Promise<BagBrandSummary[]> {
  const all = await getAllBagProducts();
  const bySlug = new Map<string, BagBrandSummary>();
  for (const p of all) {
    if (!p.brand || !p.brandName) continue;
    if (!bySlug.has(p.brand)) {
      bySlug.set(p.brand, { slug: p.brand, name: p.brandName, coverImage: p.images[0] ?? null });
    }
  }
  return [...bySlug.values()];
}

export interface BagCategorySummary {
  slug: string;
  name: string;
  coverImage: string;
}

/** Item categories that actually have a published listing right now — several ITEM_CATEGORIES slugs have zero live products, so this is intentionally not the full fixed list. */
export async function getDistinctBagCategories(): Promise<BagCategorySummary[]> {
  const all = await getAllBagProducts();
  const bySlug = new Map<string, BagCategorySummary>();
  for (const p of all) {
    if (!p.itemCategory || !p.itemCategoryName || p.images.length === 0) continue;
    if (!bySlug.has(p.itemCategory)) {
      bySlug.set(p.itemCategory, { slug: p.itemCategory, name: p.itemCategoryName, coverImage: p.images[0] });
    }
  }
  return [...bySlug.values()];
}

export async function getRelatedBagProducts(product: BagProduct, limit = 4): Promise<BagProduct[]> {
  const all = await getAllBagProducts();

  const sameBrand = all.filter((p) => p.id !== product.id && product.brand && p.brand === product.brand);
  if (sameBrand.length >= limit) return sameBrand.slice(0, limit);

  const sameCategory = all.filter(
    (p) =>
      p.id !== product.id &&
      product.itemCategory &&
      p.itemCategory === product.itemCategory &&
      !sameBrand.includes(p)
  );

  return [...sameBrand, ...sameCategory].slice(0, limit);
}
