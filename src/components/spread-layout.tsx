"use client"

import { ReadingType, ReadingCard } from "@/lib/types"
import { TarotCardDisplay } from "./tarot-card-display"
import { cn } from "@/lib/utils"

interface SpreadLayoutProps {
    type: ReadingType
    cards: ReadingCard[]
    className?: string
}

export function SpreadLayout({ type, cards, className }: SpreadLayoutProps) {
    const getCard = (pos: number) => cards.find(c => c.position === pos);

    if (type === 'three-card') {
        return (
            <div className={cn("flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 my-8", className)}>
                {[1, 2, 3].map(pos => {
                    const card = getCard(pos);
                    if (!card) return <div key={pos} className="w-[120px] h-[200px] border-2 border-dashed rounded-lg flex items-center justify-center opacity-50">Empty</div>;
                    return <TarotCardDisplay key={pos} cardData={card} />;
                })}
            </div>
        )
    }

    if (type === 'four-card') {
        // Top (1), then 3 below (2,3,4)
        return (
            <div className={cn("flex flex-col items-center gap-8 my-8", className)}>
                <div className="flex justify-center">
                    {getCard(1) && <TarotCardDisplay cardData={getCard(1)!} />}
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                    {[2, 3, 4].map(pos => {
                        const card = getCard(pos);
                        return card ? <TarotCardDisplay key={pos} cardData={card} /> : null;
                    })}
                </div>
            </div>
        )
    }

    if (type === 'celtic-cross') {
        // Complex layout
        return (
            <div className={cn("flex flex-col lg:flex-row justify-center items-start gap-16 my-8 overflow-x-auto p-4", className)}>
                {/* Cross Section */}
                <div className="relative w-[300px] h-[550px] md:w-[400px] md:h-[600px] flex-shrink-0">
                    {/* Center 1 & 2 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        {getCard(1) && <TarotCardDisplay cardData={getCard(1)!} />}
                        {/* Card 2 crosses Card 1 */}
                        {getCard(2) && (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                <div className="rotate-90 pointer-events-auto">
                                    {/* Hack to render crossing card without double label issues or size issues */}
                                    <TarotCardDisplay cardData={getCard(2)!} className="shadow-xl" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3: Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        {getCard(3) && <TarotCardDisplay cardData={getCard(3)!} />}
                    </div>

                    {/* 4: Left (Past) */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2">
                        {getCard(4) && <TarotCardDisplay cardData={getCard(4)!} />}
                    </div>

                    {/* 5: Top (Crown) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2">
                        {getCard(5) && <TarotCardDisplay cardData={getCard(5)!} />}
                    </div>

                    {/* 6: Right (Future) */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2">
                        {getCard(6) && <TarotCardDisplay cardData={getCard(6)!} />}
                    </div>
                </div>

                {/* Staff Section (7-10) */}
                <div className="flex flex-col-reverse gap-4">
                    {/* 7 bottom, 10 top. Flex-col-reverse means first in DOM is bottom visually? No, flex-col means top to bottom.
               We want 10 at top, 7 at bottom.
               So render 10, 9, 8, 7.
           */}
                    {[10, 9, 8, 7].map(pos => (
                        <div key={pos} className="flex items-center gap-4">
                            {getCard(pos) && <TarotCardDisplay cardData={getCard(pos)!} />}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return <div>Unknown Spread</div>
}
