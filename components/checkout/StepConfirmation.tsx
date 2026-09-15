import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function StepConfirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="max-w-md">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-canvas">
        ✓
      </div>
      <h2 className="font-display text-2xl">Cảm ơn bạn đã đặt hàng!</h2>
      <p className="mt-2 text-sm text-muted">
        Mã đơn hàng của bạn là <span className="font-medium text-ink">{orderNumber}</span>. Đây là đơn hàng
        thử nghiệm — chưa có giao dịch thanh toán thật nào được thực hiện.
      </p>
      <Button href="/san-pham" variant="primary" size="lg" className="mt-6">
        Tiếp Tục Mua Sắm
      </Button>
      <p className="mt-4">
        <Link href="/" className="text-xs text-muted underline-offset-2 hover:underline">
          Về trang chủ
        </Link>
      </p>
    </div>
  );
}
