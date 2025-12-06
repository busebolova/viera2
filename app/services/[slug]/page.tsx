import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const servicesData = {
  insaat: {
    title: "İnşaat Hizmetleri",
    description: "Modern ve dayanıklı yapılar inşa ediyoruz. Konut, ticari ve endüstriyel projeler.",
    fullDescription:
      "VIERA Construction olarak, inşaat sektöründe uzun yıllara dayanan tecrübemizle müşterilerimize en kaliteli hizmeti sunuyoruz. Konut, ticari ve endüstriyel projeler dahil olmak üzere geniş bir yelpazede hizmet veriyoruz. Modern mimari anlayışımız, yüksek kaliteli malzeme kullanımımız ve uzman ekibimizle projelerinizi zamanında ve bütçenize uygun şekilde tamamlıyoruz.",
    icon: "Building2",
    mainImage: "/modern-construction-site.png",
    features: [
      "Konut Projeleri",
      "Ticari Binalar",
      "Endüstriyel Tesisler",
      "Altyapı Projeleri",
      "Renovasyon Çalışmaları",
      "Proje Yönetimi",
    ],
    process: [
      {
        title: "Planlama ve Tasarım",
        description: "Müşteri ihtiyaçlarına göre detaylı planlama ve tasarım çalışmaları yapılır.",
      },
      {
        title: "Mühendislik ve Mimari",
        description: "Uzman mühendis ve mimarlarımız tarafından projenin teknik detayları hazırlanır.",
      },
      {
        title: "İnşaat Süreci",
        description: "Kaliteli malzemeler ve uzman ekibimizle inşaat süreci yönetilir.",
      },
      {
        title: "Kalite Kontrol",
        description: "Her aşamada kalite kontrol yapılarak projenin standartlara uygunluğu sağlanır.",
      },
      {
        title: "Teslim ve Sonrası Hizmetler",
        description: "Proje teslimi ve sonrasında da müşteri memnuniyeti için destek sağlanır.",
      },
    ],
  },
  petrol: {
    title: "Petrol Ürünleri Tedariki",
    description: "Kaliteli petrol ürünleri tedariki ve dağıtımı konusunda güvenilir çözümler.",
    fullDescription:
      "VIERA Construction olarak, petrol ürünleri tedariki ve dağıtımı konusunda güvenilir çözümler sunuyoruz. Yüksek kaliteli petrol ürünlerini, zamanında ve rekabetçi fiyatlarla müşterilerimize ulaştırıyoruz. Geniş tedarik ağımız ve lojistik imkanlarımızla, müşterilerimizin ihtiyaçlarına özel çözümler üretiyoruz.",
    icon: "Fuel",
    mainImage: "/petroleum-facility.png",
    features: [
      "Akaryakıt Tedariki",
      "Madeni Yağlar",
      "Endüstriyel Yakıtlar",
      "Lojistik Hizmetler",
      "Depolama Çözümleri",
      "Kalite Kontrol",
    ],
    process: [
      {
        title: "Tedarik Zinciri Yönetimi",
        description: "Güvenilir kaynaklardan yüksek kaliteli petrol ürünleri tedarik edilir.",
      },
      {
        title: "Kalite Kontrol",
        description: "Tüm ürünler sıkı kalite kontrol süreçlerinden geçirilir.",
      },
      {
        title: "Lojistik ve Dağıtım",
        description: "Modern lojistik ağımızla ürünler zamanında müşterilere ulaştırılır.",
      },
      {
        title: "Depolama",
        description: "Güvenli ve standartlara uygun depolama tesislerinde ürünler muhafaza edilir.",
      },
      {
        title: "Müşteri Hizmetleri",
        description: "Satış sonrası destek ve teknik danışmanlık hizmetleri sunulur.",
      },
    ],
  },
  hafriyat: {
    title: "Hafriyat ve Altyapı",
    description: "Profesyonel ekipman ve uzman kadromuzla hafriyat ve altyapı çözümleri.",
    fullDescription:
      "VIERA Construction olarak, modern ekipman ve uzman kadromuzla hafriyat ve altyapı çözümleri sunuyoruz. İnşaat projelerinin temelini oluşturan hafriyat çalışmalarını, çevreye duyarlı ve verimli bir şekilde gerçekleştiriyoruz. Altyapı projelerinde ise, uzun ömürlü ve kaliteli çözümler üretiyoruz.",
    icon: "Truck",
    mainImage: "/excavation-site.png",
    features: [
      "Arazi Tesviyesi",
      "Kazı ve Dolgu İşlemleri",
      "Yol ve Köprü İnşaatı",
      "Kanalizasyon ve Su Şebekesi",
      "Zemin İyileştirme",
      "Çevre Düzenleme",
    ],
    process: [
      {
        title: "Saha Analizi",
        description: "Projenin gerçekleştirileceği alanın detaylı analizi yapılır.",
      },
      {
        title: "Planlama",
        description: "Hafriyat ve altyapı çalışmaları için detaylı plan hazırlanır.",
      },
      {
        title: "Ekipman Seçimi",
        description: "Projeye uygun ekipman ve makineler belirlenir.",
      },
      {
        title: "Uygulama",
        description: "Uzman ekibimizle hafriyat ve altyapı çalışmaları gerçekleştirilir.",
      },
      {
        title: "Kalite Kontrol ve Teslim",
        description: "Çalışmalar tamamlandıktan sonra kalite kontrol yapılır ve teslim edilir.",
      },
    ],
  },
  orman: {
    title: "Orman Ürünleri",
    description: "Sürdürülebilir kaynaklardan elde edilen kaliteli orman ürünleri ve ahşap tedariki.",
    fullDescription:
      "VIERA Construction olarak, sürdürülebilir kaynaklardan elde edilen kaliteli orman ürünleri ve ahşap tedariki hizmeti sunuyoruz. Çevreye duyarlı yaklaşımımızla, doğal kaynakları koruyarak, yüksek kaliteli orman ürünlerini müşterilerimize ulaştırıyoruz. Geniş ürün yelpazemiz ve uzman kadromuzla, müşterilerimizin ihtiyaçlarına özel çözümler üretiyoruz.",
    icon: "Trees",
    mainImage: "/forest-products.png",
    features: [
      "Kereste Üretimi",
      "Ahşap Panel ve Levhalar",
      "Mobilya Malzemeleri",
      "İnşaat Ahşapları",
      "Sürdürülebilir Ormancılık",
      "Özel Üretim Çözümleri",
    ],
    process: [
      {
        title: "Sürdürülebilir Kaynak Yönetimi",
        description: "Çevreye duyarlı ve sürdürülebilir kaynaklardan hammadde tedariki yapılır.",
      },
      {
        title: "Üretim",
        description: "Modern tesislerimizde yüksek kaliteli orman ürünleri üretilir.",
      },
      {
        title: "Kalite Kontrol",
        description: "Tüm ürünler sıkı kalite kontrol süreçlerinden geçirilir.",
      },
      {
        title: "Lojistik ve Dağıtım",
        description: "Ürünler zamanında ve güvenli bir şekilde müşterilere ulaştırılır.",
      },
      {
        title: "Müşteri Hizmetleri",
        description: "Satış sonrası destek ve teknik danışmanlık hizmetleri sunulur.",
      },
    ],
  },
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    return {
      title: "Hizmet Bulunamadı",
      description: "Aradığınız hizmet mevcut değil veya kaldırılmış olabilir.",
    }
  }

  return {
    title: service.title,
    description: service.description,
    keywords: ["VIERA Construction", "Hizmetler", service.title],
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Hizmet bulunamadı</h1>
        <p className="mb-8">Aradığınız hizmet mevcut değil veya kaldırılmış olabilir.</p>
        <Button asChild className="btn-standard">
          <Link href="/#services">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Hizmetlere Dön
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src={service.mainImage || "/placeholder.svg"}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-xl text-white/80">{service.description}</p>
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
                href="/#services"
                className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 mb-6 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Tüm Hizmetlere Dön
              </Link>
              <h2 className="text-2xl font-bold mb-4">Hizmet Detayları</h2>
              <p className="text-muted-foreground">{service.fullDescription}</p>
            </div>

            {/* Process */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">Hizmet Süreci</h3>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Hizmet Özellikleri</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-zinc-600 mr-3 mt-0.5 flex-shrink-0 dark:text-zinc-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4">
                <Button className="w-full btn-standard btn-dark" asChild>
                  <Link href="/#contact">İletişime Geçin</Link>
                </Button>
                <Button variant="outline" className="w-full btn-standard bg-transparent" asChild>
                  <a
                    href={`https://wa.me/905364364242?text=Merhaba, ${service.title} hakkında bilgi almak istiyorum.`}
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
