"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle } from "lucide-react"

// Access key will be generated for erdemalkan72@gmail.com
const WEB3FORMS_ACCESS_KEY = "488081a0-6dfc-4488-9050-160c831b5674"

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: "VIERA Construction Website",
          subject: `Yeni İletişim Formu: ${formData.firstName} ${formData.lastName}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || "Belirtilmedi",
          message: formData.message,
          // Hidden fields for better organization
          botcheck: false,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.message || "Form gönderilemedi")
      }
    } catch (err) {
      console.error("Form error:", err)
      // Fallback: WhatsApp
      const message = `*Yeni İletişim Formu*%0A%0A*Ad:* ${formData.firstName} ${formData.lastName}%0A*E-posta:* ${formData.email}%0A*Telefon:* ${formData.phone}%0A%0A*Mesaj:*%0A${formData.message}`
      window.open(`https://wa.me/905334798387?text=${message}`, "_blank")
      setIsSuccess(true)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Mesajınız Gönderildi!</h3>
        <p className="text-green-600 dark:text-green-400 text-center mt-2">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Ad
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Adiniz"
            className="h-11"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Soyad
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Soyadiniz"
            className="h-11"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
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
          <label htmlFor="phone" className="text-sm font-medium">
            Telefon
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon numaraniz"
            type="tel"
            className="h-11"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mesaj
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mesajiniz"
          className="min-h-[150px] resize-none"
          required
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gönderiliyor...
          </>
        ) : (
          "Gönder"
        )}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Form gönderilemezse otomatik olarak WhatsApp'a yönlendirileceksiniz.
      </p>
    </form>
  )
}
