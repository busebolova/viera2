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

// Varsayılan içerikler - GitHub'dan veri gelmezse kullanılır
export const defaultProjects = {
  pageTitle: "Projelerimiz",
  pageDescription: "60 yılı aşkın tecrübemizle gerçekleştirdiğimiz projeler",
  heroImage: "/projects-hero.jpg",
  completed: [],
  ongoing: [],
  upcoming: [],
}

export const defaultHome = {
  hero: { title: "Viera & Alkan Yapı", subtitle: "Güven, Kalite, Profesyonellik", description: "", image: "" },
  video: { url: "", title: "Viera & Alkan Yapı", subtitle: "Güven, Kalite, Profesyonellik" },
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
  experience: { title: "60 Yılı Aşkın Tecrübe", description: "" },
  about: { badge: "Hakkımızda", title: "Firma Geçmişimiz", description: "", image: "" },
  whyUs: { title: "Neden VIERA Construction?", items: [] },
}

export const defaultAbout = {
  title: "Hakkımızda",
  pageTitle: "Firmamız Hakkında",
  heroImage: "",
  description: "",
  certificate: "D Sınıfı Müteahhitlik Belgesi",
  certificateDescription: "",
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
  contact: { address: "", authorized: "", phone: "", fax: "", mobile: "", email: "" },
  vision: { title: "Vizyonumuz", description: "" },
  mission: { title: "Misyonumuz", description: "" },
  values: { title: "Değerlerimiz", description: "" },
  whyUs: { title: "Neden VIERA Construction?", items: [] },
  image: "",
  officeImage: "",
}

export const defaultServices = {
  hero: { title: "Hizmetlerimiz", subtitle: "", image: "" },
  intro: { badge: "Uzmanlık Alanlarımız", title: "Sunduğumuz Hizmetler", description: "" },
  services: [],
  cta: { title: "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim", description: "" },
}

export const defaultContact = {
  address: "",
  phone: "",
  mobile: "",
  email: "",
  fax: "",
  authorized: "",
  hours: "Pazartesi - Cuma: 09:00 - 18:00",
  heroImage: "",
}
