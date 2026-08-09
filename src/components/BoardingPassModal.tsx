import React from 'react';
import { TripData } from '../types';

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripData: TripData;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  tripData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 glass-overlay z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#e1e2ed] relative overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f3f3fe] hover:bg-[#e1e2ed] flex items-center justify-center text-[#434655] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#e1e2ed] pb-4 mb-4">
          <div>
            <span className="text-xs font-bold text-[#004ac6] uppercase tracking-wider block">
              {tripData.airline}
            </span>
            <h3 className="text-xl font-bold text-[#191b23]">Boarding Pass</h3>
          </div>
          <div className="bg-[#10b981]/10 text-[#10b981] px-2.5 py-1 rounded-full text-xs font-bold">
            TSA PreCheck
          </div>
        </div>

        {/* Origin & Destination */}
        <div className="flex justify-between items-center mb-6 px-2">
          <div>
            <div className="text-3xl font-extrabold text-[#191b23]">
              {tripData.origin.code}
            </div>
            <div className="text-xs text-[#505f76] truncate max-w-[100px]">
              {tripData.origin.name}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[#004ac6] text-2xl">
              flight
            </span>
            <span className="text-[10px] text-[#737686] font-semibold mt-1">
              {tripData.flightNumber}
            </span>
          </div>

          <div className="text-right">
            <div className="text-3xl font-extrabold text-[#191b23]">
              {tripData.destination.code}
            </div>
            <div className="text-xs text-[#505f76] truncate max-w-[100px]">
              {tripData.destination.name}
            </div>
          </div>
        </div>

        {/* Key Flight Meta Grid */}
        <div className="grid grid-cols-3 gap-3 bg-[#f3f3fe] p-3 rounded-2xl border border-[#e1e2ed] mb-6 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              GATE
            </span>
            <span className="text-base font-extrabold text-[#004ac6]">
              {tripData.gate}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              SEAT
            </span>
            <span className="text-base font-extrabold text-[#191b23]">
              {tripData.seat || '12A'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              GROUP
            </span>
            <span className="text-base font-extrabold text-[#191b23]">
              {tripData.boardingGroup || 'Group 2'}
            </span>
          </div>
        </div>

        {/* QR Code Graphic */}
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border-2 border-dashed border-[#c3c6d7] mb-6">
          <div className="w-40 h-40 bg-gray-900 p-2 rounded-xl flex items-center justify-center">
            {/* High precision SVG QR Code representation */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-white fill-current"
            >
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Corner 1 */}
              <rect x="5" y="5" width="25" height="25" fill="black" />
              <rect x="9" y="9" width="17" height="17" fill="white" />
              <rect x="13" y="13" width="9" height="9" fill="black" />
              {/* Corner 2 */}
              <rect x="70" y="5" width="25" height="25" fill="black" />
              <rect x="74" y="9" width="17" height="17" fill="white" />
              <rect x="78" y="13" width="9" height="9" fill="black" />
              {/* Corner 3 */}
              <rect x="5" y="70" width="25" height="25" fill="black" />
              <rect x="9" y="74" width="17" height="17" fill="white" />
              <rect x="13" y="78" width="9" height="9" fill="black" />
              {/* Random QR Pattern Simulation */}
              <rect x="35" y="10" width="8" height="8" fill="black" />
              <rect x="48" y="10" width="12" height="8" fill="black" />
              <rect x="35" y="24" width="25" height="6" fill="black" />
              <rect x="10" y="35" width="8" height="20" fill="black" />
              <rect x="25" y="40" width="15" height="15" fill="black" />
              <rect x="45" y="35" width="15" height="15" fill="black" />
              <rect x="65" y="35" width="25" height="8" fill="black" />
              <rect x="70" y="48" width="20" height="15" fill="black" />
              <rect x="35" y="60" width="12" height="12" fill="black" />
              <rect x="52" y="60" width="28" height="8" fill="black" />
              <rect x="35" y="75" width="25" height="20" fill="black" />
              <rect x="65" y="75" width="15" height="15" fill="black" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-[#737686] mt-2 tracking-widest">
            {tripData.flightNumber.replace(/\s+/g, '')}-20260812-12A
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            alert('Boarding Pass saved to Wallet!');
            onClose();
          }}
          className="w-full py-3 bg-[#004ac6] text-white rounded-full font-semibold text-sm hover:bg-[#2563eb] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">
            add_to_home_screen
          </span>
          Save to Apple / Google Wallet
        </button>
      </div>
    </div>
  );
};
