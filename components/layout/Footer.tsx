import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Chăm Sóc Khách Hàng",
    links: [
      { href: "/lien-he", label: "Liên hệ" },
      { href: "/lien-he#van-chuyen", label: "Vận chuyển" },
      { href: "/lien-he#doi-tra", label: "Đổi trả" },
      { href: "/lien-he#faq", label: "Câu hỏi thường gặp" },
      { href: "/lien-he#size", label: "Hướng dẫn chọn size" },
    ],
  },
  {
    title: `Về ${SITE_NAME}`,
    links: [
      { href: "/ve-thuong-hieu", label: "Câu chuyện thương hiệu" },
      { href: "/lien-he", label: "Tuyển dụng" },
      { href: "/ve-thuong-hieu#ben-vung", label: "Phát triển bền vững" },
    ],
  },
  {
    title: "Pháp Lý",
    links: [
      { href: "/lien-he#bao-mat", label: "Chính sách bảo mật" },
      { href: "/lien-he#dieu-khoan", label: "Điều khoản sử dụng" },
      { href: "/lien-he#cookie", label: "Chính sách cookie" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-xl">{SITE_NAME}</p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Hàng hiệu authentic đã qua kiểm định, cùng đồ thể thao chính hãng giảm giá — Adidas, Nike, Asics,
              Li-Ning, 361 Degrees, Lacoste.
            </p>
            <div className="mt-4 flex gap-4 text-sm text-muted">
              <a href="#" className="hover:text-accent">Facebook</a>
              <a href="#" className="hover:text-accent">Instagram</a>
              <a href="#" className="hover:text-accent">TikTok</a>
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
