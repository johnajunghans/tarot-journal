/**
 * Journal Page
 * 
 * Dashboard landing for the journal with quick access to readings, spreads, and insights.
 */
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, LayoutGrid, Sparkles } from "lucide-react"

const tiles = [
  {
    title: "Readings",
    description: "Review your recent readings and continue where you left off.",
    href: "/journal/readings",
    icon: BookOpen,
    cta: "View readings",
  },
  {
    title: "Spreads",
    description: "Design and manage custom spreads to use in your readings.",
    href: "/journal/spreads",
    icon: LayoutGrid,
    cta: "Manage spreads",
  },
  {
    title: "Insights",
    description: "Explore insights derived from your readings across time.",
    href: "/journal/insights",
    icon: Sparkles,
    cta: "View insights",
  },
]

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Journal</h1>
          <p className="text-muted-foreground">
            Quick access to your readings, spreads, and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiles.map((tile) => {
            const Icon = tile.icon
            return (
              <Card key={tile.title} className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">{tile.title}</CardTitle>
                  <Icon className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tile.description}</p>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={tile.href}>{tile.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}

