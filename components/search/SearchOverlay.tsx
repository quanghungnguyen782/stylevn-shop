"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { searchProducts, searchBagProducts } from "@/lib/search";
import { ALL_PRODUCTS_CLIENT } from "@/lib/products-client";
import { getBrandName } from "@/lib/product-meta";
import { formatPrice } from "@/lib/format";
import { POPULAR_SEARCH_KEYWORDS } from "@/lib/constants";
import type { Product } from "@/types/product";
import type { BagProduct } from "@/types/bag-product";

const RECENT_KEY = "sv_recent_searches_v1";

interface SearchResultItem {
  key: string;
  href: string;
  image: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  tag?: string;
}

function toSportswearResult(product: Product): SearchResultItem {
  return {
    key: `sp-${product.id}`,
    href: `/san-pham/${product.slug}`,
    image: product.images[0],
    title: product.name,
    subtitle: getBrandName(product.brand),
    priceLabel: formatPrice(product.price),
  };
}

function toBagResult(product: BagProduct): SearchResultItem {
  return {
    key: `hh-${product.id}`,
    href: `/hang-hieu/${product.slug}`,
    image: product.images[0] ?? "",
    title: product.name,
    subtitle: product.brandName ?? "Hàng hiệu",
    priceLabel: product.price != null ? formatPrice(product.price) : "Liên hệ",
    tag: "Hàng hiệu",
  };
}

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
  const [bagProducts, setBagProducts] = useState<BagProduct[]>([]);

  useEffect(() => {
    if (open) setRecent(readRecent());
  }, [open]);

  // Fetched once per time the overlay opens (not on every keystroke) — the
  // hàng-hiệu catalog lives in Supabase, not the bundled JSON, so it can't
  // be searched synchronously like the sportswear catalog.
  useEffect(() => {
    if (!open || bagProducts.length > 0) return;
    fetch("/api/bag-products")
      .then((res) => (res.ok ? res.json() : []))
      .then(setBagProducts)
      .catch(() => setBagProducts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const trimmedQuery = deferredQuery.trim();
  const results: SearchResultItem[] = trimmedQuery
    ? [
        ...searchProducts(trimmedQuery, ALL_PRODUCTS_CLIENT, 4).map(toSportswearResult),
        ...searchBagProducts(trimmedQuery, bagProducts, 4).map(toBagResult),
      ]
    : [];

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
            {results.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => {
                  saveRecent(query);
                  onClose();
                }}
                className="flex gap-3"
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-canvas">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {item.subtitle}
                    {item.tag && <span className="ml-1.5 text-accent">· {item.tag}</span>}
                  </p>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-sm font-semibold">{item.priceLabel}</p>
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
