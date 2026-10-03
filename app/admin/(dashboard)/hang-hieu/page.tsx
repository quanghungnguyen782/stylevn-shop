import { getAllBagProducts } from "@/lib/bag-product-service";
import { AdminBagList } from "@/components/admin/AdminBagList";

export default async function AdminBagsPage() {
  const bags = await getAllBagProducts();
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl">Hàng Hiệu ({bags.length})</h1>
      <AdminBagList bags={bags} />
    </div>
  );
}
