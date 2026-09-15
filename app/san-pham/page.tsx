import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/product-service";
import { ProductListingClient } from "@/components/plp/ProductListingClient";
import { ProductListingSkeleton } from "@/components/plp/ProductListingSkeleton";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm",
  description: `Khám phá toàn bộ sản phẩm thể thao chính hãng tại ${SITE_NAME}.`,
};

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<ProductListingSkeleton title="Tất Cả Sản Phẩm" />}>
      <ProductListingClient products={products} title="Tất Cả Sản Phẩm" />
    </Suspense>
  );
}
