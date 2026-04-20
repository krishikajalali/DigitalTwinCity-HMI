import { AlertCircle, AlertTriangle, Info, CheckCircle, MapPin, Clock, Users as UsersIcon } from "lucide-react";

export function EmergencyAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Major Traffic Incident',
      location: 'Highway 101, Downtown',
      time: '5 min ago',
      description: 'Multi-vehicle accident blocking 3 lanes. Emergency services dispatched.',
      responders: 8,
      status: 'active',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Air Quality Alert',
      location: 'Industrial District',
      time: '15 min ago',
      description: 'AQI exceeding safe levels. Monitor outdoor activities.',
      responders: 3,
      status: 'monitoring',
    },
    {
      id: 3,
      type: 'info',
      title: 'Planned Power Outage',
      location: 'East Side Residential',
      time: '1 hour ago',
      description: 'Scheduled maintenance from 2 PM to 6 PM.',
      responders: 5,
      status: 'scheduled',
    },
    {
      id: 4,
      type: 'resolved',
      title: 'Water Main Break',
      location: 'Central Business District',
      time: '3 hours ago',
      description: 'Water service restored. Cleanup in progress.',
      responders: 12,
      status: 'resolved',
    },
  ];

  const alertConfig = {
    critical: {
      icon: AlertCircle,
      color: 'var(--dt-status-error)',
      bg: 'rgba(255, 51, 102, 0.1)',
    },
    warning: {
      icon: AlertTriangle,
      color: 'var(--dt-status-warning)',
      bg: 'rgba(255, 184, 0, 0.1)',
    },
    info: {
      icon: Info,
      color: 'var(--dt-cyan)',
      bg: 'rgba(0, 240, 255, 0.1)',
    },
    resolved: {
      icon: CheckCircle,
      color: 'var(--dt-status-success)',
      bg: 'rgba(0, 255, 136, 0.1)',
    },
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Emergency & Alerts
        </h1>
        <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
          Real-time emergency alerts and response coordination
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Active Alerts
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-status-error)' }}>
            {alerts.filter(a => a.type === 'critical').length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Monitoring
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-status-warning)' }}>
            {alerts.filter(a => a.type === 'warning').length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Responders
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
            {alerts.reduce((sum, a) => sum + a.responders, 0)}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Resolved Today
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-status-success)' }}>
            {alerts.filter(a => a.type === 'resolved').length}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type as keyof typeof alertConfig];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.01] cursor-pointer"
              style={{ borderLeft: `4px solid ${config.color}` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: config.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: config.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                        {alert.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                      style={{
                        backgroundColor: config.bg,
                        color: config.color,
                      }}
                    >
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--dt-text-secondary)' }}>
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--dt-text-muted)' }}>
                      {alert.responders} responders assigned
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}