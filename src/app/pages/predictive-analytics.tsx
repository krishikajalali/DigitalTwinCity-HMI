import { useState } from "react";
import { TrendingUp, TrendingDown, Activity, BarChart3, Brain, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function PredictiveAnalytics() {
  const [timeRange, setTimeRange] = useState('7days');

  const trafficPrediction = [
    { time: 'Mon', actual: 850, predicted: 820 },
    { time: 'Tue', actual: 920, predicted: 890 },
    { time: 'Wed', actual: 1050, predicted: 1020 },
    { time: 'Thu', actual: 980, predicted: 1000 },
    { time: 'Fri', actual: 1150, predicted: 1180 },
    { time: 'Sat', actual: 750, predicted: 780 },
    { time: 'Sun', actual: 680, predicted: 650 },
  ];

  const airQualityForecast = [
    { day: 'Mon', aqi: 45, forecast: 42 },
    { day: 'Tue', aqi: 52, forecast: 55 },
    { day: 'Wed', aqi: 48, forecast: 50 },
    { day: 'Thu', aqi: 58, forecast: 62 },
    { day: 'Fri', aqi: 65, forecast: 68 },
    { day: 'Sat', aqi: 42, forecast: 40 },
    { day: 'Sun', aqi: 38, forecast: 35 },
  ];

  const predictions = [
    {
      title: 'Traffic Congestion',
      prediction: 'High congestion expected during evening rush hour',
      confidence: 87,
      impact: 'high',
      timeframe: '5-7 PM today',
      icon: TrendingUp,
      color: 'var(--dt-status-error)',
    },
    {
      title: 'Air Quality',
      prediction: 'Moderate air quality improvement by weekend',
      confidence: 72,
      impact: 'medium',
      timeframe: 'Next 3 days',
      icon: Activity,
      color: 'var(--dt-status-warning)',
    },
    {
      title: 'Energy Demand',
      prediction: 'Peak demand surge predicted for tomorrow',
      confidence: 94,
      impact: 'high',
      timeframe: 'Tomorrow 2-6 PM',
      icon: TrendingUp,
      color: 'var(--dt-amber)',
    },
    {
      title: 'Water Usage',
      prediction: 'Normal consumption levels expected',
      confidence: 89,
      impact: 'low',
      timeframe: 'Next week',
      icon: CheckCircle,
      color: 'var(--dt-status-success)',
    },
  ];

  const insights = [
    { label: 'Predictions Made', value: '1,247', trend: '+12%', icon: Brain },
    { label: 'Accuracy Rate', value: '94.2%', trend: '+2.1%', icon: BarChart3 },
    { label: 'Active Models', value: '18', trend: '+3', icon: Activity },
    { label: 'Alerts Generated', value: '34', trend: '-8', icon: AlertTriangle },
  ];

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Predictive Analytics
        </h1>
        <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
          AI-powered predictions and trend analysis for city operations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const isPositive = !insight.trend.startsWith('-');
          return (
            <div key={index} className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(184, 78, 255, 0.1)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--dt-purple)' }} />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: isPositive ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                    color: isPositive ? 'var(--dt-status-success)' : 'var(--dt-status-warning)',
                  }}
                >
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {insight.trend}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                {insight.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                {insight.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Traffic Prediction Chart */}
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Traffic Flow Prediction
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficPrediction}>
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
              <Line type="monotone" dataKey="actual" stroke="var(--dt-cyan)" strokeWidth={2} />
              <Line type="monotone" dataKey="predicted" stroke="var(--dt-purple)" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Air Quality Forecast Chart */}
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Air Quality Forecast
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={airQualityForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="day" stroke="var(--dt-text-muted)" />
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
              <Area type="monotone" dataKey="forecast" stroke="var(--dt-amber)" fill="rgba(255, 184, 0, 0.2)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Predictions List */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
          Active Predictions
        </h2>
        <div className="space-y-4">
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl transition-smooth hover:scale-[1.01]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${prediction.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: prediction.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
                        {prediction.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
                        <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                          {prediction.timeframe}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--dt-text-secondary)' }}>
                      {prediction.prediction}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <span style={{ color: 'var(--dt-text-muted)' }}>Confidence Level</span>
                          <span style={{ color: 'var(--dt-text-primary)' }}>{prediction.confidence}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${prediction.confidence}%`,
                              backgroundColor: prediction.color,
                              boxShadow: `0 0 10px ${prediction.color}`,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                        style={{
                          backgroundColor: `${prediction.color}20`,
                          color: prediction.color,
                        }}
                      >
                        {prediction.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
