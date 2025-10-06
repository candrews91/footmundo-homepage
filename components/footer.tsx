"use client"

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useState, useEffect } from "react"
import Image from "next/image"

export function Footer() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const leagues = [
    { id: "laliga", name: "LaLiga" },
    { id: "bundesliga", name: "Bundesliga" },
    { id: "seriea", name: "Serie A" },
    { id: "ligue1", name: "Ligue 1" },
    { id: "eredivisie", name: "Eredivisie" },
    { id: "liga-portugal", name: "Liga Portugal" },
  ]

  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Image
              src="/footmundo-logo-dark.png"
              alt="Footmundo"
              width={200}
              height={57}
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm text-gray-300">Your source for football news from around the world.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Leagues</h3>
            <ul className="space-y-2">
              {leagues.map((league) => (
                <li key={league.id}>
                  <a href={`#${league.id}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {league.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://footmundo.co.uk/about-us"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://footmundo.co.uk/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/footmundo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://x.com/footmundo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="X"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/footmundo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/footmundo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 text-center text-sm text-gray-300">
          <p className="text-white">&copy; {new Date().getFullYear()} Footmundo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
