import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/product-service";
import { getBrandName, getCategoryName } from "@/lib/product-meta";
import { productJsonLd, SITE_URL } from "@/lib/seo";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Accordion } from "@/components/ui/Accordion";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} - ${getBrandName(product.brand)}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
    alternates: {
      canonical: `/san-pham/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const url = `${SITE_URL}/san-pham/${product.slug}`;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product, url)) }}
      />

      <nav className="mb-6 text-xs text-muted">
        <span>{getCategoryName(product.category)}</span>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs uppercase tracking-wide text-muted">{getBrandName(product.brand)}</p>
          <h1 className="mt-1 mb-4 font-display text-2xl md:text-3xl">{product.name}</h1>

          <ProductPurchasePanel product={product} />

          <div className="mt-10">
            <Accordion
              items={[
                { title: "Chi Tiết Sản Phẩm", content: <p>{product.description}</p> },
                {
                  title: "Vận Chuyển & Đổi Trả",
                  content: (
                    <p>
                      Giao hàng toàn quốc 2-4 ngày làm việc. Đổi trả miễn phí trong 7 ngày kể từ khi nhận
                      hàng nếu sản phẩm còn nguyên tem mác, chưa qua sử dụng.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl">Có Thể Bạn Sẽ Thích</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
