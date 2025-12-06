import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, MapPin, Building2, Layers, ArrowRight, CheckCircle2 } from "lucide-react"

// JSON'dan proje verisi çekme fonksiyonu
async function getProject(slug: string) {
  try {
    const projectsData = await import("@/content/projects.json")
    const allProjects = [...projectsData.completed, ...projectsData.ongoing, ...projectsData.upcoming]
    return allProjects.find((p: any) => p.slug === slug) || null
  } catch {
    return null
  }
}

async function getAllProjects() {
  try {
    const projectsData = await import("@/content/projects.json")
    return [...projectsData.completed, ...projectsData.ongoing, ...projectsData.upcoming]
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project: any) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Proje Bulunamadı | VIERA Construction",
      description: "Aradığınız proje bulunamadı.",
    }
  }

  return {
    title: `${project.title} | VIERA Construction`,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Proje bulunamadı</h1>
        <p style={{ marginBottom: "2rem", color: "#666" }}>Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
        <Link
          href="/projeler"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#18181b",
            color: "white",
            borderRadius: "0.5rem",
            textDecoration: "none",
          }}
        >
          <ChevronLeft style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
          Projelere Dön
        </Link>
      </div>
    )
  }

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    completed: { bg: "#22c55e", text: "white", label: "Tamamlandı" },
    ongoing: { bg: "#3b82f6", text: "white", label: "Devam Ediyor" },
    upcoming: { bg: "#f59e0b", text: "white", label: "Başlayacak" },
  }

  const statusInfo = statusColors[project.status] || statusColors.completed

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          minHeight: "400px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            zIndex: 10,
          }}
        />
        <Image
          src={project.mainImage || "/placeholder.svg?height=600&width=1200&query=construction project"}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "flex-end",
            padding: "3rem",
          }}
        >
          <div style={{ maxWidth: "800px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.375rem 1rem",
                backgroundColor: statusInfo.bg,
                color: statusInfo.text,
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "1rem",
              }}
            >
              {statusInfo.label}
            </span>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: "bold",
                color: "white",
                marginBottom: "0.75rem",
              }}
            >
              {project.title}
            </h1>
            <p style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.85)" }}>{project.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Back Link */}
        <Link
          href="/projeler"
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "#52525b",
            textDecoration: "none",
            marginBottom: "2rem",
          }}
        >
          <ChevronLeft style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }} />
          Tüm Projelere Dön
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
          {/* Main Content */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {/* Description */}
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Proje Hakkında</h2>
              <p style={{ color: "#52525b", lineHeight: 1.7 }}>{project.fullDescription}</p>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>Proje Özellikleri</h3>
                  <ul
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {project.features.map((feature: string, index: number) => (
                      <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "#22c55e", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.9375rem" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div
              style={{
                backgroundColor: "#f4f4f5",
                borderRadius: "1rem",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1.5rem" }}>Proje Bilgileri</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {project.location && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <MapPin
                      style={{ width: "1.25rem", height: "1.25rem", color: "#71717a", flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "0.875rem" }}>Konum</p>
                      <p style={{ color: "#52525b", fontSize: "0.875rem" }}>{project.location}</p>
                    </div>
                  </div>
                )}
                {project.year && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <Calendar
                      style={{ width: "1.25rem", height: "1.25rem", color: "#71717a", flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "0.875rem" }}>
                        {project.status === "completed" ? "Tamamlanma Yılı" : "Planlanan Tarih"}
                      </p>
                      <p style={{ color: "#52525b", fontSize: "0.875rem" }}>{project.year}</p>
                    </div>
                  </div>
                )}
                {project.area && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <Layers
                      style={{ width: "1.25rem", height: "1.25rem", color: "#71717a", flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "0.875rem" }}>Alan</p>
                      <p style={{ color: "#52525b", fontSize: "0.875rem" }}>{project.area}</p>
                    </div>
                  </div>
                )}
                {project.units && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <Building2
                      style={{ width: "1.25rem", height: "1.25rem", color: "#71717a", flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "0.875rem" }}>Birim Sayısı</p>
                      <p style={{ color: "#52525b", fontSize: "0.875rem" }}>{project.units}</p>
                    </div>
                  </div>
                )}
                {project.floors && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <Building2
                      style={{ width: "1.25rem", height: "1.25rem", color: "#71717a", flexShrink: 0, marginTop: "2px" }}
                    />
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "0.875rem" }}>Kat Sayısı</p>
                      <p style={{ color: "#52525b", fontSize: "0.875rem" }}>{project.floors}</p>
                    </div>
                  </div>
                )}
                {project.progress !== undefined && (
                  <div>
                    <p style={{ fontWeight: "500", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                      İlerleme: %{project.progress}
                    </p>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#e4e4e7",
                        borderRadius: "9999px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${project.progress}%`,
                          height: "100%",
                          backgroundColor: "#3b82f6",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href="/iletisim"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.875rem",
                  backgroundColor: "#18181b",
                  color: "white",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: "500",
                  marginTop: "1.5rem",
                }}
              >
                Bilgi Alın
                <ArrowRight style={{ width: "1rem", height: "1rem" }} />
              </Link>
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Proje Galerisi</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem",
                }}
              >
                {project.gallery.map((image: string, index: number) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      aspectRatio: "4/3",
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=300&width=400&query=construction"}
                      alt={`${project.title} - Görsel ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Updates (for ongoing projects) */}
          {project.updates && project.updates.length > 0 && (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Proje Güncellemeleri</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {project.updates.map((update: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "1.25rem",
                      backgroundColor: "#f4f4f5",
                      borderRadius: "0.75rem",
                      borderLeft: "4px solid #3b82f6",
                    }}
                  >
                    <p style={{ fontSize: "0.75rem", color: "#71717a", marginBottom: "0.25rem" }}>{update.date}</p>
                    <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{update.title}</h4>
                    <p style={{ fontSize: "0.9375rem", color: "#52525b" }}>{update.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
