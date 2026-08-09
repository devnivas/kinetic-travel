import React from 'react';

interface HeaderProps {
  passengerName: string;
  flightNumber: string;
  status: string;
  onOpenAddTrip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  passengerName,
  flightNumber,
  status,
  onOpenAddTrip,
}) => {
  const profileImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCE7eZ-RF6JAx9CXDszUZNJArutzSQlxryjBc5VR7Lm1kBOWMIE1lTj5JpGjLl4rAGWOdgHlFcoQs0hlEUPSuP0LJsYljDgHBXr67XlDQ4t4s0WOldssHh60ItbCiK_CGZGUuheSkv0EmYUYjEqoNayf81QBq6ZbqaGFgo4qqksUeWG6w7WItt0_rZv81pRXeEJ33Du0D0KDfW7IsBupkS70YupZhvgAI6dmhCeIQrKGsBp1H-2kU18bg';

  return (
    <header className="w-full sticky top-0 z-40 bg-[#faf8ff]/80 backdrop-blur-md transition-all">
      <div className="flex justify-between items-center px-4 py-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddTrip}
            title="View or Change Profile / Add Trip"
            className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#e1e2ed] hover:ring-2 hover:ring-[#004ac6] transition-all cursor-pointer relative group"
          >
            <img
              className="w-full h-full object-cover"
              src={profileImageUrl}
              alt={`Portrait of ${passengerName}`}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xs">add</span>
            </div>
          </button>
          <div>
            <h1 className="text-[20px] font-semibold text-[#191b23] m-0 p-0 leading-tight">
              Good Morning, {passengerName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#10b981]/10 text-[#10b981] px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Flight {flightNumber} • {status}
          </div>

          <button
            onClick={onOpenAddTrip}
            className="w-8 h-8 rounded-full bg-[#ededf9] hover:bg-[#e1e2ed] flex items-center justify-center text-[#434655] transition-colors cursor-pointer"
            title="Add Trip Details"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>
    </header>
  );
};
