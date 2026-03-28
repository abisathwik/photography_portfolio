import { useEffect } from 'react';
import { useNavigate, Outlet, NavLink, Link } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import {
  LayoutDashboard,
  Image,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, logout, admin } = useContent();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/admin/dashboard/gallery', label: 'Gallery Manager', icon: Image },
    { path: '/admin/dashboard/content', label: 'Content Editor', icon: FileText },
    { path: '/admin/dashboard/submissions', label: 'Submissions', icon: MessageSquare },
    { path: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal border-r border-off-white/10 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-off-white/10">
          <Link to="/admin/dashboard" className="block">
            <h1 className="font-display text-lg tracking-[0.1em] text-off-white">
              ADMIN
            </h1>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-off-white/50 mt-1">
              Gadapa Gayathri
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-gold/10 text-gold border-l-2 border-gold'
                        : 'text-off-white/70 hover:text-off-white hover:bg-off-white/5'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-off-white/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-sm text-off-white/70 hover:text-off-white hover:bg-off-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
            <ChevronRight className="w-3 h-3 ml-auto" />
          </a>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-off-white/70 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-t border-off-white/10">
          <p className="font-mono text-[10px] tracking-wide text-off-white/40">
            Signed in as
          </p>
          <p className="text-sm text-off-white mt-1">{admin?.username}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-off-white/10 flex items-center justify-between px-8 bg-charcoal/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="font-display text-sm tracking-[0.1em] text-off-white/80">
            Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wide text-off-white/50">
              System Online
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
