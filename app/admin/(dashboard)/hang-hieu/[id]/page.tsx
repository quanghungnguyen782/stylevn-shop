import { getDistinctBagBrands } from "@/lib/bag-product-service";
import { AdminBagEditForm } from "@/components/admin/AdminBagEditForm";

export default async function AdminBagEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brands = await getDistinctBagBrands();
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl">Sửa Hàng Hiệu</h1>
      <AdminBagEditForm bagId={id} knownBrands={brands.map((b) => b.name)} />
    </div>
  );
}
