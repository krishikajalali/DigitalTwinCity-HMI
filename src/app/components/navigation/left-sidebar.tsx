import { useState } from "react";
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
  Menu
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface LeftSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function LeftSidebar({ collapsed, onCollapse }: LeftSidebarProps) {
  const location = useLocation();

  const menuSections = [
    {
      title: 'CITY OVERVIEW',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', badge: null },
        { icon: Box, label: '3D City View', path: '/3d-view', badge: null },
        { icon: Map, label: 'Live Map Layers', path: '/map-layers', badge: null },
      ],
    },
    {
      title: 'SIMULATION',
      items: [
        { icon: Lightbulb, label: 'Policy Simulator', path: '/policy-simulator', badge: null },
        { icon: FolderKanban, label: 'Scenario Manager', path: '/scenario-manager', badge: 3 },
        { icon: TrendingUp, label: 'Predictive Analytics', path: '/predictive-analytics', badge: null },
      ],
    },
    {
      title: 'MONITORING',
      items: [
        { icon: Car, label: 'Traffic Systems', path: '/traffic-systems', badge: null },
        { icon: Leaf, label: 'Environmental Data', path: '/environmental-data', badge: null },
        { icon: Building2, label: 'Infrastructure Health', path: '/infrastructure-health', badge: null },
        { icon: AlertCircle, label: 'Emergency & Alerts', path: '/emergency-alerts', badge: 2 },
      ],
    },
    {
      title: 'COMMUNITY',
      items: [
        { icon: MessageSquare, label: 'Citizen Feedback Map', path: '/citizen-feedback', badge: 15 },
        { icon: Heart, label: 'Public Sentiment', path: '/public-sentiment', badge: null },
        { icon: Inbox, label: 'Service Requests', path: '/service-requests', badge: 8 },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { icon: Database, label: 'Data Sources', path: '/data-sources', badge: null },
        { icon: FileText, label: 'Reports & Exports', path: '/reports', badge: null },
        { icon: Users, label: 'User Roles & Permissions', path: '/user-roles', badge: null },
        { icon: Menu, label: 'Menu Navigation', path: '/menus', badge: null },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <div
      className="fixed left-0 top-16 bottom-0 glass-panel border-r transition-all duration-300 z-40 flex flex-col"
      style={{
        width: collapsed ? '64px' : '280px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full flex items-center justify-center transition-smooth hover:scale-110"
        style={{
          backgroundColor: 'var(--dt-bg-tertiary)',
          borderColor: 'var(--dt-glass-border)',
          border: '1px solid',
        }}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" style={{ color: 'var(--dt-cyan)' }} />
        ) : (
          <ChevronLeft className="w-3 h-3" style={{ color: 'var(--dt-cyan)' }} />
        )}
      </button>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto py-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            {!collapsed && (
              <div className="px-6 mb-2">
                <span
                  className="text-xs uppercase tracking-wider font-medium"
                  style={{ color: 'var(--dt-text-muted)' }}
                >
                  {section.title}
                </span>
              </div>
            )}
            <div className="px-3">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-smooth
                      ${active ? 'active-border-cyan' : 'hover:bg-white/5'}
                    `}
                    style={{
                      backgroundColor: active ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                      color: active ? 'var(--dt-cyan)' : 'var(--dt-text-secondary)',
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
                              backgroundColor: 'var(--dt-status-error)',
                              color: 'white',
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
                          backgroundColor: 'var(--dt-status-error)',
                          color: 'white',
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
    </div>
  );
}