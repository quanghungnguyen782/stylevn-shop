export type SortOption = "default" | "price-asc" | "price-desc" | "discount" | "new";

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { label: "Dưới 300.000₫", min: 0, max: 300_000 },
  { label: "300.000₫ - 700.000₫", min: 300_000, max: 700_000 },
  { label: "700.000₫ - 1.200.000₫", min: 700_000, max: 1_200_000 },
  { label: "Trên 1.200.000₫", min: 1_200_000, max: Infinity },
];

export const SORT_LABELS: Record<SortOption, string> = {
  default: "Đề xuất",
  new: "Mới nhất",
  "price-asc": "Giá thấp đến cao",
  "price-desc": "Giá cao đến thấp",
  discount: "Giảm giá nhiều nhất",
};
