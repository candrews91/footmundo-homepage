import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { getTimeAgo, stripHtmlTags, type WordPressPost } from "@/lib/wordpress"

interface NewsSectionProps {
  title: string
  league: string
  flagCode: string
  initialPosts: WordPressPost[]
}

const leagueColors: Record<string, string> = {
  laliga: "bg-yellow-400",
  bundesliga: "bg-red-600",
  "serie-a": "bg-green-600",
  "ligue-1": "bg-blue-600",
  "premier-league": "bg-red-600",
  eredivisie: "bg-orange-500",
  "liga-portugal": "bg-red-600",
}

const leagueTextColors: Record<string, string> = {
  laliga: "text-yellow-600 hover:text-yellow-700",
  bundesliga: "text-red-600 hover:text-red-700",
  "serie-a": "text-green-600 hover:text-green-700",
  "ligue-1": "text-blue-600 hover:text-blue-700",
  "premier-league": "text-red-600 hover:text-red-700",
  eredivisie: "text-orange-600 hover:text-orange-700",
  "liga-portugal": "text-red-600 hover:text-red-700",
}

export function NewsSection({ title, league, flagCode, initialPosts }: NewsSectionProps) {
  console.log(`[v0] NewsSection ${title} received posts:`, initialPosts.length)

  if (initialPosts.length === 0) {
    return (
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-3xl font-bold text-balance relative inline-block">
            <span
              className={`absolute inset-0 ${leagueColors[league] || "bg-primary"} -skew-x-3 -rotate-1 rounded-sm opacity-90`}
              style={{ transform: "skewX(-3deg) rotate(-1deg)" }}
            />
            <span className="relative text-white px-4 py-2">{title}</span>
          </h2>
          <Button variant="link" className={leagueTextColors[league] || "text-primary"}>
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No {title} news available at the moment.</p>
        </div>
      </section>
    )
  }

  const posts = initialPosts.slice(0, 3).map((post) => ({
    title: stripHtmlTags(post.title.rendered),
    excerpt: stripHtmlTags(post.excerpt.rendered),
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/football-news-headline.png",
    time: getTimeAgo(post.date),
    link: `https://footmundo.co.uk/?p=${post.id}`,
  }))

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-3xl font-bold text-balance relative inline-block">
          <span
            className={`absolute inset-0 ${leagueColors[league] || "bg-primary"} -skew-x-3 -rotate-1 rounded-sm opacity-90`}
            style={{ transform: "skewX(-3deg) rotate(-1deg)" }}
          />
          <span className="relative text-white px-4 py-2">{title}</span>
        </h2>
        <Button variant="link" className={leagueTextColors[league] || "text-primary"}>
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <a key={index} href={post.link} target="_blank" rel="noopener noreferrer" className="group">
            <Card className="overflow-hidden border-2 hover:border-primary transition-colors h-full">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-sans text-lg font-bold text-balance group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {post.time}
                </span>
                <Button variant="link" size="sm" className={`p-0 h-auto ${leagueTextColors[league] || "text-primary"}`}>
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}
