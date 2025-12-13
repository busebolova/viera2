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
  description: "Üsküdar merkezli inşaat firması",
}

const FALLBACK = {
  video: { url: "/placeholder.svg", title: "", subtitle: "" },
  stats: {},
  experience: {},
  process: { steps: [] },
  whyUs: { items: [] },
  cta: {},
}

async function safeGetHome() {
  try {
    const data = await getContent<any>("home", Date.now())
    if (!data || typeof data !== "object") return FALLBACK
    return { ...FALLBACK, ...data }
  } catch {
    return FALLBACK
  }
}

export default async function HomePage() {
  const home = await safeGetHome()

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src={home.video?.url || "/placeholder.svg"}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold">
              {home.video?.title || ""}
            </h1>
            <p className="mt-4 text-xl">
              {home.video?.subtitle || ""}
            </p>
          </div>
        </div>
      </section>

      {home.whyUs?.items?.length > 0 && (
        <section className="py-20">
          <div className="container grid md:grid-cols-3 gap-6">
            {home.whyUs.items.map((item: any, i: number) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <CheckCircle2 className="mb-4" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 text-center">
        <Button asChild>
          <Link href="/iletisim">
            <Mail className="mr-2 h-4 w-4" />
            İletişime Geç
          </Link>
        </Button>
      </section>
    </div>
  )
}
