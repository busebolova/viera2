"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // WhatsApp mesaj formatını oluştur
    const message = `*Yeni İletişim Formu*%0A%0A*Ad:* ${formData.firstName}%0A*Soyad:* ${formData.lastName}%0A*E-posta:* ${formData.email}%0A%0A*Mesaj:*%0A${formData.message}`

    // WhatsApp URL'sini oluştur
    const whatsappUrl = `https://wa.me/905364364242?text=${message}`

    // Yeni sekmede WhatsApp'ı aç
    window.open(whatsappUrl, "_blank")

    // Form durumunu sıfırla
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Ad
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Adınız"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Soyad
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Soyadınız"
            className="h-11"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          E-posta
        </label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-posta adresiniz"
          type="email"
          className="h-11"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Mesaj
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mesajınız"
          className="min-h-[150px] resize-none"
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full btn-standard btn-dark" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gönderiliyor...
          </>
        ) : (
          "Gönder"
        )}
      </Button>
    </form>
  )
}
