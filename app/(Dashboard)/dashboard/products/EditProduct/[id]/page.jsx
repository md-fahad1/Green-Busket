// app/(Dashboard)/dashboard/products/EditProduct/[id]/page.tsx

import EditProductPage from "@/components/ProductEdit/page";
import { fetchAllProductIds } from "@/lib/FetchProduct";

export async function generateStaticParams() {
  try {
    const products = await fetchAllProductIds(); // Call the function!

    if (!products || products.length === 0) {
      return [{ id: "default" }];
    }

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [{ id: "default" }];
  }
}

export default function Page({ params }) {
  return <EditProductPage params={params} />;
}
