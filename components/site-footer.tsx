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
            İletişim
          </h4>
          <div className="space-y-4 text-sm text-slate-500">
            <p>
              E-posta:
              {" "}
              <a href="mailto:bilgi@vartoyazilim.com" className="font-semibold text-primary">
                bilgi@vartoyazilim.com
              </a>
            </p>
            <p>
              Telefon:
              {" "}
              <a href="tel:05012998492" className="font-semibold text-primary">
                0501 299 8492
              </a>
            </p>
            <p>
              Instagram:
              {" "}
              <a
                href="https://instagram.com/vartoyazilim"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary"
              >
                instagram.com/vartoyazilim
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
