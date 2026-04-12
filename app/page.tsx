import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, getProducts } from "@/lib/data";

const categoryCards = [
  {
    title: "Defterler",
    href: "/urunler?kategori=Defterler",
    description: "Keten, deri ve yüksek gramajlı kâğıtla hazırlanmış zamansız ciltler.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJv9H7RJqcYlM5MiIx7mQPFmPKbGkrkZqWUujtsy_b2UkkxIwo69TNqCx5e6zWQ0a0up6YyX_0HhbyYLMIfA7_8ERVCVrisPx_lgJvdfG9fawK3DbgXbHHQB2ljdTD18ZhZpKewf8CGPc2YVhfePLPyAnIc9sW7i1wfPMEVzhp4Fm8l_KBz3_v7W10GKMYvGfH1BwHLmKEfJGCIAbrp0hskDN2klHqtuTf5QCkImZndKxUBZhGptffjvCGFzPCuMu3vZi7aNwthez6",
  },
  {
    title: "Yazı Araçları",
    href: "/urunler?kategori=Yazım",
    description: "Dolma kalemler, mürekkepler ve çizim setleriyle rafine bir yazım deneyimi.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACmSqt8Rmqaa8_l3ihbo3p7Ppm-06uR9-GrWcxoo4BpTp4hsKlxPgaLh4oFx1hh_r85WwS9nMxYIuDhfUZgmshStWJePZmOmRDQlGMkYtCInV5r3ULBDIZVe1EYlKga9gCpVHbvJ3H_gFMs3vqoHeyIRQE3gVvWGF4KLWSiZT6_aCCYuJsmBYdTF3OSTIenm3or7GWioR3b3u9g2XJz_dxqhnSfudqJ8vnGFiAWdoZXrKSuNG7RSUWC7QhgEjOy7WOKbAVNP4FLAXs",
  },
  {
    title: "Masa Düzeni",
    href: "/urunler?kategori=Masa%20Düzeni",
    description: "Çalışma alanınızı sadeleştiren işlevsel ve zarif masa objeleri.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgn6DA1XZ72n4Fk5pG-g-GZaIJw7cthp4ubIN6ruyDJ_fOtz7LpWsLPbbnOU_uGXzl9HN8HHzRUWsJVdAO3IxJRzimurjZrY6a99I-qmohTkr9q3onkmrrWnAxZ0UQgWVEAGwnJ1FqSh64VqgxwOV7GfFhAu6pxgvbHuHdC-8S9UwNiTEoxVLhKtXCJJ3WJNt3Jhn9AEFCzlyEBEnZk99z2oevS6XXTYdOND3aPxrS10MtjECzXz0YXO1kQqu1_oOmwYAXZ8owxhk0",
  },
  {
    title: "Hediye Setleri",
    href: "/urunler?kategori=Setler",
    description: "Anlamlı bir jest için bir araya getirilen seçili kırtasiye koleksiyonları.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBX7ZFCLa4zp4dsid6gGoReLYDvOsA8JWKoVP0QYNjOPN5TPWZydNDshURu2o1iXhrHmxMNJi1tEPcUM791XgJIijMxsa7fWYhvQrdMiIHoqivEtyfKrtSbX7GQ1d0JOaLznIn1lY5yBxYHqzgDRb-AcymDidp6F-_gx0VLvmiFPCNJb3xBvwK_U60f3BcUYDWIOe02QPBg-gJGkJjC4E7G7F3WRu2PorDGE4qYyaZWunw-kH8d1VGr35G0e1I8KmYOHMAuU4c_PQQ4",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getProducts();

  return (
    <main className="pt-32 md:pt-20">
      <section className="relative overflow-hidden bg-surface-container-low">
        <div className="editorial-grid mx-auto min-h-[870px] max-w-7xl items-center px-8">
          <div className="col-span-12 flex flex-col justify-center md:col-span-6 lg:col-span-5">
            <h1 className="mb-8 font-headline text-6xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-7xl">
              Boş Sayfanın <br />
              <span className="font-medium italic text-primary">Sanatı.</span>
            </h1>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-on-surface-variant">
              Yaratıcı üretim sürecinizi yavaşlatmadan zenginleştiren, özenle
              seçilmiş kırtasiye parçaları. Teknik kalemlerden ağır dokulu
              defterlere kadar masanız için düşünülmüş bir seçki.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/urunler"
                className="rounded-xl bg-gradient-to-r from-primary to-primary-dim px-8 py-4 font-semibold text-on-primary shadow-lg shadow-primary/20"
              >
                Koleksiyonu Keşfet
              </Link>
              <Link
                href="/hesap"
                className="group flex items-center px-4 py-4 font-semibold text-on-surface"
              >
                Üyelik Oluştur
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          <div className="relative hidden md:col-span-6 md:block lg:col-span-7">
            <div className="absolute inset-0 translate-x-8 translate-y-8 -rotate-3 rounded-[2rem] bg-secondary-container/20" />
            <div className="relative z-10 h-[600px] overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3-JrHXHoB7HkqEXZ8qNpihoMYNZHjf8pZaLGO5rUrE_StBBsrQvcbSiPtJJPuNhPXyrQWV1yq4dDprbjQVDL2zAmeWGuwBlHuilyajl9KjqalZkCbZYiSBFFyMlL0IbgZiKSWIW1l9F-T6zbX1ucLcPMCOZx7Cf4h1bl2R35KBiFwNbCv3AVnBbC5Dez6gwHnhtnM8CTsyAXYKMMBoR5RnNZdJOV5W1p8DOpSOkKkYRT9aBjxqjSp0u68se-RUENYUJOEI5mQj-Pd"
                alt="Zarif kırtasiye düzeni"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-headline text-4xl font-bold text-on-surface">
              Seçilmiş Kategoriler
            </h2>
            <p className="text-on-surface-variant">
              Yaratıcı ritüelinize eşlik edecek araçları keşfedin.
            </p>
          </div>
          <Link href="/urunler" className="font-semibold text-primary underline underline-offset-8">
            Tümünü Gör
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:h-[600px] md:grid-cols-4 md:auto-rows-[288px]">
          <Link
            href={categoryCards[0].href}
            className="group relative min-h-[500px] overflow-hidden rounded-xl md:col-span-2 md:row-span-2 md:min-h-0"
          >
            <Image
              src={categoryCards[0].image}
              alt={categoryCards[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-headline text-3xl font-bold">{categoryCards[0].title}</h3>
              <p className="mt-2 max-w-xs text-sm text-white/85">{categoryCards[0].description}</p>
            </div>
          </Link>

          {categoryCards.slice(1, 3).map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative min-h-[240px] overflow-hidden rounded-xl"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-headline text-xl font-bold">{card.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-white/85">{card.description}</p>
              </div>
            </Link>
          ))}

          <Link
            href={categoryCards[3].href}
            className="group relative min-h-[240px] overflow-hidden rounded-xl md:col-span-2 md:row-span-1"
          >
            <Image
              src={categoryCards[3].image}
              alt={categoryCards[3].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="font-headline text-2xl font-bold">{categoryCards[3].title}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">{categoryCards[3].description}</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              Vazgeçilmezler
            </h2>
            <p className="mx-auto max-w-lg text-on-surface-variant">
              Yazarların, tasarımcıların ve koleksiyon tutkunlarının masasında
              kendine yer bulan parçalar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-32">
        <div className="editorial-grid mx-auto max-w-7xl px-8">
          <div className="order-2 col-span-12 md:order-1 md:col-span-6">
            <div className="relative h-[500px] w-full">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQpSNZo79V-ZllXcM9GjBkQTg2AOpWJzC0KPsqAPMdVrGd1xtZ9WxLKF41Nbo5UGua6nNmTnr05ZCEVigXUzksChrxFJyWkNvH_usWwWfBbAt5RVIQ3m1bU7UMsjwyVJcaqta9Ek1mNsmr2TafaR0ZpzpjI4PfC3gR18H-ChjnjT5NxoacDYEcxDnaTjAdW-jd-BgWK1J06gBNlbj85KA27NI40n50BBTFO5G9mzgOupMcQCbgW92Pwe0evOEaQjYDXjK9X3KCpMA8"
                alt="Atelier mağaza içi"
                fill
                className="rounded-xl object-cover shadow-lg"
                sizes="50vw"
              />
            </div>
          </div>
          <div className="order-1 col-span-12 flex flex-col justify-center md:order-2 md:col-span-6">
            <p className="mb-4 font-headline text-xs font-extrabold uppercase tracking-[0.3em] text-primary">
              2018&apos;den beri
            </p>
            <h2 className="mb-8 font-headline text-4xl font-bold leading-tight text-on-surface md:text-5xl">
              Üretenler, düşünenler ve <span className="text-tertiary">hayal kuranlar</span> için.
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
              The Atelier, Kyoto&apos;daki küçük bir stüdyoda tek bir fikirle doğdu:
              dijital dünya hızlı olabilir, fakat yaratıcı zihnin ritmi hâlâ
              dokunmaya ihtiyaç duyar.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
              Koleksiyonumuzdaki her ürün; malzeme kalitesi, yazım hissi ve
              gündelik kullanım zarafeti gözetilerek seçilir. Kâğıt, mürekkep ve
              yüzey arasındaki uyum bizim için detay değil, başlangıçtır.
            </p>
            <Link
              href={`/urunler/${allProducts[0].slug}`}
              className="inline-flex items-center border-b-2 border-primary/20 pb-1 font-bold text-primary hover:border-primary"
            >
              Hikâyeyi keşfedin
              <span className="material-symbols-outlined ml-2 text-xl">auto_stories</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-8 py-24">
        <div className="rounded-3xl border border-primary-container/30 bg-primary-container/20 p-12 text-center">
          <h2 className="mb-4 font-headline text-3xl font-bold text-on-primary-container">
            VY Kırtasiye bültenine katılın
          </h2>
          <p className="mx-auto mb-8 max-w-md text-on-primary-container/80">
            Yeni koleksiyonlardan, sınırlı üretim serilerden ve aylık seçkilerden
            ilk siz haberdar olun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/hesap" className="rounded-xl bg-primary px-8 py-4 font-bold text-on-primary">
              Üyelik Oluştur
            </Link>
            <Link
              href={`/urunler/${allProducts[0].slug}`}
              className="rounded-xl bg-white px-8 py-4 font-bold text-primary"
            >
              Ürün Detayını İncele
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
