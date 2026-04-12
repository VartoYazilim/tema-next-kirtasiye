import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto w-full bg-slate-100 px-8 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <div className="mb-4 font-headline text-xl font-bold text-blue-900">
            VY Kırtasiye
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-500">
            Yaratıcı ritüelleri besleyen seçkin kırtasiye parçaları. Kâğıttan
            kaleme, masanızdaki her ayrıntı için özenle küratörlüğü yapılır.
          </p>
        </div>

        <div>
          <h4 className="mb-6 font-headline text-sm font-bold text-blue-900">
            Alışveriş
          </h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link href="/urunler?kategori=Defterler">Defterler</Link></li>
            <li><Link href="/urunler?kategori=Yazım">Yazı Araçları</Link></li>
            <li><Link href="/urunler?kategori=Masa%20Düzeni">Masa Düzeni</Link></li>
            <li><Link href="/urunler?kategori=Setler">Hediye Setleri</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-headline text-sm font-bold text-blue-900">
            Hizmet
          </h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>Kargo ve Teslimat</li>
            <li>İade Politikası</li>
            <li>Sürdürülebilirlik</li>
            <li>İletişim</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-headline text-sm font-bold text-blue-900">
            Bülten
          </h4>
          <p className="mb-4 text-sm leading-relaxed text-slate-500">
            Yeni seçkiler ve sınırlı üretim seriler için iç çevreye katılın.
          </p>
          <div className="flex rounded-xl bg-white p-1 shadow-sm">
            <input
              placeholder="E-posta adresiniz"
              className="min-w-0 flex-1 rounded-lg px-4 py-3 text-sm outline-none"
            />
            <button className="rounded-lg bg-primary px-4 py-3 text-sm font-bold text-on-primary">
              Katıl
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
