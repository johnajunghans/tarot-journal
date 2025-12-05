"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cards } from "@/lib/tarot-data"
import { Card as TarotCard, Orientation } from "@/lib/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CardSearchProps {
    onSelect: (card: TarotCard, orientation: Orientation) => void
    placeholder?: string
}

export function CardSearch({ onSelect, placeholder = "Search for a card..." }: CardSearchProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [isReversed, setIsReversed] = React.useState(false)

    // Filter cards based on value? 
    // Command component does client-side filtering efficiently.

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center space-x-2">
                <Switch
                    id="orientation-mode"
                    checked={isReversed}
                    onCheckedChange={setIsReversed}
                />
                <Label htmlFor="orientation-mode" className="text-sm font-medium">
                    {isReversed ? "Reversed" : "Upright"}
                </Label>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value
                            ? cards.find((card) => card.name === value)?.name
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="Type card name, suit..." />
                        <CommandList>
                            <CommandEmpty>No card found.</CommandEmpty>
                            <CommandGroup>
                                {cards.map((card) => (
                                    <CommandItem
                                        key={card.id}
                                        value={card.name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                            onSelect(card, isReversed ? 'reversed' : 'upright')
                                            // Reset for next input if needed, but here we just select once?
                                            // The parent controls the flow, so we probably want to reset `value` if this component is reused.
                                            // For now, let's leave it controlled.
                                            setValue("") // Clear selection visualized here? Or keep it?
                                            // If this component is used for *one* slot, we might want to show the selected value.
                                            // But the PRD says "For each card position, search interface appears".
                                            // I'll assume the parent manages the "active" slot and this component just emits the event.
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === card.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {card.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
