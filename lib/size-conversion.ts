import { Category } from "@/types/product";

/**
 * Pulls the first number (integer or half-size like 8.5) out of a free-text
 * sizeNote field, e.g. "Confirm your size with US 8" -> "8".
 * Returns null if no number is found.
 */
export function extractUSSize(sizeNote: string | undefined): string | null {
  if (!sizeNote) return null;
  const match = sizeNote.match(/(\d+(\.\d+)?)/);
  return match ? match[1] : null;
}

// Standard US -> UK/EU shoe size conversion tables.
// Men's and women's differ by roughly 1.5 US sizes.
const MENS_SHOE_SIZES: Record<string, { uk: string; eu: string }> = {
  "6": { uk: "5.5", eu: "39" },
  "6.5": { uk: "6", eu: "39" },
  "7": { uk: "6.5", eu: "40" },
  "7.5": { uk: "7", eu: "40.5" },
  "8": { uk: "7.5", eu: "41" },
  "8.5": { uk: "8", eu: "42" },
  "9": { uk: "8.5", eu: "42.5" },
  "9.5": { uk: "9", eu: "43" },
  "10": { uk: "9.5", eu: "44" },
  "10.5": { uk: "10", eu: "44.5" },
  "11": { uk: "10.5", eu: "45" },
  "11.5": { uk: "11", eu: "45.5" },
  "12": { uk: "11.5", eu: "46" },
  "13": { uk: "12.5", eu: "47.5" },
};

const WOMENS_SHOE_SIZES: Record<string, { uk: string; eu: string }> = {
  "5": { uk: "2.5", eu: "35.5" },
  "5.5": { uk: "3", eu: "36" },
  "6": { uk: "3.5", eu: "36.5" },
  "6.5": { uk: "4", eu: "37.5" },
  "7": { uk: "4.5", eu: "38" },
  "7.5": { uk: "5", eu: "38.5" },
  "8": { uk: "5.5", eu: "39" },
  "8.5": { uk: "6", eu: "40" },
  "9": { uk: "6.5", eu: "40.5" },
  "9.5": { uk: "7", eu: "41" },
  "10": { uk: "7.5", eu: "42" },
  "11": { uk: "8.5", eu: "43" },
};

/**
 * Given a US size and category, returns equivalent UK/EU sizes.
 * Returns null if size is missing or outside the table (e.g. non-shoe items,
 * or a size not in the standard chart).
 */
export function convertUSShoeSize(
  usSize: string | null,
  category: Category,
): { uk: string; eu: string } | null {
  if (!usSize) return null;
  const table = category === "men" ? MENS_SHOE_SIZES : WOMENS_SHOE_SIZES;
  return table[usSize] ?? null;
}
