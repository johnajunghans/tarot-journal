/**
 * Spreads Page
 * 
 * Create and manage custom tarot spreads.
 */
"use client"

import SpreadCreationCanvas from "@/components/canvas/spread-creation-canvas"

export default function SpreadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Custom Spreads</h1>
          <p className="text-muted-foreground">
            Create and design your own tarot spreads with custom positions
          </p>
        </div>
        
        <div className="w-full h-[calc(100vh-200px)]">
          <SpreadCreationCanvas />
        </div>
      </main>
    </div>
  )
}

