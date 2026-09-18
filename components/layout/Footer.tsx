import Link from "next/link";
import { SITE_NAME, ZALO_CONTACT_URL } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/hang-hieu", label: "Hàng hiệu" },
      { href: "/san-pham?sale=1", label: "Sale" },
      { href: "/san-pham?gender=Nam", label: "Nam" },
      { href: "/san-pham?gender=N%E1%BB%AF", label: "Nữ" },
      { href: "/san-pham?sort=new", label: "Hàng mới" },
      { href: "/#ban-chay", label: "Bán chạy" },
    ],
  },
  {
    title: "Danh Mục",
    links: [
      { href: "/hang-hieu?category=tui-xach", label: "Túi xách" },
      { href: "/hang-hieu?category=vi", label: "Ví" },
      { href: "/danh-muc/giay", label: "Giày dép" },
      { href: "/san-pham", label: "Quần áo" },
      { href: "/danh-muc/phu-kien", label: "Phụ kiện" },
    ],
  },
  {
    title: "Hỗ Trợ",
    links: [
      { href: "/lien-he", label: "Liên hệ" },
      { href: "/lien-he#doi-tra", label: "Chính sách đổi trả" },
      { href: "/lien-he#van-chuyen", label: "Chính sách vận chuyển" },
      { href: "/lien-he#thanh-toan", label: "Chính sách thanh toán" },
      { href: "/lien-he#faq", label: "FAQ" },
    ],
  },
  {
    title: SITE_NAME,
    links: [
      { href: "/ve-thuong-hieu", label: "Về chúng tôi" },
      { href: "/authenticity", label: "Authentic" },
      { href: "/lien-he", label: "Liên hệ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <p className="font-display text-xl">{SITE_NAME}</p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Hàng hiệu authentic, ảnh chụp từ sản phẩm thật, cùng đồ thể thao chính hãng giảm giá — Adidas, Nike,
              Asics, Li-Ning, 361 Degrees, Lacoste.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide">Kết Nối</p>
              <div className="flex gap-4 text-sm text-muted">
                <Link href={ZALO_CONTACT_URL} className="hover:text-accent">Zalo</Link>
              </div>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
