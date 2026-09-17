import { getBrandName, getCategoryName } from "@/lib/product-meta";
import { removeDiacritics } from "@/lib/text-utils";
import type { Product } from "@/types/product";

interface SearchEntry {
  product: Product;
  haystack: string;
  nameHaystack: string;
}

let index: SearchEntry[] | null = null;

function buildIndex(products: Product[]): SearchEntry[] {
  return products.map((product) => {
    const brandName = getBrandName(product.brand);
    const categoryName = getCategoryName(product.category);
    const nameHaystack = removeDiacritics(product.name);
    const haystack = removeDiacritics(
      `${product.name} ${product.code} ${brandName} ${categoryName}`
    );
    return { product, haystack, nameHaystack };
  });
}

export function searchProducts(query: string, products: Product[], limit = 8): Product[] {
  const q = removeDiacritics(query.trim());
  if (!q) return [];

  if (!index || index.length !== products.length) {
    index = buildIndex(products);
  }

  const words = q.split(/\s+/).filter(Boolean);

  const scored = index
    .map((entry) => {
      const matchesAll = words.every((w) => entry.haystack.includes(w));
      if (!matchesAll) return null;

      let score = 0;
      if (removeDiacritics(entry.product.code) === q) score += 100;
      else if (entry.nameHaystack.startsWith(q)) score += 50;
      else if (entry.nameHaystack.includes(q)) score += 20;
      else score += 5;

      return { product: entry.product, score };
    })
    .filter((x): x is { product: Product; score: number } => x !== null)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.product);
}
