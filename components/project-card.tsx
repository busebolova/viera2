import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ProjectCardProps {
  image: string
  title: string
  description: string
  year: string
  detailUrl?: string
  badge?: string
  badgeColor?: "amber" | "blue" | "green"
}

export function ProjectCard({
  image,
  title,
  description,
  year,
  detailUrl = "#",
  badge,
  badgeColor = "green",
}: ProjectCardProps) {
  const badgeColors = {
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-lg">
      <Link href={detailUrl} className="absolute inset-0 z-10">
        <span className="sr-only">View Project</span>
      </Link>
      {badge && (
        <div
          className={`absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-medium ${badgeColors[badgeColor]}`}
        >
          {badge}
        </div>
      )}
      <div className="aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wide">{title}</h3>
          <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">{year}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center text-xs font-medium text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">
          Detayları Görüntüle
          <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}
