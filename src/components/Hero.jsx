import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { dark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient cross-pattern">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-anim absolute top-24 right-20 opacity-10">
          <img src="/logowhite.png" alt="" className="w-64 h-64 object-contain" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo mark */}
          <div className="flex justify-center mb-8">
            <div className="relative float-anim-2">
              <img src="/logowhite.png" alt="The Call Global" className="h-28 w-28 object-contain rounded-full shadow-2xl shadow-blue-900/50" />
              <div className="absolute inset-0 rounded-full ring-2 ring-blue-300/20 ring-offset-4 ring-offset-transparent"></div>
            </div>
          </div>

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-300/30 bg-blue-400/10 mb-6">
            <span className="text-blue-200 text-xs tracking-widest uppercase font-medium">Raising Kingdom Voices Globally</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            You Were Made
            <span className="block brand-text-light mt-1">For More Than This</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto mb-10">
            The Call Global is a Spirit-led ministry raising believers who walk boldly in their God-given purpose — across every nation and generation.
          </p>

          {/* Scripture */}
          <div className="mb-10 inline-block px-6 py-3 rounded-2xl border border-blue-300/20 bg-white/5">
            <p className="font-body italic text-blue-200/80 text-base">
              "For I know the plans I have for you, declares the Lord..." — <span className="text-blue-200 font-semibold not-italic">Jeremiah 29:11</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/#join" className="btn-navy px-8 py-4 rounded-full text-base shadow-xl shadow-blue-900/50 hover:shadow-blue-800/60">
              Join The Ministry
            </a>
            <a href="/#programs" className="btn-outline-light px-8 py-4 rounded-full text-base">
              View Programs ↓
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { n: '5K+', label: 'Members' },
              { n: '12+', label: 'Nations' },
              { n: '7 Yrs', label: 'Of Ministry' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold brand-text-light">{s.n}</div>
                <div className="text-blue-300/60 text-xs tracking-wider uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={dark ? 'text-gray-950' : 'text-gray-50'}>
          <path d="M0 80L60 66.7C120 53 240 27 360 20C480 13 600 27 720 33.3C840 40 960 40 1080 33.3C1200 27 1320 13 1380 6.7L1440 0V80H0Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
