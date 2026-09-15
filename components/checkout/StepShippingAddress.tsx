"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ShippingAddress } from "@/types/checkout";

export function StepShippingAddress({
  value,
  onNext,
  onBack,
}: {
  value: ShippingAddress;
  onNext: (address: ShippingAddress) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState(value);

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onNext(form);
      }}
    >
      <div>
        <label htmlFor="checkout-address" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Địa chỉ
        </label>
        <input
          id="checkout-address"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Số nhà, tên đường"
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="checkout-ward" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Phường / Xã
        </label>
        <input
          id="checkout-ward"
          required
          value={form.ward}
          onChange={(e) => setForm({ ...form, ward: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="checkout-city" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Tỉnh / Thành phố
        </label>
        <input
          id="checkout-city"
          required
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div className="mt-2 flex gap-3">
        <Button type="button" variant="secondary" size="lg" onClick={onBack}>
          Quay Lại
        </Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">
          Tiếp Tục
        </Button>
      </div>
    </form>
  );
}
