import React from 'react';
import { AlertNotification } from '../types';

interface AlertsViewProps {
  alerts: AlertNotification[];
  onMarkRead: (id: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ alerts, onMarkRead }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[22px] font-bold text-[#191b23]">Flight Alerts</h2>
        <span className="text-xs font-semibold text-[#004ac6] bg-[#004ac6]/10 px-3 py-1 rounded-full">
          Real-time Sync
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onMarkRead(alert.id)}
            className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-xs ${
              alert.read ? 'border-[#e1e2ed] opacity-80' : 'border-[#004ac6]/40 ring-1 ring-[#004ac6]/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.type === 'urgent'
                      ? 'bg-red-100 text-red-600'
                      : alert.type === 'success'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-[#004ac6]/10 text-[#004ac6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {alert.type === 'urgent'
                      ? 'warning'
                      : alert.type === 'success'
                      ? 'check_circle'
                      : 'notifications_active'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#191b23]">
                      {alert.title}
                    </h4>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-[#004ac6]"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#434655] mt-1 leading-relaxed">
                    {alert.message}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#737686] whitespace-nowrap">
                {alert.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
