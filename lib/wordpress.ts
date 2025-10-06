export interface WordPressPost {
  id: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  date: string
  featured_media: number
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text: string
    }>
  }
  categories: number[]
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
}

export async function fetchWordPressPosts(limit = 10): Promise<WordPressPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL
    if (!baseUrl) {
      console.error("[v0] NEXT_PUBLIC_WP_API_URL environment variable is not set")
      return []
    }

    const url = `${baseUrl}/posts?_embed&per_page=${limit}&orderby=date&order=desc`

    console.log("[v0] Fetching WordPress posts from:", url)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.error("[v0] WordPress API error:", response.status, response.statusText)
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`)
    }

    const posts = await response.json()
    console.log("[v0] Successfully fetched", posts.length, "posts")
    return posts
  } catch (error) {
    console.error("[v0] Error fetching WordPress posts:", error)
    return []
  }
}

async function fetchCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL
    if (!baseUrl) {
      console.error("[v0] NEXT_PUBLIC_WP_API_URL environment variable is not set")
      return null
    }

    const url = `${baseUrl}/categories?slug=${slug}`

    console.log("[v0] Fetching category from:", url)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${slug}`)
    }

    const categories: WordPressCategory[] = await response.json()
    console.log("[v0] Successfully fetched", categories.length, "items")
    return categories.length > 0 ? categories[0].id : null
  } catch (error) {
    console.error(`[v0] Error fetching category ${slug}:`, error)
    return null
  }
}

export async function fetchWordPressPostsByCategory(categorySlug: string, limit = 3): Promise<WordPressPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL
    if (!baseUrl) {
      console.error("[v0] NEXT_PUBLIC_WP_API_URL environment variable is not set")
      return []
    }

    // Fetch all categories for debugging
    let url = `${baseUrl}/categories?per_page=100`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const allCategoriesResponse = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (allCategoriesResponse.ok) {
      const allCategories: WordPressCategory[] = await allCategoriesResponse.json()
      console.log(
        "[v0] Available WordPress categories:",
        allCategories.map((cat) => ({ name: cat.name, slug: cat.slug })),
      )
    }

    const categoryId = await fetchCategoryIdBySlug(categorySlug)

    if (!categoryId) {
      console.warn(`[v0] Category not found: ${categorySlug}, falling back to recent posts`)
      return await fetchWordPressPosts(limit)
    }

    url = `${baseUrl}/posts?_embed&per_page=${limit}&orderby=date&order=desc&categories=${categoryId}`

    console.log("[v0] Fetching posts from:", url)

    const controller2 = new AbortController()
    const timeoutId2 = setTimeout(() => controller2.abort(), 15000)

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller2.signal,
    })

    clearTimeout(timeoutId2)

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for category: ${categorySlug}`)
    }

    const posts = await response.json()
    console.log(`[v0] Successfully fetched ${posts.length} posts for category ${categorySlug}`)
    return posts
  } catch (error) {
    console.error(`[v0] Error fetching WordPress posts for category ${categorySlug}:`, error)
    return await fetchWordPressPosts(limit)
  }
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

export function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}
