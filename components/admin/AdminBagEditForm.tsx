"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ITEM_CATEGORIES } from "@/lib/bag-post-parser";
import type { BagSubmissionRow } from "@/types/bag-submission";
import { Button } from "@/components/ui/Button";

// Edited and displayed via brand_raw (the human-readable name, e.g. "Gucci")
// rather than `brand` (the lowercase slug used for grouping) — the PATCH
// route re-resolves whatever text is submitted here back into a canonical
// slug/name pair, so this only ever needs to carry the display form.
type EditableFields = Pick<
  BagSubmissionRow,
  "name" | "brand_raw" | "item_category" | "condition" | "price" | "size" | "accessories"
>;

export function AdminBagEditForm({ bagId, knownBrands }: { bagId: string; knownBrands: string[] }) {
  const router = useRouter();
  const [row, setRow] = useState<BagSubmissionRow | null>(null);
  const [fields, setFields] = useState<EditableFields | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/bags/${bagId}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Không tải được sản phẩm.");
        }
        return res.json();
      })
      .then((data: BagSubmissionRow) => {
        setRow(data);
        setFields(data);
      })
      .catch((err) => setLoadError(err.message));
  }, [bagId]);

  if (loadError) return <p className="text-sm text-red-600">{loadError}</p>;
  if (!row || !fields) return <p className="text-sm text-muted">Đang tải...</p>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields) return;
    setSaving(true);
    setSaveError(null);
    setSaveMessage(null);
    try {
      const res = await fetch(`/api/admin/bags/${bagId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          brand: fields.brand_raw || null,
          itemCategory: fields.item_category || null,
          condition: fields.condition,
          price: fields.price,
          size: fields.size || null,
          accessories: fields.accessories || null,
        }),
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

  async function handleDelete() {
    if (!confirm("Gỡ sản phẩm này khỏi website?")) return;
    const res = await fetch(`/api/admin/bags/${bagId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete" }),
    });
    if (res.ok) {
      router.push("/admin/hang-hieu");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <p className="text-xs text-muted">Mã: #{row.display_id} — Slug: {row.slug} (không thể sửa)</p>

      <Field label="Tên sản phẩm">
        <input
          required
          value={fields.name ?? ""}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </Field>

      <Field label="Thương hiệu (gõ tự do, không cố định)">
        <input
          list="known-bag-brands"
          value={fields.brand_raw ?? ""}
          onChange={(e) => setFields({ ...fields, brand_raw: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
        <datalist id="known-bag-brands">
          {knownBrands.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Loại sản phẩm">
          <select
            value={fields.item_category ?? ""}
            onChange={(e) => setFields({ ...fields, item_category: e.target.value || null })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          >
            <option value="">— Chưa chọn —</option>
            {ITEM_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tình trạng">
          <select
            value={fields.condition ?? ""}
            onChange={(e) => setFields({ ...fields, condition: (e.target.value || null) as "new" | "used" | null })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          >
            <option value="">— Chưa chọn —</option>
            <option value="new">Mới</option>
            <option value="used">Đã qua sử dụng</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Giá (đ)">
          <input
            type="number"
            min={0}
            value={fields.price ?? ""}
            onChange={(e) => setFields({ ...fields, price: e.target.value ? Number(e.target.value) : null })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </Field>
        <Field label="Size">
          <input
            value={fields.size ?? ""}
            onChange={(e) => setFields({ ...fields, size: e.target.value })}
            className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </Field>
      </div>

      <Field label="Phụ kiện đi kèm">
        <input
          value={fields.accessories ?? ""}
          onChange={(e) => setFields({ ...fields, accessories: e.target.value })}
          className="w-full border border-line px-4 py-3 text-sm outline-none focus:border-ink"
        />
      </Field>

      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
      {saveMessage && <p className="text-sm text-accent-dark">{saveMessage}</p>}

      <div className="flex gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu Thay Đổi"}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={handleDelete}>
          Gỡ Khỏi Website
        </Button>
      </div>
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
