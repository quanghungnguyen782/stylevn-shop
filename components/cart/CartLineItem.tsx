"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getProductByIdSync } from "@/lib/products-client";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/types/cart";

export function CartLineItem({ line }: { line: CartLine }) {
  const { updateQty, removeItem } = useCart();
  const product = getProductByIdSync(line.productId);
  if (!product) return null;

  return (
    <div className="flex gap-4 border-b border-line px-5 py-4">
      <Link href={`/san-pham/${product.slug}`} className="shrink-0">
        <div className="relative h-24 w-20 overflow-hidden bg-canvas">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/san-pham/${product.slug}`} className="text-sm font-medium hover:text-accent">
          {product.name}
        </Link>
        <p className="text-xs text-muted">Size: {line.size}</p>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-line">
            <button
              className="h-7 w-7 text-sm"
              aria-label="Giảm số lượng"
              onClick={() => updateQty(line.productId, line.size, line.qty - 1)}
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{line.qty}</span>
            <button
              className="h-7 w-7 text-sm"
              aria-label="Tăng số lượng"
              onClick={() => updateQty(line.productId, line.size, line.qty + 1)}
            >
              +
            </button>
          </div>
          <button
            className="text-xs text-muted underline-offset-2 hover:text-accent hover:underline"
            onClick={() => removeItem(line.productId, line.size)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
