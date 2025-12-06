import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projeler | VIERA Construction",
  description: "VIERA Construction tarafından tamamlanan ve devam eden projeler.",
}

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
