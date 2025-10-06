import { Button } from "@/components/ui/button"
import { getTimeAgo, stripHtmlTags, type WordPressPost } from "@/lib/wordpress"
import { ArrowRight, Clock } from "lucide-react"

interface HeroProps {
  initialPosts: WordPressPost[]
}

export function Hero({ initialPosts }: HeroProps) {
  if (!initialPosts?.length) {
    return null
  }

  const mainPost = initialPosts[0]
  const secondaryPosts = initialPosts.slice(1, 4)

  return (
    <section className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-2">
      {/* Main Post */}
      <a
        href={mainPost.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-xl border border-gray-200 hover:border-primary transition-colors"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={
              mainPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/football-news-headline.png"
            }
            alt={stripHtmlTags(mainPost.title.rendered)}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <h2
            className="text-2xl font-bold text-white mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: mainPost.title.rendered }}
          />
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            {getTimeAgo(mainPost.date)}
          </div>
        </div>
      </a>

      {/* Secondary Posts */}
      <div className="grid gap-4">
        {secondaryPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 items-center border border-gray-200 rounded-lg overflow-hidden hover:border-primary transition-colors"
          >
            <div className="w-1/3 aspect-video overflow-hidden bg-muted">
              <img
                src={
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/football-news-headline.png"
                }
                alt={stripHtmlTags(post.title.rendered)}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 p-2">
              <h3
                className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {getTimeAgo(post.date)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
