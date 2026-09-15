import { SORT_LABELS } from "@/types/filters";
import type { SortOption } from "@/types/filters";

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-ink"
      aria-label="Sắp xếp"
    >
      {Object.entries(SORT_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
