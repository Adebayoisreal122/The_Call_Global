import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const typeColors = {
  Worship: 'text-blue-400 bg-blue-500/15',
  Prayer: 'text-purple-400 bg-purple-500/15',
  Conference: 'text-yellow-500 bg-yellow-500/15',
  Training: 'text-green-400 bg-green-500/15',
  Outreach: 'text-orange-400 bg-orange-500/15',
};

export default function Programs() {
  const { dark } = useTheme();
  const { programs } = useMinistry();
  const upcoming = programs.filter(p => p.upcoming).slice(0, 6);

  return (
    <section id="programs" className={`py-24 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-gold"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Upcoming <span className="gold-text">Programs</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't miss what the Spirit is doing. Join us at these upcoming ministry events.
          </p>
        </div>

        {upcoming.length === 0 ? (
          <div className={`text-center py-16 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            <div className="text-5xl mb-4">📅</div>
            <p className="font-body text-xl">No upcoming programs yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map(p => (
              <div key={p.id}
                className={`program-card rounded-2xl overflow-hidden group
                  ${dark
                    ? 'bg-white/4 border border-white/8 hover:border-yellow-600/30'
                    : 'bg-white border border-gray-100 hover:border-yellow-500/40 shadow-sm hover:shadow-lg'
                  }`}>
                {/* Header */}
                <div className="relative h-32 hero-gradient flex items-center justify-center overflow-hidden">
                  <div className="text-yellow-500/20 text-7xl font-display font-bold absolute -top-2 -right-2 select-none">✞</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeColors[p.type] || 'text-yellow-500 bg-yellow-500/15'}`}>
                    {p.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`font-display text-lg font-semibold mb-2 group-hover:text-yellow-500 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
                    {p.title}
                  </h3>
                  <p className={`font-body text-sm leading-relaxed mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {p.description}
                  </p>
                  <div className={`space-y-2 text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-yellow-500" />
                      {new Date(p.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="text-yellow-500" /> {p.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-yellow-500" /> {p.location}
                    </div>
                  </div>
                  <button className="mt-5 flex items-center gap-1 text-yellow-500 text-xs font-medium hover:gap-3 transition-all">
                    Register / Join <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
