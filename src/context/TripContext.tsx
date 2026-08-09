import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TripData, AlertNotification, TabType } from '../types';
import {
  loadCachedTripData,
  saveTripDataToCache,
  loadCachedAlerts,
  saveAlertsToCache,
  getLastSyncedTime,
  clearCache,
} from '../utils/storage';

interface TripContextProps {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
  alerts: AlertNotification[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertNotification[]>>;
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
  lastSynced: string | null;
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
  resetCache: () => void;
}

const TripContext = createContext<TripContextProps | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripData, setTripData] = useState<TripData>(() =>
    loadCachedTripData({
      passengerName: 'John Doe',
      flightNumber: 'AA123',
      airline: 'American Airlines',
      status: 'On Time',
      origin: { code: 'SFO', name: 'San Francisco International' },
      destination: { code: 'JFK', name: 'John F. Kennedy Intl' },
      departureTime: new Date().toISOString(),
      leaveInMinutes: 120,
      terminal: '2',
      gate: 'B12',
      smartTip: { title: '', text: '', uberCost: '', tsaTime: '', transitTime: '' },
      weather: { location: '', temp: '', condition: '' },
      itinerary: [],
    })
  );

  const [alerts, setAlerts] = useState<AlertNotification[]>(() => loadCachedAlerts([]));
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [lastSynced, setLastSynced] = useState<string | null>(getLastSyncedTime());

  // Persist trip data and update sync time
  useEffect(() => {
    saveTripDataToCache(tripData);
    setLastSynced(new Date().toISOString());
  }, [tripData]);

  // Persist alerts
  useEffect(() => {
    saveAlertsToCache(alerts);
  }, [alerts]);

  // Network status listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const resetCache = () => {
    clearCache();
    window.location.reload();
  };

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        alerts,
        setAlerts,
        activeTab,
        setActiveTab,
        lastSynced,
        isOnline,
        setIsOnline,
        resetCache,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = (): TripContextProps => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
