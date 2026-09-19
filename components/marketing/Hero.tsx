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
    // Split layout instead of one full-bleed background image: the curated
    // photos are all square studio shots, and stretching a square image to
    // cover a wide/short full-bleed band always forces a bad trade-off
    // (crop the face or crop the body). A narrower, near-square image column
    // needs almost no cropping for the same photos, and the text no longer
    // needs a dark gradient sitting on top of the product to stay readable.
    <section className="relative flex w-full flex-col overflow-hidden bg-ink lg:h-[85vh] lg:min-h-[600px] lg:flex-row">
      <div className="order-2 flex flex-col justify-center px-6 py-12 text-canvas sm:px-10 sm:py-16 lg:order-1 lg:w-[46%] lg:px-10 lg:py-0 xl:px-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-canvas/80">Authentic Pieces · Better Prices</p>
        {/* At lg+ the panel is a fixed 46% of viewport width, so the font
            size is tied to vw (not a fixed breakpoint size) to keep scaling
            in lockstep with the panel — otherwise the nowrap lines below
            overflow the panel on narrower lg screens (~1024-1279px). */}
        <h1 className="font-display text-[2rem] font-semibold leading-[1.02] sm:text-4xl md:text-5xl lg:text-[clamp(1.75rem,3.4vw,3.5rem)]">
          <span className="block whitespace-nowrap">Hàng hiệu authentic</span>
          <span className="block whitespace-nowrap">Thể thao chính hãng</span>
          <span className="block whitespace-nowrap">Giá tốt hơn</span>
        </h1>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/hang-hieu" variant="accent" size="lg">
            Xem Hàng Authentic
          </Button>
          <Link
            href="/san-pham?sale=1"
            className="inline-flex items-center justify-center gap-2 border border-canvas px-8 py-4 text-base uppercase tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink"
          >
            Xem Sale
          </Link>
        </div>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-wide text-canvas/60 md:text-xs">
          <span>✓ Cam kết chính hãng</span>
          <span>✓ Đổi trả rõ ràng</span>
          <span>✓ Giao hàng toàn quốc</span>
        </p>
      </div>

      <div
        className="relative order-1 h-[58vh] min-h-[380px] w-full cursor-grab overflow-hidden active:cursor-grabbing lg:order-2 lg:h-full lg:w-[54%]"
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
            sizes="(min-width: 1024px) 54vw, 100vw"
            className={clsx(
              "object-cover object-top transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {hasMultiple && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink/25 px-3 py-2 backdrop-blur-sm lg:bottom-6 lg:right-6">
            {images.map((src, i) => (
              <button
                key={src}
                aria-label={`Ảnh ${i + 1}`}
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-canvas" : "w-1.5 bg-canvas/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
