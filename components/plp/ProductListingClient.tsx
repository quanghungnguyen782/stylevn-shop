"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanelContent } from "@/components/plp/FilterPanelContent";
import { FilterDrawerMobile } from "@/components/plp/FilterDrawerMobile";
import { ActiveFilterChips } from "@/components/plp/ActiveFilterChips";
import { SortSelect } from "@/components/plp/SortSelect";
import { Pagination } from "@/components/plp/Pagination";
import { filterAndSortProducts } from "@/lib/product-filters";
import type { PriceRange, SortOption } from "@/types/filters";
import type { Product } from "@/types/product";

const PAGE_SIZE = 24;

export function ProductListingClient({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialSaleOnly = searchParams.get("sale") === "1";
  const initialGender = searchParams.get("gender");
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");
  const initialSort = (searchParams.get("sort") as SortOption) ?? (initialSaleOnly ? "discount" : "default");

  const [brands, setBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [gender, setGender] = useState<string | null>(initialGender);
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const scopedProducts = useMemo(
    () => (initialSaleOnly ? products.filter((p) => p.oldPrice > p.price) : products),
    [products, initialSaleOnly]
  );

  const filtered = useMemo(
    () => filterAndSortProducts(scopedProducts, { brands, gender, category, priceRange, sort, query }),
    [scopedProducts, brands, gender, category, priceRange, sort, query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleBrand(slug: string) {
    setBrands((prev) => (prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]));
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{filtered.length} sản phẩm</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="border border-line px-4 py-2 text-sm lg:hidden"
          >
            Bộ Lọc
          </button>
          <SortSelect value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
        </div>
      </div>

      <ActiveFilterChips
        brands={brands}
        onRemoveBrand={toggleBrand}
        gender={gender}
        onRemoveGender={() => setGender(null)}
        category={category}
        onRemoveCategory={() => setCategory(null)}
        priceRange={priceRange}
        onRemovePriceRange={() => setPriceRange(null)}
        query={query}
        onRemoveQuery={() => setQuery("")}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanelContent
            selectedBrands={brands}
            onToggleBrand={toggleBrand}
            gender={gender}
            onSelectGender={(g) => { setGender(g); setPage(1); }}
            priceRange={priceRange}
            onSelectPriceRange={(r) => { setPriceRange(r); setPage(1); }}
          />
        </aside>

        <div>
          <ProductGrid products={pageItems} />
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <FilterDrawerMobile
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        resultCount={filtered.length}
        selectedBrands={brands}
        onToggleBrand={toggleBrand}
        gender={gender}
        onSelectGender={(g) => { setGender(g); setPage(1); }}
        priceRange={priceRange}
        onSelectPriceRange={(r) => { setPriceRange(r); setPage(1); }}
      />
    </div>
  );
}
