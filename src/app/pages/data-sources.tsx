import { Database, Cloud, Activity, Zap, Wifi, RefreshCw, AlertTriangle, CheckCircle, Clock, Settings, Plus } from "lucide-react";

export function DataSources() {
  const sourceStats = [
    { label: 'Total Sources', value: '24', trend: '+3', icon: Database, color: 'var(--dt-cyan)' },
    { label: 'Active Connections', value: '21', trend: '+2', icon: Wifi, color: 'var(--dt-status-success)' },
    { label: 'API Calls Today', value: '1.2M', trend: '+15%', icon: Activity, color: 'var(--dt-lime)' },
    { label: 'Issues', value: '3', trend: '-1', icon: AlertTriangle, color: 'var(--dt-status-warning)' },
  ];

  const dataSources = [
    {
      id: 1,
      name: 'Traffic Sensor Network',
      type: 'IoT Sensors',
      status: 'active',
      lastSync: '2 min ago',
      dataPoints: '2.4M',
      frequency: 'Real-time',
      icon: Activity,
      color: 'var(--dt-cyan)',
    },
    {
      id: 2,
      name: 'Weather API',
      type: 'External API',
      status: 'active',
      lastSync: '5 min ago',
      dataPoints: '48K',
      frequency: 'Every 15 min',
      icon: Cloud,
      color: 'var(--dt-lime)',
    },
    {
      id: 3,
      name: 'Power Grid Monitoring',
      type: 'IoT Sensors',
      status: 'active',
      lastSync: '1 min ago',
      dataPoints: '856K',
      frequency: 'Real-time',
      icon: Zap,
      color: 'var(--dt-amber)',
    },
    {
      id: 4,
      name: 'Water Quality Sensors',
      type: 'IoT Sensors',
      status: 'active',
      lastSync: '10 min ago',
      dataPoints: '124K',
      frequency: 'Every 30 min',
      icon: Database,
      color: 'var(--dt-cyan)',
    },
    {
      id: 5,
      name: 'Air Quality Monitors',
      type: 'IoT Sensors',
      status: 'warning',
      lastSync: '45 min ago',
      dataPoints: '342K',
      frequency: 'Every 5 min',
      icon: Cloud,
      color: 'var(--dt-lime)',
    },
    {
      id: 6,
      name: 'Public Transport GPS',
      type: 'GPS Tracking',
      status: 'active',
      lastSync: '3 min ago',
      dataPoints: '1.8M',
      frequency: 'Real-time',
      icon: Activity,
      color: 'var(--dt-magenta)',
    },
    {
      id: 7,
      name: 'Emergency Services Data',
      type: 'Internal System',
      status: 'active',
      lastSync: '1 min ago',
      dataPoints: '89K',
      frequency: 'Real-time',
      icon: AlertTriangle,
      color: 'var(--dt-status-error)',
    },
    {
      id: 8,
      name: 'Parking System',
      type: 'Internal System',
      status: 'error',
      lastSync: '2 hours ago',
      dataPoints: '456K',
      frequency: 'Every 10 min',
      icon: Database,
      color: 'var(--dt-cyan)',
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        icon: CheckCircle,
        color: 'var(--dt-status-success)',
        bg: 'rgba(0, 255, 136, 0.1)',
        label: 'Active',
      },
      warning: {
        icon: AlertTriangle,
        color: 'var(--dt-status-warning)',
        bg: 'rgba(255, 184, 0, 0.1)',
        label: 'Warning',
      },
      error: {
        icon: AlertTriangle,
        color: 'var(--dt-status-error)',
        bg: 'rgba(255, 51, 102, 0.1)',
        label: 'Error',
      },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            Data Sources
          </h1>
          <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
            Configure and manage data integrations and sensors
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-smooth hover:scale-105"
          style={{
            backgroundColor: 'var(--dt-cyan)',
            color: 'white',
          }}
        >
          <Plus className="w-4 h-4" />
          Add Data Source
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {sourceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: stat.trend.startsWith('+') ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                    color: stat.trend.startsWith('+') ? 'var(--dt-status-success)' : 'var(--dt-status-warning)',
                  }}
                >
                  {stat.trend}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-2 gap-6">
        {dataSources.map((source) => {
          const Icon = source.icon;
          const statusConfig = getStatusConfig(source.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={source.id}
              className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${source.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: source.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                      {source.name}
                    </h3>
                    <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                      {source.type}
                    </span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{
                    backgroundColor: statusConfig.bg,
                  }}
                >
                  <StatusIcon className="w-3 h-3" style={{ color: statusConfig.color }} />
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: statusConfig.color }}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2" style={{ color: 'var(--dt-text-secondary)' }}>
                    <Clock className="w-4 h-4" />
                    <span>Last Sync</span>
                  </div>
                  <span style={{ color: 'var(--dt-text-primary)' }}>{source.lastSync}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2" style={{ color: 'var(--dt-text-secondary)' }}>
                    <Database className="w-4 h-4" />
                    <span>Data Points</span>
                  </div>
                  <span style={{ color: 'var(--dt-text-primary)' }}>{source.dataPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2" style={{ color: 'var(--dt-text-secondary)' }}>
                    <RefreshCw className="w-4 h-4" />
                    <span>Update Frequency</span>
                  </div>
                  <span style={{ color: 'var(--dt-text-primary)' }}>{source.frequency}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <button
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-smooth hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(0, 240, 255, 0.1)',
                    color: 'var(--dt-cyan)',
                  }}
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Sync Now
                </button>
                <button
                  className="p-2 rounded-lg transition-smooth hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--dt-text-secondary)',
                  }}
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
