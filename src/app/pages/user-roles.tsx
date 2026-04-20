import { Users, Shield, UserPlus, Settings, Eye, Edit, Trash2, CheckCircle, XCircle, Lock } from "lucide-react";

export function UserRoles() {
  const roleStats = [
    { label: 'Total Users', value: '248', trend: '+12', icon: Users, color: 'var(--dt-purple)' },
    { label: 'Active Roles', value: '8', trend: '+1', icon: Shield, color: 'var(--dt-cyan)' },
    { label: 'Permissions', value: '42', trend: '+3', icon: Lock, color: 'var(--dt-lime)' },
    { label: 'Recent Changes', value: '15', trend: '+5', icon: Settings, color: 'var(--dt-amber)' },
  ];

  const roles = [
    {
      id: 1,
      name: 'System Administrator',
      description: 'Full system access and control',
      users: 3,
      color: 'var(--dt-status-error)',
      permissions: ['All permissions', 'User management', 'System configuration', 'Data access'],
    },
    {
      id: 2,
      name: 'City Manager',
      description: 'Manage city operations and data',
      users: 8,
      color: 'var(--dt-purple)',
      permissions: ['Dashboard access', 'Report generation', 'Data visualization', 'Policy management'],
    },
    {
      id: 3,
      name: 'Data Analyst',
      description: 'Analyze and generate insights from city data',
      users: 24,
      color: 'var(--dt-cyan)',
      permissions: ['View all data', 'Generate reports', 'Export data', 'Analytics tools'],
    },
    {
      id: 4,
      name: 'Traffic Controller',
      description: 'Monitor and manage traffic systems',
      users: 15,
      color: 'var(--dt-lime)',
      permissions: ['Traffic dashboard', 'Real-time monitoring', 'Alert management', 'Traffic reports'],
    },
    {
      id: 5,
      name: 'Environmental Monitor',
      description: 'Track environmental metrics and alerts',
      users: 12,
      color: 'var(--dt-lime)',
      permissions: ['Environmental data', 'Air quality monitoring', 'Weather data', 'Alerts'],
    },
    {
      id: 6,
      name: 'Citizen Services',
      description: 'Handle citizen feedback and service requests',
      users: 32,
      color: 'var(--dt-amber)',
      permissions: ['View feedback', 'Manage requests', 'Citizen communication', 'Service reports'],
    },
    {
      id: 7,
      name: 'Emergency Responder',
      description: 'Access emergency systems and alerts',
      users: 18,
      color: 'var(--dt-status-error)',
      permissions: ['Emergency dashboard', 'Alert system', 'Real-time tracking', 'Incident management'],
    },
    {
      id: 8,
      name: 'Viewer',
      description: 'Read-only access to dashboards',
      users: 136,
      color: 'var(--dt-text-muted)',
      permissions: ['View dashboards', 'Basic reports'],
    },
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@city.gov',
      role: 'System Administrator',
      status: 'active',
      lastActive: '2 min ago',
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@city.gov',
      role: 'City Manager',
      status: 'active',
      lastActive: '15 min ago',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      email: 'priya.sharma@city.gov',
      role: 'Data Analyst',
      status: 'active',
      lastActive: '1 hour ago',
    },
    {
      id: 4,
      name: 'Mohammed Ali',
      email: 'mohammed.ali@city.gov',
      role: 'Traffic Controller',
      status: 'active',
      lastActive: '5 min ago',
    },
    {
      id: 5,
      name: 'Amit Patel',
      email: 'amit.patel@city.gov',
      role: 'Environmental Monitor',
      status: 'inactive',
      lastActive: '2 days ago',
    },
  ];

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
            User Roles & Permissions
          </h1>
          <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
            Manage user access, roles, and permissions across the platform
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-smooth hover:scale-105"
          style={{
            backgroundColor: 'var(--dt-purple)',
            color: 'white',
          }}
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {roleStats.map((stat, index) => {
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

      {/* Roles Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
          System Roles
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="glass-panel rounded-xl p-6 transition-smooth hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${role.color}20` }}
                  >
                    <Shield className="w-6 h-6" style={{ color: role.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                      {role.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                      {role.description}
                    </p>
                  </div>
                </div>
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
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                    {role.users} users assigned
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--dt-text-muted)',
                      }}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
          Recent Users
        </h2>
        <div className="glass-panel rounded-xl p-6">
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-xl transition-smooth hover:scale-[1.01]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold"
                    style={{
                      backgroundColor: 'var(--dt-purple)' + '30',
                      color: 'var(--dt-purple)',
                    }}
                  >
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs mb-1"
                      style={{
                        backgroundColor: user.status === 'active' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                        color: user.status === 'active' ? 'var(--dt-status-success)' : 'var(--dt-status-warning)',
                      }}
                    >
                      {user.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {user.status}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                      Last active {user.lastActive}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg transition-smooth hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(0, 240, 255, 0.1)',
                        color: 'var(--dt-cyan)',
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-smooth hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(180, 255, 57, 0.1)',
                        color: 'var(--dt-lime)',
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-smooth hover:scale-105"
                      style={{
                        backgroundColor: 'rgba(255, 51, 102, 0.1)',
                        color: 'var(--dt-status-error)',
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
