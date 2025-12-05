import { Card, Suit } from './types';

const majorArcanaNames = [
    "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
    "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
    "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
    "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
    "Judgement", "The World"
];

const suits: Suit[] = ['cups', 'wands', 'pentacles', 'swords'];
const suitNames = {
    cups: "Cups",
    wands: "Wands",
    pentacles: "Pentacles",
    swords: "Swords"
};

const getMajorImage = (num: number) => {
    const padded = num.toString().padStart(2, '0');
    return `https://sacred-texts.com/tarot/pkt/img/ar${padded}.jpg`;
};

const getMinorImage = (suit: Suit, num: number) => {
    const suitPrefix = {
        wands: 'wa',
        cups: 'cu',
        swords: 'sw',
        pentacles: 'pe'
    }[suit];
    const padded = num.toString().padStart(2, '0');
    return `https://sacred-texts.com/tarot/pkt/img/${suitPrefix}${padded}.jpg`;
};

// Simplified meanings for prototype
const getMeanings = (name: string, upright: boolean) => {
    // In a real app, this would be a full database. 
    // We'll return generic but thematic strings for now or brief ones.
    return upright
        ? `The essence of ${name} brings clarity and direction.`
        : `The reversed ${name} suggests a need for internal reflection or a blockage.`;
};

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

// Update specific meanings for a better demo experience
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
