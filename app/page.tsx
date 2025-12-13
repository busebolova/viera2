import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Mail } from "lucide-react"
import { getContent } from "@/lib/github-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı",
  description: "VIERA - Alkan Yapı & Viera Ortaklığı resmi web sitesi",
}

export default async function HomePage() {
  const home = await getContent<any>("home")

  if (!home) return null

  const videoUrl = home.video?.url

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[600px] overflow-hidden">
        {videoUrl?.includes(".mp4") ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image src={videoUrl} alt="Hero" fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-4 text-5xl font-bold">{home.video?.title}</h1>
            <p className="text-xl">{home.video?.subtitle}</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(home.stats || {}).map(([key, value]: any) => {
            if (key.endsWith("Label")) return null
            return (
              <div key={key} className="text-center">
                <div className="text-4xl font-bold text-primary">{value}</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {home.stats[`${key}Label`]}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold">{home.experience?.title}</h2>
        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
          {home.experience?.description}
        </p>
      </section>

      {/* PROCESS */}
      <section className="bg-zinc-900 py-20 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">{home.process?.title}</h2>
          <p className="text-center text-zinc-300">{home.process?.subtitle}</p>
          <div className="grid gap-8 mt-12 md:grid-cols-4">
            {home.process?.steps?.map((step: any, i: number) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-white text-zinc-900 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-zinc-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center">{home.whyUs?.title}</h2>
        <div className="container grid gap-8 mt-12 md:grid-cols-4">
          {home.whyUs?.items?.map((item: any, i: number) => (
            <Card key={i}>
              <CardContent className="p-6">
                <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">{home.cta?.title}</h2>
        <p className="mt-4 text-zinc-300">{home.cta?.description}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/iletisim">
              <Mail className="mr-2 h-4 w-4" /> İletişime Geç
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projeler">
              Projelerimiz <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
