import { removeDiacritics } from "@/lib/text-utils";

export interface BagBrand {
  slug: string;
  name: string;
  keywords: string[];
}

export const BAG_BRANDS: BagBrand[] = [
  { slug: "louis-vuitton", name: "Louis Vuitton", keywords: ["louis vuitton", "lv"] },
  { slug: "gucci", name: "Gucci", keywords: ["gucci"] },
  { slug: "chanel", name: "Chanel", keywords: ["chanel"] },
  { slug: "dior", name: "Dior", keywords: ["dior"] },
  { slug: "hermes", name: "Hermès", keywords: ["hermes"] },
  { slug: "ysl", name: "Saint Laurent", keywords: ["saint laurent", "ysl"] },
  { slug: "prada", name: "Prada", keywords: ["prada"] },
  { slug: "balenciaga", name: "Balenciaga", keywords: ["balenciaga"] },
  { slug: "fendi", name: "Fendi", keywords: ["fendi"] },
  { slug: "celine", name: "Celine", keywords: ["celine"] },
  { slug: "bottega-veneta", name: "Bottega Veneta", keywords: ["bottega veneta", "bottega"] },
  { slug: "coach", name: "Coach", keywords: ["coach"] },
  { slug: "miu-miu", name: "Miu Miu", keywords: ["miu miu", "miumiu"] },
];

export interface ParsedBagPost {
  name: string | null;
  brand: string | null;
  brandName: string | null;
  brandRaw: string | null;
  condition: "new" | "used";
  price: number | null;
  priceRaw: string | null;
  warnings: string[];
}

const PRICE_LABEL_LINE = /(pass|gi[áa]|price)\s*:?\s*/i;
const MIN_PRICE = 500_000;
const MAX_PRICE = 500_000_000;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseName(rawText: string): string | null {
  const line = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  return line ?? null;
}

function parseBrand(normalizedText: string): { slug: string | null; name: string | null; raw: string | null; warning: string | null } {
  const matches: BagBrand[] = [];
  for (const brand of BAG_BRANDS) {
    const hit = brand.keywords.some((kw) => new RegExp(`\\b${escapeRegex(kw)}\\b`, "i").test(normalizedText));
    if (hit) matches.push(brand);
  }

  if (matches.length === 0) {
    return { slug: null, name: null, raw: null, warning: "Không nhận diện được thương hiệu" };
  }
  if (matches.length > 1) {
    const names = matches.map((m) => m.name).join(", ");
    return { slug: null, name: null, raw: names, warning: `Phát hiện nhiều thương hiệu có thể khớp (${names}), vui lòng xác nhận lại` };
  }
  return { slug: matches[0].slug, name: matches[0].name, raw: matches[0].name, warning: null };
}

/** Tries the two known shorthand price formats against one piece of text. Returns null if no match, or ambiguous=true if more than one distinct candidate was found. */
function extractPrice(text: string): { price: number; raw: string } | null | "ambiguous" {
  const trMatches = [...text.matchAll(/(\d{1,3})\s*tr\s*(\d{1,3})?/gi)];
  if (trMatches.length > 1) return "ambiguous";
  if (trMatches.length === 1) {
    const [full, millions, thousands] = trMatches[0];
    const price = parseInt(millions, 10) * 1_000_000 + (thousands ? parseInt(thousands, 10) * 1_000 : 0);
    return { price, raw: full };
  }

  const shorthandMatches = [...text.matchAll(/\b(\d{1,3})[.,](\d{3})\b/g)];
  const distinctValues = new Set(shorthandMatches.map((m) => `${m[1]}${m[2]}`));
  if (distinctValues.size > 1) return "ambiguous";
  if (shorthandMatches.length >= 1) {
    const [full, whole, thousands] = shorthandMatches[0];
    const price = parseInt(whole + thousands, 10) * 1_000;
    return { price, raw: full };
  }

  return null;
}

function parsePrice(rawText: string): { price: number | null; raw: string | null; warning: string | null } {
  const labelLineMatch = rawText.split(/\r?\n/).find((l) => PRICE_LABEL_LINE.test(l));
  if (labelLineMatch) {
    const result = extractPrice(labelLineMatch);
    if (result === "ambiguous") {
      return { price: null, raw: null, warning: "Có nhiều số giống giá trên cùng dòng, không rõ giá nào đúng" };
    }
    if (result) {
      return checkBounds(result.price, result.raw);
    }
  }

  const result = extractPrice(rawText);
  if (result === "ambiguous") {
    return { price: null, raw: null, warning: "Có nhiều số giống giá trong tin nhắn, không rõ giá nào đúng" };
  }
  if (result) {
    return checkBounds(result.price, result.raw);
  }

  return { price: null, raw: null, warning: "Không tìm thấy giá" };
}

function checkBounds(price: number, raw: string): { price: number; raw: string; warning: string | null } {
  if (price < MIN_PRICE || price > MAX_PRICE) {
    return { price, raw, warning: `Giá ${price.toLocaleString("vi-VN")}₫ nằm ngoài khoảng thông thường, vui lòng kiểm tra lại` };
  }
  return { price, raw, warning: null };
}

export function parseBagPost(rawText: string): ParsedBagPost {
  const warnings: string[] = [];
  const trimmed = rawText.trim();

  if (!trimmed) {
    return {
      name: null,
      brand: null,
      brandName: null,
      brandRaw: null,
      condition: "new",
      price: null,
      priceRaw: null,
      warnings: ["Không có nội dung mô tả"],
    };
  }

  const normalized = removeDiacritics(trimmed);

  const name = parseName(trimmed);
  if (!name) warnings.push("Không xác định được tên sản phẩm");

  const brandResult = parseBrand(normalized);
  if (brandResult.warning) warnings.push(brandResult.warning);

  const condition: "new" | "used" = /\bpass\b/i.test(normalized) ? "used" : "new";

  const priceResult = parsePrice(trimmed);
  if (priceResult.warning) warnings.push(priceResult.warning);

  return {
    name,
    brand: brandResult.slug,
    brandName: brandResult.name,
    brandRaw: brandResult.raw,
    condition,
    price: priceResult.price,
    priceRaw: priceResult.raw,
    warnings,
  };
}
