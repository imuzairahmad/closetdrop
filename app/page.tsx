import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/products";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-neutral-900">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop"
            alt="Closetdrop thrifted fashion"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="relative z-10 flex h-full flex-col items-start justify-end container pb-16 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-white/80">
              Verified Authentic · Thrifted
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-2xl leading-[1.05]">
              CLOSETDROP™️
            </h1>
            <p className="mt-4 max-w-md text-white/90 text-base">
              One-of-one thrifted pieces. Shoes, jeans, shirts &amp; jewelry —
              hand-picked, condition-checked, priced fixed.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/men"
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                Shop Men
              </Link>
              <Link
                href="/women"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/women"
            className="group relative aspect-[16/9] md:aspect-[4/5] overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.ctfassets.net/0cyvvzkg0flt/4NnKjG18FnWEzGZKGrw5AG/a6696c3baa0d4c3901415a5a38c7d33b/WhatsApp_Image_2026-07-14_at_10.08.21_PM.jpeg?w=800&h=1000&fit=fill&f=bottom&q=90"
              alt="Women's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover  transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <span className="text-white text-2xl font-black tracking-tight">
                WOMEN
              </span>
            </div>
          </Link>
          <Link
            href="/men"
            className="group relative aspect-[16/9] md:aspect-[4/5] overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.ctfassets.net/0cyvvzkg0flt/7cySoII3cLNAVDSgAOvST7/474a6543082067e4cd0d33418e6b26fc/WhatsApp_Image_2026-07-14_at_8.29.25_PM.jpeg?w=800&h=1000&fit=fill&f=bottom&q=90"
              alt="Men's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-end p-6">
              <span className="text-white text-2xl font-black tracking-tight">
                MEN
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="container pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black tracking-tight">Fresh Drops</h2>
          {/* FIXED: was hardcoded to /women, which is wrong since featured
              products span both categories. Point to a combined shop page. */}
          <Link
            href="/shop"
            className="text-sm font-semibold underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              // only priority-load the first row so LCP isn't spent on
              // offscreen images
              priority={i < 4}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
