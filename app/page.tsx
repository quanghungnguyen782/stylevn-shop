import {
  getAllProducts,
  getBestSellers,
  getFlashSaleProducts,
  getNewArrivals,
  getProductsByCategory,
} from "@/lib/product-service";
import { getAllBagProducts } from "@/lib/bag-product-service";
import { CATEGORIES } from "@/lib/constants";
import { Hero } from "@/components/marketing/Hero";
import { LuxuryShowcase } from "@/components/marketing/LuxuryShowcase";
import { FeaturedCategories } from "@/components/marketing/FeaturedCategories";
import { CollectionStory } from "@/components/marketing/CollectionStory";
import { BestSellerCarousel } from "@/components/marketing/BestSellerCarousel";
import { BrandStory } from "@/components/marketing/BrandStory";
import { TrustSection } from "@/components/marketing/TrustSection";
import { Newsletter } from "@/components/marketing/Newsletter";
import { ProductGrid } from "@/components/product/ProductGrid";

function pickModelImage(products: { images: string[] }[], fallback: string, exclude?: string): string {
  for (const p of products) {
    const modelShot = p.images.find((src) => src.includes("model") && src !== exclude);
    if (modelShot) return modelShot;
  }
  return fallback;
}

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const flashSale = await getFlashSaleProducts(8);
  const bestSellers = await getBestSellers(8);
  const newArrivals = await getNewArrivals(8);
  const bagProducts = (await getAllBagProducts()).slice(0, 8);

  const categoryTiles = await Promise.all(
    CATEGORIES.map(async (c) => {
      const products = await getProductsByCategory(c.slug);
      return {
        slug: c.slug,
        name: c.name,
        imageUrl: products[0]?.images[0] ?? "/images/placeholder-product.jpg",
      };
    })
  );

  const heroImage = pickModelImage(allProducts, allProducts[0]?.images[0] ?? "/images/placeholder-product.jpg");
  const storyImage = pickModelImage(
    allProducts.slice().reverse(),
    allProducts[allProducts.length - 1]?.images[0] ?? "/images/placeholder-product.jpg",
    heroImage
  );

  return (
    <>
      <Hero imageUrl={heroImage} />
      <LuxuryShowcase products={bagProducts} />
      <FeaturedCategories tiles={categoryTiles} />

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl">Mới Về</h2>
        </div>
        <ProductGrid products={newArrivals} />
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl md:text-3xl">Đang Giảm Giá Sâu</h2>
        </div>
        <ProductGrid products={flashSale} />
      </section>

      <CollectionStory imageUrl={storyImage} />
      <BestSellerCarousel products={bestSellers} />
      <BrandStory />
      <TrustSection />
      <Newsletter />
    </>
  );
}
