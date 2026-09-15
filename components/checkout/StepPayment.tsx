"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { PaymentMethodId } from "@/types/checkout";

const OPTIONS: { id: PaymentMethodId; label: string; description: string }[] = [
  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", description: "Trả tiền mặt khi nhận sản phẩm" },
  { id: "bank_transfer", label: "Chuyển khoản ngân hàng", description: "Thông tin chuyển khoản gửi qua email" },
];

export function StepPayment({
  value,
  onSubmit,
  onBack,
  submitting,
}: {
  value: PaymentMethodId;
  onSubmit: (method: PaymentMethodId) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  const [selected, setSelected] = useState(value);

  return (
    <div className="flex max-w-md flex-col gap-4">
      {OPTIONS.map((option) => (
        <label
          key={option.id}
          className={
            selected === option.id
              ? "flex cursor-pointer items-start gap-3 border border-ink p-4"
              : "flex cursor-pointer items-start gap-3 border border-line p-4"
          }
        >
          <input
            type="radio"
            checked={selected === option.id}
            onChange={() => setSelected(option.id)}
            className="mt-1 h-4 w-4 accent-ink"
          />
          <span>
            <span className="block text-sm font-medium">{option.label}</span>
            <span className="block text-xs text-muted">{option.description}</span>
          </span>
        </label>
      ))}
      <p className="text-xs text-muted">
        Đây là môi trường thử nghiệm — chưa tích hợp cổng thanh toán thật, đơn hàng sẽ không được xử lý.
      </p>
      <div className="mt-2 flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack}>
          Quay Lại
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="flex-1"
          disabled={submitting}
          onClick={() => onSubmit(selected)}
        >
          {submitting ? "Đang Xử Lý..." : "Đặt Hàng"}
        </Button>
      </div>
    </div>
  );
}
