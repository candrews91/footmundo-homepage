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

  const [heroPosts, laligaPosts, bundesligaPosts, serieAPosts, ligue1Posts] = await Promise.all([
    fetchWordPressPosts(4),
    fetchWordPressPostsByCategory("laliga", 3),
    fetchWordPressPostsByCategory("bundesliga", 3),
    fetchWordPressPostsByCategory("serie-a", 3),
    fetchWordPressPostsByCategory("ligue-1", 3),
  ])

  console.log("[v0] Data fetched - Hero:", heroPosts?.length || 0, "LaLiga:", laligaPosts?.length || 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero initialPosts={heroPosts || []} />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <NewsSection title="LaLiga" league="laliga" flagCode="es" initialPosts={laligaPosts || []} />
          <NewsSection title="Bundesliga" league="bundesliga" flagCode="de" initialPosts={bundesligaPosts || []} />
          <NewsSection title="Serie A" league="serie-a" flagCode="it" initialPosts={serieAPosts || []} />
          <NewsSection title="Ligue 1" league="ligue-1" flagCode="fr" initialPosts={ligue1Posts || []} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
