"use client";

import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { NAV_LINKS, CATEGORIES, SITE_NAME } from "@/lib/constants";
import { useWishlist } from "@/lib/wishlist-context";

export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ids: wishlistIds, openWishlist } = useWishlist();

  return (
    <Drawer open={open} onClose={onClose} side="left" title={SITE_NAME} widthClassName="w-[85%] sm:w-[380px]">
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
        <button
          onClick={() => {
            onClose();
            openWishlist();
          }}
          className="mt-6 flex items-center justify-between border-t border-line py-4 text-sm uppercase tracking-wide"
        >
          <span>Yêu Thích</span>
          {wishlistIds.length > 0 && <span className="text-muted">{wishlistIds.length}</span>}
        </button>
      </nav>
    </Drawer>
  );
}
