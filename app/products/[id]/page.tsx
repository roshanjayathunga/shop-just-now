import { products } from "@/lib/data";
import ProductDetailPageClient from "./ProductDetailPageClient";

// Add this function to generate static paths for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailPageClient params={params} />;
}
