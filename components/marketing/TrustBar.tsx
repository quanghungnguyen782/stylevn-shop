const POINTS = ["Hàng hiệu authentic", "Ảnh chụp thực tế", "Giao hàng toàn quốc", "Hỗ trợ qua Zalo"];

export function TrustBar() {
  return (
    <div className="border-b border-line bg-surface px-4 py-3 md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-1.5 text-center text-[11px] uppercase tracking-wide text-muted md:text-xs">
        {POINTS.map((point) => (
          <span key={point}>✓ {point}</span>
        ))}
      </div>
    </div>
  );
}
