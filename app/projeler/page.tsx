import Link from "next/link"
import { ChevronRight, Clock, CheckCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { getProjects } from "@/lib/github-content"

interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  year: string
  mainImage?: string
  image?: string
}

interface ProjectsData {
  pageTitle?: string
  pageDescription?: string
  categories?: {
    completed: string
    ongoing: string
    upcoming: string
  }
  completed: Project[]
  ongoing: Project[]
  upcoming: Project[]
}

export const metadata = {
  title: "Projelerimiz - Tamamlanan ve Devam Eden Projeler | Viera & Alkan Yapı",
  description: "Viera & Alkan Yapı tamamlanan, devam eden ve yakında başlayacak inşaat projeleri.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ProjectsPage() {
  const projectsData = await getProjects()

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      {/* Projects Sections */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          {/* Devam Eden Projeler */}
          {projectsData.ongoing && projectsData.ongoing.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.ongoing || "Devam Eden Projeler"}
                  </h2>
                  <p className="text-muted-foreground">Şu anda aktif olarak çalıştığımız projeler</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.ongoing.map((project) => {
                  const projectImage = project.mainImage || project.image || "/placeholder.svg"
                  return (
                    <ProjectCard
                      key={project.id}
                      image={projectImage}
                      title={project.title}
                      description={project.shortDescription}
                      year={project.year}
                      detailUrl={`/projeler/${project.slug}`}
                      badge="Devam Ediyor"
                      badgeColor="amber"
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Başlayacak Projeler */}
          {projectsData.upcoming && projectsData.upcoming.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.upcoming || "Başlayacak Projeler"}
                  </h2>
                  <p className="text-muted-foreground">Yakında başlayacak yeni projelerimiz</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.upcoming.map((project) => {
                  const projectImage = project.mainImage || project.image || "/placeholder.svg"
                  return (
                    <ProjectCard
                      key={project.id}
                      image={projectImage}
                      title={project.title}
                      description={project.shortDescription}
                      year={project.year}
                      detailUrl={`/projeler/${project.slug}`}
                      badge="Yakında"
                      badgeColor="blue"
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Tamamlanan Projeler */}
          {projectsData.completed && projectsData.completed.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.completed || "Tamamlanan Projeler"}
                  </h2>
                  <p className="text-muted-foreground">Başarıyla tamamladığımız projelerimiz</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.completed.map((project) => {
                  const projectImage = project.mainImage || project.image || "/placeholder.svg"
                  return (
                    <ProjectCard
                      key={project.id}
                      image={projectImage}
                      title={project.title}
                      description={project.shortDescription}
                      year={project.year}
                      detailUrl={`/projeler/${project.slug}`}
                      badge="Tamamlandı"
                      badgeColor="green"
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Uzman ekibimizle projelerinizi hayata geçirmek için hazırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-zinc-800 hover:bg-zinc-700 text-white">
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-zinc-800 text-zinc-800 hover:bg-zinc-100 bg-transparent"
              >
                <Link href="/hizmetlerimiz">
                  Hizmetlerimizi İnceleyin
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
