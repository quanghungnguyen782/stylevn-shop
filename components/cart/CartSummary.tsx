import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function CartSummary({ subtotal, onCheckoutClick }: { subtotal: number; onCheckoutClick?: () => void }) {
  return (
    <div className="border-t border-line px-5 py-5">
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted">Tạm tính</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="mb-4 flex justify-between text-sm">
        <span className="text-muted">Vận chuyển</span>
        <span>Tính ở bước thanh toán</span>
      </div>
      <Button href="/checkout" onClick={onCheckoutClick} variant="primary" size="lg" className="w-full">
        Thanh Toán
      </Button>
    </div>
  );
}
