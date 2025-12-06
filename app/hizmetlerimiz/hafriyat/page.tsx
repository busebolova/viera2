import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CheckCircle, Truck, Ruler, HardHat, Shovel } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Hafriyat ve Altyapı | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı olarak, modern ekipman ve uzman kadromuzla hafriyat ve altyapı çözümleri sunuyoruz.",
  keywords: ["VIERA", "Alkan Yapı", "Viera", "Hafriyat", "Altyapı", "Arazi Tesviyesi", "Kazı İşlemleri", "Yol İnşaatı"],
}

export default function HafriyatPage() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/hafriyat-is-makinesi.png" alt="VIERA Hafriyat ve Altyapı" fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Hafriyat ve Altyapı</h1>
              <p className="text-xl text-white/80">
                Profesyonel ekipman ve uzman kadromuzla hafriyat ve altyapı çözümleri sunuyoruz.
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
              <h2 className="text-2xl font-bold mb-4">Hafriyat ve Altyapı Hizmetlerimiz</h2>
              <p className="text-muted-foreground mb-6">
                VIERA - Alkan Yapı & Viera Ortaklığı olarak, modern ekipman ve uzman kadromuzla hafriyat ve altyapı
                çözümleri sunuyoruz. İnşaat projelerinin temelini oluşturan hafriyat çalışmalarını, çevreye duyarlı ve
                verimli bir şekilde gerçekleştiriyoruz. Altyapı projelerinde ise, uzun ömürlü ve kaliteli çözümler
                üretiyoruz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Shovel className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Arazi Tesviyesi</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Modern iş makinelerimizle arazi tesviye çalışmalarını hızlı ve hassas bir şekilde
                    gerçekleştiriyoruz. İnşaat öncesi arazi hazırlığı için profesyonel çözümler sunuyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Truck className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Kazı ve Dolgu İşlemleri</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Her türlü kazı ve dolgu işlemlerini, çevreye duyarlı bir şekilde gerçekleştiriyoruz. Temel kazıları,
                    kanal kazıları ve dolgu işlemleri için uzman ekibimizle hizmet veriyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <Ruler className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Yol ve Köprü İnşaatı</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Yol ve köprü inşaatı için gerekli altyapı çalışmalarını, modern ekipmanlarımız ve uzman kadromuzla
                    gerçekleştiriyoruz. Uzun ömürlü ve kaliteli altyapı çözümleri sunuyoruz.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 flex items-center justify-center mr-3">
                      <HardHat className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Zemin İyileştirme</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Zemin iyileştirme çalışmalarıyla, inşaat projeleriniz için güvenli ve sağlam bir temel
                    oluşturuyoruz. Modern tekniklerle zemin stabilizasyonu ve iyileştirme hizmetleri sunuyoruz.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Neden Bizi Tercih Etmelisiniz?</h3>
                <p className="text-muted-foreground mb-6">
                  VIERA - Alkan Yapı & Viera Ortaklığı olarak, hafriyat ve altyapı çalışmalarında uzun yıllara dayanan
                  tecrübemiz ve modern ekipmanlarımızla, müşterilerimize en kaliteli hizmeti sunuyoruz. Çevreye duyarlı
                  yaklaşımımız, zamanında teslim ve rekabetçi fiyat politikamızla, sektörde öncü bir konuma sahibiz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Modern iş makineleri ve ekipmanlar</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Uzman operatör ve teknik kadro</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Çevreye duyarlı çalışma prensibi</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Zamanında teslim garantisi</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>Rekabetçi fiyat politikası</span>
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
                      <h4 className="text-lg font-medium">Saha Analizi</h4>
                      <p className="text-muted-foreground">
                        Projenin gerçekleştirileceği alanın detaylı analizi yapılır.
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
                      <h4 className="text-lg font-medium">Planlama</h4>
                      <p className="text-muted-foreground">
                        Hafriyat ve altyapı çalışmaları için detaylı plan hazırlanır.
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
                      <h4 className="text-lg font-medium">Ekipman Seçimi</h4>
                      <p className="text-muted-foreground">Projeye uygun ekipman ve makineler belirlenir.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        4
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Uygulama</h4>
                      <p className="text-muted-foreground">
                        Uzman ekibimizle hafriyat ve altyapı çalışmaları gerçekleştirilir.
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
                      <h4 className="text-lg font-medium">Kalite Kontrol ve Teslim</h4>
                      <p className="text-muted-foreground">
                        Çalışmalar tamamlandıktan sonra kalite kontrol yapılır ve teslim edilir.
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
              <h3 className="text-lg font-bold mb-6">Hafriyat Hizmetlerimiz</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Arazi Tesviyesi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Kazı ve Dolgu İşlemleri</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Yol ve Köprü İnşaatı</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Kanalizasyon ve Su Şebekesi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Zemin İyileştirme</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                  <span>Çevre Düzenleme</span>
                </li>
              </ul>

              <div className="mt-8 space-y-4">
                <div className="bg-zinc-800 text-white p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <HardHat className="h-6 w-6 mr-3" />
                    <h4 className="text-lg font-bold">Profesyonel Ekip</h4>
                  </div>
                  <p className="text-sm text-white/80 mb-4">
                    Uzman operatör ve teknik kadromuzla, hafriyat ve altyapı projelerinizi güvenle tamamlıyoruz.
                  </p>
                </div>

                <Button className="w-full btn-standard btn-dark" asChild>
                  <Link href="/#contact">İletişime Geçin</Link>
                </Button>
                <Button variant="outline" className="w-full btn-standard bg-transparent" asChild>
                  <a
                    href={`https://wa.me/905364364242?text=Merhaba, Hafriyat ve Altyapı hizmetleri hakkında bilgi almak istiyorum.`}
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
