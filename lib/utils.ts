import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount?: number | null) {
  if (amount == null) {
    return "Price unavailable";
  }

  return `Rs. ${amount.toLocaleString("en-PK")}/-`;
}

export function getDiscountedPrice(
  price: number,
  discountPercent?: number,
): number {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price - (price * discountPercent) / 100);
}
