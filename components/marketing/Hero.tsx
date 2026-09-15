import Image from "next/image";
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
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-canvas/80">Ưu Đãi Mới</p>
        <h1 className="max-w-xl font-display text-4xl leading-[1.1] md:text-6xl">
          Thiết kế cho phong cách tự tin mỗi ngày.
        </h1>
        <div className="mt-8">
          <Button href="/san-pham" variant="accent" size="lg">
            Mua Ngay
          </Button>
        </div>
      </div>
    </section>
  );
}
