import { BRANDS } from "@/lib/constants";
import { PRICE_RANGES } from "@/types/filters";
import type { PriceRange } from "@/types/filters";

const GENDERS = ["Nam", "Nữ", "Unisex"];

interface FilterPanelContentProps {
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
  gender: string | null;
  onSelectGender: (gender: string | null) => void;
  priceRange: PriceRange | null;
  onSelectPriceRange: (range: PriceRange | null) => void;
}

export function FilterPanelContent({
  selectedBrands,
  onToggleBrand,
  gender,
  onSelectGender,
  priceRange,
  onSelectPriceRange,
}: FilterPanelContentProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide">Thương Hiệu</p>
        <div className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <label key={brand.slug} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.slug)}
                onChange={() => onToggleBrand(brand.slug)}
                className="h-4 w-4 accent-ink"
              />
              {brand.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide">Giới Tính</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked={gender === null} onChange={() => onSelectGender(null)} className="h-4 w-4 accent-ink" />
            Tất cả
          </label>
          {GENDERS.map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={gender === g}
                onChange={() => onSelectGender(g)}
                className="h-4 w-4 accent-ink"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide">Khoảng Giá</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={priceRange === null}
              onChange={() => onSelectPriceRange(null)}
              className="h-4 w-4 accent-ink"
            />
            Tất cả
          </label>
          {PRICE_RANGES.map((range) => (
            <label key={range.label} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={priceRange?.label === range.label}
                onChange={() => onSelectPriceRange(range)}
                className="h-4 w-4 accent-ink"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
