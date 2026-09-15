import clsx from "clsx";

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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-12 flex justify-center gap-2" aria-label="Phân trang">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="h-9 w-9 border border-line text-sm disabled:opacity-30"
        aria-label="Trang trước"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={clsx(
            "h-9 w-9 border text-sm",
            p === page ? "border-ink bg-ink text-canvas" : "border-line hover:border-ink"
          )}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="h-9 w-9 border border-line text-sm disabled:opacity-30"
        aria-label="Trang sau"
      >
        ›
      </button>
    </nav>
  );
}
