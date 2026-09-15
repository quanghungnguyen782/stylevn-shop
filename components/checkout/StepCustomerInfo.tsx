"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { CustomerInfo } from "@/types/checkout";

export function StepCustomerInfo({
  value,
  onNext,
}: {
  value: CustomerInfo;
  onNext: (info: CustomerInfo) => void;
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
        <label htmlFor="checkout-name" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Họ và tên
        </label>
        <input
          id="checkout-name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="checkout-email" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          id="checkout-email"
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="checkout-phone" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Số điện thoại
        </label>
        <input
          id="checkout-phone"
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="mt-2">
        Tiếp Tục
      </Button>
    </form>
  );
}
