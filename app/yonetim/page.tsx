"use client"

import type React from "react"
import { useState, useRef } from "react"

type Tab = "home" | "about" | "services" | "projects" | "contact"

const ADMIN_PASSWORD = "viera2025"

const DEFAULT_PROJECT = {
  id: "",
  slug: "",
  title: "Yeni Proje",
  shortDescription: "",
  fullDescription: "",
  location: "",
  year: new Date().getFullYear().toString(),
  details: "",
  mainImage: "/placeholder.svg?height=400&width=600",
  gallery: [] as string[],
  features: [] as string[],
  updates: [] as any[],
}

const DEFAULT_SERVICE = {
  id: "",
  icon: "Home",
  title: "Yeni Hizmet",
  description: "",
  image: "/placeholder.svg?height=300&width=400",
  items: [] as any[],
}

const DEFAULT_UPDATE = {
  date: new Date().toISOString().slice(0, 7),
  title: "",
  description: "",
}

export default function YonetimPage() {
  const [password, setPassword] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [content, setContent] = useState<Record<string, any>>({})
  const [shas, setShas] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentImageField, setCurrentImageField] = useState<{ path: string[] } | null>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [currentGalleryPath, setCurrentGalleryPath] = useState<string[] | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setAuthError("")
      loadAllContent()
    } else {
      setAuthError("Yanlis sifre")
    }
  }

  const loadAllContent = async () => {
    setLoading(true)
    const tabs: Tab[] = ["home", "about", "services", "projects", "contact"]
    const results: Record<string, any> = {}
    const shaResults: Record<string, string> = {}

    for (const tab of tabs) {
      try {
        const res = await fetch(`/api/github/content?file=${tab}`)
        const json = await res.json()
        console.log(`[v0] Loaded ${tab}:`, JSON.stringify(json.data).slice(0, 200))
        results[tab] = json.data || {}
        if (json.sha) shaResults[tab] = json.sha
      } catch (err) {
        console.log(`[v0] Error loading ${tab}:`, err)
        results[tab] = {}
      }
    }

    setContent(results)
    setShas(shaResults)
    setLoading(false)
  }

  const saveContent = async () => {
    setSaving(true)
    setMessage("")
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
      if (res.ok) {
        setMessage("Kaydedildi!")
        const refreshRes = await fetch(`/api/github/content?file=${activeTab}`)
        const refreshData = await refreshRes.json()
        if (refreshData.sha) setShas((prev) => ({ ...prev, [activeTab]: refreshData.sha }))
      } else {
        const err = await res.json()
        setMessage(`Hata: ${err.error}`)
      }
    } catch (err: any) {
      setMessage(`Hata: ${err.message}`)
    }
    setSaving(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentImageField) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        updateNestedValue(currentImageField.path, data.url)
        setMessage("Gorsel yuklendi!")
      } else {
        setMessage("Gorsel yuklenemedi: " + (data.error || "Bilinmeyen hata"))
      }
    } catch (err: any) {
      setMessage(`Yukleme hatasi: ${err.message}`)
    }
    setUploading(false)
    setCurrentImageField(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentGalleryPath) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        const currentGallery = getNestedValue(currentGalleryPath) || []
        updateNestedValue(currentGalleryPath, [...currentGallery, data.url])
        setMessage("Galeri gorseli eklendi!")
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

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Yonetim Paneli</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sifre"
            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded text-white mb-4"
          />
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
          <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium">
            Giris Yap
          </button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-white text-xl">Yukleniyor...</p>
      </div>
    )
  }

  const tabs = [
    { id: "home" as Tab, label: "Anasayfa" },
    { id: "about" as Tab, label: "Hakkimizda" },
    { id: "services" as Tab, label: "Hizmetler" },
    { id: "projects" as Tab, label: "Projeler" },
    { id: "contact" as Tab, label: "Iletisim" },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hidden file inputs */}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
      <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} accept="image/*" className="hidden" />

      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-amber-500">Yonetim Paneli</h1>
        <div className="flex items-center gap-4">
          {message && <span className={message.includes("Hata") ? "text-red-400" : "text-green-400"}>{message}</span>}
          <button
            onClick={saveContent}
            disabled={saving}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium disabled:opacity-50"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-zinc-950/50 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-zinc-800 text-amber-500 border-b-2 border-amber-500"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {activeTab === "home" && (
          <HomeEditor
            content={content.home || {}}
            updateValue={updateNestedValue}
            getValue={getNestedValue}
            openImageUpload={openImageUpload}
            uploading={uploading}
            addItem={addItemToArray}
            removeItem={removeItemFromArray}
          />
        )}
        {activeTab === "about" && (
          <AboutEditor
            content={content.about || {}}
            updateValue={updateNestedValue}
            getValue={getNestedValue}
            openImageUpload={openImageUpload}
            uploading={uploading}
            addItem={addItemToArray}
            removeItem={removeItemFromArray}
          />
        )}
        {activeTab === "services" && (
          <ServicesEditor
            content={content.services || {}}
            updateValue={updateNestedValue}
            getValue={getNestedValue}
            openImageUpload={openImageUpload}
            uploading={uploading}
            addItem={addItemToArray}
            removeItem={removeItemFromArray}
            defaultService={DEFAULT_SERVICE}
          />
        )}
        {activeTab === "projects" && (
          <ProjectsEditor
            content={content.projects || {}}
            updateValue={updateNestedValue}
            getValue={getNestedValue}
            openImageUpload={openImageUpload}
            openGalleryUpload={openGalleryUpload}
            uploading={uploading}
            addItem={addItemToArray}
            removeItem={removeItemFromArray}
            defaultProject={DEFAULT_PROJECT}
            defaultUpdate={DEFAULT_UPDATE}
          />
        )}
        {activeTab === "contact" && (
          <ContactEditor
            content={content.contact || {}}
            updateValue={updateNestedValue}
            getValue={getNestedValue}
            openImageUpload={openImageUpload}
            uploading={uploading}
          />
        )}
      </div>
    </div>
  )
}

// Field Components
function Field({
  label,
  path,
  getValue,
  updateValue,
  textarea,
}: {
  label: string
  path: string[]
  getValue: (p: string[]) => any
  updateValue: (p: string[], v: any) => void
  textarea?: boolean
}) {
  const value = getValue(path) ?? ""
  const displayValue = Array.isArray(value) ? value.join(", ") : String(value)

  const handleChange = (newVal: string) => {
    const original = getValue(path)
    if (Array.isArray(original)) {
      updateValue(
        path,
        newVal
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      )
    } else {
      updateValue(path, newVal)
    }
  }

  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-zinc-400 text-sm">{label}</label>
      {textarea ? (
        <textarea
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          rows={4}
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded text-white resize-y"
        />
      ) : (
        <input
          type="text"
          value={displayValue}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded text-white"
        />
      )}
    </div>
  )
}

function ImageField({
  label,
  path,
  getValue,
  updateValue,
  openImageUpload,
  uploading,
}: {
  label: string
  path: string[]
  getValue: (p: string[]) => any
  updateValue: (p: string[], v: any) => void
  openImageUpload: (p: string[]) => void
  uploading: boolean
}) {
  const value = getValue(path) || ""
  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-zinc-400 text-sm">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => updateValue(path, e.target.value)}
          placeholder="URL girin veya gorsel yukleyin"
          className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded text-white"
        />
        <button
          onClick={() => openImageUpload(path)}
          disabled={uploading}
          className="px-4 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors disabled:opacity-50"
        >
          {uploading ? "..." : "Yukle"}
        </button>
      </div>
      {value && (
        <img
          src={value || "/placeholder.svg"}
          alt=""
          className="mt-2 max-w-[200px] max-h-[120px] object-cover rounded border border-zinc-700"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
        />
      )}
    </div>
  )
}

function GalleryField({
  label,
  path,
  getValue,
  updateValue,
  openGalleryUpload,
  uploading,
}: {
  label: string
  path: string[]
  getValue: (p: string[]) => any
  updateValue: (p: string[], v: any) => void
  openGalleryUpload: (p: string[]) => void
  uploading: boolean
}) {
  const value = getValue(path) || []
  const gallery = Array.isArray(value) ? value : []

  const removeImage = (index: number) => {
    updateValue(
      path,
      gallery.filter((_: string, i: number) => i !== index),
    )
  }

  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-zinc-400 text-sm">{label}</label>
      <button
        onClick={() => openGalleryUpload(path)}
        disabled={uploading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors mb-3 disabled:opacity-50"
      >
        {uploading ? "Yukleniyor..." : "+ Gorsel Ekle"}
      </button>
      {gallery.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {gallery.map((url: string, i: number) => (
            <div key={i} className="relative">
              <img
                src={url || "/placeholder.svg"}
                alt=""
                className="w-24 h-20 object-cover rounded border border-zinc-700"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-500 text-sm">Henuz gorsel yok</p>
      )}
    </div>
  )
}

function Section({
  title,
  children,
  onAdd,
  addLabel,
}: {
  title: string
  children: React.ReactNode
  onAdd?: () => void
  addLabel?: string
}) {
  return (
    <div className="mb-8 p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-amber-500 font-semibold text-lg">{title}</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
          >
            + {addLabel || "Ekle"}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function HomeEditor({ content, updateValue, getValue, openImageUpload, uploading, addItem, removeItem }: any) {
  return (
    <>
      <Section title="Video / Hero Bolumu">
        <Field label="Baslik" path={["video", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Alt Baslik (Kayan Yazi)"
          path={["video", "subtitle"]}
          getValue={getValue}
          updateValue={updateValue}
        />
        <Field label="Video URL" path={["video", "url"]} getValue={getValue} updateValue={updateValue} />
      </Section>

      <Section title="Tecrube Bolumu">
        <Field label="Baslik" path={["experience", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["experience", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
      </Section>

      <Section title="Hakkimizda Bolumu">
        <Field label="Badge" path={["about", "badge"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Baslik" path={["about", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["about", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
        <ImageField
          label="Gorsel"
          path={["about", "image"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
        <div className="mt-4 p-4 bg-zinc-800 rounded">
          <h4 className="text-zinc-300 font-medium mb-3">Muteahhitlik Belgesi</h4>
          <Field
            label="Baslik"
            path={["about", "certification", "title"]}
            getValue={getValue}
            updateValue={updateValue}
          />
          <Field
            label="Aciklama"
            path={["about", "certification", "description"]}
            getValue={getValue}
            updateValue={updateValue}
          />
        </div>
        <div className="mt-4 p-4 bg-zinc-800 rounded">
          <h4 className="text-zinc-300 font-medium mb-3">Projelerimiz</h4>
          <Field label="Baslik" path={["about", "projects", "title"]} getValue={getValue} updateValue={updateValue} />
          <Field
            label="Aciklama"
            path={["about", "projects", "description"]}
            getValue={getValue}
            updateValue={updateValue}
          />
        </div>
      </Section>
    </>
  )
}

function AboutEditor({ content, updateValue, getValue, openImageUpload, uploading, addItem, removeItem }: any) {
  const whyUsItems = content?.whyUs?.items || []

  return (
    <>
      <Section title="Genel Bilgiler">
        <Field label="Sayfa Basligi" path={["pageTitle"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Aciklama" path={["description"]} getValue={getValue} updateValue={updateValue} textarea />
        <Field label="Sertifika" path={["certificate"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Sertifika Aciklamasi"
          path={["certificateDescription"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
        <ImageField
          label="Hero Gorsel"
          path={["heroImage"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
        <ImageField
          label="Ofis Gorseli"
          path={["officeImage"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
      </Section>

      <Section title="Istatistikler">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Kurulus Yili" path={["stats", "founded"]} getValue={getValue} updateValue={updateValue} />
          <Field
            label="Kurulus Etiketi"
            path={["stats", "foundedLabel"]}
            getValue={getValue}
            updateValue={updateValue}
          />
          <Field label="Calisan Sayisi" path={["stats", "employees"]} getValue={getValue} updateValue={updateValue} />
          <Field
            label="Calisan Etiketi"
            path={["stats", "employeesLabel"]}
            getValue={getValue}
            updateValue={updateValue}
          />
          <Field
            label="Proje Sayisi"
            path={["stats", "completedProjects"]}
            getValue={getValue}
            updateValue={updateValue}
          />
          <Field
            label="Proje Etiketi"
            path={["stats", "completedProjectsLabel"]}
            getValue={getValue}
            updateValue={updateValue}
          />
          <Field label="Deneyim" path={["stats", "experience"]} getValue={getValue} updateValue={updateValue} />
          <Field
            label="Deneyim Etiketi"
            path={["stats", "experienceLabel"]}
            getValue={getValue}
            updateValue={updateValue}
          />
        </div>
      </Section>

      <Section title="Firma Bilgileri">
        <Field label="Firma Adi" path={["company", "name"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Alt Baslik (Badge)"
          path={["company", "subtitle"]}
          getValue={getValue}
          updateValue={updateValue}
        />
        <Field label="Kurucu" path={["company", "founder"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Kurucu Unvani" path={["company", "founderTitle"]} getValue={getValue} updateValue={updateValue} />
      </Section>

      <Section title="Iletisim Bilgileri">
        <Field label="Adres" path={["contact", "address"]} getValue={getValue} updateValue={updateValue} textarea />
        <Field label="Yetkili Kisi" path={["contact", "authorized"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Telefon" path={["contact", "phone"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Cep Telefonu" path={["contact", "mobile"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Fax" path={["contact", "fax"]} getValue={getValue} updateValue={updateValue} />
        <Field label="E-posta" path={["contact", "email"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Calisma Saatleri" path={["contact", "hours"]} getValue={getValue} updateValue={updateValue} />
      </Section>

      <Section title="Vizyon">
        <Field label="Baslik" path={["vision", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["vision", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
      </Section>

      <Section title="Misyon">
        <Field label="Baslik" path={["mission", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["mission", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
      </Section>

      <Section title="Degerlerimiz">
        <Field label="Baslik" path={["values", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["values", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
      </Section>

      <Section
        title="Neden Biz"
        onAdd={() => addItem(["whyUs", "items"], { title: "", description: "" })}
        addLabel="Madde Ekle"
      >
        <Field label="Baslik" path={["whyUs", "title"]} getValue={getValue} updateValue={updateValue} />
        {whyUsItems.map((_: any, i: number) => (
          <div key={i} className="p-3 bg-zinc-800 rounded mb-2 relative">
            <button
              onClick={() => removeItem(["whyUs", "items"], i)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              Sil
            </button>
            <Field
              label={`Madde ${i + 1} Baslik`}
              path={["whyUs", "items", String(i), "title"]}
              getValue={getValue}
              updateValue={updateValue}
            />
            <Field
              label={`Madde ${i + 1} Aciklama`}
              path={["whyUs", "items", String(i), "description"]}
              getValue={getValue}
              updateValue={updateValue}
            />
          </div>
        ))}
      </Section>
    </>
  )
}

function ServicesEditor({
  content,
  updateValue,
  getValue,
  openImageUpload,
  uploading,
  addItem,
  removeItem,
  defaultService,
}: any) {
  const services = content?.services || []

  return (
    <>
      <Section title="Hero Bolumu">
        <Field label="Baslik" path={["hero", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Alt Baslik" path={["hero", "subtitle"]} getValue={getValue} updateValue={updateValue} textarea />
        <ImageField
          label="Hero Gorseli"
          path={["hero", "image"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
      </Section>

      <Section title="Giris Bolumu">
        <Field label="Badge" path={["intro", "badge"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Baslik" path={["intro", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Aciklama"
          path={["intro", "description"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
      </Section>

      <Section
        title="Hizmetler"
        onAdd={() => {
          const newService = { ...defaultService, id: `service-${Date.now()}` }
          addItem(["services"], newService)
        }}
        addLabel="Hizmet Ekle"
      >
        {services.map((service: any, i: number) => (
          <div key={service.id || i} className="p-4 bg-zinc-800 rounded mb-4 relative">
            <button
              onClick={() => removeItem(["services"], i)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              Sil
            </button>
            <Field
              label="Hizmet Adi"
              path={["services", String(i), "title"]}
              getValue={getValue}
              updateValue={updateValue}
            />
            <Field
              label="Aciklama"
              path={["services", String(i), "description"]}
              getValue={getValue}
              updateValue={updateValue}
              textarea
            />
            <Field
              label="Icon (Home/Building/Landmark)"
              path={["services", String(i), "icon"]}
              getValue={getValue}
              updateValue={updateValue}
            />
            <ImageField
              label="Gorsel"
              path={["services", String(i), "image"]}
              getValue={getValue}
              updateValue={updateValue}
              openImageUpload={openImageUpload}
              uploading={uploading}
            />
          </div>
        ))}
      </Section>

      <Section title="CTA Bolumu">
        <Field label="Baslik" path={["cta", "title"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Aciklama" path={["cta", "description"]} getValue={getValue} updateValue={updateValue} textarea />
      </Section>
    </>
  )
}

function ProjectsEditor({
  content,
  updateValue,
  getValue,
  openImageUpload,
  openGalleryUpload,
  uploading,
  addItem,
  removeItem,
  defaultProject,
  defaultUpdate,
}: any) {
  const [projectTab, setProjectTab] = useState<"completed" | "ongoing" | "upcoming">("completed")
  const projects = content?.[projectTab] || []

  const projectTabs = [
    { id: "completed" as const, label: "Tamamlanan" },
    { id: "ongoing" as const, label: "Devam Eden" },
    { id: "upcoming" as const, label: "Baslayacak" },
  ]

  return (
    <>
      <Section title="Sayfa Ayarlari">
        <Field label="Sayfa Basligi" path={["pageTitle"]} getValue={getValue} updateValue={updateValue} />
        <Field
          label="Sayfa Aciklamasi"
          path={["pageDescription"]}
          getValue={getValue}
          updateValue={updateValue}
          textarea
        />
        <ImageField
          label="Hero Gorseli"
          path={["heroImage"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
      </Section>

      {/* Project Tabs */}
      <div className="flex gap-2 mb-4">
        {projectTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setProjectTab(tab.id)}
            className={`px-4 py-2 rounded transition-colors ${
              projectTab === tab.id ? "bg-amber-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {tab.label} ({(content?.[tab.id] || []).length})
          </button>
        ))}
      </div>

      <Section
        title={`${projectTabs.find((t) => t.id === projectTab)?.label} Projeler`}
        onAdd={() => {
          const newProject = { ...defaultProject, id: `project-${Date.now()}`, slug: `proje-${Date.now()}` }
          addItem([projectTab], newProject)
        }}
        addLabel="Proje Ekle"
      >
        {projects.length === 0 ? (
          <p className="text-zinc-500">Bu kategoride proje yok</p>
        ) : (
          projects.map((project: any, i: number) => (
            <div key={project.id || i} className="p-4 bg-zinc-800 rounded mb-4 relative">
              <button
                onClick={() => removeItem([projectTab], i)}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                Sil
              </button>
              <Field
                label="Proje Adi"
                path={[projectTab, String(i), "title"]}
                getValue={getValue}
                updateValue={updateValue}
              />
              <Field
                label="Slug (URL)"
                path={[projectTab, String(i), "slug"]}
                getValue={getValue}
                updateValue={updateValue}
              />
              <Field
                label="Kisa Aciklama"
                path={[projectTab, String(i), "shortDescription"]}
                getValue={getValue}
                updateValue={updateValue}
              />
              <Field
                label="Detayli Aciklama"
                path={[projectTab, String(i), "fullDescription"]}
                getValue={getValue}
                updateValue={updateValue}
                textarea
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Konum"
                  path={[projectTab, String(i), "location"]}
                  getValue={getValue}
                  updateValue={updateValue}
                />
                <Field
                  label="Yil"
                  path={[projectTab, String(i), "year"]}
                  getValue={getValue}
                  updateValue={updateValue}
                />
              </div>
              <Field
                label="Detaylar"
                path={[projectTab, String(i), "details"]}
                getValue={getValue}
                updateValue={updateValue}
              />
              <Field
                label="Ozellikler (virgul ile ayirin)"
                path={[projectTab, String(i), "features"]}
                getValue={getValue}
                updateValue={updateValue}
              />
              {projectTab === "ongoing" && (
                <Field
                  label="Ilerleme (%)"
                  path={[projectTab, String(i), "progress"]}
                  getValue={getValue}
                  updateValue={updateValue}
                />
              )}
              <ImageField
                label="Ana Gorsel"
                path={[projectTab, String(i), "mainImage"]}
                getValue={getValue}
                updateValue={updateValue}
                openImageUpload={openImageUpload}
                uploading={uploading}
              />
              <GalleryField
                label="Galeri"
                path={[projectTab, String(i), "gallery"]}
                getValue={getValue}
                updateValue={updateValue}
                openGalleryUpload={openGalleryUpload}
                uploading={uploading}
              />

              {/* Updates for ongoing projects */}
              {projectTab === "ongoing" && (
                <div className="mt-4 p-3 bg-zinc-700 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-zinc-300 font-medium">Guncellemeler</h5>
                    <button
                      onClick={() => addItem([projectTab, String(i), "updates"], { ...defaultUpdate })}
                      className="text-xs bg-green-600 px-2 py-1 rounded text-white"
                    >
                      + Guncelleme
                    </button>
                  </div>
                  {(project.updates || []).map((_: any, j: number) => (
                    <div key={j} className="p-2 bg-zinc-600 rounded mb-2 relative">
                      <button
                        onClick={() => removeItem([projectTab, String(i), "updates"], j)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full"
                      >
                        x
                      </button>
                      <Field
                        label="Tarih"
                        path={[projectTab, String(i), "updates", String(j), "date"]}
                        getValue={getValue}
                        updateValue={updateValue}
                      />
                      <Field
                        label="Baslik"
                        path={[projectTab, String(i), "updates", String(j), "title"]}
                        getValue={getValue}
                        updateValue={updateValue}
                      />
                      <Field
                        label="Aciklama"
                        path={[projectTab, String(i), "updates", String(j), "description"]}
                        getValue={getValue}
                        updateValue={updateValue}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </Section>
    </>
  )
}

function ContactEditor({ content, updateValue, getValue, openImageUpload, uploading }: any) {
  return (
    <>
      <Section title="Iletisim Bilgileri">
        <Field label="Adres" path={["address"]} getValue={getValue} updateValue={updateValue} textarea />
        <Field label="Yetkili Kisi" path={["authorized"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Telefon" path={["phone"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Cep Telefonu" path={["mobile"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Fax" path={["fax"]} getValue={getValue} updateValue={updateValue} />
        <Field label="E-posta" path={["email"]} getValue={getValue} updateValue={updateValue} />
        <Field label="Calisma Saatleri" path={["hours"]} getValue={getValue} updateValue={updateValue} />
        <ImageField
          label="Hero Gorseli"
          path={["heroImage"]}
          getValue={getValue}
          updateValue={updateValue}
          openImageUpload={openImageUpload}
          uploading={uploading}
        />
      </Section>
    </>
  )
}
