"use client";

import { FormEvent, useState } from "react";

import { useStore } from "@/context/store-context";
import { formatDate } from "@/lib/utils";

export default function AccountPage() {
  const { user, orders, registerFakeUser } = useStore();
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    registerFakeUser({
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    });

    setMessage("Hesabınız oluşturuldu. Atelier seçkilerine artık hesabınız üzerinden devam edebilirsiniz.");
    event.currentTarget.reset();
  }

  return (
    <main className="mx-auto max-w-6xl px-8 pb-24 pt-32">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-surface-container-low p-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Hesabım
          </p>
          <h1 className="mb-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface">
            VY Kırtasiye hesabınızı oluşturun
          </h1>
          <p className="mb-8 max-w-2xl text-on-surface-variant">
            Siparişlerinizi takip etmek, favori ürünlerinize daha hızlı ulaşmak ve
            yeni koleksiyonlardan haberdar olmak için bilgilerinizi ekleyin.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <input name="fullName" placeholder="Ad Soyad" className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
            <input name="email" type="email" placeholder="E-posta" className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2" />
            <input name="password" type="password" placeholder="Şifre" className="rounded-xl bg-white px-5 py-4 outline-none ring-primary/20 focus:ring-2 md:col-span-2" />
            <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-primary-dim px-6 py-4 font-bold text-on-primary md:col-span-2">
              Hesap Oluştur
            </button>
          </form>

          {message ? <p className="mt-4 text-sm font-semibold text-primary">{message}</p> : null}
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="mb-4 font-headline text-2xl font-bold text-on-surface">Hesap Bilgileri</h2>
            {user ? (
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">Ad:</span> {user.fullName}</p>
                <p><span className="font-semibold">E-posta:</span> {user.email}</p>
                <p><span className="font-semibold">Katılım:</span> {formatDate(user.createdAt)}</p>
              </div>
            ) : (
              <p className="text-on-surface-variant">Henüz bir hesap oluşturulmadı.</p>
            )}
          </div>

          <div className="rounded-[2rem] bg-surface-container-low p-8">
            <h2 className="mb-4 font-headline text-2xl font-bold text-on-surface">Sipariş Geçmişi</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="rounded-2xl bg-white p-4 text-sm shadow-sm">
                    <p className="font-semibold text-on-surface">{order.id}</p>
                    <p className="text-on-surface-variant">{formatDate(order.createdAt)}</p>
                    <p className="mt-2 text-on-surface">{order.itemCount} parçalık sipariş alındı.</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-on-surface-variant">Henüz oluşturulmuş bir sipariş bulunmuyor.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
