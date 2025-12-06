import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hizmetlerimiz | VIERA - Alkan Yapı & Viera Ortaklığı",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı tarafından sunulan konut, ticari ve karma kullanımlı inşaat projeleri.",
}

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
