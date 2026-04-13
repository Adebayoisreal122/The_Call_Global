import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { MessageCircle, Send, Users, ArrowRight, Loader2 } from 'lucide-react';

// ── Branded SVG Icons ──────────────────────────────────────────────────────
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
  </svg>
);
const YouTubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const socials = [
  { icon: <FacebookIcon size={22} />, label: 'Facebook', handle: 'Follow on Facebook', href: 'https://www.facebook.com/share/18J4G3ECPG/?mibextid=wwXIfr', color: 'from-blue-600 to-blue-700' },
  { icon: <InstagramIcon size={22} />, label: 'Instagram', handle: 'Follow on Instagram', href: 'https://www.instagram.com/thecallglobal?igsh=ODlrd3AxYnQ4amI0', color: 'from-pink-500 to-purple-600' },
  { icon: <TikTokIcon size={22} />, label: 'TikTok', handle: 'Follow on TikTok', href: 'https://www.tiktok.com/@thecallglobal?_r=1&_t=ZN-95VeOEA4tZ0', color: 'from-gray-700 to-gray-900' },
  { icon: <YouTubeIcon size={22} />, label: 'YouTube', handle: 'Subscribe on YouTube', href: 'https://youtube.com/@thecallglobal?si=9dzoUqlqf7miR8Nl', color: 'from-red-600 to-red-700' },
];

const communities = [
  { icon: <MessageCircle size={22} />, label: 'WhatsApp Community', desc: 'Join our active WhatsApp community for daily devotionals and updates.', color: 'from-green-500 to-green-600', href: 'https://chat.whatsapp.com/C3rIl9rSM5S467e0ohlhhG?mode=gi_t' },
  { icon: <Send size={22} />, label: 'Telegram Channel', desc: 'Get ministry updates, teachings, and prayer alerts on Telegram.', color: 'from-blue-500 to-blue-600', href: 'https://t.me/Thecall023' },
  { icon: <Users size={22} />, label: 'Online Community', desc: 'Connect with believers worldwide through our digital community platform.', color: 'from-violet-500 to-violet-600', href: '#' },
];

export default function Join() {
  const { dark } = useTheme();
  const { submitRegistration } = useMinistry();
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', interest: '' });
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await submitRegistration(form);
      setDone(true);
      setForm({ name: '', email: '', phone: '', country: '', interest: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  return (
    <section id="join" className={`py-24 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-navy"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Answer The <span className="brand-text">Call</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            There are multiple ways to connect and be part of what God is doing through this ministry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* ── Registration Form ── */}
          <div className={`p-8 rounded-3xl ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-display text-2xl font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Register as a Member
            </h3>
            {done ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  Welcome to the Family!
                </h4>
                <p className={`font-body text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  You've been registered. We'll reach out to you shortly with next steps.
                </p>
                <button onClick={() => setDone(false)} className="mt-6 btn-outline-navy px-6 py-2 rounded-full text-sm">
                  Register Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full Name *" required className={input} />
                <div className="grid grid-cols-2 gap-4">
                  <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    type="email" placeholder="Email Address *" required className={input} />
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="Phone / WhatsApp" className={input} />
                </div>
                <input value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  placeholder="Country / City" className={input} />
                <select value={form.interest} onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                  <option value="">Area of Interest</option>
                  {['Prayer & Intercession','Word Ministry / Teaching','Music & Worship','Media & Technology','Missions & Evangelism','Youth Ministry','General Member'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <button type="submit" disabled={saving}
                  className="btn-navy w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving
                    ? <><Loader2 size={15} className="animate-spin" /> Registering...</>
                    : <>Join The Ministry <ArrowRight size={16} /></>
                  }
                </button>
              </form>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="space-y-4">
            <h3 className={`font-display text-2xl font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Join Our Communities
            </h3>

            {/* WhatsApp / Telegram / Online */}
            {communities.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer"
                className={`flex items-center gap-5 p-5 rounded-2xl group transition-all
                  ${dark
                    ? 'bg-white/4 border border-white/8 hover:border-blue-500/30 hover:bg-white/6'
                    : 'bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md'
                  }`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-sm mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>{c.label}</div>
                  <div className={`text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{c.desc}</div>
                </div>
                <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}

            {/* ── Social Media Follow Section ── */}
            <div className={`p-5 rounded-2xl border ${dark ? 'border-white/8 bg-white/3' : 'border-gray-100 bg-white shadow-sm'}`}>
              <h4 className={`font-display font-semibold text-sm mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                Follow Us on Social Media
              </h4>
              <p className={`text-xs mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Stay updated with sermons, devotionals, and ministry news.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl group transition-all
                      ${dark
                        ? 'bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                      }`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      {s.icon}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                        {s.label}
                      </div>
                      <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {s.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Scripture */}
            <div className={`p-5 rounded-2xl border border-blue-600/20 ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
              <p className={`font-body text-sm italic ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                "And let us consider how to stir up one another to love and good works, not neglecting to meet together..."
              </p>
              <cite className="text-blue-500 text-xs not-italic font-medium mt-2 block">— Hebrews 10:24-25</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
