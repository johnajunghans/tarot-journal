/**
 * New Spread Page
 * 
 * Create a new custom spread layout (coming soon).
 */
"use client"

import { useState } from "react"

import SpreadCreationCanvas from "@/components/canvas/spread-creation-canvas"
import { SpreadCanvasAddCard } from "@/components/spread-canvas-add-card"
import { SpreadPosition } from "@/lib/types"

// === Constants ===

const BASE_X = 16.25
const BASE_Y = 16.25
const OFFSET_X = 105 
const OFFSET_Y = 165

// === Helper Functions ===

/**
 * Calculate initial placement for a new card with smart cascading.
 * If cards already exist at this position number, offset to the right.
 */
function calculateInitialPlacement(
  position: number,
  existingPositions: SpreadPosition[]
): { x: number; y: number; rotation: number; zIndex: number } {
  const x = BASE_X + ((position - 1) * OFFSET_X)
  const y = BASE_Y + Math.floor(position / 11) * OFFSET_Y
  
  console.log(`🎯 [Placement] Position ${position}: (${x}, ${y})`)
  
  return {
    x,
    y,
    rotation: 0,
    zIndex: existingPositions.length // Stack order
  }
}

// === Component ===

export default function NewSpreadPage() {
  // === State ===
  
  const [positions, setPositions] = useState<SpreadPosition[]>([])

  // === Event Handlers ===
  
  /**
   * Add a new card position to the spread.
   */
  function handleAddPosition(title: string, description: string, position: number) {
    const placement = calculateInitialPlacement(position, positions)
    
    const newPosition: SpreadPosition = {
      id: `${Date.now()}-${Math.random()}`, // Simple unique ID
      position,
      title,
      description,
      ...placement
    }
    
    setPositions(prev => [...prev, newPosition])
  }

  // === Render ===

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <SpreadCanvasAddCard 
          positions={positions}
          onAddPosition={handleAddPosition}
        />
        <SpreadCreationCanvas 
          positions={positions}
          setPositions={setPositions}
        />  
      </div>
    </div>
  )
}



