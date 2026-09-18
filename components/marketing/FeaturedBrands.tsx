import Link from "next/link";

export interface BrandLink {
  slug: string;
  name: string;
  href: string;
}

export function FeaturedBrands({ brands }: { brands: BrandLink[] }) {
  if (brands.length === 0) return null;

  return (
    <section className="border-t border-line px-4 py-14 md:px-8 md:py-16">
      <p className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-muted">Thương Hiệu Được Yêu Thích</p>
      <h2 className="mb-10 text-center font-display text-2xl md:text-3xl">Chọn Theo Thương Hiệu</h2>
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={b.href}
            className="font-display text-lg uppercase tracking-wide text-muted transition-colors hover:text-ink md:text-xl"
          >
            {b.name}
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/thuong-hieu" className="text-sm underline underline-offset-4 hover:text-accent">
          Xem tất cả thương hiệu →
        </Link>
      </div>
    </section>
  );
}
