"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

export function AdminProductList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    // Simple substring filter, not the ranked/capped public searchProducts()
    // — an admin browsing their own catalog wants everything that matches,
    // not a customer-search-box-style top-N.
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm theo tên, mã, thương hiệu..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full max-w-md border border-line px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <p className="mb-2 text-xs text-muted">{filtered.length} kết quả</p>
      <div className="flex flex-col divide-y divide-line border-y border-line">
        {filtered.slice(0, 200).map((p) => (
          <Link
            key={p.id}
            href={`/admin/san-pham/${p.id}`}
            className="flex items-center justify-between gap-4 px-2 py-3 text-sm hover:bg-surface"
          >
            <span className="flex-1 truncate">{p.name}</span>
            <span className="w-24 shrink-0 text-xs text-muted">{p.code}</span>
            <span className="w-20 shrink-0 text-xs uppercase text-muted">{p.brand}</span>
            <span className="w-28 shrink-0 text-right">{p.price.toLocaleString("vi-VN")}₫</span>
          </Link>
        ))}
      </div>
      {filtered.length > 200 && (
        <p className="mt-2 text-xs text-muted">Chỉ hiện 200 kết quả đầu — thu hẹp tìm kiếm để xem thêm.</p>
      )}
    </div>
  );
}
