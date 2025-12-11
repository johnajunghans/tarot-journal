/**
 * Spread Creation Canvas
 * 
 * Interactive canvas for creating custom tarot spreads with drag-and-drop positioning.
 */
"use client"

import { SpreadPosition, ViewBox } from "@/lib/types"
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import DraggableCard from "./draggable-card"

// === Constants ===

// Card dimensions (must match the SVG rect)
const CARD_WIDTH = 90
const CARD_HEIGHT = 150
const STROKE_WIDTH = 1.5
// const TOTAL_WIDTH = CARD_WIDTH + STROKE_WIDTH
// const TOTAL_HEIGHT = CARD_HEIGHT + STROKE_WIDTH

// Grid snap increment
const GRID_SIZE = 15

// === Types ===

interface SpreadCreationCanvasProps {
    positions: SpreadPosition[]
    setPositions: Dispatch<SetStateAction<SpreadPosition[]>>
}

// === Component ===

export default function SpreadCreationCanvas({ 
    positions, 
    setPositions 
}: SpreadCreationCanvasProps) {

    console.log("canvas rendered")

    // === Refs ===
    const svgRef = useRef<SVGSVGElement>(null)
    const snapGuidesRef = useRef<SVGGElement>(null)
    // Refs for individual lines (to animate colors independently)
    const lineRefs = useRef({
        left: null as SVGLineElement | null,
        right: null as SVGLineElement | null,
        top: null as SVGLineElement | null,
        bottom: null as SVGLineElement | null
    })
    // Ref to always have the latest positions (prevents stale closure in callbacks)
    const positionsRef = useRef<SpreadPosition[]>([])

    const [viewBox, setViewBox] = useState<ViewBox>({ 
        x: 0, y: 0, width: 1200, height: 800 
    })

    const [draggingId, setDraggingId] = useState<string | null>(null)
    
    // Track snap preview position while dragging (null when not dragging)
    const [snapPreview, setSnapPreview] = useState<{ x: number; y: number } | null>(null)
    
    // Track which edges are aligned with other cards (for color change)
    const [alignedEdges, setAlignedEdges] = useState({
        top: false,
        bottom: false,
        left: false,
        right: false
    })

    // === Effects ===
    
    /**
     * Keep positionsRef in sync with positions state.
     * This ensures checkAlignment always has access to the latest positions.
     */
    useEffect(() => {
        positionsRef.current = positions
        console.log(`📍 [Canvas] Positions ref updated with ${positions.length} cards`)
    }, [positions])
    
    /**
     * Initialize snap guides with opacity 0 and blue color.
     * This allows us to animate them in/out smoothly.
     */
    useEffect(() => {
        if (snapGuidesRef.current) {
            console.log(`🎬 [Canvas] Initializing snap guides`)
            gsap.set(snapGuidesRef.current, { opacity: 0 })
            // Set initial colors to blue
            Object.values(lineRefs.current).forEach(line => {
                if (line) gsap.set(line, { stroke: '#3b82f6' })
            })
        }
    }, [])
    
    /**
     * Animate line colors when alignment changes.
     */
    useEffect(() => {
        const animateLineColor = (line: SVGLineElement | null, isAligned: boolean) => {
            if (!line) return
            const targetColor = isAligned ? '#ef4444' : '#3b82f6' // red : blue
            const strokeWidth = isAligned ? 2 : 1
            gsap.to(line, {
                stroke: targetColor,
                strokeWidth,
                duration: 0.2,
                ease: "power2.out"
            })
        }
        
        animateLineColor(lineRefs.current.top, alignedEdges.top)
        animateLineColor(lineRefs.current.bottom, alignedEdges.bottom)
        animateLineColor(lineRefs.current.left, alignedEdges.left)
        animateLineColor(lineRefs.current.right, alignedEdges.right)
        
        console.log(`🎨 [Canvas] Line colors updated:`, alignedEdges)
    }, [alignedEdges])
    
    // === Helper Functions ===
    
    /**
     * Check if the dragged card's snap position aligns with any other card.
     * Returns which edges are aligned.
     * Uses positionsRef to always access the latest positions without stale closures.
     */
    const checkAlignment = useCallback((draggedId: string, snapX: number, snapY: number) => {
        const TOLERANCE = 2 // pixels - allow slight misalignment
        
        const draggedEdges = {
            left: snapX,
            right: snapX + CARD_WIDTH,
            top: snapY,
            bottom: snapY + CARD_HEIGHT
        }
        
        const aligned = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }
        
        // CRITICAL: Use positionsRef.current to always get the latest positions
        // This prevents stale closure issues when cards are moved in quick succession
        const currentPositions = positionsRef.current
        
        // Check against all other cards (not the one being dragged)
        currentPositions.forEach(pos => {
            if (pos.id === draggedId) return // Skip self
            
            const otherEdges = {
                left: pos.x,
                right: pos.x + CARD_WIDTH,
                top: pos.y,
                bottom: pos.y + CARD_HEIGHT
            }
            
            // Check horizontal alignment (top/bottom edges)
            if (Math.abs(draggedEdges.top - otherEdges.top) <= TOLERANCE) {
                aligned.top = true
                console.log(`   ↳ Top edge aligned with ${pos.title}`)
            }
            if (Math.abs(draggedEdges.top - otherEdges.bottom) <= TOLERANCE) {
                aligned.top = true
                console.log(`   ↳ Top edge aligned with ${pos.title}'s bottom`)
            }
            if (Math.abs(draggedEdges.bottom - otherEdges.bottom) <= TOLERANCE) {
                aligned.bottom = true
                console.log(`   ↳ Bottom edge aligned with ${pos.title}`)
            }
            if (Math.abs(draggedEdges.bottom - otherEdges.top) <= TOLERANCE) {
                aligned.bottom = true
                console.log(`   ↳ Bottom edge aligned with ${pos.title}'s top`)
            }
            
            // Check vertical alignment (left/right edges)
            if (Math.abs(draggedEdges.left - otherEdges.left) <= TOLERANCE) {
                aligned.left = true
                console.log(`   ↳ Left edge aligned with ${pos.title}`)
            }
            if (Math.abs(draggedEdges.left - otherEdges.right) <= TOLERANCE) {
                aligned.left = true
                console.log(`   ↳ Left edge aligned with ${pos.title}'s right`)
            }
            if (Math.abs(draggedEdges.right - otherEdges.right) <= TOLERANCE) {
                aligned.right = true
                console.log(`   ↳ Right edge aligned with ${pos.title}`)
            }
            if (Math.abs(draggedEdges.right - otherEdges.left) <= TOLERANCE) {
                aligned.right = true
                console.log(`   ↳ Right edge aligned with ${pos.title}'s left`)
            }
        })
        
        return aligned
    }, []) // Empty deps - function is stable, reads from ref
    
    // === Event Handlers ===
    
    /**
     * Update a card's position when dragged.
     * Wrapped in useCallback to prevent recreating on every render.
     */
    const handleChangePosition = useCallback((id: string, x: number, y: number) => {
        console.log(`📝 [Canvas] handleChangePosition called for id=${id}:`, { x, y })
        setPositions(prev => {
            const updated = prev.map(pos => 
                pos.id === id ? { ...pos, x, y } : pos
            )
            console.log(`   ↳ State updated`)
            return updated
        })
    }, [])

    /**
     * Handle drag start event.
     * Wrapped in useCallback to prevent Draggable re-initialization.
     */
    const handleDragStart = useCallback((id: string) => {
        console.log(`🎯 [Canvas] onDragStart for id=${id}`)
        setDraggingId(id)
    }, [])

    /**
     * Handle drag end event.
     * Wrapped in useCallback to prevent Draggable re-initialization.
     */
    const handleDragEnd = useCallback((id: string) => {
        console.log(`🎯 [Canvas] onDragEnd for id=${id}`)
        setDraggingId(null)
    }, [])

    /**
     * Handle snap preview updates during drag.
     * Shows guide lines at the snap position with smooth GSAP animation.
     * Also checks for alignment with other cards.
     */
    const handleSnapPreview = useCallback((id: string, x: number | null, y: number | null) => {
        if (x === null || y === null) {
            console.log(`👁️ [Canvas] Hiding snap preview (fade out)`)
            // Reset alignment state
            setAlignedEdges({ top: false, bottom: false, left: false, right: false })
            // Animate out: fade to opacity 0
            if (snapGuidesRef.current) {
                gsap.to(snapGuidesRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    // CRITICAL: Only clear position AFTER fade completes
                    // This prevents lines from jumping to (0,0) during fade-out
                    onComplete: () => {
                        console.log(`   ↳ Fade out complete, clearing position`)
                        setSnapPreview(null)
                    }
                })
            }
        } else {
            console.log(`👁️ [Canvas] Snap preview (fade in):`, { x, y })
            // Check for alignment with other cards
            const aligned = checkAlignment(id, x, y)
            setAlignedEdges(aligned)
            // Update position first (while still invisible)
            setSnapPreview({ x, y })
            // Then animate in: fade to opacity 1
            if (snapGuidesRef.current) {
                gsap.to(snapGuidesRef.current, {
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out"
                })
            }
        }
    }, [checkAlignment])

    // === Render ===
    return (
        <div className="w-full h-full border rounded-lg overflow-hidden bg-secondary/20">
            <svg
                ref={svgRef} 
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                className="w-full h-full"
                style={{ minHeight: '600px' }}
            >
                {/* Grid pattern for visual reference */}
                <defs>
                    <pattern id="grid" width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
                        <path 
                            d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
                            className="fill-none stroke-border"
                            strokeWidth={1} 
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* 
                    Snap guide lines - show where card will land while dragging.
                    Always rendered but animated with GSAP opacity (starts at 0).
                    Line colors animate from blue to red when aligned with other cards.
                    Using || 0 to provide default position when null.
                */}
                <g ref={snapGuidesRef} className="snap-guides">
                    {/* Left edge */}
                    <line
                        ref={(el) => { lineRefs.current.left = el }}
                        x1={(snapPreview?.x || 0) - 1}
                        y1={0}
                        x2={(snapPreview?.x || 0) - 1}
                        y2={viewBox.height}
                        stroke="#3b82f6"
                        strokeWidth={1}
                    />
                    {/* Right edge */}
                    <line
                        ref={(el) => { lineRefs.current.right = el }}
                        x1={(snapPreview?.x || 0) + CARD_WIDTH - 1}
                        y1={0}
                        x2={(snapPreview?.x || 0) + CARD_WIDTH - 1}
                        y2={viewBox.height}
                        stroke="#3b82f6"
                        strokeWidth={1}
                    />
                    {/* Top edge */}
                    <line
                        ref={(el) => { lineRefs.current.top = el }}
                        x1={0}
                        y1={(snapPreview?.y || 0) - 1}
                        x2={viewBox.width}
                        y2={(snapPreview?.y || 0) - 1}
                        stroke="#3b82f6"
                        strokeWidth={1}
                    />
                    {/* Bottom edge */}
                    <line
                        ref={(el) => { lineRefs.current.bottom = el }}
                        x1={0}
                        y1={(snapPreview?.y || 0) + CARD_HEIGHT - 1}
                        x2={viewBox.width}
                        y2={(snapPreview?.y || 0) + CARD_HEIGHT - 1}
                        stroke="#3b82f6"
                        strokeWidth={1}
                    />
                </g>

                {/* Render all draggable card positions */}
                {positions.map(position => (
                    <DraggableCard
                        key={position.id}
                        position={position}
                        onPositionChange={handleChangePosition}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onSnapPreview={handleSnapPreview}
                        cardWidth={CARD_WIDTH}
                        cardHeight={CARD_HEIGHT}
                        strokeWidth={STROKE_WIDTH}
                        gridSize={GRID_SIZE}
                    />
                ))}
            </svg>
        </div>
    )
}