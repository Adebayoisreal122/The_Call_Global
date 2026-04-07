import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PlayCircle, Share2, Camera, AtSign, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className={`border-t ${dark ? 'bg-[#030a2e] border-white/10 text-gray-300' : 'bg-blue-950 text-blue-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
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
            <div className="flex gap-3">
              {[
                { icon: <PlayCircle size={15} />, href: '#' },
                { icon: <Share2 size={15} />, href: '#' },
                { icon: <Camera size={15} />, href: '#' },
                { icon: <AtSign size={15} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-8 h-8 rounded-full border border-blue-400/30 flex items-center justify-center text-blue-300 hover:border-blue-300 hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Ministry</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Vision', 'Programs', 'Devotionals', 'Testimonies', 'Prayer Requests'].map(l => (
                <li key={l}><a href="#" className="text-blue-200/70 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <MessageCircle size={13} /> WhatsApp Community
                </a>
              </li>
              <li>
                <a href="https://t.me/thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors">
                  <Send size={13} /> Telegram Channel
                </a>
              </li>
              <li><a href="/#join" className="text-blue-200/70 hover:text-white transition-colors">Register as Member</a></li>
              <li><a href="/#contact" className="text-blue-200/70 hover:text-white transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Scripture */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-blue-300">Today's Word</h4>
            <blockquote className="text-sm leading-relaxed font-body italic text-blue-200/80 p-4 rounded-xl border border-blue-400/15 bg-white/5">
              "For many are called, but few are chosen."
              <footer className="mt-2 text-xs not-italic text-blue-300 font-sans font-medium">— Matthew 22:14</footer>
            </blockquote>
            <div className="mt-4 text-xs text-blue-400/50">
              <Link to="/admin" className="hover:text-blue-300 transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-sm text-center text-blue-400/50">
          © {new Date().getFullYear()} The Call Global Ministry · All Rights Reserved · Built for His Glory
        </div>
      </div>
    </footer>
  );
}
