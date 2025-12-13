import Link from "next/link"
import { ChevronRight, Clock, CheckCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { getProjects } from "@/lib/github-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata = {
  title: "Projelerimiz - Viera & Alkan Yapı",
  description: "Tamamlanan, devam eden ve yakında başlayacak projelerimiz",
}

export default async function ProjectsPage() {
  const projectsData = await getProjects(Date.now())

  return (
    <div className="min-h-screen pb-16">
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">

          {/* DEVAM EDEN */}
          {projectsData.ongoing?.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                icon={<Clock className="h-6 w-6 text-amber-500" />}
                title={projectsData.categories?.ongoing || "Devam Eden Projeler"}
                subtitle="Şu anda aktif olarak devam eden projeler"
              />

              <Grid>
                {projectsData.ongoing.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Devam Ediyor"
                    badgeColor="amber"
                    priority={index < 3}
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* BAŞLAYACAK */}
          {projectsData.upcoming?.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                icon={<Calendar className="h-6 w-6 text-blue-500" />}
                title={projectsData.categories?.upcoming || "Başlayacak Projeler"}
                subtitle="Yakında başlayacak projeler"
              />

              <Grid>
                {projectsData.upcoming.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Yakında"
                    badgeColor="blue"
                    priority={index < 3}
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* TAMAMLANAN */}
          {projectsData.completed?.length > 0 && (
            <div className="mb-20">
              <SectionHeader
                icon={<CheckCircle className="h-6 w-6 text-green-500" />}
                title={projectsData.categories?.completed || "Tamamlanan Projeler"}
                subtitle="Başarıyla teslim edilen projeler"
              />

              <Grid>
                {projectsData.completed.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    image={project.mainImage || "/placeholder.svg"}
                    title={project.title}
                    description={project.shortDescription}
                    year={project.year}
                    detailUrl={`/projeler/${project.slug}`}
                    badge="Tamamlandı"
                    badgeColor="green"
                    priority={index < 3}
                  />
                ))}
              </Grid>
            </div>
          )}

          {/* CTA */}
          <div className="mt-24 rounded-xl bg-muted/30 p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Projeniz İçin Bizimle İletişime Geçin
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Deneyimli ekibimizle projelerinizi hayata geçirelim.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/iletisim">İletişime Geçin</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/hizmetlerimiz">
                  Hizmetlerimiz
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

/* ---------- helpers ---------- */

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
