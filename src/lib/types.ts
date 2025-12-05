export type Suit = 'cups' | 'wands' | 'pentacles' | 'swords';
export type ArcanaType = 'major' | 'minor';
export type Orientation = 'upright' | 'reversed';

export interface Card {
    id: string;
    name: string;
    number?: number; // 0-21 for Major, 1-14 for Minor (Ace=1, King=14)
    suit?: Suit;
    arcana: ArcanaType;
    uprightMeaning: string;
    reversedMeaning: string;
    keywords: string[];
    imageUrl: string; // We'll generate a placeholder or use a pattern
}

export type ReadingType = 'three-card' | 'four-card' | 'celtic-cross';

export interface ReadingCard {
    position: number;
    cardId: string;
    cardName: string;
    orientation: Orientation;
    positionLabel: string;
}

export interface Interpretation {
    id: string;
    date: string; // ISO string
    question: string;
    context?: string;
    aiResponse: string; // markdown
    model: string;
}

export interface Reading {
    id: string;
    date: string; // ISO string
    type: ReadingType;
    cards: ReadingCard[];
    interpretations: Interpretation[];
}
