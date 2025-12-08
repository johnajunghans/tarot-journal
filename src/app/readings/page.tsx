/**
 * Readings Page
 * 
 * Displays a list of all user's tarot readings.
 */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReadingListCard } from "@/components/reading-card"
import { getReadings } from "@/lib/storage"
import { Reading } from "@/lib/types"

export default function ReadingsPage() {
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
      <main className="container mx-auto px-4 py-8">
        {readings.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">No readings yet</h2>
            <p className="text-muted-foreground mb-8">Start your journey by recording your first reading.</p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/new-reading">Start Reading</Link>
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Your Readings</h1>
              <p className="text-muted-foreground">
                {readings.length} {readings.length === 1 ? 'reading' : 'readings'} recorded
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readings.map(reading => (
                <ReadingListCard key={reading.id} reading={reading} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

