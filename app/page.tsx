import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"
import { fetchWordPressPosts, fetchWordPressPostsByCategory } from "@/lib/wordpress"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Build timestamp: 2025-01-06T14:30:00Z - Force fresh deployment
export default async function Home() {
  console.log("[v0] Page rendering started")

  // Only request categories that actually exist on WordPress
  const [heroPosts, laligaPosts, bundesligaPosts, serieAPosts] = await Promise.all([
    fetchWordPressPosts(4),
    fetchWordPressPostsByCategory("laliga", 3),
    fetchWordPressPostsByCategory("bundesliga", 3),
    fetchWordPressPostsByCategory("serie-a", 3),
  ])

  console.log(
    "[v0] Data fetched - Hero:",
    heroPosts?.length || 0,
    "LaLiga:",
    laligaPosts?.length || 0,
    "Bundesliga:",
    bundesligaPosts?.length || 0,
    "Serie A:",
    serieAPosts?.length || 0
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero initialPosts={heroPosts || []} />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <NewsSection title="LaLiga" league="laliga" flagCode="es" initialPosts={laligaPosts || []} />
          <NewsSection title="Bundesliga" league="bundesliga" flagCode="de" initialPosts={bundesligaPosts || []} />
          <NewsSection title="Serie A" league="serie-a" flagCode="it" initialPosts={serieAPosts || []} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
