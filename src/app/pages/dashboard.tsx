import { Activity, Users, AlertTriangle, TrendingUp, Car, Leaf, Zap, Droplets, MapPin, ArrowUp, ArrowDown } from "lucide-react";

export function Dashboard() {
  const metrics = [
    { 
      label: 'Active Sensors', 
      value: '12,847', 
      change: '+5.2%', 
      trend: 'up',
      icon: Activity,
      color: 'var(--dt-cyan)',
    },
    { 
      label: 'Population', 
      value: '2.4M', 
      change: '+1.8%', 
      trend: 'up',
      icon: Users,
      color: 'var(--dt-lime)',
    },
    { 
      label: 'Active Alerts', 
      value: '23', 
      change: '-12%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'var(--dt-amber)',
    },
    { 
      label: 'System Health', 
      value: '98.5%', 
      change: '+0.3%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'var(--dt-status-success)',
    },
  ];

  const cityMetrics = [
    { label: 'Traffic Flow', value: 87, icon: Car, color: 'var(--dt-cyan)' },
    { label: 'Air Quality', value: 72, icon: Leaf, color: 'var(--dt-lime)' },
    { label: 'Power Grid', value: 94, icon: Zap, color: 'var(--dt-amber)' },
    { label: 'Water Quality', value: 96, icon: Droplets, color: 'var(--dt-cyan)' },
  ];

  const recentActivity = [
    { type: 'traffic', message: 'Traffic incident cleared on Highway 101', time: '2 min ago', icon: Car, color: 'var(--dt-cyan)' },
    { type: 'alert', message: 'Air quality alert resolved in Industrial District', time: '15 min ago', icon: Leaf, color: 'var(--dt-lime)' },
    { type: 'system', message: 'Power grid maintenance completed', time: '1 hour ago', icon: Zap, color: 'var(--dt-amber)' },
    { type: 'data', message: 'New sensors deployed in East Side', time: '2 hours ago', icon: MapPin, color: 'var(--dt-magenta)' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          City Dashboard
        </h1>
        <p style={{ color: 'var(--dt-text-secondary)' }}>
          Real-time overview of Mumbai Digital Twin
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
          return (
            <div
              key={index}
              className="glass-panel rounded-2xl p-6 transition-smooth hover:scale-105 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: metric.trend === 'up' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                    color: metric.trend === 'up' ? 'var(--dt-status-success)' : 'var(--dt-status-warning)',
                  }}
                >
                  <TrendIcon className="w-3 h-3" />
                  {metric.change}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                  {metric.value}
                </div>
                <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                  {metric.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* City Health Metrics */}
        <div className="col-span-2 glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            City Health Metrics
          </h2>
          <div className="space-y-6">
            {cityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" style={{ color: metric.color }} />
                      <span className="font-medium" style={{ color: 'var(--dt-text-primary)' }}>
                        {metric.label}
                      </span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: metric.color }}>
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${metric.value}%`,
                        backgroundColor: metric.color,
                        boxShadow: `0 0 10px ${metric.color}`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${activity.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                      {activity.message}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="glass-panel rounded-2xl p-6 h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center glow-cyan" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}>
            <Activity className="w-12 h-12" style={{ color: 'var(--dt-cyan)' }} />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            City Map View
          </h3>
          <p style={{ color: 'var(--dt-text-secondary)' }}>
            Interactive 3D city visualization
          </p>
        </div>
      </div>
    </div>
  );
}