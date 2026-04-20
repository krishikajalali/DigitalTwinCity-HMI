import { FolderKanban, Play, Share2, Copy, Trash2, Calendar, User, MoreVertical } from "lucide-react";

export function ScenarioManager() {
  const scenarios = [
    {
      id: 1,
      name: 'Traffic Reduction 2025',
      description: 'Implementation of congestion pricing in downtown',
      status: 'active',
      author: 'Sarah Chen',
      lastModified: '2 hours ago',
      runs: 24,
      color: 'var(--dt-cyan)',
    },
    {
      id: 2,
      name: 'Green Energy Transition',
      description: 'Full renewable energy adoption by 2030',
      status: 'draft',
      author: 'Mike Rodriguez',
      lastModified: '1 day ago',
      runs: 15,
      color: 'var(--dt-lime)',
    },
    {
      id: 3,
      name: 'Emergency Response Plan',
      description: 'Optimized emergency vehicle routing',
      status: 'completed',
      author: 'Alex Johnson',
      lastModified: '3 days ago',
      runs: 42,
      color: 'var(--dt-status-error)',
    },
    {
      id: 4,
      name: 'Public Transport Expansion',
      description: 'New metro lines and bus routes',
      status: 'draft',
      author: 'Sarah Chen',
      lastModified: '5 days ago',
      runs: 8,
      color: 'var(--dt-magenta)',
    },
  ];

  const statusColors = {
    active: 'var(--dt-cyan)',
    draft: 'var(--dt-amber)',
    completed: 'var(--dt-status-success)',
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            Scenario Manager
          </h1>
          <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
            Create, save, and manage simulation scenarios
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-smooth"
          style={{
            backgroundColor: 'var(--dt-purple)',
            color: 'white',
          }}
        >
          <FolderKanban className="w-4 h-4" />
          New Scenario
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Total Scenarios
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
            {scenarios.length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Active
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-cyan)' }}>
            {scenarios.filter(s => s.status === 'active').length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            In Draft
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-amber)' }}>
            {scenarios.filter(s => s.status === 'draft').length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <div className="text-sm uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Completed
          </div>
          <div className="text-3xl font-bold" style={{ color: 'var(--dt-status-success)' }}>
            {scenarios.filter(s => s.status === 'completed').length}
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${scenario.color}20`,
                  }}
                >
                  <FolderKanban className="w-5 h-5" style={{ color: scenario.color }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                    {scenario.name}
                  </h3>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs uppercase tracking-wide font-medium"
                    style={{
                      backgroundColor: `${statusColors[scenario.status as keyof typeof statusColors]}20`,
                      color: statusColors[scenario.status as keyof typeof statusColors],
                    }}
                  >
                    {scenario.status}
                  </span>
                </div>
              </div>
              <button className="p-2 rounded-lg transition-smooth hover:bg-white/5">
                <MoreVertical className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
              </button>
            </div>

            <p className="text-sm mb-4" style={{ color: 'var(--dt-text-secondary)' }}>
              {scenario.description}
            </p>

            <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: 'var(--dt-text-muted)' }}>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{scenario.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{scenario.lastModified}</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3" />
                <span>{scenario.runs} runs</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <button
                className="flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-smooth"
                style={{
                  backgroundColor: `${scenario.color}20`,
                  color: scenario.color,
                }}
              >
                <Play className="w-4 h-4" />
                Run Simulation
              </button>
              <button
                className="p-2 rounded-lg transition-smooth hover:bg-white/5"
                style={{ color: 'var(--dt-text-secondary)' }}
                title="Duplicate"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg transition-smooth hover:bg-white/5"
                style={{ color: 'var(--dt-text-secondary)' }}
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg transition-smooth hover:bg-white/5"
                style={{ color: 'var(--dt-status-error)' }}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}