import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { getTimeAgo, stripHtmlTags, type WordPressPost } from "@/lib/wordpress"

interface HeroProps {
  initialPosts: WordPressPost[]
}

export function Hero({ initialPosts }: HeroProps) {
  console.log("[v0] Hero component received posts:", initialPosts.length)

  if (initialPosts.length === 0) {
    return (
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stories available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredStory = {
    title: stripHtmlTags(initialPosts[0].title.rendered),
    excerpt: stripHtmlTags(initialPosts[0].excerpt.rendered),
    image: initialPosts[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/vibrant-football-match.png",
    category: "Latest",
    time: getTimeAgo(initialPosts[0].date),
    link: `https://footmundo.co.uk/?p=${initialPosts[0].id}`,
  }

  const recentStories = initialPosts.slice(1, 4).map((post) => ({
    title: stripHtmlTags(post.title.rendered),
    excerpt: stripHtmlTags(post.excerpt.rendered),
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/football-news-headline.png",
    category: "Latest",
    time: getTimeAgo(post.date),
    link: `https://footmundo.co.uk/?p=${post.id}`,
  }))

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <a href={featuredStory.link} target="_blank" rel="noopener noreferrer" className="group block">
            <div className="grid gap-3 lg:grid-cols-2 lg:gap-6 items-center">
              <div className="relative aspect-[16/9] lg:aspect-[16/10] rounded-lg overflow-hidden bg-muted">
                <img
                  src={featuredStory.image || "/placeholder.svg"}
                  alt={featuredStory.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="default">{featuredStory.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {featuredStory.time}
                  </span>
                </div>
                <h2 className="font-sans text-lg md:text-xl lg:text-3xl font-bold tracking-tight text-balance group-hover:text-primary transition-colors">
                  {featuredStory.title}
                </h2>
                <p className="hidden lg:block text-base text-muted-foreground text-pretty leading-relaxed">
                  {featuredStory.excerpt}
                </p>
              </div>
            </div>
          </a>
        </div>

        {recentStories.length > 0 && (
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {recentStories.map((story, index) => (
              <a key={index} href={story.link} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="flex md:flex-col gap-3 md:gap-0 md:space-y-3">
                  <div className="relative w-24 h-20 md:w-full md:h-48 lg:h-56 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 space-y-1 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {story.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {story.time}
                      </span>
                    </div>
                    <h3 className="font-sans text-sm md:text-lg font-bold text-balance group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-3">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
