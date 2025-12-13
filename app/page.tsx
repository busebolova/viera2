import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Mail } from "lucide-react"
import { getContent, getProjects } from "@/lib/github-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı | Üsküdar İnşaat Firması - 60+ Yıllık Tecrübe",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı, Üsküdar merkezli 60 yılı aşkın deneyimle konut projeleri, ticari binalar ve karma kullanımlı yapı projeleri. İstanbul'un güvenilir inşaat ve müteahhitlik firması.",
}

const defaultContent = {
  video: {
    url: "/construction-site-timelapse.jpg",
    title: "VIERA - Alkan Yapı & Viera Ortaklığı",
    subtitle: "60 Yılı Aşkın Deneyim ile İnşaat ve Yapı Çözümleri",
  },
  stats: {
    founded: "1965",
    foundedLabel: "Kuruluş Yılı",
    employees: "50+",
    employeesLabel: "Çalışan",
    completedProjects: "150+",
    completedProjectsLabel: "Tamamlanan Proje",
    experience: "60+",
    experienceLabel: "Yıllık Tecrübe",
  },
  experience: {
    title: "Deneyim ve Uzmanlık",
    description:
      "60 yılı aşkın tecrübemiz ve uzman kadromuzla, her projeyi en yüksek kalite standartlarında teslim ediyoruz. Modern yapı teknolojileri ve sürdürülebilir inşaat yöntemleriyle geleceği inşa ediyoruz.",
  },
  process: {
    title: "Çalışma Sürecimiz",
    subtitle: "Projelerinizi nasıl hayata geçiriyoruz",
    steps: [
      {
        title: "Planlama",
        description: "Projenizi detaylı analiz ediyor ve en uygun çözümleri sunuyoruz",
      },
      {
        title: "Tasarım",
        description: "Mimarlar ve mühendislerimiz projenizi tasarlıyor",
      },
      {
        title: "İnşaat",
        description: "Uzman ekibimizle projenizi kaliteli bir şekilde inşa ediyoruz",
      },
      {
        title: "Teslim",
        description: "Projenizi zamanında ve eksiksiz olarak teslim ediyoruz",
      },
    ],
  },
  whyUs: {
    title: "Neden Bizi Seçmelisiniz?",
    items: [
      {
        title: "60+ Yıllık Tecrübe",
        description: "1965'ten beri inşaat sektöründe güvenilir hizmet",
      },
      {
        title: "Kaliteli İşçilik",
        description: "Uzman kadromuz ve modern tekniklerle kusursuz işçilik",
      },
      {
        title: "Zamanında Teslimat",
        description: "Projelerinizi planlanan sürede tamamlıyoruz",
      },
      {
        title: "Müşteri Memnuniyeti",
        description: "Müşterilerimizin %95'i bizi tekrar tercih ediyor",
      },
    ],
  },
  cta: {
    title: "Projeniz İçin Bizimle İletişime Geçin",
    description: "60 yılı aşkın deneyimimiz ve uzman kadromuzla hayalinizdeki projeyi birlikte hayata geçirelim.",
  },
}

async function getHomeContent() {
  try {
    const timestamp = Date.now()
    const data = await getContent("home", timestamp)
    return {
      video: data?.video || defaultContent.video,
      stats: data?.stats || defaultContent.stats,
      experience: data?.experience || defaultContent.experience,
      process: data?.process || defaultContent.process,
      whyUs: data?.whyUs || defaultContent.whyUs,
      cta: data?.cta || defaultContent.cta,
    }
  } catch (error) {
    console.error("[v0] Home content error:", error)
    return defaultContent
  }
}

async function getProjectsContent() {
  try {
    const timestamp = Date.now()
    return await getProjects(timestamp)
  } catch (error) {
    console.error("[v0] Projects content error:", error)
    return { completed: [], ongoing: [], upcoming: [] }
  }
}

async function getServicesContent() {
  try {
    const timestamp = Date.now()
    const data = await getContent("services", timestamp)
    return data?.services || []
  } catch (error) {
    console.error("[v0] Services content error:", error)
    return []
  }
}

export default async function HomePage() {
  const [home, projectsData, services] = await Promise.all([
    getHomeContent(),
    getProjectsContent(),
    getServicesContent(),
  ])

  const completedProjects = projectsData?.completed || []
  const ongoingProjects = projectsData?.ongoing || []

  const videoUrl = home?.video?.url || defaultContent.video.url

  return (
    <div className="min-h-screen">
      {/* Hero Video Section */}
      <section className="relative h-[600px] overflow-hidden">
        {videoUrl.includes(".mp4") ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image src={videoUrl || "/placeholder.svg"} alt="Hero background" fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {home?.video?.title || defaultContent.video.title}
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {home?.video?.subtitle || defaultContent.video.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{home?.stats?.founded}</div>
              <div className="mt-2 text-sm text-muted-foreground">{home?.stats?.foundedLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{home?.stats?.employees}</div>
              <div className="mt-2 text-sm text-muted-foreground">{home?.stats?.employeesLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{home?.stats?.completedProjects}</div>
              <div className="mt-2 text-sm text-muted-foreground">{home?.stats?.completedProjectsLabel}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{home?.stats?.experience}</div>
              <div className="mt-2 text-sm text-muted-foreground">{home?.stats?.experienceLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold">{home?.experience?.title}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{home?.experience?.description}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/hakkimizda">Firmamız Hakkında</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      {home?.process?.steps && home.process.steps.length > 0 && (
        <section className="bg-zinc-900 py-20 text-white">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">{home.process.title}</h2>
              <p className="text-zinc-300">{home.process.subtitle}</p>
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
          <h2 className="mb-12 text-center text-3xl font-bold">{home?.whyUs?.title}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {(home?.whyUs?.items || []).map((item: any, index: number) => (
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
          <div className="mx-auto max-w-3xl rounded-2xl bg-zinc-900 px-8 py-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">{home?.cta?.title || defaultContent.cta.title}</h2>
            <p className="mb-8 text-lg text-zinc-300">{home?.cta?.description || defaultContent.cta.description}</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-12 bg-white text-zinc-900 hover:bg-zinc-100">
                <Link href="/iletisim">
                  <Mail className="mr-2 h-5 w-5" />
                  İletişime Geç
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 border-2 border-white text-white hover:bg-white hover:text-zinc-900 bg-transparent"
              >
                <Link href="/projeler">
                  Projelerimizi İnceleyin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
