import { getBrandName, getCategoryName } from "@/lib/product-meta";
import type { PriceRange } from "@/types/filters";

interface Chip {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFilterChipsProps {
  brands: string[];
  onRemoveBrand: (slug: string) => void;
  gender: string | null;
  onRemoveGender: () => void;
  category: string | null;
  onRemoveCategory: () => void;
  priceRange: PriceRange | null;
  onRemovePriceRange: () => void;
  query: string;
  onRemoveQuery: () => void;
}

export function ActiveFilterChips({
  brands,
  onRemoveBrand,
  gender,
  onRemoveGender,
  category,
  onRemoveCategory,
  priceRange,
  onRemovePriceRange,
  query,
  onRemoveQuery,
}: ActiveFilterChipsProps) {
  const chips: Chip[] = [
    ...brands.map((slug) => ({ key: `brand-${slug}`, label: getBrandName(slug), onRemove: () => onRemoveBrand(slug) })),
    ...(gender ? [{ key: "gender", label: gender, onRemove: onRemoveGender }] : []),
    ...(category ? [{ key: "category", label: getCategoryName(category), onRemove: onRemoveCategory }] : []),
    ...(priceRange ? [{ key: "price", label: priceRange.label, onRemove: onRemovePriceRange }] : []),
    ...(query ? [{ key: "query", label: `"${query}"`, onRemove: onRemoveQuery }] : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs hover:border-ink"
        >
          {chip.label}
          <span aria-hidden>✕</span>
        </button>
      ))}
    </div>
  );
}
