import React, { useState } from 'react';
import { TripData } from '../types';
import { clearCache, getLastSyncedTime } from '../utils/storage';

interface SettingsViewProps {
  tripData: TripData;
  onUpdateName: (name: string) => void;
  onResetCache?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  tripData,
  onUpdateName,
  onResetCache,
}) => {
  const [lastSynced, setLastSynced] = useState<string | null>(getLastSyncedTime());
  const [clearedMessage, setClearedMessage] = useState<boolean>(false);

  const handleClearCache = () => {
    clearCache();
    setLastSynced(null);
    setClearedMessage(true);
    if (onResetCache) {
      onResetCache();
    }
    setTimeout(() => setClearedMessage(false), 3000);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[22px] font-bold text-[#191b23]">Settings & Preferences</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#e1e2ed] shadow-xs flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#e1e2ed]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE7eZ-RF6JAx9CXDszUZNJArutzSQlxryjBc5VR7Lm1kBOWMIE1lTj5JpGjLl4rAGWOdgHlFcoQs0hlEUPSuP0LJsYljDgHBXr67XlDQ4t4s0WOldssHh60ItbCiK_CGZGUuheSkv0EmYUYjEqoNayf81QBq6ZbqaGFgo4qqksUeWG6w7WItt0_rZv81pRXeEJ33Du0D0KDfW7IsBupkS70YupZhvgAI6dmhCeIQrKGsBp1H-2kU18bg"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <label className="text-[11px] font-bold uppercase text-[#737686] block">
            Traveler Name
          </label>
          <input
            type="text"
            value={tripData.passengerName}
            onChange={(e) => onUpdateName(e.target.value)}
            className="text-base font-bold text-[#191b23] border-b border-[#c3c6d7] focus:border-[#004ac6] outline-none w-full bg-transparent py-0.5"
          />
          <span className="text-xs text-[#505f76] block mt-1">
            Premier Gold • MileagePlus
          </span>
        </div>
      </div>

      {/* Offline Storage & Cache Settings */}
      <div className="bg-white rounded-2xl p-4 border border-[#e1e2ed] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#191b23] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
              offline_pin
            </span>
            OFFLINE STORAGE & LOCAL CACHE
          </h3>
          <span className="bg-[#10b981]/10 text-[#10b981] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        <p className="text-xs text-[#505f76] leading-relaxed">
          Your flight itinerary, boarding pass QR codes, seat assignments, and wallet tickets are saved locally in your browser storage so you can access them without cellular signal or airport Wi-Fi.
        </p>

        <div className="bg-[#f3f3fe] border border-[#e1e2ed] p-3 rounded-xl flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-[#191b23]">Cache Sync Status</div>
            <div className="text-[11px] text-[#737686]">
              {lastSynced
                ? `Last saved: ${new Date(lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : 'Saved locally'}
            </div>
          </div>

          <button
            onClick={handleClearCache}
            className="bg-white border border-[#c3c6d7] hover:border-red-500 hover:text-red-600 text-[#434655] px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
          >
            Reset Cache
          </button>
        </div>

        {clearedMessage && (
          <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-center">
            Local storage cache reset to default trip data.
          </div>
        )}
      </div>

      {/* Travel Preferences */}
      <div className="bg-white rounded-2xl p-4 border border-[#e1e2ed] shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#191b23] uppercase tracking-wider text-[11px]">
          TRAVEL COMPANION PREFERENCES
        </h3>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-sm font-medium text-[#191b23]">TSA PreCheck Auto-Check</div>
            <div className="text-xs text-[#737686]">Notify when security queue is under 10 min</div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#004ac6]" />
        </div>

        <div className="flex items-center justify-between py-1 border-t border-[#f3f3fe]">
          <div>
            <div className="text-sm font-medium text-[#191b23]">Flight Gate & Baggage Alerts</div>
            <div className="text-xs text-[#737686]">Instant push notifications for changes</div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#004ac6]" />
        </div>

        <div className="flex items-center justify-between py-1 border-t border-[#f3f3fe]">
          <div>
            <div className="text-sm font-medium text-[#191b23]">Rideshare Traffic Reminders</div>
            <div className="text-xs text-[#737686]">Calculates departure times with real-time traffic</div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#004ac6]" />
        </div>
      </div>
    </div>
  );
};
