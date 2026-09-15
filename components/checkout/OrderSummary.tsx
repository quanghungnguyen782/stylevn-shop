import Image from "next/image";
import { getProductByIdSync } from "@/lib/products-client";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/types/cart";

export function OrderSummary({
  lines,
  shippingCost,
}: {
  lines: CartLine[];
  shippingCost: number;
}) {
  const subtotal = lines.reduce((sum, line) => {
    const product = getProductByIdSync(line.productId);
    return product ? sum + product.price * line.qty : sum;
  }, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="border border-line p-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">Đơn Hàng Của Bạn</h2>
      <div className="flex flex-col gap-3">
        {lines.map((line) => {
          const product = getProductByIdSync(line.productId);
          if (!product) return null;
          return (
            <div key={`${line.productId}-${line.size}`} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-canvas">
                <Image src={product.images[0]} alt={product.name} fill sizes="56px" className="object-cover" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-canvas">
                  {line.qty}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm">{product.name}</p>
                <p className="text-xs text-muted">Size: {line.size}</p>
              </div>
              <p className="text-sm">{formatPrice(product.price * line.qty)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-5 border-t border-line pt-4 text-sm">
        <div className="mb-2 flex justify-between">
          <span className="text-muted">Tạm tính</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-muted">Vận chuyển</span>
          <span>{shippingCost > 0 ? formatPrice(shippingCost) : "—"}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
          <span>Tổng cộng</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
