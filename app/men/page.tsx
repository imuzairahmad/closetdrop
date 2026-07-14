import {
  getProductsByCategoryPaged,
  getSubCategoriesForCategory,
} from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { Pagination } from "@/components/pagination";

export const revalidate = 60;

export const metadata = {
  title: "Men's Collection — Closetdrop™️",
};

const PAGE_SIZE = 12;

export default async function MenPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [{ products, total }, availableSubCategories] = await Promise.all([
    getProductsByCategoryPaged("men", page, PAGE_SIZE),
    getSubCategoriesForCategory("men"),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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

      <ProductGrid
        products={products}
        availableSubCategories={availableSubCategories}
      />

      <Pagination currentPage={page} totalPages={totalPages} basePath="/men" />
    </div>
  );
}
