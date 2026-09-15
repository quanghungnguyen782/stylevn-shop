"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { NAV_LINKS } from "@/lib/constants";
import { IconBag, IconHeart, IconMenu, IconSearch, IconUser } from "@/components/ui/icons";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount, openCart } = useCart();
  const { ids: wishlistIds } = useWishlist();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <IconButton aria-label="Mở menu" onClick={() => setMenuOpen(true)}>
              <IconMenu />
            </IconButton>
          </div>

          <Link href="/" className="font-display text-xl tracking-tight md:text-2xl">
            StyleVN
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wide text-ink/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <IconButton aria-label="Tìm kiếm" onClick={() => setSearchOpen(true)}>
              <IconSearch />
            </IconButton>
            <IconButton aria-label="Tài khoản" className="hidden md:inline-flex">
              <IconUser />
            </IconButton>
            <IconButton aria-label="Danh sách yêu thích" className="relative hidden md:inline-flex">
              <IconHeart />
              {wishlistIds.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-canvas">
                  {wishlistIds.length}
                </span>
              )}
            </IconButton>
            <IconButton aria-label="Giỏ hàng" className="relative" onClick={openCart}>
              <IconBag />
              {totalCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-canvas">
                  {totalCount}
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer />
    </>
  );
}
