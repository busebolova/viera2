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
  hero: {
    title: "Hizmetlerimiz",
    subtitle: "60 yılı aşkın tecrübemizle modern yaşam alanları inşa ediyoruz.",
    image: "/services-hero.jpg",
  },
  intro: {
    badge: "Uzmanlık Alanlarımız",
    title: "Sunduğumuz Hizmetler",
    description: "60 yılı aşkın süredir inşaat sektöründe edindiğimiz tecrübeyle modern projeler üretiyoruz.",
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
        { title: "Rezidans Projeleri", description: "Premium hizmet anlayışıyla" },
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
  completed: [],
  ongoing: [],
  upcoming: [],
}
