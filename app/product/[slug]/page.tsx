import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Ruler } from "lucide-react";
import ProductGallery from "@/components/product-gallery";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in "${product.title}" (${formatPKR(product.price)}) from Closetdrop.`,
  );

  return (
    <div className="container py-10">
      <div className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${product.category}`}
          className="hover:text-foreground capitalize"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <ProductGallery images={product.images} sold={product.sold} />
        {/* Details */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            {product.brandTag}
          </p>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-1">
            {product.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="uppercase">
              {product.subCategory}
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-black">
              {formatPKR(product.price)}
            </span>
          </div>

          <div className="mt-6 space-y-3 border-y border-border py-6">
            <div className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <span>{product.condition}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>{product.authenticity}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Ruler className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <span>{product.sizeNote}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
              Description
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Showcase-only CTA: no checkout, just contact-to-buy */}
          {!product.sold && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <a
                  href={`https://wa.me/923039424415?text=${waMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Message to Buy
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">
            This is a showcase — reach out via WhatsApp or Instagram to
            purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
