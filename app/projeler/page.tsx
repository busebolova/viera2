import Link from "next/link"
import { ChevronRight, Clock, CheckCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { getProjects } from "@/lib/github-content"

export const metadata = {
  title: "Projelerimiz - Tamamlanan ve Devam Eden Projeler | Viera & Alkan Yapı",
  description: "Viera & Alkan Yapı tamamlanan, devam eden ve yakında başlayacak inşaat projeleri.",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ProjectsPage() {
  const projectsData = await getProjects(Date.now())

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">

          {/* DEVAM EDEN */}
          {projectsData.ongoing?.length > 0 && (
            <div className="mb-16">
              <SectionHeader
                icon={<Clock className="h-6 w-6 text-amber-500" />}
                title="Devam Eden Projeler"
                description="Şu anda aktif olarak çalıştığımız projeler"
                bg="bg-amber-500/10"
              />
              <Grid>
                {projectsData.ongoing.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Devam Ediyor"
                    badgeColor="amber"
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* BAŞLAYACAK */}
          {projectsData.upcoming?.length > 0 && (
            <div className="mb-16">
              <SectionHeader
                icon={<Calendar className="h-6 w-6 text-blue-500" />}
                title="Başlayacak Projeler"
                description="Yakında başlayacak projelerimiz"
                bg="bg-blue-500/10"
              />
              <Grid>
                {projectsData.upcoming.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Yakında"
                    badgeColor="blue"
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* TAMAMLANAN */}
          {projectsData.completed?.length > 0 && (
            <div className="mb-16">
              <SectionHeader
                icon={<CheckCircle className="h-6 w-6 text-green-500" />}
                title="Tamamlanan Projeler"
                description="Başarıyla tamamladığımız projeler"
                bg="bg-green-500/10"
              />
              <Grid>
                {projectsData.completed.map((project) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || project.image || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Tamamlandı"
                    badgeColor="green"
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* CTA */}
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

/* ---- yardımcı componentler (aynı dosya içinde, güvenli) ---- */

function SectionHeader({
  icon,
  title,
  description,
  bg,
}: {
  icon: React.ReactNode
  title: string
  description: string
  bg: string
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${bg}`}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
