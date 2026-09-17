import { getSupabasePublic } from "@/lib/supabase-public";
import type { BagProduct } from "@/types/bag-product";
import type { BagSubmissionRow, BagSubmissionPhotoRow } from "@/types/bag-submission";

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
    slug: row.slug ?? row.id,
    name: row.name ?? "Sản phẩm hàng hiệu",
    brand: row.brand,
    brandName: row.brand_raw,
    itemCategory: row.item_category,
    itemCategoryName: row.item_category_raw,
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
