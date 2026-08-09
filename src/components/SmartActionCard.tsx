import React, { useState } from 'react';
import { SmartTip } from '../types';

interface SmartActionCardProps {
  smartTip: SmartTip;
}

export const SmartActionCard: React.FC<SmartActionCardProps> = ({ smartTip }) => {
  const [activeModal, setActiveModal] = useState<'uber' | 'tsa' | 'transit' | null>(null);

  return (
    <>
      <section className="bg-[#004ac6] text-white rounded-xl p-4 shadow-lg relative overflow-hidden transition-all hover:shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] transform translate-x-4 -translate-y-4">
            directions_car
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined bg-white/20 p-2 rounded-full shrink-0">
              tips_and_updates
            </span>
            <div>
              <h3 className="text-[22px] font-semibold m-0 mb-1 leading-snug">
                {smartTip.title}
              </h3>
              <p className="text-[14px] text-white/90 m-0 leading-relaxed">
                {smartTip.text}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-1">
            <button
              onClick={() => setActiveModal('uber')}
              className="bg-white/10 hover:bg-white/25 active:bg-white/30 transition-colors rounded-lg py-2 px-2.5 flex flex-col items-center justify-center text-center gap-1 border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">local_taxi</span>
              <span className="text-[12px] font-medium block leading-tight">
                Uber
                <br />
                <span className="opacity-80 text-[11px]">{smartTip.uberCost}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveModal('tsa')}
              className="bg-white/10 hover:bg-white/25 active:bg-white/30 transition-colors rounded-lg py-2 px-2.5 flex flex-col items-center justify-center text-center gap-1 border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">security</span>
              <span className="text-[12px] font-medium block leading-tight">
                TSA Pre
                <br />
                <span className="opacity-80 text-[11px]">{smartTip.tsaTime}</span>
              </span>
            </button>

            <button
              onClick={() => setActiveModal('transit')}
              className="bg-white/10 hover:bg-white/25 active:bg-white/30 transition-colors rounded-lg py-2 px-2.5 flex flex-col items-center justify-center text-center gap-1 border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">train</span>
              <span className="text-[12px] font-medium block leading-tight">
                Transit
                <br />
                <span className="opacity-80 text-[11px]">{smartTip.transitTime}</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Transit/Rides Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 glass-overlay z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e1e2ed] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3f3fe] hover:bg-[#e1e2ed] flex items-center justify-center text-[#434655]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {activeModal === 'uber' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#004ac6]">
                  <span className="material-symbols-outlined text-2xl">local_taxi</span>
                  <h4 className="text-lg font-bold">Uber & Lyft Ride Estimate</h4>
                </div>
                <p className="text-sm text-[#434655]">
                  Current traffic to SFO Terminal 2 is normal. Pickup ETA: 4 mins.
                </p>
                <div className="bg-[#f3f3fe] p-3 rounded-xl space-y-2 border border-[#e1e2ed]">
                  <div className="flex justify-between text-sm font-medium">
                    <span>UberX (28 min)</span>
                    <span className="font-bold text-[#004ac6]">$42.50</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Lyft Standard (30 min)</span>
                    <span className="font-bold text-[#004ac6]">$39.80</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Uber Black (26 min)</span>
                    <span className="font-bold text-[#004ac6]">$78.00</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Opening Uber App with destination prefilled: SFO Terminal 2')}
                  className="w-full py-3 bg-[#004ac6] text-white rounded-full font-semibold text-sm hover:bg-[#2563eb] transition-colors"
                >
                  Request Ride to SFO
                </button>
              </div>
            )}

            {activeModal === 'tsa' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#004ac6]">
                  <span className="material-symbols-outlined text-2xl">security</span>
                  <h4 className="text-lg font-bold">SFO Security Checkpoint</h4>
                </div>
                <p className="text-sm text-[#434655]">
                  Real-time wait times for SFO Terminal 2 Security:
                </p>
                <div className="bg-[#f3f3fe] p-3 rounded-xl space-y-2 border border-[#e1e2ed]">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-[#004ac6]">TSA PreCheck</span>
                    <span className="font-bold text-emerald-600">8 mins wait</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">CLEAR Lane</span>
                    <span className="font-bold text-emerald-600">3 mins wait</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Standard Security</span>
                    <span className="font-bold text-amber-600">22 mins wait</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-[#ededf9] text-[#191b23] rounded-full font-medium text-sm hover:bg-[#e1e2ed]"
                >
                  Got It
                </button>
              </div>
            )}

            {activeModal === 'transit' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#004ac6]">
                  <span className="material-symbols-outlined text-2xl">train</span>
                  <h4 className="text-lg font-bold">Public Transit Route</h4>
                </div>
                <p className="text-sm text-[#434655]">
                  BART Yellow Line direct connection to SFO Airport Station:
                </p>
                <div className="bg-[#f3f3fe] p-3 rounded-xl space-y-2 border border-[#e1e2ed] text-sm">
                  <div className="flex justify-between">
                    <span>Next Departure</span>
                    <span className="font-bold">07:22 AM (in 7 mins)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Travel Time</span>
                    <span className="font-bold">45 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fare</span>
                    <span className="font-bold">$10.15 (Clipper)</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-[#ededf9] text-[#191b23] rounded-full font-medium text-sm hover:bg-[#e1e2ed]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
