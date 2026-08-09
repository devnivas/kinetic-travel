import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';

interface FlightProgressCardProps {
  originCode: string;
  destinationCode: string;
  flightNumber: string;
  airline: string;
  initialProgress?: number; // 0 to 100 percentage
}

// Sample flight altitude profile data (in minutes vs altitude in feet)
const sampleAltitudeProfile = [
  { timeMins: 0, timeLabel: '09:15 AM', altitude: 0, label: 'Takeoff' },
  { timeMins: 20, timeLabel: '09:35 AM', altitude: 18000, label: 'Climb' },
  { timeMins: 40, timeLabel: '09:55 AM', altitude: 35000, label: 'Cruising' },
  { timeMins: 120, timeLabel: '11:15 AM', altitude: 35000, label: 'Mid-Flight' },
  { timeMins: 200, timeLabel: '12:35 PM', altitude: 35000, label: 'Cruising' },
  { timeMins: 270, timeLabel: '01:45 PM', altitude: 12000, label: 'Descent' },
  { timeMins: 315, timeLabel: '02:30 PM', altitude: 0, label: 'Landing' },
];

export const FlightProgressCard: React.FC<FlightProgressCardProps> = ({
  originCode,
  destinationCode,
  flightNumber,
  airline,
  initialProgress = 65,
}) => {
  const [progress, setProgress] = useState<number>(initialProgress);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Total flight duration in minutes (e.g., 5h 15m = 315m)
  const totalDurationMins = 315;
  const currentMins = Math.round((progress / 100) * totalDurationMins);
  
  const elapsedHours = Math.floor(currentMins / 60);
  const elapsedMins = currentMins % 60;

  const remainingMins = totalDurationMins - currentMins;
  const remHours = Math.floor(remainingMins / 60);
  const remMins = remainingMins % 60;

  // Current interpolated altitude
  const currentAltitude =
    progress < 10
      ? Math.round((progress / 10) * 18000)
      : progress < 20
      ? Math.round(18000 + ((progress - 10) / 10) * 17000)
      : progress > 80
      ? Math.round((100 - progress) * 500)
      : 35000;

  // Toggle simulation step
  const handleStepProgress = () => {
    setProgress((prev) => (prev >= 95 ? 10 : prev + 10));
  };

  return (
    <section className="bg-white rounded-xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e2ed] relative overflow-hidden transition-all">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-[#ededf9]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
            flight
          </span>
          <div>
            <h4 className="text-[15px] font-semibold text-[#191b23] leading-none">
              In-Flight Progress Tracker
            </h4>
            <span className="text-[12px] text-[#505f76] mt-0.5 block">
              {airline} {flightNumber} • {originCode} to {destinationCode}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#004ac6]/10 text-[#004ac6] px-2.5 py-1 rounded-full text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] animate-pulse"></span>
            {progress}% Completed
          </span>

          <button
            onClick={handleStepProgress}
            className="text-[11px] font-bold bg-[#ededf9] hover:bg-[#e1e2ed] text-[#004ac6] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            title="Simulate Flight Step"
          >
            Simulate +10%
          </button>
        </div>
      </div>

      {/* Main Percentage Progress Visualizer */}
      <div className="mt-3 space-y-3">
        {/* Origin to Destination Track */}
        <div className="bg-[#f3f3fe] p-3 rounded-xl border border-[#e1e2ed] space-y-2">
          <div className="flex justify-between items-center text-xs text-[#434655] font-semibold">
            <span className="flex items-center gap-1">
              <span className="text-[14px] font-bold text-[#191b23]">{originCode}</span>
              <span className="text-[11px] text-[#737686]">({elapsedHours}h {elapsedMins}m flown)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[11px] text-[#737686]">({remHours}h {remMins}m remaining)</span>
              <span className="text-[14px] font-bold text-[#191b23]">{destinationCode}</span>
            </span>
          </div>

          {/* Animated Progress Bar Container */}
          <div className="relative w-full h-3 bg-[#e1e2ed] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563eb] to-[#004ac6] transition-all duration-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 animate-pulse"></div>
            </div>
          </div>

          {/* Icon Position Marker */}
          <div className="relative w-full h-5">
            <div
              className="absolute transform -translate-x-1/2 -top-1 transition-all duration-500 flex items-center gap-1 bg-[#004ac6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs"
              style={{ left: `${Math.max(5, Math.min(95, progress))}%` }}
            >
              <span className="material-symbols-outlined text-[12px] rotate-90">
                flight
              </span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white border border-[#e1e2ed] p-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              ALTITUDE
            </span>
            <span className="text-[13px] font-extrabold text-[#191b23]">
              {currentAltitude.toLocaleString()} ft
            </span>
          </div>

          <div className="bg-white border border-[#e1e2ed] p-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              GROUND SPEED
            </span>
            <span className="text-[13px] font-extrabold text-[#191b23]">
              540 mph
            </span>
          </div>

          <div className="bg-white border border-[#e1e2ed] p-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-[#737686] block">
              ETA
            </span>
            <span className="text-[13px] font-extrabold text-[#004ac6]">
              02:30 PM
            </span>
          </div>
        </div>

        {/* Recharts Chart: Altitude Profile */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-1.5 px-0.5">
            <span className="text-[11px] font-bold uppercase text-[#737686] tracking-wider">
              FLIGHT ALTITUDE PROFILE (RECHARTS)
            </span>
            <span className="text-[10px] text-[#004ac6] font-semibold">
              Cruising Level 350
            </span>
          </div>

          <div className="w-full h-[120px] bg-[#f3f3fe] p-2 rounded-xl border border-[#e1e2ed]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleAltitudeProfile} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAltitude" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004ac6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#004ac6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="timeLabel" tick={{ fontSize: 9, fill: '#737686' }} />
                <YAxis tick={{ fontSize: 9, fill: '#737686' }} domain={[0, 40000]} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 rounded-lg shadow-md border border-[#e1e2ed] text-xs">
                          <div className="font-bold text-[#191b23]">{data.timeLabel}</div>
                          <div className="text-[#004ac6] font-semibold">
                            Altitude: {data.altitude.toLocaleString()} ft
                          </div>
                          <div className="text-[10px] text-[#737686]">{data.label}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="altitude"
                  stroke="#004ac6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAltitude)"
                />
                {/* Active Progress Dot */}
                <ReferenceDot
                  x={
                    progress < 30
                      ? '09:35 AM'
                      : progress < 70
                      ? '11:15 AM'
                      : progress < 90
                      ? '01:45 PM'
                      : '02:30 PM'
                  }
                  y={currentAltitude}
                  r={5}
                  fill="#004ac6"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
