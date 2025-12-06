import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CheckCircle, Trees, Leaf, Recycle, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Orman Ürünleri | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı olarak, sürdürülebilir kaynaklardan elde edilen kaliteli orman ürünleri ve ahşap tedariki hizmeti sunuyoruz.",
  keywords: ["VIERA", "Alkan Yapı", "Viera", "Orman Ürünleri", "Kereste", "Ahşap", "Sürdürülebilir Ormancılık"],
}

export default function OrmanPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/odun-kutukler.png" alt="VIERA Orman Ürünleri" fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Orman Ürünleri</h1>
              <p className="text-xl text-white/80">
                Sürdürülebilir kaynaklardan elde edilen kaliteli orman ürünleri ve ahşap tedariki.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <Link
                href="/hizmetlerimiz"
                className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 mb-6 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Tüm Hizmetlere Dön
              </Link>
              <h2 className="text-2xl font-bold mb-4">Orman Ürünleri Hizmetlerimiz</h2>
              <p className="text-muted-foreground mb-6">
                VIERA - Alkan Yapı & Viera Ortaklığı olarak, sürdürülebilir kaynaklardan elde edilen kaliteli orman
                ürünleri ve ahşap tedariki hizmeti sunuyoruz. Çevreye duyarlı yaklaşımımızla, doğal kaynakları
                koruyarak, yüksek kaliteli orman ürünlerini müşterilerimize ulaştırıyoruz. Geniş ürün yelpazemiz ve
                uzman kadromuzla, müşterilerimizin ihtiyaçlarına özel çözümler üretiyoruz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Trees className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Kereste Üretimi</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Yüksek kaliteli kereste üretimi ve tedariki hizmeti sunuyoruz. İnşaat, mobilya ve dekorasyon
                    sektörleri için çeşitli boyut ve kalitelerde kereste ürünleri sağlıyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Factory className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Ahşap Panel ve Levhalar</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Kontrplak, MDF, sunta ve OSB gibi ahşap panel ve levha ürünleri tedarik ediyoruz. Mobilya ve inşaat
                    sektörleri için yüksek kaliteli panel çözümleri sunuyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Sürdürülebilir Ormancılık</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Çevreye duyarlı ve sürdürülebilir ormancılık uygulamalarıyla, doğal kaynakları koruyarak üretim
                    yapıyoruz. Sertifikalı orman ürünleri tedarik ederek, çevresel sorumluluğumuzu yerine getiriyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Recycle className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Özel Üretim Çözümleri</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Müşterilerimizin ihtiyaçlarına özel ahşap ürünleri üretiyoruz. Özel boyut ve özelliklerde ahşap
                    ürünleri için çözümler sunuyoruz.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                <p className="text-muted-foreground mb-6">
                  VIERA - Alkan Yapı & Viera Ortaklığı olarak, orman ürünleri tedarikinde uzun yıllara dayanan
                  tecrübemiz ve güvenilir iş ortaklarımızla, müşterilerimize en kaliteli hizmeti sunuyoruz.
                  Sürdürülebilir kaynaklardan elde edilen ürünlerimiz, yüksek kalite standartları ve rekabetçi
                  fiyatlarımızla sektörde öncü bir konuma sahibiz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Yüksek kaliteli orman ürünleri</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Sürdürülebilir kaynak yönetimi</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Geniş ürün yelpazesi</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Özel üretim çözümleri</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Rekabetçi fiyat politikası</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Zamanında teslimat garantisi</span>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">Hizmet Süreci</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        1
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Sürdürülebilir Kaynak Yönetimi</h4>
                      <p className="text-muted-foreground">
                        Çevreye duyarlı ve sürdürülebilir kaynaklardan hammadde tedariki yapılır.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        2
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Üretim</h4>
                      <p className="text-muted-foreground">
                        Modern tesislerimizde yüksek kaliteli orman ürünleri üretilir.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Kalite Kontrol</h4>
                      <p className="text-muted-foreground">Tüm ürünler sıkı kalite kontrol süreçlerinden geçirilir.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Lojistik ve Dağıtım</h4>
                      <p className="text-muted-foreground">
                        Ürünler zamanında ve güvenli bir şekilde müşterilere ulaştırılır.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        5
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Müşteri Hizmetleri</h4>
                      <p className="text-muted-foreground">
                        Satış sonrası destek ve teknik danışmanlık hizmetleri sunulur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Orman Ürünlerimiz</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Kereste (Çam, Ladin, Meşe)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Kontrplak</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>MDF ve Sunta</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>OSB</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Ahşap Kaplama</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Mobilya Malzemeleri</span>
                </li>
              </ul>

              <div className="mt-8 space-y-4">
                <div className="bg-zinc-800 text-white p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Leaf className="h-6 w-6 mr-3" />
                    <h4 className="text-lg font-bold">Sürdürülebilir Üretim</h4>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Tüm orman ürünlerimiz sürdürülebilir kaynaklardan elde edilmekte ve çevreye duyarlı üretim
                    süreçlerinden geçmektedir.
                  </p>
                </div>

                <Button className="w-full btn-standard btn-dark" asChild>
                  <Link href="/#contact">İletişime Geçin</Link>
                </Button>
                <Button variant="outline" className="w-full btn-standard bg-transparent" asChild>
                  <a
                    href={`https://wa.me/905364364242?text=Merhaba, Orman Ürünleri hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Teklif Alın
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
