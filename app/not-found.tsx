import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Sayfa Bulunamadı</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Aradığınız sayfa mevcut değil veya kaldırılmış olabilir. Lütfen ana sayfaya dönün veya başka bir sayfayı ziyaret
        edin.
      </p>
      <Button asChild className="btn-standard">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Ana Sayfaya Dön
        </Link>
      </Button>
    </div>
  )
}
