"use client";

import Link from "next/link";
import { useEffect } from "react";

import { useStore } from "@/context/store-context";

export function CartNoticeModal() {
  const { cartNotice, hideCartNotice } = useStore();

  useEffect(() => {
    if (!cartNotice.visible) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hideCartNotice();
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [cartNotice.visible, hideCartNotice]);

  if (!cartNotice.visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-primary/10 bg-white p-5 shadow-2xl shadow-primary/10">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <span className="material-symbols-outlined">check</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-headline text-lg font-bold text-on-surface">
              Sepete eklendi
            </p>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
              {cartNotice.productName}
              {cartNotice.quantity > 1 ? ` (${cartNotice.quantity} adet)` : ""}
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/sepet"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-on-primary"
              >
                Sepeti Gör
              </Link>
              <button
                type="button"
                onClick={hideCartNotice}
                className="rounded-xl bg-surface-container-low px-4 py-2 text-sm font-bold text-primary"
              >
                Devam Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
