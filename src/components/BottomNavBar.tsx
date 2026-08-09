import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadAlertsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  unreadAlertsCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 pb-6 pt-2.5 bg-white shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] rounded-t-2xl border-t border-[#e1e2ed] max-w-2xl mx-auto left-0 right-0">
      
      {/* Timeline Tab */}
      <button
        onClick={() => onTabChange('timeline')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'timeline'
            ? 'bg-[#d0e1fb] text-[#54647a] rounded-full px-5 py-1 font-bold'
            : 'text-[#434655] py-1.5 px-3 hover:bg-[#ededf9] rounded-xl font-medium'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">event_note</span>
        <span className="text-[12px] mt-0.5">Timeline</span>
      </button>

      {/* Wallet Tab */}
      <button
        onClick={() => onTabChange('wallet')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'wallet'
            ? 'bg-[#d0e1fb] text-[#54647a] rounded-full px-5 py-1 font-bold'
            : 'text-[#434655] py-1.5 px-3 hover:bg-[#ededf9] rounded-xl font-medium'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">
          account_balance_wallet
        </span>
        <span className="text-[12px] mt-0.5">Wallet</span>
      </button>

      {/* Alerts Tab */}
      <button
        onClick={() => onTabChange('alerts')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative cursor-pointer ${
          activeTab === 'alerts'
            ? 'bg-[#d0e1fb] text-[#54647a] rounded-full px-5 py-1 font-bold'
            : 'text-[#434655] py-1.5 px-3 hover:bg-[#ededf9] rounded-xl font-medium'
        }`}
      >
        <div className="relative">
          <span className="material-symbols-outlined text-[22px]">
            notifications_active
          </span>
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
          )}
        </div>
        <span className="text-[12px] mt-0.5">Alerts</span>
      </button>

      {/* Settings Tab */}
      <button
        onClick={() => onTabChange('settings')}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
          activeTab === 'settings'
            ? 'bg-[#d0e1fb] text-[#54647a] rounded-full px-5 py-1 font-bold'
            : 'text-[#434655] py-1.5 px-3 hover:bg-[#ededf9] rounded-xl font-medium'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">settings</span>
        <span className="text-[12px] mt-0.5">Settings</span>
      </button>
    </nav>
  );
};
