import { useState } from "react";
import { TabNavigation } from "../components/navigation/tab-navigation";
import { Leaf, Wind, Cloud, Droplets, MapPin, TrendingUp, TrendingDown, AlertTriangle, ThermometerSun, Waves, Volume2 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function EnvironmentalData() {
  const [activeTab, setActiveTab] = useState('air-quality');

  const tabs = [
    { id: 'air-quality', label: 'Air Quality', icon: Wind },
    { id: 'noise', label: 'Noise Monitoring', icon: Volume2 },
    { id: 'weather', label: 'Weather & Heatmap', icon: Cloud },
    { id: 'water', label: 'Water Quality', icon: Droplets },
  ];

  // Air Quality Data
  const aqiTrend = [
    { time: '00:00', aqi: 45, pm25: 12, pm10: 28 },
    { time: '04:00', aqi: 38, pm25: 10, pm10: 24 },
    { time: '08:00', aqi: 62, pm25: 18, pm10: 38 },
    { time: '12:00', aqi: 58, pm25: 16, pm10: 35 },
    { time: '16:00', aqi: 72, pm25: 22, pm10: 45 },
    { time: '20:00', aqi: 55, pm25: 15, pm10: 32 },
  ];

  const airQualityLocations = [
    { location: 'Andheri West', aqi: 68, status: 'moderate', pm25: 20, pm10: 42 },
    { location: 'Bandra East', aqi: 45, status: 'good', pm25: 12, pm10: 28 },
    { location: 'Worli', aqi: 82, status: 'poor', pm25: 28, pm10: 58 },
    { location: 'Powai', aqi: 52, status: 'moderate', pm25: 14, pm10: 32 },
  ];

  // Noise Data
  const noiseLevels = [
    { time: '06:00', residential: 45, commercial: 62, industrial: 78 },
    { time: '09:00', residential: 58, commercial: 72, industrial: 85 },
    { time: '12:00', residential: 52, commercial: 68, industrial: 82 },
    { time: '15:00', residential: 55, commercial: 70, industrial: 84 },
    { time: '18:00', residential: 62, commercial: 78, industrial: 88 },
    { time: '21:00', residential: 48, commercial: 58, industrial: 72 },
  ];

  const noiseZones = [
    { zone: 'Residential Areas', current: 52, limit: 55, status: 'good' },
    { zone: 'Commercial Districts', current: 68, limit: 65, status: 'moderate' },
    { zone: 'Industrial Zones', current: 82, limit: 75, status: 'high' },
    { zone: 'Silence Zones', current: 42, limit: 50, status: 'good' },
  ];

  // Weather Data
  const weatherForecast = [
    { day: 'Mon', temp: 32, humidity: 68, rainfall: 0 },
    { day: 'Tue', temp: 31, humidity: 72, rainfall: 2 },
    { day: 'Wed', temp: 30, humidity: 78, rainfall: 8 },
    { day: 'Thu', temp: 29, humidity: 82, rainfall: 15 },
    { day: 'Fri', temp: 28, humidity: 85, rainfall: 12 },
    { day: 'Sat', temp: 30, humidity: 75, rainfall: 5 },
    { day: 'Sun', temp: 31, humidity: 70, rainfall: 0 },
  ];

  const heatmapData = [
    { area: 'Andheri', temp: 34, heatIndex: 'high' },
    { area: 'Bandra', temp: 32, heatIndex: 'moderate' },
    { area: 'Worli', temp: 31, heatIndex: 'moderate' },
    { area: 'Powai', temp: 30, heatIndex: 'moderate' },
    { area: 'Navi Mumbai', temp: 35, heatIndex: 'high' },
  ];

  // Water Quality Data
  const waterQualityTrend = [
    { time: 'Week 1', ph: 7.2, turbidity: 2.1, tds: 145 },
    { time: 'Week 2', ph: 7.4, turbidity: 1.8, tds: 138 },
    { time: 'Week 3', ph: 7.1, turbidity: 2.3, tds: 152 },
    { time: 'Week 4', ph: 7.3, turbidity: 1.9, tds: 142 },
  ];

  const waterSources = [
    { source: 'Powai Lake', ph: 7.2, turbidity: 1.8, tds: 142, status: 'excellent' },
    { source: 'Vihar Lake', ph: 7.4, turbidity: 2.1, tds: 138, status: 'excellent' },
    { source: 'Tulsi Lake', ph: 7.1, turbidity: 2.5, tds: 156, status: 'good' },
    { source: 'Treatment Plant A', ph: 7.3, turbidity: 1.5, tds: 128, status: 'excellent' },
  ];

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { label: 'Good', color: 'var(--dt-status-success)', bg: 'rgba(0, 255, 136, 0.1)' };
    if (aqi <= 100) return { label: 'Moderate', color: 'var(--dt-amber)', bg: 'rgba(255, 184, 0, 0.1)' };
    return { label: 'Poor', color: 'var(--dt-status-error)', bg: 'rgba(255, 51, 102, 0.1)' };
  };

  const getNoiseStatus = (current: number, limit: number) => {
    if (current < limit) return { label: 'Good', color: 'var(--dt-status-success)' };
    if (current < limit + 10) return { label: 'Moderate', color: 'var(--dt-amber)' };
    return { label: 'High', color: 'var(--dt-status-error)' };
  };

  const getWaterStatus = (status: string) => {
    const configs = {
      excellent: { color: 'var(--dt-status-success)', bg: 'rgba(0, 255, 136, 0.1)' },
      good: { color: 'var(--dt-lime)', bg: 'rgba(180, 255, 57, 0.1)' },
      moderate: { color: 'var(--dt-amber)', bg: 'rgba(255, 184, 0, 0.1)' },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Environmental Data
        </h1>
        <p style={{ color: 'var(--dt-text-secondary)' }}>
          Monitor environmental metrics across the city
        </p>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="flex-1 p-6 overflow-auto">
        {/* Air Quality Tab */}
        {activeTab === 'air-quality' && (
          <div className="space-y-6">
            {/* AQI Overview */}
            <div className="grid grid-cols-4 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Wind className="w-6 h-6" style={{ color: 'var(--dt-lime)' }} />
                  <div
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(0, 255, 136, 0.1)',
                      color: 'var(--dt-status-success)',
                    }}
                  >
                    Good
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  52
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Overall AQI
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Leaf className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                  <TrendingDown className="w-4 h-4" style={{ color: 'var(--dt-status-success)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  14
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  PM 2.5 (μg/m³)
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Wind className="w-6 h-6" style={{ color: 'var(--dt-amber)' }} />
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--dt-status-warning)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  32
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  PM 10 (μg/m³)
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-6 h-6" style={{ color: 'var(--dt-magenta)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  24
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Monitoring Stations
                </div>
              </div>
            </div>

            {/* AQI Trend Chart */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Air Quality Index - 24 Hour Trend
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={aqiTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="time" stroke="var(--dt-text-muted)" />
                  <YAxis stroke="var(--dt-text-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--dt-bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--dt-text-primary)',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="aqi" stroke="var(--dt-lime)" fill="rgba(180, 255, 57, 0.2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="pm25" stroke="var(--dt-cyan)" fill="rgba(0, 240, 255, 0.2)" strokeWidth={2} />
                  <Area type="monotone" dataKey="pm10" stroke="var(--dt-amber)" fill="rgba(255, 184, 0, 0.2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Location Data */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Air Quality by Location
              </h2>
              <div className="space-y-4">
                {airQualityLocations.map((loc, index) => {
                  const status = getAQIStatus(loc.aqi);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <MapPin className="w-5 h-5" style={{ color: 'var(--dt-cyan)' }} />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                            {loc.location}
                          </h3>
                          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                            <span>PM2.5: {loc.pm25} μg/m³</span>
                            <span>PM10: {loc.pm10} μg/m³</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold mb-1" style={{ color: status.color }}>
                            {loc.aqi}
                          </div>
                          <span
                            className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                            style={{
                              backgroundColor: status.bg,
                              color: status.color,
                            }}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Noise Monitoring Tab */}
        {activeTab === 'noise' && (
          <div className="space-y-6">
            {/* Noise Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Volume2 className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  58
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Average dB
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="w-6 h-6" style={{ color: 'var(--dt-status-warning)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  3
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Alerts Today
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-6 h-6" style={{ color: 'var(--dt-lime)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  18
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Monitoring Points
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingDown className="w-6 h-6" style={{ color: 'var(--dt-status-success)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-status-success)' }}>
                  -8%
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  vs Last Week
                </div>
              </div>
            </div>

            {/* Noise Levels Chart */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Noise Levels by Zone Type
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={noiseLevels}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="time" stroke="var(--dt-text-muted)" />
                  <YAxis stroke="var(--dt-text-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--dt-bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--dt-text-primary)',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="residential" stroke="var(--dt-lime)" strokeWidth={2} />
                  <Line type="monotone" dataKey="commercial" stroke="var(--dt-cyan)" strokeWidth={2} />
                  <Line type="monotone" dataKey="industrial" stroke="var(--dt-amber)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Zone Compliance */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Zone Compliance Status
              </h2>
              <div className="space-y-4">
                {noiseZones.map((zone, index) => {
                  const status = getNoiseStatus(zone.current, zone.limit);
                  const percentage = (zone.current / zone.limit) * 100;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                            {zone.zone}
                          </h3>
                          <div className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                            Current: {zone.current} dB | Limit: {zone.limit} dB
                          </div>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                          style={{
                            backgroundColor: `${status.color}20`,
                            color: status.color,
                          }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: status.color,
                            boxShadow: `0 0 10px ${status.color}`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div className="space-y-6">
            {/* Weather Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <ThermometerSun className="w-6 h-6" style={{ color: 'var(--dt-status-warning)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  31°C
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Temperature
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Droplets className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  72%
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Humidity
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Cloud className="w-6 h-6" style={{ color: 'var(--dt-lime)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  2mm
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Rainfall
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Waves className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  12 km/h
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Wind Speed
                </div>
              </div>
            </div>

            {/* Weather Forecast */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                7-Day Weather Forecast
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="day" stroke="var(--dt-text-muted)" />
                  <YAxis yAxisId="left" stroke="var(--dt-text-muted)" />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--dt-text-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--dt-bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--dt-text-primary)',
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="temp" fill="var(--dt-amber)" name="Temperature (°C)" />
                  <Bar yAxisId="left" dataKey="humidity" fill="var(--dt-cyan)" name="Humidity (%)" />
                  <Bar yAxisId="right" dataKey="rainfall" fill="var(--dt-lime)" name="Rainfall (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Heat Map */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Urban Heat Map
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {heatmapData.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: area.heatIndex === 'high' ? 'rgba(255, 51, 102, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                          {area.area}
                        </h3>
                        <span
                          className="text-xs uppercase tracking-wide"
                          style={{
                            color: area.heatIndex === 'high' ? 'var(--dt-status-error)' : 'var(--dt-amber)',
                          }}
                        >
                          {area.heatIndex} heat index
                        </span>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-3xl font-bold"
                          style={{
                            color: area.heatIndex === 'high' ? 'var(--dt-status-error)' : 'var(--dt-amber)',
                          }}
                        >
                          {area.temp}°
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Water Quality Tab */}
        {activeTab === 'water' && (
          <div className="space-y-6">
            {/* Water Stats */}
            <div className="grid grid-cols-4 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Droplets className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                  <div
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(0, 255, 136, 0.1)',
                      color: 'var(--dt-status-success)',
                    }}
                  >
                    Excellent
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  7.3
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  pH Level
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Droplets className="w-6 h-6" style={{ color: 'var(--dt-lime)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  1.9
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Turbidity (NTU)
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Droplets className="w-6 h-6" style={{ color: 'var(--dt-amber)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  142
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  TDS (mg/L)
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-6 h-6" style={{ color: 'var(--dt-magenta)' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  12
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  Testing Points
                </div>
              </div>
            </div>

            {/* Water Quality Trends */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Water Quality Trends
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={waterQualityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="time" stroke="var(--dt-text-muted)" />
                  <YAxis stroke="var(--dt-text-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--dt-bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'var(--dt-text-primary)',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="ph" stroke="var(--dt-cyan)" strokeWidth={2} name="pH Level" />
                  <Line type="monotone" dataKey="turbidity" stroke="var(--dt-lime)" strokeWidth={2} name="Turbidity (NTU)" />
                  <Line type="monotone" dataKey="tds" stroke="var(--dt-amber)" strokeWidth={2} name="TDS (mg/L)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Water Sources */}
            <div className="glass-panel rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
                Water Sources Status
              </h2>
              <div className="space-y-4">
                {waterSources.map((source, index) => {
                  const status = getWaterStatus(source.status);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Droplets className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                            {source.source}
                          </h3>
                          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                            <span>pH: {source.ph}</span>
                            <span>Turbidity: {source.turbidity} NTU</span>
                            <span>TDS: {source.tds} mg/L</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                        style={{
                          backgroundColor: status.bg,
                          color: status.color,
                        }}
                      >
                        {source.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
