import {
  LayoutDashboard,
  Box,
  Map,
  Lightbulb,
  FolderKanban,
  TrendingUp,
  Car,
  Leaf,
  Building2,
  AlertCircle,
  MessageSquare,
  Heart,
  Inbox,
  Database,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Menu,
  Megaphone,
  Shield,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/auth-context";

interface LeftSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function LeftSidebar({ collapsed, onCollapse }: LeftSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Sections visible to both roles
  const commonSections = [
    {
      title: "CITY OVERVIEW",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/", badge: null },
        { icon: Box, label: "3D City View", path: "/3d-view", badge: null },
        { icon: Map, label: "Live Map Layers", path: "/map-layers", badge: null },
      ],
    },
    {
      title: "MONITORING",
      items: [
        { icon: AlertCircle, label: "Emergency & Alerts", path: "/emergency-alerts", badge: 2 },
      ],
    },
    {
      title: "COMMUNITY",
      items: [
        { icon: MessageSquare, label: "Citizen Feedback Map", path: "/citizen-feedback", badge: 15 },
        { icon: Heart, label: "Public Sentiment", path: "/public-sentiment", badge: null },
        { icon: Inbox, label: "Service Requests", path: "/service-requests", badge: 8 },
      ],
    },
  ];

  // Extra sections only for authority role
  const authoritySections = [
    {
      title: "ALERTS",
      items: [
        { icon: Megaphone, label: "Send Alerts", path: "/send-alerts", badge: null, highlight: true },
      ],
    },
    {
      title: "SIMULATION",
      items: [
        { icon: Lightbulb, label: "Policy Simulator", path: "/policy-simulator", badge: null },
        { icon: FolderKanban, label: "Scenario Manager", path: "/scenario-manager", badge: 3 },
        { icon: TrendingUp, label: "Predictive Analytics", path: "/predictive-analytics", badge: null },
      ],
    },
    {
      title: "OPERATIONS",
      items: [
        { icon: Car, label: "Traffic Systems", path: "/traffic-systems", badge: null },
        { icon: Leaf, label: "Environmental Data", path: "/environmental-data", badge: null },
        { icon: Building2, label: "Infrastructure Health", path: "/infrastructure-health", badge: null },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: Database, label: "Data Sources", path: "/data-sources", badge: null },
        { icon: FileText, label: "Reports & Exports", path: "/reports", badge: null },
        { icon: Users, label: "User Roles & Permissions", path: "/user-roles", badge: null },
        { icon: Menu, label: "Menu Navigation", path: "/menus", badge: null },
      ],
    },
  ];

  const menuSections =
    user?.role === "authority"
      ? [...commonSections.slice(0, 1), ...authoritySections, ...commonSections.slice(1)]
      : commonSections;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const roleColor = user?.role === "authority" ? "var(--dt-purple)" : "var(--dt-cyan)";
  const roleBg = user?.role === "authority" ? "rgba(184,78,255,0.12)" : "rgba(0,240,255,0.1)";
  const RoleIcon = user?.role === "authority" ? Shield : Building2;

  return (
    <div
      className="fixed left-0 top-16 bottom-0 glass-panel border-r transition-all duration-300 z-40 flex flex-col"
      style={{
        width: collapsed ? "64px" : "280px",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
        style={{
          backgroundColor: "var(--dt-bg-tertiary)",
          borderColor: "var(--dt-glass-border)",
          border: "1px solid",
        }}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" style={{ color: "var(--dt-cyan)" }} />
        ) : (
          <ChevronLeft className="w-3 h-3" style={{ color: "var(--dt-cyan)" }} />
        )}
      </button>

      {/* Role badge (top of sidebar) */}
      {!collapsed && user && (
        <div
          className="mx-3 mt-4 mb-2 px-3 py-2.5 rounded-xl flex items-center gap-3"
          style={{ backgroundColor: roleBg, border: `1px solid ${roleColor}30` }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: roleColor + "30", color: roleColor }}
          >
            {user.avatar || user.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: "var(--dt-text-primary)" }}>
              {user.name}
            </div>
            <div className="flex items-center gap-1">
              <RoleIcon className="w-3 h-3 flex-shrink-0" style={{ color: roleColor }} />
              <span className="text-xs font-medium capitalize" style={{ color: roleColor }}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      )}
      {collapsed && user && (
        <div className="flex justify-center mt-4 mb-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: roleColor + "20", color: roleColor }}
            title={`${user.name} (${user.role})`}
          >
            {user.avatar || user.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      )}

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto py-2">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {!collapsed && (
              <div className="px-6 mb-1.5">
                <span
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: "var(--dt-text-muted)" }}
                >
                  {section.title}
                </span>
              </div>
            )}
            <div className="px-3">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                const isHighlight = "highlight" in item && item.highlight;
                return (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-smooth
                      ${active ? "active-border-cyan" : "hover:bg-white/5"}
                    `}
                    style={{
                      backgroundColor: active
                        ? "rgba(0, 240, 255, 0.1)"
                        : isHighlight
                        ? "rgba(184,78,255,0.08)"
                        : "transparent",
                      color: active
                        ? "var(--dt-cyan)"
                        : isHighlight
                        ? "var(--dt-purple)"
                        : "var(--dt-text-secondary)",
                      border: isHighlight && !active ? "1px solid rgba(184,78,255,0.2)" : "1px solid transparent",
                    }}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium animate-pulse-glow"
                            style={{
                              backgroundColor: "var(--dt-status-error)",
                              color: "white",
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <span
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium animate-pulse-glow"
                        style={{
                          backgroundColor: "var(--dt-status-error)",
                          color: "white",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout button */}
      <div className="px-3 pb-4 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: "var(--dt-text-secondary)" }}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}