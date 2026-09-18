import Link from "next/link";
import { BagProductCard } from "@/components/product/BagProductCard";
import type { BagProduct } from "@/types/bag-product";

export function LuxuryShowcase({ products }: { products: BagProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted">Authentic · Ảnh Chụp Thực Tế</p>
          <h2 className="font-display text-2xl md:text-3xl">Hàng Hiệu Mới Về</h2>
        </div>
        <Link href="/hang-hieu" className="text-sm underline-offset-4 hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <BagProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
