import type { Metadata } from "next";
import { getAllBagProducts } from "@/lib/bag-product-service";
import { BagProductCard } from "@/components/product/BagProductCard";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hàng Hiệu Chính Hãng",
  description: `Túi xách, ví, phụ kiện hàng hiệu chính hãng đã qua tuyển chọn tại ${SITE_NAME}.`,
};

export default async function BagListingPage() {
  const products = await getAllBagProducts();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-8 font-display text-2xl md:text-3xl">Hàng Hiệu Chính Hãng</h1>

      {products.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          Hiện chưa có sản phẩm nào, vui lòng quay lại sau.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <BagProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
