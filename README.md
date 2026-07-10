# Closetdrop™️

A showcase-only storefront for a thrifted fashion brand — built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Contentful.

No cart, no checkout — this is a lookbook. Buyers contact you via WhatsApp,
Instagram, or the contact form to purchase.

## Stack

- Next.js 14 (App Router, Server Components)
- TypeScript
- Tailwind CSS
- shadcn/ui (Button, Badge, Card, Input, Textarea, Label)
- Contentful (headless CMS for products)
- lucide-react (icons)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# fill in your Contentful credentials in .env.local
npm run dev
```

Open http://localhost:3000.

**Note:** the site works immediately with demo/mock product data even
without Contentful configured, so you can see the design right away.
Once you add real `.env.local` values it automatically switches to your
live Contentful data.

## Setting up Contentful

1. Create a free space at https://www.contentful.com
2. Go to **Settings → API keys → Add API key**, copy the Space ID and
   Content Delivery API access token into `.env.local`
3. Go to **Content model → Add content type**, create a type called
   `product` (API identifier: `product`) with these fields:

| Field name      | Field ID        | Type              | Notes                                  |
|------------------|------------------|-------------------|-----------------------------------------|
| Title            | title            | Short text        |                                          |
| Slug             | slug             | Short text        | unique, used in URL                     |
| Brand Tag        | brandTag         | Short text        | default: `Closetdrop™️`                 |
| Category         | category         | Short text        | value: `women` or `men`                 |
| Sub Category     | subCategory      | Short text        | value: `shoes`, `jeans`, `shirts`, `jewelry` |
| Condition        | condition        | Short text        | e.g. `Lush Condition 🫦`                |
| Size Note        | sizeNote         | Short text        | e.g. `Confirm your size with US`        |
| Authenticity     | authenticity     | Short text        | e.g. `UPC Verified 100% Authentic`      |
| Description      | description      | Long text         |                                          |
| Price            | price            | Number             |                                          |
| Original Price   | originalPrice    | Number (optional)  | for strikethrough discount display      |
| Price Label      | priceLabel       | Short text        | e.g. `Final Fixed⚠️`                    |
| Images           | images           | Media, many files  |                                          |
| Featured         | featured         | Boolean (optional) | show on homepage                        |
| Sold             | sold             | Boolean (optional) | shows "Sold Out" badge                  |

4. Add entries for each product, publish them, and they'll appear on the site.

> Tip: use "Sub Category" to control which filter pills show under Men/Women.
> Jewelry should only be added under `category: men` per your current catalog,
> but the field supports either category if you expand later.

## Project structure

```
app/
  page.tsx              → homepage
  women/page.tsx         → women's category grid
  men/page.tsx           → men's category grid
  product/[slug]/page.tsx → product detail (showcase, "message to buy" CTA)
  contact/page.tsx        → contact page + form
components/
  navbar.tsx, footer.tsx, product-card.tsx, product-grid.tsx
  ui/                     → shadcn primitives
lib/
  contentful.ts           → Contentful client + content model docs
  products.ts             → data fetching + mock fallback data
types/
  product.ts              → shared Product type
```

## Deploying

Deploy to Vercel (recommended for Next.js):

```bash
npm run build
```

Set the same environment variables from `.env.local` in your Vercel
project settings (Project → Settings → Environment Variables).

## Customizing

- Colors/theme: `app/globals.css` (CSS variables) and `tailwind.config.ts`
- Brand copy, hero image: `app/page.tsx`
- WhatsApp/Instagram links: `components/navbar.tsx`, `components/footer.tsx`,
  `app/contact/page.tsx`, and the CTA in `app/product/[slug]/page.tsx`
