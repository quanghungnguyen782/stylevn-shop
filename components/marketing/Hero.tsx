"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const AUTO_ADVANCE_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

export function Hero({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const dragStartX = useRef<number | null>(null);

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMultiple, index]);

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current == null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    go(delta > 0 ? -1 : 1);
  }

  return (
    <section
      className="relative flex h-[85vh] min-h-[520px] w-full cursor-grab items-end overflow-hidden bg-ink active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={clsx(
            "object-cover transition-opacity duration-700 ease-out",
            i === index ? "opacity-90" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />

      <div className="relative z-10 flex w-full items-end justify-between px-4 pb-16 md:px-8 md:pb-24">
        <div className="text-canvas">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-canvas/80">Authentic Pieces. Better Prices.</p>
          <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.1] md:text-6xl">
            Hàng hiệu authentic, đồ thể thao chính hãng giảm giá.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/hang-hieu" variant="accent" size="lg">
              Xem Hàng Hiệu
            </Button>
            <Link
              href="/san-pham?sale=1"
              className="inline-flex items-center justify-center gap-2 border border-canvas px-8 py-4 text-base uppercase tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink"
            >
              Xem Sale
            </Link>
          </div>
        </div>

        {hasMultiple && (
          <div className="hidden gap-2 md:flex">
            {images.map((src, i) => (
              <button
                key={src}
                aria-label={`Ảnh ${i + 1}`}
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-canvas" : "w-1.5 bg-canvas/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
