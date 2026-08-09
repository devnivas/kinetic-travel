import React from 'react';

interface HeroCardProps {
  originCode: string;
  destinationCode: string;
  airline: string;
  flightNumber: string;
  leaveInMinutes: number;
  onCardClick?: () => void;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  originCode,
  destinationCode,
  airline,
  flightNumber,
  leaveInMinutes,
  onCardClick,
}) => {
  return (
    <section
      onClick={onCardClick}
      className="bg-white rounded-xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e2ed] relative overflow-hidden group cursor-pointer transition-transform active:scale-[0.99]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#004ac6]/5 to-transparent pointer-events-none"></div>
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-[#434655] uppercase tracking-wider mb-1">
              Upcoming Departure
            </span>
            <h2 className="text-[32px] font-bold leading-tight text-[#191b23] m-0 flex items-center gap-3 tracking-tight">
              {originCode}
              <span className="material-symbols-outlined text-[#004ac6] text-[28px] transform group-hover:translate-x-1 transition-transform">
                flight_takeoff
              </span>
              {destinationCode}
            </h2>
            <span className="text-[14px] text-[#505f76] mt-1">
              {airline} {flightNumber}
            </span>
          </div>

          <div className="text-right">
            <div className="inline-block bg-[#ba1a1a]/10 text-[#ba1a1a] px-3.5 py-1.5 rounded-full mb-1">
              <span className="text-[20px] font-semibold block animate-pulse leading-none">
                {leaveInMinutes} mins
              </span>
              <span className="text-[11px] font-medium block uppercase tracking-wider opacity-90 mt-0.5">
                to leave
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
