"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, Save, Plus, Trash2 } from "lucide-react"
import Image from "next/image" // Import Image component

type ContentType = "home" | "about" | "services" | "projects" | "contact"

type ContentState = {
  home: {
    video: { url: string; title: string; subtitle: string }
    experience: { title: string; description: string }
    stats: Record<string, string>
    about: Record<string, string>
    whyUs: Record<string, string>
    process: { title: string; subtitle: string; steps: Array<{ title: string; description: string }> }
    clients: { title: string; subtitle: string; logos: Array<{ name: string; logo: string }> }
    cta: { title: string; description: string }
  }
  about: {
    title: string
    pageTitle: string
    description: string
    stats: Record<string, string>
    company: Record<string, string>
    contact: Record<string, string>
    vision: Record<string, string>
    mission: Record<string, string>
    values: Record<string, string>
    whyUs: Record<string, string>
  }
  services: {
    hero: Record<string, string>
    intro: Record<string, string>
    services: Array<{ id: string; icon: string; title: string; description: string; image: string; items: Array<any> }>
    cta: Record<string, string>
  }
  projects: {
    pageTitle: string
    pageDescription: string
    categories: Record<string, string>
    completed: Array<{
      id: string
      slug: string
      title: string
      shortDescription: string
      fullDescription: string
      details: string
      year: string
      location: string
      area: string
      units: string
      floors: string
      status: string
      mainImage: string
      gallery: Array<string>
      features: Array<string>
    }>
    ongoing: Array<{
      id: string
      slug: string
      title: string
      shortDescription: string
      fullDescription: string
      details: string
      year: string
      location: string
      area: string
      units: string
      floors: string
      progress: number
      status: string
      mainImage: string
      gallery: Array<string>
      features: Array<string>
      updates: Array<{ date: string; title: string; description: string }>
    }>
    upcoming: Array<{
      id: string
      slug: string
      title: string
      shortDescription: string
      fullDescription: string
      details: string
      year: string
      location: string
      status: string
      mainImage: string
      gallery: Array<string>
      features: Array<string>
    }>
  }
  contact: {
    address: string
    phone: string
    mobile: string
    email: string
    fax: string
    authorized: string
    hours: string
    whatsapp: string
    authorizedPersons: Array<{
      name: string
      title: string
      phone: string
      email: string
    }>
  }
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "viera2025"

const defaultHome = {
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
  process: {
    title: "Çalışma Sürecimiz",
    subtitle: "Proje aşamalarını adım adım takip ediyoruz.",
    steps: [
      { title: "Planlama", description: "İhtiyaçlarınızı analiz edip detaylı planlama yapıyoruz." },
      { title: "Tasarım", description: "Modern ve fonksiyonel tasarımlar geliştiriyoruz." },
      { title: "İnşaat", description: "Kaliteli malzemeler ve uzman ekibimizle inşa ediyoruz." },
      { title: "Teslimat", description: "Projelerinizi zamanında ve eksiksiz teslim ediyoruz." },
    ],
  },
  clients: {
    title: "Referanslarımız",
    subtitle: "Güvenilir iş ortaklarımızla başarıya ulaşıyoruz.",
    logos: [
      { name: "Örnek Firma 1", logo: "/client-logo-1.png" },
      { name: "Örnek Firma 2", logo: "/client-logo-2.png" },
      { name: "Örnek Firma 3", logo: "/client-logo-3.png" },
    ],
  },
  cta: {
    title: "Hayalinizdeki Yapıyı Birlikte İnşa Edelim",
    description: "Detaylı bilgi ve teklif için bizimle iletişime geçin.",
  },
}

const defaultAbout = {
  title: "Hakkımızda",
  pageTitle: "Firmamız Hakkında",
  heroImage: "/modern-construction-office-building.jpg",
  officeImage: "/modern-office-interior.jpg",
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
  vision: { title: "Vizyonumuz", description: "Türkiye'nin en güvenilir inşaat firması olmak." },
  mission: { title: "Misyonumuz", description: "Kaliteli ve güvenilir projeler üretmek." },
  values: { title: "Değerlerimiz", description: "Dürüstlük, şeffaflık, müşteri odaklılık." },
  whyUs: {
    title: "Neden VIERA Construction?",
    items: [
      { title: "Kalite", description: "En yüksek kalite standartları." },
      { title: "Güvenilirlik", description: "Zamanında teslim." },
    ],
  },
}

const defaultServices = {
  hero: {
    title: "Hizmetlerimiz",
    subtitle: "60 yılı aşkın tecrübemizle modern yaşam alanları inşa ediyoruz.",
    image: "/services-hero.jpg",
  },
  intro: {
    badge: "Uzmanlık Alanlarımız",
    title: "Sunduğumuz Hizmetler",
    description: "Modern ve kaliteli projeler üretiyoruz.",
  },
  services: [
    {
      id: "konut",
      icon: "Home",
      title: "Konut Projeleri",
      description: "Modern konut projeleri.",
      image: "/service-residential.jpg",
      items: [],
    },
    {
      id: "ticari",
      icon: "Building",
      title: "Ticari Projeler",
      description: "Ticari binalar.",
      image: "/service-commercial.jpg",
      items: [],
    },
  ],
  cta: { title: "Hayalinizdeki Projeyi Birlikte Gerçekleştirelim", description: "Bizimle iletişime geçin." },
}

const defaultProjects = {
  pageTitle: "Projelerimiz",
  pageDescription: "60 yılı aşkın tecrübemizle gerçekleştirdiğimiz projeler",
  heroImage: "/projects-hero.jpg",
  categories: {},
  completed: [
    {
      id: "validebag-27-28",
      slug: "validebag-27-28-blok",
      title: "Validebağ 27-28 Blok",
      shortDescription: "56 Daire - Altunizade",
      fullDescription: "Modern mimari anlayışı ile inşa edilen projemiz.",
      details: "56 Daire",
      year: "2024",
      location: "Altunizade, Üsküdar - İstanbul",
      area: "8.500 m²",
      units: "56 Daire",
      floors: "8 Kat",
      status: "completed",
      mainImage: "/project-1.jpg",
      gallery: [],
      features: ["Modern mimari", "Depreme dayanıklı", "Kapalı otopark"],
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      slug: "validebag-29-kentsel-donusum",
      title: "Validebağ 29 Kentsel Dönüşüm",
      shortDescription: "38 Daire - Devam ediyor",
      fullDescription: "Kentsel dönüşüm projemiz.",
      details: "2025 Q3 tamamlanacak",
      year: "2025",
      location: "Altunizade, Üsküdar - İstanbul",
      area: "6.200 m²",
      units: "38 Daire",
      floors: "8 Kat",
      progress: 65,
      status: "ongoing",
      mainImage: "/project-ongoing.jpg",
      gallery: [],
      features: ["Kentsel dönüşüm", "Modern mimari"],
      updates: [{ date: "2024-12", title: "Kaba İnşaat Tamamlandı", description: "Kaba inşaat bitti." }],
    },
  ],
  upcoming: [
    {
      id: "yeni-proje-2025",
      slug: "yeni-proje-2025",
      title: "Yeni Proje 2025",
      shortDescription: "Yakında başlayacak",
      fullDescription: "2025 yılında başlayacak projemiz.",
      details: "Detaylar yakında",
      year: "2025",
      location: "İstanbul",
      status: "upcoming",
      mainImage: "/project-upcoming.jpg",
      gallery: [],
      features: [],
    },
  ],
}

const defaultContact = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  whatsapp: "905334798387",
  email: "info@alkanyapi.com.tr",
  fax: "0216 310 90 74",
  authorizedPersons: [
    {
      name: "Erdem Alkan",
      title: "Genel Müdür",
      phone: "0533 479 83 87",
      email: "erdem@alkanyapi.com.tr",
    },
  ],
  hours: "Pazartesi - Cuma: 09:00 - 18:00",
  heroImage: "/contact-hero.jpg",
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<ContentType>("home")
  const [projectTab, setProjectTab] = useState<"completed" | "ongoing" | "upcoming">("completed")
  const [content, setContent] = useState<ContentState>({
    home: defaultHome,
    about: defaultAbout,
    services: defaultServices,
    projects: defaultProjects,
    contact: defaultContact,
  })
  const [shas, setShas] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // State for mobile menu

  useEffect(() => {
    if (authenticated) loadAllContent()
  }, [authenticated])

  const loadContent = async (file: ContentType) => {
    const timestamp = Date.now()
    try {
      console.log(`[v0] Loading ${file}...`)
      const res = await fetch(`/api/github/content?file=${file}&t=${timestamp}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        console.log(`[v0] Failed to load ${file}, status:`, res.status)
        return
      }

      const data = await res.json()
      console.log(`[v0] Received data for ${file}:`, data)

      if (data.content) {
        let mergedContent = data.content

        if (file === "home") {
          mergedContent = {
            video: { ...defaultHome.video, ...(data.content.video || {}) },
            experience: { ...defaultHome.experience, ...(data.content.experience || {}) },
            stats: { ...defaultHome.stats, ...(data.content.stats || {}) },
            about: { ...defaultHome.about, ...(data.content.about || {}) },
            whyUs: { ...defaultHome.whyUs, ...(data.content.whyUs || {}) },
            process: { ...defaultHome.process, ...(data.content.process || {}) },
            clients: { ...defaultHome.clients, ...(data.content.clients || {}) },
            cta: { ...defaultHome.cta, ...(data.content.cta || {}) },
          }
        } else if (file === "contact") {
          mergedContent = { ...defaultContact, ...data.content }
        } else if (file === "about") {
          mergedContent = {
            ...defaultAbout,
            ...data.content,
            stats: { ...defaultAbout.stats, ...(data.content.stats || {}) },
            company: { ...defaultAbout.company, ...(data.content.company || {}) },
            contact: { ...defaultAbout.contact, ...(data.content.contact || {}) },
            vision: { ...defaultAbout.vision, ...(data.content.vision || {}) },
            mission: { ...defaultAbout.mission, ...(data.content.mission || {}) },
            values: { ...defaultAbout.values, ...(data.content.values || {}) },
            whyUs: { ...defaultAbout.whyUs, ...(data.content.whyUs || {}) },
          }
        } else if (file === "services") {
          mergedContent = {
            ...defaultServices,
            ...data.content,
            hero: { ...defaultServices.hero, ...(data.content.hero || {}) },
            intro: { ...defaultServices.intro, ...(data.content.intro || {}) },
            cta: { ...defaultServices.cta, ...(data.content.cta || {}) },
          }
        } else if (file === "projects") {
          mergedContent = {
            pageTitle: data.content.pageTitle || defaultProjects.pageTitle,
            pageDescription: data.content.pageDescription || defaultProjects.pageDescription,
            categories: data.content.categories || defaultProjects.categories,
            completed: data.content.completed || defaultProjects.completed,
            ongoing: data.content.ongoing || defaultProjects.ongoing,
            upcoming: data.content.upcoming || defaultProjects.upcoming,
          }
        }

        setContent((prev) => ({
          ...prev,
          [file]: mergedContent,
        }))

        if (data.sha) {
          setShas((prev) => ({ ...prev, [file]: data.sha }))
        }

        console.log(`[v0] Successfully loaded and merged ${file}`)
      }
    } catch (err) {
      console.log(`[v0] Error loading ${file}:`, err)
    }
  }

  const loadAllContent = async () => {
    setLoading(true)
    const files: ContentType[] = ["home", "about", "services", "projects", "contact"]

    for (const file of files) {
      await loadContent(file)
    }

    setLoading(false)
  }

  const handleSave = async (file?: string) => {
    const fileToSave = file || activeTab
    setSaving(true)
    setMessage("")

    try {
      console.log(`[v0] Saving ${fileToSave}...`)
      const res = await fetch("/api/github/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: fileToSave,
          content: content[fileToSave],
          sha: shas[fileToSave],
        }),
        cache: "no-store",
      })

      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        console.log("[v0] Save error: Invalid JSON response")
        setMessage("Sunucu hatası")
        return
      }

      if (res.ok && data.success) {
        if (data.sha) setShas((prev) => ({ ...prev, [fileToSave]: data.sha }))
        setMessage("✓ Kaydedildi! Değişiklikler sitede görünecek. Sayfayı yenileyin.")
        console.log(`[v0] Successfully saved ${fileToSave}`)

        setTimeout(async () => {
          console.log(`[v0] Reloading ${fileToSave} to show saved changes...`)
          await loadContent(fileToSave)
          setMessage("✓ Kaydedildi ve yenilendi!")
          setTimeout(() => setMessage(""), 3000)
        }, 1000)
      } else {
        console.log("[v0] Save failed:", data)
        setMessage(`Hata: ${data.error || "Kayıt başarısız"}`)
      }
    } catch (err: any) {
      console.log("[v0] Save error:", err)
      setMessage(`Kayıt hatası: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (path: string[]) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement
      const selectedFile = target.files?.[0]
      if (!selectedFile) return

      const formData = new FormData()
      formData.append("file", selectedFile)

      try {
        setMessage("Görsel yükleniyor...")
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()

        if (data.url) {
          updateNestedValue(path, data.url)
          setMessage("Görsel yüklendi!")
          setTimeout(() => setMessage(""), 3000)
        }
      } catch (err) {
        setMessage("Görsel yüklenemedi!")
      }
    }
    input.click()
  }

  const updateNestedValue = (path: string[], value: any) => {
    setContent((prev) => {
      const updated = JSON.parse(JSON.stringify(prev))
      let obj = updated[activeTab]

      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {}
        obj = obj[path[i]]
      }
      obj[path[path.length - 1]] = value

      return updated
    })
  }

  const getNestedValue = (path: string[], defaultValue: any = "") => {
    let obj = content[activeTab]
    for (const key of path) {
      if (obj === undefined || obj === null) return defaultValue
      obj = obj[key]
    }
    return obj ?? defaultValue
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      setMessage("Yanlış şifre!")
      setTimeout(() => setMessage(""), 3000)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-xl p-8 shadow-lg border">
          <h1 className="text-3xl font-bold text-center mb-6">Yönetim Paneli</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Şifrenizi girin"
              />
            </div>
            {message && <p className="text-destructive text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    )
  }

  const renderInput = (
    label: string,
    path: string[],
    type: "text" | "textarea" | "image" = "text",
    placeholder?: string,
  ) => {
    const value = getNestedValue(path, "")

    if (type === "image") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => updateNestedValue(path, e.target.value)}
              placeholder={placeholder || "URL girin veya görsel yükleyin"}
              className="flex-1 px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => handleImageUpload(path)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Yükle
            </button>
          </div>
          {value && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
              <Image src={value || "/placeholder.svg"} alt={label} fill className="object-cover" />
            </div>
          )}
        </div>
      )
    }

    if (type === "textarea") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{label}</label>
          <textarea
            value={value}
            onChange={(e) => updateNestedValue(path, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => updateNestedValue(path, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    )
  }

  const renderHomeEditor = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Hero / Video Bölümü</h3>
        {renderInput("Video URL", ["video", "url"])}
        {renderInput("Hero Başlık", ["video", "title"])}
        {renderInput("Hero Alt Başlık", ["video", "subtitle"])}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Deneyim Bölümü</h3>
        {renderInput("Başlık", ["experience", "title"])}
        {renderInput("Açıklama", ["experience", "description"], "textarea")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İstatistikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput("Kuruluş Yılı", ["stats", "founded"])}
          {renderInput("Kuruluş Etiketi", ["stats", "foundedLabel"])}
          {renderInput("Çalışan Sayısı", ["stats", "employees"])}
          {renderInput("Çalışan Etiketi", ["stats", "employeesLabel"])}
          {renderInput("Tamamlanan Proje", ["stats", "completedProjects"])}
          {renderInput("Proje Etiketi", ["stats", "completedProjectsLabel"])}
          {renderInput("Deneyim Yılı", ["stats", "experience"])}
          {renderInput("Deneyim Etiketi", ["stats", "experienceLabel"])}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Çalışma Süreci Bölümü</h3>
        {renderInput("Başlık", ["process", "title"])}
        {renderInput("Alt Başlık", ["process", "subtitle"])}
        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">Adımlar</label>
          {(getNestedValue(["process", "steps"], []) as Array<{ title: string; description: string }>).map(
            (step, index) => (
              <div key={index} className="space-y-2 mb-4 p-4 border border-muted rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary">Adım {index + 1}</span>
                </div>
                {renderInput("Başlık", ["process", "steps", index.toString(), "title"])}
                {renderInput("Açıklama", ["process", "steps", index.toString(), "description"], "textarea")}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Neden Biz Bölümü</h3>
        {renderInput("Başlık", ["whyUs", "title"])}
        {(getNestedValue(["whyUs", "items"], []) as Array<{ title: string; description: string }>).map(
          (item, index) => (
            <div key={index} className="space-y-2 mb-4 p-4 border border-muted rounded-lg">
              {renderInput(`Öğe ${index + 1} Başlık`, ["whyUs", "items", index.toString(), "title"])}
              {renderInput(
                `Öğe ${index + 1} Açıklama`,
                ["whyUs", "items", index.toString(), "description"],
                "textarea",
              )}
            </div>
          ),
        )}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İletişim Çağrısı (CTA)</h3>
        {renderInput("Başlık", ["cta", "title"])}
        {renderInput("Açıklama", ["cta", "description"], "textarea")}
      </div>
    </div>
  )

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Sayfa Bilgileri</h3>
        {renderInput("Sayfa Başlığı", ["title"])}
        {renderInput("Alt Başlık", ["pageTitle"])}
        {renderInput("Açıklama", ["description"], "textarea")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Firma Bilgileri</h3>
        {renderInput("Firma Adı", ["company", "name"])}
        {renderInput("Alt Başlık (Badge)", ["company", "subtitle"])}
        {renderInput("Kurucu", ["company", "founder"])}
        {renderInput("Kurucu Ünvanı", ["company", "founderTitle"])}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Sertifika</h3>
        {renderInput("Sertifika Başlığı", ["certificate"])}
        {renderInput("Sertifika Açıklaması", ["certificateDescription"], "textarea")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Vizyon / Misyon / Değerler</h3>
        {renderInput("Vizyon Başlığı", ["vision", "title"])}
        {renderInput("Vizyon Açıklaması", ["vision", "description"], "textarea")}
        {renderInput("Misyon Başlığı", ["mission", "title"])}
        {renderInput("Misyon Açıklaması", ["mission", "description"], "textarea")}
        {renderInput("Değerler Başlığı", ["values", "title"])}
        {renderInput("Değerler Açıklaması", ["values", "description"], "textarea")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İstatistikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput("Kuruluş Yılı", ["stats", "founded"])}
          {renderInput("Kuruluş Etiketi", ["stats", "foundedLabel"])}
          {renderInput("Çalışan Sayısı", ["stats", "employees"])}
          {renderInput("Çalışan Etiketi", ["stats", "employeesLabel"])}
          {renderInput("Tamamlanan Proje", ["stats", "completedProjects"])}
          {renderInput("Proje Etiketi", ["stats", "completedProjectsLabel"])}
          {renderInput("Deneyim Yılı", ["stats", "experience"])}
          {renderInput("Deneyim Etiketi", ["stats", "experienceLabel"])}
        </div>
      </div>
    </div>
  )

  const renderServicesEditor = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Hero Bölümü</h3>
        {renderInput("Başlık", ["hero", "title"])}
        {renderInput("Alt Başlık", ["hero", "subtitle"], "textarea")}
        {renderInput("Hero Görseli", ["hero", "image"], "image")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Giriş Bölümü</h3>
        {renderInput("Badge", ["intro", "badge"])}
        {renderInput("Başlık", ["intro", "title"])}
        {renderInput("Açıklama", ["intro", "description"], "textarea")}
      </div>

      {(getNestedValue(["services"], []) as any[]).map((service: any, index: number) => (
        <div key={service.id || index} className="bg-card rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-primary mb-4">Hizmet: {service.title}</h3>
          {renderInput("Başlık", ["services", index.toString(), "title"])}
          {renderInput("Açıklama", ["services", index.toString(), "description"], "textarea")}

          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Alt Hizmetler</h4>
            {(service.items || []).map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="mb-3 p-3 bg-muted/50 rounded-lg">
                {renderInput(`${itemIndex + 1}. Alt Hizmet Başlık`, [
                  "services",
                  index.toString(),
                  "items",
                  itemIndex.toString(),
                  "title",
                ])}
                {renderInput(`${itemIndex + 1}. Alt Hizmet Açıklama`, [
                  "services",
                  index.toString(),
                  "items",
                  itemIndex.toString(),
                  "description",
                ])}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">CTA Bölümü</h3>
        {renderInput("Başlık", ["cta", "title"])}
        {renderInput("Açıklama", ["cta", "description"], "textarea")}
      </div>
    </div>
  )

  const renderProjectsEditor = () => {
    const projectCategories = [
      { key: "completed", label: "Tamamlanan", color: "bg-green-600" },
      { key: "ongoing", label: "Devam Eden", color: "bg-blue-600" },
      { key: "upcoming", label: "Başlayacak", color: "bg-amber-600" },
    ]

    const currentProjects = (getNestedValue([projectTab], []) as any[]) || []

    const addProject = () => {
      const newProject = {
        id: `project-${Date.now()}`,
        slug: `yeni-proje-${Date.now()}`,
        title: "Yeni Proje",
        shortDescription: "Proje kısa açıklaması",
        fullDescription: "Proje detaylı açıklaması",
        details: "Detaylar",
        year: new Date().getFullYear().toString(),
        location: "İstanbul",
        area: "",
        units: "",
        floors: "",
        status: projectTab,
        mainImage: "",
        gallery: [],
        features: [],
        ...(projectTab === "ongoing" ? { progress: 50, updates: [] } : {}),
      }

      const updated = [...currentProjects, newProject]
      updateNestedValue([projectTab], updated)
    }

    const removeProject = (index: number) => {
      const updated = currentProjects.filter((_: any, i: number) => i !== index)
      updateNestedValue([projectTab], updated)
    }

    const addFeature = (projectIndex: number) => {
      const project = currentProjects[projectIndex]
      const features = project.features || []
      features.push("Yeni özellik")
      updateNestedValue([projectTab, projectIndex.toString(), "features"], features)
    }

    const removeFeature = (projectIndex: number, featureIndex: number) => {
      const project = currentProjects[projectIndex]
      const features = (project.features || []).filter((_: any, i: number) => i !== featureIndex)
      updateNestedValue([projectTab, projectIndex.toString(), "features"], features)
    }

    const addGalleryImage = (projectIndex: number) => {
      const project = currentProjects[projectIndex]
      const gallery = project.gallery || []
      gallery.push("")
      updateNestedValue([projectTab, projectIndex.toString(), "gallery"], gallery)
    }

    const removeGalleryImage = (projectIndex: number, imageIndex: number) => {
      const project = currentProjects[projectIndex]
      const gallery = (project.gallery || []).filter((_: any, i: number) => i !== imageIndex)
      updateNestedValue([projectTab, projectIndex.toString(), "gallery"], gallery)
    }

    const addUpdate = (projectIndex: number) => {
      const project = currentProjects[projectIndex]
      const updates = project.updates || []
      updates.push({ date: new Date().toISOString().slice(0, 7), title: "Yeni Güncelleme", description: "" })
      updateNestedValue([projectTab, projectIndex.toString(), "updates"], updates)
    }

    const removeUpdate = (projectIndex: number, updateIndex: number) => {
      const project = currentProjects[projectIndex]
      const updates = (project.updates || []).filter((_: any, i: number) => i !== updateIndex)
      updateNestedValue([projectTab, projectIndex.toString(), "updates"], updates)
    }

    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-primary mb-4">Sayfa Bilgileri</h3>
          {renderInput("Sayfa Başlığı", ["pageTitle"])}
          {renderInput("Sayfa Açıklaması", ["pageDescription"], "textarea")}
          {renderInput("Hero Görseli", ["heroImage"], "image")}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setProjectTab(cat.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                projectTab === cat.key ? `${cat.color} text-white shadow-lg` : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{currentProjects.length}</strong> adet{" "}
            <strong className="text-foreground">{projectCategories.find((c) => c.key === projectTab)?.label}</strong>{" "}
            proje
          </p>
        </div>

        <button
          onClick={addProject}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Yeni Proje Ekle ({projectCategories.find((c) => c.key === projectTab)?.label})
        </button>

        {currentProjects.map((project: any, index: number) => (
          <div key={project.id || index} className="bg-card rounded-xl p-6 border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-primary">{project.title || "Proje"}</h3>
              <button
                onClick={() => removeProject(index)}
                className="p-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("Proje Adı", [projectTab, index.toString(), "title"])}
              {renderInput("Slug (URL)", [projectTab, index.toString(), "slug"])}
              {renderInput("Kısa Açıklama", [projectTab, index.toString(), "shortDescription"])}
              {renderInput("Yıl", [projectTab, index.toString(), "year"])}
              {renderInput("Konum", [projectTab, index.toString(), "location"])}
              {renderInput("Alan (m²)", [projectTab, index.toString(), "area"])}
              {renderInput("Birim Sayısı", [projectTab, index.toString(), "units"])}
              {renderInput("Kat Sayısı", [projectTab, index.toString(), "floors"])}
              {renderInput("Detaylar", [projectTab, index.toString(), "details"])}
            </div>

            {renderInput("Detaylı Açıklama", [projectTab, index.toString(), "fullDescription"], "textarea")}
            {renderInput("Ana Görsel", [projectTab, index.toString(), "mainImage"], "image")}

            {projectTab === "ongoing" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">İlerleme (%{project.progress || 0})</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.progress || 0}
                  onChange={(e) =>
                    updateNestedValue([projectTab, index.toString(), "progress"], Number(e.target.value))
                  }
                  className="w-full accent-primary"
                />
              </div>
            )}

            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Özellikler</h4>
                <button
                  onClick={() => addFeature(index)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md transition-colors"
                >
                  + Ekle
                </button>
              </div>
              {(project.features || []).map((feature: string, fIndex: number) => (
                <div key={fIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const features = [...(project.features || [])]
                      features[fIndex] = e.target.value
                      updateNestedValue([projectTab, index.toString(), "features"], features)
                    }}
                    className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => removeFeature(index, fIndex)}
                    className="px-3 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Galeri Görselleri</h4>
                <button
                  onClick={() => addGalleryImage(index)}
                  className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md transition-colors"
                >
                  + Ekle
                </button>
              </div>
              {(project.gallery || []).map((img: string, gIndex: number) => (
                <div key={gIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const gallery = [...(project.gallery || [])]
                      gallery[gIndex] = e.target.value
                      updateNestedValue([projectTab, index.toString(), "gallery"], gallery)
                    }}
                    placeholder="Görsel URL"
                    className="flex-1 px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (!file) return
                        const formData = new FormData()
                        formData.append("file", file)
                        const res = await fetch("/api/upload", { method: "POST", body: formData })
                        const data = await res.json()
                        if (data.url) {
                          const gallery = [...(project.gallery || [])]
                          gallery[gIndex] = data.url
                          updateNestedValue([projectTab, index.toString(), "gallery"], gallery)
                        }
                      }
                      input.click()
                    }}
                    className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeGalleryImage(index, gIndex)}
                    className="px-3 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {projectTab === "ongoing" && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Proje Güncellemeleri</h4>
                  <button
                    onClick={() => addUpdate(index)}
                    className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md transition-colors"
                  >
                    + Ekle
                  </button>
                </div>
                {(project.updates || []).map((update: any, uIndex: number) => (
                  <div key={uIndex} className="space-y-2 p-3 bg-background rounded-lg border">
                    <div className="flex justify-between items-center">
                      <input
                        type="month"
                        value={update.date}
                        onChange={(e) => {
                          const updates = [...(project.updates || [])]
                          updates[uIndex].date = e.target.value
                          updateNestedValue([projectTab, index.toString(), "updates"], updates)
                        }}
                        className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        onClick={() => removeUpdate(index, uIndex)}
                        className="px-3 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={update.title}
                      onChange={(e) => {
                        const updates = [...(project.updates || [])]
                        updates[uIndex].title = e.target.value
                        updateNestedValue([projectTab, index.toString(), "updates"], updates)
                      }}
                      placeholder="Güncelleme Başlığı"
                      className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <textarea
                      value={update.description}
                      onChange={(e) => {
                        const updates = [...(project.updates || [])]
                        updates[uIndex].description = e.target.value
                        updateNestedValue([projectTab, index.toString(), "updates"], updates)
                      }}
                      placeholder="Güncelleme Açıklaması"
                      rows={3}
                      className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const ContactEditor = () => {
    const contactData = content.contact

    const addAuthorizedPerson = () => {
      const newPerson = { name: "", title: "", phone: "", email: "" }
      const updatedPersons = [...(contactData.authorizedPersons || []), newPerson]
      // Ensure updateNestedValue correctly handles the path for contact's authorizedPersons
      const currentContact = content.contact
      setContent((prev) => ({
        ...prev,
        contact: {
          ...currentContact,
          authorizedPersons: updatedPersons,
        },
      }))
    }

    const removeAuthorizedPerson = (index: number) => {
      const updatedPersons = (contactData.authorizedPersons || []).filter((_, i) => i !== index)
      const currentContact = content.contact
      setContent((prev) => ({
        ...prev,
        contact: {
          ...currentContact,
          authorizedPersons: updatedPersons,
        },
      }))
    }

    const updatePerson = (index: number, field: string, value: string) => {
      const updatedPersons = [...(contactData.authorizedPersons || [])]
      updatedPersons[index] = { ...updatedPersons[index], [field]: value }
      const currentContact = content.contact
      setContent((prev) => ({
        ...prev,
        contact: {
          ...currentContact,
          authorizedPersons: updatedPersons,
        },
      }))
    }

    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-primary mb-4">İletişim Bilgileri</h3>
          {renderInput("Adres", ["address"], "textarea")}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("Telefon", ["phone"])}
            {renderInput("Mobil", ["mobile"])}
            {renderInput("WhatsApp (Ör: 905334798387)", ["whatsapp"])}
            {renderInput("Faks", ["fax"])}
            {renderInput("E-posta", ["email"])}
            {renderInput("Çalışma Saatleri", ["hours"])}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">Yetkili Kişiler</h3>
            <button
              onClick={addAuthorizedPerson}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Yeni Ekle
            </button>
          </div>

          <div className="space-y-4">
            {(contactData.authorizedPersons || []).map((person: any, index: number) => (
              <div key={index} className="p-4 bg-muted rounded-lg relative">
                <button
                  onClick={() => removeAuthorizedPerson(index)}
                  className="absolute top-2 right-2 p-1 bg-destructive hover:bg-destructive/90 text-white rounded"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="İsim Soyisim"
                    value={person.name || ""}
                    onChange={(e) => updatePerson(index, "name", e.target.value)}
                    className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Ünvan"
                    value={person.title || ""}
                    onChange={(e) => updatePerson(index, "title", e.target.value)}
                    className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Telefon"
                    value={person.phone || ""}
                    onChange={(e) => updatePerson(index, "phone", e.target.value)}
                    className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="E-posta"
                    value={person.email || ""}
                    onChange={(e) => updatePerson(index, "email", e.target.value)}
                    className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderEditor = () => {
    switch (activeTab) {
      case "home":
        return renderHomeEditor()
      case "about":
        return renderAboutEditor()
      case "services":
        return renderServicesEditor()
      case "projects":
        return renderProjectsEditor()
      case "contact":
        return <ContactEditor />
      default:
        return null
    }
  }

  const tabs = [
    { id: "home", label: "Anasayfa" },
    { id: "about", label: "Hakkımızda" },
    { id: "services", label: "Hizmetler" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "İletişim" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Yönetim Paneli</h1>
              {message && (
                <span className={`text-sm ${message.includes("✓") ? "text-green-600" : "text-destructive"}`}>
                  {message}
                </span>
              )}
            </div>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </header>

      <div className="sticky top-16 z-30 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ContentType)}
                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Yükleniyor...</p>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border space-y-6">{renderEditor()}</div>
          )}
        </div>
      </main>
    </div>
  )
}
