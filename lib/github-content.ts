// GitHub'dan içerik çeken yardımcı fonksiyonlar
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function getContent<T>(file: string): Promise<T> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    throw new Error(`GitHub config missing for ${file}`)
  }

  try {
    // GitHub RAW URL - direkt JSON içeriğini çek
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/content/${file}.json?t=${Date.now()}`

    console.log(`[v0] Fetching ${file} from GitHub RAW`)

    const res = await fetch(rawUrl, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Cache-Control": "no-cache",
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch ${file}: ${res.status}`)
    }

    const data = await res.json()
    console.log(`[v0] Successfully loaded ${file} from GitHub`)
    return data as T
  } catch (err) {
    console.error(`[v0] Error fetching ${file}:`, err)
    throw err
  }
}
