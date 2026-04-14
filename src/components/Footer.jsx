import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MessageCircle, Send } from 'lucide-react';

// ── Branded SVG Icons ─────────────────────────────────────────────────────────
const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
  </svg>
);

const YouTubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socials = [
  {
    icon: <FacebookIcon size={15} />,
    href: 'https://www.facebook.com/share/18J4G3ECPG/?mibextid=wwXIfr',
    label: 'Facebook',
    hoverColor: 'hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10',
  },
  {
    icon: <InstagramIcon size={15} />,
    href: 'https://www.instagram.com/thecallglobal?igsh=ODlrd3AxYnQ4amI0',
    label: 'Instagram',
    hoverColor: 'hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10',
  },
  {
    icon: <TikTokIcon size={15} />,
    href: 'https://www.tiktok.com/@thecallglobal?_r=1&_t=ZN-95VeOEA4tZ0',
    label: 'TikTok',
    hoverColor: 'hover:border-white hover:text-white hover:bg-white/10',
  },
  {
    icon: <YouTubeIcon size={15} />,
    href: 'https://youtube.com/@thecallglobal?si=9dzoUqlqf7miR8Nl',
    label: 'YouTube',
    hoverColor: 'hover:border-red-500 hover:text-red-400 hover:bg-red-500/10',
  },
];

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className={`border-t ${dark ? 'bg-[#030a2e] border-white/10 text-gray-300' : 'bg-blue-950 text-blue-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">

          {/* ── Brand + Socials ── */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logowhite.png" alt="The Call Global" className="h-12 w-12 object-contain rounded-full" />
              <div>
                <div className="font-display text-base font-bold brand-text-light">The Call Global</div>
                <div className="text-xs tracking-widest uppercase text-blue-300/50">Ministry</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-blue-200/70 mb-5 font-body">
              Raising a generation of believers who walk fully in their God-given calling — across every nation and sphere.
            </p>

            {/* Social icons */}
            <div className="mb-2">
              <p className="text-xs text-blue-300/50 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className={`w-8 h-8 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300/70 transition-all duration-200 ${s.hoverColor}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Ministry Links ── */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Ministry</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'Our Vision', href: '/#about' },
                { label: 'Programs', href: '/#programs' },
                { label: 'Devotionals', href: '/devotionals' },
                { label: 'Testimonies', href: '/#testimonies' },
                { label: 'Prayer Requests', href: '/#contact' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-blue-200/70 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Community ── */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://chat.whatsapp.com/C3rIl9rSM5S467e0ohlhhG" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <MessageCircle size={13} className="text-green-400 flex-shrink-0" /> WhatsApp Community
                </a>
              </li>
              <li>
                <a href="https://t.me/Thecall023" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <Send size={13} className="text-blue-400 flex-shrink-0" /> Telegram Channel
                </a>
              </li>
              {/* Social platforms in community section too */}
              <li>
                <a href="https://facebook.com/thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <FacebookIcon size={13} /> Facebook Page
                </a>
              </li>
              <li>
                <a href="https://instagram.com/thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <InstagramIcon size={13} /> Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <TikTokIcon size={13} /> TikTok
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <YouTubeIcon size={13} /> YouTube Channel
                </a>
              </li>
              <li className="pt-1">
                <a href="/#join" className="text-blue-200/70 hover:text-white transition-colors">Register as Member</a>
              </li>
              <li>
                <a href="/#contact" className="text-blue-200/70 hover:text-white transition-colors">Book Consultation</a>
              </li>
            </ul>
          </div>

          {/* ── Scripture ── */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Today's Word</h4>
            <blockquote className="text-sm leading-relaxed font-body italic text-blue-200/80 p-4 rounded-xl border border-blue-400/15 bg-white/5">
              "For many are called, but few are chosen."
              <footer className="mt-2 text-xs not-italic text-blue-300 font-sans font-medium">— Matthew 22:14</footer>
            </blockquote>

            {/* Social follow CTA */}
            <div className="mt-5 p-4 rounded-xl border border-blue-400/15 bg-white/3">
              <p className="text-xs text-blue-300/70 mb-3">Stay connected on social media</p>
              <div className="flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={`Follow on ${s.label}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-400/20 text-blue-300/70 text-xs transition-all duration-200 ${s.hoverColor}`}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 text-xs text-blue-400/50">
              <Link to="/admin" className="hover:text-blue-300 transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-400/50">
            © {new Date().getFullYear()} The Call Global Ministry · All Rights Reserved · Built for His Glory
          </p>
          {/* Social row in bottom bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-400/40">Follow:</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                className={`w-7 h-7 rounded-full border border-blue-400/20 flex items-center justify-center text-blue-300/50 transition-all duration-200 ${s.hoverColor}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
