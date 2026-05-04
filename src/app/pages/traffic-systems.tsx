import { useState, useEffect } from "react";
import { TabNavigation } from "../components/navigation/tab-navigation";
import { Car, MapPin, Bus, AlertTriangle, TrendingUp, TrendingDown, Minus, Radio, Clock } from "lucide-react";

// Simulated road segments for the live traffic map
const ROAD_SEGMENTS = [
  // Horizontal roads
  { id: "h1", x1: 40, y1: 80,  x2: 460, y2: 80,  label: "Ring Road North",   flow: 92, speed: 18, type: "highway" },
  { id: "h2", x1: 40, y1: 200, x2: 460, y2: 200, label: "Outer Ring",        flow: 61, speed: 34, type: "arterial" },
  { id: "h3", x1: 80, y1: 310, x2: 420, y2: 310, label: "MG Road",           flow: 45, speed: 42, type: "arterial" },
  { id: "h4", x1: 40, y1: 400, x2: 460, y2: 400, label: "SH-48 South",       flow: 28, speed: 58, type: "highway" },
  // Vertical roads
  { id: "v1", x1: 100, y1: 40, x2: 100, y2: 440, label: "NH-48 West",        flow: 78, speed: 24, type: "highway" },
  { id: "v2", x1: 230, y1: 40, x2: 230, y2: 440, label: "Central Corridor",  flow: 55, speed: 39, type: "arterial" },
  { id: "v3", x1: 360, y1: 40, x2: 360, y2: 440, label: "Eastern Bypass",    flow: 33, speed: 51, type: "arterial" },
  // Diagonal connector
  { id: "d1", x1: 100, y1: 200, x2: 230, y2: 80,  label: "Express Link",    flow: 88, speed: 21, type: "highway" },
  { id: "d2", x1: 230, y1: 310, x2: 360, y2: 400, label: "Harbour Drive",   flow: 42, speed: 46, type: "arterial" },
];

const INCIDENTS = [
  { id: 1, x: 100, y: 80,  type: "accident", label: "Minor accident – NH-48 × Ring Rd", time: "8 min ago" },
  { id: 2, x: 230, y: 200, type: "congestion", label: "Heavy congestion – Central Corridor", time: "3 min ago" },
  { id: 3, x: 360, y: 310, type: "roadwork", label: "Roadworks – Eastern Bypass", time: "Active" },
];

const SPEED_CAMERAS = [
  { x: 160, y: 80 }, { x: 340, y: 80 }, { x: 100, y: 310 },
  { x: 360, y: 200 }, { x: 230, y: 400 },
];

function getFlowColor(flow: number) {
  if (flow >= 80) return "#ff3366"; // red - congested
  if (flow >= 55) return "#ffb800"; // amber - moderate
  return "#00ff88";                  // green - free flow
}

function getFlowLabel(flow: number) {
  if (flow >= 80) return "Congested";
  if (flow >= 55) return "Moderate";
  return "Free Flow";
}

function LiveTrafficMap() {
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  // Animate ticker for pulsing flow
  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 80);
    return () => clearInterval(t);
  }, []);

  const selectedSeg = ROAD_SEGMENTS.find((s) => s.id === selected);

  return (
    <div className="glass-panel rounded-xl overflow-hidden" style={{ height: "480px", display: "flex" }}>
      {/* SVG Map */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live badge */}
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: "rgba(255,51,102,0.15)", border: "1px solid rgba(255,51,102,0.4)", color: "var(--dt-status-error)" }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--dt-status-error)" }} />
          Live
        </div>

        <svg width="100%" height="100%" viewBox="0 0 500 480" style={{ display: "block" }}>
          {/* City block background grid */}
          <defs>
            <pattern id="cityGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="rgba(255,255,255,0.01)" />
              <rect width="38" height="38" x="1" y="1" fill="rgba(255,255,255,0.02)" rx="1" />
            </pattern>
            {/* Animated dash for flow */}
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
          <rect width="500" height="480" fill="url(#cityGrid)" />

          {/* Road segments */}
          {ROAD_SEGMENTS.map((seg) => {
            const color = getFlowColor(seg.flow);
            const isSelected = selected === seg.id;
            const dashLen = seg.type === "highway" ? 14 : 8;
            const gapLen = seg.type === "highway" ? 8 : 6;
            const strokeW = seg.type === "highway" ? 7 : 5;
            // Animated offset
            const offset = -(tick * (seg.flow > 60 ? 0.4 : 0.9)) % (dashLen + gapLen);

            return (
              <g key={seg.id} style={{ cursor: "pointer" }} onClick={() => setSelected(isSelected ? null : seg.id)}>
                {/* Road base (dark track) */}
                <line
                  x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={strokeW + 4}
                />
                {/* Road surface */}
                <line
                  x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={strokeW}
                />
                {/* Flow animation */}
                <line
                  x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                  stroke={color}
                  strokeWidth={strokeW - 2}
                  strokeOpacity={isSelected ? 1 : 0.75}
                  strokeDasharray={`${dashLen} ${gapLen}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ filter: isSelected ? `drop-shadow(0 0 6px ${color})` : undefined }}
                />
                {/* Hit area */}
                <line
                  x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                  stroke="transparent"
                  strokeWidth={20}
                />
              </g>
            );
          })}

          {/* Speed cameras */}
          {SPEED_CAMERAS.map((cam, i) => (
            <rect
              key={i}
              x={cam.x - 4} y={cam.y - 4}
              width={8} height={8}
              rx={1}
              fill="rgba(0,240,255,0.7)"
              stroke="rgba(0,240,255,0.4)"
              strokeWidth={1}
            />
          ))}

          {/* Incidents */}
          {INCIDENTS.map((inc) => {
            const pulseR = 8 + Math.sin(tick * 0.15 + inc.id) * 3;
            const incColor = inc.type === "accident" ? "#ff3366" : inc.type === "congestion" ? "#ffb800" : "#b4ff39";
            return (
              <g key={inc.id}>
                <circle cx={inc.x} cy={inc.y} r={pulseR} fill={incColor} fillOpacity={0.15} />
                <circle cx={inc.x} cy={inc.y} r={7} fill={incColor} fillOpacity={0.9} />
                <text x={inc.x} y={inc.y + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                  {inc.type === "accident" ? "!" : inc.type === "congestion" ? "⚡" : "⚠"}
                </text>
              </g>
            );
          })}

          {/* Intersection nodes */}
          {[
            [100, 80], [230, 80], [360, 80],
            [100, 200], [230, 200], [360, 200],
            [100, 310], [230, 310], [360, 310],
            [100, 400], [230, 400], [360, 400],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
          ))}
        </svg>

        {/* Legend */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-4 px-3 py-2 rounded-xl text-xs"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        >
          {[
            { color: "#00ff88", label: "Free Flow" },
            { color: "#ffb800", label: "Moderate" },
            { color: "#ff3366", label: "Congested" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-6 h-1.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span style={{ color: "var(--dt-text-muted)" }}>{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "rgba(0,240,255,0.7)" }} />
            <span style={{ color: "var(--dt-text-muted)" }}>Speed Cam</span>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div
        className="flex flex-col"
        style={{ width: "220px", borderLeft: "1px solid rgba(255,255,255,0.08)", overflowY: "auto" }}
      >
        {selectedSeg ? (
          <div className="p-4 flex-1">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
              Selected Road
            </div>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--dt-text-primary)" }}>{selectedSeg.label}</h3>
            <div className="space-y-3">
              {[
                { label: "Avg Speed", value: `${selectedSeg.speed} km/h`, icon: Car },
                { label: "Traffic Load", value: `${selectedSeg.flow}%`, icon: TrendingUp },
                { label: "Status", value: getFlowLabel(selectedSeg.flow), icon: Radio },
                { label: "Type", value: selectedSeg.type === "highway" ? "Highway" : "Arterial", icon: MapPin },
              ].map((row) => {
                const I = row.icon;
                return (
                  <div key={row.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5" style={{ color: "var(--dt-text-secondary)" }}>
                      <I className="w-3.5 h-3.5" />
                      {row.label}
                    </div>
                    <span
                      className="font-semibold"
                      style={{
                        color: row.label === "Status"
                          ? getFlowColor(selectedSeg.flow)
                          : "var(--dt-text-primary)",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
              Active Incidents
            </div>
            <div className="space-y-3">
              {INCIDENTS.map((inc) => {
                const incColor = inc.type === "accident" ? "var(--dt-status-error)" : inc.type === "congestion" ? "var(--dt-status-warning)" : "var(--dt-lime)";
                return (
                  <div
                    key={inc.id}
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: incColor }} />
                      <span className="text-xs font-medium capitalize" style={{ color: incColor }}>
                        {inc.type}
                      </span>
                    </div>
                    <p className="text-xs leading-snug mb-1" style={{ color: "var(--dt-text-secondary)" }}>{inc.label}</p>
                    <div className="flex items-center gap-1 text-xs" style={{ color: "var(--dt-text-muted)" }}>
                      <Clock className="w-3 h-3" />
                      {inc.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Route speeds */}
        <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
            Speed Index
          </div>
          {ROAD_SEGMENTS.slice(0, 5).map((seg) => (
            <div key={seg.id} className="flex items-center gap-2 mb-2">
              <div className="flex-1 text-xs truncate" style={{ color: "var(--dt-text-secondary)" }}>
                {seg.label.split(" ")[0]} {seg.label.split(" ")[1]}
              </div>
              <div className="flex items-center gap-1">
                {seg.speed < 30 ? (
                  <TrendingDown className="w-3 h-3" style={{ color: "var(--dt-status-error)" }} />
                ) : seg.speed < 50 ? (
                  <Minus className="w-3 h-3" style={{ color: "var(--dt-status-warning)" }} />
                ) : (
                  <TrendingUp className="w-3 h-3" style={{ color: "var(--dt-status-success)" }} />
                )}
                <span className="text-xs font-semibold" style={{ color: getFlowColor(seg.flow) }}>
                  {seg.speed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrafficSystems() {
  const [activeTab, setActiveTab] = useState("live-traffic");

  const tabs = [
    { id: "live-traffic",     label: "Live Traffic",       icon: Car },
    { id: "congestion",       label: "Congestion Heatmap", icon: MapPin },
    { id: "public-transport", label: "Public Transport",   icon: Bus },
    { id: "accidents",        label: "Accident Analytics", icon: AlertTriangle },
  ];

  // Stats that update slightly each render for the live feel
  const stats = [
    { label: "Average Speed",    value: "32 km/h",  delta: "↑ 8% vs yesterday",  color: "var(--dt-cyan)",          icon: Car,           deltaColor: "var(--dt-status-success)" },
    { label: "Congested Routes", value: "14",       delta: "↑ 2 from last hour",  color: "var(--dt-amber)",         icon: AlertTriangle, deltaColor: "var(--dt-status-warning)" },
    { label: "Active Buses",     value: "287",      delta: "98% on schedule",     color: "var(--dt-lime)",          icon: Bus,           deltaColor: "var(--dt-status-success)" },
    { label: "Avg Travel Time",  value: "+4 min",   delta: "Slower than usual",   color: "var(--dt-status-error)",  icon: Clock,         deltaColor: "var(--dt-status-warning)" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--dt-text-primary)" }}>Traffic Systems</h1>
        <p style={{ color: "var(--dt-text-secondary)" }}>Real-time traffic monitoring and analysis</p>
      </div>

      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "live-traffic" && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-panel rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-wide" style={{ color: "var(--dt-text-muted)" }}>
                        {stat.label}
                      </span>
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: "var(--dt-text-primary)" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: stat.deltaColor }}>{stat.delta}</div>
                  </div>
                );
              })}
            </div>

            {/* Live map */}
            <LiveTrafficMap />
          </div>
        )}

        {activeTab === "congestion" && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--dt-amber)" }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--dt-text-primary)" }}>Congestion Heatmap</h3>
              <p style={{ color: "var(--dt-text-secondary)" }}>Traffic density and congestion hotspots</p>
            </div>
          </div>
        )}

        {activeTab === "public-transport" && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <Bus className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--dt-lime)" }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--dt-text-primary)" }}>Public Transport</h3>
              <p style={{ color: "var(--dt-text-secondary)" }}>Real-time bus and transit tracking</p>
            </div>
          </div>
        )}

        {activeTab === "accidents" && (
          <div className="glass-panel rounded-xl p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--dt-status-error)" }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--dt-text-primary)" }}>Accident Analytics</h3>
              <p style={{ color: "var(--dt-text-secondary)" }}>Historical accident data and predictions</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
