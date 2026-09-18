import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function CollectionStory({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative aspect-[4/5]">
        <Image src={imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 bg-surface px-6 py-14 md:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Authentic Edit</p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl">Tuyển Chọn Cho Phong Cách Sống</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Những món đồ hiệu authentic được chọn lọc kỹ càng, phù hợp với gu thẩm mỹ hiện đại và nhịp sống hôm nay.
        </p>
        <Button href="/hang-hieu" variant="secondary">
          Khám Phá Bộ Sưu Tập
        </Button>
      </div>
    </section>
  );
}
