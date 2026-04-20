import { MessageSquare, Share2, Activity, History, X, Plus, Send, Image as ImageIcon, Filter } from "lucide-react";
import { useState } from "react";

interface CollaborationPanelProps {
  visible: boolean;
  onClose: () => void;
}

export function CollaborationPanel({ visible, onClose }: CollaborationPanelProps) {
  const [activeTab, setActiveTab] = useState<'comments' | 'scenarios' | 'activity' | 'history'>('comments');
  const [commentText, setCommentText] = useState('');

  const tabs = [
    { id: 'comments' as const, label: 'Comments', icon: MessageSquare, count: 12 },
    { id: 'scenarios' as const, label: 'Shared Scenarios', icon: Share2, count: 5 },
    { id: 'activity' as const, label: 'Team Activity', icon: Activity, count: 8 },
    { id: 'history' as const, label: 'Version History', icon: History, count: null },
  ];

  const comments = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'SC',
      department: 'Urban Planning',
      time: '5 min ago',
      text: 'The traffic congestion at Main St is increasing. We should review the simulation parameters.',
      mentions: [],
      attachments: 0,
    },
    {
      id: 2,
      user: 'Mike Rodriguez',
      avatar: 'MR',
      department: 'Traffic Engineering',
      time: '15 min ago',
      text: '@alex Can you check the sensor data for the downtown area? Something seems off.',
      mentions: ['alex'],
      attachments: 1,
    },
    {
      id: 3,
      user: 'Alex Johnson',
      avatar: 'AJ',
      department: 'Data Analytics',
      time: '1 hour ago',
      text: 'Updated the pollution heatmap with latest sensor readings. Please review.',
      mentions: [],
      attachments: 2,
    },
  ];

  if (!visible) return null;

  return (
    <div
      className="fixed right-0 top-16 bottom-0 w-96 glass-panel border-l shadow-2xl z-40 flex flex-col animate-slide-in-right"
      style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
          Collaboration
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-smooth hover:bg-white/5"
          style={{ color: 'var(--dt-text-secondary)' }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b flex items-center gap-2" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-smooth text-sm"
              style={{
                backgroundColor: isActive ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                color: isActive ? 'var(--dt-cyan)' : 'var(--dt-text-secondary)',
              }}
            >
              <Icon className="w-4 h-4" />
              {tab.count !== null && (
                <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'comments' && (
          <div className="p-6 space-y-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-smooth hover:bg-white/5"
                style={{ color: 'var(--dt-text-secondary)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <Filter className="w-3 h-3" />
                All Departments
              </button>
            </div>

            {/* Comments List */}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0"
                    style={{ backgroundColor: 'var(--dt-bg-tertiary)', color: 'var(--dt-cyan)' }}
                  >
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-medium text-sm" style={{ color: 'var(--dt-text-primary)' }}>
                        {comment.user}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--dt-text-muted)' }}>
                        {comment.time}
                      </span>
                    </div>
                    <div className="text-xs mb-2" style={{ color: 'var(--dt-text-muted)' }}>
                      {comment.department}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                      {comment.text}
                    </p>
                    {comment.attachments > 0 && (
                      <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: 'var(--dt-cyan)' }}>
                        <ImageIcon className="w-3 h-3" />
                        <span>{comment.attachments} attachment{comment.attachments > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'scenarios' && (
          <div className="p-6">
            <p className="text-sm text-center py-8" style={{ color: 'var(--dt-text-muted)' }}>
              Shared scenarios will appear here
            </p>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="p-6">
            <p className="text-sm text-center py-8" style={{ color: 'var(--dt-text-muted)' }}>
              Team activity will appear here
            </p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <p className="text-sm text-center py-8" style={{ color: 'var(--dt-text-muted)' }}>
              Version history will appear here
            </p>
          </div>
        )}
      </div>

      {/* Add Comment Input */}
      {activeTab === 'comments' && (
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex items-start gap-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment... (@mention users)"
              className="flex-1 bg-white/5 border rounded-lg px-3 py-2 text-sm resize-none transition-smooth focus:outline-none focus:border-[var(--dt-cyan)]"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--dt-text-primary)',
                minHeight: '60px',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              className="p-2 rounded-lg transition-smooth hover:bg-white/5"
              style={{ color: 'var(--dt-text-secondary)' }}
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-smooth"
              style={{
                backgroundColor: 'var(--dt-cyan)',
                color: 'var(--dt-bg-primary)',
              }}
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
