import Image from "next/image";
import Link from "next/link";

export interface CategoryTile {
  slug: string;
  name: string;
  href: string;
  imageUrl: string;
}

export function CategoryGrid({
  title,
  subtitle,
  tiles,
}: {
  title: string;
  subtitle?: string;
  tiles: CategoryTile[];
}) {
  return (
    <section className="px-4 py-12 md:px-8 md:py-16">
      <h2 className="mb-1 font-display text-2xl md:text-3xl">{title}</h2>
      {subtitle && <p className="mb-8 text-sm text-muted">{subtitle}</p>}
      <div className={subtitle ? "mt-8" : ""}>
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-6">
          {tiles.map((tile) => (
            <Link
              key={tile.slug}
              href={tile.href}
              className="group relative aspect-[3/4] w-[42%] shrink-0 snap-start overflow-hidden bg-canvas sm:w-auto sm:shrink"
            >
              <Image
                src={tile.imageUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 42vw, (max-width: 768px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-sm font-medium uppercase tracking-wide text-canvas">
                {tile.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
