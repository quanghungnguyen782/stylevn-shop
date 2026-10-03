import { getAllProducts } from "@/lib/product-service";
import { AdminProductList } from "@/components/admin/AdminProductList";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl">Sản Phẩm ({products.length})</h1>
      <AdminProductList products={products} />
    </div>
  );
}
