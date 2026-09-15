"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { SHIPPING_METHODS } from "@/types/checkout";
import type { ShippingMethodId } from "@/types/checkout";

export function StepShippingMethod({
  value,
  onNext,
  onBack,
}: {
  value: ShippingMethodId;
  onNext: (method: ShippingMethodId) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState(value);

  return (
    <div className="flex max-w-md flex-col gap-4">
      {SHIPPING_METHODS.map((method) => (
        <label
          key={method.id}
          className={
            selected === method.id
              ? "flex cursor-pointer items-center justify-between border border-ink p-4"
              : "flex cursor-pointer items-center justify-between border border-line p-4"
          }
        >
          <span className="flex items-start gap-3">
            <input
              type="radio"
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="mt-1 h-4 w-4 accent-ink"
            />
            <span>
              <span className="block text-sm font-medium">{method.label}</span>
              <span className="block text-xs text-muted">{method.description}</span>
            </span>
          </span>
          <span className="text-sm font-medium">{formatPrice(method.price)}</span>
        </label>
      ))}
      <div className="mt-2 flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack}>
          Quay Lại
        </Button>
        <Button type="button" variant="primary" size="lg" className="flex-1" onClick={() => onNext(selected)}>
          Tiếp Tục
        </Button>
      </div>
    </div>
  );
}
