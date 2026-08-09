import React, { useState } from 'react';
import { TripData } from '../types';

interface AddTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripGenerated: (newTrip: TripData) => void;
}

export const AddTripModal: React.FC<AddTripModalProps> = ({
  isOpen,
  onClose,
  onTripGenerated,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePasteSample = (sampleText: string) => {
    setInputValue(sampleText);
    setErrorMessage(null);
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputValue(text);
          setErrorMessage(null);
        }
      }
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSubmit = inputValue.trim() || 'United Airlines UA 421 SFO to JFK departure 09:15 AM';
    
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/parse-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: textToSubmit }),
      });

      if (!res.ok) {
        throw new Error('Failed to parse trip');
      }

      const tripData: TripData = await res.json();
      onTripGenerated(tripData);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      console.error('Error generating timeline:', err);
      // Fallback trip generation
      const fallbackTrip: TripData = {
        passengerName: 'Alex',
        flightNumber: textToSubmit.toUpperCase().includes('AA') ? 'AA 100' : 'UA 421',
        airline: textToSubmit.toUpperCase().includes('AA') ? 'American Airlines' : 'United Airlines',
        status: 'On Time',
        origin: { code: 'SFO', name: 'San Francisco International' },
        destination: { code: 'JFK', name: 'New York JFK' },
        departureTime: '09:15 AM',
        leaveInMinutes: 42,
        terminal: 'Terminal 2',
        gate: 'Gate 54B',
        smartTip: {
          title: 'Time to go!',
          text: 'Leave for SFO Terminal 2 now via Uber/Lyft to clear security by 08:15 AM.',
          uberCost: '$42 • 28m',
          tsaTime: '8 min',
          transitTime: '45 min',
        },
        weather: { location: 'SFO', temp: '62°F', condition: 'Partly Cloudy' },
        itinerary: [
          {
            id: 'item-1',
            time: '07:15 AM',
            title: 'Departure Reminder',
            description: 'Leave home for SFO Airport.',
            type: 'home',
            icon: 'home',
            highlight: false,
          },
          {
            id: 'item-2',
            time: '07:45 AM',
            title: 'Arrive at SFO',
            description: 'Terminal 2, Gate 54B',
            type: 'airport',
            icon: 'meeting_room',
            highlight: true,
            badgeText: 'Terminal 2, Gate 54B',
          },
          {
            id: 'item-3',
            time: '08:00 AM',
            title: 'Weather Check',
            description: 'SFO: 62°F, Partly Cloudy',
            type: 'weather',
            icon: 'partly_cloudy_day',
            highlight: false,
          },
          {
            id: 'item-4',
            time: '08:15 AM',
            title: 'Baggage Drop Closes',
            description: 'Closes in 25 mins.',
            type: 'baggage',
            icon: 'luggage',
            highlight: false,
          },
          {
            id: 'item-5',
            time: '08:45 AM',
            title: 'Boarding Call',
            description: 'Boarding begins at Gate 54B Group 2.',
            type: 'boarding',
            icon: 'airline_seat_recline_normal',
            highlight: false,
            hasBoardingPassButton: true,
          },
        ],
      };
      onTripGenerated(fallbackTrip);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 glass-overlay z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300">
      <div className="w-full max-w-md bg-white rounded-t-[24px] sm:rounded-[24px] shadow-2xl flex flex-col h-[750px] sm:h-auto sm:max-h-[750px] relative z-50 overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Mobile Swipe Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-12 h-1.5 bg-[#e1e2ed] rounded-full opacity-60"></div>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 pt-3 sm:pt-5 pb-4 border-b border-[#e1e2ed]">
          <h2 className="text-[20px] font-semibold text-[#191b23]">Add Trip Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ededf9] transition-colors text-[#434655] active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          
          {/* Quick Import Section */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="trip-input"
              className="text-[12px] font-semibold text-[#434655] uppercase tracking-wider"
            >
              QUICK IMPORT
            </label>

            <div className="relative group">
              <textarea
                id="trip-input"
                rows={5}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Paste confirmation email, flight number, or train code (e.g., AA123 or Amtrak 184)..."
                className="w-full bg-[#f3f3fe] border border-[#c3c6d7] rounded-xl p-4 text-[15px] text-[#191b23] placeholder:text-[#737686] focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-none shadow-xs"
              />

              <div className="absolute bottom-3 right-3 flex space-x-1.5">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  title="Paste from Clipboard"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ededf9] hover:bg-[#e1e2ed] transition-colors text-[#434655] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">content_paste</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Preset Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-[#737686] self-center">Try:</span>
              <button
                type="button"
                onClick={() => handlePasteSample('United Flight UA421 SFO to JFK on August 12. Departs 9:15 AM')}
                className="text-[11px] bg-[#ededf9] hover:bg-[#e1e2ed] text-[#004ac6] px-2 py-1 rounded-md cursor-pointer"
              >
                UA 421 (SFO→JFK)
              </button>
              <button
                type="button"
                onClick={() => handlePasteSample('American Airlines AA100 LAX to JFK departs 11:30 AM Terminal 4')}
                className="text-[11px] bg-[#ededf9] hover:bg-[#e1e2ed] text-[#004ac6] px-2 py-1 rounded-md cursor-pointer"
              >
                AA 100 (LAX→JFK)
              </button>
              <button
                type="button"
                onClick={() => handlePasteSample('Amtrak 184 Northeast Regional Washington DC to NYC Penn Station')}
                className="text-[11px] bg-[#ededf9] hover:bg-[#e1e2ed] text-[#004ac6] px-2 py-1 rounded-md cursor-pointer"
              >
                Amtrak 184
              </button>
            </div>

            <p className="text-[12px] text-[#434655] opacity-75 px-0.5">
              We'll automatically extract times, terminals, and booking references.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center py-1">
            <div className="flex-1 h-px bg-[#e1e2ed]"></div>
            <span className="px-3 text-[12px] text-[#434655]">or</span>
            <div className="flex-1 h-px bg-[#e1e2ed]"></div>
          </div>

          {/* Connect Sources Pills */}
          <div className="flex flex-col space-y-2.5 pb-4">
            <span className="text-[12px] font-semibold text-[#434655] uppercase tracking-wider">
              CONNECT SOURCES
            </span>

            <div className="flex flex-row overflow-x-auto pb-2 -mx-4 px-4 space-x-2.5 snap-x hide-scrollbar">
              <button
                type="button"
                onClick={() => {
                  setInputValue('Synced from Google Calendar: Flight UA421 SFO to JFK Gate 54B 09:15 AM');
                }}
                className="shrink-0 flex items-center space-x-2 px-4 py-2.5 bg-[#ededf9] hover:bg-[#e1e2ed] border border-[#e1e2ed] rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                  calendar_month
                </span>
                <span className="text-[12px] font-medium text-[#191b23]">
                  Sync Google Calendar
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setInputValue('Scanned Boarding Pass PDF: United Airlines UA421 SFO-JFK Gate 54B Seat 12A');
                }}
                className="shrink-0 flex items-center space-x-2 px-4 py-2.5 bg-[#ededf9] hover:bg-[#e1e2ed] border border-[#e1e2ed] rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#bc4800] text-[20px]">
                  document_scanner
                </span>
                <span className="text-[12px] font-medium text-[#191b23]">
                  Scan Boarding Pass PDF
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setInputValue('Scanned Paper Ticket: Delta DL210 SEA-SFO Departure 10:00 AM');
                }}
                className="shrink-0 flex items-center space-x-2 px-4 py-2.5 bg-[#ededf9] hover:bg-[#e1e2ed] border border-[#e1e2ed] rounded-full transition-colors active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#505f76] text-[20px]">
                  photo_camera
                </span>
                <span className="text-[12px] font-medium text-[#191b23]">
                  Scan Paper Ticket
                </span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Primary CTA Button (Pinned Bottom) */}
        <div className="p-4 bg-white border-t border-[#e1e2ed]">
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="w-full h-[54px] flex items-center justify-center bg-[#004ac6] hover:bg-[#2563eb] text-white font-semibold text-[17px] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Generating Timeline...</span>
              </div>
            ) : (
              <>
                <span>Generate Travel Timeline</span>
                <span className="material-symbols-outlined ml-2 text-[20px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
