interface SystemStatusIndicatorProps {
  status: 'success' | 'warning' | 'error';
}

export function SystemStatusIndicator({ status }: SystemStatusIndicatorProps) {
  const statusConfig = {
    success: {
      color: 'var(--dt-status-success)',
      label: 'All Systems Operational',
    },
    warning: {
      color: 'var(--dt-status-warning)',
      label: 'System Warning',
    },
    error: {
      color: 'var(--dt-status-error)',
      label: 'System Error',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2 h-2 rounded-full animate-pulse-glow"
        style={{ backgroundColor: config.color }}
      />
      <span className="text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
        {config.label}
      </span>
    </div>
  );
}
