import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, SITE_NAME } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/product-service";
import { getCategoryName } from "@/lib/product-meta";
import { ProductListingClient } from "@/components/plp/ProductListingClient";
import { ProductListingSkeleton } from "@/components/plp/ProductListingSkeleton";
import type { CategorySlug } from "@/types/product";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

function isValidCategory(value: string): value is CategorySlug {
  return CATEGORIES.some((c) => c.slug === value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};
  const name = getCategoryName(category);
  return {
    title: name,
    description: `Mua ${name.toLowerCase()} chính hãng giảm giá tại ${SITE_NAME}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const products = await getProductsByCategory(category);
  const title = getCategoryName(category);

  return (
    <Suspense fallback={<ProductListingSkeleton title={title} />}>
      <ProductListingClient products={products} title={title} />
    </Suspense>
  );
}
