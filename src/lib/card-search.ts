/**
 * Card Search Utilities
 * 
 * Provides fuzzy search functionality for finding tarot cards by name,
 * suit, arcana type, or number. Supports number-to-word expansion
 * (e.g., "3" matches "Three of Cups").
 */
import { TarotCard } from "./types"

// === Constants ===

/** Maps numbers to their word equivalents for card names */
export const numberWords: Record<number, string> = {
    1: "Ace",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
}

/** Maps word equivalents back to numbers */
export const wordToNumber: Record<string, number> = {
    ace: 1,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
}

// === Helpers ===

/**
 * Normalizes a string for search comparison.
 * Converts to lowercase and trims whitespace.
 */
export function normalize(str: string): string {
    return str.toLowerCase().trim()
}

/**
 * Expands search query tokens to include number/word variations.
 * For example, "3" expands to include "three", and "three" expands to include "3".
 * 
 * @param search - The raw search string from user input
 * @returns Array of unique, normalized tokens with expansions
 */
export function expandQueryTokens(search: string): string[] {
    const base = normalize(search)
    if (!base) return []

    const rawTokens = base.split(/\s+/).filter(Boolean)
    const expanded: string[] = []

    rawTokens.forEach(tok => {
        expanded.push(tok)
        
        // Expand numeric tokens to their word form
        const asNumber = parseInt(tok, 10)
        if (!Number.isNaN(asNumber) && numberWords[asNumber]) {
            expanded.push(normalize(numberWords[asNumber]))
        }
        
        // Expand word tokens to their numeric form
        if (wordToNumber[tok]) {
            expanded.push(wordToNumber[tok].toString())
            if (numberWords[wordToNumber[tok]]) {
                expanded.push(normalize(numberWords[wordToNumber[tok]]))
            }
        }
    })

    return Array.from(new Set(expanded)).filter(Boolean)
}

/**
 * Checks if a card matches the given search tokens.
 * Matches against card name, formatted name, suit, arcana, and number.
 * 
 * @param card - The card to check
 * @param queryTokens - Pre-expanded search tokens from expandQueryTokens()
 * @param formatCardName - Function to format card names for display
 * @returns True if all tokens match some field of the card
 */
export function matchesCard(
    card: TarotCard,
    queryTokens: string[],
    formatCardName: (card: TarotCard) => string
): boolean {
    if (queryTokens.length === 0) return false

    const rawName = normalize(card.name)
    const formatted = normalize(formatCardName(card))
    const suit = card.suit ? normalize(card.suit) : ""
    const arcana = normalize(card.arcana)
    const num = card.number
    const numWord = num ? normalize(numberWords[num] ?? "") : ""

    const fields = [rawName, formatted, suit, arcana, num?.toString() ?? "", numWord]
    
    return queryTokens.every(token => 
        fields.some(field => field.includes(token))
    )
}

