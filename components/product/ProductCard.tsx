"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { getBrandName } from "@/lib/product-meta";
import { discountPercent, formatPrice, isLowStock } from "@/lib/format";
import { IconHeart } from "@/components/ui/icons";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const discount = discountPercent(product);
  const lowStock = isLowStock(product);
  const secondImage = product.images[1];

  return (
    <div className="group relative">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
          {(discount > 0 || lowStock) && (
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
              {discount > 0 && <Badge tone="accent">-{discount}%</Badge>}
              {lowStock && <Badge tone="ink">Sắp hết hàng</Badge>}
            </div>
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={
              secondImage
                ? "object-cover transition-opacity duration-300 group-hover:opacity-0"
                : "object-cover"
            }
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
        </div>
      </Link>

      <button
        aria-label={wishlisted ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
        onClick={() => toggle(product.id)}
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-ink transition-colors hover:text-accent"
      >
        <IconHeart width={16} height={16} filled={wishlisted} />
      </button>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wide text-muted">{getBrandName(product.brand)}</p>
        <Link href={`/san-pham/${product.slug}`}>
          <p className="mt-0.5 line-clamp-1 text-sm">{product.name}</p>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice > 0 && (
            <span className="text-xs text-muted line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => addItem(product.id, product.sizes[0], 1)}
        className="mt-2 w-full border border-ink py-2 text-xs uppercase tracking-wide opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
      >
        Thêm Nhanh
      </button>
    </div>
  );
}
