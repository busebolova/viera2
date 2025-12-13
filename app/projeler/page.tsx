import Link from "next/link"
import { ChevronRight, Clock, CheckCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Projelerimiz - Tamamlanan ve Devam Eden Projeler | Viera & Alkan Yapı",
  description: "Viera & Alkan Yapı tamamlanan, devam eden ve yakında başlayacak inşaat projeleri.",
}

async function getProjectsData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/content?file=projects`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Projects fetch failed")
  }

  const { content } = await res.json()
  return content
}

export default async function ProjectsPage() {
  const projectsData = await getProjectsData()

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">

          {/* DEVAM EDEN */}
          {projectsData.ongoing?.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.ongoing || "Devam Eden Projeler"}
                  </h2>
                  <p className="text-muted-foreground">
                    Şu anda aktif olarak çalıştığımız projeler
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.ongoing.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Devam Ediyor"
                    badgeColor="amber"
                  />
                ))}
              </div>
            </div>
          )}

          {/* YAKLAŞAN */}
          {projectsData.upcoming?.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.upcoming || "Başlayacak Projeler"}
                  </h2>
                  <p className="text-muted-foreground">
                    Yakında başlayacak yeni projelerimiz
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.upcoming.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Yakında"
                    badgeColor="blue"
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAMAMLANAN */}
          {projectsData.completed?.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {projectsData.categories?.completed || "Tamamlanan Projeler"}
                  </h2>
                  <p className="text-muted-foreground">
                    Başarıyla tamamladığımız projeler
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projectsData.completed.map((project: any) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Tamamlandı"
                    badgeColor="green"
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-20 bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Projeleriniz İçin Bizimle İletişime Geçin
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Uzman ekibimizle projelerinizi hayata geçirmek için hazırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-zinc-800 text-white">
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
