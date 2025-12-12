import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, MapPin, Building2, Layers, ArrowRight, CheckCircle2 } from "lucide-react"
import { getContent } from "@/lib/github-content"
import { getProjectImage } from "@/lib/image-helper"

async function getProjectsData() {
  const data = await getContent<any>("projects")
  if (!data) {
    // Varsayılan veri
    return {
      completed: [],
      ongoing: [],
      upcoming: [],
    }
  }
  return data
}

async function getProject(slug: string) {
  const projectsData = await getProjectsData()
  const allProjects = [
    ...(projectsData.completed || []),
    ...(projectsData.ongoing || []),
    ...(projectsData.upcoming || []),
  ]
  return allProjects.find((p: any) => p.slug === slug) || null
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Proje Bulunamadı | VIERA Construction",
      description: "Aradığınız proje bulunamadı.",
    }
  }

  return {
    title: `${project.title} | VIERA Construction`,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-8">
        <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
        <p className="mb-6 text-zinc-500">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/projeler" className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-lg">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Projelere Dön
        </Link>
      </div>
    )
  }

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    completed: { bg: "bg-green-500", text: "text-white", label: "Tamamlandı" },
    ongoing: { bg: "bg-blue-500", text: "text-white", label: "Devam Ediyor" },
    upcoming: { bg: "bg-amber-500", text: "text-white", label: "Başlayacak" },
  }

  const statusInfo = statusColors[project.status] || statusColors.completed
  const projectImage = project.mainImage || getProjectImage(project)

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />
        <Image src={projectImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 z-20 flex items-end p-8 md:p-12">
          <div className="max-w-3xl">
            <span
              className={`inline-block px-4 py-1.5 ${statusInfo.bg} ${statusInfo.text} rounded-full text-sm font-medium mb-4`}
            >
              {statusInfo.label}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{project.title}</h1>
            <p className="text-lg text-white/85">{project.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <Link href="/projeler" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-700 mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Tüm Projelere Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Proje Hakkında</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{project.fullDescription}</p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Proje Özellikleri</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Proje Galerisi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((image: string, index: number) => {
                    const galleryImage = image || projectImage
                    return (
                      <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={galleryImage || "/placeholder.svg"}
                          alt={`${project.title} - Görsel ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Updates */}
            {project.updates && project.updates.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Proje Güncellemeleri</h3>
                <div className="space-y-4">
                  {project.updates.map((update: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl border-l-4 border-blue-500">
                      <p className="text-xs text-zinc-500 mb-1">{update.date}</p>
                      <h4 className="font-semibold mb-2">{update.title}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{update.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-6">Proje Bilgileri</h3>
              <div className="space-y-5">
                {project.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Konum</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.location}</p>
                    </div>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {project.status === "completed" ? "Tamamlanma Yılı" : "Planlanan Tarih"}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.year}</p>
                    </div>
                  </div>
                )}
                {project.area && (
                  <div className="flex items-start gap-3">
                    <Layers className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Alan</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.area}</p>
                    </div>
                  </div>
                )}
                {project.units && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Birim Sayısı</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.units}</p>
                    </div>
                  </div>
                )}
                {project.floors && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-zinc-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Kat Sayısı</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.floors}</p>
                    </div>
                  </div>
                )}
                {project.progress !== undefined && (
                  <div>
                    <p className="text-sm font-medium mb-2">İlerleme: %{project.progress}</p>
                    <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/iletisim"
                className="flex items-center justify-center gap-2 w-full py-3 mt-6 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Bilgi Alın
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
