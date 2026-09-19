"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { IconButton } from "@/components/ui/IconButton";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { CATEGORIES, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { ITEM_CATEGORIES } from "@/lib/bag-post-parser";
import { IconBag, IconHeart, IconMenu, IconSearch, IconUser } from "@/components/ui/icons";

function getGenderFromHref(href: string): string | null {
  const queryString = href.split("?")[1];
  if (!queryString) return null;
  return new URLSearchParams(queryString).get("gender");
}

interface DropdownItem {
  slug: string;
  name: string;
  href: string;
}

function getDropdownItems(href: string): DropdownItem[] | null {
  if (href === "/hang-hieu") {
    return ITEM_CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, href: `/hang-hieu?category=${c.slug}` }));
  }

  if (href === "/san-pham") {
    return CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, href: `/san-pham?category=${c.slug}` }));
  }

  const gender = getGenderFromHref(href);
  if (gender) {
    return CATEGORIES.map((c) => ({
      slug: c.slug,
      name: c.name,
      href: `/san-pham?gender=${encodeURIComponent(gender)}&category=${c.slug}`,
    }));
  }

  return null;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();
  const { ids: wishlistIds } = useWishlist();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur">
        <div
          className={clsx(
            "mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-[height] duration-200 md:px-8",
            scrolled ? "h-14" : "h-16"
          )}
        >
          <div className="flex items-center gap-2 lg:hidden">
            <IconButton aria-label="Mở menu" onClick={() => setMenuOpen(true)}>
              <IconMenu />
            </IconButton>
          </div>

          <Link href="/" className="font-display text-[1.35rem] tracking-tight md:text-[1.65rem]">
            {SITE_NAME}
          </Link>

          <nav className="hidden h-full items-stretch gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const dropdownItems = getDropdownItems(link.href);

              if (!dropdownItems) {
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
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.href}
                        className="block whitespace-nowrap px-4 py-2 text-sm text-ink/80 hover:bg-surface hover:text-accent"
                      >
                        {item.name}
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
