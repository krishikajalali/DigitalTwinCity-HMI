import { useState } from "react";
import { Outlet } from "react-router";
import { TopNav } from "../navigation/top-nav";
import { LeftSidebar } from "../navigation/left-sidebar";
import { SimulationOverlay } from "../navigation/simulation-overlay";
import { CollaborationPanel } from "../navigation/collaboration-panel";
import { MessageCircle } from "lucide-react";

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);
  const [collaborationPanelOpen, setCollaborationPanelOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden" style={{ backgroundColor: 'var(--dt-bg-primary)' }}>
      {/* Top Navigation */}
      <TopNav 
        simulationMode={simulationMode}
        onSimulationModeChange={setSimulationMode}
      />

      {/* Left Sidebar */}
      <LeftSidebar 
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      {/* Simulation Mode Overlay */}
      <SimulationOverlay visible={simulationMode} />

      {/* Main Content Area */}
      <main
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? '64px' : '280px',
          marginTop: simulationMode ? '144px' : '64px', // 64px top nav + 80px simulation overlay
          marginRight: collaborationPanelOpen ? '384px' : '0',
          height: simulationMode ? 'calc(100vh - 144px)' : 'calc(100vh - 64px)',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </main>

      {/* Collaboration Panel */}
      <CollaborationPanel 
        visible={collaborationPanelOpen}
        onClose={() => setCollaborationPanelOpen(false)}
      />

      {/* Floating Collaboration Toggle */}
      {!collaborationPanelOpen && (
        <button
          onClick={() => setCollaborationPanelOpen(true)}
          className="fixed right-6 bottom-6 w-14 h-14 rounded-full flex items-center justify-center transition-smooth z-30 glow-cyan"
          style={{
            backgroundColor: 'var(--dt-cyan)',
            color: 'var(--dt-bg-primary)',
          }}
          title="Open Collaboration Panel"
        >
          <MessageCircle className="w-6 h-6" />
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium"
            style={{
              backgroundColor: 'var(--dt-status-error)',
              color: 'white',
            }}
          >
            3
          </span>
        </button>
      )}
    </div>
  );
}
