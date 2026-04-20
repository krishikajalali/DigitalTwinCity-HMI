import { Heart, Smile, Frown, Meh, TrendingUp, MessageCircle, Users, BarChart2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export function PublicSentiment() {
  const sentimentOverview = [
    { label: 'Overall Satisfaction', value: '78%', trend: '+5%', icon: Heart, color: 'var(--dt-magenta)' },
    { label: 'Positive Mentions', value: '12.4K', trend: '+12%', icon: Smile, color: 'var(--dt-status-success)' },
    { label: 'Neutral Mentions', value: '8.2K', trend: '+3%', icon: Meh, color: 'var(--dt-cyan)' },
    { label: 'Negative Mentions', value: '3.1K', trend: '-8%', icon: Frown, color: 'var(--dt-status-warning)' },
  ];

  const sentimentDistribution = [
    { name: 'Very Satisfied', value: 42, color: 'var(--dt-status-success)' },
    { name: 'Satisfied', value: 36, color: 'var(--dt-lime)' },
    { name: 'Neutral', value: 15, color: 'var(--dt-cyan)' },
    { name: 'Dissatisfied', value: 7, color: 'var(--dt-amber)' },
  ];

  const topicSentiment = [
    { topic: 'Infrastructure', positive: 85, neutral: 10, negative: 5 },
    { topic: 'Traffic', positive: 42, neutral: 28, negative: 30 },
    { topic: 'Environment', positive: 68, neutral: 20, negative: 12 },
    { topic: 'Public Transport', positive: 55, neutral: 25, negative: 20 },
    { topic: 'Safety', positive: 72, neutral: 18, negative: 10 },
  ];

  const trendingTopics = [
    { topic: 'New Metro Line', sentiment: 'positive', mentions: 2847, change: '+145%' },
    { topic: 'Park Renovations', sentiment: 'positive', mentions: 1923, change: '+89%' },
    { topic: 'Traffic Management', sentiment: 'neutral', mentions: 1654, change: '+34%' },
    { topic: 'Air Quality', sentiment: 'negative', mentions: 1201, change: '+67%' },
    { topic: 'Street Lighting', sentiment: 'positive', mentions: 987, change: '+23%' },
  ];

  const getSentimentIcon = (sentiment: string) => {
    const icons = {
      positive: { icon: Smile, color: 'var(--dt-status-success)' },
      neutral: { icon: Meh, color: 'var(--dt-cyan)' },
      negative: { icon: Frown, color: 'var(--dt-status-warning)' },
    };
    return icons[sentiment as keyof typeof icons];
  };

  return (
    <div className="h-full p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--dt-text-primary)' }}>
          Public Sentiment
        </h1>
        <p className="text-lg" style={{ color: 'var(--dt-text-secondary)' }}>
          Track and analyze public opinion and citizen satisfaction
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {sentimentOverview.map((stat, index) => {
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

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Sentiment Distribution */}
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Sentiment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--dt-bg-tertiary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--dt-text-primary)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Sentiment Breakdown */}
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--dt-text-primary)' }}>
            Sentiment by Topic
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicSentiment} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis type="number" stroke="var(--dt-text-muted)" />
              <YAxis dataKey="topic" type="category" stroke="var(--dt-text-muted)" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--dt-bg-tertiary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--dt-text-primary)',
                }}
              />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="var(--dt-status-success)" />
              <Bar dataKey="neutral" stackId="a" fill="var(--dt-cyan)" />
              <Bar dataKey="negative" stackId="a" fill="var(--dt-amber)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--dt-text-primary)' }}>
            Trending Topics
          </h2>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: 'var(--dt-cyan)' }} />
            <span className="text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
              Last 7 days
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => {
            const sentimentConfig = getSentimentIcon(topic.sentiment);
            const SentimentIcon = sentimentConfig.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl transition-smooth hover:scale-[1.01]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-center w-12 text-2xl font-bold" style={{ color: 'var(--dt-text-muted)' }}>
                  {index + 1}
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${sentimentConfig.color}20` }}
                >
                  <SentimentIcon className="w-6 h-6" style={{ color: sentimentConfig.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--dt-text-primary)' }}>
                    {topic.topic}
                  </h3>
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--dt-text-secondary)' }}>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{topic.mentions.toLocaleString()} mentions</span>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded text-xs uppercase tracking-wide"
                      style={{
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        color: 'var(--dt-status-success)',
                      }}
                    >
                      {topic.change}
                    </span>
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs uppercase tracking-wide font-medium"
                  style={{
                    backgroundColor: `${sentimentConfig.color}20`,
                    color: sentimentConfig.color,
                  }}
                >
                  {topic.sentiment}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
