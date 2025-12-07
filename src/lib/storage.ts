/**
 * Reading Storage
 * 
 * Handles persistence of tarot readings using localStorage.
 * Provides CRUD operations for reading data.
 */
import { Reading } from './types';

// === Constants ===

const STORAGE_KEY = 'tarot-readings-v1';

// === Storage Functions ===

/** Saves a new reading to localStorage (prepends to list) */
export const saveReading = (reading: Reading): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    readings.unshift(reading); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
};

/** Updates an existing reading in localStorage */
export const updateReading = (updatedReading: Reading): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const index = readings.findIndex(r => r.id === updatedReading.id);
    if (index !== -1) {
        readings[index] = updatedReading;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    }
};

/** Retrieves all readings from localStorage */
export const getReadings = (): Reading[] => {
    if (typeof window === 'undefined') return [];
    const start = localStorage.getItem(STORAGE_KEY);
    if (!start) return [];
    try {
        return JSON.parse(start);
    } catch (e) {
        console.error("Failed to parse readings", e);
        return [];
    }
};

/** Finds a reading by its unique ID */
export const getReadingById = (id: string): Reading | undefined => {
    const readings = getReadings();
    return readings.find(r => r.id === id);
};

/** Deletes a reading from localStorage by ID */
export const deleteReading = (id: string): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const filtered = readings.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
