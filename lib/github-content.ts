// GitHub'dan içerik çeken yardımcı fonksiyonlar
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function getContent<T>(file: string): Promise<T | null> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return null
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.log(`[v0] GitHub fetch failed for ${file}: ${res.status}`)
      return null
    }

    const data = await res.json()
    const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"))
    return content as T
  } catch (err) {
    console.log(`[v0] Error fetching ${file}:`, err)
    return null
  }
}

// Varsayılan içerikler - GitHub'dan veri gelmezse kullanılır
export const defaultProjects = {
  pageTitle: "Projelerimiz",
  pageDescription: "60 yılı aşkın tecrübemizle gerçekleştirdiğimiz projeler",
  heroImage: "/commercial-building-construction.png",
  categories: {
    completed: "Tamamlanan Projeler",
    ongoing: "Devam Eden Projeler",
    upcoming: "Başlayacak Projeler",
  },
  completed: [
    {
      id: "validebag-27-28",
      slug: "validebag-27-28-blok",
      title: "Validebağ 27-28 Blok",
      shortDescription: "Altunizade Mah. Kalfa Çeşme Sok. - 56 Daire",
      fullDescription: "Altunizade Mahallesi Kalfa Çeşme Sokak'ta konumlanan projemiz.",
      details: "56 Daire",
      year: "2024",
      location: "Altunizade, Üsküdar - İstanbul",
      mainImage: "/modern-apartment-building-istanbul.jpg",
      gallery: [],
      features: ["Modern mimari", "Depreme dayanıklı", "Kapalı otopark"],
    },
    {
      id: "azade-86",
      slug: "azade-evleri-86-parsel",
      title: "AZADE Evleri 86 Parsel",
      shortDescription: "Barbaros Mah. Mütevelliçeşme Cad. - 36 Daire",
      fullDescription: "Barbaros Mahallesi'nde yer alan projemiz.",
      details: "36 Daire",
      year: "2021",
      location: "Barbaros, Üsküdar - İstanbul",
      mainImage: "/residential-building-exterior.jpg",
      gallery: [],
      features: ["Merkezi konum", "Kaliteli malzeme"],
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      slug: "validebag-29-kentsel-donusum",
      title: "Validebağ 29 Kentsel Dönüşüm",
      shortDescription: "38 Daire - Kaba inşaat tamamlandı",
      fullDescription: "Kentsel dönüşüm projemiz devam etmektedir.",
      details: "2025 Q3 tamamlanacak",
      year: "2025",
      location: "Altunizade, Üsküdar - İstanbul",
      progress: 65,
      mainImage: "/construction-site-building-progress.jpg",
      gallery: [],
      features: ["Kentsel dönüşüm", "Modern mimari"],
      updates: [{ date: "2024-12", title: "Kaba İnşaat Tamamlandı", description: "Kaba inşaat aşaması bitti." }],
    },
  ],
  upcoming: [
    {
      id: "yeni-proje-2025",
      slug: "yeni-proje-2025",
      title: "Yeni Proje 2025",
      shortDescription: "Yakında başlayacak yeni projemiz",
      fullDescription: "2025 yılında başlayacak projemiz.",
      details: "Detaylar yakında",
      year: "2025",
      location: "İstanbul",
      mainImage: "/architectural-rendering-new-building.jpg",
      gallery: [],
      features: [],
    },
  ],
}

export const defaultHome = {
  hero: {
    title: "Viera & Alkan Yapı",
    typewriterWords: ["Güven", "Kalite", "Profesyonellik", "Deneyim"],
    description: "60 yılı aşkın tecrübemizle İstanbul'un prestijli projelerinde fark yaratıyoruz.",
    buttonText: "Hizmetlerimiz",
    buttonLink: "/hizmetlerimiz",
    secondButtonText: "İletişime Geçin",
    secondButtonLink: "/iletisim",
  },
  stats: {
    founded: "1965",
    foundedLabel: "KURULUŞ YILI",
    employees: "50+",
    employeesLabel: "ÇALIŞAN",
    completedProjects: "100+",
    completedProjectsLabel: "TAMAMLANAN PROJE",
    experience: "60+",
    experienceLabel: "YIL DENEYİM",
  },
  experience: {
    title: "60 Yılı Aşkın Tecrübe",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
  },
  about: {
    badge: "Hakkımızda",
    title: "Firma Geçmişimiz",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    image: "/about-office.jpg",
  },
  whyUs: {
    title: "Neden VIERA Construction?",
    items: [
      { title: "Kalite", description: "Her projede en yüksek kalite standartlarını uyguluyoruz." },
      { title: "Güvenilirlik", description: "Söz verdiğimiz zamanda, söz verdiğimiz kalitede teslim ediyoruz." },
      { title: "Yenilikçilik", description: "Sektördeki en son teknolojileri ve yöntemleri kullanıyoruz." },
      { title: "Sürdürülebilirlik", description: "Çevreye duyarlı projeler geliştiriyoruz." },
    ],
  },
}

export const defaultAbout = {
  title: "Hakkımızda",
  pageTitle: "Firmamız Hakkında",
  heroImage: "/modern-construction-office-building.jpg",
  description: "VIERA Construction - Alkan Yapı & Viera Ortaklığı olarak konut ve iş yeri üretimine devam etmekteyiz.",
  certificate: "D Sınıfı Müteahhitlik Belgesi",
  certificateDescription:
    "Deneyimli kadromuz ve modern ekipmanlarımızla müşterilerimizin ihtiyaçlarına en uygun çözümleri sunmaktayız.",
  stats: {
    founded: "1965",
    foundedLabel: "KURULUŞ YILI",
    employees: "50+",
    employeesLabel: "ÇALIŞAN",
    completedProjects: "100+",
    completedProjectsLabel: "TAMAMLANAN PROJE",
    experience: "60+",
    experienceLabel: "YIL DENEYİM",
  },
  company: {
    name: "VIERA Construction",
    subtitle: "Alkan Yapı & Viera Ortaklığı",
    founder: "Servet Alkan",
    founderTitle: "Kurucu",
  },
  contact: {
    address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar - İstanbul",
    authorized: "Erdem Alkan",
    phone: "0216 391 49 40",
    fax: "0216 310 90 74",
    mobile: "0533 479 83 87",
    email: "info@vieraconstruction.com",
  },
  vision: {
    title: "Vizyonumuz",
    description: "Türkiye'nin en güvenilir inşaat firması olmak ve sektörde öncü konumumuzu sürdürmek.",
  },
  mission: {
    title: "Misyonumuz",
    description: "Kaliteli, güvenilir ve sürdürülebilir projeler üretmek.",
  },
  values: {
    title: "Değerlerimiz",
    description: "Dürüstlük, şeffaflık, müşteri odaklılık, çevreye saygı ve sürekli gelişim ilkelerimizdir.",
  },
  whyUs: {
    title: "Neden VIERA Construction?",
    items: [
      { title: "Kalite", description: "Her projede en yüksek kalite standartlarını uyguluyoruz." },
      { title: "Güvenilirlik", description: "Söz verdiğimiz zamanda, söz verdiğimiz kalitede teslim ediyoruz." },
      { title: "Yenilikçilik", description: "Sektördeki en son teknolojileri ve yöntemleri kullanıyoruz." },
      { title: "Sürdürülebilirlik", description: "Çevreye duyarlı projeler geliştiriyoruz." },
    ],
  },
  image: "/about-office.jpg",
  officeImage: "/modern-office-interior.jpg",
}

export const defaultServices = {
  hero: {
    title: "Hizmetlerimiz",
    subtitle:
      "VIERA - Alkan Yapı & Viera Ortaklığı olarak 60 yılı aşkın tecrübemizle modern yaşam alanları inşa ediyoruz.",
    image: "/services-hero.jpg",
  },
  intro: {
    badge: "Uzmanlık Alanlarımız",
    title: "Sunduğumuz Hizmetler",
    description:
      "60 yılı aşkın süredir inşaat sektöründe edindiğimiz tecrübeyle modern ve kaliteli projeler üretiyoruz.",
  },
  services: [
    {
      id: "konut",
      icon: "Home",
      title: "Konut Projeleri",
      description: "Modern yaşam standartlarına uygun konut projeleri geliştiriyoruz.",
      image: "/service-residential.jpg",
      items: [
        { title: "Lüks Apartman Kompleksleri", description: "Modern mimarisi ve sosyal olanaklarıyla" },
        { title: "Rezidans Projeleri", description: "Premium hizmet anlayışıyla donatılmış" },
        { title: "Villa ve Müstakil Konutlar", description: "Özel yaşam alanları için özel tasarımlar" },
      ],
    },
    {
      id: "ticari",
      icon: "Building",
      title: "Ticari Projeler",
      description: "Fonksiyonel ve prestijli ticari binalar inşa ediyoruz.",
      image: "/service-commercial.jpg",
      items: [
        { title: "İş Merkezleri ve Plazalar", description: "Kurumsal kimliğe uygun prestijli ofis alanları" },
        { title: "Alışveriş Kompleksleri", description: "Modern perakende ve eğlence merkezleri" },
        { title: "Otel ve Turizm Tesisleri", description: "Konuk memnuniyeti odaklı konaklama projeleri" },
      ],
    },
    {
      id: "karma",
      icon: "Landmark",
      title: "Karma Kullanımlı Projeler",
      description: "Yaşam, iş ve alışveriş alanlarını bir araya getiren projeler.",
      image: "/service-mixed.jpg",
      items: [
        { title: "Rezidans-Ofis Kompleksleri", description: "Yaşam ve iş alanlarını entegre eden projeler" },
        { title: "Karma Kullanım Alışveriş Merkezleri", description: "Ticaret, eğlence ve konut konseptleri" },
        { title: "Yerleşke Projeleri", description: "Bütünleşik şehir içinde şehir konseptleri" },
      ],
    },
  ],
  cta: {
    title: "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim",
    description: "60 yılı aşkın tecrübemiz ve uzman ekibimizle projelerinizi hayata geçirmek için hazırız.",
  },
}

export const defaultContact = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  email: "info@alkanyapi.com.tr",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
  hours: "Pazartesi - Cuma: 09:00 - 18:00",
  heroImage: "/modern-office-building-exterior-istanbul.jpg",
}
