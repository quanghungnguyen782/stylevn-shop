import productsData from "@/data/products.json";
import { BRANDS, CATEGORIES } from "@/lib/constants";
import { discountPercent } from "@/lib/format";
import type { BrandSlug, CategorySlug, Product } from "@/types/product";

const ALL_PRODUCTS = productsData as Product[];

/**
 * Every export here is `async` even though it's backed by a static JSON file
 * today — when a real backend replaces the static data source, only this
 * file needs to change, not any call site.
 */

export async function getAllProducts(): Promise<Product[]> {
  return ALL_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export async function getProductsByBrand(brand: BrandSlug): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.brand === brand);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sameBrandAndCategory = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.brand === product.brand && p.category === product.category
  );
  if (sameBrandAndCategory.length >= limit) {
    return sameBrandAndCategory.slice(0, limit);
  }
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category && !sameBrandAndCategory.includes(p)
  );
  return [...sameBrandAndCategory, ...sameCategory].slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  return [...ALL_PRODUCTS].sort((a, b) => b.id - a.id).slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  // No real sales data exists yet; lowest remaining stock is used as a
  // turnover proxy until a real backend provides actual sales figures.
  return [...ALL_PRODUCTS].sort((a, b) => a.stock - b.stock).slice(0, limit);
}

export async function getFlashSaleProducts(limit = 8): Promise<Product[]> {
  return [...ALL_PRODUCTS]
    .filter((p) => discountPercent(p) >= 60)
    .sort((a, b) => discountPercent(b) - discountPercent(a))
    .slice(0, limit);
}

export async function getAllCategories() {
  return CATEGORIES;
}

export async function getAllBrands() {
  return BRANDS;
}
