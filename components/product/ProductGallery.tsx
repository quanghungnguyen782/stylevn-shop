"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/ui/icons";

const SWIPE_THRESHOLD_PX = 40;

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const hasMultiple = images.length > 1;
  const touchStartX = useRef<number | null>(null);

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    go(delta > 0 ? -1 : 1);
  }

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen]);

  return (
    <div>
      <div
        className="relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-canvas"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setFullscreen(true)}
      >
        <Image
          src={images[index]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {hasMultiple && (
          <>
            <button
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90"
            >
              <IconChevronLeft width={18} height={18} />
            </button>
            <button
              aria-label="Ảnh sau"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90"
            >
              <IconChevronRight width={18} height={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-canvas md:hidden">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 hidden gap-2 md:flex">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className={clsx(
                "relative h-20 w-16 overflow-hidden border",
                i === index ? "border-ink" : "border-transparent"
              )}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95"
        >
          <button
            aria-label="Đóng"
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-ink"
          >
            <IconClose width={18} height={18} />
          </button>

          <div
            className="relative h-full w-full"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image src={images[index]} alt={alt} fill sizes="100vw" className="object-contain" priority />
          </div>

          {hasMultiple && (
            <>
              <button
                aria-label="Ảnh trước"
                onClick={() => go(-1)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink"
              >
                <IconChevronLeft width={20} height={20} />
              </button>
              <button
                aria-label="Ảnh sau"
                onClick={() => go(1)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink"
              >
                <IconChevronRight width={20} height={20} />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-surface/90 px-3 py-1.5 text-xs text-ink">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
