import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  // Compact page list: always show first, last, current, and one neighbor
  // each side — collapses long ranges with "…" instead of rendering every page.
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <Link
        href={`${basePath}?page=${prevPage}`}
        aria-disabled={currentPage === 1}
        className={`px-3 py-2 text-sm font-semibold rounded-md border ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        Prev
      </Link>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`px-3 py-2 text-sm font-semibold rounded-md border ${
              p === currentPage
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={`${basePath}?page=${nextPage}`}
        aria-disabled={currentPage === totalPages}
        className={`px-3 py-2 text-sm font-semibold rounded-md border ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

function getVisiblePages(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}
