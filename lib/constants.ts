import type { Brand, Category } from "@/types/product";

export const SITE_NAME = "LyleAuthentic";

export const CATEGORIES: Category[] = [
  { slug: "ao", name: "Áo & Áo Khoác" },
  { slug: "quan", name: "Quần & Váy" },
  { slug: "giay", name: "Giày & Dép" },
  { slug: "phu-kien", name: "Phụ Kiện" },
];

export const BRANDS: Brand[] = [
  { slug: "adidas", name: "Adidas" },
  { slug: "nike", name: "Nike" },
  { slug: "asics", name: "Asics" },
  { slug: "lining", name: "Li-Ning" },
  { slug: "361-degrees", name: "361 Degrees" },
  { slug: "lacoste", name: "Lacoste" },
];

/**
 * Luxury/hàng-hiệu brands — unlike BRANDS above (a fixed sportswear list),
 * this is only ever whatever brand slugs currently have a published listing
 * (Zalo-bot-driven catalog), fetched live rather than hardcoded. See
 * lib/bag-product-service.ts's getDistinctBagBrands().
 */

export const NAV_LINKS = [
  { href: "/hang-hieu", label: "Hàng Hiệu" },
  { href: "/san-pham?sale=1", label: "Sale" },
  { href: "/san-pham?gender=Nam", label: "Nam" },
  { href: "/san-pham?gender=N%E1%BB%AF", label: "Nữ" },
  { href: "/thuong-hieu", label: "Thương Hiệu" },
  { href: "/san-pham", label: "Sản Phẩm" },
];

export const POPULAR_SEARCH_KEYWORDS = [
  "áo polo",
  "giày chạy bộ",
  "quần short",
  "áo khoác gió",
  "adidas",
  "nike",
];

export const FREE_SHIPPING_THRESHOLD = 1_000_000;

/**
 * No real public Zalo OA/personal chat link exists yet (the bot token in
 * this project is for the seller's own posting pipeline, not customer
 * support). Every "Chat Zalo" CTA points here until a real zalo.me link is
 * available — swap this one constant, never hardcode a link at each call
 * site.
 */
export const ZALO_CONTACT_URL = "/lien-he";
