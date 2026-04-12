"use client";

import Image from "next/image";
import Link from "next/link";

import { QuantitySelector } from "@/components/quantity-selector";
import { useStore } from "@/context/store-context";
import { getProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useStore();
  const products = getProducts();
  const cartProducts = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((entry): entry is { product: (typeof products)[number]; quantity: number } => Boolean(entry));

  const shipping = cartProducts.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-40 sm:px-6 lg:px-8 lg:pt-32">
      <div className="flex flex-col gap-16 lg:flex-row">
        <section className="flex-grow">
          <h1 className="mb-12 font-headline text-4xl font-extrabold tracking-tight text-on-surface">
            Seçimleriniz
          </h1>

          {cartProducts.length > 0 ? (
            <div className="space-y-12">
              {cartProducts.map((entry) => (
                <div key={entry.product.id} className="group flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="relative h-52 w-full overflow-hidden rounded-md bg-surface-variant sm:w-40 sm:flex-shrink-0">
                    <Image
                      src={entry.product.gallery[0]}
                      alt={entry.product.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>

                  <div className="flex flex-grow flex-col justify-between py-2">
                    <div>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="font-headline text-xl font-bold text-on-surface">
                            {entry.product.name}
                          </h3>
                          <p className="mt-2 max-w-md text-on-surface-variant">
                            {entry.product.shortDescription}
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-primary sm:text-right">
                          {formatCurrency(entry.product.price)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold tracking-wide text-on-secondary-container">
                          {entry.product.type}
                        </span>
                        <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-semibold tracking-wide text-on-surface-variant">
                          {entry.product.colorTone}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <QuantitySelector
                        quantity={entry.quantity}
                        onDecrease={() => updateQuantity(entry.product.id, entry.quantity - 1)}
                        onIncrease={() => updateQuantity(entry.product.id, entry.quantity + 1)}
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCart(entry.product.id)}
                        className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-error"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-8 sm:p-12">
                <div className="relative z-10 max-w-md">
                  <h4 className="mb-4 font-headline text-2xl font-bold text-on-primary-fixed">
                    Seçiminizi tamamlayın
                  </h4>
                  <p className="mb-6 text-on-surface-variant">
                    Arşiv kâğıtlarıyla uyumlu mürekkepler ve masa üstü objeleri,
                    sepetinizdeki parçalarla birlikte kusursuz bir takım oluşturur.
                  </p>
                  <Link
                    href="/urunler"
                    className="group flex items-center gap-2 font-bold text-primary"
                  >
                    Koleksiyonu inceleyin
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-surface-container-low p-12">
              <h2 className="mb-3 font-headline text-2xl font-bold text-on-surface">
                Seçiminizde henüz ürün yok
              </h2>
              <p className="mb-6 text-on-surface-variant">
                Koleksiyon sayfasından birkaç parça ekleyerek alışverişinize
                başlayabilirsiniz.
              </p>
              <Link href="/urunler" className="inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-on-primary">
                Koleksiyona Dön
              </Link>
            </div>
          )}
        </section>

        <aside className="w-full lg:w-96">
          <div className="sticky top-32 space-y-6">
            <div className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm sm:p-8">
              <h2 className="mb-8 font-headline text-xl font-bold text-on-surface">
                Sipariş Özeti
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Ara toplam</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Standart teslimat</span>
                  <span className="font-semibold text-on-surface">{formatCurrency(shipping)}</span>
                </div>
                <div className="mt-6 border-t border-surface-container-high pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-headline text-lg font-bold text-on-surface">Toplam</span>
                    <span className="font-headline text-2xl font-extrabold text-primary">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/odeme"
                className="mt-8 block rounded-xl bg-gradient-to-r from-primary to-primary-dim py-5 text-center text-lg font-bold tracking-tight text-on-primary shadow-md"
              >
                Ödemeye Geç
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
