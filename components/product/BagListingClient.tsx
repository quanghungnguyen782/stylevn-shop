"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BagProductCard } from "@/components/product/BagProductCard";
import { SortSelect } from "@/components/plp/SortSelect";
import { Pagination } from "@/components/plp/Pagination";
import { filterAndSortBagProducts } from "@/lib/bag-filters";
import { ITEM_CATEGORIES } from "@/lib/bag-post-parser";
import { BAG_PRICE_RANGES, BAG_SORT_LABELS } from "@/types/filters";
import type { BagSortOption, PriceRange } from "@/types/filters";
import type { BagProduct } from "@/types/bag-product";

const PAGE_SIZE = 24;

export function BagListingClient({ products }: { products: BagProduct[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const [sort, setSort] = useState<BagSortOption>("new");
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterAndSortBagProducts(products, { category, brand, priceRange, sort }),
    [products, category, brand, priceRange, sort]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const categoryName = category ? ITEM_CATEGORIES.find((c) => c.slug === category)?.name : null;
  const brandName = brand ? filtered[0]?.brandName ?? products.find((p) => p.brand === brand)?.brandName : null;
  const hasFilter = Boolean(category || brand);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">
            Hàng Hiệu Chính Hãng
            {categoryName && ` — ${categoryName}`}
            {brandName && ` — ${brandName}`}
          </h1>
          <p className="mt-1 text-sm text-muted">{filtered.length} sản phẩm</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={priceRange?.label ?? ""}
            onChange={(e) => {
              const found = BAG_PRICE_RANGES.find((r) => r.label === e.target.value);
              setPriceRange(found ?? null);
              setPage(1);
            }}
            className="border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-ink"
            aria-label="Khoảng giá"
          >
            <option value="">Tất cả mức giá</option>
            {BAG_PRICE_RANGES.map((r) => (
              <option key={r.label} value={r.label}>
                {r.label}
              </option>
            ))}
          </select>
          <SortSelect
            value={sort}
            onChange={(v) => {
              setSort(v);
              setPage(1);
            }}
            options={BAG_SORT_LABELS}
          />
        </div>
      </div>

      {hasFilter && (
        <Link href="/hang-hieu" className="mb-6 inline-block text-sm underline-offset-4 hover:underline">
          ← Xem tất cả hàng hiệu
        </Link>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          Hiện chưa có sản phẩm nào phù hợp, vui lòng thử bộ lọc khác hoặc quay lại sau.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {pageItems.map((product) => (
              <BagProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
