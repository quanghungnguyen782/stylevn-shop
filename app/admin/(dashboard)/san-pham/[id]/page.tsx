import { AdminProductEditForm } from "@/components/admin/AdminProductEditForm";

export default async function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl">Sửa Sản Phẩm #{id}</h1>
      <AdminProductEditForm productId={id} />
    </div>
  );
}
