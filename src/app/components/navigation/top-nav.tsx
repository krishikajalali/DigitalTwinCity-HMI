import { useState } from "react";
import { Search, Bell, Users, User } from "lucide-react";
import { SystemStatusIndicator } from "./system-status-indicator";
import { NotificationDropdown } from "./notification-dropdown";
import { UserProfileMenu } from "./user-profile-menu";
import { SimulationModeToggle } from "./simulation-mode-toggle";
import { ThemeToggle } from "./theme-toggle";

interface TopNavProps {
  onSearchFocus?: () => void;
  simulationMode: boolean;
  onSimulationModeChange: (mode: boolean) => void;
}

export function TopNav({ onSearchFocus, simulationMode, onSimulationModeChange }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const cities = ["Mumbai", "Delhi", "Hyderabad", "Jammu", "Goa"];
  const activeUsers = [
    { id: 1, name: "John Doe", avatar: "JD" },
    { id: 2, name: "Sarah Smith", avatar: "SS" },
    { id: 3, name: "Mike Johnson", avatar: "MJ" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 glass-panel-solid z-50">
      <div className="h-full flex items-center px-6 gap-6">
        {/* Left Side - Logo & City Selector */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--dt-cyan)] to-[var(--dt-purple)] flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/80 rounded" />
            </div>
            <span className="font-bold text-lg tracking-tight text-glow-cyan" style={{ color: 'var(--dt-cyan)' }}>
              DigitalTwin City
            </span>
          </div>

          <div className="h-8 w-px bg-white/10" />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent border border-white/20 rounded-lg px-3 py-1.5 text-sm transition-smooth hover:border-[var(--dt-cyan)] hover:bg-white/5 focus:outline-none focus:border-[var(--dt-cyan)] cursor-pointer"
            style={{ color: 'var(--dt-text-primary)' }}
          >
            {cities.map((city) => (
              <option key={city} value={city} className="bg-[var(--dt-bg-secondary)]">
                {city}
              </option>
            ))}
          </select>

          <SystemStatusIndicator status="success" />
        </div>

        {/* Center - Global Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
            <input
              type="text"
              placeholder="Search locations, sensors, assets..."
              onFocus={onSearchFocus}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm transition-smooth hover:border-[var(--dt-cyan)] focus:outline-none focus:border-[var(--dt-cyan)] focus:bg-white/10"
              style={{ color: 'var(--dt-text-primary)' }}
            />
          </div>
        </div>

        {/* Right Side - Actions & User */}
        <div className="flex items-center gap-4">
          {/* Active Users Collaboration */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: 'var(--dt-text-secondary)' }} />
            <div className="flex -space-x-2">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs transition-smooth hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--dt-bg-tertiary)',
                    borderColor: 'var(--dt-cyan)',
                    color: 'var(--dt-cyan)'
                  }}
                  title={user.name}
                >
                  {user.avatar}
                </div>
              ))}
            </div>
          </div>

          <div className="h-8 w-px bg-white/10" />

          {/* Simulation Mode Toggle */}
          <SimulationModeToggle
            enabled={simulationMode}
            onChange={onSimulationModeChange}
          />

          <div className="h-8 w-px bg-white/10" />

          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="h-8 w-px bg-white/10" />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg transition-smooth hover:bg-white/5"
            >
              <Bell className="w-5 h-5" style={{ color: 'var(--dt-text-secondary)' }} />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse-glow"
                style={{ backgroundColor: 'var(--dt-status-error)' }}
              />
            </button>
            {showNotifications && (
              <NotificationDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:bg-white/5"
              style={{ 
                backgroundColor: 'var(--dt-bg-tertiary)',
                color: 'var(--dt-cyan)'
              }}
            >
              <User className="w-4 h-4" />
            </button>
            {showUserMenu && (
              <UserProfileMenu onClose={() => setShowUserMenu(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}