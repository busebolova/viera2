import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  image: string
}

export default function ServiceCard({ icon, title, description, href, image }: ServiceCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="flex flex-col items-center text-center rounded-lg border bg-card p-6 shadow-sm h-full">
        <div className="mb-4 flex items-center justify-center h-14 w-14 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
          {icon}
        </div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <p className="text-xs text-muted-foreground mb-4">{description}</p>
        <div className="mt-auto flex items-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Detayları Görüntüle
          <ChevronRight className="ml-1 h-3 w-3" />
        </div>
      </div>
    </Link>
  )
}
