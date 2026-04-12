import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { ProductCard } from "@/components/product-card";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.relatedSlugs);

  return (
    <main className="mx-auto max-w-7xl px-8 pb-24 pt-32">
      <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-on-surface-variant">
        <Link href="/urunler">Tüm Koleksiyon</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span>{product.category}</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-7">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-xl bg-surface-variant">
              <div className="relative h-[600px]">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="60vw"
                  priority
                />
              </div>
            </div>
            {product.gallery.slice(1).map((image, index) => (
              <div key={image} className="relative h-80 overflow-hidden rounded-xl bg-surface-variant">
                <Image
                  src={image}
                  alt={`${product.name} görünüm ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="30vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 h-fit lg:col-span-5 lg:sticky lg:top-32">
          <div className="space-y-6">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-tertiary">
                {product.brand}
              </span>
              <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-tertiary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={`${product.id}-${index}`}
                      className="material-symbols-outlined text-sm"
                      style={{
                        fontVariationSettings:
                          index < Math.round(product.rating) ? '"FILL" 1' : '"FILL" 0',
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm text-on-surface-variant">
                  {product.rating} ({product.reviewCount} değerlendirme)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(product.price)}
              </p>
              {product.oldPrice ? (
                <p className="text-lg text-outline line-through">
                  {formatCurrency(product.oldPrice)}
                </p>
              ) : null}
            </div>

            <p className="text-on-surface-variant">{product.description}</p>

            <div className="space-y-3 rounded-3xl bg-surface-container-low p-6">
              <h2 className="font-headline text-lg font-bold text-on-surface">
                Ürün Özellikleri
              </h2>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <AddToCartPanel productId={product.id} />

            <div className="space-y-4 border-t border-outline-variant/20 pt-8">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-outline-variant/10 pb-3 text-sm"
                >
                  <span className="font-semibold text-on-surface">{spec.label}</span>
                  <span className="text-on-surface-variant">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="editorial-grid mt-32">
        <div className="col-span-12 rounded-3xl bg-surface-container-low p-12 lg:col-span-5">
          <h2 className="mb-6 font-headline text-3xl font-bold text-on-surface">
            Titiz işçilik, kusursuz denge
          </h2>
          <p className="mb-4 leading-relaxed text-on-surface-variant">
            Bu parça yalnızca yazmak için değil, düşüncelerinizin ritmini taşımak
            için tasarlandı. Malzeme seçimi, yüzey hissi ve oranları; kullanım
            boyunca sakin, dengeli ve rafine bir deneyim sunar.
          </p>
          <p className="leading-relaxed text-on-surface-variant">
            Her ayrıntı; günlük not alma, eskiz hazırlama ve uzun süreli masa
            kullanımında doğal bir akış yaratmak üzere düşünülmüştür.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl">
            <Image
              src={product.gallery[0]}
              alt={`${product.name} yaşam çekimi`}
              fill
              className="object-cover"
              sizes="60vw"
            />
          </div>
        </div>
      </section>

      <section className="mt-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
              Atelier’den Yorumlar
            </h2>
            <p className="mt-2 text-on-surface-variant">
              Koleksiyonumuzu kullanan yaratıcı topluluğun deneyimleri.
            </p>
          </div>
          <button className="rounded-xl bg-surface-container-highest px-8 py-3 font-bold text-primary">
            Yorum Yaz
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {product.reviews.map((review) => (
            <article
              key={`${product.id}-${review.author}`}
              className="rounded-2xl bg-surface-container-lowest p-8 shadow-sm"
            >
              <div className="mb-4 flex text-tertiary">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span
                    key={`${review.author}-${index}`}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="mb-6 italic text-on-surface">&quot;{review.text}&quot;</p>
              <div>
                <p className="font-bold text-on-surface">{review.author}</p>
                <p className="text-xs text-on-surface-variant">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-32">
        <h2 className="mb-12 font-headline text-3xl font-bold tracking-tight text-on-surface">
          Seti Tamamlayın
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}
