"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Menü açıldığında sayfanın kaydırılmasını engelle
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ""
  }

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.includes(path)) return true
    return false
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white dark:bg-zinc-900 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeMenu}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] space-y-8 px-6">
          <Link
            href="/"
            className={`text-lg font-medium ${isActive("/") && pathname === "/" ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"} hover:text-zinc-900 dark:hover:text-white transition-colors`}
            onClick={closeMenu}
          >
            Anasayfa
          </Link>
          <Link
            href="/hizmetlerimiz"
            className={`text-lg font-medium ${pathname.includes("hizmetlerimiz") ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"} hover:text-zinc-900 dark:hover:text-white transition-colors`}
            onClick={closeMenu}
          >
            Hizmetlerimiz
          </Link>
          <Link
            href="/hakkimizda"
            className={`text-lg font-medium ${isActive("/hakkimizda") ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"} hover:text-zinc-900 dark:hover:text-white transition-colors`}
            onClick={closeMenu}
          >
            Hakkımızda
          </Link>
          <Link
            href="/projeler"
            className={`text-lg font-medium ${isActive("/projeler") ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"} hover:text-zinc-900 dark:hover:text-white transition-colors`}
            onClick={closeMenu}
          >
            Projeler
          </Link>
          <Link
            href="/#contact"
            className={`text-lg font-medium ${isActive("/#contact") ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"} hover:text-zinc-900 dark:hover:text-white transition-colors`}
            onClick={closeMenu}
          >
            İletişim
          </Link>

          <Button variant="default" size="lg" className="mt-8 btn-standard btn-outline w-full">
            <Phone className="mr-2 h-4 w-4" /> 0536 436 4242
          </Button>
        </div>
      </div>
    </div>
  )
}
