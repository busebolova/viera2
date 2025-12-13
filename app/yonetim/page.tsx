"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Plus,
  Building2,
  Users,
  Briefcase,
  Mail,
  Home,
  X,
  Building,
  Landmark,
  Hammer,
  Wrench,
  Package,
  Factory,
  Warehouse,
  Construction,
  Phone,
  CheckCircle2,
  Calendar,
} from "lucide-react"
// REMOVING THIS IMPORT: import { put } from "@vercel/blob"
import { uploadImage } from "@/app/actions/upload-image"
import { cn } from "@/lib/utils"

// Define icon map for services
const iconMap: { [key: string]: React.ElementType } = {
  Home: Home,
  Building: Building,
  Landmark: Landmark,
  Hammer: Hammer,
  Wrench: Wrench,
  Package: Package,
  Factory: Factory,
  Warehouse: Warehouse,
  Construction: Construction,
  Users: Users,
  Briefcase: Briefcase,
  Mail: Mail,
  Phone: Phone,
  Key: Wrench, // Assuming Key maps to Wrench, adjust if needed
}

type ContentType = "home" | "about" | "services" | "projects" | "contact"

interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  year: string
  location: string
  area: string
  units: string
  floors: string
  status: string
  mainImage: string
  gallery: string[]
  features: string[]
  progress?: number
  updates?: Array<{
    date: string
    title: string
    description: string
  }>
}

// Helper function to generate slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim()
}

const AdminPanel = () => {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<ContentType>("home")
  const [content, setContent] = useState<Record<ContentType, any>>({
    home: {},
    about: {},
    services: [],
    projects: {},
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
  const [isUploading, setIsUploading] = useState(false) // Added state for image upload
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const servicesContainerRef = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const projectsContainerRef = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const emptyDefaults: Record<ContentType, any> = {
    home: {
      video: { url: "", title: "", subtitle: "" },
      stats: {},
      experience: { title: "", description: "" },
      process: { title: "", subtitle: "", steps: [] },
      whyUs: { title: "", items: [] },
      cta: { title: "", description: "" },
    },
    about: {
      company: { name: "" },
      description: "",
      certificate: "",
      certificateDescription: "",
      officeImage: "",
      vision: { title: "", description: "" },
      mission: { title: "", description: "" },
      values: { title: "", description: "" },
      whyUs: { title: "", items: [] },
      team: [],
      contact: {
        address: "",
        authorized: [],
        phones: [],
        fax: "",
        mobile: "",
      },
    },
    services: { intro: {}, services: [], cta: {} },
    projects: { completed: [], ongoing: [], upcoming: [] },
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
      console.log("[v0] === KAYDETME BAŞLADI ===")
      console.log("[v0] Dosya:", fileToSave)

      const payload = {
        file: fileToSave,
        content: content[fileToSave],
        sha: shas[fileToSave],
      }

      const res = await fetch(`/api/github/content?t=${Date.now()}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      })

      console.log("[v0] Response status:", res.status)
      const data = await res.json()

      if (res.ok && data.success) {
        console.log("[v0] ✅ KAYDETME BAŞARILI!")
        if (data.sha) {
          setShas((prev) => ({ ...prev, [fileToSave]: data.sha }))
        }

        setMessage("✅ Kaydedildi ve cache temizlendi!")

        router.refresh()

        setTimeout(async () => {
          await loadContent(fileToSave)
          setMessage("✅ Değişiklikler yüklendi! Ana sayfayı yenileyin.")
        }, 500)

        console.log("[v0] === KAYDETME TAMAMLANDI ===")
      } else {
        console.error("[v0] ❌ KAYDETME BAŞARISIZ:", data.error)
        setMessage(`❌ Hata: ${data.error || "Bilinmeyen hata"}`)
      }
    } catch (err: any) {
      console.error("[v0] ❌ EXCEPTION:", err)
      setMessage(`❌ Hata: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  // UPDATED HANDLEIMAGEUPLOAD
  const handleImageUpload = async (path: string[], uploadKey: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e: any) => {
      const file = e.target?.files?.[0]
      if (!file) return

      setIsUploading(true)
      setUploadProgress((prev) => ({ ...prev, [uploadKey]: 0 }))

      // Progress simulation
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const current = prev[uploadKey] || 0
          if (current >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return { ...prev, [uploadKey]: current + 10 }
        })
      }, 100)

      try {
        console.log("[v0] Görsel yükleniyor:", file.name)

        // Use server action for upload
        const formData = new FormData()
        formData.append("file", file)
        const result = await uploadImage(formData)

        if (!result.success) {
          throw new Error(result.error)
        }

        console.log("[v0] Görsel yüklendi:", result.url)

        clearInterval(progressInterval)
        setUploadProgress((prev) => ({ ...prev, [uploadKey]: 100 }))

        // Update path with image URL
        updateNestedValue(path, result.url)

        // Force re-render
        setContent((prev) => ({ ...prev }))

        setMessage("✅ Görsel başarıyla yüklendi!")
        setTimeout(() => {
          setMessage("")
          setUploadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[uploadKey]
            return newProgress
          })
          setIsUploading(false)
        }, 2000)
      } catch (error: any) {
        console.error("[v0] Görsel yükleme hatası:", error)
        clearInterval(progressInterval)
        setUploadProgress((prev) => {
          const newProgress = { ...prev }
          delete newProgress[uploadKey]
          return newProgress
        })
        setMessage(`❌ Görsel yüklenirken hata: ${error.message}`)
        setIsUploading(false)
      }
    }
    input.click()
  }

  const updateNestedValue = (path: string[], value: any) => {
    console.log("[v0] updateNestedValue çağrıldı:", { activeTab, path, value })
    setContent((prev) => {
      const updated = JSON.parse(JSON.stringify(prev))
      let obj = updated[activeTab]

      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {}
        obj = obj[path[i]]
      }
      obj[path[path.length - 1]] = value

      console.log("[v0] State güncellendi:", updated[activeTab])
      return updated
    })
  }

  const getNestedValue = (state: any, path: string[], defaultValue: any = "") => {
    let obj = state[activeTab]
    for (const key of path) {
      if (obj === undefined || obj === null) return defaultValue
      obj = obj[key]
    }
    return obj ?? defaultValue
  }

  const renderInput = (
    path: string[],
    label: string,
    type: "text" | "textarea" | "email" = "text",
    defaultValue = "",
  ) => {
    const tabContent = content[activeTab as keyof typeof content] as any

    const getValue = () => {
      let value = tabContent
      for (const key of path) {
        value = value?.[key]
      }
      const result = value || defaultValue
      return result
    }

    const setValue = (newValue: string) => {
      console.log("[v0] setValue çağrıldı:", { path, newValue })
      updateNestedValue(path, newValue)
    }

    if (type === "textarea") {
      return (
        <div className="space-y-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Textarea
            placeholder={label}
            value={getValue()}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      )
    }

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <Input placeholder={label} value={getValue()} onChange={(e) => setValue(e.target.value)} type={type} />
      </div>
    )
  }

  const renderIconPicker = (label: string, path: string[]) => {
    const availableIcons = [
      { name: "Home", icon: Home, label: "Ev" },
      { name: "Building", icon: Building, label: "Bina" },
      { name: "Landmark", icon: Landmark, label: "Anıt" },
      { name: "Hammer", icon: Hammer, label: "Çekiç" },
      { name: "Wrench", icon: Wrench, label: "Anahtar" },
      { name: "Package", icon: Package, label: "Paket" },
      { name: "Factory", icon: Factory, label: "Fabrika" },
      { name: "Warehouse", icon: Warehouse, label: "Depo" },
      { name: "Construction", icon: Construction, label: "İnşaat" },
    ]

    const currentIcon = getNestedValue(content, path) || "Home"

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="grid grid-cols-3 gap-2">
          {availableIcons.map(({ name, icon: Icon, label: iconLabel }) => (
            <button
              key={name}
              type="button"
              onClick={() => updateNestedValue(path, name)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:bg-accent",
                currentIcon === name ? "border-primary bg-primary/10" : "border-border bg-card",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{iconLabel}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderHomeEditor = () => (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Hero / Video Bölümü</h3>
        {renderInput(["video", "url"], "Video URL")}
        {renderInput(["video", "title"], "Hero Başlık")}
        {renderInput(["video", "subtitle"], "Hero Alt Başlık")}
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İstatistikler</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>{renderInput(["stats", "founded"], "Kuruluş Yılı")}</div>
          <div>{renderInput(["stats", "foundedLabel"], "Kuruluş Yılı Etiketi")}</div>
          <div>{renderInput(["stats", "employees"], "Çalışan Sayısı")}</div>
          <div>{renderInput(["stats", "employeesLabel"], "Çalışan Etiketi")}</div>
          <div>{renderInput(["stats", "completedProjects"], "Tamamlanan Proje")}</div>
          <div>{renderInput(["stats", "completedProjectsLabel"], "Proje Etiketi")}</div>
          <div>{renderInput(["stats", "experience"], "Tecrübe Yılı")}</div>
          <div>{renderInput(["stats", "experienceLabel"], "Tecrübe Etiketi")}</div>
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Deneyim Bölümü</h3>
        {renderInput(["experience", "title"], "Başlık")}
        {renderInput(["experience", "description"], "Açıklama", "textarea")}
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Çalışma Sürecimiz</h3>
        {renderInput(["process", "title"], "Başlık")}
        {renderInput(["process", "subtitle"], "Alt Başlık")}

        <div className="mt-4 space-y-4">
          <h4 className="font-medium text-sm">Adımlar</h4>
          {content.home?.process?.steps?.map((step: any, index: number) => (
            <Card key={index} className="p-4 bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">Adım {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newSteps = [...(content.home?.process?.steps || [])]
                    newSteps.splice(index, 1)
                    updateNestedValue(["process", "steps"], newSteps)
                  }}
                >
                  ✕
                </Button>
              </div>
              {renderInput(["process", "steps", index, "title"], "Başlık")}
              {renderInput(["process", "steps", index, "description"], "Açıklama", "textarea")}
            </Card>
          ))}
          <Button
            onClick={() => {
              const newSteps = [...(content.home?.process?.steps || []), { title: "", description: "" }]
              updateNestedValue(["process", "steps"], newSteps)
            }}
            className="w-full"
          >
            Adım Ekle
          </Button>
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Neden VIERA Construction?</h3>
        {renderInput(["whyUs", "title"], "Başlık")}

        <div className="mt-4 space-y-4">
          <h4 className="font-medium text-sm">Özellikler</h4>
          {content.home?.whyUs?.items?.map((item: any, index: number) => (
            <Card key={index} className="p-4 bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">Özellik {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newItems = [...(content.home?.whyUs?.items || [])]
                    newItems.splice(index, 1)
                    updateNestedValue(["whyUs", "items"], newItems)
                  }}
                >
                  ✕
                </Button>
              </div>
              {renderInput(["whyUs", "items", index, "title"], "Başlık")}
              {renderInput(["whyUs", "items", index, "description"], "Açıklama", "textarea")}
            </Card>
          ))}
          <Button
            onClick={() => {
              const newItems = [...(content.home?.whyUs?.items || []), { title: "", description: "" }]
              updateNestedValue(["whyUs", "items"], newItems)
            }}
            className="w-full"
          >
            Özellik Ekle
          </Button>
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İletişim Çağrısı (CTA)</h3>
        {renderInput(["cta", "title"], "Başlık")}
        {renderInput(["cta", "description"], "Açıklama", "textarea")}
      </Card>
    </div>
  )

  const renderAboutEditor = () => (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Firma Bilgileri</h3>
        {renderInput(["company", "name"], "Firma Adı")}
        {renderInput(["description"], "Firma Açıklaması", "textarea")}
        {renderInput(["certificate"], "Belge (örn: D Sınıfı Müteahhitlik Belgesi)")}
        {renderInput(["certificateDescription"], "Belge Açıklaması", "textarea")}

        <div className="space-y-2 mt-4">
          <Label className="text-sm font-medium">Ofis Görseli</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Görsel URL"
              value={content.about?.officeImage || ""}
              onChange={(e) => {
                setContent({
                  ...content,
                  about: { ...content.about, officeImage: e.target.value },
                })
              }}
              className="flex-1"
            />
            <Button
              onClick={async () => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "image/*"
                input.onchange = async (e: any) => {
                  const file = e.target?.files?.[0]
                  if (file) {
                    setIsUploading(true)
                    try {
                      const formData = new FormData()
                      formData.append("file", file)
                      const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      })
                      const data = await response.json()
                      if (data.url) {
                        setContent({
                          ...content,
                          about: { ...content.about, officeImage: data.url },
                        })
                      }
                    } catch (error) {
                      console.error("Upload error:", error)
                    } finally {
                      setIsUploading(false)
                    }
                  }
                }
                input.click()
              }}
              disabled={isUploading}
            >
              {isUploading ? "Yükleniyor..." : "Yükle"}
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Not:</strong> Adres, yetkili kişi ve telefon bilgileri için <strong>İletişim</strong> sekmesini
            kullanın. İletişim sayfasından güncellemeniz halinde bu kısım otomatik olarak güncellenecektir.
          </p>
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">İstatistikler</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderInput(["stats", "founded"], "Kuruluş Yılı")}
          {renderInput(["stats", "foundedLabel"], "Kuruluş Yılı Etiketi")}
          {renderInput(["stats", "employees"], "Çalışan Sayısı")}
          {renderInput(["stats", "employeesLabel"], "Çalışan Sayısı Etiketi")}
          {renderInput(["stats", "completedProjects"], "Tamamlanan Proje")}
          {renderInput(["stats", "completedProjectsLabel"], "Tamamlanan Proje Etiketi")}
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Vizyon</h3>
        {renderInput(["vision", "title"], "Başlık")}
        {renderInput(["vision", "description"], "Açıklama", "textarea")}
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Misyon</h3>
        {renderInput(["mission", "title"], "Başlık")}
        {renderInput(["mission", "description"], "Açıklama", "textarea")}
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Değerler</h3>
        {renderInput(["values", "title"], "Başlık")}
        {renderInput(["values", "description"], "Açıklama", "textarea")}
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Neden VIERA Construction?</h3>
          <Button
            onClick={() => {
              const currentItems = content.about?.whyUs?.items || []
              setContent({
                ...content,
                about: {
                  ...content.about,
                  whyUs: {
                    ...content.about?.whyUs,
                    items: [...currentItems, { title: "", description: "" }],
                  },
                },
              })
            }}
            size="sm"
          >
            Ekle
          </Button>
        </div>
        {renderInput(["whyUs", "title"], "Başlık")}
        <div className="space-y-4 mt-4">
          {(content.about?.whyUs?.items || []).map((item: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">Özellik {index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newItems = (content.about?.whyUs?.items || []).filter((_: any, i: number) => i !== index)
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        whyUs: { ...content.about?.whyUs, items: newItems },
                      },
                    })
                  }}
                >
                  X
                </Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Başlık"
                  value={item.title || ""}
                  onChange={(e) => {
                    const newItems = [...(content.about?.whyUs?.items || [])]
                    newItems[index] = { ...newItems[index], title: e.target.value }
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        whyUs: { ...content.about?.whyUs, items: newItems },
                      },
                    })
                  }}
                />
                <Textarea
                  placeholder="Açıklama"
                  value={item.description || ""}
                  onChange={(e) => {
                    const newItems = [...(content.about?.whyUs?.items || [])]
                    newItems[index] = { ...newItems[index], description: e.target.value }
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        whyUs: { ...content.about?.whyUs, items: newItems },
                      },
                    })
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderServicesEditor = () => {
    const services = Array.isArray(content.services?.services) ? content.services.services : []

    const addService = () => {
      const newService = {
        id: `service-${Date.now()}`,
        icon: "Home",
        title: "Yeni Hizmet",
        description: "Hizmet açıklaması",
        items: [],
      }

      setContent((prev) => {
        const currentServices = Array.isArray(prev.services?.services) ? prev.services.services : []
        const updatedServices = [...currentServices, newService]

        setTimeout(() => {
          const containerRef = servicesContainerRef.current[updatedServices.length - 1]
          if (containerRef) {
            containerRef.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)

        return {
          ...prev,
          services: {
            ...prev.services,
            services: updatedServices,
          },
        }
      })
    }

    const deleteService = (index: number) => {
      setContent((prev) => {
        const currentServices = Array.isArray(prev.services?.services) ? prev.services.services : []
        const updatedServices = currentServices.filter((_: any, i: number) => i !== index)
        return {
          ...prev,
          services: {
            ...prev.services,
            services: updatedServices,
          },
        }
      })
    }

    const updateService = (index: number, field: string, value: any) => {
      setContent((prev) => {
        const currentServices = Array.isArray(prev.services?.services) ? [...prev.services.services] : []
        currentServices[index] = {
          ...currentServices[index],
          [field]: value,
        }
        return {
          ...prev,
          services: {
            ...prev.services,
            services: currentServices,
          },
        }
      })
    }

    const addServiceItem = (serviceIndex: number) => {
      const service = services[serviceIndex]
      const items = [...(service.items || []), { title: "", description: "" }]
      updateService(serviceIndex, "items", items)
    }

    const deleteServiceItem = (serviceIndex: number, itemIndex: number) => {
      const service = services[serviceIndex]
      const items = [...(service.items || [])]
      items.splice(itemIndex, 1)
      updateService(serviceIndex, "items", items)
    }

    return (
      <div className="space-y-4">
        {renderInput(["intro", "badge"], "Hizmetler Badge", "text", "Hizmetlerimiz")}
        {renderInput(["intro", "title"], "Hizmetler Başlığı", "text", "İnşaat ve Yapı Çözümleri")}
        {renderInput(
          ["intro", "description"],
          "Hizmetler Açıklaması",
          "textarea",
          "Konut projelerinden ticari binalara...",
        )}

        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hizmetler</h3>
            <Button onClick={addService}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Hizmet Ekle
            </Button>
          </div>

          <div className="space-y-4">
            {services.map((service: any, index: number) => (
              <div
                key={index}
                ref={(el) => (servicesContainerRef.current[index] = el)}
                className="bg-card rounded-xl p-6 border space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{service.title || `Hizmet ${index + 1}`}</h4>
                  <Button variant="destructive" size="sm" onClick={() => deleteService(index)}>
                    <X className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>İkon</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Home",
                      "Building",
                      "Landmark",
                      "Hammer",
                      "Key",
                      "Package",
                      "Factory",
                      "Warehouse",
                      "Construction",
                    ].map((iconName) => {
                      const IconComponent = iconMap[iconName]
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => updateService(index, "icon", iconName)}
                          className={`flex flex-col items-center gap-2 p-3 border rounded-lg transition-colors ${
                            service.icon === iconName
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:bg-accent"
                          }`}
                        >
                          <IconComponent className="h-6 w-6" />
                          <span className="text-xs">{iconName}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hizmet Başlığı</Label>
                  <Input
                    value={service.title || ""}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    placeholder="Konut Projeleri"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hizmet Açıklaması</Label>
                  <Textarea
                    value={service.description || ""}
                    onChange={(e) => updateService(index, "description", e.target.value)}
                    placeholder="Modern yaşam alanları..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Alt Hizmetler</Label>
                    <Button size="sm" variant="outline" onClick={() => addServiceItem(index)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Ekle
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {(service.items || []).map((item: any, itemIndex: number) => (
                      <div key={itemIndex} className="p-3 border rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm">Alt Hizmet {itemIndex + 1}</Label>
                          <Button variant="ghost" size="sm" onClick={() => deleteServiceItem(index, itemIndex)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          value={item.title || ""}
                          onChange={(e) => {
                            const items = [...(service.items || [])]
                            items[itemIndex] = { ...items[itemIndex], title: e.target.value }
                            updateService(index, "items", items)
                          }}
                          placeholder="Lüks Konut Projeleri"
                        />
                        <Textarea
                          value={item.description || ""}
                          onChange={(e) => {
                            const items = [...(service.items || [])]
                            items[itemIndex] = { ...items[itemIndex], description: e.target.value }
                            updateService(index, "items", items)
                          }}
                          placeholder="Yüksek standartlarda..."
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold mb-4">CTA Bölümü</h3>
          {renderInput(["cta", "title"], "CTA Başlığı", "text", "Projeniz İçin Bizimle İletişime Geçin")}
          {renderInput(["cta", "description"], "CTA Açıklaması", "textarea", "60 yılı aşkın deneyimimiz...")}
        </div>
      </div>
    )
  }

  const renderProjectsEditor = () => {
    const projectsData = content.projects || { completed: [], ongoing: [], upcoming: [] }

    const addProject = (category: "completed" | "ongoing" | "upcoming") => {
      const newProject: Project = {
        id: `project-${Date.now()}`,
        slug: `yeni-proje-${Date.now()}`,
        title: "Yeni Proje",
        shortDescription: "Kısa açıklama",
        fullDescription: "Detaylı proje açıklaması buraya gelecek",
        year: new Date().getFullYear().toString(),
        location: "İstanbul",
        area: "5.000 m²",
        units: "40 Daire",
        floors: "8 Kat",
        status: category,
        mainImage: "/construction-site-overview.png",
        gallery: [],
        features: [],
        progress: category === "ongoing" ? 0 : undefined,
        updates: [],
      }

      setContent((prev) => {
        const currentProjects = prev.projects || { completed: [], ongoing: [], upcoming: [] }
        const updatedProjects = {
          ...currentProjects,
          [category]: [...(currentProjects[category] || []), newProject],
        }

        setTimeout(() => {
          const containerRef = projectsContainerRef.current[`${category}-${updatedProjects[category].length - 1}`]
          if (containerRef) {
            containerRef.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 100)

        return { ...prev, projects: updatedProjects }
      })
    }

    const deleteProject = (category: string, index: number) => {
      setContent((prev) => {
        const categoryProjects = [...(prev.projects[category] || [])]
        categoryProjects.splice(index, 1)
        return {
          ...prev,
          projects: {
            ...prev.projects,
            [category]: categoryProjects,
          },
        }
      })
    }

    const updateProjectField = (category: string, index: number, field: string, value: any) => {
      setContent((prev) => {
        const categoryProjects = [...(prev.projects[category] || [])]
        if (field === "title") {
          categoryProjects[index] = {
            ...categoryProjects[index],
            [field]: value,
            slug: generateSlug(value),
          }
        } else {
          categoryProjects[index] = {
            ...categoryProjects[index],
            [field]: value,
          }
        }
        return {
          ...prev,
          projects: {
            ...prev.projects,
            [category]: categoryProjects,
          },
        }
      })
    }

    const renderProjectCard = (project: Project, category: string, index: number) => {
      const uploadKey = `${category}-${index}`

      return (
        <div
          ref={(el) => (projectsContainerRef.current[`${category}-${index}`] = el)}
          className="bg-card rounded-xl p-6 border space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">{project.title || `Proje ${index + 1}`}</h4>
            <Button variant="destructive" size="sm" onClick={() => deleteProject(category, index)}>
              <X className="h-4 w-4 mr-1" />
              Sil
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Proje Başlığı *</Label>
              <Input
                value={project.title || ""}
                onChange={(e) => updateProjectField(category, index, "title", e.target.value)}
                placeholder="Proje adı"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input value={project.slug || ""} disabled className="bg-muted" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Kısa Açıklama *</Label>
            <Input
              value={project.shortDescription || ""}
              onChange={(e) => updateProjectField(category, index, "shortDescription", e.target.value)}
              placeholder="Özet açıklama (liste sayfasında görünür)"
            />
          </div>

          <div className="space-y-2">
            <Label>Detaylı Açıklama *</Label>
            <Textarea
              value={project.fullDescription || ""}
              onChange={(e) => updateProjectField(category, index, "fullDescription", e.target.value)}
              placeholder="Proje hakkında detaylı bilgi"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Lokasyon *</Label>
              <Input
                value={project.location || ""}
                onChange={(e) => updateProjectField(category, index, "location", e.target.value)}
                placeholder="İstanbul, Üsküdar"
              />
            </div>
            <div className="space-y-2">
              <Label>{category === "completed" ? "Tamamlanma Yılı" : "Planlanan Yıl"} *</Label>
              <Input
                value={project.year || ""}
                onChange={(e) => updateProjectField(category, index, "year", e.target.value)}
                placeholder="2025"
              />
            </div>
            <div className="space-y-2">
              <Label>Alan</Label>
              <Input
                value={project.area || ""}
                onChange={(e) => updateProjectField(category, index, "area", e.target.value)}
                placeholder="6.200 m²"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Birim Sayısı</Label>
              <Input
                value={project.units || ""}
                onChange={(e) => updateProjectField(category, index, "units", e.target.value)}
                placeholder="38 Daire"
              />
            </div>
            <div className="space-y-2">
              <Label>Kat Sayısı</Label>
              <Input
                value={project.floors || ""}
                onChange={(e) => updateProjectField(category, index, "floors", e.target.value)}
                placeholder="8 Kat"
              />
            </div>
          </div>

          {category === "ongoing" && (
            <div className="space-y-2">
              <Label>İlerleme Durumu (0-100)</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={project.progress || 0}
                  onChange={(e) =>
                    updateProjectField(category, index, "progress", Number.parseInt(e.target.value) || 0)
                  }
                  min="0"
                  max="100"
                  className="w-24"
                />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${project.progress || 0}%` }} />
                </div>
                <span className="text-sm text-muted-foreground">%{project.progress || 0}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Ana Görsel</Label>
            <div className="space-y-2">
              {project.mainImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={project.mainImage || "/placeholder.svg"}
                    alt="Ana görsel"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={project.mainImage || ""}
                  onChange={(e) => updateProjectField(category, index, "mainImage", e.target.value)}
                  placeholder="Görsel URL'si veya yükle butonu ile seç"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const uploadKey = `${category}-${index}-main`
                    handleImageUpload(["projects", category, index.toString(), "mainImage"], uploadKey)
                  }}
                  disabled={isUploading}
                >
                  {isUploading && uploadProgress[`${category}-${index}-main`] !== undefined
                    ? "Yükleniyor..."
                    : "Görsel Yükle"}
                </Button>
              </div>
              {uploadProgress[`${category}-${index}-main`] !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Yükleniyor...</span>
                    <span>{uploadProgress[`${category}-${index}-main`]}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${uploadProgress[`${category}-${index}-main`]}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Proje Özellikleri</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const features = [...(project.features || []), ""]
                  updateProjectField(category, index, "features", features)
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Özellik Ekle
              </Button>
            </div>
            <div className="space-y-2">
              {(project.features || []).map((feature: string, fIdx: number) => (
                <div key={fIdx} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => {
                      const features = [...(project.features || [])]
                      features[fIdx] = e.target.value
                      updateProjectField(category, index, "features", features)
                    }}
                    placeholder="Kentsel dönüşüm projesi"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const features = [...(project.features || [])]
                      features.splice(fIdx, 1)
                      updateProjectField(category, index, "features", features)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Proje Galerisi</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const gallery = [...(project.gallery || []), "/art-gallery.png"]
                  updateProjectField(category, index, "gallery", gallery)
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Görsel Ekle
              </Button>
            </div>
            <div className="space-y-4">
              {(project.gallery || []).map((imgUrl: string, imgIndex: number) => (
                <div key={imgIndex} className="space-y-2">
                  {imgUrl && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-border">
                      <img
                        src={imgUrl || "/placeholder.svg"}
                        alt={`Galeri ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={imgUrl}
                      onChange={(e) => {
                        const newGallery = [...(project.gallery || [])]
                        newGallery[imgIndex] = e.target.value
                        updateProjectField(category, index, "gallery", newGallery)
                      }}
                      placeholder={`Galeri görseli ${imgIndex + 1} URL'si`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const uploadKey = `${category}-${index}-gallery-${imgIndex}`
                        handleImageUpload(
                          ["projects", category, index.toString(), "gallery", imgIndex.toString()],
                          uploadKey,
                        )
                      }}
                      disabled={isUploading}
                    >
                      {uploadProgress[`${category}-${index}-gallery-${imgIndex}`] !== undefined
                        ? "Yükleniyor..."
                        : "Yükle"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newGallery = (project.gallery || []).filter((_: any, i: number) => i !== imgIndex)
                        updateProjectField(category, index, "gallery", newGallery)
                      }}
                    >
                      Sil
                    </Button>
                  </div>
                  {uploadProgress[`${category}-${index}-gallery-${imgIndex}`] !== undefined && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Yükleniyor...</span>
                        <span>{uploadProgress[`${category}-${index}-gallery-${imgIndex}`]}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${uploadProgress[`${category}-${index}-gallery-${imgIndex}`]}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newGallery = [...(project.gallery || []), ""]
                  updateProjectField(category, index, "gallery", newGallery)
                }}
                variant="outline"
                size="sm"
              >
                + Galeri Görseli Ekle
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Proje Güncellemeleri</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const updates = [...(project.updates || []), { date: "", title: "", description: "" }]
                  updateProjectField(category, index, "updates", updates)
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                Güncelleme Ekle
              </Button>
            </div>
            <div className="space-y-3">
              {(project.updates || []).map((update: any, uIdx: number) => (
                <div key={uIdx} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm">Güncelleme {uIdx + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updates = [...(project.updates || [])]
                        updates.splice(uIdx, 1)
                        updateProjectField(category, index, "updates", updates)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={update.date || ""}
                    onChange={(e) => {
                      const updates = [...(project.updates || [])]
                      updates[uIdx] = { ...updates[uIdx], date: e.target.value }
                      updateProjectField(category, index, "updates", updates)
                    }}
                    placeholder="Tarih (örn: 15 Aralık 2024)"
                  />
                  <Input
                    value={update.title || ""}
                    onChange={(e) => {
                      const updates = [...(project.updates || [])]
                      updates[uIdx] = { ...updates[uIdx], title: e.target.value }
                      updateProjectField(category, index, "updates", updates)
                    }}
                    placeholder="Güncelleme başlığı"
                  />
                  <Textarea
                    value={update.description || ""}
                    onChange={(e) => {
                      const updates = [...(project.updates || [])]
                      updates[uIdx] = { ...updates[uIdx], description: e.target.value }
                      updateProjectField(category, index, "updates", updates)
                    }}
                    placeholder="Güncelleme açıklaması"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Tamamlanmış Projeler
          </h3>
          <Button className="mb-4" onClick={() => addProject("completed")}>
            <Plus className="h-4 w-4 mr-2" />
            Tamamlanmış Proje Ekle
          </Button>
          <div className="space-y-4">
            {(projectsData.completed || []).map((project: Project, index: number) =>
              renderProjectCard(project, "completed", index),
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Devam Eden Projeler
          </h3>
          <Button className="mb-4" onClick={() => addProject("ongoing")}>
            <Plus className="h-4 w-4 mr-2" />
            Devam Eden Proje Ekle
          </Button>
          <div className="space-y-4">
            {(projectsData.ongoing || []).map((project: Project, index: number) =>
              renderProjectCard(project, "ongoing", index),
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-500" />
            Başlayacak Projeler
          </h3>
          <Button className="mb-4" onClick={() => addProject("upcoming")}>
            <Plus className="h-4 w-4 mr-2" />
            Başlayacak Proje Ekle
          </Button>
          <div className="space-y-4">
            {(projectsData.upcoming || []).map((project: Project, index: number) =>
              renderProjectCard(project, "upcoming", index),
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderContactEditor = () => (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-6 border">
        <h3 className="text-lg font-semibold text-primary mb-4">Temel İletişim Bilgileri</h3>
        <div className="space-y-4">
          {renderInput(["phone"], "Telefon", "text", "0216 391 49 40")}
          {renderInput(["fax"], "Faks", "text", "0216 310 90 74")}
          {renderInput(["mobile"], "Mobil", "text", "0533 479 83 87")}
          {renderInput(["whatsapp"], "WhatsApp Numarası (905334798387 formatında)", "text", "905334798387")}
          {renderInput(["email"], "E-posta", "email", "info@alkanyapi.com.tr")}
          {renderInput(["address"], "Adres", "textarea", "")}
          {renderInput(["mapUrl"], "Google Maps Embed URL", "textarea", "https://www.google.com/maps/embed?pb=...")}
        </div>
        <div className="mt-4 p-3 bg-muted/50 rounded border text-sm text-muted-foreground">
          <p className="font-medium mb-1">Google Maps URL Nasıl Alınır?</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Google Maps'te konumunuzu bulun</li>
            <li>"Paylaş" butonuna tıklayın</li>
            <li>"Harita yerleştir" sekmesini seçin</li>
            <li>HTML kodundan src="..." içindeki URL'yi kopyalayın</li>
          </ol>
        </div>
      </Card>

      <Card className="bg-card rounded-xl p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Yetkili Kişiler</h3>
          <Button
            onClick={() => {
              const team = (content.contact as any)?.team || []
              setContent((prev) => ({
                ...prev,
                contact: {
                  ...(prev.contact as any),
                  team: [
                    ...team,
                    {
                      name: "",
                      title: "",
                      icon: "User",
                      phone: "",
                    },
                  ],
                },
              }))
            }}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ekle
          </Button>
        </div>
        <div className="space-y-4">
          {((content.contact as any)?.team || []).map((person: any, index: number) => (
            <Card key={index} className="p-4 bg-muted/30 border">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-sm">Yetkili {index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const team = (content.contact as any)?.team || []
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...(prev.contact as any),
                        team: team.filter((_: any, i: number) => i !== index),
                      },
                    }))
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">İkon Seç</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["User", "Phone", "Mail", "Briefcase"].map((iconName) => {
                      const Icon =
                        iconName === "User"
                          ? Users
                          : iconName === "Phone"
                            ? Phone
                            : iconName === "Mail"
                              ? Mail
                              : Briefcase
                      const isSelected = person.icon === iconName
                      return (
                        <button
                          key={iconName}
                          onClick={() => {
                            const team = (content.contact as any)?.team || []
                            const updated = [...team]
                            updated[index] = { ...updated[index], icon: iconName }
                            setContent((prev) => ({
                              ...prev,
                              contact: {
                                ...(prev.contact as any),
                                team: updated,
                              },
                            }))
                          }}
                          className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:border-primary/50 text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </button>
                      )
                    })}
                  </div>
                </div>
                <Input
                  placeholder="İsim"
                  value={person.name || ""}
                  onChange={(e) => {
                    const team = (content.contact as any)?.team || []
                    const updated = [...team]
                    updated[index] = { ...updated[index], name: e.target.value }
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...(prev.contact as any),
                        team: updated,
                      },
                    }))
                  }}
                />
                <Input
                  placeholder="Unvan"
                  value={person.title || ""}
                  onChange={(e) => {
                    const team = (content.contact as any)?.team || []
                    const updated = [...team]
                    updated[index] = { ...updated[index], title: e.target.value }
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...(prev.contact as any),
                        team: updated,
                      },
                    }))
                  }}
                />
                <Input
                  placeholder="Telefon"
                  value={person.phone || ""}
                  onChange={(e) => {
                    const team = (content.contact as any)?.team || []
                    const updated = [...team]
                    updated[index] = { ...updated[index], phone: e.target.value }
                    setContent((prev) => ({
                      ...prev,
                      contact: {
                        ...(prev.contact as any),
                        team: updated,
                      },
                    }))
                  }}
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )

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
              <p className="text-primary-foreground/80">VIERA Construction</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Şifre</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Şifrenizi girin"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Giriş Yap
              </Button>
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
              <Button
                onClick={() => {
                  setAuthenticated(false)
                  setPassword("")
                  router.push("/")
                }}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20"
              >
                Çıkış Yap
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value as ContentType)
              loadContent(value as ContentType)
            }}
          >
            <TabsList className="flex border-b bg-muted/30">
              {[
                { id: "home", label: "Anasayfa", icon: Home },
                { id: "about", label: "Hakkımızda", icon: Users },
                { id: "services", label: "Hizmetler", icon: Briefcase },
                { id: "projects", label: "Projeler", icon: Building2 },
                { id: "contact", label: "İletişim", icon: Mail },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

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
                <Button
                  onClick={() => handleSave()}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-medium rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  <Save className="h-5 w-5" />
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
