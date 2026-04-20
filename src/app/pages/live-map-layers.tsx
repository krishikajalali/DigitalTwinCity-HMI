import { Map, Car, Leaf, Users, Zap, Cloud, Flame, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LiveMapLayers() {
  const [layers, setLayers] = useState([
    { id: 'traffic', name: 'Traffic Flow', icon: Car, color: 'var(--dt-cyan)', enabled: true, opacity: 80 },
    { id: 'pollution', name: 'Air Quality', icon: Leaf, color: 'var(--dt-lime)', enabled: true, opacity: 60 },
    { id: 'population', name: 'Population Density', icon: Users, color: 'var(--dt-magenta)', enabled: false, opacity: 70 },
    { id: 'utilities', name: 'Utilities', icon: Zap, color: 'var(--dt-amber)', enabled: false, opacity: 50 },
    { id: 'weather', name: 'Weather', icon: Cloud, color: 'var(--dt-cyan)', enabled: true, opacity: 40 },
    { id: 'heatmap', name: 'Heat Islands', icon: Flame, color: 'var(--dt-status-error)', enabled: false, opacity: 70 },
  ]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const updateOpacity = (id: string, opacity: number) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, opacity } : layer
    ));
  };

  return (
    <div className="h-full flex">
      {/* Map Canvas */}
      <div className="flex-1 relative" style={{ backgroundColor: 'var(--dt-bg-secondary)' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl flex items-center justify-center glow-cyan" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}>
              <Map className="w-16 h-16" style={{ color: 'var(--dt-cyan)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
              Live City Map
            </h2>
            <p style={{ color: 'var(--dt-text-secondary)' }}>
              Interactive map with real-time data layers
            </p>
          </div>
        </div>

        {/* Map Info Overlay */}
        <div className="absolute top-6 left-6 glass-panel rounded-xl p-4">
          <div className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--dt-text-muted)' }}>
            Active Layers
          </div>
          <div className="text-2xl font-bold" style={{ color: 'var(--dt-cyan)' }}>
            {layers.filter(l => l.enabled).length} / {layers.length}
          </div>
        </div>

        {/* Data Legend */}
        <div className="absolute bottom-6 left-6 glass-panel rounded-xl p-4 w-64">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--dt-text-primary)' }}>
            Data Legend
          </h3>
          <div className="space-y-2">
            {layers.filter(l => l.enabled).map((layer) => {
              const Icon = layer.icon;
              return (
                <div key={layer.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: layer.color }} />
                  <span className="text-xs flex-1" style={{ color: 'var(--dt-text-secondary)' }}>
                    {layer.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                    {layer.opacity}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Layer Controls Panel */}
      <div className="w-96 glass-panel border-l overflow-y-auto" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Map Layers
          </h2>

          <div className="space-y-4">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.id}
                  className="p-4 rounded-xl transition-smooth"
                  style={{
                    backgroundColor: layer.enabled ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    border: '1px solid',
                    borderColor: layer.enabled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => toggleLayer(layer.id)}
                      className="flex-shrink-0 p-2 rounded-lg transition-smooth"
                      style={{
                        backgroundColor: layer.enabled ? `${layer.color}20` : 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: layer.enabled ? layer.color : 'var(--dt-text-muted)' }} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm" style={{ color: layer.enabled ? 'var(--dt-text-primary)' : 'var(--dt-text-muted)' }}>
                        {layer.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleLayer(layer.id)}
                      className="flex-shrink-0"
                    >
                      {layer.enabled ? (
                        <Eye className="w-4 h-4" style={{ color: layer.color }} />
                      ) : (
                        <EyeOff className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
                      )}
                    </button>
                  </div>

                  {layer.enabled && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
                        <span>Opacity</span>
                        <span>{layer.opacity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.opacity}
                        onChange={(e) => updateOpacity(layer.id, Number(e.target.value))}
                        className="w-full h-1 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${layer.color} 0%, ${layer.color} ${layer.opacity}%, rgba(255, 255, 255, 0.1) ${layer.opacity}%, rgba(255, 255, 255, 0.1) 100%)`,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}