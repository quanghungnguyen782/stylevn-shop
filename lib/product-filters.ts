import { discountPercent } from "@/lib/format";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/types/product";
import type { PriceRange, SortOption } from "@/types/filters";

export interface ProductFilterState {
  brands: string[];
  gender: string | null;
  priceRange: PriceRange | null;
  sort: SortOption;
  query: string;
}

export function filterAndSortProducts(products: Product[], state: ProductFilterState): Product[] {
  let result = products;

  if (state.query.trim()) {
    result = searchProducts(state.query, result, result.length);
  }
  if (state.brands.length > 0) {
    result = result.filter((p) => state.brands.includes(p.brand));
  }
  if (state.gender) {
    result = result.filter((p) => p.gender === state.gender);
  }
  if (state.priceRange) {
    const { min, max } = state.priceRange;
    result = result.filter((p) => p.price >= min && p.price <= max);
  }

  const sorted = [...result];
  switch (state.sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      sorted.sort((a, b) => discountPercent(b) - discountPercent(a));
      break;
    case "new":
      sorted.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }
  return sorted;
}
