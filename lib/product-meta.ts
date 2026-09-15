import { BRANDS, CATEGORIES } from "@/lib/constants";
import type { BrandSlug, CategorySlug } from "@/types/product";

export function getCategoryName(slug: CategorySlug | string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getBrandName(slug: BrandSlug | string): string {
  return BRANDS.find((b) => b.slug === slug)?.name ?? slug;
}
