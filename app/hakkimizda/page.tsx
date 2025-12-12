import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
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
  const aboutData = { ...defaultAbout, ...data }

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

  const values = aboutData.whyUs?.items || []

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Main Content - Yazı ve firma bilgileri önce, stats sonra */}
      <section className="w-full py-16 md:py-24 bg-background mt-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-16">
            {/* About Text & Image */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{aboutData.company?.name || "VIERA Construction"}</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutData.description}</p>
                <p className="text-muted-foreground leading-relaxed">
                  Firmamız <strong>{aboutData.certificate}</strong>ne sahiptir. {aboutData.certificateDescription}
                </p>

                {/* Contact Info Card */}
                <div className="bg-muted rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg">Firma Bilgileri</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {aboutData.contact?.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Yetkili: <strong>{aboutData.contact?.authorized}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Tel:{" "}
                        <a
                          href={`tel:${aboutData.contact?.phone?.replace(/\s/g, "")}`}
                          className="font-medium hover:underline"
                        >
                          {aboutData.contact?.phone}
                        </a>{" "}
                        | Fax: {aboutData.contact?.fax}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Cep:{" "}
                        <a
                          href={`tel:${aboutData.contact?.mobile?.replace(/\s/g, "")}`}
                          className="font-medium hover:underline"
                        >
                          {aboutData.contact?.mobile}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutData.officeImage || "/modern-office-interior.jpg"}
                  width={600}
                  height={400}
                  alt="VIERA Ofisi"
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            {/* Vision, Mission, Values */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-muted rounded-xl p-8 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground rounded-lg p-2">
                    <Eye className="h-5 w-5 text-background" />
                  </div>
                  <h3 className="text-xl font-bold">{aboutData.vision?.title || "Vizyonumuz"}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aboutData.vision?.description}</p>
              </div>

              <div className="bg-muted rounded-xl p-8 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground rounded-lg p-2">
                    <Target className="h-5 w-5 text-background" />
                  </div>
                  <h3 className="text-xl font-bold">{aboutData.mission?.title || "Misyonumuz"}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aboutData.mission?.description}</p>
              </div>

              <div className="bg-muted rounded-xl p-8 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-foreground rounded-lg p-2">
                    <Heart className="h-5 w-5 text-background" />
                  </div>
                  <h3 className="text-xl font-bold">{aboutData.values?.title || "Değerlerimiz"}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aboutData.values?.description}</p>
              </div>
            </div>

            {/* Why Us Grid */}
            <div className="bg-zinc-800 dark:bg-zinc-900 rounded-xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {aboutData.whyUs?.title || "Neden VIERA Construction?"}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value: any, index: number) => (
                  <div key={index} className="flex gap-3 items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                      <p className="text-sm text-white/70 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - İstatistikler en sona taşındı */}
      <section className="bg-zinc-800 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 text-white/90 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-muted border-t">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-lg text-muted-foreground">
              Uzman ekibimizle projelerinizi hayata geçirmek için hazırız.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/hizmetlerimiz" className="flex items-center gap-2">
                  Hizmetlerimizi İnceleyin
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
