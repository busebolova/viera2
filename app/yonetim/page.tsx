"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, Save, Menu, X, Plus, Trash2 } from "lucide-react"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "viera2025"

// Varsayılan değerler - tüm alanlar dolu
const defaultHome = {
  hero: {
    title: "Viera & Alkan Yapı",
    subtitle: "Güven, Kalite, Profesyonellik",
    description: "60 yılı aşkın tecrübemizle İstanbul'un prestijli projelerinde fark yaratıyoruz.",
    image: "/hero-bg.jpg",
  },
  video: {
    url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    title: "Viera & Alkan Yapı",
    subtitle: "Güven, Kalite, Profesyonellik",
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
  team: [
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

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("home")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projectTab, setProjectTab] = useState<"completed" | "ongoing" | "upcoming">("completed")

  const [content, setContent] = useState<Record<string, any>>({
    home: JSON.parse(JSON.stringify(defaultHome)),
    about: JSON.parse(JSON.stringify(defaultAbout)),
    services: JSON.parse(JSON.stringify(defaultServices)),
    projects: JSON.parse(JSON.stringify(defaultProjects)),
    contact: JSON.parse(JSON.stringify(defaultContact)),
  })
  const [shas, setShas] = useState<Record<string, string>>({})

  useEffect(() => {
    if (authenticated) loadAllContent()
  }, [authenticated])

  const loadAllContent = async () => {
    setLoading(true)
    const files = ["home", "about", "services", "projects", "contact"]
    const defaults: Record<string, any> = {
      home: defaultHome,
      about: defaultAbout,
      services: defaultServices,
      projects: defaultProjects,
      contact: defaultContact,
    }

    for (const file of files) {
      try {
        const res = await fetch(`/api/github/content?file=${file}`)
        if (!res.ok) {
          console.log(`[v0] Using defaults for ${file} (fetch failed)`)
          continue
        }
        const data = await res.json()

        if (data.content && Object.keys(data.content).length > 0) {
          setContent((prev) => ({
            ...prev,
            [file]: deepMerge(defaults[file], data.content),
          }))
          if (data.sha) {
            setShas((prev) => ({ ...prev, [file]: data.sha }))
          }
        }
      } catch (err) {
        console.error(`[v0] Error loading ${file}:`, err)
      }
    }
    setLoading(false)
  }

  const deepMerge = (target: any, source: any): any => {
    const output = { ...target }
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] })
          } else {
            output[key] = deepMerge(target[key], source[key])
          }
        } else {
          Object.assign(output, { [key]: source[key] })
        }
      })
    }
    return output
  }

  const isObject = (item: any) => item && typeof item === "object" && !Array.isArray(item)

  const handleSave = async (file?: string) => {
    const fileToSave = file || activeTab
    setSaving(true)
    setMessage("")

    try {
      const res = await fetch("/api/github/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: fileToSave,
          content: content[fileToSave],
          sha: shas[fileToSave],
        }),
      })

      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        setMessage("Sunucu hatası")
        return
      }

      if (res.ok && data.success) {
        if (data.sha) setShas((prev) => ({ ...prev, [fileToSave]: data.sha }))
        setMessage("Kaydedildi!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(`Hata: ${data.error || "Kayit basarisiz"}`)
      }
    } catch (err: any) {
      setMessage(`Kayit hatasi: ${err.message}`)
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
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-800 rounded-xl p-8 shadow-2xl border border-zinc-700">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Yönetim Paneli</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-sm mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white"
                placeholder="Şifrenizi girin"
              />
            </div>
            {message && <p className="text-red-400 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "home", label: "Anasayfa" },
    { id: "about", label: "Hakkımızda" },
    { id: "services", label: "Hizmetler" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "İletişim" },
  ]

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
          <label className="block text-zinc-300 text-sm">{label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => updateNestedValue(path, e.target.value)}
              placeholder={placeholder || "Görsel URL"}
              className="flex-1 px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white text-sm"
            />
            <button
              type="button"
              onClick={() => handleImageUpload(path)}
              className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded-lg flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Yükle
            </button>
          </div>
          {value && (
            <img
              src={value || "/placeholder.svg"}
              alt={label}
              className="mt-2 h-32 w-auto object-cover rounded-lg border border-zinc-600"
            />
          )}
        </div>
      )
    }

    if (type === "textarea") {
      return (
        <div className="space-y-2">
          <label className="block text-zinc-300 text-sm">{label}</label>
          <textarea
            value={value}
            onChange={(e) => updateNestedValue(path, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white text-sm resize-none"
          />
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <label className="block text-zinc-300 text-sm">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => updateNestedValue(path, e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white text-sm"
        />
      </div>
    )
  }

  const renderHomeEditor = () => (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Hero / Video Bölümü</h3>
        {renderInput("Video URL", ["video", "url"])}
        {renderInput("Hero Başlık", ["video", "title"])}
        {renderInput("Hero Alt Başlık", ["video", "subtitle"])}
        {renderInput("Hero Açıklama", ["hero", "description"], "textarea")}
        {renderInput("Hero Görsel", ["hero", "image"], "image")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Deneyim Bölümü</h3>
        {renderInput("Başlık", ["experience", "title"])}
        {renderInput("Açıklama", ["experience", "description"], "textarea")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">İstatistikler</h3>
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

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Hakkımızda Bölümü</h3>
        {renderInput("Badge", ["about", "badge"])}
        {renderInput("Başlık", ["about", "title"])}
        {renderInput("Açıklama", ["about", "description"], "textarea")}
        {renderInput("Görsel", ["about", "image"], "image")}
      </div>
    </div>
  )

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Sayfa Bilgileri</h3>
        {renderInput("Sayfa Başlığı", ["title"])}
        {renderInput("Alt Başlık", ["pageTitle"])}
        {renderInput("Hero Görseli", ["heroImage"], "image")}
        {renderInput("Ofis Görseli", ["officeImage"], "image")}
        {renderInput("Açıklama", ["description"], "textarea")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Firma Bilgileri</h3>
        {renderInput("Firma Adı", ["company", "name"])}
        {renderInput("Alt Başlık (Badge)", ["company", "subtitle"])}
        {renderInput("Kurucu", ["company", "founder"])}
        {renderInput("Kurucu Ünvanı", ["company", "founderTitle"])}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Sertifika</h3>
        {renderInput("Sertifika Başlığı", ["certificate"])}
        {renderInput("Sertifika Açıklaması", ["certificateDescription"], "textarea")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Vizyon / Misyon / Değerler</h3>
        {renderInput("Vizyon Başlığı", ["vision", "title"])}
        {renderInput("Vizyon Açıklaması", ["vision", "description"], "textarea")}
        {renderInput("Misyon Başlığı", ["mission", "title"])}
        {renderInput("Misyon Açıklaması", ["mission", "description"], "textarea")}
        {renderInput("Değerler Başlığı", ["values", "title"])}
        {renderInput("Değerler Açıklaması", ["values", "description"], "textarea")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">İstatistikler</h3>
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
      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Hero Bölümü</h3>
        {renderInput("Başlık", ["hero", "title"])}
        {renderInput("Alt Başlık", ["hero", "subtitle"], "textarea")}
        {renderInput("Hero Görseli", ["hero", "image"], "image")}
      </div>

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">Giriş Bölümü</h3>
        {renderInput("Badge", ["intro", "badge"])}
        {renderInput("Başlık", ["intro", "title"])}
        {renderInput("Açıklama", ["intro", "description"], "textarea")}
      </div>

      {(getNestedValue(["services"], []) as any[]).map((service: any, index: number) => (
        <div key={service.id || index} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <h3 className="text-lg font-semibold text-amber-500 mb-4">Hizmet: {service.title}</h3>
          {renderInput("Başlık", ["services", index.toString(), "title"])}
          {renderInput("Açıklama", ["services", index.toString(), "description"], "textarea")}
          {renderInput("Görsel", ["services", index.toString(), "image"], "image")}
        </div>
      ))}

      <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
        <h3 className="text-lg font-semibold text-amber-500 mb-4">CTA Bölümü</h3>
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

    const currentProjects = getNestedValue([projectTab], []) as any[]

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
      const updated = currentProjects.filter((_, i) => i !== index)
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
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <h3 className="text-lg font-semibold text-amber-500 mb-4">Sayfa Bilgileri</h3>
          {renderInput("Sayfa Başlığı", ["pageTitle"])}
          {renderInput("Sayfa Açıklaması", ["pageDescription"], "textarea")}
          {renderInput("Hero Görseli", ["heroImage"], "image")}
        </div>

        {/* Proje Kategorisi Sekmeleri */}
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setProjectTab(cat.key as any)}
              className={`px-4 py-2 rounded-lg text-left ${activeTab === cat.key ? "bg-amber-600 text-white" : "bg-zinc-700 text-zinc-300"}`}
            >
              {cat.label} ({(getNestedValue([cat.key], []) as any[]).length})
            </button>
          ))}
        </div>

        <button
          onClick={addProject}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Yeni Proje Ekle ({projectCategories.find((c) => c.key === projectTab)?.label})
        </button>

        {currentProjects.map((project: any, index: number) => (
          <div key={project.id || index} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-amber-500">{project.title || "Proje"}</h3>
              <button
                onClick={() => removeProject(index)}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
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

            {/* İlerleme (sadece devam eden projeler için) */}
            {projectTab === "ongoing" && (
              <div className="space-y-2 mt-4">
                <label className="block text-zinc-300 text-sm">İlerleme (%{project.progress || 0})</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.progress || 0}
                  onChange={(e) =>
                    updateNestedValue([projectTab, index.toString(), "progress"], Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            )}

            {/* Özellikler */}
            <div className="mt-4 p-4 bg-zinc-700/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-zinc-300">Özellikler</h4>
                <button
                  onClick={() => addFeature(index)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                >
                  + Ekle
                </button>
              </div>
              {(project.features || []).map((feature: string, fIndex: number) => (
                <div key={fIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const features = [...(project.features || [])]
                      features[fIndex] = e.target.value
                      updateNestedValue([projectTab, index.toString(), "features"], features)
                    }}
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white text-sm"
                  />
                  <button
                    onClick={() => removeFeature(index, fIndex)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Galeri */}
            <div className="mt-4 p-4 bg-zinc-700/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-zinc-300">Galeri Görselleri</h4>
                <button
                  onClick={() => addGalleryImage(index)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                >
                  + Görsel Ekle
                </button>
              </div>
              {(project.gallery || []).map((image: string, gIndex: number) => (
                <div key={gIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => {
                      const gallery = [...(project.gallery || [])]
                      gallery[gIndex] = e.target.value
                      updateNestedValue([projectTab, index.toString(), "gallery"], gallery)
                    }}
                    placeholder="Görsel URL"
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white text-sm"
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
                    className="px-3 py-2 bg-zinc-600 hover:bg-zinc-500 text-white rounded"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeGalleryImage(index, gIndex)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Güncellemeler (sadece devam eden projeler için) */}
            {projectTab === "ongoing" && (
              <div className="mt-4 p-4 bg-zinc-700/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-zinc-300">Proje Güncellemeleri</h4>
                  <button
                    onClick={() => addUpdate(index)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                  >
                    + Güncelleme Ekle
                  </button>
                </div>
                {(project.updates || []).map((update: any, uIndex: number) => (
                  <div key={uIndex} className="p-3 bg-zinc-800 rounded mb-2">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="month"
                        value={update.date}
                        onChange={(e) => {
                          const updates = [...(project.updates || [])]
                          updates[uIndex].date = e.target.value
                          updateNestedValue([projectTab, index.toString(), "updates"], updates)
                        }}
                        className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white text-sm"
                      />
                      <input
                        type="text"
                        value={update.title}
                        onChange={(e) => {
                          const updates = [...(project.updates || [])]
                          updates[uIndex].title = e.target.value
                          updateNestedValue([projectTab, index.toString(), "updates"], updates)
                        }}
                        placeholder="Başlık"
                        className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white text-sm"
                      />
                      <button
                        onClick={() => removeUpdate(index, uIndex)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      value={update.description}
                      onChange={(e) => {
                        const updates = [...(project.updates || [])]
                        updates[uIndex].description = e.target.value
                        updateNestedValue([projectTab, index.toString(), "updates"], updates)
                      }}
                      placeholder="Açıklama"
                      rows={2}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white text-sm resize-none"
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

  const renderContactEditor = () => {
    const team = getNestedValue(["contact", "team"], [])

    const addTeamMember = () => {
      const currentTeam = getNestedValue(["contact", "team"], [])
      const updatedTeam = [...currentTeam, { name: "", title: "", phone: "", email: "" }]
      updateNestedValue(["contact", "team"], updatedTeam)
    }

    const removeTeamMember = (index: number) => {
      const currentTeam = getNestedValue(["contact", "team"], [])
      const updatedTeam = currentTeam.filter((_: any, i: number) => i !== index)
      updateNestedValue(["contact", "team"], updatedTeam)
    }

    return (
      <div className="space-y-6">
        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <h3 className="text-lg font-semibold text-amber-500 mb-4">İletişim Bilgileri</h3>
          {renderInput("Adres", ["contact", "address"], "textarea")}
          {renderInput("Telefon", ["contact", "phone"])}
          {renderInput("Mobil", ["contact", "mobile"])}
          {renderInput("WhatsApp Numarası", ["contact", "whatsapp"], "text", "905334798387 formatında")}
          {renderInput("E-posta", ["contact", "email"])}
          {renderInput("Fax", ["contact", "fax"])}
          {renderInput("Çalışma Saatleri", ["contact", "hours"])}
          {renderInput("Hero Görseli", ["contact", "heroImage"], "image")}
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-amber-500">Yetkili Kişiler</h3>
            <button
              onClick={addTeamMember}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Yeni Ekle
            </button>
          </div>

          {(team as any[]).map((member: any, index: number) => (
            <div key={index} className="mb-6 p-4 bg-zinc-900 rounded-lg border border-zinc-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-amber-400 font-medium">Yetkili #{index + 1}</h4>
                <button
                  onClick={() => removeTeamMember(index)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput("Ad Soyad", ["contact", "team", index.toString(), "name"])}
                {renderInput("Ünvan", ["contact", "team", index.toString(), "title"])}
                {renderInput("Telefon", ["contact", "team", index.toString(), "phone"])}
                {renderInput("E-posta", ["contact", "team", index.toString(), "email"])}
              </div>
            </div>
          ))}
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
        return renderContactEditor()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="sticky top-0 z-50 bg-zinc-800 border-b border-zinc-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-bold text-white">Yönetim Paneli</h1>
          </div>
          <div className="flex items-center gap-4">
            {message && (
              <span className={`text-sm ${message.includes("Hata") ? "text-red-400" : "text-green-400"}`}>
                {message}
              </span>
            )}
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white rounded-lg flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-800 border-b border-zinc-700 p-4">
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`px-4 py-2 rounded-lg text-left ${activeTab === tab.id ? "bg-amber-600 text-white" : "bg-zinc-700 text-zinc-300"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="hidden md:flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id ? "bg-amber-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-400">Yükleniyor...</div>
          </div>
        ) : (
          renderEditor()
        )}
      </div>
    </div>
  )
}
