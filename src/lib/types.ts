/**
 * Type Definitions
 * 
 * Core types and interfaces used throughout the tarot journal application.
 */

// === Card Types ===

/** The four suits of the Minor Arcana */
export type Suit = 'cups' | 'wands' | 'pentacles' | 'swords';

/** Distinguishes between Major and Minor Arcana cards */
export type ArcanaType = 'major' | 'minor';

/** Card orientation affects its meaning */
export type Orientation = 'upright' | 'reversed';

/** A tarot card with its metadata and meanings */
export interface Card {
    id: string;
    name: string;
    /** 0-21 for Major Arcana, 1-14 for Minor (Ace=1, Page=11, Knight=12, Queen=13, King=14) */
    number?: number;
    suit?: Suit;
    arcana: ArcanaType;
    uprightMeaning: string;
    reversedMeaning: string;
    keywords: string[];
    imageUrl: string;
}

// === Reading Types ===

/** Supported spread layouts */
export type ReadingType = 'three-card' | 'four-card' | 'celtic-cross';

/** A card placed in a specific position within a reading */
export interface ReadingCard {
    /** 1-indexed position in the spread */
    position: number;
    cardId: string;
    cardName: string;
    orientation: Orientation;
    /** Human-readable label (e.g., "Past", "Present", "Future") */
    positionLabel: string;
}

/** An AI-generated interpretation of a reading */
export interface Interpretation {
    id: string;
    /** ISO 8601 date string */
    date: string;
    question: string;
    context?: string;
    /** Markdown-formatted AI response */
    aiResponse: string;
    model: string;
}

/** A complete tarot reading with cards and interpretations */
export interface Reading {
    id: string;
    /** Date string in YYYY-MM-DD format */
    date: string;
    /** The main question asked for this reading */
    question: string;
    /** Optional context provided by the user */
    context?: string;
    type: ReadingType;
    cards: ReadingCard[];
    interpretations: Interpretation[];
}
