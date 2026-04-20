import { FileText, Download, Calendar, BarChart2, PieChart, TrendingUp, Clock, Share2, Plus, Filter } from "lucide-react";

export function Reports() {
  const reportStats = [
    { label: 'Total Reports', value: '156', trend: '+12', icon: FileText, color: 'var(--dt-lime)' },
    { label: 'This Month', value: '24', trend: '+8', icon: Calendar, color: 'var(--dt-cyan)' },
    { label: 'Downloads', value: '892', trend: '+45', icon: Download, color: 'var(--dt-amber)' },
    { label: 'Scheduled', value: '18', trend: '+3', icon: Clock, color: 'var(--dt-magenta)' },
  ];

  const reports = [
    {
      id: 1,
      title: 'Monthly Traffic Analysis',
      description: 'Comprehensive traffic flow analysis for March 2026',
      type: 'Traffic',
      format: 'PDF',
      generatedDate: '2026-04-15',
      size: '4.2 MB',
      status: 'ready',
      icon: BarChart2,
      color: 'var(--dt-cyan)',
    },
    {
      id: 2,
      title: 'Environmental Impact Report',
      description: 'Air quality and environmental metrics quarterly review',
      type: 'Environment',
      format: 'PDF',
      generatedDate: '2026-04-10',
      size: '6.8 MB',
      status: 'ready',
      icon: PieChart,
      color: 'var(--dt-lime)',
    },
    {
      id: 3,
      title: 'Infrastructure Health Summary',
      description: 'Overall infrastructure status and maintenance needs',
      type: 'Infrastructure',
      format: 'Excel',
      generatedDate: '2026-04-08',
      size: '2.1 MB',
      status: 'ready',
      icon: TrendingUp,
      color: 'var(--dt-amber)',
    },
    {
      id: 4,
      title: 'Citizen Feedback Analysis',
      description: 'Public sentiment and feedback trends for Q1 2026',
      type: 'Citizen Engagement',
      format: 'PDF',
      generatedDate: '2026-04-05',
      size: '3.7 MB',
      status: 'ready',
      icon: BarChart2,
      color: 'var(--dt-magenta)',
    },
    {
      id: 5,
      title: 'Energy Consumption Trends',
      description: 'Power grid usage and efficiency metrics',
      type: 'Utilities',
      format: 'PDF',
      generatedDate: 'Scheduled for Apr 25',
      size: '-',
      status: 'scheduled',
      icon: TrendingUp,
      color: 'var(--dt-cyan)',
    },
    {
      id: 6,
      title: 'Service Requests Overview',
      description: 'Analysis of citizen service requests and response times',
      type: 'Services',
      format: 'Excel',
      generatedDate: '2026-04-01',
      size: '1.9 MB',
      status: 'ready',
      icon: PieChart,
      color: 'var(--dt-lime)',
    },
  ];

  const templates = [
    { name: 'Traffic Report', icon: BarChart2, color: 'var(--dt-cyan)' },
    { name: 'Environmental Report', icon: PieChart, color: 'var(--dt-lime)' },
    { name: 'Infrastructure Report', icon: TrendingUp, color: 'var(--dt-amber)' },
    { name: 'Custom Report', icon: FileText, color: 'var(--dt-magenta)' },
  ];

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            Reports & Exports
          </h1>
          <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
            Generate, schedule, and export analytical reports
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-smooth hover:scale-105"
          style={{
            backgroundColor: 'var(--dt-lime)',
            color: 'var(--dt-bg-primary)',
          }}
        >
          <Plus className="w-4 h-4" />
          Create Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {reportStats.map((stat, index) => {
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
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    color: 'var(--dt-status-success)',
                  }}
                >
                  +{stat.trend}
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

      <div className="grid grid-cols-4 gap-6">
        {/* Report Templates */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" style={{ color: 'var(--dt-lime)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
              Quick Templates
            </h2>
          </div>
          <div className="space-y-2">
            {templates.map((template, index) => {
              const Icon = template.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-smooth hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--dt-text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${template.color}20`;
                    e.currentTarget.style.color = template.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.color = 'var(--dt-text-primary)';
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: template.color }} />
                  <span className="text-sm">{template.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reports List */}
        <div className="col-span-3 glass-panel rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
              Generated Reports
            </h2>
            <button
              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-smooth hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--dt-text-secondary)',
              }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="space-y-4">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className="p-4 rounded-xl transition-smooth hover:scale-[1.01]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${report.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: report.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                            {report.title}
                          </h3>
                          <p className="text-sm mb-2" style={{ color: 'var(--dt-text-secondary)' }}>
                            {report.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{report.generatedDate}</span>
                            </div>
                            {report.size !== '-' && (
                              <>
                                <span>•</span>
                                <span>{report.size}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{report.format}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {report.status === 'ready' ? (
                            <button
                              className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-smooth hover:scale-105"
                              style={{
                                backgroundColor: 'rgba(180, 255, 57, 0.15)',
                                color: 'var(--dt-lime)',
                              }}
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          ) : (
                            <span
                              className="px-3 py-1 rounded-lg text-xs uppercase tracking-wide font-medium"
                              style={{
                                backgroundColor: 'rgba(255, 184, 0, 0.1)',
                                color: 'var(--dt-amber)',
                              }}
                            >
                              Scheduled
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <span
                          className="px-2 py-1 rounded text-xs uppercase tracking-wide"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--dt-text-muted)',
                          }}
                        >
                          {report.type}
                        </span>
                        <button
                          className="flex items-center gap-1 px-2 py-1 rounded text-xs transition-smooth hover:scale-105"
                          style={{
                            color: 'var(--dt-text-secondary)',
                          }}
                        >
                          <Share2 className="w-3 h-3" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
