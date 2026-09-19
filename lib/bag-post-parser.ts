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

export interface ItemCategory {
  slug: string;
  name: string;
  keywords: string[];
}

/**
 * Matched against the ORIGINAL text (lowercased, diacritics kept) rather
 * than the diacritics-stripped normalization used for brand matching —
 * several common Vietnamese words collide once stripped (e.g. "đẹp"
 * (beautiful) and "dép" (sandal) both become "dep"), which would
 * misclassify almost every post that says a product looks "đẹp". Sellers
 * do type Vietnamese with proper diacritics for ordinary words like these
 * (unlike foreign brand names, which are often typed without accents).
 */
/** Assigned as a display fallback (lib/bag-product-service.ts) when a published listing's category couldn't be determined by text or by photo — never a real match target. */
export const UNASSIGNED_CATEGORY_SLUG = "chua-xac-dinh" as const;

export const ITEM_CATEGORIES: ItemCategory[] = [
  { slug: "tui-xach", name: "Túi xách", keywords: ["túi xách", "túi"] },
  { slug: "vi", name: "Ví", keywords: ["ví da", "ví"] },
  { slug: "giay-dep", name: "Giày dép", keywords: ["giày", "dép", "sandal", "sneaker"] },
  { slug: "quan-ao", name: "Quần áo", keywords: ["quần", "áo", "váy", "đầm", "vest"] },
  { slug: "khan", name: "Khăn", keywords: ["khăn", "scarf"] },
  { slug: "that-lung", name: "Thắt lưng", keywords: ["thắt lưng", "dây lưng", "belt"] },
  { slug: "nuoc-hoa", name: "Nước hoa", keywords: ["nước hoa", "perfume"] },
  { slug: "kinh", name: "Kính", keywords: ["kính mắt", "mắt kính", "kính"] },
  {
    slug: "trang-suc",
    name: "Trang sức",
    keywords: ["trang sức", "vòng tay", "dây chuyền", "nhẫn"],
  },
  { slug: "dong-ho", name: "Đồng hồ", keywords: ["đồng hồ", "watch"] },
  { slug: "mu-non", name: "Mũ nón", keywords: ["mũ", "nón", "cap"] },
  // Empty keywords: never matched by parseCategory()/AI — only ever assigned
  // as the display fallback (lib/bag-product-service.ts) when a published
  // listing's category truly couldn't be determined by text or by photo.
  { slug: UNASSIGNED_CATEGORY_SLUG, name: "Chưa xác định", keywords: [] },
];

export interface ParsedBagPost {
  name: string | null;
  brand: string | null;
  brandName: string | null;
  brandRaw: string | null;
  category: string | null;
  categoryName: string | null;
  categoryRaw: string | null;
  condition: "new" | "used";
  price: number | null;
  priceRaw: string | null;
  size: string | null;
  accessories: string | null;
  warnings: string[];
}

const PRICE_LABEL_LINE = /(pass|gi[áa]|price)\s*:?\s*/i;
const MIN_PRICE = 500_000;
const MAX_PRICE = 500_000_000;

/**
 * Recommended posting template (given to sellers so the bot can read a post
 * with zero ambiguity):
 *
 *   Tên: <tên sản phẩm>
 *   Loại: <túi xách / ví / giày dép / quần áo / khăn / thắt lưng / nước hoa / kính / trang sức / đồng hồ / mũ nón>
 *   Hãng: <LV / Gucci / Chanel / Dior / Hermès / YSL / Prada / Balenciaga / Fendi / Celine / Bottega Veneta / Coach / Miu Miu>
 *   Tình trạng: Mới / Pass
 *   Giá: <vd 21tr hoặc 21.000.000>
 *   Size: <vd 38, M, 25cm... nếu có>
 *   Phụ kiện kèm theo: <vd hộp, túi vải, bill, thẻ bảo hành... nếu có>
 *
 * A labeled line always wins over the free-text heuristics below (exact
 * match on the text before ":", diacritics-insensitive) — this is additive:
 * posts without labels still fall back to the original heuristics, so the
 * old free-form style keeps working. Size/accessories have no fixed keyword
 * list (values are too varied — "38", "M", "25cm"...) so they're captured
 * as-is with no matching/warning, unlike brand/category.
 */
const FIELD_LABELS = {
  name: ["ten"],
  category: ["loai", "loai hang", "phan loai"],
  brand: ["hang", "thuong hieu", "brand", "hieu"],
  condition: ["tinh trang", "tt"],
  size: ["size", "kich thuoc", "kich co"],
  accessories: ["phu kien", "phu kien kem theo", "kem theo"],
} as const;

function findLabeledValue(lines: string[], labels: readonly string[]): string | null {
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const label = removeDiacritics(line.slice(0, colonIndex)).trim();
    if ((labels as readonly string[]).includes(label)) {
      const value = line.slice(colonIndex + 1).trim();
      if (value) return value;
    }
  }
  return null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * JS's `\b` is ASCII-word-based, so it silently fails to find a boundary
 * next to an accented Vietnamese letter (e.g. "áo", "đầm", "ví", "mũ" —
 * anything starting or ending in á/đ/í/ũ/etc. would never match). This
 * builds an equivalent boundary using Unicode letter/number properties
 * instead, which handles accented characters correctly.
 */
function keywordPattern(keyword: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegex(keyword)}(?![\\p{L}\\p{N}])`, "iu");
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
    const hit = brand.keywords.some((kw) => keywordPattern(kw).test(normalizedText));
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

function slugifyBrand(str: string): string {
  return removeDiacritics(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * BAG_BRANDS is a curated list of the brands seen often enough to warrant a
 * canonical name/slug (so "LV" resolves to "Louis Vuitton", not literally
 * "LV") — it was never meant to be an exhaustive whitelist of every luxury
 * brand that exists. An explicit "Hãng: <name>" label isn't ambiguous the
 * way scanning free text for a keyword is, so unlike parseBrand() above,
 * this never rejects a brand just because it isn't one of our ~13 keywords.
 */
function resolveBrandFromLabel(value: string): { slug: string; name: string; raw: string; warning: null } {
  const normalized = removeDiacritics(value);
  for (const brand of BAG_BRANDS) {
    const hit = brand.keywords.some((kw) => keywordPattern(kw).test(normalized));
    if (hit) return { slug: brand.slug, name: brand.name, raw: brand.name, warning: null };
  }
  const raw = value.trim();
  return { slug: slugifyBrand(raw), name: raw, raw, warning: null };
}

function parseCategory(
  loweredText: string
): { slug: string | null; name: string | null; raw: string | null; warning: string | null } {
  const matches: ItemCategory[] = [];
  for (const category of ITEM_CATEGORIES) {
    const hit = category.keywords.some((kw) => keywordPattern(kw).test(loweredText));
    if (hit) matches.push(category);
  }

  if (matches.length === 0) {
    return { slug: null, name: null, raw: null, warning: "Không nhận diện được loại hàng" };
  }
  if (matches.length > 1) {
    const names = matches.map((m) => m.name).join(", ");
    return { slug: null, name: null, raw: names, warning: `Phát hiện nhiều loại hàng có thể khớp (${names}), vui lòng xác nhận lại` };
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

export interface FieldEdit {
  field: "name" | "brand" | "category" | "condition" | "price" | "size" | "accessories";
  raw: string;
}

/**
 * Post-publish correction commands — sellers can send e.g. "Sửa giá: 25tr"
 * or "Đổi tên: ..." at any point after a listing is already live to patch
 * just that one field, without having to redo the whole post. Verb (sửa/
 * đổi/cập nhật) + field keyword before the ":", diacritics-insensitive,
 * same matching style as FIELD_LABELS above.
 */
const EDIT_FIELD_KEYWORDS: Record<FieldEdit["field"], string[]> = {
  name: ["ten"],
  brand: ["hang", "thuong hieu"],
  category: ["loai", "loai hang"],
  condition: ["tinh trang"],
  price: ["gia"],
  size: ["size", "kich thuoc", "kich co"],
  accessories: ["phu kien", "phu kien kem theo"],
};

const EDIT_VERBS = ["sua", "doi", "cap nhat"];

const EDIT_LABELS: Record<string, FieldEdit["field"]> = Object.fromEntries(
  (Object.entries(EDIT_FIELD_KEYWORDS) as [FieldEdit["field"], string[]][]).flatMap(([field, keywords]) =>
    keywords.flatMap((kw) => EDIT_VERBS.map((verb) => [`${verb} ${kw}`, field]))
  )
);

const SORTED_EDIT_LABELS = Object.keys(EDIT_LABELS).sort((a, b) => b.length - a.length);

const EDIT_LABEL_ALTERNATION = SORTED_EDIT_LABELS.map(escapeRegex).join("|");
// A label only counts as the start of a NEW command at the very start of the
// line, or right after a comma — this is what lets "Sửa tên: LV, sửa hãng:
// LV" pack multiple edits into one line/message, while a comma INSIDE a
// value (e.g. "Phụ kiện kèm theo: Hộp, túi vải, bill") is left alone, since
// "túi vải" and "bill" don't themselves look like the start of an edit
// command and so aren't treated as a boundary.
const EDIT_LABEL_START = new RegExp(`(?:^|,)\\s*(${EDIT_LABEL_ALTERNATION})(?=\\s*:|\\s)`, "gi");

interface LabelStart {
  commaIndex: number;
  valueStart: number;
  field: FieldEdit["field"];
}

function findEditLabelStarts(stripped: string): LabelStart[] {
  const starts: LabelStart[] = [];
  EDIT_LABEL_START.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = EDIT_LABEL_START.exec(stripped))) {
    const label = match[1].toLowerCase();
    const labelEnd = match.index + match[0].length;
    const sep = stripped.slice(labelEnd).match(/^\s*:?\s*/);
    const valueStart = labelEnd + (sep ? sep[0].length : 0);
    starts.push({ commaIndex: match.index, valueStart, field: EDIT_LABELS[label] });
    EDIT_LABEL_START.lastIndex = valueStart;
  }
  return starts;
}

function parseEditCommandsFromLine(line: string): FieldEdit[] {
  const stripped = removeDiacritics(line).toLowerCase();
  const starts = findEditLabelStarts(stripped);
  if (starts.length === 0) return [];

  const edits: FieldEdit[] = [];
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].commaIndex : line.length;
    const value = line.slice(starts[i].valueStart, end).trim();
    if (value) edits.push({ field: starts[i].field, raw: value });
  }
  return edits;
}

/**
 * Matches both "Sửa tên: LV" (labeled-line style, like FIELD_LABELS above)
 * and "sua ten LV" (no colon) — sellers type these commands quickly and
 * often skip the colon, and silently mis-parsing it as a brand-new post
 * (the fallback when nothing matches) is much worse than being lenient here.
 * Also matches several packed into one line/message, comma-separated:
 * "Sửa tên: LV, sửa hãng: LV".
 */
export function parseEditCommands(rawText: string): FieldEdit[] {
  const lines = rawText
    .trim()
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  return lines.flatMap(parseEditCommandsFromLine);
}

export function parseSingleBrand(value: string) {
  return resolveBrandFromLabel(value);
}

export function parseSingleCategory(value: string) {
  return parseCategory(value.toLowerCase());
}

export function parseSinglePrice(value: string): { price: number | null; raw: string | null; warning: string | null } {
  const result = extractPrice(value);
  if (result === "ambiguous") {
    return { price: null, raw: null, warning: "Có nhiều số giống giá, không rõ giá nào đúng" };
  }
  if (result) return checkBounds(result.price, result.raw);
  return { price: null, raw: null, warning: "Không tìm thấy giá" };
}

export function parseSingleCondition(value: string): "new" | "used" {
  return /\bpass\b/i.test(removeDiacritics(value)) ? "used" : "new";
}

const TARGET_ID_LABELS = ["ma", "id", "ma san pham"];

/**
 * Every published listing gets a short numeric "Mã" (display_id) — sellers
 * reference it with a "Mã: <n>" line alongside "Sửa ..." commands to target
 * an older listing instead of the most recently published one (the default
 * when no ID line is given).
 */
export function parseEditTargetId(rawText: string): number | null {
  const lines = rawText
    .trim()
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const value = findLabeledValue(lines, TARGET_ID_LABELS);
  if (!value) return null;
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

const DELETE_PATTERN = /^xoa\b\s*(?:#|ma\s+|san\s*pham\s+)?(\d+)?\s*[.!]?\s*$/i;

/**
 * "Xoá" (optionally with a "Mã"/#id) unpublishes a listing from the site.
 * Only matched against the first line, same as OK_PATTERN — this is meant
 * to be a standalone command, not mixed with other content.
 */
export function parseDeleteCommand(rawText: string): { id: number | null } | null {
  const firstLine = rawText.trim().split(/\r?\n/)[0] ?? "";
  const stripped = removeDiacritics(firstLine).trim();
  const match = DELETE_PATTERN.exec(stripped);
  if (!match) return null;
  return { id: match[1] ? parseInt(match[1], 10) : null };
}

const LIST_PATTERN = /^(danh sach|ds|list)[.!\s]*$/i;

/** "Danh sách" / "Ds" — looks up every currently-published listing's Mã, so a seller can find the ID of a product without scrolling back through chat history. */
export function isListCommand(rawText: string): boolean {
  return LIST_PATTERN.test(removeDiacritics(rawText.trim()));
}

const HELP_PATTERN = /^(\/help|help|tro giup|huong dan|\?)[.!\s]*$/i;

/** "/help" / "Trợ giúp" / "?" — a seller asked for this in testing, so it exists now. */
export function isHelpCommand(rawText: string): boolean {
  return HELP_PATTERN.test(removeDiacritics(rawText.trim()));
}

const RESET_PATTERN = /^(reset|lam lai|bat dau lai)[.!\s]*$/i;

/**
 * "Reset" — an escape hatch when the chat's draft state gets confusing
 * (stuck photos, a pending edit/delete they don't want, an old caption they
 * lost track of). Only ever clears IN-PROGRESS drafts for this chat
 * (collecting/awaiting/queued + any pending edit) — never touches anything
 * already published, so it can't be used to accidentally wipe live listings.
 */
export function isResetCommand(rawText: string): boolean {
  return RESET_PATTERN.test(removeDiacritics(rawText.trim()));
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
      category: null,
      categoryName: null,
      categoryRaw: null,
      condition: "new",
      price: null,
      priceRaw: null,
      size: null,
      accessories: null,
      warnings: ["Không có nội dung mô tả"],
    };
  }

  const normalized = removeDiacritics(trimmed);
  const lowered = trimmed.toLowerCase();
  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const labeledName = findLabeledValue(lines, FIELD_LABELS.name);
  const name = labeledName ?? parseName(trimmed);
  if (!name) warnings.push("Không xác định được tên sản phẩm");

  const labeledBrand = findLabeledValue(lines, FIELD_LABELS.brand);
  const brandResult = labeledBrand ? resolveBrandFromLabel(labeledBrand) : parseBrand(normalized);
  if (brandResult.warning) warnings.push(brandResult.warning);

  const labeledCategory = findLabeledValue(lines, FIELD_LABELS.category);
  const categoryResult = parseCategory(labeledCategory ? labeledCategory.toLowerCase() : lowered);
  if (categoryResult.warning) warnings.push(categoryResult.warning);

  const labeledCondition = findLabeledValue(lines, FIELD_LABELS.condition);
  const condition: "new" | "used" = /\bpass\b/i.test(
    removeDiacritics(labeledCondition ?? normalized)
  )
    ? "used"
    : "new";

  const priceResult = parsePrice(trimmed);
  if (priceResult.warning) warnings.push(priceResult.warning);

  const size = findLabeledValue(lines, FIELD_LABELS.size);
  const accessories = findLabeledValue(lines, FIELD_LABELS.accessories);

  return {
    name,
    brand: brandResult.slug,
    brandName: brandResult.name,
    brandRaw: brandResult.raw,
    category: categoryResult.slug,
    categoryName: categoryResult.name,
    categoryRaw: categoryResult.raw,
    condition,
    price: priceResult.price,
    priceRaw: priceResult.raw,
    size,
    accessories,
    warnings,
  };
}
