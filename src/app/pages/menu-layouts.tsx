import { useState } from "react";
import {
  Menu,
  ChevronDown,
  Home,
  Settings,
  Database,
  Users,
  FileText,
  Bell,
  Search,
  Maximize2,
  Minimize2,
  X,
  Minus,
  MoreHorizontal,
  ChevronRight,
  Folder,
  Save,
  Download,
  Upload,
  Edit,
  Trash2,
  Copy,
  Share2,
  Layout,
  Grid,
  List,
  Leaf,
  AlertCircle
} from "lucide-react";

export function MenuLayouts() {
  const [activeWindow, setActiveWindow] = useState<string>("window-1");
  const [activeMenu, setActiveMenu] = useState<string>("file");
  const [activeView, setActiveView] = useState<string>("grid");
  const [windowMaximized, setWindowMaximized] = useState<string | null>(null);
  const [contextMenuOpen, setContextMenuOpen] = useState<string | null>(null);

  // Primary menu items - Digital Twin City specific
  const primaryMenus = [
    { id: 'city', label: 'City Data', icon: Database },
    { id: 'model', label: '3D Models', icon: Layout },
    { id: 'simulation', label: 'Simulation', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'export', label: 'Export', icon: Download },
  ];

  // Secondary menu structure - Digital Twin City specific
  const secondaryMenus: Record<string, Array<{ label: string; icon: any; shortcut?: string; divider?: boolean }>> = {
    city: [
      { label: 'Import City Data', icon: Upload, shortcut: 'Ctrl+I' },
      { label: 'Connect Live Sensors', icon: Database, shortcut: 'Ctrl+L' },
      { label: 'Update Traffic Data', icon: Download, shortcut: 'Ctrl+T' },
      { label: 'Sync Weather API', icon: Database, divider: true },
      { label: 'Data Source Settings', icon: Settings, shortcut: 'Ctrl+,' },
      { label: 'Clear Cache', icon: Trash2 },
    ],
    model: [
      { label: 'Upload 3D Model', icon: Upload, shortcut: 'Ctrl+U' },
      { label: 'Import Building Data', icon: Folder, shortcut: 'Ctrl+B' },
      { label: 'Load Terrain Map', icon: Layout },
      { label: 'Edit Model Properties', icon: Edit, divider: true },
      { label: 'Optimize Geometry', icon: Settings, shortcut: 'Ctrl+O' },
      { label: 'Remove Model', icon: Trash2 },
    ],
    simulation: [
      { label: 'Start Simulation', icon: Settings, shortcut: 'Ctrl+R' },
      { label: 'Pause Simulation', icon: X, shortcut: 'Space' },
      { label: 'Reset to Default', icon: Download, divider: true },
      { label: 'Load Scenario', icon: Folder, shortcut: 'Ctrl+Shift+L' },
      { label: 'Save Scenario', icon: Save, shortcut: 'Ctrl+S' },
      { label: 'Simulation Settings', icon: Settings },
    ],
    analytics: [
      { label: 'Generate Report', icon: FileText, shortcut: 'Ctrl+G' },
      { label: 'View Metrics', icon: Grid, shortcut: 'Ctrl+M' },
      { label: 'Traffic Analysis', icon: Database },
      { label: 'Environmental Impact', icon: Database, divider: true },
      { label: 'Compare Scenarios', icon: List, shortcut: 'Ctrl+K' },
    ],
    export: [
      { label: 'Export as PDF', icon: Download, shortcut: 'Ctrl+P' },
      { label: 'Export as CSV', icon: Download },
      { label: 'Export 3D Model', icon: Upload },
      { label: 'Share Dashboard', icon: Share2, divider: true },
      { label: 'Export Settings', icon: Settings },
    ],
  };

  // Digital Twin City window data
  const windows = [
    { id: 'window-1', title: 'Real-Time Traffic Monitor', type: 'primary', icon: Database },
    { id: 'window-2', title: '3D Model Inspector', type: 'secondary', icon: Layout },
    { id: 'window-3', title: 'Sensor Data Stream', type: 'utility', icon: Settings },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Menu Navigation System
        </h1>
        <p style={{ color: 'var(--dt-text-secondary)' }}>
          Application menus, window management, and navigation patterns for Digital Twin City platform
        </p>
      </div>

      {/* Primary Menu Bar Demo */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
          Application Menu Bar
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--dt-text-secondary)' }}>
          Primary navigation with city data management, 3D models, simulation controls, and analytics
        </p>

        <div className="glass-panel rounded-xl overflow-hidden">
          {/* Menu Bar */}
          <div className="flex items-center px-4 py-2 border-b" style={{ borderColor: 'var(--dt-glass-border)' }}>
            <div className="flex items-center gap-1">
              {primaryMenus.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(activeMenu === menu.id ? '' : menu.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth hover:scale-105"
                    style={{
                      backgroundColor: isActive ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                      color: isActive ? 'var(--dt-cyan)' : 'var(--dt-text-primary)',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{menu.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-smooth ${isActive ? 'rotate-180' : ''}`} />
                  </button>
                );
              })}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(180, 255, 57, 0.1)', color: 'var(--dt-lime)' }}>
                Interactive Demo
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {activeMenu && secondaryMenus[activeMenu] && (
            <div className="p-2 animate-fade-in">
              <div className="glass-panel rounded-lg p-2 w-64">
                {secondaryMenus[activeMenu].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index}>
                      {item.divider && <div className="h-px my-2" style={{ backgroundColor: 'var(--dt-glass-border)' }} />}
                      <button
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-smooth hover:scale-105"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--dt-text-primary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                          e.currentTarget.style.color = 'var(--dt-cyan)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--dt-text-primary)';
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.shortcut && (
                          <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Window Layout System */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
          Multi-Window System
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--dt-text-secondary)' }}>
          Manage multiple data views with draggable windows for real-time monitoring, 3D model inspection, and sensor streams
        </p>

        <div className="grid grid-cols-3 gap-4">
          {windows.map((window) => {
            const isMaximized = windowMaximized === window.id;
            return (
              <div
                key={window.id}
                className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${
                  isMaximized ? 'col-span-3 row-span-2' : ''
                } ${activeWindow === window.id ? 'glow-cyan' : ''}`}
                onClick={() => setActiveWindow(window.id)}
              >
                {/* Title Bar */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b cursor-move"
                  style={{ borderColor: 'var(--dt-glass-border)' }}
                >
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4" style={{ color: 'var(--dt-cyan)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--dt-text-primary)' }}>
                      {window.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded-lg transition-smooth hover:scale-110"
                      style={{ color: 'var(--dt-text-muted)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 184, 0, 0.2)';
                        e.currentTarget.style.color = 'var(--dt-amber)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--dt-text-muted)';
                      }}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setWindowMaximized(isMaximized ? null : window.id);
                      }}
                      className="p-1.5 rounded-lg transition-smooth hover:scale-110"
                      style={{ color: 'var(--dt-text-muted)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(180, 255, 57, 0.2)';
                        e.currentTarget.style.color = 'var(--dt-lime)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--dt-text-muted)';
                      }}
                    >
                      {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                    </button>
                    <button
                      className="p-1.5 rounded-lg transition-smooth hover:scale-110"
                      style={{ color: 'var(--dt-text-muted)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 51, 102, 0.2)';
                        e.currentTarget.style.color = 'var(--dt-status-error)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--dt-text-muted)';
                      }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-4">
                  <div className={`space-y-3 ${isMaximized ? 'h-64' : 'h-32'}`}>
                    {window.id === 'window-1' && (
                      <>
                        <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4" style={{ color: 'var(--dt-cyan)' }} />
                            <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                              Main Street Flow
                            </span>
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--dt-lime)' }}>
                            245 veh/hr
                          </span>
                        </div>
                        {isMaximized && (
                          <>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4" style={{ color: 'var(--dt-cyan)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Highway 101 Flow
                                </span>
                              </div>
                              <span className="text-xs font-medium" style={{ color: 'var(--dt-lime)' }}>
                                892 veh/hr
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" style={{ color: 'var(--dt-status-warning)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Congestion Alert
                                </span>
                              </div>
                              <span className="text-xs font-medium" style={{ color: 'var(--dt-status-warning)' }}>
                                Oak Ave
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {window.id === 'window-2' && (
                      <>
                        <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                          <div className="flex items-center gap-2">
                            <Layout className="w-4 h-4" style={{ color: 'var(--dt-lime)' }} />
                            <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                              City Hall Model
                            </span>
                          </div>
                          <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                            12.4 MB
                          </span>
                        </div>
                        {isMaximized && (
                          <>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <Layout className="w-4 h-4" style={{ color: 'var(--dt-lime)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Bridge Structure
                                </span>
                              </div>
                              <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                                8.7 MB
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <Layout className="w-4 h-4" style={{ color: 'var(--dt-lime)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Park Terrain
                                </span>
                              </div>
                              <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                                5.2 MB
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {window.id === 'window-3' && (
                      <>
                        <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                          <div className="flex items-center gap-2">
                            <Settings className="w-4 h-4" style={{ color: 'var(--dt-amber)' }} />
                            <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                              Weather API
                            </span>
                          </div>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dt-status-success)' }} />
                        </div>
                        {isMaximized && (
                          <>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <Settings className="w-4 h-4" style={{ color: 'var(--dt-amber)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Traffic Sensors
                                </span>
                              </div>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dt-status-success)' }} />
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                              <div className="flex items-center gap-2">
                                <Settings className="w-4 h-4" style={{ color: 'var(--dt-amber)' }} />
                                <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                                  Energy Grid
                                </span>
                              </div>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dt-status-warning)' }} />
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contextual Menu & Hierarchy */}
      <div className="grid grid-cols-2 gap-6">
        {/* Context Menu Demo */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
            Scenario Actions Menu
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--dt-text-secondary)' }}>
            Quick actions for city models and simulation scenarios
          </p>

          <div className="space-y-3">
            {['Downtown District Model', 'Traffic Flow Scenario', 'Environmental Impact Study'].map((item, index) => (
              <div
                key={index}
                className="glass-panel p-4 rounded-xl cursor-pointer transition-smooth hover:scale-105 relative"
                onClick={() => setContextMenuOpen(contextMenuOpen === item ? null : item)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5" style={{ color: 'var(--dt-cyan)' }} />
                    <span style={{ color: 'var(--dt-text-primary)' }}>{item}</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4" style={{ color: 'var(--dt-text-muted)' }} />
                </div>

                {contextMenuOpen === item && (
                  <div className="absolute right-0 top-full mt-2 z-10 animate-fade-in">
                    <div className="glass-panel rounded-lg p-2 w-52">
                      {[
                        { label: 'Open in 3D View', icon: Folder },
                        { label: 'Edit Parameters', icon: Edit },
                        { label: 'Share with Team', icon: Share2 },
                        { label: 'Export Data', icon: Download },
                        { label: 'Delete Scenario', icon: Trash2 },
                      ].map((action, idx) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={idx}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth hover:scale-105"
                            style={{ color: 'var(--dt-text-primary)' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                              e.currentTarget.style.color = 'var(--dt-cyan)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = 'var(--dt-text-primary)';
                            }}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{action.label}</span>
                            {action.label === 'Share' && <ChevronRight className="w-3 h-3 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Panel */}
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
            Resource Explorer
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--dt-text-secondary)' }}>
            Hierarchical access to data streams, 3D models, and simulation scenarios
          </p>

          <div className="space-y-2">
            {[
              { label: 'City Dashboard', icon: Home, children: [] },
              {
                label: 'Live Data Streams',
                icon: Database,
                children: ['Traffic Sensors', 'Weather API', 'Energy Grid', 'Water Systems']
              },
              {
                label: '3D City Models',
                icon: Layout,
                children: ['Buildings', 'Infrastructure', 'Terrain', 'Landmarks']
              },
              {
                label: 'Simulation Scenarios',
                icon: Settings,
                children: ['Traffic Flow', 'Emergency Response', 'Urban Growth', 'Climate Impact']
              },
              { label: 'Team Collaboration', icon: Users, children: [] },
            ].map((item, index) => {
              const Icon = item.icon;
              const hasChildren = item.children.length > 0;
              const [expanded, setExpanded] = useState(false);

              return (
                <div key={index}>
                  <button
                    onClick={() => hasChildren && setExpanded(!expanded)}
                    className="w-full flex items-center justify-between p-3 rounded-xl transition-smooth hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      color: 'var(--dt-text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                      e.currentTarget.style.color = 'var(--dt-cyan)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = 'var(--dt-text-primary)';
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {hasChildren && (
                      <ChevronRight className={`w-4 h-4 transition-smooth ${expanded ? 'rotate-90' : ''}`} />
                    )}
                  </button>

                  {hasChildren && expanded && (
                    <div className="ml-6 mt-2 space-y-1 animate-fade-in">
                      {item.children.map((child, childIndex) => (
                        <button
                          key={childIndex}
                          className="w-full flex items-center gap-3 p-2 rounded-lg transition-smooth hover:scale-105 text-sm"
                          style={{
                            color: 'var(--dt-text-secondary)',
                            paddingLeft: '12px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.05)';
                            e.currentTarget.style.color = 'var(--dt-cyan)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--dt-text-secondary)';
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: 'var(--dt-cyan)' }}
                          />
                          {child}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Switcher & Toolbar */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
          City Data Workspace
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--dt-text-secondary)' }}>
          Control toolbar with view modes and quick actions for scenarios, models, and reports
        </p>

        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            {/* Left Actions */}
            <div className="flex items-center gap-2">
              {[
                { icon: FileText, label: 'New Scenario', color: 'var(--dt-cyan)' },
                { icon: Upload, label: 'Upload Model', color: 'var(--dt-lime)' },
                { icon: Download, label: 'Export Report', color: 'var(--dt-amber)' },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--dt-text-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${action.color}20`;
                      e.currentTarget.style.color = action.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = 'var(--dt-text-primary)';
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right View Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              {[
                { id: 'grid', icon: Grid },
                { id: 'list', icon: List },
                { id: 'layout', icon: Layout },
              ].map((view) => {
                const Icon = view.icon;
                const isActive = activeView === view.id;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className="p-2 rounded-lg transition-smooth hover:scale-110"
                    style={{
                      backgroundColor: isActive ? 'rgba(0, 240, 255, 0.2)' : 'transparent',
                      color: isActive ? 'var(--dt-cyan)' : 'var(--dt-text-muted)',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Content */}
          <div className="mt-6">
            {activeView === 'grid' && (
              <div className="grid grid-cols-4 gap-4 animate-fade-in">
                {['Downtown', 'Industrial', 'Residential', 'Waterfront', 'Transit Hub', 'Parks', 'Airport', 'Stadium'].map((zone, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-smooth hover:scale-105 glow-cyan p-4"
                    style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)' }}
                  >
                    <Layout className="w-8 h-8" style={{ color: 'var(--dt-cyan)' }} />
                    <span className="text-sm font-medium text-center" style={{ color: 'var(--dt-cyan)' }}>
                      {zone}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {activeView === 'list' && (
              <div className="space-y-2 animate-fade-in">
                {[
                  { name: 'Downtown District Model', status: 'Active', updated: '2 hours ago' },
                  { name: 'Traffic Simulation - Peak Hours', status: 'Running', updated: '15 min ago' },
                  { name: 'Environmental Impact Analysis', status: 'Complete', updated: '1 day ago' },
                  { name: 'Infrastructure Health Report', status: 'Scheduled', updated: '3 days ago' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl transition-smooth hover:scale-105"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0, 240, 255, 0.2)' }}
                    >
                      <Database className="w-6 h-6" style={{ color: 'var(--dt-cyan)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium" style={{ color: 'var(--dt-text-primary)' }}>
                        {item.name}
                      </div>
                      <div className="text-sm flex items-center gap-3 mt-1">
                        <span style={{ color: 'var(--dt-lime)' }}>{item.status}</span>
                        <span style={{ color: 'var(--dt-text-muted)' }}>Updated {item.updated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeView === 'layout' && (
              <div className="grid grid-cols-2 gap-4 animate-fade-in">
                {[
                  { name: 'Traffic Flow Analysis', metric: '2,450 vehicles/hr', icon: Database },
                  { name: 'Energy Consumption', metric: '85% efficiency', icon: Settings },
                  { name: 'Air Quality Index', metric: 'Good (42 AQI)', icon: Leaf },
                  { name: 'Emergency Response', metric: '4.2 min avg', icon: AlertCircle },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-xl transition-smooth hover:scale-105"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(180, 255, 57, 0.2)' }}
                        >
                          <Icon className="w-5 h-5" style={{ color: 'var(--dt-lime)' }} />
                        </div>
                        <span className="font-medium" style={{ color: 'var(--dt-text-primary)' }}>
                          {item.name}
                        </span>
                      </div>
                      <p className="text-lg font-semibold" style={{ color: 'var(--dt-cyan)' }}>
                        {item.metric}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--dt-text-primary)' }}>
          Navigation Design Principles
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {[
            {
              title: 'Consistency',
              icon: Grid,
              color: 'var(--dt-cyan)',
              points: [
                'Uniform menu structure',
                'Predictable interactions',
                'Consistent visual hierarchy',
              ],
            },
            {
              title: 'Hierarchy',
              icon: Layout,
              color: 'var(--dt-lime)',
              points: [
                'Clear parent-child relationships',
                'Progressive disclosure',
                'Logical grouping',
              ],
            },
            {
              title: 'Accessibility',
              icon: Users,
              color: 'var(--dt-amber)',
              points: [
                'Keyboard shortcuts',
                'Clear visual feedback',
                'Contextual help',
              ],
            },
          ].map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className="glass-panel p-6 rounded-xl transition-smooth hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${principle.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: principle.color }} />
                  </div>
                  <h3 className="font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
                    {principle.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {principle.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--dt-text-secondary)' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: principle.color }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
