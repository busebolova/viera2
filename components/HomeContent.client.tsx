"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

type HomeContent = {
  video?: {
    url?: string
    title?: string
    subtitle?: string
  }
}

export default function HomeContentClient() {
  const [data, setData] = useState<HomeContent | null>(null)

  useEffect(() => {
    fetch(`/api/content?file=home&t=${Date.now()}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setData(res.content))
      .catch(() => setData(null))
  }, [])

  const imageUrl = data?.video?.url || "/construction-site-timelapse.jpg"

  return (
    <section className="relative h-[600px] overflow-hidden">
      <Image
        src={imageUrl}
        alt="VIERA"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
        <div className="container px-4">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
            {data?.video?.title || "VIERA"}
          </h1>

          <p className="text-xl md:text-2xl mb-6">
            {data?.video?.subtitle || "Alkan Yapı & Viera Ortaklığı"}
          </p>

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
      </div>
    </section>
  )
}
