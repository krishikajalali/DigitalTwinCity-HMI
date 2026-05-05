import { AlertTriangle, Trash2, X } from "lucide-react";

export type ConfirmModalVariant = "danger" | "warning" | "default";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmModalVariant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig: Record<
  ConfirmModalVariant,
  { color: string; bg: string; borderColor: string; icon: typeof Trash2 }
> = {
  danger: {
    color: "var(--dt-status-error)",
    bg: "rgba(255, 51, 102, 0.15)",
    borderColor: "rgba(255, 51, 102, 0.4)",
    icon: Trash2,
  },
  warning: {
    color: "var(--dt-status-warning)",
    bg: "rgba(255, 184, 0, 0.15)",
    borderColor: "rgba(255, 184, 0, 0.4)",
    icon: AlertTriangle,
  },
  default: {
    color: "var(--dt-cyan)",
    bg: "rgba(0, 240, 255, 0.1)",
    borderColor: "rgba(0, 240, 255, 0.3)",
    icon: AlertTriangle,
  },
};

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "fade-in 150ms ease-out",
      }}
      onClick={onCancel}
    >
      {/* Modal card */}
      <div
        className="glass-panel rounded-2xl p-6 w-full max-w-sm mx-4"
        style={{
          border: `1px solid ${cfg.borderColor}`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${cfg.borderColor}`,
          animation: "modal-pop 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg transition-smooth hover:scale-110"
          style={{ color: "var(--dt-text-muted)" }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: cfg.bg }}
          >
            <Icon className="w-5 h-5" style={{ color: cfg.color }} />
          </div>
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--dt-text-primary)" }}
          >
            {title}
          </h3>
        </div>

        {/* Message */}
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: "var(--dt-text-secondary)" }}
        >
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-smooth hover:scale-105"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              color: "var(--dt-text-secondary)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold transition-smooth hover:scale-105"
            style={{
              backgroundColor: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.borderColor}`,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
