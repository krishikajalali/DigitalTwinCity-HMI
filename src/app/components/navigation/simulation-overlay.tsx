import { Play, Pause, RotateCcw, Save, Share2, GitCompare } from "lucide-react";
import { useState } from "react";

interface SimulationOverlayProps {
  visible: boolean;
}

export function SimulationOverlay({ visible }: SimulationOverlayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [timeSpeed, setTimeSpeed] = useState<1 | 5 | 10>(1);
  const [compareMode, setCompareMode] = useState(false);

  if (!visible) return null;

  return (
    <div
      className="fixed top-16 left-0 right-0 h-20 glass-panel-solid z-40 border-b-2 animate-fade-in"
      style={{ borderColor: 'var(--dt-purple)' }}
    >
      <div className="h-full flex items-center px-6 gap-6">
        {/* Simulation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-smooth"
            style={{
              backgroundColor: 'rgba(184, 78, 255, 0.2)',
              color: 'var(--dt-purple)',
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-smooth hover:bg-white/5"
            style={{ color: 'var(--dt-text-secondary)' }}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="h-10 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Timeline Slider */}
        <div className="flex-1 max-w-2xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--dt-text-secondary)' }}>
              <span>Scenario Timeline</span>
              <span className="text-glow-purple" style={{ color: 'var(--dt-purple)' }}>
                {Math.round(timeProgress)}% Complete
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={timeProgress}
              onChange={(e) => setTimeProgress(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--dt-purple) 0%, var(--dt-purple) ${timeProgress}%, rgba(255, 255, 255, 0.1) ${timeProgress}%, rgba(255, 255, 255, 0.1) 100%)`,
              }}
            />
          </div>
        </div>

        <div className="h-10 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Time Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
            Speed:
          </span>
          {[1, 5, 10].map((speed) => (
            <button
              key={speed}
              onClick={() => setTimeSpeed(speed as 1 | 5 | 10)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth"
              style={{
                backgroundColor: timeSpeed === speed ? 'rgba(184, 78, 255, 0.2)' : 'transparent',
                color: timeSpeed === speed ? 'var(--dt-purple)' : 'var(--dt-text-secondary)',
                border: '1px solid',
                borderColor: timeSpeed === speed ? 'var(--dt-purple)' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {speed}x
            </button>
          ))}
        </div>

        <div className="h-10 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Compare Toggle */}
        <button
          onClick={() => setCompareMode(!compareMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth"
          style={{
            backgroundColor: compareMode ? 'rgba(184, 78, 255, 0.2)' : 'transparent',
            color: compareMode ? 'var(--dt-purple)' : 'var(--dt-text-secondary)',
            border: '1px solid',
            borderColor: compareMode ? 'var(--dt-purple)' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <GitCompare className="w-4 h-4" />
          Compare with Real Data
        </button>

        <div className="h-10 w-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Save & Share */}
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-smooth hover:bg-white/5"
            style={{ color: 'var(--dt-text-secondary)' }}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            className="px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-smooth"
            style={{
              backgroundColor: 'var(--dt-purple)',
              color: 'white',
            }}
          >
            <Share2 className="w-4 h-4" />
            Share Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
