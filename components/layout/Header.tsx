"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { CATEGORIES, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { IconBag, IconHeart, IconMenu, IconSearch, IconUser } from "@/components/ui/icons";

function getGenderFromHref(href: string): string | null {
  const queryString = href.split("?")[1];
  if (!queryString) return null;
  return new URLSearchParams(queryString).get("gender");
}

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
            {SITE_NAME}
          </Link>

          <nav className="hidden h-full items-stretch gap-7 md:flex">
            {NAV_LINKS.map((link) => {
              const gender = getGenderFromHref(link.href);

              if (!gender) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center text-sm uppercase tracking-wide text-ink/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div key={link.href} className="group relative flex items-center">
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wide text-ink/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 min-w-[200px] border border-line bg-canvas py-2 opacity-0 shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/san-pham?gender=${encodeURIComponent(gender)}&category=${c.slug}`}
                        className="block whitespace-nowrap px-4 py-2 text-sm text-ink/80 hover:bg-surface hover:text-accent"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <IconButton aria-label="Tìm kiếm" onClick={() => setSearchOpen(true)}>
              <IconSearch />
            </IconButton>
            <div className="hidden md:flex md:items-center">
              <IconButton aria-label="Tài khoản">
                <IconUser />
              </IconButton>
              <IconButton aria-label="Danh sách yêu thích" className="relative">
                <IconHeart />
                {wishlistIds.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-canvas">
                    {wishlistIds.length}
                  </span>
                )}
              </IconButton>
            </div>
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
