import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Calendar, BookOpen, Star, MessageSquare, Users, TrendingUp, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const { dark } = useTheme();
  const { programs, testimonies, devotionals, prayerRequests, registrations } = useMinistry();

  const stats = [
    { label: 'Programs', value: programs.length, icon: <Calendar size={20} />, path: '/admin/programs', color: 'from-blue-500 to-blue-600', sub: `${programs.filter(p => p.upcoming).length} upcoming` },
    { label: 'Devotionals', value: devotionals.length, icon: <BookOpen size={20} />, path: '/admin/devotionals', color: 'from-yellow-500 to-amber-600', sub: 'Published' },
    { label: 'Testimonies', value: testimonies.length, icon: <Star size={20} />, path: '/admin/testimonies', color: 'from-purple-500 to-purple-600', sub: `${testimonies.filter(t => !t.approved).length} pending review` },
    { label: 'Prayer Requests', value: prayerRequests.length, icon: <MessageSquare size={20} />, path: '/admin/prayer-requests', color: 'from-green-500 to-green-600', sub: 'All time' },
    { label: 'Registrations', value: registrations.length, icon: <Users size={20} />, path: '/admin/registrations', color: 'from-pink-500 to-pink-600', sub: 'New members' },
  ];

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <div className={`${card} relative overflow-hidden`}>
        <div className="absolute right-6 top-4 text-yellow-500/10 text-8xl font-display font-bold select-none">✞</div>
        <div className="relative">
          <h1 className={`font-display text-3xl font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Welcome, Admin 👋
          </h1>
          <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Manage The Call Global Ministry content from here.
          </p>
          <div className={`mt-4 p-4 rounded-xl border border-yellow-600/20 ${dark ? 'bg-yellow-500/5' : 'bg-yellow-50'} inline-block`}>
            <p className={`font-body italic text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              "And he gave the apostles, the prophets, the evangelists, the shepherds and teachers, to equip the saints for the work of ministry..."
            </p>
            <cite className="text-yellow-600 text-xs not-italic block mt-1">— Ephesians 4:11-12</cite>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map(s => (
          <Link key={s.label} to={s.path}
            className={`${card} group hover:border-yellow-600/30 transition-all`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <div className={`text-3xl font-display font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
            <div className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{s.label}</div>
            <div className={`text-xs mt-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{s.sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className={card}>
          <div className="flex items-center justify-between mb-5">
            <h3 className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Recent Registrations</h3>
            <Link to="/admin/registrations" className="text-yellow-500 text-xs flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {registrations.length === 0 ? (
            <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {[...registrations].reverse().slice(0, 5).map(r => (
                <div key={r.id} className={`flex items-center gap-3 py-2 border-b ${dark ? 'border-white/5' : 'border-gray-50'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {r.name?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${dark ? 'text-white' : 'text-gray-900'}`}>{r.name}</div>
                    <div className={`text-xs truncate ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{r.email}</div>
                  </div>
                  <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{r.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Testimonies */}
        <div className={card}>
          <div className="flex items-center justify-between mb-5">
            <h3 className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Pending Testimonies</h3>
            <Link to="/admin/testimonies" className="text-yellow-500 text-xs flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {testimonies.filter(t => !t.approved).length === 0 ? (
            <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No pending testimonies. ✅</p>
          ) : (
            <div className="space-y-3">
              {testimonies.filter(t => !t.approved).slice(0, 4).map(t => (
                <div key={t.id} className={`p-3 rounded-xl ${dark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</span>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">Pending</span>
                  </div>
                  <p className={`text-xs line-clamp-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{t.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={card}>
        <h3 className={`font-display font-semibold mb-5 ${dark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ New Program', to: '/admin/programs' },
            { label: '+ Post Devotional', to: '/admin/devotionals' },
            { label: 'Review Testimonies', to: '/admin/testimonies' },
            { label: 'View Prayer Requests', to: '/admin/prayer-requests' },
          ].map(a => (
            <Link key={a.label} to={a.to} className="btn-outline-gold px-5 py-2 rounded-full text-sm">
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
