"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type ProductsCatalogueProps = {
  products: Product[];
  categories: string[];
  brands: string[];
  colorTones: string[];
};

export function ProductsCatalogue({
  products,
  categories,
  brands,
  colorTones,
}: ProductsCatalogueProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(searchParams.get("arama") ?? "");

  const activeCategory = searchParams.get("kategori") ?? "Tümü";
  const activeBrand = searchParams.get("marka") ?? "Tümü";
  const activeTone = searchParams.get("ton") ?? "Tümü";
  const activeSort = searchParams.get("sirala") ?? "onerilen";
  const activeSearch = searchParams.get("arama")?.toLocaleLowerCase("tr-TR") ?? "";
  const [openSections, setOpenSections] = useState({
    search: false,
    category: false,
    tone: false,
    brand: false,
  });

  function toggleSection(section: keyof typeof openSections) {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  }

  function updateParam(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "Tümü" || value === "onerilen") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === "Tümü" || product.category === activeCategory;
      const matchesBrand = activeBrand === "Tümü" || product.brand === activeBrand;
      const matchesTone = activeTone === "Tümü" || product.colorTone === activeTone;
      const text = `${product.name} ${product.shortDescription} ${product.type}`.toLocaleLowerCase(
        "tr-TR",
      );
      const matchesSearch = !activeSearch || text.includes(activeSearch);

      return matchesCategory && matchesBrand && matchesTone && matchesSearch;
    })
    .slice()
    .sort((left, right) => {
      switch (activeSort) {
        case "artan-fiyat":
          return left.price - right.price;
        case "azalan-fiyat":
          return right.price - left.price;
        case "puan":
          return right.rating - left.rating;
        default:
          return right.reviewCount - left.reviewCount;
      }
    });

  return (
    <div className="flex flex-col gap-12 lg:flex-row">
      <aside className="w-full flex-shrink-0 lg:w-64">
        <div className="sticky top-32 space-y-10">
          <section>
            <button
              type="button"
              onClick={() => toggleSection("search")}
              className="mb-4 flex w-full items-center justify-between lg:mb-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
                Ara
              </h3>
              <span className="material-symbols-outlined text-outline lg:hidden">
                {openSections.search ? "remove" : "add"}
              </span>
            </button>
            <div className={cn(!openSections.search && "hidden", "lg:block")}>
              <input
                value={localSearch}
                onChange={(event) => setLocalSearch(event.target.value)}
                onBlur={() => updateParam("arama", localSearch.trim())}
                placeholder="Ürün ya da kategori ara"
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none ring-primary/20 focus:ring-2"
              />
            </div>
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection("category")}
              className="mb-4 flex w-full items-center justify-between lg:mb-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
                Kategori
              </h3>
              <span className="material-symbols-outlined text-outline lg:hidden">
                {openSections.category ? "remove" : "add"}
              </span>
            </button>
            <div className={cn("space-y-3", !openSections.category && "hidden", "lg:block")}>
              {["Tümü", ...categories].map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateParam("kategori", category)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium",
                      activeCategory === category
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high",
                    )}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection("tone")}
              className="mb-4 flex w-full items-center justify-between lg:mb-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
                Ton
              </h3>
              <span className="material-symbols-outlined text-outline lg:hidden">
                {openSections.tone ? "remove" : "add"}
              </span>
            </button>
            <div className={cn(!openSections.tone && "hidden", "lg:block")}>
              <select
                value={activeTone}
                onChange={(event) => updateParam("ton", event.target.value)}
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm font-medium outline-none ring-primary/20 focus:ring-2"
              >
                <option>Tümü</option>
                {colorTones.map((tone) => (
                  <option key={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <button
              type="button"
              onClick={() => toggleSection("brand")}
              className="mb-4 flex w-full items-center justify-between lg:mb-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline">
                Marka
              </h3>
              <span className="material-symbols-outlined text-outline lg:hidden">
                {openSections.brand ? "remove" : "add"}
              </span>
            </button>
            <div className={cn(!openSections.brand && "hidden", "lg:block")}>
              <select
                value={activeBrand}
                onChange={(event) => updateParam("marka", event.target.value)}
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm font-medium outline-none ring-primary/20 focus:ring-2"
              >
                <option>Tümü</option>
                {brands.map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </section>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-8 flex flex-col gap-4 rounded-xl bg-surface-container-low/50 p-4 md:flex-row md:items-center md:justify-between">
          <span className="text-sm font-medium text-on-surface-variant">
            {filteredProducts.length} ürün gösteriliyor
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-outline">
              Sırala
            </span>
            <select
              value={activeSort}
              onChange={(event) => updateParam("sirala", event.target.value)}
              className="bg-transparent text-sm font-semibold outline-none"
            >
              <option value="onerilen">Yeni Gelenler</option>
              <option value="artan-fiyat">Fiyat: Düşükten Yükseğe</option>
              <option value="azalan-fiyat">Fiyat: Yüksekten Düşüğe</option>
              <option value="puan">En Çok Sevilenler</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-surface-container-low p-12 text-center">
            <h3 className="mb-3 font-headline text-2xl font-bold text-on-surface">
              Sonuç bulunamadı
            </h3>
            <p className="text-on-surface-variant">
              Farklı bir kategori, marka ya da arama terimi deneyebilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
