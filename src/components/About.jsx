import { useTheme } from '../context/ThemeContext';
import { CheckCircle2 } from 'lucide-react';

const values = ['Rooted in Scripture', 'Spirit-led & Prayer-driven', 'Committed to Discipleship', 'Globally minded, Locally impactful'];

export default function About() {
  const { dark } = useTheme();

  return (
    <section id="about" className={`py-24 ${dark ? 'bg-[#04093a]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <div className="relative">
            <div className={`rounded-3xl overflow-hidden aspect-[4/3] relative hero-gradient`}>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                <img src="/logowhite.png" alt="The Call Global" className="h-36 w-36 object-contain mb-6 float-anim" />
                <blockquote className="text-white text-center font-body text-xl italic leading-relaxed">
                  "The gifts and the calling of God are irrevocable."
                </blockquote>
                <cite className="text-blue-300 text-sm mt-4 not-italic">— Romans 11:29</cite>
              </div>
            </div>
            {/* Floating card */}
            <div className={`absolute -bottom-6 -right-6 p-5 rounded-2xl shadow-2xl max-w-xs
              ${dark ? 'bg-[#0a1a6b] border border-blue-500/20' : 'bg-white border border-blue-100 shadow-blue-100'}`}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">🙏</div>
                <div>
                  <div className={`font-display font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>Founded in Prayer</div>
                  <div className={`text-xs mt-1 ${dark ? 'text-blue-200/60' : 'text-gray-500'}`}>
                    Every initiative, every program, every outreach starts on our knees before the Father.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="divider-navy-left"></div>
            <h2 className={`font-display text-4xl font-bold mb-6 leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
              Who We Are &{' '}
              <span className="brand-text">Why We Exist</span>
            </h2>
            <div className={`space-y-4 font-body text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                The Call Global is an apostolic and prophetic ministry raised up to awaken, equip, and deploy believers into their God-given assignments across every nation, culture, and sphere of influence.
              </p>
              <p>
                Founded in 2018, we have grown from a small prayer circle into a movement spanning over 12 nations — driven by an unquenchable desire to see the Kingdom of God manifest on earth.
              </p>
              <p>
                We are not just a church. We are a training ground, a sending station, and a family — for those who dare to believe God for the impossible.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {values.map(v => (
                <div key={v} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#1e3db5] flex-shrink-0" />
                  <span className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{v}</span>
                </div>
              ))}
            </div>

            <a href="/#join" className="inline-block btn-navy px-7 py-3 rounded-full mt-8 text-sm">
              Become Part of the Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
