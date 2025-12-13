import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Mail } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı | Üsküdar İnşaat Firması - 60+ Yıllık Tecrübe",
  description:
    "VIERA - Alkan Yapı & Viera Ortaklığı, Üsküdar merkezli 60 yılı aşkın deneyimle konut projeleri, ticari binalar ve karma kullanımlı yapı projeleri.",
}

async function getHomeContent() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/content?file=home`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Home content fetch failed")
  }

  const { content } = await res.json()
  return content
}

export default async function HomePage() {
  const home = await getHomeContent()

  const videoUrl = home.video?.url

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[600px] overflow-hidden">
        {videoUrl?.includes(".mp4") ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={videoUrl}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              {home.video?.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {home.video?.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">{home.stats?.founded}</div>
            <div className="text-sm text-muted-foreground">{home.stats?.foundedLabel}</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{home.stats?.employees}</div>
            <div className="text-sm text-muted-foreground">{home.stats?.employeesLabel}</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{home.stats?.completedProjects}</div>
            <div className="text-sm text-muted-foreground">{home.stats?.completedProjectsLabel}</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{home.stats?.experience}</div>
            <div className="text-sm text-muted-foreground">{home.stats?.experienceLabel}</div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-4xl font-bold">{home.experience?.title}</h2>
          <p className="text-lg text-muted-foreground">{home.experience?.description}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/hakkimizda">Firmamız Hakkında</Link>
          </Button>
        </div>
      </section>

      {/* Process */}
      {home.process?.steps?.length > 0 && (
        <section className="bg-zinc-900 py-20 text-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">{home.process.title}</h2>
              <p className="text-zinc-300">{home.process.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {home.process.steps.map((step: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white text-zinc-900 flex items-center justify-center text-2xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Us */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-bold mb-12">{home.whyUs?.title}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {home.whyUs?.items?.map((item: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <CheckCircle2 className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container px-4">
          <div className="bg-zinc-900 text-white rounded-2xl px-8 py-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{home.cta?.title}</h2>
            <p className="text-zinc-300 mb-8">{home.cta?.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-zinc-900">
                <Link href="/iletisim">
                  <Mail className="mr-2 h-5 w-5" /> İletişime Geç
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white">
                <Link href="/projeler">
                  Projelerimizi İnceleyin <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
