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

// Hàng-hiệu (bag) catalog — no oldPrice field exists so no "discount" sort,
// and price bands reflect actual observed listing prices (2.3tr-57.9tr),
// not the sportswear catalog's much lower bands.
export type BagSortOption = "new" | "price-asc" | "price-desc";

export const BAG_SORT_LABELS: Record<BagSortOption, string> = {
  new: "Mới nhất",
  "price-asc": "Giá thấp đến cao",
  "price-desc": "Giá cao đến thấp",
};

export const BAG_PRICE_RANGES: PriceRange[] = [
  { label: "Dưới 10.000.000₫", min: 0, max: 10_000_000 },
  { label: "10.000.000₫ - 20.000.000₫", min: 10_000_000, max: 20_000_000 },
  { label: "20.000.000₫ - 30.000.000₫", min: 20_000_000, max: 30_000_000 },
  { label: "Trên 30.000.000₫", min: 30_000_000, max: Infinity },
];
