/**
 * New Spread Page
 * 
 * Create a new custom spread layout (coming soon).
 */
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import SpreadCreationCanvas from "@/components/canvas/spread-creation-canvas"
import { SpreadPosition } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// === Constants ===

const BASE_X = 16.25
const BASE_Y = 16.25
const OFFSET_X = 105 
const OFFSET_Y = 165

// === Types ===

interface AddPositionFormData {
  title: string
  description: string
  position: number
}

// === Helper Functions ===

/**
 * Calculate the next available position number.
 * Returns the highest position + 1, or 1 if no positions exist.
 */
function calculateNextPosition(positions: SpreadPosition[]): number {
  if (positions.length === 0) return 1
  return Math.max(...positions.map(p => p.position)) + 1
}

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

  // === Subcomponents ===
  
  /**
   * Compact field wrapper with label at top-left border and character count at bottom-right.
   */
  function CompactField({
    id,
    label,
    error,
    charLimit,
    valueLength,
    children,
  }: {
    id: string
    label: string
    error?: string
    charLimit?: number
    valueLength?: number
    children: React.ReactNode
  }) {
    return (
      <div className="relative flex flex-col gap-1">
        <label
          htmlFor={id}
          className="absolute left-2 -top-2 px-1 text-xs bg-background z-10 font-medium"
        >
          {label}
        </label>
        {children}
        {charLimit !== undefined && valueLength !== undefined && (
          <span className="absolute right-2 -bottom-2 px-1 text-xs bg-background z-10">
            {valueLength}/{charLimit}
          </span>
        )}
        {error && (
          <span className="text-destructive text-xs mt-1 ml-2">
            {error}
          </span>
        )}
      </div>
    )
  }
  
  function AddCardSection() {
    // Get existing position numbers for validation
    const existingPositions = positions.map(p => p.position)
    const nextPosition = calculateNextPosition(positions)
    
    // === Form Schema ===
    
    const formSchema = z.object({
      title: z.string()
        .min(2, "Title must be at least 2 characters")
        .max(50, "Title must be at most 50 characters"),
      description: z.string()
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be at most 200 characters"),
      position: z.number()
        .int("Position must be a whole number")
        .min(1, "Position must be at least 1")
        .refine((val) => !existingPositions.includes(val), 
          "A card with this position already exists")
    })
    
    const form = useForm<AddPositionFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        position: nextPosition,
      },
    })
    
    function onSubmit(data: AddPositionFormData) {
      handleAddPosition(data.title, data.description, data.position)
      // Reset form with next position number
      form.reset({
        title: "",
        description: "",
        position: calculateNextPosition([...positions, { position: data.position } as SpreadPosition]),
      })
    }
    
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle>Add Card Position</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <form id="add-position-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Position Number + Title (Inline) */}
            <div className="flex gap-3">
              <Controller
                name="position"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="w-[20%]">
                    <CompactField
                      id="position-number"
                      label="Position"
                      error={fieldState.error?.message}
                    >
                      <Input
                        {...field}
                        id="position-number"
                        type="number"
                        min="1"
                        step="1"
                        aria-invalid={fieldState.invalid}
                        placeholder="1"
                        className="h-12 border-2"
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === '' ? '' : Number(value))
                        }}
                      />
                    </CompactField>
                  </div>
                )}
              />
              
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex-1">
                    <CompactField
                      id="position-title"
                      label="Title"
                      error={fieldState.error?.message}
                      charLimit={50}
                      valueLength={field.value.length}
                    >
                      <Input
                        {...field}
                        id="position-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g., Past, Present, Future"
                        autoComplete="off"
                        className="h-12 border-2"
                      />
                    </CompactField>
                  </div>
                )}
              />
            </div>
            
            {/* Description (Full Width) */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <CompactField
                  id="position-description"
                  label="Description"
                  error={fieldState.error?.message}
                  charLimit={200}
                  valueLength={field.value.length}
                >
                  <Textarea
                    {...field}
                    id="position-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="What does this position represent in the context of the spread?"
                    rows={4}
                    className="resize-none border-2"
                  />
                </CompactField>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            type="submit" 
            form="add-position-form"
            className="w-full"
          >
            Add Position
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // === Render ===

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <AddCardSection />
        <SpreadCreationCanvas 
          positions={positions}
          setPositions={setPositions}
        />  
      </div>
    </div>
  )
}



