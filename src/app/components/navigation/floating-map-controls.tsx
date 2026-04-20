import { Car, Cloud, Zap, Droplets, Users, Sun, Moon, Flame } from "lucide-react";
import { useState } from "react";

interface MapLayer {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
}

export function FloatingMapControls() {
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'traffic', label: 'Traffic', icon: Car, enabled: true },
    { id: 'pollution', label: 'Pollution', icon: Cloud, enabled: false },
    { id: 'weather', label: 'Weather', icon: Droplets, enabled: true },
    { id: 'utilities', label: 'Utilities', icon: Zap, enabled: false },
    { id: 'population', label: 'Population Density', icon: Users, enabled: false },
    { id: 'daynight', label: 'Night/Day Mode', icon: Sun, enabled: true },
    { id: 'heatmap', label: 'Heatmap', icon: Flame, enabled: false },
  ]);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  return (
    <div className="fixed right-6 top-32 glass-panel rounded-2xl p-3 shadow-2xl w-16 z-30">
      <div className="flex flex-col gap-2">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <button
              key={layer.id}
              onClick={() => toggleLayer(layer.id)}
              className="group relative w-10 h-10 rounded-lg transition-smooth flex items-center justify-center"
              style={{
                backgroundColor: layer.enabled ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: layer.enabled ? 'var(--dt-cyan)' : 'var(--dt-text-secondary)',
                boxShadow: layer.enabled ? 'var(--dt-glow-cyan)' : 'none',
              }}
              title={layer.label}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none glass-panel">
                <span className="text-xs font-medium" style={{ color: 'var(--dt-text-primary)' }}>
                  {layer.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
