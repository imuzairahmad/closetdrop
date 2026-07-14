import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { formatPKR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const img = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={img.url}
          alt={img.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white font-bold tracking-widest uppercase text-sm">
              Sold Out
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge variant="secondary" className="uppercase text-[10px]">
            {product.subCategory}
          </Badge>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground">
          {product.brandTag}
        </p>
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-bold">{formatPKR(product.price)}</span>
        </div>
      </div>
    </Link>
  );
}
