import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Building2, Home, Building, Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getContent, defaultServices } from "@/lib/github-content"

export const metadata = {
  title: "Hizmetlerimiz - Konut, Ticari ve Karma Projeler | VIERA",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı inşaat hizmetleri: Konut projeleri, ticari binalar ve karma kullanımlı projeler.",
}

export const dynamic = "force-dynamic"

const iconMap: Record<string, any> = {
  Home,
  Building,
  Landmark,
}

export default async function ServicesPage() {
  const data = await getContent<typeof defaultServices>("services")
  const servicesData = data || defaultServices

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Hero Section */}
      <div style={{ position: "relative", width: "100%", height: "40vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10 }} />
        <Image
          src={servicesData.hero?.image || "/services-hero.jpg"}
          alt="VIERA Hizmetler"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", width: "100%" }}>
            <div style={{ maxWidth: "48rem" }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>
                {servicesData.hero?.title || "Hizmetlerimiz"}
              </h1>
              <p style={{ fontSize: "1.25rem", color: "rgba(255,255,255,0.8)" }}>{servicesData.hero?.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section style={{ width: "100%", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                backgroundColor: "#f4f4f5",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              <Building2 style={{ height: "1rem", width: "1rem" }} /> {servicesData.intro?.badge}
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{servicesData.intro?.title}</h2>
            <p style={{ color: "#71717a", fontSize: "1.125rem" }}>{servicesData.intro?.description}</p>
          </div>

          {/* Services */}
          {servicesData.services?.map((service: any, index: number) => {
            const IconComponent = iconMap[service.icon] || Home
            const isEven = index % 2 === 0

            return (
              <div
                key={service.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2.5rem",
                  alignItems: "center",
                  marginBottom: "4rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", order: isEven ? 1 : 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        height: "3rem",
                        width: "3rem",
                        borderRadius: "50%",
                        backgroundColor: "#f4f4f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconComponent style={{ height: "1.5rem", width: "1.5rem" }} />
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{service.title}</h3>
                  </div>
                  <p style={{ color: "#71717a" }}>{service.description}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {service.items?.map((item: any, i: number) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start" }}>
                        <ChevronRight
                          style={{
                            height: "1.25rem",
                            width: "1.25rem",
                            marginRight: "0.5rem",
                            color: "#52525b",
                            flexShrink: 0,
                            marginTop: "0.125rem",
                          }}
                        />
                        <div>
                          <span style={{ fontWeight: 500 }}>{item.title}</span>
                          <p style={{ fontSize: "0.875rem", color: "#71717a" }}>{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" asChild>
                    <Link href="/projeler" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      Projelerimizi İnceleyin
                      <ChevronRight style={{ height: "1rem", width: "1rem" }} />
                    </Link>
                  </Button>
                </div>
                <div
                  style={{
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    order: isEven ? 2 : 1,
                  }}
                >
                  <Image
                    src={service.image || "/service-residential.jpg"}
                    width={600}
                    height={400}
                    alt={service.title}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            )
          })}

          {/* CTA Section */}
          <div
            style={{
              marginTop: "3rem",
              backgroundColor: "#f4f4f5",
              borderRadius: "0.75rem",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#18181b" }}>
              {servicesData.cta?.title}
            </h2>
            <p style={{ color: "#52525b", marginBottom: "1.5rem", maxWidth: "40rem", margin: "0 auto 1.5rem" }}>
              {servicesData.cta?.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <Button asChild style={{ backgroundColor: "#27272a", color: "#fff" }}>
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button variant="outline" asChild style={{ borderColor: "#27272a", color: "#27272a" }}>
                <Link href="/projeler" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Tamamlanmış Projelerimiz
                  <ChevronRight style={{ height: "1rem", width: "1rem" }} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
