import { useState, useEffect } from "react";
import { TabNavigation } from "../components/navigation/tab-navigation";
import { Zap, Droplets, Construction, Trash2, AlertTriangle, CheckCircle, Activity, Radio } from "lucide-react";

// Power grid nodes
type NodeType = "plant" | "substation" | "district";
interface GridNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type: NodeType;
  load: number;       // 0-100
  status: "online" | "warning" | "offline";
  capacity: string;
}

const GRID_NODES: GridNode[] = [
  // Generation plants (top row)
  { id: "p1", x: 100, y: 60,  label: "Hydro Plant A",   type: "plant",      load: 78, status: "online",  capacity: "450 MW" },
  { id: "p2", x: 300, y: 60,  label: "Solar Farm B",    type: "plant",      load: 62, status: "online",  capacity: "280 MW" },
  { id: "p3", x: 500, y: 60,  label: "Gas Turbine C",   type: "plant",      load: 91, status: "warning", capacity: "600 MW" },
  // Substations (middle row)
  { id: "s1", x: 80,  y: 200, label: "Sub-W1",          type: "substation", load: 84, status: "online",  capacity: "200 MW" },
  { id: "s2", x: 220, y: 200, label: "Sub-C1",          type: "substation", load: 55, status: "online",  capacity: "180 MW" },
  { id: "s3", x: 360, y: 200, label: "Sub-C2",          type: "substation", load: 72, status: "online",  capacity: "220 MW" },
  { id: "s4", x: 500, y: 200, label: "Sub-E1",          type: "substation", load: 33, status: "warning", capacity: "150 MW" },
  // Distribution (lower row)
  { id: "d1", x: 60,  y: 340, label: "West Zone",       type: "district",   load: 88, status: "online",  capacity: "80 MW" },
  { id: "d2", x: 160, y: 340, label: "North Res.",      type: "district",   load: 61, status: "online",  capacity: "60 MW" },
  { id: "d3", x: 260, y: 340, label: "Downtown",        type: "district",   load: 95, status: "warning", capacity: "120 MW" },
  { id: "d4", x: 360, y: 340, label: "Industrial",      type: "district",   load: 79, status: "online",  capacity: "100 MW" },
  { id: "d5", x: 460, y: 340, label: "East Side",       type: "district",   load: 42, status: "offline", capacity: "70 MW" },
  { id: "d6", x: 560, y: 340, label: "South Market",    type: "district",   load: 56, status: "online",  capacity: "55 MW" },
];

// Transmission lines
const GRID_LINES = [
  // Plants → Substations
  { from: "p1", to: "s1", voltage: "220kV" },
  { from: "p1", to: "s2", voltage: "220kV" },
  { from: "p2", to: "s2", voltage: "132kV" },
  { from: "p2", to: "s3", voltage: "132kV" },
  { from: "p3", to: "s3", voltage: "220kV" },
  { from: "p3", to: "s4", voltage: "220kV" },
  // Substations → Districts
  { from: "s1", to: "d1", voltage: "33kV" },
  { from: "s1", to: "d2", voltage: "33kV" },
  { from: "s2", to: "d2", voltage: "33kV" },
  { from: "s2", to: "d3", voltage: "33kV" },
  { from: "s3", to: "d3", voltage: "33kV" },
  { from: "s3", to: "d4", voltage: "33kV" },
  { from: "s4", to: "d5", voltage: "33kV" },
  { from: "s4", to: "d6", voltage: "33kV" },
  // Inter-substation tie lines
  { from: "s1", to: "s2", voltage: "132kV" },
  { from: "s2", to: "s3", voltage: "132kV" },
  { from: "s3", to: "s4", voltage: "132kV" },
];

function nodePos(id: string) {
  return GRID_NODES.find((n) => n.id === id)!;
}

function statusColor(status: GridNode["status"]) {
  if (status === "online") return "var(--dt-status-success)";
  if (status === "warning") return "var(--dt-status-warning)";
  return "var(--dt-status-error)";
}

function loadColor(load: number) {
  if (load >= 90) return "#ff3366";
  if (load >= 70) return "#ffb800";
  return "#00ff88";
}

function nodeSize(type: NodeType) {
  if (type === "plant") return 18;
  if (type === "substation") return 13;
  return 10;
}

function nodeShape(type: NodeType, x: number, y: number, r: number, color: string, pulse: number, isSelected: boolean) {
  if (type === "plant") {
    // Hexagon for plants
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
    }).join(" ");
    return (
      <>
        <polygon
          points={pts}
          fill={`${color}20`}
          stroke={color}
          strokeWidth={isSelected ? 2.5 : 1.5}
          style={{ filter: `drop-shadow(0 0 ${pulse * 2}px ${color})` }}
        />
        <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">⚡</text>
      </>
    );
  }
  if (type === "substation") {
    return (
      <>
        <rect
          x={x - r} y={y - r} width={r * 2} height={r * 2}
          rx={3}
          fill={`${color}20`}
          stroke={color}
          strokeWidth={isSelected ? 2.5 : 1.5}
          style={{ filter: isSelected ? `drop-shadow(0 0 8px ${color})` : undefined }}
        />
        <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">S</text>
      </>
    );
  }
  // District = circle
  return (
    <>
      <circle
        cx={x} cy={y} r={r}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={isSelected ? 2.5 : 1.5}
        style={{ filter: isSelected ? `drop-shadow(0 0 8px ${color})` : undefined }}
      />
    </>
  );
}

function PowerGridMap() {
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 120);
    return () => clearInterval(t);
  }, []);

  const pulse = Math.sin(tick * 0.1) * 0.5 + 0.8;
  const selectedNode = GRID_NODES.find((n) => n.id === selected);

  return (
    <div className="glass-panel rounded-xl overflow-hidden" style={{ height: "440px", display: "flex" }}>
      {/* SVG Grid */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* API Source badge */}
        <div
          className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.3)", color: "var(--dt-cyan)" }}
        >
          <Radio className="w-3 h-3 animate-pulse" />
          SCADA Live Feed
        </div>

        <svg width="100%" height="100%" viewBox="0 0 640 420" style={{ display: "block" }}>
          <defs>
            <marker id="arrowG" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0,0 5,2.5 0,5" fill="rgba(0,255,136,0.6)" />
            </marker>
            <marker id="arrowA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0,0 5,2.5 0,5" fill="rgba(255,184,0,0.6)" />
            </marker>
            <marker id="arrowR" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
              <polygon points="0,0 5,2.5 0,5" fill="rgba(255,51,102,0.6)" />
            </marker>
          </defs>

          {/* Background */}
          <rect width="640" height="420" fill="rgba(0,0,0,0)" />

          {/* Zone bands */}
          <rect x="0" y="30" width="640" height="70" fill="rgba(184,78,255,0.03)" rx="0" />
          <text x="620" y="72" textAnchor="end" fontSize="8" fill="rgba(184,78,255,0.5)" fontWeight="bold">GENERATION</text>
          <rect x="0" y="165" width="640" height="80" fill="rgba(0,240,255,0.03)" />
          <text x="620" y="210" textAnchor="end" fontSize="8" fill="rgba(0,240,255,0.5)" fontWeight="bold">TRANSMISSION</text>
          <rect x="0" y="305" width="640" height="80" fill="rgba(180,255,57,0.03)" />
          <text x="620" y="350" textAnchor="end" fontSize="8" fill="rgba(180,255,57,0.5)" fontWeight="bold">DISTRIBUTION</text>

          {/* Transmission lines */}
          {GRID_LINES.map((line, i) => {
            const a = nodePos(line.from);
            const b = nodePos(line.to);
            const aStatus = a.status;
            const bStatus = b.status;
            const isOffline = aStatus === "offline" || bStatus === "offline";
            const isWarning = !isOffline && (aStatus === "warning" || bStatus === "warning");
            const lineColor = isOffline ? "rgba(255,51,102,0.3)" : isWarning ? "rgba(255,184,0,0.45)" : "rgba(0,255,136,0.35)";
            const flowDash = isOffline ? "4 8" : `12 6`;
            const flowOffset = isOffline ? 0 : -(tick * 0.6) % 18;
            const markerEnd = isOffline ? "url(#arrowR)" : isWarning ? "url(#arrowA)" : "url(#arrowG)";
            const isHV = line.voltage === "220kV";

            return (
              <g key={i}>
                {/* Base line */}
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={isHV ? 4 : 2.5}
                />
                {/* Animated flow */}
                {!isOffline && (
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={lineColor}
                    strokeWidth={isHV ? 3 : 2}
                    strokeDasharray={flowDash}
                    strokeDashoffset={flowOffset}
                    markerEnd={markerEnd}
                  />
                )}
                {isOffline && (
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={lineColor}
                    strokeWidth={2}
                    strokeDasharray="4 8"
                  />
                )}
              </g>
            );
          })}

          {/* Load arcs (behind nodes) */}
          {GRID_NODES.map((node) => {
            const r = nodeSize(node.type) + 6;
            const circumference = 2 * Math.PI * r;
            const arc = (node.load / 100) * circumference;
            return (
              <circle
                key={`arc-${node.id}`}
                cx={node.x} cy={node.y} r={r}
                fill="none"
                stroke={loadColor(node.load)}
                strokeWidth={2}
                strokeOpacity={0.5}
                strokeDasharray={`${arc} ${circumference - arc}`}
                strokeDashoffset={circumference / 4}
                strokeLinecap="round"
              />
            );
          })}

          {/* Nodes */}
          {GRID_NODES.map((node) => {
            const color = statusColor(node.status);
            const r = nodeSize(node.type);
            const isSelected = selected === node.id;
            return (
              <g
                key={node.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(isSelected ? null : node.id)}
              >
                {/* Pulse ring for warnings */}
                {node.status !== "online" && (
                  <circle
                    cx={node.x} cy={node.y}
                    r={r + 6 + pulse * 4}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                    strokeOpacity={0.3 * pulse}
                  />
                )}
                {nodeShape(node.type, node.x, node.y, r, color, pulse, isSelected)}
                {/* Label below */}
                <text
                  x={node.x} y={node.y + r + 13}
                  textAnchor="middle" fontSize="8"
                  fill={isSelected ? color : "rgba(255,255,255,0.6)"}
                  fontWeight={isSelected ? "bold" : "normal"}
                >
                  {node.label}
                </text>
                {/* Load % next to node */}
                <text
                  x={node.x + r + 3} y={node.y - r + 2}
                  textAnchor="start" fontSize="7"
                  fill={loadColor(node.load)}
                  fontWeight="bold"
                >
                  {node.load}%
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-4 px-3 py-2 rounded-xl text-xs"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        >
          {[
            { shape: "hex", color: "rgba(184,78,255,0.8)", label: "Power Plant" },
            { shape: "sq",  color: "rgba(0,240,255,0.8)",  label: "Substation" },
            { shape: "cir", color: "rgba(180,255,57,0.8)", label: "District" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
              <span style={{ color: "var(--dt-text-muted)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Side panel */}
      <div
        className="flex flex-col"
        style={{ width: "210px", borderLeft: "1px solid rgba(255,255,255,0.08)", overflowY: "auto" }}
      >
        {selectedNode ? (
          <div className="p-4 flex-1">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
              {selectedNode.type === "plant" ? "Generation Plant" : selectedNode.type === "substation" ? "Substation" : "Distribution Zone"}
            </div>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--dt-text-primary)" }}>{selectedNode.label}</h3>

            {/* Load bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "var(--dt-text-muted)" }}>Load</span>
                <span style={{ color: loadColor(selectedNode.load), fontWeight: "bold" }}>{selectedNode.load}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedNode.load}%`, backgroundColor: loadColor(selectedNode.load) }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Capacity",  value: selectedNode.capacity },
                { label: "Status",    value: selectedNode.status.charAt(0).toUpperCase() + selectedNode.status.slice(1) },
                { label: "API Source", value: "SCADA v2.4" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--dt-text-secondary)" }}>{row.label}</span>
                  <span
                    style={{
                      color: row.label === "Status" ? statusColor(selectedNode.status) : "var(--dt-text-primary)",
                      fontWeight: "600",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 flex-1">
            <div className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
              Grid Summary
            </div>
            <div className="space-y-2">
              {[
                { label: "Plants Online",   value: `${GRID_NODES.filter((n) => n.type === "plant" && n.status !== "offline").length}/3`, ok: true },
                { label: "Substations",     value: `${GRID_NODES.filter((n) => n.type === "substation" && n.status === "online").length}/4 healthy`, ok: true },
                { label: "Warnings",        value: `${GRID_NODES.filter((n) => n.status === "warning").length} nodes`, ok: false },
                { label: "Offline Zones",   value: `${GRID_NODES.filter((n) => n.type === "district" && n.status === "offline").length} zone`, ok: false },
                { label: "Avg Grid Load",   value: `${Math.round(GRID_NODES.reduce((a, n) => a + n.load, 0) / GRID_NODES.length)}%`, ok: true },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-xs py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span style={{ color: "var(--dt-text-secondary)" }}>{row.label}</span>
                  <span style={{ color: row.ok ? "var(--dt-status-success)" : "var(--dt-status-warning)", fontWeight: "600" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Node list */}
        <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "var(--dt-text-muted)" }}>
            Status Board
          </div>
          {GRID_NODES.filter((n) => n.status !== "online").map((node) => {
            const col = statusColor(node.status);
            const SI = node.status === "warning" ? AlertTriangle : Activity;
            return (
              <div
                key={node.id}
                className="flex items-center gap-2 mb-2 cursor-pointer"
                onClick={() => setSelected(node.id === selected ? null : node.id)}
              >
                <SI className="w-3.5 h-3.5 flex-shrink-0" style={{ color: col }} />
                <div>
                  <div className="text-xs font-medium" style={{ color: "var(--dt-text-primary)" }}>{node.label}</div>
                  <div className="text-xs capitalize" style={{ color: col }}>{node.status}</div>
                </div>
              </div>
            );
          })}
          {GRID_NODES.filter((n) => n.status !== "online").length === 0 && (
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--dt-status-success)" }}>
              <CheckCircle className="w-3.5 h-3.5" /> All nodes healthy
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function InfrastructureHealth() {
  const [activeTab, setActiveTab] = useState("power-grid");

  const tabs = [
    { id: "power-grid",   label: "Power Grid",      icon: Zap },
    { id: "water-supply", label: "Water Supply",    icon: Droplets },
    { id: "roads",        label: "Roads & Bridges", icon: Construction },
    { id: "waste",        label: "Waste Management",icon: Trash2 },
  ];

  const infrastructureMetrics = {
    "power-grid": [
      { label: "Grid Capacity",       value: "94%", status: "success" },
      { label: "Active Substations",  value: "48",  status: "success" },
      { label: "Power Outages",       value: "2",   status: "warning" },
      { label: "Maintenance Due",     value: "5",   status: "warning" },
    ],
    "water-supply": [
      { label: "System Pressure",  value: "96%", status: "success" },
      { label: "Treatment Plants", value: "12",  status: "success" },
      { label: "Leak Alerts",      value: "3",   status: "warning" },
      { label: "Water Quality",    value: "98%", status: "success" },
    ],
    "roads": [
      { label: "Road Conditions",     value: "87%", status: "success" },
      { label: "Bridges Monitored",   value: "156", status: "success" },
      { label: "Repair Needed",       value: "12",  status: "warning" },
      { label: "Under Construction",  value: "8",   status: "info" },
    ],
    "waste": [
      { label: "Collection Rate",  value: "99%", status: "success" },
      { label: "Active Trucks",    value: "124", status: "success" },
      { label: "Full Bins",        value: "18",  status: "warning" },
      { label: "Recycling Rate",   value: "72%", status: "success" },
    ],
  };

  const metrics = infrastructureMetrics[activeTab as keyof typeof infrastructureMetrics];

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--dt-text-primary)" }}>Infrastructure Health</h1>
        <p style={{ color: "var(--dt-text-secondary)" }}>Monitor critical infrastructure systems</p>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="flex-1 p-6 overflow-auto">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="glass-panel rounded-xl p-6">
              <div className="text-sm uppercase tracking-wide mb-3" style={{ color: "var(--dt-text-muted)" }}>
                {metric.label}
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: "var(--dt-text-primary)" }}>
                {metric.value}
              </div>
              <div
                className="text-xs uppercase tracking-wide"
                style={{
                  color:
                    metric.status === "success" ? "var(--dt-status-success)" :
                    metric.status === "warning" ? "var(--dt-status-warning)" :
                    "var(--dt-cyan)",
                }}
              >
                {metric.status === "success" ? "Healthy" : metric.status === "warning" ? "Needs Attention" : "Normal"}
              </div>
            </div>
          ))}
        </div>

        {/* Power grid gets the map, others get placeholder */}
        {activeTab === "power-grid" ? (
          <PowerGridMap />
        ) : (
          <div className="glass-panel rounded-xl p-6 h-72 flex items-center justify-center">
            <div className="text-center">
              {(() => {
                const Icon = tabs.find((t) => t.id === activeTab)!.icon;
                return <Icon className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--dt-cyan)" }} />;
              })()}
              <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--dt-text-primary)" }}>
                {tabs.find((t) => t.id === activeTab)?.label} Map
              </h3>
              <p style={{ color: "var(--dt-text-secondary)" }}>
                Infrastructure distribution and status visualization
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}