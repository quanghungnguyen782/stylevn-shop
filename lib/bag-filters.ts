import type { BagProduct } from "@/types/bag-product";
import type { BagSortOption, PriceRange } from "@/types/filters";

export interface BagFilterState {
  category: string | null;
  brand: string | null;
  priceRange: PriceRange | null;
  sort: BagSortOption;
}

export function filterAndSortBagProducts(products: BagProduct[], state: BagFilterState): BagProduct[] {
  let result = products;

  if (state.category) {
    result = result.filter((p) => p.itemCategory === state.category);
  }
  if (state.brand) {
    result = result.filter((p) => p.brand === state.brand);
  }
  if (state.priceRange) {
    const { min, max } = state.priceRange;
    result = result.filter((p) => p.price != null && p.price >= min && p.price <= max);
  }

  const sorted = [...result];
  switch (state.sort) {
    case "price-asc":
      // Items with no price (contact-for-price) sort last regardless of direction.
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case "price-desc":
      sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      break;
    case "new":
    default:
      sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      break;
  }
  return sorted;
}
