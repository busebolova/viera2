import { type NextRequest, NextResponse } from "next/server"
import { defaultContent } from "@/lib/default-content"

export const dynamic = "force-dynamic"
export const revalidate = 0

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main"

export async function GET(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  try {
    const { key } = await params
    const defaultData = defaultContent[key as keyof typeof defaultContent]

    // If no GitHub config, use default content
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      console.log("[v0] No GitHub config, using default content for:", key)
      return NextResponse.json(
        {
          data: defaultData || {},
          success: true,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        },
      )
    }

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/${key}.json?ref=${GITHUB_BRANCH}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      console.log("[v0] GitHub fetch failed, using default content for:", key)
      return NextResponse.json(
        {
          data: defaultData || {},
          success: true,
        },
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        },
      )
    }

    const data = await response.json()
    const content = Buffer.from(data.content, "base64").toString("utf-8")
    const parsedContent = JSON.parse(content)

    console.log("[v0] Loaded content from GitHub for:", key)

    return NextResponse.json(
      {
        data: parsedContent,
        sha: data.sha,
        success: true,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )
  } catch (error) {
    console.log("[v0] Error loading content:", error)
    const resolvedParams = await params
    const defaultData = defaultContent[resolvedParams.key as keyof typeof defaultContent]
    return NextResponse.json(
      {
        data: defaultData || {},
        success: true,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    )
  }
}
