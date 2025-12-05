"use client"

import Image from "next/image"
import { ReadingCard } from "@/lib/types"
import { cards } from "@/lib/tarot-data"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface TarotCardDisplayProps {
    cardData: ReadingCard
    width?: number
    height?: number
    className?: string
}

export function TarotCardDisplay({ cardData, width = 120, height = 200, className }: TarotCardDisplayProps) {
    const fullCardInfo = cards.find(c => c.id === cardData.cardId);

    if (!fullCardInfo) return null;

    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        className="relative group cursor-pointer transition-transform hover:scale-105 hover:z-10"
                        style={{ width, height }}
                    >
                        <div className={cn(
                            "w-full h-full rounded-lg shadow-md border bg-white dark:bg-card overflow-hidden transition-all duration-300 group-hover:shadow-xl",
                            cardData.orientation === 'reversed' ? "rotate-180" : ""
                        )}>
                            <Image
                                src={fullCardInfo.imageUrl}
                                alt={cardData.cardName}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100px, 150px"
                            />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{fullCardInfo.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                            {fullCardInfo.arcana === 'major' ? `Major Arcana #${fullCardInfo.number}` : `Minor Arcana - ${fullCardInfo.suit}`}
                        </p>
                        <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                            {cardData.orientation === 'reversed' ? "Reversed" : "Upright"}
                        </div>
                        <p className="text-sm leading-relaxed">
                            {cardData.orientation === 'reversed' ? fullCardInfo.reversedMeaning : fullCardInfo.uprightMeaning}
                        </p>
                    </div>
                </PopoverContent>
            </Popover>
            <div className="text-center text-xs font-semibold text-muted-foreground w-full max-w-[120px]">
                {cardData.positionLabel}
            </div>
        </div>
    )
}
