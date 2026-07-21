export type Category = "women" | "men";

export type SubCategory = "shoes" | "jeans" | "shirts" | "jewelry";

export type SizeStandard = "US" | "UK" | "EU";

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brandTag: string;
  category: Category;
  subCategory: SubCategory;
  condition: string;
  sizeNote: string;
  authenticity: string;
  description: string;
  price: number;
  images: ProductImage[];
  featured?: boolean;
  sold?: boolean;
  discountPercent?: number;
}
