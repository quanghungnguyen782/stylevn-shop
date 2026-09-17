import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="relative flex h-[85vh] min-h-[520px] w-full items-end overflow-hidden bg-ink">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="relative z-10 px-4 pb-16 text-canvas md:px-8 md:pb-24">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-canvas/80">Hàng Hiệu Authentic</p>
        <h1 className="max-w-xl font-display text-4xl leading-[1.1] md:text-6xl">
          Hàng hiệu authentic đã qua kiểm định, đồ thể thao chính hãng giảm giá.
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
    </section>
  );
}
