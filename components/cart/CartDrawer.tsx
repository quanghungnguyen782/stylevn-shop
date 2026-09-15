"use client";

import { useMemo } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";
import { useCart } from "@/lib/cart-context";
import { getProductByIdSync } from "@/lib/products-client";

export function CartDrawer() {
  const { lines, isOpen, closeCart } = useCart();

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = getProductByIdSync(line.productId);
        return product ? sum + product.price * line.qty : sum;
      }, 0),
    [lines]
  );

  return (
    <Drawer open={isOpen} onClose={closeCart} title="Giỏ Hàng" side="right">
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
        </div>
      ) : (
        <>
          <FreeShippingProgress subtotal={subtotal} />
          <div>
            {lines.map((line) => (
              <CartLineItem key={`${line.productId}-${line.size}`} line={line} />
            ))}
          </div>
        </>
      )}
      {lines.length > 0 && <CartSummary subtotal={subtotal} onCheckoutClick={closeCart} />}
    </Drawer>
  );
}
