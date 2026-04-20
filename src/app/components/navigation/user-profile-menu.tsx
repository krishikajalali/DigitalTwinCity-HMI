import { User, Layout, Bookmark, Settings, Keyboard, HelpCircle, LogOut } from "lucide-react";
import { useEffect, useRef } from "react";

interface UserProfileMenuProps {
  onClose: () => void;
}

export function UserProfileMenu({ onClose }: UserProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { icon: Layout, label: 'My Workspace', shortcut: '⌘W' },
    { icon: Bookmark, label: 'Saved Views', shortcut: '⌘S' },
    { icon: Settings, label: 'Preferences', shortcut: '⌘,' },
    { icon: Keyboard, label: 'Keyboard Shortcuts', shortcut: '⌘K' },
    { icon: HelpCircle, label: 'Help Center', shortcut: null },
    { icon: LogOut, label: 'Log Out', shortcut: null, danger: true },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl animate-fade-in overflow-hidden"
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--dt-bg-tertiary)', color: 'var(--dt-cyan)' }}
          >
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-sm" style={{ color: 'var(--dt-text-primary)' }}>
              Alex Rodriguez
            </p>
            <p className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
              City Administrator
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isDanger = item.danger;
          return (
            <button
              key={index}
              className="w-full px-4 py-2.5 flex items-center gap-3 transition-smooth hover:bg-white/5"
              style={{ color: isDanger ? 'var(--dt-status-error)' : 'var(--dt-text-primary)' }}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left text-sm">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                  {item.shortcut}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
