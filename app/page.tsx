import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Building2, Landmark, ArrowRight, Phone, Mail } from "lucide-react"
import { getProjectImage } from "@/lib/image-helper"
import { getContent, defaultHome, defaultProjects } from "@/lib/github-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı | Üsküdar İnşaat Firması - 60+ Yıllık Tecrübe",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı, Üsküdar merkezli 60 yılı aşkın deneyimle konut projeleri, ticari binalar ve karma kullanımlı yapı projeleri. İstanbul'un güvenilir inşaat ve müteahhitlik firması.",
}

async function getHomeContent() {
  try {
    const data = await getContent("home")
    if (!data?.content) {
      return { content: defaultHome }
    }
    // GitHub'dan gelen veriyi olduğu gibi kullan, sadece eksik alanları defaults ile doldur
    return { content: { ...defaultHome, ...data.content } }
  } catch (error) {
    console.error("[v0] Failed to fetch home content:", error)
    return { content: defaultHome }
  }
}

async function getProjectsContent() {
  try {
    const data = await getContent("projects")
    if (!data?.content) {
      return { content: defaultProjects }
    }
    // GitHub'dan gelen veriyi olduğu gibi kullan
    return { content: data.content }
  } catch (error) {
    console.error("[v0] Failed to fetch projects content:", error)
    return { content: defaultProjects }
  }
}

async function getServicesContent() {
  try {
    const data = await getContent("services")
    return data?.content?.services || []
  } catch (error) {
    return []
  }
}

export default async function HomePage() {
  const [homeData, projectsData, services] = await Promise.all([
    getHomeContent(),
    getProjectsContent(),
    getServicesContent(),
  ])

  const home = homeData.content
  const projects = projectsData.content

  const commercialProjects = projects.ongoing?.filter((p: any) => p.type === "commercial") || []
  const mixedProjects = projects.ongoing?.filter((p: any) => p.type === "mixed-use") || []

  return (
    <div className="min-h-screen">
      {/* Hero Video Section */}
      <section className="relative h-[600px] overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src={home.video?.url || defaultHome.video.url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              {home.video?.title || defaultHome.video.title}
            </h1>
            <p className="text-xl md:text-2xl">{home.video?.subtitle || defaultHome.video.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{home.stats?.founded || defaultHome.stats.founded}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {home.stats?.foundedLabel || defaultHome.stats.foundedLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {home.stats?.employees || defaultHome.stats.employees}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {home.stats?.employeesLabel || defaultHome.stats.employeesLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {home.stats?.completedProjects || defaultHome.stats.completedProjects}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {home.stats?.completedProjectsLabel || defaultHome.stats.completedProjectsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {home.stats?.experience || defaultHome.stats.experience}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {home.stats?.experienceLabel || defaultHome.stats.experienceLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold">{home.experience?.title || defaultHome.experience.title}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {home.experience?.description || defaultHome.experience.description}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/hakkimizda">Firmamız Hakkında</Link>
            </Button>
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="bg-muted/30 py-20">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Hizmetlerimiz</h2>
              <p className="text-muted-foreground">Kapsamlı yapı ve inşaat çözümleri sunuyoruz</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service: any, index: number) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/hizmetlerimiz">
                  Tüm Hizmetlerimiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Commercial Projects */}
      {commercialProjects.length > 0 && (
        <section className="py-20">
          <div className="container px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <Building2 className="mb-4 h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">Ticari Projeler</h2>
                <p className="mt-2 text-muted-foreground">
                  İş dünyasının dinamik ihtiyaçlarına yönelik, fonksiyonel ve prestijli ticari binalar inşa ediyoruz.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/projeler">Tümünü Gör</Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {commercialProjects.slice(0, 2).map((project: any) => {
                const imageUrl = project.mainImage || getProjectImage(project, "commercial")
                return (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src={imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{project.shortDescription}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/projeler/${project.slug}`}>Detayları Görüntüle</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mixed-Use Projects */}
      {mixedProjects.length > 0 && (
        <section className="bg-muted/30 py-20">
          <div className="container px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <Landmark className="mb-4 h-12 w-12 text-primary" />
                <h2 className="text-3xl font-bold">Karma Kullanımlı Projeler</h2>
                <p className="mt-2 text-muted-foreground">
                  Yaşam, iş ve alışveriş alanlarını bir araya getiren entegre yaşam merkezleri tasarlıyoruz.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/projeler">Tümünü Gör</Link>
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {mixedProjects.slice(0, 2).map((project: any) => {
                const imageUrl = project.mainImage || getProjectImage(project, "mixed-use")
                return (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image src={imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{project.shortDescription}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/projeler/${project.slug}`}>Detayları Görüntüle</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Working Process Section */}
      {home.process?.steps && home.process.steps.length > 0 && (
        <section className="bg-zinc-900 py-20 text-white">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">{home.process.title || "Çalışma Sürecimiz"}</h2>
              <p className="text-zinc-300">{home.process.subtitle || "Projelerinizi nasıl hayata geçiriyoruz"}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {home.process.steps.map((step: any, index: number) => (
                <div key={index} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-zinc-900">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-zinc-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Us Section */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">{home.whyUs?.title || defaultHome.whyUs.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(home.whyUs?.items || defaultHome.whyUs.items).map((item: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <CheckCircle2 className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {home.cta?.title || "Projeniz İçin Bizimle İletişime Geçin"}
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              {home.cta?.description ||
                "60 yılı aşkın deneyimimiz ve uzman kadromuzla hayalinizdeki projeyi birlikte hayata geçirelim."}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-10 bg-zinc-900 text-white hover:bg-zinc-800">
                <Link href="/iletisim">
                  <Mail className="mr-2 h-5 w-5" />
                  İletişime Geç
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-10 border-zinc-300 text-foreground hover:bg-zinc-50 bg-transparent"
              >
                <Link href="tel:02163914940">
                  <Phone className="mr-2 h-5 w-5" />
                  0216 391 49 40
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
