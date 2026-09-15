"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
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
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90"
            >
              <IconChevronLeft width={18} height={18} />
            </button>
            <button
              aria-label="Ảnh sau"
              onClick={() => go(1)}
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
    </div>
  );
}
