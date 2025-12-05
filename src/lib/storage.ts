import { Reading } from './types';

const STORAGE_KEY = 'tarot-readings-v1';

export const saveReading = (reading: Reading): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    readings.unshift(reading); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
};

export const updateReading = (updatedReading: Reading): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const index = readings.findIndex(r => r.id === updatedReading.id);
    if (index !== -1) {
        readings[index] = updatedReading;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    }
};

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

export const getReadingById = (id: string): Reading | undefined => {
    const readings = getReadings();
    return readings.find(r => r.id === id);
};

export const deleteReading = (id: string): void => {
    if (typeof window === 'undefined') return;
    const readings = getReadings();
    const filtered = readings.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
