import { memo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { SpreadPosition } from '@/lib/types'

// Register GSAP Draggable plugin
gsap.registerPlugin(Draggable)

// === Types ===

interface DraggableCardProps {
    position: SpreadPosition;
    onPositionChange: (id: string, x: number, y: number) => void;
    onDragStart: (id: string) => void;
    onDragEnd: (id: string) => void;
    onSnapPreview?: (id: string, x: number | null, y: number | null) => void;
    cardWidth: number;
    cardHeight: number;
    strokeWidth: number;
    gridSize: number;
}

// === Helper Functions ===

/**
 * Calculate snapped position based on grid size
 */
function snapToGrid(value: number, gridSize: number, snapOffset: number): number {
    return Math.round(value / gridSize) * gridSize + snapOffset
}

// === Component ===

function DraggableCard({
    position,
    onPositionChange,
    onDragStart,
    onDragEnd,
    onSnapPreview,
    cardWidth,
    cardHeight,
    strokeWidth,
    gridSize
}: DraggableCardProps) {

    console.log(`🎨 [${position.title}] Component rendered with position:`, { x: position.x, y: position.y })

    const cardRef = useRef<SVGGElement>(null)
    const rectRef = useRef<SVGRectElement>(null)
    const draggableInstance = useRef<Draggable | null>(null)
    // Track whether user is actively dragging to prevent position sync conflicts
    const isDraggingRef = useRef(false)
    
    console.log(`   ↳ isDraggingRef.current =`, isDraggingRef.current)

    // === Effect: Initialize GSAP Draggable ===
    useEffect(() => {
        console.log(`🔧 [${position.title}] Initializing Draggable...`)
        const card = cardRef.current
        if (!card) {
            console.log(`   ❌ [${position.title}] No card ref, skipping`)
            return
        }

        const snapOffset = (1 + (strokeWidth - 1) / 2 )

        // Set initial position BEFORE creating draggable
        console.log(`   📍 [${position.title}] Setting initial position:`, { x: position.x, y: position.y })
        gsap.set(card, { x: position.x, y: position.y })

        const [instance] = Draggable.create(card, {
            type: 'x,y',

            // === Snap to Grid Configuration ===
            liveSnap: {
                x: (value) => {
                    const snapped = snapToGrid(value, gridSize, snapOffset)
                    console.log(`📍 [${position.title}] Snap X: ${value.toFixed(1)} → ${snapped}`)
                    return snapped
                },
                y: (value) => {
                    const snapped = snapToGrid(value, gridSize, snapOffset)
                    console.log(`📍 [${position.title}] Snap Y: ${value.toFixed(1)} → ${snapped}`)
                    return snapped
                },
                radius: 15
            },

            // Smooth snapping animation
            inertia: true,

            onDragStart: function() {
                console.log(`🟢 [${position.title}] DRAG START`)
                isDraggingRef.current = true
                console.log(`   ↳ isDraggingRef.current = true`)
                onDragStart?.(position.id)
                // Visual feedback: fade and remove rounded corners
                gsap.to(card, { opacity: 0.7, duration: 0.2 })
                if (rectRef.current) {
                    gsap.to(rectRef.current, { attr: { rx: 0 }, duration: 0.2 })
                }
                // Show snap preview
                const snapX = snapToGrid(this.x, gridSize, snapOffset)
                const snapY = snapToGrid(this.y, gridSize, snapOffset)
                onSnapPreview?.(position.id, snapX, snapY)
            },

            onDrag: function() {
                console.log(`🔵 [${position.title}] DRAGGING to:`, { x: this.x, y: this.y })
                // Calculate where the card will snap to
                const snapX = snapToGrid(this.x, gridSize, snapOffset)
                const snapY = snapToGrid(this.y, gridSize, snapOffset)
                // Update snap preview lines
                onSnapPreview?.(position.id, snapX, snapY)
            },

            onDragEnd: function() {
                console.log(`🔴 [${position.title}] DRAG END at:`, { x: this.x, y: this.y })
                isDraggingRef.current = false
                console.log(`   ↳ isDraggingRef.current = false`)
                onDragEnd?.(position.id)
                // Hide snap preview
                onSnapPreview?.(position.id, null, null)
                // Reset visual feedback: restore opacity and rounded corners
                gsap.to(card, { opacity: 1, duration: 0.2 })
                if (rectRef.current) {
                    gsap.to(rectRef.current, { attr: { rx: 8 }, duration: 0.2 })
                }
                // Send final position to parent
                console.log(`   ↳ Calling onPositionChange with:`, { x: this.x, y: this.y })
                onPositionChange(position.id, this.x, this.y)
            },

            // Cursor styles
            cursor: 'grab',
            activeCursor: 'grabbing'
        })

        draggableInstance.current = instance
        console.log(`   ✅ [${position.title}] Draggable created successfully`)

        return () => {
            console.log(`   🗑️ [${position.title}] Cleaning up Draggable`)
            if (draggableInstance.current) {
                draggableInstance.current.kill()
            }
        }
    }, [position.id, onPositionChange, onDragStart, onDragEnd, onSnapPreview, cardWidth, cardHeight, strokeWidth, gridSize])

    // === Effect: Sync position from props (only when NOT dragging) ===
    useEffect(() => {
        console.log(`🔄 [${position.title}] Position sync effect triggered`)
        console.log(`   ↳ New position from props:`, { x: position.x, y: position.y })
        console.log(`   ↳ isDraggingRef.current =`, isDraggingRef.current)
        
        // CRITICAL: Only update position if we're not actively dragging
        // This prevents fighting with the user's drag gesture
        if (cardRef.current && draggableInstance.current && !isDraggingRef.current) {
            console.log(`   ✅ [${position.title}] Syncing position from props`)
            gsap.set(cardRef.current, { x: position.x, y: position.y })
            // Tell Draggable about the new position so it knows where it is
            draggableInstance.current.update()
        } else {
            console.log(`   ⏭️ [${position.title}] Skipping sync (isDragging = ${isDraggingRef.current})`)
        }
    }, [position.x, position.y, position.title])

    // === Render ===
    return (
        <g ref={cardRef} style={{ cursor: "grab" }}>

            {/* Card background */}
            <rect
                ref={rectRef}
                width={cardWidth - 1 * strokeWidth - 0.5}
                height={cardHeight - 1 * strokeWidth - 0.5}
                className='fill-secondary/50 stroke-border'
                // strokeDasharray={3}
                strokeWidth={strokeWidth}
                rx={8}  // Rounded corners (animated via GSAP on drag)
            />

            {/* Position number badge */}
            <circle cx={15} cy={15} r={12} fill="black" />
            <text 
                x={15} 
                y={20} 
                textAnchor="middle" 
                className='fill-foreground' 
                fontSize={12}
                fontWeight="bold"
                style={{ pointerEvents: 'none' }}
            >
                {position.position}
            </text>
            
            {/* Position title */}
            <text 
                x={30} 
                y={60} 
                textAnchor="middle" 
                fontSize={14}
                fontWeight="500"
                className='fill-foreground' 
                style={{ pointerEvents: 'none' }}
            >
                {position.title}
            </text>
        </g>
    )
}

// === Memoization ===

/**
 * Custom comparison function for React.memo()
 * Only re-render if the position object reference changes OR callbacks change.
 * 
 * Since our callbacks are wrapped in useCallback with empty deps, they're stable.
 * Since only the changed card gets a new position object (via spread), only that card re-renders.
 */
function arePropsEqual(prevProps: DraggableCardProps, nextProps: DraggableCardProps): boolean {
    const positionUnchanged = prevProps.position === nextProps.position
    const callbacksUnchanged =
        prevProps.onPositionChange === nextProps.onPositionChange &&
        prevProps.onDragStart === nextProps.onDragStart &&
        prevProps.onDragEnd === nextProps.onDragEnd
    const dimensionsUnchanged =
        prevProps.cardWidth === nextProps.cardWidth &&
        prevProps.cardHeight === nextProps.cardHeight &&
        prevProps.strokeWidth === nextProps.strokeWidth &&
        prevProps.gridSize === nextProps.gridSize

    const shouldSkipRender = positionUnchanged && callbacksUnchanged && dimensionsUnchanged
    
    if (shouldSkipRender) {
        console.log(`🚫 [${prevProps.position.title}] Memo: Skipping re-render (props unchanged)`)
    } else {
        console.log(`✅ [${nextProps.position.title}] Memo: Allowing re-render`)
        if (!positionUnchanged) {
            console.log(`   ↳ Position object changed`)
        }
        if (!callbacksUnchanged) {
            console.log(`   ↳ Callbacks changed (this shouldn't happen!)`)
        }
        if (!dimensionsUnchanged) {
            console.log(`   ↳ Dimensions changed`)
        }
    }
    
    return shouldSkipRender
}

/**
 * Export memoized version to prevent unnecessary re-renders when sibling cards update.
 */
export default memo(DraggableCard, arePropsEqual)