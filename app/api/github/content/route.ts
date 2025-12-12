import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (!file) {
    return NextResponse.json({ error: "Missing file parameter" }, { status: 400 })
  }

  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.log("[v0] GitHub config missing, returning empty for:", file)
    return NextResponse.json({ content: null }, { headers })
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}&t=${Date.now()}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      if (res.status === 404) {
        console.log("[v0] File not found in GitHub:", file)
        return NextResponse.json({ content: null }, { headers })
      }
      throw new Error(`GitHub API error: ${res.status}`)
    }

    const data = await res.json()
    const githubContent = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"))

    console.log("[v0] Successfully loaded", file, "from GitHub - raw data")
    return NextResponse.json({ content: githubContent, sha: data.sha }, { headers })
  } catch (err: any) {
    console.error("[v0] Error fetching from GitHub:", err.message)
    return NextResponse.json({ content: null, error: err.message }, { headers })
  }
}

export async function POST(request: Request) {
  return PUT(request)
}

export async function PUT(request: Request) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { file, content, sha } = await request.json()
    console.log("[v0] Saving to GitHub:", file, "- content keys:", Object.keys(content))

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

    let fileSha = sha
    try {
      const checkRes = await fetch(`${url}?ref=${GITHUB_BRANCH}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      })
      if (checkRes.ok) {
        const checkData = await checkRes.json()
        fileSha = checkData.sha
        console.log("[v0] Using latest SHA:", fileSha)
      }
    } catch (e) {
      console.log("[v0] No existing file, will create new")
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${file}.json from admin panel - ${new Date().toISOString()}`,
        content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
        branch: GITHUB_BRANCH,
        ...(fileSha && { sha: fileSha }),
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error("[v0] GitHub PUT error:", err)
      return NextResponse.json({ error: err.message || "GitHub API error" }, { status: res.status })
    }

    const result = await res.json()
    console.log("[v0] Successfully saved", file, "to GitHub with new SHA:", result.content?.sha)

    try {
      revalidatePath("/", "layout")
      revalidatePath("/projeler")
      revalidatePath("/hakkimizda")
      revalidatePath("/hizmetlerimiz")
      revalidatePath("/iletisim")
      console.log("[v0] Cache cleared for all pages")
    } catch (e) {
      console.log("[v0] Revalidation error (ignorable):", e)
    }

    return NextResponse.json({
      success: true,
      sha: result.content?.sha,
      message: "Başarıyla kaydedildi. Sayfayı yenileyin.",
    })
  } catch (err: any) {
    console.error("[v0] PUT error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
