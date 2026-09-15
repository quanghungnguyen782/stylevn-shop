export function ProductListingSkeleton({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">&nbsp;</p>
        </div>
        <div className="h-10 w-32 animate-pulse bg-line/50" />
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-3/4 animate-pulse bg-line/50" />
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] animate-pulse bg-line/50" />
              <div className="mt-3 h-3 w-1/2 animate-pulse bg-line/50" />
              <div className="mt-2 h-4 w-3/4 animate-pulse bg-line/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
