import { useState } from "react";
import { TabNavigation } from "../components/navigation/tab-navigation";
import { Zap, Droplets, Construction, Trash2 } from "lucide-react";

export function InfrastructureHealth() {
  const [activeTab, setActiveTab] = useState('power-grid');

  const tabs = [
    { id: 'power-grid', label: 'Power Grid', icon: Zap },
    { id: 'water-supply', label: 'Water Supply', icon: Droplets },
    { id: 'roads', label: 'Roads & Bridges', icon: Construction },
    { id: 'waste', label: 'Waste Management', icon: Trash2 },
  ];

  const infrastructureMetrics = {
    'power-grid': [
      { label: 'Grid Capacity', value: '94%', status: 'success' },
      { label: 'Active Substations', value: '48', status: 'success' },
      { label: 'Power Outages', value: '2', status: 'warning' },
      { label: 'Maintenance Due', value: '5', status: 'warning' },
    ],
    'water-supply': [
      { label: 'System Pressure', value: '96%', status: 'success' },
      { label: 'Treatment Plants', value: '12', status: 'success' },
      { label: 'Leak Alerts', value: '3', status: 'warning' },
      { label: 'Water Quality', value: '98%', status: 'success' },
    ],
    'roads': [
      { label: 'Road Conditions', value: '87%', status: 'success' },
      { label: 'Bridges Monitored', value: '156', status: 'success' },
      { label: 'Repair Needed', value: '12', status: 'warning' },
      { label: 'Under Construction', value: '8', status: 'info' },
    ],
    'waste': [
      { label: 'Collection Rate', value: '99%', status: 'success' },
      { label: 'Active Trucks', value: '124', status: 'success' },
      { label: 'Full Bins', value: '18', status: 'warning' },
      { label: 'Recycling Rate', value: '72%', status: 'success' },
    ],
  };

  const metrics = infrastructureMetrics[activeTab as keyof typeof infrastructureMetrics];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Infrastructure Health
        </h1>
        <p style={{ color: 'var(--dt-text-secondary)' }}>
          Monitor critical infrastructure systems
        </p>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="glass-panel rounded-xl p-6">
              <div className="text-sm uppercase tracking-wide mb-3" style={{ color: 'var(--dt-text-muted)' }}>
                {metric.label}
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                {metric.value}
              </div>
              <div
                className="text-xs uppercase tracking-wide"
                style={{
                  color: metric.status === 'success' ? 'var(--dt-status-success)' :
                         metric.status === 'warning' ? 'var(--dt-status-warning)' :
                         'var(--dt-cyan)'
                }}
              >
                {metric.status === 'success' ? 'Healthy' : metric.status === 'warning' ? 'Needs Attention' : 'Normal'}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
          <div className="text-center">
            {tabs.find(t => t.id === activeTab)?.icon && 
              (() => {
                const Icon = tabs.find(t => t.id === activeTab)!.icon!;
                return <Icon className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--dt-cyan)' }} />;
              })()
            }
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
              {tabs.find(t => t.id === activeTab)?.label} Map
            </h3>
            <p style={{ color: 'var(--dt-text-secondary)' }}>
              Infrastructure distribution and status visualization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}