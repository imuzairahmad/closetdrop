import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/products";

export const revalidate = 60;
// https:alt="Women's Collection" //images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop

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
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop"
              alt="Women's Collection"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop"
              alt="Men's Collection"
              fill
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
          <Link
            href="/women"
            className="text-sm font-semibold underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
