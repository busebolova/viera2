"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Building2, ChevronRight, ImageIcon, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { HeroSlider } from "@/components/hero-slider"
import { ContactForm } from "@/components/contact-form"
import { useEffect, useState } from "react"

const DEFAULT_CONTENT = {
  video: {
    url: "https://cdn.pixabay.com/video/2020/06/23/42926-434300944_large.mp4",
    title: "Viera & Alkan Yapı",
    subtitle: "Güven",
  },
  experience: {
    title: "60 Yılı Aşkın Tecrübe",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
  },
  about: {
    badge: "Hakkımızda",
    title: "Firma Geçmişimiz",
    description:
      "Kurucumuz Servet Alkan'ın temellerini attığı firmamız, 60 yılı aşkın deneyimi ve köklü geçmişinden aldığı güçle konut ve iş yeri üretimine aralıksız devam etmektedir.",
    certification: {
      title: "Müteahhitlik Belgemiz",
      description: "Firmamız D sınıfı Müteahhitlik Belgesine sahiptir.",
    },
    projects: {
      title: "Projelerimiz",
      description: "60 yılı aşkın sürede 100'den fazla proje başarıyla tamamlanmıştır.",
    },
    image: "/about-office.jpg",
  },
}

const DEFAULT_PROJECTS = {
  completed: [
    {
      id: "validebag-27-28",
      slug: "validebag-27-28-blok",
      title: "Validebağ 27-28 Blok",
      shortDescription: "Altunizade Mah. Kalfa Çeşme Sok.",
      details: "56 Daire",
      year: "2024",
      mainImage: "/modern-apartment-building-istanbul.jpg",
    },
  ],
  ongoing: [
    {
      id: "validebag-29",
      slug: "validebag-29-kentsel-donusum",
      title: "Validebağ 29 Kentsel Dönüşüm",
      shortDescription: "38 Daire - Kaba inşaat tamamlandı",
      details: "2. Etap 2025 3. Çeyrek tamamlanacak",
      year: "2025",
      mainImage: "/construction-site-building-progress.jpg",
    },
  ],
}

const DEFAULT_CONTACT = {
  address: "Altunizade Mah. Ord. Prof Fahrettin Kerim Gökay Cad. No7/8 Üsküdar/ İstanbul",
  phone: "0216 391 49 40",
  mobile: "0533 479 83 87",
  email: "info@vieraconstruction.com",
  fax: "0216 310 90 74",
  authorized: "Erdem Alkan",
}

export function HomeClient() {
  const [content, setContent] = useState<any>(DEFAULT_CONTENT)
  const [projects, setProjects] = useState<any>(DEFAULT_PROJECTS)
  const [contact, setContact] = useState<any>(DEFAULT_CONTACT)

  useEffect(() => {
    Promise.all([
      fetch("/api/github/content?file=home")
        .then((r) => r.json())
        .catch(() => ({ data: DEFAULT_CONTENT })),
      fetch("/api/github/content?file=projects")
        .then((r) => r.json())
        .catch(() => ({ data: DEFAULT_PROJECTS })),
      fetch("/api/github/content?file=contact")
        .then((r) => r.json())
        .catch(() => ({ data: DEFAULT_CONTACT })),
    ])
      .then(([homeRes, projRes, contRes]) => {
        if (homeRes.data && Object.keys(homeRes.data).length > 0) setContent(homeRes.data)
        if (projRes.data && Object.keys(projRes.data).length > 0) setProjects(projRes.data)
        if (contRes.data && Object.keys(contRes.data).length > 0) setContact(contRes.data)
      })
      .catch(() => {})
  }, [])

  return (
    <main style={{ flex: "1 1 0%" }}>
      {/* Hero Section */}
      <HeroSlider content={content.video} />

      {/* Experience Section */}
      <section
        style={{
          width: "100%",
          padding: "3rem 0",
          backgroundColor: "#3f3f46",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "700" }}>{content.experience?.title}</h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "rgba(255,255,255,0.9)",
              maxWidth: "48rem",
              margin: "0.75rem auto 0",
              fontSize: "1.1rem",
            }}
          >
            {content.experience?.description}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          width: "100%",
          padding: "4rem 0",
          backgroundColor: "hsl(240 4.8% 95.9% / 0.3)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{
              display: "grid",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="lg:grid-cols-2 lg:gap-16"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  width: "fit-content",
                }}
              >
                <Building2 style={{ height: "1rem", width: "1rem" }} /> {content.about?.badge}
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em" }}>
                {content.about?.title}
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem" }}>{content.about?.description}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div
                  style={{
                    borderLeft: "4px solid #27272a",
                    paddingLeft: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{content.about?.certification?.title}</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{content.about?.certification?.description}</p>
                </div>
                <div
                  style={{
                    borderLeft: "4px solid #27272a",
                    paddingLeft: "1rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{content.about?.projects?.title}</h3>
                  <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{content.about?.projects?.description}</p>
                </div>
              </div>
              <div style={{ paddingTop: "1rem" }}>
                <Button variant="outline" asChild>
                  <Link href="/hakkimizda" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    Daha Fazla Bilgi
                    <ChevronRight style={{ height: "1rem", width: "1rem" }} />
                  </Link>
                </Button>
              </div>
            </div>
            <div style={{ maxWidth: "500px", margin: "0 auto", width: "100%" }} className="lg:max-w-none">
              <div
                style={{
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <Image
                  src={content.about?.image || "/about-office.jpg"}
                  width={600}
                  height={600}
                  alt="VIERA Construction Ofisi"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ width: "100%", padding: "4rem 0", backgroundColor: "hsl(var(--background))" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}
          >
            <div style={{ maxWidth: "800px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <ImageIcon style={{ height: "1rem", width: "1rem" }} /> Projeler / Galeri
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em", marginTop: "0.5rem" }}>
                Projelerimiz
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem", marginTop: "0.5rem" }}>
                Tamamlanan ve devam eden projelerimiz.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: "72rem", margin: "4rem auto 0" }}>
            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>Tamamlanan Projeler</h3>
              <p style={{ color: "hsl(240 3.8% 46.1%)", marginBottom: "2rem" }}>
                60 yılı aşkın sürede 100'den fazla proje başarıyla tamamlanmıştır.
              </p>
              <div style={{ display: "grid", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.completed?.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image}
                    title={project.title}
                    description={project.shortDescription || project.description}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug || project.id}`}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>Devam Eden Projeler</h3>
              <p style={{ color: "hsl(240 3.8% 46.1%)", marginBottom: "2rem" }}>
                Şu anda üzerinde çalıştığımız projelerimiz.
              </p>
              <div style={{ display: "grid", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects.ongoing?.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image}
                    title={project.title}
                    description={project.shortDescription || project.description}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug || project.id}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <Button variant="outline" asChild>
              <Link href="/projeler" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                Tüm Projeleri Görüntüle
                <ChevronRight style={{ height: "1rem", width: "1rem" }} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          width: "100%",
          padding: "4rem 0",
          backgroundColor: "hsl(240 4.8% 95.9% / 0.3)",
          marginBottom: "4rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}
          >
            <div style={{ maxWidth: "800px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  backgroundColor: "hsl(240 4.8% 95.9%)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <Phone style={{ height: "1rem", width: "1rem" }} /> İletişim
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", letterSpacing: "-0.05em", marginTop: "0.5rem" }}>
                Bizimle İletişime Geçin
              </h2>
              <p style={{ color: "hsl(240 3.8% 46.1%)", fontSize: "1.125rem", marginTop: "0.5rem" }}>
                Sorularınız veya projeleriniz için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "3rem",
              marginTop: "4rem",
              maxWidth: "72rem",
              margin: "4rem auto 0",
            }}
            className="lg:grid-cols-2"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>İletişim Formu</h3>
                <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Aşağıdaki formu doldurarak bize mesaj gönderebilirsiniz.</p>
              </div>
              <ContactForm />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700" }}>İletişim Bilgileri</h3>
                <p style={{ color: "hsl(240 3.8% 46.1%)" }}>Aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <Phone style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Telefon</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.phone}</p>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.mobile}</p>
                  </div>
                </div>
                {contact.fax && (
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "2.5rem",
                        width: "2.5rem",
                        borderRadius: "50%",
                        backgroundColor: "#e4e4e7",
                        color: "#27272a",
                        marginRight: "1rem",
                      }}
                    >
                      <Printer style={{ height: "1.25rem", width: "1.25rem" }} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: "500" }}>Fax</h4>
                      <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.fax}</p>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <Building2 style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Yetkili</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.authorized}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: "#e4e4e7",
                      color: "#27272a",
                      marginRight: "1rem",
                    }}
                  >
                    <MapPin style={{ height: "1.25rem", width: "1.25rem" }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "500" }}>Adres</h4>
                    <p style={{ color: "hsl(240 3.8% 46.1%)" }}>{contact.address}</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3967396573864!2d29.023861!3d41.022885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7d4c9d0c9d1%3A0x0!2zQWx0dW5pemFkZSwgw5xza8O8ZGFyL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1620000000000!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
