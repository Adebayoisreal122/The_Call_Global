import { useState } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import {
  LayoutDashboard, Calendar, BookOpen, Star, MessageSquare,
  Users, Sun, Moon, Menu, X, ChevronRight, LogOut, Bell
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { path: '/admin/programs', icon: <Calendar size={18} />, label: 'Programs' },
  { path: '/admin/devotionals', icon: <BookOpen size={18} />, label: 'Devotionals' },
  { path: '/admin/testimonies', icon: <Star size={18} />, label: 'Testimonies' },
  { path: '/admin/prayer-requests', icon: <MessageSquare size={18} />, label: 'Prayer Requests' },
  { path: '/admin/registrations', icon: <Users size={18} />, label: 'Registrations' },
];

export default function AdminLayout() {
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { prayerRequests, registrations, testimonies } = useMinistry();

  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path) && path !== '/admin' || (path === '/admin' && location.pathname === '/admin');

  const badges = {
    '/admin/prayer-requests': prayerRequests.length,
    '/admin/testimonies': testimonies.filter(t => !t.approved).length,
    '/admin/registrations': registrations.length,
  };

  const Sidebar = () => (
    <div className={`h-full flex flex-col admin-sidebar`}>
      <div className="p-6 border-b border-yellow-600/15">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold">✞</span>
          </div>
          <div>
            <div className="font-display text-sm font-bold gold-text">The Call Global</div>
            <div className="text-gray-500 text-xs">Admin Portal</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map(item => {
          const active = isActive(item.path, item.exact);
          const badge = badges[item.path];
          return (
            <Link key={item.path} to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group
                ${active
                  ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-600/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
              <span className={active ? 'text-yellow-400' : 'text-gray-500 group-hover:text-gray-300'}>
                {item.icon}
              </span>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {badge > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {badge}
                </span>
              )}
              {active && <ChevronRight size={14} className="text-yellow-500" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-yellow-600/15">
        <Link to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm">
          <LogOut size={16} />
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-60 flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 h-full"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Bar */}
        <header className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b nav-glass
          ${dark ? 'bg-gray-950/90 border-white/8' : 'bg-white/90 border-gray-200'}`}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
            <Menu size={20} />
          </button>
          <div className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
            {navItems.find(n => isActive(n.path, n.exact))?.label || 'Admin'}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className={`p-2 rounded-full hover:bg-white/10 transition-colors ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
