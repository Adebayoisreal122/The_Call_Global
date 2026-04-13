import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { dark } = useTheme();

  return (
    <section
      className={`relative min-h-screen flex items-center overflow-hidden hero-gradient cross-pattern
      ${dark ? "bg-[#020625]" : "bg-gray-50"}`}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-anim absolute top-24 right-20 opacity-10">
          <img src="/logo.png" alt="" className="w-64 h-64 object-contain" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative float-anim-2">
              <img
                src={dark ? "/logowhite.png" : "/logo.png"}
                alt="The Call Global"
                className="h-28 w-28 object-contain rounded-full shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-blue-600/20 ring-offset-1"></div>
            </div>
          </div>

          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6
            ${
              dark
                ? "border-blue-300/30 bg-blue-400/10 text-blue-200"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            <span className="text-xs tracking-widest uppercase font-medium">
              Raising Kingdom Voices Globally
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-5xl md:text-7xl font-bold leading-tight mb-6
            ${dark ? "text-white" : "text-gray-900"}`}
          >
            You Were Made
            <span className="block brand-text-light mt-1">
              For More Than This
            </span>
          </h1>

          {/* Description */}
          <p
            className={`font-body text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10
            ${dark ? "text-blue-100/80" : "text-gray-600"}`}
          >
            Raising People with the call of God over their lives. <br></br>
            Calling The Called, redeeming the called, empowering the called, and
            Preserving the call of God over the called
          </p>

          {/* Scripture */}
          <div
            className={`mb-10 inline-block px-6 py-3 rounded-2xl border
            ${
              dark
                ? "border-blue-300/20 bg-white/5 text-blue-200"
                : "border-gray-200 bg-white text-gray-700 shadow-sm"
            }`}
          >
            <p className="font-body italic text-base">
              "For I know the plans I have for you, declares the Lord..." —
              <span
                className={`ml-1 font-semibold not-italic
                ${dark ? "text-blue-200" : "text-blue-700"}`}
              >
                Jeremiah 29:11
              </span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/#join"
              className={`px-8 py-4 rounded-full text-base shadow-xl transition
                ${
                  dark
                    ? "btn-navy shadow-blue-900/50 hover:shadow-blue-800/60"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Join The Ministry
            </a>

            <a
              href="/#programs"
              className={`px-8 py-4 rounded-full text-base border transition
                ${
                  dark
                    ? "btn-outline-light"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              View Programs ↓
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { n: "3K+", label: "Members" },
              { n: "12+", label: "Nations" },
              { n: "4 Yrs", label: "Of Ministry" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold brand-text-light">
                  {s.n}
                </div>
                <div
                  className={`text-xs tracking-wider uppercase mt-1
                  ${dark ? "text-blue-300/60" : "text-gray-500"}`}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={dark ? "text-gray-950" : "text-gray-100"}
        >
          <path
            d="M0 80L60 66.7C120 53 240 27 360 20C480 13 600 27 720 33.3C840 40 960 40 1080 33.3C1200 27 1320 13 1380 6.7L1440 0V80H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
