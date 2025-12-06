"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Upload, Trash2, Plus } from "lucide-react"

export default function YonetimPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<"home" | "about" | "services" | "projects" | "contact">("home")
  const [content, setContent] = useState<Record<string, any>>({
    home: {},
    about: {},
    services: {},
    projects: {},
    contact: {},
  })
  const [shas, setShas] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [currentImageField, setCurrentImageField] = useState<{ path: string[] } | null>(null)
  const [currentGalleryPath, setCurrentGalleryPath] = useState<string[] | null>(null)
  const [projectTab, setProjectTab] = useState<"completed" | "ongoing" | "upcoming">("completed")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "viera2025"

  useEffect(() => {
    if (authenticated) loadAllContent()
  }, [authenticated])

  const loadAllContent = async () => {
    setLoading(true)
    const files = ["home", "about", "services", "projects", "contact"]
    const results: Record<string, any> = {}
    const shaResults: Record<string, string> = {}
    for (const file of files) {
      try {
        const res = await fetch(`/api/github/content?file=${file}`)
        const data = await res.json()
        console.log(`[v0] Loaded ${file}:`, data)
        if (data.content) {
          results[file] = data.content
          if (data.sha) shaResults[file] = data.sha
        }
      } catch (err) {
        console.error(`[v0] Error loading ${file}:`, err)
      }
    }
    setContent((prev) => ({ ...prev, ...results }))
    setShas(shaResults)
    setLoading(false)
  }

  const saveContent = async () => {
    setSaving(true)
    setMessage("")
    console.log(`[v0] Saving ${activeTab}:`, content[activeTab])
    try {
      const res = await fetch("/api/github/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: activeTab,
          content: content[activeTab],
          sha: shas[activeTab],
        }),
      })
      const result = await res.json()
      console.log(`[v0] Save result:`, result)
      if (res.ok) {
        setMessage("Kaydedildi!")
        const refreshRes = await fetch(`/api/github/content?file=${activeTab}`)
        const refreshData = await refreshRes.json()
        if (refreshData.sha) setShas((prev) => ({ ...prev, [activeTab]: refreshData.sha }))
      } else {
        setMessage(`Hata: ${result.error}`)
      }
    } catch (err: any) {
      console.error(`[v0] Save error:`, err)
      setMessage(`Hata: ${err.message}`)
    }
    setSaving(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentImageField) return
    setUploading(true)
    setMessage("Gorsel yukleniyor...")
    try {
      const formData = new FormData()
      formData.append("file", file)
      console.log(`[v0] Uploading image for path:`, currentImageField.path)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      console.log(`[v0] Upload result:`, data)
      if (data.url) {
        updateNestedValue(currentImageField.path, data.url)
        setMessage("Gorsel yuklendi! Kaydediliyor...")
        setTimeout(async () => {
          await saveContentForTab(activeTab)
        }, 500)
      } else {
        setMessage("Gorsel yuklenemedi: " + (data.error || "Bilinmeyen hata"))
      }
    } catch (err: any) {
      console.error(`[v0] Upload error:`, err)
      setMessage(`Yukleme hatasi: ${err.message}`)
    }
    setUploading(false)
    setCurrentImageField(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const saveContentForTab = async (tab: string) => {
    setSaving(true)
    try {
      const currentContent = content[tab]
      console.log(`[v0] Auto-saving ${tab}:`, currentContent)
      const res = await fetch("/api/github/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: tab,
          content: currentContent,
          sha: shas[tab],
        }),
      })
      const result = await res.json()
      if (res.ok) {
        setMessage("Kaydedildi!")
        const refreshRes = await fetch(`/api/github/content?file=${tab}`)
        const refreshData = await refreshRes.json()
        if (refreshData.sha) setShas((prev) => ({ ...prev, [tab]: refreshData.sha }))
      } else {
        setMessage(`Kaydetme hatasi: ${result.error}`)
      }
    } catch (err: any) {
      setMessage(`Kaydetme hatasi: ${err.message}`)
    }
    setSaving(false)
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentGalleryPath) return
    setUploading(true)
    setMessage("Galeri gorseli yukleniyor...")
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        const currentGallery = getNestedValue(currentGalleryPath) || []
        updateNestedValue(currentGalleryPath, [...currentGallery, data.url])
        setMessage("Galeri gorseli eklendi! Kaydediliyor...")
        setTimeout(async () => {
          await saveContentForTab(activeTab)
        }, 500)
      } else {
        setMessage("Gorsel yuklenemedi")
      }
    } catch (err: any) {
      setMessage(`Yukleme hatasi: ${err.message}`)
    }
    setUploading(false)
    setCurrentGalleryPath(null)
    if (galleryInputRef.current) galleryInputRef.current.value = ""
  }

  const updateNestedValue = (path: string[], value: any) => {
    console.log(`[v0] Updating path ${path.join(".")} to:`, value)
    setContent((prev) => {
      const updated = JSON.parse(JSON.stringify(prev))
      let obj = updated[activeTab]
      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {}
        obj = obj[path[i]]
      }
      obj[path[path.length - 1]] = value
      console.log(`[v0] Updated content for ${activeTab}:`, updated[activeTab])
      return updated
    })
  }

  const getNestedValue = (path: string[]) => {
    let obj = content[activeTab]
    for (const key of path) {
      if (obj === undefined || obj === null) return undefined
      obj = obj[key]
    }
    return obj
  }

  const addItemToArray = (path: string[], item: any) => {
    const current = getNestedValue(path) || []
    updateNestedValue(path, [...current, item])
  }

  const removeItemFromArray = (path: string[], index: number) => {
    const current = getNestedValue(path) || []
    updateNestedValue(
      path,
      current.filter((_: any, i: number) => i !== index),
    )
  }

  const openImageUpload = (path: string[]) => {
    setCurrentImageField({ path })
    fileInputRef.current?.click()
  }

  const openGalleryUpload = (path: string[]) => {
    setCurrentGalleryPath(path)
    galleryInputRef.current?.click()
  }

  // Styles
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#111",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#222",
    border: "1px solid #333",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#aaa",
  }

  const buttonStyle: React.CSSProperties = {
    padding: "12px 24px",
    backgroundColor: "#d4a574",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  }

  const uploadBtnStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #333",
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#d4a574",
    marginBottom: "20px",
  }

  // Login Screen
  if (!authenticated) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              padding: "40px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "400px",
              border: "1px solid #333",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>
              Yonetim Paneli
            </h1>
            <p style={{ color: "#888", marginBottom: "32px", textAlign: "center", fontSize: "14px" }}>
              Lutfen sifrenizi girin
            </p>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Sifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && password === ADMIN_PASSWORD && setAuthenticated(true)}
                style={inputStyle}
                placeholder="Sifrenizi girin"
              />
            </div>
            <button
              onClick={() => password === ADMIN_PASSWORD && setAuthenticated(true)}
              style={{ ...buttonStyle, width: "100%" }}
            >
              Giris Yap
            </button>
            {password && password !== ADMIN_PASSWORD && (
              <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center", fontSize: "14px" }}>Yanlis sifre</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Loading
  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #333",
                borderTopColor: "#d4a574",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p>Yukleniyor...</p>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const tabs = [
    { id: "home", label: "Anasayfa" },
    { id: "about", label: "Hakkimizda" },
    { id: "services", label: "Hizmetler" },
    { id: "projects", label: "Projeler" },
    { id: "contact", label: "Iletisim" },
  ]

  // Image Upload Field Component
  const ImageUploadField = ({
    label,
    path,
    currentValue,
  }: { label: string; path: string[]; currentValue?: string }) => (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          value={currentValue || ""}
          onChange={(e) => updateNestedValue(path, e.target.value)}
          placeholder="URL girin veya gorsel yukleyin"
          style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
        />
        <button type="button" onClick={() => openImageUpload(path)} disabled={uploading} style={uploadBtnStyle}>
          <Upload size={16} /> {uploading ? "..." : "Yukle"}
        </button>
      </div>
      {currentValue && (
        <div style={{ marginTop: "8px" }}>
          <img
            src={currentValue || "/placeholder.svg"}
            alt="Preview"
            style={{
              maxWidth: "200px",
              maxHeight: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #333",
            }}
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=120&width=200"
            }}
          />
        </div>
      )}
    </div>
  )

  // Home Editor
  const HomeEditor = () => {
    const home = content.home || {}
    return (
      <div>
        {/* Video Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Video Bolumu</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={home.video?.title || ""}
              onChange={(e) => updateNestedValue(["video", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Alt Baslik</label>
            <input
              type="text"
              value={home.video?.subtitle || ""}
              onChange={(e) => updateNestedValue(["video", "subtitle"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Video URL</label>
            <input
              type="text"
              value={home.video?.url || ""}
              onChange={(e) => updateNestedValue(["video", "url"], e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Experience Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Tecrube Bolumu</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={home.experience?.title || ""}
              onChange={(e) => updateNestedValue(["experience", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Aciklama</label>
            <textarea
              value={home.experience?.description || ""}
              onChange={(e) => updateNestedValue(["experience", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Istatistikler</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Kurulus Yili</label>
              <input
                type="text"
                value={home.stats?.founded || ""}
                onChange={(e) => updateNestedValue(["stats", "founded"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Kurulus Yili Etiketi</label>
              <input
                type="text"
                value={home.stats?.foundedLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "foundedLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Calisan Sayisi</label>
              <input
                type="text"
                value={home.stats?.employees || ""}
                onChange={(e) => updateNestedValue(["stats", "employees"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Calisan Etiketi</label>
              <input
                type="text"
                value={home.stats?.employeesLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "employeesLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Tamamlanan Proje</label>
              <input
                type="text"
                value={home.stats?.completedProjects || ""}
                onChange={(e) => updateNestedValue(["stats", "completedProjects"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Proje Etiketi</label>
              <input
                type="text"
                value={home.stats?.completedProjectsLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "completedProjectsLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Deneyim</label>
              <input
                type="text"
                value={home.stats?.experience || ""}
                onChange={(e) => updateNestedValue(["stats", "experience"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Deneyim Etiketi</label>
              <input
                type="text"
                value={home.stats?.experienceLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "experienceLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Hakkimizda Bolumu</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Badge</label>
            <input
              type="text"
              value={home.about?.badge || ""}
              onChange={(e) => updateNestedValue(["about", "badge"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={home.about?.title || ""}
              onChange={(e) => updateNestedValue(["about", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Aciklama</label>
            <textarea
              value={home.about?.description || ""}
              onChange={(e) => updateNestedValue(["about", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
          <ImageUploadField label="Gorsel" path={["about", "image"]} currentValue={home.about?.image} />
        </div>

        {/* Why Us Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Neden Biz</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={home.whyUs?.title || ""}
              onChange={(e) => updateNestedValue(["whyUs", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          {(home.whyUs?.items || []).map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: "#222", padding: "16px", borderRadius: "8px", marginBottom: "12px" }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}
              >
                <span style={{ fontWeight: 500 }}>Madde {index + 1}</span>
                <button
                  onClick={() => removeItemFromArray(["whyUs", "items"], index)}
                  style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d", borderColor: "#991b1b" }}
                >
                  <Trash2 size={14} /> Sil
                </button>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Baslik</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => updateNestedValue(["whyUs", "items", index, "title"], e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Aciklama</label>
                <textarea
                  value={item.description || ""}
                  onChange={(e) => updateNestedValue(["whyUs", "items", index, "description"], e.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => addItemToArray(["whyUs", "items"], { title: "", description: "" })}
            style={{ ...uploadBtnStyle, backgroundColor: "#166534", borderColor: "#22c55e" }}
          >
            <Plus size={16} /> Madde Ekle
          </button>
        </div>
      </div>
    )
  }

  // About Editor
  const AboutEditor = () => {
    const about = content.about || {}
    return (
      <div>
        {/* Hero Section */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Hero Bolumu</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sayfa Basligi</label>
            <input
              type="text"
              value={about.title || ""}
              onChange={(e) => updateNestedValue(["title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sayfa Alt Basligi</label>
            <input
              type="text"
              value={about.pageTitle || ""}
              onChange={(e) => updateNestedValue(["pageTitle"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <ImageUploadField label="Hero Gorseli" path={["heroImage"]} currentValue={about.heroImage} />
        </div>

        {/* Company Info */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Firma Bilgileri</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Firma Adi</label>
            <input
              type="text"
              value={about.company?.name || ""}
              onChange={(e) => updateNestedValue(["company", "name"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Alt Baslik (Badge)</label>
            <input
              type="text"
              value={about.company?.subtitle || ""}
              onChange={(e) => updateNestedValue(["company", "subtitle"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Kurucu</label>
            <input
              type="text"
              value={about.company?.founder || ""}
              onChange={(e) => updateNestedValue(["company", "founder"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Kurucu Unvani</label>
            <input
              type="text"
              value={about.company?.founderTitle || ""}
              onChange={(e) => updateNestedValue(["company", "founderTitle"], e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Description */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Aciklama</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Firma Aciklamasi</label>
            <textarea
              value={about.description || ""}
              onChange={(e) => updateNestedValue(["description"], e.target.value)}
              style={{ ...textareaStyle, minHeight: "150px" }}
            />
          </div>
          <ImageUploadField label="Ofis Gorseli" path={["officeImage"]} currentValue={about.officeImage} />
        </div>

        {/* Certificate */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Sertifika</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sertifika</label>
            <input
              type="text"
              value={about.certificate || ""}
              onChange={(e) => updateNestedValue(["certificate"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sertifika Aciklamasi</label>
            <textarea
              value={about.certificateDescription || ""}
              onChange={(e) => updateNestedValue(["certificateDescription"], e.target.value)}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Istatistikler</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Kurulus Yili</label>
              <input
                type="text"
                value={about.stats?.founded || ""}
                onChange={(e) => updateNestedValue(["stats", "founded"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Kurulus Etiketi</label>
              <input
                type="text"
                value={about.stats?.foundedLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "foundedLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Calisan</label>
              <input
                type="text"
                value={about.stats?.employees || ""}
                onChange={(e) => updateNestedValue(["stats", "employees"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Calisan Etiketi</label>
              <input
                type="text"
                value={about.stats?.employeesLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "employeesLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Proje Sayisi</label>
              <input
                type="text"
                value={about.stats?.completedProjects || ""}
                onChange={(e) => updateNestedValue(["stats", "completedProjects"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Proje Etiketi</label>
              <input
                type="text"
                value={about.stats?.completedProjectsLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "completedProjectsLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Deneyim</label>
              <input
                type="text"
                value={about.stats?.experience || ""}
                onChange={(e) => updateNestedValue(["stats", "experience"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Deneyim Etiketi</label>
              <input
                type="text"
                value={about.stats?.experienceLabel || ""}
                onChange={(e) => updateNestedValue(["stats", "experienceLabel"], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Vizyon & Misyon & Degerler</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Vizyon Basligi</label>
            <input
              type="text"
              value={about.vision?.title || ""}
              onChange={(e) => updateNestedValue(["vision", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Vizyon Aciklamasi</label>
            <textarea
              value={about.vision?.description || ""}
              onChange={(e) => updateNestedValue(["vision", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Misyon Basligi</label>
            <input
              type="text"
              value={about.mission?.title || ""}
              onChange={(e) => updateNestedValue(["mission", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Misyon Aciklamasi</label>
            <textarea
              value={about.mission?.description || ""}
              onChange={(e) => updateNestedValue(["mission", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Degerler Basligi</label>
            <input
              type="text"
              value={about.values?.title || ""}
              onChange={(e) => updateNestedValue(["values", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Degerler Aciklamasi</label>
            <textarea
              value={about.values?.description || ""}
              onChange={(e) => updateNestedValue(["values", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Iletisim Bilgileri</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Adres</label>
              <textarea
                value={about.contact?.address || ""}
                onChange={(e) => updateNestedValue(["contact", "address"], e.target.value)}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Yetkili</label>
              <input
                type="text"
                value={about.contact?.authorized || ""}
                onChange={(e) => updateNestedValue(["contact", "authorized"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Telefon</label>
              <input
                type="text"
                value={about.contact?.phone || ""}
                onChange={(e) => updateNestedValue(["contact", "phone"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Fax</label>
              <input
                type="text"
                value={about.contact?.fax || ""}
                onChange={(e) => updateNestedValue(["contact", "fax"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Mobil</label>
              <input
                type="text"
                value={about.contact?.mobile || ""}
                onChange={(e) => updateNestedValue(["contact", "mobile"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="text"
                value={about.contact?.email || ""}
                onChange={(e) => updateNestedValue(["contact", "email"], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Why Us */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Neden Biz</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={about.whyUs?.title || ""}
              onChange={(e) => updateNestedValue(["whyUs", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          {(about.whyUs?.items || []).map((item: any, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: "#222", padding: "16px", borderRadius: "8px", marginBottom: "12px" }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}
              >
                <span style={{ fontWeight: 500 }}>Madde {index + 1}</span>
                <button
                  onClick={() => removeItemFromArray(["whyUs", "items"], index)}
                  style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d", borderColor: "#991b1b" }}
                >
                  <Trash2 size={14} /> Sil
                </button>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Baslik</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => updateNestedValue(["whyUs", "items", index, "title"], e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Aciklama</label>
                <textarea
                  value={item.description || ""}
                  onChange={(e) => updateNestedValue(["whyUs", "items", index, "description"], e.target.value)}
                  style={textareaStyle}
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => addItemToArray(["whyUs", "items"], { title: "", description: "" })}
            style={{ ...uploadBtnStyle, backgroundColor: "#166534", borderColor: "#22c55e" }}
          >
            <Plus size={16} /> Madde Ekle
          </button>
        </div>
      </div>
    )
  }

  // Services Editor
  const ServicesEditor = () => {
    const services = content.services || {}
    return (
      <div>
        {/* Hero */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Hero</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={services.hero?.title || ""}
              onChange={(e) => updateNestedValue(["hero", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Alt Baslik</label>
            <textarea
              value={services.hero?.subtitle || ""}
              onChange={(e) => updateNestedValue(["hero", "subtitle"], e.target.value)}
              style={textareaStyle}
            />
          </div>
          <ImageUploadField label="Hero Gorseli" path={["hero", "image"]} currentValue={services.hero?.image} />
        </div>

        {/* Intro */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Giris</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Badge</label>
            <input
              type="text"
              value={services.intro?.badge || ""}
              onChange={(e) => updateNestedValue(["intro", "badge"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={services.intro?.title || ""}
              onChange={(e) => updateNestedValue(["intro", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Aciklama</label>
            <textarea
              value={services.intro?.description || ""}
              onChange={(e) => updateNestedValue(["intro", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Services List */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={sectionTitleStyle}>Hizmetler</h3>
            <button
              onClick={() =>
                addItemToArray(["services"], {
                  id: `service-${Date.now()}`,
                  icon: "Home",
                  title: "Yeni Hizmet",
                  description: "",
                  image: "",
                  items: [],
                })
              }
              style={{ ...uploadBtnStyle, backgroundColor: "#166534", borderColor: "#22c55e" }}
            >
              <Plus size={16} /> Hizmet Ekle
            </button>
          </div>
          {(services.services || []).map((service: any, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: "#222", padding: "20px", borderRadius: "8px", marginBottom: "16px" }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
              >
                <span style={{ fontWeight: 600, color: "#d4a574" }}>Hizmet {index + 1}</span>
                <button
                  onClick={() => removeItemFromArray(["services"], index)}
                  style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d", borderColor: "#991b1b" }}
                >
                  <Trash2 size={14} /> Sil
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>Baslik</label>
                  <input
                    type="text"
                    value={service.title || ""}
                    onChange={(e) => updateNestedValue(["services", index, "title"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Icon (Home/Building/Landmark)</label>
                  <input
                    type="text"
                    value={service.icon || ""}
                    onChange={(e) => updateNestedValue(["services", index, "icon"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Aciklama</label>
                <textarea
                  value={service.description || ""}
                  onChange={(e) => updateNestedValue(["services", index, "description"], e.target.value)}
                  style={textareaStyle}
                />
              </div>
              <ImageUploadField
                label="Hizmet Gorseli"
                path={["services", index.toString(), "image"]}
                currentValue={service.image}
              />
              {/* Service Items */}
              <div style={{ marginTop: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <label style={labelStyle}>Alt Maddeler</label>
                  <button
                    onClick={() =>
                      updateNestedValue(
                        ["services", index, "items"],
                        [...(service.items || []), { title: "", description: "" }],
                      )
                    }
                    style={{ ...uploadBtnStyle, padding: "6px 12px", fontSize: "12px" }}
                  >
                    <Plus size={14} /> Ekle
                  </button>
                </div>
                {(service.items || []).map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    style={{ backgroundColor: "#1a1a1a", padding: "12px", borderRadius: "6px", marginBottom: "8px" }}
                  >
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) =>
                          updateNestedValue(["services", index, "items", itemIndex, "title"], e.target.value)
                        }
                        placeholder="Baslik"
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <button
                        onClick={() => {
                          const items = [...(service.items || [])]
                          items.splice(itemIndex, 1)
                          updateNestedValue(["services", index, "items"], items)
                        }}
                        style={{ ...uploadBtnStyle, padding: "8px", backgroundColor: "#7f1d1d" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) =>
                        updateNestedValue(["services", index, "items", itemIndex, "description"], e.target.value)
                      }
                      placeholder="Aciklama"
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>CTA</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Baslik</label>
            <input
              type="text"
              value={services.cta?.title || ""}
              onChange={(e) => updateNestedValue(["cta", "title"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Aciklama</label>
            <textarea
              value={services.cta?.description || ""}
              onChange={(e) => updateNestedValue(["cta", "description"], e.target.value)}
              style={textareaStyle}
            />
          </div>
        </div>
      </div>
    )
  }

  // Projects Editor
  const ProjectsEditor = () => {
    const projects = content.projects || {}
    const projectTypes = [
      { key: "completed", label: "Tamamlanan" },
      { key: "ongoing", label: "Devam Eden" },
      { key: "upcoming", label: "Baslayacak" },
    ]
    const currentProjects = projects[projectTab] || []

    return (
      <div>
        {/* Page Info */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Sayfa Bilgileri</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sayfa Basligi</label>
            <input
              type="text"
              value={projects.pageTitle || ""}
              onChange={(e) => updateNestedValue(["pageTitle"], e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sayfa Aciklamasi</label>
            <textarea
              value={projects.pageDescription || ""}
              onChange={(e) => updateNestedValue(["pageDescription"], e.target.value)}
              style={textareaStyle}
            />
          </div>
          <ImageUploadField label="Hero Gorseli" path={["heroImage"]} currentValue={projects.heroImage} />
        </div>

        {/* Project Tabs */}
        <div style={cardStyle}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            {projectTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setProjectTab(type.key as any)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: projectTab === type.key ? "#d4a574" : "#333",
                  color: projectTab === type.key ? "#000" : "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {type.label} ({(projects[type.key] || []).length})
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={sectionTitleStyle}>{projectTypes.find((t) => t.key === projectTab)?.label} Projeler</h3>
            <button
              onClick={() =>
                addItemToArray([projectTab], {
                  id: `project-${Date.now()}`,
                  slug: `proje-${Date.now()}`,
                  title: "Yeni Proje",
                  shortDescription: "",
                  fullDescription: "",
                  details: "",
                  year: new Date().getFullYear().toString(),
                  location: "",
                  mainImage: "",
                  gallery: [],
                  features: [],
                  progress: projectTab === "ongoing" ? 0 : undefined,
                })
              }
              style={{ ...uploadBtnStyle, backgroundColor: "#166534", borderColor: "#22c55e" }}
            >
              <Plus size={16} /> Proje Ekle
            </button>
          </div>

          {currentProjects.map((project: any, index: number) => (
            <div
              key={index}
              style={{ backgroundColor: "#222", padding: "20px", borderRadius: "8px", marginBottom: "16px" }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
              >
                <span style={{ fontWeight: 600, color: "#d4a574" }}>{project.title || `Proje ${index + 1}`}</span>
                <button
                  onClick={() => removeItemFromArray([projectTab], index)}
                  style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d", borderColor: "#991b1b" }}
                >
                  <Trash2 size={14} /> Sil
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>Baslik</label>
                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => updateNestedValue([projectTab, index, "title"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Slug (URL)</label>
                  <input
                    type="text"
                    value={project.slug || ""}
                    onChange={(e) => updateNestedValue([projectTab, index, "slug"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Yil</label>
                  <input
                    type="text"
                    value={project.year || ""}
                    onChange={(e) => updateNestedValue([projectTab, index, "year"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Konum</label>
                  <input
                    type="text"
                    value={project.location || ""}
                    onChange={(e) => updateNestedValue([projectTab, index, "location"], e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Kisa Aciklama</label>
                <input
                  type="text"
                  value={project.shortDescription || ""}
                  onChange={(e) => updateNestedValue([projectTab, index, "shortDescription"], e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Detayli Aciklama</label>
                <textarea
                  value={project.fullDescription || ""}
                  onChange={(e) => updateNestedValue([projectTab, index, "fullDescription"], e.target.value)}
                  style={textareaStyle}
                />
              </div>

              {projectTab === "ongoing" && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Ilerleme (%) : {project.progress || 0}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={project.progress || 0}
                    onChange={(e) =>
                      updateNestedValue([projectTab, index, "progress"], Number.parseInt(e.target.value))
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              )}

              <ImageUploadField
                label="Ana Gorsel"
                path={[projectTab, index.toString(), "mainImage"]}
                currentValue={project.mainImage}
              />

              {/* Gallery */}
              <div style={{ marginTop: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <label style={labelStyle}>Galeri</label>
                  <button
                    onClick={() => openGalleryUpload([projectTab, index.toString(), "gallery"])}
                    style={uploadBtnStyle}
                  >
                    <Upload size={14} /> Gorsel Ekle
                  </button>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {(project.gallery || []).map((img: string, imgIndex: number) => (
                    <div key={imgIndex} style={{ position: "relative" }}>
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Gallery ${imgIndex}`}
                        style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                      />
                      <button
                        onClick={() => {
                          const gallery = [...(project.gallery || [])]
                          gallery.splice(imgIndex, 1)
                          updateNestedValue([projectTab, index, "gallery"], gallery)
                        }}
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Contact Editor
  const ContactEditor = () => {
    const contact = content.contact || {}
    return (
      <div>
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>Iletisim Bilgileri</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Adres</label>
              <textarea
                value={contact.address || ""}
                onChange={(e) => updateNestedValue(["address"], e.target.value)}
                style={textareaStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Telefon</label>
              <input
                type="text"
                value={contact.phone || ""}
                onChange={(e) => updateNestedValue(["phone"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Mobil</label>
              <input
                type="text"
                value={contact.mobile || ""}
                onChange={(e) => updateNestedValue(["mobile"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="text"
                value={contact.email || ""}
                onChange={(e) => updateNestedValue(["email"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Fax</label>
              <input
                type="text"
                value={contact.fax || ""}
                onChange={(e) => updateNestedValue(["fax"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Yetkili</label>
              <input
                type="text"
                value={contact.authorized || ""}
                onChange={(e) => updateNestedValue(["authorized"], e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Calisma Saatleri</label>
              <input
                type="text"
                value={contact.hours || ""}
                onChange={(e) => updateNestedValue(["hours"], e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <ImageUploadField label="Hero Gorseli" path={["heroImage"]} currentValue={contact.heroImage} />
          </div>
        </div>
      </div>
    )
  }

  const renderEditor = () => {
    switch (activeTab) {
      case "home":
        return <HomeEditor />
      case "about":
        return <AboutEditor />
      case "services":
        return <ServicesEditor />
      case "projects":
        return <ProjectsEditor />
      case "contact":
        return <ContactEditor />
      default:
        return null
    }
  }

  return (
    <div style={containerStyle}>
      {/* Hidden file inputs */}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: "none" }} />
      <input
        type="file"
        ref={galleryInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #333",
          padding: "16px",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ ...uploadBtnStyle, display: "none" }}
              className="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 style={{ fontSize: "20px", fontWeight: 700 }}>VIERA Yonetim</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {message && (
              <span
                style={{
                  padding: "8px 16px",
                  backgroundColor: message.includes("Hata") ? "#7f1d1d" : "#166534",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              >
                {message}
              </span>
            )}
            <button onClick={saveContent} disabled={saving} style={{ ...buttonStyle, opacity: saving ? 0.5 : 1 }}>
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 16px" }}>
        {/* Desktop Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "12px 24px",
                backgroundColor: activeTab === tab.id ? "#d4a574" : "#222",
                color: activeTab === tab.id ? "#000" : "#fff",
                border: "1px solid",
                borderColor: activeTab === tab.id ? "#d4a574" : "#333",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Content */}
        {renderEditor()}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
