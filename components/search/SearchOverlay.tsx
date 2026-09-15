"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { searchProducts } from "@/lib/search";
import { ALL_PRODUCTS_CLIENT } from "@/lib/products-client";
import { getBrandName } from "@/lib/product-meta";
import { formatPrice } from "@/lib/format";
import { POPULAR_SEARCH_KEYWORDS } from "@/lib/constants";

const RECENT_KEY = "sv_recent_searches_v1";

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecent(term: string) {
  try {
    const current = readRecent().filter((t) => t !== term);
    const next = [term, ...current].slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (open) setRecent(readRecent());
  }, [open]);

  const results = deferredQuery.trim() ? searchProducts(deferredQuery, ALL_PRODUCTS_CLIENT, 6) : [];

  function handleSubmit(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    saveRecent(trimmed);
    onClose();
    window.location.href = `/san-pham?q=${encodeURIComponent(trimmed)}`;
  }

  return (
    <Drawer open={open} onClose={onClose} title="Tìm Kiếm" side="right">
      <div className="px-5 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(query);
          }}
        >
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, thương hiệu..."
            className="w-full border-b border-ink bg-transparent py-2 text-lg outline-none placeholder:text-muted"
          />
        </form>

        {!query && (
          <>
            {recent.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs uppercase tracking-wide text-muted">Tìm kiếm gần đây</p>
                <div className="flex flex-wrap gap-2">
                  {recent.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSubmit(term)}
                      className="border border-line px-3 py-1.5 text-xs hover:border-ink"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-wide text-muted">Từ khóa phổ biến</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCH_KEYWORDS.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSubmit(term)}
                    className="border border-line px-3 py-1.5 text-xs hover:border-ink"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {query && results.length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/san-pham/${product.slug}`}
                onClick={() => {
                  saveRecent(query);
                  onClose();
                }}
                className="flex gap-3"
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-canvas">
                  <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">{getBrandName(product.brand)}</p>
                  <p className="text-sm">{product.name}</p>
                  <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
            <button
              onClick={() => handleSubmit(query)}
              className="mt-2 text-left text-sm text-accent underline-offset-2 hover:underline"
            >
              Xem tất cả kết quả cho &ldquo;{query}&rdquo; →
            </button>
          </div>
        )}

        {query && results.length === 0 && (
          <p className="mt-6 text-sm text-muted">Không tìm thấy sản phẩm phù hợp.</p>
        )}
      </div>
    </Drawer>
  );
}
