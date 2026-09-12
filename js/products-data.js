// Dữ liệu sản phẩm mẫu cho website bán quần áo
const CATEGORIES = [
  { slug: "ao-thun", name: "Áo Thun", icon: "👕" },
  { slug: "ao-so-mi", name: "Áo Sơ Mi", icon: "👔" },
  { slug: "quan-jean", name: "Quần Jean", icon: "👖" },
  { slug: "quan-short", name: "Quần Short", icon: "🩳" },
  { slug: "vay-dam", name: "Váy Đầm", icon: "👗" },
  { slug: "ao-khoac", name: "Áo Khoác", icon: "🧥" },
  { slug: "do-the-thao", name: "Đồ Thể Thao", icon: "🏃" },
  { slug: "phu-kien", name: "Phụ Kiện", icon: "🧢" },
];

function img(seed) {
  return `https://picsum.photos/seed/${seed}/500/650`;
}

const PRODUCTS = [
  // Áo Thun
  { id: 1, name: "Áo Thun Nam Basic Cotton", category: "ao-thun", price: 199000, oldPrice: 299000, image: img("shirt1"), badge: "sale", sizes: ["S","M","L","XL"], colors: ["Đen","Trắng","Xám"], rating: 4.6, sold: 1240 },
  { id: 2, name: "Áo Thun Nữ Croptop Form Rộng", category: "ao-thun", price: 179000, oldPrice: 259000, image: img("shirt2"), badge: "hot", sizes: ["S","M","L"], colors: ["Trắng","Hồng"], rating: 4.7, sold: 980 },
  { id: 3, name: "Áo Thun Local Brand Unisex", category: "ao-thun", price: 229000, oldPrice: 329000, image: img("shirt3"), badge: "new", sizes: ["M","L","XL"], colors: ["Đen","Be"], rating: 4.5, sold: 512 },
  { id: 4, name: "Áo Thun Polo Nam Cao Cấp", category: "ao-thun", price: 249000, oldPrice: 349000, image: img("shirt4"), sizes: ["S","M","L","XL"], colors: ["Xanh Navy","Trắng"], rating: 4.8, sold: 763 },

  // Áo Sơ Mi
  { id: 5, name: "Áo Sơ Mi Nam Dài Tay Công Sở", category: "ao-so-mi", price: 349000, oldPrice: 499000, image: img("sm1"), badge: "sale", sizes: ["M","L","XL","XXL"], colors: ["Trắng","Xanh Nhạt"], rating: 4.6, sold: 654 },
  { id: 6, name: "Áo Sơ Mi Nữ Tay Phồng Tiểu Thư", category: "ao-so-mi", price: 289000, oldPrice: 399000, image: img("sm2"), badge: "hot", sizes: ["S","M","L"], colors: ["Trắng","Vàng Nhạt"], rating: 4.7, sold: 890 },
  { id: 7, name: "Áo Sơ Mi Caro Unisex", category: "ao-so-mi", price: 259000, oldPrice: 359000, image: img("sm3"), sizes: ["M","L","XL"], colors: ["Đỏ Đen","Xanh"], rating: 4.4, sold: 320 },

  // Quần Jean
  { id: 8, name: "Quần Jean Nam Slimfit Xanh", category: "quan-jean", price: 399000, oldPrice: 599000, image: img("jean1"), badge: "sale", sizes: ["29","30","31","32","33"], colors: ["Xanh Đậm"], rating: 4.7, sold: 1103 },
  { id: 9, name: "Quần Jean Nữ Ống Rộng Baggy", category: "quan-jean", price: 349000, oldPrice: 499000, image: img("jean2"), badge: "hot", sizes: ["S","M","L"], colors: ["Xanh Nhạt"], rating: 4.6, sold: 745 },
  { id: 10, name: "Quần Jean Rách Nam Streetwear", category: "quan-jean", price: 449000, oldPrice: 649000, image: img("jean3"), badge: "new", sizes: ["29","30","31","32"], colors: ["Đen"], rating: 4.5, sold: 289 },

  // Quần Short
  { id: 11, name: "Quần Short Kaki Nam", category: "quan-short", price: 199000, oldPrice: 289000, image: img("short1"), sizes: ["29","30","31","32"], colors: ["Be","Đen"], rating: 4.5, sold: 412 },
  { id: 12, name: "Quần Short Jean Nữ Lưng Cao", category: "quan-short", price: 189000, oldPrice: 269000, image: img("short2"), badge: "sale", sizes: ["S","M","L"], colors: ["Xanh Nhạt"], rating: 4.6, sold: 530 },

  // Váy Đầm
  { id: 13, name: "Váy Đầm Hoa Nhí Đi Biển", category: "vay-dam", price: 259000, oldPrice: 389000, image: img("dress1"), badge: "hot", sizes: ["S","M","L"], colors: ["Hoa Xanh","Hoa Vàng"], rating: 4.8, sold: 1420 },
  { id: 14, name: "Đầm Công Sở Thanh Lịch", category: "vay-dam", price: 329000, oldPrice: 459000, image: img("dress2"), sizes: ["S","M","L","XL"], colors: ["Đen","Nâu"], rating: 4.6, sold: 678 },
  { id: 15, name: "Váy Yếm Denim Cá Tính", category: "vay-dam", price: 279000, oldPrice: 399000, image: img("dress3"), badge: "new", sizes: ["S","M","L"], colors: ["Xanh Denim"], rating: 4.4, sold: 233 },

  // Áo Khoác
  { id: 16, name: "Áo Khoác Bomber Nam", category: "ao-khoac", price: 459000, oldPrice: 649000, image: img("jacket1"), badge: "sale", sizes: ["M","L","XL"], colors: ["Đen","Rêu"], rating: 4.7, sold: 890 },
  { id: 17, name: "Áo Khoác Dù 2 Lớp Chống Nước", category: "ao-khoac", price: 399000, oldPrice: 559000, image: img("jacket2"), badge: "hot", sizes: ["M","L","XL"], colors: ["Xanh Navy","Đen"], rating: 4.6, sold: 640 },
  { id: 18, name: "Áo Khoác Denim Unisex", category: "ao-khoac", price: 429000, oldPrice: 599000, image: img("jacket3"), sizes: ["S","M","L"], colors: ["Xanh Nhạt"], rating: 4.5, sold: 310 },

  // Đồ Thể Thao
  { id: 19, name: "Bộ Đồ Thể Thao Nam Thun Lạnh", category: "do-the-thao", price: 349000, oldPrice: 489000, image: img("sport1"), badge: "sale", sizes: ["M","L","XL"], colors: ["Đen","Xám"], rating: 4.6, sold: 720 },
  { id: 20, name: "Áo Bra Tập Gym Nữ", category: "do-the-thao", price: 159000, oldPrice: 229000, image: img("sport2"), badge: "hot", sizes: ["S","M","L"], colors: ["Đen","Hồng"], rating: 4.7, sold: 1050 },
  { id: 21, name: "Quần Legging Tập Yoga", category: "do-the-thao", price: 189000, oldPrice: 269000, image: img("sport3"), sizes: ["S","M","L"], colors: ["Đen"], rating: 4.8, sold: 1330 },

  // Phụ Kiện
  { id: 22, name: "Nón Lưỡi Trai Unisex", category: "phu-kien", price: 99000, oldPrice: 149000, image: img("acc1"), badge: "sale", sizes: ["Freesize"], colors: ["Đen","Trắng"], rating: 4.5, sold: 980 },
  { id: 23, name: "Thắt Lưng Da Nam", category: "phu-kien", price: 199000, oldPrice: 299000, image: img("acc2"), sizes: ["Freesize"], colors: ["Nâu","Đen"], rating: 4.6, sold: 456 },
  { id: 24, name: "Túi Tote Vải Canvas", category: "phu-kien", price: 129000, oldPrice: 189000, image: img("acc3"), badge: "new", sizes: ["Freesize"], colors: ["Be","Đen"], rating: 4.4, sold: 210 },
];

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function getCategoryName(slug) {
  const c = CATEGORIES.find((c) => c.slug === slug);
  return c ? c.name : slug;
}
