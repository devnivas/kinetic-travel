import React, { useState, useEffect } from 'react';
import { TripProvider, useTripContext } from './context/TripContext';
import { Header } from './components/Header';
import { HeroCard } from './components/HeroCard';
import { SmartActionCard } from './components/SmartActionCard';
import { TimelineSection } from './components/TimelineSection';
import { AddTripModal } from './components/AddTripModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { WalletView } from './components/WalletView';
import { AlertsView } from './components/AlertsView';
import { SettingsView } from './components/SettingsView';
import { BottomNavBar } from './components/BottomNavBar';
import { TabType, TripData, AlertNotification } from './types';

function InnerApp() {
  const {
    tripData,
    setTripData,
    alerts,
    setAlerts,
    activeTab,
    setActiveTab,
    isOnline,
    setIsOnline,
    resetCache,
  } = useTripContext();

  const [isAddTripOpen, setIsAddTripOpen] = useState(false);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState(false);

  // Monitor network status (kept for UI sync)
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

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const handleTripGenerated = (newTrip: TripData) => {
    setTripData(newTrip);
    const newAlert: AlertNotification = {
      id: `alt-${Date.now()}`,
      time: 'Just now',
      title: 'Itinerary Updated',
      message: `Travel timeline generated for ${newTrip.airline} ${newTrip.flightNumber} (${newTrip.origin.code} → ${newTrip.destination.code}).`,
      type: 'success',
      read: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setActiveTab('timeline');
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const handleUpdateName = (passengerName: string) => {
    setTripData((prev) => ({ ...prev, passengerName }));
  };

  const handleResetCache = () => {
    resetCache();
  };

  return (
    <div className="bg-[#faf8ff] text-[#191b23] min-h-screen pb-28 font-sans antialiased selection:bg-[#2563eb] selection:text-white">
      {/* Offline / Storage Status Bar */}
      <div className="bg-[#004ac6] text-white text-[11px] font-semibold py-1 px-4 text-center flex items-center justify-center gap-2 shadow-xs">
        <span className="material-symbols-outlined text-[14px]">
          {isOnline ? 'offline_pin' : 'signal_cellular_connected_no_internet_4_bar'}
        </span>
        <span>
          {isOnline
            ? 'Offline Mode Ready: Itinerary & Boarding Pass synced to local storage'
            : 'You are Offline: Showing cached itinerary & digital boarding pass'}
        </span>
      </div>

      {/* Top App Header */}
      <Header
        passengerName={tripData.passengerName}
        flightNumber={tripData.flightNumber}
        status={tripData.status}
        onOpenAddTrip={() => setIsAddTripOpen(true)}
      />

      {/* Main Screen Area */}
      <main className="px-4 py-2 max-w-2xl mx-auto flex flex-col gap-4">
        {activeTab === 'timeline' && (
          <>
            {/* Hero Card */}
            <HeroCard
              originCode={tripData.origin.code}
              destinationCode={tripData.destination.code}
              airline={tripData.airline}
              flightNumber={tripData.flightNumber}
              leaveInMinutes={tripData.leaveInMinutes}
              onCardClick={() => setIsBoardingPassOpen(true)}
            />

            {/* Smart Action Recommendation Card */}
            <SmartActionCard smartTip={tripData.smartTip} />

            {/* Today's Itinerary Timeline */}
            <TimelineSection
              itinerary={tripData.itinerary}
              originCode={tripData.origin.code}
              destinationCode={tripData.destination.code}
              destinationName={tripData.destination.name}
              flightNumber={tripData.flightNumber}
              airline={tripData.airline}
              onOpenBoardingPass={() => setIsBoardingPassOpen(true)}
            />
          </>
        )}

        {activeTab === 'wallet' && (
          <WalletView
            tripData={tripData}
            onOpenBoardingPass={() => setIsBoardingPassOpen(true)}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView alerts={alerts} onMarkRead={handleMarkAlertRead} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            tripData={tripData}
            onUpdateName={handleUpdateName}
            onResetCache={handleResetCache}
          />
        )}
      </main>

      {/* Floating Add Trip Button */}
      {activeTab === 'timeline' && (
        <button
          onClick={() => setIsAddTripOpen(true)}
          className="fixed bottom-20 right-4 z-30 bg-[#004ac6] hover:bg-[#2563eb] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer group"
          title="Add Trip Details"
        >
          <span className="material-symbols-outlined text-[24px]">add</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap group-hover:ml-2">
            Import Trip
          </span>
        </button>
      )}

      {/* Bottom Pinned Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadAlertsCount={unreadAlertsCount}
      />

      {/* Modal: Add Trip Details (Screen 2) */}
      <AddTripModal
        isOpen={isAddTripOpen}
        onClose={() => setIsAddTripOpen(false)}
        onTripGenerated={handleTripGenerated}
      />

      {/* Modal: Boarding Pass */}
      <BoardingPassModal
        isOpen={isBoardingPassOpen}
        onClose={() => setIsBoardingPassOpen(false)}
        tripData={tripData}
      />
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <InnerApp />
    </TripProvider>
  );
}
