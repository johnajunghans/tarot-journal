/**
 * Insights Page
 * 
 * View and manage insights derived from readings.
 */
"use client"

import { Sparkles } from "lucide-react"

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Insights</h1>
          <p className="text-muted-foreground">
            View and manage insights derived from your readings
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-purple-600/10 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-center max-w-md">
            This feature is under development. Soon you'll be able to view all your insights in one place.
          </p>
        </div>
      </main>
    </div>
  )
}

