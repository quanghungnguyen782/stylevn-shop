/**
 * One-off migration: legacy-static-site/js/products-data.js -> data/products.json
 *
 * Sanitizes the source export (strips "#ERROR!" Excel-artifact image entries,
 * swaps the 7 picsum.photos placeholders for a local fallback image),
 * generates slugs, and synthesizes category-scoped placeholder descriptions
 * since the source has no real per-product copy.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import vm from "vm";

const ROOT = join(__dirname, "..");
const LEGACY_DATA_PATH = join(ROOT, "legacy-static-site/js/products-data.js");
const OUT_PATH = join(ROOT, "data/products.json");
const PLACEHOLDER_IMAGE = "/images/placeholder-product.jpg";

interface LegacyProduct {
  id: number;
  name: string;
  code: string;
  brand: string;
  category: string;
  gender: string;
  price: number;
  oldPrice: number;
  stock: number;
  sizes: string[];
  images: string[];
}

const CATEGORY_NAMES: Record<string, string> = {
  ao: "Áo & Áo Khoác",
  quan: "Quần & Váy",
  giay: "Giày & Dép",
  "phu-kien": "Phụ Kiện",
};

const BRAND_NAMES: Record<string, string> = {
  adidas: "Adidas",
  nike: "Nike",
  asics: "Asics",
  lining: "Li-Ning",
  "361-degrees": "361 Degrees",
  lacoste: "Lacoste",
};

function removeDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function slugify(str: string): string {
  return removeDiacritics(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Retail markup on top of the wholesale-derived prices: products priced
// under 500.000₫ get a higher percentage markup, at or above get a lower
// one — requested by the client so margin is proportionally larger on
// cheaper items. Applied identically to price and oldPrice so the
// displayed discount percentage is unaffected, only the VND amounts grow.
const MARKUP_THRESHOLD = 500_000;
const HIGH_PRICE_MARKUP = 1.18;
const LOW_PRICE_MARKUP = 1.25;

function applyMarkup(amount: number, markup: number): number {
  return Math.round((amount * markup) / 1000) * 1000;
}

function sanitizeImages(images: string[]): string[] {
  const valid = images.filter(
    (src) => src.startsWith("http") && !src.includes("picsum.photos")
  );
  return valid.length > 0 ? valid : [PLACEHOLDER_IMAGE];
}

const DESCRIPTION_TEMPLATES: Record<string, (brand: string) => string> = {
  ao: (brand) =>
    `Thiết kế bởi ${brand}, form dáng hiện đại, chất liệu thoáng nhẹ phù hợp mặc hàng ngày lẫn vận động thể thao.`,
  quan: (brand) =>
    `Thiết kế bởi ${brand}, phom dáng thoải mái, chất liệu co giãn nhẹ, dễ phối cùng nhiều trang phục khác.`,
  giay: (brand) =>
    `Thiết kế bởi ${brand}, đế êm hỗ trợ vận động, phù hợp cho cả tập luyện lẫn di chuyển hàng ngày.`,
  "phu-kien": (brand) =>
    `Phụ kiện chính hãng ${brand}, hoàn thiện tinh gọn, tiện dụng cho sinh hoạt và tập luyện hàng ngày.`,
};

function buildDescription(category: string, brand: string): string {
  const fn = DESCRIPTION_TEMPLATES[category] ?? DESCRIPTION_TEMPLATES.ao;
  return fn(brand);
}

function main() {
  const code = readFileSync(LEGACY_DATA_PATH, "utf8");
  const sandbox: Record<string, unknown> = {};
  vm.createContext(sandbox);
  // top-level const/let in a vm context aren't exposed as properties on the
  // sandbox object, so explicitly assign them to a `var` before reading back.
  vm.runInContext(code + "\nvar __EXPORTS__ = { PRODUCTS, CATEGORIES, BRANDS };", sandbox);

  const exports = sandbox.__EXPORTS__ as { PRODUCTS: LegacyProduct[] };
  const legacyProducts = exports?.PRODUCTS;
  if (!Array.isArray(legacyProducts) || legacyProducts.length === 0) {
    throw new Error("Failed to load PRODUCTS from legacy data file");
  }

  const seenSlugs = new Set<string>();

  const products = legacyProducts.map((p) => {
    const brandName = BRAND_NAMES[p.brand] ?? p.brand;
    const categoryName = CATEGORY_NAMES[p.category] ?? p.category;

    let slug = `${slugify(p.name)}-${p.code.toLowerCase()}`;
    slug = slugify(slug);
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${p.id}`;
    }
    seenSlugs.add(slug);

    const markup = p.price >= MARKUP_THRESHOLD ? HIGH_PRICE_MARKUP : LOW_PRICE_MARKUP;

    return {
      id: p.id,
      slug,
      name: p.name,
      code: p.code,
      brand: p.brand,
      category: p.category,
      gender: p.gender,
      price: applyMarkup(p.price, markup),
      oldPrice: applyMarkup(p.oldPrice, markup),
      stock: p.stock,
      sizes: p.sizes,
      images: sanitizeImages(p.images),
      description: buildDescription(p.category, brandName),
      tags: [p.brand, p.category, p.gender, categoryName],
    };
  });

  // Sanity checks
  const uniqueSlugs = new Set(products.map((p) => p.slug));
  if (uniqueSlugs.size !== products.length) {
    throw new Error(
      `Slug collision detected: ${products.length} products but only ${uniqueSlugs.size} unique slugs`
    );
  }
  const zeroImageCount = products.filter(
    (p) => p.images.length === 0
  ).length;
  if (zeroImageCount > 0) {
    throw new Error(`${zeroImageCount} products ended up with zero images`);
  }
  const badImageEntries = products.filter((p) =>
    p.images.some((src) => !src.startsWith("http") && src !== PLACEHOLDER_IMAGE)
  );
  if (badImageEntries.length > 0) {
    throw new Error(
      `${badImageEntries.length} products still have invalid image entries`
    );
  }

  writeFileSync(OUT_PATH, JSON.stringify(products, null, 2) + "\n", "utf8");

  console.log(`Wrote ${products.length} products to ${OUT_PATH}`);
  console.log(`Unique slugs: ${uniqueSlugs.size}`);
  console.log(
    `Products using placeholder image: ${
      products.filter((p) => p.images[0] === PLACEHOLDER_IMAGE).length
    }`
  );
}

main();
