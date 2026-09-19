"use client";

import { useMemo } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { WishlistLineItem } from "@/components/wishlist/WishlistLineItem";
import { useWishlist } from "@/lib/wishlist-context";
import { getProductByIdSync } from "@/lib/products-client";
import type { Product } from "@/types/product";

export function WishlistDrawer() {
  const { ids, isOpen, closeWishlist } = useWishlist();

  const products = useMemo(
    () => ids.map(getProductByIdSync).filter((p): p is Product => Boolean(p)),
    [ids]
  );

  return (
    <Drawer open={isOpen} onClose={closeWishlist} title="Yêu Thích" side="right">
      {products.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-muted">Danh sách yêu thích của bạn đang trống.</p>
          <Button href="/san-pham" variant="secondary" size="sm" onClick={closeWishlist}>
            Tiếp Tục Mua Sắm
          </Button>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <WishlistLineItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </Drawer>
  );
}
