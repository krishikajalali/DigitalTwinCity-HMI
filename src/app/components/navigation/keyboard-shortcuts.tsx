import { X } from "lucide-react";

interface KeyboardShortcutsProps {
  visible: boolean;
  onClose: () => void;
}

export function KeyboardShortcuts({ visible, onClose }: KeyboardShortcutsProps) {
  if (!visible) return null;

  const shortcuts = [
    { category: 'Navigation', items: [
      { keys: ['⌘', 'K'], description: 'Open command palette' },
      { keys: ['⌘', 'B'], description: 'Toggle sidebar' },
      { keys: ['⌘', 'W'], description: 'Open workspace' },
      { keys: ['⌘', 'S'], description: 'Open saved views' },
    ]},
    { category: 'View', items: [
      { keys: ['1'], description: 'Go to Dashboard' },
      { keys: ['2'], description: 'Go to 3D View' },
      { keys: ['3'], description: 'Go to Map Layers' },
      { keys: ['⌘', 'M'], description: 'Toggle map controls' },
    ]},
    { category: 'Simulation', items: [
      { keys: ['Space'], description: 'Play/Pause simulation' },
      { keys: ['⌘', 'R'], description: 'Reset simulation' },
      { keys: ['⌘', 'E'], description: 'Export scenario' },
    ]},
    { category: 'General', items: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close dialogs' },
      { keys: ['⌘', ','], description: 'Open preferences' },
    ]},
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none">
        <div
          className="glass-panel rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden pointer-events-auto animate-fade-in shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h2 className="text-xl font-bold" style={{ color: 'var(--dt-text-primary)' }}>
              Keyboard Shortcuts
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:bg-white/5"
              style={{ color: 'var(--dt-text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
            <div className="grid grid-cols-2 gap-6">
              {shortcuts.map((section, index) => (
                <div key={index}>
                  <h3
                    className="text-sm uppercase tracking-wide mb-4 font-semibold"
                    style={{ color: 'var(--dt-text-muted)' }}
                  >
                    {section.category}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                          {item.description}
                        </span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, keyIndex) => (
                            <span
                              key={keyIndex}
                              className="px-2 py-1 rounded text-xs font-medium"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'var(--dt-text-primary)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                              }}
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
