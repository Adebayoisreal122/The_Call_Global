import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useMinistry } from '../context/MinistryContext';
import {
  LayoutDashboard, Calendar, BookOpen, Star,
  MessageSquare, Users, Sun, Moon, Menu, X, ChevronRight, LogOut, Settings,
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { path: '/admin/programs', icon: <Calendar size={18} />, label: 'Programs' },
  { path: '/admin/devotionals', icon: <BookOpen size={18} />, label: 'Devotionals' },
  { path: '/admin/testimonies', icon: <Star size={18} />, label: 'Testimonies' },
  { path: '/admin/prayer-requests', icon: <MessageSquare size={18} />, label: 'Prayer Requests' },
  { path: '/admin/registrations', icon: <Users size={18} />, label: 'Registrations' },
  { path: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' },
];

export default function AdminLayout() {
  const { dark, toggle } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { prayerRequests, allTestimonies, registrations } = useMinistry();

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname === path || location.pathname.startsWith(path + '/');

  const badges = {
    '/admin/prayer-requests': prayerRequests.filter((r) => !r.isRead).length || 0,
    '/admin/testimonies': allTestimonies.filter((t) => !t.approved).length || 0,
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div className="h-full flex flex-col admin-sidebar">
      {/* Brand */}
      <div className="p-6 border-b border-blue-400/15">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logowhite.jpeg" alt="TCG" className="h-9 w-9 object-contain rounded-full" />
          <div>
            <div className="font-display text-sm font-bold brand-text-light">The Call Global</div>
            <div className="text-blue-400/50 text-xs">Admin Portal</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path, item.exact);
          const badge = badges[item.path];
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group
                ${active
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className={active ? 'text-blue-300' : 'text-gray-500 group-hover:text-gray-300'}>
                {item.icon}
              </span>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {badge > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center leading-none">
                  {badge}
                </span>
              )}
              {active && <ChevronRight size={14} className="text-blue-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="p-4 border-t border-blue-400/15 space-y-2">
        {admin && (
          <div className={`px-4 py-2.5 rounded-xl flex items-center gap-3`}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {admin.name?.[0] || 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-300 truncate">{admin.name}</div>
              <div className="text-xs text-gray-500 truncate">{admin.email}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  const pageTitle = navItems.find((n) => isActive(n.path, n.exact))?.label || 'Admin';

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-60 flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 h-full flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b nav-glass
          ${dark ? 'bg-gray-950/90 border-white/8' : 'bg-white/90 border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
              <Menu size={20} />
            </button>
            <h1 className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className={`p-2 rounded-full hover:bg-white/10 transition-colors ${dark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5] flex items-center justify-center text-white text-xs font-bold">
              {admin?.name?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}