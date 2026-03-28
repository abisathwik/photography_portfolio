import { useContent } from '@/context/ContentContext';
import {
  Image,
  FileText,
  Eye,
  Calendar,
  ArrowRight,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

const Overview = () => {
  const { content } = useContent();

  const stats = [
    {
      label: 'Gallery Images',
      value: content.gallery.images.length,
      icon: Image,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      label: 'Journal Posts',
      value: content.journal.posts.length,
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Packages',
      value: content.packages.packages.length,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Views',
      value: '1,234',
      icon: Eye,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const quickActions = [
    {
      label: 'Add New Photo',
      description: 'Upload a new image to the gallery',
      link: '/admin/dashboard/gallery',
      icon: Image,
    },
    {
      label: 'Edit Hero Content',
      description: 'Update the main headline and images',
      link: '/admin/dashboard/content',
      icon: FileText,
    },
    {
      label: 'View Analytics',
      description: 'Check website performance metrics',
      link: '#',
      icon: TrendingUp,
      disabled: true,
    },
  ];

  const recentActivity = [
    { action: 'Gallery updated', time: '2 hours ago', type: 'update' },
    { action: 'New image added', time: '5 hours ago', type: 'add' },
    { action: 'Content edited', time: '1 day ago', type: 'edit' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="font-display text-2xl text-off-white mb-2">
          Welcome Back
        </h2>
        <p className="text-off-white/60 text-sm">
          Manage your portfolio content and track performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-charcoal/50 border border-off-white/10 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                  {stat.label}
                </p>
                <p className="font-display text-3xl text-off-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div>
          <h3 className="font-display text-sm tracking-[0.1em] text-off-white mb-4">
            QUICK ACTIONS
          </h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.disabled ? '#' : action.link}
                className={`flex items-center gap-4 p-4 bg-charcoal/50 border border-off-white/10 transition-colors ${
                  action.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-gold/50 hover:bg-gold/5'
                }`}
              >
                <div className="p-3 bg-off-white/5">
                  <action.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-off-white mb-1">{action.label}</h4>
                  <p className="text-xs text-off-white/50">{action.description}</p>
                </div>
                {!action.disabled && (
                  <ArrowRight className="w-4 h-4 text-off-white/30" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-display text-sm tracking-[0.1em] text-off-white mb-4">
            RECENT ACTIVITY
          </h3>
          <div className="bg-charcoal/50 border border-off-white/10 p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 pb-4 border-b border-off-white/10 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'add'
                        ? 'bg-green-500'
                        : activity.type === 'edit'
                        ? 'bg-blue-500'
                        : 'bg-gold'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-off-white">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-2 text-off-white/40">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Preview */}
          <div className="mt-6">
            <h3 className="font-display text-sm tracking-[0.1em] text-off-white mb-4">
              CONTENT PREVIEW
            </h3>
            <div className="bg-charcoal/50 border border-off-white/10 p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/50">Hero Headline</span>
                  <span className="text-off-white truncate max-w-[200px]">
                    {content.hero.headline}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/50">Gallery Title</span>
                  <span className="text-off-white">{content.gallery.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-off-white/50">Contact Email</span>
                  <span className="text-off-white">{content.closing.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
