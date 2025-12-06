import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Building2,
  Users,
  Award,
  Calendar,
  Target,
  Eye,
  Heart,
  CheckCircle,
  MapPin,
  Phone,
  FileCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getContent, defaultAbout } from "@/lib/github-content"

export const metadata = {
  title: "Hakkımızda - Firma Geçmişimiz | VIERA Construction",
  description:
    "VIERA Construction - Alkan Yapı & Viera Ortaklığı. D sınıfı Müteahhitlik Belgesiyle İstanbul'da konut ve iş yeri üretimi.",
}

export const dynamic = "force-dynamic"

export default async function AboutPage() {
  const data = await getContent<typeof defaultAbout>("about")
  const aboutData = data || defaultAbout

  const stats = [
    {
      icon: Calendar,
      value: aboutData.stats?.founded || "1965",
      label: aboutData.stats?.foundedLabel || "Kuruluş Yılı",
    },
    { icon: Users, value: aboutData.stats?.employees || "50+", label: aboutData.stats?.employeesLabel || "Çalışan" },
    {
      icon: Award,
      value: aboutData.stats?.completedProjects || "100+",
      label: aboutData.stats?.completedProjectsLabel || "Tamamlanan Proje",
    },
    { icon: FileCheck, value: "D Sınıfı", label: "Müteahhitlik Belgesi" },
  ]

  const values = aboutData.whyUs?.items || [
    { title: "Kalite", description: "Her projede en yüksek kalite standartlarını uyguluyoruz." },
    { title: "Güvenilirlik", description: "Söz verdiğimiz zamanda, söz verdiğimiz kalitede teslim ediyoruz." },
    { title: "Yenilikçilik", description: "Sektördeki en son teknolojileri ve yöntemleri kullanıyoruz." },
    { title: "Sürdürülebilirlik", description: "Çevreye duyarlı projeler geliştiriyoruz." },
  ]

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", width: "100%", height: "70vh", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(39,39,42,0.9) 0%, rgba(39,39,42,0.7) 100%)",
            zIndex: 10,
          }}
        />
        <Image
          src={aboutData.heroImage || "/modern-construction-office-building.jpg"}
          alt="VIERA Construction Ofisi"
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
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "900px", padding: "0 1.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                borderRadius: "9999px",
                padding: "0.5rem 1.25rem",
                marginBottom: "1.5rem",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Building2 style={{ height: "1rem", width: "1rem", color: "white" }} />
              <span style={{ fontSize: "0.875rem", color: "white", fontWeight: 500 }}>
                {aboutData.company?.subtitle || "Alkan Yapı & Viera Ortaklığı"}
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "white",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              {aboutData.company?.name || "VIERA Construction"}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(255,255,255,0.85)",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {aboutData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          backgroundColor: "#27272a",
          padding: "3rem 1.5rem",
          marginTop: "-2rem",
          position: "relative",
          zIndex: 30,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <stat.icon
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  color: "white",
                  margin: "0 auto 0.75rem",
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "grid", gap: "4rem", gridTemplateColumns: "1fr" }}>
          {/* About Text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem", lineHeight: 1.2 }}>
                {aboutData.pageTitle || "Firmamız Hakkında"}
              </h2>
              <p style={{ color: "#52525b", marginBottom: "1rem", lineHeight: 1.7 }}>{aboutData.description}</p>
              <p style={{ color: "#52525b", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                Firmamız <strong>{aboutData.certificate}</strong>ne sahiptir. {aboutData.certificateDescription}
              </p>

              {/* Firma iletişim bilgileri kartı */}
              <div
                style={{
                  backgroundColor: "#f4f4f5",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  marginTop: "1rem",
                }}
              >
                <h3 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "1.1rem" }}>Firma Bilgileri</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <MapPin
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                        color: "#27272a",
                        flexShrink: 0,
                        marginTop: "0.125rem",
                      }}
                    />
                    <span style={{ color: "#52525b", fontSize: "0.925rem", lineHeight: 1.5 }}>
                      {aboutData.contact?.address}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Users style={{ height: "1.25rem", width: "1.25rem", color: "#27272a", flexShrink: 0 }} />
                    <span style={{ color: "#52525b", fontSize: "0.925rem" }}>
                      Yetkili: <strong>{aboutData.contact?.authorized}</strong>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Phone style={{ height: "1.25rem", width: "1.25rem", color: "#27272a", flexShrink: 0 }} />
                    <span style={{ color: "#52525b", fontSize: "0.925rem" }}>
                      Tel:{" "}
                      <a
                        href={`tel:${aboutData.contact?.phone?.replace(/\s/g, "")}`}
                        style={{ color: "#27272a", fontWeight: 500 }}
                      >
                        {aboutData.contact?.phone}
                      </a>{" "}
                      | Fax: {aboutData.contact?.fax}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Phone style={{ height: "1.25rem", width: "1.25rem", color: "#27272a", flexShrink: 0 }} />
                    <span style={{ color: "#52525b", fontSize: "0.925rem" }}>
                      Cep:{" "}
                      <a
                        href={`tel:${aboutData.contact?.mobile?.replace(/\s/g, "")}`}
                        style={{ color: "#27272a", fontWeight: 500 }}
                      >
                        {aboutData.contact?.mobile}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Image
                src={aboutData.officeImage || "/modern-office-interior.jpg"}
                width={600}
                height={400}
                alt="VIERA Ofisi"
                style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Vision, Mission, Values */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {/* Vizyon */}
            <div
              style={{ backgroundColor: "#fafafa", borderRadius: "1rem", padding: "2rem", border: "1px solid #f4f4f5" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#27272a", borderRadius: "0.5rem", padding: "0.5rem" }}>
                  <Eye style={{ height: "1.25rem", width: "1.25rem", color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{aboutData.vision?.title || "Vizyonumuz"}</h3>
              </div>
              <p style={{ color: "#52525b", lineHeight: 1.6 }}>{aboutData.vision?.description}</p>
            </div>

            {/* Misyon */}
            <div
              style={{ backgroundColor: "#fafafa", borderRadius: "1rem", padding: "2rem", border: "1px solid #f4f4f5" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#27272a", borderRadius: "0.5rem", padding: "0.5rem" }}>
                  <Target style={{ height: "1.25rem", width: "1.25rem", color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{aboutData.mission?.title || "Misyonumuz"}</h3>
              </div>
              <p style={{ color: "#52525b", lineHeight: 1.6 }}>{aboutData.mission?.description}</p>
            </div>

            {/* Değerler */}
            <div
              style={{ backgroundColor: "#fafafa", borderRadius: "1rem", padding: "2rem", border: "1px solid #f4f4f5" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#27272a", borderRadius: "0.5rem", padding: "0.5rem" }}>
                  <Heart style={{ height: "1.25rem", width: "1.25rem", color: "white" }} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{aboutData.values?.title || "Değerlerimiz"}</h3>
              </div>
              <p style={{ color: "#52525b", lineHeight: 1.6 }}>{aboutData.values?.description}</p>
            </div>
          </div>

          {/* Values Grid */}
          <div style={{ backgroundColor: "#27272a", borderRadius: "1rem", padding: "3rem", marginTop: "1rem" }}>
            <h3
              style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: "2rem", textAlign: "center" }}
            >
              {aboutData.whyUs?.title || "Neden VIERA Construction?"}
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}
            >
              {values.map((value: any, index: number) => (
                <div key={index} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <CheckCircle
                    style={{
                      height: "1.25rem",
                      width: "1.25rem",
                      color: "#22c55e",
                      flexShrink: 0,
                      marginTop: "0.125rem",
                    }}
                  />
                  <div>
                    <h4 style={{ fontWeight: 600, color: "white", marginBottom: "0.25rem" }}>{value.title}</h4>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: "#fafafa", padding: "5rem 1.5rem", borderTop: "1px solid #f4f4f5" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "1rem" }}>
            Projeleriniz İçin Bizimle İletişime Geçin
          </h2>
          <p style={{ color: "#52525b", marginBottom: "2rem", fontSize: "1.125rem", lineHeight: 1.6 }}>
            Uzman ekibimizle projelerinizi hayata geçirmek için hazırız.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Button size="lg" asChild style={{ backgroundColor: "#27272a" }}>
              <Link href="/iletisim">İletişime Geçin</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/hizmetlerimiz" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Hizmetlerimizi İnceleyin
                <ChevronRight style={{ height: "1rem", width: "1rem" }} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
