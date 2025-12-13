import Link from "next/link"
import { ChevronRight, Building2, Home, Building, Landmark, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getContent } from "@/lib/github-content"

export const metadata = {
  title: "Hizmetlerimiz - Konut, Ticari ve Karma Projeler | Viera & Alkan Yapı",
  description: "Viera & Alkan Yapı inşaat hizmetleri: Konut projeleri, ticari binalar ve karma kullanımlı projeler.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

const iconMap: Record<string, any> = {
  Home,
  Building,
  Landmark,
}

async function getServicesData() {
  const timestamp = Date.now()
  const servicesData = await getContent<any>("services", timestamp)
  return servicesData
}

export default async function ServicesPage() {
  const servicesData = await getServicesData()

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Building2 className="h-4 w-4" />
              {servicesData.intro?.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{servicesData.intro?.title}</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              {servicesData.intro?.description}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:gap-12 max-w-6xl mx-auto">
            {servicesData.services?.map((service: any, index: number) => {
              const IconComponent = iconMap[service.icon] || Home

              return (
                <Card key={service.id} className="border-2 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader className="space-y-4 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-7 w-7 text-white dark:text-zinc-900" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-2xl md:text-3xl">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {service.items?.map((item: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors"
                        >
                          <CheckCircle2 className="h-5 w-5 text-zinc-800 dark:text-zinc-200 mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-20 max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-950 dark:to-zinc-900 p-12 md:p-16 text-center text-white shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{servicesData.cta?.title}</h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  {servicesData.cta?.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button size="lg" asChild className="bg-white text-zinc-900 hover:bg-white/90 text-lg px-8 h-14">
                    <Link href="/iletisim">İletişime Geçin</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 h-14 bg-transparent"
                  >
                    <Link href="/projeler" className="inline-flex items-center gap-2">
                      Projelerimizi İnceleyin
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

