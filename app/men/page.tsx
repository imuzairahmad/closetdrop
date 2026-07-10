import { getProductsByCategory } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { SubCategory } from "@/types/product";

export const metadata = {
  title: "Men's Collection — Closetdrop™️",
};

export default async function MenPage() {
  const products = await getProductsByCategory("men");
  const availableSubCategories = Array.from(
    new Set(products.map((p) => p.subCategory))
  ) as SubCategory[];

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Closetdrop™️
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Men</h1>
        <p className="text-muted-foreground mt-2 max-w-lg">
          Thrifted shoes, jeans, shirts &amp; jewelry — verified authentic,
          condition checked, priced fixed.
        </p>
      </div>

      <ProductGrid products={products} availableSubCategories={availableSubCategories} />
    </div>
  );
}
