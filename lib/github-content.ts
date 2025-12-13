// GitHub'dan içerik çeken yardımcı fonksiyonlar (FINAL – CACHE YOK)

export const dynamic = "force-dynamic"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function getContent<T>(file: string): Promise<T> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error(`GitHub config missing for ${file}`)
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}`

  const res = await fetch(apiUrl, {
    cache: "no-store",
    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${file}: ${res.status}`)
  }

  const json = await res.json()

  const decoded = Buffer.from(json.content, "base64").toString("utf-8")
  return JSON.parse(decoded) as T
}

export async function getProjects() {
  const data = await getContent<any>("projects")

  const processProjects = (projects: any[]) =>
    projects.map((project: any, index: number) => ({
      ...project,
      id: project.id || `${generateSlug(project.title)}-${index}`,
      slug: project.slug || generateSlug(project.title),
    }))

  return {
    ...data,
    completed: processProjects(data.completed || []),
    ongoing: processProjects(data.ongoing || []),
    upcoming: processProjects(data.upcoming || []),
  }
}
