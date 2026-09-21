export type Gender = "Nam" | "Nữ" | "Unisex" | "Trẻ Em";

export type CategorySlug = "ao" | "quan" | "giay" | "phu-kien";

export type BrandSlug =
  | "adidas"
  | "nike"
  | "asics"
  | "lining"
  | "361-degrees"
  | "lacoste"
  | "ralph-lauren"
  | "jordan"
  | "skechers"
  | "wilson"
  | "mlb"
  | "jeep"
  | "puma"
  | "new-balance"
  | "khac";

export interface Category {
  slug: CategorySlug;
  name: string;
}

export interface Brand {
  slug: BrandSlug;
  name: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  code: string;
  brand: BrandSlug;
  category: CategorySlug;
  gender: Gender;
  price: number;
  oldPrice: number;
  stock: number;
  sizes: string[];
  images: string[];
  description: string;
  tags: string[];
}
