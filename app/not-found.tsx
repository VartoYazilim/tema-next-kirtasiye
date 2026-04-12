import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-8 pt-32 text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
        404
      </p>
      <h1 className="mb-4 font-headline text-5xl font-extrabold text-on-surface">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mb-8 max-w-xl text-on-surface-variant">
        Ürün kaldırılmış olabilir ya da bağlantı geçersizdir.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link href="/" className="rounded-xl bg-primary px-6 py-3 font-bold text-on-primary">
          Ana Sayfa
        </Link>
        <Link href="/urunler" className="rounded-xl bg-surface-container-high px-6 py-3 font-bold text-primary">
          Ürünler
        </Link>
      </div>
    </main>
  );
}
