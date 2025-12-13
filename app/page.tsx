import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Mail } from "lucide-react"

export const metadata = {
  title: "VIERA - Alkan Yapı & Viera Ortaklığı",
  description:
    "60 yılı aşkın deneyimle konut, ticari ve karma kullanımlı yapı projeleri.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="/construction-site-timelapse.jpg"
          alt="VIERA"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div className="container px-4">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
              VIERA
            </h1>
            <p className="text-xl md:text-2xl">
              Alkan Yapı & Viera Ortaklığı
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          <div>
            <div className="text-4xl font-bold">1965</div>
            <div className="text-sm text-muted-foreground">Kuruluş</div>
          </div>
          <div>
            <div className="text-4xl font-bold">50+</div>
            <div className="text-sm text-muted-foreground">Çalışan</div>
          </div>
          <div>
            <div className="text-4xl font-bold">150+</div>
            <div className="text-sm text-muted-foreground">Proje</div>
          </div>
          <div>
            <div className="text-4xl font-bold">60+</div>
            <div className="text-sm text-muted-foreground">Yıl</div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-20">
        <div className="container text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Deneyim ve Uzmanlık</h2>
          <p className="text-muted-foreground text-lg">
            60 yılı aşkın tecrübemizle projeleri güvenle hayata geçiriyoruz.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/hakkimizda">Hakkımızda</Link>
          </Button>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Neden Biz?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              "60+ Yıllık Tecrübe",
              "Kaliteli İşçilik",
              "Zamanında Teslim",
              "Müşteri Memnuniyeti",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-primary" />
                  <h3 className="font-semibold">{item}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container text-center max-w-3xl bg-zinc-900 rounded-2xl py-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Projeniz İçin Bizimle İletişime Geçin
          </h2>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-white text-zinc-900">
              <Link href="/iletisim">
                <Mail className="mr-2 h-5 w-5" />
                İletişim
              </Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white">
              <Link href="/projeler">
                Projeler
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
