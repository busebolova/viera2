import HomeContentClient from "@/components/HomeContent.client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO (ADMIN PANELDEN CANLI GELİR) */}
      <HomeContentClient />

      {/* BURADAN SONRASI SABİT TASARIM */}
      {/* stats / why us / vs */}
    </div>
  )
}
