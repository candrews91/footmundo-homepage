"use client"

import { Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const leagues = [
  { id: "premier-league", name: "Premier League", flagCode: "gb-eng" },
  { id: "laliga", name: "LaLiga", flagCode: "es" },
  { id: "bundesliga", name: "Bundesliga", flagCode: "de" },
  { id: "seriea", name: "Serie A", flagCode: "it" },
  { id: "ligue1", name: "Ligue 1", flagCode: "fr" },
  { id: "eredivisie", name: "Eredivisie", flagCode: "nl" },
  { id: "liga-portugal", name: "Liga Portugal", flagCode: "pt" },
]

export function Header() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end gap-3 py-2 border-b">
          <a
            href="https://www.facebook.com/footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://threads.net/@footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.186 3.003c-2.164 0-3.956.784-5.116 2.15-.88 1.036-1.39 2.39-1.518 3.99l2.124.238c.095-1.287.456-2.296 1.073-3.007.77-.887 1.97-1.371 3.437-1.371 1.43 0 2.556.44 3.254 1.272.697.83 1.05 1.99 1.05 3.456v.305c-1.124-.42-2.37-.63-3.736-.63-1.99 0-3.64.56-4.93 1.68-1.29 1.12-1.935 2.63-1.935 4.53 0 1.81.61 3.27 1.83 4.38 1.22 1.11 2.79 1.67 4.71 1.67 2.16 0 3.87-.82 5.13-2.46v2.1h2.1V11.09c0-2.14-.56-3.82-1.68-5.04-1.12-1.22-2.74-1.83-4.86-1.83zm.814 15.997c-1.43 0-2.556-.44-3.254-1.272-.697-.83-1.05-1.99-1.05-3.456 0-1.43.44-2.556 1.272-3.254.83-.697 1.99-1.05 3.456-1.05 1.124 0 2.23.21 3.32.63v.305c0 1.81-.61 3.27-1.83 4.38-1.22 1.11-2.79 1.67-4.71 1.67z" />
            </svg>
          </a>
          <a
            href="https://bsky.app/profile/footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/footmundo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        <div className="flex h-16 md:h-24 items-center justify-between gap-6">
          <a href="/" className="flex items-center flex-shrink-0">
            <Image
              src={isDark ? "/footmundo-logo-dark.png" : "/footmundo-logo-light.png"}
              alt="Footmundo"
              width={320}
              height={90}
              className="h-10 md:h-20 w-auto"
              priority
            />
          </a>

          <nav className="hidden lg:flex items-center gap-4 flex-1 justify-center overflow-x-auto">
            {leagues.map((league) => (
              <a
                key={league.id}
                href={`#${league.id}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <img
                  src={`https://flagcdn.com/16x12/${league.flagCode}.png`}
                  srcSet={`https://flagcdn.com/32x24/${league.flagCode}.png 2x, https://flagcdn.com/48x36/${league.flagCode}.png 3x`}
                  width="16"
                  height="12"
                  alt={`${league.name} flag`}
                  className="inline-block"
                />
                {league.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
