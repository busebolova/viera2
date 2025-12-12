"use client"

import { useState, useEffect } from "react"
import { Save, Upload, Plus, Trash2, Building2, Users, Briefcase, Mail, Home } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { put } from "@vercel/blob"

type ContentType = "home" | "about" | "services" | "projects" | "contact"

interface Project {
  id: string
  title: string
  location: string
  year: number
  area: number
  units: number
  floors: number
  status: string
  description: string
  features: string[]
  image: string
  gallery?: string[]
  progress?: number
  updates?: Array<{
    date: string
    title: string
    description: string
    images?: string[]
  }>
}

const AdminPanel = () => {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<ContentType>("home")
  const [content, setContent] = useState<Record<ContentType, any>>({
    home: {},
    about: {},
    services: {},
    projects: [],
    contact: {},
  })
  const [shas, setShas] = useState<Record<ContentType, string>>({
    home: "",
    about: "",
    services: "",
    projects: "",
    contact: "",
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const emptyDefaults: Record<ContentType, any> = {
    home: {
      video: { url: "", title: "", subtitle: "" },
      stats: {},
      experience: { title: "", description: "" },
      process: { title: "", subtitle: "", steps: [] },
      whyUs: { title: "", items: [] },
      cta: { title: "", description: "" },
    },
    about: { hero: {}, mission: "", vision: "", values: [], team: [] },
    services: { hero: {}, services: [] },
    projects: [],
    contact: {},
  }

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true"
    setAuthenticated(isAuth)
    if (isAuth) {
      loadContent("home")
      loadContent("about")
      loadContent("services")
      loadContent("projects")
      loadContent("contact")
    }
  }, [])

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "viera2025") {
      setAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      loadContent("home")
      loadContent("about")
      loadContent("services")
      loadContent("projects")
      loadContent("contact")
    }
  }

  const loadContent = async (file: ContentType) => {
    const timestamp = Date.now()
    try {
      const res = await fetch(`/api/github/content?file=${file}&t=${timestamp}`, {
        cache: "no-store",
      })

      if (!res.ok) {
        if (res.status === 404) {
          setContent((prev) => ({
            ...prev,
            [file]: emptyDefaults[file] || {},
          }))
        }
        return
      }

      const data = await res.json()
      const contentData = data.content || data

      setContent((prev) => ({
        ...prev,
        [file]: contentData,
      }))

      if (data.sha) {
        setShas((prev) => ({ ...prev, [file]: data.sha }))
      }
    } catch (err) {
      console.error(`[v0] CLIENT: Error loading ${file}:`, err)
      setContent((prev) => ({
        ...prev,
        [file]: emptyDefaults[file] || {},
      }))
    }
  }

  const handleSave = async (file?: string) => {
    const fileToSave = file || activeTab
    setSaving(true)
    setMessage("")

    try {
      console.log("[v0] CLIENT: Attempting to save", fileToSave)
      console.log("[v0] CLIENT: Content being saved:", JSON.stringify(content[fileToSave], null, 2))
      console.log("[v0] CLIENT: Using SHA:", shas[fileToSave])

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
      console.log("[v0] CLIENT: Response text:", text)

      let data
      try {
        data = JSON.parse(text)
      } catch (parseErr) {
        console.error("[v0] CLIENT: Failed to parse JSON:", parseErr)
        setMessage("❌ Sunucu yanıtı geçersiz.")
        setSaving(false)
        return
      }

      if (res.ok && data.success) {
        if (data.sha) {
          setShas((prev) => ({ ...prev, [fileToSave]: data.sha }))
        }
        setMessage("✅ Başarıyla kaydedildi! Yayın tarafı yenileniyor...")
        console.log("[v0] CLIENT: Save successful, refreshing router")

        router.refresh()
        await loadContent(fileToSave)

        setTimeout(() => {
          setMessage("✅ Kaydedildi! Sayfa yenilendi. Değişiklikleri görmek için anasayfayı ziyaret edin.")
        }, 1000)
      } else {
        console.error("[v0] CLIENT: Save failed:", data.error)
        setMessage(`❌ Hata: ${data.error || "Bilinmeyen hata"}`)
      }
    } catch (err: any) {
      console.error("[v0] CLIENT: Save exception:", err)
      setMessage(`❌ Hata: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (path: string[]) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0]
      if (!file) return

      try {
        const blob = await put(file.name, file, { access: "public" })
        updateNestedValue(path, blob.url)
        setMessage("✅ Görsel yüklendi!")
        setTimeout(() => setMessage(""), 2000)
      } catch (err: any) {
        setMessage(`❌ Yükleme hatası: ${err.message}`)
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

  const renderInput = (
    label: string,
    path: string[],
    type: "text" | "textarea" | "image" | "number" = "text",
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

    if (type === "number") {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => updateNestedValue(path, Number(e.target.value))}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
        {renderInput("Kuruluş Yılı", ["stats", "founded"])}
        {renderInput("Kuruluş Yılı Etiketi", ["stats", "foundedLabel"])}
        {renderInput("Çalışan Sayısı", ["stats", "employees"])}
        {renderInput("Çalışan Etiketi", ["stats", "employeesLabel"])}
        {renderInput("Tamamlanan Proje", ["stats", "completedProjects"])}
        {renderInput("Proje Etiketi", ["stats", "completedProjectsLabel"])}
        {renderInput("Tecrübe", ["stats", "experience"])}
        {renderInput("Tecrübe Etiketi", ["stats", "experienceLabel"])}
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
        <h3 className="text-lg font-semibold text-primary mb-4">Hero Bölümü</h3>
        {renderInput("Başlık", ["hero", "title"])}
        {renderInput("Açıklama", ["hero", "description"], "textarea")}
      </div>

      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Misyon, Vizyon, Değerler</h3>
        {renderInput("Misyon", ["mission"], "textarea")}
        {renderInput("Vizyon", ["vision"], "textarea")}
      </div>
    </div>
  )

  const renderServicesEditor = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Hero Bölümü</h3>
        {renderInput("Başlık", ["hero", "title"])}
        {renderInput("Açıklama", ["hero", "description"], "textarea")}
      </div>
    </div>
  )

  const ContactEditor = () => {
    const contactData = content.contact || {}

    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6 border">
          <h3 className="text-lg font-semibold text-primary mb-4">İletişim Bilgileri</h3>
          {renderInput("Adres", ["address"], "textarea")}
          {renderInput("Telefon", ["phone"])}
          {renderInput("Mobil", ["mobile"])}
          {renderInput("E-posta", ["email"])}
          {renderInput("Faks", ["fax"])}
          {renderInput("Yetkili Kişi", ["authorized"])}
          {renderInput("Çalışma Saatleri", ["hours"])}
        </div>
      </div>
    )
  }

  const renderProjectsEditor = () => {
    const projects = content.projects || []

    const addProject = () => {
      const newProject: Project = {
        id: Date.now().toString(),
        title: "",
        location: "",
        year: new Date().getFullYear(),
        area: 0,
        units: 0,
        floors: 0,
        status: "completed",
        description: "",
        features: [],
        image: "",
        gallery: [],
        progress: 0,
        updates: [],
      }
      setContent((prev) => ({
        ...prev,
        projects: [...projects, newProject],
      }))
    }

    const deleteProject = (index: number) => {
      setContent((prev) => ({
        ...prev,
        projects: projects.filter((_: any, i: number) => i !== index),
      }))
    }

    const updateProject = (index: number, field: string, value: any) => {
      setContent((prev) => {
        const updated = [...projects]
        updated[index] = { ...updated[index], [field]: value }
        return { ...prev, projects: updated }
      })
    }

    return (
      <div className="space-y-6">
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="h-4 w-4" />
          Yeni Proje Ekle
        </button>

        {projects.map((project: Project, index: number) => (
          <div key={project.id} className="bg-card rounded-xl p-6 border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">
                Proje {index + 1}: {project.title || "Başlıksız"}
              </h3>
              <button
                onClick={() => deleteProject(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Proje Adı</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Konum</label>
                <input
                  type="text"
                  value={project.location}
                  onChange={(e) => updateProject(index, "location", e.target.value)}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Yıl</label>
                <input
                  type="number"
                  value={project.year}
                  onChange={(e) => updateProject(index, "year", Number(e.target.value))}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Alan (m²)</label>
                <input
                  type="number"
                  value={project.area}
                  onChange={(e) => updateProject(index, "area", Number(e.target.value))}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Birim Sayısı</label>
                <input
                  type="number"
                  value={project.units}
                  onChange={(e) => updateProject(index, "units", Number(e.target.value))}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Kat Sayısı</label>
                <input
                  type="number"
                  value={project.floors}
                  onChange={(e) => updateProject(index, "floors", Number(e.target.value))}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Durum</label>
                <select
                  value={project.status}
                  onChange={(e) => updateProject(index, "status", e.target.value)}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="completed">Tamamlandı</option>
                  <option value="ongoing">Devam Ediyor</option>
                  <option value="planned">Planlanıyor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">İlerleme (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={project.progress || 0}
                  onChange={(e) => updateProject(index, "progress", Number(e.target.value))}
                  className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Açıklama</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Özellikler (virgülle ayırın)</label>
              <input
                type="text"
                value={project.features?.join(", ") || ""}
                onChange={(e) =>
                  updateProject(
                    index,
                    "features",
                    e.target.value.split(",").map((f) => f.trim()),
                  )
                }
                placeholder="Özellik 1, Özellik 2, Özellik 3"
                className="w-full px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Ana Görsel URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={project.image}
                  onChange={(e) => updateProject(index, "image", e.target.value)}
                  placeholder="Görsel URL'si"
                  className="flex-1 px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={async () => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "image/*"
                    input.onchange = async (e: any) => {
                      const file = e.target?.files?.[0]
                      if (!file) return
                      try {
                        const blob = await put(file.name, file, { access: "public" })
                        updateProject(index, "image", blob.url)
                        setMessage("✅ Görsel yüklendi!")
                        setTimeout(() => setMessage(""), 2000)
                      } catch (err: any) {
                        setMessage(`❌ Yükleme hatası: ${err.message}`)
                      }
                    }
                    input.click()
                  }}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Yükle
                </button>
              </div>
              {project.image && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        ))}
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

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-2xl p-8 border border-primary/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Yönetim Paneli</h1>
              <p className="text-muted-foreground">VIERA Construction</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Şifrenizi girin"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-card rounded-2xl shadow-2xl border border-primary/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Yönetim Paneli</h1>
                <p className="text-primary-foreground/80">İçerik Yönetim Sistemi</p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                Kaydet
              </button>
            </div>
          </div>

          <div className="flex border-b bg-muted/30">
            {[
              { id: "home", label: "Anasayfa", icon: Home },
              { id: "about", label: "Hakkımızda", icon: Users },
              { id: "services", label: "Hizmetler", icon: Briefcase },
              { id: "projects", label: "Projeler", icon: Building2 },
              { id: "contact", label: "İletişim", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as ContentType)
                    loadContent(tab.id as ContentType)
                  }}
                  className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-card text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="p-8">
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  message.includes("✅")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {renderEditor()}

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-medium rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
