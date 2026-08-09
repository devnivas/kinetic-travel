import React from 'react';
import { ItineraryItem } from '../types';
import { DestinationWeatherCard } from './DestinationWeatherCard';
import { FlightProgressCard } from './FlightProgressCard';

interface TimelineSectionProps {
  itinerary: ItineraryItem[];
  originCode: string;
  destinationCode: string;
  destinationName?: string;
  flightNumber: string;
  airline: string;
  onOpenBoardingPass: () => void;
  onItemClick?: (item: ItineraryItem) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  itinerary,
  originCode,
  destinationCode,
  destinationName,
  flightNumber,
  airline,
  onOpenBoardingPass,
  onItemClick,
}) => {
  return (
    <section className="mt-4 pb-12 relative">
      <h3 className="text-[20px] font-semibold text-[#191b23] mb-6">
        Today's Itinerary
      </h3>

      <div className="relative">
        {/* Vertical Stepper Line */}
        <div className="absolute left-4 top-4 bottom-12 w-[2px] bg-[#e1e2ed] z-0"></div>

        <div className="flex flex-col gap-4">
          {itinerary.map((item) => {
            const isHighlight = item.highlight;
            const isWeather = item.type === 'weather';
            const isFlight = item.type === 'flight';

            return (
              <div
                key={item.id}
                onClick={() => onItemClick?.(item)}
                className={`relative z-10 flex gap-4 ${
                  item.type === 'baggage' || item.type === 'boarding'
                    ? 'opacity-95'
                    : ''
                }`}
              >
                {/* Node Circle */}
                {isHighlight ? (
                  <div className="w-8 h-8 rounded-full bg-[#faf8ff] border-2 border-[#004ac6] flex items-center justify-center shrink-0 mt-1 ring-4 ring-[#faf8ff] z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6] animate-pulse"></div>
                  </div>
                ) : item.type === 'home' ? (
                  <div className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center shrink-0 shadow-xs mt-1 ring-4 ring-[#faf8ff]">
                    <span className="material-symbols-outlined text-white text-sm">
                      {item.icon || 'home'}
                    </span>
                  </div>
                ) : isFlight ? (
                  <div className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center shrink-0 shadow-xs mt-1 ring-4 ring-[#faf8ff]">
                    <span className="material-symbols-outlined text-white text-sm">
                      flight_takeoff
                    </span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#e1e2ed] flex items-center justify-center shrink-0 mt-1 ring-4 ring-[#faf8ff]">
                    <span className="material-symbols-outlined text-[#434655] text-sm">
                      {item.icon || 'routine'}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                {isFlight ? (
                  <div className="flex-1">
                    <FlightProgressCard
                      originCode={originCode}
                      destinationCode={destinationCode}
                      flightNumber={flightNumber}
                      airline={airline}
                      initialProgress={65}
                    />
                  </div>
                ) : isWeather ? (
                  <div className="flex-1 bg-white p-3 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e2ed] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#505f76]">
                        {item.icon || 'partly_cloudy_day'}
                      </span>
                      <span className="text-[14px] text-[#191b23] font-medium">
                        {item.description}
                      </span>
                    </div>
                  </div>
                ) : isHighlight ? (
                  <div className="flex-1 bg-[#004ac6]/5 p-4 rounded-xl border border-[#004ac6]/20 shadow-xs flex flex-col gap-1 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#004ac6] rounded-l-xl"></div>
                    <span className="text-[12px] font-bold text-[#004ac6]">
                      {item.time}
                    </span>
                    <h4 className="text-[18px] font-semibold text-[#191b23] m-0">
                      {item.title}
                    </h4>

                    {item.badgeText && (
                      <div className="mt-2 inline-flex items-center gap-1.5 bg-[#004ac6]/10 text-[#004ac6] px-3 py-1.5 rounded-full w-fit">
                        <span className="material-symbols-outlined text-[16px]">
                          meeting_room
                        </span>
                        <span className="text-[12px] font-bold">
                          {item.badgeText}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e2ed] flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-[#505f76]">
                      {item.time}
                    </span>
                    <h4 className="text-[18px] font-semibold text-[#191b23] m-0">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-[#434655] m-0">
                      {item.description}
                    </p>

                    {item.hasBoardingPassButton && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBoardingPass();
                        }}
                        className="mt-2 bg-[#e1e2ed] hover:bg-[#e1e2ed]/80 active:bg-[#c3c6d7] text-[#191b23] px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 w-full cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          qr_code_2
                        </span>
                        View Boarding Pass
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Destination Weather Forecast Node */}
          <div className="relative z-10 flex gap-4 mt-2">
            <div className="w-8 h-8 rounded-full bg-[#004ac6]/10 text-[#004ac6] border border-[#004ac6]/30 flex items-center justify-center shrink-0 mt-1 ring-4 ring-[#faf8ff]">
              <span className="material-symbols-outlined text-sm">
                thermostat
              </span>
            </div>
            <div className="flex-1">
              <DestinationWeatherCard
                destinationCode={destinationCode}
                destinationName={destinationName}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

