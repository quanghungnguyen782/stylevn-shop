import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/product-service";
import { getAllBagProducts } from "@/lib/bag-product-service";
import { CATEGORIES } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const bagProducts = await getAllBagProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/san-pham`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/hang-hieu`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/lien-he`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/ve-thuong-hieu`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/danh-muc/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/san-pham/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const bagProductRoutes: MetadataRoute.Sitemap = bagProducts.map((p) => ({
    url: `${SITE_URL}/hang-hieu/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...bagProductRoutes];
}
