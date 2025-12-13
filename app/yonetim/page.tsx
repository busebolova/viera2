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
  CheckCircle2,
} from "lucide-react"

type ContentType = "home" | "about" | "services" | "projects" | "contact"

const AdminPanel = () => {
  const router = useRouter()

  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState<ContentType>("home")

  const [content, setContent] = useState<any>({
    home: {},
    about: {},
    services: {},
    projects: {},
    contact: {},
  })

  const [previewContent, setPreviewContent] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true"
    setAuthenticated(isAuth)
    if (isAuth) loadContent("home")
  }, [])

  const handleLogin = () => {
    if (password === "viera2025") {
      setAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      loadContent("home")
    }
  }

  const loadContent = async (file: ContentType) => {
    const res = await fetch(`/api/github/content?file=${file}`, { cache: "no-store" })
    const data = await res.json()
    setContent((p: any) => ({ ...p, [file]: data }))
    setPreviewContent(data)
  }

  const updateNestedValue = (path: string[], value: any) => {
    setContent((prev: any) => {
      const updated = structuredClone(prev)
      let obj = updated[activeTab]

      for (let i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]]) obj[path[i]] = {}
        obj = obj[path[i]]
      }

      obj[path[path.length - 1]] = value
      setPreviewContent(updated[activeTab])

      return updated
    })
  }

  const handleSave = async () => {
    setSaving(true)
    await fetch(`/api/github/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: activeTab,
        content: content[activeTab],
      }),
    })
    setSaving(false)
    setMessage("✅ Kaydedildi")
  }

  const renderInput = (path: string[], label: string) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        value={path.reduce((a, c) => a?.[c], content[activeTab]) || ""}
        onChange={(e) => updateNestedValue(path, e.target.value)}
      />
    </div>
  )

  const renderHomeEditor = () => (
    <div className="space-y-6">
      <Card className="p-6">
        {renderInput(["video", "title"], "Hero Başlık")}
        {renderInput(["video", "subtitle"], "Hero Alt Başlık")}
        {renderInput(["video", "url"], "Görsel / Video URL")}
      </Card>

      {/* 🔴 ANLIK ÖNİZLEME */}
      <Card className="p-6 border border-dashed bg-muted/30">
        <h3 className="font-semibold mb-3">Anlık Önizleme</h3>

        <p className="text-2xl font-bold">
          {previewContent?.video?.title}
        </p>
        <p className="text-muted-foreground">
          {previewContent?.video?.subtitle}
        </p>

        {previewContent?.video?.url && (
          <div className="mt-4 h-48 overflow-hidden rounded border">
            <img
              src={previewContent.video.url}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Card>
    </div>
  )

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 w-[400px]">
          <Label>Şifre</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full mt-4">
            Giriş Yap
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v as ContentType)
          loadContent(v as ContentType)
        }}
      >
        <TabsList>
          <TabsTrigger value="home">Anasayfa</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="services">Hizmetler</TabsTrigger>
          <TabsTrigger value="projects">Projeler</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
        </TabsList>

        <div className="mt-6">{renderHomeEditor()}</div>

        <div className="mt-6">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            Kaydet
          </Button>
          {message && <p className="mt-2">{message}</p>}
        </div>
      </Tabs>
    </div>
  )
}

export default AdminPanel
