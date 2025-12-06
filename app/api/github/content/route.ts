import { NextResponse } from "next/server"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (!file || !GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "Missing config" }, { status: 400 })
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ data: {} })
    }

    const data = await res.json()
    const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"))
    return NextResponse.json({ data: content, sha: data.sha })
  } catch {
    return NextResponse.json({ data: {} })
  }
}

export async function PUT(request: Request) {
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "GitHub yapılandırması eksik" }, { status: 400 })
  }

  try {
    const { file, content, sha } = await request.json()
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${file}.json`,
        content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
        branch: GITHUB_BRANCH,
        ...(sha && { sha }),
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
