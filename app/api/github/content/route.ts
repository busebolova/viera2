import { NextResponse } from "next/server"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

if (!GITHUB_TOKEN) {
  console.error("Missing GitHub Token in env!")
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get("file")

  if (!file) {
    return NextResponse.json({ error: "file param missing" }, { status: 400 })
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json?ref=${GITHUB_BRANCH}`

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return NextResponse.json({ content: {}, sha: null })
  }

  const data = await res.json()
  const decoded = JSON.parse(Buffer.from(data.content, "base64").toString("utf8"))

  return NextResponse.json({ content: decoded, sha: data.sha })
}

export async function PUT(request: Request) {
  const { file, content, sha } = await request.json()

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${file}.json`

  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString("base64")

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Update ${file}.json`,
      content: encoded,
      ...(sha && { sha }),
      branch: GITHUB_BRANCH,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
