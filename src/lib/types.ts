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
export interface TarotCard {
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

// === Spread Types ===

/** A position definition within a spread template */
export interface SpreadPosition {
    /** Unique identifier for this position within the spread */
    id: string;
    /** Position number/order (1, 2, 3, etc.) */
    position: number;
    /** Display title for this position (e.g., "Past", "Challenge", "Outcome") */
    title: string;
    /** Description of what this position represents */
    description: string;
    /** X coordinate in viewBox units for canvas positioning */
    x: number;
    /** Y coordinate in viewBox units for canvas positioning */
    y: number;
    /** Rotation in degrees */
    rotation: number;
    /** Z-index for layering */
    zIndex: number;
}

/** A user-created spread template */
export interface Spread {
    id: string;
    /** Name of the spread (e.g., "Celtic Cross", "My Custom Spread") */
    name: string;
    /** Optional description of the spread's purpose */
    description?: string;
    /** User who created this spread */
    createdBy: string; // userId
    /** ISO 8601 date string */
    createdAt: string;
    /** ISO 8601 date string */
    updatedAt: string;
    /** Positions that make up this spread */
    positions: SpreadPosition[];
    /** Whether this spread is publicly visible */
    isPublic: boolean;
    /** Number of times this spread has been starred/liked */
    starCount: number;
    /** User IDs who have starred this spread */
    starredBy: string[];
}

/** ViewBox state for the spread canvas */
export interface ViewBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

// === Reading Types ===

/** A card drawn for a specific position in a reading */
export interface DrawnCard {
    /** The position in the spread this card was drawn for */
    positionId: string;
    /** Reference to the tarot card */
    cardId: string;
    /** Card name (denormalized for display) */
    cardName: string;
    /** How the card was oriented when drawn */
    orientation: Orientation;
}

/** 
 * Compatibility type for legacy fixed-layout spreads.
 * Extends DrawnCard with position number and label for backward compatibility.
 */
export interface ReadingCard extends DrawnCard {
    /** Position number in spread (1-indexed, for legacy layouts) */
    position: number;
    /** Human-readable position label (e.g., "Past", "Challenge") */
    positionLabel: string;
}

/** Reference to a related reading */
export interface RelatedReading {
    /** ID of the related reading */
    readingId: string;
    /** Optional description of the relationship */
    relationshipDescription?: string;
}

/** A key insight from a reading */
export interface Insight {
    id: string;
    /** The insight text */
    text: string;
    /** ISO 8601 date string when insight was recorded */
    createdAt: string;
    /** Reading this insight came from */
    readingId: string;
    /** Optional tags for categorization */
    tags?: string[];
}

/** Source of an interpretation */
export type InterpretationSource = 'ai' | 'community';

/** AI interpretation metadata */
export interface AIInterpretationMetadata {
    /** Model identifier (e.g., "anthropic/claude-3.5-sonnet") */
    model: string;
    /** Whether this was a free or paid tier model */
    tier: 'free' | 'premium';
    /** Custom system prompt used (if any) */
    systemPrompt?: string;
}

/** Community interpretation metadata */
export interface CommunityInterpretationMetadata {
    /** User who provided the interpretation */
    authorId: string;
    /** Author's display name (denormalized) */
    authorName: string;
    /** Optional: upvotes/helpful count */
    helpfulCount?: number;
}

/** An interpretation of a reading (AI or human) */
export interface Interpretation {
    id: string;
    /** Reading this interpretation is for */
    readingId: string;
    /** ISO 8601 date string */
    createdAt: string;
    /** Source of the interpretation */
    source: InterpretationSource;
    /** The interpretation content (markdown-formatted) */
    content: string;
    /** Optional focus area for this interpretation */
    focus?: string;
    /** Source-specific metadata */
    metadata: AIInterpretationMetadata | CommunityInterpretationMetadata;
    
    // === Legacy compatibility fields ===
    /** @deprecated Use createdAt instead. Kept for backward compatibility. */
    date?: string;
    /** @deprecated Moved to interpretation context. Kept for backward compatibility. */
    question?: string;
    /** @deprecated Moved to interpretation context. Kept for backward compatibility. */
    context?: string;
    /** @deprecated Use content instead. Kept for backward compatibility. */
    aiResponse?: string;
    /** @deprecated Use metadata.model instead. Kept for backward compatibility. */
    model?: string;
}

/** A complete tarot reading */
export interface Reading {
    id: string;
    /** User who created this reading */
    userId: string;
    /** ISO 8601 date string */
    createdAt: string;
    /** ISO 8601 date string */
    updatedAt: string;
    /** The spread template used for this reading */
    spreadId: string;
    /** Spread name (denormalized for display) */
    spreadName: string;
    /** The question asked */
    question: string;
    /** Optional additional context */
    context?: string;
    /** Cards drawn for this reading */
    cards: ReadingCard[]; // Using ReadingCard for backward compatibility
    /** Optional photo of the physical reading */
    imageUrl?: string;
    /** User's personal reflections on the reading */
    thoughts?: string;
    /** Key insights from this reading */
    insights: Insight[];
    /** Readings related to this one */
    relatedReadings: RelatedReading[];
    /** Interpretations received (AI or community) */
    interpretations: Interpretation[];
    /** Whether this reading is shared publicly */
    isPublic: boolean;
    
    // === Legacy compatibility fields ===
    /** @deprecated Use createdAt instead. Kept for backward compatibility. */
    date?: string;
    /** @deprecated Use spreadId/spreadName instead. Kept for backward compatibility. */
    type?: string;
}

// === Interpretation Request Types ===

/** Data submitted when requesting an interpretation */
export interface InterpretationRequest {
    readingId: string;
    /** The question from the reading */
    question: string;
    /** Optional context from the reading */
    context?: string;
    /** The spread used */
    spreadId: string;
    spreadName: string;
    /** Positions and drawn cards */
    positions: Array<{
        positionTitle: string;
        positionDescription: string;
        cardName: string;
        orientation: Orientation;
    }>;
    /** Optional image of the reading */
    imageUrl?: string;
    /** Related readings (if any) */
    relatedReadings: RelatedReading[];
    /** Optional focus for the interpretation */
    focus?: string;
    /** Whether to include thoughts (only for AI) */
    includeThoughts?: boolean;
    /** The user's thoughts (if includeThoughts is true) */
    thoughts?: string;
    /** Whether to include insights (only for AI) */
    includeInsights?: boolean;
    /** The user's insights (if includeInsights is true) */
    insights?: Insight[];
}

// === User Settings Types ===

/** User preferences for AI interpretations */
export interface AISettings {
    /** User's custom system prompt (optional) */
    customSystemPrompt?: string;
    /** User's own OpenRouter API key (optional) */
    openRouterApiKey?: string;
    /** Preferred model for free tier */
    preferredFreeModel?: string;
    /** Preferred model for premium tier */
    preferredPremiumModel?: string;
}

/** User's global settings */
export interface UserSettings {
    userId: string;
    aiSettings: AISettings;
    /** ISO 8601 date string of last community interpretation request */
    lastCommunityRequestAt?: string;
}

// === Type Guards ===

/** Check if interpretation metadata is from AI */
export function isAIInterpretation(
    metadata: AIInterpretationMetadata | CommunityInterpretationMetadata
): metadata is AIInterpretationMetadata {
    return 'model' in metadata;
}

/** Check if interpretation metadata is from community */
export function isCommunityInterpretation(
    metadata: AIInterpretationMetadata | CommunityInterpretationMetadata
): metadata is CommunityInterpretationMetadata {
    return 'authorId' in metadata;
}