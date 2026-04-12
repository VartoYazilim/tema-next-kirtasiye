"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { useStore } from "@/context/store-context";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/urunler", label: "Tüm Koleksiyon" },
  { href: "/urunler?kategori=Defterler", label: "Defterler" },
  { href: "/urunler?kategori=Yazım", label: "Yazı Araçları" },
  { href: "/urunler?kategori=Setler", label: "Setler" },
];

export function SiteHeader() {
  const router = useRouter();
  const { cartCount, user } = useStore();
  const [search, setSearch] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/urunler?arama=${encodeURIComponent(query)}` : "/urunler");
  }

  return (
    <nav className="glass-nav fixed top-0 z-50 w-full bg-slate-50/85 shadow-sm">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="font-headline text-xl font-bold tracking-tight text-blue-900 sm:text-2xl"
            >
              VY Kırtasiye
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium text-slate-600 hover:text-blue-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <form onSubmit={handleSearch} className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
                search
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Koleksiyonda ara..."
                className="w-64 rounded-xl bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none ring-primary/20 focus:ring-2"
              />
            </form>

            <Link
              href="/hesap"
              className="flex items-center gap-2 text-blue-800 hover:opacity-75"
              aria-label="Hesap"
            >
              <span className="material-symbols-outlined">person</span>
              <span className="hidden text-sm font-semibold xl:inline">
                {user ? user.fullName.split(" ")[0] : "Hesabım"}
              </span>
            </Link>

            <Link
              href="/sepet"
              className="relative text-blue-800 hover:opacity-75"
              aria-label="Sepet"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              <span
                className={cn(
                  "absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                  cartCount > 0
                    ? "bg-tertiary text-white"
                    : "bg-surface-container-highest text-on-surface-variant",
                )}
              >
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-200/70 pb-3 pt-3 md:hidden">
          <div className="scrollbar-none flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
