import { getBrandName } from "@/lib/product-meta";
import { SITE_NAME } from "@/lib/constants";
import type { Product } from "@/types/product";

export const SITE_URL = "https://stylevn-shop.onrender.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Điểm đến đa thương hiệu thể thao cao cấp: Adidas, Nike, Asics, Li-Ning, 361 Degrees, Lacoste.",
  };
}

export function productJsonLd(product: Product, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: getBrandName(product.brand),
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "VND",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };
}
