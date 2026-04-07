import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

const typeBadge = {
  Worship: 'text-blue-400 bg-blue-500/15',
  Prayer: 'text-indigo-400 bg-indigo-500/15',
  Conference: 'text-sky-300 bg-sky-500/15',
  Training: 'text-cyan-400 bg-cyan-500/15',
  Outreach: 'text-violet-400 bg-violet-500/15',
};

export default function Programs() {
  const { dark } = useTheme();
  const { programs } = useMinistry();
  const upcoming = programs.filter(p => p.upcoming).slice(0, 6);

  return (
    <section id="programs" className={`py-24 ${dark ? 'bg-gray-950' : 'bg-blue-950'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-navy"></div>
          <h2 className="font-display text-4xl font-bold mb-4 text-white">
            Upcoming <span className="brand-text-light">Programs</span>
          </h2>
          <p className="font-body text-lg max-w-xl mx-auto text-blue-200/70">
            Don't miss what the Spirit is doing. Join us at these upcoming ministry events.
          </p>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center py-16 text-blue-300/60">
            <div className="text-5xl mb-4">📅</div>
            <p className="font-body text-xl">No upcoming programs yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map(p => (
              <div key={p.id} className="program-card rounded-2xl overflow-hidden group bg-white/6 border border-white/10 hover:border-blue-400/30 hover:bg-white/10">
                <div className="relative h-32 hero-gradient flex items-center justify-center overflow-hidden">
                  <img src="/logowhite.png" alt="" className="absolute opacity-10 h-24 w-24 object-contain" />
                  <div className={`relative z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeBadge[p.type] || 'text-blue-300 bg-blue-500/15'}`}>
                    {p.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-2 text-white group-hover:text-blue-200 transition-colors">{p.title}</h3>
                  <p className="font-body text-sm leading-relaxed mb-4 text-blue-200/70">{p.description}</p>
                  <div className="space-y-2 text-xs text-blue-300/60">
                    <div className="flex items-center gap-2"><Calendar size={13} className="text-blue-400" />
                      {new Date(p.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2"><Clock size={13} className="text-blue-400" /> {p.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={13} className="text-blue-400" /> {p.location}</div>
                  </div>
                  <button className="mt-5 flex items-center gap-1 text-blue-300 text-xs font-medium hover:gap-3 transition-all">
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
