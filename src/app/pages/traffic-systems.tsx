import { useState } from "react";
import { TabNavigation } from "../components/navigation/tab-navigation";
import { Car, MapPin, Bus, AlertTriangle } from "lucide-react";

export function TrafficSystems() {
  const [activeTab, setActiveTab] = useState('live-traffic');

  const tabs = [
    { id: 'live-traffic', label: 'Live Traffic', icon: Car },
    { id: 'congestion', label: 'Congestion Heatmap', icon: MapPin },
    { id: 'public-transport', label: 'Public Transport', icon: Bus },
    { id: 'accidents', label: 'Accident Analytics', icon: AlertTriangle },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Traffic Systems
        </h1>
        <p style={{ color: 'var(--dt-text-secondary)' }}>
          Real-time traffic monitoring and analysis
        </p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'live-traffic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                    Average Speed
                  </span>
                  <Car className="w-5 h-5" style={{ color: 'var(--dt-cyan)' }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
                  32 mph
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--dt-status-success)' }}>
                  ↑ 8% from yesterday
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                    Congested Routes
                  </span>
                  <AlertTriangle className="w-5 h-5" style={{ color: 'var(--dt-amber)' }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
                  14
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--dt-status-warning)' }}>
                  ↑ 2 from last hour
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                    Active Buses
                  </span>
                  <Bus className="w-5 h-5" style={{ color: 'var(--dt-lime)' }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
                  287
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--dt-text-secondary)' }}>
                  98% on schedule
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
              <div className="text-center">
                <Car className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--dt-cyan)' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                  Live Traffic Map
                </h3>
                <p style={{ color: 'var(--dt-text-secondary)' }}>
                  Real-time traffic flow visualization
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'congestion' && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--dt-amber)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                Congestion Heatmap
              </h3>
              <p style={{ color: 'var(--dt-text-secondary)' }}>
                Traffic density and congestion hotspots
              </p>
            </div>
          </div>
        )}

        {activeTab === 'public-transport' && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <Bus className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--dt-lime)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                Public Transport
              </h3>
              <p style={{ color: 'var(--dt-text-secondary)' }}>
                Real-time bus and transit tracking
              </p>
            </div>
          </div>
        )}

        {activeTab === 'accidents' && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--dt-status-error)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                Accident Analytics
              </h3>
              <p style={{ color: 'var(--dt-text-secondary)' }}>
                Historical accident data and predictions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
