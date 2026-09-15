import clsx from "clsx";

const STEPS = ["Thông Tin", "Địa Chỉ", "Vận Chuyển", "Thanh Toán", "Xác Nhận"];

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-3 text-xs uppercase tracking-wide">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <li key={step} className="flex items-center gap-2">
            <span
              className={clsx(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[11px]",
                isActive && "border-ink bg-ink text-canvas",
                isDone && "border-ink bg-ink text-canvas",
                !isActive && !isDone && "border-line text-muted"
              )}
            >
              {stepNum}
            </span>
            <span className={clsx(isActive ? "text-ink" : "text-muted")}>{step}</span>
            {stepNum < STEPS.length && <span className="mx-1 text-line">—</span>}
          </li>
        );
      })}
    </ol>
  );
}
