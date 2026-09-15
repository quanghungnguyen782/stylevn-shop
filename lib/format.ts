import type { Product } from "@/types/product";

export function formatPrice(amount: number): string {
  return amount.toLocaleString("vi-VN") + "₫";
}

export function discountPercent(product: Pick<Product, "price" | "oldPrice">): number {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(100 - (product.price / product.oldPrice) * 100);
}

export function isLowStock(product: Pick<Product, "stock">): boolean {
  return product.stock > 0 && product.stock <= 5;
}
