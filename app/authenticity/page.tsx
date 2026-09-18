import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, ZALO_CONTACT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Authenticity",
  description: `Cách ${SITE_NAME} xử lý thông tin và hình ảnh sản phẩm hàng hiệu — minh bạch về những gì chúng tôi kiểm tra và những gì do người bán cung cấp.`,
};

const STEPS = [
  {
    title: "Ảnh chụp trực tiếp từ sản phẩm thật",
    desc: "Mọi ảnh trên trang hàng hiệu đều là ảnh chụp thực tế của chính món đồ đang được bán — không dùng ảnh từ catalogue hãng hay ảnh sưu tầm trên mạng.",
  },
  {
    title: "Thông tin do người bán cung cấp trực tiếp",
    desc: "Tên sản phẩm, thương hiệu, tình trạng (mới/đã qua sử dụng), giá và các thông tin khác được người bán mô tả và hiển thị đúng như vậy trên tin đăng.",
  },
  {
    title: "Trao đổi trực tiếp trước khi mua",
    desc: "Bạn có thể liên hệ qua Zalo để hỏi thêm chi tiết, yêu cầu thêm ảnh cận cảnh (logo, số seri, phần cứng...) trước khi quyết định đặt hàng.",
  },
];

export default function AuthenticityPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-14 md:px-8">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">Authenticity</p>
      <h1 className="mb-6 font-display text-3xl md:text-4xl">Cách chúng tôi xử lý hàng hiệu</h1>

      <p className="mb-10 text-sm leading-relaxed text-muted">
        Chúng tôi muốn minh bạch về những gì thực sự diễn ra với mỗi tin đăng hàng hiệu tại {SITE_NAME}, thay vì
        đưa ra những cam kết chung chung. Dưới đây là đúng những gì bạn nhận được:
      </p>

      <div className="flex flex-col gap-8">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink text-sm">
              {i + 1}
            </span>
            <div>
              <p className="mb-1 text-sm font-semibold">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">Đang được hoàn thiện</h2>
        <p className="text-sm leading-relaxed text-muted">
          Chúng tôi đang xây dựng thêm quy trình kiểm tra chi tiết hơn (so sánh logo, chất liệu, phần cứng, mã
          seri với thông tin tham khảo từ hãng). Cho đến khi quy trình đó hoàn thiện, mọi thông tin sản phẩm trên
          tin đăng là do người bán trực tiếp cung cấp — nếu bạn cần yên tâm hơn về một món đồ cụ thể, đừng ngại{" "}
          <Link href={ZALO_CONTACT_URL} className="underline underline-offset-4 hover:text-accent">
            liên hệ qua Zalo
          </Link>{" "}
          để hỏi thêm trước khi mua.
        </p>
      </div>
    </div>
  );
}
