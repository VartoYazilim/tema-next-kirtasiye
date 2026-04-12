import { Suspense } from "react";

import { ProductsCatalogue } from "@/components/products-catalogue";
import { getBrands, getCategories, getColorTones, getProducts } from "@/lib/data";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-screen-2xl px-4 pb-20 pt-40 sm:px-6 lg:px-8 lg:pt-32">
      <header className="mb-12">
        <h1 className="mb-4 font-headline text-5xl font-extrabold tracking-tight text-on-surface">
          Tüm Koleksiyon
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          Defterlerden yazı araçlarına, masa düzeni parçalarından hediye setlerine
          kadar özenle seçilmiş tüm ürünleri keşfedin.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="rounded-3xl bg-surface-container-low p-12 text-center text-on-surface-variant">
            Ürünler yükleniyor...
          </div>
        }
      >
        <ProductsCatalogue
          products={getProducts()}
          categories={getCategories()}
          brands={getBrands()}
          colorTones={getColorTones()}
        />
      </Suspense>
    </main>
  );
}
