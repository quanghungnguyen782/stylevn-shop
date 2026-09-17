import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBagProducts, getBagProductBySlug, getRelatedBagProducts } from "@/lib/bag-product-service";
import { ProductGallery } from "@/components/product/ProductGallery";
import { BagProductCard } from "@/components/product/BagProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getBagProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.brandName ? `${product.brandName} - ${product.name}` : product.name,
    openGraph: {
      title: product.name,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
    alternates: {
      canonical: `/hang-hieu/${product.slug}`,
    },
  };
}

export default async function BagProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getBagProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedBagProducts(product, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <nav className="mb-6 text-xs text-muted">
        <span>Hàng Hiệu</span>
        {product.itemCategoryName && (
          <>
            <span className="mx-1.5">/</span>
            <span>{product.itemCategoryName}</span>
          </>
        )}
        <span className="mx-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          {product.brandName && (
            <p className="text-xs uppercase tracking-wide text-muted">{product.brandName}</p>
          )}
          <h1 className="mt-1 mb-4 font-display text-2xl md:text-3xl">{product.name}</h1>

          <div className="mb-3 flex gap-2">
            {product.condition === "used" && <Badge tone="ink">Đã qua sử dụng</Badge>}
            {product.condition === "new" && <Badge tone="muted">Mới</Badge>}
          </div>

          <p className="mb-6 text-2xl font-semibold">
            {product.price ? formatPrice(product.price) : "Liên hệ để biết giá"}
          </p>

          <Button href="/lien-he" variant="primary" size="lg" className="w-full sm:w-auto">
            Liên Hệ Đặt Hàng
          </Button>

          <div className="mt-8 flex flex-col gap-2 text-xs text-muted">
            <p>Hàng hiệu chính hãng, đã qua kiểm định trước khi đăng bán.</p>
            <p>Liên hệ hotline hoặc Zalo để được tư vấn và xác nhận tình trạng sản phẩm.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl">Có Thể Bạn Sẽ Thích</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <BagProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getAllBagProducts();
  return products.map((p) => ({ slug: p.slug }));
}
