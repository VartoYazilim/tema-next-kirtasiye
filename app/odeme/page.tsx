"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { useStore } from "@/context/store-context";
import { getProducts } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Order } from "@/types";

export default function CheckoutPage() {
  const { cart, subtotal, createOrder, user } = useStore();
  const [order, setOrder] = useState<Order | null>(null);
  const products = getProducts();

  const cartProducts = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((entry): entry is { product: (typeof products)[number]; quantity: number } => Boolean(entry));

  const shipping = cartProducts.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const createdOrder = createOrder({
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      note: String(formData.get("note") || ""),
      cardName: String(formData.get("cardName") || ""),
      cardNumber: String(formData.get("cardNumber") || ""),
      expiry: String(formData.get("expiry") || ""),
      cvv: String(formData.get("cvv") || ""),
    });

    setOrder(createdOrder);
    event.currentTarget.reset();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-40 sm:px-6 lg:px-8 lg:pt-32">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-surface-container-low p-6 sm:p-8 lg:p-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Ödeme
          </p>
          <h1 className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface">
            Siparişinizi tamamlayın
          </h1>
          <p className="mb-8 max-w-2xl text-on-surface-variant">
            Teslimat ve kart bilgilerinizi ekleyerek seçiminizi tamamlayın.
          </p>

          {order ? (
            <div className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-primary">verified</span>
                <div>
                  <h2 className="font-headline text-2xl font-bold text-on-surface">Siparişiniz alındı</h2>
                  <p className="text-on-surface-variant">Seçimleriniz başarıyla işleme alındı.</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">Sipariş No:</span> {order.id}</p>
                <p><span className="font-semibold">Müşteri:</span> {order.customerName}</p>
                <p><span className="font-semibold">Tarih:</span> {formatDate(order.createdAt)}</p>
                <p><span className="font-semibold">Ödeme:</span> {order.paymentSummary}</p>
                <p><span className="font-semibold">Not:</span> {order.note}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/urunler" className="rounded-xl bg-primary px-6 py-3 font-bold text-on-primary">
                  Alışverişe Dön
                </Link>
                <Link href="/hesap" className="rounded-xl bg-surface-container-high px-6 py-3 font-bold text-primary">
                  Hesabımı Gör
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input name="fullName" defaultValue={user?.fullName ?? ""} placeholder="Ad Soyad" className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
                <input name="phone" placeholder="Telefon" className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
              </div>
              <textarea name="address" placeholder="Teslimat adresi" rows={4} className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />

              <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                <h2 className="mb-4 font-headline text-xl font-bold text-on-surface">Kart Bilgileri</h2>
                <div className="grid gap-5">
                  <input name="cardName" placeholder="Kart üzerindeki ad" className="rounded-xl bg-surface-container-low px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
                  <input name="cardNumber" inputMode="numeric" placeholder="Kart numarası" className="rounded-xl bg-surface-container-low px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <input name="expiry" placeholder="Son kullanma tarihi (AA/YY)" className="rounded-xl bg-surface-container-low px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
                    <input name="cvv" inputMode="numeric" placeholder="CVV" className="rounded-xl bg-surface-container-low px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
                  </div>
                </div>
              </div>

              <textarea name="note" placeholder="Sipariş notu" rows={4} className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
              <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-primary-dim px-6 py-4 font-bold text-on-primary">
                Siparişi Tamamla
              </button>
            </form>
          )}
        </section>

        <aside className="rounded-[2rem] bg-surface-container-lowest p-6 shadow-sm sm:p-8">
          <h2 className="mb-8 font-headline text-2xl font-bold text-on-surface">Sipariş Özeti</h2>
          {cartProducts.length > 0 ? (
            <div className="space-y-5">
              {cartProducts.map((entry) => (
                <div key={entry.product.id} className="flex items-center justify-between gap-4 border-b border-outline-variant/10 pb-4">
                  <div>
                    <p className="font-semibold text-on-surface">{entry.product.name}</p>
                    <p className="text-sm text-on-surface-variant">{entry.quantity} adet</p>
                  </div>
                  <p className="font-semibold text-primary">
                    {formatCurrency(entry.product.price * entry.quantity)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant">
              Sepetinizde henüz ürün bulunmuyor. Yine de formu gönderdiğinizde sipariş oluşturulur.
            </p>
          )}

          <div className="mt-8 space-y-3 border-t border-outline-variant/10 pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Ara toplam</span>
              <span className="font-semibold text-on-surface">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Teslimat</span>
              <span className="font-semibold text-on-surface">{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-headline font-bold text-on-surface">Toplam</span>
              <span className="font-headline font-extrabold text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
