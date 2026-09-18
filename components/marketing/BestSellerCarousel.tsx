import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/product";

export function BestSellerCarousel({ products }: { products: Product[] }) {
  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <h2 className="mb-8 font-display text-2xl md:text-3xl">Bán Chạy Nhất</h2>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {products.map((product) => (
          <div key={product.id} className="w-[46%] shrink-0 snap-start sm:w-[32%] md:w-[23%]">
            <div className="mb-2">
              <Badge tone="ink">Bán Chạy</Badge>
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
