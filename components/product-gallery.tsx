"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImage = {
  url: string;
  alt: string;
};

export default function ProductGallery({
  images,
  sold,
}: {
  images: ProductImage[];
  sold?: boolean;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Image
          src={images[selected].url}
          alt={images[selected].alt}
          fill
          priority
          className="object-cover"
        />

        {sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition ${
                selected === index
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
