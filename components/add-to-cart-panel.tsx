"use client";

import Link from "next/link";
import { useState } from "react";

import { QuantitySelector } from "@/components/quantity-selector";
import { useStore } from "@/context/store-context";

export function AddToCartPanel({ productId }: { productId: string }) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    addToCart(productId, quantity);
    setMessage("Ürün sepete eklendi.");
    window.setTimeout(() => setMessage(""), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 pt-4">
        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
          onIncrease={() => setQuantity((current) => current + 1)}
        />
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary-dim py-4 text-lg font-bold text-on-primary shadow-md"
        >
          Sepete Ekle
        </button>
      </div>
      <Link
        href="/odeme"
        className="block rounded-xl bg-surface-container-highest py-4 text-center text-lg font-bold text-primary hover:bg-primary-container"
      >
        Hemen Al
      </Link>
      {message ? <p className="text-sm font-semibold text-primary">{message}</p> : null}
    </div>
  );
}
