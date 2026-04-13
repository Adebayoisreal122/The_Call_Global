import { useTheme } from '../context/ThemeContext';
import { BookOpen, Heart, Globe, Users, Mic, Zap } from 'lucide-react';

const features = [
  { icon: <BookOpen size={24} />, title: 'Word Ministry', desc: 'Deep, life-transforming teaching of the Word of God that builds faith and shapes destiny.' },
  { icon: <Heart size={24} />, title: 'Intercession', desc: 'We believe prayer changes things. Join us in standing in the gap for nations, families, and souls.' },
  { icon: <Globe size={24} />, title: 'Global Missions', desc: 'Reaching the unreached across continents through media, missions trips, and digital evangelism.' },
  { icon: <Users size={24} />, title: 'Community', desc: 'A genuine family of believers who journey together in love, accountability, and encouragement.' },
  { icon: <Mic size={24} />, title: 'Prophetic Voice', desc: 'Declaring God\'s word with boldness and accuracy in this critical hour across every sphere.' },
  { icon: <Zap size={24} />, title: 'Discipleship', desc: 'Intentional mentoring and training to equip every believer for their specific assignment on earth.' },
];

export default function Features() {
  const { dark } = useTheme();

  return (
    <section id="features" className={`py-24 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-navy"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Our Ministry <span className="brand-text">Pillars</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Six foundations that guide everything we do — rooted in Scripture, led by the Spirit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`program-card p-7 rounded-2xl group
              ${dark
                ? 'bg-white/4 border border-white/8 hover:border-blue-500/30 hover:bg-white/6'
                : 'bg-white border border-gray-900 hover:border-blue-500 shadow-sm hover:shadow-md'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform
                bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5]`}>
                {f.icon}
              </div>
              <h3 className={`font-display text-xl font-semibold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
              <p className={`font-body text-base leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
