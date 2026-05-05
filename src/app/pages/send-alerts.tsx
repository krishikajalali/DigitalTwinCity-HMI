import { useState } from "react";
import { Send, AlertCircle, AlertTriangle, Info, MapPin, Clock, Users as UsersIcon, Megaphone, CheckCircle, Radio } from "lucide-react";
import { ConfirmModal } from "../components/ui/confirm-modal";

const ZONES = [
  "All Zones",
  "Downtown Core",
  "Industrial District",
  "North Residential",
  "East Side",
  "West Harbour",
  "South Market",
  "Highway Corridor",
];

type AlertType = "critical" | "warning" | "info";

const ALERT_TYPE_CONFIG: Record<AlertType, { label: string; icon: typeof AlertCircle; color: string; bg: string }> = {
  critical: {
    label: "Critical",
    icon: AlertCircle,
    color: "var(--dt-status-error)",
    bg: "rgba(255, 51, 102, 0.1)",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    color: "var(--dt-status-warning)",
    bg: "rgba(255, 184, 0, 0.1)",
  },
  info: {
    label: "Information",
    icon: Info,
    color: "var(--dt-cyan)",
    bg: "rgba(0, 240, 255, 0.1)",
  },
};

const RECENT_ALERTS = [
  {
    id: 1,
    type: "critical" as AlertType,
    title: "Road Closure – Highway 101",
    zone: "Highway Corridor",
    sentAt: "10 min ago",
    reach: "12,400 citizens",
  },
  {
    id: 2,
    type: "warning" as AlertType,
    title: "Air Quality Degraded",
    zone: "Industrial District",
    sentAt: "45 min ago",
    reach: "8,200 citizens",
  },
  {
    id: 3,
    type: "info" as AlertType,
    title: "Metro Line 3 Delayed",
    zone: "Downtown Core",
    sentAt: "2 hours ago",
    reach: "31,500 citizens",
  },
  {
    id: 4,
    type: "info" as AlertType,
    title: "Scheduled Power Maintenance",
    zone: "North Residential",
    sentAt: "5 hours ago",
    reach: "6,700 citizens",
  },
];

export function SendAlerts() {
  const [alertType, setAlertType] = useState<AlertType>("info");
  const [zone, setZone] = useState(ZONES[0]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sentAlerts, setSentAlerts] = useState(RECENT_ALERTS);

  const typeConfig = ALERT_TYPE_CONFIG[alertType];
  const Icon = typeConfig.icon;

  const handleBroadcast = () => {
    // Mock: prepend to list
    const newAlert = {
      id: Date.now(),
      type: alertType,
      title: title || "(No title)",
      zone,
      sentAt: "Just now",
      reach: zone === "All Zones" ? "82,000+ citizens" : "Zonal estimate",
    };
    setSentAlerts([newAlert, ...sentAlerts]);
    setTitle("");
    setMessage("");
    setConfirmOpen(false);
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--dt-text-primary)" }}>
            Send Alerts
          </h1>
          <p className="text-lg" style={{ color: "var(--dt-text-secondary)" }}>
            Broadcast emergency and informational alerts to citizens
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{ backgroundColor: "rgba(255, 51, 102, 0.1)", border: "1px solid rgba(255,51,102,0.3)" }}
        >
          <Radio className="w-4 h-4 animate-pulse" style={{ color: "var(--dt-status-error)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--dt-status-error)" }}>
            Authority Channel Live
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: "Sent Today", value: "7", color: "var(--dt-cyan)", icon: Megaphone },
          { label: "Total Reach", value: "82K+", color: "var(--dt-purple)", icon: UsersIcon },
          { label: "Active Zones", value: "12", color: "var(--dt-lime)", icon: MapPin },
          { label: "Avg Response", value: "3 min", color: "var(--dt-amber)", icon: Clock },
        ].map((stat) => {
          const I = stat.icon;
          return (
            <div key={stat.label} className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                  <I className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: "var(--dt-text-primary)" }}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: "var(--dt-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Compose Panel */}
        <div className="col-span-3 space-y-6">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6" style={{ color: "var(--dt-text-primary)" }}>
              Compose Alert
            </h2>

            {/* Alert Type */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--dt-text-muted)" }}>
                Alert Type
              </label>
              <div className="flex gap-3">
                {(Object.entries(ALERT_TYPE_CONFIG) as [AlertType, typeof ALERT_TYPE_CONFIG[AlertType]][]).map(
                  ([type, cfg]) => {
                    const I = cfg.icon;
                    const isActive = alertType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setAlertType(type)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-smooth hover:scale-105"
                        style={{
                          backgroundColor: isActive ? cfg.bg : "rgba(255,255,255,0.04)",
                          border: `1px solid ${isActive ? cfg.color + "55" : "rgba(255,255,255,0.08)"}`,
                          color: isActive ? cfg.color : "var(--dt-text-secondary)",
                        }}
                      >
                        <I className="w-4 h-4" />
                        {cfg.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Target Zone */}
            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--dt-text-muted)" }}>
                Target Zone
              </label>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z}
                    onClick={() => setZone(z)}
                    className="px-3 py-1.5 rounded-lg text-sm transition-smooth hover:scale-105"
                    style={{
                      backgroundColor: zone === z ? "rgba(0,240,255,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${zone === z ? "rgba(0,240,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: zone === z ? "var(--dt-cyan)" : "var(--dt-text-secondary)",
                    }}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--dt-text-muted)" }}>
                Alert Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Road Closure on Ring Road"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-smooth"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--dt-text-primary)",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(0,240,255,0.4)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--dt-text-muted)" }}>
                Message Body
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Describe the situation, actions required, and expected duration..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-smooth"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--dt-text-primary)",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(0,240,255,0.4)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>

            {/* Broadcast button */}
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-smooth hover:scale-[1.02]"
              style={{
                backgroundColor: typeConfig.bg,
                border: `1px solid ${typeConfig.color}55`,
                color: typeConfig.color,
              }}
            >
              <Send className="w-4 h-4" />
              Broadcast Alert to{" "}
              {zone === "All Zones" ? "All Citizens" : zone}
            </button>
          </div>
        </div>

        {/* Right column: Preview + Recent */}
        <div className="col-span-2 space-y-6">
          {/* Live Preview */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--dt-text-muted)" }}>
              Citizen Preview
            </h2>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: typeConfig.bg,
                borderLeft: `4px solid ${typeConfig.color}`,
                border: `1px solid ${typeConfig.color}33`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: typeConfig.bg }}>
                  <Icon className="w-5 h-5" style={{ color: typeConfig.color }} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${typeConfig.color}20`, color: typeConfig.color }}
                    >
                      {typeConfig.label}
                    </span>
                    <span className="text-xs" style={{ color: "var(--dt-text-muted)" }}>
                      {zone}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--dt-text-primary)" }}>
                    {title || "Alert title will appear here"}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--dt-text-secondary)" }}>
                    {message || "Alert message will appear here…"}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--dt-text-muted)" }}>
                    <Clock className="w-3 h-3" />
                    Just now · City Authority
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="glass-panel rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--dt-text-muted)" }}>
              Recently Sent
            </h2>
            <div className="space-y-3">
              {sentAlerts.slice(0, 5).map((alert) => {
                const cfg = ALERT_TYPE_CONFIG[alert.type];
                const AI = cfg.icon;
                return (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="p-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
                      <AI className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-xs mb-0.5 truncate" style={{ color: "var(--dt-text-primary)" }}>
                        {alert.title}
                      </div>
                      <div className="text-xs" style={{ color: "var(--dt-text-muted)" }}>
                        {alert.zone} · {alert.sentAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <CheckCircle className="w-3 h-3" style={{ color: "var(--dt-status-success)" }} />
                      <span className="text-xs" style={{ color: "var(--dt-text-muted)" }}>
                        {alert.reach}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        variant="warning"
        title="Broadcast Alert?"
        message={`This will send a ${ALERT_TYPE_CONFIG[alertType].label.toLowerCase()} alert "${title || "(No title)"}" to all citizens in ${zone}. This action cannot be undone.`}
        confirmLabel="Yes, Broadcast"
        cancelLabel="Cancel"
        onConfirm={handleBroadcast}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
