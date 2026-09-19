import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/product-service";
import { ProductListingClient } from "@/components/plp/ProductListingClient";
import { ProductListingSkeleton } from "@/components/plp/ProductListingSkeleton";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm",
  description: `Khám phá toàn bộ sản phẩm thể thao chính hãng tại ${SITE_NAME}.`,
};

export default async function AllProductsPage() {
  const products = await getAllProducts();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Trang chủ", url: SITE_URL },
    { name: "Tất Cả Sản Phẩm", url: `${SITE_URL}/san-pham` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Suspense fallback={<ProductListingSkeleton title="Tất Cả Sản Phẩm" />}>
        <ProductListingClient products={products} title="Tất Cả Sản Phẩm" />
      </Suspense>
    </>
  );
}
