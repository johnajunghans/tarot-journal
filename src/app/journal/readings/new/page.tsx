/**
 * New Reading Page
 * 
 * Allows users to select a spread type and assign cards to each position.
 * Features interactive card placement with search and orientation selection.
 */
"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReadingCard, TarotCard, Orientation } from "@/lib/types"
import { ReadingType } from "@/lib/spread-config"
import { SPREADS, getPositionLabel, getPositionDescription } from "@/lib/spread-config"
import { saveReading } from "@/lib/storage"
import { CheckCircle2, Calendar as CalendarIcon } from "lucide-react"
import { SpreadLayout } from "@/components/spread-layout"
import { CardPicker } from "@/components/card-picker"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// === Component ===

export default function NewReadingPage() {
    const router = useRouter()
    
    // State for reading details
    const [date, setDate] = useState<Date>(new Date())
    const [question, setQuestion] = useState("")
    const [context, setContext] = useState("")

    const [selectedType, setSelectedType] = useState<ReadingType>('celtic-cross')
    const [cards, setCards] = useState<ReadingCard[]>([])
    const [openPosition, setOpenPosition] = useState<number | null>(null)

    // === Derived State ===

    const currentSpread = useMemo(() => SPREADS.find(s => s.type === selectedType)!, [selectedType])
    const positions = currentSpread?.positions ?? []
    const totalSlots = positions.length
    const filledSlots = cards.length

    // === Event Handlers ===

    const reset = () => {
        setCards([])
        setOpenPosition(null)
    }

    const handleSpreadChange = (value: string) => {
        setSelectedType(value as ReadingType)
        reset()
    }

    const handleAssignCard = (position: number, cardInfo: TarotCard, orientation: Orientation) => {
        if (!currentSpread) return;
        const positionLabel = getPositionLabel(currentSpread.type, position);

        setCards(prev => {
            const filtered = prev.filter(c => c.position !== position && c.cardId !== cardInfo.id);
            const nextCard: ReadingCard = {
                positionId: `${currentSpread.type}-${position}`, // Generate positionId
                position,
                cardId: cardInfo.id,
                cardName: cardInfo.name,
                orientation,
                positionLabel
            };
            const next = [...filtered, nextCard];
            return next.sort((a, b) => a.position - b.position);
        });
        setOpenPosition(null);
    };

    const handleFinish = () => {
        if (!selectedType || filledSlots !== totalSlots || !question) return;
        const readingId = crypto.randomUUID();
        const now = new Date().toISOString();
        // Format as YYYY-MM-DD using local time to avoid timezone shifts
        const formattedDate = format(date, 'yyyy-MM-dd');
        
        const spreadName = currentSpread?.name || selectedType.replace('-', ' ');
        
        saveReading({
            id: readingId,
            userId: 'local-user',
            createdAt: now,
            updatedAt: now,
            spreadId: selectedType,
            spreadName,
            question,
            context,
            cards,
            insights: [],
            relatedReadings: [],
            interpretations: [],
            isPublic: false,
            // Legacy compatibility fields
            date: formattedDate,
            type: selectedType,
        });
        router.push(`/journal/readings/${readingId}`);
    };

    // === Render Helpers ===

    const renderPopover = (position: number, close: () => void) => {
        const existing = cards.find(c => c.position === position);
        const spreadType = currentSpread?.type ?? 'three-card';
        const positionLabel = getPositionLabel(spreadType, position);
        const positionDescription = getPositionDescription(spreadType, position);
        return (
            <CardPicker
                positionLabel={positionLabel}
                positionDescription={positionDescription}
                initialCardId={existing?.cardId}
                initialOrientation={existing?.orientation ?? 'upright'}
                onRemove={() => {
                    setCards(prev => prev.filter(c => c.position !== position));
                    close();
                }}
                onSelect={(card, orientation) => {
                    handleAssignCard(position, card, orientation);
                    close();
                }}
            />
        );
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-8">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">New Reading</h1>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label htmlFor="question">Question</Label>
                                    <Input
                                        id="question"
                                        placeholder="What is your question for the tarot?"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                {date ? (
                                                    format(date, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) => d && setDate(d)}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="spread">Spread</Label>
                                    <Select value={selectedType} onValueChange={handleSpreadChange}>
                                        <SelectTrigger id="spread" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SPREADS.map(spread => (
                                                <SelectItem key={spread.type} value={spread.type}>
                                                    {spread.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="context">Context (Optional)</Label>
                                <Textarea
                                    id="context"
                                    placeholder="Add any relevant context or background..."
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    className="h-24"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/20 rounded-xl p-4 md:p-8 border">
                        <SpreadLayout
                            type={currentSpread.type}
                            cards={cards}
                            interactive
                            openPosition={openPosition}
                            onTogglePosition={setOpenPosition}
                            renderPositionPopover={renderPopover}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                {filledSlots} of {totalSlots} cards placed
                            </div>
                            <Button
                                onClick={handleFinish}
                                disabled={filledSlots !== totalSlots || !question}
                            >
                                Complete reading
                            </Button>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-600 transition-all duration-300"
                                style={{ width: `${(filledSlots / Math.max(totalSlots, 1)) * 100}%` }}
                            />
                        </div>
                    </div>

                    <Separator />

                    {cards.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">Selected cards</h3>
                            <div className="space-y-2">
                                {cards.map((c) => (
                                    <div key={c.position} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg text-sm">
                                        <span><span className="font-medium text-muted-foreground">{c.positionLabel}:</span> {c.cardName}</span>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{c.orientation}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {filledSlots === totalSlots && totalSlots > 0 && (
                        <Card className="text-center py-6">
                            <CardContent className="space-y-4">
                                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h2 className="text-xl font-bold">Reading ready</h2>
                                <p className="text-muted-foreground">All cards are placed. Save to view details and interpretations.</p>
                                <Button size="lg" onClick={handleFinish} className="w-full">
                                    View and Analyze Reading
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

