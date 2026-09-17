import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function BrandStory() {
  return (
    <section className="border-t border-line px-4 py-14 text-center md:px-8">
      <p className="mx-auto max-w-2xl font-display text-2xl leading-snug md:text-4xl">
        &ldquo;Được tạo ra cho cuộc sống hàng ngày.&rdquo;
      </p>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted">
        {SITE_NAME} chọn lọc những sản phẩm thể thao chính hãng đang giảm giá từ các thương hiệu quốc tế hàng đầu,
        cùng hàng hiệu authentic đã qua kiểm định — chính hãng 100%, giá tốt hơn nhiều so với giá gốc.
      </p>
      <Link href="/ve-thuong-hieu" className="mt-6 inline-block text-sm underline-offset-4 hover:underline">
        Tìm hiểu thêm về chúng tôi →
      </Link>
    </section>
  );
}
