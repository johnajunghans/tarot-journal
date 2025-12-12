/**
 * Spread Canvas Add Card
 * 
 * Form component for adding new card positions to a spread layout.
 */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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
  FieldGroup,
} from "@/components/ui/field"
import { AppInput, AppTextarea } from "./form/app-field-elements"

// === Types ===

interface AddPositionFormData {
  title: string
  description: string
  position: number
}

interface SpreadCanvasAddCardProps {
  positions: SpreadPosition[]
  onAddPosition: (title: string, description: string, position: number) => void
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

// === Component ===

export function SpreadCanvasAddCard({ positions, onAddPosition }: SpreadCanvasAddCardProps) {
  // Get existing position numbers for validation
  const existingPositions = positions.map(p => p.position)
  const nextPosition = calculateNextPosition(positions)
  
  // === Form Schema ===
  
  const formSchema = z.object({
    title: z.string()
    //   .min(2, "Title must be at least 2 characters")
      .max(50, "Title must be at most 50 characters"),
    description: z.string()
    //   .min(10, "Description must be at least 10 characters")
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
    onAddPosition(data.title, data.description, data.position)
    // Reset form with next position number
    form.reset({
      title: "",
      description: "",
      position: calculateNextPosition([...positions, { position: data.position } as SpreadPosition]),
    })
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Card Position</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-position-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <AppInput 
                    {...field}
                    id="new-spread-card-title"
                    aria-invalid={fieldState.invalid}
                    fieldState={fieldState}
                    placeholder="e.g., Past, Present, Future"
                    charLimit={50}
                    label="Title"
                    required
                />
              )}
            />
            
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <AppTextarea
                  {...field}
                  id="position-description"
                  fieldState={fieldState}
                  placeholder="What does this position represent in the context of the spread?"
                  charLimit={200}
                  label="Description"
                  rows={3}
                  className="resize-none"
                />
              )}
            />
            
            <Controller
              name="position"
              control={form.control}
              render={({ field, fieldState }) => (
                <AppInput
                  {...field}
                  id="position-number"
                  type="number"
                  min="1"
                  step="1"
                  fieldState={fieldState}
                  placeholder="1"
                  label="Position Number"
                  onChange={(e) => {
                    const value = e.target.value
                    field.onChange(value === '' ? '' : Number(value))
                  }}
                />
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          form="add-position-form"
        >
          Add Position
        </Button>
      </CardFooter>
    </Card>
  )
}

