import Link from "next/link";

const TRUST_POINTS = [
  {
    title: "Ảnh Sản Phẩm Thực Tế",
    desc: "Ảnh chụp trực tiếp từ sản phẩm thật, không dùng ảnh mạng hay ảnh minh họa.",
  },
  {
    title: "Giá Cả Minh Bạch",
    desc: "Giá niêm yết rõ ràng, giảm giá tính đúng theo giá gốc thật, không có phụ phí ẩn.",
  },
  {
    title: "Tình Trạng Rõ Ràng",
    desc: "Mới hay đã qua sử dụng đều được ghi rõ trong tin đăng, không mập mờ.",
  },
  {
    title: "Hỗ Trợ Qua Zalo",
    desc: "Trao đổi trực tiếp với người bán để xác nhận thông tin trước khi đặt hàng.",
  },
];

export function TrustSection() {
  return (
    <section className="border-t border-line px-4 py-14 md:px-8 md:py-16">
      <h2 className="mb-10 text-center font-display text-2xl md:text-3xl">Vì Sao Chọn LyleAuthentic?</h2>
      <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {TRUST_POINTS.map((point) => (
          <div key={point.title} className="text-center">
            <p className="mb-2 text-2xl">✓</p>
            <p className="mb-1 text-sm font-semibold">{point.title}</p>
            <p className="text-xs leading-relaxed text-muted">{point.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-muted">
        Tìm hiểu thêm về quy trình chọn hàng của chúng tôi tại{" "}
        <Link href="/authenticity" className="underline underline-offset-4 hover:text-accent">
          trang Authenticity
        </Link>
        .
      </p>
    </section>
  );
}
