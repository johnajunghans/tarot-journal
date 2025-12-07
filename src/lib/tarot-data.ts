/**
 * Tarot Card Data
 * 
 * Contains the complete deck of 78 tarot cards with their meanings,
 * keywords, and image URLs. Also provides helper functions for
 * card lookups and name formatting.
 */
import { Card, Suit } from './types';

// === Constants ===

const majorArcanaNames = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
    "Judgement", "The World"
];

const suits: Suit[] = ['cups', 'wands', 'pentacles', 'swords'];

/** Human-readable suit names */
const suitNames: Record<Suit, string> = {
    cups: "Cups",
    wands: "Wands",
    pentacles: "Pentacles",
    swords: "Swords"
};

// === Image URL Helpers ===

const getMajorImage = (num: number) => {
    const padded = num.toString().padStart(2, '0');
    return `https://steve-p.org/cards/small/sm_RWSa-T-${padded}.webp`;
};

const getMinorImage = (suit: Suit, num: number) => {
    const suitCode = {
        wands: 'W',
        cups: 'C',
        swords: 'S',
        pentacles: 'P'
    }[suit];

    let rankCode = "";
    if (num === 1) rankCode = "0A";
    else if (num >= 2 && num <= 9) rankCode = `0${num}`;
    else if (num === 10) rankCode = "10";
    else if (num === 11) rankCode = "J1"; // Page
    else if (num === 12) rankCode = "J2"; // Knight
    else if (num === 13) rankCode = "QU"; // Queen
    else if (num === 14) rankCode = "KI"; // King

    return `https://steve-p.org/cards/small/sm_RWSa-${suitCode}-${rankCode}.webp`;
};

/** Generates placeholder meanings (simplified for prototype) */
const getMeanings = (name: string, upright: boolean) => {
    // In a real app, this would be a full database. 
    // We'll return generic but thematic strings for now or brief ones.
    return upright
        ? `The essence of ${name} brings clarity and direction.`
        : `The reversed ${name} suggests a need for internal reflection or a blockage.`;
};

// === Card Deck Generation ===

export const cards: Card[] = [];

// Generate Major Arcana
majorArcanaNames.forEach((name, index) => {
    cards.push({
        id: `major-${index}`,
        name,
        number: index,
        arcana: 'major',
        uprightMeaning: "New beginnings, innocence, spontaneity, free spirit", // Placeholder for specific data
        reversedMeaning: "Recklessness, risk-taking, general foolishness",
        keywords: ["beginnings", "freedom", "innocence"],
        imageUrl: getMajorImage(index)
    });
});

// Generate Minor Arcana
suits.forEach(suit => {
    for (let i = 1; i <= 14; i++) {
        let name = "";
        if (i === 1) name = `Ace of ${suitNames[suit]}`;
        else if (i <= 10) name = `${i} of ${suitNames[suit]}`;
        else if (i === 11) name = `Page of ${suitNames[suit]}`;
        else if (i === 12) name = `Knight of ${suitNames[suit]}`;
        else if (i === 13) name = `Queen of ${suitNames[suit]}`;
        else if (i === 14) name = `King of ${suitNames[suit]}`;

        cards.push({
            id: `minor-${suit}-${i}`,
            name,
            number: i,
            suit,
            arcana: 'minor',
            uprightMeaning: `Upright energy of ${suit}: action, emotion, thought, or material.`,
            reversedMeaning: `Blocked energy of ${suit}.`,
            keywords: [suit, "minor arcana"],
            imageUrl: getMinorImage(suit, i)
        });
    }
});

// === Demo Data Overrides ===

/** Specific meaning overrides for better demo experience */
const demoUpdates: Partial<Card>[] = [
    { id: 'major-0', uprightMeaning: "New beginnings, innocence, spontaneity.", reversedMeaning: "Recklessness, risk-taking." },
    { id: 'major-13', uprightMeaning: "Endings, change, transformation, transition.", reversedMeaning: "Resistance to change, personal transformation." },
    // Add more as needed
];

demoUpdates.forEach(update => {
    const card = cards.find(c => c.id === update.id);
    if (card) {
        Object.assign(card, update);
    }
});

// === Helper Functions ===

/** Number-to-word mapping for minor arcana card names */
const numberWords: Record<number, string> = {
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
};

/**
 * Finds a card by its unique ID.
 * 
 * @param id - The card ID (e.g., "major-0" or "minor-cups-1")
 * @returns The card if found, undefined otherwise
 */
export function getCardById(id: string): Card | undefined {
    return cards.find(c => c.id === id);
}

/**
 * Formats a card name for display, converting numeric minor arcana
 * (e.g., "2 of Cups") to word form (e.g., "Two of Cups").
 * 
 * @param card - The card to format
 * @returns The formatted card name
 */
export function formatCardName(card: Card): string {
    if (card.arcana === 'minor' && card.suit && card.number && card.number >= 2 && card.number <= 10) {
        const word = numberWords[card.number] ?? card.number.toString();
        const suitName = suitNames[card.suit] ?? card.suit;
        return `${word} of ${suitName}`;
    }
    return card.name;
}

