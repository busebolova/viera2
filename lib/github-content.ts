// GitHub'dan içerik çeken yardımcı fonksiyonlar
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function getContent<T>(file: string): Promise<T | null> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.log(`[v0] GitHub config missing, returning null for ${file}`)
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

export const defaultHome = {
  video: {
    url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    title: "Viera & Alkan Yapı",
    subtitle: "Güven, Kalite, Profesyonellik",
  },
  experience: {
    title: "60 Yılı Aşkın Tecrübe",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
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
  about: {
    badge: "Hakkımızda",
    title: "Firma Geçmişimiz",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    image: "/about-office.jpg",
    certification: {
      title: "Müteahhitlik Belgemiz",
      description: "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.",
    },
    projects: {
      title: "Projelerimiz",
      description: "60 yılı aşkın sürede 100'den fazla proje başarıyla tamamlanmıştır.",
    },
  },
  process: {
    title: "Çalışma Sürecimiz",
    subtitle: "Projelerinizi nasıl hayata geçiriyoruz",
    steps: [
      {
        title: "Planlama",
        description: "Projenizi detaylı analiz ediyor ve en uygun çözümleri sunuyoruz",
      },
      {
        title: "Tasarım",
        description: "Mimarlar ve mühendislerimiz projenizi tasarlıyor",
      },
      {
        title: "İnşaat",
        description: "Uzman ekibimizle projenizi kaliteli bir şekilde inşa ediyoruz",
      },
      {
        title: "Teslim",
        description: "Projenizi zamanında ve eksiksiz olarak teslim ediyoruz",
      },
    ],
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
  cta: {
    title: "Projeniz İçin Bizimle İletişime Geçin",
    description: "60 yılı aşkın deneyimimiz ve uzman kadromuzla hayalinizdeki projeyi birlikte hayata geçirelim.",
  },
}

export const defaultAbout = {
  title: "Hakkımızda",
  pageTitle: "Firmamız Hakkında",
  heroImage: "/modern-construction-office-building.jpg",
  officeImage: "/modern-office-interior.jpg",
  description:
    "VIERA Construction - Alkan Yapı & Viera Ortaklığı olarak konut ve iş yeri üretimine aralıksız devam etmekteyiz.",
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
    description: "Dürüstlük, şeffaflık, müşteri odaklılık, çevreye saygı ve sürekli gelişim.",
  },
  whyUs: {
    title: "Neden VIERA Construction?",
    items: [
      { title: "Kalite", description: "Her projede en yüksek kalite standartlarını uyguluyoruz." },
      { title: "Güvenilirlik", description: "Söz verdiğimiz zamanda teslim ediyoruz." },
    ],
  },
}

export const defaultServices = {
  intro: {
    badge: "Uzmanlık Alanlarımız",
    title: "Sunduğumuz Hizmetler",
    description: "1961 yılından bu yana inşaat sektöründe edindiğimiz tecrübeyle modern projeler üretiyoruz.",
  },
  services: [
    {
      id: "konut",
      icon: "Home",
      title: "Konut Projeleri",
      description:
        "Modern yaşam standartlarına uygun, konforu ve estetiği bir araya getiren konut projeleri geliştiriyoruz.",
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
      description:
        "İş dünyasının dinamik ihtiyaçlarına yönelik, fonksiyonel ve prestijli ticari binalar inşa ediyoruz.",
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
      description: "Yaşam, iş ve alışveriş alanlarını bir araya getiren entegre yaşam merkezleri tasarlıyoruz.",
      items: [
        { title: "Rezidans-Ofis Kompleksleri", description: "Yaşam ve iş alanlarını entegre eden projeler" },
        { title: "Karma Kullanım Alışveriş Merkezleri", description: "Ticaret, eğlence ve konut konseptleri" },
        { title: "Yerleşke Projeleri", description: "Bütünleşik şehir içinde şehir konseptleri" },
      ],
    },
  ],
  cta: {
    title: "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim",
    description:
      "60 yılı aşkın tecrübemiz ve uzman ekibimizle projelerinizi hayata geçirmek için hazırız. Detaylı bilgi ve teklif almak için bizimle iletişime geçin.",
  },
}

export const defaultContact = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  whatsapp: "905334798387",
  email: "info@alkanyapi.com.tr",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
  hours: "Pazartesi - Cuma: 09:00 - 18:00",
  heroImage: "/contact-hero.jpg",
  authorizedPersons: [
    {
      name: "Erdem Alkan",
      title: "Genel Müdür",
      phone: "0533 479 83 87",
      email: "erdemalkan72@gmail.com",
    },
  ],
}

export const defaultProjects = {
  pageTitle: "Projelerimiz",
  pageDescription: "60 yılı aşkın tecrübemizle gerçekleştirdiğimiz projeler",
  heroImage: "/projects-hero.jpg",
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
      shortDescription: "Altunizade Mah. Kalfa Çeşme Sok.",
      fullDescription:
        "Altunizade Mahallesi Kalfa Çeşme Sokak'ta konumlanan Validebağ 27-28 Blok projemiz, modern mimari anlayışı ve kaliteli işçiliğiyle öne çıkmaktadır.",
      details: "56 Daire",
      year: "2024",
      location: "Altunizade, Üsküdar - İstanbul",
      area: "8.500 m²",
      units: "56 Daire",
      floors: "8 Kat",
      status: "completed",
      mainImage: "/modern-apartment-building.png",
      image: "/modern-apartment-building.png",
      gallery: ["/modern-apartment-building.png"],
      features: ["Modern mimari tasarım", "Depreme dayanıklı yapı", "Kapalı otopark", "Güvenlik sistemi"],
    },
    {
      id: "azade-86",
      slug: "azade-evleri-86-parsel",
      title: "AZADE Evleri 86 Parsel",
      shortDescription: "Barbaros Mah. Mütevelliçeşme Cad.",
      fullDescription: "Barbaros Mahallesi Mütevelliçeşme Caddesi'nde yer alan AZADE Evleri 86 Parsel projemiz.",
      details: "36 Daire",
      year: "2021",
      location: "Barbaros, Üsküdar - İstanbul",
      area: "5.200 m²",
      units: "36 Daire",
      floors: "6 Kat",
      status: "completed",
      mainImage: "/residential-building-exterior.jpg",
      image: "/residential-building-exterior.jpg",
      gallery: ["/residential-building-exterior.jpg"],
      features: ["Merkezi konum", "Kaliteli malzeme", "Kapalı otopark"],
    },
    {
      id: "eski-anadolu-b",
      slug: "eski-anadolu-sitesi-b-blok",
      title: "Eski Anadolu Sitesi B Blok",
      shortDescription: "Eski Anadolu Sitesi B Blok Apartmanı",
      fullDescription:
        "Eski Anadolu Sitesi B Blok projemiz, kentsel dönüşüm kapsamında yenilenerek modern bir yapıya kavuşturulmuştur.",
      details: "Kentsel Dönüşüm",
      year: "2021",
      location: "Üsküdar - İstanbul",
      area: "4.800 m²",
      units: "32 Daire",
      floors: "7 Kat",
      status: "completed",
      mainImage: "/construction-site-building.png",
      image: "/construction-site-building.png",
      gallery: [],
      features: ["Kentsel dönüşüm projesi", "Depreme dayanıklı yapı"],
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      slug: "validebag-29-kentsel-donusum",
      title: "Validebağ 29 Kentsel Dönüşüm",
      shortDescription: "38 Daire - Kaba inşaat tamamlandı",
      fullDescription: "Validebağ 29 Kentsel Dönüşüm projemiz, 38 daire kapasitesiyle devam etmektedir.",
      details: "2. Etap 2025 3. Çeyrek tamamlanacak",
      year: "2025",
      expectedCompletion: "2025 Q3",
      location: "Altunizade, Üsküdar - İstanbul",
      area: "6.200 m²",
      units: "38 Daire",
      floors: "8 Kat",
      progress: 65,
      status: "ongoing",
      mainImage: "/architectural-rendering-building.jpg",
      image: "/architectural-rendering-building.jpg",
      gallery: ["/architectural-rendering-building.jpg"],
      features: ["Kentsel dönüşüm projesi", "Modern mimari", "Kapalı otopark"],
      updates: [
        {
          date: "2024-12",
          title: "Kaba İnşaat Tamamlandı",
          description: "Projenin kaba inşaat aşaması başarıyla tamamlanmıştır.",
        },
      ],
    },
  ],
  upcoming: [
    {
      id: "yeni-proje-2025",
      slug: "yeni-proje-2025",
      title: "Yeni Proje 2025",
      shortDescription: "Yakında başlayacak yeni projemiz",
      fullDescription: "2025 yılında başlayacak yeni projemiz hakkında detaylar yakında paylaşılacaktır.",
      details: "Detaylar yakında açıklanacak",
      year: "2025",
      expectedStart: "2025 Q2",
      location: "İstanbul",
      status: "upcoming",
      mainImage: "/modern-construction-site.png",
      image: "/modern-construction-site.png",
      gallery: [],
      features: [],
    },
  ],
}
