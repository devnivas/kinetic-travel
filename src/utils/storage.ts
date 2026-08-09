import { TripData, AlertNotification } from '../types';

const STORAGE_KEYS = {
  TRIP_DATA: 'flight_app_trip_data',
  ALERTS: 'flight_app_alerts',
  WEATHER: 'flight_app_weather_cache',
  LAST_SYNCED: 'flight_app_last_synced',
};

export const loadCachedTripData = (fallback: TripData): TripData => {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.TRIP_DATA);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.flightNumber && parsed.itinerary) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load cached trip data:', err);
  }
  return fallback;
};

export const saveTripDataToCache = (tripData: TripData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRIP_DATA, JSON.stringify(tripData));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNCED, new Date().toISOString());
  } catch (err) {
    console.warn('Failed to save trip data to cache:', err);
  }
};

export const loadCachedAlerts = (fallback: AlertNotification[]): AlertNotification[] => {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.ALERTS);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load cached alerts:', err);
  }
  return fallback;
};

export const saveAlertsToCache = (alerts: AlertNotification[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
  } catch (err) {
    console.warn('Failed to save alerts to cache:', err);
  }
};

export const loadCachedWeather = (destinationCode: string): any | null => {
  try {
    const cached = localStorage.getItem(`${STORAGE_KEYS.WEATHER}_${destinationCode}`);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn('Failed to load cached weather:', err);
  }
  return null;
};

export const saveWeatherToCache = (destinationCode: string, weatherData: any): void => {
  try {
    localStorage.setItem(
      `${STORAGE_KEYS.WEATHER}_${destinationCode}`,
      JSON.stringify(weatherData)
    );
  } catch (err) {
    console.warn('Failed to save weather data to cache:', err);
  }
};

export const getLastSyncedTime = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.LAST_SYNCED);
};

export const clearCache = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TRIP_DATA);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    localStorage.removeItem(STORAGE_KEYS.LAST_SYNCED);
  } catch (err) {
    console.warn('Failed to clear cache:', err);
  }
};
