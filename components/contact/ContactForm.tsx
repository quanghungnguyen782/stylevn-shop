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
        <label htmlFor="contact-name" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Họ và tên
        </label>
        <input id="contact-name" required className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink" />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          id="contact-email"
          required
          type="email"
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-xs uppercase tracking-wide text-muted">
          Nội dung
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </div>
      <Button type="submit" variant="primary" size="lg">
        Gửi Yêu Cầu
      </Button>
    </form>
  );
}
