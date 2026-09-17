import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import type { BagProduct } from "@/types/bag-product";

export function BagProductCard({ product }: { product: BagProduct }) {
  const cover = product.images[0];

  return (
    <Link href={`/hang-hieu/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.condition === "used" && <Badge tone="ink">Đã qua sử dụng</Badge>}
          {product.condition === "new" && <Badge tone="muted">Mới</Badge>}
        </div>
        {product.displayId != null && (
          <div className="absolute right-2 top-2 z-10">
            <Badge tone="muted">#{product.displayId}</Badge>
          </div>
        )}
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            Không có ảnh
          </div>
        )}
      </div>

      <div className="mt-3">
        {product.brandName && (
          <p className="text-[11px] uppercase tracking-wide text-muted">{product.brandName}</p>
        )}
        <p className="mt-0.5 line-clamp-1 text-sm">{product.name}</p>
        <div className="mt-1">
          <span className="text-sm font-semibold">
            {product.price ? formatPrice(product.price) : "Liên hệ"}
          </span>
        </div>
      </div>
    </Link>
  );
}
