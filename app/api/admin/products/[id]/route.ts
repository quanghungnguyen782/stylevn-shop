import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { BRANDS, CATEGORIES } from "@/lib/constants";
import { getProductsFile, putProductsFile, ProductsFileConflictError } from "@/lib/github-content";
import type { BrandSlug, CategorySlug, Product } from "@/types/product";

const BRAND_SLUGS = BRANDS.map((b) => b.slug) as [BrandSlug, ...BrandSlug[]];
const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];
const GENDERS = ["Nam", "Nữ", "Unisex", "Trẻ Em"] as const;

const ProductEditSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string(),
  brand: z.enum(BRAND_SLUGS),
  category: z.enum(CATEGORY_SLUGS),
  gender: z.enum(GENDERS),
  price: z.coerce.number().int().min(0),
  oldPrice: z.coerce.number().int().min(0),
  stock: z.coerce.number().int().min(0),
  sizes: z.array(z.string()),
  images: z.array(z.string()),
});

async function loadProducts(): Promise<{ products: Product[]; sha: string }> {
  const { content, sha } = await getProductsFile();
  return { products: JSON.parse(content) as Product[], sha };
}

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/admin/products/[id]">) {
  const { id } = await ctx.params;
  const { products } = await loadProducts();
  const product = products.find((p) => String(p.id) === id);
  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/admin/products/[id]">) {
  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  const parsed = ProductEditSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ.", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const { products, sha } = await loadProducts();
    const index = products.findIndex((p) => String(p.id) === id);
    if (index === -1) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm." }, { status: 404 });
    }

    const updated: Product = { ...products[index], ...parsed.data };
    products[index] = updated;

    // Reproduce the file's existing 2-space formatting so a single-field
    // edit doesn't turn into a whole-file whitespace diff.
    const newContent = JSON.stringify(products, null, 2) + "\n";
    await putProductsFile(newContent, sha, `Admin edit: update product #${id} (${updated.name})`);

    return NextResponse.json({
      ok: true,
      message: "Đã lưu — trang sẽ cập nhật sau khoảng 2-3 phút (Render tự rebuild), không cần giữ tab này.",
    });
  } catch (err) {
    if (err instanceof ProductsFileConflictError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    console.error("admin product PATCH failed", err);
    return NextResponse.json({ error: "Có lỗi xảy ra, vui lòng thử lại." }, { status: 500 });
  }
}
