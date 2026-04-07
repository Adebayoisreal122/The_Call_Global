import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PlayCircle, Share2, Camera, AtSign, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const { dark } = useTheme();

  return (
    <footer className={`border-t ${dark ? 'bg-navy-900 border-yellow-600/15 text-gray-300' : 'bg-gray-50 border-yellow-500/20 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">✞</span>
              </div>
              <div>
                <div className="font-display text-base font-bold gold-text">The Call Global</div>
                <div className="text-xs tracking-widest uppercase opacity-50">Ministry</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-75 mb-5 font-body">
              Raising a generation of believers who walk fully in their God-given calling — across every nation and sphere.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <PlayCircle size={16} />, href: '#' },
                { icon: <Share2 size={16} />, href: '#' },
                { icon: <Camera size={16} />, href: '#' },
                { icon: <AtSign size={16} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-8 h-8 rounded-full border border-yellow-600/30 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-yellow-500">Ministry</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Vision', 'Programs', 'Devotionals', 'Testimonies', 'Prayer Requests'].map(l => (
                <li key={l}><a href="#" className="hover:text-yellow-500 transition-colors opacity-80">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-yellow-500">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-500 transition-colors opacity-80">
                  <MessageCircle size={14} /> WhatsApp Community
                </a>
              </li>
              <li>
                <a href="https://t.me/thecallglobal" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 hover:text-yellow-500 transition-colors opacity-80">
                  <Send size={14} /> Telegram Channel
                </a>
              </li>
              <li><a href="/#join" className="opacity-80 hover:text-yellow-500 transition-colors">Register as Member</a></li>
              <li><a href="/#contact" className="opacity-80 hover:text-yellow-500 transition-colors">Book Consultation</a></li>
            </ul>
          </div>

          {/* Scripture */}
          <div>
            <h4 className="font-display font-semibold text-sm tracking-wider uppercase mb-4 text-yellow-500">Today's Word</h4>
            <blockquote className={`text-sm leading-relaxed font-body italic opacity-80 p-4 rounded-xl border ${dark ? 'border-yellow-600/15 bg-white/3' : 'border-yellow-500/20 bg-yellow-50/50'}`}>
              "For many are called, but few are chosen."
              <footer className="mt-2 text-xs not-italic text-yellow-600 font-sans font-medium">— Matthew 22:14</footer>
            </blockquote>
            <div className="mt-4 text-xs opacity-50">
              <Link to="/admin" className="hover:text-yellow-500 transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t text-sm text-center opacity-50 ${dark ? 'border-white/10' : 'border-gray-200'}`}>
          © {new Date().getFullYear()} The Call Global Ministry · All Rights Reserved · Built for His Glory
        </div>
      </div>
    </footer>
  );
}
