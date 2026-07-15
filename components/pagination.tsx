"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <button
        type="button"
        onClick={() => onPageChange(prevPage)}
        disabled={currentPage === 1}
        className={`px-3 py-2 text-sm font-semibold rounded-md border ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            type="button"
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`px-3 py-2 text-sm font-semibold rounded-md border ${
              p === currentPage
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(nextPage)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 text-sm font-semibold rounded-md border ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-muted"
        }`}
      >
        Next
      </button>
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
