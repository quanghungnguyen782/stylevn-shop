"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <section className="border-t border-line bg-surface px-4 py-14 text-center md:px-8">
      <h2 className="font-display text-2xl md:text-3xl">Luôn cập nhật cùng chúng tôi.</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Nhận thông tin các đợt sale mới nhất và ưu đãi dành riêng cho bạn.
      </p>
      {status === "done" ? (
        <p className="mt-6 text-sm text-accent-dark">Cảm ơn bạn đã đăng ký!</p>
      ) : (
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("done");
          }}
        >
          <input
            type="email"
            required
            placeholder="Email của bạn"
            className="flex-1 border border-line bg-canvas px-4 py-3 text-sm outline-none focus:border-ink"
          />
          <Button type="submit" variant="primary">
            Đăng Ký
          </Button>
        </form>
      )}
    </section>
  );
}
