import {
  getAllProducts,
  getBestSellers,
  getFlashSaleProducts,
  getNewArrivals,
  getProductsByCategory,
} from "@/lib/product-service";
import { getAllBagProducts, getDistinctBagBrands, getDistinctBagCategories } from "@/lib/bag-product-service";
import { UNASSIGNED_CATEGORY_SLUG } from "@/lib/bag-post-parser";
import { BRANDS, CATEGORIES } from "@/lib/constants";
import { discountPercent } from "@/lib/format";
import { Hero } from "@/components/marketing/Hero";
import { LuxuryShowcase } from "@/components/marketing/LuxuryShowcase";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import type { CategoryTile } from "@/components/marketing/CategoryGrid";
import { FeaturedBrands } from "@/components/marketing/FeaturedBrands";
import { BestSellerCarousel } from "@/components/marketing/BestSellerCarousel";
import { BrandStory } from "@/components/marketing/BrandStory";
import { TrustSection } from "@/components/marketing/TrustSection";
import { Newsletter } from "@/components/marketing/Newsletter";
import { ProductGrid } from "@/components/product/ProductGrid";

const PLACEHOLDER = "/images/placeholder-product.jpg";

// Hand-picked lifestyle/model shots for the homepage hero carousel — the
// catalog only tags ~60 images as "model" shots (all Adidas), and most are
// near-duplicates or have rendering artifacts, so this is curated rather
// than the first N in catalog order.
const HERO_SLUGS = [
  "ao-polo-poly-jm1203",
  "ao-gio-co-mu-jm5742",
  "bo-quan-ao-the-thao-jx5529",
  "ao-t-shirt-poly-ji8129",
  "quan-short-chun-cotton-tong-hop-jf3348",
];

function pickHeroImages(products: { slug: string; images: string[] }[], fallback: string): string[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const images = HERO_SLUGS.map((slug) => bySlug.get(slug)?.images[0]).filter((src): src is string => Boolean(src));
  return images.length > 0 ? images : [fallback];
}

export default async function HomePage() {
  const allProducts = await getAllProducts();
  const flashSale = await getFlashSaleProducts(8);
  const bestSellers = await getBestSellers(8);
  const newArrivals = await getNewArrivals(8);
  const bagProducts = (await getAllBagProducts()).slice(0, 8);
  const luxuryBrands = await getDistinctBagBrands();
  const bagCategories = await getDistinctBagCategories();

  const [aoProducts, giayProducts, phuKienProducts] = await Promise.all([
    getProductsByCategory("ao"),
    getProductsByCategory("giay"),
    getProductsByCategory("phu-kien"),
  ]);

  const heroImages = pickHeroImages(allProducts, allProducts[0]?.images[0] ?? PLACEHOLDER);

  const namProduct = allProducts.find((p) => p.gender === "Nam");
  const nuProduct = allProducts.find((p) => p.gender === "Nữ");
  const saleMaxDiscount = flashSale.length > 0 ? Math.max(...flashSale.map(discountPercent)) : 0;

  const entryTiles: CategoryTile[] = [
    { slug: "hang-hieu", name: "Hàng Hiệu", href: "/hang-hieu", imageUrl: bagProducts[0]?.images[0] ?? PLACEHOLDER },
    { slug: "sale", name: "Sale", href: "/san-pham?sale=1", imageUrl: flashSale[0]?.images[0] ?? PLACEHOLDER },
    { slug: "nam", name: "Nam", href: "/san-pham?gender=Nam", imageUrl: namProduct?.images[0] ?? PLACEHOLDER },
    { slug: "nu", name: "Nữ", href: "/san-pham?gender=N%E1%BB%AF", imageUrl: nuProduct?.images[0] ?? PLACEHOLDER },
    { slug: "giay", name: "Giày & Dép", href: "/danh-muc/giay", imageUrl: giayProducts[0]?.images[0] ?? PLACEHOLDER },
    {
      slug: "tui-xach",
      name: "Túi Xách",
      href: "/hang-hieu?category=tui-xach",
      imageUrl: bagCategories.find((c) => c.slug === "tui-xach")?.coverImage ?? bagProducts[0]?.images[0] ?? PLACEHOLDER,
    },
    { slug: "quan-ao", name: "Quần Áo", href: "/san-pham?category=ao", imageUrl: aoProducts[0]?.images[0] ?? PLACEHOLDER },
    { slug: "phu-kien", name: "Phụ Kiện", href: "/danh-muc/phu-kien", imageUrl: phuKienProducts[0]?.images[0] ?? PLACEHOLDER },
  ];

  // "Chưa xác định" is a real filter on the /hang-hieu listing page so
  // unclassified items stay findable, but it isn't a real shopping category —
  // never surface it as a marketing tile on the homepage.
  const discoveryTiles: CategoryTile[] = bagCategories
    .filter((c) => c.slug !== UNASSIGNED_CATEGORY_SLUG)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      href: `/hang-hieu?category=${c.slug}`,
      imageUrl: c.coverImage,
    }));

  const brandLinks = [
    ...luxuryBrands.map((b) => ({ slug: b.slug, name: b.name, href: `/hang-hieu?brand=${b.slug}` })),
    ...BRANDS.map((b) => ({ slug: b.slug, name: b.name, href: `/san-pham?brand=${b.slug}` })),
  ];

  return (
    <>
      <Hero images={heroImages} />

      <CategoryGrid title="Danh Mục Nổi Bật" tiles={entryTiles} />

      <LuxuryShowcase products={bagProducts} />

      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="mb-1 font-display text-2xl md:text-3xl">Mới Về</h2>
        <p className="mb-8 text-sm text-muted">Những sản phẩm mới nhất vừa được cập nhật.</p>
        <ProductGrid products={newArrivals} />
      </section>

      <section className="bg-surface px-4 py-12 md:px-8 md:py-16">
        <h2 className="mb-1 font-display text-2xl md:text-3xl">
          {saleMaxDiscount > 0 ? `Sale Đến ${saleMaxDiscount}%` : "Đang Giảm Giá Sâu"}
        </h2>
        <p className="mb-8 text-sm text-muted">Những món đồ chính hãng với mức giá tốt hơn.</p>
        <ProductGrid products={flashSale} />
      </section>

      <FeaturedBrands brands={brandLinks} />

      <div id="ban-chay">
        <BestSellerCarousel products={bestSellers} />
      </div>

      {discoveryTiles.length > 0 && (
        <CategoryGrid title="Khám Phá Theo Nhu Cầu" tiles={discoveryTiles} />
      )}

      <BrandStory />
      <TrustSection />
      <Newsletter />
    </>
  );
}
