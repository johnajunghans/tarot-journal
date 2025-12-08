"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReadingListCard } from "@/components/reading-card"
import { getReadings } from "@/lib/storage"
import { Reading } from "@/lib/types"
import { Plus } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import SpreadCreationCanvas from "@/components/canvas/spread-creation-canvas"

export default function Home() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setReadings(getReadings())
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-8 flex justify-center items-center">
        <div className="animate-pulse">Loading readings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Tarot Journal
          </h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity text-white">
              <Link href="/new-reading">
                <Plus className="w-4 h-4" /> New Reading
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* {readings.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">No readings yet</h2>
            <p className="text-muted-foreground mb-8">Start your journey by recording your first reading.</p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/new-reading">Start Reading</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readings.map(reading => (
              <ReadingListCard key={reading.id} reading={reading} />
            ))}
          </div>
        )} */}

        {/* Temporary just to test */}
        <SpreadCreationCanvas />
      </main>
    </div>
  )
}
