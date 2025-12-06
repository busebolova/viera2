import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim | VIERA Construction",
  description: "VIERA Construction ile iletişime geçin. Adres, telefon ve e-posta bilgilerimiz.",
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
