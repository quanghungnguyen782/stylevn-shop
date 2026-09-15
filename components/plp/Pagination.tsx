import clsx from "clsx";

function getVisiblePages(page: number, totalPages: number): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const rangeStart = Math.max(2, page - delta);
  const rangeEnd = Math.min(totalPages - 1, page + delta);

  range.push(1);
  if (rangeStart > 2) range.push("ellipsis");
  for (let i = rangeStart; i <= rangeEnd; i++) range.push(i);
  if (rangeEnd < totalPages - 1) range.push("ellipsis");
  if (totalPages > 1) range.push(totalPages);

  return range;
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const visible = getVisiblePages(page, totalPages);

  return (
    <nav className="mt-12 flex flex-wrap justify-center gap-2" aria-label="Phân trang">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="h-11 w-11 shrink-0 border border-line text-sm disabled:opacity-30"
        aria-label="Trang trước"
      >
        ‹
      </button>
      {visible.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} className="flex h-11 w-11 shrink-0 items-center justify-center text-sm text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={clsx(
              "h-11 w-11 shrink-0 border text-sm",
              p === page ? "border-ink bg-ink text-canvas" : "border-line hover:border-ink"
            )}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="h-11 w-11 shrink-0 border border-line text-sm disabled:opacity-30"
        aria-label="Trang sau"
      >
        ›
      </button>
    </nav>
  );
}
