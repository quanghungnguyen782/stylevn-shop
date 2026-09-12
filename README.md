# StyleVN Shop

Website bán quần áo (thời trang nam nữ), xây dựng bằng HTML/CSS/JavaScript thuần, không cần build step hay backend. Dữ liệu sản phẩm là mẫu tĩnh, giỏ hàng lưu trong `localStorage` của trình duyệt.

Phong cách giao diện tham khảo từ [vuahanghieu.com](https://vuahanghieu.com/) (banner slider, danh mục dạng lưới, flash sale đếm ngược, badge giảm giá/hot/mới).

## Cấu trúc

- `index.html` — Trang chủ
- `san-pham.html` — Danh sách sản phẩm (lọc, sắp xếp, tìm kiếm)
- `chi-tiet-san-pham.html` — Chi tiết sản phẩm
- `gio-hang.html` — Giỏ hàng
- `lien-he.html` — Liên hệ
- `css/style.css` — Toàn bộ style
- `js/products-data.js` — Dữ liệu sản phẩm mẫu
- `js/main.js` — Logic giỏ hàng, render sản phẩm, toast...

## Chạy thử ở local

Không cần cài đặt gì, chỉ cần một server tĩnh bất kỳ, ví dụ:

```bash
python3 -m http.server 8000
```

rồi mở `http://localhost:8000`.

## Deploy lên Render

Repo đã có sẵn `render.yaml` (Render Blueprint) cấu hình sẵn dạng Static Site, không cần build:

1. Đẩy (push) repo này lên GitHub/GitLab.
2. Vào [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
3. Chọn repo vừa push, Render sẽ tự đọc `render.yaml` và tạo service tên `stylevn-shop`.
4. Bấm **Apply** để deploy.

Hoặc deploy thủ công không cần `render.yaml`:

1. **New** → **Static Site**.
2. Chọn repo.
3. Build Command: để trống.
4. Publish Directory: `.` (thư mục gốc).
5. Bấm **Create Static Site**.

Sau khi deploy xong, Render sẽ cấp một domain dạng `https://stylevn-shop.onrender.com`.
