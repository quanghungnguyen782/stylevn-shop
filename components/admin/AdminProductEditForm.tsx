"use client";

import { useEffect, useState } from "react";
import { BRANDS, CATEGORIES } from "@/lib/constants";
import type { Product, Gender } from "@/types/product";
import { Button } from "@/components/ui/Button";

const GENDERS: Gender[] = ["Nam", "Nữ", "Unisex", "Trẻ Em"];

type EditableFields = Pick<
  Product,
  "name" | "description" | "brand" | "category" | "gender" | "price" | "oldPrice" | "stock" | "sizes" | "images"
>;

export function AdminProductEditForm({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [fields, setFields] = useState<EditableFields | null>(null);
  const [sizesText, setSizesText] = useState("");
  const [imagesText, setImagesText] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/products/${productId}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Không tải được sản phẩm.");
        }
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setFields(data);
        setSizesText(data.sizes.join(", "));
        setImagesText(data.images.join("\n"));
      })
      .catch((err) => setLoadError(err.message));
  }, [productId]);

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;
  if (!product || !fields) return <p className="text-sm text-muted">Đang tải...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields) return;
    setSaving(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const body = {
        ...fields,
        sizes: sizesText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        images: imagesText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error ?? "Lưu thất bại.");
        return;
      }
      setSaveMessage(data.message ?? "Đã lưu.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div className="flex gap-4 text-xs text-muted">
        <span>Slug: {product.slug} (không thể sửa)</span>
        <span>Mã: {product.code} (không thể sửa)</span>
      </div>

      <Field label="Tên sản phẩm">
        <input
          required
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </Field>

      <Field label="Mô tả">
        <textarea
          rows={4}
          value={fields.description}
          onChange={(e) => setFields({ ...fields, description: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Thương hiệu">
          <select
            value={fields.brand}
            onChange={(e) => setFields({ ...fields, brand: e.target.value as Product["brand"] })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          >
            {BRANDS.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Danh mục">
          <select
            value={fields.category}
            onChange={(e) => setFields({ ...fields, category: e.target.value as Product["category"] })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Giới tính">
          <select
            value={fields.gender}
            onChange={(e) => setFields({ ...fields, gender: e.target.value as Gender })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          >
            {GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Giá (đ)">
          <input
            type="number"
            min={0}
            value={fields.price}
            onChange={(e) => setFields({ ...fields, price: Number(e.target.value) })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </Field>
        <Field label="Giá cũ (đ, 0 = không giảm giá)">
          <input
            type="number"
            min={0}
            value={fields.oldPrice}
            onChange={(e) => setFields({ ...fields, oldPrice: Number(e.target.value) })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </Field>
        <Field label="Tồn kho">
          <input
            type="number"
            min={0}
            value={fields.stock}
            onChange={(e) => setFields({ ...fields, stock: Number(e.target.value) })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </Field>
      </div>

      <Field label="Size (cách nhau bởi dấu phẩy)">
        <input
          value={sizesText}
          onChange={(e) => setSizesText(e.target.value)}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </Field>

      <Field label="Ảnh (mỗi link một dòng)">
        <textarea
          rows={4}
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {imagesText
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary external URLs, not a site image
              <img key={i} src={url} alt="" className="h-20 w-16 border border-line object-cover" />
            ))}
        </div>
      </Field>

      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
      {saveMessage && <p className="text-sm text-accent-dark">{saveMessage}</p>}

      <Button type="submit" variant="primary" size="lg" disabled={saving}>
        {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-wide text-muted">{label}</label>
      {children}
    </div>
  );
}
