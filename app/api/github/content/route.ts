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
      return NextResponse.json({ content: {} })
    }

    const data = await res.json()
    const content = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8"))

    return NextResponse.json({
      content,      // panelin beklediği key
      sha: data.sha
    })
  } catch {
    return NextResponse.json({ content: {} })
  }
}
