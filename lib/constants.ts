import type { Brand, Category } from "@/types/product";

export const SITE_NAME = "StyleVN";

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

export const NAV_LINKS = [
  { href: "/san-pham?sort=new", label: "Hàng Mới" },
  { href: "/san-pham?gender=Nam", label: "Nam" },
  { href: "/san-pham?gender=N%E1%BB%AF", label: "Nữ" },
  { href: "/ve-thuong-hieu", label: "Về Chúng Tôi" },
  { href: "/san-pham?sale=1", label: "Sale" },
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
