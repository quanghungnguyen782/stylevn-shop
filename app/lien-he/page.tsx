import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: `Thông tin liên hệ, vận chuyển, đổi trả và câu hỏi thường gặp tại ${SITE_NAME}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-14 md:px-8">
      <h1 className="mb-10 font-display text-3xl">Liên Hệ</h1>

      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">Thông Tin Cửa Hàng</h2>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li>Hotline: 1900 6868</li>
            <li>Email: support@lyleauthentic.com</li>
            <li>Địa chỉ: 123 Nguyễn Trãi, Q.1, TP.HCM</li>
            <li>Giờ mở cửa: 8:00 - 22:00, tất cả các ngày</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide">Gửi Yêu Cầu</h2>
          <ContactForm />
        </div>
      </div>

      <section id="van-chuyen" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Vận Chuyển</h2>
        <p className="text-sm text-muted">
          Giao hàng toàn quốc trong 2-5 ngày làm việc. Miễn phí vận chuyển cho đơn hàng từ 1.000.000₫.
        </p>
      </section>

      <section id="doi-tra" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Đổi Trả</h2>
        <p className="text-sm text-muted">
          Với đồ thể thao: đổi trả miễn phí trong 7 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên tem mác,
          chưa qua sử dụng. Với hàng hiệu: tình trạng sản phẩm (mới/đã qua sử dụng) được ghi rõ trong tin đăng —
          vui lòng trao đổi qua Zalo để xác nhận trước khi đặt hàng.
        </p>
      </section>

      <section id="size" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Hướng Dẫn Chọn Size</h2>
        <p className="text-sm text-muted">
          Mỗi thương hiệu có bảng size riêng. Vui lòng liên hệ hotline hoặc chat để được tư vấn size phù hợp
          trước khi đặt hàng.
        </p>
      </section>

      <section id="faq" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Câu Hỏi Thường Gặp</h2>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <p><strong className="text-ink">Sản phẩm có chính hãng không?</strong><br />Toàn bộ sản phẩm tại {SITE_NAME} đều là hàng chính hãng. {SITE_NAME} không phải đại lý ủy quyền của các thương hiệu, chỉ là nhà bán lẻ sản phẩm chính hãng.</p>
          <p><strong className="text-ink">Tôi có thể thanh toán bằng cách nào?</strong><br />Hiện hỗ trợ thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng.</p>
        </div>
      </section>

      <section id="bao-mat" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Chính Sách Bảo Mật</h2>
        <p className="text-sm text-muted">
          Thông tin cá nhân của bạn chỉ được sử dụng để xử lý đơn hàng và chăm sóc khách hàng, không chia sẻ
          cho bên thứ ba ngoài mục đích giao vận.
        </p>
      </section>

      <section id="dieu-khoan" className="border-t border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Điều Khoản Sử Dụng</h2>
        <p className="text-sm text-muted">
          Bằng việc sử dụng website, bạn đồng ý với các điều khoản mua hàng và chính sách của {SITE_NAME}.
        </p>
      </section>

      <section id="cookie" className="border-t border-b border-line py-8">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide">Chính Sách Cookie</h2>
        <p className="text-sm text-muted">
          Website sử dụng cookie để ghi nhớ giỏ hàng và danh sách yêu thích của bạn trên trình duyệt.
        </p>
      </section>
    </div>
  );
}
