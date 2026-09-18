import Image from "next/image";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/product-service";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description: `Câu chuyện thương hiệu ${SITE_NAME} — hàng hiệu authentic và đồ thể thao chính hãng giảm giá.`,
};

export default async function BrandStoryPage() {
  const products = await getAllProducts();
  const imageUrl = products.find((p) => p.images[0]?.includes("model"))?.images[0] ?? products[0]?.images[0];

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto">
          {imageUrl && (
            <Image src={imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-4 bg-surface px-6 py-14 md:px-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Câu Chuyện Của Chúng Tôi</p>
          <h1 className="font-display text-3xl leading-tight md:text-4xl">Được tạo ra cho cuộc sống hàng ngày.</h1>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {SITE_NAME} ra đời với mong muốn mang những món đồ hiệu authentic, ảnh chụp từ sản phẩm thật, đến gần
            hơn với người yêu hàng hiệu, cùng những sản phẩm thể thao chính hãng từ các thương hiệu quốc tế —
            Adidas, Nike, Asics, Li-Ning, 361 Degrees, Lacoste — ở mức giá xả kho tốt nhất.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-4 py-16 text-center md:px-8">
        <h2 className="mb-4 font-display text-2xl">Cam Kết Của Chúng Tôi</h2>
        <p className="text-sm leading-relaxed text-muted">
          Mỗi sản phẩm tại {SITE_NAME} đều được tuyển chọn kỹ lưỡng, đảm bảo nguồn gốc chính hãng. Chúng tôi tin
          rằng phong cách không cần phải phức tạp — chỉ cần đúng với nhịp sống của bạn.
        </p>
      </section>

      <section id="ben-vung" className="border-t border-line px-4 py-16 text-center md:px-8">
        <h2 className="mb-4 font-display text-2xl">Phát Triển Bền Vững</h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted">
          Mua hàng hiệu đã qua sử dụng và đồ thể thao xả kho là một cách kéo dài vòng đời sản phẩm thay vì tiêu
          dùng ngắn hạn — chúng tôi khuyến khích khách hàng lựa chọn những món đồ bền, dùng được lâu dài.
        </p>
      </section>
    </div>
  );
}
