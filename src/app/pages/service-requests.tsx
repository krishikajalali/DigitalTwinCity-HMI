import { useState } from "react";
import { Inbox, Clock, CheckCircle, AlertCircle, User, MapPin, Calendar, Filter, Search, TrendingUp } from "lucide-react";

export function ServiceRequests() {
  const [filterStatus, setFilterStatus] = useState('all');

  const requestStats = [
    { label: 'Total Requests', value: '3,421', trend: '+8%', icon: Inbox, color: 'var(--dt-cyan)' },
    { label: 'In Progress', value: '892', trend: '+12', icon: Clock, color: 'var(--dt-amber)' },
    { label: 'Completed', value: '2,314', trend: '+145', icon: CheckCircle, color: 'var(--dt-status-success)' },
    { label: 'Urgent', value: '45', trend: '-5', icon: AlertCircle, color: 'var(--dt-status-error)' },
  ];

  const serviceRequests = [
    {
      id: 'REQ-2847',
      title: 'Street Light Repair',
      description: 'Multiple street lights not working on MG Road',
      citizen: 'Priya Sharma',
      location: 'MG Road, Delhi',
      category: 'Infrastructure',
      priority: 'high',
      status: 'in_progress',
      created: '2 hours ago',
      assignedTo: 'Maintenance Team A',
    },
    {
      id: 'REQ-2846',
      title: 'Pothole Repair Request',
      description: 'Large pothole causing traffic issues',
      citizen: 'Amit Kumar',
      location: 'Link Road, Mumbai',
      category: 'Roads',
      priority: 'urgent',
      status: 'pending',
      created: '5 hours ago',
      assignedTo: 'Unassigned',
    },
    {
      id: 'REQ-2845',
      title: 'Garbage Collection',
      description: 'Missed garbage collection for 3 days',
      citizen: 'Sanjana Reddy',
      location: 'Banjara Hills, Hyderabad',
      category: 'Sanitation',
      priority: 'medium',
      status: 'in_progress',
      created: '1 day ago',
      assignedTo: 'Sanitation Team B',
    },
    {
      id: 'REQ-2844',
      title: 'Water Supply Issue',
      description: 'Low water pressure in residential area',
      citizen: 'Mohammed Ali',
      location: 'Hitech City, Hyderabad',
      category: 'Utilities',
      priority: 'high',
      status: 'in_progress',
      created: '1 day ago',
      assignedTo: 'Water Department',
    },
    {
      id: 'REQ-2843',
      title: 'Park Bench Replacement',
      description: 'Damaged bench needs replacement',
      citizen: 'Rajesh Patel',
      location: 'Calangute, Goa',
      category: 'Parks',
      priority: 'low',
      status: 'completed',
      created: '3 days ago',
      assignedTo: 'Parks Department',
    },
  ];

  const statusFilters = [
    { id: 'all', label: 'All Requests', count: 3421 },
    { id: 'pending', label: 'Pending', count: 215 },
    { id: 'in_progress', label: 'In Progress', count: 892 },
    { id: 'completed', label: 'Completed', count: 2314 },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { label: 'Pending', color: 'var(--dt-amber)', bg: 'rgba(255, 184, 0, 0.1)' },
      in_progress: { label: 'In Progress', color: 'var(--dt-cyan)', bg: 'rgba(0, 240, 255, 0.1)' },
      completed: { label: 'Completed', color: 'var(--dt-status-success)', bg: 'rgba(0, 255, 136, 0.1)' },
    };
    return configs[status as keyof typeof configs];
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      urgent: { label: 'Urgent', color: 'var(--dt-status-error)' },
      high: { label: 'High', color: 'var(--dt-status-warning)' },
      medium: { label: 'Medium', color: 'var(--dt-cyan)' },
      low: { label: 'Low', color: 'var(--dt-text-muted)' },
    };
    return configs[priority as keyof typeof configs];
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            Service Requests
          </h1>
          <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
            Manage and track citizen service requests across the city
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-smooth hover:scale-105"
          style={{
            backgroundColor: 'var(--dt-cyan)',
            color: 'white',
          }}
        >
          <Inbox className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {requestStats.map((stat, index) => {
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
                  <TrendingUp className="w-3 h-3" />
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

      {/* Search and Filter */}
      <div className="glass-panel rounded-xl p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
            <input
              type="text"
              placeholder="Search requests by ID, title, or location..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm transition-smooth hover:border-[var(--dt-cyan)] focus:outline-none focus:border-[var(--dt-cyan)]"
              style={{ color: 'var(--dt-text-primary)' }}
            />
          </div>
          <div className="flex items-center gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterStatus(filter.id)}
                className="px-4 py-2 rounded-lg text-sm transition-smooth"
                style={{
                  backgroundColor: filterStatus === filter.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: filterStatus === filter.id ? 'var(--dt-cyan)' : 'var(--dt-text-primary)',
                }}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {serviceRequests.map((request) => {
          const statusConfig = getStatusConfig(request.status);
          const priorityConfig = getPriorityConfig(request.priority);

          return (
            <div
              key={request.id}
              className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
                      {request.title}
                    </h3>
                    <span className="text-sm font-mono px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--dt-text-muted)' }}>
                      {request.id}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--dt-text-secondary)' }}>
                    {request.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{request.citizen}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{request.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                    style={{
                      backgroundColor: statusConfig.bg,
                      color: statusConfig.color,
                    }}
                  >
                    {statusConfig.label}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                    style={{
                      backgroundColor: `${priorityConfig.color}20`,
                      color: priorityConfig.color,
                    }}
                  >
                    {priorityConfig.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--dt-text-muted)' }}>Assigned to:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--dt-text-primary)' }}>{request.assignedTo}</span>
                </div>
                <span
                  className="px-3 py-1 rounded text-xs uppercase tracking-wide"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--dt-text-muted)',
                  }}
                >
                  {request.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
