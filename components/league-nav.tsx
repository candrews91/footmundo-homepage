"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const leagues = [
  { id: "all", name: "All Leagues" },
  { id: "laliga", name: "LaLiga" },
  { id: "bundesliga", name: "Bundesliga" },
  { id: "seriea", name: "Serie A" },
  { id: "ligue1", name: "Ligue 1" },
]

export function LeagueNav() {
  const [activeLeague, setActiveLeague] = useState("all")

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {leagues.map((league) => (
            <Button
              key={league.id}
              variant={activeLeague === league.id ? "default" : "ghost"}
              onClick={() => setActiveLeague(league.id)}
              className="whitespace-nowrap"
            >
              {league.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
