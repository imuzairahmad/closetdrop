"use client";

import { useState, useMemo } from "react";
import { Product, SubCategory } from "@/types/product";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  availableSubCategories: SubCategory[];
}

const LABELS: Record<SubCategory, string> = {
  shoes: "Shoes",
  jeans: "Jeans",
  shirts: "Shirts",
  jewelry: "Jewelry",
};

export function ProductGrid({
  products,
  availableSubCategories,
}: ProductGridProps) {
  const [filter, setFilter] = useState<SubCategory | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.subCategory === filter);
  }, [products, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
            filter === "all"
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
          )}
        >
          All
        </button>
        {availableSubCategories.map((sc) => (
          <button
            key={sc}
            onClick={() => setFilter(sc)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
              filter === sc
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {LABELS[sc]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm py-16 text-center">
          No pieces here yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
