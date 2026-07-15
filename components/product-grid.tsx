"use client";

import { useMemo, useState } from "react";
import { Product, SubCategory } from "@/types/product";
import {
  Filters,
  ProductFilters,
  applyFilters,
  makeDefaultFilters,
} from "@/components/product-filters";
import { Pagination } from "@/components/pagination";
import { ProductCard } from "@/components/product-card";

const PAGE_SIZE = 12;

export function ProductGrid({
  products,
  availableSubCategories,
}: {
  products: Product[];
  availableSubCategories: SubCategory[];
}) {
  const [filters, setFilters] = useState<Filters>(() =>
    makeDefaultFilters(products),
  );
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => applyFilters(products, filters),
    [products, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  function handleFilterChange(next: Filters) {
    setFilters(next);
    setPage(1); // reset to page 1 whenever filters change
  }

  return (
    <div>
      <ProductFilters
        products={products}
        availableSubCategories={availableSubCategories}
        filters={filters}
        onChange={handleFilterChange}
      />

      {pageItems.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">
          No items match those filters.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {pageItems.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={currentPage === 1 && i < 4}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
