import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get("file")

    if (!file) {
      return NextResponse.json({ error: "File parameter required" }, { status: 400 })
    }

    const timestamp = Date.now()
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}&t=${timestamp}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      console.log(`[v0] GitHub GET error for ${file}:`, res.status)
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const data = await res.json()
    const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"))

    console.log(`[v0] Successfully fetched ${file} from GitHub`)

    return NextResponse.json(
      {
        content,
        sha: data.sha,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    )
  } catch (err: any) {
    console.error("[v0] GET error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  return PUT(request)
}

export async function PUT(request: Request) {
  console.log("[v0] === API PUT İSTEĞİ BAŞLADI ===")

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("[v0] ❌ GitHub yapılandırması eksik!")
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { file, content, sha } = await request.json()
    console.log("[v0] Kaydedilecek dosya:", file)

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

    let fileSha = sha
    try {
      const timestamp = Date.now()
      const checkRes = await fetch(`${url}?ref=${GITHUB_BRANCH}&t=${timestamp}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      })
      if (checkRes.ok) {
        const checkData = await checkRes.json()
        fileSha = checkData.sha
        console.log("[v0] Güncel SHA bulundu:", fileSha)
      }
    } catch (e) {
      console.log("[v0] SHA kontrol hatası:", e)
    }

    const payload = {
      message: `Update ${file}.json from admin panel - ${new Date().toISOString()}`,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
      branch: GITHUB_BRANCH,
      ...(fileSha && { sha: fileSha }),
    }

    console.log("[v0] GitHub'a gönderiliyor...")
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error("[v0] ❌ GitHub API hatası:", err)
      return NextResponse.json({ error: `GitHub API Hatası: ${err.message}` }, { status: res.status })
    }

    const result = await res.json()
    console.log("[v0] ✅ GitHub'a başarıyla yazıldı!")

    try {
      revalidatePath("/", "layout")
      revalidatePath("/")
      revalidatePath("/projeler")
      revalidatePath("/hakkimizda")
      revalidatePath("/hizmetlerimiz")
      revalidatePath("/iletisim")
      revalidatePath("/yonetim")
      console.log("[v0] ✅ Tüm sayfalar revalidate edildi")
    } catch (e) {
      console.log("[v0] Revalidate hatası:", e)
    }

    console.log("[v0] === API PUT İSTEĞİ TAMAMLANDI ===")

    return NextResponse.json(
      {
        success: true,
        sha: result.content?.sha,
        message: "Başarıyla kaydedildi ve cache temizlendi",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      },
    )
  } catch (err: any) {
    console.error("[v0] ❌ PUT exception:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
// lib/github-content.ts
type ContentFile = "home" | "about" | "services" | "projects" | "contact"

const baseUrl = () => {
  // Server-side fetch için absolute URL daha stabil.
  // VERCEL_URL varsa onu kullan.
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  // Lokal / farklı ortamlar
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

async function fetchContent<T>(file: ContentFile, t?: number): Promise<{ content: T; sha?: string }> {
  const ts = t ?? Date.now()
  const url = `${baseUrl()}/api/github/content?file=${file}&t=${ts}`

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { "Cache-Control": "no-store" },
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    throw new Error(`Content fetch failed (${file}): ${res.status}`)
  }

  return res.json()
}

export async function getContent(file: Exclude<ContentFile, "projects">, t?: number) {
  const data = await fetchContent<any>(file, t)
  return data.content
}

export async function getProjects(t?: number) {
  const data = await fetchContent<any>("projects", t)
  return data.content
}
