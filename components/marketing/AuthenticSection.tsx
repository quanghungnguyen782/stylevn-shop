import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function AuthenticSection({ images }: { images: string[] }) {
  const tiles = images.slice(0, 4);
  if (tiles.length === 0) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="grid grid-cols-2 gap-1">
        {tiles.map((src) => (
          <div key={src} className="relative aspect-square">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start justify-center gap-4 bg-ink px-6 py-14 text-canvas md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-canvas/70">Authentic. Real. Trusted.</p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl">Ảnh Chụp Thực Tế</h2>
        <p className="max-w-sm text-sm leading-relaxed text-canvas/80">
          Ảnh chụp trực tiếp từ sản phẩm thật giúp bạn nhìn rõ trước khi quyết định — không dùng ảnh mạng, không
          chỉnh sửa sai lệch so với thực tế.
        </p>
        <Button href="/hang-hieu" variant="accent">
          Xem Sản Phẩm
        </Button>
      </div>
    </section>
  );
}
