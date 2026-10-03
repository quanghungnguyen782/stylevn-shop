"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BagProduct } from "@/types/bag-product";

export function AdminBagList({ bags }: { bags: BagProduct[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bags;
    return bags.filter(
      (b) => b.name.toLowerCase().includes(q) || (b.brandName ?? "").toLowerCase().includes(q)
    );
  }, [bags, query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm theo tên, thương hiệu..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 w-full max-w-md border border-line px-4 py-3 text-sm outline-none focus:border-ink"
      />
      <p className="mb-2 text-xs text-muted">{filtered.length} kết quả</p>
      <div className="flex flex-col divide-y divide-line border-y border-line">
        {filtered.map((b) => (
          <Link
            key={b.id}
            href={`/admin/hang-hieu/${b.id}`}
            className="flex items-center justify-between gap-4 px-2 py-3 text-sm hover:bg-surface"
          >
            <span className="flex-1 truncate">
              #{b.displayId} — {b.name}
            </span>
            <span className="w-28 shrink-0 text-xs text-muted">{b.brandName ?? "—"}</span>
            <span className="w-28 shrink-0 text-right">{b.price ? `${b.price.toLocaleString("vi-VN")}₫` : "—"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
