import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "accent" | "ink" | "muted";

const tones: Record<Tone, string> = {
  accent: "bg-accent text-canvas",
  ink: "bg-ink text-canvas",
  muted: "bg-surface text-muted border border-line",
};

export function Badge({
  tone = "accent",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 text-[11px] font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
