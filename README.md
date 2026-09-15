# LyleAuthentic

Website bán hàng thể thao đa thương hiệu (Adidas, Nike, Asics, Li-Ning, 361 Degrees, Lacoste), xây dựng bằng Next.js (App Router) + TypeScript + Tailwind CSS v4 với hệ thống thiết kế riêng (không sao chép giao diện của các thương hiệu tham khảo).

Repo trước đây là một site tĩnh HTML/CSS/JS (vẫn còn lưu tại [legacy-static-site/](legacy-static-site/) để tham khảo) — đã được viết lại hoàn toàn.

## Dữ liệu sản phẩm

370 sản phẩm thật được trích xuất từ file Excel nội bộ (`Check PRV.xlsx`, không nằm trong repo vì chứa giá sỉ) qua `scripts/migrate-products-data.ts`, ghi ra `data/products.json`. Muốn chạy lại migration (ví dụ khi file nguồn cập nhật):

```bash
npm run migrate:products
```

Script sẽ tự kiểm tra: 370 slug duy nhất, không còn entry ảnh lỗi `#ERROR!`, không sản phẩm nào thiếu ảnh.

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build production
npm start       # chạy bản build (đọc PORT từ env, mặc định 3000)
npx tsc --noEmit  # type-check
```

## Kiến trúc

- `app/` — các route (App Router): trang chủ, `/san-pham` (tất cả sản phẩm), `/danh-muc/[category]`, `/san-pham/[slug]` (370 trang tĩnh), `/checkout`, `/lien-he`, `/ve-thuong-hieu`, `sitemap.ts`, `robots.ts`.
- `components/` — chia theo domain: `ui/` (Button, Drawer, Accordion...), `layout/` (Header, Footer), `product/`, `plp/` (danh sách + filter), `cart/`, `checkout/`, `search/`, `marketing/` (các section trang chủ).
- `lib/` — `product-service.ts` (API bất đồng bộ, sẵn sàng thay bằng backend thật sau này), `cart-context.tsx` / `wishlist-context.tsx` (state qua React Context + localStorage), `search.ts`, `seo.ts`.
- `types/` — định nghĩa TypeScript cho Product, Cart, Filters, Checkout.
- `data/products.json` — dữ liệu sản phẩm đã xử lý (sinh ra bởi migration script).

## Những điều đã lược bớt có chủ đích

Xem chi tiết trong kế hoạch triển khai, tóm tắt:

- Không có bộ lọc/màu sắc sản phẩm (dữ liệu nguồn không có màu thật).
- Checkout là luồng UI mô phỏng (không tích hợp cổng thanh toán thật).
- Wishlist chỉ lưu localStorage, không có tài khoản đăng nhập thật.
- Mô tả sản phẩm là văn bản mẫu theo danh mục, chưa phải nội dung biên tập thật.
- Tìm kiếm là so khớp chuỗi phía client, không dùng thư viện fuzzy-search.

## Deploy lên Render

Repo có sẵn `render.yaml` cấu hình Web Service (Node), vì trang cần `next/image` và các route tĩnh 370 trang sản phẩm:

1. Push repo lên GitHub/GitLab.
2. Render Dashboard → **New** → **Blueprint** → chọn repo → Render tự đọc `render.yaml` → **Apply**.

Hoặc tạo thủ công: **New** → **Web Service** → Build Command `npm install && npm run build`, Start Command `npm start`.

Domain mặc định dạng `https://stylevn-shop.onrender.com`.
