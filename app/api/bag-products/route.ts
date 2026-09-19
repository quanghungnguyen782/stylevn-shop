import { NextResponse } from "next/server";
import { getAllBagProducts } from "@/lib/bag-product-service";

// Lets client components (the search overlay) look up the Supabase-backed
// hàng-hiệu catalog without bundling it at build time or querying Supabase
// directly from the browser. Cached for 60s to match the ISR window used
// everywhere else this catalog is read.
export const revalidate = 60;

export async function GET() {
  const products = await getAllBagProducts();
  return NextResponse.json(products);
}
