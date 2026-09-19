import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllBagProducts } from "@/lib/bag-product-service";
import { BagListingClient } from "@/components/product/BagListingClient";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hàng Hiệu Chính Hãng",
  description: `Túi xách, ví, phụ kiện hàng hiệu chính hãng đã qua tuyển chọn tại ${SITE_NAME}.`,
};

export default async function BagListingPage() {
  const products = await getAllBagProducts();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Hàng Hiệu Chính Hãng", url: `${SITE_URL}/hang-hieu` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Suspense fallback={null}>
        <BagListingClient products={products} />
      </Suspense>
    </>
  );
}
