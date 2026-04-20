import { useState } from "react";
import { MessageSquare, MapPin, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, Clock, Filter, TrendingUp } from "lucide-react";

export function CitizenFeedback() {
  const [filterCategory, setFilterCategory] = useState('all');

  const feedbackStats = [
    { label: 'Total Feedback', value: '2,847', trend: '+15%', icon: MessageSquare, color: 'var(--dt-cyan)' },
    { label: 'Positive', value: '1,654', trend: '+8%', icon: ThumbsUp, color: 'var(--dt-status-success)' },
    { label: 'Negative', value: '892', trend: '-5%', icon: ThumbsDown, color: 'var(--dt-status-error)' },
    { label: 'Pending Review', value: '301', trend: '+12', icon: Clock, color: 'var(--dt-amber)' },
  ];

  const feedbackItems = [
    {
      id: 1,
      citizen: 'Rajesh Kumar',
      location: 'Andheri West, Mumbai',
      category: 'traffic',
      sentiment: 'negative',
      message: 'Heavy traffic congestion near Link Road during peak hours. Needs urgent attention.',
      time: '15 min ago',
      votes: 24,
      status: 'under_review',
    },
    {
      id: 2,
      citizen: 'Priya Sharma',
      location: 'Connaught Place, Delhi',
      category: 'infrastructure',
      sentiment: 'positive',
      message: 'New street lighting has greatly improved safety in the evening. Thank you!',
      time: '1 hour ago',
      votes: 42,
      status: 'acknowledged',
    },
    {
      id: 3,
      citizen: 'Mohammed Ali',
      location: 'Hitech City, Hyderabad',
      category: 'environment',
      sentiment: 'neutral',
      message: 'Air quality monitoring stations would be helpful in this area.',
      time: '3 hours ago',
      votes: 18,
      status: 'under_review',
    },
    {
      id: 4,
      citizen: 'Sanjana Reddy',
      location: 'Banjara Hills, Hyderabad',
      category: 'parks',
      sentiment: 'positive',
      message: 'The new park maintenance is excellent. Children love the play area!',
      time: '5 hours ago',
      votes: 56,
      status: 'resolved',
    },
    {
      id: 5,
      citizen: 'Amit Patel',
      location: 'Candolim Beach, Goa',
      category: 'cleanliness',
      sentiment: 'negative',
      message: 'Beach cleanup needs improvement during tourist season.',
      time: '1 day ago',
      votes: 38,
      status: 'under_review',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: 2847 },
    { id: 'traffic', label: 'Traffic', count: 892 },
    { id: 'infrastructure', label: 'Infrastructure', count: 654 },
    { id: 'environment', label: 'Environment', count: 421 },
    { id: 'parks', label: 'Parks & Recreation', count: 312 },
    { id: 'cleanliness', label: 'Cleanliness', count: 568 },
  ];

  const getSentimentConfig = (sentiment: string) => {
    const configs = {
      positive: { color: 'var(--dt-status-success)', icon: ThumbsUp, bg: 'rgba(0, 255, 136, 0.1)' },
      negative: { color: 'var(--dt-status-error)', icon: ThumbsDown, bg: 'rgba(255, 51, 102, 0.1)' },
      neutral: { color: 'var(--dt-cyan)', icon: MessageSquare, bg: 'rgba(0, 240, 255, 0.1)' },
    };
    return configs[sentiment as keyof typeof configs];
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      under_review: { label: 'Under Review', color: 'var(--dt-amber)' },
      acknowledged: { label: 'Acknowledged', color: 'var(--dt-cyan)' },
      resolved: { label: 'Resolved', color: 'var(--dt-status-success)' },
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Citizen Feedback
        </h1>
        <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
          Community feedback and public input from across the city
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {feedbackStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: stat.trend.startsWith('+') ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 184, 0, 0.1)',
                    color: stat.trend.startsWith('+') ? 'var(--dt-status-success)' : 'var(--dt-status-warning)',
                  }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide" style={{ color: 'var(--dt-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" style={{ color: 'var(--dt-cyan)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
              Categories
            </h2>
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-smooth"
                style={{
                  backgroundColor: filterCategory === category.id ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  color: filterCategory === category.id ? 'var(--dt-cyan)' : 'var(--dt-text-primary)',
                }}
              >
                <span className="text-sm">{category.label}</span>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List */}
        <div className="col-span-3 glass-panel rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Recent Feedback
          </h2>
          <div className="space-y-4">
            {feedbackItems.map((feedback) => {
              const sentimentConfig = getSentimentConfig(feedback.sentiment);
              const statusConfig = getStatusConfig(feedback.status);
              const SentimentIcon = sentimentConfig.icon;

              return (
                <div
                  key={feedback.id}
                  className="p-4 rounded-xl transition-smooth hover:scale-[1.01]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: sentimentConfig.bg }}
                    >
                      <SentimentIcon className="w-5 h-5" style={{ color: sentimentConfig.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                            {feedback.citizen}
                          </h3>
                          <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{feedback.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{feedback.time}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                          style={{
                            backgroundColor: `${statusConfig.color}20`,
                            color: statusConfig.color,
                          }}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--dt-text-secondary)' }}>
                        {feedback.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-smooth hover:scale-105"
                          style={{
                            backgroundColor: 'rgba(0, 240, 255, 0.1)',
                            color: 'var(--dt-cyan)',
                          }}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          {feedback.votes} upvotes
                        </button>
                        <span
                          className="px-2 py-1 rounded text-xs uppercase tracking-wide"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--dt-text-muted)',
                          }}
                        >
                          {feedback.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
