import { getBrandName } from "@/lib/product-meta";
import { SITE_NAME } from "@/lib/constants";
import type { Product } from "@/types/product";
import type { BagProduct } from "@/types/bag-product";

export const SITE_URL = "https://lyleauthentic.onrender.com";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Chuyên hàng hiệu authentic, ảnh chụp từ sản phẩm thật, cùng đồ thể thao chính hãng giảm giá (Adidas, Nike, Asics, Li-Ning, 361 Degrees, Lacoste).",
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

export function bagProductJsonLd(product: BagProduct, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    ...(product.brandName ? { brand: { "@type": "Brand", name: product.brandName } } : {}),
    ...(product.condition
      ? {
          itemCondition:
            product.condition === "used"
              ? "https://schema.org/UsedCondition"
              : "https://schema.org/NewCondition",
        }
      : {}),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "VND",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
