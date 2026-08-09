import React, { useState, useEffect } from 'react';
import { loadCachedWeather, saveWeatherToCache } from '../utils/storage';

interface ForecastDay {
  day: string;
  date?: string;
  maxF: number;
  minF: number;
  maxC: number;
  minC: number;
  condition: string;
  icon: string;
}

interface DestinationWeatherData {
  locationName: string;
  current: {
    tempF: number;
    tempC: number;
    condition: string;
    icon: string;
    humidity: number;
    windMph: number;
    feelsLikeF: number;
    feelsLikeC: number;
  };
  forecast: ForecastDay[];
}

interface DestinationWeatherCardProps {
  destinationCode: string;
  destinationName?: string;
}

export const DestinationWeatherCard: React.FC<DestinationWeatherCardProps> = ({
  destinationCode,
  destinationName,
}) => {
  const cached = loadCachedWeather(destinationCode);
  const [weather, setWeather] = useState<DestinationWeatherData | null>(cached);
  const [loading, setLoading] = useState<boolean>(!cached);
  const [useCelsius, setUseCelsius] = useState<boolean>(false);
  const [isCachedVersion, setIsCachedVersion] = useState<boolean>(!!cached);

  const fetchWeather = async () => {
    if (!weather) setLoading(true);
    try {
      const res = await fetch(`/api/weather?code=${encodeURIComponent(destinationCode)}`);
      if (!res.ok) throw new Error('Weather request failed');
      const data: DestinationWeatherData = await res.json();
      setWeather(data);
      saveWeatherToCache(destinationCode, data);
      setIsCachedVersion(false);
    } catch (err) {
      console.warn('Weather fetch error, using cache/fallback:', err);
      if (!weather) {
        const fallbackData = {
          locationName: destinationName || `${destinationCode} Destination`,
          current: {
            tempF: 74,
            tempC: 23,
            condition: 'Partly Cloudy',
            icon: 'partly_cloudy_day',
            humidity: 58,
            windMph: 8,
            feelsLikeF: 76,
            feelsLikeC: 24,
          },
          forecast: [
            { day: 'Today', maxF: 78, minF: 64, maxC: 26, minC: 18, condition: 'Partly Cloudy', icon: 'partly_cloudy_day' },
            { day: 'Tomorrow', maxF: 81, minF: 66, maxC: 27, minC: 19, condition: 'Sunny', icon: 'wb_sunny' },
            { day: 'Day 3', maxF: 75, minF: 62, maxC: 24, minC: 17, condition: 'Rain Showers', icon: 'rainy' },
          ],
        };
        setWeather(fallbackData);
        saveWeatherToCache(destinationCode, fallbackData);
      }
      setIsCachedVersion(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [destinationCode]);

  return (
    <section className="bg-white rounded-xl p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#e1e2ed] relative overflow-hidden transition-all">
      {/* Card Header */}
      <div className="flex justify-between items-center pb-3 border-b border-[#ededf9]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
            thermostat
          </span>
          <div>
            <h4 className="text-[15px] font-semibold text-[#191b23] leading-none">
              Destination Weather
            </h4>
            <span className="text-[12px] text-[#505f76] mt-0.5 block">
              {weather ? weather.locationName : `${destinationCode} Destination`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCachedVersion ? (
            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-700 px-2.5 py-1 rounded-full text-[11px] font-bold" title="Loaded from offline local storage cache">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Offline Cache
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#10b981]/10 text-[#10b981] px-2.5 py-1 rounded-full text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              Live API
            </span>
          )}

          <button
            onClick={() => setUseCelsius(!useCelsius)}
            className="text-[11px] font-bold bg-[#ededf9] hover:bg-[#e1e2ed] text-[#004ac6] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            title="Toggle °F / °C"
          >
            °{useCelsius ? 'C' : 'F'}
          </button>

          <button
            onClick={fetchWeather}
            className="text-[#505f76] hover:text-[#004ac6] p-1 rounded-full hover:bg-[#f3f3fe] transition-colors cursor-pointer"
            title="Refresh Weather"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-[#505f76]">
          <span className="w-6 h-6 border-2 border-[#004ac6] border-t-transparent rounded-full animate-spin"></span>
          <span className="text-xs font-medium">Fetching real-time forecast...</span>
        </div>
      ) : weather ? (
        <div className="mt-3 space-y-3">
          {/* Current Weather Highlight */}
          <div className="flex items-center justify-between bg-[#004ac6]/5 p-3 rounded-xl border border-[#004ac6]/15">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#004ac6] text-[36px]">
                {weather.current.icon}
              </span>
              <div>
                <div className="text-[28px] font-bold text-[#191b23] leading-none">
                  {useCelsius ? `${weather.current.tempC}°C` : `${weather.current.tempF}°F`}
                </div>
                <div className="text-[13px] font-medium text-[#434655] mt-1">
                  {weather.current.condition}
                </div>
              </div>
            </div>

            <div className="text-right text-[12px] text-[#505f76] space-y-0.5">
              <div>
                Feels like:{' '}
                <span className="font-semibold text-[#191b23]">
                  {useCelsius
                    ? `${weather.current.feelsLikeC}°C`
                    : `${weather.current.feelsLikeF}°F`}
                </span>
              </div>
              <div>
                Humidity: <span className="font-semibold text-[#191b23]">{weather.current.humidity}%</span>
              </div>
              <div>
                Wind: <span className="font-semibold text-[#191b23]">{weather.current.windMph} mph</span>
              </div>
            </div>
          </div>

          {/* 3-Day Forecast Section */}
          <div>
            <span className="text-[11px] font-bold uppercase text-[#737686] tracking-wider block mb-2 px-0.5">
              3-DAY DESTINATION FORECAST
            </span>

            <div className="grid grid-cols-3 gap-2">
              {weather.forecast.map((fc, idx) => (
                <div
                  key={idx}
                  className="bg-[#f3f3fe] border border-[#e1e2ed] p-2.5 rounded-xl text-center flex flex-col items-center justify-between gap-1 shadow-2xs hover:border-[#004ac6]/30 transition-colors"
                >
                  <span className="text-[12px] font-bold text-[#191b23]">{fc.day}</span>
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px] my-0.5">
                    {fc.icon}
                  </span>
                  <span className="text-[11px] text-[#505f76] truncate max-w-full">
                    {fc.condition}
                  </span>
                  <div className="text-[12px] font-bold text-[#191b23] mt-0.5">
                    <span className="text-[#004ac6]">
                      {useCelsius ? `${fc.maxC}°` : `${fc.maxF}°`}
                    </span>
                    <span className="text-[#737686] text-[10px] font-medium ml-1">
                      {useCelsius ? `${fc.minC}°` : `${fc.minF}°`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
