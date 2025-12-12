import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function POST(request: Request) {
  return PUT(request)
}

export async function PUT(request: Request) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { file, content, sha } = await request.json()
    console.log("[v0] CLIENT: Saving to GitHub:", file)

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

    // En güncel SHA'yı al
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

    // GitHub'a kaydet
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
    console.log("[v0] Successfully saved", file, "to GitHub with SHA:", result.content?.sha)

    try {
      revalidatePath("/", "layout")
      revalidatePath("/projeler", "layout")
      revalidatePath("/projeler/[slug]", "page")
      revalidatePath("/hakkimizda")
      revalidatePath("/hizmetlerimiz")
      revalidatePath("/iletisim")
      console.log("[v0] Cache cleared for all pages")
    } catch (e) {
      console.log("[v0] Revalidation error (non-fatal):", e)
    }

    return NextResponse.json({
      success: true,
      sha: result.content?.sha,
      message: "Başarıyla kaydedildi. Sayfayı yenileyin (F5).",
    })
  } catch (err: any) {
    console.error("[v0] PUT error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
