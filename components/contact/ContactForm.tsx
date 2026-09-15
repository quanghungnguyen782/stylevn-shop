"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-sm text-accent-dark">Đã gửi yêu cầu! Chúng tôi sẽ liên hệ lại sớm nhất.</p>;
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Họ và tên</label>
        <input required className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink" />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Email</label>
        <input required type="email" className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink" />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Nội dung</label>
        <textarea required rows={4} className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink" />
      </div>
      <Button type="submit" variant="primary" size="lg">
        Gửi Yêu Cầu
      </Button>
    </form>
  );
}
