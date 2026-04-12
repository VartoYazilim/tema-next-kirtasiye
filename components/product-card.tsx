"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="group flex flex-col">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-lowest">
        <Link href={`/urunler/${product.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">{product.name}</span>
        </Link>
        <Image
          src={product.gallery[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.badge ? (
          <div className="absolute right-4 top-4 z-20 rounded-full bg-tertiary-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-tertiary-container">
            {product.badge}
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-4 left-4 right-4 z-20 rounded-lg bg-white py-3 font-bold text-primary shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-4 md:opacity-0"
        >
          {added ? "Sepete eklendi" : "Sepete Ekle"}
        </button>
      </div>

      <div className="space-y-1 px-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-tertiary">
              {product.category}
            </p>
            <h3 className="font-headline text-lg font-bold text-on-surface">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-bold text-secondary">{formatCurrency(product.price)}</p>
            {product.oldPrice ? (
              <p className="text-xs text-outline line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-on-surface-variant">{product.shortDescription}</p>
      </div>
    </div>
  );
}
