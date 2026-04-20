import { Zap } from "lucide-react";

interface SimulationModeToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function SimulationModeToggle({ enabled, onChange }: SimulationModeToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-smooth"
      style={{
        backgroundColor: enabled ? 'rgba(184, 78, 255, 0.1)' : 'transparent',
        borderColor: enabled ? 'var(--dt-purple)' : 'rgba(255, 255, 255, 0.2)',
        color: enabled ? 'var(--dt-purple)' : 'var(--dt-text-secondary)',
      }}
    >
      <Zap className="w-4 h-4" />
      <span className="text-xs font-medium uppercase tracking-wide">
        {enabled ? 'Simulation' : 'Live Mode'}
      </span>
    </button>
  );
}
