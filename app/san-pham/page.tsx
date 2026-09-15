import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/product-service";
import { ProductListingClient } from "@/components/plp/ProductListingClient";

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm",
  description: "Khám phá toàn bộ sản phẩm thể thao chính hãng tại StyleVN.",
};

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense>
      <ProductListingClient products={products} title="Tất Cả Sản Phẩm" />
    </Suspense>
  );
}
