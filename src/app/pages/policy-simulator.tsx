import { Lightbulb, TrendingUp, Users, DollarSign, Leaf, Plus } from "lucide-react";

export function PolicySimulator() {
  const policyTemplates = [
    {
      title: 'Traffic Reduction Policy',
      description: 'Simulate impact of congestion pricing in downtown',
      icon: TrendingUp,
      color: 'var(--dt-cyan)',
      metrics: ['Traffic Flow', 'Revenue', 'Air Quality'],
    },
    {
      title: 'Green Energy Initiative',
      description: 'Model transition to renewable energy sources',
      icon: Leaf,
      color: 'var(--dt-lime)',
      metrics: ['Emissions', 'Cost', 'Grid Stability'],
    },
    {
      title: 'Housing Development',
      description: 'Predict effects of new residential zoning',
      icon: Users,
      color: 'var(--dt-magenta)',
      metrics: ['Population', 'Services', 'Infrastructure'],
    },
    {
      title: 'Budget Reallocation',
      description: 'Test different budget distribution scenarios',
      icon: DollarSign,
      color: 'var(--dt-amber)',
      metrics: ['Spending', 'Efficiency', 'Impact'],
    },
  ];

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Policy Simulator
        </h1>
        <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
          Test and simulate policy changes before implementation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Active Simulations
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
            3
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Scenarios Created
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
            24
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Policies Tested
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
            156
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Success Rate
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-status-success)' }}>
            87%
          </div>
        </div>
      </div>

      {/* Policy Templates */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
          Policy Templates
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth"
          style={{
            backgroundColor: 'var(--dt-purple)',
            color: 'white',
          }}
        >
          <Plus className="w-4 h-4" />
          Create Custom Policy
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {policyTemplates.map((template, index) => {
          const Icon = template.icon;
          return (
            <div
              key={index}
              className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-4 rounded-xl flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Icon className="w-8 h-8" style={{ color: template.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
                    {template.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--dt-text-secondary)' }}>
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--dt-text-secondary)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover:bg-white/5"
                  style={{ color: template.color }}
                >
                  Start Simulation →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}