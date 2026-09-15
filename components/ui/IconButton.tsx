import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

export function IconButton({ className, children, ...rest }: IconButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-line/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
