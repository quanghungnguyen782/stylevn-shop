"use client";

// Client-side product lookup for the cart/wishlist drawers. Kept separate
// from lib/product-service.ts (the async, "backend-ready" API used by server
// components) so this one static JSON import stays isolated to the client
// chunk that actually needs synchronous lookups (cart line items, wishlist).
import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

export const ALL_PRODUCTS_CLIENT = productsData as Product[];
const BY_ID = new Map(ALL_PRODUCTS_CLIENT.map((p) => [p.id, p]));
const BY_SLUG = new Map(ALL_PRODUCTS_CLIENT.map((p) => [p.slug, p]));

export function getProductByIdSync(id: number): Product | undefined {
  return BY_ID.get(id);
}

export function getProductBySlugSync(slug: string): Product | undefined {
  return BY_SLUG.get(slug);
}
