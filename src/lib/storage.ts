/**
 * Reading Storage
 * 
 * Handles persistence of tarot readings using localStorage.
 * Provides CRUD operations for reading data.
 */
import { Reading } from './types';

// === Constants ===

const STORAGE_KEY = 'tarot-readings-v1';

// === Helpers ===

/**
 * Normalizes a reading object to ensure all required fields exist.
 * Provides defaults for new fields to maintain backward compatibility.
 */
function normalizeReading(reading: Partial<Reading> & Pick<Reading, 'id' | 'question'>): Reading {
    const now = new Date().toISOString();
    return {
        userId: 'local-user', // Default user ID for local storage
        createdAt: reading.createdAt || reading.date || now,
        updatedAt: reading.updatedAt || now,
        spreadId: reading.spreadId || reading.type || 'three-card',
        spreadName: reading.spreadName || (reading.type ? reading.type.replace('-', ' ') : 'Three Card Spread'),
        cards: reading.cards || [],
        insights: reading.insights || [],
        relatedReadings: reading.relatedReadings || [],
        interpretations: reading.interpretations || [],
        isPublic: reading.isPublic ?? false,
        // Preserve legacy fields for backward compat
        date: reading.date || reading.createdAt,
        type: reading.type || reading.spreadId,
        ...reading,
    } as Reading;
}

// === Storage Functions ===

/** Saves a new reading to localStorage (prepends to list) */
export const saveReading = (reading: Partial<Reading> & Pick<Reading, 'id' | 'question'>): void => {
    if (typeof window === 'undefined') return;
    const normalized = normalizeReading(reading);
    const readings = getReadings();
    readings.unshift(normalized); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
};

/** Updates an existing reading in localStorage */
export const updateReading = (updatedReading: Partial<Reading> & Pick<Reading, 'id' | 'question'>): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const index = readings.findIndex(r => r.id === updatedReading.id);
    if (index !== -1) {
        const normalized = normalizeReading({
            ...readings[index],
            ...updatedReading,
            updatedAt: new Date().toISOString(),
        });
        readings[index] = normalized;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    }
};

/** Retrieves all readings from localStorage */
export const getReadings = (): Reading[] => {
    if (typeof window === 'undefined') return [];
    const start = localStorage.getItem(STORAGE_KEY);
    if (!start) return [];
    try {
        const raw = JSON.parse(start);
        // Normalize each reading to ensure all fields exist
        return raw.map((r: any) => normalizeReading(r));
    } catch (e) {
        console.error("Failed to parse readings", e);
        return [];
    }
};

/** Finds a reading by its unique ID */
export const getReadingById = (id: string): Reading | undefined => {
    const readings = getReadings();
    const reading = readings.find(r => r.id === id);
    return reading ? normalizeReading(reading) : undefined;
};

/** Deletes a reading from localStorage by ID */
export const deleteReading = (id: string): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const filtered = readings.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
