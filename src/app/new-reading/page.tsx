"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardSearch } from "@/components/card-search"
import { ReadingType, ReadingCard, Card as TarotCard, Orientation } from "@/lib/types"
import { saveReading } from "@/lib/storage"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SPREADS: { type: ReadingType; name: string; description: string; positions: string[] }[] = [
    {
        type: 'three-card',
        name: 'Three Card Spread',
        description: 'Past, Present, and Future insights.',
        positions: ['Past', 'Present', 'Future']
    },
    {
        type: 'four-card',
        name: 'Four Card Spread',
        description: 'Overall theme with detailed breakdown.',
        positions: ['Overall Theme', 'Detail 1', 'Detail 2', 'Detail 3']
    },
    {
        type: 'celtic-cross',
        name: 'Celtic Cross',
        description: 'Comprehensive 10-card reading.',
        positions: [
            'Present Situation', 'Challenge', 'Foundation', 'Recent Past',
            'Crown', 'Near Future', 'Self', 'Environment', 'Hopes/Fears', 'Outcome'
        ]
    }
];

export default function NewReadingPage() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<ReadingType | null>(null)
    const [cards, setCards] = useState<ReadingCard[]>([])

    const currentSpread = SPREADS.find(s => s.type === selectedType)
    const currentPositionIndex = cards.length

    const handleCardSelect = (cardInfo: TarotCard, orientation: Orientation) => {
        if (!currentSpread) return;

        const positionLabel = currentSpread.positions[currentPositionIndex];
        if (!positionLabel) return; // Done

        const newCard: ReadingCard = {
            position: currentPositionIndex + 1,
            cardId: cardInfo.id,
            cardName: cardInfo.name,
            orientation,
            positionLabel
        };

        setCards([...cards, newCard]);
    };

    const handleFinish = () => {
        if (!selectedType) return;
        const readingId = crypto.randomUUID();
        saveReading({
            id: readingId,
            date: new Date().toISOString(),
            type: selectedType,
            cards,
            interpretations: []
        });
        router.push(`/reading/${readingId}`);
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>

                {!selectedType ? (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Choose a Spread</h1>
                        <div className="grid gap-4">
                            {SPREADS.map(spread => (
                                <Card
                                    key={spread.type}
                                    className="cursor-pointer hover:border-purple-500 transition-colors"
                                    onClick={() => setSelectedType(spread.type)}
                                >
                                    <CardHeader>
                                        <CardTitle>{spread.name}</CardTitle>
                                        <CardDescription>{spread.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (currentSpread && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">{currentSpread.name}</h1>
                            <div className="text-sm text-muted-foreground">
                                Card {currentPositionIndex + 1} of {currentSpread.positions.length}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-600 transition-all duration-300"
                                style={{ width: `${(currentPositionIndex / currentSpread.positions.length) * 100}%` }}
                            />
                        </div>

                        {currentPositionIndex < currentSpread.positions.length ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-purple-600">
                                        Position {currentPositionIndex + 1}: {currentSpread.positions[currentPositionIndex]}
                                    </CardTitle>
                                    <CardDescription>Select the card drawn for this position.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardSearch onSelect={handleCardSelect} key={currentPositionIndex} />
                                    {/* Key forces remount to clear input */}
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="text-center py-8">
                                <CardContent className="space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Reading Complete!</h2>
                                    <p className="text-muted-foreground">You've recorded all {cards.length} cards.</p>
                                    <Button size="lg" onClick={handleFinish} className="w-full">
                                        View and Analyze Reading
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Preview of entered cards */}
                        {cards.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-semibold">Recorded Cards</h3>
                                <div className="space-y-2">
                                    {cards.map((c, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg text-sm">
                                            <span><span className="font-medium text-muted-foreground">{c.positionLabel}:</span> {c.cardName}</span>
                                            <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.orientation}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
