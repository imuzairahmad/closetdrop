import { contentfulClient, isContentfulConfigured } from "./contentful";
import { Product, Category, SubCategory } from "@/types/product";

// Fallback demo data so the site renders immediately, before Contentful
// is wired up. Once you add real entries in Contentful this is ignored.
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "womens-nike-epic-react-flyknit-2",
    title: "Women's Nike Epic React Flyknit 2",
    brandTag: "Closetdrop™️",
    category: "women",
    subCategory: "shoes",
    condition: "Lush Condition 🫦",
    sizeNote: "Confirm your size with US",
    authenticity: "UPC Verified 100% Authentic",
    description:
      "A clean pair of Nike Epic React Flyknit 2s, thrifted and checked for authenticity. Soft knit upper, React foam cushioning, barely-worn tread.",
    price: 3000,
    images: [
      {
        url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
        alt: "Women's Nike Epic React Flyknit 2",
      },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "mens-levis-501-jeans",
    title: "Men's Levi's 501 Original Jeans",
    brandTag: "Closetdrop™️",
    category: "men",
    subCategory: "jeans",
    condition: "Great Condition 🔥",
    sizeNote: "Confirm your size with waist tag",
    authenticity: "Tag Verified 100% Authentic",
    description:
      "Classic straight-leg Levi's 501s. Thrifted, washed, ready to wear. True vintage fade.",
    price: 2500,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        alt: "Men's Levi's 501 Jeans",
      },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "mens-chain-necklace",
    title: "Men's Cuban Link Chain",
    brandTag: "Closetdrop™️",
    category: "men",
    subCategory: "jewelry",
    condition: "Like New ✨",
    sizeNote: "20 inch length",
    authenticity: "Stainless Steel, Tarnish Free",
    description:
      "Bold Cuban link chain, stainless steel so it won't fade or tarnish. Thrifted piece in excellent shape.",
    price: 1800,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
        alt: "Men's Cuban Link Chain",
      },
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "womens-oversized-denim-shirt",
    title: "Women's Oversized Denim Shirt",
    brandTag: "Closetdrop™️",
    category: "women",
    subCategory: "shirts",
    condition: "Lush Condition 🫦",
    sizeNote: "Fits S-M oversized",
    authenticity: "Thrift Checked",
    description:
      "Oversized light-wash denim shirt, perfect for layering. Soft, broken-in fabric.",
    price: 1600,
    images: [
      {
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
        alt: "Women's Oversized Denim Shirt",
      },
    ],
  },
  {
    id: "5",
    slug: "mens-graphic-tee",
    title: "Men's Vintage Graphic Tee",
    brandTag: "Closetdrop™️",
    category: "men",
    subCategory: "shirts",
    condition: "Good Condition",
    sizeNote: "Fits M-L",
    authenticity: "Thrift Checked",
    description:
      "Vintage-style graphic tee, soft cotton, slightly faded print for that lived-in look.",
    price: 1200,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
        alt: "Men's Vintage Graphic Tee",
      },
    ],
  },
  {
    id: "6",
    slug: "womens-mom-jeans",
    title: "Women's High Waisted Mom Jeans",
    brandTag: "Closetdrop™️",
    category: "women",
    subCategory: "jeans",
    condition: "Lush Condition 🫦",
    sizeNote: "Confirm your size with waist tag",
    authenticity: "Tag Verified 100% Authentic",
    description:
      "High-waisted mom jeans with a relaxed fit through the leg. Timeless thrifted staple.",
    price: 2200,
    images: [
      {
        url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1200&auto=format&fit=crop",
        alt: "Women's Mom Jeans",
      },
    ],
  },
];

function mapEntryToProduct(entry: any): Product {
  const f = entry?.fields ?? {};
  const images = (f.images || []).map((img: any) => ({
    url: `https:${img.fields.file.url}`,
    alt: img.fields.title || f.title,
    width: img.fields.file.details?.image?.width,
    height: img.fields.file.details?.image?.height,
  }));

  return {
    id: entry.sys.id,
    slug: f.slug,
    title: f.title,
    brandTag: f.brandTag || "Closetdrop™️",
    category: f.category,
    subCategory: f.subCategory,
    condition: f.condition,
    sizeNote: f.sizeNote,
    authenticity: f.authenticity,
    description: f.description,
    price: f.price,
    images: images.length
      ? images
      : [{ url: "/placeholder.jpg", alt: f.title }],
    featured: f.featured || false,
    sold: f.sold || false,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isContentfulConfigured || !contentfulClient) {
    console.warn("⚠️ Contentful NOT configured — serving mock data");
    return MOCK_PRODUCTS;
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "product",
      order: ["-sys.createdAt"] as any,
    });
    // console.log(`✅ Contentful returned ${entries.items.length} products`);
    return entries.items.map(mapEntryToProduct);
  } catch (err) {
    console.error(
      "❌ Contentful fetch failed, falling back to mock data:",
      err,
    );
    return MOCK_PRODUCTS;
  }
}

export async function getProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.category === category);
}

/**
 * Paginated + server-side filtered fetch for category listing pages
 * (/men, /women).
 *
 * Pushes `fields.category`, `limit`, and `skip` into the Contentful query
 * itself instead of fetching every product for a category and slicing in
 * memory. This matters once a category has hundreds of entries — without
 * it, every visit to page 5 would still download every product for the
 * category over the network just to throw most of it away.
 */
export async function getProductsByCategoryPaged(
  category: Category,
  page: number,
  pageSize: number,
): Promise<{ products: Product[]; total: number }> {
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * pageSize;

  if (!isContentfulConfigured || !contentfulClient) {
    console.warn("⚠️ Contentful NOT configured — serving mock data");
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === category);
    return {
      products: filtered.slice(skip, skip + pageSize),
      total: filtered.length,
    };
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "product",
      "fields.category": category,
      order: ["-sys.createdAt"] as any,
      limit: pageSize,
      skip,
    } as any);

    return {
      products: entries.items.map(mapEntryToProduct),
      total: entries.total,
    };
  } catch (err) {
    console.error(
      "❌ Contentful paged fetch failed, falling back to mock data:",
      err,
    );
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === category);
    return {
      products: filtered.slice(skip, skip + pageSize),
      total: filtered.length,
    };
  }
}

/**
 * Paginated fetch across ALL categories, for the /shop page.
 * Same reasoning as getProductsByCategoryPaged — limit/skip pushed into
 * the Contentful query rather than fetching everything and slicing.
 */
export async function getAllProductsPaged(
  page: number,
  pageSize: number,
): Promise<{ products: Product[]; total: number }> {
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * pageSize;

  if (!isContentfulConfigured || !contentfulClient) {
    console.warn("⚠️ Contentful NOT configured — serving mock data");
    return {
      products: MOCK_PRODUCTS.slice(skip, skip + pageSize),
      total: MOCK_PRODUCTS.length,
    };
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "product",
      order: ["-sys.createdAt"] as any,
      limit: pageSize,
      skip,
    } as any);

    return {
      products: entries.items.map(mapEntryToProduct),
      total: entries.total,
    };
  } catch (err) {
    console.error(
      "❌ Contentful paged fetch failed, falling back to mock data:",
      err,
    );
    return {
      products: MOCK_PRODUCTS.slice(skip, skip + pageSize),
      total: MOCK_PRODUCTS.length,
    };
  }
}

/**
 * Lightweight fetch of just the distinct subCategory values for a category,
 * used to populate the filter pills/tabs on listing pages. Uses Contentful's
 * `select` to pull only the one field instead of full entries (images,
 * description, etc.), since the filter UI never needs that payload.
 */
/**
 * Lightweight fetch of distinct subCategory values for a category, used to
 * populate the filter pills/tabs on listing pages.
 *
 * NOTE: intentionally does NOT use Contentful's `select` param. With only
 * one field selected, entries missing a value for that field can come back
 * with `fields` omitted entirely (not just the field itself undefined),
 * which crashed here previously. Fetching full entries and guarding with
 * optional chaining is more robust for a catalog this size.
 */
export async function getSubCategoriesForCategory(
  category: Category,
): Promise<SubCategory[]> {
  if (!isContentfulConfigured || !contentfulClient) {
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === category);
    return Array.from(
      new Set(filtered.map((p) => p.subCategory)),
    ) as SubCategory[];
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "product",
      "fields.category": category,
      limit: 1000,
    } as any);

    const subCategories = entries.items
      .map((entry: any) => entry?.fields?.subCategory)
      .filter((sc: unknown): sc is SubCategory => Boolean(sc));

    return Array.from(new Set(subCategories));
  } catch (err) {
    console.error(
      "❌ Contentful subCategory fetch failed, falling back to mock data:",
      err,
    );
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === category);
    return Array.from(
      new Set(filtered.map((p) => p.subCategory)),
    ) as SubCategory[];
  }
}

/**
 * Distinct subCategory values across all products (any category), for the
 * /shop page's filter pills. See note above re: avoiding `select`.
 */
export async function getAllSubCategories(): Promise<SubCategory[]> {
  if (!isContentfulConfigured || !contentfulClient) {
    return Array.from(
      new Set(MOCK_PRODUCTS.map((p) => p.subCategory)),
    ) as SubCategory[];
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "product",
      limit: 1000,
    } as any);

    const subCategories = entries.items
      .map((entry: any) => entry?.fields?.subCategory)
      .filter((sc: unknown): sc is SubCategory => Boolean(sc));

    return Array.from(new Set(subCategories));
  } catch (err) {
    console.error(
      "❌ Contentful subCategory fetch failed, falling back to mock data:",
      err,
    );
    return Array.from(
      new Set(MOCK_PRODUCTS.map((p) => p.subCategory)),
    ) as SubCategory[];
  }
}
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 4);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) || null;
}
