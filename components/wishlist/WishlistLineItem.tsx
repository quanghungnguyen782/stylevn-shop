"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function WishlistLineItem({ product }: { product: Product }) {
  const { toggle } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-line px-5 py-4">
      <Link href={`/san-pham/${product.slug}`} className="shrink-0">
        <div className="relative h-24 w-20 overflow-hidden bg-canvas">
          <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/san-pham/${product.slug}`} className="text-sm font-medium hover:text-accent">
          {product.name}
        </Link>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
        <div className="mt-auto flex items-center justify-between">
          <button
            className="border border-ink px-3 py-1.5 text-xs uppercase tracking-wide hover:bg-ink hover:text-canvas"
            onClick={() => addItem(product.id, product.sizes[0], 1)}
          >
            Thêm Vào Giỏ
          </button>
          <button
            className="text-xs text-muted underline-offset-2 hover:text-accent hover:underline"
            onClick={() => toggle(product.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
