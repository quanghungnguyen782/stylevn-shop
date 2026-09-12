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

function addToCart(productId, size, color, qty = 1) {
  const cart = getCart();
  const existing = cart.find(
    (i) => i.id === productId && i.size === size && i.color === color
  );
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, color, qty });
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
function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function productCardHTML(p) {
  const discount = p.oldPrice
    ? Math.round(100 - (p.price / p.oldPrice) * 100)
    : 0;
  return `
    <div class="product-card">
      <a href="chi-tiet-san-pham.html?id=${p.id}">
        <div class="product-thumb">
          ${p.badge ? `<span class="badge ${p.badge}">${p.badge === "sale" ? "Sale" : p.badge === "hot" ? "Hot" : "Mới"}</span>` : ""}
          ${discount ? `<span class="discount-tag">-${discount}%</span>` : ""}
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-rating"><span class="stars">${renderStars(p.rating)}</span> · Đã bán ${p.sold}</div>
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
  addToCart(id, p.sizes[0], p.colors[0], 1);
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

// ===== Newsletter form (shared) =====
document.addEventListener("submit", (e) => {
  if (e.target.matches(".newsletter-form")) {
    e.preventDefault();
    showToast("Cảm ơn bạn đã đăng ký nhận tin!");
    e.target.reset();
  }
});

document.addEventListener("DOMContentLoaded", updateCartCount);
