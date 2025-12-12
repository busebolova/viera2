import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

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

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

    const res = await fetch(`${url}?ref=${GITHUB_BRANCH}`, {
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

    return NextResponse.json({
      content,
      sha: data.sha,
    })
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
  console.log("[v0] GitHub Token mevcut:", !!GITHUB_TOKEN)
  console.log("[v0] GitHub Owner:", GITHUB_OWNER)
  console.log("[v0] GitHub Repo:", GITHUB_REPO)
  console.log("[v0] GitHub Branch:", GITHUB_BRANCH)

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("[v0] ❌ GitHub yapılandırması eksik!")
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { file, content, sha } = await request.json()
    console.log("[v0] Kaydedilecek dosya:", file)
    console.log("[v0] İçerik boyutu:", JSON.stringify(content).length, "karakter")
    console.log("[v0] Gelen SHA:", sha)

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`
    console.log("[v0] GitHub URL:", url)

    let fileSha = sha
    try {
      console.log("[v0] Mevcut dosya SHA'sı kontrol ediliyor...")
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
        console.log("[v0] Güncel SHA bulundu:", fileSha)
      } else {
        console.log("[v0] Dosya mevcut değil, yeni oluşturulacak")
      }
    } catch (e) {
      console.log("[v0] SHA kontrol hatası (normal):", e)
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

    console.log("[v0] GitHub response status:", res.status)

    if (!res.ok) {
      const err = await res.json()
      console.error("[v0] ❌ GitHub API hatası:", err)
      return NextResponse.json(
        {
          error: `GitHub API Hatası: ${err.message || JSON.stringify(err)}`,
        },
        { status: res.status },
      )
    }

    const result = await res.json()
    console.log("[v0] ✅ GitHub'a başarıyla yazıldı!")
    console.log("[v0] Yeni SHA:", result.content?.sha)

    try {
      revalidatePath("/", "layout")
      revalidatePath("/projeler", "layout")
      revalidatePath("/hakkimizda")
      revalidatePath("/hizmetlerimiz")
      revalidatePath("/iletisim")
      console.log("[v0] ✅ Cache temizlendi")
    } catch (e) {
      console.log("[v0] Cache temizleme hatası (önemsiz):", e)
    }

    console.log("[v0] === API PUT İSTEĞİ TAMAMLANDI ===")

    return NextResponse.json({
      success: true,
      sha: result.content?.sha,
      message: "Başarıyla kaydedildi",
    })
  } catch (err: any) {
    console.error("[v0] ❌ PUT exception:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
