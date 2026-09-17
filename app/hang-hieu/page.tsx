import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllBagProducts } from "@/lib/bag-product-service";
import { BagListingClient } from "@/components/product/BagListingClient";
import { SITE_NAME } from "@/lib/constants";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hàng Hiệu Chính Hãng",
  description: `Túi xách, ví, phụ kiện hàng hiệu chính hãng đã qua tuyển chọn tại ${SITE_NAME}.`,
};

export default async function BagListingPage() {
  const products = await getAllBagProducts();

  return (
    <Suspense fallback={null}>
      <BagListingClient products={products} />
    </Suspense>
  );
}
