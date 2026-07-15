"use client";

import { useMemo } from "react";
import { Product, SizeStandard, SubCategory } from "@/types/product";
import { getPriceBounds } from "@/lib/products";
import { extractUSSize, convertUSShoeSize } from "@/lib/size-conversion";
import { Button } from "@/components/ui/button";

export interface Filters {
  subCategory: SubCategory | "all";
  sizeStandard: SizeStandard;
  size: string | "all";
  minPrice: number;
  maxPrice: number;
}

export function makeDefaultFilters(products: Product[]): Filters {
  const [min, max] = getPriceBounds(products);
  return {
    subCategory: "all",
    sizeStandard: "US",
    size: "all",
    minPrice: min,
    maxPrice: max,
  };
}

function resolveSize(product: Product, standard: SizeStandard): string | null {
  const usSize = extractUSSize(product.sizeNote);
  if (standard === "US") return usSize;
  const converted = convertUSShoeSize(usSize, product.category);
  if (!converted) return null;
  return standard === "UK" ? converted.uk : converted.eu;
}

export function applyFilters(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    if (filters.subCategory !== "all" && p.subCategory !== filters.subCategory)
      return false;

    if (filters.size !== "all") {
      if (p.subCategory !== "shoes") return false;
      const resolved = resolveSize(p, filters.sizeStandard);
      if (resolved !== filters.size) return false;
    }

    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;

    return true;
  });
}

export function ProductFilters({
  products,
  availableSubCategories,
  filters,
  onChange,
}: {
  products: Product[];
  availableSubCategories: SubCategory[];
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const [absMin, absMax] = useMemo(() => getPriceBounds(products), [products]);

  const sizeOptions = useMemo(() => {
    const values = new Set<string>();
    products
      .filter((p) => p.subCategory === "shoes")
      .forEach((p) => {
        const resolved = resolveSize(p, filters.sizeStandard);
        if (resolved) values.add(resolved);
      });
    return Array.from(values).sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [products, filters.sizeStandard]);

  const showSizeFilter =
    filters.subCategory === "all" || filters.subCategory === "shoes";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start mb-8 pb-6 border-b">
      {/* Category */}
      <div className="flex flex-col gap-1 min-h-[64px]">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Category
        </label>
        <select
          className="border rounded-md px-3 py-2 text-sm bg-background w-full"
          value={filters.subCategory}
          onChange={(e) =>
            onChange({
              ...filters,
              subCategory: e.target.value as SubCategory | "all",
              size: "all",
            })
          }
        >
          <option value="all">All</option>
          {availableSubCategories.map((sc) => (
            <option key={sc} value={sc}>
              {sc[0].toUpperCase() + sc.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Size standard — reserve the slot even when hidden, to keep grid stable */}
      <div className="flex flex-col gap-1 min-h-[64px]">
        {showSizeFilter && (
          <>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Size Standard
            </label>
            <div className="flex rounded-md border overflow-hidden w-fit">
              {(["US", "UK", "EU"] as SizeStandard[]).map((std) => (
                <button
                  key={std}
                  type="button"
                  onClick={() =>
                    onChange({ ...filters, sizeStandard: std, size: "all" })
                  }
                  className={`px-3 py-2 text-sm ${
                    filters.sizeStandard === std
                      ? "bg-foreground text-background"
                      : "bg-background"
                  }`}
                >
                  {std}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Size value */}
      <div className="flex flex-col gap-1 min-h-[64px]">
        {showSizeFilter && (
          <>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Size ({filters.sizeStandard})
            </label>
            <select
              className="border rounded-md px-3 py-2 text-sm bg-background w-full min-w-[100px]"
              value={filters.size}
              onChange={(e) => onChange({ ...filters, size: e.target.value })}
            >
              <option value="all">Any</option>
              {sizeOptions.map((s) => (
                <option key={s} value={s}>
                  {filters.sizeStandard} {s}
                </option>
              ))}
            </select>
            {filters.sizeStandard !== "US" && (
              <span className="text-[11px] text-muted-foreground">
                Approximate — verify with seller
              </span>
            )}
          </>
        )}
      </div>

      {/* Price range */}
      <div className="flex flex-col gap-1 min-h-[64px]">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Price: {filters.minPrice} – {filters.maxPrice}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="border rounded-md px-2 py-2 text-sm w-20 bg-background"
            value={filters.minPrice}
            min={absMin}
            max={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) })
            }
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            className="border rounded-md px-2 py-2 text-sm w-20 bg-background"
            value={filters.maxPrice}
            min={filters.minPrice}
            max={absMax}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <div className="col-span-2 sm:col-span-2 md:col-span-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(makeDefaultFilters(products))}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
