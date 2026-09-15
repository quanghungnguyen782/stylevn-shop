import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

interface CategoryTile {
  slug: string;
  name: string;
  imageUrl: string;
}

export function FeaturedCategories({ tiles }: { tiles: CategoryTile[] }) {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <h2 className="mb-8 font-display text-2xl md:text-3xl">Danh Mục Nổi Bật</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {tiles.map((tile) => {
          const category = CATEGORIES.find((c) => c.slug === tile.slug);
          return (
            <Link
              key={tile.slug}
              href={`/san-pham/${tile.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-canvas"
            >
              <Image
                src={tile.imageUrl}
                alt={category?.name ?? tile.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-medium uppercase tracking-wide text-canvas">
                {category?.name ?? tile.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
