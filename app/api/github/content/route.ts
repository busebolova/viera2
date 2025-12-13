// lib/github-content.ts

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

export async function getContent<T>(file: string, timestamp?: number): Promise<T> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error(`GitHub config missing for ${file}`)
  }

  const ts = timestamp || Date.now()
  const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/content/${file}.json?t=${ts}`

  const res = await fetch(rawUrl, {
    cache: "no-store",
    next: { revalidate: 0 },
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Cache-Control": "no-cache",
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch ${file}: ${res.status}`)
  }

  return (await res.json()) as T
}

export async function getProjects(timestamp?: number) {
  const data = await getContent<any>("projects", timestamp)

  const processProjects = (projects: any[]) =>
    projects.map((project, index) => ({
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
