export interface BagProduct {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  brandName: string | null;
  itemCategory: string | null;
  itemCategoryName: string | null;
  condition: "new" | "used" | null;
  price: number | null;
  images: string[];
  publishedAt: string;
}
