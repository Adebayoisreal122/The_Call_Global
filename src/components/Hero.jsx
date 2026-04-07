import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { dark } = useTheme();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient cross-pattern">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-anim absolute top-20 right-16 text-yellow-500/10 text-9xl font-display font-bold select-none">✞</div>
        <div className="float-anim-2 absolute bottom-32 left-12 text-yellow-500/8 text-7xl font-display font-bold select-none">✞</div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-600/40 bg-yellow-500/5 mb-8">
            <span className="text-yellow-500 text-xs tracking-widest uppercase font-medium">Raising Kingdom Voices</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            You Were Made{' '}
            <span className="block gold-text">For More Than This</span>
          </h1>

          <p className="font-body text-xl md:text-2xl text-gray-300/80 leading-relaxed max-w-2xl mx-auto mb-10">
            The Call Global is a Spirit-led ministry raising believers who walk boldly in their God-given purpose — across every nation and generation.
          </p>

          {/* Scripture */}
          <div className="mb-10 inline-block px-6 py-3 rounded-2xl border border-yellow-600/20 bg-white/3">
            <p className="font-body italic text-yellow-200/80 text-base">
              "For I know the plans I have for you, declares the Lord..." — <span className="text-yellow-500">Jeremiah 29:11</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/#join" className="btn-gold px-8 py-4 rounded-full text-base shadow-lg shadow-yellow-600/20 hover:shadow-yellow-600/40">
              Join The Ministry
            </a>
            <a href="/#programs" className="btn-outline-gold px-8 py-4 rounded-full text-base">
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
                <div className="font-display text-3xl font-bold gold-text">{s.n}</div>
                <div className="text-gray-400 text-xs tracking-wider uppercase mt-1">{s.label}</div>
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
