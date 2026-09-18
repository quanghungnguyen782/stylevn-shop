"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BagProductCard } from "@/components/product/BagProductCard";
import { ITEM_CATEGORIES } from "@/lib/bag-post-parser";
import type { BagProduct } from "@/types/bag-product";

export function BagListingClient({ products }: { products: BagProduct[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  let filtered = products;
  if (category) filtered = filtered.filter((p) => p.itemCategory === category);
  if (brand) filtered = filtered.filter((p) => p.brand === brand);

  const categoryName = category ? ITEM_CATEGORIES.find((c) => c.slug === category)?.name : null;
  const brandName = brand ? filtered[0]?.brandName ?? products.find((p) => p.brand === brand)?.brandName : null;
  const hasFilter = Boolean(category || brand);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-8 font-display text-2xl md:text-3xl">
        Hàng Hiệu Chính Hãng
        {categoryName && ` — ${categoryName}`}
        {brandName && ` — ${brandName}`}
      </h1>

      {hasFilter && (
        <Link href="/hang-hieu" className="mb-6 inline-block text-sm underline-offset-4 hover:underline">
          ← Xem tất cả hàng hiệu
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          Hiện chưa có sản phẩm nào, vui lòng quay lại sau.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <BagProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
