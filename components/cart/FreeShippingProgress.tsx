import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  if (subtotal <= 0) return null;

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return (
      <p className="border-b border-line px-5 py-3 text-xs text-accent-dark">
        Đơn hàng của bạn được miễn phí vận chuyển.
      </p>
    );
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="border-b border-line px-5 py-3">
      <p className="mb-2 text-xs text-muted">
        Mua thêm <span className="font-semibold text-ink">{formatPrice(remaining)}</span> để được miễn phí vận chuyển.
      </p>
      <div className="h-1 w-full bg-line">
        <div className="h-1 bg-accent transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
