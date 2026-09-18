"use client";

import { useEffect, useState } from "react";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import type { RecentlyViewedEntry } from "@/lib/recently-viewed";
import { getProductBySlugSync } from "@/lib/products-client";
import { getBagProductBySlug } from "@/lib/bag-product-service";
import { ProductCard } from "@/components/product/ProductCard";
import { BagProductCard } from "@/components/product/BagProductCard";
import type { Product } from "@/types/product";
import type { BagProduct } from "@/types/bag-product";

type ResolvedEntry =
  | { type: "san-pham"; product: Product }
  | { type: "hang-hieu"; product: BagProduct };

export function RecentlyViewedSection({ excludeSlug }: { excludeSlug: string }) {
  const [items, setItems] = useState<ResolvedEntry[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const entries = getRecentlyViewed().filter((e) => e.slug !== excludeSlug);
      const resolved = await Promise.all(
        entries.map(async (e: RecentlyViewedEntry): Promise<ResolvedEntry | null> => {
          if (e.type === "san-pham") {
            const product = getProductBySlugSync(e.slug);
            return product ? { type: "san-pham", product } : null;
          }
          const product = await getBagProductBySlug(e.slug);
          return product ? { type: "hang-hieu", product } : null;
        })
      );
      if (!cancelled) setItems(resolved.filter((r): r is ResolvedEntry => r !== null));
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [excludeSlug]);

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 font-display text-2xl">Sản Phẩm Đã Xem</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) =>
          item.type === "san-pham" ? (
            <ProductCard key={`san-pham-${item.product.id}`} product={item.product} />
          ) : (
            <BagProductCard key={`hang-hieu-${item.product.id}`} product={item.product} />
          )
        )}
      </div>
    </section>
  );
}
