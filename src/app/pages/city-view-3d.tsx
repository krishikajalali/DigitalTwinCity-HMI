import { FloatingMapControls } from "../components/navigation/floating-map-controls";
import { Box, Maximize2, Minimize2, RotateCw } from "lucide-react";
import { MapboxView } from "../components/ui/mapbox-view";

export function CityView3D() {
  return (
    <div className="relative h-full">
      {/* Floating Map Controls */}
      <FloatingMapControls />

      {/* View Controls */}
      <div className="absolute top-6 left-6 glass-panel rounded-xl p-3 flex gap-2 z-30">
        <button
          className="p-2 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: 'var(--dt-text-secondary)' }}
          title="Reset View"
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: 'var(--dt-text-secondary)' }}
          title="Zoom to Fit"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: 'var(--dt-text-secondary)' }}
          title="Fullscreen"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 glass-panel rounded-xl p-4 w-64 z-30">
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--dt-text-primary)' }}>
          Layer Legend
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dt-status-success)' }} />
            <span className="text-xs" style={{ color: 'var(--dt-text-secondary)' }}>Low Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dt-status-warning)' }} />
            <span className="text-xs" style={{ color: 'var(--dt-text-secondary)' }}>Moderate Traffic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dt-status-error)' }} />
            <span className="text-xs" style={{ color: 'var(--dt-text-secondary)' }}>Heavy Traffic</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <MapboxView viewMode="3d" />
      </div>
    </div>
  );
}
