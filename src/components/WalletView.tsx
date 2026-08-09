import React from 'react';
import { TripData } from '../types';

interface WalletViewProps {
  tripData: TripData;
  onOpenBoardingPass: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  tripData,
  onOpenBoardingPass,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[22px] font-bold text-[#191b23]">Digital Wallet</h2>
        <span className="text-xs font-semibold text-[#004ac6] bg-[#004ac6]/10 px-3 py-1 rounded-full">
          3 Passes Active
        </span>
      </div>

      {/* Main Boarding Pass Card */}
      <div
        onClick={onOpenBoardingPass}
        className="bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-all transform active:scale-[0.99]"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
            <span className="font-bold text-sm tracking-wide uppercase">
              {tripData.airline}
            </span>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Active
          </span>
        </div>

        <div className="flex justify-between items-baseline mb-6">
          <div>
            <div className="text-3xl font-extrabold">{tripData.origin.code}</div>
            <div className="text-xs text-white/80">{tripData.origin.name}</div>
          </div>
          <div className="text-center px-2">
            <span className="text-xs text-white/70 block">FLIGHT</span>
            <span className="font-bold text-sm">{tripData.flightNumber}</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">{tripData.destination.code}</div>
            <div className="text-xs text-white/80">{tripData.destination.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-white/10 p-3 rounded-xl border border-white/20 text-center text-xs">
          <div>
            <span className="opacity-75 block">GATE</span>
            <span className="font-bold text-sm">{tripData.gate}</span>
          </div>
          <div>
            <span className="opacity-75 block">SEAT</span>
            <span className="font-bold text-sm">{tripData.seat || '12A'}</span>
          </div>
          <div>
            <span className="opacity-75 block">BOARDING</span>
            <span className="font-bold text-sm">08:45 AM</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
          <span className="font-semibold">{tripData.passengerName}</span>
          <span className="flex items-center gap-1 text-white/90 font-bold">
            Tap to View Code <span className="material-symbols-outlined text-sm">qr_code_2</span>
          </span>
        </div>
      </div>

      {/* TSA PreCheck Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#e1e2ed] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl">verified_user</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#191b23]">TSA PreCheck Status</h4>
            <p className="text-xs text-[#505f76]">Known Traveler #: TT982340192</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Verified
        </span>
      </div>

      {/* Loyalty Pass */}
      <div className="bg-white rounded-2xl p-4 border border-[#e1e2ed] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl">stars</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#191b23]">United MileagePlus Premier</h4>
            <p className="text-xs text-[#505f76]">Premier Gold • 84,210 Miles</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-[#004ac6]">View</span>
      </div>
    </div>
  );
};
