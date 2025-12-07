/**
 * Spread Layout
 * 
 * Renders tarot cards in their appropriate spread formation.
 * Supports three-card, four-card, and Celtic Cross layouts with
 * both static display and interactive card placement modes.
 */
"use client"

import { ReadingCard } from "@/lib/types"
import { ReadingType } from "@/lib/spread-config"
import { SPREAD_POSITIONS } from "@/lib/spread-config"
import { TarotCardDisplay } from "./tarot-card-display"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMemo } from "react"
import { EmptyCardPlaceholder } from "./empty-card-placeholder"

// Re-export for backward compatibility
export { SPREAD_POSITIONS } from "@/lib/spread-config"

// === Types ===

interface SpreadLayoutProps {
    type: ReadingType
    cards: ReadingCard[]
    className?: string
    /** Enable interactive card placement mode */
    interactive?: boolean
    /** Currently open popover position (interactive mode) */
    openPosition?: number | null
    /** Callback when a position is toggled open/closed */
    onTogglePosition?: (position: number | null) => void
    /** Render function for position popover content */
    renderPositionPopover?: (position: number, close: () => void) => React.ReactNode
}

// === Component ===

export function SpreadLayout({
    type,
    cards,
    className,
    interactive = false,
    openPosition,
    onTogglePosition,
    renderPositionPopover,
}: SpreadLayoutProps) {
    const positions = useMemo(() => SPREAD_POSITIONS[type] ?? [], [type])
    const getCard = (pos: number) => cards.find(c => c.position === pos);
    const getLabel = (pos: number) => getCard(pos)?.positionLabel ?? positions[pos - 1] ?? `Position ${pos}`;

    const renderSlot = (pos: number, extraClasses?: string) => {
        const card = getCard(pos);
        const label = getLabel(pos);

        const content = card ? (
            <TarotCardDisplay cardData={{ ...card, positionLabel: label }} />
        ) : (
            <EmptyCardPlaceholder label={label} rotateText={type === "celtic-cross" && pos === 2} deCenterText={type === "celtic-cross" && pos === 1} />
        );

        if (!interactive) {
            return (
                <div key={pos} className={cn("relative", extraClasses)}>
                    {content}
                </div>
            )
        }

        const isOpen = openPosition === pos;
        const toggle = (open: boolean) => onTogglePosition?.(open ? pos : null);

        return (
            <Popover key={pos} open={isOpen} onOpenChange={toggle}>
                <PopoverTrigger asChild>
                    <button className={cn("relative", extraClasses, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg")} type="button">
                        {content}
                        <div className="absolute inset-0 ring-1 ring-dashed ring-transparent hover:ring-purple-400/70 rounded-lg transition-colors" />
                    </button>
                </PopoverTrigger>
                {renderPositionPopover && (
                    <PopoverContent align="center" className="w-80">
                        {renderPositionPopover(pos, () => onTogglePosition?.(null))}
                    </PopoverContent>
                )}
            </Popover>
        )
    }

    if (type === 'three-card') {
        return (
            <div className={cn("flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 my-8", className)}>
                {[1, 2, 3].map(pos => renderSlot(pos))}
            </div>
        )
    }

    if (type === 'four-card') {
        return (
            <div className={cn("flex flex-col items-center gap-8 my-8", className)}>
                <div className="flex justify-center">
                    {renderSlot(1)}
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                    {[2, 3, 4].map(pos => renderSlot(pos))}
                </div>
            </div>
        )
    }

    if (type === 'celtic-cross') {
        return (
            <div className={cn("flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-20 my-8 overflow-x-auto p-4", className)}>
                {/* Cross Section */}
                <div className="relative w-[340px] h-[640px] md:w-[480px] md:h-[700px] flex-shrink-0">

                    {/* Small Cross */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group">
                        <div className="relative z-20 transition-all group-hover:z-30 hover:bg-background hover:z-50 focus:bg-background focus:z-50">
                            {renderSlot(1)}
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                            <div className="rotate-90 pointer-events-auto relative translate-y-4 z-30 hover:z-40 transition-all">
                                {renderSlot(2, "bg-background")}
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                        {renderSlot(3)}
                    </div>

                    <div className="absolute top-1/2 left-0 -translate-y-1/2">
                        {renderSlot(4)}
                    </div>

                    <div className="absolute top-6 left-1/2 -translate-x-1/2">
                        {renderSlot(5)}
                    </div>

                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                        {renderSlot(6)}
                    </div>
                </div>

                {/* Staff Section (7-10) */}
                <div className="flex flex-col items-center gap-4">
                    {[10, 9, 8, 7].map(pos => (
                        <div key={pos} className="flex items-center gap-4">
                            {renderSlot(pos)}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return <div>Unknown Spread</div>
}
