"use client";

import { useEffect } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { IconClose } from "@/components/ui/icons";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: string;
  children: ReactNode;
  widthClassName?: string;
}

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  widthClassName = "w-full sm:w-[420px]",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 transition-opacity duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
        tabIndex={open ? 0 : -1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          "absolute top-0 bottom-0 flex flex-col bg-surface shadow-[0_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out",
          side === "right" ? "right-0" : "left-0",
          widthClassName,
          open
            ? "translate-x-0"
            : side === "right"
              ? "translate-x-full"
              : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          {title ? (
            <h2 className="font-display text-lg">{title}</h2>
          ) : (
            <span />
          )}
          <IconButton aria-label="Đóng" onClick={onClose}>
            <IconClose width={16} height={16} />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
