import { AlertTriangle, Info, MessageSquare, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const notifications = [
    {
      id: 1,
      type: 'critical',
      icon: AlertTriangle,
      title: 'Traffic Incident Detected',
      location: 'Downtown District',
      time: '2 min ago',
      action: 'View Details',
    },
    {
      id: 2,
      type: 'warning',
      icon: TrendingUp,
      title: 'Air Quality Index Rising',
      location: 'Industrial Zone',
      time: '15 min ago',
      action: 'View Map',
    },
    {
      id: 3,
      type: 'info',
      icon: Info,
      title: 'System Update Available',
      location: 'Platform',
      time: '1 hour ago',
      action: 'Update Now',
    },
    {
      id: 4,
      type: 'mention',
      icon: MessageSquare,
      title: '@john mentioned you in Traffic Analysis',
      location: 'Collaboration',
      time: '2 hours ago',
      action: 'View Thread',
    },
  ];

  const typeStyles = {
    critical: {
      bg: 'rgba(255, 51, 102, 0.1)',
      border: 'var(--dt-status-error)',
      icon: 'var(--dt-status-error)',
    },
    warning: {
      bg: 'rgba(255, 184, 0, 0.1)',
      border: 'var(--dt-status-warning)',
      icon: 'var(--dt-status-warning)',
    },
    info: {
      bg: 'rgba(0, 240, 255, 0.1)',
      border: 'var(--dt-cyan)',
      icon: 'var(--dt-cyan)',
    },
    mention: {
      bg: 'rgba(184, 78, 255, 0.1)',
      border: 'var(--dt-purple)',
      icon: 'var(--dt-purple)',
    },
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 glass-panel rounded-xl shadow-2xl animate-fade-in overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
          Notifications
        </h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--dt-text-muted)' }}>
          4 unread notifications
        </p>
      </div>

      {/* Notification Sections */}
      <div className="max-h-[500px] overflow-y-auto">
        <div className="px-2 py-2">
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
              Critical Alerts
            </span>
          </div>
          {notifications
            .filter((n) => n.type === 'critical')
            .map((notification) => {
              const Icon = notification.icon;
              const styles = typeStyles[notification.type as keyof typeof typeStyles];
              return (
                <div
                  key={notification.id}
                  className="px-3 py-3 rounded-lg mb-2 transition-smooth hover:bg-white/5 cursor-pointer"
                  style={{ backgroundColor: styles.bg }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: styles.icon }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--dt-text-primary)' }}>
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
                        <MapPin className="w-3 h-3" />
                        <span>{notification.location}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--dt-text-muted)' }} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="px-2 py-2">
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
              System Warnings
            </span>
          </div>
          {notifications
            .filter((n) => n.type === 'warning')
            .map((notification) => {
              const Icon = notification.icon;
              const styles = typeStyles[notification.type as keyof typeof typeStyles];
              return (
                <div
                  key={notification.id}
                  className="px-3 py-3 rounded-lg mb-2 transition-smooth hover:bg-white/5 cursor-pointer"
                  style={{ backgroundColor: styles.bg }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: styles.icon }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--dt-text-primary)' }}>
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
                        <MapPin className="w-3 h-3" />
                        <span>{notification.location}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--dt-text-muted)' }} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="px-2 py-2">
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
              Updates & Insights
            </span>
          </div>
          {notifications
            .filter((n) => n.type === 'info')
            .map((notification) => {
              const Icon = notification.icon;
              const styles = typeStyles[notification.type as keyof typeof typeStyles];
              return (
                <div
                  key={notification.id}
                  className="px-3 py-3 rounded-lg mb-2 transition-smooth hover:bg-white/5 cursor-pointer"
                  style={{ backgroundColor: styles.bg }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: styles.icon }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--dt-text-primary)' }}>
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
                        <span>{notification.location}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--dt-text-muted)' }} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="px-2 py-2">
          <div className="px-2 py-1">
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
              Collaboration Mentions
            </span>
          </div>
          {notifications
            .filter((n) => n.type === 'mention')
            .map((notification) => {
              const Icon = notification.icon;
              const styles = typeStyles[notification.type as keyof typeof typeStyles];
              return (
                <div
                  key={notification.id}
                  className="px-3 py-3 rounded-lg mb-2 transition-smooth hover:bg-white/5 cursor-pointer"
                  style={{ backgroundColor: styles.bg }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: styles.icon }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--dt-text-primary)' }}>
                        {notification.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
                        <span>{notification.location}</span>
                        <span>•</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--dt-text-muted)' }} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <button
          className="w-full text-sm text-center py-2 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: 'var(--dt-cyan)' }}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
}
