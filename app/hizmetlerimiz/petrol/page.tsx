import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CheckCircle, Fuel, Truck, BarChart3, Factory, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Petrol Ürünleri Tedariki | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı olarak, petrol ürünleri tedariki ve dağıtımı konusunda güvenilir çözümler sunuyoruz.",
  keywords: [
    "VIERA",
    "Alkan Yapı",
    "Viera",
    "Petrol Ürünleri",
    "Akaryakıt Tedariki",
    "Madeni Yağlar",
    "Endüstriyel Yakıtlar",
  ],
}

export default function PetrolPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/petrol-boru-hatti.png"
          alt="VIERA Petrol Ürünleri Tedariki"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Petrol Ürünleri Tedariki</h1>
              <p className="text-xl text-white/80">
                Kaliteli petrol ürünleri tedariki ve dağıtımı konusunda güvenilir çözümler sunuyoruz.
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
              <h2 className="text-2xl font-bold mb-4">Petrol Ürünleri Tedariki Hizmetlerimiz</h2>
              <p className="text-muted-foreground mb-6">
                VIERA - Alkan Yapı & Viera Ortaklığı olarak, petrol ürünleri tedariki ve dağıtımı konusunda güvenilir
                çözümler sunuyoruz. Yüksek kaliteli petrol ürünlerini, zamanında ve rekabetçi fiyatlarla müşterilerimize
                ulaştırıyoruz. Geniş tedarik ağımız ve lojistik imkanlarımızla, müşterilerimizin ihtiyaçlarına özel
                çözümler üretiyoruz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Fuel className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Akaryakıt Tedariki</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Benzin, motorin, fuel oil gibi akaryakıt ürünlerinin toptan tedariki ve dağıtımı hizmetleri
                    sunuyoruz. Yüksek kalite standartlarında ve rekabetçi fiyatlarla akaryakıt ihtiyaçlarınızı
                    karşılıyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Truck className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Lojistik Hizmetler</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Modern lojistik ağımız ve özel taşıma araçlarımızla, petrol ürünlerinin güvenli ve zamanında
                    teslimatını sağlıyoruz. Özel lojistik çözümlerimizle müşterilerimizin ihtiyaçlarına uygun hizmet
                    sunuyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Madeni Yağlar</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Motor yağları, şanzıman yağları, hidrolik yağlar ve endüstriyel yağlar gibi geniş bir yelpazede
                    madeni yağ ürünleri tedarik ediyoruz. Yüksek performanslı ve uzun ömürlü madeni yağlarla araç ve
                    makinelerinizin verimli çalışmasını sağlıyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Factory className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Endüstriyel Yakıtlar</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Fabrikalar, sanayi tesisleri ve enerji santralleri için özel endüstriyel yakıt çözümleri sunuyoruz.
                    Yüksek verimlilik sağlayan endüstriyel yakıtlarla işletmenizin enerji ihtiyacını karşılıyoruz.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                <p className="text-muted-foreground mb-6">
                  VIERA - Alkan Yapı & Viera Ortaklığı olarak, petrol ürünleri tedariki konusunda uzun yıllara dayanan
                  tecrübemiz ve güvenilir iş ortaklarımızla, müşterilerimize en kaliteli hizmeti sunuyoruz. Zamanında
                  teslimat, rekabetçi fiyatlar ve müşteri memnuniyeti odaklı çalışma prensibimizle, sektörde öncü bir
                  konuma sahibiz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Yüksek kaliteli petrol ürünleri</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Zamanında teslimat garantisi</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Rekabetçi fiyat politikası</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Geniş tedarik ağı</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Modern lojistik imkanları</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Müşteri odaklı çözümler</span>
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
                      <h4 className="text-lg font-medium">Tedarik Zinciri Yönetimi</h4>
                      <p className="text-muted-foreground">
                        Güvenilir kaynaklardan yüksek kaliteli petrol ürünleri tedarik edilir.
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
                      <h4 className="text-lg font-medium">Kalite Kontrol</h4>
                      <p className="text-muted-foreground">Tüm ürünler sıkı kalite kontrol süreçlerinden geçirilir.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        3
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Lojistik ve Dağıtım</h4>
                      <p className="text-muted-foreground">
                        Modern lojistik ağımızla ürünler zamanında müşterilere ulaştırılır.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Depolama</h4>
                      <p className="text-muted-foreground">
                        Güvenli ve standartlara uygun depolama tesislerinde ürünler muhafaza edilir.
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
              <h3 className="text-lg font-bold mb-6">Petrol Ürünlerimiz</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Benzin (95 Oktan, 97 Oktan)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Motorin (Euro Diesel)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Fuel Oil</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Madeni Yağlar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Endüstriyel Yakıtlar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>LPG</span>
                </li>
              </ul>

              <div className="mt-8 space-y-4">
                <div className="bg-zinc-800 text-white p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 mr-3" />
                    <h4 className="text-lg font-bold">Kalite Garantisi</h4>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Tüm petrol ürünlerimiz uluslararası kalite standartlarına uygun olarak tedarik edilmektedir.
                  </p>
                </div>

                <Button className="w-full btn-standard btn-dark" asChild>
                  <Link href="/#contact">İletişime Geçin</Link>
                </Button>
                <Button variant="outline" className="w-full btn-standard bg-transparent" asChild>
                  <a
                    href={`https://wa.me/905364364242?text=Merhaba, Petrol Ürünleri Tedariki hakkında bilgi almak istiyorum.`}
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
