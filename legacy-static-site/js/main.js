// ===== Cart helpers (dùng chung mọi trang) =====
const CART_KEY = "fashionshop_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, qty });
  }
  saveCart(cart);
}

function removeFromCartAt(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function updateCartQtyAt(index, qty) {
  const cart = getCart();
  if (cart[index]) {
    cart[index].qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function cartTotalCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cartTotalCount();
  });
}

// ===== Toast notification =====
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== Render helpers =====
function discountPercent(p) {
  return p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : 0;
}

function productBadge(p) {
  if (p.stock <= 5) return { cls: "hot", label: "Sắp hết hàng" };
  if (discountPercent(p) >= 65) return { cls: "sale", label: "Sale" };
  return null;
}

function productCardHTML(p) {
  const discount = discountPercent(p);
  const badge = productBadge(p);
  return `
    <div class="product-card">
      <a href="chi-tiet-san-pham.html?id=${p.id}">
        <div class="product-thumb">
          ${badge ? `<span class="badge ${badge.cls}">${badge.label}</span>` : ""}
          ${discount ? `<span class="discount-tag">-${discount}%</span>` : ""}
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.code}/500/650'">
        </div>
        <div class="product-info">
          <div class="brand-tag">${getBrandName(p.brand)}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">
            <span class="price-now">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
          </div>
        </div>
      </a>
      <div style="padding:0 12px 12px;">
        <button class="add-cart-btn" onclick="quickAdd(${p.id}, event)">🛒 Thêm vào giỏ</button>
      </div>
    </div>
  `;
}

function quickAdd(id, e) {
  e.preventDefault();
  e.stopPropagation();
  const p = getProductById(id);
  addToCart(id, p.sizes[0], 1);
  showToast(`Đã thêm "${p.name}" vào giỏ hàng`);
}

function renderCategoryGrid(container) {
  container.innerHTML = CATEGORIES.map(
    (c) => `
    <a class="cat-card" href="san-pham.html?cat=${c.slug}">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
    </a>`
  ).join("");
}

function renderBrandStrip(container) {
  container.innerHTML = BRANDS.map(
    (b) => `<a class="brand-pill" href="san-pham.html?brand=${b.slug}">${b.name}</a>`
  ).join("");
}

// ===== Newsletter form (shared) =====
document.addEventListener("submit", (e) => {
  if (e.target.matches(".newsletter-form")) {
    e.preventDefault();
    showToast("Cảm ơn bạn đã đăng ký nhận tin!");
    e.target.reset();
  }
});

document.addEventListener("DOMContentLoaded", updateCartCount);
