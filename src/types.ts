export type TabType = 'timeline' | 'wallet' | 'alerts' | 'settings';

export interface SmartTip {
  title: string;
  text: string;
  uberCost: string;
  tsaTime: string;
  transitTime: string;
}

export interface WeatherInfo {
  location: string;
  temp: string;
  condition: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'home' | 'airport' | 'weather' | 'baggage' | 'boarding' | 'flight' | 'arrival' | 'custom';
  icon: string;
  highlight?: boolean;
  badgeText?: string;
  hasBoardingPassButton?: boolean;
}

export interface TripData {
  passengerName: string;
  flightNumber: string;
  airline: string;
  status: string;
  origin: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
  departureTime: string;
  leaveInMinutes: number;
  terminal: string;
  gate: string;
  seat?: string;
  boardingGroup?: string;
  smartTip: SmartTip;
  weather: WeatherInfo;
  itinerary: ItineraryItem[];
}

export interface AlertNotification {
  id: string;
  time: string;
  title: string;
  message: string;
  type: 'urgent' | 'info' | 'success';
  read: boolean;
}
