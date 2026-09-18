import type { Metadata } from "next";
import Link from "next/link";
import { BRANDS, SITE_NAME } from "@/lib/constants";
import { getDistinctBagBrands } from "@/lib/bag-product-service";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Thương Hiệu",
  description: `Danh sách thương hiệu đang có sản phẩm tại ${SITE_NAME}.`,
};

export default async function BrandsPage() {
  const luxuryBrands = await getDistinctBagBrands();

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-14 md:px-8">
      <h1 className="mb-2 font-display text-3xl md:text-4xl">Thương Hiệu</h1>
      <p className="mb-12 text-sm text-muted">Chọn một thương hiệu để xem toàn bộ sản phẩm.</p>

      {luxuryBrands.length > 0 && (
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">Hàng Hiệu</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {luxuryBrands.map((b) => (
              <Link
                key={b.slug}
                href={`/hang-hieu?brand=${b.slug}`}
                className="font-display text-xl transition-colors hover:text-accent md:text-2xl"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">Thể Thao</p>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/san-pham?brand=${b.slug}`}
              className="font-display text-xl transition-colors hover:text-accent md:text-2xl"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
