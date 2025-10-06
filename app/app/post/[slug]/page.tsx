import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"

export default async function PostPage({ params }: { params: { slug: string } }) {
  console.log("[v0] PostPage received slug:", params.slug)

  const baseUrl = process.env.NEXT_PUBLIC_WP_API_URL
  const slug = params.slug

  if (!baseUrl) {
    console.error("[v0] Missing NEXT_PUBLIC_WP_API_URL environment variable")
    return notFound()
  }

  try {
    // Fetch post by slug from WordPress REST API
    const res = await fetch(`${baseUrl}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error("[v0] Failed to fetch post:", res.status, res.statusText)
      return notFound()
    }

    const posts = await res.json()
    const post = posts[0]

    if (!post) {
      console.warn("[v0] No post found for slug:", slug)
      return notFound()
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 prose prose-lg max-w-none">
          <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <p className="text-gray-500">{new Date(post.date).toLocaleDateString()}</p>

          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
            <img
              src={post._embedded["wp:featuredmedia"][0].source_url}
              alt={post._embedded["wp:featuredmedia"][0].alt_text || ""}
              className="my-6 rounded-xl"
            />
          )}

          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("[v0] Error rendering post page:", error)
    return notFound()
  }
}
