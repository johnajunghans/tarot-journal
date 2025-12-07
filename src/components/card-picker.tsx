/**
 * Card Picker
 * 
 * A searchable card selection component for assigning tarot cards to spread positions.
 * Features fuzzy search with number-to-word expansion, orientation toggle, and card preview.
 */
"use client"

import * as React from "react"
import { cards, formatCardName, getCardById } from "@/lib/tarot-data"
import { Card as TarotCard, Orientation } from "@/lib/types"
import { cn } from "@/lib/utils"
import { expandQueryTokens, matchesCard } from "@/lib/card-search"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Check, List, Trash2, RotateCcw } from "lucide-react"

// === Types ===

interface CardPickerProps {
    onSelect: (card: TarotCard, orientation: Orientation) => void
    onRemove?: () => void
    initialCardId?: string
    initialOrientation?: Orientation
    positionLabel: string
    positionDescription?: string
}

export function CardPicker({
    onSelect,
    onRemove,
    initialCardId,
    initialOrientation = 'upright',
    positionLabel,
    positionDescription,
}: CardPickerProps) {
    const [value, setValue] = React.useState(initialCardId ?? "")
    const [orientation, setOrientation] = React.useState<Orientation>(initialOrientation)
    const [search, setSearch] = React.useState("")
    const [showAll, setShowAll] = React.useState(false)

    React.useEffect(() => {
        setValue(initialCardId ?? "")
        setOrientation(initialOrientation)
        setShowAll(false)
        setSearch("")
    }, [initialCardId, initialOrientation])

    // === Derived State ===
    
    const description = positionDescription || "Reflect on this aspect of your reading to guide your intuition."

    /** Expanded search tokens with number/word variations */
    const queryTokens = React.useMemo(
        () => expandQueryTokens(search),
        [search]
    )

    /** Card matching function using extracted search utilities */
    const matches = React.useCallback((card: TarotCard) => {
        if (showAll && !search) return true
        return matchesCard(card, queryTokens, formatCardName)
    }, [queryTokens, search, showAll])

    const allMajorArcana = React.useMemo(() => cards.filter(c => c.arcana === 'major'), [])
    const allMinorBySuit = React.useMemo(() => {
        const order: Array<NonNullable<TarotCard["suit"]>> = ['wands', 'cups', 'swords', 'pentacles']
        return order.map(suit => ({
            suit,
            cards: cards.filter(c => c.arcana === 'minor' && c.suit === suit)
        }))
    }, [])

    const majorArcana = React.useMemo(
        () => (showAll && !search ? allMajorArcana : allMajorArcana.filter(matches)),
        [allMajorArcana, matches, search, showAll]
    )
    const minorBySuit = React.useMemo(
        () => allMinorBySuit.map(group => ({
            ...group,
            cards: (showAll && !search) ? group.cards : group.cards.filter(matches)
        })),
        [allMinorBySuit, matches, search, showAll]
    )
    const selectedId = value || initialCardId || ""
    const selectedCard = React.useMemo(
        () => getCardById(selectedId),
        [selectedId]
    )
    const selectedMeaning = selectedCard
        ? (orientation === 'reversed' ? selectedCard.reversedMeaning : selectedCard.uprightMeaning)
        : null

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-muted/40 px-3 py-2">
                <div className="text-sm font-semibold">{positionLabel}</div>
                <div className="text-xs text-muted-foreground mt-1">{description}</div>
            </div>
            {selectedCard && (
                <div className="rounded-md border bg-card p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                            <div className="text-sm font-semibold">{formatCardName(selectedCard)}</div>
                            <div className="text-xs uppercase tracking-wide text-muted-foreground">{orientation}</div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                aria-label="Reverse card orientation"
                                onClick={() => {
                                    const nextOrientation: Orientation = orientation === 'upright' ? 'reversed' : 'upright'
                                    setOrientation(nextOrientation)
                                    onSelect(selectedCard, nextOrientation)
                                }}
                            >
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            {onRemove && (
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    aria-label="Remove card"
                                    onClick={() => {
                                        setValue("");
                                        onRemove();
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                    {selectedMeaning && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {selectedMeaning}
                        </p>
                    )}
                </div>
            )}

            <div className="flex gap-2">
                <Button
                    type="button"
                    variant={orientation === 'upright' ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setOrientation('upright')}
                >
                    Upright
                </Button>
                <Button
                    type="button"
                    variant={orientation === 'reversed' ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setOrientation('reversed')}
                >
                    Reversed
                </Button>
            </div>

            <Command shouldFilter={false}>
                <div className="relative">
                    <CommandInput
                        placeholder="Search card name, suit, arcana..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowAll(prev => !prev)}
                        title={showAll ? "Hide all cards" : "Show all cards"}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
                {(showAll || search.trim().length > 0) && (
                    <CommandList>
                        <CommandEmpty>No card found.</CommandEmpty>
                        {majorArcana.length > 0 && (
                            <>
                                <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Major Arcana</div>
                                <CommandGroup>
                                    {majorArcana.map((card) => (
                                        <CommandItem
                                            key={card.id}
                                            value={card.name}
                                            onSelect={() => {
                                                setValue(card.id);
                                                onSelect(card, orientation);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === card.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{formatCardName(card)}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </>
                        )}
                        {minorBySuit.some(group => group.cards.length > 0) && (
                            <div className="px-3 pt-3 text-xs font-semibold uppercase text-muted-foreground">Minor Arcana</div>
                        )}
                        {minorBySuit.map(group => (
                            group.cards.length > 0 ? (
                                <div key={group.suit}>
                                    <div className="px-3 pb-1 text-[11px] font-semibold text-muted-foreground capitalize">{group.suit}</div>
                                    <CommandGroup>
                                        {group.cards.map((card) => (
                                            <CommandItem
                                                key={card.id}
                                                value={card.name}
                                                onSelect={() => {
                                                    setValue(card.id);
                                                    onSelect(card, orientation);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === card.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm">{formatCardName(card)}</span>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </div>
                            ) : null
                        ))}
                    </CommandList>
                )}
            </Command>
        </div>
    )
}

