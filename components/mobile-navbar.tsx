"use client"

import Link from "next/link"
import { Home, Briefcase, Building, ImageIcon, Phone } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function MobileNavbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    if (!mounted) return false
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.includes(path)) return true
    return false
  }

  return (
    <>
      {/* Alt Navigasyon Çubuğu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/") && pathname === "/" ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Anasayfa</span>
          </Link>
          <Link
            href="/hizmetlerimiz"
            className={`flex flex-col items-center justify-center w-full h-full ${
              pathname.includes("hizmetlerimiz") ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs mt-1">Hizmetler</span>
          </Link>
          <Link
            href="/hakkimizda"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/hakkimizda") ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            <Building className="h-5 w-5" />
            <span className="text-xs mt-1">Hakkımızda</span>
          </Link>
          <Link
            href="/projeler"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/projeler") ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Projeler</span>
          </Link>
          <Link
            href="/iletisim"
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive("/iletisim") ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs mt-1">İletişim</span>
          </Link>
        </div>
      </div>
    </>
  )
}
