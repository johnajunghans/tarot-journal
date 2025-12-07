/**
 * Spread Configuration
 * 
 * Defines the available tarot spread types, their position labels,
 * and descriptions. Used across the application for consistent
 * spread rendering and selection.
 */
import { ReadingType } from "./types"

// === Position Labels ===

/**
 * Position labels for each spread type.
 * Maps 1-indexed position numbers to their semantic meanings.
 */
export const SPREAD_POSITIONS: Record<ReadingType, string[]> = {
    "three-card": ['Past', 'Present', 'Future'],
    "four-card": ['Overall Theme', 'Detail 1', 'Detail 2', 'Detail 3'],
    "celtic-cross": [
        'Present Situation', 'Challenge', 'Foundation', 'Recent Past',
        'Crown', 'Near Future', 'Self', 'Environment', 'Hopes/Fears', 'Outcome'
    ]
}

// === Position Descriptions ===

/**
 * Detailed descriptions for each position in each spread type.
 * Used to guide the reader during card placement.
 */
export const POSITION_DESCRIPTIONS: Record<ReadingType, string[]> = {
    'three-card': [
        'What influences from the past are shaping the situation.',
        'The current energy or focus of the situation.',
        'Likely direction or outcome based on the present path.'
    ],
    'four-card': [
        'The overarching theme or central message.',
        'A key detail or contributing factor.',
        'Another important aspect to consider.',
        'An additional nuance or supporting insight.'
    ],
    'celtic-cross': [
        'Present situation and dominant energy.',
        'The challenge, obstacle, or crossing force.',
        'Foundation or root cause beneath the surface.',
        'Recent past that led to the current moment.',
        'Conscious focus, goals, or what crowns the reading.',
        'Near future or the next development.',
        'Self-perception or the querent\'s stance.',
        'Environment, influences, or external factors.',
        'Hopes and fears intertwined in the matter.',
        'Probable outcome if energies remain unchanged.'
    ]
}

// === Spread Definitions ===

export interface SpreadDefinition {
    type: ReadingType
    name: string
    description: string
    positions: string[]
}

/**
 * Complete spread definitions for the spread selection UI.
 * Combines type, display name, description, and position labels.
 */
export const SPREADS: SpreadDefinition[] = [
    {
        type: 'three-card',
        name: 'Three Card Spread',
        description: 'Past, Present, and Future insights.',
        positions: SPREAD_POSITIONS['three-card']
    },
    {
        type: 'four-card',
        name: 'Four Card Spread',
        description: 'Overall theme with detailed breakdown.',
        positions: SPREAD_POSITIONS['four-card']
    },
    {
        type: 'celtic-cross',
        name: 'Celtic Cross',
        description: 'Comprehensive 10-card reading.',
        positions: SPREAD_POSITIONS['celtic-cross']
    }
]

// === Helper Functions ===

/**
 * Gets the position label for a specific position in a spread.
 * Falls back to "Position N" if not found.
 */
export function getPositionLabel(type: ReadingType, position: number): string {
    return SPREAD_POSITIONS[type]?.[position - 1] ?? `Position ${position}`
}

/**
 * Gets the position description for a specific position in a spread.
 * Falls back to a generic message if not found.
 */
export function getPositionDescription(type: ReadingType, position: number): string {
    return POSITION_DESCRIPTIONS[type]?.[position - 1] 
        ?? "Reflect on this aspect of your reading to guide your intuition."
}

