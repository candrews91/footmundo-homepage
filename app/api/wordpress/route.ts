import { type NextRequest, NextResponse } from "next/server"

const WORDPRESS_URL = "https://blog.footmundo.co.uk"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const endpoint = searchParams.get("endpoint") || "posts"
  const params = new URLSearchParams()

  // Copy all query params except 'endpoint'
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      params.append(key, value)
    }
  })

  try {
    const url = `${WORDPRESS_URL}/wp-json/wp/v2/${endpoint}?${params.toString()}`
    console.log("[v0] Server-side fetching from:", url)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      redirect: "follow",
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error("[v0] WordPress API error:", response.status, response.statusText)
      return NextResponse.json({ error: "Failed to fetch from WordPress" }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Successfully fetched", Array.isArray(data) ? data.length : 1, "items")

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching from WordPress:", error)
    if (error instanceof Error && error.name === "AbortError") {
      console.error("[v0] Request timed out after 10 seconds")
      return NextResponse.json({ error: "Request timeout" }, { status: 504 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
