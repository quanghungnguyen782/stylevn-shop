"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice, discountPercent, isLowStock } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { IconHeart } from "@/components/ui/icons";
import { Badge } from "@/components/ui/Badge";
import { FREE_SHIPPING_THRESHOLD, ZALO_CONTACT_URL } from "@/lib/constants";
import type { Product } from "@/types/product";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const router = useRouter();

  const discount = discountPercent(product);
  const lowStock = isLowStock(product);
  const outOfStock = product.stock <= 0;

  function handleAddToCart() {
    addItem(product.id, size, qty);
  }

  function handleBuyNow() {
    addItem(product.id, size, qty);
    router.push("/checkout");
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        {discount > 0 && <Badge tone="accent">-{discount}%</Badge>}
        {lowStock && !outOfStock && <Badge tone="ink">Sắp hết hàng</Badge>}
      </div>

      <div className="mb-1 flex items-center gap-3">
        <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
        {product.oldPrice > 0 && (
          <span className="text-base text-muted line-through">{formatPrice(product.oldPrice)}</span>
        )}
      </div>
      <p className="mb-6 text-sm text-muted">
        {outOfStock ? "Tạm hết hàng" : `Còn lại ${product.stock} sản phẩm`}
      </p>

      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Kích Thước</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={
                s === size
                  ? "border border-ink bg-ink px-4 py-2 text-sm text-canvas"
                  : "border border-line px-4 py-2 text-sm hover:border-ink"
              }
            >
              {s}
            </button>
          ))}
        </div>
        <button className="mt-2 text-xs text-muted underline-offset-2 hover:underline">
          Hướng dẫn chọn size
        </button>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide">Số Lượng</p>
        <div className="flex items-center border border-line" style={{ width: "fit-content" }}>
          <button className="h-10 w-10 text-sm" aria-label="Giảm số lượng" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button
            className="h-10 w-10 text-sm"
            aria-label="Tăng số lượng"
            onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" size="lg" className="flex-1" onClick={handleAddToCart} disabled={outOfStock}>
          Thêm Vào Giỏ
        </Button>
        <Button variant="primary" size="lg" className="flex-1" onClick={handleBuyNow} disabled={outOfStock}>
          {outOfStock ? "Hết Hàng" : "Mua Ngay"}
        </Button>
        <button
          aria-label={isWishlisted(product.id) ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
          onClick={() => toggle(product.id)}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-line"
        >
          <IconHeart filled={isWishlisted(product.id)} />
        </button>
      </div>

      <Button href={ZALO_CONTACT_URL} variant="ghost" size="md" className="mt-4 w-full">
        💬 Hỏi Qua Zalo
      </Button>

      <div className="mt-6 flex flex-col gap-2 text-xs text-muted">
        <p>✓ Giao hàng nhanh 2-4 ngày, miễn phí cho đơn từ {formatPrice(FREE_SHIPPING_THRESHOLD)}.</p>
        <p>✓ Đổi trả miễn phí trong 7 ngày nếu sản phẩm còn nguyên tem, chưa qua sử dụng.</p>
        <p>✓ Thông tin sản phẩm minh bạch, hỗ trợ tư vấn qua Zalo.</p>
      </div>
    </div>
  );
}
