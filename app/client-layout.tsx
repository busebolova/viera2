"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Sun, Moon, Home, Briefcase, Info, FolderOpen, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [contactInfo, setContactInfo] = useState({
    phone: "0216 391 49 40",
    mobile: "0533 479 83 87",
    whatsapp: "905334798387",
  })

  useEffect(() => {
    setMounted(true)

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    fetch("/data/contact.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.phone) {
          setContactInfo({
            phone: data.phone,
            mobile: data.mobile || data.phone,
            whatsapp: data.whatsapp || "905334798387",
          })
        }
      })
      .catch(() => {})

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const isDark = resolvedTheme === "dark"

  const isActive = (path: string) => {
    if (!mounted) return false
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { href: "/", label: "Anasayfa", icon: Home },
    { href: "/hizmetlerimiz", label: "Hizmetlerimiz", icon: Briefcase },
    { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
    { href: "/projeler", label: "Projeler", icon: FolderOpen },
    { href: "/iletisim", label: "İletişim", icon: Mail },
  ]

  const colors = {
    headerBg: isDark ? "#18181b" : "#ffffff",
    headerBorder: isDark ? "#27272a" : "#e5e7eb",
    textPrimary: isDark ? "#fafafa" : "#18181b",
    textSecondary: isDark ? "#a1a1aa" : "#52525b",
    buttonBg: isDark ? "#fafafa" : "#18181b",
    buttonText: isDark ? "#18181b" : "#ffffff",
    bottomNavBg: isDark ? "#18181b" : "#ffffff",
    bottomNavActive: isDark ? "#fafafa" : "#18181b",
    bottomNavInactive: isDark ? "#71717a" : "#a1a1aa",
  }

  if (!mounted) {
    return (
      <>
        <div style={{ height: "80px" }} />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <WhatsAppButton />
      </>
    )
  }

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          width: "100%",
          backgroundColor: colors.headerBg,
          borderBottom: `1px solid ${colors.headerBorder}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
            height: "80px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src={isDark ? "/darklogo.png" : "/logo.png"}
              alt="VIERA Construction Logo"
              width={180}
              height={72}
              style={{ height: "56px", width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          {isDesktop && (
            <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    fontWeight: isActive(item.href) ? 600 : 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: isActive(item.href) ? colors.textPrimary : colors.textSecondary,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: `1px solid ${colors.headerBorder}`,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.textPrimary,
                }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "40px",
                  padding: "0 16px",
                  backgroundColor: colors.buttonBg,
                  color: colors.buttonText,
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                <Phone size={16} /> {contactInfo.phone}
              </a>
            </div>
          )}

          {/* Mobile Header Actions */}
          {!isDesktop && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: `1px solid ${colors.headerBorder}`,
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.textPrimary,
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* Header Spacer */}
      <div style={{ height: "80px" }} aria-hidden="true" />

      {/* Main Content */}
      <main style={{ minHeight: "100vh", paddingBottom: isDesktop ? 0 : "80px" }}>{children}</main>

      {/* Footer - hide on mobile */}
      {isDesktop && (
        <footer
          style={{
            width: "100%",
            borderTop: "1px solid #27272a",
            padding: "2rem 0 3rem",
            backgroundColor: "#18181b",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <Image
                    src="/darklogo.png"
                    alt="VIERA Construction"
                    width={200}
                    height={80}
                    style={{ height: "auto", width: "180px" }}
                  />
                </div>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6 }}>
                  VIERA - Alkan Yapı & Viera Ortaklığı ile 60 yılı aşkın deneyimle konut ve iş yeri üretimi.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "1rem" }}>Hızlı Bağlantılar</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {navLinks.slice(1).map((item) => (
                    <li key={item.href} style={{ marginBottom: "8px" }}>
                      <Link href={item.href} style={{ color: "#a1a1aa", textDecoration: "none", fontSize: "14px" }}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "1rem" }}>İletişim</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#a1a1aa", fontSize: "14px" }}>
                  <li style={{ marginBottom: "8px" }}>Tel: {contactInfo.phone}</li>
                  <li style={{ marginBottom: "8px" }}>Mobil: {contactInfo.mobile}</li>
                  <li style={{ marginBottom: "8px" }}>Email: info@alkanyapi.com.tr</li>
                  <li>Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul</li>
                </ul>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #27272a",
                paddingTop: "1.5rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
                © 2025 VIERA - Alkan Yapı & Viera Ortaklığı. Tüm hakları saklıdır.
              </p>
              <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
                Tasarım & Yazılım:{" "}
                <a
                  href="https://rettocreative.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#d4d4d8", textDecoration: "none" }}
                >
                  rettocreative.net
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Bottom Navigation */}
      {!isDesktop && (
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: colors.bottomNavBg,
            borderTop: `1px solid ${colors.headerBorder}`,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "70px",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {navLinks.map((item) => {
            const IconComponent = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "8px 12px",
                  textDecoration: "none",
                  color: active ? colors.bottomNavActive : colors.bottomNavInactive,
                  transition: "color 0.2s",
                }}
              >
                <IconComponent size={22} strokeWidth={active ? 2.5 : 2} />
                <span style={{ fontSize: "10px", fontWeight: active ? 600 : 400 }}>
                  {item.label === "Hizmetlerimiz" ? "Hizmetler" : item.label}
                </span>
              </Link>
            )
          })}
        </nav>
      )}

      {/* WhatsApp Floating Button - always visible */}
      <WhatsAppButton />
    </>
  )
}
