"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";

export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="StyleVN" widthClassName="w-[85%] sm:w-[380px]">
      <nav className="flex flex-col px-5 py-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="border-b border-line py-4 text-sm uppercase tracking-wide"
          >
            {link.label}
          </Link>
        ))}
        <p className="mt-6 mb-2 text-xs uppercase tracking-wide text-muted">Danh mục</p>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/danh-muc/${c.slug}`}
            onClick={onClose}
            className="border-b border-line py-3 text-sm"
          >
            {c.name}
          </Link>
        ))}
      </nav>
    </Drawer>
  );
}
